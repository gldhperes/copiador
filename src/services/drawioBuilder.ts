import fs from 'fs/promises';

interface UmlClass {
    name: string;
    variables: string[];
    functions: string[];
    connections: string[];
    calls: MethodCall[];
}

interface MethodCall {
    callerClass: string;
    callerMethod: string;
    targetClass: string;
    targetMethod: string;
}

interface DrawioEdge {
    source: string;
    target: string;
    label: string;
}

interface PositionedClass extends UmlClass {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    layer: number;
}

export interface DrawioBuildResult {
    xml: string;
    classCount: number;
    connectionCount: number;
}

const PALETTE = [
    '#DCEBFA', '#DDF3E4', '#FFF0D5', '#E9E0FA',
    '#FBE0E5', '#D8F2F0', '#F2E8D5', '#E2E8F0',
    '#E7F0C3', '#FCE7D6', '#DCE4FF', '#E8DFF5'
];

const NODE_GAP_X = 190;
const NODE_GAP_Y = 92;
const LAYER_GAP_X = 260;
const MARGIN_X = 80;
const MARGIN_Y = 80;
const MIN_NODE_WIDTH = 260;
const MAX_NODE_WIDTH = 430;

export class DrawioBuilder {
    async buildFromFiles(umlPath: string, stylePath: string): Promise<DrawioBuildResult> {
        const uml = await fs.readFile(umlPath, 'utf8');

        // The style file is deliberately required so the conversion cannot silently
        // run without the project's declared visual specification.
        const style = await fs.readFile(stylePath, 'utf8');
        if (!style.trim()) {
            throw new Error(`O arquivo de estilo está vazio: ${stylePath}`);
        }

        return this.build(uml);
    }

    build(umlMarkdown: string): DrawioBuildResult {
        const classes = this.parseUml(umlMarkdown);
        if (classes.length === 0) {
            throw new Error('Nenhuma classe foi encontrada no UML.md.');
        }

        const byName = new Map(classes.map(cls => [cls.name, cls]));
        const validEdges: DrawioEdge[] = [];
        const edgeByPair = new Map<string, DrawioEdge>();

        const pairKey = (a: string, b: string) => [a, b].sort().join('\u0000');

        // Primeiro registra as conexões de classe encontradas no UML.
        for (const cls of classes) {
            for (const connection of cls.connections) {
                if (!byName.has(connection) || connection === cls.name) continue;
                const key = pairKey(cls.name, connection);
                if (!edgeByPair.has(key)) {
                    edgeByPair.set(key, {
                        source: cls.name,
                        target: connection,
                        label: ''
                    });
                }
            }
        }

        // Depois associa chamadas reais às linhas entre as classes.
        // A direção da seta passa a seguir callerClass -> targetClass.
        const allCalls = classes.flatMap(cls => cls.calls);
        for (const call of allCalls) {
            if (!byName.has(call.callerClass) || !byName.has(call.targetClass)) continue;
            if (call.callerClass === call.targetClass) continue;

            const key = pairKey(call.callerClass, call.targetClass);
            const existing = edgeByPair.get(key);
            const labelLine = `${call.callerMethod}() chama ${call.targetMethod}()`;

            if (existing) {
                // Evita repetir o mesmo rótulo quando a chamada aparece
                // na seção Chamadas de ambas as classes.
                const labels = existing.label ? existing.label.split('\n') : [];
                if (!labels.includes(labelLine)) labels.push(labelLine);
                existing.label = labels.join('\n');
                existing.source = call.callerClass;
                existing.target = call.targetClass;
            } else {
                edgeByPair.set(key, {
                    source: call.callerClass,
                    target: call.targetClass,
                    label: labelLine
                });
            }
        }

        validEdges.push(...edgeByPair.values());

        const positions = this.layout(classes, validEdges);
        const xml = this.createXml(positions, validEdges);

        return {
            xml,
            classCount: classes.length,
            connectionCount: validEdges.length
        };
    }

    private parseUml(markdown: string): UmlClass[] {
        const classes: UmlClass[] = [];
        let current: UmlClass | undefined;
        let section: 'variables' | 'functions' | 'connections' | 'calls' | '' = '';

        for (const rawLine of markdown.replace(/\r\n/g, '\n').split('\n')) {
            const line = rawLine.trim();
            const heading = line.match(/^(?:\*\*\s*)?##\s+(.+?)(?:\s*\*\*)?$/);
            if (heading) {
                const name = heading[1].replace(/\*\*/g, '').trim();
                if (name && name.toLowerCase() !== 'uml') {
                    current = {
                        name,
                        variables: [],
                        functions: [],
                        connections: [],
                        calls: []
                    };
                    classes.push(current);
                } else {
                    current = undefined;
                }
                section = '';
                continue;
            }

            if (!current || !line) continue;

            const normalized = line.replace(/\*\*/g, '').replace(/:$/, '').trim().toLowerCase();
            if (normalized === 'variaveis' || normalized === 'variáveis' || normalized === 'variables') {
                section = 'variables';
                continue;
            }
            if (normalized === 'funções' || normalized === 'funcoes' || normalized === 'functions' || normalized === 'métodos' || normalized === 'metodos') {
                section = 'functions';
                continue;
            }
            if (normalized === 'conexões' || normalized === 'conexoes' || normalized === 'connections') {
                section = 'connections';
                continue;
            }
            if (normalized === 'chamadas' || normalized === 'calls') {
                section = 'calls';
                continue;
            }

            const item = line
                .replace(/^[*+\-\s]+/, '')
                .replace(/,\s*$/, '')
                .trim();
            if (!item || /^```/.test(item)) continue;

            if (section === 'variables') current.variables.push(line.replace(/,\s*$/, '').trim());
            else if (section === 'functions') current.functions.push(line.replace(/,\s*$/, '').trim());
            else if (section === 'connections') current.connections.push(item);
            else if (section === 'calls') {
                const callMatch = item.match(/^([A-Za-z_$][\w$]*)\.([A-Za-z_$][\w$]*)\s*\(\)\s*->\s*([A-Za-z_$][\w$]*)\.([A-Za-z_$][\w$]*)\s*\(\)$/);
                if (callMatch) {
                    current.calls.push({
                        callerClass: callMatch[1],
                        callerMethod: callMatch[2],
                        targetClass: callMatch[3],
                        targetMethod: callMatch[4]
                    });
                }
            }
        }

        // Drop accidental duplicate class headings while retaining first occurrence.
        const unique = new Map<string, UmlClass>();
        for (const cls of classes) {
            if (!unique.has(cls.name)) unique.set(cls.name, cls);
            else {
                const existing = unique.get(cls.name)!;
                existing.variables.push(...cls.variables);
                existing.functions.push(...cls.functions);
                existing.connections.push(...cls.connections);
                existing.calls.push(...cls.calls);
            }
        }
        return [...unique.values()];
    }

    private layout(
        classes: UmlClass[],
        edges: DrawioEdge[]
    ): PositionedClass[] {
        const byName = new Map(classes.map(cls => [cls.name, cls]));
        const neighbors = new Map<string, Set<string>>();
        for (const cls of classes) neighbors.set(cls.name, new Set<string>());
        for (const edge of edges) {
            neighbors.get(edge.source)?.add(edge.target);
            neighbors.get(edge.target)?.add(edge.source);
        }

        const colors = this.colorGraph(classes, neighbors);
        const layerByName = new Map<string, number>();
        const components: string[][] = [];
        const sortedRoots = [...classes].sort((a, b) =>
            (neighbors.get(b.name)?.size ?? 0) - (neighbors.get(a.name)?.size ?? 0)
        );

        for (const root of sortedRoots) {
            if (layerByName.has(root.name)) continue;
            const component: string[] = [];
            const queue: string[] = [root.name];
            layerByName.set(root.name, 0);
            while (queue.length) {
                const name = queue.shift()!;
                component.push(name);
                const next = [...(neighbors.get(name) ?? [])]
                    .sort((a, b) => (neighbors.get(b)?.size ?? 0) - (neighbors.get(a)?.size ?? 0));
                for (const neighbor of next) {
                    if (layerByName.has(neighbor)) continue;
                    layerByName.set(neighbor, (layerByName.get(name) ?? 0) + 1);
                    queue.push(neighbor);
                }
            }
            components.push(component);
        }

        // Arrange each connected component in layers. Isolated classes are collected
        // into a compact grid at the end.
        const isolated = components.filter(component =>
            component.length === 1 && (neighbors.get(component[0])?.size ?? 0) === 0
        ).flat();
        const connected = components.filter(component => !(
            component.length === 1 && (neighbors.get(component[0])?.size ?? 0) === 0
        ));

        const output: PositionedClass[] = [];
        let componentBaseY = MARGIN_Y;

        for (const component of connected) {
            const localLayer = new Map<string, number>();
            const root = component[0];
            const queue = [root];
            localLayer.set(root, 0);
            while (queue.length) {
                const name = queue.shift()!;
                for (const neighbor of neighbors.get(name) ?? []) {
                    if (!component.includes(neighbor) || localLayer.has(neighbor)) continue;
                    localLayer.set(neighbor, (localLayer.get(name) ?? 0) + 1);
                    queue.push(neighbor);
                }
            }

            const layers = new Map<number, string[]>();
            for (const name of component) {
                const layer = localLayer.get(name) ?? 0;
                if (!layers.has(layer)) layers.set(layer, []);
                layers.get(layer)!.push(name);
            }

            const orderedLayers = [...layers.keys()].sort((a, b) => a - b);
            const maxCount = Math.max(1, ...orderedLayers.map(layer => layers.get(layer)!.length));
            const componentStartY = componentBaseY;
            for (const layer of orderedLayers) {
                const names = layers.get(layer)!.sort((a, b) =>
                    (neighbors.get(b)?.size ?? 0) - (neighbors.get(a)?.size ?? 0) ||
                    a.localeCompare(b)
                );
                let y = componentStartY;
                for (const name of names) {
                    const cls = byName.get(name)!;
                    const dimensions = this.dimensions(cls);
                    output.push({
                        ...cls,
                        id: `class_${output.length}`,
                        x: MARGIN_X + layer * (MAX_NODE_WIDTH + LAYER_GAP_X),
                        y,
                        width: dimensions.width,
                        height: dimensions.height,
                        color: colors.get(name) ?? PALETTE[0],
                        layer
                    });
                    y += dimensions.height + NODE_GAP_Y;
                }
            }
            componentBaseY += maxCount * 250 + 360;
        }

        // Keep isolated nodes visible, without wasting a full column per class.
        const isolatedColumns = 4;
        let isolatedY = componentBaseY;
        let maxIsolatedHeight = 0;
        for (let i = 0; i < isolated.length; i++) {
            const cls = byName.get(isolated[i])!;
            const dimensions = this.dimensions(cls);
            const col = i % isolatedColumns;
            const row = Math.floor(i / isolatedColumns);
            output.push({
                ...cls,
                id: `class_${output.length}`,
                x: MARGIN_X + col * (MAX_NODE_WIDTH + NODE_GAP_X),
                y: isolatedY + row * 390,
                width: dimensions.width,
                height: dimensions.height,
                color: colors.get(cls.name) ?? PALETTE[0],
                layer: 0
            });
            maxIsolatedHeight = Math.max(maxIsolatedHeight, dimensions.height);
        }

        // Reposition nodes within each layer to avoid overlaps, including classes
        // whose member lists produce unusually tall blocks.
        const groups = new Map<number, PositionedClass[]>();
        for (const node of output) {
            if (!groups.has(node.layer)) groups.set(node.layer, []);
            groups.get(node.layer)!.push(node);
        }
        for (const group of groups.values()) {
            group.sort((a, b) => a.y - b.y);
            let cursorY = MARGIN_Y;
            for (const node of group) {
                if (node.y < cursorY) node.y = cursorY;
                cursorY = node.y + node.height + NODE_GAP_Y;
            }
        }

        return output;
    }

    private colorGraph(
        classes: UmlClass[],
        neighbors: Map<string, Set<string>>
    ): Map<string, string> {
        const colors = new Map<string, string>();
        const ordered = [...classes].sort((a, b) =>
            (neighbors.get(b.name)?.size ?? 0) - (neighbors.get(a.name)?.size ?? 0)
        );

        for (const cls of ordered) {
            const used = new Set<string>();
            for (const neighbor of neighbors.get(cls.name) ?? []) {
                const color = colors.get(neighbor);
                if (color) used.add(color);
            }
            const color = PALETTE.find(candidate => !used.has(candidate)) ?? PALETTE[colors.size % PALETTE.length];
            colors.set(cls.name, color);
        }
        return colors;
    }

    private dimensions(cls: UmlClass): { width: number; height: number } {
        const allLines = [...cls.variables, ...cls.functions];
        const maxLength = Math.max(cls.name.length, 16, ...allLines.map(line => line.length));
        const width = Math.max(MIN_NODE_WIDTH, Math.min(MAX_NODE_WIDTH, 34 + maxLength * 7.1));
        const wrappedLineCount = (line: string) => Math.max(1, Math.ceil(line.length / Math.max(24, Math.floor((width - 36) / 7.2))));
        const memberRows = allLines.reduce((sum, line) => sum + wrappedLineCount(line), 0);
        const sectionCount = (cls.variables.length ? 1 : 0) + (cls.functions.length ? 1 : 0);
        const height = Math.max(92, 42 + 28 + (cls.variables.length ? 26 + cls.variables.reduce((sum, line) => sum + wrappedLineCount(line) * 20, 0) : 0) + (cls.functions.length ? 26 + cls.functions.reduce((sum, line) => sum + wrappedLineCount(line) * 20, 0) : 0));
        return { width, height };
    }

    private createXml(
        nodes: PositionedClass[],
        edges: DrawioEdge[]
    ): string {
        const idByName = new Map(nodes.map(node => [node.name, node.id]));
        const maxX = Math.max(1600, ...nodes.map(node => node.x + node.width + MARGIN_X));
        const maxY = Math.max(1200, ...nodes.map(node => node.y + node.height + MARGIN_Y));
        const cells: string[] = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];

        for (const edge of edges) {
            const sourceId = idByName.get(edge.source);
            const targetId = idByName.get(edge.target);
            if (!sourceId || !targetId) continue;
            const edgeId = `edge_${cells.length}`;
            const sourceNode = nodes.find(node => node.id === sourceId);
            const targetNode = nodes.find(node => node.id === targetId);
            const waypoints = sourceNode && targetNode
                ? this.curvedWaypoints(sourceNode, targetNode, cells.length)
                : '';
            cells.push(
                `<mxCell id="${edgeId}" value="${this.xmlEscape(this.edgeLabel(edge.label))}" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=0;html=1;labelBackgroundColor=#FFFFFF;fontSize=10;fontColor=#334155;endArrow=block;endFill=1;strokeColor=#64748B;strokeWidth=1.4;curveGeometry=1;" edge="1" parent="1" source="${sourceId}" target="${targetId}"><mxGeometry relative="1" as="geometry">${waypoints}</mxGeometry></mxCell>`
            );
        }

        for (const node of nodes) {
            const value = this.htmlLabel(node);
            const style = [
                'rounded=0',
                'whiteSpace=wrap',
                'html=1',
                'align=left',
                'verticalAlign=top',
                'spacing=8',
                'fontSize=12',
                'fontColor=#1F2937',
                `fillColor=${node.color}`,
                'strokeColor=#475569',
                'strokeWidth=1.3',
                'shadow=0'
            ].join(';') + ';';
            cells.push(
                `<mxCell id="${node.id}" value="${this.xmlEscape(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${Math.round(node.x)}" y="${Math.round(node.y)}" width="${Math.round(node.width)}" height="${Math.round(node.height)}" as="geometry"/></mxCell>`
            );
        }

        return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="${new Date().toISOString()}" agent="aicontext" version="24.7.17" type="device">
  <diagram id="uml-project" name="UML">
    <mxGraphModel dx="${Math.round(maxX)}" dy="${Math.round(maxY)}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${Math.round(maxX)}" pageHeight="${Math.round(maxY)}" math="0" shadow="0">
      <root>${cells.join('')}</root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
    }

    /**
     * Produces intermediate passage points for Draw.io's native Curved line style.
     * `curved=1` smooths the route through these points; edgeStyle=none prevents
     * the orthogonal router from replacing the curved route.
     */
    private curvedWaypoints(
        source: PositionedClass,
        target: PositionedClass,
        edgeIndex: number
    ): string {
        const sx = source.x + source.width / 2;
        const sy = source.y + source.height / 2;
        const tx = target.x + target.width / 2;
        const ty = target.y + target.height / 2;
        const dx = tx - sx;
        const dy = ty - sy;
        const length = Math.max(1, Math.hypot(dx, dy));

        // Offset each edge slightly so parallel connections do not perfectly overlap.
        const lane = ((edgeIndex % 5) - 2) * 24;
        const perpendicularX = -dy / length;
        const perpendicularY = dx / length;
        const points = [0.34, 0.66].map(fraction => ({
            x: Math.round(sx + dx * fraction + perpendicularX * lane),
            y: Math.round(sy + dy * fraction + perpendicularY * lane)
        }));

        return `<Array as="points">${points.map(point =>
            `<mxPoint x="${point.x}" y="${point.y}"/>`
        ).join('')}</Array>`;
    }

    private edgeLabel(label: string): string {
        if (!label.trim()) return '';
        return label.split('\n').map(line => this.htmlEscape(line)).join('<br>');
    }

    private htmlLabel(node: PositionedClass): string {
        const esc = (value: string) => this.htmlEscape(value);
        const section = (title: string, items: string[]) => {
            if (items.length === 0) return '';
            const rows = items.map(item =>
                `<div style="padding:2px 0;line-height:1.25;overflow-wrap:anywhere;">${esc(item)}</div>`
            ).join('');
            return `<div style="border-top:1px solid #64748B;padding-top:5px;margin-top:5px;"><div style="font-weight:bold;margin-bottom:3px;">${title}</div>${rows}</div>`;
        };
        return `<div style="font-family:Arial,sans-serif;font-size:12px;color:#1F2937;white-space:normal;"><div style="font-size:15px;font-weight:bold;padding-bottom:4px;">${esc(node.name)}</div>${section('Variáveis', node.variables)}${section('Funções', node.functions)}</div>`;
    }

    private htmlEscape(value: string): string {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    private xmlEscape(value: string): string {
        return value
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
}

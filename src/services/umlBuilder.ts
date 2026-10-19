interface CodeBlock {
    file: string;
    content: string;
}

interface MainClass {
    name: string;
    content: string;
}

interface Variable {
    name: string;
    type: string;
    visibility: 'public' | 'private';
}

interface FunctionInfo {
    name: string;
    visibility: 'public' | 'private';
}

interface MethodNode {
    id: string;
    className: string;
    name: string;
    visibility: 'public' | 'private';
    body: string;
}

interface BuildOptions {
    className?: string;
    connectionDepth?: number;
}

export class UmlBuilder {
    build(projectContext: string, options: BuildOptions = {}): string {
        const blocks = this.extractBlocks(projectContext);
        const classes = this.extractClasses(blocks);

        const className = (options.className ?? '').trim();
        const depth = options.connectionDepth;

        if (!className && depth === undefined) {
            return this.renderUml(classes);
        }

        if (!className || depth === undefined) {
            throw new Error(
                'Configuração incompleta: informe className e connectionDepth, ou deixe ambos vazios.'
            );
        }

        if (!Number.isInteger(depth) || depth < 0) {
            throw new Error(
                'connectionDepth deve ser um inteiro maior ou igual a zero.'
            );
        }

        const startClasses = classes.filter(item => item.name === className);
        if (startClasses.length === 0) {
            throw new Error(
                `A classe "${className}" não foi encontrada no project-context.md.`
            );
        }

        const graph = this.buildClassConnectionGraph(classes);
        const selectedNames = this.walkClassConnections(className, graph, depth);
        const selectedClasses = classes.filter(item => selectedNames.has(item.name));

        return this.renderUml(selectedClasses);
    }

    private buildClassConnectionGraph(classes: MainClass[]): Map<string, Set<string>> {
        const graph = new Map<string, Set<string>>();
        for (const item of classes) graph.set(item.name, new Set<string>());

        for (const item of classes) {
            const connections = this.findConnections(item, classes);
            for (const connectedName of connections) {
                graph.get(item.name)?.add(connectedName);
                graph.get(connectedName)?.add(item.name);
            }
        }
        return graph;
    }

    private walkClassConnections(
        startName: string,
        graph: Map<string, Set<string>>,
        maxDepth: number
    ): Set<string> {
        const visited = new Set<string>([startName]);
        let frontier = [startName];

        for (let level = 0; level < maxDepth; level++) {
            const next: string[] = [];
            for (const current of frontier) {
                for (const neighbor of graph.get(current) ?? []) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        next.push(neighbor);
                    }
                }
            }
            frontier = next;
            if (frontier.length === 0) break;
        }

        return visited;
    }

    private renderUml(
        classes: MainClass[],
        methodsByClass?: Map<string, Set<string>>
    ): string {
        const output: string[] = [];
        output.push('# UML', '');

        for (const mainClass of classes) {
            const variables = this.extractVariables(mainClass.content);
            let functions = this.extractFunctions(mainClass.content);

            if (methodsByClass) {
                const allowed = methodsByClass.get(mainClass.name) ?? new Set<string>();
                functions = functions.filter(func => allowed.has(func.name));
            }

            const connections = this.findConnections(mainClass, classes);

            output.push(`**## ${mainClass.name}**`, '');
            output.push('Variaveis:');

            for (const variable of variables) {
                const symbol = variable.visibility === 'public' ? '+' : '-';
                output.push(`  ${symbol} ${variable.name}: ${variable.type};`);
            }

            output.push('', 'Funções:');

            for (const func of functions) {
                const symbol = func.visibility === 'public' ? '+' : '-';
                output.push(`  ${symbol} ${func.name}()`);
            }

            output.push('', 'Conexões:');

            for (const connection of connections) {
                output.push(`  ${connection},`);
            }

            output.push('');
        }

        return output.join('\n');
    }

    private extractBlocks(projectContext: string): CodeBlock[] {
        const blocks: CodeBlock[] = [];
        const regex = /===\s*(.*?)\s*===\s*\n([\s\S]*?)(?=\n===\s*.*?\s*===|\s*$)/g;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(projectContext)) !== null) {
            blocks.push({
                file: match[1].trim(),
                content: match[2]
            });
        }

        return blocks;
    }

    private extractClasses(blocks: CodeBlock[]): MainClass[] {
        const classes: MainClass[] = [];

        for (const block of blocks) {
            const classRegex = /\b(class|struct|interface)\s+([A-Za-z_$][\w$]*)/g;
            let match: RegExpExecArray | null;

            while ((match = classRegex.exec(block.content)) !== null) {
                const className = match[2];
                const classBody = this.extractClassBody(
                    block.content,
                    match.index + match[0].length
                );

                if (classBody) {
                    classes.push({ name: className, content: classBody });
                }
            }
        }

        // Evita duplicatas de classes com o mesmo nome no contexto.
        const unique = new Map<string, MainClass>();
        for (const item of classes) {
            if (!unique.has(item.name)) unique.set(item.name, item);
        }
        return [...unique.values()];
    }

    private extractClassBody(content: string, startIndex: number): string {
        const openingBrace = content.indexOf('{', startIndex);
        if (openingBrace === -1) return '';

        let depth = 0;
        for (let i = openingBrace; i < content.length; i++) {
            if (content[i] === '{') depth++;
            if (content[i] === '}') {
                depth--;
                if (depth === 0) {
                    return content.slice(openingBrace + 1, i);
                }
            }
        }
        return content.slice(openingBrace + 1);
    }

    private extractVariables(classContent: string): Variable[] {
        const variables: Variable[] = [];
        let visibility: 'public' | 'private' = 'private';
        let braceDepth = 0;

        for (let line of classContent.split(/\r?\n/)) {
            line = line.replace(/\/\/.*$/, '').trim();
            if (!line) continue;

            if (/^public\s*:/.test(line)) {
                visibility = 'public';
                line = line.replace(/^public\s*:\s*/, '').trim();
                if (!line) continue;
            }
            if (/^private\s*:/.test(line)) {
                visibility = 'private';
                line = line.replace(/^private\s*:\s*/, '').trim();
                if (!line) continue;
            }

            if (braceDepth === 0) {
                let declaration = line;
                let currentVisibility = visibility;

                if (/^private\s+/.test(declaration)) {
                    currentVisibility = 'private';
                    declaration = declaration.replace(/^private\s+/, '').trim();
                }
                if (/^public\s+/.test(declaration)) {
                    currentVisibility = 'public';
                    declaration = declaration.replace(/^public\s+/, '').trim();
                }

                if (declaration.endsWith(';')) {
                    declaration = declaration.slice(0, -1).trim();
                    const withoutValue = declaration.split('=')[0].trim();

                    if (!withoutValue.includes('(') && !withoutValue.includes(')')) {
                        const match = withoutValue.match(/^(.+?)\s+([A-Za-z_$][\w$]*)$/);
                        if (match) {
                            const type = match[1].trim();
                            const name = match[2].trim();

                            if (!['return', 'if', 'else', 'for', 'while', 'switch'].includes(type)) {
                                variables.push({ name, type, visibility: currentVisibility });
                            }
                        }
                    }
                }
            }

            for (const character of line) {
                if (character === '{') braceDepth++;
                if (character === '}') braceDepth = Math.max(0, braceDepth - 1);
            }
        }

        return variables;
    }

    private extractFunctions(classContent: string): FunctionInfo[] {
        const functions: FunctionInfo[] = [];
        let visibility: 'public' | 'private' = 'private';
        let braceDepth = 0;

        for (let line of classContent.split(/\r?\n/)) {
            line = line.replace(/\/\/.*$/, '').trim();
            if (!line) continue;

            if (/^public\s*:/.test(line)) {
                visibility = 'public';
                line = line.replace(/^public\s*:\s*/, '').trim();
                if (!line) continue;
            }
            if (/^private\s*:/.test(line)) {
                visibility = 'private';
                line = line.replace(/^private\s*:\s*/, '').trim();
                if (!line) continue;
            }

            if (braceDepth === 0) {
                let declaration = line;
                let currentVisibility = visibility;

                if (/^public\s+/.test(declaration)) {
                    currentVisibility = 'public';
                    declaration = declaration.replace(/^public\s+/, '').trim();
                }
                if (/^private\s+/.test(declaration)) {
                    currentVisibility = 'private';
                    declaration = declaration.replace(/^private\s+/, '').trim();
                }

                const match = declaration.match(
                    /(?:[\w:<>,.?[\]&*]+\s+)?([A-Za-z_$][\w$]*)\s*\([^)]*\)/
                );

                if (match && !['if', 'for', 'foreach', 'while', 'switch', 'catch', 'using', 'lock'].includes(match[1])) {
                    if (!functions.some(func => func.name === match![1])) {
                        functions.push({ name: match[1], visibility: currentVisibility });
                    }
                }
            }

            for (const character of line) {
                if (character === '{') braceDepth++;
                if (character === '}') braceDepth = Math.max(0, braceDepth - 1);
            }
        }

        return functions;
    }

    private extractMethodNodes(classes: MainClass[]): MethodNode[] {
        const nodes: MethodNode[] = [];

        for (const mainClass of classes) {
            const lines = mainClass.content.split(/\r?\n/);
            let depth = 0;
            let i = 0;

            while (i < lines.length) {
                const originalLine = lines[i];
                const cleanLine = originalLine.replace(/\/\/.*$/, '').trim();

                if (!cleanLine) {
                    i++;
                    continue;
                }

                if (depth === 0) {
                    let signature = cleanLine;
                    let end = i;

                    // Suporta assinatura e chave de abertura na linha seguinte.
                    while (
                        end + 1 < lines.length &&
                        !signature.includes('{') &&
                        !signature.endsWith(';') &&
                        end - i < 5
                    ) {
                        end++;
                        signature += ' ' + lines[end].replace(/\/\/.*$/, '').trim();
                    }

                    const openingBraceInSignature = signature.indexOf('{');
                    const signatureOnly = openingBraceInSignature >= 0
                        ? signature.slice(0, openingBraceInSignature).trim()
                        : signature.trim();

                    const parsed = this.parseMethodSignature(signatureOnly);

                    if (parsed && openingBraceInSignature >= 0) {
                        let bodyDepth = 0;
                        let body = '';
                        let foundOpening = false;
                        let j = i;

                        for (; j < lines.length; j++) {
                            const line = lines[j].replace(/\/\/.*$/, '');
                            for (const ch of line) {
                                if (ch === '{') {
                                    bodyDepth++;
                                    foundOpening = true;
                                    if (bodyDepth > 1) body += ch;
                                } else if (ch === '}') {
                                    bodyDepth--;
                                    if (bodyDepth > 0) body += ch;
                                } else if (foundOpening && bodyDepth > 0) {
                                    body += ch;
                                }
                            }
                            body += '\n';

                            if (foundOpening && bodyDepth === 0) {
                                break;
                            }
                        }

                        const id = `${mainClass.name}.${parsed.name}@${nodes.length}`;
                        nodes.push({
                            id,
                            className: mainClass.name,
                            name: parsed.name,
                            visibility: parsed.visibility,
                            body
                        });

                        i = j + 1;
                        continue;
                    }
                }

                for (const ch of originalLine) {
                    if (ch === '{') depth++;
                    if (ch === '}') depth = Math.max(0, depth - 1);
                }
                i++;
            }
        }

        return nodes;
    }

    private parseMethodSignature(
        signature: string
    ): { name: string; visibility: 'public' | 'private' } | null {
        const match = signature.match(
            /^(?:(public|private|protected|internal|static|virtual|override|abstract|async|sealed|extern|new|partial|unsafe)\s+)*(?:(?:[\w<>,.?[\]&*]+\s+)+)?([A-Za-z_$][\w$]*)\s*\([\s\S]*\)\s*(?:where\s+[\w\s,:<>]+)?$/
        );

        if (!match) return null;

        const nameMatch = signature.match(/([A-Za-z_$][\w$]*)\s*\([\s\S]*\)\s*(?:where\s+[\w\s,:<>]+)?$/);
        if (!nameMatch) return null;

        const name = nameMatch[1];
        if (['if', 'for', 'foreach', 'while', 'switch', 'catch', 'using', 'lock', 'nameof'].includes(name)) {
            return null;
        }

        const visibility = /^\s*public\b/.test(signature)
            ? 'public'
            : 'private';

        return { name, visibility };
    }

    private findStartMethods(methods: MethodNode[], functionName: string): MethodNode[] {
        const normalized = functionName.replace(/::/g, '.').trim();

        if (normalized.includes('.')) {
            const [className, methodName] = normalized.split('.').slice(-2);
            return methods.filter(
                method => method.className === className && method.name === methodName
            );
        }

        return methods.filter(method => method.name === normalized);
    }

    private buildCallGraph(methods: MethodNode[]): Map<string, Set<string>> {
        const graph = new Map<string, Set<string>>();
        const byName = new Map<string, MethodNode[]>();

        for (const method of methods) {
            graph.set(method.id, new Set<string>());
            const matches = byName.get(method.name) ?? [];
            matches.push(method);
            byName.set(method.name, matches);
        }

        for (const caller of methods) {
            for (const [name, candidates] of byName) {
                const callRegex = new RegExp(`\\b${this.escapeRegex(name)}\\s*\\(`);
                if (!callRegex.test(caller.body)) continue;

                // Prefere método de mesma classe; caso contrário usa candidatos com esse nome.
                const sameClass = candidates.filter(
                    candidate => candidate.className === caller.className
                );
                const resolved = sameClass.length > 0 ? sameClass : candidates;

                for (const callee of resolved) {
                    if (callee.id !== caller.id) {
                        graph.get(caller.id)!.add(callee.id);
                    }
                }
            }
        }

        return graph;
    }

    private walkBothDirections(
        startId: string,
        graph: Map<string, Set<string>>,
        maxDepth: number
    ): Set<string> {
        const reverse = new Map<string, Set<string>>();

        for (const id of graph.keys()) reverse.set(id, new Set<string>());
        for (const [from, targets] of graph) {
            for (const to of targets) reverse.get(to)?.add(from);
        }

        const visited = new Set<string>([startId]);
        let frontier = [startId];

        for (let level = 0; level < maxDepth; level++) {
            const next: string[] = [];

            for (const current of frontier) {
                const neighbors = [
                    ...(graph.get(current) ?? []),
                    ...(reverse.get(current) ?? [])
                ];

                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        next.push(neighbor);
                    }
                }
            }

            frontier = next;
            if (frontier.length === 0) break;
        }

        return visited;
    }

    private findConnections(mainClass: MainClass, allClasses: MainClass[]): string[] {
        const connections: string[] = [];

        for (const otherClass of allClasses) {
            if (otherClass.name === mainClass.name) continue;

            const regex = new RegExp(`\\b${this.escapeRegex(otherClass.name)}\\b`);
            if (regex.test(mainClass.content)) connections.push(otherClass.name);
        }

        return connections;
    }

    private escapeRegex(value: string): string {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

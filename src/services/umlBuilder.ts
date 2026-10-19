
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

interface MethodCall {
    callerClass: string;
    callerMethod: string;
    targetClass: string;
    targetMethod: string;
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
        const selectedNames = this.walkClassConnections(
            className,
            graph,
            depth
        );

        const selectedClasses = classes.filter(
            item => selectedNames.has(item.name)
        );

        const methods = this.extractMethodNodes(selectedClasses);
        const callGraph = this.buildCallGraph(methods);
        const methodCalls = this.extractMethodCalls(methods, callGraph);

        const relevantMethods = new Map<string, Set<string>>();

        // A classe principal mantém todas as suas funções.
        const mainMethods = methods.filter(
            method => method.className === className
        );

        relevantMethods.set(
            className,
            new Set(mainMethods.map(method => method.name))
        );

        // Nas demais classes, mantém apenas métodos envolvidos
        // em chamadas diretas de/para métodos da classe principal.
        for (const call of methodCalls) {
            if (
                call.callerClass === className &&
                call.targetClass !== className
            ) {
                this.addRelevantMethod(
                    relevantMethods,
                    call.targetClass,
                    call.targetMethod
                );
            }

            if (
                call.targetClass === className &&
                call.callerClass !== className
            ) {
                this.addRelevantMethod(
                    relevantMethods,
                    call.callerClass,
                    call.callerMethod
                );
            }
        }

        return this.renderUml(
            selectedClasses,
            relevantMethods,
            className,
            methodCalls
        );
    }

    private addRelevantMethod(
        map: Map<string, Set<string>>,
        className: string,
        methodName: string
    ): void {
        if (!map.has(className)) {
            map.set(className, new Set<string>());
        }

        map.get(className)!.add(methodName);
    }

    private buildClassConnectionGraph(
        classes: MainClass[]
    ): Map<string, Set<string>> {
        const graph = new Map<string, Set<string>>();

        for (const item of classes) {
            graph.set(item.name, new Set<string>());
        }

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

            if (frontier.length === 0) {
                break;
            }
        }

        return visited;
    }

    private renderUml(
        classes: MainClass[],
        methodsByClass?: Map<string, Set<string>>,
        mainClassName?: string,
        methodCalls: MethodCall[] = []
    ): string {
        const output: string[] = [];
        output.push('# UML', '');

        const selectedNames = new Set(classes.map(item => item.name));

        for (const mainClass of classes) {
            const variables = this.extractVariables(mainClass.content);
            let functions = this.extractFunctions(mainClass.content);

            if (methodsByClass) {
                const allowed = methodsByClass.get(mainClass.name)
                    ?? new Set<string>();

                functions = functions.filter(func =>
                    allowed.has(func.name)
                );
            }

            const connections = this.findConnections(mainClass, classes);

            output.push(`**## ${mainClass.name}**`, '');
            output.push('Variaveis:');

            for (const variable of variables) {
                const symbol = variable.visibility === 'public' ? '+' : '-';

                output.push(
                    `  ${symbol} ${variable.name}: ${variable.type};`
                );
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

            // Inclui as chamadas identificadas para a classe principal
            // e para as classes conectadas a ela.
            if (mainClassName && selectedNames.has(mainClass.name)) {
                const relevantCalls = methodCalls.filter(call =>
                    (
                        call.callerClass === mainClass.name ||
                        call.targetClass === mainClass.name
                    ) &&
                    selectedNames.has(call.callerClass) &&
                    selectedNames.has(call.targetClass)
                );

                if (relevantCalls.length > 0) {
                    output.push('', 'Chamadas:');

                    for (const call of relevantCalls) {
                        output.push(
                            `  ${call.callerClass}.${call.callerMethod}() -> ` +
                            `${call.targetClass}.${call.targetMethod}()`
                        );
                    }
                }
            }

            output.push('');
        }

        return output.join('\n');
    }

    private extractBlocks(projectContext: string): CodeBlock[] {
        const blocks: CodeBlock[] = [];

        const regex =
            /===\s*(.*?)\s*===\s*\n([\s\S]*?)(?=\n===\s*.*?\s*===|\s*$)/g;

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
            const classRegex =
                /\b(class|struct|interface)\s+([A-Za-z_$][\w$]*)/g;

            let match: RegExpExecArray | null;

            while ((match = classRegex.exec(block.content)) !== null) {
                const className = match[2];

                const classBody = this.extractClassBody(
                    block.content,
                    match.index + match[0].length
                );

                if (classBody) {
                    classes.push({
                        name: className,
                        content: classBody
                    });
                }
            }
        }

        // Evita duplicatas de classes com o mesmo nome.
        const unique = new Map<string, MainClass>();

        for (const item of classes) {
            if (!unique.has(item.name)) {
                unique.set(item.name, item);
            }
        }

        return [...unique.values()];
    }

    private extractClassBody(
        content: string,
        startIndex: number
    ): string {
        const openingBrace = content.indexOf('{', startIndex);

        if (openingBrace === -1) {
            return '';
        }

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
                    declaration = declaration
                        .replace(/^private\s+/, '')
                        .trim();
                }

                if (/^public\s+/.test(declaration)) {
                    currentVisibility = 'public';
                    declaration = declaration
                        .replace(/^public\s+/, '')
                        .trim();
                }

                if (declaration.endsWith(';')) {
                    declaration = declaration.slice(0, -1).trim();

                    const withoutValue = declaration.split('=')[0].trim();

                    if (
                        !withoutValue.includes('(') &&
                        !withoutValue.includes(')')
                    ) {
                        const match = withoutValue.match(
                            /^(.+?)\s+([A-Za-z_$][\w$]*)$/
                        );

                        if (match) {
                            const type = match[1].trim();
                            const name = match[2].trim();

                            if (
                                ![
                                    'return',
                                    'if',
                                    'else',
                                    'for',
                                    'while',
                                    'switch'
                                ].includes(type)
                            ) {
                                variables.push({
                                    name,
                                    type,
                                    visibility: currentVisibility
                                });
                            }
                        }
                    }
                }
            }

            for (const character of line) {
                if (character === '{') braceDepth++;
                if (character === '}') {
                    braceDepth = Math.max(0, braceDepth - 1);
                }
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

                if (
                    match &&
                    ![
                        'if',
                        'for',
                        'foreach',
                        'while',
                        'switch',
                        'catch',
                        'using',
                        'lock'
                    ].includes(match[1])
                ) {
                    if (!functions.some(func => func.name === match[1])) {
                        functions.push({
                            name: match[1],
                            visibility: currentVisibility
                        });
                    }
                }
            }

            for (const character of line) {
                if (character === '{') braceDepth++;
                if (character === '}') {
                    braceDepth = Math.max(0, braceDepth - 1);
                }
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

                    while (
                        end + 1 < lines.length &&
                        !signature.includes('{') &&
                        !signature.endsWith(';') &&
                        end - i < 5
                    ) {
                        end++;
                        signature += ' ' +
                            lines[end].replace(/\/\/.*$/, '').trim();
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

                        const id =
                            `${mainClass.name}.${parsed.name}@${nodes.length}`;

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
                    if (ch === '}') {
                        depth = Math.max(0, depth - 1);
                    }
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

        const nameMatch = signature.match(
            /([A-Za-z_$][\w$]*)\s*\([\s\S]*\)\s*(?:where\s+[\w\s,:<>]+)?$/
        );

        if (!nameMatch) return null;

        const name = nameMatch[1];

        if (
            [
                'if',
                'for',
                'foreach',
                'while',
                'switch',
                'catch',
                'using',
                'lock',
                'nameof'
            ].includes(name)
        ) {
            return null;
        }

        const visibility = /^\s*public\b/.test(signature)
            ? 'public'
            : 'private';

        return { name, visibility };
    }

    private buildCallGraph(
        methods: MethodNode[]
    ): Map<string, Set<string>> {
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
                const callRegex = new RegExp(
                    `\\b${this.escapeRegex(name)}\\s*\\(`
                );

                if (!callRegex.test(caller.body)) continue;

                const sameClass = candidates.filter(
                    candidate => candidate.className === caller.className
                );

                const resolved = sameClass.length > 0
                    ? sameClass
                    : candidates;

                for (const callee of resolved) {
                    if (callee.id !== caller.id) {
                        graph.get(caller.id)!.add(callee.id);
                    }
                }
            }
        }

        return graph;
    }

    private extractMethodCalls(
        methods: MethodNode[],
        graph: Map<string, Set<string>>
    ): MethodCall[] {
        const byId = new Map(methods.map(method => [method.id, method]));
        const calls: MethodCall[] = [];
        const seen = new Set<string>();

        for (const [callerId, targets] of graph) {
            const caller = byId.get(callerId);
            if (!caller) continue;

            for (const targetId of targets) {
                const target = byId.get(targetId);
                if (!target) continue;

                const key = [
                    caller.className,
                    caller.name,
                    target.className,
                    target.name
                ].join('|');

                if (seen.has(key)) continue;
                seen.add(key);

                calls.push({
                    callerClass: caller.className,
                    callerMethod: caller.name,
                    targetClass: target.className,
                    targetMethod: target.name
                });
            }
        }

        return calls;
    }

    private findConnections(
        mainClass: MainClass,
        allClasses: MainClass[]
    ): string[] {
        const connections: string[] = [];

        for (const otherClass of allClasses) {
            if (otherClass.name === mainClass.name) continue;

            const regex = new RegExp(
                `\\b${this.escapeRegex(otherClass.name)}\\b`
            );

            if (regex.test(mainClass.content)) {
                connections.push(otherClass.name);
            }
        }

        return connections;
    }

    private escapeRegex(value: string): string {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

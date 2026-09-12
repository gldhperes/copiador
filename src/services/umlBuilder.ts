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

export class UmlBuilder {

    build(projectContext: string): string {

        const blocks = this.extractBlocks(
            projectContext
        );

        const classes = this.extractClasses(
            blocks
        );

        const output: string[] = [];

        output.push('# UML');
        output.push('');

        for (const mainClass of classes) {

            const variables =
                this.extractVariables(
                    mainClass.content
                );

            const functions =
                this.extractFunctions(
                    mainClass.content
                );

            const connections =
                this.findConnections(
                    mainClass,
                    classes
                );

            output.push(
                `**## ${mainClass.name}**`
            );

            output.push('');

            output.push('Variaveis:');

            for (const variable of variables) {

                const symbol =
                    variable.visibility === 'public'
                        ? '+'
                        : '-';

                output.push(
                    `  ${symbol} ${variable.name}: ${variable.type};`
                );
            }

            output.push('');

            output.push('Funções:');

            for (const func of functions) {

                const symbol =
                    func.visibility === 'public'
                        ? '+'
                        : '-';

                output.push(
                    `  ${symbol} ${func.name}()`
                );
            }

            output.push('');

            output.push('Conexões:');

            for (const connection of connections) {

                output.push(
                    `  ${connection},`
                );
            }

            output.push('');
        }

        return output.join('\n');
    }

    private extractBlocks(
        projectContext: string
    ): CodeBlock[] {

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

    private extractClasses(
        blocks: CodeBlock[]
    ): MainClass[] {

        const classes: MainClass[] = [];

        for (const block of blocks) {

            const classRegex =
                /\b(class|struct|interface)\s+([A-Za-z_$][\w$]*)/g;

            let match: RegExpExecArray | null;

            while (
                (match = classRegex.exec(block.content)) !== null
            ) {

                const className = match[2];

                const classBody =
                    this.extractClassBody(
                        block.content,
                        match.index + match[0].length
                    );

                classes.push({
                    name: className,
                    content: classBody
                });
            }
        }

        return classes;
    }

    private extractClassBody(
        content: string,
        startIndex: number
    ): string {

        const openingBrace =
            content.indexOf('{', startIndex);

        if (openingBrace === -1) {
            return '';
        }

        let depth = 0;

        for (
            let i = openingBrace;
            i < content.length;
            i++
        ) {

            const character = content[i];

            if (character === '{') {
                depth++;
            }

            if (character === '}') {
                depth--;

                if (depth === 0) {
                    return content.slice(
                        openingBrace + 1,
                        i
                    );
                }
            }
        }

        return content.slice(
            openingBrace + 1
        );
    }

    private extractVariables(
        classContent: string
    ): Variable[] {

        const variables: Variable[] = [];

        let visibility:
            'public' | 'private' = 'private';

        let braceDepth = 0;

        const lines =
            classContent.split(/\r?\n/);

        for (let line of lines) {

            line = line
                .replace(/\/\/.*$/, '')
                .trim();

            if (!line) {
                continue;
            }

            /*
             * Detecta modificadores de acesso.
             */
            if (/^public\s*:/.test(line)) {

                visibility = 'public';

                line = line
                    .replace(/^public\s*:\s*/, '')
                    .trim();

                if (!line) {
                    continue;
                }
            }

            if (/^private\s*:/.test(line)) {

                visibility = 'private';

                line = line
                    .replace(/^private\s*:\s*/, '')
                    .trim();

                if (!line) {
                    continue;
                }
            }

            /*
             * Variáveis só podem ser consideradas quando
             * estamos diretamente dentro da classe.
             */
            if (braceDepth === 0) {

                let declaration = line;

                let currentVisibility = visibility;

                /*
                 * Suporta:
                 *
                 * private Player player;
                 * public Weapon weapon;
                 */
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

                /*
                 * Só analisa declarações terminadas
                 * em ponto e vírgula.
                 */
                if (declaration.endsWith(';')) {

                    declaration =
                        declaration
                            .slice(0, -1)
                            .trim();

                    /*
                     * Remove inicialização.
                     *
                     * int x = 10;
                     *
                     * vira:
                     *
                     * int x
                     */
                    const withoutValue =
                        declaration
                            .split('=')[0]
                            .trim();

                    /*
                     * Ignora funções.
                     */
                    if (
                        !withoutValue.includes('(') &&
                        !withoutValue.includes(')')
                    ) {

                        const match =
                            withoutValue.match(
                                /^(.+?)\s+([A-Za-z_$][\w$]*)$/
                            );

                        if (match) {

                            const type =
                                match[1].trim();

                            const name =
                                match[2].trim();

                            if (
                                type !== 'return' &&
                                type !== 'if' &&
                                type !== 'else' &&
                                type !== 'for' &&
                                type !== 'while' &&
                                type !== 'switch'
                            ) {

                                variables.push({
                                    name,
                                    type,
                                    visibility:
                                        currentVisibility
                                });
                            }
                        }
                    }
                }
            }

            /*
             * Atualiza profundidade das chaves.
             */
            for (const character of line) {

                if (character === '{') {
                    braceDepth++;
                }

                if (character === '}') {
                    braceDepth--;

                    if (braceDepth < 0) {
                        braceDepth = 0;
                    }
                }
            }
        }

        return variables;
    }

    private extractFunctions(
        classContent: string
    ): FunctionInfo[] {

        const functions: FunctionInfo[] = [];

        let visibility:
            'public' | 'private' = 'private';

        let braceDepth = 0;

        const lines =
            classContent.split(/\r?\n/);

        for (let line of lines) {

            line = line
                .replace(/\/\/.*$/, '')
                .trim();

            if (!line) {
                continue;
            }

            /*
             * Detecta public:
             */
            if (/^public\s*:/.test(line)) {

                visibility = 'public';

                line = line
                    .replace(/^public\s*:\s*/, '')
                    .trim();

                if (!line) {
                    continue;
                }
            }

            /*
             * Detecta private:
             */
            if (/^private\s*:/.test(line)) {

                visibility = 'private';

                line = line
                    .replace(/^private\s*:\s*/, '')
                    .trim();

                if (!line) {
                    continue;
                }
            }

            /*
             * Só queremos funções diretamente
             * dentro da classe.
             */
            if (braceDepth === 0) {

                let declaration = line;

                let currentVisibility = visibility;

                /*
                 * Suporta:
                 *
                 * public void Spawn()
                 * private void Spawn()
                 */
                if (/^public\s+/.test(declaration)) {

                    currentVisibility = 'public';

                    declaration = declaration
                        .replace(/^public\s+/, '')
                        .trim();
                }

                if (/^private\s+/.test(declaration)) {

                    currentVisibility = 'private';

                    declaration = declaration
                        .replace(/^private\s+/, '')
                        .trim();
                }

                /*
                 * Procura funções.
                 *
                 * Exemplos:
                 *
                 * void Spawn()
                 * int GetValue()
                 * Spawn()
                 */
                const match =
                    declaration.match(
                        /(?:[\w:<>,\[\]&*]+\s+)?([A-Za-z_$][\w$]*)\s*\([^)]*\)/
                    );

                if (match) {

                    const name = match[1];

                    functions.push({
                        name,
                        visibility:
                            currentVisibility
                    });
                }
            }

            /*
             * Atualiza profundidade das chaves.
             */
            for (const character of line) {

                if (character === '{') {
                    braceDepth++;
                }

                if (character === '}') {
                    braceDepth--;

                    if (braceDepth < 0) {
                        braceDepth = 0;
                    }
                }
            }
        }

        return functions;
    }

    private findConnections(
        mainClass: MainClass,
        allClasses: MainClass[]
    ): string[] {

        const connections: string[] = [];

        for (const otherClass of allClasses) {

            if (
                otherClass.name === mainClass.name
            ) {
                continue;
            }

            const regex = new RegExp(
                `\\b${this.escapeRegex(otherClass.name)}\\b`
            );

            if (
                regex.test(mainClass.content)
            ) {
                connections.push(
                    otherClass.name
                );
            }
        }

        return connections;
    }

    private escapeRegex(
        value: string
    ): string {

        return value.replace(
            /[.*+?^${}()|[\]\\]/g,
            '\\$&'
        );
    }
}
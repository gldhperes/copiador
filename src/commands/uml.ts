import fs from 'fs/promises';
import path from 'path';

import { UmlBuilder } from '../services/umlBuilder';

export async function umlCommand() {
    const inputFile = path.join(
        process.cwd(),
        'project-context.md'
    );


    const outputFile = path.join(
        process.cwd(),
        'UML.md'
    );

    try {
        await fs.access(inputFile);
    } catch {
        console.error(
            '\n project-context.md não encontrado.'
        );

        console.error(
            'Execute "aicontext export" primeiro.'
        );

        return;
    }

    const content = await fs.readFile(
        inputFile,
        'utf8'
    );

    const builder = new UmlBuilder();

    const uml = builder.build(content);

    await fs.writeFile(
        outputFile,
        uml,
        'utf8'
    );

    console.log(
        '\n UML gerado com sucesso'
    );

    console.log(
        `Arquivo: ${outputFile} `
    );

}

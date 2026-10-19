import fs from 'fs/promises';
import path from 'path';
import fsSync from 'fs';

import { AppConfig } from '../config';
import { UmlBuilder } from '../services/umlBuilder';

export async function umlCommand() {
    const configPath = path.join(
        process.cwd(),
        'src',
        'config.json'
    );

    const inputFile = path.join(
        process.cwd(),
        'project-context.md'
    );

    const outputFile = path.join(
        process.cwd(),
        'UML.md'
    );

    try {
        const config = JSON.parse(
            fsSync.readFileSync(configPath, 'utf8')
        ) as AppConfig;

        const className =
            typeof config.className === 'string'
                ? config.className.trim()
                : '';

        const depthRaw = config.connectionDepth;
        const depthText = String(depthRaw ?? '').trim();

        // Modo completo: os dois campos estão vazios.
        if (!className && !depthText) {
            // válido; o builder gerará o UML completo.
        } else {
            // Os dois campos devem ser informados juntos.
            if (!className || !depthText) {
                throw new Error(
                    'Preencha className e connectionDepth juntos, ou deixe ambos vazios.'
                );
            }

            const depth = Number(depthText);

            if (!Number.isInteger(depth) || depth < 0) {
                throw new Error(
                    'connectionDepth deve ser um número inteiro maior ou igual a zero.'
                );
            }
        }

        await fs.access(inputFile);

        const content = await fs.readFile(inputFile, 'utf8');
        const builder = new UmlBuilder();

        const uml = builder.build(content, {
            className,
            connectionDepth: depthText ? Number(depthText) : undefined
        });

        // Só grava depois que toda a geração terminou sem erro.
        await fs.writeFile(outputFile, uml, 'utf8');

        console.log('\n UML gerado com sucesso');
        console.log(`Arquivo: ${outputFile}`);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : String(error);

        console.error(`\n Erro ao gerar UML: ${message}`);
        console.error('Geração cancelada. O UML.md existente não foi alterado.');
    }
}

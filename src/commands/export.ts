import fs from 'fs/promises';
import path from 'path';
import fsSync from 'fs';
import { AppConfig } from '../config';

import { ContextBuilder } from '../services/contextBuilder';

export async function exportCommand() {
    const configPath = path.join(
        process.cwd(),
        'src',
        'config.json'
    );

    const config: AppConfig =
        JSON.parse(
            fsSync.readFileSync(
                configPath,
                'utf8'
            )
        );

    const projectPath = config.path;

    const builder = new ContextBuilder();

    const content = await builder.build(projectPath, config.extensions);

    const outputFile = path.join(
        process.cwd(),
        'project-context.md'
    );

    await fs.writeFile(
        outputFile,
        content,
        'utf8'
    );

    const stats = await fs.stat(outputFile);

    console.log('\n Contexto gerado com sucesso');

    console.log(`Tamanho: ${(stats.size / 1024).toFixed(2)} KB`);
}
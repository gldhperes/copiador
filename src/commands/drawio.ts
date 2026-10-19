import fs from 'fs/promises';
import path from 'path';
import { DrawioBuilder } from '../services/drawioBuilder';

export async function drawioCommand() {
    const root = process.cwd();
    console.log("{root}", root)
    const inputFile = path.join(root, 'UML.md');
    const styleFile = path.join(root, 'src', 'configs', 'UML_DRAWIO_STYLE.md');
    const outputFile = path.join(root, 'UML.drawio');
    const tempFile = path.join(root, 'UML.drawio.tmp');

    try {
        await fs.access(inputFile);
        await fs.access(styleFile);

        const builder = new DrawioBuilder();
        const result = await builder.buildFromFiles(inputFile, styleFile);

        // Parse the generated XML before replacing the existing diagram.
        // This check catches malformed XML without requiring another dependency.
        if (!result.xml.startsWith('<?xml') || !result.xml.includes('<mxfile') || !result.xml.includes('</mxfile>')) {
            throw new Error('O XML gerado não passou pela validação estrutural.');
        }

        await fs.writeFile(tempFile, result.xml, 'utf8');
        await fs.rename(tempFile, outputFile);

        console.log('\n Diagrama Draw.io gerado com sucesso.');
        console.log(`Classes: ${result.classCount}`);
        console.log(`Conexões: ${result.connectionCount}`);
        console.log(`Arquivo: ${outputFile}`);
    } catch (error) {
        try {
            await fs.unlink(tempFile);
        } catch {
            // O arquivo temporário pode não existir.
        }

        const message = error instanceof Error ? error.message : String(error);
        console.error(`\n Erro ao gerar o Draw.io: ${message}`);
        console.error('O arquivo UML.drawio existente não foi substituído.');
        process.exitCode = 1;
    }
}

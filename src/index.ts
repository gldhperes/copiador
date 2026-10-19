import { Command } from 'commander';

import { exportCommand } from './commands/export';
import { umlCommand } from './commands/uml';
import { drawioCommand } from './commands/drawio';

const program = new Command();

program
    .name('aicontext')
    .version('1.0.0')
    .description('Gera contexto de projetos para IA');

program
    .command('export')
    .description('Gera o arquivo project-context.md')
    .action(exportCommand);

program
    .command('uml')
    .description('Gera o arquivo UML.md')
    .action(umlCommand);

program
    .command('drawio')
    .description('Converte UML.md em um arquivo editável UML.drawio')
    .action(drawioCommand);

program.parse();

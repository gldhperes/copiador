import {Command} from 'commander'

import {exportCommand} from './commands/export'

const program = new Command();

program
    .name('aicontext')
    .version('1.0.0')
    .description('Gera contexto de projetos para IA');

program
    .command('export')
    .description(
        'Gera o arquivo project-context.md'
    )
    .action(exportCommand);

program.parse();

/**
 *  @author Igibek Koishybayev
 *  @abstract Responsible for parsing the given arguments and generating the configuration object 
 */

const app = require('../package.json');
const banner =
"#         _     _           _     \n"+
"#   _____|_|___|_|___ ___ _| |___ \n"+
"#  |     | |   | |   | . | . | -_|\n"+
"#  |_|_|_|_|_|_|_|_|_|___|___|___|\n"+
"#                                 \n"+
"# Authors: Igibek Koishybayev, Alexandros Kapravelos\n"+
`# Version: ${app.version}`

const settings = require('./.settings.json');
const argv = require('yargs')
              .usage(`${banner} \n\nUsage: $0 <path> [options]`)
              .command('[path]', 'Full path to the application')
              .demandCommand(1)
              .option('destination', {
                alias: 'd',
                describe: 'Destination where reduced application will be saved',
                type: 'string'
              })
              .option('mode', {
                alias: 'm',
                describe: 'Reduction mode',
                choices: ['coarse', 'fine'],
                default: 'coarse'
              })
              .option('seeds', {
                type: 'array',
                describe: 'Seed files from where to start building the dependency graph. By default mininode will try to resolve the entry point of the application by reading the package.json file'
              })
              .epilog('Thank you for checking out the project')
              .argv;

settings.origin = argv._[0];

if (argv.destination) settings.destination = argv.destination;

settings.dryRun = argv.dryRun;
settings.skipReduction = argv.skipReduction;
settings.skipStat = argv.skipStat;
settings.verbose = argv.verbose;
settings.skipRemove = argv.skipRemove;
settings.silent = argv.silent;
settings.compressLog = argv.compressLog;
settings.logOutput = argv.logOutput ? argv.logOutput : settings.logOutput;

if (argv.seeds) {
  let seeds = argv.seeds.split(',');
  console.log('> seeds:', seeds);
  Array.prototype.push.apply(settings.seeds, seeds);
  settings.seeds = [...new Set(settings.seeds)];
}

if (argv.defaultAttackSurface) settings.default_attack_surface = argv.defaultAttackSurface;
if (argv.mode) {
  settings.mode = argv.mode;
}

module.exports = settings;

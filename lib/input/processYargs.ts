function processYargs(): Superluminal.Args {
  // eslint-disable-next-line
  const yargs = require('yargs');
  const { argv } = yargs
    .options({
      database: {
        describe: 'Database to introspect',
        default: 'postgres',
        alias: 'd',
        type: 'string',
      },
      host: {
        describe: 'Database host',
        default: 'localhost',
        alias: 'h',
        type: 'string',
      },
      port: {
        describe: 'port to run on',
        default: 5432,
        alias: 'p',
        type: 'number',
      },
      schemas: {
        describe: 'Schema(s) to introspect',
        default: 'public',
        alias: 's',
        type: 'string',
      },
      output: {
        describe: 'Relative directory to place the output',
        default: './ftl/entities',
        alias: 'o',
        type: 'string',
      },
    })
    .help();

  const { host, port, schemas, database, output } = argv;

  return {
    host,
    port,
    schemas,
    database,
    output,
  };
}

export default processYargs;

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
      'use-env': {
        describe: [
          'Use environment variables ',
          '(DB_HOST, DB_PORT, DB_NAME, DB_SCHEMAS)',
          'as defaults'].join('\s'),
        default: false,
        type: 'boolean',
      },
    })
    .help();

  const { host, port, schemas, database, output, useEnv } = argv;

  return {
    host: useEnv && process.env.DB_HOST ? process.env.DB_HOST : host,
    port: useEnv && process.env.DB_PORT ? 
      parseInt(process.env.DB_PORT, 10) : port,
    schemas: useEnv && process.env.DB_SCHEMAS ? 
      process.env.DB_SCHEMAS : schemas,
    database: useEnv && process.env.DB_NAME ? process.env.DB_NAME : database,
    output,
  };
}

export default processYargs;

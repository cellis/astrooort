## Astrooort (pg-graphql-typeorm without the graphql, typegraphql, just basic typeorm entities)

A PostgreSQL to TypeORM entity generator with intelligent caching for fast incremental builds.

### Usage

Basic usage:
```bash
oort -d my_database -s schema_1,schema_2,schema_n -o ./where/toput/entities
```

With connection options:
```bash
oort -h localhost -p 5432 -d my_database -s schema_1,schema_2 -o ./entities
```

### Environment Variables

Use the `--use-env` flag to read database connection settings from environment variables:

```bash
# With dotenv
dotenv -- oort --use-env -d my_database -s schema_1,schema_2 -o ./entities

# Or set variables directly
DB_HOST=localhost DB_PORT=5433 oort --use-env -d my_db -s public -o ./entities
```

Supported environment variables:
- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_NAME` - Database name (default: postgres)
- `DB_SCHEMAS` - Comma-separated schemas (default: public)

Example package.json script:
```json
"scripts": {
  "gen:entities": "dotenv -- oort --use-env -d my_database -s schema_1,schema_2 -o ./src/generated/entities"
}
```

### Caching & Performance

Astrooort uses SHA-256 hashing to detect table changes and only regenerates entities when necessary. This makes subsequent runs extremely fast:

- First run: Generates all entities
- Subsequent runs: Only regenerates changed entities
- Always maintains complete `index.ts` exports

The hash cache is stored in `entities.json` alongside your generated entities.

### Usage with prettier (optional)

```bash
oort -d my_database -s schema_1,schema_2,schema_n -o ./where/toput/entities && yarn typeorm:format
```

Note: `typeorm:format` is just package.json script with `prettier --write ./src/generated/entities/*.ts`

Complete example script:
```json
"scripts": {
  "build:entities": "oort -d my_database -s schema_1,schema_2,schema_n -o ./src/generated/entities && yarn typeorm:format"
}
```

### Todo

- [x] Allow configs. Loading configs works but haven't decided on to do with the configuration. E.g., exclude some tables from generation, or specific columns in a table or even some pattern type stuff.

Update in version 0.5.0 load config (.oortrc.js in root project) to decide whether to create relationships for a certain field of a model.


### Compatibility

TypeORM: 0.2.32

### Notes on development

This was originally called `superluminal`, but upon trying to publish i noticed that cool name was taken so i renamed. The `oort` command will stay though ;)
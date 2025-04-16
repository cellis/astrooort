## Astrooort (pg-graphql-typeorm without the graphql, typegraphql, just basic typeorm entities)

### Usage

```
yarn oort -d my_database -s schema_1,schema_2,schema_n -o ./where/toput/entities
```

### Usage with prettier (optional)

```
yarn oort -d my_database -s schema_1,schema_2,schema_n -o ./where/toput/entities && yarn typeorm:format
```

Note: `typeorm:format` is just package.json script with `prettier --write ./src/generated/entities/*.ts`

I like to add a script to my package.json:

```
"scripts": {
...
  "build:entities": "yarn oort -d my_database -s schema_1,schema_2,schema_n -o ./src/generated/entities && yarn typeorm:format"
}
```

### Todo

- [x] Allow configs. Loading configs works but haven't decided on to do with the configuration. E.g., exclude some tables from generation, or specific columns in a table or even some pattern type stuff.

Update in version 0.5.0 load config (.oortrc.js in root project) to decide whether to create relationships for a certain field of a model.


### Compatibility

TypeORM: 0.2.32

### Notes on development

This was originally called `superluminal`, but upon trying to publish i noticed that cool name was taken so i renamed. The `oort` command will stay though ;)
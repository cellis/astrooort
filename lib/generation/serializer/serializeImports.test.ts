import { Client } from 'pg';
import introspectDb from '../../introspection/introspectDb';
import connectTestDb from '../../test/connectTestDb';
import createModels from '../createModels';
import createRelationships from '../createRelationships';
import serializeImports from './serializeImports';

describe('serializeImports', () => {
  let client: Client;
  let User: Superluminal.Model;
  beforeAll(async (done) => {
    client = await connectTestDb();
    const introspection = await introspectDb(client, ['superluminal']);
    const models: Superluminal.Models = {};
    await createModels(models, introspection, { output: '.tmp' }, false);
    createRelationships(models, introspection, {
      manyToOnes: {},
      oneToManys: {},
    });

    User = models.user;
    done();
  });

  afterAll(() => {
    return client.end();
  });

  it('serializes the imports properly', () => {
    /* eslint-disable max-len */
    expect(serializeImports(User)).toMatchInlineSnapshot(`
      "import { BaseEntity, Column, Entity, Index } from 'typeorm';
      "
    `);
    /* eslint-enable max-len */
  });
});

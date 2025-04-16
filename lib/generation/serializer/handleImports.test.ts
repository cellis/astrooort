import { Client } from 'pg';
import introspectDb from '../../introspection/introspectDb';
import connectTestDb from '../../test/connectTestDb';
import createModels from '../createModels';
import createRelationships from '../createRelationships';
import handleImports from './handleImports';
/* eslint-disable @typescript-eslint/no-non-null-assertion */

describe('handleImports', () => {
  let client: Client;
  let User: Superluminal.Model;
  let Photo: Superluminal.Model;
  let Message: Superluminal.Model;
  let Document: Superluminal.Model;
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
    Photo = models.photo;
    Message = models.message;
    Document = models.document;
    done();
  });

  afterAll(() => {
    return client.end();
  });

  describe('top level imports', () => {
    // should add top level imports first
    it('does not add self-referential imports', () => {
      const imp0rts = handleImports(Message);

      const selfImports = Object.keys(imp0rts)
        .filter((key) => {
          return !imp0rts[key].isModule;
        })
        .sort();

      expect(selfImports).not.toContain('message');
    });

    it('adds top level imports at the top of the import', () => {
      const imp0rts = handleImports(User);

      const topLevelImports = Object.keys(imp0rts)
        .filter((key) => {
          return imp0rts[key].isModule;
        })
        .sort();
      const expected = ['typeorm'];

      expect(topLevelImports).toEqual(expect.arrayContaining(expected));
    });
  });
});

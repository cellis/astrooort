import { resolve } from 'path';
import loadConfig from './loadConfig';
// eslint-disable-next-line
const mockFtljs = require('../test/fixtures/files/javascriptConfig');

describe('loadConfig', () => {
  // loads the config from ftljs
  describe('js config', () => {
    beforeEach(() => {
      jest.mock(resolve(process.cwd(), '.oortrc.ts'), () => undefined);
      jest.mock(resolve(process.cwd(), '.oortrc.js'), () => mockFtljs, {
        virtual: true,
      });
    });
    it('loads the Javascript config from .oortrc.js', async () => {
      const actualFtlJsRc = mockFtljs();
      const loadedFtlJSRc = await loadConfig();
      expect(loadedFtlJSRc).toEqual(actualFtlJsRc);
    });
    afterAll(() => {
      jest.unmock(resolve(process.cwd(), '.oortrc.ts'));
      jest.unmock(resolve(process.cwd(), '.oortrc.js'));
    });
  });
});

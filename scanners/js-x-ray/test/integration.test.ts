import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  {afterAll, beforeAll, describe, expect, jest, test},
  scanner,
  process,
  'nodejs',
  {
    scanner: '@continuous-security/scanner-js-x-ray',
    counts: {
      critical: 0,
      high: 0,
      info: 0,
      low: 0,
      moderate: 1,
      total: 1,
      unknown: 0,
    },
    issues: expect.arrayContaining([
      {
        title: 'Unsafe Regex',
        description: 'A RegEx as been detected as unsafe and may be used for a ReDoS Attack.',
        fix: 'unknown',
        severity: 'moderate',
        type: 'code smell',
        extracts: expect.arrayContaining([
          {
            path: 'node_modules/squirrelly/dist/browser/squirrelly.dev.js',
            lines: ['141'],
            language: 'javascript',
            code: '  var singleQuoteReg = /\'(?:\\\\[\\s\\w"\'\\\\`]|[^\\n\\r\'\\\\])*?\'/g;\r',
          },
          {
            path: 'node_modules/squirrelly/dist/squirrelly.cjs.js',
            lines: ['167'],
            language: 'javascript',
            code: 'var singleQuoteReg = /\'(?:\\\\[\\s\\w"\'\\\\`]|[^\\n\\r\'\\\\])*?\'/g;\r',
          },
          {
            path: 'node_modules/squirrelly/dist/squirrelly.es.js',
            lines: ['163'],
            language: 'javascript',
            code: 'var singleQuoteReg = /\'(?:\\\\[\\s\\w"\'\\\\`]|[^\\n\\r\'\\\\])*?\'/g;\r',
          },
        ]),
      },
    ]),
  },
);

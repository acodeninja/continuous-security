import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  {afterAll, beforeAll, describe, expect, jest, test},
  scanner,
  process,
  'python',
  {
    scanner: '@continuous-security/scanner-python-bandit',
    issues: expect.arrayContaining([
      {
        title: 'Try, Except, Pass detected.',
        severity: 'low',
        description: '',
        references: ['CWE-703'],
        type: 'code smell',
        fix: 'unknown',
        extracts: [
          {
            path: 'main.py',
            lines: ['4', '5'],
            language: 'python',
            code: '    print(\'thing\')\n  except:\n    pass',
          },
        ],
      },
      {
        title: 'Possible hardcoded password: \'password\'',
        severity: 'low',
        description: '',
        references: ['CWE-259'],
        type: 'code smell',
        fix: 'unknown',
        extracts: [
          {
            path: 'main.py',
            lines: ['8'],
            language: 'python',
            code: 'def login(username, password):\n  if password == \'password\':\n    return True',
          },
        ],
      },
    ]),
  },
);

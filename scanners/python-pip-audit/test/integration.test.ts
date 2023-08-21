import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  scanner,
  process,
  'python',
  {
    scanner: '@continuous-security/scanner-python-pip-audit',
    issues: expect.arrayContaining([{
      title: 'Vulnerable Third-Party Library `cairosvg`',
      severity: 'unknown',
      description: '',
      type: 'dependency',
      fix: 'unknown',
      package: {
        name: 'cairosvg',
        version: '2.6.0',
      },
      references: ['PYSEC-2023-9'],
    }]),
  },
);

setupIntegrationTests(
  scanner,
  process,
  'python-poetry',
  {
    scanner: '@continuous-security/scanner-python-pip-audit',
    issues: expect.arrayContaining([{
      title: 'Vulnerable Third-Party Library `cairosvg`',
      severity: 'unknown',
      description: '',
      type: 'dependency',
      fix: 'unknown',
      package: {
        name: 'cairosvg',
        version: '2.6.0',
      },
      references: ['PYSEC-2023-9'],
    }]),
  },
);

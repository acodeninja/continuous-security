import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  {afterAll, beforeAll, describe, expect, jest, test},
  scanner,
  process,
  'ruby',
  {
    issues: [
      {
        description: '## Description\n\nApplications should not execute OS commands that are formed from user input.\nThis rule checks for external commands containing user-supplied data.\n\n## Remediations\n\n❌ Avoid using user input when executing commands:\n\n```ruby\nsystem(params[:command])\n```\n\n✅ Use user input indirectly when executing commands:\n\n```ruby\ncommand =\n  case params[:action]\n  when "option1"\n    "command1"\n  when "option2"\n    "command2"\n  end\n\nsystem(command)\n```\n\n## Resources\n- [OWASP Ruby command injection cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Ruby_on_Rails_Cheat_Sheet.html#command-injection)\n- [OWASP OS command injection cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html)\n',
        fix: 'unknown',
        references: ['CWE-78'],
        severity: 'high',
        title: 'Execution of OS command formed with user input detected.',
        type: 'code smell',
        extracts: [{
          lines: ['4', '4'],
          path: '/app.rb',
          language: 'ruby',
        }],
      },
    ],
    scanner: '@continuous-security/scanner-bearer',
  },
);

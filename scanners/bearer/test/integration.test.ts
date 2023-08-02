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
          path: 'app.rb',
          language: 'ruby',
        }],
      },
    ],
    scanner: '@continuous-security/scanner-bearer',
  },
);

setupIntegrationTests(
  {afterAll, beforeAll, describe, expect, jest, test},
  scanner,
  process,
  'javascript',
  {
    issues: [
      {
        description: '## Description\nSending unsanitized user input in a response puts your application at risk of cross-site scripting attacks.\n\n\n## Remediations\n❌ Avoid including user input directly in a response:\n\n```javascript\nres.send(req.body.data)\n```\n\n## Resources\n- [OWASP Cross-Site Scripting (XSS) Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)\n',
        extracts: [
          {
            language: 'javascript',
            lines: [
              '90',
              '90',
            ],
            path: 'app.js',
          },
        ],
        fix: 'unknown',
        references: [
          'CWE-79',
        ],
        severity: 'high',
        title: 'Cross-site scripting (XSS) vulnerability detected.',
        type: 'code smell',
      },
      {
        description: '## Description\n\nApplications should not include unsanitized user input in HTML. This\ncan allow cross-site scripting (XSS) attacks.\n\n## Remediations\n\n❌ Avoid including user input directly in HTML strings:\n\n```javascript\nconst html = `<h1>${req.params.title}</h1>`\n```\n\n✅ Use a framework or templating language to construct the HTML.\n\n✅ When HTML strings must be used, sanitize user input:\n\n```javascript\nimport sanitizeHtml from \'sanitize-html\'\n\nconst sanitizedTitle = sanitizeHtml(req.params.title)\nconst html = `<h1>${sanitizedTitle}</h1>`\n```\n\n## Resources\n- [OWASP Cross-Site Scripting (XSS) Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)\n',
        extracts: [
          {
            language: 'javascript',
            lines: [
              '90',
              '90',
            ],
            path: 'app.js',
          },
        ],
        fix: 'unknown',
        references: [
          'CWE-79',
        ],
        severity: 'high',
        title: 'Unsanitized user input detected in raw HTML string.',
        type: 'code smell',
      },
      {
        // eslint-disable-next-line no-useless-escape
        description: '## Description\n\nHelmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.\n\n## Remediations\n\n✅ Use Helmet middleware\n\n```javascript\nconst helmet = require(\"helmet\")\napp.use(helmet())\n```\n\n## Resources\n\n- [Express Security Best Practices: Use Helmet](https://expressjs.com/en/advanced/best-practice-security.html#use-helmet)\n',
        extracts: [
          {
            language: 'javascript',
            lines: [
              '16',
              '16',
            ],
            path: 'app.js',
          },
        ],
        fix: 'unknown',
        references: [
          'CWE-693',
        ],
        severity: 'low',
        title: 'Security misconfiguration detected (Helmet missing).',
        type: 'code smell',
      },
      {
        description: '## Description\n\nIt can help to provide an extra layer of security to reduce server fingerprinting. Though not a security issue itself, a method to improve the overall posture of a web server is to take measures to reduce the ability to fingerprint the software being used on the server. Server software can be fingerprinted by quirks in how they respond to specific requests.\n\nBy default, Express.js sends the X-Powered-By response header banner. This can be disabled using the app.disable() method:\n\n```\n  app.disable(\'x-powered-by\')\n```\n\n## Resources\n\n- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)\n',
        extracts: [
          {
            language: 'javascript',
            lines: [
              '16',
              '16',
            ],
            path: 'app.js',
          },
        ],
        fix: 'unknown',
        references: [
          'CWE-693',
        ],
        severity: 'low',
        title: 'Security misconfiguration detected (server fingerprinting).',
        type: 'code smell',
      },
    ],
    scanner: '@continuous-security/scanner-bearer',
  },
);

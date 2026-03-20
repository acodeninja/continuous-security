import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  scanner,
  process,
  'ruby',
  {
    issues: expect.arrayContaining([
      {
        description: '## Description\n\nExecuting OS commands with user input can lead to command injection attacks. This vulnerability occurs when an application dynamically generates a command to the operating system using data supplied by the user without proper sanitization.\n\n## Remediations\n\n- **Do not** directly use user input to form OS commands. This can allow attackers to execute arbitrary commands.\n  ```ruby\n  system(params[:command]) # unsafe\n  ```\n- **Do** validate or sanitize user input before using it in OS commands. Prefer using static command strings where possible.\n- **Do** use indirect methods for incorporating user input into commands, such as selecting from predefined options.\n  ```ruby\n  command =\n    case params[:action]\n    when "option1"\n      "command1"\n    when "option2"\n      "command2"\n    end\n\n  system(command)\n  ```\n\n## References\n\n- [OWASP Ruby command injection cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Ruby_on_Rails_Cheat_Sheet.html#command-injection)\n- [OWASP OS command injection cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html)',
        fix: 'unknown',
        references: ['CWE-78'],
        severity: 'critical',
        title: 'Unsanitized user input in OS command',
        type: 'code smell',
        extracts: [{
          lines: ['4', '4'],
          path: 'app.rb',
          language: 'ruby',
        }],
      },
    ]),
    scanner: '@continuous-security/scanner-bearer',
  },
);

setupIntegrationTests(
  scanner,
  process,
  'javascript',
  {
    issues: expect.arrayContaining([
      {
        description: '## Description\n\nIncluding unsanitized user input in HTTP responses exposes your application to cross-site scripting (XSS) attacks. This vulnerability allows attackers to inject malicious scripts into web pages viewed by other users.\n\n## Remediations\n\n- **Do not** include user input directly in a response. This practice can lead to XSS vulnerabilities.\n  ```javascript\n  res.send(req.body.data); // unsafe\n  ```\n- **Do** sanitize user input before including it in a response. Use library functions or frameworks designed for input sanitization to ensure that user data cannot be interpreted as executable code.\n\n## References\n\n- [OWASP Cross-Site Scripting (XSS) Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)',
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
        title: 'Unsanitized user input in HTTP response (XSS)',
        type: 'code smell',
      },
      {
        description: '## Description\n\nIncluding unsanitized user input in HTML exposes your application to cross-site scripting (XSS) attacks. This vulnerability allows attackers to inject malicious scripts into web pages viewed by other users.\n\n## Remediations\n\n- **Do not** include user input directly in HTML strings. This practice can lead to XSS vulnerabilities.\n  ```javascript\n  const html = `<h1>${req.params.title}</h1>` // unsafe\n  ```\n- **Do** use a framework or templating language that automatically handles the encoding and sanitization of user input when constructing HTML. This approach minimizes the risk of XSS attacks.\n- **Do** sanitize user input if you must use HTML strings directly. Utilize libraries designed for input sanitization to ensure that user input does not contain malicious content.\n  ```javascript\n  import sanitizeHtml from \'sanitize-html\'\n\n  const sanitizedTitle = sanitizeHtml(req.params.title)\n  const html = `<h1>${sanitizedTitle}</h1>`\n  ```\n\n## References\n\n- [OWASP Cross-Site Scripting (XSS) Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)',
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
        title: 'Unsanitized user input in raw HTML strings (XSS)',
        type: 'code smell',
      },
      {
        description: '## Description\n\nHelmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately. Failing to configure Helmet for HTTP headers leaves your application vulnerable to several web attacks.\n\n## Remediations\n\n- **Do** use Helmet middleware to secure your app by adding it to your application\'s middleware.\n  ```javascript\n  const helmet = require("helmet");\n  app.use(helmet());\n  ```\n\n## References\n\n- [Express Security Best Practices: Use Helmet](https://expressjs.com/en/advanced/best-practice-security.html#use-helmet)',
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
        severity: 'medium',
        title: 'Missing Helmet configuration on HTTP headers',
        type: 'code smell',
      },
      {
        description: '## Description\n\nReducing server fingerprinting enhances security by making it harder for attackers to identify the software your server is running. Server fingerprinting involves analyzing the unique responses of server software to specific requests, which can reveal information about the server\'s software and version. While not a direct security vulnerability, minimizing this information leakage is a proactive step to obscure details that could be used in targeted attacks.\n\n## Remediations\n\n- **Do** disable the `X-Powered-By` header in Express.js applications to prevent revealing the server\'s technology stack. Use the `app.disable()` method to achieve this.\n  ```javascript\n  app.disable(\'x-powered-by\');\n  ```\n\n## References\n\n- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)',
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
        severity: 'medium',
        title: 'Missing server configuration to reduce server fingerprinting',
        type: 'code smell',
      },
    ]),
    scanner: '@continuous-security/scanner-bearer',
  },
);

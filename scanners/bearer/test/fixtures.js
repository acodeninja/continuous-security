module.exports = {
  rubyBundleAuditReport: Buffer.from(JSON.stringify({
    high: [
      {
        cwe_ids: [
          '78',
        ],
        id: 'ruby_lang_exec_using_user_input',
        title: 'Execution of OS command formed with user input detected.',
        description: 'Execution of OS command formed with user input detected.',
        documentation_url: 'https://docs.bearer.com/reference/rules/ruby_lang_exec_using_user_input',
        line_number: 4,
        full_filename: '/target/app.rb',
        filename: 'app.rb',
        source: {
          start: 4,
          end: 4,
          column: {
            start: 3,
            end: 32,
          },
        },
        sink: {
          start: 4,
          end: 4,
          column: {
            start: 3,
            end: 32,
          },
          content: 'system "#{params[\'command\']}"',
        },
        parent_line_number: 4,
        snippet: 'system "#{params[\'command\']}"',
        fingerprint: 'a3e4e6831ec4c0dc6389009943f86177_0',
        old_fingerprint: '5e2400b75a93877d06b978c8ab7ec53d_0',
        code_extract: '  system "#{params[\'command\']}"',
      },
    ],
  },
  )),
};

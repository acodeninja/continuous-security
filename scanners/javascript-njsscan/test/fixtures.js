module.exports = {
  njsscanReport: Buffer.from(JSON.stringify({
    errors: [],
    njsscan_version: '0.3.4',
    nodejs: {
      node_md5: {
        files: [
          {
            file_path: '/target/main.js',
            match_lines: [
              2,
              3,
            ],
            match_position: [
              1,
              21,
            ],
            match_string: 'require("crypto")\n  .createHash("md5")',
          },
        ],
        metadata: {
          cwe: 'CWE-327: Use of a Broken or Risky Cryptographic Algorithm',
          description: 'MD5 is a a weak hash which is known to have collision. Use a strong hashing function.',
          'owasp-web': 'A9: Using Components with Known Vulnerabilities',
          severity: 'WARNING',
        },
      },
    },
    templates: {},
  })),
};

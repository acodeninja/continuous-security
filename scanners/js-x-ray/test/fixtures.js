module.exports = {
  jsXRayReport: Buffer.from(JSON.stringify({
    issues: [
      {
        title: 'Unsafe Regex',
        severity: 'moderate',
        description: 'A RegEx as been detected as unsafe and may be used for a ReDoS Attack.',
        extracts: [
          {
            path: 'node_modules/squirrelly/dist/browser/squirrelly.dev.js',
            lines: ['141'],
            code: '`(?:\\\\[\\s\\S]|\\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})*}|(?!\\${)[^\\\\`])*`',
          },
          {
            path: 'node_modules/squirrelly/dist/squirrelly.cjs.js',
            lines: ['167'],
            code: '`(?:\\\\[\\s\\S]|\\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})*}|(?!\\${)[^\\\\`])*`',
          },
          {
            path: 'node_modules/squirrelly/dist/squirrelly.es.js',
            lines: ['163'],
            code: '`(?:\\\\[\\s\\S]|\\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})*}|(?!\\${)[^\\\\`])*`',
          },
        ],
      },
    ],
  })),
};

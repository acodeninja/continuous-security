module.exports = {
  jsXRayReport: Buffer.from(JSON.stringify({
    issues: [
      {
        title: 'Unsafe Regex',
        severity: 'moderate',
        description: 'A RegEx as been detected as unsafe and may be used for a ReDoS Attack.',
        extracts: [
          {
            path: "node_modules/squirrelly/dist/browser/squirrelly.dev.js",
            lines: ["141"],
            language: "javascript",
            code: "  var singleQuoteReg = /'(?:\\\\[\\s\\w\"'\\\\`]|[^\\n\\r'\\\\])*?'/g;\r"
          },
          {
            path: "node_modules/squirrelly/dist/squirrelly.cjs.js",
            lines: ["167"],
            language: "javascript",
            code: "var singleQuoteReg = /'(?:\\\\[\\s\\w\"'\\\\`]|[^\\n\\r'\\\\])*?'/g;\r"
          },
          {
            path: "node_modules/squirrelly/dist/squirrelly.es.js",
            lines: ["163"],
            language: "javascript",
            code: "var singleQuoteReg = /'(?:\\\\[\\s\\w\"'\\\\`]|[^\\n\\r'\\\\])*?'/g;\r"
          }
        ],
      },
    ],
  })),
};

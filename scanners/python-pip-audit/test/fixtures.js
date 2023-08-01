module.exports = {
  pythonPipAuditReport: Buffer.from(JSON.stringify({
    dependencies: [
      {
        name: 'cairosvg',
        version: '2.6.0',
        vulns: [
          {
            id: 'GHSA-rwmf-w63j-p7gv',
            fix_versions: [
              '2.7.0',
            ],
            description: '# SSRF vulnerability  ## Summary When CairoSVG processes an SVG file, it can make requests to the inner host and different outside hosts.',
          },
        ],
      },
      {
        name: 'cairocffi',
        version: '1.5.1',
        vulns: [],
      },
      {
        name: 'cssselect2',
        version: '0.7.0',
        vulns: [],
      },
      {
        name: 'defusedxml',
        version: '0.7.1',
        vulns: [],
      },
      {
        name: 'pillow',
        version: '9.5.0',
        vulns: [],
      },
      {
        name: 'tinycss2',
        version: '1.2.1',
        vulns: [],
      },
      {
        name: 'cffi',
        version: '1.15.1',
        vulns: [],
      },
      {
        name: 'webencodings',
        version: '0.5.1',
        vulns: [],
      },
      {
        name: 'pycparser',
        version: '2.21',
        vulns: [],
      },
    ],
    fixes: [],
  })),
};

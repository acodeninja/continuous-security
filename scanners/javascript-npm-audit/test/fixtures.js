const npmAuditReport = {
  auditReportVersion: 2,
  vulnerabilities: {
    sane: {
      name: 'sane',
      severity: 'moderate',
      isDirect: false,
      via: [
        'execa',
      ],
      effects: [
        'jest-haste-map',
      ],
      range: '3.1.0 - 4.1.0',
      nodes: [
        'node_modules/sane',
      ],
      fixAvailable: {
        name: 'jest',
        version: '25.0.0',
        isSemVerMajor: true,
      },
    },
    semver: {
      name: 'semver',
      severity: 'moderate',
      isDirect: false,
      via: [
        {
          source: 1092310,
          name: 'semver',
          dependency: 'semver',
          title: 'semver vulnerable to Regular Expression Denial of Service',
          url: 'https://github.com/advisories/GHSA-c2qf-rxjj-qqgw',
          severity: 'moderate',
          cwe: [
            'CWE-1333',
          ],
          cvss: {
            score: 5.3,
            vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L',
          },
          range: '<7.5.2',
        },
      ],
      effects: [
        '@babel/core',
        '@babel/helper-compilation-targets',
        'cross-spawn',
        'istanbul-lib-instrument',
        'make-dir',
        'normalize-package-data',
      ],
      range: '<7.5.2',
      nodes: [
        'node_modules/normalize-package-data/node_modules/semver',
        'node_modules/sane/node_modules/semver',
        'node_modules/semver',
      ],
      fixAvailable: {
        name: 'jest',
        version: '25.0.0',
        isSemVerMajor: true,
      },
    },
    squirrelly: {
      name: 'squirrelly',
      severity: 'high',
      isDirect: true,
      via: [
        {
          source: 1089787,
          name: 'squirrelly',
          dependency: 'squirrelly',
          title: 'Insecure template handling in Squirrelly',
          url: 'https://github.com/advisories/GHSA-q8j6-pwqx-pm96',
          severity: 'high',
          cwe: [
            'CWE-200',
          ],
          cvss: {
            score: 8,
            vectorString: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:C/C:H/I:H/A:N',
          },
          range: '<=8.0.8',
        },
      ],
      effects: [],
      range: '*',
      nodes: [
        'node_modules/squirrelly',
      ],
      fixAvailable: false,
    },
  },
  metadata: {
    vulnerabilities: {
      info: 0,
      low: 0,
      moderate: 0,
      high: 1,
      critical: 0,
      total: 1,
    },
    dependencies: {
      prod: 3,
      dev: 0,
      optional: 0,
      peer: 0,
      peerOptional: 0,
      total: 2,
    },
  },
};

module.exports = {
  npmAuditNoFix: Buffer.from(JSON.stringify(npmAuditReport)),
  npmAuditWithFix: Buffer.from(JSON.stringify({
    ...npmAuditReport,
    vulnerabilities: {
      ...npmAuditReport.vulnerabilities,
      squirrelly: {
        ...npmAuditReport.vulnerabilities.squirrelly,
        fixAvailable: true,
      },
    },
  })),
};

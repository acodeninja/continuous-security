const npmAuditReport = {
  auditReportVersion: 2,
  vulnerabilities: {
    squirrelly: {
      name: "squirrelly",
      severity: "high",
      isDirect: true,
      via: [
        {
          source: 1089787,
          name: "squirrelly",
          dependency: "squirrelly",
          title: "Insecure template handling in Squirrelly",
          url: "https://github.com/advisories/GHSA-q8j6-pwqx-pm96",
          severity: "high",
          cwe: [
            "CWE-200"
          ],
          cvss: {
            score: 8,
            vectorString: "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:C/C:H/I:H/A:N"
          },
          range: "<=8.0.8"
        }
      ],
      effects: [],
      range: "*",
      nodes: [
        "node_modules/squirrelly"
      ],
      fixAvailable: false
    }
  },
  metadata: {
    vulnerabilities: {
      info: 0,
      low: 0,
      moderate: 0,
      high: 1,
      critical: 0,
      total: 1
    },
    dependencies: {
      prod: 3,
      dev: 0,
      optional: 0,
      peer: 0,
      peerOptional: 0,
      total: 2
    }
  }
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
      }
    }
  }))
};

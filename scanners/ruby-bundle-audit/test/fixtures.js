module.exports = {
  rubyBundleAuditReport: Buffer.from(JSON.stringify({
    issues: [
      {
        Name: 'ruby-saml',
        Version: '0.9.2',
        CVE: 'CVE-2015-20108',
        GHSA: 'GHSA-r364-2pj4-pf7f',
        Criticality: 'Critical',
        URL: 'https://security.snyk.io/vuln/SNYK-RUBY-RUBYSAML-20217',
        Title: 'ruby-saml gem is vulnerable to XPath injection',
        Solution: 'upgrade to \'>= 1.0.0\'',
      },
      {
        Name: 'ruby-saml',
        Version: '0.9.2',
        CVE: 'CVE-2016-5697',
        GHSA: 'GHSA-36p7-xjw8-h6f2',
        Criticality: 'High',
        URL: 'https://github.com/onelogin/ruby-saml/commit/a571f52171e6bfd87db59822d1d9e8c38fb3b995',
        Title: 'XML signature wrapping attack',
        Solution: 'upgrade to \'>= 1.3.0\'',
      },
      {
        Name: 'ruby-saml',
        Version: '0.9.2',
        CVE: 'CVE-2017-11428',
        GHSA: 'GHSA-x2fr-v8wf-8wwv',
        Criticality: 'High',
        URL: 'https://github.com/onelogin/ruby-saml/commit/048a544730930f86e46804387a6b6fad50d8176f',
        Title: 'Authentication bypass via incorrect XML canonicalization and DOM traversal',
        Solution: 'upgrade to \'>= 1.7.0\'',
      },
      {
        Name: 'ruby-saml',
        Version: '0.9.2',
        Criticality: 'Low',
        URL: 'https://github.com/SAML-Toolkits/ruby-saml/releases/tag/v1.0.0',
        Title: 'Ruby-Saml Gem is vulnerable to entity expansion attacks',
        Solution: 'upgrade to \'>= 1.0.0\'',
      },
    ],
  })),
};

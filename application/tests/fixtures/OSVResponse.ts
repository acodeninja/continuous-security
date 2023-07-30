export const Github = {
  id: 'GHSA-pjpc-87mp-4332',
  summary: 'Cross-site Scripting vulnerability in Mautic\'s tracking pixel functionality',
  details: '### Impact\n\nMautic allows you to track open rates by using tracking pixels. \nThe tracking information is stored together with extra metadata of the tracking request.\n\nThe output isn\'t sufficiently filtered when showing the metadata of the tracking information, which may lead to a vulnerable situation.\n\n### Patches\n\nPlease upgrade to 4.3.0\n\n### Workarounds\nNone.\n\n### References\n* Internally tracked under MST-38\n\n### For more information\nIf you have any questions or comments about this advisory:\n* Email us at [security@mautic.org](mailto:security@mautic.org)\n',
  aliases: [
    'CVE-2022-25772'
  ],
  modified: '2023-05-10T00:50:18.351189Z',
  published: '2022-05-25T22:36:33Z',
  database_specific: {
    github_reviewed_at: '2022-05-25T22:36:33Z',
    github_reviewed: true,
    severity: 'CRITICAL',
    cwe_ids: [
      'CWE-248'
    ],
    nvd_published_at: '2022-06-20T13:15:00Z'
  },
  references: [
    {
      type: 'WEB',
      url: 'https://github.com/mautic/mautic/security/advisories/GHSA-pjpc-87mp-4332'
    },
    {
      type: 'ADVISORY',
      url: 'https://nvd.nist.gov/vuln/detail/CVE-2022-25772'
    },
    {
      type: 'WEB',
      url: 'https://github.com/mautic/mautic/commit/462eb596027fd949efbf9ac5cb2b376805e9d246'
    },
    {
      type: 'PACKAGE',
      url: 'https://github.com/mautic/mautic'
    },
    {
      type: 'WEB',
      url: 'https://www.intel.com/content/www/us/en/security-center/advisory/intel-sa-00847.html'
    }
  ],
  affected: [
    {
      package: {
        name: 'mautic/core',
        ecosystem: 'Packagist',
        purl: 'pkg:composer/mautic/core'
      },
      ranges: [
        {
          type: 'ECOSYSTEM',
          events: [
            {
              introduced: '0'
            },
            {
              fixed: '4.3.0'
            }
          ]
        }
      ],
      versions: [
        '1.0.0',
        '1.0.0-beta',
        '1.0.0-beta2',
        '1.0.0-beta3',
        '1.0.0-beta4',
        '1.0.0-rc1',
        '1.0.0-rc2',
        '1.0.0-rc3',
        '1.0.0-rc4',
        '1.0.1',
        '1.0.2',
        '1.0.3',
        '1.0.4',
        '1.0.5',
        '1.1.0',
        '1.1.1',
        '1.1.2',
        '1.1.3',
        '1.2.0',
        '1.2.0-beta1',
        '1.2.1',
        '1.2.2',
        '1.2.3',
        '1.2.4',
        '1.3.0',
        '1.3.1',
        '1.4.0',
        '1.4.1',
        '2.0.0',
        '2.0.1',
        '2.1.0',
        '2.1.1',
        '2.10.0',
        '2.10.0-beta',
        '2.10.1',
        '2.11.0',
        '2.11.0-beta',
        '2.12.0',
        '2.12.0-beta',
        '2.12.1',
        '2.12.1-beta',
        '2.12.2',
        '2.12.2-beta',
        '2.13.0',
        '2.13.0-beta',
        '2.13.1',
        '2.14.0',
        '2.14.0-beta',
        '2.14.1',
        '2.14.1-beta',
        '2.14.2',
        '2.14.2-beta',
        '2.15.0',
        '2.15.0-beta',
        '2.15.1',
        '2.15.1-beta',
        '2.15.2',
        '2.15.2-beta',
        '2.15.3',
        '2.15.3-beta',
        '2.16.0',
        '2.16.0-beta',
        '2.16.1',
        '2.16.1-beta',
        '2.16.2',
        '2.16.2-beta',
        '2.16.3',
        '2.16.3-beta',
        '2.16.4',
        '2.16.5',
        '2.2.0',
        '2.2.1',
        '2.3.0',
        '2.4.0',
        '2.5.0',
        '2.5.1',
        '2.6.0',
        '2.6.1',
        '2.7.0',
        '2.7.1',
        '2.8.0',
        '2.8.1',
        '2.8.2',
        '2.9.0',
        '2.9.0-beta',
        '2.9.1',
        '2.9.2',
        '3.0.0',
        '3.0.0-alpha',
        '3.0.0-beta',
        '3.0.0-beta2',
        '3.0.1',
        '3.0.2',
        '3.0.2-rc',
        '3.1.0',
        '3.1.0-rc',
        '3.1.1',
        '3.1.1-rc',
        '3.1.2',
        '3.1.2-rc',
        '3.2.0',
        '3.2.0-rc',
        '3.2.1',
        '3.2.2',
        '3.2.2-rc',
        '3.2.3',
        '3.2.4',
        '3.2.5',
        '3.2.5-rc',
        '3.3.0',
        '3.3.0-rc',
        '3.3.1',
        '3.3.2',
        '3.3.2-rc',
        '3.3.3',
        '3.3.3-rc',
        '3.3.4',
        '3.3.5',
        '4.0.0',
        '4.0.0-alpha1',
        '4.0.0-beta',
        '4.0.0-rc',
        '4.0.1',
        '4.0.2',
        '4.1.0',
        '4.1.1',
        '4.1.2',
        '4.2.0',
        '4.2.0-rc1',
        '4.2.1',
        '4.2.2',
        '4.3.0-beta',
        '4.3.0-rc'
      ],
      database_specific: {
        source: 'https://github.com/github/advisory-database/blob/main/advisories/github-reviewed/2022/05/GHSA-pjpc-87mp-4332/GHSA-pjpc-87mp-4332.json'
      }
    }
  ],
  schema_version: '1.4.0',
  severity: [
    {
      type: 'CVSS_V3',
      score: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:H/I:H/A:L'
    }
  ]
};

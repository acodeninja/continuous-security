export const CVEResponse = {
  resultsPerPage: 1,
  startIndex: 0,
  totalResults: 1,
  format: 'NVD_CVE',
  version: '2.0',
  timestamp: '2023-06-30T23:34:19.163',
  vulnerabilities: [{
    cve: {
      id: 'CVE-2019-1010218',
      sourceIdentifier: 'josh@bress.net',
      published: '2019-07-22T18:15:10.917',
      lastModified: '2020-09-30T13:40:18.163',
      vulnStatus: 'Analyzed',
      descriptions: [{
        lang: 'en',
        value: 'Cherokee Webserver Latest Cherokee Web server Upto Version 1.2.103 (Current stable) is affected by: Buffer Overflow - CWE-120. The impact is: Crash. The component is: Main cherokee command. The attack vector is: Overwrite argv[0] to an insane length with execl. The fixed version is: There\'s no fix yet.'
      }, {
        lang: 'es',
        value: 'El servidor web de Cherokee más reciente de Cherokee Webserver Hasta Versión 1.2.103 (estable actual) está afectado por: Desbordamiento de Búfer - CWE-120. El impacto es: Bloqueo. El componente es: Comando cherokee principal. El vector de ataque es: Sobrescribir argv[0] en una longitud no sana con execl. La versión corregida es: no hay ninguna solución aún.'
      }],
      metrics: {
        cvssMetricV31: [{
          source: 'nvd@nist.gov',
          type: 'Primary',
          cvssData: {
            version: '3.1',
            vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
            attackVector: 'NETWORK',
            attackComplexity: 'LOW',
            privilegesRequired: 'NONE',
            userInteraction: 'NONE',
            scope: 'UNCHANGED',
            confidentialityImpact: 'NONE',
            integrityImpact: 'NONE',
            availabilityImpact: 'HIGH',
            baseScore: 7.5,
            baseSeverity: 'HIGH'
          },
          exploitabilityScore: 3.9,
          impactScore: 3.6
        }],
        cvssMetricV2: [{
          source: 'nvd@nist.gov',
          type: 'Primary',
          cvssData: {
            version: '2.0',
            vectorString: 'AV:N/AC:L/Au:N/C:N/I:N/A:P',
            accessVector: 'NETWORK',
            accessComplexity: 'LOW',
            authentication: 'NONE',
            confidentialityImpact: 'NONE',
            integrityImpact: 'NONE',
            availabilityImpact: 'PARTIAL',
            baseScore: 5.0
          },
          baseSeverity: 'MEDIUM',
          exploitabilityScore: 10.0,
          impactScore: 2.9,
          acInsufInfo: false,
          obtainAllPrivilege: false,
          obtainUserPrivilege: false,
          obtainOtherPrivilege: false,
          userInteractionRequired: false
        }]
      },
      weaknesses: [{
        source: 'nvd@nist.gov',
        type: 'Primary',
        description: [{lang: 'en', value: 'CWE-787'}]
      }, {
        source: 'josh@bress.net',
        type: 'Secondary',
        description: [{lang: 'en', value: 'CWE-120'}]
      }],
      configurations: [{
        nodes: [{
          operator: 'OR',
          negate: false,
          cpeMatch: [{
            vulnerable: true,
            criteria: 'cpe:2.3:a:cherokee-project:cherokee_web_server:*:*:*:*:*:*:*:*',
            versionEndIncluding: '1.2.103',
            matchCriteriaId: 'DCE1E311-F9E5-4752-9F51-D5DA78B7BBFA'
          }]
        }]
      }],
      references: [{
        url: 'https://i.imgur.com/PWCCyir.png',
        source: 'josh@bress.net',
        tags: ['Exploit', 'Third Party Advisory']
      }]
    }
  }]
};
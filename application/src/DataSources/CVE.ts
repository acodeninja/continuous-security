import axios from 'axios';

export class CVE {
  private apiUrl = 'https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=';
  private viewVulnerabilityUrl = 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=';

  private async getData(id: string): Promise<CVEAPIResponse> {
    const response = await axios.get<CVEAPIResponse>(this.apiUrl + id);
    return response.data;
  }

  async getById(id: string): Promise<ReportOutputIssueReference> {
    try {
      const response = await this.getData(id);
      const cveData = response.vulnerabilities[0].cve;

      const aliases = cveData.weaknesses
        .map(({description}) => description)
        .flat()
        .map(({value}) => value);

      return {
        label: id,
        title: id,
        description: cveData.descriptions.find(d => d.lang === 'en')?.value,
        directLink: this.viewVulnerabilityUrl + id,
        dataSourceSpecific: {
          cve: {
            aliases,
            severity: cveData.metrics?.cvssMetricV31?.[0]?.cvssData?.baseSeverity?.toLowerCase() as ReportOutputIssueReference['dataSourceSpecific']['osv']['severity'] ?? 'unknown',
          },
        },
      };
    } catch (e) {
      throw new Error(`failed to get id ${id}`);
    }
  }
}

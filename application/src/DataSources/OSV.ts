import axios from 'axios';

export class OSV {
  private osvAPIUrl = 'https://api.osv.dev/v1/vulns/';
  private viewVulnerabilityUrl = 'https://osv.dev/vulnerability/';

  private async getData(id: string): Promise<OSVAPIResponse> {
    const response = await axios.get<OSVAPIResponse>(this.osvAPIUrl + id);
    return response.data;
  }

  async getById(id: string): Promise<ReportOutputIssueReference> {
    try {
      const osvData = await this.getData(id);

      let {aliases} = osvData;

      if (osvData.database_specific?.cwe_ids) {
        aliases = aliases.concat(osvData.database_specific.cwe_ids);
      }

      return {
        label: id,
        title: osvData.summary ?? id,
        description: osvData.details,
        directLink: this.viewVulnerabilityUrl + id,
        dataSourceSpecific: {
          osv: {
            aliases,
            severity: osvData.database_specific?.severity?.toLowerCase() as ReportOutputIssueReference['dataSourceSpecific']['osv']['severity'] ?? 'unknown',
          },
        },
      };
    } catch (e) {
      throw new Error(`failed to get id ${id}`);
    }
  }
}

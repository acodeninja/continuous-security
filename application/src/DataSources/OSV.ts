import axios from 'axios';

export class OSV {
  osvAPIUrl = 'https://api.osv.dev/v1/vulns/';
  viewVulnerabilityUrl = 'https://osv.dev/vulnerability/';

  private async getData(id: string): Promise<OSVAPIResponse> {
    const response = await axios.get<OSVAPIResponse>(this.osvAPIUrl + id);
    return response.data;
  }

  async getById(id: string): Promise<ReportOutputIssueReference> {
    const osvData = await this.getData(id);

    return {
      label: id,
      title: osvData.summary,
      description: osvData.details,
      url: this.viewVulnerabilityUrl + id,
    }
  }
}

interface NpmAudit {
  auditReportVersion: number;
  vulnerabilities: {
    [name: string]: {
      name: string;
      severity: 'info' | 'low' | 'moderate' | 'high' | 'critical';
      isDirect: boolean;
      effects: Array<{}>;
      range: string;
      nodes: Array<string>;
      fixAvailable: boolean;
      via: Array<{
        source: number;
        title: string;
        name: string;
        url: string;
        dependency: string;
        cwe: Array<string>;
        severity: 'info' | 'low' | 'moderate' | 'high' | 'critical';
        cvss: {
          score: number;
          vectorString: string;
        }
        range: string;
      }>;
    }
  };
  metadata: {
    vulnerabilities: {
      info: number;
      low: number;
      moderate: number;
      high: number;
      critical: number;
      total: number;
    }
    dependencies: {
      prod: number;
      dev: number;
      optional: number;
      peer: number;
      peerOptional: number;
      total: number;
    }
  }
}

interface NpmAudit {
  vulnerabilities: {
    [name: string]: {
      name: string;
      severity: 'info' | 'low' | 'moderate' | 'high' | 'critical';
      via: Array<{
        title: string,
        url: string,
        cwe: Array<string>;
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
  }
}

type Scanner = {
  name: string;
  slug: string;
  version: string;
  buildConfiguration: ScannerBuildConfiguration;
  validate: (configuration: ScannerConfiguration) => Promise<void>;
  report: (location: string) => Promise<ScanReport>;
}

type ScannerBuildConfiguration = {
  files: {
    Dockerfile: string;
    [name: string]: string;
  };
}

type ScannerConfiguration = {
  name: string;
  target?: string;
} | string;

type ScanReport = {
  issues: Array<{
    title: string;
    description: string;
    type: 'dependency';
    severity: 'info' | 'low' | 'moderate' | 'high' | 'critical';
  }>;
  counts: {
    info: number;
    low: number;
    moderate: number;
    high: number;
    critical: number;
    total: number;
  };
}

// @ts-ignore
declare module './assets/*' {
  const content: string;
  export default content;
}

type Scanner = {
  name: string;
  slug: string;
  version: string;
  buildConfiguration: ScannerBuildConfiguration;
  validate?: (configuration: ScannerConfiguration) => Promise<void>;
  report: (location: string) => Promise<ScanReport>;
}

type ScannerConfiguration = {
  name: string;
  target?: string;
}

type ScannerRunConfiguration = {
  imageHash: string;
  host: {
    target: string;
    output: string;
  },
}

type ScannerBuildConfiguration = {
  files: {
    Dockerfile: string;
    [name: string]: string;
  };
}

type ScanReport = {
  scanner: string;
  issues: Array<{
    title: string;
    description: string;
    type: 'dependency' | 'code smell';
    package?: string;
    cwe?: string | Array<string>;
    fix: string;
    severity: 'info' | 'low' | 'moderate' | 'high' | 'critical' | 'unknown';
  }>;
  counts: {
    info: number;
    low: number;
    moderate: number;
    high: number;
    critical: number;
    unknown: number;
    total: number;
  };
}

// @ts-ignore
declare module './assets/*' {
  const content: string;
  export default content;
}

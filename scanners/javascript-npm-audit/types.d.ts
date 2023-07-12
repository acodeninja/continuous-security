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

type ScanReportIssue = {
  title: string;
  description: string;
  type: 'dependency' | 'code smell' | 'web request';
  package?: {
    name: string;
    version?: string;
  };
  references?: Array<string>;
  fix: string;
  severity: 'info' | 'low' | 'moderate' | 'high' | 'critical' | 'unknown';
  extracts?: Array<{
    lines: Array<string>;
    path: string;
    language?: string;
  }>;
  requests?: Array<{
    request: {
      target: string;
      method: string;
      headers: Record<string, string>;
    };
    response: {
      statusCode: number;
      headers: Record<string, string>;
    };
  }>;
}

type ScanReport = {
  scanner: string;
  issues: Array<ScanReportIssue>;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare module './assets/*' {
  const content: string;
  export default content;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare module '../assets/*' {
  const content: string;
  export default content;
}

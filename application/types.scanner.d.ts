type Scanner = {
  name: string;
  slug: string;
  version: string;
  buildConfiguration: ScannerBuildConfiguration;
  runConfiguration?: Record<string, {
    required?: boolean;
  }>;
  report: (location: string) => Promise<ScanReport>;
}

type ScannerConfiguration = {
  name: string;
  with?: Record<string, string>;
}

type ScannerRunConfiguration = {
  configuration?: Record<string, string>;
  command?: string[];
  imageHash: string;
  volumes: {
    output: string;
    target?: string;
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
    code?: string;
  }>;
  requests?: Array<{
    request: {
      target: string;
      method: string;
      headers: Record<string, string>;
      body?: string;
    };
    response: {
      statusCode: number;
      headers: Record<string, string>;
      body?: string;
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare module '../../assets/*' {
  const content: string;
  export default content;
}

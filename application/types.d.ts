type EventEmitter = {
  on(event: string, listener: () => void): void;
  emit(event: string, ...values: Array<unknown>): void;
}

type ConfigurationFile = {
  scanners: Array<ScannerConfiguration | string>;
  ignore?: Array<string>;
}

type ReportOutput = {
  title: string;
  date: Date;
  summaryImpacts: Array<{
    scope: string;
    impacts: Array<string>;
  }>;
  overviewOfIssues: Array<ReportOutputIssueReference>;
  issues: Array<ReportOutputIssue>
  counts: {
    info: number;
    low: number;
    moderate: number;
    high: number;
    critical: number;
    unknown: number;
    total: number;
  }
}

type ReportOutputIssue = {
  title: string;
  description: string;
  type: 'dependency' | 'code smell' | 'web request';
  foundBy: string;
  package?: {
    name: string;
    version?: string;
  };
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
  references?: Array<ReportOutputIssueReference>;
  fix: string;
  severity: 'info' | 'low' | 'moderate' | 'high' | 'critical' | 'unknown';
}

type ReportOutputIssueReference = {
  title: string;
  description: string;
  label: string;
  directLink?: string;
  dataSourceSpecific: {
    osv?: {
      aliases: Array<string>;
      severity?: 'info' | 'low' | 'moderate' | 'high' | 'critical' | 'unknown';
    };
    cve?: {
      aliases: Array<string>;
      severity?: 'info' | 'low' | 'moderate' | 'high' | 'critical' | 'unknown';
    };
    cwe?: {
      extendedDescription: string;
      background: string;
      consequences: Array<{
        scopeImpacts: Array<{
          scope: string;
          impact?: string;
        }>;
        likelihood?: string;
        note?: string;
      }>;
      mitigations: Array<{
        phase: string;
        description: string;
        effectiveness: string;
        notes: string;
      }>;
    };
  };
};

declare const __non_webpack_require__: NodeRequire;

type OSVAPIResponse = {
  id: string;
  summary: string;
  details: string;
  aliases: Array<string>;
  modified: string;
  published: string;
  database_specific: {
    cwe_ids?: Array<string>;
    severity?:  'INFO' | 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' | 'UNKNOWN';
  };
  references: Array<{
    type: 'WEB' | 'ADVISORY' | 'PACKAGE';
    url: string;
  }>;
  affected: Array<{
    package: {
      name: string;
      ecosystem: string;
      purl: string;
    };
    ranges: Array<{
      type: string;
      events: Array<{
        introduced?: string;
        fixed?: string;
      }>;
    }>;
    versions: Array<string>;
  }>;
  schema_version: string;
  severity: Array<{
    type: string;
    score: string;
  }>
}

type CVEAPIResponse = {
  vulnerabilities: Array<{
    cve: {
      id: string;
      descriptions: Array<{
        lang: string;
        value: string;
      }>;
      metrics: {
        cvssMetricV31: Array<{
          cvssData: {
            baseSeverity: string;
          };
        }>;
      };
      weaknesses: Array<{
        description: Array<{
          lang: string;
          value: string;
        }>;
      }>;
    }
  }>;
}

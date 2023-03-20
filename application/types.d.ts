type EventEmitter = {
  on(event: string, listener: () => void): void;
  emit(event: string, ...values: Array<any>): void;
}

type ConfigurationFile = {
  scanners: Array<ScannerConfiguration | string>
}

type ReportOutput = {
  title: string;
  date: Date;
  issues: Array<{
    title: string;
    description: string;
    type: 'dependency' | 'code smell';
    package?: string;
    cwe?: string | Array<string>;
    fix: string;
    severity: 'info' | 'low' | 'moderate' | 'high' | 'critical';
  }>
  counts: {
    info: number;
    low: number;
    moderate: number;
    high: number;
    critical: number;
    total: number;
  }
}

declare const __non_webpack_require__: NodeRequire;

type CWEDetails = {
  name: string;
  id: string;
  description: string;
  link: string;
}

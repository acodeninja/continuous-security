interface PipAuditReport {
  dependencies: Array<{
    name: string;
    version: string;
    vulns: Array<{
      id: string;
      fix_versions: Array<string>;
      description: string;
    }>
  }>;
  fixes: Array<Record<string, never>>;
}

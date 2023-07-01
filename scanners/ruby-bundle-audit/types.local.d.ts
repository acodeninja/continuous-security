interface BundleAuditReport {
  issues: Array<{
    Name: string;
    Version: string;
    Criticality: string;
    URL: string;
    CVE?: string;
    GHSA?: string;
    Title: string;
    Solution?: string;
  }>;
}

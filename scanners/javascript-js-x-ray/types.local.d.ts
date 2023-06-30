interface JSXRayReport {
  issues: Array<{
    title: string;
    severity: 'info' | 'low' | 'moderate' | 'high' | 'critical' | 'unknown';
    description: string;
    extracts: Array<{
      path: string;
      lines: Array<string>;
      code: string;
      language: string;
    }>;
  }>;
}


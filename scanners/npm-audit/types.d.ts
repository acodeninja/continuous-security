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

// @ts-ignore
declare module './assets/*' {
  const content: string;
  export default content;
}

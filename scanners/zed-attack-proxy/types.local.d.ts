interface ZapSarifReport {
  runs: null | Array<{
    results: Array<ZapSarifReportResult>;
    tool: {
      driver: {
        rules: Array<{
          id: string;
          name: string;
          fullDescription: {
            text: string;
          };
          shortDescription: {
            text: string;
          };
          relationships: Array<{
            target: {
              id: string;
              toolComponent: {
                name: string;
              };
            };
          }>;
        }>;
      };
    };
  }>;
}

interface ZapSarifReportResult {
  locations: Array<{
    physicalLocation: {
      artifactLocation: {
        uri: string;
      };
    };
  }>;
  ruleId: string;
  level: string;
  message: {
    text: string;
  };
  webRequest: {
    protocol: string;
    version: string;
    target: string;
    method: string;
    headers: Record<string, string>;
    body: {
      binary?: string;
      text?: string;
    };
  };
  webResponse: {
    protocol: string;
    version: string;
    target: string;
    method: string;
    statusCode: number,
    headers: Record<string, string>;
    body: {
      binary?: string;
      text?: string;
    };
  };
}

interface ZapSarifReportGroupedResult {
  locations: Array<{
    physicalLocation: {
      artifactLocation: {
        uri: string;
      };
    };
  }>;
  ruleId: string;
  level: string;
  message: string;
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

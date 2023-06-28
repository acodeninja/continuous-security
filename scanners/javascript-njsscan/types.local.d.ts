interface NodeJSScan {
  errors: [];
  njsscan_version: string;
  nodejs: {
    [name: string]: {
      files: Array<{
        file_path: string;
        match_lines: Array<number>;
        match_position: Array<number>;
        match_string: string;
      }>;
      metadata: {
        cwe: string;
        description: string;
        'owasp-web': string;
        severity: 'ERROR' | 'WARNING';
      };
    };
  };
}


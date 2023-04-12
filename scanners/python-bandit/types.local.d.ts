interface BanditReport {
  errors: Array<string>;
  generated_at: string;
  metrics: {
    [filename: string | '_totals']: {
      'CONFIDENCE.HIGH': number;
      'CONFIDENCE.LOW': number;
      'CONFIDENCE.MEDIUM': number;
      'CONFIDENCE.UNDEFINED': number;
      'SEVERITY.HIGH': number;
      'SEVERITY.LOW': number;
      'SEVERITY.MEDIUM': number;
      'SEVERITY.UNDEFINED': number;
      loc: number;
      nosec: number;
      skipped_tests: number;
    };
  };
  results: Array<{
    code: string;
    col_offset: number;
    end_col_offset: number;
    filename: string;
    issue_confidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNDEFINED';
    issue_cwe: {
      id: number;
      link: string;
    },
    issue_severity: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNDEFINED';
    issue_text: string;
    line_number: number;
    line_range: Array<number>;
    more_info: string;
    test_id: string;
    test_name: string;
  }>;
}

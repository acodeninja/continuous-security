interface BearerJsonReport {
  [severity: string]: Array<{
    id: string;
    title: string;
    description: string;
    cwe_ids: Array<string>;
    full_filename: string;
    source: {
      start: number;
      end: number;
    }
  }>;
}

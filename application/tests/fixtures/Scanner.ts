export const TestScanner: Scanner = {
  name: "@continuous-security/scanner-test",
  slug: "test",
  version: "0.0.1",
  buildConfiguration: {
    files: {
      Dockerfile: `FROM alpine:latest`,
      'scan.sh': `echo '{"ran": "yes"}' >> /output/report.json`,
    },
  },
  validate: jest.fn(),
  report: jest.fn().mockResolvedValue({
    issues: [],
    counts: {
      info: 0,
      low: 0,
      moderate: 0,
      high: 0,
      critical: 0,
      total: 0,
    },
  }),
};

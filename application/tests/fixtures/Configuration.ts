export const JSONConfiguration = Buffer.from(JSON.stringify({
  scanners: ['test-scanner'],
}));

export const YAMLConfiguration = Buffer.from(`
scanners:
  - test-scanner
`);

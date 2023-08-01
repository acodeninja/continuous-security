export const JSONConfiguration = Buffer.from(JSON.stringify({
  scanners: ['test-scanner'],
}));

export const JSONConfigurationWithExtraConfig = Buffer.from(JSON.stringify({
  ignore: ['build/'],
  scanners: [{name: 'test-scanner', with: {property: 'value'}}],
}));

export const YAMLConfiguration = Buffer.from(`
scanners:
  - test-scanner
`);

export const YAMLConfigurationWithExtraConfig = Buffer.from(`
ignore:
  - build/
scanners:
  - name: test-scanner
    with:
      property: value
`);

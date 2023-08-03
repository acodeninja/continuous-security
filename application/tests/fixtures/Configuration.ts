export const JSONConfiguration = Buffer.from(JSON.stringify({
  scanners: [
    '@continuous-security/scanner-test',
    '@another-organisation/scanner-test',
  ],
}));

export const JSONConfigurationWithExtraConfig = Buffer.from(JSON.stringify({
  ignore: ['build/', 'does/not/exist/'],
  scanners: [
    {name: '@continuous-security/scanner-test', with: {property: 'value'}},
    {name: '@another-organisation/scanner-test', with: {property: 'value'}},
  ],
}));

export const YAMLConfiguration = Buffer.from(`
scanners:
  - "@continuous-security/scanner-test"
  - "@another-organisation/scanner-test"
`);

export const YAMLConfigurationWithExtraConfig = Buffer.from(`
ignore:
  - build/
scanners:
  - name: "@continuous-security/scanner-test"
    with:
      property: value
  - name: "@another-organisation/scanner-test"
    with:
      property: value
`);

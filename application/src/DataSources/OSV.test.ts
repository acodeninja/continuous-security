import axios from 'axios';
import {OSV} from './OSV';
import {Github} from '../../tests/fixtures/OSVResponse';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('a GitHub security advisory', () => {
  (axios.get as jest.Mock).mockResolvedValueOnce({data: Github});

  let reference: ReportOutputIssueReference;

  beforeAll(async () => {
    reference = await (new OSV).getById('GHSA-pjpc-87mp-4332');
  });

  test('has the correct label', () => {
    expect(reference.label).toEqual('GHSA-pjpc-87mp-4332');
  });

  test('has the correct title', () => {
    expect(reference.title).toEqual('Cross-site Scripting vulnerability in Mautic\'s tracking pixel functionality');
  });

  test('has the correct description', () => {
    expect(reference.description).toEqual('### Impact\n\nMautic allows you to track open rates by using tracking pixels. \nThe tracking information is stored together with extra metadata of the tracking request.\n\nThe output isn\'t sufficiently filtered when showing the metadata of the tracking information, which may lead to a vulnerable situation.\n\n### Patches\n\nPlease upgrade to 4.3.0\n\n### Workarounds\nNone.\n\n### References\n* Internally tracked under MST-38\n\n### For more information\nIf you have any questions or comments about this advisory:\n* Email us at [security@mautic.org](mailto:security@mautic.org)\n');
  });

  test('has the correct url', () => {
    expect(reference.directLink).toEqual('https://osv.dev/vulnerability/GHSA-pjpc-87mp-4332');
  });
});

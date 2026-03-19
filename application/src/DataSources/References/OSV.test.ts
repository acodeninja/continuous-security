import {jest, describe, test, expect, beforeAll} from '@jest/globals';
import {Github} from '../../../tests/fixtures/OSVResponse';

jest.unstable_mockModule('axios', () => ({
  default: {get: jest.fn()},
  get: jest.fn(),
}));

const axios = (await import('axios')).default;
const {OSV} = await import('./OSV');

describe('OSV.getById', () => {
  (axios.get as jest.Mock<any>).mockResolvedValueOnce({data: Github});

  let reference: ReportOutputIssueReference;

  beforeAll(async () => {
    reference = await (new OSV).getById('GHSA-pjpc-87mp-4332');
  });

  test('has the correct label', () => {
    expect(reference.label).toEqual('GHSA-pjpc-87mp-4332');
  });

  test('has the correct title', () => {
    expect(reference.title).toEqual(
      'Cross-site Scripting vulnerability in Mautic\'s tracking pixel functionality',
    );
  });

  test('has the correct description', () => {
    expect(reference.description).toMatchSnapshot();
  });

  test('has the correct url', () => {
    expect(reference.directLink).toEqual('https://osv.dev/vulnerability/GHSA-pjpc-87mp-4332');
  });

  describe('when the advisory does not exist', () => {
    (axios.get as jest.Mock<any>).mockRejectedValueOnce(new Error('404'));

    test('raises an error', async () => {
      await expect((new OSV()).getById('xxxxxxxxx')).rejects.toThrow('failed to get id xxxxxxxxx');
    });
  });
});

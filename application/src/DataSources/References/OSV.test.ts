import axios from 'axios';
import {OSV} from './OSV';
import {Github} from '../../../tests/fixtures/OSVResponse';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('OSV.getById', () => {
  (axios.get as jest.Mock).mockResolvedValueOnce({data: Github});

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
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('404'));

    test('raises an error', async () => {
      await expect((new OSV()).getById('xxxxxxxxx')).rejects.toThrow('failed to get id xxxxxxxxx');
    });
  });
});

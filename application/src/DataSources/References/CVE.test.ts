import axios from 'axios';
import {CVE} from './CVE';
import {CVEResponse} from '../../../tests/fixtures/CVEResponse';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('CVE.getById', () => {
  (axios.get as jest.Mock).mockResolvedValueOnce({data: CVEResponse});

  let reference: ReportOutputIssueReference;

  beforeAll(async () => {
    reference = await (new CVE()).getById('CVE-2019-1010218');
  });

  test('has the correct label', () => {
    expect(reference.label).toEqual('CVE-2019-1010218');
  });

  test('has the correct title', () => {
    expect(reference.title).toEqual('CVE-2019-1010218');
  });

  test('has the correct description', () => {
    expect(reference.description).toMatchSnapshot();
  });

  test('has the correct url', () => {
    expect(reference.directLink).toEqual(
      'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-1010218',
    );
  });

  describe('when the cve does not exist', () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('404'));

    test('raises an error', async () => {
      await expect((new CVE()).getById('xxxxxxxxx')).rejects.toThrow('failed to get id xxxxxxxxx');
    });
  });
});

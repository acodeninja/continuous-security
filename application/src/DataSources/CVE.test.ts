import axios from 'axios';
import {CVE} from './CVE';
import {CVEResponse} from '../../tests/fixtures/CVEResponse';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('a CVE security advisory', () => {
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
    expect(reference.description).toEqual('Cherokee Webserver Latest Cherokee Web server Upto Version 1.2.103 (Current stable) is affected by: Buffer Overflow - CWE-120. The impact is: Crash. The component is: Main cherokee command. The attack vector is: Overwrite argv[0] to an insane length with execl. The fixed version is: There\'s no fix yet.');
  });

  test('has the correct url', () => {
    expect(reference.directLink).toEqual('https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-1010218');
  });
});

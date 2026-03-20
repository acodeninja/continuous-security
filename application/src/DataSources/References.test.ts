import {jest, describe, test, expect, beforeAll} from '@jest/globals';
import {Github} from '../../tests/fixtures/OSVResponse';

jest.unstable_mockModule('axios', () => ({
  default: {get: jest.fn()},
  get: jest.fn(),
}));

const axios = (await import('axios')).default;
const {References} = await import('./References');
const {Emitter} = await import('../Emitter');

describe('References.getAll', () => {
  describe('when the reference does not exist', () => {
    const emitter = new Emitter();
    const references = new References(emitter);

    const onReferenceFetchError = jest.fn();
    emitter.on('report:reference:failure', onReferenceFetchError);

    beforeAll(async () => {
      (axios.get as jest.Mock<any>).mockImplementation(async (url: string) => {
        if (url.indexOf('GHSA-pjpc-87mp-4332') !== -1) return {data: Github};
        throw new Error('404');
      });

      await references.getAll(['GHSA-pjpc-87mp-4332']);
    });

    test('raises an error event', () => {
      expect(onReferenceFetchError)
        .toHaveBeenCalledWith('Failed to fetch vulnerability reference CVE-2022-25772');
    });
  });
});

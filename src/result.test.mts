import { ErrorResult } from '../src/errorResult.mjs';
import { Result } from '../src/result.mjs';
import { SuccessResult } from '../src/successResult.mjs';

describe('Result class', () => {
  it('can instantiate SuccessResults', () => {
    expect(() => {
      const instance = Result.success(undefined);
      expect(instance).toBeInstanceOf(SuccessResult);
    }).not.toThrow();
  });

  it('can instantiate ErrorResults', () => {
    expect(() => {
      const instance = Result.fail(Error());
      expect(instance).toBeInstanceOf(ErrorResult);
    }).not.toThrow();
  });
});

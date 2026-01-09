import { isErrorResult, isSuccessResult } from '../src/index.mjs';
import { Result } from '../src/result.mjs';

describe('isSuccessResult', () => {
  it('returns true for SuccessResults', () => {
    const result = Result.success(undefined);
    expect(isSuccessResult(result)).toBe(true);
  });

  it('returns false for ErrorResults', () => {
    const result = Result.fail(Error());
    expect(isSuccessResult(result)).toBe(false);
  });
});

describe('isErrorResult', () => {
  it('returns true for ErrorResults', () => {
    const result = Result.fail(Error());
    expect(isErrorResult(result)).toBe(true);
  });

  it('returns false for SuccessResults', () => {
    const result = Result.success(undefined);
    expect(isErrorResult(result)).toBe(false);
  });
});

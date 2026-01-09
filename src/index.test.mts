import assert from 'node:assert/strict';

import { ErrorResult } from './errorResult.mjs';
import { combine, fail, isErrorResult, isSuccessResult, success } from './index.mjs';
import { SuccessResult } from './successResult.mjs';

describe('success', () => {
  it('returns a SuccessResult', () => {
    const value = { foo: 3, bar: new Date(), baz: Symbol() };
    const result = success(value);
    expect(result).toBeInstanceOf(SuccessResult);
    expect(result.value).toBe(value);
  });
});

describe('fail', () => {
  it('returns an ErrorResult', () => {
    const error = { foo: 3, bar: new Date(), baz: Symbol() };
    const result = fail(error);
    expect(result).toBeInstanceOf(ErrorResult);
    expect(result.error).toBe(error);
  });
});

describe('isSuccessResult', () => {
  it('returns true for SuccessResults', () => {
    const result = success();
    expect(isSuccessResult(result)).toBe(true);
  });

  it('returns false for ErrorResults', () => {
    const result = fail(Error());
    expect(isSuccessResult(result)).toBe(false);
  });
});

describe('isErrorResult', () => {
  it('returns true for ErrorResults', () => {
    const result = fail(Error());
    expect(isErrorResult(result)).toBe(true);
  });

  it('returns false for SuccessResults', () => {
    const result = success();
    expect(isErrorResult(result)).toBe(false);
  });
});

describe('combine', () => {
  it('returns an ErrorResult if there are any errors', () => {
    const success1 = success();
    const success2 = success();
    const error = Error();
    const failure1 = fail(error);

    const result = combine(success1, success2, failure1);
    expect(result.success).toBe(false);
    assert(!result.success);
    expect(result.error).toBe(error);
  });

  it('returns an new SuccessResult if there are no errors', () => {
    const success1 = success();
    const success2 = success();
    const success3 = success();

    const result = combine(success1, success2, success3);
    expect(result.success).toBe(true);
    assert(result.success);
    expect(result.value).toBe(undefined);
    expect(result).not.toBe(success1);
    expect(result).not.toBe(success2);
    expect(result).not.toBe(success3);
  });
});

import assert from 'node:assert/strict';

import { ErrorResult } from './errorResult.mjs';
import { combine, fail, flatten, isErrorResult, isSuccessResult, success } from './index.mjs';
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

    const result = combine([ success1, success2, failure1 ]);
    expect(result.success).toBe(false);
    assert(!result.success);
    expect(result.error).toStrictEqual([ error ]);
  });

  it('returns an new SuccessResult if there are no errors', () => {
    const value1 = Symbol();
    const value2 = 5;
    const value3 = new Date();

    const success1 = success(value1);
    const success2 = success(value2);
    const success3 = success(value3);

    const result = combine([ success1, success2, success3 ]);
    expect(result.success).toBe(true);
    assert(result.success);
    expect(result.value).toStrictEqual([ value1, value2, value3 ]);
    expect(result).not.toBe(success1);
    expect(result).not.toBe(success2);
    expect(result).not.toBe(success3);
  });
});

describe('flatten', () => {
  it('shouldn\'t do anything to a SuccessResult that\'s already flat', () => {
    const result = success(2);
    const flattened = flatten(result);
    expect(flattened.success).toBe(true);
    assert(flattened.success);
    expect(flattened.value).toBe(2);
  });

  it('shouldn\'t do anything to a ErrorResult that\'s already flat', () => {
    const result = fail(43);
    const flattened = flatten(result);
    expect(flattened.success).toBe(false);
    assert(!flattened.success);
    expect(flattened.error).toBe(43);
  });

  it('should collapse all successes into one', () => {
    const result = success(success(success(success(success(2)))));
    const flattened = flatten(result);
    expect(flattened.success).toBe(true);
    assert(flattened.success);
    expect(flattened.value).toBe(2);
  });

  it('should collapse all errors into each other and all successes into each other', () => {
    const result = fail(success(success(fail(success(success(fail(success(2))))))));
    const flattened = flatten(result);
    expect(flattened).toBeInstanceOf(ErrorResult);
    assert(flattened instanceof ErrorResult);
    expect(flattened.success).toBe(false);
    expect(flattened.error).toBeInstanceOf(SuccessResult);
    assert(flattened.error instanceof SuccessResult);
    expect(flattened.error.success);
    expect(flattened.error.value).toBe(2);
  });

  it('errors should bubble up', () => {
    const result = success(success(success(fail(fail(success(success(fail(success(2)))))))));
    const flattened = flatten(result);
    expect(flattened).toBeInstanceOf(ErrorResult);
    assert(flattened instanceof ErrorResult);
    expect(flattened.success).toBe(false);
    expect(flattened.error).toBeInstanceOf(SuccessResult);
    assert(flattened.error instanceof SuccessResult);
    expect(flattened.error.success);
    expect(flattened.error.value).toBe(2);
  });
});

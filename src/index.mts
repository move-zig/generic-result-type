import type { IErrorResult } from './errorResult.mjs';
import { ErrorResult } from './errorResult.mjs';
import type { IResult, Result } from './result.mjs';
import type { ISuccessResult } from './successResult.mjs';
import { SuccessResult } from './successResult.mjs';

export type { Result, ISuccessResult, IErrorResult };

export function success(): ISuccessResult;
export function success<T>(value: T): ISuccessResult<T>;
export function success<T>(value?: T): ISuccessResult<T> {
  return new SuccessResult(value as T);
};

export function failure<E>(error: E): IErrorResult<E> {
  return new ErrorResult(error);
}

/**
 * @deprecated
 */
export const fail = failure;

export const isSuccessResult = <T, E = Error>(result: IResult<T, E>): result is ISuccessResult<T> => {
  return result.success;
};

export const isErrorResult = <T, E = Error>(result: IResult<T, E>): result is IErrorResult<E> => {
  return !result.success;
};

export function combine(results: Result<unknown, unknown>[]): Result<unknown[], unknown[]> {
  const values: unknown[] = [];
  const errors: unknown[] = [];

  for (const r of results) {
    if (r.success) {
      values.push(r.value);
    } else {
      errors.push(r.error);
    }
  }

  if (errors.length) {
    return new ErrorResult(errors);
  }
  return new SuccessResult(values);
}

export const flatten = (result: Result<unknown, unknown>): Result<unknown, unknown> => {
  if (isSuccessResult(result)) {
    return getValue(result);
  }
  return getError(result);
};

const getValue = (result: SuccessResult<unknown>): Result<unknown, unknown> => {
  // value is a SuccessResult, drill down
  if (result.value instanceof SuccessResult) {
    return getValue(result.value);
  }

  // value is an ErrorResult, drill down
  if (result.value instanceof ErrorResult) {
    return getError(result.value);
  }

  // value is not a Result, return current SuccessResult
  return result;
};

const getError = (result: ErrorResult<unknown>): ErrorResult<unknown> => {
  // error is a SuccessResult, consider this SuccessResult's value
  if (result.error instanceof SuccessResult) {
    const value = getValue(result.error);

    // if the value is a SuccessResult, swallow it into an error
    if (isSuccessResult(value)) {
      return failure(value);
    }

    // otherwise the value is an ErrorResult, return it
    return value;
  }

  // error is an ErrorResult, swallow it
  if (result.error instanceof ErrorResult) {
    return getError(result.error);
  }

  // error is not a Result, the current ErrorResult
  return result;
};

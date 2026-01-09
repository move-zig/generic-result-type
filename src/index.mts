import type { IErrorResult } from './errorResult.mjs';
import { ErrorResult } from './errorResult.mjs';
import type { ISuccessResult } from './successResult.mjs';
import { SuccessResult } from './successResult.mjs';

export type { ISuccessResult };
export type { IErrorResult };

export type ResultType<T = void, E = Error> = ISuccessResult<T> | IErrorResult<E>;

export function success(): ISuccessResult;
export function success<T>(value: T): ISuccessResult<T>;
export function success<T>(value?: T): ISuccessResult<T> {
  return new SuccessResult(value as T);
};

export function fail<E>(error: E): IErrorResult<E> {
  return new ErrorResult(error);
}

export const isSuccessResult = <T, E = Error>(result: ResultType<T, E>): result is ISuccessResult<T> => {
  return result.success;
};

export const isErrorResult = <T, E = Error>(result: ResultType<T, E>): result is IErrorResult<E> => {
  return !result.success;
};

export function combine(...results: ResultType[]): ResultType {
  for (const r of results) {
    if (!r.success) {
      return r;
    }
  }
  return new SuccessResult(undefined);
}

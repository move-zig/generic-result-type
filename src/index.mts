import type { IErrorResult } from './errorResult.mjs';
import type { ISuccessResult } from './successResult.mjs';

export { Result } from './result.mjs';
export type { ISuccessResult };
export type { IErrorResult };

export type ResultType<T = void, E = Error> = ISuccessResult<T> | IErrorResult<E>;

export const isSuccessResult = <T, E = Error>(result: ResultType<T, E>): result is ISuccessResult<T> => {
  return result.success;
};

export const isErrorResult = <T, E = Error>(result: ResultType<T, E>): result is IErrorResult<E> => {
  return !result.success;
};

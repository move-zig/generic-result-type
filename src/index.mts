import type { IErrorResult } from './errorResult.mjs';
import type { ISuccessResult } from './successResult.mjs';

export { Result } from './result.mjs';
export type { ISuccessResult };
export type { IErrorResult };

export type ResultType<T> = ISuccessResult<T> | IErrorResult;

// eslint-disable-next-line @stylistic/comma-dangle
export const isSuccessResult = <T,>(result: ResultType<T>): result is ISuccessResult<T> => {
  return result.success;
};

// eslint-disable-next-line @stylistic/comma-dangle
export const isErrorResult = <T,>(result: ResultType<T>): result is IErrorResult => {
  return !result.success;
};

import type { IErrorResult } from './errorResult.mjs';
import { ErrorResult } from './errorResult.mjs';
import type { ResultType } from './index.mjs';
import type { ISuccessResult } from './successResult.mjs';
import { SuccessResult } from './successResult.mjs';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class Result {

  public static success<T>(value: T): ISuccessResult<T> {
    return new SuccessResult(value);
  }

  public static fail(error: Error): IErrorResult {
    return new ErrorResult(error);
  }

  public static combine<T>(results: ResultType<T>[]): ResultType<T | undefined> {
    for (const result of results) {
      if (!result.success) {
        return result;
      }
    }
    return Result.success<undefined>(undefined);
  }
}

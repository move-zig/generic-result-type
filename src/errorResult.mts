export interface IErrorResult<T = Error> {
  readonly success: false;
  readonly error: T;
}

export class ErrorResult<T> implements IErrorResult<T> {
  public readonly success = false as const;

  public constructor(public readonly error: T) { /* empty */ }
}

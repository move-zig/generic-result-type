export interface IErrorResult {
  readonly success: false;
  readonly error: Error;
}

export class ErrorResult implements IErrorResult {
  public readonly success = false as const;

  public constructor(public readonly error: Error) { /* empty */ }
}

export interface ISuccessResult<T> {
  readonly success: true;
  readonly value: T;
}

export class SuccessResult<T> implements ISuccessResult<T> {
  public readonly success = true as const;

  public constructor(public readonly value: T) { /* empty */ }
}

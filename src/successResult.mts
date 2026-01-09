export interface ISuccessResult<T = void> {
  readonly success: true;
  readonly value: T;
}

export class SuccessResult<T = void> implements ISuccessResult<T> {
  public readonly success = true as const;

  public constructor(public readonly value: T) { /* empty */ }
}

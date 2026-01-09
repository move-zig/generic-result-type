export interface ISuccessResult<T = void> {
  readonly success: true;
  readonly value: T;
  readonly map: <M>(mapFunction: (value: T) => M) => ISuccessResult<M>;
}

export class SuccessResult<T = void> implements ISuccessResult<T> {
  public readonly success = true as const;

  public constructor(public readonly value: T) { /* empty */ }

  public map<M>(mapFunction: (value: T) => M): SuccessResult<M> {
    return new SuccessResult(mapFunction(this.value));
  }
};

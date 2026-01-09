export interface ISuccessResult<T = void> {
  readonly success: true;
  readonly value: T;
  readonly map: <M>(mapFunction: (value: T) => M) => ISuccessResult<M>;
  readonly mapAsync: <M>(mapFunction: (value: T) => Promise<M>) => Promise<ISuccessResult<M>>;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  readonly mapErr: <M>(mapFunction: (value: never) => M) => ISuccessResult<T>;
  readonly mapErrAsync: <M>(mapFunction: (value: never) => Promise<M>) => Promise<ISuccessResult<T>>;
}

export class SuccessResult<T = void> implements ISuccessResult<T> {
  public readonly success = true as const;
  public readonly value: T;

  public constructor(value?: T) {
    this.value = value as T;
  }

  public map<M>(mapFunction: (value: T) => M): SuccessResult<M> {
    return new SuccessResult(mapFunction(this.value));
  }

  public async mapAsync<M>(mapFunction: (value: T) => Promise<M>): Promise<SuccessResult<M>> {
    return new SuccessResult(await mapFunction(this.value));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unnecessary-type-parameters
  public mapErr<M>(mapFunction: (error: never) => M): this {
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
  public async mapErrAsync<M>(mapFunction: (value: never) => Promise<M>): Promise<this> {
    return this;
  }
};

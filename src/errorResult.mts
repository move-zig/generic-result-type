export interface IErrorResult<E = Error> {
  readonly success: false;
  readonly error: E;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  readonly map: <M>(mapFunction: (value: never) => M) => IErrorResult<E>;
  readonly mapAsync: <M>(mapFunction: (value: never) => Promise<M>) => Promise<IErrorResult<E>>;
  readonly mapErr: <M>(mapFunction: (value: E) => M) => IErrorResult<M>;
  readonly mapErrAsync: <M>(mapFunction: (value: E) => Promise<M>) => Promise<IErrorResult<M>>;
}

export class ErrorResult<E> implements IErrorResult<E> {
  public readonly success = false as const;

  public constructor(public readonly error: E) { /* empty */ }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unnecessary-type-parameters
  public map<M>(mapFunction: (error: never) => M): this {
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
  public async mapAsync<M>(mapFunction: (value: never) => Promise<M>): Promise<this> {
    return this;
  }

  public mapErr<M>(mapFunction: (error: E) => M): ErrorResult<M> {
    return new ErrorResult(mapFunction(this.error));
  }

  public async mapErrAsync<M>(mapFunction: (value: E) => Promise<M>): Promise<ErrorResult<M>> {
    return new ErrorResult(await mapFunction(this.error));
  }
}

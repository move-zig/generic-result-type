export interface IErrorResult<E = Error> {
  readonly success: false;
  readonly error: E;
  readonly map: <M>(mapFunction: (value: E) => M) => IErrorResult<M>;
  readonly mapAsync: <M>(mapFunction: (value: E) => Promise<M>) => Promise<IErrorResult<M>>;
}

export class ErrorResult<E> implements IErrorResult<E> {
  public readonly success = false as const;

  public constructor(public readonly error: E) { /* empty */ }

  public map<M>(mapFunction: (error: E) => M): ErrorResult<M> {
    return new ErrorResult(mapFunction(this.error));
  }

  public async mapAsync<M>(mapFunction: (value: E) => Promise<M>): Promise<ErrorResult<M>> {
    return new ErrorResult(await mapFunction(this.error));
  }
}

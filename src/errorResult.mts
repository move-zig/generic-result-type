import type { IResult } from './result.mjs';

export interface IErrorResult<E = Error> extends IResult<never, E> {
  readonly success: false;
  readonly error: E;

  /**
   * Returns a new `ErrorResult` with the same `error` property as this one.
   *
   * @param mapFunction the mapping function
   * @returns a new `ErrorResult`
   */
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  readonly map: <M>(mapFunction: (value: never) => M) => IErrorResult<E>;

  /**
   * Asynchronously returns a new `ErrorResult` with the same `error` property as this one.
   * @param mapFunction the mapping function
   * @returns a new `ErrorResult`
   */
  readonly mapAsync: <M>(mapFunction: (value: never) => Promise<M>) => Promise<IErrorResult<E>>;

  /**
   * Calls a defined callback function on the `error` property, and returns a new `ErrorResult` with the resulting value.
   *
   * @param mapFunction the mapping function
   * @returns a new `ErrorResult`
   */
  readonly mapErr: <M>(mapFunction: (error: E) => M) => IErrorResult<M>;

  /**
   * Asynchronously calls a defined callback function on the `error` property, and returns a new `ErrorResult` with the resulting value.
   *
   * @param mapFunction the mapping function
   * @returns a new `ErrorResult`
   */
  readonly mapErrAsync: <M>(mapFunction: (error: E) => Promise<M>) => Promise<IErrorResult<M>>;
}

export class ErrorResult<E> implements IResult<never, E>, IErrorResult<E> {
  public readonly success = false as const;

  public constructor(public readonly error: E) { /* empty */ }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unnecessary-type-parameters
  public map<M>(mapFunction: (value: never) => M): ErrorResult<E> {
    return new ErrorResult(this.error);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/promise-function-async
  public mapAsync<M>(mapFunction: (value: never) => Promise<M>): Promise<ErrorResult<E>> {
    return Promise.resolve(new ErrorResult(this.error));
  }

  public mapErr<M>(mapFunction: (error: E) => M): ErrorResult<M> {
    return new ErrorResult(mapFunction(this.error));
  }

  public async mapErrAsync<M>(mapFunction: (error: E) => Promise<M>): Promise<ErrorResult<M>> {
    return new ErrorResult(await mapFunction(this.error));
  }
}

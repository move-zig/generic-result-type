import type { IResult } from './result.mjs';

export interface ISuccessResult<T = void> {
  readonly success: true;
  readonly value: T;

  /**
   * Calls a defined callback function on the `value` property, and returns a new `SuccessResult` with the resulting value.
   *
   * @param mapFunction the mapping function
   * @returns a new `SuccessResult`
   */
  readonly map: <M>(mapFunction: (value: T) => M) => ISuccessResult<M>;

  /**
   * Asynchronously calls a defined callback function on the `value` property, and returns a new `SuccessResult` with the resulting value.
   * @param mapFunction the mapping function
   * @returns a new `SuccessResult`
   */
  readonly mapAsync: <M>(mapFunction: (value: T) => Promise<M>) => Promise<ISuccessResult<M>>;

  /**
   * Returns a new `SuccessResult` with the same `value` property as this one.
   *
   * @param mapFunction the mapping function
   * @returns a new `SuccessResult`
   */
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  readonly mapErr: <M>(mapFunction: (error: never) => M) => ISuccessResult<T>;

  /**
   * Asynchronously returns a new `SuccessResult` with the same `value` property as this one.
   *
   * @param mapFunction the mapping function
   * @returns a new `SuccessResult`
   */
  readonly mapErrAsync: <M>(mapFunction: (error: never) => Promise<M>) => Promise<ISuccessResult<T>>;
}

export class SuccessResult<T = void> implements ISuccessResult<T>, IResult<T, never> {
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
  public mapErr<M>(mapFunction: (error: never) => M): SuccessResult<T> {
    return new SuccessResult(this.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/promise-function-async
  public mapErrAsync<M>(mapFunction: (error: never) => Promise<M>): Promise<SuccessResult<T>> {
    return Promise.resolve(new SuccessResult(this.value));
  }
};

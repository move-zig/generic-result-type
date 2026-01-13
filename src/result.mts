import type { ErrorResult } from './errorResult.mjs';
import type { SuccessResult } from './successResult.mjs';

export interface IResult<T, E> {
  readonly success: boolean;

  /**
   * If a `SuccessResult`, calls a defined callback function on the `value` property, and returns a new `SuccessResult` with the resulting value.
   * If an `ErrorResult`, returns a new `ErrorResult` with the same `error` property as this one.
   *
   * @param mapFunction the mapping function
   * @returns a new `Result`
   */
  map: <M>(fn: (value: T) => M) => IResult<M, E>;

  /**
   * If a `SuccessResult`, asynchronously calls a defined callback function on the `value` property, and returns a new `SuccessResult` with the resulting value.
   * If an `ErrorResult`, asynchronously returns a new `ErrorResult` with the same `error` property as this one.
   * @param mapFunction the mapping function
   * @returns a new `Result`
   */
  mapAsync: <M>(fn: (value: T) => Promise<M>) => Promise<IResult<M, E>>;

  /**
   * If a `SuccessResult`, returns a new `SuccessResult` with the same `value` property as this one.
   * If an `ErrorResult`, calls a defined callback function on the `error` property, and returns a new `ErrorResult` with the resulting value.
   *
   * @param mapFunction the mapping function
   * @returns a new `Result`
   */
  mapErr: <M>(fn: (error: E) => M) => IResult<T, M>;

  /**
   * If a `SuccessResult`, asynchronously returns a new `SuccessResult` with the same `value` property as this one.
   * If an `ErrorResult`, asynchronously calls a defined callback function on the `error` property, and returns a new `ErrorResult` with the resulting value.
   *
   * @param mapFunction the mapping function
   * @returns a new `Result`
   */
  mapErrAsync: <M>(fn: (error: E) => Promise<M>) => Promise<IResult<T, M>>;
}

export type Result<T = void, E = Error> = SuccessResult<T> | ErrorResult<E>;

import { faker } from '@faker-js/faker';

import { ErrorResult } from './errorResult.mjs';

describe('ErrorResult class', () => {
  it('can be instantiated', () => {
    expect(() => {
      const instance = new ErrorResult(Error(faker.lorem.words()));
      expect(instance).toBeInstanceOf(ErrorResult);
    }).not.toThrow();
  });

  it('retains the exact error', () => {
    const message = faker.lorem.words();
    const error = Error(message);
    const instance = new ErrorResult(error);
    expect(instance.error).toBe(error);
    expect(instance.error.message).toBe(error.message);
  });

  describe('map method', () => {
    it('returns a new instance with the same error, and doesn\'t run the callback', () => {
      const error = Symbol();
      const newValue = faker.lorem.words();
      const mappingFunction = jest.fn().mockReturnValue(newValue);

      const instance = new ErrorResult(error);
      const newInstance = instance.map(mappingFunction);

      expect(newInstance).toBeInstanceOf(ErrorResult);
      expect(newInstance).not.toBe(instance);
      expect(newInstance.error).toBe(error);
      expect(newInstance.error).toEqual(error);
      expect(mappingFunction).not.toHaveBeenCalled();
    });
  });

  describe('mapAsync method', () => {
    it('resolves a new instance with the same error, and doesn\'t run the callback', async () => {
      const error = Symbol();
      const newValue = faker.lorem.words();
      const mappingFunction = jest.fn().mockResolvedValue(newValue);

      const instance = new ErrorResult(error);
      const newInstance = await instance.mapAsync(mappingFunction);

      expect(newInstance).toBeInstanceOf(ErrorResult);
      expect(newInstance).not.toBe(instance);
      expect(newInstance.error).toBe(error);
      expect(newInstance.error).toEqual(error);
      expect(mappingFunction).not.toHaveBeenCalled();
    });
  });

  describe('mapErr method', () => {
    it('returns a new instance with the mapped error', () => {
      const error = Object.freeze(Error(faker.lorem.words()));
      const newError = faker.date.anytime();
      const mappingFunction = jest.fn().mockReturnValue(newError);

      const instance = new ErrorResult(error);
      const newInstance = instance.mapErr(mappingFunction);

      expect(newInstance).toBeInstanceOf(ErrorResult);
      expect(newInstance).not.toBe(instance);
      expect(newInstance.error).toBe(newError);
      expect(newInstance.error).toEqual(newError);
      expect(instance.error).toBe(error);
      expect(instance.error).toEqual(error);
      expect(mappingFunction).toHaveBeenCalledWith(error);
    });
  });

  describe('mapErrAsync method', () => {
    it('resolves a new instance with the mapped error', async () => {
      const error = Object.freeze(Error(faker.lorem.words()));
      const newError = faker.date.anytime();
      const mappingFunction = jest.fn().mockResolvedValue(newError);

      const instance = new ErrorResult(error);
      const newInstance = await instance.mapErrAsync(mappingFunction);

      expect(newInstance).toBeInstanceOf(ErrorResult);
      expect(newInstance).not.toBe(instance);
      expect(newInstance.error).toBe(newError);
      expect(newInstance.error).toEqual(newError);
      expect(instance.error).toBe(error);
      expect(instance.error).toEqual(error);
      expect(mappingFunction).toHaveBeenCalledWith(error);
    });

    it('rejects if the map function rejects', async () => {
      const instance = new ErrorResult(Error());
      const error = Error();
      await expect(instance.mapErrAsync(async () => Promise.reject(error))).rejects.toThrow(error);
    });
  });
});

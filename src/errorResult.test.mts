import { faker } from '@faker-js/faker';

import { ErrorResult } from './errorResult.mjs';

describe('ErrorResult class', () => {
  it('can be instantiated', () => {
    expect(() => {
      const instance = new ErrorResult(Error());
      expect(instance).toBeInstanceOf(ErrorResult);
    }).not.toThrow();
  });

  it('retains the error', () => {
    const message = faker.lorem.words();
    const error = Error(message);
    const instance = new ErrorResult(error);
    expect(instance.error).toBeInstanceOf(Error);
    expect(instance.error.message).toBe(error.message);
    expect(instance.error).toBe(error);
  });

  describe('map method', () => {
    it('returns the result unchanged and doesn\'t run the mapping function', () => {
      const value = Symbol();
      const newValue = faker.lorem.words();
      const mappingFunction = jest.fn().mockReturnValue(newValue);

      const instance = new ErrorResult(value);
      const newInstance = instance.map(mappingFunction);

      expect(newInstance).toBe(instance);
      expect(mappingFunction).not.toHaveBeenCalled();
    });
  });

  describe('mapAsync method', () => {
    it('resolves the result unchanged', async () => {
      const value = Symbol();
      const newValue = faker.lorem.words();
      const mappingFunction = jest.fn().mockResolvedValue(newValue);

      const instance = new ErrorResult(value);
      const newInstance = await instance.mapAsync(mappingFunction);

      expect(newInstance).toBe(instance);
      expect(mappingFunction).not.toHaveBeenCalled();
    });

    it('resolves the result unchanged', async () => {
      const value = Symbol();
      const newValue = faker.lorem.words();
      const mappingFunction = jest.fn().mockRejectedValue(newValue);

      const instance = new ErrorResult(value);
      const newInstance = await instance.mapAsync(mappingFunction);

      expect(newInstance).toBe(instance);
      expect(mappingFunction).not.toHaveBeenCalled();
    });
  });

  describe('mapErr method', () => {
    it('returns a new ErrorResult with the mapped value', () => {
      const error = Error(faker.lorem.words());
      const newError = faker.date.anytime();
      const mappingFunction = jest.fn().mockReturnValue(newError);

      const instance = new ErrorResult(error);
      const newInstance = instance.mapErr(mappingFunction);

      expect(newInstance).toBeInstanceOf(ErrorResult);
      expect(newInstance).not.toBe(instance);
      expect(newInstance.error).toBe(newError);
      expect(instance.error).toBe(error);

      expect(mappingFunction).toHaveBeenCalledWith(error);
    });
  });

  describe('mapErrAsync method', () => {
    it('resolves a new ErrorResult with the mapped value', async () => {
      const error = Error(faker.lorem.words());
      const newError = faker.date.anytime();
      const mappingFunction = jest.fn().mockResolvedValue(newError);

      const instance = new ErrorResult(error);
      const newInstance = await instance.mapErrAsync(mappingFunction);

      expect(newInstance).toBeInstanceOf(ErrorResult);
      expect(newInstance).not.toBe(instance);
      expect(newInstance.error).toBe(newError);
      expect(instance.error).toBe(error);

      expect(mappingFunction).toHaveBeenCalledWith(error);
    });

    it('rejects if the map function rejects', async () => {
      const instance = new ErrorResult(Error());
      const error = Error();
      await expect(instance.mapErrAsync(async () => Promise.reject(error))).rejects.toThrow(error);
    });
  });
});

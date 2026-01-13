import { faker } from '@faker-js/faker';

import { SuccessResult } from '../src/successResult.mjs';

describe('SuccessResult class', () => {
  it('can be instantiated', () => {
    expect(() => {
      const instance = new SuccessResult();
      expect(instance).toBeInstanceOf(SuccessResult);
    }).not.toThrow();
  });

  it('can be instantiated with a value', () => {
    expect(() => {
      const instance = new SuccessResult(25);
      expect(instance).toBeInstanceOf(SuccessResult);
    }).not.toThrow();
  });

  it('retains the exact value', () => {
    const value = Object.freeze({ name: faker.person.fullName(), score: faker.number.int() });
    const instance = new SuccessResult(value);
    expect(instance.value).toBe(value);
    expect(instance.value).toEqual(value);
  });

  describe('map method', () => {
    it('returns a new instance with the mapped value', () => {
      const value = Object.freeze({ s: Symbol() });
      const newValue = faker.lorem.words();
      const mappingFunction = jest.fn().mockReturnValue(newValue);

      const instance = new SuccessResult(value);
      const newInstance = instance.map(mappingFunction);

      expect(newInstance).toBeInstanceOf(SuccessResult);
      expect(newInstance).not.toBe(instance);
      expect(newInstance.value).toBe(newValue);
      expect(newInstance.value).toEqual(newValue);
      expect(instance.value).toBe(value);
      expect(instance.value).toEqual(value);
      expect(mappingFunction).toHaveBeenCalledWith(value);
    });
  });

  describe('mapAsync method', () => {
    it('resolves a new instance with the mapped value', async () => {
      const value = Symbol();
      const newValue = faker.lorem.words();
      const mappingFunction = jest.fn().mockResolvedValue(newValue);

      const instance = new SuccessResult(value);
      const newInstance = await instance.mapAsync(mappingFunction);

      expect(newInstance).toBeInstanceOf(SuccessResult);
      expect(newInstance).not.toBe(instance);
      expect(newInstance.value).toBe(newValue);
      expect(newInstance.value).toEqual(newValue);
      expect(instance.value).toBe(value);
      expect(instance.value).toEqual(value);
      expect(mappingFunction).toHaveBeenCalledWith(value);
    });

    it('rejects if the map function rejects', async () => {
      const instance = new SuccessResult();
      const error = Error();
      await expect(instance.mapAsync(async () => Promise.reject(error))).rejects.toThrow(error);
    });
  });

  describe('mapErr method', () => {
    it('returns a new instance with the same value, and doesn\'t run the callback', () => {
      const value = Symbol();
      const newError = faker.lorem.words();
      const mappingFunction = jest.fn().mockReturnValue(newError);

      const instance = new SuccessResult(value);
      const newInstance = instance.mapErr(mappingFunction);

      expect(newInstance).toBeInstanceOf(SuccessResult);
      expect(newInstance).not.toBe(instance);
      expect(newInstance.value).toBe(value);
      expect(newInstance.value).toEqual(value);
      expect(mappingFunction).not.toHaveBeenCalled();
    });
  });

  describe('mapErrAsync method', () => {
    it('resolves a new instance with the same value, and doesn\'t run the callback', async () => {
      const value = Symbol();
      const newError = faker.lorem.words();
      const mappingFunction = jest.fn().mockResolvedValue(newError);

      const instance = new SuccessResult(value);
      const newInstance = await instance.mapErrAsync(mappingFunction);

      expect(newInstance).toBeInstanceOf(SuccessResult);
      expect(newInstance).not.toBe(instance);
      expect(newInstance.value).toBe(value);
      expect(newInstance.value).toEqual(value);
      expect(mappingFunction).not.toHaveBeenCalled();
    });
  });
});

import { faker } from '@faker-js/faker';

import { SuccessResult } from '../src/successResult.mjs';

describe('SuccessResult class', () => {
  it('can be instantiated', () => {
    expect(() => {
      const instance = new SuccessResult(undefined);
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
    const value = { name: faker.person.fullName(), score: faker.number.int() };
    const instance = new SuccessResult(value);
    expect(instance.value).toBe(value);
  });

  describe('map method', () => {
    it('returns a new SuccessResult with the mapped value', () => {
      const value = Symbol();
      const newValue = faker.lorem.words();

      const instance = new SuccessResult(value);
      const newInstance = instance.map(() => newValue);

      expect(newInstance).toBeInstanceOf(SuccessResult);
      expect(newInstance).not.toBe(instance);
      expect(newInstance.value).toBe(newValue);
      expect(instance.value).toBe(value);
    });
  });
});

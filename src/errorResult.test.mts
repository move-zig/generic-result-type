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
    it('returns a new ErrorResult with the mapped value', () => {
      const error = Error(faker.lorem.words());
      const newError = faker.date.anytime();

      const instance = new ErrorResult(error);
      const newInstance = instance.map(() => newError);

      expect(newInstance).toBeInstanceOf(ErrorResult);
      expect(newInstance).not.toBe(instance);
      expect(newInstance.error).toBe(newError);
      expect(instance.error).toBe(error);
    });
  });
});

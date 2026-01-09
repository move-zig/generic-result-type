import { faker } from '@faker-js/faker';

import { Result } from '../src/result.mjs';
import { SuccessResult } from '../src/successResult.mjs';

describe('SuccessResult class', () => {
  it('can be instantiated', () => {
    expect(() => {
      const instance = Result.success(undefined);
      expect(instance).toBeInstanceOf(SuccessResult);
    }).not.toThrow();
  });

  it('can be instantiated with a value', () => {
    expect(() => {
      const instance = Result.success(25);
      expect(instance).toBeInstanceOf(SuccessResult);
    }).not.toThrow();
  });

  it('retains the exact value', () => {
    const value = { name: faker.person.fullName(), score: faker.number.int() };
    const instance = Result.success(value);
    expect(instance.value).toBe(value);
  });
});

import { faker } from '@faker-js/faker';

import { ErrorResult } from '../src/errorResult.mjs';
import { Result } from '../src/result.mjs';

describe('ErrorResult class', () => {
  it('can be instantiated', () => {
    expect(() => {
      const instance = Result.fail(Error());
      expect(instance).toBeInstanceOf(ErrorResult);
    }).not.toThrow();
  });

  it('retains the error', () => {
    const message = faker.lorem.words();
    const error = Error(message);
    const instance = Result.fail(error);
    expect(instance.error).toBeInstanceOf(Error);
    expect(instance.error.message).toBe(error.message);
    expect(instance.error).toBe(error);
  });
});

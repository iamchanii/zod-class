import { expect, it, vi } from 'vitest';
import { z } from 'zod';
import { ZodClass } from './ZodClass';

class User extends ZodClass({
  name: z.string(),
  age: z.number(),
}) {
  get isAdult() {
    return this.age >= 18;
  }

  sayHi() {
    return `Hi, my name is ${this.name} and I'm ${this.age} years old`;
  }
}

it('should create class instance succesfully', () => {
  const user = new User({ name: 'John', age: 42 });

  expect(user.name).toBe('John');
  expect(user.age).toBe(42);
});

it('should use class methods', () => {
  const kid = new User({ name: 'John', age: 12 });

  expect(kid.isAdult).toBe(false);
  expect(kid.sayHi()).toMatchInlineSnapshot(
    '"Hi, my name is John and I\'m 12 years old"',
  );
});

it('should check instance type', () => {
  const user = new User({ name: 'John', age: 42 });

  expect(user).toBeInstanceOf(User);
  expect({ name: 'John', age: 42 }).not.toBeInstanceOf(User);
});

it('should parse unknown data', () => {
  const parsedUser: User = User.parse({ name: 'Kane', age: 33 });

  expect(parsedUser).toBeInstanceOf(User);
  expect(parsedUser.name).toBe('Kane');
  expect(parsedUser.age).toBe(33);
  expect(parsedUser.sayHi()).toMatchInlineSnapshot(
    '"Hi, my name is Kane and I\'m 33 years old"',
  );
});

it('should access static schema', () => {
  expect(User.schema).toBeInstanceOf(z.ZodObject);
});

it('should parse successfully using static method without this scope problem', async () => {
  vi.useFakeTimers();

  const getFakeFetchResponse = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ name: 'John', age: 42 });
      }, 1000);
    });

  const response = getFakeFetchResponse().then(User.parse);
  await vi.runAllTimersAsync();

  const parsedUser = await response;
  expect(parsedUser).toBeInstanceOf(User);
  expect(parsedUser.name).toBe('John');
  expect(parsedUser.age).toBe(42);
});

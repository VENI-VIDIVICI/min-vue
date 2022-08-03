import { expect, describe, test } from 'vitest';
import { reactive, isReactive } from '../reactive/reactive';
// Edit an assertion and save to see HMR in action

describe('test reactive', () => {
  test('object', () => {
    let origin1 = { a: 2 };
    const observe = reactive(origin1);
    expect(origin1).not.toBe(observe);
    expect(isReactive(observe)).toBe(true);
    expect(isReactive(origin1)).toBe(false);
    expect(origin1.a).toBe(2);
  });
});

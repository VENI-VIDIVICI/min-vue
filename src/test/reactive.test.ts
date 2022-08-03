import { expect, describe, test } from 'vitest';
import { reactive, isReactive } from '../reactive/reactive';
import { effect } from '../reactive/effect';
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
  test('proxy', () => {
    let c: number;
    let observer = reactive({ a: 2 });
    effect(() => {
      c = observer.a;
      console.log(c);
    });
    expect(c).toBe(2);
    observer.a = 5;
    expect(c).toBe(5);
  });
});

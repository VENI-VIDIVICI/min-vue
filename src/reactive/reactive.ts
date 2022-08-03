import { trigger, track } from './effect';
export const enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  IS_SHALLOW = '__v_isShallow',
  RAW = '__v_raw',
}
export interface Target {
  [ReactiveFlags.SKIP]?: boolean;
  [ReactiveFlags.IS_REACTIVE]?: boolean;
  [ReactiveFlags.IS_READONLY]?: boolean;
  [ReactiveFlags.IS_SHALLOW]?: boolean;
  [ReactiveFlags.RAW]?: any;
}
function isObject(value: unknown): value is object {
  return value !== null && typeof value == 'object';
}
export function reactive<T>(target: T): T;
export function reactive(target: object) {
  return new Proxy(target, {
    get(target: Target, key: string | symbol, receiver: object) {
      if (key === ReactiveFlags.IS_REACTIVE) {
        return true;
      }
      let res = Reflect.get(target, key, receiver);
      track(target, key);
      return res;
    },
    set(
      target: object,
      key: string | symbol,
      value: unknown,
      receiver: object
    ) {
      const result = Reflect.set(target, key, value, receiver);
      if (isObject(result)) {
      }
      trigger(target, key);
      return result;
    },
  });
}

export function isReactive(target: unknown) {
  return target && !!(target as Target)[ReactiveFlags.IS_REACTIVE];
}

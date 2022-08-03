type KeyToDepMap = Map<any, Set<any>>;
export const targetMap = new Map<any, KeyToDepMap>();
export let activeEffect: any | undefined;
export function trigger(target: object, key: unknown) {
  let depMap = targetMap.get(target);
  if (!depMap) {
    return;
  }
  let deps: any[] = [];
  console.log(key);
  if (key !== void 0) {
    let depSet = depMap.get(key);
    if (depSet) {
      depSet.forEach((dep) => {
        deps.push(dep);
      });
    }
  }
  for (let i = 0; i < deps.length; i++) {
    deps[i].run();
  }
}

export function track(target: object, key: unknown) {
  if (!activeEffect) return;
  let depMap = targetMap.get(target);
  if (!depMap) {
    targetMap.set(target, (depMap = new Map()));
  }
  let deps = depMap.get(key);
  if (!deps) {
    depMap.set(key, (deps = new Set()));
  }
  // TODO 设置当前effect
  deps.add(activeEffect);
}
class ReactiveEffect {
  constructor(public fn: Function) {}
  run() {
    activeEffect = this;
    try {
      return this.fn();
    } finally {
      activeEffect = undefined;
    }
  }
}
export function effect(fn: Function) {
  if (typeof fn !== 'function') {
    return;
  }
  const _effect = new ReactiveEffect(fn);
  _effect.run();
  const runner = _effect.run.bind(_effect);
  return runner;
}

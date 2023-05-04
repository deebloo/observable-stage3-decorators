let scheduler: Promise<any> | null = null;
const effects: Array<() => void> = [];

export function observe(
  base: ClassAccessorDecoratorTarget<any, any>,
  _: ClassAccessorDecoratorContext
): ClassAccessorDecoratorResult<any, any> {
  return {
    set(value: any) {
      if (!scheduler) {
        scheduler = Promise.resolve().then(() => {
          scheduler = null;

          for (let effect of effects) {
            effect();
          }
        })
      }

      base.set.call(this, value);
    },
  };
}

export function effect(cb: () => void) {
  const index = effects.push(cb) - 1;

  return () => {
    effects.splice(index, 1);
  }
}

export function computed<T>(cb: () => T) {
  const val = {
    value: cb()
  };

  effect(() => {
    val.value = cb();
  });

  return val;
}

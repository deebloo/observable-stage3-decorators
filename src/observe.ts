const schedulers = new WeakMap();
const collectedChanges = new WeakMap();

export class PropChangeMap<K, V> extends Map<K, V> {}

export function observe(
  base: ClassAccessorDecoratorTarget<any, any>,
  ctx: ClassAccessorDecoratorContext
): ClassAccessorDecoratorResult<any, any> {
  return {
    set(value: any) {
      // Schedule update
      if (!schedulers.has(this)) {
        schedulers.set(
          this,
          Promise.resolve().then(() => {
            if (this.onPropertyChanged) {
              this.onPropertyChanged(collectedChanges.get(this));
            }

            schedulers.delete(this);
            collectedChanges.delete(this);
          })
        );
      }

      let changes = collectedChanges.get(this);

      if (!changes) {
        changes = new PropChangeMap();
        collectedChanges.set(this, changes);
      }

      changes.set(ctx.name, value);

      base.set.call(this, value);
    },
  };
}

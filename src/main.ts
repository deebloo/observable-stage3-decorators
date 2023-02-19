const schedulers = new WeakMap();
const collectedChanges = new WeakMap();

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
        changes = new Map();
        collectedChanges.set(this, changes);
      }

      changes.set(ctx.name, value);

      base.set.call(this, value);
    },
  };
}

class State {
  @observe accessor foo = "";
  @observe accessor bar = "";

  onPropertyChanged(val: Map<any, any>) {
    console.log("#### START: Batched Property Changes ####");
    console.log(val); // Map(2) {'foo' => '3', 'bar' => 'bring it'}
    console.log("#### END: Batched Property Changes ####");
  }
}

const state = new State();

state.foo = "1";
state.foo = "2";
state.foo = "3";
state.bar = "another";
state.bar = "bring it";

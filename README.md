# New Decorator Observable Props

Demonstrates a technique for monitoring property changes on a class instance using stage 3 decorators.
This should work with both plain classes and with custom elements. It is important that this does not require subclassing.

## Demo

make changes to src/main.ts to see changes

```shell
npm i
```

```shell
npm start --watch
```

```ts
class State {
  @observe accessor fname = "";
  @observe accessor lname = "";

  onPropertyChanged(val: Map<string, unknown>) {
    // will be called once changes are settled
  }
}

```

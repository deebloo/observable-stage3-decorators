# New Decorator Observable Props

Demonstrates a technique for monitoring property changes on a class instance using stage 3 decorators.

## Demo

```shell
npm i
```

```shell
npm start --watch
```

```tx
class State {
  @observe accessor fname = "";
  @observe accessor lname = "";

  onPropertyChanged(val: Map<string, unknown>) {
    // will be called once changes are settled
  }
}

```

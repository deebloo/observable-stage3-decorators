import { observe, PropChangeMap } from "./observe.js";

class State {
  @observe accessor foo = "";
  @observe accessor bar = "";

  onPropertyChanged(val: PropChangeMap<any, any>) {
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

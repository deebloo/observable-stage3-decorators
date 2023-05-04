import { computed, effect, observe } from "./observe.js";

class State {
  @observe accessor foo = "0";
  @observe accessor bar = "false";

  test = computed(() => this.foo + " " + this.bar)
}

const state = new State();

console.log(state.test);

effect(() => {
  console.log(state.test);
})

state.foo = "1";
state.foo = "2";
state.foo = "3";
state.bar = "another";
state.bar = "bring it";

import { computed, effect, observe } from "./observe.js";

class State1 {
  @observe accessor foo = "0";
}

class State2 {
  @observe accessor bar = "false";
}

const state1 = new State1();
const state2 = new State2();

const test = computed(() => state1.foo + " " + state2.bar);

console.log(test);

effect(() => {
  console.log(test);
})

state1.foo = "1";
state1.foo = "2";
state1.foo = "3";
state2.bar = "another";
state2.bar = "bring it";

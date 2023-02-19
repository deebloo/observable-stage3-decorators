var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
const schedulers = new WeakMap();
const collectedChanges = new WeakMap();
export function observe(base, ctx) {
    return {
        set(value) {
            // Schedule update
            if (!schedulers.has(this)) {
                schedulers.set(this, Promise.resolve().then(() => {
                    if (this.onPropertyChanged) {
                        this.onPropertyChanged(collectedChanges.get(this));
                    }
                    schedulers.delete(this);
                    collectedChanges.delete(this);
                }));
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
let State = (() => {
    let _instanceExtraInitializers = [];
    let _foo_decorators;
    let _foo_initializers = [];
    let _bar_decorators;
    let _bar_initializers = [];
    return class State {
        static {
            _foo_decorators = [observe];
            _bar_decorators = [observe];
            __esDecorate(this, null, _foo_decorators, { kind: "accessor", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } } }, _foo_initializers, _instanceExtraInitializers);
            __esDecorate(this, null, _bar_decorators, { kind: "accessor", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } } }, _bar_initializers, _instanceExtraInitializers);
        }
        #foo_accessor_storage = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _foo_initializers, ""));
        get foo() { return this.#foo_accessor_storage; }
        set foo(value) { this.#foo_accessor_storage = value; }
        #bar_accessor_storage = __runInitializers(this, _bar_initializers, "");
        get bar() { return this.#bar_accessor_storage; }
        set bar(value) { this.#bar_accessor_storage = value; }
        onPropertyChanged(val) {
            console.log("#### Batched Property Changes ##################");
            console.log(val); // Map(2) {'foo' => '3', 'bar' => 'bring it'}
            console.log("##################");
        }
    };
})();
const state = new State();
state.foo = "1";
state.foo = "2";
state.foo = "3";
state.bar = "another";
state.bar = "bring it";

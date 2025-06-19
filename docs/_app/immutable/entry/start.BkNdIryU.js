var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _events, _instance, _a, _b, _data, _form, _error2, _params, _route, _state, _status, _url, _c, _current, _d, _current2, _e, _f;
const DEV = false;
var is_array = Array.isArray;
var index_of = Array.prototype.indexOf;
var array_from = Array.from;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var get_descriptors = Object.getOwnPropertyDescriptors;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
var is_extensible = Object.isExtensible;
const noop$1 = () => {
};
function run(fn) {
  return fn();
}
function run_all(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i]();
  }
}
const DERIVED = 1 << 1;
const EFFECT = 1 << 2;
const RENDER_EFFECT = 1 << 3;
const BLOCK_EFFECT = 1 << 4;
const BRANCH_EFFECT = 1 << 5;
const ROOT_EFFECT = 1 << 6;
const BOUNDARY_EFFECT = 1 << 7;
const UNOWNED = 1 << 8;
const DISCONNECTED = 1 << 9;
const CLEAN = 1 << 10;
const DIRTY = 1 << 11;
const MAYBE_DIRTY = 1 << 12;
const INERT = 1 << 13;
const DESTROYED = 1 << 14;
const EFFECT_RAN = 1 << 15;
const EFFECT_TRANSPARENT = 1 << 16;
const LEGACY_DERIVED_PROP = 1 << 17;
const HEAD_EFFECT = 1 << 19;
const EFFECT_HAS_DERIVED = 1 << 20;
const EFFECT_IS_UPDATING = 1 << 21;
const STATE_SYMBOL = Symbol("$state");
const LEGACY_PROPS = Symbol("legacy props");
const LOADING_ATTR_SYMBOL = Symbol("");
function equals(value) {
  return value === this.v;
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function safe_equals(value) {
  return !safe_not_equal(value, this.v);
}
function effect_in_teardown(rune) {
  {
    throw new Error(`https://svelte.dev/e/effect_in_teardown`);
  }
}
function effect_in_unowned_derived() {
  {
    throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
  }
}
function effect_orphan(rune) {
  {
    throw new Error(`https://svelte.dev/e/effect_orphan`);
  }
}
function effect_update_depth_exceeded() {
  {
    throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
  }
}
function hydration_failed() {
  {
    throw new Error(`https://svelte.dev/e/hydration_failed`);
  }
}
function props_invalid_value(key) {
  {
    throw new Error(`https://svelte.dev/e/props_invalid_value`);
  }
}
function state_descriptors_fixed() {
  {
    throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
  }
}
function state_prototype_fixed() {
  {
    throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
  }
}
function state_unsafe_mutation() {
  {
    throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
  }
}
let legacy_mode_flag = false;
let tracing_mode_flag = false;
function enable_legacy_mode_flag() {
  legacy_mode_flag = true;
}
const EACH_ITEM_REACTIVE = 1;
const EACH_INDEX_REACTIVE = 1 << 1;
const EACH_IS_CONTROLLED = 1 << 2;
const EACH_IS_ANIMATED = 1 << 3;
const EACH_ITEM_IMMUTABLE = 1 << 4;
const PROPS_IS_IMMUTABLE = 1;
const PROPS_IS_RUNES = 1 << 1;
const PROPS_IS_UPDATED = 1 << 2;
const PROPS_IS_BINDABLE = 1 << 3;
const PROPS_IS_LAZY_INITIAL = 1 << 4;
const TEMPLATE_FRAGMENT = 1;
const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
const HYDRATION_START = "[";
const HYDRATION_START_ELSE = "[!";
const HYDRATION_END = "]";
const HYDRATION_ERROR = {};
const UNINITIALIZED = Symbol();
const NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
function lifecycle_outside_component(name) {
  {
    throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
  }
}
let component_context = null;
function set_component_context(context) {
  component_context = context;
}
function push(props, runes = false, fn) {
  var ctx = component_context = {
    p: component_context,
    c: null,
    d: false,
    e: null,
    m: false,
    s: props,
    x: null,
    l: null
  };
  if (legacy_mode_flag && !runes) {
    component_context.l = {
      s: null,
      u: null,
      r1: [],
      r2: source(false)
    };
  }
  teardown(() => {
    ctx.d = true;
  });
}
function pop(component2) {
  const context_stack_item = component_context;
  if (context_stack_item !== null) {
    const component_effects = context_stack_item.e;
    if (component_effects !== null) {
      var previous_effect = active_effect;
      var previous_reaction = active_reaction;
      context_stack_item.e = null;
      try {
        for (var i = 0; i < component_effects.length; i++) {
          var component_effect = component_effects[i];
          set_active_effect(component_effect.effect);
          set_active_reaction(component_effect.reaction);
          effect(component_effect.fn);
        }
      } finally {
        set_active_effect(previous_effect);
        set_active_reaction(previous_reaction);
      }
    }
    component_context = context_stack_item.p;
    context_stack_item.m = true;
  }
  return (
    /** @type {T} */
    {}
  );
}
function is_runes() {
  return !legacy_mode_flag || component_context !== null && component_context.l === null;
}
function proxy(value) {
  if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
    return value;
  }
  const prototype = get_prototype_of(value);
  if (prototype !== object_prototype && prototype !== array_prototype) {
    return value;
  }
  var sources = /* @__PURE__ */ new Map();
  var is_proxied_array = is_array(value);
  var version2 = /* @__PURE__ */ state(0);
  var reaction = active_reaction;
  var with_parent = (fn) => {
    var previous_reaction = active_reaction;
    set_active_reaction(reaction);
    var result = fn();
    set_active_reaction(previous_reaction);
    return result;
  };
  if (is_proxied_array) {
    sources.set("length", /* @__PURE__ */ state(
      /** @type {any[]} */
      value.length
    ));
  }
  return new Proxy(
    /** @type {any} */
    value,
    {
      defineProperty(_, prop2, descriptor) {
        if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
          state_descriptors_fixed();
        }
        var s = sources.get(prop2);
        if (s === void 0) {
          s = with_parent(() => /* @__PURE__ */ state(descriptor.value));
          sources.set(prop2, s);
        } else {
          set$1(
            s,
            with_parent(() => proxy(descriptor.value))
          );
        }
        return true;
      },
      deleteProperty(target2, prop2) {
        var s = sources.get(prop2);
        if (s === void 0) {
          if (prop2 in target2) {
            sources.set(
              prop2,
              with_parent(() => /* @__PURE__ */ state(UNINITIALIZED))
            );
            update_version(version2);
          }
        } else {
          if (is_proxied_array && typeof prop2 === "string") {
            var ls = (
              /** @type {Source<number>} */
              sources.get("length")
            );
            var n = Number(prop2);
            if (Number.isInteger(n) && n < ls.v) {
              set$1(ls, n);
            }
          }
          set$1(s, UNINITIALIZED);
          update_version(version2);
        }
        return true;
      },
      get(target2, prop2, receiver) {
        var _a2;
        if (prop2 === STATE_SYMBOL) {
          return value;
        }
        var s = sources.get(prop2);
        var exists = prop2 in target2;
        if (s === void 0 && (!exists || ((_a2 = get_descriptor(target2, prop2)) == null ? void 0 : _a2.writable))) {
          s = with_parent(() => /* @__PURE__ */ state(proxy(exists ? target2[prop2] : UNINITIALIZED)));
          sources.set(prop2, s);
        }
        if (s !== void 0) {
          var v = get$1(s);
          return v === UNINITIALIZED ? void 0 : v;
        }
        return Reflect.get(target2, prop2, receiver);
      },
      getOwnPropertyDescriptor(target2, prop2) {
        var descriptor = Reflect.getOwnPropertyDescriptor(target2, prop2);
        if (descriptor && "value" in descriptor) {
          var s = sources.get(prop2);
          if (s) descriptor.value = get$1(s);
        } else if (descriptor === void 0) {
          var source2 = sources.get(prop2);
          var value2 = source2 == null ? void 0 : source2.v;
          if (source2 !== void 0 && value2 !== UNINITIALIZED) {
            return {
              enumerable: true,
              configurable: true,
              value: value2,
              writable: true
            };
          }
        }
        return descriptor;
      },
      has(target2, prop2) {
        var _a2;
        if (prop2 === STATE_SYMBOL) {
          return true;
        }
        var s = sources.get(prop2);
        var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target2, prop2);
        if (s !== void 0 || active_effect !== null && (!has || ((_a2 = get_descriptor(target2, prop2)) == null ? void 0 : _a2.writable))) {
          if (s === void 0) {
            s = with_parent(() => /* @__PURE__ */ state(has ? proxy(target2[prop2]) : UNINITIALIZED));
            sources.set(prop2, s);
          }
          var value2 = get$1(s);
          if (value2 === UNINITIALIZED) {
            return false;
          }
        }
        return has;
      },
      set(target2, prop2, value2, receiver) {
        var _a2;
        var s = sources.get(prop2);
        var has = prop2 in target2;
        if (is_proxied_array && prop2 === "length") {
          for (var i = value2; i < /** @type {Source<number>} */
          s.v; i += 1) {
            var other_s = sources.get(i + "");
            if (other_s !== void 0) {
              set$1(other_s, UNINITIALIZED);
            } else if (i in target2) {
              other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
              sources.set(i + "", other_s);
            }
          }
        }
        if (s === void 0) {
          if (!has || ((_a2 = get_descriptor(target2, prop2)) == null ? void 0 : _a2.writable)) {
            s = with_parent(() => /* @__PURE__ */ state(void 0));
            set$1(
              s,
              with_parent(() => proxy(value2))
            );
            sources.set(prop2, s);
          }
        } else {
          has = s.v !== UNINITIALIZED;
          set$1(
            s,
            with_parent(() => proxy(value2))
          );
        }
        var descriptor = Reflect.getOwnPropertyDescriptor(target2, prop2);
        if (descriptor == null ? void 0 : descriptor.set) {
          descriptor.set.call(receiver, value2);
        }
        if (!has) {
          if (is_proxied_array && typeof prop2 === "string") {
            var ls = (
              /** @type {Source<number>} */
              sources.get("length")
            );
            var n = Number(prop2);
            if (Number.isInteger(n) && n >= ls.v) {
              set$1(ls, n + 1);
            }
          }
          update_version(version2);
        }
        return true;
      },
      ownKeys(target2) {
        get$1(version2);
        var own_keys = Reflect.ownKeys(target2).filter((key2) => {
          var source3 = sources.get(key2);
          return source3 === void 0 || source3.v !== UNINITIALIZED;
        });
        for (var [key, source2] of sources) {
          if (source2.v !== UNINITIALIZED && !(key in target2)) {
            own_keys.push(key);
          }
        }
        return own_keys;
      },
      setPrototypeOf() {
        state_prototype_fixed();
      }
    }
  );
}
function update_version(signal, d = 1) {
  set$1(signal, signal.v + d);
}
// @__NO_SIDE_EFFECTS__
function derived(fn) {
  var flags = DERIVED | DIRTY;
  var parent_derived = active_reaction !== null && (active_reaction.f & DERIVED) !== 0 ? (
    /** @type {Derived} */
    active_reaction
  ) : null;
  if (active_effect === null || parent_derived !== null && (parent_derived.f & UNOWNED) !== 0) {
    flags |= UNOWNED;
  } else {
    active_effect.f |= EFFECT_HAS_DERIVED;
  }
  const signal = {
    ctx: component_context,
    deps: null,
    effects: null,
    equals,
    f: flags,
    fn,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      null
    ),
    wv: 0,
    parent: parent_derived ?? active_effect
  };
  return signal;
}
// @__NO_SIDE_EFFECTS__
function user_derived(fn) {
  const d = /* @__PURE__ */ derived(fn);
  push_reaction_value(d);
  return d;
}
// @__NO_SIDE_EFFECTS__
function derived_safe_equal(fn) {
  const signal = /* @__PURE__ */ derived(fn);
  signal.equals = safe_equals;
  return signal;
}
function destroy_derived_effects(derived2) {
  var effects = derived2.effects;
  if (effects !== null) {
    derived2.effects = null;
    for (var i = 0; i < effects.length; i += 1) {
      destroy_effect(
        /** @type {Effect} */
        effects[i]
      );
    }
  }
}
function get_derived_parent_effect(derived2) {
  var parent = derived2.parent;
  while (parent !== null) {
    if ((parent.f & DERIVED) === 0) {
      return (
        /** @type {Effect} */
        parent
      );
    }
    parent = parent.parent;
  }
  return null;
}
function execute_derived(derived2) {
  var value;
  var prev_active_effect = active_effect;
  set_active_effect(get_derived_parent_effect(derived2));
  {
    try {
      destroy_derived_effects(derived2);
      value = update_reaction(derived2);
    } finally {
      set_active_effect(prev_active_effect);
    }
  }
  return value;
}
function update_derived(derived2) {
  var value = execute_derived(derived2);
  var status = (skip_reaction || (derived2.f & UNOWNED) !== 0) && derived2.deps !== null ? MAYBE_DIRTY : CLEAN;
  set_signal_status(derived2, status);
  if (!derived2.equals(value)) {
    derived2.v = value;
    derived2.wv = increment_write_version();
  }
}
const old_values = /* @__PURE__ */ new Map();
function source(v, stack) {
  var signal = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v,
    reactions: null,
    equals,
    rv: 0,
    wv: 0
  };
  return signal;
}
// @__NO_SIDE_EFFECTS__
function state(v, stack) {
  const s = source(v);
  push_reaction_value(s);
  return s;
}
// @__NO_SIDE_EFFECTS__
function mutable_source(initial_value, immutable = false) {
  var _a2;
  const s = source(initial_value);
  if (!immutable) {
    s.equals = safe_equals;
  }
  if (legacy_mode_flag && component_context !== null && component_context.l !== null) {
    ((_a2 = component_context.l).s ?? (_a2.s = [])).push(s);
  }
  return s;
}
function mutate(source2, value) {
  set$1(
    source2,
    untrack(() => get$1(source2))
  );
  return value;
}
function set$1(source2, value, should_proxy = false) {
  if (active_reaction !== null && !untracking && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT)) !== 0 && !(reaction_sources == null ? void 0 : reaction_sources.includes(source2))) {
    state_unsafe_mutation();
  }
  let new_value = should_proxy ? proxy(value) : value;
  return internal_set(source2, new_value);
}
function internal_set(source2, value) {
  if (!source2.equals(value)) {
    var old_value = source2.v;
    if (is_destroying_effect) {
      old_values.set(source2, value);
    } else {
      old_values.set(source2, old_value);
    }
    source2.v = value;
    if ((source2.f & DERIVED) !== 0) {
      if ((source2.f & DIRTY) !== 0) {
        execute_derived(
          /** @type {Derived} */
          source2
        );
      }
      set_signal_status(source2, (source2.f & UNOWNED) === 0 ? CLEAN : MAYBE_DIRTY);
    }
    source2.wv = increment_write_version();
    mark_reactions(source2, DIRTY);
    if (is_runes() && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
      if (untracked_writes === null) {
        set_untracked_writes([source2]);
      } else {
        untracked_writes.push(source2);
      }
    }
  }
  return value;
}
function mark_reactions(signal, status) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  var runes = is_runes();
  var length = reactions.length;
  for (var i = 0; i < length; i++) {
    var reaction = reactions[i];
    var flags = reaction.f;
    if ((flags & DIRTY) !== 0) continue;
    if (!runes && reaction === active_effect) continue;
    set_signal_status(reaction, status);
    if ((flags & (CLEAN | UNOWNED)) !== 0) {
      if ((flags & DERIVED) !== 0) {
        mark_reactions(
          /** @type {Derived} */
          reaction,
          MAYBE_DIRTY
        );
      } else {
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
}
function hydration_mismatch(location2) {
  {
    console.warn(`https://svelte.dev/e/hydration_mismatch`);
  }
}
let hydrating = false;
function set_hydrating(value) {
  hydrating = value;
}
let hydrate_node;
function set_hydrate_node(node) {
  if (node === null) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  return hydrate_node = node;
}
function hydrate_next() {
  return set_hydrate_node(
    /** @type {TemplateNode} */
    /* @__PURE__ */ get_next_sibling(hydrate_node)
  );
}
function reset(node) {
  if (!hydrating) return;
  if (/* @__PURE__ */ get_next_sibling(hydrate_node) !== null) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  hydrate_node = node;
}
function next(count = 1) {
  if (hydrating) {
    var i = count;
    var node = hydrate_node;
    while (i--) {
      node = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(node);
    }
    hydrate_node = node;
  }
}
function remove_nodes() {
  var depth = 0;
  var node = hydrate_node;
  while (true) {
    if (node.nodeType === 8) {
      var data = (
        /** @type {Comment} */
        node.data
      );
      if (data === HYDRATION_END) {
        if (depth === 0) return node;
        depth -= 1;
      } else if (data === HYDRATION_START || data === HYDRATION_START_ELSE) {
        depth += 1;
      }
    }
    var next2 = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(node)
    );
    node.remove();
    node = next2;
  }
}
function read_hydration_instruction(node) {
  if (!node || node.nodeType !== 8) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  return (
    /** @type {Comment} */
    node.data
  );
}
var $window;
var $document;
var is_firefox;
var first_child_getter;
var next_sibling_getter;
function init_operations() {
  if ($window !== void 0) {
    return;
  }
  $window = window;
  $document = document;
  is_firefox = /Firefox/.test(navigator.userAgent);
  var element_prototype = Element.prototype;
  var node_prototype = Node.prototype;
  var text_prototype = Text.prototype;
  first_child_getter = get_descriptor(node_prototype, "firstChild").get;
  next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
  if (is_extensible(element_prototype)) {
    element_prototype.__click = void 0;
    element_prototype.__className = void 0;
    element_prototype.__attributes = null;
    element_prototype.__style = void 0;
    element_prototype.__e = void 0;
  }
  if (is_extensible(text_prototype)) {
    text_prototype.__t = void 0;
  }
}
function create_text(value = "") {
  return document.createTextNode(value);
}
// @__NO_SIDE_EFFECTS__
function get_first_child(node) {
  return first_child_getter.call(node);
}
// @__NO_SIDE_EFFECTS__
function get_next_sibling(node) {
  return next_sibling_getter.call(node);
}
function child(node, is_text) {
  if (!hydrating) {
    return /* @__PURE__ */ get_first_child(node);
  }
  var child2 = (
    /** @type {TemplateNode} */
    /* @__PURE__ */ get_first_child(hydrate_node)
  );
  if (child2 === null) {
    child2 = hydrate_node.appendChild(create_text());
  } else if (is_text && child2.nodeType !== 3) {
    var text2 = create_text();
    child2 == null ? void 0 : child2.before(text2);
    set_hydrate_node(text2);
    return text2;
  }
  set_hydrate_node(child2);
  return child2;
}
function first_child(fragment, is_text) {
  if (!hydrating) {
    var first = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ get_first_child(
        /** @type {Node} */
        fragment
      )
    );
    if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
    return first;
  }
  return hydrate_node;
}
function sibling(node, count = 1, is_text = false) {
  let next_sibling = hydrating ? hydrate_node : node;
  var last_sibling;
  while (count--) {
    last_sibling = next_sibling;
    next_sibling = /** @type {TemplateNode} */
    /* @__PURE__ */ get_next_sibling(next_sibling);
  }
  if (!hydrating) {
    return next_sibling;
  }
  var type = next_sibling == null ? void 0 : next_sibling.nodeType;
  if (is_text && type !== 3) {
    var text2 = create_text();
    if (next_sibling === null) {
      last_sibling == null ? void 0 : last_sibling.after(text2);
    } else {
      next_sibling.before(text2);
    }
    set_hydrate_node(text2);
    return text2;
  }
  set_hydrate_node(next_sibling);
  return (
    /** @type {TemplateNode} */
    next_sibling
  );
}
function clear_text_content(node) {
  node.textContent = "";
}
function validate_effect(rune) {
  if (active_effect === null && active_reaction === null) {
    effect_orphan();
  }
  if (active_reaction !== null && (active_reaction.f & UNOWNED) !== 0 && active_effect === null) {
    effect_in_unowned_derived();
  }
  if (is_destroying_effect) {
    effect_in_teardown();
  }
}
function push_effect(effect2, parent_effect) {
  var parent_last = parent_effect.last;
  if (parent_last === null) {
    parent_effect.last = parent_effect.first = effect2;
  } else {
    parent_last.next = effect2;
    effect2.prev = parent_last;
    parent_effect.last = effect2;
  }
}
function create_effect(type, fn, sync, push2 = true) {
  var parent = active_effect;
  var effect2 = {
    ctx: component_context,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: type | DIRTY,
    first: null,
    fn,
    last: null,
    next: null,
    parent,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0
  };
  if (sync) {
    try {
      update_effect(effect2);
      effect2.f |= EFFECT_RAN;
    } catch (e) {
      destroy_effect(effect2);
      throw e;
    }
  } else if (fn !== null) {
    schedule_effect(effect2);
  }
  var inert = sync && effect2.deps === null && effect2.first === null && effect2.nodes_start === null && effect2.teardown === null && (effect2.f & (EFFECT_HAS_DERIVED | BOUNDARY_EFFECT)) === 0;
  if (!inert && push2) {
    if (parent !== null) {
      push_effect(effect2, parent);
    }
    if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
      var derived2 = (
        /** @type {Derived} */
        active_reaction
      );
      (derived2.effects ?? (derived2.effects = [])).push(effect2);
    }
  }
  return effect2;
}
function teardown(fn) {
  const effect2 = create_effect(RENDER_EFFECT, null, false);
  set_signal_status(effect2, CLEAN);
  effect2.teardown = fn;
  return effect2;
}
function user_effect(fn) {
  validate_effect();
  var defer = active_effect !== null && (active_effect.f & BRANCH_EFFECT) !== 0 && component_context !== null && !component_context.m;
  if (defer) {
    var context = (
      /** @type {ComponentContext} */
      component_context
    );
    (context.e ?? (context.e = [])).push({
      fn,
      effect: active_effect,
      reaction: active_reaction
    });
  } else {
    var signal = effect(fn);
    return signal;
  }
}
function user_pre_effect(fn) {
  validate_effect();
  return render_effect(fn);
}
function component_root(fn) {
  const effect2 = create_effect(ROOT_EFFECT, fn, true);
  return (options = {}) => {
    return new Promise((fulfil) => {
      if (options.outro) {
        pause_effect(effect2, () => {
          destroy_effect(effect2);
          fulfil(void 0);
        });
      } else {
        destroy_effect(effect2);
        fulfil(void 0);
      }
    });
  };
}
function effect(fn) {
  return create_effect(EFFECT, fn, false);
}
function legacy_pre_effect(deps, fn) {
  var context = (
    /** @type {ComponentContextLegacy} */
    component_context
  );
  var token2 = { effect: null, ran: false };
  context.l.r1.push(token2);
  token2.effect = render_effect(() => {
    deps();
    if (token2.ran) return;
    token2.ran = true;
    set$1(context.l.r2, true);
    untrack(fn);
  });
}
function legacy_pre_effect_reset() {
  var context = (
    /** @type {ComponentContextLegacy} */
    component_context
  );
  render_effect(() => {
    if (!get$1(context.l.r2)) return;
    for (var token2 of context.l.r1) {
      var effect2 = token2.effect;
      if ((effect2.f & CLEAN) !== 0) {
        set_signal_status(effect2, MAYBE_DIRTY);
      }
      if (check_dirtiness(effect2)) {
        update_effect(effect2);
      }
      token2.ran = false;
    }
    context.l.r2.v = false;
  });
}
function render_effect(fn) {
  return create_effect(RENDER_EFFECT, fn, true);
}
function template_effect(fn, thunks = [], d = derived) {
  const deriveds = thunks.map(d);
  const effect2 = () => fn(...deriveds.map(get$1));
  return block(effect2);
}
function block(fn, flags = 0) {
  return create_effect(RENDER_EFFECT | BLOCK_EFFECT | flags, fn, true);
}
function branch(fn, push2 = true) {
  return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true, push2);
}
function execute_effect_teardown(effect2) {
  var teardown2 = effect2.teardown;
  if (teardown2 !== null) {
    const previously_destroying_effect = is_destroying_effect;
    const previous_reaction = active_reaction;
    set_is_destroying_effect(true);
    set_active_reaction(null);
    try {
      teardown2.call(null);
    } finally {
      set_is_destroying_effect(previously_destroying_effect);
      set_active_reaction(previous_reaction);
    }
  }
}
function destroy_effect_children(signal, remove_dom = false) {
  var effect2 = signal.first;
  signal.first = signal.last = null;
  while (effect2 !== null) {
    var next2 = effect2.next;
    if ((effect2.f & ROOT_EFFECT) !== 0) {
      effect2.parent = null;
    } else {
      destroy_effect(effect2, remove_dom);
    }
    effect2 = next2;
  }
}
function destroy_block_effect_children(signal) {
  var effect2 = signal.first;
  while (effect2 !== null) {
    var next2 = effect2.next;
    if ((effect2.f & BRANCH_EFFECT) === 0) {
      destroy_effect(effect2);
    }
    effect2 = next2;
  }
}
function destroy_effect(effect2, remove_dom = true) {
  var removed = false;
  if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes_start !== null) {
    remove_effect_dom(
      effect2.nodes_start,
      /** @type {TemplateNode} */
      effect2.nodes_end
    );
    removed = true;
  }
  destroy_effect_children(effect2, remove_dom && !removed);
  remove_reactions(effect2, 0);
  set_signal_status(effect2, DESTROYED);
  var transitions = effect2.transitions;
  if (transitions !== null) {
    for (const transition of transitions) {
      transition.stop();
    }
  }
  execute_effect_teardown(effect2);
  var parent = effect2.parent;
  if (parent !== null && parent.first !== null) {
    unlink_effect(effect2);
  }
  effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes_start = effect2.nodes_end = null;
}
function remove_effect_dom(node, end2) {
  while (node !== null) {
    var next2 = node === end2 ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(node)
    );
    node.remove();
    node = next2;
  }
}
function unlink_effect(effect2) {
  var parent = effect2.parent;
  var prev = effect2.prev;
  var next2 = effect2.next;
  if (prev !== null) prev.next = next2;
  if (next2 !== null) next2.prev = prev;
  if (parent !== null) {
    if (parent.first === effect2) parent.first = next2;
    if (parent.last === effect2) parent.last = prev;
  }
}
function pause_effect(effect2, callback) {
  var transitions = [];
  pause_children(effect2, transitions, true);
  run_out_transitions(transitions, () => {
    destroy_effect(effect2);
    if (callback) callback();
  });
}
function run_out_transitions(transitions, fn) {
  var remaining = transitions.length;
  if (remaining > 0) {
    var check = () => --remaining || fn();
    for (var transition of transitions) {
      transition.out(check);
    }
  } else {
    fn();
  }
}
function pause_children(effect2, transitions, local) {
  if ((effect2.f & INERT) !== 0) return;
  effect2.f ^= INERT;
  if (effect2.transitions !== null) {
    for (const transition of effect2.transitions) {
      if (transition.is_global || local) {
        transitions.push(transition);
      }
    }
  }
  var child2 = effect2.first;
  while (child2 !== null) {
    var sibling2 = child2.next;
    var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
    pause_children(child2, transitions, transparent ? local : false);
    child2 = sibling2;
  }
}
function resume_effect(effect2) {
  resume_children(effect2, true);
}
function resume_children(effect2, local) {
  if ((effect2.f & INERT) === 0) return;
  effect2.f ^= INERT;
  if ((effect2.f & CLEAN) === 0) {
    effect2.f ^= CLEAN;
  }
  if (check_dirtiness(effect2)) {
    set_signal_status(effect2, DIRTY);
    schedule_effect(effect2);
  }
  var child2 = effect2.first;
  while (child2 !== null) {
    var sibling2 = child2.next;
    var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
    resume_children(child2, transparent ? local : false);
    child2 = sibling2;
  }
  if (effect2.transitions !== null) {
    for (const transition of effect2.transitions) {
      if (transition.is_global || local) {
        transition.in();
      }
    }
  }
}
let micro_tasks = [];
let idle_tasks = [];
function run_micro_tasks() {
  var tasks = micro_tasks;
  micro_tasks = [];
  run_all(tasks);
}
function run_idle_tasks() {
  var tasks = idle_tasks;
  idle_tasks = [];
  run_all(tasks);
}
function queue_micro_task(fn) {
  if (micro_tasks.length === 0) {
    queueMicrotask(run_micro_tasks);
  }
  micro_tasks.push(fn);
}
function flush_tasks() {
  if (micro_tasks.length > 0) {
    run_micro_tasks();
  }
  if (idle_tasks.length > 0) {
    run_idle_tasks();
  }
}
let is_throwing_error = false;
let is_flushing = false;
let last_scheduled_effect = null;
let is_updating_effect = false;
let is_destroying_effect = false;
function set_is_destroying_effect(value) {
  is_destroying_effect = value;
}
let queued_root_effects = [];
let dev_effect_stack = [];
let active_reaction = null;
let untracking = false;
function set_active_reaction(reaction) {
  active_reaction = reaction;
}
let active_effect = null;
function set_active_effect(effect2) {
  active_effect = effect2;
}
let reaction_sources = null;
function push_reaction_value(value) {
  if (active_reaction !== null && active_reaction.f & EFFECT_IS_UPDATING) {
    if (reaction_sources === null) {
      reaction_sources = [value];
    } else {
      reaction_sources.push(value);
    }
  }
}
let new_deps = null;
let skipped_deps = 0;
let untracked_writes = null;
function set_untracked_writes(value) {
  untracked_writes = value;
}
let write_version = 1;
let read_version = 0;
let skip_reaction = false;
function increment_write_version() {
  return ++write_version;
}
function check_dirtiness(reaction) {
  var _a2;
  var flags = reaction.f;
  if ((flags & DIRTY) !== 0) {
    return true;
  }
  if ((flags & MAYBE_DIRTY) !== 0) {
    var dependencies = reaction.deps;
    var is_unowned = (flags & UNOWNED) !== 0;
    if (dependencies !== null) {
      var i;
      var dependency;
      var is_disconnected = (flags & DISCONNECTED) !== 0;
      var is_unowned_connected = is_unowned && active_effect !== null && !skip_reaction;
      var length = dependencies.length;
      if (is_disconnected || is_unowned_connected) {
        var derived2 = (
          /** @type {Derived} */
          reaction
        );
        var parent = derived2.parent;
        for (i = 0; i < length; i++) {
          dependency = dependencies[i];
          if (is_disconnected || !((_a2 = dependency == null ? void 0 : dependency.reactions) == null ? void 0 : _a2.includes(derived2))) {
            (dependency.reactions ?? (dependency.reactions = [])).push(derived2);
          }
        }
        if (is_disconnected) {
          derived2.f ^= DISCONNECTED;
        }
        if (is_unowned_connected && parent !== null && (parent.f & UNOWNED) === 0) {
          derived2.f ^= UNOWNED;
        }
      }
      for (i = 0; i < length; i++) {
        dependency = dependencies[i];
        if (check_dirtiness(
          /** @type {Derived} */
          dependency
        )) {
          update_derived(
            /** @type {Derived} */
            dependency
          );
        }
        if (dependency.wv > reaction.wv) {
          return true;
        }
      }
    }
    if (!is_unowned || active_effect !== null && !skip_reaction) {
      set_signal_status(reaction, CLEAN);
    }
  }
  return false;
}
function propagate_error(error2, effect2) {
  var current2 = effect2;
  while (current2 !== null) {
    if ((current2.f & BOUNDARY_EFFECT) !== 0) {
      try {
        current2.fn(error2);
        return;
      } catch {
        current2.f ^= BOUNDARY_EFFECT;
      }
    }
    current2 = current2.parent;
  }
  is_throwing_error = false;
  throw error2;
}
function should_rethrow_error(effect2) {
  return (effect2.f & DESTROYED) === 0 && (effect2.parent === null || (effect2.parent.f & BOUNDARY_EFFECT) === 0);
}
function handle_error$1(error2, effect2, previous_effect, component_context2) {
  if (is_throwing_error) {
    if (previous_effect === null) {
      is_throwing_error = false;
    }
    if (should_rethrow_error(effect2)) {
      throw error2;
    }
    return;
  }
  if (previous_effect !== null) {
    is_throwing_error = true;
  }
  propagate_error(error2, effect2);
  if (should_rethrow_error(effect2)) {
    throw error2;
  }
}
function schedule_possible_effect_self_invalidation(signal, effect2, root2 = true) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  for (var i = 0; i < reactions.length; i++) {
    var reaction = reactions[i];
    if (reaction_sources == null ? void 0 : reaction_sources.includes(signal)) continue;
    if ((reaction.f & DERIVED) !== 0) {
      schedule_possible_effect_self_invalidation(
        /** @type {Derived} */
        reaction,
        effect2,
        false
      );
    } else if (effect2 === reaction) {
      if (root2) {
        set_signal_status(reaction, DIRTY);
      } else if ((reaction.f & CLEAN) !== 0) {
        set_signal_status(reaction, MAYBE_DIRTY);
      }
      schedule_effect(
        /** @type {Effect} */
        reaction
      );
    }
  }
}
function update_reaction(reaction) {
  var _a2;
  var previous_deps = new_deps;
  var previous_skipped_deps = skipped_deps;
  var previous_untracked_writes = untracked_writes;
  var previous_reaction = active_reaction;
  var previous_skip_reaction = skip_reaction;
  var previous_reaction_sources = reaction_sources;
  var previous_component_context = component_context;
  var previous_untracking = untracking;
  var flags = reaction.f;
  new_deps = /** @type {null | Value[]} */
  null;
  skipped_deps = 0;
  untracked_writes = null;
  skip_reaction = (flags & UNOWNED) !== 0 && (untracking || !is_updating_effect || active_reaction === null);
  active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
  reaction_sources = null;
  set_component_context(reaction.ctx);
  untracking = false;
  read_version++;
  reaction.f |= EFFECT_IS_UPDATING;
  try {
    var result = (
      /** @type {Function} */
      (0, reaction.fn)()
    );
    var deps = reaction.deps;
    if (new_deps !== null) {
      var i;
      remove_reactions(reaction, skipped_deps);
      if (deps !== null && skipped_deps > 0) {
        deps.length = skipped_deps + new_deps.length;
        for (i = 0; i < new_deps.length; i++) {
          deps[skipped_deps + i] = new_deps[i];
        }
      } else {
        reaction.deps = deps = new_deps;
      }
      if (!skip_reaction) {
        for (i = skipped_deps; i < deps.length; i++) {
          ((_a2 = deps[i]).reactions ?? (_a2.reactions = [])).push(reaction);
        }
      }
    } else if (deps !== null && skipped_deps < deps.length) {
      remove_reactions(reaction, skipped_deps);
      deps.length = skipped_deps;
    }
    if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
      for (i = 0; i < /** @type {Source[]} */
      untracked_writes.length; i++) {
        schedule_possible_effect_self_invalidation(
          untracked_writes[i],
          /** @type {Effect} */
          reaction
        );
      }
    }
    if (previous_reaction !== null && previous_reaction !== reaction) {
      read_version++;
      if (untracked_writes !== null) {
        if (previous_untracked_writes === null) {
          previous_untracked_writes = untracked_writes;
        } else {
          previous_untracked_writes.push(.../** @type {Source[]} */
          untracked_writes);
        }
      }
    }
    return result;
  } finally {
    new_deps = previous_deps;
    skipped_deps = previous_skipped_deps;
    untracked_writes = previous_untracked_writes;
    active_reaction = previous_reaction;
    skip_reaction = previous_skip_reaction;
    reaction_sources = previous_reaction_sources;
    set_component_context(previous_component_context);
    untracking = previous_untracking;
    reaction.f ^= EFFECT_IS_UPDATING;
  }
}
function remove_reaction(signal, dependency) {
  let reactions = dependency.reactions;
  if (reactions !== null) {
    var index2 = index_of.call(reactions, signal);
    if (index2 !== -1) {
      var new_length = reactions.length - 1;
      if (new_length === 0) {
        reactions = dependency.reactions = null;
      } else {
        reactions[index2] = reactions[new_length];
        reactions.pop();
      }
    }
  }
  if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (new_deps === null || !new_deps.includes(dependency))) {
    set_signal_status(dependency, MAYBE_DIRTY);
    if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
      dependency.f ^= DISCONNECTED;
    }
    destroy_derived_effects(
      /** @type {Derived} **/
      dependency
    );
    remove_reactions(
      /** @type {Derived} **/
      dependency,
      0
    );
  }
}
function remove_reactions(signal, start_index) {
  var dependencies = signal.deps;
  if (dependencies === null) return;
  for (var i = start_index; i < dependencies.length; i++) {
    remove_reaction(signal, dependencies[i]);
  }
}
function update_effect(effect2) {
  var flags = effect2.f;
  if ((flags & DESTROYED) !== 0) {
    return;
  }
  set_signal_status(effect2, CLEAN);
  var previous_effect = active_effect;
  var previous_component_context = component_context;
  var was_updating_effect = is_updating_effect;
  active_effect = effect2;
  is_updating_effect = true;
  try {
    if ((flags & BLOCK_EFFECT) !== 0) {
      destroy_block_effect_children(effect2);
    } else {
      destroy_effect_children(effect2);
    }
    execute_effect_teardown(effect2);
    var teardown2 = update_reaction(effect2);
    effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
    effect2.wv = write_version;
    var deps = effect2.deps;
    var dep;
    if (DEV && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && deps !== null) ;
    if (DEV) ;
  } catch (error2) {
    handle_error$1(error2, effect2, previous_effect, previous_component_context || effect2.ctx);
  } finally {
    is_updating_effect = was_updating_effect;
    active_effect = previous_effect;
  }
}
function infinite_loop_guard() {
  try {
    effect_update_depth_exceeded();
  } catch (error2) {
    if (last_scheduled_effect !== null) {
      {
        handle_error$1(error2, last_scheduled_effect, null);
      }
    } else {
      throw error2;
    }
  }
}
function flush_queued_root_effects() {
  var was_updating_effect = is_updating_effect;
  try {
    var flush_count = 0;
    is_updating_effect = true;
    while (queued_root_effects.length > 0) {
      if (flush_count++ > 1e3) {
        infinite_loop_guard();
      }
      var root_effects = queued_root_effects;
      var length = root_effects.length;
      queued_root_effects = [];
      for (var i = 0; i < length; i++) {
        var collected_effects = process_effects(root_effects[i]);
        flush_queued_effects(collected_effects);
      }
      old_values.clear();
    }
  } finally {
    is_flushing = false;
    is_updating_effect = was_updating_effect;
    last_scheduled_effect = null;
  }
}
function flush_queued_effects(effects) {
  var length = effects.length;
  if (length === 0) return;
  for (var i = 0; i < length; i++) {
    var effect2 = effects[i];
    if ((effect2.f & (DESTROYED | INERT)) === 0) {
      try {
        if (check_dirtiness(effect2)) {
          update_effect(effect2);
          if (effect2.deps === null && effect2.first === null && effect2.nodes_start === null) {
            if (effect2.teardown === null) {
              unlink_effect(effect2);
            } else {
              effect2.fn = null;
            }
          }
        }
      } catch (error2) {
        handle_error$1(error2, effect2, null, effect2.ctx);
      }
    }
  }
}
function schedule_effect(signal) {
  if (!is_flushing) {
    is_flushing = true;
    queueMicrotask(flush_queued_root_effects);
  }
  var effect2 = last_scheduled_effect = signal;
  while (effect2.parent !== null) {
    effect2 = effect2.parent;
    var flags = effect2.f;
    if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
      if ((flags & CLEAN) === 0) return;
      effect2.f ^= CLEAN;
    }
  }
  queued_root_effects.push(effect2);
}
function process_effects(root2) {
  var effects = [];
  var effect2 = root2;
  while (effect2 !== null) {
    var flags = effect2.f;
    var is_branch = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
    var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;
    if (!is_skippable_branch && (flags & INERT) === 0) {
      if ((flags & EFFECT) !== 0) {
        effects.push(effect2);
      } else if (is_branch) {
        effect2.f ^= CLEAN;
      } else {
        try {
          if (check_dirtiness(effect2)) {
            update_effect(effect2);
          }
        } catch (error2) {
          handle_error$1(error2, effect2, null, effect2.ctx);
        }
      }
      var child2 = effect2.first;
      if (child2 !== null) {
        effect2 = child2;
        continue;
      }
    }
    var parent = effect2.parent;
    effect2 = effect2.next;
    while (effect2 === null && parent !== null) {
      effect2 = parent.next;
      parent = parent.parent;
    }
  }
  return effects;
}
function flushSync(fn) {
  var result;
  while (true) {
    flush_tasks();
    if (queued_root_effects.length === 0) {
      return (
        /** @type {T} */
        result
      );
    }
    is_flushing = true;
    flush_queued_root_effects();
  }
}
async function tick() {
  await Promise.resolve();
  flushSync();
}
function get$1(signal) {
  var flags = signal.f;
  var is_derived = (flags & DERIVED) !== 0;
  if (active_reaction !== null && !untracking) {
    if (!(reaction_sources == null ? void 0 : reaction_sources.includes(signal))) {
      var deps = active_reaction.deps;
      if (signal.rv < read_version) {
        signal.rv = read_version;
        if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
          skipped_deps++;
        } else if (new_deps === null) {
          new_deps = [signal];
        } else if (!skip_reaction || !new_deps.includes(signal)) {
          new_deps.push(signal);
        }
      }
    }
  } else if (is_derived && /** @type {Derived} */
  signal.deps === null && /** @type {Derived} */
  signal.effects === null) {
    var derived2 = (
      /** @type {Derived} */
      signal
    );
    var parent = derived2.parent;
    if (parent !== null && (parent.f & UNOWNED) === 0) {
      derived2.f ^= UNOWNED;
    }
  }
  if (is_derived) {
    derived2 = /** @type {Derived} */
    signal;
    if (check_dirtiness(derived2)) {
      update_derived(derived2);
    }
  }
  if (is_destroying_effect && old_values.has(signal)) {
    return old_values.get(signal);
  }
  return signal.v;
}
function untrack(fn) {
  var previous_untracking = untracking;
  try {
    untracking = true;
    return fn();
  } finally {
    untracking = previous_untracking;
  }
}
const STATUS_MASK = -7169;
function set_signal_status(signal, status) {
  signal.f = signal.f & STATUS_MASK | status;
}
function deep_read_state(value) {
  if (typeof value !== "object" || !value || value instanceof EventTarget) {
    return;
  }
  if (STATE_SYMBOL in value) {
    deep_read(value);
  } else if (!Array.isArray(value)) {
    for (let key in value) {
      const prop2 = value[key];
      if (typeof prop2 === "object" && prop2 && STATE_SYMBOL in prop2) {
        deep_read(prop2);
      }
    }
  }
}
function deep_read(value, visited = /* @__PURE__ */ new Set()) {
  if (typeof value === "object" && value !== null && // We don't want to traverse DOM elements
  !(value instanceof EventTarget) && !visited.has(value)) {
    visited.add(value);
    if (value instanceof Date) {
      value.getTime();
    }
    for (let key in value) {
      try {
        deep_read(value[key], visited);
      } catch (e) {
      }
    }
    const proto = get_prototype_of(value);
    if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
      const descriptors = get_descriptors(proto);
      for (let key in descriptors) {
        const get2 = descriptors[key].get;
        if (get2) {
          try {
            get2.call(value);
          } catch (e) {
          }
        }
      }
    }
  }
}
const PASSIVE_EVENTS = ["touchstart", "touchmove"];
function is_passive_event(name) {
  return PASSIVE_EVENTS.includes(name);
}
const all_registered_events = /* @__PURE__ */ new Set();
const root_event_handles = /* @__PURE__ */ new Set();
function delegate(events) {
  for (var i = 0; i < events.length; i++) {
    all_registered_events.add(events[i]);
  }
  for (var fn of root_event_handles) {
    fn(events);
  }
}
function handle_event_propagation(event) {
  var _a2;
  var handler_element = this;
  var owner_document = (
    /** @type {Node} */
    handler_element.ownerDocument
  );
  var event_name = event.type;
  var path = ((_a2 = event.composedPath) == null ? void 0 : _a2.call(event)) || [];
  var current_target = (
    /** @type {null | Element} */
    path[0] || event.target
  );
  var path_idx = 0;
  var handled_at = event.__root;
  if (handled_at) {
    var at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event.__root = handler_element;
      return;
    }
    var handler_idx = path.indexOf(handler_element);
    if (handler_idx === -1) {
      return;
    }
    if (at_idx <= handler_idx) {
      path_idx = at_idx;
    }
  }
  current_target = /** @type {Element} */
  path[path_idx] || event.target;
  if (current_target === handler_element) return;
  define_property(event, "currentTarget", {
    configurable: true,
    get() {
      return current_target || owner_document;
    }
  });
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    var throw_error;
    var other_errors = [];
    while (current_target !== null) {
      var parent_element2 = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
      current_target.host || null;
      try {
        var delegated = current_target["__" + event_name];
        if (delegated != null && (!/** @type {any} */
        current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
        // -> the target could not have been disabled because it emits the event in the first place
        event.target === current_target)) {
          if (is_array(delegated)) {
            var [fn, ...data] = delegated;
            fn.apply(current_target, [event, ...data]);
          } else {
            delegated.call(current_target, event);
          }
        }
      } catch (error2) {
        if (throw_error) {
          other_errors.push(error2);
        } else {
          throw_error = error2;
        }
      }
      if (event.cancelBubble || parent_element2 === handler_element || parent_element2 === null) {
        break;
      }
      current_target = parent_element2;
    }
    if (throw_error) {
      for (let error2 of other_errors) {
        queueMicrotask(() => {
          throw error2;
        });
      }
      throw throw_error;
    }
  } finally {
    event.__root = handler_element;
    delete event.currentTarget;
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}
let head_anchor;
function reset_head_anchor() {
  head_anchor = void 0;
}
function head(render_fn) {
  let previous_hydrate_node = null;
  let was_hydrating = hydrating;
  var anchor;
  if (hydrating) {
    previous_hydrate_node = hydrate_node;
    if (head_anchor === void 0) {
      head_anchor = /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(document.head);
    }
    while (head_anchor !== null && (head_anchor.nodeType !== 8 || /** @type {Comment} */
    head_anchor.data !== HYDRATION_START)) {
      head_anchor = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(head_anchor);
    }
    if (head_anchor === null) {
      set_hydrating(false);
    } else {
      head_anchor = set_hydrate_node(
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(head_anchor)
      );
    }
  }
  if (!hydrating) {
    anchor = document.head.appendChild(create_text());
  }
  try {
    block(() => render_fn(anchor), HEAD_EFFECT);
  } finally {
    if (was_hydrating) {
      set_hydrating(true);
      head_anchor = hydrate_node;
      set_hydrate_node(
        /** @type {TemplateNode} */
        previous_hydrate_node
      );
    }
  }
}
function create_fragment_from_html(html2) {
  var elem = document.createElement("template");
  elem.innerHTML = html2;
  return elem.content;
}
function assign_nodes(start2, end2) {
  var effect2 = (
    /** @type {Effect} */
    active_effect
  );
  if (effect2.nodes_start === null) {
    effect2.nodes_start = start2;
    effect2.nodes_end = end2;
  }
}
// @__NO_SIDE_EFFECTS__
function template(content, flags) {
  var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
  var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;
  var node;
  var has_start = !content.startsWith("<!>");
  return () => {
    if (hydrating) {
      assign_nodes(hydrate_node, null);
      return hydrate_node;
    }
    if (node === void 0) {
      node = create_fragment_from_html(has_start ? content : "<!>" + content);
      if (!is_fragment) node = /** @type {Node} */
      /* @__PURE__ */ get_first_child(node);
    }
    var clone = (
      /** @type {TemplateNode} */
      use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
    );
    if (is_fragment) {
      var start2 = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_first_child(clone)
      );
      var end2 = (
        /** @type {TemplateNode} */
        clone.lastChild
      );
      assign_nodes(start2, end2);
    } else {
      assign_nodes(clone, clone);
    }
    return clone;
  };
}
// @__NO_SIDE_EFFECTS__
function ns_template(content, flags, ns = "svg") {
  var has_start = !content.startsWith("<!>");
  var wrapped = `<${ns}>${has_start ? content : "<!>" + content}</${ns}>`;
  var node;
  return () => {
    if (hydrating) {
      assign_nodes(hydrate_node, null);
      return hydrate_node;
    }
    if (!node) {
      var fragment = (
        /** @type {DocumentFragment} */
        create_fragment_from_html(wrapped)
      );
      var root2 = (
        /** @type {Element} */
        /* @__PURE__ */ get_first_child(fragment)
      );
      {
        node = /** @type {Element} */
        /* @__PURE__ */ get_first_child(root2);
      }
    }
    var clone = (
      /** @type {TemplateNode} */
      node.cloneNode(true)
    );
    {
      assign_nodes(clone, clone);
    }
    return clone;
  };
}
function text(value = "") {
  if (!hydrating) {
    var t = create_text(value + "");
    assign_nodes(t, t);
    return t;
  }
  var node = hydrate_node;
  if (node.nodeType !== 3) {
    node.before(node = create_text());
    set_hydrate_node(node);
  }
  assign_nodes(node, node);
  return node;
}
function comment() {
  if (hydrating) {
    assign_nodes(hydrate_node, null);
    return hydrate_node;
  }
  var frag = document.createDocumentFragment();
  var start2 = document.createComment("");
  var anchor = create_text();
  frag.append(start2, anchor);
  assign_nodes(start2, anchor);
  return frag;
}
function append(anchor, dom) {
  if (hydrating) {
    active_effect.nodes_end = hydrate_node;
    hydrate_next();
    return;
  }
  if (anchor === null) {
    return;
  }
  anchor.before(
    /** @type {Node} */
    dom
  );
}
function set_text(text2, value) {
  var str = value == null ? "" : typeof value === "object" ? value + "" : value;
  if (str !== (text2.__t ?? (text2.__t = text2.nodeValue))) {
    text2.__t = str;
    text2.nodeValue = str + "";
  }
}
function mount(component2, options) {
  return _mount(component2, options);
}
function hydrate(component2, options) {
  init_operations();
  options.intro = options.intro ?? false;
  const target2 = options.target;
  const was_hydrating = hydrating;
  const previous_hydrate_node = hydrate_node;
  try {
    var anchor = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(target2)
    );
    while (anchor && (anchor.nodeType !== 8 || /** @type {Comment} */
    anchor.data !== HYDRATION_START)) {
      anchor = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(anchor);
    }
    if (!anchor) {
      throw HYDRATION_ERROR;
    }
    set_hydrating(true);
    set_hydrate_node(
      /** @type {Comment} */
      anchor
    );
    hydrate_next();
    const instance = _mount(component2, { ...options, anchor });
    if (hydrate_node === null || hydrate_node.nodeType !== 8 || /** @type {Comment} */
    hydrate_node.data !== HYDRATION_END) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    set_hydrating(false);
    return (
      /**  @type {Exports} */
      instance
    );
  } catch (error2) {
    if (error2 === HYDRATION_ERROR) {
      if (options.recover === false) {
        hydration_failed();
      }
      init_operations();
      clear_text_content(target2);
      set_hydrating(false);
      return mount(component2, options);
    }
    throw error2;
  } finally {
    set_hydrating(was_hydrating);
    set_hydrate_node(previous_hydrate_node);
    reset_head_anchor();
  }
}
const document_listeners = /* @__PURE__ */ new Map();
function _mount(Component, { target: target2, anchor, props = {}, events, context, intro = true }) {
  init_operations();
  var registered_events = /* @__PURE__ */ new Set();
  var event_handle = (events2) => {
    for (var i = 0; i < events2.length; i++) {
      var event_name = events2[i];
      if (registered_events.has(event_name)) continue;
      registered_events.add(event_name);
      var passive = is_passive_event(event_name);
      target2.addEventListener(event_name, handle_event_propagation, { passive });
      var n = document_listeners.get(event_name);
      if (n === void 0) {
        document.addEventListener(event_name, handle_event_propagation, { passive });
        document_listeners.set(event_name, 1);
      } else {
        document_listeners.set(event_name, n + 1);
      }
    }
  };
  event_handle(array_from(all_registered_events));
  root_event_handles.add(event_handle);
  var component2 = void 0;
  var unmount2 = component_root(() => {
    var anchor_node = anchor ?? target2.appendChild(create_text());
    branch(() => {
      if (context) {
        push({});
        var ctx = (
          /** @type {ComponentContext} */
          component_context
        );
        ctx.c = context;
      }
      if (events) {
        props.$$events = events;
      }
      if (hydrating) {
        assign_nodes(
          /** @type {TemplateNode} */
          anchor_node,
          null
        );
      }
      component2 = Component(anchor_node, props) || {};
      if (hydrating) {
        active_effect.nodes_end = hydrate_node;
      }
      if (context) {
        pop();
      }
    });
    return () => {
      var _a2;
      for (var event_name of registered_events) {
        target2.removeEventListener(event_name, handle_event_propagation);
        var n = (
          /** @type {number} */
          document_listeners.get(event_name)
        );
        if (--n === 0) {
          document.removeEventListener(event_name, handle_event_propagation);
          document_listeners.delete(event_name);
        } else {
          document_listeners.set(event_name, n);
        }
      }
      root_event_handles.delete(event_handle);
      if (anchor_node !== anchor) {
        (_a2 = anchor_node.parentNode) == null ? void 0 : _a2.removeChild(anchor_node);
      }
    };
  });
  mounted_components.set(component2, unmount2);
  return component2;
}
let mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(component2, options) {
  const fn = mounted_components.get(component2);
  if (fn) {
    mounted_components.delete(component2);
    return fn(options);
  }
  return Promise.resolve();
}
function if_block(node, fn, [root_index, hydrate_index] = [0, 0]) {
  if (hydrating && root_index === 0) {
    hydrate_next();
  }
  var anchor = node;
  var consequent_effect = null;
  var alternate_effect = null;
  var condition = UNINITIALIZED;
  var flags = root_index > 0 ? EFFECT_TRANSPARENT : 0;
  var has_branch = false;
  const set_branch = (fn2, flag = true) => {
    has_branch = true;
    update_branch(flag, fn2);
  };
  const update_branch = (new_condition, fn2) => {
    if (condition === (condition = new_condition)) return;
    let mismatch = false;
    if (hydrating && hydrate_index !== -1) {
      if (root_index === 0) {
        const data = read_hydration_instruction(anchor);
        if (data === HYDRATION_START) {
          hydrate_index = 0;
        } else if (data === HYDRATION_START_ELSE) {
          hydrate_index = Infinity;
        } else {
          hydrate_index = parseInt(data.substring(1));
          if (hydrate_index !== hydrate_index) {
            hydrate_index = condition ? Infinity : -1;
          }
        }
      }
      const is_else = hydrate_index > root_index;
      if (!!condition === is_else) {
        anchor = remove_nodes();
        set_hydrate_node(anchor);
        set_hydrating(false);
        mismatch = true;
        hydrate_index = -1;
      }
    }
    if (condition) {
      if (consequent_effect) {
        resume_effect(consequent_effect);
      } else if (fn2) {
        consequent_effect = branch(() => fn2(anchor));
      }
      if (alternate_effect) {
        pause_effect(alternate_effect, () => {
          alternate_effect = null;
        });
      }
    } else {
      if (alternate_effect) {
        resume_effect(alternate_effect);
      } else if (fn2) {
        alternate_effect = branch(() => fn2(anchor, [root_index + 1, hydrate_index]));
      }
      if (consequent_effect) {
        pause_effect(consequent_effect, () => {
          consequent_effect = null;
        });
      }
    }
    if (mismatch) {
      set_hydrating(true);
    }
  };
  block(() => {
    has_branch = false;
    fn(set_branch);
    if (!has_branch) {
      update_branch(null, null);
    }
  }, flags);
  if (hydrating) {
    anchor = hydrate_node;
  }
}
function index(_, i) {
  return i;
}
function pause_effects(state2, items, controlled_anchor, items_map) {
  var transitions = [];
  var length = items.length;
  for (var i = 0; i < length; i++) {
    pause_children(items[i].e, transitions, true);
  }
  var is_controlled = length > 0 && transitions.length === 0 && controlled_anchor !== null;
  if (is_controlled) {
    var parent_node = (
      /** @type {Element} */
      /** @type {Element} */
      controlled_anchor.parentNode
    );
    clear_text_content(parent_node);
    parent_node.append(
      /** @type {Element} */
      controlled_anchor
    );
    items_map.clear();
    link(state2, items[0].prev, items[length - 1].next);
  }
  run_out_transitions(transitions, () => {
    for (var i2 = 0; i2 < length; i2++) {
      var item = items[i2];
      if (!is_controlled) {
        items_map.delete(item.k);
        link(state2, item.prev, item.next);
      }
      destroy_effect(item.e, !is_controlled);
    }
  });
}
function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
  var anchor = node;
  var state2 = { flags, items: /* @__PURE__ */ new Map(), first: null };
  var is_controlled = (flags & EACH_IS_CONTROLLED) !== 0;
  if (is_controlled) {
    var parent_node = (
      /** @type {Element} */
      node
    );
    anchor = hydrating ? set_hydrate_node(
      /** @type {Comment | Text} */
      /* @__PURE__ */ get_first_child(parent_node)
    ) : parent_node.appendChild(create_text());
  }
  if (hydrating) {
    hydrate_next();
  }
  var fallback = null;
  var was_empty = false;
  var each_array = /* @__PURE__ */ derived_safe_equal(() => {
    var collection = get_collection();
    return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
  });
  block(() => {
    var array = get$1(each_array);
    var length = array.length;
    if (was_empty && length === 0) {
      return;
    }
    was_empty = length === 0;
    let mismatch = false;
    if (hydrating) {
      var is_else = read_hydration_instruction(anchor) === HYDRATION_START_ELSE;
      if (is_else !== (length === 0)) {
        anchor = remove_nodes();
        set_hydrate_node(anchor);
        set_hydrating(false);
        mismatch = true;
      }
    }
    if (hydrating) {
      var prev = null;
      var item;
      for (var i = 0; i < length; i++) {
        if (hydrate_node.nodeType === 8 && /** @type {Comment} */
        hydrate_node.data === HYDRATION_END) {
          anchor = /** @type {Comment} */
          hydrate_node;
          mismatch = true;
          set_hydrating(false);
          break;
        }
        var value = array[i];
        var key = get_key(value, i);
        item = create_item(
          hydrate_node,
          state2,
          prev,
          null,
          value,
          key,
          i,
          render_fn,
          flags,
          get_collection
        );
        state2.items.set(key, item);
        prev = item;
      }
      if (length > 0) {
        set_hydrate_node(remove_nodes());
      }
    }
    if (!hydrating) {
      reconcile(array, state2, anchor, render_fn, flags, get_key, get_collection);
    }
    if (fallback_fn !== null) {
      if (length === 0) {
        if (fallback) {
          resume_effect(fallback);
        } else {
          fallback = branch(() => fallback_fn(anchor));
        }
      } else if (fallback !== null) {
        pause_effect(fallback, () => {
          fallback = null;
        });
      }
    }
    if (mismatch) {
      set_hydrating(true);
    }
    get$1(each_array);
  });
  if (hydrating) {
    anchor = hydrate_node;
  }
}
function reconcile(array, state2, anchor, render_fn, flags, get_key, get_collection) {
  var _a2, _b2, _c2, _d2;
  var is_animated = (flags & EACH_IS_ANIMATED) !== 0;
  var should_update = (flags & (EACH_ITEM_REACTIVE | EACH_INDEX_REACTIVE)) !== 0;
  var length = array.length;
  var items = state2.items;
  var first = state2.first;
  var current2 = first;
  var seen2;
  var prev = null;
  var to_animate;
  var matched = [];
  var stashed = [];
  var value;
  var key;
  var item;
  var i;
  if (is_animated) {
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key = get_key(value, i);
      item = items.get(key);
      if (item !== void 0) {
        (_a2 = item.a) == null ? void 0 : _a2.measure();
        (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).add(item);
      }
    }
  }
  for (i = 0; i < length; i += 1) {
    value = array[i];
    key = get_key(value, i);
    item = items.get(key);
    if (item === void 0) {
      var child_anchor = current2 ? (
        /** @type {TemplateNode} */
        current2.e.nodes_start
      ) : anchor;
      prev = create_item(
        child_anchor,
        state2,
        prev,
        prev === null ? state2.first : prev.next,
        value,
        key,
        i,
        render_fn,
        flags,
        get_collection
      );
      items.set(key, prev);
      matched = [];
      stashed = [];
      current2 = prev.next;
      continue;
    }
    if (should_update) {
      update_item(item, value, i, flags);
    }
    if ((item.e.f & INERT) !== 0) {
      resume_effect(item.e);
      if (is_animated) {
        (_b2 = item.a) == null ? void 0 : _b2.unfix();
        (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).delete(item);
      }
    }
    if (item !== current2) {
      if (seen2 !== void 0 && seen2.has(item)) {
        if (matched.length < stashed.length) {
          var start2 = stashed[0];
          var j;
          prev = start2.prev;
          var a = matched[0];
          var b = matched[matched.length - 1];
          for (j = 0; j < matched.length; j += 1) {
            move(matched[j], start2, anchor);
          }
          for (j = 0; j < stashed.length; j += 1) {
            seen2.delete(stashed[j]);
          }
          link(state2, a.prev, b.next);
          link(state2, prev, a);
          link(state2, b, start2);
          current2 = start2;
          prev = b;
          i -= 1;
          matched = [];
          stashed = [];
        } else {
          seen2.delete(item);
          move(item, current2, anchor);
          link(state2, item.prev, item.next);
          link(state2, item, prev === null ? state2.first : prev.next);
          link(state2, prev, item);
          prev = item;
        }
        continue;
      }
      matched = [];
      stashed = [];
      while (current2 !== null && current2.k !== key) {
        if ((current2.e.f & INERT) === 0) {
          (seen2 ?? (seen2 = /* @__PURE__ */ new Set())).add(current2);
        }
        stashed.push(current2);
        current2 = current2.next;
      }
      if (current2 === null) {
        continue;
      }
      item = current2;
    }
    matched.push(item);
    prev = item;
    current2 = item.next;
  }
  if (current2 !== null || seen2 !== void 0) {
    var to_destroy = seen2 === void 0 ? [] : array_from(seen2);
    while (current2 !== null) {
      if ((current2.e.f & INERT) === 0) {
        to_destroy.push(current2);
      }
      current2 = current2.next;
    }
    var destroy_length = to_destroy.length;
    if (destroy_length > 0) {
      var controlled_anchor = (flags & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
      if (is_animated) {
        for (i = 0; i < destroy_length; i += 1) {
          (_c2 = to_destroy[i].a) == null ? void 0 : _c2.measure();
        }
        for (i = 0; i < destroy_length; i += 1) {
          (_d2 = to_destroy[i].a) == null ? void 0 : _d2.fix();
        }
      }
      pause_effects(state2, to_destroy, controlled_anchor, items);
    }
  }
  if (is_animated) {
    queue_micro_task(() => {
      var _a3;
      if (to_animate === void 0) return;
      for (item of to_animate) {
        (_a3 = item.a) == null ? void 0 : _a3.apply();
      }
    });
  }
  active_effect.first = state2.first && state2.first.e;
  active_effect.last = prev && prev.e;
}
function update_item(item, value, index2, type) {
  if ((type & EACH_ITEM_REACTIVE) !== 0) {
    internal_set(item.v, value);
  }
  if ((type & EACH_INDEX_REACTIVE) !== 0) {
    internal_set(
      /** @type {Value<number>} */
      item.i,
      index2
    );
  } else {
    item.i = index2;
  }
}
function create_item(anchor, state2, prev, next2, value, key, index2, render_fn, flags, get_collection) {
  var reactive = (flags & EACH_ITEM_REACTIVE) !== 0;
  var mutable = (flags & EACH_ITEM_IMMUTABLE) === 0;
  var v = reactive ? mutable ? /* @__PURE__ */ mutable_source(value) : source(value) : value;
  var i = (flags & EACH_INDEX_REACTIVE) === 0 ? index2 : source(index2);
  var item = {
    i,
    v,
    k: key,
    a: null,
    // @ts-expect-error
    e: null,
    prev,
    next: next2
  };
  try {
    item.e = branch(() => render_fn(anchor, v, i, get_collection), hydrating);
    item.e.prev = prev && prev.e;
    item.e.next = next2 && next2.e;
    if (prev === null) {
      state2.first = item;
    } else {
      prev.next = item;
      prev.e.next = item.e;
    }
    if (next2 !== null) {
      next2.prev = item;
      next2.e.prev = item.e;
    }
    return item;
  } finally {
  }
}
function move(item, next2, anchor) {
  var end2 = item.next ? (
    /** @type {TemplateNode} */
    item.next.e.nodes_start
  ) : anchor;
  var dest = next2 ? (
    /** @type {TemplateNode} */
    next2.e.nodes_start
  ) : anchor;
  var node = (
    /** @type {TemplateNode} */
    item.e.nodes_start
  );
  while (node !== end2) {
    var next_node = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(node)
    );
    dest.before(node);
    node = next_node;
  }
}
function link(state2, prev, next2) {
  if (prev === null) {
    state2.first = next2;
  } else {
    prev.next = next2;
    prev.e.next = next2 && next2.e;
  }
  if (next2 !== null) {
    next2.prev = prev;
    next2.e.prev = prev && prev.e;
  }
}
function html(node, get_value, svg = false, mathml = false, skip_warning = false) {
  var anchor = node;
  var value = "";
  template_effect(() => {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if (value === (value = get_value() ?? "")) {
      if (hydrating) hydrate_next();
      return;
    }
    if (effect2.nodes_start !== null) {
      remove_effect_dom(
        effect2.nodes_start,
        /** @type {TemplateNode} */
        effect2.nodes_end
      );
      effect2.nodes_start = effect2.nodes_end = null;
    }
    if (value === "") return;
    if (hydrating) {
      hydrate_node.data;
      var next2 = hydrate_next();
      var last = next2;
      while (next2 !== null && (next2.nodeType !== 8 || /** @type {Comment} */
      next2.data !== "")) {
        last = next2;
        next2 = /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(next2);
      }
      if (next2 === null) {
        hydration_mismatch();
        throw HYDRATION_ERROR;
      }
      assign_nodes(hydrate_node, last);
      anchor = set_hydrate_node(next2);
      return;
    }
    var html2 = value + "";
    if (svg) html2 = `<svg>${html2}</svg>`;
    else if (mathml) html2 = `<math>${html2}</math>`;
    var node2 = create_fragment_from_html(html2);
    if (svg || mathml) {
      node2 = /** @type {Element} */
      /* @__PURE__ */ get_first_child(node2);
    }
    assign_nodes(
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(node2),
      /** @type {TemplateNode} */
      node2.lastChild
    );
    if (svg || mathml) {
      while (/* @__PURE__ */ get_first_child(node2)) {
        anchor.before(
          /** @type {Node} */
          /* @__PURE__ */ get_first_child(node2)
        );
      }
    } else {
      anchor.before(node2);
    }
  });
}
function snippet(node, get_snippet, ...args) {
  var anchor = node;
  var snippet2 = noop$1;
  var snippet_effect;
  block(() => {
    if (snippet2 === (snippet2 = get_snippet())) return;
    if (snippet_effect) {
      destroy_effect(snippet_effect);
      snippet_effect = null;
    }
    snippet_effect = branch(() => (
      /** @type {SnippetFn} */
      snippet2(anchor, ...args)
    ));
  }, EFFECT_TRANSPARENT);
  if (hydrating) {
    anchor = hydrate_node;
  }
}
function component(node, get_component, render_fn) {
  if (hydrating) {
    hydrate_next();
  }
  var anchor = node;
  var component2;
  var effect2;
  block(() => {
    if (component2 === (component2 = get_component())) return;
    if (effect2) {
      pause_effect(effect2);
      effect2 = null;
    }
    if (component2) {
      effect2 = branch(() => render_fn(anchor, component2));
    }
  }, EFFECT_TRANSPARENT);
  if (hydrating) {
    anchor = hydrate_node;
  }
}
const IS_CUSTOM_ELEMENT = Symbol("is custom element");
const IS_HTML = Symbol("is html");
function set_attribute(element, attribute, value, skip_warning) {
  var attributes = get_attributes(element);
  if (hydrating) {
    attributes[attribute] = element.getAttribute(attribute);
    if (attribute === "src" || attribute === "srcset" || attribute === "href" && element.nodeName === "LINK") {
      return;
    }
  }
  if (attributes[attribute] === (attributes[attribute] = value)) return;
  if (attribute === "loading") {
    element[LOADING_ATTR_SYMBOL] = value;
  }
  if (value == null) {
    element.removeAttribute(attribute);
  } else if (typeof value !== "string" && get_setters(element).includes(attribute)) {
    element[attribute] = value;
  } else {
    element.setAttribute(attribute, value);
  }
}
function get_attributes(element) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    element.__attributes ?? (element.__attributes = {
      [IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
      [IS_HTML]: element.namespaceURI === NAMESPACE_HTML
    })
  );
}
var setters_cache = /* @__PURE__ */ new Map();
function get_setters(element) {
  var setters = setters_cache.get(element.nodeName);
  if (setters) return setters;
  setters_cache.set(element.nodeName, setters = []);
  var descriptors;
  var proto = element;
  var element_proto = Element.prototype;
  while (element_proto !== proto) {
    descriptors = get_descriptors(proto);
    for (var key in descriptors) {
      if (descriptors[key].set) {
        setters.push(key);
      }
    }
    proto = get_prototype_of(proto);
  }
  return setters;
}
function is_bound_this(bound_value, element_or_component) {
  return bound_value === element_or_component || (bound_value == null ? void 0 : bound_value[STATE_SYMBOL]) === element_or_component;
}
function bind_this(element_or_component = {}, update2, get_value, get_parts) {
  effect(() => {
    var old_parts;
    var parts;
    render_effect(() => {
      old_parts = parts;
      parts = [];
      untrack(() => {
        if (element_or_component !== get_value(...parts)) {
          update2(element_or_component, ...parts);
          if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
            update2(null, ...old_parts);
          }
        }
      });
    });
    return () => {
      queue_micro_task(() => {
        if (parts && is_bound_this(get_value(...parts), element_or_component)) {
          update2(null, ...parts);
        }
      });
    };
  });
  return element_or_component;
}
function init(immutable = false) {
  const context = (
    /** @type {ComponentContextLegacy} */
    component_context
  );
  const callbacks = context.l.u;
  if (!callbacks) return;
  let props = () => deep_read_state(context.s);
  if (immutable) {
    let version2 = 0;
    let prev = (
      /** @type {Record<string, any>} */
      {}
    );
    const d = /* @__PURE__ */ derived(() => {
      let changed = false;
      const props2 = context.s;
      for (const key in props2) {
        if (props2[key] !== prev[key]) {
          prev[key] = props2[key];
          changed = true;
        }
      }
      if (changed) version2++;
      return version2;
    });
    props = () => get$1(d);
  }
  if (callbacks.b.length) {
    user_pre_effect(() => {
      observe_all(context, props);
      run_all(callbacks.b);
    });
  }
  user_effect(() => {
    const fns = untrack(() => callbacks.m.map(run));
    return () => {
      for (const fn of fns) {
        if (typeof fn === "function") {
          fn();
        }
      }
    };
  });
  if (callbacks.a.length) {
    user_effect(() => {
      observe_all(context, props);
      run_all(callbacks.a);
    });
  }
}
function observe_all(context, props) {
  if (context.l.s) {
    for (const signal of context.l.s) get$1(signal);
  }
  props();
}
const subscriber_queue = [];
function writable(value, start2 = noop$1) {
  let stop = null;
  const subscribers = /* @__PURE__ */ new Set();
  function set2(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set2(fn(
      /** @type {T} */
      value
    ));
  }
  function subscribe(run2, invalidate = noop$1) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start2(set2, update2) || noop$1;
    }
    run2(
      /** @type {T} */
      value
    );
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set: set2, update: update2, subscribe };
}
let is_store_binding = false;
function capture_store_binding(fn) {
  var previous_is_store_binding = is_store_binding;
  try {
    is_store_binding = false;
    return [fn(), is_store_binding];
  } finally {
    is_store_binding = previous_is_store_binding;
  }
}
function has_destroyed_component_ctx(current_value) {
  var _a2;
  return ((_a2 = current_value.ctx) == null ? void 0 : _a2.d) ?? false;
}
function prop(props, key, flags, fallback) {
  var _a2;
  var immutable = (flags & PROPS_IS_IMMUTABLE) !== 0;
  var runes = !legacy_mode_flag || (flags & PROPS_IS_RUNES) !== 0;
  var bindable = (flags & PROPS_IS_BINDABLE) !== 0;
  var lazy = (flags & PROPS_IS_LAZY_INITIAL) !== 0;
  var is_store_sub = false;
  var prop_value;
  if (bindable) {
    [prop_value, is_store_sub] = capture_store_binding(() => (
      /** @type {V} */
      props[key]
    ));
  } else {
    prop_value = /** @type {V} */
    props[key];
  }
  var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
  var setter = bindable && (((_a2 = get_descriptor(props, key)) == null ? void 0 : _a2.set) ?? (is_entry_props && key in props && ((v) => props[key] = v))) || void 0;
  var fallback_value = (
    /** @type {V} */
    fallback
  );
  var fallback_dirty = true;
  var fallback_used = false;
  var get_fallback = () => {
    fallback_used = true;
    if (fallback_dirty) {
      fallback_dirty = false;
      if (lazy) {
        fallback_value = untrack(
          /** @type {() => V} */
          fallback
        );
      } else {
        fallback_value = /** @type {V} */
        fallback;
      }
    }
    return fallback_value;
  };
  if (prop_value === void 0 && fallback !== void 0) {
    if (setter && runes) {
      props_invalid_value();
    }
    prop_value = get_fallback();
    if (setter) setter(prop_value);
  }
  var getter;
  if (runes) {
    getter = () => {
      var value = (
        /** @type {V} */
        props[key]
      );
      if (value === void 0) return get_fallback();
      fallback_dirty = true;
      fallback_used = false;
      return value;
    };
  } else {
    var derived_getter = (immutable ? derived : derived_safe_equal)(
      () => (
        /** @type {V} */
        props[key]
      )
    );
    derived_getter.f |= LEGACY_DERIVED_PROP;
    getter = () => {
      var value = get$1(derived_getter);
      if (value !== void 0) fallback_value = /** @type {V} */
      void 0;
      return value === void 0 ? fallback_value : value;
    };
  }
  if ((flags & PROPS_IS_UPDATED) === 0) {
    return getter;
  }
  if (setter) {
    var legacy_parent = props.$$legacy;
    return function(value, mutation) {
      if (arguments.length > 0) {
        if (!runes || !mutation || legacy_parent || is_store_sub) {
          setter(mutation ? getter() : value);
        }
        return value;
      } else {
        return getter();
      }
    };
  }
  var from_child = false;
  var inner_current_value = /* @__PURE__ */ mutable_source(prop_value);
  var current_value = /* @__PURE__ */ derived(() => {
    var parent_value = getter();
    var child_value = get$1(inner_current_value);
    if (from_child) {
      from_child = false;
      return child_value;
    }
    return inner_current_value.v = parent_value;
  });
  if (bindable) {
    get$1(current_value);
  }
  if (!immutable) current_value.equals = safe_equals;
  return function(value, mutation) {
    if (arguments.length > 0) {
      const new_value = mutation ? get$1(current_value) : runes && bindable ? proxy(value) : value;
      if (!current_value.equals(new_value)) {
        from_child = true;
        set$1(inner_current_value, new_value);
        if (fallback_used && fallback_value !== void 0) {
          fallback_value = new_value;
        }
        if (has_destroyed_component_ctx(current_value)) {
          return value;
        }
        untrack(() => get$1(current_value));
      }
      return value;
    }
    if (has_destroyed_component_ctx(current_value)) {
      return current_value.v;
    }
    return get$1(current_value);
  };
}
function asClassComponent(component2) {
  return class extends Svelte4Component {
    /** @param {any} options */
    constructor(options) {
      super({
        component: component2,
        ...options
      });
    }
  };
}
class Svelte4Component {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(options) {
    /** @type {any} */
    __privateAdd(this, _events);
    /** @type {Record<string, any>} */
    __privateAdd(this, _instance);
    var _a2;
    var sources = /* @__PURE__ */ new Map();
    var add_source = (key, value) => {
      var s = /* @__PURE__ */ mutable_source(value);
      sources.set(key, s);
      return s;
    };
    const props = new Proxy(
      { ...options.props || {}, $$events: {} },
      {
        get(target2, prop2) {
          return get$1(sources.get(prop2) ?? add_source(prop2, Reflect.get(target2, prop2)));
        },
        has(target2, prop2) {
          if (prop2 === LEGACY_PROPS) return true;
          get$1(sources.get(prop2) ?? add_source(prop2, Reflect.get(target2, prop2)));
          return Reflect.has(target2, prop2);
        },
        set(target2, prop2, value) {
          set$1(sources.get(prop2) ?? add_source(prop2, value), value);
          return Reflect.set(target2, prop2, value);
        }
      }
    );
    __privateSet(this, _instance, (options.hydrate ? hydrate : mount)(options.component, {
      target: options.target,
      anchor: options.anchor,
      props,
      context: options.context,
      intro: options.intro ?? false,
      recover: options.recover
    }));
    if (!((_a2 = options == null ? void 0 : options.props) == null ? void 0 : _a2.$$host) || options.sync === false) {
      flushSync();
    }
    __privateSet(this, _events, props.$$events);
    for (const key of Object.keys(__privateGet(this, _instance))) {
      if (key === "$set" || key === "$destroy" || key === "$on") continue;
      define_property(this, key, {
        get() {
          return __privateGet(this, _instance)[key];
        },
        /** @param {any} value */
        set(value) {
          __privateGet(this, _instance)[key] = value;
        },
        enumerable: true
      });
    }
    __privateGet(this, _instance).$set = /** @param {Record<string, any>} next */
    (next2) => {
      Object.assign(props, next2);
    };
    __privateGet(this, _instance).$destroy = () => {
      unmount(__privateGet(this, _instance));
    };
  }
  /** @param {Record<string, any>} props */
  $set(props) {
    __privateGet(this, _instance).$set(props);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(event, callback) {
    __privateGet(this, _events)[event] = __privateGet(this, _events)[event] || [];
    const cb = (...args) => callback.call(this, ...args);
    __privateGet(this, _events)[event].push(cb);
    return () => {
      __privateGet(this, _events)[event] = __privateGet(this, _events)[event].filter(
        /** @param {any} fn */
        (fn) => fn !== cb
      );
    };
  }
  $destroy() {
    __privateGet(this, _instance).$destroy();
  }
}
_events = new WeakMap();
_instance = new WeakMap();
function onMount(fn) {
  if (component_context === null) {
    lifecycle_outside_component();
  }
  if (legacy_mode_flag && component_context.l !== null) {
    init_update_callbacks(component_context).m.push(fn);
  } else {
    user_effect(() => {
      const cleanup = untrack(fn);
      if (typeof cleanup === "function") return (
        /** @type {() => void} */
        cleanup
      );
    });
  }
}
function init_update_callbacks(context) {
  var l = (
    /** @type {ComponentContextLegacy} */
    context.l
  );
  return l.u ?? (l.u = { a: [], b: [], m: [] });
}
new URL("sveltekit-internal://");
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore") return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key in params) {
    params[key] = decodeURIComponent(params[key]);
  }
  return params;
}
function strip_hash({ href }) {
  return href.split("#")[0];
}
function make_trackable(url, callback, search_params_callback, allow_hash = false) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key) {
        if (key === "get" || key === "getAll" || key === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key](param);
          };
        }
        callback();
        const value = Reflect.get(obj, key);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  const tracked_url_properties = ["href", "pathname", "search", "toString", "toJSON"];
  if (allow_hash) tracked_url_properties.push("hash");
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  return tracked;
}
function hash$1(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i) hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i) hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
function b64_decode(text2) {
  const d = atob(text2);
  const u8 = new Uint8Array(d.length);
  for (let i = 0; i < d.length; i++) {
    u8[i] = d.charCodeAt(i);
  }
  return u8.buffer;
}
const native_fetch = window.fetch;
{
  window.fetch = (input, init2) => {
    const method = input instanceof Request ? input.method : (init2 == null ? void 0 : init2.method) || "GET";
    if (method !== "GET") {
      cache.delete(build_selector(input));
    }
    return native_fetch(input, init2);
  };
}
const cache = /* @__PURE__ */ new Map();
function initial_fetch(resource, opts) {
  const selector = build_selector(resource, opts);
  const script = document.querySelector(selector);
  if (script == null ? void 0 : script.textContent) {
    let { body, ...init2 } = JSON.parse(script.textContent);
    const ttl = script.getAttribute("data-ttl");
    if (ttl) cache.set(selector, { body, init: init2, ttl: 1e3 * Number(ttl) });
    const b64 = script.getAttribute("data-b64");
    if (b64 !== null) {
      body = b64_decode(body);
    }
    return Promise.resolve(new Response(body, init2));
  }
  return window.fetch(resource, opts);
}
function subsequent_fetch(resource, resolved, opts) {
  if (cache.size > 0) {
    const selector = build_selector(resource, opts);
    const cached = cache.get(selector);
    if (cached) {
      if (performance.now() < cached.ttl && ["default", "force-cache", "only-if-cached", void 0].includes(opts == null ? void 0 : opts.cache)) {
        return new Response(cached.body, cached.init);
      }
      cache.delete(selector);
    }
  }
  return window.fetch(resolved, opts);
}
function build_selector(resource, opts) {
  const url = JSON.stringify(resource instanceof Request ? resource.url : resource);
  let selector = `script[data-sveltekit-fetched][data-url=${url}]`;
  if ((opts == null ? void 0 : opts.headers) || (opts == null ? void 0 : opts.body)) {
    const values = [];
    if (opts.headers) {
      values.push([...new Headers(opts.headers)].join(","));
    }
    if (opts.body && (typeof opts.body === "string" || ArrayBuffer.isView(opts.body))) {
      values.push(opts.body);
    }
    selector += `[data-hash="${hash$1(...values)}"]`;
  }
  return selector;
}
const param_pattern = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;
function parse_route_id(id) {
  const params = [];
  const pattern = id === "/" ? /^\/$/ : new RegExp(
    `^${get_route_segments(id).map((segment) => {
      const rest_match = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(segment);
      if (rest_match) {
        params.push({
          name: rest_match[1],
          matcher: rest_match[2],
          optional: false,
          rest: true,
          chained: true
        });
        return "(?:/(.*))?";
      }
      const optional_match = /^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(segment);
      if (optional_match) {
        params.push({
          name: optional_match[1],
          matcher: optional_match[2],
          optional: true,
          rest: false,
          chained: true
        });
        return "(?:/([^/]+))?";
      }
      if (!segment) {
        return;
      }
      const parts = segment.split(/\[(.+?)\](?!\])/);
      const result = parts.map((content, i) => {
        if (i % 2) {
          if (content.startsWith("x+")) {
            return escape(String.fromCharCode(parseInt(content.slice(2), 16)));
          }
          if (content.startsWith("u+")) {
            return escape(
              String.fromCharCode(
                ...content.slice(2).split("-").map((code) => parseInt(code, 16))
              )
            );
          }
          const match = (
            /** @type {RegExpExecArray} */
            param_pattern.exec(content)
          );
          const [, is_optional, is_rest, name, matcher] = match;
          params.push({
            name,
            matcher,
            optional: !!is_optional,
            rest: !!is_rest,
            chained: is_rest ? i === 1 && parts[0] === "" : false
          });
          return is_rest ? "(.*?)" : is_optional ? "([^/]*)?" : "([^/]+?)";
        }
        return escape(content);
      }).join("");
      return "/" + result;
    }).join("")}/?$`
  );
  return { pattern, params };
}
function affects_path(segment) {
  return !/^\([^)]+\)$/.test(segment);
}
function get_route_segments(route) {
  return route.slice(1).split("/").filter(affects_path);
}
function exec(match, params, matchers2) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s) => s).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest) result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers2[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered) return;
  return result;
}
function escape(str) {
  return str.normalize().replace(/[[\]]/g, "\\$&").replace(/%/g, "%25").replace(/\//g, "%2[Ff]").replace(/\?/g, "%3[Ff]").replace(/#/g, "%23").replace(/[.*+?^${}()|\\]/g, "\\$&");
}
function parse({ nodes: nodes2, server_loads: server_loads2, dictionary: dictionary2, matchers: matchers2 }) {
  const layouts_with_server_load = new Set(server_loads2);
  return Object.entries(dictionary2).map(([id, [leaf, layouts, errors]]) => {
    const { pattern, params } = parse_route_id(id);
    const route = {
      id,
      /** @param {string} path */
      exec: (path) => {
        const match = pattern.exec(path);
        if (match) return exec(match, params, matchers2);
      },
      errors: [1, ...errors || []].map((n) => nodes2[n]),
      layouts: [0, ...layouts || []].map(create_layout_loader),
      leaf: create_leaf_loader(leaf)
    };
    route.errors.length = route.layouts.length = Math.max(
      route.errors.length,
      route.layouts.length
    );
    return route;
  });
  function create_leaf_loader(id) {
    const uses_server_data = id < 0;
    if (uses_server_data) id = ~id;
    return [uses_server_data, nodes2[id]];
  }
  function create_layout_loader(id) {
    return id === void 0 ? id : [layouts_with_server_load.has(id), nodes2[id]];
  }
}
function get(key, parse2 = JSON.parse) {
  try {
    return parse2(sessionStorage[key]);
  } catch {
  }
}
function set(key, value, stringify = JSON.stringify) {
  const data = stringify(value);
  try {
    sessionStorage[key] = data;
  } catch {
  }
}
const base = ((_a = globalThis.__sveltekit_cxiu4) == null ? void 0 : _a.base) ?? "/web-sandbox";
const assets = ((_b = globalThis.__sveltekit_cxiu4) == null ? void 0 : _b.assets) ?? base;
const version = "1750291753661";
const SNAPSHOT_KEY = "sveltekit:snapshot";
const SCROLL_KEY = "sveltekit:scroll";
const STATES_KEY = "sveltekit:states";
const PAGE_URL_KEY = "sveltekit:pageurl";
const HISTORY_INDEX = "sveltekit:history";
const NAVIGATION_INDEX = "sveltekit:navigation";
const PRELOAD_PRIORITIES = (
  /** @type {const} */
  {
    tap: 1,
    hover: 2,
    viewport: 3,
    eager: 4,
    off: -1,
    false: -1
  }
);
const origin = location.origin;
function resolve_url(url) {
  if (url instanceof URL) return url;
  let baseURI = document.baseURI;
  if (!baseURI) {
    const baseTags = document.getElementsByTagName("base");
    baseURI = baseTags.length ? baseTags[0].href : document.URL;
  }
  return new URL(url, baseURI);
}
function scroll_state() {
  return {
    x: pageXOffset,
    y: pageYOffset
  };
}
function link_option(element, name) {
  const value = (
    /** @type {ValidLinkOptions<T> | null} */
    element.getAttribute(`data-sveltekit-${name}`)
  );
  return value;
}
const levels = {
  ...PRELOAD_PRIORITIES,
  "": PRELOAD_PRIORITIES.hover
};
function parent_element(element) {
  let parent = element.assignedSlot ?? element.parentNode;
  if ((parent == null ? void 0 : parent.nodeType) === 11) parent = parent.host;
  return (
    /** @type {Element} */
    parent
  );
}
function find_anchor(element, target2) {
  while (element && element !== target2) {
    if (element.nodeName.toUpperCase() === "A" && element.hasAttribute("href")) {
      return (
        /** @type {HTMLAnchorElement | SVGAElement} */
        element
      );
    }
    element = /** @type {Element} */
    parent_element(element);
  }
}
function get_link_info(a, base2, uses_hash_router) {
  let url;
  try {
    url = new URL(a instanceof SVGAElement ? a.href.baseVal : a.href, document.baseURI);
    if (uses_hash_router && url.hash.match(/^#[^/]/)) {
      const route = location.hash.split("#")[1] || "/";
      url.hash = `#${route}${url.hash}`;
    }
  } catch {
  }
  const target2 = a instanceof SVGAElement ? a.target.baseVal : a.target;
  const external = !url || !!target2 || is_external_url(url, base2, uses_hash_router) || (a.getAttribute("rel") || "").split(/\s+/).includes("external");
  const download = (url == null ? void 0 : url.origin) === origin && a.hasAttribute("download");
  return { url, external, target: target2, download };
}
function get_router_options(element) {
  let keepfocus = null;
  let noscroll = null;
  let preload_code = null;
  let preload_data = null;
  let reload = null;
  let replace_state = null;
  let el = element;
  while (el && el !== document.documentElement) {
    if (preload_code === null) preload_code = link_option(el, "preload-code");
    if (preload_data === null) preload_data = link_option(el, "preload-data");
    if (keepfocus === null) keepfocus = link_option(el, "keepfocus");
    if (noscroll === null) noscroll = link_option(el, "noscroll");
    if (reload === null) reload = link_option(el, "reload");
    if (replace_state === null) replace_state = link_option(el, "replacestate");
    el = /** @type {Element} */
    parent_element(el);
  }
  function get_option_state(value) {
    switch (value) {
      case "":
      case "true":
        return true;
      case "off":
      case "false":
        return false;
      default:
        return void 0;
    }
  }
  return {
    preload_code: levels[preload_code ?? "off"],
    preload_data: levels[preload_data ?? "off"],
    keepfocus: get_option_state(keepfocus),
    noscroll: get_option_state(noscroll),
    reload: get_option_state(reload),
    replace_state: get_option_state(replace_state)
  };
}
function notifiable_store(value) {
  const store = writable(value);
  let ready = true;
  function notify() {
    ready = true;
    store.update((val) => val);
  }
  function set2(new_value) {
    ready = false;
    store.set(new_value);
  }
  function subscribe(run2) {
    let old_value;
    return store.subscribe((new_value) => {
      if (old_value === void 0 || ready && new_value !== old_value) {
        run2(old_value = new_value);
      }
    });
  }
  return { notify, set: set2, subscribe };
}
const updated_listener = {
  v: () => {
  }
};
function create_updated_store() {
  const { set: set2, subscribe } = writable(false);
  let timeout;
  async function check() {
    clearTimeout(timeout);
    try {
      const res = await fetch(`${assets}/${"_app/version.json"}`, {
        headers: {
          pragma: "no-cache",
          "cache-control": "no-cache"
        }
      });
      if (!res.ok) {
        return false;
      }
      const data = await res.json();
      const updated2 = data.version !== version;
      if (updated2) {
        set2(true);
        updated_listener.v();
        clearTimeout(timeout);
      }
      return updated2;
    } catch {
      return false;
    }
  }
  return {
    subscribe,
    check
  };
}
function is_external_url(url, base2, hash_routing) {
  if (url.origin !== origin || !url.pathname.startsWith(base2)) {
    return true;
  }
  if (hash_routing) {
    if (url.pathname === base2 + "/" || url.pathname === base2 + "/index.html") {
      return false;
    }
    if (url.protocol === "file:" && url.pathname.replace(/\/[^/]+\.html?$/, "") === base2) {
      return false;
    }
    return true;
  }
  return false;
}
function load_css(deps) {
  return;
}
function decode64(string) {
  const binaryString = asciiToBinary(string);
  const arraybuffer = new ArrayBuffer(binaryString.length);
  const dv = new DataView(arraybuffer);
  for (let i = 0; i < arraybuffer.byteLength; i++) {
    dv.setUint8(i, binaryString.charCodeAt(i));
  }
  return arraybuffer;
}
const KEY_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function asciiToBinary(data) {
  if (data.length % 4 === 0) {
    data = data.replace(/==?$/, "");
  }
  let output = "";
  let buffer = 0;
  let accumulatedBits = 0;
  for (let i = 0; i < data.length; i++) {
    buffer <<= 6;
    buffer |= KEY_STRING.indexOf(data[i]);
    accumulatedBits += 6;
    if (accumulatedBits === 24) {
      output += String.fromCharCode((buffer & 16711680) >> 16);
      output += String.fromCharCode((buffer & 65280) >> 8);
      output += String.fromCharCode(buffer & 255);
      buffer = accumulatedBits = 0;
    }
  }
  if (accumulatedBits === 12) {
    buffer >>= 4;
    output += String.fromCharCode(buffer);
  } else if (accumulatedBits === 18) {
    buffer >>= 2;
    output += String.fromCharCode((buffer & 65280) >> 8);
    output += String.fromCharCode(buffer & 255);
  }
  return output;
}
const UNDEFINED = -1;
const HOLE = -2;
const NAN = -3;
const POSITIVE_INFINITY = -4;
const NEGATIVE_INFINITY = -5;
const NEGATIVE_ZERO = -6;
function unflatten(parsed, revivers) {
  if (typeof parsed === "number") return hydrate2(parsed, true);
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid input");
  }
  const values = (
    /** @type {any[]} */
    parsed
  );
  const hydrated2 = Array(values.length);
  function hydrate2(index2, standalone = false) {
    if (index2 === UNDEFINED) return void 0;
    if (index2 === NAN) return NaN;
    if (index2 === POSITIVE_INFINITY) return Infinity;
    if (index2 === NEGATIVE_INFINITY) return -Infinity;
    if (index2 === NEGATIVE_ZERO) return -0;
    if (standalone) throw new Error(`Invalid input`);
    if (index2 in hydrated2) return hydrated2[index2];
    const value = values[index2];
    if (!value || typeof value !== "object") {
      hydrated2[index2] = value;
    } else if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const type = value[0];
        const reviver = revivers == null ? void 0 : revivers[type];
        if (reviver) {
          return hydrated2[index2] = reviver(hydrate2(value[1]));
        }
        switch (type) {
          case "Date":
            hydrated2[index2] = new Date(value[1]);
            break;
          case "Set":
            const set2 = /* @__PURE__ */ new Set();
            hydrated2[index2] = set2;
            for (let i = 1; i < value.length; i += 1) {
              set2.add(hydrate2(value[i]));
            }
            break;
          case "Map":
            const map = /* @__PURE__ */ new Map();
            hydrated2[index2] = map;
            for (let i = 1; i < value.length; i += 2) {
              map.set(hydrate2(value[i]), hydrate2(value[i + 1]));
            }
            break;
          case "RegExp":
            hydrated2[index2] = new RegExp(value[1], value[2]);
            break;
          case "Object":
            hydrated2[index2] = Object(value[1]);
            break;
          case "BigInt":
            hydrated2[index2] = BigInt(value[1]);
            break;
          case "null":
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated2[index2] = obj;
            for (let i = 1; i < value.length; i += 2) {
              obj[value[i]] = hydrate2(value[i + 1]);
            }
            break;
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "BigInt64Array":
          case "BigUint64Array": {
            const TypedArrayConstructor = globalThis[type];
            const base64 = value[1];
            const arraybuffer = decode64(base64);
            const typedArray = new TypedArrayConstructor(arraybuffer);
            hydrated2[index2] = typedArray;
            break;
          }
          case "ArrayBuffer": {
            const base64 = value[1];
            const arraybuffer = decode64(base64);
            hydrated2[index2] = arraybuffer;
            break;
          }
          default:
            throw new Error(`Unknown type ${type}`);
        }
      } else {
        const array = new Array(value.length);
        hydrated2[index2] = array;
        for (let i = 0; i < value.length; i += 1) {
          const n = value[i];
          if (n === HOLE) continue;
          array[i] = hydrate2(n);
        }
      }
    } else {
      const object = {};
      hydrated2[index2] = object;
      for (const key in value) {
        const n = value[key];
        object[key] = hydrate2(n);
      }
    }
    return hydrated2[index2];
  }
  return hydrate2(0);
}
const valid_layout_exports = /* @__PURE__ */ new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config"
]);
/* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
const valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
/* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
class HttpError {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body) {
    this.status = status;
    if (typeof body === "string") {
      this.body = { message: body };
    } else if (body) {
      this.body = body;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
}
class Redirect {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location2) {
    this.status = status;
    this.location = location2;
  }
}
class SvelteKitError extends Error {
  /**
   * @param {number} status
   * @param {string} text
   * @param {string} message
   */
  constructor(status, text2, message) {
    super(message);
    this.status = status;
    this.text = text2;
  }
}
const INVALIDATED_PARAM = "x-sveltekit-invalidated";
const TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function get_status(error2) {
  return error2 instanceof HttpError || error2 instanceof SvelteKitError ? error2.status : 500;
}
function get_message(error2) {
  return error2 instanceof SvelteKitError ? error2.text : "Internal Error";
}
let page$2;
let navigating;
let updated;
const is_legacy = onMount.toString().includes("$$") || /function \w+\(\) \{\}/.test(onMount.toString());
if (is_legacy) {
  page$2 = {
    data: {},
    form: null,
    error: null,
    params: {},
    route: { id: null },
    state: {},
    status: -1,
    url: new URL("https://example.com")
  };
  navigating = { current: null };
  updated = { current: false };
} else {
  page$2 = new (_c = class {
    constructor() {
      __privateAdd(this, _data, /* @__PURE__ */ state({}));
      __privateAdd(this, _form, /* @__PURE__ */ state(null));
      __privateAdd(this, _error2, /* @__PURE__ */ state(null));
      __privateAdd(this, _params, /* @__PURE__ */ state({}));
      __privateAdd(this, _route, /* @__PURE__ */ state({ id: null }));
      __privateAdd(this, _state, /* @__PURE__ */ state({}));
      __privateAdd(this, _status, /* @__PURE__ */ state(-1));
      __privateAdd(this, _url, /* @__PURE__ */ state(new URL("https://example.com")));
    }
    get data() {
      return get$1(__privateGet(this, _data));
    }
    set data(value) {
      set$1(__privateGet(this, _data), value);
    }
    get form() {
      return get$1(__privateGet(this, _form));
    }
    set form(value) {
      set$1(__privateGet(this, _form), value);
    }
    get error() {
      return get$1(__privateGet(this, _error2));
    }
    set error(value) {
      set$1(__privateGet(this, _error2), value);
    }
    get params() {
      return get$1(__privateGet(this, _params));
    }
    set params(value) {
      set$1(__privateGet(this, _params), value);
    }
    get route() {
      return get$1(__privateGet(this, _route));
    }
    set route(value) {
      set$1(__privateGet(this, _route), value);
    }
    get state() {
      return get$1(__privateGet(this, _state));
    }
    set state(value) {
      set$1(__privateGet(this, _state), value);
    }
    get status() {
      return get$1(__privateGet(this, _status));
    }
    set status(value) {
      set$1(__privateGet(this, _status), value);
    }
    get url() {
      return get$1(__privateGet(this, _url));
    }
    set url(value) {
      set$1(__privateGet(this, _url), value);
    }
  }, _data = new WeakMap(), _form = new WeakMap(), _error2 = new WeakMap(), _params = new WeakMap(), _route = new WeakMap(), _state = new WeakMap(), _status = new WeakMap(), _url = new WeakMap(), _c)();
  navigating = new (_d = class {
    constructor() {
      __privateAdd(this, _current, /* @__PURE__ */ state(null));
    }
    get current() {
      return get$1(__privateGet(this, _current));
    }
    set current(value) {
      set$1(__privateGet(this, _current), value);
    }
  }, _current = new WeakMap(), _d)();
  updated = new (_e = class {
    constructor() {
      __privateAdd(this, _current2, /* @__PURE__ */ state(false));
    }
    get current() {
      return get$1(__privateGet(this, _current2));
    }
    set current(value) {
      set$1(__privateGet(this, _current2), value);
    }
  }, _current2 = new WeakMap(), _e)();
  updated_listener.v = () => updated.current = true;
}
function update(new_page) {
  Object.assign(page$2, new_page);
}
const DATA_SUFFIX = "/__data.json";
const HTML_DATA_SUFFIX = ".html__data.json";
function add_data_suffix(pathname) {
  if (pathname.endsWith(".html")) return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
const ICON_REL_ATTRIBUTES = /* @__PURE__ */ new Set(["icon", "shortcut icon", "apple-touch-icon"]);
const scroll_positions = get(SCROLL_KEY) ?? {};
const snapshots = get(SNAPSHOT_KEY) ?? {};
const stores = {
  url: /* @__PURE__ */ notifiable_store({}),
  page: /* @__PURE__ */ notifiable_store({}),
  navigating: /* @__PURE__ */ writable(
    /** @type {import('@sveltejs/kit').Navigation | null} */
    null
  ),
  updated: /* @__PURE__ */ create_updated_store()
};
function update_scroll_positions(index2) {
  scroll_positions[index2] = scroll_state();
}
function clear_onward_history(current_history_index2, current_navigation_index2) {
  let i = current_history_index2 + 1;
  while (scroll_positions[i]) {
    delete scroll_positions[i];
    i += 1;
  }
  i = current_navigation_index2 + 1;
  while (snapshots[i]) {
    delete snapshots[i];
    i += 1;
  }
}
function native_navigation(url) {
  location.href = url.href;
  return new Promise(() => {
  });
}
async function update_service_worker() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.getRegistration(base || "/");
    if (registration) {
      await registration.update();
    }
  }
}
function noop() {
}
let routes;
let default_layout_loader;
let default_error_loader;
let container;
let target;
let app;
const invalidated = [];
const components = [];
let load_cache = null;
const reroute_cache = /* @__PURE__ */ new Map();
const before_navigate_callbacks = /* @__PURE__ */ new Set();
const on_navigate_callbacks = /* @__PURE__ */ new Set();
const after_navigate_callbacks = /* @__PURE__ */ new Set();
let current = {
  branch: [],
  error: null,
  // @ts-ignore - we need the initial value to be null
  url: null
};
let hydrated = false;
let started = false;
let autoscroll = true;
let is_navigating = false;
let hash_navigating = false;
let has_navigated = false;
let force_invalidation = false;
let root$l;
let current_history_index;
let current_navigation_index;
let token;
const preload_tokens = /* @__PURE__ */ new Set();
async function start$6(_app, _target, hydrate2) {
  var _a2, _b2, _c2, _d2;
  if (document.URL !== location.href) {
    location.href = location.href;
  }
  app = _app;
  await ((_b2 = (_a2 = _app.hooks).init) == null ? void 0 : _b2.call(_a2));
  routes = parse(_app);
  container = document.documentElement;
  target = _target;
  default_layout_loader = _app.nodes[0];
  default_error_loader = _app.nodes[1];
  void default_layout_loader();
  void default_error_loader();
  current_history_index = (_c2 = history.state) == null ? void 0 : _c2[HISTORY_INDEX];
  current_navigation_index = (_d2 = history.state) == null ? void 0 : _d2[NAVIGATION_INDEX];
  if (!current_history_index) {
    current_history_index = current_navigation_index = Date.now();
    history.replaceState(
      {
        ...history.state,
        [HISTORY_INDEX]: current_history_index,
        [NAVIGATION_INDEX]: current_navigation_index
      },
      ""
    );
  }
  const scroll = scroll_positions[current_history_index];
  if (scroll) {
    history.scrollRestoration = "manual";
    scrollTo(scroll.x, scroll.y);
  }
  if (hydrate2) {
    await _hydrate(target, hydrate2);
  } else {
    await navigate({
      type: "enter",
      url: resolve_url(app.hash ? decode_hash(new URL(location.href)) : location.href),
      replace_state: true
    });
  }
  _start_router();
}
function reset_invalidation() {
  invalidated.length = 0;
  force_invalidation = false;
}
function capture_snapshot(index2) {
  if (components.some((c) => c == null ? void 0 : c.snapshot)) {
    snapshots[index2] = components.map((c) => {
      var _a2;
      return (_a2 = c == null ? void 0 : c.snapshot) == null ? void 0 : _a2.capture();
    });
  }
}
function restore_snapshot(index2) {
  var _a2;
  (_a2 = snapshots[index2]) == null ? void 0 : _a2.forEach((value, i) => {
    var _a3, _b2;
    (_b2 = (_a3 = components[i]) == null ? void 0 : _a3.snapshot) == null ? void 0 : _b2.restore(value);
  });
}
function persist_state() {
  update_scroll_positions(current_history_index);
  set(SCROLL_KEY, scroll_positions);
  capture_snapshot(current_navigation_index);
  set(SNAPSHOT_KEY, snapshots);
}
async function _goto(url, options, redirect_count, nav_token) {
  return navigate({
    type: "goto",
    url: resolve_url(url),
    keepfocus: options.keepFocus,
    noscroll: options.noScroll,
    replace_state: options.replaceState,
    state: options.state,
    redirect_count,
    nav_token,
    accept: () => {
      if (options.invalidateAll) {
        force_invalidation = true;
      }
      if (options.invalidate) {
        options.invalidate.forEach(push_invalidated);
      }
    }
  });
}
async function _preload_data(intent) {
  if (intent.id !== (load_cache == null ? void 0 : load_cache.id)) {
    const preload2 = {};
    preload_tokens.add(preload2);
    load_cache = {
      id: intent.id,
      token: preload2,
      promise: load_route({ ...intent, preload: preload2 }).then((result) => {
        preload_tokens.delete(preload2);
        if (result.type === "loaded" && result.state.error) {
          load_cache = null;
        }
        return result;
      })
    };
  }
  return load_cache.promise;
}
async function _preload_code(url) {
  var _a2;
  const route = (_a2 = await get_navigation_intent(url, false)) == null ? void 0 : _a2.route;
  if (route) {
    await Promise.all([...route.layouts, route.leaf].map((load2) => load2 == null ? void 0 : load2[1]()));
  }
}
function initialize(result, target2, hydrate2) {
  var _a2;
  current = result.state;
  const style = document.querySelector("style[data-sveltekit]");
  if (style) style.remove();
  Object.assign(
    page$2,
    /** @type {import('@sveltejs/kit').Page} */
    result.props.page
  );
  root$l = new app.root({
    target: target2,
    props: { ...result.props, stores, components },
    hydrate: hydrate2,
    // @ts-ignore Svelte 5 specific: asynchronously instantiate the component, i.e. don't call flushSync
    sync: false
  });
  restore_snapshot(current_navigation_index);
  if (hydrate2) {
    const navigation = {
      from: null,
      to: {
        params: current.params,
        route: { id: ((_a2 = current.route) == null ? void 0 : _a2.id) ?? null },
        url: new URL(location.href)
      },
      willUnload: false,
      type: "enter",
      complete: Promise.resolve()
    };
    after_navigate_callbacks.forEach((fn) => fn(navigation));
  }
  started = true;
}
function get_navigation_result_from_branch({ url, params, branch: branch2, status, error: error2, route, form }) {
  let slash = "never";
  if (base && (url.pathname === base || url.pathname === base + "/")) {
    slash = "always";
  } else {
    for (const node of branch2) {
      if ((node == null ? void 0 : node.slash) !== void 0) slash = node.slash;
    }
  }
  url.pathname = normalize_path(url.pathname, slash);
  url.search = url.search;
  const result = {
    type: "loaded",
    state: {
      url,
      params,
      branch: branch2,
      error: error2,
      route
    },
    props: {
      // @ts-ignore Somehow it's getting SvelteComponent and SvelteComponentDev mixed up
      constructors: compact(branch2).map((branch_node) => branch_node.node.component),
      page: clone_page(page$2)
    }
  };
  if (form !== void 0) {
    result.props.form = form;
  }
  let data = {};
  let data_changed = !page$2;
  let p = 0;
  for (let i = 0; i < Math.max(branch2.length, current.branch.length); i += 1) {
    const node = branch2[i];
    const prev = current.branch[i];
    if ((node == null ? void 0 : node.data) !== (prev == null ? void 0 : prev.data)) data_changed = true;
    if (!node) continue;
    data = { ...data, ...node.data };
    if (data_changed) {
      result.props[`data_${p}`] = data;
    }
    p += 1;
  }
  const page_changed = !current.url || url.href !== current.url.href || current.error !== error2 || form !== void 0 && form !== page$2.form || data_changed;
  if (page_changed) {
    result.props.page = {
      error: error2,
      params,
      route: {
        id: (route == null ? void 0 : route.id) ?? null
      },
      state: {},
      status,
      url: new URL(url),
      form: form ?? null,
      // The whole page store is updated, but this way the object reference stays the same
      data: data_changed ? data : page$2.data
    };
  }
  return result;
}
async function load_node({ loader, parent, url, params, route, server_data_node }) {
  var _a2, _b2, _c2;
  let data = null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const node = await loader();
  if ((_a2 = node.universal) == null ? void 0 : _a2.load) {
    let depends = function(...deps) {
      for (const dep of deps) {
        const { href } = new URL(dep, url);
        uses.dependencies.add(href);
      }
    };
    const load_input = {
      route: new Proxy(route, {
        get: (target2, key) => {
          if (is_tracking) {
            uses.route = true;
          }
          return target2[
            /** @type {'id'} */
            key
          ];
        }
      }),
      params: new Proxy(params, {
        get: (target2, key) => {
          if (is_tracking) {
            uses.params.add(
              /** @type {string} */
              key
            );
          }
          return target2[
            /** @type {string} */
            key
          ];
        }
      }),
      data: (server_data_node == null ? void 0 : server_data_node.data) ?? null,
      url: make_trackable(
        url,
        () => {
          if (is_tracking) {
            uses.url = true;
          }
        },
        (param) => {
          if (is_tracking) {
            uses.search_params.add(param);
          }
        },
        app.hash
      ),
      async fetch(resource, init2) {
        if (resource instanceof Request) {
          init2 = {
            // the request body must be consumed in memory until browsers
            // implement streaming request bodies and/or the body getter
            body: resource.method === "GET" || resource.method === "HEAD" ? void 0 : await resource.blob(),
            cache: resource.cache,
            credentials: resource.credentials,
            // the headers are undefined on the server if the Headers object is empty
            // so we need to make sure they are also undefined here if there are no headers
            headers: [...resource.headers].length ? resource.headers : void 0,
            integrity: resource.integrity,
            keepalive: resource.keepalive,
            method: resource.method,
            mode: resource.mode,
            redirect: resource.redirect,
            referrer: resource.referrer,
            referrerPolicy: resource.referrerPolicy,
            signal: resource.signal,
            ...init2
          };
        }
        const { resolved, promise } = resolve_fetch_url(resource, init2, url);
        if (is_tracking) {
          depends(resolved.href);
        }
        return promise;
      },
      setHeaders: () => {
      },
      // noop
      depends,
      parent() {
        if (is_tracking) {
          uses.parent = true;
        }
        return parent();
      },
      untrack(fn) {
        is_tracking = false;
        try {
          return fn();
        } finally {
          is_tracking = true;
        }
      }
    };
    {
      data = await node.universal.load.call(null, load_input) ?? null;
    }
  }
  return {
    node,
    loader,
    server: server_data_node,
    universal: ((_b2 = node.universal) == null ? void 0 : _b2.load) ? { type: "data", data, uses } : null,
    data: data ?? (server_data_node == null ? void 0 : server_data_node.data) ?? null,
    slash: ((_c2 = node.universal) == null ? void 0 : _c2.trailingSlash) ?? (server_data_node == null ? void 0 : server_data_node.slash)
  };
}
function resolve_fetch_url(input, init2, url) {
  let requested = input instanceof Request ? input.url : input;
  const resolved = new URL(requested, url);
  if (resolved.origin === url.origin) {
    requested = resolved.href.slice(url.origin.length);
  }
  const promise = started ? subsequent_fetch(requested, resolved.href, init2) : initial_fetch(requested, init2);
  return { resolved, promise };
}
function has_changed(parent_changed, route_changed, url_changed, search_params_changed, uses, params) {
  if (force_invalidation) return true;
  if (!uses) return false;
  if (uses.parent && parent_changed) return true;
  if (uses.route && route_changed) return true;
  if (uses.url && url_changed) return true;
  for (const tracked_params of uses.search_params) {
    if (search_params_changed.has(tracked_params)) return true;
  }
  for (const param of uses.params) {
    if (params[param] !== current.params[param]) return true;
  }
  for (const href of uses.dependencies) {
    if (invalidated.some((fn) => fn(new URL(href)))) return true;
  }
  return false;
}
function create_data_node(node, previous) {
  if ((node == null ? void 0 : node.type) === "data") return node;
  if ((node == null ? void 0 : node.type) === "skip") return previous ?? null;
  return null;
}
function diff_search_params(old_url, new_url) {
  if (!old_url) return new Set(new_url.searchParams.keys());
  const changed = /* @__PURE__ */ new Set([...old_url.searchParams.keys(), ...new_url.searchParams.keys()]);
  for (const key of changed) {
    const old_values2 = old_url.searchParams.getAll(key);
    const new_values = new_url.searchParams.getAll(key);
    if (old_values2.every((value) => new_values.includes(value)) && new_values.every((value) => old_values2.includes(value))) {
      changed.delete(key);
    }
  }
  return changed;
}
function preload_error({ error: error2, url, route, params }) {
  return {
    type: "loaded",
    state: {
      error: error2,
      url,
      route,
      params,
      branch: []
    },
    props: {
      page: clone_page(page$2),
      constructors: []
    }
  };
}
async function load_route({ id, invalidating, url, params, route, preload: preload2 }) {
  if ((load_cache == null ? void 0 : load_cache.id) === id) {
    preload_tokens.delete(load_cache.token);
    return load_cache.promise;
  }
  const { errors, layouts, leaf } = route;
  const loaders = [...layouts, leaf];
  errors.forEach((loader) => loader == null ? void 0 : loader().catch(() => {
  }));
  loaders.forEach((loader) => loader == null ? void 0 : loader[1]().catch(() => {
  }));
  let server_data = null;
  const url_changed = current.url ? id !== get_page_key(current.url) : false;
  const route_changed = current.route ? route.id !== current.route.id : false;
  const search_params_changed = diff_search_params(current.url, url);
  let parent_invalid = false;
  const invalid_server_nodes = loaders.map((loader, i) => {
    var _a2;
    const previous = current.branch[i];
    const invalid = !!(loader == null ? void 0 : loader[0]) && ((previous == null ? void 0 : previous.loader) !== loader[1] || has_changed(
      parent_invalid,
      route_changed,
      url_changed,
      search_params_changed,
      (_a2 = previous.server) == null ? void 0 : _a2.uses,
      params
    ));
    if (invalid) {
      parent_invalid = true;
    }
    return invalid;
  });
  if (invalid_server_nodes.some(Boolean)) {
    try {
      server_data = await load_data(url, invalid_server_nodes);
    } catch (error2) {
      const handled_error = await handle_error(error2, { url, params, route: { id } });
      if (preload_tokens.has(preload2)) {
        return preload_error({ error: handled_error, url, params, route });
      }
      return load_root_error_page({
        status: get_status(error2),
        error: handled_error,
        url,
        route
      });
    }
    if (server_data.type === "redirect") {
      return server_data;
    }
  }
  const server_data_nodes = server_data == null ? void 0 : server_data.nodes;
  let parent_changed = false;
  const branch_promises = loaders.map(async (loader, i) => {
    var _a2;
    if (!loader) return;
    const previous = current.branch[i];
    const server_data_node = server_data_nodes == null ? void 0 : server_data_nodes[i];
    const valid = (!server_data_node || server_data_node.type === "skip") && loader[1] === (previous == null ? void 0 : previous.loader) && !has_changed(
      parent_changed,
      route_changed,
      url_changed,
      search_params_changed,
      (_a2 = previous.universal) == null ? void 0 : _a2.uses,
      params
    );
    if (valid) return previous;
    parent_changed = true;
    if ((server_data_node == null ? void 0 : server_data_node.type) === "error") {
      throw server_data_node;
    }
    return load_node({
      loader: loader[1],
      url,
      params,
      route,
      parent: async () => {
        var _a3;
        const data = {};
        for (let j = 0; j < i; j += 1) {
          Object.assign(data, (_a3 = await branch_promises[j]) == null ? void 0 : _a3.data);
        }
        return data;
      },
      server_data_node: create_data_node(
        // server_data_node is undefined if it wasn't reloaded from the server;
        // and if current loader uses server data, we want to reuse previous data.
        server_data_node === void 0 && loader[0] ? { type: "skip" } : server_data_node ?? null,
        loader[0] ? previous == null ? void 0 : previous.server : void 0
      )
    });
  });
  for (const p of branch_promises) p.catch(() => {
  });
  const branch2 = [];
  for (let i = 0; i < loaders.length; i += 1) {
    if (loaders[i]) {
      try {
        branch2.push(await branch_promises[i]);
      } catch (err) {
        if (err instanceof Redirect) {
          return {
            type: "redirect",
            location: err.location
          };
        }
        if (preload_tokens.has(preload2)) {
          return preload_error({
            error: await handle_error(err, { params, url, route: { id: route.id } }),
            url,
            params,
            route
          });
        }
        let status = get_status(err);
        let error2;
        if (server_data_nodes == null ? void 0 : server_data_nodes.includes(
          /** @type {import('types').ServerErrorNode} */
          err
        )) {
          status = /** @type {import('types').ServerErrorNode} */
          err.status ?? status;
          error2 = /** @type {import('types').ServerErrorNode} */
          err.error;
        } else if (err instanceof HttpError) {
          error2 = err.body;
        } else {
          const updated2 = await stores.updated.check();
          if (updated2) {
            await update_service_worker();
            return await native_navigation(url);
          }
          error2 = await handle_error(err, { params, url, route: { id: route.id } });
        }
        const error_load = await load_nearest_error_page(i, branch2, errors);
        if (error_load) {
          return get_navigation_result_from_branch({
            url,
            params,
            branch: branch2.slice(0, error_load.idx).concat(error_load.node),
            status,
            error: error2,
            route
          });
        } else {
          return await server_fallback(url, { id: route.id }, error2, status);
        }
      }
    } else {
      branch2.push(void 0);
    }
  }
  return get_navigation_result_from_branch({
    url,
    params,
    branch: branch2,
    status: 200,
    error: null,
    route,
    // Reset `form` on navigation, but not invalidation
    form: invalidating ? void 0 : null
  });
}
async function load_nearest_error_page(i, branch2, errors) {
  while (i--) {
    if (errors[i]) {
      let j = i;
      while (!branch2[j]) j -= 1;
      try {
        return {
          idx: j + 1,
          node: {
            node: await /** @type {import('types').CSRPageNodeLoader } */
            errors[i](),
            loader: (
              /** @type {import('types').CSRPageNodeLoader } */
              errors[i]
            ),
            data: {},
            server: null,
            universal: null
          }
        };
      } catch {
        continue;
      }
    }
  }
}
async function load_root_error_page({ status, error: error2, url, route }) {
  const params = {};
  let server_data_node = null;
  const default_layout_has_server_load = app.server_loads[0] === 0;
  if (default_layout_has_server_load) {
    try {
      const server_data = await load_data(url, [true]);
      if (server_data.type !== "data" || server_data.nodes[0] && server_data.nodes[0].type !== "data") {
        throw 0;
      }
      server_data_node = server_data.nodes[0] ?? null;
    } catch {
      if (url.origin !== origin || url.pathname !== location.pathname || hydrated) {
        await native_navigation(url);
      }
    }
  }
  try {
    const root_layout = await load_node({
      loader: default_layout_loader,
      url,
      params,
      route,
      parent: () => Promise.resolve({}),
      server_data_node: create_data_node(server_data_node)
    });
    const root_error = {
      node: await default_error_loader(),
      loader: default_error_loader,
      universal: null,
      server: null,
      data: null
    };
    return get_navigation_result_from_branch({
      url,
      params,
      branch: [root_layout, root_error],
      status,
      error: error2,
      route: null
    });
  } catch (error22) {
    if (error22 instanceof Redirect) {
      return _goto(new URL(error22.location, location.href), {}, 0);
    }
    throw error22;
  }
}
async function get_rerouted_url(url) {
  const href = url.href;
  if (reroute_cache.has(href)) {
    return reroute_cache.get(href);
  }
  let rerouted;
  try {
    const promise = (async () => {
      let rerouted2 = await app.hooks.reroute({
        url: new URL(url),
        fetch: async (input, init2) => {
          return resolve_fetch_url(input, init2, url).promise;
        }
      }) ?? url;
      if (typeof rerouted2 === "string") {
        const tmp = new URL(url);
        if (app.hash) {
          tmp.hash = rerouted2;
        } else {
          tmp.pathname = rerouted2;
        }
        rerouted2 = tmp;
      }
      return rerouted2;
    })();
    reroute_cache.set(href, promise);
    rerouted = await promise;
  } catch (e) {
    reroute_cache.delete(href);
    return;
  }
  return rerouted;
}
async function get_navigation_intent(url, invalidating) {
  if (!url) return;
  if (is_external_url(url, base, app.hash)) return;
  {
    const rerouted = await get_rerouted_url(url);
    if (!rerouted) return;
    const path = get_url_path(rerouted);
    for (const route of routes) {
      const params = route.exec(path);
      if (params) {
        return {
          id: get_page_key(url),
          invalidating,
          route,
          params: decode_params(params),
          url
        };
      }
    }
  }
}
function get_url_path(url) {
  return decode_pathname(
    app.hash ? url.hash.replace(/^#/, "").replace(/[?#].+/, "") : url.pathname.slice(base.length)
  ) || "/";
}
function get_page_key(url) {
  return (app.hash ? url.hash.replace(/^#/, "") : url.pathname) + url.search;
}
function _before_navigate({ url, type, intent, delta }) {
  let should_block = false;
  const nav = create_navigation(current, intent, url, type);
  if (delta !== void 0) {
    nav.navigation.delta = delta;
  }
  const cancellable = {
    ...nav.navigation,
    cancel: () => {
      should_block = true;
      nav.reject(new Error("navigation cancelled"));
    }
  };
  if (!is_navigating) {
    before_navigate_callbacks.forEach((fn) => fn(cancellable));
  }
  return should_block ? null : nav;
}
async function navigate({
  type,
  url,
  popped,
  keepfocus,
  noscroll,
  replace_state,
  state: state2 = {},
  redirect_count = 0,
  nav_token = {},
  accept = noop,
  block: block2 = noop
}) {
  const prev_token = token;
  token = nav_token;
  const intent = await get_navigation_intent(url, false);
  const nav = type === "enter" ? create_navigation(current, intent, url, type) : _before_navigate({ url, type, delta: popped == null ? void 0 : popped.delta, intent });
  if (!nav) {
    block2();
    if (token === nav_token) token = prev_token;
    return;
  }
  const previous_history_index = current_history_index;
  const previous_navigation_index = current_navigation_index;
  accept();
  is_navigating = true;
  if (started && nav.navigation.type !== "enter") {
    stores.navigating.set(navigating.current = nav.navigation);
  }
  let navigation_result = intent && await load_route(intent);
  if (!navigation_result) {
    if (is_external_url(url, base, app.hash)) {
      {
        return await native_navigation(url);
      }
    } else {
      navigation_result = await server_fallback(
        url,
        { id: null },
        await handle_error(new SvelteKitError(404, "Not Found", `Not found: ${url.pathname}`), {
          url,
          params: {},
          route: { id: null }
        }),
        404
      );
    }
  }
  url = (intent == null ? void 0 : intent.url) || url;
  if (token !== nav_token) {
    nav.reject(new Error("navigation aborted"));
    return false;
  }
  if (navigation_result.type === "redirect") {
    if (redirect_count >= 20) {
      navigation_result = await load_root_error_page({
        status: 500,
        error: await handle_error(new Error("Redirect loop"), {
          url,
          params: {},
          route: { id: null }
        }),
        url,
        route: { id: null }
      });
    } else {
      await _goto(new URL(navigation_result.location, url).href, {}, redirect_count + 1, nav_token);
      return false;
    }
  } else if (
    /** @type {number} */
    navigation_result.props.page.status >= 400
  ) {
    const updated2 = await stores.updated.check();
    if (updated2) {
      await update_service_worker();
      await native_navigation(url);
    }
  }
  reset_invalidation();
  update_scroll_positions(previous_history_index);
  capture_snapshot(previous_navigation_index);
  if (navigation_result.props.page.url.pathname !== url.pathname) {
    url.pathname = navigation_result.props.page.url.pathname;
  }
  state2 = popped ? popped.state : state2;
  if (!popped) {
    const change = replace_state ? 0 : 1;
    const entry = {
      [HISTORY_INDEX]: current_history_index += change,
      [NAVIGATION_INDEX]: current_navigation_index += change,
      [STATES_KEY]: state2
    };
    const fn = replace_state ? history.replaceState : history.pushState;
    fn.call(history, entry, "", url);
    if (!replace_state) {
      clear_onward_history(current_history_index, current_navigation_index);
    }
  }
  load_cache = null;
  navigation_result.props.page.state = state2;
  if (started) {
    current = navigation_result.state;
    if (navigation_result.props.page) {
      navigation_result.props.page.url = url;
    }
    const after_navigate = (await Promise.all(
      Array.from(
        on_navigate_callbacks,
        (fn) => fn(
          /** @type {import('@sveltejs/kit').OnNavigate} */
          nav.navigation
        )
      )
    )).filter(
      /** @returns {value is () => void} */
      (value) => typeof value === "function"
    );
    if (after_navigate.length > 0) {
      let cleanup = function() {
        after_navigate.forEach((fn) => {
          after_navigate_callbacks.delete(fn);
        });
      };
      after_navigate.push(cleanup);
      after_navigate.forEach((fn) => {
        after_navigate_callbacks.add(fn);
      });
    }
    root$l.$set(navigation_result.props);
    update(navigation_result.props.page);
    has_navigated = true;
  } else {
    initialize(navigation_result, target, false);
  }
  const { activeElement } = document;
  await tick();
  const scroll = popped ? popped.scroll : noscroll ? scroll_state() : null;
  if (autoscroll) {
    const deep_linked = url.hash && document.getElementById(
      decodeURIComponent(app.hash ? url.hash.split("#")[2] ?? "" : url.hash.slice(1))
    );
    if (scroll) {
      scrollTo(scroll.x, scroll.y);
    } else if (deep_linked) {
      deep_linked.scrollIntoView();
    } else {
      scrollTo(0, 0);
    }
  }
  const changed_focus = (
    // reset focus only if any manual focus management didn't override it
    document.activeElement !== activeElement && // also refocus when activeElement is body already because the
    // focus event might not have been fired on it yet
    document.activeElement !== document.body
  );
  if (!keepfocus && !changed_focus) {
    reset_focus();
  }
  autoscroll = true;
  if (navigation_result.props.page) {
    Object.assign(page$2, navigation_result.props.page);
  }
  is_navigating = false;
  if (type === "popstate") {
    restore_snapshot(current_navigation_index);
  }
  nav.fulfil(void 0);
  after_navigate_callbacks.forEach(
    (fn) => fn(
      /** @type {import('@sveltejs/kit').AfterNavigate} */
      nav.navigation
    )
  );
  stores.navigating.set(navigating.current = null);
}
async function server_fallback(url, route, error2, status) {
  if (url.origin === origin && url.pathname === location.pathname && !hydrated) {
    return await load_root_error_page({
      status,
      error: error2,
      url,
      route
    });
  }
  return await native_navigation(url);
}
function setup_preload() {
  let mousemove_timeout;
  let current_a;
  let current_priority;
  container.addEventListener("mousemove", (event) => {
    const target2 = (
      /** @type {Element} */
      event.target
    );
    clearTimeout(mousemove_timeout);
    mousemove_timeout = setTimeout(() => {
      void preload2(target2, PRELOAD_PRIORITIES.hover);
    }, 20);
  });
  function tap(event) {
    if (event.defaultPrevented) return;
    void preload2(
      /** @type {Element} */
      event.composedPath()[0],
      PRELOAD_PRIORITIES.tap
    );
  }
  container.addEventListener("mousedown", tap);
  container.addEventListener("touchstart", tap, { passive: true });
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          void _preload_code(new URL(
            /** @type {HTMLAnchorElement} */
            entry.target.href
          ));
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0 }
  );
  async function preload2(element, priority) {
    const a = find_anchor(element, container);
    const interacted = a === current_a && priority >= current_priority;
    if (!a || interacted) return;
    const { url, external, download } = get_link_info(a, base, app.hash);
    if (external || download) return;
    const options = get_router_options(a);
    const same_url = url && get_page_key(current.url) === get_page_key(url);
    if (options.reload || same_url) return;
    if (priority <= options.preload_data) {
      current_a = a;
      current_priority = PRELOAD_PRIORITIES.tap;
      const intent = await get_navigation_intent(url, false);
      if (!intent) return;
      {
        void _preload_data(intent);
      }
    } else if (priority <= options.preload_code) {
      current_a = a;
      current_priority = priority;
      void _preload_code(
        /** @type {URL} */
        url
      );
    }
  }
  function after_navigate() {
    observer.disconnect();
    for (const a of container.querySelectorAll("a")) {
      const { url, external, download } = get_link_info(a, base, app.hash);
      if (external || download) continue;
      const options = get_router_options(a);
      if (options.reload) continue;
      if (options.preload_code === PRELOAD_PRIORITIES.viewport) {
        observer.observe(a);
      }
      if (options.preload_code === PRELOAD_PRIORITIES.eager) {
        void _preload_code(
          /** @type {URL} */
          url
        );
      }
    }
  }
  after_navigate_callbacks.add(after_navigate);
  after_navigate();
}
function handle_error(error2, event) {
  if (error2 instanceof HttpError) {
    return error2.body;
  }
  const status = get_status(error2);
  const message = get_message(error2);
  return app.hooks.handleError({ error: error2, event, status, message }) ?? /** @type {any} */
  { message };
}
function push_invalidated(resource) {
  if (typeof resource === "function") {
    invalidated.push(resource);
  } else {
    const { href } = new URL(resource, location.href);
    invalidated.push((url) => url.href === href);
  }
}
function _start_router() {
  var _a2;
  history.scrollRestoration = "manual";
  addEventListener("beforeunload", (e) => {
    let should_block = false;
    persist_state();
    if (!is_navigating) {
      const nav = create_navigation(current, void 0, null, "leave");
      const navigation = {
        ...nav.navigation,
        cancel: () => {
          should_block = true;
          nav.reject(new Error("navigation cancelled"));
        }
      };
      before_navigate_callbacks.forEach((fn) => fn(navigation));
    }
    if (should_block) {
      e.preventDefault();
      e.returnValue = "";
    } else {
      history.scrollRestoration = "auto";
    }
  });
  addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      persist_state();
    }
  });
  if (!((_a2 = navigator.connection) == null ? void 0 : _a2.saveData)) {
    setup_preload();
  }
  container.addEventListener("click", async (event) => {
    if (event.button || event.which !== 1) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.defaultPrevented) return;
    const a = find_anchor(
      /** @type {Element} */
      event.composedPath()[0],
      container
    );
    if (!a) return;
    const { url, external, target: target2, download } = get_link_info(a, base, app.hash);
    if (!url) return;
    if (target2 === "_parent" || target2 === "_top") {
      if (window.parent !== window) return;
    } else if (target2 && target2 !== "_self") {
      return;
    }
    const options = get_router_options(a);
    const is_svg_a_element = a instanceof SVGAElement;
    if (!is_svg_a_element && url.protocol !== location.protocol && !(url.protocol === "https:" || url.protocol === "http:"))
      return;
    if (download) return;
    const [nonhash, hash2] = (app.hash ? url.hash.replace(/^#/, "") : url.href).split("#");
    const same_pathname = nonhash === strip_hash(location);
    if (external || options.reload && (!same_pathname || !hash2)) {
      if (_before_navigate({ url, type: "link" })) {
        is_navigating = true;
      } else {
        event.preventDefault();
      }
      return;
    }
    if (hash2 !== void 0 && same_pathname) {
      const [, current_hash] = current.url.href.split("#");
      if (current_hash === hash2) {
        event.preventDefault();
        if (hash2 === "" || hash2 === "top" && a.ownerDocument.getElementById("top") === null) {
          window.scrollTo({ top: 0 });
        } else {
          const element = a.ownerDocument.getElementById(decodeURIComponent(hash2));
          if (element) {
            element.scrollIntoView();
            element.focus();
          }
        }
        return;
      }
      hash_navigating = true;
      update_scroll_positions(current_history_index);
      update_url(url);
      if (!options.replace_state) return;
      hash_navigating = false;
    }
    event.preventDefault();
    await new Promise((fulfil) => {
      requestAnimationFrame(() => {
        setTimeout(fulfil, 0);
      });
      setTimeout(fulfil, 100);
    });
    await navigate({
      type: "link",
      url,
      keepfocus: options.keepfocus,
      noscroll: options.noscroll,
      replace_state: options.replace_state ?? url.href === location.href
    });
  });
  container.addEventListener("submit", (event) => {
    if (event.defaultPrevented) return;
    const form = (
      /** @type {HTMLFormElement} */
      HTMLFormElement.prototype.cloneNode.call(event.target)
    );
    const submitter = (
      /** @type {HTMLButtonElement | HTMLInputElement | null} */
      event.submitter
    );
    const target2 = (submitter == null ? void 0 : submitter.formTarget) || form.target;
    if (target2 === "_blank") return;
    const method = (submitter == null ? void 0 : submitter.formMethod) || form.method;
    if (method !== "get") return;
    const url = new URL(
      (submitter == null ? void 0 : submitter.hasAttribute("formaction")) && (submitter == null ? void 0 : submitter.formAction) || form.action
    );
    if (is_external_url(url, base, false)) return;
    const event_form = (
      /** @type {HTMLFormElement} */
      event.target
    );
    const options = get_router_options(event_form);
    if (options.reload) return;
    event.preventDefault();
    event.stopPropagation();
    const data = new FormData(event_form);
    const submitter_name = submitter == null ? void 0 : submitter.getAttribute("name");
    if (submitter_name) {
      data.append(submitter_name, (submitter == null ? void 0 : submitter.getAttribute("value")) ?? "");
    }
    url.search = new URLSearchParams(data).toString();
    void navigate({
      type: "form",
      url,
      keepfocus: options.keepfocus,
      noscroll: options.noscroll,
      replace_state: options.replace_state ?? url.href === location.href
    });
  });
  addEventListener("popstate", async (event) => {
    var _a3;
    if ((_a3 = event.state) == null ? void 0 : _a3[HISTORY_INDEX]) {
      const history_index = event.state[HISTORY_INDEX];
      token = {};
      if (history_index === current_history_index) return;
      const scroll = scroll_positions[history_index];
      const state2 = event.state[STATES_KEY] ?? {};
      const url = new URL(event.state[PAGE_URL_KEY] ?? location.href);
      const navigation_index = event.state[NAVIGATION_INDEX];
      const is_hash_change = current.url ? strip_hash(location) === strip_hash(current.url) : false;
      const shallow = navigation_index === current_navigation_index && (has_navigated || is_hash_change);
      if (shallow) {
        if (state2 !== page$2.state) {
          page$2.state = state2;
        }
        update_url(url);
        scroll_positions[current_history_index] = scroll_state();
        if (scroll) scrollTo(scroll.x, scroll.y);
        current_history_index = history_index;
        return;
      }
      const delta = history_index - current_history_index;
      await navigate({
        type: "popstate",
        url,
        popped: {
          state: state2,
          scroll,
          delta
        },
        accept: () => {
          current_history_index = history_index;
          current_navigation_index = navigation_index;
        },
        block: () => {
          history.go(-delta);
        },
        nav_token: token
      });
    } else {
      if (!hash_navigating) {
        const url = new URL(location.href);
        update_url(url);
        if (app.hash) {
          location.reload();
        }
      }
    }
  });
  addEventListener("hashchange", () => {
    if (hash_navigating) {
      hash_navigating = false;
      history.replaceState(
        {
          ...history.state,
          [HISTORY_INDEX]: ++current_history_index,
          [NAVIGATION_INDEX]: current_navigation_index
        },
        "",
        location.href
      );
    }
  });
  for (const link2 of document.querySelectorAll("link")) {
    if (ICON_REL_ATTRIBUTES.has(link2.rel)) {
      link2.href = link2.href;
    }
  }
  addEventListener("pageshow", (event) => {
    if (event.persisted) {
      stores.navigating.set(navigating.current = null);
    }
  });
  function update_url(url) {
    current.url = page$2.url = url;
    stores.page.set(clone_page(page$2));
    stores.page.notify();
  }
}
async function _hydrate(target2, { status = 200, error: error2, node_ids, params, route, server_route, data: server_data_nodes, form }) {
  hydrated = true;
  const url = new URL(location.href);
  let parsed_route;
  {
    {
      ({ params = {}, route = { id: null } } = await get_navigation_intent(url, false) || {});
    }
    parsed_route = routes.find(({ id }) => id === route.id);
  }
  let result;
  let hydrate2 = true;
  try {
    const branch_promises = node_ids.map(async (n, i) => {
      const server_data_node = server_data_nodes[i];
      if (server_data_node == null ? void 0 : server_data_node.uses) {
        server_data_node.uses = deserialize_uses(server_data_node.uses);
      }
      return load_node({
        loader: app.nodes[n],
        url,
        params,
        route,
        parent: async () => {
          const data = {};
          for (let j = 0; j < i; j += 1) {
            Object.assign(data, (await branch_promises[j]).data);
          }
          return data;
        },
        server_data_node: create_data_node(server_data_node)
      });
    });
    const branch2 = await Promise.all(branch_promises);
    if (parsed_route) {
      const layouts = parsed_route.layouts;
      for (let i = 0; i < layouts.length; i++) {
        if (!layouts[i]) {
          branch2.splice(i, 0, void 0);
        }
      }
    }
    result = get_navigation_result_from_branch({
      url,
      params,
      branch: branch2,
      status,
      error: error2,
      form,
      route: parsed_route ?? null
    });
  } catch (error22) {
    if (error22 instanceof Redirect) {
      await native_navigation(new URL(error22.location, location.href));
      return;
    }
    result = await load_root_error_page({
      status: get_status(error22),
      error: await handle_error(error22, { url, params, route }),
      url,
      route
    });
    target2.textContent = "";
    hydrate2 = false;
  }
  if (result.props.page) {
    result.props.page.state = {};
  }
  initialize(result, target2, hydrate2);
}
async function load_data(url, invalid) {
  var _a2;
  const data_url = new URL(url);
  data_url.pathname = add_data_suffix(url.pathname);
  if (url.pathname.endsWith("/")) {
    data_url.searchParams.append(TRAILING_SLASH_PARAM, "1");
  }
  data_url.searchParams.append(INVALIDATED_PARAM, invalid.map((i) => i ? "1" : "0").join(""));
  const fetcher = window.fetch;
  const res = await fetcher(data_url.href, {});
  if (!res.ok) {
    let message;
    if ((_a2 = res.headers.get("content-type")) == null ? void 0 : _a2.includes("application/json")) {
      message = await res.json();
    } else if (res.status === 404) {
      message = "Not Found";
    } else if (res.status === 500) {
      message = "Internal Error";
    }
    throw new HttpError(res.status, message);
  }
  return new Promise(async (resolve) => {
    var _a3;
    const deferreds = /* @__PURE__ */ new Map();
    const reader = (
      /** @type {ReadableStream<Uint8Array>} */
      res.body.getReader()
    );
    const decoder = new TextDecoder();
    function deserialize(data) {
      return unflatten(data, {
        ...app.decoders,
        Promise: (id) => {
          return new Promise((fulfil, reject) => {
            deferreds.set(id, { fulfil, reject });
          });
        }
      });
    }
    let text2 = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done && !text2) break;
      text2 += !value && text2 ? "\n" : decoder.decode(value, { stream: true });
      while (true) {
        const split = text2.indexOf("\n");
        if (split === -1) {
          break;
        }
        const node = JSON.parse(text2.slice(0, split));
        text2 = text2.slice(split + 1);
        if (node.type === "redirect") {
          return resolve(node);
        }
        if (node.type === "data") {
          (_a3 = node.nodes) == null ? void 0 : _a3.forEach((node2) => {
            if ((node2 == null ? void 0 : node2.type) === "data") {
              node2.uses = deserialize_uses(node2.uses);
              node2.data = deserialize(node2.data);
            }
          });
          resolve(node);
        } else if (node.type === "chunk") {
          const { id, data, error: error2 } = node;
          const deferred = (
            /** @type {import('types').Deferred} */
            deferreds.get(id)
          );
          deferreds.delete(id);
          if (error2) {
            deferred.reject(deserialize(error2));
          } else {
            deferred.fulfil(deserialize(data));
          }
        }
      }
    }
  });
}
function deserialize_uses(uses) {
  return {
    dependencies: new Set((uses == null ? void 0 : uses.dependencies) ?? []),
    params: new Set((uses == null ? void 0 : uses.params) ?? []),
    parent: !!(uses == null ? void 0 : uses.parent),
    route: !!(uses == null ? void 0 : uses.route),
    url: !!(uses == null ? void 0 : uses.url),
    search_params: new Set((uses == null ? void 0 : uses.search_params) ?? [])
  };
}
function reset_focus() {
  const autofocus = document.querySelector("[autofocus]");
  if (autofocus) {
    autofocus.focus();
  } else {
    const root2 = document.body;
    const tabindex = root2.getAttribute("tabindex");
    root2.tabIndex = -1;
    root2.focus({ preventScroll: true, focusVisible: false });
    if (tabindex !== null) {
      root2.setAttribute("tabindex", tabindex);
    } else {
      root2.removeAttribute("tabindex");
    }
    const selection = getSelection();
    if (selection && selection.type !== "None") {
      const ranges = [];
      for (let i = 0; i < selection.rangeCount; i += 1) {
        ranges.push(selection.getRangeAt(i));
      }
      setTimeout(() => {
        if (selection.rangeCount !== ranges.length) return;
        for (let i = 0; i < selection.rangeCount; i += 1) {
          const a = ranges[i];
          const b = selection.getRangeAt(i);
          if (a.commonAncestorContainer !== b.commonAncestorContainer || a.startContainer !== b.startContainer || a.endContainer !== b.endContainer || a.startOffset !== b.startOffset || a.endOffset !== b.endOffset) {
            return;
          }
        }
        selection.removeAllRanges();
      });
    }
  }
}
function create_navigation(current2, intent, url, type) {
  var _a2, _b2;
  let fulfil;
  let reject;
  const complete = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  complete.catch(() => {
  });
  const navigation = {
    from: {
      params: current2.params,
      route: { id: ((_a2 = current2.route) == null ? void 0 : _a2.id) ?? null },
      url: current2.url
    },
    to: url && {
      params: (intent == null ? void 0 : intent.params) ?? null,
      route: { id: ((_b2 = intent == null ? void 0 : intent.route) == null ? void 0 : _b2.id) ?? null },
      url
    },
    willUnload: !intent,
    type,
    complete
  };
  return {
    navigation,
    // @ts-expect-error
    fulfil,
    // @ts-expect-error
    reject
  };
}
function clone_page(page2) {
  return {
    data: page2.data,
    error: page2.error,
    form: page2.form,
    params: page2.params,
    route: page2.route,
    state: page2.state,
    status: page2.status,
    url: page2.url
  };
}
function decode_hash(url) {
  const new_url = new URL(url);
  new_url.hash = decodeURIComponent(url.hash);
  return new_url;
}
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled2 = function(promises) {
      return Promise.all(
        promises.map(
          (p) => Promise.resolve(p).then(
            (value) => ({ status: "fulfilled", value }),
            (reason) => ({ status: "rejected", reason })
          )
        )
      );
    };
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = allSettled2(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link22 = links[i];
            if (link22.href === dep && (!isCss || link22.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link2 = document.createElement("link");
        link2.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link2.as = "script";
        }
        link2.crossOrigin = "";
        link2.href = dep;
        if (cspNonce) {
          link2.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link2);
        if (isCss) {
          return new Promise((res, rej) => {
            link2.addEventListener("load", res);
            link2.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const matchers = {};
const PUBLIC_VERSION = "5";
if (typeof window !== "undefined") {
  ((_f = window.__svelte ?? (window.__svelte = {})).v ?? (_f.v = /* @__PURE__ */ new Set())).add(PUBLIC_VERSION);
}
var root_4$2 = /* @__PURE__ */ template(`<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>`);
var root$k = /* @__PURE__ */ template(`<!> <!>`, 1);
function Root($$anchor, $$props) {
  push($$props, true);
  let components2 = prop($$props, "components", 23, () => []), data_0 = prop($$props, "data_0", 3, null), data_1 = prop($$props, "data_1", 3, null);
  {
    user_pre_effect(() => $$props.stores.page.set($$props.page));
  }
  user_effect(() => {
    $$props.stores;
    $$props.page;
    $$props.constructors;
    components2();
    $$props.form;
    data_0();
    data_1();
    $$props.stores.page.notify();
  });
  let mounted = /* @__PURE__ */ state(false);
  let navigated = /* @__PURE__ */ state(false);
  let title2 = /* @__PURE__ */ state(null);
  onMount(() => {
    const unsubscribe = $$props.stores.page.subscribe(() => {
      if (get$1(mounted)) {
        set$1(navigated, true);
        tick().then(() => {
          set$1(title2, document.title || "untitled page", true);
        });
      }
    });
    set$1(mounted, true);
    return unsubscribe;
  });
  const Pyramid_1 = /* @__PURE__ */ user_derived(() => $$props.constructors[1]);
  var fragment = root$k();
  var node = first_child(fragment);
  {
    var consequent = ($$anchor2) => {
      var fragment_1 = comment();
      const Pyramid_0 = /* @__PURE__ */ user_derived(() => $$props.constructors[0]);
      var node_1 = first_child(fragment_1);
      component(node_1, () => get$1(Pyramid_0), ($$anchor3, $$component) => {
        bind_this(
          $$component($$anchor3, {
            get data() {
              return data_0();
            },
            get form() {
              return $$props.form;
            },
            children: ($$anchor4, $$slotProps) => {
              var fragment_2 = comment();
              var node_2 = first_child(fragment_2);
              component(node_2, () => get$1(Pyramid_1), ($$anchor5, $$component2) => {
                bind_this(
                  $$component2($$anchor5, {
                    get data() {
                      return data_1();
                    },
                    get form() {
                      return $$props.form;
                    }
                  }),
                  ($$value) => components2()[1] = $$value,
                  () => {
                    var _a2;
                    return (_a2 = components2()) == null ? void 0 : _a2[1];
                  }
                );
              });
              append($$anchor4, fragment_2);
            },
            $$slots: { default: true }
          }),
          ($$value) => components2()[0] = $$value,
          () => {
            var _a2;
            return (_a2 = components2()) == null ? void 0 : _a2[0];
          }
        );
      });
      append($$anchor2, fragment_1);
    };
    var alternate = ($$anchor2) => {
      var fragment_3 = comment();
      const Pyramid_0 = /* @__PURE__ */ user_derived(() => $$props.constructors[0]);
      var node_3 = first_child(fragment_3);
      component(node_3, () => get$1(Pyramid_0), ($$anchor3, $$component) => {
        bind_this(
          $$component($$anchor3, {
            get data() {
              return data_0();
            },
            get form() {
              return $$props.form;
            }
          }),
          ($$value) => components2()[0] = $$value,
          () => {
            var _a2;
            return (_a2 = components2()) == null ? void 0 : _a2[0];
          }
        );
      });
      append($$anchor2, fragment_3);
    };
    if_block(node, ($$render) => {
      if ($$props.constructors[1]) $$render(consequent);
      else $$render(alternate, false);
    });
  }
  var node_4 = sibling(node, 2);
  {
    var consequent_2 = ($$anchor2) => {
      var div = root_4$2();
      var node_5 = child(div);
      {
        var consequent_1 = ($$anchor3) => {
          var text$1 = text();
          template_effect(() => set_text(text$1, get$1(title2)));
          append($$anchor3, text$1);
        };
        if_block(node_5, ($$render) => {
          if (get$1(navigated)) $$render(consequent_1);
        });
      }
      reset(div);
      append($$anchor2, div);
    };
    if_block(node_4, ($$render) => {
      if (get$1(mounted)) $$render(consequent_2);
    });
  }
  append($$anchor, fragment);
  pop();
}
const root$j = asClassComponent(Root);
const nodes = [
  () => __vitePreload(() => Promise.resolve().then(() => _0), true ? void 0 : void 0, import.meta.url),
  () => __vitePreload(() => Promise.resolve().then(() => _1), true ? void 0 : void 0, import.meta.url),
  () => __vitePreload(() => Promise.resolve().then(() => _2), true ? void 0 : void 0, import.meta.url),
  () => __vitePreload(() => Promise.resolve().then(() => _3), true ? void 0 : void 0, import.meta.url),
  () => __vitePreload(() => Promise.resolve().then(() => _4), true ? void 0 : void 0, import.meta.url),
  () => __vitePreload(() => Promise.resolve().then(() => _5), true ? void 0 : void 0, import.meta.url),
  () => __vitePreload(() => Promise.resolve().then(() => _6), true ? void 0 : void 0, import.meta.url),
  () => __vitePreload(() => Promise.resolve().then(() => _7), true ? void 0 : void 0, import.meta.url)
];
const server_loads = [];
const dictionary = {
  "/": [2],
  "/about": [3],
  "/blog": [4],
  "/blog/[slug]": [5],
  "/history": [6],
  "/todos": [7]
};
const hooks = {
  handleError: ({ error: error2 }) => {
    console.error(error2);
  },
  reroute: () => {
  },
  transport: {}
};
const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
const hash = false;
const decode = (type, value) => decoders[type](value);
const prerender$4 = true;
const _layout$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  prerender: prerender$4
}, Symbol.toStringTag, { value: "Module" }));
function toggleTheme(_, darkMode) {
  set$1(darkMode, !get$1(darkMode));
  if (get$1(darkMode)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
var root_1$7 = /* @__PURE__ */ ns_template(`<svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path></svg>`);
var root_2$5 = /* @__PURE__ */ ns_template(`<svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>`);
var root$i = /* @__PURE__ */ template(`<button class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300" aria-label="Toggle dark mode"><!></button>`);
function ThemeToggle($$anchor, $$props) {
  push($$props, true);
  let darkMode = /* @__PURE__ */ state(false);
  onMount(() => {
    set$1(darkMode, document.documentElement.classList.contains("dark"), true);
  });
  var button = root$i();
  button.__click = [toggleTheme, darkMode];
  var node = child(button);
  {
    var consequent = ($$anchor2) => {
      var svg = root_1$7();
      append($$anchor2, svg);
    };
    var alternate = ($$anchor2) => {
      var svg_1 = root_2$5();
      append($$anchor2, svg_1);
    };
    if_block(node, ($$render) => {
      if (get$1(darkMode)) $$render(consequent);
      else $$render(alternate, false);
    });
  }
  reset(button);
  append($$anchor, button);
  pop();
}
delegate(["click"]);
function toggleMobileMenu(_, mobileMenuOpen) {
  set$1(mobileMenuOpen, !get$1(mobileMenuOpen));
}
var root_1$6 = /* @__PURE__ */ ns_template(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`);
var root_2$4 = /* @__PURE__ */ ns_template(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`);
var root_3$4 = /* @__PURE__ */ template(`<div class="mobile-nav svelte-jobpn2"><ul class="mobile-nav-list svelte-jobpn2"><li class="svelte-jobpn2"><a class="mobile-nav-link svelte-jobpn2">Home</a></li> <li class="svelte-jobpn2"><a class="mobile-nav-link svelte-jobpn2">About</a></li> <li class="svelte-jobpn2"><a class="mobile-nav-link svelte-jobpn2">Blog</a></li> <li class="svelte-jobpn2"><a class="mobile-nav-link svelte-jobpn2">TODOs</a></li> <li class="svelte-jobpn2"><a class="mobile-nav-link svelte-jobpn2">History</a></li></ul></div>`);
var root$h = /* @__PURE__ */ template(`<section class="main-section svelte-jobpn2"><header class="header svelte-jobpn2"><nav aria-label="Global" class="nav-container svelte-jobpn2"><div class="nav-wrapper svelte-jobpn2"><button class="mobile-menu-button sm:hidden svelte-jobpn2" aria-label="Toggle navigation"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><!></svg></button> <ul class="nav-list svelte-jobpn2"><li><a class="nav-link svelte-jobpn2">Home</a></li> <li><a class="nav-link svelte-jobpn2">About</a></li> <li><a class="nav-link svelte-jobpn2">Blog</a></li> <li><a class="nav-link svelte-jobpn2">TODOs</a></li> <li><a class="nav-link svelte-jobpn2">History</a></li></ul> <div class="theme-toggle-wrapper svelte-jobpn2"><!></div></div> <!></nav></header> <main class="flex-1"><!></main> <footer class="footer svelte-jobpn2"><div class="footer-content svelte-jobpn2"><p class="footer-text svelte-jobpn2">© 2025 Me</p></div></footer></section>`);
function _layout($$anchor, $$props) {
  let mobileMenuOpen = /* @__PURE__ */ state(false);
  var section = root$h();
  var header = child(section);
  var nav = child(header);
  var div = child(nav);
  var button = child(div);
  button.__click = [toggleMobileMenu, mobileMenuOpen];
  var svg = child(button);
  var node = child(svg);
  {
    var consequent = ($$anchor2) => {
      var path = root_1$6();
      append($$anchor2, path);
    };
    var alternate = ($$anchor2) => {
      var path_1 = root_2$4();
      append($$anchor2, path_1);
    };
    if_block(node, ($$render) => {
      if (get$1(mobileMenuOpen)) $$render(consequent);
      else $$render(alternate, false);
    });
  }
  reset(svg);
  reset(button);
  var ul = sibling(button, 2);
  var li = child(ul);
  var a = child(li);
  set_attribute(a, "href", `${base ?? ""}/`);
  reset(li);
  var li_1 = sibling(li, 2);
  var a_1 = child(li_1);
  set_attribute(a_1, "href", `${base ?? ""}/about`);
  reset(li_1);
  var li_2 = sibling(li_1, 2);
  var a_2 = child(li_2);
  set_attribute(a_2, "href", `${base ?? ""}/blog`);
  reset(li_2);
  var li_3 = sibling(li_2, 2);
  var a_3 = child(li_3);
  set_attribute(a_3, "href", `${base ?? ""}/todos`);
  reset(li_3);
  var li_4 = sibling(li_3, 2);
  var a_4 = child(li_4);
  set_attribute(a_4, "href", `${base ?? ""}/history`);
  reset(li_4);
  reset(ul);
  var div_1 = sibling(ul, 2);
  var node_1 = child(div_1);
  ThemeToggle(node_1, {});
  reset(div_1);
  reset(div);
  var node_2 = sibling(div, 2);
  {
    var consequent_1 = ($$anchor2) => {
      var div_2 = root_3$4();
      var ul_1 = child(div_2);
      var li_5 = child(ul_1);
      var a_5 = child(li_5);
      set_attribute(a_5, "href", `${base ?? ""}/`);
      reset(li_5);
      var li_6 = sibling(li_5, 2);
      var a_6 = child(li_6);
      set_attribute(a_6, "href", `${base ?? ""}/about`);
      reset(li_6);
      var li_7 = sibling(li_6, 2);
      var a_7 = child(li_7);
      set_attribute(a_7, "href", `${base ?? ""}/blog`);
      reset(li_7);
      var li_8 = sibling(li_7, 2);
      var a_8 = child(li_8);
      set_attribute(a_8, "href", `${base ?? ""}/todos`);
      reset(li_8);
      var li_9 = sibling(li_8, 2);
      var a_9 = child(li_9);
      set_attribute(a_9, "href", `${base ?? ""}/history`);
      reset(li_9);
      reset(ul_1);
      reset(div_2);
      append($$anchor2, div_2);
    };
    if_block(node_2, ($$render) => {
      if (get$1(mobileMenuOpen)) $$render(consequent_1);
    });
  }
  reset(nav);
  reset(header);
  var main = sibling(header, 2);
  var node_3 = child(main);
  snippet(node_3, () => $$props.children);
  reset(main);
  next(2);
  reset(section);
  template_effect(() => set_attribute(button, "aria-expanded", get$1(mobileMenuOpen)));
  append($$anchor, section);
}
delegate(["click"]);
const _0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  component: _layout,
  universal: _layout$1
}, Symbol.toStringTag, { value: "Module" }));
enable_legacy_mode_flag();
const page$1 = {
  get error() {
    return page$2.error;
  }
};
({
  check: stores.updated.check
});
const page = page$1;
var root$g = /* @__PURE__ */ template(`<h1>Error</h1> <h1> </h1>`, 1);
function _error($$anchor, $$props) {
  push($$props, false);
  init();
  var fragment = root$g();
  var h1 = sibling(first_child(fragment), 2);
  var text2 = child(h1, true);
  reset(h1);
  template_effect(() => set_text(text2, page.error.message));
  append($$anchor, fragment);
  pop();
}
const _1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  component: _error
}, Symbol.toStringTag, { value: "Module" }));
var root_1$5 = /* @__PURE__ */ template(`<meta name="description" content="A personal web development sandbox">`);
var root$f = /* @__PURE__ */ template(`<div class="page-container svelte-1mutpfa"><h1 class="svelte-1mutpfa">Home</h1> <p class="svelte-1mutpfa">Some placeholder text.</p></div>`);
function _page$9($$anchor) {
  var div = root$f();
  head(($$anchor2) => {
    var meta = root_1$5();
    $document.title = "Web Sandbox";
    append($$anchor2, meta);
  });
  append($$anchor, div);
}
const _2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  component: _page$9
}, Symbol.toStringTag, { value: "Module" }));
var root_1$4 = /* @__PURE__ */ template(`<meta name="description" content="About this web development sandbox">`);
var root$e = /* @__PURE__ */ template(`<div class="page-container svelte-1c86bmt"><h1 class="svelte-1c86bmt">About</h1> <p class="svelte-1c86bmt">Some placeholder text.</p></div>`);
function _page$8($$anchor) {
  var div = root$e();
  head(($$anchor2) => {
    var meta = root_1$4();
    $document.title = "About - Web Sandbox";
    append($$anchor2, meta);
  });
  append($$anchor, div);
}
const _3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  component: _page$8
}, Symbol.toStringTag, { value: "Module" }));
const prerender$3 = true;
const load$3 = async () => {
  try {
    const allPostFiles = /* @__PURE__ */ Object.assign({ "../../content/blog/2025-05-30-markdown-feature-test.md": () => __vitePreload(() => Promise.resolve().then(() => _20250530MarkdownFeatureTest), true ? void 0 : void 0, import.meta.url), "../../content/blog/2025-06-14-api-integration-setup.md": () => __vitePreload(() => Promise.resolve().then(() => _20250614ApiIntegrationSetup), true ? void 0 : void 0, import.meta.url), "../../content/blog/2025-06-16-typescript-utility-types.md": () => __vitePreload(() => Promise.resolve().then(() => _20250616TypescriptUtilityTypes), true ? void 0 : void 0, import.meta.url) });
    const posts = [];
    for (const [path, resolver] of Object.entries(allPostFiles)) {
      const postModule = await resolver();
      const metadata2 = postModule.metadata;
      if (metadata2 && metadata2.published !== false) {
        posts.push({
          ...metadata2,
          filename: path.split("/").pop()
        });
      }
    }
    const sortedPosts = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return {
      posts: sortedPosts,
      totalPosts: sortedPosts.length
    };
  } catch (e) {
    console.error("Error loading blog posts:", e);
    return {
      posts: [],
      totalPosts: 0
    };
  }
};
const _page$7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  load: load$3,
  prerender: prerender$3
}, Symbol.toStringTag, { value: "Module" }));
var root_1$3 = /* @__PURE__ */ template(`<meta name="description" content="Personal blog about development, technology, and learning">`);
var root_4$1 = /* @__PURE__ */ template(`<span> </span>`);
var root_5$1 = /* @__PURE__ */ template(`<span class="blog-tag"> </span>`);
var root_3$3 = /* @__PURE__ */ template(`<article class="post-card"><h2 class="post-title-link"><a> </a></h2> <div class="post-date-range blog-metadata"><time> </time> <!></div> <p class="post-excerpt"> </p> <div class="flex justify-between items-center"><div class="blog-tags-container"></div> <a class="read-more-link">Continue reading <svg class="read-more-arrow w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></div></article>`);
var root_2$3 = /* @__PURE__ */ template(`<div class="posts-list"></div>`);
var root_6$1 = /* @__PURE__ */ template(`<div class="empty-state"><h2 class="empty-state-title">No posts yet</h2> <p class="empty-state-message">Check back soon for new content!</p></div>`);
var root$d = /* @__PURE__ */ template(`<div class="blog-container"><div class="page-header"><h1 class="page-title">Blog</h1> <p class="page-subtitle"> </p></div> <!></div>`);
function _page$6($$anchor, $$props) {
  push($$props, false);
  const posts = /* @__PURE__ */ mutable_source();
  const totalPosts = /* @__PURE__ */ mutable_source();
  let data = prop($$props, "data", 8);
  legacy_pre_effect(
    () => (get$1(posts), get$1(totalPosts), deep_read_state(data())),
    () => {
      (($$value) => {
        let { posts: $$1, totalPosts: $$2 } = $$value;
        set$1(posts, $$1);
        set$1(totalPosts, $$2);
      })(data());
    }
  );
  legacy_pre_effect_reset();
  init();
  var div = root$d();
  head(($$anchor2) => {
    var meta = root_1$3();
    $document.title = "Blog - Me";
    append($$anchor2, meta);
  });
  var div_1 = child(div);
  var p = sibling(child(div_1), 2);
  var text2 = child(p);
  reset(p);
  reset(div_1);
  var node = sibling(div_1, 2);
  {
    var consequent_1 = ($$anchor2) => {
      var div_2 = root_2$3();
      each(div_2, 5, () => get$1(posts), index, ($$anchor3, post) => {
        var article = root_3$3();
        var h2 = child(article);
        var a = child(h2);
        var text_1 = child(a, true);
        reset(a);
        reset(h2);
        var div_3 = sibling(h2, 2);
        var time = child(div_3);
        var text_2 = child(time, true);
        reset(time);
        var node_1 = sibling(time, 2);
        {
          var consequent = ($$anchor4) => {
            var span = root_4$1();
            var text_3 = child(span);
            reset(span);
            template_effect(() => set_text(text_3, `by ${get$1(post).author ?? ""}`));
            append($$anchor4, span);
          };
          if_block(node_1, ($$render) => {
            if (get$1(post).author) $$render(consequent);
          });
        }
        reset(div_3);
        var p_1 = sibling(div_3, 2);
        var text_4 = child(p_1, true);
        reset(p_1);
        var div_4 = sibling(p_1, 2);
        var div_5 = child(div_4);
        each(div_5, 5, () => get$1(post).tags || [], index, ($$anchor4, tag) => {
          var span_1 = root_5$1();
          var text_5 = child(span_1, true);
          reset(span_1);
          template_effect(() => set_text(text_5, get$1(tag)));
          append($$anchor4, span_1);
        });
        reset(div_5);
        var a_1 = sibling(div_5, 2);
        reset(div_4);
        reset(article);
        template_effect(
          ($0) => {
            set_attribute(a, "href", `${base ?? ""}/blog/${get$1(post).slug ?? ""}`);
            set_text(text_1, get$1(post).title);
            set_text(text_2, $0);
            set_text(text_4, get$1(post).excerpt);
            set_attribute(a_1, "href", `${base ?? ""}/blog/${get$1(post).slug ?? ""}`);
            set_attribute(a_1, "aria-label", `Read complete article: ${get$1(post).title ?? ""}`);
          },
          [
            () => new Date(get$1(post).date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })
          ],
          derived_safe_equal
        );
        append($$anchor3, article);
      });
      reset(div_2);
      append($$anchor2, div_2);
    };
    var alternate = ($$anchor2) => {
      var div_6 = root_6$1();
      append($$anchor2, div_6);
    };
    if_block(node, ($$render) => {
      if (get$1(posts).length > 0) $$render(consequent_1);
      else $$render(alternate, false);
    });
  }
  reset(div);
  template_effect(() => set_text(text2, `${get$1(totalPosts) ?? ""} ${get$1(totalPosts) === 1 ? "post" : "posts"} published`));
  append($$anchor, div);
  pop();
}
const _4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  component: _page$6,
  universal: _page$7
}, Symbol.toStringTag, { value: "Module" }));
function error(status, body) {
  throw new HttpError(status, body);
}
new TextEncoder();
const prerender$2 = true;
const load$2 = async ({ params }) => {
  const { slug: slug2 } = params;
  try {
    const allPostFiles = /* @__PURE__ */ Object.assign({ "../../../content/blog/2025-05-30-markdown-feature-test.md": () => __vitePreload(() => Promise.resolve().then(() => _20250530MarkdownFeatureTest), true ? void 0 : void 0, import.meta.url), "../../../content/blog/2025-06-14-api-integration-setup.md": () => __vitePreload(() => Promise.resolve().then(() => _20250614ApiIntegrationSetup), true ? void 0 : void 0, import.meta.url), "../../../content/blog/2025-06-16-typescript-utility-types.md": () => __vitePreload(() => Promise.resolve().then(() => _20250616TypescriptUtilityTypes), true ? void 0 : void 0, import.meta.url) });
    for (const [path, resolver] of Object.entries(allPostFiles)) {
      const postModule = await resolver();
      const metadata2 = postModule.metadata;
      if ((metadata2 == null ? void 0 : metadata2.slug) === slug2) {
        return {
          content: postModule.default,
          metadata: metadata2,
          slug: slug2,
          filename: path.split("/").pop()
        };
      }
    }
    throw error(404, `Blog post '${slug2}' not found`);
  } catch (e) {
    console.error("Error loading blog post:", e);
    throw error(404, "Post not found");
  }
};
const _page$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  load: load$2,
  prerender: prerender$2
}, Symbol.toStringTag, { value: "Module" }));
var root_1$2 = /* @__PURE__ */ template(`<meta name="description">`);
var root_2$2 = /* @__PURE__ */ template(`<span class="blog-tag"> </span>`);
var root_3$2 = /* @__PURE__ */ template(`<p> </p>`);
var root$c = /* @__PURE__ */ template(`<div class="blog-container"><article class="blog-prose"><!> <div class="blog-footer"><div class="blog-tags-container"></div> <div class="blog-metadata"><p> </p> <!></div></div></article></div>`);
function _page$4($$anchor, $$props) {
  push($$props, false);
  const content = /* @__PURE__ */ mutable_source();
  const metadata2 = /* @__PURE__ */ mutable_source();
  const slug2 = /* @__PURE__ */ mutable_source();
  let data = prop($$props, "data", 8);
  legacy_pre_effect(
    () => (get$1(content), get$1(metadata2), get$1(slug2), deep_read_state(data())),
    () => {
      (($$value) => {
        let { content: $$1, metadata: $$2, slug: $$3 } = $$value;
        set$1(content, $$1);
        set$1(metadata2, $$2);
        set$1(slug2, $$3);
      })(data());
    }
  );
  legacy_pre_effect_reset();
  init();
  var div = root$c();
  head(($$anchor2) => {
    var meta = root_1$2();
    template_effect(() => {
      var _a2, _b2;
      $document.title = ((_a2 = get$1(metadata2)) == null ? void 0 : _a2.title) || "Blog Post";
      set_attribute(meta, "content", ((_b2 = get$1(metadata2)) == null ? void 0 : _b2.excerpt) || "Blog post");
    });
    append($$anchor2, meta);
  });
  var article = child(div);
  var node = child(article);
  component(node, () => get$1(content), ($$anchor2, $$component) => {
    $$component($$anchor2, {});
  });
  var div_1 = sibling(node, 2);
  var div_2 = child(div_1);
  each(div_2, 5, () => {
    var _a2;
    return ((_a2 = get$1(metadata2)) == null ? void 0 : _a2.tags) || [];
  }, index, ($$anchor2, tag) => {
    var span = root_2$2();
    var text2 = child(span, true);
    reset(span);
    template_effect(() => set_text(text2, get$1(tag)));
    append($$anchor2, span);
  });
  reset(div_2);
  var div_3 = sibling(div_2, 2);
  var p = child(div_3);
  var text_1 = child(p);
  reset(p);
  var node_1 = sibling(p, 2);
  {
    var consequent = ($$anchor2) => {
      var p_1 = root_3$2();
      var text_2 = child(p_1);
      reset(p_1);
      template_effect(() => set_text(text_2, `By ${get$1(metadata2).author ?? ""}`));
      append($$anchor2, p_1);
    };
    if_block(node_1, ($$render) => {
      if (get$1(metadata2).author) $$render(consequent);
    });
  }
  reset(div_3);
  reset(div_1);
  reset(article);
  reset(div);
  template_effect(
    ($0) => set_text(text_1, `Published on ${$0 ?? ""}`),
    [
      () => new Date(get$1(metadata2).date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    ],
    derived_safe_equal
  );
  append($$anchor, div);
  pop();
}
const _5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  component: _page$4,
  universal: _page$5
}, Symbol.toStringTag, { value: "Module" }));
const prerender$1 = true;
const load$1 = async () => {
  var _a2;
  try {
    const allPostFiles = /* @__PURE__ */ Object.assign({ "../../content/history/bartering-platform.md": () => __vitePreload(() => Promise.resolve().then(() => barteringPlatform), true ? void 0 : void 0, import.meta.url), "../../content/history/fintech-adtech.md": () => __vitePreload(() => Promise.resolve().then(() => fintechAdtech), true ? void 0 : void 0, import.meta.url), "../../content/history/game-asset-creation.md": () => __vitePreload(() => Promise.resolve().then(() => gameAssetCreation), true ? void 0 : void 0, import.meta.url), "../../content/history/healthcare.md": () => __vitePreload(() => Promise.resolve().then(() => healthcare), true ? void 0 : void 0, import.meta.url), "../../content/history/transportation-defense.md": () => __vitePreload(() => Promise.resolve().then(() => transportationDefense), true ? void 0 : void 0, import.meta.url), "../../content/history/webvr.md": () => __vitePreload(() => Promise.resolve().then(() => webvr), true ? void 0 : void 0, import.meta.url) });
    const posts = [];
    for (const [path, resolver] of Object.entries(allPostFiles)) {
      const postModule = await resolver();
      const metadata2 = postModule.metadata;
      if (metadata2 && metadata2.published !== false) {
        posts.push({
          ...metadata2,
          filename: path.split("/").pop(),
          slug: (_a2 = path.split("/").pop()) == null ? void 0 : _a2.replace(".md", ""),
          content: postModule.default
        });
      }
    }
    const sortedPosts = posts.sort(
      (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()
    );
    return {
      posts: sortedPosts,
      totalPosts: sortedPosts.length
    };
  } catch (e) {
    console.error("Error loading blog posts:", e);
    return {
      posts: [],
      totalPosts: 0
    };
  }
};
const _page$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  load: load$1,
  prerender: prerender$1
}, Symbol.toStringTag, { value: "Module" }));
var root_1$1 = /* @__PURE__ */ template(`<meta name="description" content="Personal blog about development, technology, and learning">`);
var root_4 = /* @__PURE__ */ template(`<span> </span>`);
var root_5 = /* @__PURE__ */ template(`<span class="blog-tag"> </span>`);
var root_6 = /* @__PURE__ */ template(`<span class="blog-tag"> </span>`);
var root_7 = /* @__PURE__ */ template(`<div class="expandable-content"><div class="blog-prose"><!></div></div>`);
var on_click = (_, toggleExpanded, post) => toggleExpanded(get$1(post).slug);
var root_3$1 = /* @__PURE__ */ template(`<article class="post-card"><h2 class="post-title-link"> </h2> <div class="post-date-range blog-metadata"><time> </time> <span>-</span> <time> </time> <!></div> <div class="blog-tags-container"><span class="blog-metadata mr-2 flex items-center">Roles:</span> <!></div> <div><div class="blog-tags-container"><span class="blog-metadata mr-2 flex items-center">Tech:</span> <!></div> <div class="post-excerpt"><p> </p></div> <!> <button class="content-toggle"> <svg class="content-toggle-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button></div></article>`);
var root_2$1 = /* @__PURE__ */ template(`<div class="posts-list"></div>`);
var root_8 = /* @__PURE__ */ template(`<div class="empty-state"><h2 class="empty-state-title">No posts yet</h2> <p class="empty-state-message">Check back soon for new content!</p></div>`);
var root$b = /* @__PURE__ */ template(`<div class="blog-container"><div class="page-header"><h1 class="page-title">History</h1> <p class="page-subtitle"> </p></div> <!></div>`);
function _page$2($$anchor, $$props) {
  push($$props, false);
  const posts = /* @__PURE__ */ mutable_source();
  const totalPosts = /* @__PURE__ */ mutable_source();
  let data = prop($$props, "data", 8);
  let expandedPosts = /* @__PURE__ */ mutable_source({});
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      // month: 'long',
      // day: 'numeric',
      timeZone: "UTC"
    });
  };
  const toggleExpanded = (slug2) => {
    mutate(expandedPosts, get$1(expandedPosts)[slug2] = !get$1(expandedPosts)[slug2]);
  };
  legacy_pre_effect(
    () => (get$1(posts), get$1(totalPosts), deep_read_state(data())),
    () => {
      (($$value) => {
        let { posts: $$1, totalPosts: $$2 } = $$value;
        set$1(posts, $$1);
        set$1(totalPosts, $$2);
      })(data());
    }
  );
  legacy_pre_effect_reset();
  init();
  var div = root$b();
  head(($$anchor2) => {
    var meta = root_1$1();
    $document.title = "History";
    append($$anchor2, meta);
  });
  var div_1 = child(div);
  var p = sibling(child(div_1), 2);
  var text2 = child(p);
  reset(p);
  reset(div_1);
  var node = sibling(div_1, 2);
  {
    var consequent_2 = ($$anchor2) => {
      var div_2 = root_2$1();
      each(div_2, 5, () => get$1(posts), index, ($$anchor3, post) => {
        var article = root_3$1();
        var h2 = child(article);
        var text_1 = child(h2, true);
        reset(h2);
        var div_3 = sibling(h2, 2);
        var time = child(div_3);
        var text_2 = child(time, true);
        reset(time);
        var time_1 = sibling(time, 4);
        var text_3 = child(time_1, true);
        reset(time_1);
        var node_1 = sibling(time_1, 2);
        {
          var consequent = ($$anchor4) => {
            var span = root_4();
            var text_4 = child(span);
            reset(span);
            template_effect(() => set_text(text_4, `by ${get$1(post).author ?? ""}`));
            append($$anchor4, span);
          };
          if_block(node_1, ($$render) => {
            if (get$1(post).author) $$render(consequent);
          });
        }
        reset(div_3);
        var div_4 = sibling(div_3, 2);
        var node_2 = sibling(child(div_4), 2);
        each(node_2, 1, () => get$1(post).roles || [], index, ($$anchor4, role) => {
          var span_1 = root_5();
          var text_5 = child(span_1, true);
          reset(span_1);
          template_effect(() => set_text(text_5, get$1(role)));
          append($$anchor4, span_1);
        });
        reset(div_4);
        var div_5 = sibling(div_4, 2);
        var div_6 = child(div_5);
        var node_3 = sibling(child(div_6), 2);
        each(node_3, 1, () => get$1(post).tags || [], index, ($$anchor4, tag) => {
          var span_2 = root_6();
          var text_6 = child(span_2, true);
          reset(span_2);
          template_effect(() => set_text(text_6, get$1(tag)));
          append($$anchor4, span_2);
        });
        reset(div_6);
        var div_7 = sibling(div_6, 2);
        var p_1 = child(div_7);
        var text_7 = child(p_1, true);
        reset(p_1);
        reset(div_7);
        var node_4 = sibling(div_7, 2);
        {
          var consequent_1 = ($$anchor4) => {
            var div_8 = root_7();
            var div_9 = child(div_8);
            var node_5 = child(div_9);
            component(node_5, () => get$1(post).content, ($$anchor5, $$component) => {
              $$component($$anchor5, {});
            });
            reset(div_9);
            reset(div_8);
            template_effect(() => set_attribute(div_8, "id", `content-${get$1(post).slug ?? ""}`));
            append($$anchor4, div_8);
          };
          if_block(node_4, ($$render) => {
            if (get$1(expandedPosts)[get$1(post).slug]) $$render(consequent_1);
          });
        }
        var button = sibling(node_4, 2);
        button.__click = [on_click, toggleExpanded, post];
        var text_8 = child(button);
        next();
        reset(button);
        reset(div_5);
        reset(article);
        template_effect(
          ($0, $1) => {
            set_text(text_1, get$1(post).title);
            set_text(text_2, $0);
            set_text(text_3, $1);
            set_text(text_7, get$1(post).excerpt);
            set_attribute(button, "aria-expanded", get$1(expandedPosts)[get$1(post).slug]);
            set_attribute(button, "aria-controls", `content-${get$1(post).slug ?? ""}`);
            set_attribute(button, "aria-label", `${get$1(expandedPosts)[get$1(post).slug] ? "Collapse" : "Expand"} ${get$1(post).title ?? ""}`);
            set_text(text_8, `${get$1(expandedPosts)[get$1(post).slug] ? "Show less" : "Show more"} `);
          },
          [
            () => formatDate(get$1(post).start),
            () => get$1(post).end ? formatDate(get$1(post).end) : "Present"
          ],
          derived_safe_equal
        );
        append($$anchor3, article);
      });
      reset(div_2);
      append($$anchor2, div_2);
    };
    var alternate = ($$anchor2) => {
      var div_10 = root_8();
      append($$anchor2, div_10);
    };
    if_block(node, ($$render) => {
      if (get$1(posts).length > 0) $$render(consequent_2);
      else $$render(alternate, false);
    });
  }
  reset(div);
  template_effect(() => set_text(text2, `${get$1(totalPosts) ?? ""} ${get$1(totalPosts) === 1 ? "post" : "posts"} published`));
  append($$anchor, div);
  pop();
}
delegate(["click"]);
const _6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  component: _page$2,
  universal: _page$3
}, Symbol.toStringTag, { value: "Module" }));
const prerender = true;
const load = async () => {
  try {
    const postModule = await __vitePreload(() => Promise.resolve().then(() => todos), true ? void 0 : void 0, import.meta.url);
    const metadata2 = postModule.metadata;
    return {
      metadata: metadata2 || {},
      content: postModule.default,
      slug: (metadata2 == null ? void 0 : metadata2.slug) ?? "todos",
      filename: "todos.md"
    };
  } catch (e) {
    console.error("Error loading todos.md:", e);
    throw error(404, "TODOs not found");
  }
};
const _page$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  load,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
var root_1 = /* @__PURE__ */ template(`<meta name="description">`);
var root_2 = /* @__PURE__ */ template(`<span class="tag svelte-1is5je2"> </span>`);
var root_3 = /* @__PURE__ */ template(`<p> </p>`);
var root$a = /* @__PURE__ */ template(`<div class="blog-container svelte-1is5je2"><article class="blog-article svelte-1is5je2"><!> <div class="blog-footer svelte-1is5je2"><div class="tags-container svelte-1is5je2"></div> <div class="metadata svelte-1is5je2"><p> </p> <!></div></div></article></div>`);
function _page($$anchor, $$props) {
  push($$props, false);
  const content = /* @__PURE__ */ mutable_source();
  const metadata2 = /* @__PURE__ */ mutable_source();
  const slug2 = /* @__PURE__ */ mutable_source();
  let data = prop($$props, "data", 8);
  legacy_pre_effect(
    () => (get$1(content), get$1(metadata2), get$1(slug2), deep_read_state(data())),
    () => {
      (($$value) => {
        let { content: $$1, metadata: $$2, slug: $$3 } = $$value;
        set$1(content, $$1);
        set$1(metadata2, $$2);
        set$1(slug2, $$3);
      })(data());
    }
  );
  legacy_pre_effect_reset();
  init();
  var div = root$a();
  head(($$anchor2) => {
    var meta = root_1();
    template_effect(() => {
      var _a2, _b2;
      $document.title = ((_a2 = get$1(metadata2)) == null ? void 0 : _a2.title) || "Blog Post";
      set_attribute(meta, "content", ((_b2 = get$1(metadata2)) == null ? void 0 : _b2.excerpt) || "Blog post");
    });
    append($$anchor2, meta);
  });
  var article = child(div);
  var node = child(article);
  component(node, () => get$1(content), ($$anchor2, $$component) => {
    $$component($$anchor2, {});
  });
  var div_1 = sibling(node, 2);
  var div_2 = child(div_1);
  each(div_2, 5, () => {
    var _a2;
    return ((_a2 = get$1(metadata2)) == null ? void 0 : _a2.tags) || [];
  }, index, ($$anchor2, tag) => {
    var span = root_2();
    var text2 = child(span, true);
    reset(span);
    template_effect(() => set_text(text2, get$1(tag)));
    append($$anchor2, span);
  });
  reset(div_2);
  var div_3 = sibling(div_2, 2);
  var p = child(div_3);
  var text_1 = child(p);
  reset(p);
  var node_1 = sibling(p, 2);
  {
    var consequent = ($$anchor2) => {
      var p_1 = root_3();
      var text_2 = child(p_1);
      reset(p_1);
      template_effect(() => set_text(text_2, `By ${get$1(metadata2).author ?? ""}`));
      append($$anchor2, p_1);
    };
    if_block(node_1, ($$render) => {
      if (get$1(metadata2).author) $$render(consequent);
    });
  }
  reset(div_3);
  reset(div_1);
  reset(article);
  reset(div);
  template_effect(
    ($0) => set_text(text_1, `Published on ${$0 ?? ""}`),
    [
      () => new Date(get$1(metadata2).date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    ],
    derived_safe_equal
  );
  append($$anchor, div);
  pop();
}
const _7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  component: _page,
  universal: _page$1
}, Symbol.toStringTag, { value: "Module" }));
const metadata$9 = {
  "title": "Complete Markdown Feature Test",
  "date": "2025-05-30",
  "excerpt": "A comprehensive test of all markdown features including headers, lists, code blocks, tables, and more",
  "tags": [
    "markdown",
    "test",
    "mdsvex",
    "documentation"
  ],
  "slug": "2025-05-30-markdown-feature-test",
  "author": "Me",
  "published": true
};
const {
  title: title$9,
  date: date$3,
  excerpt: excerpt$9,
  tags: tags$9,
  slug: slug$3,
  author: author$9,
  published: published$9
} = metadata$9;
var root$9 = /* @__PURE__ */ template(
  `<h1></h1> <p><em></em></p> <p>This is a comprehensive test of all markdown features to ensure MDSvex is working properly.</p> <h2>Headers</h2> <h1>H1 Header</h1> <h2>H2 Header</h2> <h3>H3 Header</h3> <h4>H4 Header</h4> <h5>H5 Header</h5> <h6>H6 Header</h6> <h2>Text Formatting</h2> <p><strong>Bold text</strong> and <strong>also bold</strong></p> <p><em>Italic text</em> and <em>also italic</em></p> <p><strong><em>Bold and italic</em></strong> and <strong><em>also bold and italic</em></strong></p> <p><del>Strikethrough text</del></p> <p><code>Inline code</code></p> <h2>Lists</h2> <h3>Unordered Lists</h3> <ul><li>First item</li> <li>Second item <ul><li>Nested item</li> <li>Another nested item <ul><li>Deep nested item</li></ul></li></ul></li> <li>Third item</li></ul> <h3>Ordered Lists</h3> <ol><li>First ordered item</li> <li>Second ordered item <ol><li>Nested ordered item</li> <li>Another nested ordered item</li></ol></li> <li>Third ordered item</li></ol> <h3>Task Lists</h3> <ul class="contains-task-list"><li class="task-list-item"><input type="checkbox" checked disabled> Completed task</li> <li class="task-list-item"><input type="checkbox" disabled> Incomplete task</li> <li class="task-list-item"><input type="checkbox" checked disabled> Another completed task</li> <li class="task-list-item"><input type="checkbox" disabled> Another incomplete task</li></ul> <h2>Links and Images</h2> <p><a href="https://svelte.dev" rel="nofollow">This is a link</a></p> <p><a href="https://kit.svelte.dev" title="SvelteKit Documentation" rel="nofollow">Link with title</a></p> <h2>Blockquotes</h2> <blockquote><p>This is a blockquote</p> <p>With multiple lines</p> <blockquote><p>And nested blockquotes</p> <blockquote><p>Even deeper nesting</p></blockquote></blockquote></blockquote> <h2>Code Blocks</h2> <h3>JavaScript</h3> <pre class="language-javascript"><!></pre> <h3>TypeScript</h3> <pre class="language-typescript"><!></pre> <h3>CSS</h3> <pre class="language-css"><!></pre> <h3>Svelte Component</h3> <pre class="language-svelte"><!></pre> <h2>Tables</h2> <table><thead><tr><th>Feature</th><th>Status</th><th>Notes</th></tr></thead><tbody><tr><td>Headers</td><td>✅ Working</td><td>All levels supported</td></tr><tr><td>Lists</td><td>✅ Working</td><td>Ordered, unordered, nested</td></tr><tr><td>Code blocks</td><td>✅ Working</td><td>Syntax highlighting</td></tr><tr><td>Tables</td><td>✅ Working</td><td>This table!</td></tr><tr><td>Links</td><td>✅ Working</td><td>Internal and external</td></tr><tr><td>Images</td><td>⚠️ Testing</td><td>Need to test images</td></tr></tbody></table> <h3>Table with Alignment</h3> <table><thead><tr><th align="left">Left Aligned</th><th align="center">Center Aligned</th><th align="right">Right Aligned</th></tr></thead><tbody><tr><td align="left">Left</td><td align="center">Center</td><td align="right">Right</td></tr><tr><td align="left">This is</td><td align="center">some test</td><td align="right">content</td></tr><tr><td align="left">to verify</td><td align="center">table</td><td align="right">alignment</td></tr></tbody></table> <h2>Horizontal Rules</h2> <hr> <h2>Math (if supported)</h2> <p>Inline math: <code>$E = mc^2$</code></p> <p>Block math:</p> <pre class="language-undefined"><!></pre> <h2>Special Characters</h2> <ul><li>En dash: –</li> <li>Em dash: —</li> <li>Ellipsis: …</li> <li>Copyright: ©</li> <li>Trademark: ™</li> <li>Registered: ®</li></ul> <h2>Escape Characters</h2> <p>*This is not italic*</p> <p>\`This is not code\`</p> <p># This is not a header</p> <h2>Line Breaks</h2> <p>This is a line with two spaces at the end
This should be on a new line</p> <p>This is a paragraph with a hard break.</p> <p>This is a new paragraph.</p> <h2>Footnotes (if supported)</h2> <p>This text has a footnote[^1].</p> <p>This text has another footnote[^note].</p> <p>[^1]: This is the first footnote.</p> <p>[^note]: This is a named footnote.</p> <h2>Emoji (if supported)</h2> <p>:rocket: :heart: :tada: :computer: :coffee:</p> <h2>Definition Lists (if supported)</h2> <p>Term 1
: Definition for term 1</p> <p>Term 2
: Definition for term 2
: Another definition for term 2</p> <h2>Abbreviations (if supported)</h2> <p><em>[HTML]: Hyper Text Markup Language</em>[CSS]: Cascading Style Sheets</p> <p>The HTML and CSS specifications are maintained by W3C.</p> <h2>Conclusion</h2> <p>This comprehensive test covers most standard markdown features. If you can see all these elements rendered properly, your MDSvex setup is working correctly!</p> <hr>`,
  1
);
function _025_05_30_markdown_feature_test_md($$anchor) {
  var fragment = root$9();
  var h1 = first_child(fragment);
  h1.textContent = title$9;
  var p = sibling(h1, 2);
  var em = child(p);
  em.textContent = `Published on ${date$3 ?? ""} by ${author$9 ?? ""}`;
  reset(p);
  var pre = sibling(p, 58);
  var node = child(pre);
  html(node, () => `<code class="language-javascript"><span class="token keyword">function</span> <span class="token function">greetUser</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">Hello, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">!</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">Welcome to the blog, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token string">'Developer'</span><span class="token punctuation">;</span>
<span class="token function">greetUser</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`);
  reset(pre);
  var pre_1 = sibling(pre, 4);
  var node_1 = child(pre_1);
  html(node_1, () => `<code class="language-typescript"><span class="token keyword">interface</span> <span class="token class-name">BlogPost</span> <span class="token punctuation">&#123;</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  date<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  excerpt<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  tags<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  slug<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">const</span> post<span class="token operator">:</span> BlogPost <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
  title<span class="token operator">:</span> <span class="token string">'My Blog Post'</span><span class="token punctuation">,</span>
  date<span class="token operator">:</span> <span class="token string">'2025-05-30'</span><span class="token punctuation">,</span>
  excerpt<span class="token operator">:</span> <span class="token string">'This is a test post'</span><span class="token punctuation">,</span>
  tags<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'test'</span><span class="token punctuation">,</span> <span class="token string">'markdown'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  slug<span class="token operator">:</span> <span class="token string">'test-post'</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">;</span></code>`);
  reset(pre_1);
  var pre_2 = sibling(pre_1, 4);
  var node_2 = child(pre_2);
  html(node_2, () => `<code class="language-css"><span class="token selector">.blog-post</span> <span class="token punctuation">&#123;</span>
  <span class="token property">max-width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 2rem<span class="token punctuation">;</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> <span class="token string">'Inter'</span><span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token selector">.blog-post h1</span> <span class="token punctuation">&#123;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #1a202c<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 2.5rem<span class="token punctuation">;</span>
  <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 1rem<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`);
  reset(pre_2);
  var pre_3 = sibling(pre_2, 4);
  var node_3 = child(pre_3);
  html(node_3, () => `<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    count <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onclick=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span>increment<span class="token punctuation">&#125;</span></span><span class="token punctuation">></span></span>
  Count: <span class="token language-javascript"><span class="token punctuation">&#123;</span>count<span class="token punctuation">&#125;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">button</span> <span class="token punctuation">&#123;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> #ff3e00<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 0.5rem 1rem<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 0.25rem<span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></code>`);
  reset(pre_3);
  var pre_4 = sibling(pre_3, 20);
  var node_4 = child(pre_4);
  html(node_4, () => `<code class="language-undefined">$$
sum_&#123;i=1&#125;^&#123;n&#125; x_i = x_1 + x_2 + cdots + x_n
$$</code>`);
  reset(pre_4);
  next(52);
  append($$anchor, fragment);
}
const _20250530MarkdownFeatureTest = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _025_05_30_markdown_feature_test_md,
  metadata: metadata$9
}, Symbol.toStringTag, { value: "Module" }));
const metadata$8 = {
  "title": "Quick API Integration Setup",
  "date": "2025-06-14",
  "excerpt": "Setting up a REST API client with error handling and response validation",
  "tags": ["api", "javascript", "fetch", "integration"],
  "slug": "2025-06-14-api-integration-setup",
  "author": "Me",
  "published": true
};
const {
  title: title$8,
  date: date$2,
  excerpt: excerpt$8,
  tags: tags$8,
  slug: slug$2,
  author: author$8,
  published: published$8
} = metadata$8;
var root$8 = /* @__PURE__ */ template(`<h1>API Client Setup</h1> <p>Quick setup for a robust API client:</p> <pre class="language-javascript"><!></pre>`, 1);
function _025_06_14_api_integration_setup_md($$anchor) {
  var fragment = root$8();
  var pre = sibling(first_child(fragment), 4);
  var node = child(pre);
  html(node, () => `<code class="language-javascript"><span class="token keyword">const</span> apiClient <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">async</span> <span class="token function">get</span><span class="token punctuation">(</span>endpoint<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">/api/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>endpoint<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>response<span class="token punctuation">.</span>ok<span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">API Error: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>response<span class="token punctuation">.</span>status<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">;</span></code>`);
  reset(pre);
  append($$anchor, fragment);
}
const _20250614ApiIntegrationSetup = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _025_06_14_api_integration_setup_md,
  metadata: metadata$8
}, Symbol.toStringTag, { value: "Module" }));
const metadata$7 = {
  "title": "TypeScript Utility Types Cheat Sheet",
  "date": "2025-06-16",
  "excerpt": "Essential TypeScript utility types for cleaner and more maintainable code",
  "tags": [
    "typescript",
    "types",
    "utilities",
    "development"
  ],
  "slug": "2025-06-16-typescript-utility-types",
  "author": "Me",
  "published": true
};
const {
  title: title$7,
  date: date$1,
  excerpt: excerpt$7,
  tags: tags$7,
  slug: slug$1,
  author: author$7,
  published: published$7
} = metadata$7;
var root$7 = /* @__PURE__ */ template(`<h1>TypeScript Utility Types</h1> <h2>Most Useful Utilities</h2> <p>Quick reference for the most commonly used utility types:</p> <pre class="language-typescript"><!></pre>`, 1);
function _025_06_16_typescript_utility_types_md($$anchor) {
  var fragment = root$7();
  var pre = sibling(first_child(fragment), 6);
  var node = child(pre);
  html(node, () => `<code class="language-typescript"><span class="token comment">// Pick specific properties</span>
<span class="token keyword">type</span> <span class="token class-name">UserProfile</span> <span class="token operator">=</span> Pick<span class="token operator">&lt;</span>User<span class="token punctuation">,</span> <span class="token string">'name'</span> <span class="token operator">|</span> <span class="token string">'email'</span><span class="token operator">></span><span class="token punctuation">;</span>

<span class="token comment">// Make all properties optional</span>
<span class="token keyword">type</span> <span class="token class-name">PartialUser</span> <span class="token operator">=</span> Partial<span class="token operator">&lt;</span>User<span class="token operator">></span><span class="token punctuation">;</span>

<span class="token comment">// Create from union of strings</span>
<span class="token keyword">type</span> <span class="token class-name">Status</span> <span class="token operator">=</span> <span class="token string">'loading'</span> <span class="token operator">|</span> <span class="token string">'success'</span> <span class="token operator">|</span> <span class="token string">'error'</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">StatusRecord</span> <span class="token operator">=</span> Record<span class="token operator">&lt;</span>Status<span class="token punctuation">,</span> <span class="token builtin">boolean</span><span class="token operator">></span><span class="token punctuation">;</span></code>`);
  reset(pre);
  append($$anchor, fragment);
}
const _20250616TypescriptUtilityTypes = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _025_06_16_typescript_utility_types_md,
  metadata: metadata$7
}, Symbol.toStringTag, { value: "Module" }));
const metadata$6 = {
  "title": "Bartering Platform",
  "start": "2017",
  "end": "2018",
  "excerpt": "Mobile bartering platform",
  "roles": ["Full Stack Developer", "Mobile Developer"],
  "tags": ["Mobile"],
  "author": "Me",
  "published": true
};
const {
  title: title$6,
  start: start$5,
  end: end$5,
  excerpt: excerpt$6,
  roles: roles$5,
  tags: tags$6,
  author: author$6,
  published: published$6
} = metadata$6;
var root$6 = /* @__PURE__ */ template(`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`);
function Bartering_platform_md($$anchor) {
  var p = root$6();
  append($$anchor, p);
}
const barteringPlatform = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bartering_platform_md,
  metadata: metadata$6
}, Symbol.toStringTag, { value: "Module" }));
const metadata$5 = {
  "title": "Fintech & Adtech",
  "start": "2021",
  "end": "2024",
  "excerpt": "Fintech stuff",
  "roles": ["Full Stack Developer"],
  "tags": [
    "Next.js",
    "Nest.js",
    "AWS",
    "Firehose",
    "OpenSearch",
    "MongoDB"
  ],
  "author": "Me",
  "published": true
};
const {
  title: title$5,
  start: start$4,
  end: end$4,
  excerpt: excerpt$5,
  roles: roles$4,
  tags: tags$5,
  author: author$5,
  published: published$5
} = metadata$5;
var root$5 = /* @__PURE__ */ template(`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`);
function Fintech_adtech_md($$anchor) {
  var p = root$5();
  append($$anchor, p);
}
const fintechAdtech = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fintech_adtech_md,
  metadata: metadata$5
}, Symbol.toStringTag, { value: "Module" }));
const metadata$4 = {
  "title": "Freelancer",
  "start": "2024",
  "end": "",
  "excerpt": "VR game asset creation",
  "roles": [
    "3D Artist",
    "Technical Artist",
    "Addon Developer"
  ],
  "tags": [
    "Unity",
    "VR",
    "Blender",
    "Substance Painter",
    "UVs",
    "C#",
    "Python",
    "Open-Source",
    "Art"
  ],
  "author": "Me",
  "published": true
};
const {
  title: title$4,
  start: start$3,
  end: end$3,
  excerpt: excerpt$4,
  roles: roles$3,
  tags: tags$4,
  author: author$4,
  published: published$4
} = metadata$4;
var root$4 = /* @__PURE__ */ template(`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`);
function Game_asset_creation_md($$anchor) {
  var p = root$4();
  append($$anchor, p);
}
const gameAssetCreation = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Game_asset_creation_md,
  metadata: metadata$4
}, Symbol.toStringTag, { value: "Module" }));
const metadata$3 = {
  "title": "Healthcare & Insurance",
  "start": "2020",
  "end": "2021",
  "excerpt": "Healthcare & Insurance",
  "roles": ["Full Stack Developer"],
  "tags": ["PHP", "React", "PSQL", "AWS"],
  "author": "Me",
  "published": true
};
const {
  title: title$3,
  start: start$2,
  end: end$2,
  excerpt: excerpt$3,
  roles: roles$2,
  tags: tags$3,
  author: author$3,
  published: published$3
} = metadata$3;
var root$3 = /* @__PURE__ */ template(`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`);
function Healthcare_md($$anchor) {
  var p = root$3();
  append($$anchor, p);
}
const healthcare = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Healthcare_md,
  metadata: metadata$3
}, Symbol.toStringTag, { value: "Module" }));
const metadata$2 = {
  "title": "Transportation",
  "start": "2016",
  "end": "2016",
  "excerpt": "Traffic software development",
  "roles": ["Developer"],
  "tags": ["Delphi", "C#", "T-SQL", ".NET"],
  "author": "Me",
  "published": true
};
const {
  title: title$2,
  start: start$1,
  end: end$1,
  excerpt: excerpt$2,
  roles: roles$1,
  tags: tags$2,
  author: author$2,
  published: published$2
} = metadata$2;
var root$2 = /* @__PURE__ */ template(`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`);
function Transportation_defense_md($$anchor) {
  var p = root$2();
  append($$anchor, p);
}
const transportationDefense = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Transportation_defense_md,
  metadata: metadata$2
}, Symbol.toStringTag, { value: "Module" }));
const metadata$1 = {
  "title": "WebVR",
  "start": "2018",
  "end": "2020",
  "excerpt": "Traffic software development",
  "roles": ["Full Stack Developer"],
  "tags": [
    "Angular",
    "AFrame",
    "Three.js",
    "Nest.js",
    "PHP",
    "AWS"
  ],
  "author": "Me",
  "published": true
};
const {
  title: title$1,
  start,
  end,
  excerpt: excerpt$1,
  roles,
  tags: tags$1,
  author: author$1,
  published: published$1
} = metadata$1;
var root$1 = /* @__PURE__ */ template(`<h1>Main Heading</h1> <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>. You can also have <strong><em>bold and italic</em></strong> combined.</p> <h2>Subheading</h2> <p>Here’s a list of items:</p> <ul><li>First item</li> <li>Second item with <strong>bold</strong></li> <li>Third item with <em>italic</em> <ul><li>Nested item</li> <li>Another nested item</li></ul></li></ul> <h3>Numbered List</h3> <ol><li>First numbered item</li> <li>Second item</li> <li>Third item <ul><li>Mixed with bullet points</li> <li>Another sub-item</li></ul></li></ol>`, 1);
function Webvr_md($$anchor) {
  var fragment = root$1();
  next(12);
  append($$anchor, fragment);
}
const webvr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Webvr_md,
  metadata: metadata$1
}, Symbol.toStringTag, { value: "Module" }));
const metadata = {
  "title": "TODOs",
  "date": "2025-06-12",
  "excerpt": "A list of project todos to track progress",
  "tags": ["todo"],
  "slug": "todos",
  "author": "Me",
  "published": true
};
const {
  title,
  date,
  excerpt,
  tags,
  slug,
  author,
  published
} = metadata;
var root = /* @__PURE__ */ template(`<h2>TODO List</h2> <h3>Web</h3> <ul class="contains-task-list"><li class="task-list-item"><input type="checkbox" disabled> History timeline visualization (GIT inspired)</li> <li class="task-list-item"><input type="checkbox" disabled> TODO list</li> <li class="task-list-item"><input type="checkbox" disabled> Migrate out of AWS</li> <li class="task-list-item"><input type="checkbox" disabled> Speed up webpages</li></ul>`, 1);
function Todos_md($$anchor) {
  var fragment = root();
  next(4);
  append($$anchor, fragment);
}
const todos = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Todos_md,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
export {
  _layout$1 as _,
  decoders as a,
  hash as b,
  decode as c,
  dictionary as d,
  _layout as e,
  _error as f,
  _page$9 as g,
  hooks as h,
  _page$8 as i,
  _page$7 as j,
  _page$6 as k,
  _page$5 as l,
  load_css,
  matchers as m,
  nodes as n,
  _page$4 as o,
  _page$3 as p,
  _page$2 as q,
  root$j as r,
  server_loads as s,
  start$6 as start,
  _page$1 as t,
  _page as u
};
//# sourceMappingURL=start.BkNdIryU.js.map

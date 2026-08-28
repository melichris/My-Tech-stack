# TypeScript Generics: Short Notes

- We use it when we want a function to return any kind of data based on which data props was parse into its parameters or what you return.

## 1. Hello World of Generics

Generics allow you to create reusable components that work with a variety of types instead of a single one. They act as type variables that capture the type provided by the user.

- **Example:**

```typescript
// Without Generics (forces a specific type or loses type safety with 'any')
function identityAny(arg: any): any {
  return arg;
}

// With Generics (captures the exact input type)
function identity<Type>(arg: Type): Type {
  return arg;
}

let output1 = identity<string>("myString"); // Type is string
let output2 = identity(42); // Type inference sets Type to number
```

---

## 2. Working with Generic Type Variables

When using generics, the compiler enforces that you treat the generic parameter as if it could be _any_ type. You cannot access properties that are not common to all types.

- **Example:**

```typescript
function loggingIdentity<Type>(arg: Type[]): Type[] {
  // We can access .length because arg is an array of Type
  console.log(arg.length);
  return arg;
}
```

---

## 3. Generic Types

You can create type definitions, interfaces, or type aliases for generic functions. This lets you describe the shape of a function that accepts type parameters.

- **Example:**

```typescript
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

---

## 4. Generic Classes

Generic classes have a similar shape to generic interfaces. They have a generic type parameter list in angle brackets (`<>`) after the class name. Note that only instance properties/methods can be generic, not static ones.

- **Example:**

```typescript
class GenericNumber<NumType> {
  zeroValue!: NumType;
  add!: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;
```

---

## 5. Generic Constraints

Sometimes you want a generic function to work only on a subset of types that possess specific properties (e.g., forcing a type to have a `.length` property). This is achieved using the `extends` keyword.

- **Example:**

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Safe! Confirmed to have .length
  return arg;
}

loggingIdentity({ length: 10, value: 3 }); // Works
// loggingIdentity(3); // Error: Argument of type 'number' doesn't have a 'length' property
```

---

## 6. Using Type Parameters in Generic Constraints

You can declare a type parameter that is constrained by another type parameter. This is useful for tasks like ensuring you only read a property that exists on an object.

- **Example:**

```typescript
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3 };

getProperty(x, "a"); // Works
// getProperty(x, "m"); // Error: Argument of type '"m"' is not assignable to '"a" | "b" | "c"'
```

---

## 7. Using Class Types in Generics

When creating factories in TypeScript using generics, it is necessary to refer to class types by their constructor functions.

- **Example:**

```typescript
class Animal {
  numLegs: number = 4;
}

function createInstance<A>(c: new () => A): A {
  return new c();
}

const myAnimal = createInstance(Animal);
```

---

## 8. Generic Parameter Defaults

You can provide default types for generic type parameters. If a type isn't specified and cannot be inferred, the default type will be used.

- **Example:**

```typescript
interface Container<T = string> {
  element: T;
}

const strContainer: Container = { element: "Hello" }; // Defaults to Container<string>
const numContainer: Container<number> = { element: 123 };
```

---

## 9. Variance Annotations

Variance annotations (`in` and `out`) allow you to explicitly declare whether a type parameter is contravariant (`in`) or covariant (`out`). This optimizes type-checking performance for complex or deeply nested types.

- **Example:**

```typescript
// Producer: Only outputs T (Covariant)
interface Producer<out T> {
  make(): T;
}

// Consumer: Only inputs T (Contravariant)
interface Consumer<in T> {
  consume(arg: T): void;
}
```

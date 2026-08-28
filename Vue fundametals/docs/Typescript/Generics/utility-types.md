# TypeScript Utility Types Reference Notes

## Awaited<Type>

Unwraps promises recursively to extract their final resolved return type.

- **Example**:

```ts
type Clean = Awaited<Promise<Promise<string>>>; // string
```

## Partial<Type>

Constructs a new type setting all properties of the input shape to optional (`?`).

- **Example**:

```ts
interface User {
  id: number;
  name: string;
}
type UpdateUser = Partial<User>; // { id?: number; name?: string; }
```

## Required<Type>

Constructs a new type stripping away optional modifiers, making every property mandatory.

- **Example**:

```ts
interface Props {
  id?: number;
  active?: boolean;
}
type StrictProps = Required<Props>; // { id: number; active: boolean; }
```

## Readonly<Type>

Constructs a new type marking all properties as immutable, preventing reassignment.

- **Example**:

```ts
interface Config {
  API: string;
}
const settings: Readonly<Config> = { API: "https://api.com" };
// settings.API = "test"; // Error: Cannot assign to 'API' because it is a read-only property.
```

## Record<Keys, Type>

Constructs an object type map where keys belong to one type and values belong to another.

- **Example**:

```ts
type Pages = "home" | "about";
type PageInfo = { title: string };
const nav: Record<Pages, PageInfo> = {
  home: { title: "Home Page" },
  about: { title: "About Us" },
};
```

## Pick<Type, Keys>

Constructs a new type by choosing a specific set of string keys from an existing type.

- **Example**:

```ts
interface Todo {
  id: string;
  title: string;
  done: boolean;
}
type TodoPreview = Pick<Todo, "title" | "done">; // { title: string; done: boolean; }
```

## Omit<Type, Keys>

Constructs a new type by picking all keys from an existing type and then filtering out a specific subset.

- **Example**:

```ts
interface Video {
  id: string;
  url: string;
  views: number;
}
type VideoMetadata = Omit<Video, "url">; // { id: string; views: number; }
```

## Exclude<UnionType, ExcludedMembers>

Filters out matching member types from a distributed union type.

- **Example**:

```ts
type T = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
```

## Extract<Type, Union>

Filters in matching member types from a distributed union type, keeping only shared items.

- **Example**:

```ts
type T = Extract<"a" | "b" | "c", "a" | "f">; // "a"
```

## NonNullable<Type>

Constructs a new type by excluding `null` and `undefined` options from a type configuration.

- **Example**:

```ts
type Data = string | number | null | undefined;
type ValidData = NonNullable<Data>; // string | number
```

## Parameters<Type>

Extracts the types of a function's arguments into a matching tuple array type.

- **Example**:

```ts
function log(msg: string, code: number) {}
type Args = Parameters<typeof log>; // [msg: string, code: number]
```

## ConstructorParameters<Type>

Extracts the parameter argument types of a class constructor function into a tuple array type.

- **Example**:

```ts
class User {
  constructor(id: string, role: string) {}
}
type UserArgs = ConstructorParameters<typeof User>; // [id: string, role: string]
```

## ReturnType<Type>

Extracts the declared or inferred output type returned by a function type.

- **Example**:

```ts
function process() {
  return { active: true };
}
type ProcessResult = ReturnType<typeof process>; // { active: boolean; }
```

## InstanceType<Type>

Extracts the instance type resulting from a class construct or newable expression type.

- **Example**:

```ts
class Item {}
type RealItem = InstanceType<typeof Item>; // Item
```

## NoInfer<Type>

Blocks TypeScript from implicitly using the enclosed parameter type when deciding type inference choices.

- **Example**:

```ts
function validate<T>(value: T, options: { default: NoInfer<T> }) {}
validate("hello", { default: "world" }); // OK
// validate("hello", { default: 123 }); // Error: 123 is not assignable to "hello"
```

## ThisParameterType<Type>

Extracts the declared `this` contextual parameter typing of a targeted function shape.

- **Example**:

```ts
function init(this: { ctx: string }) {}
type Context = ThisParameterType<typeof init>; // { ctx: string }
```

## OmitThisParameter<Type>

Strips out any explicitly declared `this` parameter typing from a targeted function shape.

- **Example**:

```ts
function init(this: { ctx: string }, x: number) {}
type StandardInit = OmitThisParameter<typeof init>; // (x: number) => void
```

## ThisType<Type>

Acts as a marker interface inside object literal definitions to supply contextual object typing for operations inside.

- **Example**:

```ts
interface State {
  data: string;
}
interface Actions {
  clear(): void;
}
const store: Actions & ThisType<State & Actions> = {
  clear() {
    this.data = "";
  }, // 'this' correctly maps to State & Actions
};
```

## Intrinsic String Manipulation Types

These types perform compile-time transformations directly on string literal union types.

### Uppercase<StringType>

- Converts every character in the string type to uppercase.
- **Example**:

```ts
type High = Uppercase<"hello">; // "HELLO"
```

### Lowercase<StringType>

- Converts every character in the string type to lowercase.
- **Example**:

```ts
type Low = Lowercase<"HELLO">; // "hello"
```

### Capitalize<StringType>

- Transforms the first character of the string type to uppercase.
- **Example**:

```ts
type Cap = Capitalize<"hello">; // "Hello"
```

### Uncapitalize<StringType>

- Transforms the first character of the string type to lowercase.
- **Example**:

```ts
type UnCap = Uncapitalize<"Hello">; // "hello"
```

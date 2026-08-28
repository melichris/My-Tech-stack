# Summary

- **Recall that in some places, TypeScript doesn’t try to infer types for us and instead falls back to the most lenient type: any** - alling back to any is just the plain JavaScript experience anyway.

- **However, using any often defeats the purpose of using TypeScript in the first place. The more typed your program is, the more validation and tooling you’ll get, meaning you’ll run into fewer bugs as you code. Turning on the noImplicitAny flag will issue an error on any variables whose type is implicitly inferred as any.**

## Handling noImplicitAny Errors in TypeScript

When you turn on `noImplicitAny` and encounter errors, you should explicitly type your variables instead of letting them default to `any`.

Here is the exact hierarchy of actions to take, ordered from best practice to last resort:

### 1. Provide Specific Types

Replace the implicit `any` with the exact data shape you expect.

- **Primitive types:** Use `string`, `number`, `boolean`.
- **Object structures:** Define an `interface` or `type`.
- **Function parameters:** Always type the arguments and return values.

### 2. Use unknown for Uncertain Data

If you genuinely do not know the type yet (like an API response), use `unknown`.

- It is safer than `any`.
- TypeScript forces you to check the type before using the variable.
- **Example:** `const data: unknown = fetchExternalData();`

### 3. Use Union Types

If a variable can hold more than one type of value, list them explicitly.

- **Example:** `let id: string | number;`

### 4. Use Generics for Flexible Reusability

If a function works with multiple types but maintains a relationship between input and output, use generics.

- **Example:** `function identity<T>(arg: T): T { return arg; }`

### 5. Explicit any (Last Resort Only)

If you are migrating a massive legacy codebase and lack the time to type everything, explicitly write `: any`.

- This silences the `noImplicitAny` compiler error.
- It documents that you intentionally left it untyped for now.

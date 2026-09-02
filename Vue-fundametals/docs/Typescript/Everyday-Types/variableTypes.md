# Type Annotations on Variables

- When you declare a variable using const, var, or let, you can optionally add a type annotation to explicitly specify the type of the variable:

```typescript
const myName: string = "Alice";
let age: number = 21;
let statusOk: boolean = true;
```

# Type Inference

**Definition** - Type inference is a programming language feature where the compiler automatically figures out the data type of a variable or expression based on its initial value

- Example:

```typescript
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";
```

# Functions

- TypeScript allows you to specify the types of both the input and output values of functions.

1.  Parameter Type Annotations
    When you declare a function, you can add type annotations after each parameter to declare what types of parameters the function accepts. Parameter type annotations go after the parameter name:

```typescript
// Parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

2. Return Type Annotations

- You can also add return type annotations. Return type annotations appear after the parameter list:

```typescript
function getFavoriteNumber(): number {
  return 26;
}
```

**NB** - Much like variable type annotations, you usually don’t need a return type annotation because TypeScript will infer the function’s return type based on its return statements

# Functions Which Return Promises

- **The Promise<T> is a full type in TypeScript, just like string, number, or User[]. You can use it for any variable, property, or data structure that holds a promise object.**

- We only use Promise type when:

1. The Function Uses the async Keyword:

- If you type the word async before a function definition, you must use the Promise type. It is a mandatory rule in TypeScript.

```typescript
// Rule: Has 'async'? Use 'Promise'.
async function checkStatus(): Promise<boolean> {
  return true;
}
```

2. The Function Uses fetch() or an Async Library

- If your function body calls an external API using fetch(), axios, or a database driver, that external tool returns a promise. If your function returns that result, your function type must be a Promise.

```typescript
// Rule: Returns the result of a fetch? Use 'Promise'.
function getWebpage(): Promise<string> {
  return fetch("https://example.com").then((res) => res.text());
}
```

3. You Manually Write new Promise()

- If you are writing custom asynchronous code - like a timer, a file reader, or a delay - and you manually initialize a Promise object, the return type must match.

```typescript
// Rule: Returns 'new Promise'? Use 'Promise'.
function waitOneSecond(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
```

**NB**

1. If the caller of this function need to use await or .then() to get the final data, always use Promise Type
2. You can use the Promise type anywhere you store, pass, or describe a pending asynchronous operation.

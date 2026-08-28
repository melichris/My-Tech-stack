# Summary

- TypeScript operates on a strictness scale: it defaults to a lenient, optional type-checking experience to stay out your way (great for migrating JavaScript), but offers a "strict": true setting that turns on advanced checks to catch hidden bugs before your code runs.TypeScript has several type-checking strictness flags that can be turned on or off, and the two most critical strictness checks it enables are noImplicitAny (prevents fallback to untyped variables) and strictNullChecks (prevents unexpected crashes from missing values). The strict flag in the CLI, or "strict": true in a tsconfig.json toggles them all on simultaneously, but we can opt out of them individually

## Here is how these modes differ in practice:

```typescript
// 1. LENIENT MODE ("strict": false)
// TypeScript allows unannotated variables to default to 'any' and ignores potential nulls.

function greetUser(user) {
  // ✅ Allowed in Lenient Mode, but dangerous!
  // 'user' implicitly becomes type 'any' because it has no type tag.

  console.log("Hello, " + user.name.toUpperCase());
  // ✅ Allowed in Lenient Mode.
  // If 'user' or 'user.name' is missing, this crashes at runtime.
}

greetUser(null); // ✅ Allowed, causes a crash!

// 2. STRICT MODE ("strict": true)
// TypeScript forces you to explicitly define types and handle missing data safely.

interface User {
  name?: string; // The name might be missing (optional)
}

function strictGreet(user: User) {
  // ❌ Error: user.name is possibly 'undefined'. You must check it first.
  // console.log("Hello, " + user.name.toUpperCase());

  // ✅ Fixed and Safe:
  if (user.name) {
    console.log("Hello, " + user.name.toUpperCase());
  } else {
    console.log("Hello, Guest!");
  }
}

strictGreet(null); // ❌ Error: Argument of type 'null' is not assignable to parameter of type 'User'.
```

## Definition:

- Static type checking is a process where a compiler or specialized tool analyzes software source code to verify and enforce data type constraints before the program is executed

# Example

```typescript
const message = "hello!";

message();
// This expression is not callable.
// Type 'String' has no call signatures.
```

# NB: Static type systems describe the shapes and behaviors of what our values will be when we run our programs. A type-checker like TypeScript uses that information and tells us when things might be going off the rails.

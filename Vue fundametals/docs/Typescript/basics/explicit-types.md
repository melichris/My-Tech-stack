# Definition

The Explicit types occur when you manually and clearly write out the data type for a variable, parameter, or function return in your code. Instead of letting the computer guess the type, you explicitly state it.

## Example

```typescript
// Explicit type: You clearly state this is a string(Best Approach)
let username: string = "Alice";

// Implicit type: You let TypeScript guess (infer) it is a number
let age = 30;
```

```typescript
Why use explicit typesCode clarity: It makes the code easier for you and other developers to read and understand.Strict error catching: It prevents bugs by ensuring a variable can never accidentally be assigned the wrong type of data later on.Better autocomplete: It helps your code editor (like VS Code) give you accurate suggestions while you type.Where you use themVariables: let score: number = 100;Function parameters: function greet(name: string) { ... }Function return values: function getAge(): number { return 25; }
```

# Summary

- Erased types occur when we compile or .ts file using the tsc it automatically removes all TypeScript specific format when it emits to .js file since the can not be rendered on the browser and keep just the .js version.

## Example

TypeScript code

```typescript
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());
```

JavaScript code

```javascript
"use strict";
function greet(person, date) {
  console.log(
    "Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"),
  );
}
greet("Maddison", new Date());
```

_We can see that all the exlpicit types annotations for_ **person** and **date** _parameters present in the .ts file are absent in the .js file_

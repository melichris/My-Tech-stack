# Summary

- Downleveling in TypeScript is the process of compiling newer JavaScript features into older versions of JavaScript so that the code can run in older environments (like legacy browsers or older Node.js versions).Here is a breakdown of how it works and what it looks like in practice.

## 🔎 The Core Concept

- TypeScript acts as a translator. When you use modern JavaScript syntax (e.g., ES2022), downleveling converts that syntax into an older standard (typically ES5 or ES6/ES2015) based on the "target" property in your tsconfig.json file.

## 📋 Example 1: Arrow Functions

_Arrow functions (() => {}) were introduced in ES6. If your target environment only supports ES5, TypeScript downlevels them to traditional functions._

## TypeScript

```typescript
const multiply = (a: number, b: number) => a * b;
```

## JavaScript

```javascript
var multiply = function (a, b) {
  return a * b;
};
```

## 📋 Example 2: Classes

_Classes were also introduced in ES6. Older browsers only understand prototype-based inheritance, so TypeScript completely rewrites the structure._

## Modern Code (TypeScript)

```typescript
class Robot {
  constructor(public name: string) {}
}
```

## JavaScript

```javascript
var Robot = /** @class */ (function () {
  function Robot(name) {
    this.name = name;
  }
  return Robot;
})();
```

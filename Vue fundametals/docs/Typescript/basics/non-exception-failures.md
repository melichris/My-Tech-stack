# Definition :

An non-exception failure refers to a secondary error that occurs inside an exception handling block (like a catch or except block) while the system is already trying to process an original error

## Example Undefined Props

```typescript
const user = {
  name: "Daniel",
  age: 26,
};

user.location;
//Property 'location' does not exist on type '{ name: string; age: number; }'.
```

## Example Typos

```typescript
const announcement = "Hello World!";

// How quickly can you spot the typos?
announcement.toLocaleLowercase();
announcement.toLocalLowerCase();

// We probably meant to write this...
announcement.toLocaleLowerCase();
```

## Example Uncalled function

```typescript
function flipCoin() {
  // Meant to be Math.random()
  return Math.random < 0.5;
  //Operator '<' cannot be applied to types '() => number' and 'number'.
}
```

## Example basic logic error

```typescript
const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
  // ...
} else if (value === "b") {
This comparison appears to be unintentional because the types '"a"' and '"b"' have no overlap.
  // Oops, unreachable
}
```

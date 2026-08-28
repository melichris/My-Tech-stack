# Object Types

- This are types which are listed directly with the object property:

## Example

```typescript
let user = { id: number, name: string };
```

# Union Types

## Defining a Union Type

- A union type is a type formed from two or more other types, representing values that may be any one of those types. We refer to each of these types as the union’s members.

## Example: Let’s write a function that can operate on strings or numbers:

```typescript
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });
// Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
```

**NB** - TypeScript will only allow an operation if it is valid for every member of the union. For example, if you have the union string | number, you can’t use methods that are only available on string:

```typescript
function printId(id: number | string) {
  console.log(id.toUpperCase());
  //Property 'toUpperCase' does not exist on type 'string | number'.
  //Property 'toUpperCase' does not exist on type 'number'.
}
```

# Type Aliases

**Note** We’ve been using object types and union types by writing them directly in type annotations. This is convenient, but it’s common to want to use the same type more than once and refer to it by a single name.

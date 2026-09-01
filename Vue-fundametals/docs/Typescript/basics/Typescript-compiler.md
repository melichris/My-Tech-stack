# Definition

- The TypeScript compiler, widely known as tsc, is a core command-line tool that transpiles TypeScript code into standard JavaScript. Because web browsers and runtimes like Node.js cannot execute TypeScript directly, tsc acts as a crucial bridge by stripping away type annotations and outputting clean JavaScript that can run anywher

```

** First we’ll need to grab it via npm.

npm install -g typescript
```

# Example

```
// This is an industrial-grade general-purpose greeter function:
function greet(person, date) {
  console.log(`Hello ${person}, today is ${date}!`);
}

greet("Brendan");

Error: hello.ts:4:16 - error TS7006: Parameter 'person' implicitly has an 'any' type.

4 function greet(person, date) {
                 ~~~~~~

hello.ts:4:24 - error TS7006: Parameter 'date' implicitly has an 'any' type.

4 function greet(person, date) {
                         ~~~~

hello.ts:8:1 - error TS2554: Expected 2 arguments, but got 1.

8 greet("Brendan");
  ~~~~~

  hello.ts:4:24 - An argument for 'date' was not provided.
    4 function greet(person, date) {
                             ~~~~


Found 3 errors in the same file, starting at: hello.ts:4
```

# Alternatively,

```typescript
interface greet {
  person: string;
  date: string;
}
//used the interface to strickly define the shape of the object greet ie making the function greet expect just the person and date as properties with their respective expected data type

function greet({ person, date }: greet) {
  console.log(`Hello ${person}, today is ${date}!`);
}

greet({ person: "Brendan", date: "25-02-2006" });
```

## summarilly,

- The tsc is a compiler which transform .ts files to .js so it could run on the browser but before that it uses the typechecker to evaluate the .ts and check for errors if not is found then it proceeds to the .js file creation

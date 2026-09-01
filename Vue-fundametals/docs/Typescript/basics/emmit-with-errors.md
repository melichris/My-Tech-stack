# Emmit wit Errors

- simply means the tsc still creates the .js file even with errors in your .ts file

**noEmitOnError** is just a stricter version of the tsc which will not emmit any .js file if it finds an error.

_Do that using this command_ - tsc --noEmitOnError <fileName> or setting it to tru edirectly in your .json file

```
json{
  "compilerOptions": {
    "noEmitOnError": true
  }
}
```

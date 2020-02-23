# ah-theyre-here-esm-nodejs

Code accompanying my talk "Aaaaaaaaaaaaaah, They’re Here! ES Modules in Node.JS",
whose slides can be found [here](http://bit.ly/ah-theyre-here-esm-nodejs-nodetlv)

## Installing

You will need a Node.js version >= 13.2.

First, you install:

```sh
$ npm ci
...
```

Then, you build:

```sh
$ npm run build
...
```

## Running the tests

This repository has code in `src` that is fully checked by tests in the `test` dir. To run the test, use:

```sh
$ npm test
...
```

## About the source code samples directories

The [`src`](./src) directory contains all the code samples found in the talk:

* `01-what-are-es-modules`: code that shows a sample of ES module syntax, along with its equivalent CommonJS code.
  This sample is not comprehensive by any moeans
* `02-strict`: code that shows that ES modules are strict by definition, while CommonJS is not.
* `03-esm-is-browser-compatible`: code that shows that the same ES module code can be used both in the browser
  and in Node.js, including the use of "import maps".
* `04-esm-is-statically-parsed` code that shows that ES module problems are caught statically before execution
  of said code.
* `05-esm-is-async`: code that shows sample "top-level await" code. This code does
  not (yet) run in Node.js and is not tested.
* `06-exports`: code that shows how the `"exports"` field in `package.json` works
* `07-conditional-exports`: code that shows how conditional exports work, and a sample dual-mode library
  that is automatically created from ESM code. See [this section](#dual-mode-packages) for more explanations.
* `08-migration`: code that shows how to migrate CommonJS code to ES module code, bottom up or top down.

## Dual-mode packages

See [this package source code](./src/07-conditional-exports/dual-mode-package)
for how to create an ESM package and automatically convert it to a dual-mode package with additional CJS files.

In essence:

* The `esm` directory contains the source code itself, and a `package.json` that has `"type": "module"` in it.
  The `"type: "module"` is necessary because the names of the files in ESM and CJS must stay the same, and this
  is only possible if the extension is `.js` in both cases.
* The `build` script uses `babel` to transpile the `esm` directory.
* The `.babelrc` file includes only the specific plugins necessary to transpile `import` to `package.json`.
* The `package.json` file includes the dependencies needed on `babel*` packages.
* The `package.json` includes the `"exports"` for the dual-mode entry points in the `esm` and `cjs` directories.

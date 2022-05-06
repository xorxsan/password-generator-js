# Password Generator in Rust Wasm

Web interface to generate password using Rust.

There are 3 ways to generate this web interface:

- Parcel
- [Rollup](./rollup/)
- [Webpack](./webpack/)

You can access one of these by going to this [link](./index.html).

## How to build it on Webpack

Go to the webpack folder and then issue the following commands:

```sh
yarn
yarn build
```

## How to build it on Rollup

Go to the rollup folder and then issue the following commands:

```sh
yarn
yarn build
```

## How to build it on Parcel

As of version 2, Parcel does not know what to do with Rust code. Latest version (2.5.0) does not still have any Rust transformers. See this [issue](https://github.com/parcel-bundler/parcel/issues/3365).

## What does each file do?

- `Cargo.toml` contains the standard Rust metadata. You put your Rust dependencies in here. You must change this file with your details (name, description, version, authors, categories);
- `index.html` points to the web page;
- The `rollup` folder contains the application bundled with rollup;
- The `src` folder contains the Rust code;
- The `static` folder contains an `index.html` file which loads the `index.js` file;
- The `webpack` folder contains the application bundled with webpack.

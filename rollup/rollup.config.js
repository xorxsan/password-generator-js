import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import rust from "@wasm-tool/rollup-plugin-rust";
import serve from "rollup-plugin-serve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.tsx",
  output: {
    file: "dist/index.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    resolve({
      main: true,
      browser: true,
      extensions: [".tsx", ".ts", ".js"],
      jsnext: true,
    }),
    rust(),
    typescript({ tsconfig: "./tsconfig.json" }),
    commonjs(),
    serve({
      open: false,
      verbose: true,
      contentBase: ["dist"],
      host: "localhost",
      port: 3000,
    }),
    copy({
      targets: [{ src: "../static/index.html", dest: "dist" }],
    }),
  ],
};

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.tsx",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  devtool: "source-map",
  devServer: {
    static: path.join(__dirname, "dist"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [path.resolve(__dirname, "../static")],
    }),
    new WasmPackPlugin({
      crateDirectory: __dirname,
      outDir: path.resolve(__dirname, "pkg"),
    }),
  ],
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
  },
};

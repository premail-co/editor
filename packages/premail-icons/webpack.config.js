const path = require("path");

module.exports = {
  // Entry points to the library
  entry: {
    index: "./src/index.ts",
  },
  // Rules for library file types
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: { configFile: "tsconfig.webpack.json" },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve("./lib"),
    filename: "[name].js",
    library: {
      name: "@premail/icons",
      type: "umd",
    },
    globalObject: "this",
  },
  // Devtool
  target: "web",
  mode: "production",
  optimization: {
    usedExports: true,
  },
  // Peer dependencies
  externals: {
    react: "react",
    ["react-dom"]: "react-dom",
  },
};

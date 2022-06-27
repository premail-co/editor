const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.scss$/,
        exclude: /.*theme\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
            },
          },

          "sass-loader",
        ],
        include: path.resolve(__dirname, "../"),
      },
      {
        test: /.*theme\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },

          "sass-loader",
        ],
        include: path.resolve(__dirname, "../"),
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
      name: "@premail/components",
      type: "umd",
    },
    globalObject: "this",
  },
  // Devtool
  devtool: "source-map",
  target: "web",
  plugins: [
    // new BundleAnalyzerPlugin(),
    // new StaticSiteGeneratorPlugin({
    //   globals: {
    //     window: {},
    //   },
    // }),
    // new TsDeclarationWebpackPlugin({
    //   name: "index.d.ts", // Not required, '[name].d.ts' by default (to match output fileName)
    // }),
    new MiniCssExtractPlugin({}),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "./src/theme/variables.scss"),
    //       to: path.resolve(__dirname, "./lib/theme/variables.scss"),
    //     },
    //     {
    //       from: path.resolve(__dirname, "./src/theme/constants.scss"),
    //       to: path.resolve(__dirname, "./lib/theme/constants.scss"),
    //     },
    //   ],
    // }),
  ],
  mode: "development",
  optimization: {
    usedExports: true,
  },
  // Peer dependencies
  externals: {
    react: "react",
    ["react-dom"]: "react-dom",
  },
};

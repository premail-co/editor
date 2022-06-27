module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.storybook.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-knobs",
    // "@storybook/preset-scss",
  ],
  framework: "@storybook/react",
  core: {
    builder: {
      name: "webpack5",
      options: {
        lazyCompilation: true,
      },
    },
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    // const assetRule = config.module.rules.find(({ test }) => test.test(".svg"));
    // const assetLoader = {
    //   loader: assetRule.loader,
    //   options: assetRule.options || assetRule.query,
    // };

    // config.module.rules.unshift({
    //   test: /\.svg$/,
    //   use: ["@svgr/webpack", assetLoader],
    // });

    // // config.module.rules.find(
    // //   (rule) => rule.test.toString() === "/\\.css$/"
    // // ).exclude = /\.module\.css$/;

    // // config.module.rules.push({
    // //   test: /\.module\.css$/,
    // //   use: [
    // //     "style-loader",
    // //     {
    // //       loader: "css-loader",
    // //       options: {
    // //         modules: true,
    // //       },
    // //     },
    // //   ],
    // // });

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[name]__[local]--[hash:base64:5]",
            },
          },
        },

        "sass-loader",
      ],
    });

    // Return the altered config
    return config;
  },
};

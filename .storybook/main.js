const path = require("path");

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "webpack5"
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript-plugin'
  },
  webpackFinal: async (config, { configType }) => {
    // Add support for custom alias
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
    };

    // Add support for TailwindCSS
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              ident: "postcss",
              plugins: [
                require("tailwindcss"),
                require("autoprefixer"),
              ],
            },
          },
        },
      ],
      include: path.resolve(__dirname, "../"),
    });

    return config;
  },
}
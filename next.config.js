const webpack = require("webpack");
const PromptCompiler = require("./scripts/PromptCompiler");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer, buildId }) => {
    // This will read the prompts in from the prompts directory compile them and assign them to process.env
    config.plugins.push(new webpack.DefinePlugin(new PromptCompiler().build()));

    return config;
  },
}

module.exports = nextConfig

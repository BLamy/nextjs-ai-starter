const webpack = require("webpack");
const PromptCompiler = require("./scripts/PromptCompiler");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: async (config, { isServer, buildId }) => {
    // This will read the prompts in from the prompts directory compile them and assign them to process.env
    const promptCompiler = new PromptCompiler();
    config.plugins.push(new webpack.DefinePlugin(await promptCompiler.build()));

    return config;
  },
}

module.exports = nextConfig

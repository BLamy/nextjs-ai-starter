const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer, buildId }) => {
    // Modify the Webpack configuration
    const path = require('path')
    const fs = require('fs')
    
    // Read all prompts from the prompts folder and add them to the DefinePlugin.
    // This allows us to get the uncompiled prompt files at runtime to send to GPT
    const prompts = fs.readdirSync(path.join(__dirname, './src/ai/prompts'))
        .filter((fileName) => fileName !== 'index.ts')
        .reduce((acc, fileName) => ({ 
            ...acc, 
            [`process.env.${fileName.replace('.ts', '')}`]: JSON.stringify(fs.readFileSync(path.join(__dirname, './src/ai/prompts', fileName), 'utf8'))
        }), {})

    // Add the DefinePlugin to the plugins array
    config.plugins.push(new webpack.DefinePlugin(prompts));

    return config;
  },
}

module.exports = nextConfig

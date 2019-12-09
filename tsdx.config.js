"use strict"

const glsl = require('rollup-plugin-glsl')

module.exports = {
  // This function will run for each entry/format/env combination
  /*
    export interface TsdxOptions {
      // path to file
      input: string;
      // Safe name (for UMD)
      name: string;
      // JS target
      target: 'node' | 'browser';
      // Module format
      format: 'cjs' | 'umd' | 'esm' | 'system';
      // Environment
      env: 'development' | 'production';
      // Path to tsconfig file
      tsconfig?: string;
      // Is opt-in invariant error extraction active?
      extractErrors?: boolean;
      // Is minifying?
      minify?: boolean;
      // Is this the very first rollup config (and thus should one-off metadata be extracted)?
      writeMeta?: boolean;
    }
   */
  rollup(config, options) {
    console.info("config=", config.output.file)
    if (!Array.isArray(config.plugins)) {
      config.plugins = []
    }
    config.plugins.push(glsl({
      // By default, everything gets included
      include: ['**/*.glsl', '**/*.vert', '**/*.frag'],
      // Undefined by default
      exclude: ['**/index.html'],
      // Source maps are on by default
      sourceMap: true
    }))
    return config; // always return a config.
  }
}

/*
 * Rollup configuration building ES5 compatible library.
 *
 * Copyright 2020 Visual Meaning Ltd
 * This is free software licensed as Apache-2.0 - see COPYING for terms.
 */

import {promises as fs} from 'fs';
import babel from '@rollup/plugin-babel';
import {terser} from "rollup-plugin-terser";

import packageJson from './package.json';

async function loadBanner() {
  const contents = await fs.readFile(packageJson.module, {encoding: 'utf-8'});
  return contents.slice(0, contents.search(/(?<=\*\/)\n/) + 1);
}

export default {
  input: packageJson.module,
  output: {
    banner: loadBanner,
    file: packageJson.main,
    format: 'umd',
    name: 'markdownitMarked',
    plugins: [terser()],
  },
  plugins: [babel({babelHelpers: 'bundled'})], // TODO: use @babel/runtime eh?
};

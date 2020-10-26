/*
 * Babel configuration for transpiling javascript to varied targets.
 *
 * Copyright 2020 Visual Meaning Ltd
 * This is free software licensed as Apache-2.0 - see COPYING for terms.
 */

module.exports = (api) => {
  const presets = [];
  if (api.env('test')) {
    presets.push(['@babel/preset-env', {targets: {node: 'current'}}]);
  } else {
    presets.push(['@babel/preset-env', {/* No targets so ES5 only */}]);
  }
  return {presets};
};

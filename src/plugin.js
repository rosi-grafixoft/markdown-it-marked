/*
 * Core plugin setup to be used with MarkdownIt object.
 *
 * Copyright 2020 Visual Meaning Ltd
 * This is free software licensed as Apache-2.0 - see COPYING for terms.
 */

import {rewriteToken} from './replace';

export function markedPlugin(md) {
  const {arrayReplaceAt} = md.utils;

  const rule = function _markedReplace(state) {
    // TODO: throw if /g flag not set
    const pattern = state.env.markedPattern;
    if (!pattern) {
      return;
    }
    state.tokens.forEach(function _markedToken(parent) {
      if (parent.type !== 'inline') {
        return;
      }
      let tokens = parent.children;
      let i = tokens.length;
      while (i--) {
        const token = tokens[i];
        if (token.type === 'text') {
          const newTokens = rewriteToken(token, pattern, state.Token);
          if (newTokens) {
            parent.children = tokens = arrayReplaceAt(tokens, i, newTokens);
          }
        }
      }
    });
  };

  md.core.ruler.push('marked', rule);
}

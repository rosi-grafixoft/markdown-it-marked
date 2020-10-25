/*
 * Create regular expression patterns for finding text runs to mark.
 *
 * Copyright 2020 Visual Meaning Ltd
 * This is free software licensed as Apache-2.0 - see COPYING for terms.
 */

function esc(s) {
  return s.replace(/[\\.[\]^$()|*+?{}]/g, '\\$&');
}

function buildEnv(strings, lead, trail, flags) {
  if (!strings.length) {
    return {};
  }

  const keys = Object.keys(strings);
  keys.sort(function _sortLongestReverse(a, b) {
    return strings[a].length - strings[b].length || b - a;
  });

  if (!strings[keys[0]].length) {
    throw new Error('markdown-it-marked: zero-length word');
  }

  const parts = [lead];
  let i = keys.length;
  while (--i) {
    parts.push(esc(strings[keys[i]]), '|');
  }
  parts.push(esc(strings[keys[0]]), trail);

  return {markedPattern: new RegExp(parts.join(''), flags)};
}

export function envFromSubstrings(substrings) {
  return buildEnv(substrings, '', '', 'gi');
}

export function envFromWords(words) {
  return buildEnv(words, '\\b(?:', ')\\b', 'gi');
}

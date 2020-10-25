/*
 * Tests for helpers that create render time environment.
 *
 * Copyright 2020 Visual Meaning Ltd
 * This is free software licensed as Apache-2.0 - see COPYING for terms.
 */

import {envFromSubstrings, envFromWords} from 'markdown-it-marked';

describe('envFromSubstring', () => {
  test.each([
    [[], {}],
    [['a'], {markedPattern: /a/gi}],
    [['?'], {markedPattern: /\?/gi}],
    [['.*', '.+', '()', '|$'], {markedPattern: /\.\*|\.\+|\(\)|\|\$/gi}],
  ])('escaping %O', (strings, expected) => {
    expect(envFromSubstrings(strings)).toEqual(expected);
  });

  test.each([
    [['one', 'two'], {markedPattern: /one|two/gi}],
    [['sub', 'substring'], {markedPattern: /substring|sub/gi}],
  ])('sorting %O', (strings, expected) => {
    expect(envFromSubstrings(strings)).toEqual(expected);
  });

  test.each([
    [['']],
    [['a', '', 'z']],
  ])('checking %O', strings => {
    expect(() => envFromSubstrings(strings)).toThrow({
      'message': 'markdown-it-marked: zero-length word',
    });
  });
});

describe('envFromWords', () => {
  // Could duplicate all the core tests, but seems a bit pointless.
  test.each([
    [[], {}],
    [['a'], {markedPattern: /\b(?:a)\b/gi}],
    [['it\'s', 'done.'], {markedPattern: /\b(?:done\.|it's)\b/gi}],
  ])('using %O', (words, expected) => {
    expect(envFromWords(words)).toEqual(expected);
  });
});

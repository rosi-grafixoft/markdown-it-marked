/*
 * Tests for render of markdown after plugin installation.
 *
 * Copyright 2020 Visual Meaning Ltd
 * This is free software licensed as Apache-2.0 - see COPYING for terms.
 */

import MarkdownIt from 'markdown-it';

import {envFromUnicodeTerms, plugin} from 'markdown-it-marked';

describe('default options', () => {
  const mi = MarkdownIt()
    .use(plugin);

  test.each([
    ['', ''],
    ['x', '<p>x</p>\n'],
    ['x\n\ny', '<p>x</p>\n<p>y</p>\n'],
  ])('no words given %O', (input, expected) => {
    expect(mi.render(input)).toEqual(expected);
  });

  test.each([
    [/x/g, '', ''],
    [/x/g, 'y', 'y'],
    [/x/g, 'x', '<mark>x</mark>'],
    [/x/g, 'xy', '<mark>x</mark>y'],
    [/y/g, 'xy', 'x<mark>y</mark>'],
    [/y/g, 'xyz', 'x<mark>y</mark>z'],
    [/x|z/g, 'xyz', '<mark>x</mark>y<mark>z</mark>'],
    [
      /\ba\b/g,
      'a change is as good as a rest',
      '<mark>a</mark> change is as good as <mark>a</mark> rest',
    ],
  ])('inline match %O in %O', (pat, input, expected) => {
    expect(mi.renderInline(input, {markedPattern: pat})).toEqual(expected);
  });

  test.each([
    [/x/g, '', ''],
    [/x/g, 'y', '<p>y</p>\n'],
    [/x/g, 'x', '<p><mark>x</mark></p>\n'],
    [
      /x/g,
      '[![x](./x)](./x)',
      '<p><a href="./x"><img src="./x" alt="x"></a></p>\n',
    ],
    [
      /a/gi,
      '* A\n  * a\n  * b\n* B\n  * a\n',
      `\
<ul>
<li><mark>A</mark>
<ul>
<li><mark>a</mark></li>
<li>b</li>
</ul>
</li>
<li>B
<ul>
<li><mark>a</mark></li>
</ul>
</li>
</ul>
`,
    ],
  ])('block match %O in %O', (pat, input, expected) => {
    expect(mi.render(input, {markedPattern: pat})).toEqual(expected);
  });
});

describe('integration', () => {
  describe('terms', () => {
    const mi = MarkdownIt()
      .use(plugin);

    const empTerms = ['a', '&', 'b'];
    test.each([
      [empTerms, '', ''],
      [empTerms, 'a & b', '<mark>a</mark> <mark>&amp;</mark> <mark>b</mark>'],
      [empTerms, 'aa && bb', 'aa <mark>&amp;</mark><mark>&amp;</mark> bb'],
      [['роси'], 'роси и пана', '<mark>роси</mark> и пана'],
      [['роси'], 'роси и роси и пана', '<mark>роси</mark> и <mark>роси</mark> и пана'],
      [['роси'], 'руси и роси и пана', 'руси и <mark>роси</mark> и пана'],
      [['/роси'], '/роси и пана', '<mark>/роси</mark> и пана'],
      [['щ'], 'Щ в щастие', '<mark>Щ</mark> в щастие'],
      [['Я'], 'Я бълка', '<mark>Я</mark> бълка'],
      [['щ'], 'щ астие', '<mark>щ</mark> астие'],
      [['Ю'], 'Ю тия', '<mark>Ю</mark> тия'],
      [['Ъ'], 'Ъ гъл', '<mark>Ъ</mark> гъл'],
      [['Й'], 'Й ордан', '<mark>Й</mark> ордан'],
    ])('real world %O in %O', (terms, input, expected) => {
      const env = envFromUnicodeTerms(terms);
      expect(mi.renderInline(input, env)).toEqual(expected);
    });
  });

  describe('terms prefixes', () => {
    const mi = MarkdownIt()
      .use(plugin);

    test.each([
      [['роси'], {prefix: true}, 'Панайот и Росица', 'Панайот и <mark>Роси</mark>ца'],
      [['йо-хо-хо'], {prefix: true}, 'Цитат: йо-хо-хо', 'Цитат: <mark>йо-хо-хо</mark>'],
      [['щ'], {prefix: true}, 'Щ в щастие и къща', '<mark>Щ</mark> в <mark>щ</mark>астие и къща'],
      [['голям'], {prefix: true}, 'по-голям', 'по-<mark>голям</mark>'],
      [['голям'], {prefix: true}, 'малък/голям', 'малък/<mark>голям</mark>'],
      [['голям'], {prefix: true}, 'малък, голям, среден', 'малък, <mark>голям</mark>, среден'],
      [['©'], {prefix: true}, '© symbol', '<mark>©</mark> symbol'],
    ])('real world %O in %O', (terms, options, input, expected) => {
      const env = envFromUnicodeTerms(terms, options);
      expect(mi.renderInline(input, env)).toEqual(expected);
    });
  });
});

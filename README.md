# markdown-it-marked

[![On NPM][npm-badge]][npm-link]
[![CI status][gate-badge]][gate-link]
[![UMD size][size-badge]][size-link]

Plugin for [markdown-it] for marking substrings within text.

Supports insertion of [`<mark/>`] elements to show render-time configured matches such as
search text results or other context not in the markdown input string.

For having `<mark/>` with markdown syntax see [markdown-it-mark] plugin instead.


## Install

    npm install --save markdown-it-marked


## Use

```js
import MarkdownIt from 'markdown-it';
import {envFromWords, plugin as markedPlugin} from 'markdown-it-marked';

const md = MarkdownIt().use(markedPlugin);

const html = md.render('some text to _render_', envFromWords(['text']));
// html === '<p>some <mark>text</mark> to <i>render</i></p>\n'
```


## TODO

* Add instructions for transpiling with application settings.
* Fancy unicode handling for `\b` replacement.
* Attribute setting from match via replacement override.


[npm-badge]: https://img.shields.io/npm/v/markdown-it-marked.svg
[npm-link]: https://www.npmjs.com/package/markdown-it-marked
[gate-badge]: https://github.com/VisualMeaning/markdown-it-marked/workflows/gate/badge.svg
[gate-link]: https://github.com/VisualMeaning/markdown-it-marked/actions
[size-badge]: https://img.badgesize.io/https:/unpkg.com/markdown-it-marked/dist/markdown-it-marked.js?label=gzip&compression=gzip
[size-link]: https://unpkg.com/markdown-it-marked/dist/markdown-it-marked.js
[markdown-it]: https://github.com/markdown-it/markdown-it/
[`<mark/>`]: https://developer.mozilla.org/docs/Web/HTML/Element/mark
[markdown-it-mark]: https://github.com/markdown-it/markdown-it-mark

# markdown-it-marked

Plugin for [markdown-it] for marking substrings within text.

Supports insertion of [`<mark/>`] elements to show render-time configured matches such as
search text results or other context not in the markdown input string.

For having `<mark/>` with markdown syntax see [markdown-it-mark] plugin instead.


## Install

    npm install --save markdown-it-marked


## Use

```js
import MarkdownIt from 'markdown-it';
import markedPlugin, {envFromWords} from 'markdown-it-marked';

const md = MarkdownIt().use(markedPlugin);

const html = md.render('some text to _render_', envFromWords(['text']));
// html === '<p>some <mark>text</mark> to <i>render</i></p>\n'
```


## TODO

* Add instructions for transpiling with application settings.
* Fancy unicode handling for `\b` replacement.
* Attribute setting from match via replacement override.


[markdown-it]: https://github.com/markdown-it/markdown-it/
[`<mark/>`]: https://developer.mozilla.org/docs/Web/HTML/Element/mark
[markdown-it-mark]: https://github.com/markdown-it/markdown-it-mark

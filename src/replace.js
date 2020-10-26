/*
 * Recreate text tokens if content matches a pattern.
 *
 * Copyright 2020 Visual Meaning Ltd
 * This is free software licensed as Apache-2.0 - see COPYING for terms.
 */

export function rewriteToken(textToken, pattern, Token) {
  let idx = 0;
  let match;
  const result = [];
  const text = textToken.content;

  while ((match = pattern.exec(text))) {
    if (match.index > idx) {
      const sub = new Token('text', '', 0);
      sub.content = text.slice(idx, match.index);
      result.push(sub);
    }
    // TODO: Factor this out so attributes etc can be set based on content.
    const start = new Token('mark_open', 'mark', 1);
    const end = new Token('mark_close', 'mark', -1);
    const inner = new Token('text', '', 0);
    inner.content = match[0];
    result.push(start, inner, end);
    idx = pattern.lastIndex;
  }

  if (!idx) {
    return undefined;
  }
  if (text.length > idx) {
    const sub = new Token('text', '', 0);
    sub.content = text.slice(idx);
    result.push(sub);
  }
  return result;
}

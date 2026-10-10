import type { ReactNode } from 'react';
import { Text, type TextStyle } from 'react-native';

import { color } from '@/theme/tokens';
import { webStyle } from '@/theme/web';

/**
 * The one way red marks a word, everywhere: the word printed white on a crimson cut-out strip,
 * like ALGORITHM on the home cover. Works on any ground, light or dark.
 */
const strip = webStyle<TextStyle>({
  backgroundColor: color.crimson,
  color: color.paper,
  padding: '0.02em 0.14em 0 0.14em',
  boxDecorationBreak: 'clone',
  WebkitBoxDecorationBreak: 'clone',
});

/** On native, where inline padding is not available, the word is simply set in crimson. */
const nativeTint: TextStyle = { color: color.crimson };

/**
 * `text` with its first `word` (matched case-insensitively) printed on the crimson strip. Use as the
 * children of `Display` or `Deck`; the strip inherits the heading's face and size.
 */
export function Accented({ text, word }: { text: string; word: string }): ReactNode {
  const at = text.toLowerCase().indexOf(word.toLowerCase());
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <Text style={strip ?? nativeTint}>{text.slice(at, at + word.length)}</Text>
      {text.slice(at + word.length)}
    </>
  );
}

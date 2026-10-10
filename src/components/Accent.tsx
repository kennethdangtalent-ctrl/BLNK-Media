import type { ReactNode } from 'react';
import { Text } from 'react-native';

import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

/**
 * The red that marks a key word in a heading: crimson on the light pages, the brighter signal red
 * on black and oxblood, where crimson would sink into the ground.
 */
export function useAccent(): string {
  const tone = useTone();
  return tone.bg === color.ink || tone.bg === color.brand ? color.hi : color.crimson;
}

/**
 * `text` with its first `word` (matched case-insensitively) printed in the accent red, the way the
 * mission page marks each value's name. Use as the children of `Display` or `Deck`; the red span
 * inherits the heading's face and size.
 */
export function Accented({ text, word }: { text: string; word: string }): ReactNode {
  const tint = useAccent();
  const at = text.toLowerCase().indexOf(word.toLowerCase());
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <Text style={{ color: tint }}>{text.slice(at, at + word.length)}</Text>
      {text.slice(at + word.length)}
    </>
  );
}

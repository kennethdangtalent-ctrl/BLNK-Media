import type { ReactNode } from 'react';
import { Text } from 'react-native';

import { useTone } from '@/theme/tone';
import { color } from '@/theme/tokens';

/**
 * `text` with its first `word` (matched case-insensitively) printed in crimson, the way the mission
 * page marks each value's name. Use as the children of `Display` or `Deck`; the red word inherits the
 * heading's face and size. On the dark sections (black, oxblood) crimson would sink into the
 * ground, so there the heading stays one color. The home cover's headline strips are separate.
 */
export function Accented({ text, word }: { text: string; word: string }): ReactNode {
  const tone = useTone();
  const dark = tone.bg === color.ink || tone.bg === color.brand;
  const at = text.toLowerCase().indexOf(word.toLowerCase());
  if (dark || at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <Text style={{ color: color.crimson }}>{text.slice(at, at + word.length)}</Text>
      {text.slice(at + word.length)}
    </>
  );
}

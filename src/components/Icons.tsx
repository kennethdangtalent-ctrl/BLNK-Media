import Svg, { Circle, Path } from 'react-native-svg';

import { webProps } from '@/theme/web';

export type IconName = 'twitch' | 'tiktok' | 'instagram' | 'youtube';

/** The four 24-unit line icons from the roster chips. Decorative: the chip carries the label. */
export function Icon({ name, size = 16, color }: { name: IconName; size?: number; color: string }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...webProps({ 'aria-hidden': true })}>
      {name === 'twitch' ? <Path d="M4 4h16v11h-9l-4 4v-4H4z" /> : null}
      {name === 'tiktok' ? (
        <>
          <Path d="M9 18V5l11-2v13" />
          <Circle cx="6" cy="18" r="3" />
          <Circle cx="17" cy="16" r="3" />
        </>
      ) : null}
      {name === 'instagram' ? (
        <>
          <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <Circle cx="12" cy="13" r="4" />
        </>
      ) : null}
      {name === 'youtube' ? (
        <>
          <Circle cx="12" cy="12" r="9" />
          <Path d="M10 8l6 4-6 4z" />
        </>
      ) : null}
    </Svg>
  );
}

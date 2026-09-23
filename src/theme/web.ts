import { Platform } from 'react-native';

export const isWeb = Platform.OS === 'web';

/**
 * Style keys that only react-native-web understands (CSS transitions, underline offset).
 * They are passed through as CSS on web and dropped on native.
 */
export function webStyle<T>(style: Record<string, string | number>): T | undefined {
  return isWeb ? (style as unknown as T) : undefined;
}

/** Props that only react-native-web understands (`href`, `hrefAttrs`, `aria-level`, `aria-current`). */
export function webProps(props: Record<string, unknown>): object {
  return isWeb ? props : {};
}

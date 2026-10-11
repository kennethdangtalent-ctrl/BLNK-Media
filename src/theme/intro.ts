/** Remembers, for this browser tab, that the opening eye intro has played. */
const SEEN_KEY = 'blnk-intro-seen';

/** True once the intro has played in this tab. Always false on the server and on native. */
export function introSeen(): boolean {
  try {
    return typeof window !== 'undefined' && window.sessionStorage?.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

export function markIntroSeen() {
  try {
    window.sessionStorage?.setItem(SEEN_KEY, '1');
  } catch {
    // Storage blocked (private mode): the intro may play again on a reload, which is harmless.
  }
}

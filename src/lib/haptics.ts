/** Light tap feedback on supported mobile browsers / WebViews */
export function hapticLight() {
  if (typeof navigator === "undefined" || !navigator.vibrate) return;
  try {
    navigator.vibrate(12);
  } catch {
    /* ignored */
  }
}

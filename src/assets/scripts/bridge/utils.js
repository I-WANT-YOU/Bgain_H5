export function isAndroid() {
  return /android/i.test(window.navigator.userAgent);
}

export function isIOS() {
  return (
    /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream
  );
}

export function isFunction(fn) {
  return typeof fn === 'function';
}

export function isString(string) {
  return typeof string === 'string';
}

/**
 * Generate unique message callback function id.
 *
 * @returns {string}
 */
export function generateCallbackId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

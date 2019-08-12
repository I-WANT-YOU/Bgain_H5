import {
  isAndroid, isIOS, isFunction, generateCallbackId,
} from './utils';

/**
 * JS send message to native.
 *
 * Parameters of the sample
    const req = {
      module: 'module name',
      action: 'action name',
      param: param
    };
 * @param req - The parameters for js call native.
 * @param callback - The callback function passed in when a callback is needed.
 */
export function sendMessage(req, callback) {
  if (callback && isFunction(callback)) {
    const callbackId = generateCallbackId();
    window.Bridge.MESSAGE_CALLBACKS[callbackId] = callback;
    req.callbackId = callbackId;
    req.callbackFunction = 'window.Bridge.dispatchMessageCallback';
  }

  if (isIOS()) {
    window.webkit.messageHandlers.nativeObject.postMessage(req);
  }

  if (isAndroid()) {
    prompt(JSON.stringify(req));
  }
}

/**
 * JS sync send message to native.
 *
 * @param req - The parameters for js sync call native.
 */
export function sendSyncMessage(req) {
  if (isIOS() || isAndroid()) {
    const res = prompt(JSON.stringify(req));
    return res ? JSON.parse(res) : {};
  }
}

/**
 * Native send message to js.
 *
 * @param callbackId - The unique id on CALLBACK_MAP.
 * @param res - The result for native.
 */
export function dispatchMessageCallback(callbackId, res) {
  const callback = window.Bridge.MESSAGE_CALLBACKS[callbackId];
  if (callback && isFunction(callback)) {
    const result = res ? JSON.parse(res) : {};
    callback(result);
    delete window.Bridge.MESSAGE_CALLBACKS[callbackId];
  }
}

/**
 * Add listeners for Native.
 *
 * @param name - event name
 * @param handler - event callback
 */
export function addEventListenerForNative(name, handler) {
  const handlers = window.Bridge.EVENT_MAP[name];
  if (!isFunction(handler)) return;

  if (!handlers) {
    window.Bridge.EVENT_MAP[name] = [];
  } else {
    handlers.push(handler);
  }
}

/**
 *  Native dispatch web page event,
 *
 * @param name - event name
 * @param res - The result for native dispatch event.
 */
export function dispatchEvent(name, res) {
  const handlers = window.Bridge.EVENT_MAP[name];
  for (const key in handlers) {
    if (handlers.hasOwnProperty(key)) {
      const handler = handlers[key];
      if (handler && isFunction(handler)) {
        const result = res ? JSON.parse(res) : {};
        handler(result);
        return result;
      }
    }
  }
  delete window.Bridge.EVENT_MAP[name];
}

export default {
  sendMessage,
  sendSyncMessage,
  dispatchMessageCallback,
  addEventListenerForNative,
  dispatchEvent,
};

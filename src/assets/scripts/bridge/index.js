import Core from './core';

const Bridge = {
  MESSAGE_CALLBACKS: {},
  EVENT_MAP: {},
  ...Core,
};

export default function init() {
  if (window && !window.Bridge) {
    window.Bridge = Bridge;
  }
}

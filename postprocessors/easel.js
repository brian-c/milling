'use strict';

// https://inventables.desk.com/customer/portal/articles/2258567-easel-g-code-spec

const gCode = {
  rapidMove(x, y, z) {
    return `G0 X${x.toFixed(3)} Y${y.toFixed(3)} Z${z.toFixed(3)}`;
  },

  feed(x, y, z, feedRate) {
    return `G1 X${x.toFixed(3)} Y${y.toFixed(3)} Z${z.toFixed(3)} F${feedRate}`;
  },

  dwell() {
    return 'G4';
  },

  selectXYPlane() {
    return 'G17';
  },

  useInches() {
    return 'G20';
  },

  useMillimeters() {
    return 'G21';
  },

  disableToolRadiusCompensation() {
    return 'G40';
  },

  useWorkOffset(index) {
    return ['G54'][index];
  },

  startStopCheckMode() {
    return 'G61';
  },

  useAbsoluteDistance() {
    return 'G90';
  },

  useUnitsPerMinuteFeed() {
    return 'G94';
  },

  pause() {
    return 'M0';
  },

  pauseConditionally() {
    return 'M1';
  },

  stop() {
    return 'M2';
  },

  startSpindle() {
    return 'M3';
  },

  startSpindleCounterclockwise() {
    return 'M4';
  },

  stopSpindle() {
    return 'M5';
  },

  changeTool() {
    return 'M6';
  },

  mistCoolant() {
    return 'M7';
  },

  floodCoolant() {
    return 'M8';
  },

  stopCoolant() {
    return 'M9';
  },

  stopAndRewind() {
    return 'M30';
  }
};

module.exports = gCode;

'use strict';

const milling = require('./index');
const easel = require('./postprocessors/easel');

const plan = new milling.Plan({
  inches: true,
  bit: 1/4,
  feedRate: 5,
  plungeSpeed: 5,
  stepDown: 1/2,
  safeZ: 2
});

plan.line({
  depth: 2.5,
  from: [0, 0],
  to: [10, 10]
});

plan.line({
  depth: 2.5,
  from: [0, 10],
  to: [10, 0]
});

plan.polygon({
  side: 'inside',
  depth: 4,
  points: [
    [5, 0],
    [10, 5],
    [5, 10],
    [0, 5]
  ]
});

plan.polygon({
  side: 'outside',
  depth: 1,
  points: [
    [5, 0],
    [10, 5],
    [5, 10],
    [0, 5]
  ]
});

const gCode = plan.toGCode(easel);
process.stdout.write(gCode + '\n');

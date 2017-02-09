'use strict';

const milling = require('./index');
const easel = require('./postprocessors/easel');

const nutWidth = 1+1/4;
const heelWidth = 1+13/16;
const scaleLength = 13+7/8;
const frets = 22;
const stockThickness = 1/4;

function fretPosition(fret, scale, tones=12) {
  return scale - (scale / (2 ** (fret / tones)));
}

const fretboardEnd = fretPosition(frets, scaleLength);

const plan = new milling.Plan({
  inches: true,
  bit: 1/32,
  feedRate: 10,
  plungeSpeed: 10,
  stepDown: 1,
  safeZ: stockThickness * 2
});

for (let f = 1; f < frets; f += 1) {
  const fretY = fretPosition(f, scaleLength);

  plan.line({
    depth: 1/16,
    from: [0, fretY],
    to: [heelWidth, fretY]
  });
}

plan.polygon({
  depth: stockThickness,
  side: 'outside',
  points: [
    [(heelWidth - nutWidth) / 2, 0],
    [(heelWidth - nutWidth) / 2 + nutWidth, 0],
    [heelWidth, fretboardEnd],
    [0, fretboardEnd]
  ]
});

if (require.main === module) {
  const gCode = plan.toGCode(easel);
  process.stdout.write(gCode + '\n');
} else {
  module.exports = plan;
}

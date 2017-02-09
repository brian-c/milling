'use strict';

const PolygonOffset = require('polygon-offset');
const Processor = require('./processor');

var offset = new PolygonOffset();

class Plan {
  constructor (settings) {
    this.settings = settings;
    this.steps = [];
  }

  polyline({depth, points, side}) {
    const start = points[0];
    const end = points[points.length - 1];

    this.steps.push({
      method: 'positionAbove',
      args: [start[0], start[1]]
    });

    let workingPoints;
    if (side === 'inside') {
      workingPoints = offset.data(points).padding(this.settings.bit / 2)[0];
    } else if (side === 'outside') {
      workingPoints = offset.data(points).margin(this.settings.bit / 2)[0];
    } else {
      workingPoints = [...points];
    }

    let z = 0;
    while (z <= depth) {
      z += Math.min(this.settings.stepDown, depth);
      this.steps.push({
        method: 'drillTo',
        args: [z * -1]
      });

      workingPoints.forEach(([x, y]) => {
        this.steps.push({
          method: 'feedTo',
          args: [x, y]
        });
      });

      const pathIsClosed = start[0] === end[0] && start[1] === end[1];
      if (!pathIsClosed) {
        workingPoints.reverse();
      }
    }
  }

  line({depth, to, from}) {
    return this.polyline({
      depth,
      points: [from, to]
    });
  }

  polygon({depth, points, side}) {
    return this.polyline({
      depth,
      points: [...points, points[0]],
      side
    });
  }

  toGCode(postprocessor) {
    return new Processor(this.settings, this.steps, postprocessor).toString();
  }
}

module.exports = {Plan};

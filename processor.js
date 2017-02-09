'use strict';

class Processor {
  constructor(settings, steps, postprocessor) {
    this.settings = settings;
    this.steps = steps;
    this.postprocessor = postprocessor;

    this.current = [0, 0, 0];
  }

  positionAbove(x, y) {
    const result = [];
    result.push(this.drillTo(this.settings.safeZ));
    this.current[0] = x;
    this.current[1] = y;
    result.push(this.postprocessor.rapidMove(x, y, this.current[2]));
    return result.join('\n');
  }

  drillTo(z) {
    this.current[2] = z;
    return this.postprocessor.feed(this.current[0], this.current[1], z, this.settings.plungeSpeed);
  }

  feedTo(x, y) {
    this.current[0] = x;
    this.current[1] = y;
    return this.postprocessor.feed(x, y, this.current[2], this.settings.feedRate);
  }

  toString() {
    return [
      '%',
      this.settings.inches ? this.postprocessor.useInches() : this.postprocessor.useMillimeters(),
      this.postprocessor.useAbsoluteDistance(),
      this.positionAbove(0, 0),
      this.postprocessor.startSpindle(),

      ...this.steps.reduce((allCommands, step, i) => {
        const stepCommands = this[step.method].apply(this, step.args);
        return [...allCommands, stepCommands];
      }, []),

      this.positionAbove(0, 0),
      this.postprocessor.stopSpindle(),
      '%'
    ].join('\n');
  }
}

module.exports = Processor;

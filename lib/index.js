var events = require('events');
var util = require('util');

var readline = require('readline');

// TODO: imitate readline interface
function ReadlineJson(input) {
  var self = this;
  var lines = [];

  readline
    .createInterface({input: input || process.stdin})
    .on('line', onLine)
    .on('close', onClose);

  function onLine(line) {
    lines.push(line);
    var json;
    try {
      json = JSON.parse(lines.join(''));
    } catch(e) {
      return;
    }
    lines = [];
    self.emit('json', json);
  }

  function onClose() {
    if (lines.length) {
      self.emit('error', new Error('unable to parse json input.'));
      return;
    }
  }
}

util.inherits(ReadlineJson, events.EventEmitter);

module.exports = ReadlineJson;

var events = require('events');
var readline = require('readline');
var util = require('util');

module.exports = function readline_json(input) {
  var emitter = new events.EventEmitter();
  var lines = [];

  readline
    .createInterface({input: input || process.stdin})
    .on('line', onLine)
    .on('close', onClose);

  return emitter;

  function onLine(line) {
    lines.push(line);
    var json;
    try {
      json = JSON.parse(lines.join(''));
    } catch(e) {
      return;
    }
    lines = [];
    emitter.emit('json', json);
  }

  function onClose() {
    if (lines.length) {
      emitter.emit('error', new Error('unable to parse json input.'));
      return;
    }
  }
};

# readline-json

Wrapper around `readline` that extracts JSON objects from the input stream and emits `json` events per object found.

```
var readline_json = require('readline-json');
readline_json(process.stdin).on('json', function(json) {
  // handle json object
});
```

The library supports single-line and multi-line jsons in one stream, e.g.:

```
echo '{}
{
  "a": 1
}
{"b":2}' | node myscript.js
```

Which will emit three `json` events: `{}`, `{"a":1}` and `{"b":2}`.

## TODO

* Add tests
* Improve error reporting
* Support multiple JSON objects in one line

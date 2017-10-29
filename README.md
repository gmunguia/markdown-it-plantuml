# markdown-it-plantuml

> Plugin for creating block-level uml diagrams for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

With this plugin you can create uml diagrams like:

```
@startuml
Bob -> Alice : hello
@enduml
```

See [plantuml website](plantuml.com) for more details.

## Installation

node.js, browser:

```bash
$ npm install markdown-it-plantuml --save
```


## API

```js
var md = require('markdown-it')()
            .use(require('markdown-it-plantuml')[, options]);
```

Params:

__options:__
  - __render__ - optional, renderer function for opening/closing tokens.
  - __generateSource__ - optional, generates the `src` property of the image element.
  - __openMarker__ - optional (`@startuml`), string to use as oppening delimiter.
  - __closeMarker__ - optional (`@enduml`), string to use as closing delimiter.

## License

[MIT](https://github.com/gmunguia/markdown-it-plantuml/blob/master/LICENSE)

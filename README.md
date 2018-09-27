# markdown-it-plantuml

[![npm version](https://img.shields.io/npm/v/markdown-it-plantuml.svg)](https://www.npmjs.com/package/markdown-it-plantuml)
[![CircleCI build](https://img.shields.io/circleci/project/github/gmunguia/markdown-it-plantuml.svg)](https://circleci.com/gh/gmunguia/markdown-it-plantuml/tree/master)

> Plugin for creating block-level uml diagrams for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

With this plugin you can create uml diagrams inside your markdown files:

```markdown
# UML example:

@startuml
Bob -> Alice : hello
@enduml
```

See [plantuml website](https://plantuml.com) for more details.

## Installation

node.js, browser:

```bash
$ npm install markdown-it-plantuml --save
```

## Basic usage

```js
const md = require('markdown-it')()
           .use(require('markdown-it-plantuml'));
```

See [markdown-it repository](https://github.com/markdown-it/markdown-it) for more details.

## Advanced usage

```js
const md = require('markdown-it')()
           .use(require('markdown-it-plantuml'), options);
```

Options:
  - __openMarker__ - optional, defaults to `@startuml`. String to use as oppening delimiter.
  - __closeMarker__ - optional, defaults to `@enduml`. String to use as closing delimiter.
  - __generateSource__ - optional, defaults to using public plant-uml server. Generates the `src` property of the image element.
  - __diagramName__ - optional, defaults to `uml`. Name used by generateSoruce to generate diagram tags like `@startuml`, `@startditaa`, etc.
  - __imageFormat__ - optional, defaults to `svg`. Format used by `generateSource` to generate the `src` of the image element.
  - __render__ - optional, defaults to markdown-it image renderer. Renderer function for opening/closing tokens.
  - __server__ - optional, defaults to `http://www.plantuml.com/plantuml`. Defines the plantuml server used for image generation.

#### Example: using custom URL to serve diagrams

```js
const options = {
  generateSource: function generateSource(umlCode) {
    return `https://your.server/plant-uml/${yourEncodeFunction(umlCode)}`;
  }
}

const md = require('markdown-it')()
           .use(require('markdown-it-plantuml'), options);
```

#### Example: generating ditaa diagrams

```js
const options = {
  openMarker: '@startditaa',
  closeMarker: '@endditaa',
  diagramName: 'ditaa',
  imageFormat: 'png'
}

const md = require('markdown-it')()
           .use(require('markdown-it-plantuml'), options);
```

## License

[MIT](https://github.com/gmunguia/markdown-it-plantuml/blob/master/LICENSE)

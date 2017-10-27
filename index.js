// Process block-level uml diagrams
//
'use strict';

module.exports = function umlPlugin(md, name, options) {

  function renderDefault(tokens, idx, _options, env, renderer) {
    var token = tokens[idx];
    token.attrPush([ 'src', token.meta ]);
    return renderer.renderToken(tokens, idx, _options, env, renderer);
  }

  function generateSourceDefault(umlCode) {
    var deflate = require('./deflate.js');
    var zippedCode =
      deflate.encode64(deflate.zip_deflate('@startuml\n' + umlCode + '\n@enduml', 9));
    return 'http://www.plantuml.com/plantuml/svg/' + zippedCode;
  }

  options = options || {};

  var openMarker = options.openMarker || '@startuml',
      openChar = openMarker.charCodeAt(0),
      closeMarker = options.closeMarker || '@enduml',
      closeChar = closeMarker.charCodeAt(0),
      generateSource = options.generateSource || generateSourceDefault,
      render = options.render || renderDefault;

  function uml(state, startLine, endLine, silent) {
    var nextLine, markup, params, token, i,
        autoClosed = false,
        start = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    // Check out the first character quickly,
    // this should filter out most of non-uml blocks
    //
    if (openChar !== state.src.charCodeAt(start)) { return false; }

    // Check out the rest of the marker string
    //
    for (i = 0; i < openMarker.length; ++i) {
      if (openMarker[i] !== state.src[start + i]) { return false; }
    }

    markup = state.src.slice(start, start + i);
    params = state.src.slice(start + i, max);

    // Since start is found, we can report success here in validation mode
    //
    if (silent) { return true; }

    // Search for the end of the block
    //
    nextLine = startLine;

    for (;;) {
      nextLine++;
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break;
      }

      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (start < max && state.sCount[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;
      }

      if (closeChar !== state.src.charCodeAt(start)) {
        // didn't find the closing fence
        continue;
      }

      if (state.sCount[nextLine] - state.blkIndent > 0) {
        // closing fence should not be indented with respect of opening fence
        continue;
      }

      for (i = 0; i < closeMarker.length; ++i) {
        if (closeMarker[i] !== state.src[start + i]) { return false; }
      }

      // make sure tail has spaces only
      if (state.skipSpaces(start + i) < max) {
        continue;
      }

      // found!
      autoClosed = true;
      break;
    }

    // Todo: accept this function as parameter.

    var contents = state.src
      .split('\n')
      .slice(startLine + 1, nextLine)
      .join('\n');

    token = state.push('uml_diagram', 'img', 0);
    token.markup = markup;
    token.block = true;
    token.info = params;
    token.map = [ startLine, nextLine ];
    token.meta = generateSource(contents);

    state.line = nextLine + (autoClosed ? 1 : 0);

    return true;
  }

  md.block.ruler.before('fence', 'uml_diagram', uml, {
    alt: [ 'paragraph', 'reference', 'blockquote', 'list' ]
  });
  md.renderer.rules.uml_diagram = render;
};

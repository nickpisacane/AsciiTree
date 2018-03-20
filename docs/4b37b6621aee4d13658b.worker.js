/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/AsciiTree/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(6)('xml-parser');

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Parse the given string of `xml`.
 *
 * @param {String} xml
 * @return {Object}
 * @api public
 */

function parse(xml) {
  xml = xml.trim();

  // strip comments
  xml = xml.replace(/<!--[\s\S]*?-->/g, '');

  return document();

  /**
   * XML document.
   */

  function document() {
    return {
      declaration: declaration(),
      root: tag()
    }
  }

  /**
   * Declaration.
   */

  function declaration() {
    var m = match(/^<\?xml\s*/);
    if (!m) return;

    // tag
    var node = {
      attributes: {}
    };

    // attributes
    while (!(eos() || is('?>'))) {
      var attr = attribute();
      if (!attr) return node;
      node.attributes[attr.name] = attr.value;
    }

    match(/\?>\s*/);

    return node;
  }

  /**
   * Tag.
   */

  function tag() {
    debug('tag %j', xml);
    var m = match(/^<([\w-:.]+)\s*/);
    if (!m) return;

    // name
    var node = {
      name: m[1],
      attributes: {},
      children: []
    };

    // attributes
    while (!(eos() || is('>') || is('?>') || is('/>'))) {
      var attr = attribute();
      if (!attr) return node;
      node.attributes[attr.name] = attr.value;
    }

    // self closing tag
    if (match(/^\s*\/>\s*/)) {
      return node;
    }

    match(/\??>\s*/);

    // content
    node.content = content();

    // children
    var child;
    while (child = tag()) {
      node.children.push(child);
    }

    // closing
    match(/^<\/[\w-:.]+>\s*/);

    return node;
  }

  /**
   * Text content.
   */

  function content() {
    debug('content %j', xml);
    var m = match(/^([^<]*)/);
    if (m) return m[1];
    return '';
  }

  /**
   * Attribute.
   */

  function attribute() {
    debug('attribute %j', xml);
    var m = match(/([\w:-]+)\s*=\s*("[^"]*"|'[^']*'|\w+)\s*/);
    if (!m) return;
    return { name: m[1], value: strip(m[2]) }
  }

  /**
   * Strip quotes from `val`.
   */

  function strip(val) {
    return val.replace(/^['"]|['"]$/g, '');
  }

  /**
   * Match `re` and advance the string.
   */

  function match(re) {
    var m = xml.match(re);
    if (!m) return;
    xml = xml.slice(m[0].length);
    return m;
  }

  /**
   * End-of-source.
   */

  function eos() {
    return 0 == xml.length;
  }

  /**
   * Check for `prefix`.
   */

  function is(prefix) {
    return 0 == xml.indexOf(prefix);
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nindaff_ascii_tree__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nindaff_ascii_tree___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__nindaff_ascii_tree__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xml_parser__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xml_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_xml_parser__);
/* eslint-disable no-restricted-globals */var tree=new __WEBPACK_IMPORTED_MODULE_0__nindaff_ascii_tree___default.a({root:{value:''}});var send=function send(data){self.postMessage({name:'render',data:data});};var handleUpdate=function handleUpdate(data){try{var root=data.input;if(data.format==='json'){root=JSON.parse(root);}else{// just to validate
__WEBPACK_IMPORTED_MODULE_1_xml_parser___default()(root);}tree.update(Object.assign({root:root},data.options));send(tree.render());}catch(err){}};self.onmessage=function(event){if(event.data.name==='update'){handleUpdate(event.data.data);}};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tree = __webpack_require__(3);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_Tree).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Bitmap = __webpack_require__(4);

var _Bitmap2 = _interopRequireDefault(_Bitmap);

var _Node = __webpack_require__(5);

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Alignment type for tree nodes.


// Tree options type
const resolveRoot = root => typeof root === 'string' ? _Node2.default.fromXML(root) : _Node2.default.fromSimpleNode(root);

class Tree {

  /**
   * Tree constructor.
   * @param {Options} options
   * @param {SimpleNode|String} options.root The root node of the tree json/xml.
   * @param {Number} [options.space = 1] The space between nodes (to the right).
   * @param {String} [options.vertical = '\'] The vertical branch character.
   * @param {String} [options.horizontal = '_'] The horizontal branch character.
   * @param {Alignment} [options.align = 'center'] The text/branch alignment.
   * @param {Number} [options.verticalHeight = 1] The number of vertical
   *                                              characters between a node and
   *                                              a horizontal branch.
   *
   */
  constructor(options) {
    this.space = options.space || 1;
    this.vertical = (options.vertical || '|')[0];
    this.horizontal = (options.horizontal || '_')[0];
    this.verticalHeight = options.verticalHeight || 1;
    this.alignment = options.align || 'center';

    this._root = resolveRoot(options.root);
    this._levels = this._root.getLevels();
    this._dirty = true;
  }

  /**
   * Get the horizontal alignment for a given `node`, based on `alignment`.
   * @param {Node} node The node to calculate alignmemt for.
   */
  _alignX(node, width = node.text.width) {
    if (this.alignment === 'left') {
      return node.left;
    }
    return node.left + Math.floor((node.width - width) / 2);
  }

  /**
   * Get the vertical alignment for a given `node`'s vertical branch connector,
   * based on `alignment`.
   * @param  {Node} node The node to calculate a vertical branch for.
   * @return {Number}      Horizontal position of the vertical branch.
   */
  _alignVertical(node) {
    const x = this._alignX(node);
    if (this.alignment === 'left') {
      return x;
    }
    return x + Math.floor(node.text.width / 2);
  }

  /**
   * Draws a vertical branch starting at `y` for the given `node`.
   * @param  {Bitmap} bitmap Bitmap to draw to.
   * @param  {Node} node   The node to connect.
   * @param  {Number} y      The vertical starting point for the branch.
   */
  _drawVertical(bitmap, node, y, extra = 0) {
    const x = this._alignVertical(node);
    const len = this.verticalHeight + extra;
    for (let i = 0; i < len; i++) {
      bitmap.writeString(x, y + i, this.vertical);
    }
  }

  /**
   * Draws a horiztonal branch at `y` from `start` to `end` based on
   * `alignment`.
   * @param  {Bitmap} bitmap The bitmap to draw to.
   * @param  {Number} y      The vertical position to draw on.
   * @param  {Number} start  The position to start at.
   * @param  {Number} end    The position to end at.
   */
  _drawHorizontal(bitmap, y, start, end) {
    for (let i = start; i <= end; i++) {
      bitmap.writeString(i, y, this.horizontal);
    }
  }

  /**
   * Get the height of the tree including the branches.
   * @return {Number}
   */
  height() {
    const levelLen = this._levels.length;
    const levelHeight = this._levels.reduce((a, level) => {
      return a + Math.max(...level.map(n => n.text.height));
    }, 0);

    return levelHeight + (levelLen - 1) * (this.verticalHeight * 2);
  }

  /**
   * Get the width of the tree.
   * @return {Number}
   */
  width() {
    return this._root.width;
  }

  /**
   * Update a tree with `Options`.
   * @param  {Options} options Same options as in constructor.
   */
  update(options) {
    if (options.root) {
      this._root = resolveRoot(options.root);
      this._levels = this._root.getLevels();
      this._dirty = true;
    }

    if (options.space) {
      this.space = options.space;
      this._dirty = true;
    }

    if (options.vertical) {
      this.vertical = options.vertical;
    }
    if (options.horizontal) {
      this.horizontal = options.horizontal;
    }
    if (options.verticalHeight) {
      this.verticalHeight = options.verticalHeight;
    }
    if (options.align) {
      this.alignment = options.align;
    }
  }

  /**
   * Calculate layout (box-modelish). A node's "box" is defined as the entire
   * area in which its text and children inhabbit, plus a padding of `space` to
   * the right. Widths and offsets for nodes are calculated starting at the
   * bottom level, moving up. The width of a given node is defined as the
   * width of all of its _direct_ children combined, or the width of its text
   * (whichever is larger), plus `space` padding to the right. The offset of a
   * given node is simply where the first character of the nodes box
   * (from the left of the entire area) will begin. The offset is absolute, not
   * relative to a nodes parent. The offset of a node is simply the combination
   * of the widths of all of its previous siblings. Heights are not calculated
   * as this can be pretty easily applied during render.
   */
  layout(force = false) {
    if (!this._dirty && !force) {
      return;
    }

    for (let i = this._levels.length - 1; i >= 0; i--) {
      const level = this._levels[i];

      for (let j = 0; j < level.length; j++) {
        const node = level[j];

        const childWidth = node.children.reduce((a, c) => a + c.width, 0);
        node.width = Math.max(node.text.width, childWidth) + this.space;
        node.left = 0;

        // If not the first child, we have to calculate an offset and apply
        // to all of the current `node`s children.
        const prev = node.prevSib();
        if (prev) {
          const offset = prev.width + prev.left;
          node.left = offset;

          // Apply offset to children
          node.forEachChild(child => {
            child.left += offset;
          });
        }
      }
    }

    this._dirty = false;
  }

  /**
   * Render the tree to a string.
   * @return {String}
   */
  render() {
    // Layout, if neccessary.
    this.layout();

    const bitmap = new _Bitmap2.default(this.width(), this.height());
    let verticalOffset = 0;

    this._levels.forEach((level, y) => {
      y += verticalOffset;

      const levelHeight = Math.max(...level.map(n => n.text.height));

      level.forEach(node => {
        if (node.children.length) {
          const start = this._alignVertical(node.children[0]);
          // draw until the last child, or `node` -- in some instances, `node`
          // will be wider than all of its children
          const end = Math.max(this._alignVertical(node.children[node.children.length - 1]), this._alignVertical(node));

          this._drawHorizontal(bitmap, y + this.verticalHeight + (levelHeight - 1), start, end);

          // Draw a vertical branch above each child.
          node.children.forEach(child => {
            this._drawVertical(bitmap, child, y + this.verticalHeight + levelHeight);
          });

          // Draw vertical branch below node.
          this._drawVertical(bitmap, node, y + node.text.height, levelHeight - node.text.height);
        }

        // bitmap.writeString(x, y, node.value);
        node.text.lines.forEach((line, i) => {
          let lineX = this._alignX(node, line.length);
          bitmap.writeString(lineX, y + i, line);
        });
      });

      verticalOffset += levelHeight - 1 + this.verticalHeight * 2;
    });

    return bitmap.toString();
  }
}
exports.default = Tree;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * Bitmap - really a byte matrix internally.
 */
class Bitmap {

  /**
   * Initialize Bitmap with a `width` and `height`
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this._bitmap = new Array(height).fill(null).map(() => new Uint8Array(width).fill(32));
  }

  /**
   * Determine if `x` and `y` are in bounds of the matrix.
   */
  _inBounds(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  /**
   * Wrtie a number at position (x, y).
   */
  write(x, y, n) {
    if (!this._inBounds(x, y)) {
      throw new Error(`Bitmap: Position out of bounds`);
    }
    this._bitmap[y][x] = n;
  }

  /**
   * Write a string starting at position (x, y).
   */
  writeString(x, y, str) {
    for (let i = 0; i < str.length; i++) {
      if (!this._inBounds(x + i, y)) {
        throw new Error(`Bitmap: Character ${i} in "${str}" is out of bounds (${x + i}, ${y})`);
      }
      this.write(x + i, y, str.charCodeAt(i));
    }
  }

  /**
   * Get the string representation of the `Bitmap`.
   */
  toString() {
    return this._bitmap.map(intArr => {
      return intArr.reduce((s, c) => s + String.fromCharCode(c), '');
    }).join('\n');
  }
}
exports.default = Bitmap;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xmlParser = __webpack_require__(0);

var _xmlParser2 = _interopRequireDefault(_xmlParser);

var _Text = __webpack_require__(10);

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// SimpleNodeObj and SimpleNode are simple ways of representing a Node-like
// or Tree-like data-structure that can be easily transformed into a full `Node`


// @see: SimpleNodeObj


// Options type for Node
const xmlToSimpleNode = root => {
  return {
    value: root.attributes.value || root.content || root.name,
    children: root.children.map(xmlToSimpleNode)
  };
};

class Node {

  /**
   * Create a `Node` from a `SimpleNode`. Applied recursively to children.
   */
  static fromSimpleNode(simpleNode, parent = null, position = 0) {
    const options = {
      position,
      parent,
      value: typeof simpleNode === 'string' ? simpleNode : simpleNode.value
    };

    const node = new Node(options);

    if (typeof simpleNode !== 'string' && simpleNode.children) {
      node.children = simpleNode.children.map((child, i) => Node.fromSimpleNode(child, node, i));
    }

    return node;
  }

  static fromXML(xml) {
    const xmlRoot = (0, _xmlParser2.default)(xml);
    const simpleRoot = xmlToSimpleNode(xmlRoot.root);
    return Node.fromSimpleNode(simpleRoot);
  }

  /**
   * Supply optional values based on the public properties in `Node`.
   */
  constructor(node) {
    this.position = 0;
    this.parent = null;
    this.value = '';
    this.children = [];
    this.width = 0;
    this.left = 0;

    Object.assign(this, node);

    this.text = new _Text2.default(this.value);
  }

  /**
   * Get the previous sibling of the current `Node`, if exists,
   * otherwise `null`.
   */
  prevSib() {
    if (this.parent && this.position > 0) {
      return this.parent.children[this.position - 1];
    }
    return null;
  }

  /**
   * Get a level representation of the `Node` and its children. The levels
   * are represented as a matrix of `Node`s with the first level containing
   * a simple element, the root. Each subsequent level contains the children
   * from _ALL_ of the nodes in the preceding level.
   */
  getLevels() {
    let queue = [this];
    const ret = [];
    while (queue.length) {
      ret.push(queue);
      const temp = [];
      queue.forEach(n => {
        temp.splice(temp.length, n.children.length, ...n.children);
      });
      queue = temp;
    }
    return ret;
  }

  /**
   * Iterate through all of the children of a given `Node`
   */
  forEachChild(visitor) {
    const queue = [...this.children];
    while (queue.length) {
      const node = queue.shift();
      visitor(node);
      queue.splice(queue.length, node.children.length, ...node.children);
    }
  }
}
exports.default = Node;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(8);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = Object({"NODE_ENV":"production","PUBLIC_URL":"/AsciiTree"}).DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(9);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class Text {

  constructor(value) {
    this.lines = value.replace(/\t/g, ' ').split(/\n/).map(line => line.trim()).filter(line => !!line);
    this.width = Math.max(...this.lines.map(s => s.length));
    this.height = this.lines.length;
  }
}
exports.default = Text;

/***/ })
/******/ ]);
//# sourceMappingURL=4b37b6621aee4d13658b.worker.js.map
window.jQuery = window.$ = require('jquery');
window.grapesjs = require('./grapes.min.js');

let axios = require('axios');
let lodash = require('lodash');

/*
 *   GRAPESJS PLUGINS
 */

require('./grapesjs-preset-webpage.js');
require('./grapesjs-components.js');
require('./grapesjs-blocks.js');
require('./grapesjs-assets.js');

/* Initialise GrapesJS */
require('./grapesjs-initialise.js');
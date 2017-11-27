window.jQuery = window.$ = require('jquery');
window.grapesjs = require('./libraries/grapes.min.js');

let axios = require('axios');
let lodash = require('lodash');

/*
 *   GRAPESJS PLUGINS
 */

require('./modules/preset-webpage.js');
require('./modules/traits.js');
require('./modules/components.js');
require('./modules/blocks.js');
require('./modules/modals.js');
require('./modules/assets.js');

/* Initialise GrapesJS */
require('./initialise.js');
if (!global._babelPolyfill) {
    require('babel-polyfill');
}

$ = jQuery;

import patterns from './patterns.json';

require(
    __dirname + "/main.scss"
);

require(
    __dirname + "/common.js"
);

patterns.script.forEach((val, i) => {
    import(
        __dirname + "/patterns/" + val + "/" + val + ".js"
    );
});
import 'babel-polyfill';
import patterns from './patterns.json';

require(
    __dirname + "/main.scss"
);

require(
    __dirname + "/common.js"
);

patterns.script.forEach((val, i) => {
    require(
        __dirname + "/patterns/" + val + "/" + val + ".js"
    );
});
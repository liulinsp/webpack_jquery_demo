require('./index.css');
require('./btn.less');
var $ = require('../utils/jquery-1.8.3');
var mymath = require('../utils/math.js');

$('<h3>hello'+mymath.add(1,2)+'</h3>').appendTo("body");
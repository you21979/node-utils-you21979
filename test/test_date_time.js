"use strict";
var DateTime = require("../lib/date_time");
var assert = require('assert');

assert(DateTime.format('Y/m/d H:i:s.M', null) === 'Y/m/d H:i:s.M');
assert(DateTime.format('Y/m/d H:i:s.M', new Date('2000/02/29 00:00:00')) === '2000/02/29 00:00:00.000');
assert(DateTime.format('Y/m/d H:i:s.M', DateTime.fromUnixTime(DateTime.getUnixTime(new Date('2000/02/29 00:00:00')))) === '2000/02/29 00:00:00.000');


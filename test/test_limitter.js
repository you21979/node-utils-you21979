"use strict";
var limitter = require("../lib/limitter");
var assert = require("assert");

var MAX = 5;
var SEC = 1;
var limit = limitter.createLimitter(MAX, SEC);
for(var i = 0; i<MAX+1; ++i){
    if(MAX <= i){
        assert(limit() === false);
    }else{
        assert(limit() === true);
    }
}

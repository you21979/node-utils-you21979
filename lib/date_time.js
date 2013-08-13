"use strict";
var StringUtil = require(__dirname + '/string_util');
var DateTime = exports;

/**
 *  UNIXタイムを取得する
 */
DateTime.getUnixTime = function( dateObj ){
    if(dateObj === undefined){
        dateObj = new Date();
    }
    return dateObj / 1000 | 0;
};

/**
 *  UNIXタイムから時刻に変換する
 */
DateTime.fromUnixTime = function( unixtime ){
    if( unixtime === undefined ){
        unixtime = 0;
    }
    return new Date( unixtime * 1000 );
};

/**
 * 時間をフォーマットして出力する
 */
DateTime.format = function( fmt, dateObj ){
    if(dateObj instanceof Date){
        [
            ['y', datePadding(dateObj.getFullYear()-2000, 2)],
            ['Y', datePadding(dateObj.getFullYear(), 4)],
            ['m', datePadding(dateObj.getMonth()+1, 2)],
            ['d', datePadding(dateObj.getDate(), 2)],
            ['H', datePadding(dateObj.getHours(), 2)],
            ['i', datePadding(dateObj.getMinutes(), 2)],
            ['s', datePadding(dateObj.getSeconds(), 2)],
            ['M', datePadding(dateObj.getMilliseconds(), 3)]
        ].forEach(function(v){
            fmt = fmt.replace(v[0], v[1]);
        });
    }
    return fmt;
};

var datePadding = function( str, digit ){
    return StringUtil.digitPadding(str.toString(), digit, '0');
};


if(!module.parent){
    var assert = require('assert');
    assert(DateTime.format('Y/m/d H:i:s.M', null) === 'Y/m/d H:i:s.M');
    assert(DateTime.format('Y/m/d H:i:s.M', new Date('2000/02/29 00:00:00')) === '2000/02/29 00:00:00.000');
    assert(DateTime.format('Y/m/d H:i:s.M', DateTime.fromUnixTime(DateTime.getUnixTime(new Date('2000/02/29 00:00:00')))) === '2000/02/29 00:00:00.000');
}



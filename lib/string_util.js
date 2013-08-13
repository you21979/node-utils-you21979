/**
 *  文字列操作
 */
"use strict";
var StringUtil = exports;

// 桁埋め
StringUtil.digitPadding = function(str, digit, padstr){
    var w = '';
    if(str.length < digit ){
        var len = digit - str.length;
        for(var i = 0; i < len; ++i){
            w = padstr + w;
        }
    }
    return w + str;
};

// 前後の空白文字取り除き
StringUtil.trim = function(str){
    var pattern = new RegExp(/(^[\s　]+)|([\s　]+$)/g);
    return str.replace(pattern, '');
};

// タブ削除
StringUtil.deleteTab = function(str){
    var pattern = new RegExp(/[\t]/g);
    return str.replace(pattern, '');
};

// 置換
// ex)
// var str = '<areaName>を<count>回数クリア';
// var replace = {
//     '<areaName>' : 'エリア名',
//     '<count>'    : '1',
// };
// StringUtil.replace(str, replace);
StringUtil.replace = function(str, replace){
    if (typeof replace !== 'object') {
        return str;
    }

    for (var i in replace) {
        var key   = i;
        var value = replace[i];

        // 正規表現を使って一致する文字を全て置換する
        var pattern = new RegExp(key, 'g');
        str = str.replace(pattern, value);
    }

    return str;
};

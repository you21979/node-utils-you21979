"use strict";
/**
 *  回数制限をチェックする関数を作成する
 *  @param max 制限する回数
 *  @param reset_sec 回数をリセットする間隔
 *  @return function boolを返す関数
 */
var createLimitter = exports.createLimitter = function( max, reset_sec ){
    var timeset = function( sec ){
        return getTickCount() + sec;
    }
    var reset_time = timeset(reset_sec);
    var count = 0;
    return function(){
        if(getTickCount() >= reset_time){
            reset_time = timeset(reset_sec);
            count = 0;
        }
        if(count >= max){
            return false;
        }
        count++;
        return true;
    };
};
var getTickCount = function(){
    return process.uptime();
}

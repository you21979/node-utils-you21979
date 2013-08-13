"use strict";
(function(module){
    /**
     *  コンストラクタ作成
     */
    var CreateConstructor = function(superclass, classdef){
        // コンストラクタ
        var constructor = function(){
            if(this instanceof constructor){
                constructor.prototype.initialize.apply(this, arguments);
                return;
            }
            return new constructor();
        };
        // 継承
        constructor.extends = function(classdef){
            return OOClass(constructor, classdef);
        };
        // インターフェイス
        constructor.implements = function(classdef){
            for(var name in classdef){
                if(typeof constructor.prototype[name] !== 'function'){
                    throw new Error('Nothing Method:' + name);
                }
            }
            return constructor;
        };
        // ミックスイン
        constructor.mixin = function(mixindef){
            for(var name in mixindef){
                if(classdef[name]){
                    throw new Error('Exist Property:' + name);
                }
                constructor.prototype[name] = mixindef[name];
            }
            return constructor;
        };
        // シングルトン化
        constructor.toSingleton = (function(){
            var instance = null;
            var p = function(){};
            p.prototype.initialize = function(){
                if(!instance){
                    var args = [null];
                    for(var k in arguments){
                        args.push(arguments[k]);
                    }
                    instance = new (constructor.bind.apply(constructor, args));
                }
                return instance;
            };
            p.prototype.finalize = function(){
                if(instance){
                    if(instance.finalize){
                        instance.finalize();
                    }
                    instance = null;
                }
            };
            p.prototype.__defineGetter__('instance', function(){
                if(!instance){
                    instance = new constructor();
                }
                return instance;
            });
            return function(){
                return new p();
            };
        })();
        // プロトタイプチェーン作成
        constructor.prototype = Object.create(superclass.prototype, classdef);
        // デフォルトイニシャライザ追加
        if(constructor.prototype.initialize == null){
            constructor.prototype.initialize = function(){
                superclass.apply(this, arguments);
            };
        }
        // デフォルトファイナライザ追加
        if(constructor.prototype.finalize == null){
            constructor.prototype.finalize = function(){
            };
        }
        // 自身をプロトタイプに追加
        constructor.prototype.constructor = constructor;
        Object.freeze(constructor);
        return constructor;
    };
    /**
     *  クラスの作成
     */
    var OOClass = module.exports = function (superclass, classdef){
        if(classdef === undefined){
            classdef = superclass;
            superclass = Object;
        }
        for(var p in classdef){
            if(classdef.hasOwnProperty(p)){
                classdef[p] = {
                    value : classdef[p],
                    enumerable : true,
                    writable : true,
                };
            }
        }
        return CreateConstructor(superclass, classdef);
    };
})(module);

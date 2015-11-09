(function(global, factory) {
    'use strict';
    if (typeof model === 'object' && typeof mode.exports === 'object') {
        model.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error("requires a window with a document");
                }
                return factory(w);
            }
    } else {
        factory(global);
    }
}(typeof window != undefined ? window : this, function(window, noGlobal) {
    'use strict';
    var strundefined = typeof undefined;

    var document = window.document,
        version = '1.0.0',
        jsUtils = function(context) {
            return new jsUtils.fn.init(context);
        };

    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;

    jsUtils.fn = jsUtils.prototype = {
        version: version,
        constructor: jsUtils,
        length: 0
    }

    //use jQuery extend
    jsUtils.extend = jsUtils.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== "object" && !jsUtils.isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (jsUtils.isPlainObject(copy) || (copyIsArray = jsUtils.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jsUtils.isArray(src) ? src : [];
                        } else {
                            clone = src && jsUtils.isPlainObject(src) ? src : {};
                        }
                        target[name] = jsUtils.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };

    var init = jsUtils.fn.init = function(context) {
        this._context = context; //this means jsUtils.fn.init
    };
    init.prototype = jsUtils.fn;

    //based utils
    jsUtils.extend({
        type: function(obj) {
            if (obj == null) {
                return obj + "";
            }
            // Support: Android<4.0, iOS<6 (functionish RegExp)
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[toString.call(obj)] || "object" :
                typeof obj;
        },
        isPlainObject: function(obj) {
            if (jsUtils.type(obj) !== "object" || obj.nodeType || jsUtils.isWindow(obj)) {
                return false;
            }
            if (obj.constructor &&
                !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
            return true;
        },
        isArray: Array.isArray,
        isArraylike: function(obj) {
            var length = "length" in obj && obj.length,
                type = jsUtils.type(obj);
            if (type === "function" || jsUtils.isWindow(obj)) {
                return false;
            }
            if (obj.nodeType === 1 && length) {
                return true;
            }
            return type === "array" || length === 0 ||
                typeof length === "number" && length > 0 && (length - 1) in obj;
        },
        isWindow: function(obj) {
            return obj != null && obj === obj.window;
        },
        isFunction: function(obj) {
            return jsUtils.type(obj) === "function";
        }
    });

    //common utils
    jsUtils.extend({
        each: function(obj, callback, args) {
            var value,
                i = 0,
                length = obj.length,
                isArray = jsUtils.isArraylike(obj);
            if (args) {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                }
            } else {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        }
    });

    jsUtils.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });

    //browser check
    jsUtils.extend({
        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        isOpera: !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
        isFirefox: typeof InstallTrigger !== strundefined, // Firefox 1.0+
        //// At least Safari 3+: "[object HTMLElementConstructor]"
        isSafari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
        isChrome: !!window.chrome && !jsUtils.isOpera, // Chrome 1+
        isIE: /*@cc_on!@*/ false || !!document.documentMode, // At least IE6
        isEdge: !jsUtils.isIE && navigator.userAgent.indexOf("Edge") !== -1
    });


    jsUtils.fn.extend({
        getContext: function() {
            return this._context //this means jsUtils.fn
        }
    });

    if (typeof noGlobal === strundefined) {
        window.jsUtils = jsUtils;
    }
}));

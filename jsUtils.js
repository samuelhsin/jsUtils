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
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
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
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };

    var init = jsUtils.fn.init = function(context) {
        this._context = context;//this means jsUtils.fn.init
    };
    init.prototype = jsUtils.fn;

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
        context: function() {
            return this._context//this means jsUtils.fn
        }
    });

    if (typeof noGlobal === strundefined) {
        window.jsUtils = jsUtils;
    }
}));

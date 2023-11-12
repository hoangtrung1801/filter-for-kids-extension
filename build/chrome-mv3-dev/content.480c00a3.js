(function(define){var __define; typeof define === "function" && (__define=define,define=null);
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"a7WDn":[function(require,module,exports) {
var p = typeof globalThis.process < "u" ? globalThis.process.argv : [];
var y = ()=>typeof globalThis.process < "u" ? globalThis.process.env : {};
var M = new Set(p), _ = (e)=>M.has(e), z = p.filter((e)=>e.startsWith("--") && e.includes("=")).map((e)=>e.split("=")).reduce((e, [t, o])=>(e[t] = o, e), {});
var X = _("--dry-run"), d = ()=>_("--verbose") || y().VERBOSE === "true", G = d();
var u = (e = "", ...t)=>console.log(e.padEnd(9), "|", ...t);
var x = (...e)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...e), v = (...e)=>u("\uD83D\uDD35 INFO", ...e), g = (...e)=>u("\uD83D\uDFE0 WARN", ...e), D = 0, c = (...e)=>d() && u(`\u{1F7E1} ${D++}`, ...e);
var s = {
    "isContentScript": true,
    "isBackground": false,
    "isReact": false,
    "runtimes": [
        "script-runtime"
    ],
    "host": "localhost",
    "port": 1815,
    "entryFilePath": "D:\\Development\\esti-plugin-for-kids\\plugin\\src\\content.ts",
    "bundleId": "b7e7b9da480c00a3",
    "envHash": "e792fbbdaa78ee84",
    "verbose": "false",
    "secure": false,
    "serverPort": 1012
};
module.bundle.HMR_BUNDLE_ID = s.bundleId;
globalThis.process = {
    argv: [],
    env: {
        VERBOSE: s.verbose
    }
};
var S = module.bundle.Module;
function H(e) {
    S.call(this, e), this.hot = {
        data: module.bundle.hotData[e],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(t) {
            this._acceptCallbacks.push(t || function() {});
        },
        dispose: function(t) {
            this._disposeCallbacks.push(t);
        }
    }, module.bundle.hotData[e] = void 0;
}
module.bundle.Module = H;
module.bundle.hotData = {};
var l = globalThis.browser || globalThis.chrome || null;
function b() {
    return !s.host || s.host === "0.0.0.0" ? "localhost" : s.host;
}
function C() {
    return s.port || location.port;
}
var E = "__plasmo_runtime_script_";
function L(e, t) {
    let { modules: o } = e;
    return o ? !!o[t] : !1;
}
function I(e = C()) {
    let t = b();
    return `${s.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(t) ? "wss" : "ws"}://${t}:${e}/`;
}
function O(e) {
    typeof e.message == "string" && x("[plasmo/parcel-runtime]: " + e.message);
}
function P(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(I());
    return t.addEventListener("message", async function(o) {
        let r = JSON.parse(o.data);
        if (r.type === "update" && await e(r.assets), r.type === "error") for (let i of r.diagnostics.ansi){
            let w = i.codeframe || i.stack;
            g("[plasmo/parcel-runtime]: " + i.message + `
` + w + `

` + i.hints.join(`
`));
        }
    }), t.addEventListener("error", O), t.addEventListener("open", ()=>{
        v(`[plasmo/parcel-runtime]: Connected to HMR server for ${s.entryFilePath}`);
    }), t.addEventListener("close", ()=>{
        g(`[plasmo/parcel-runtime]: Connection to the HMR server is closed for ${s.entryFilePath}`);
    }), t;
}
var n = "__plasmo-loading__";
function m() {
    return document.getElementById(n);
}
function f() {
    return !m();
}
function B() {
    let e = document.createElement("div");
    return e.id = n, e.innerHTML = `
  <style>
    #${n} {
      background: #f3f3f3;
      color: #333;
      border: 1px solid #333;
      box-shadow: #333 4.7px 4.7px;
    }

    #${n}:hover {
      background: #e3e3e3;
      color: #444;
    }

    @keyframes plasmo-loading-animate-svg-fill {
      0% {
        fill: transparent;
      }
    
      100% {
        fill: #333;
      }
    }

    #${n} .svg-elem-1 {
      animation: plasmo-loading-animate-svg-fill 1.47s cubic-bezier(0.47, 0, 0.745, 0.715) 0.8s both infinite;
    }

    #${n} .svg-elem-2 {
      animation: plasmo-loading-animate-svg-fill 1.47s cubic-bezier(0.47, 0, 0.745, 0.715) 0.9s both infinite;
    }
    
    #${n} .svg-elem-3 {
      animation: plasmo-loading-animate-svg-fill 1.47s cubic-bezier(0.47, 0, 0.745, 0.715) 1s both infinite;
    }

    #${n} .hidden {
      display: none;
    }

  </style>
  
  <svg height="32" width="32" viewBox="0 0 264 354" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M139.221 282.243C154.252 282.243 166.903 294.849 161.338 308.812C159.489 313.454 157.15 317.913 154.347 322.109C146.464 333.909 135.26 343.107 122.151 348.538C109.043 353.969 94.6182 355.39 80.7022 352.621C66.7861 349.852 54.0034 343.018 43.9705 332.983C33.9375 322.947 27.105 310.162 24.3369 296.242C21.5689 282.323 22.9895 267.895 28.4193 254.783C33.8491 241.671 43.0441 230.464 54.8416 222.579C59.0353 219.777 63.4908 217.438 68.1295 215.588C82.0915 210.021 94.6978 222.671 94.6978 237.703L94.6978 255.027C94.6978 270.058 106.883 282.243 121.914 282.243H139.221Z" fill="#333" class="svg-elem-1" ></path>
    <path d="M192.261 142.028C192.261 126.996 204.867 114.346 218.829 119.913C223.468 121.763 227.923 124.102 232.117 126.904C243.915 134.789 253.11 145.996 258.539 159.108C263.969 172.22 265.39 186.648 262.622 200.567C259.854 214.487 253.021 227.272 242.988 237.308C232.955 247.343 220.173 254.177 206.256 256.946C192.34 259.715 177.916 258.294 164.807 252.863C151.699 247.432 140.495 238.234 132.612 226.434C129.808 222.238 127.47 217.779 125.62 213.137C120.056 199.174 132.707 186.568 147.738 186.568L165.044 186.568C180.076 186.568 192.261 174.383 192.261 159.352L192.261 142.028Z" fill="#333" class="svg-elem-2" ></path>
    <path d="M95.6522 164.135C95.6522 179.167 83.2279 191.725 68.8013 187.505C59.5145 184.788 50.6432 180.663 42.5106 175.227C26.7806 164.714 14.5206 149.772 7.28089 132.289C0.041183 114.807 -1.85305 95.5697 1.83772 77.0104C5.52849 58.4511 14.6385 41.4033 28.0157 28.0228C41.393 14.6423 58.4366 5.53006 76.9914 1.83839C95.5461 -1.85329 114.779 0.0414162 132.257 7.2829C149.735 14.5244 164.674 26.7874 175.184 42.5212C180.62 50.6576 184.744 59.5332 187.46 68.8245C191.678 83.2519 179.119 95.6759 164.088 95.6759L122.869 95.6759C107.837 95.6759 95.6522 107.861 95.6522 122.892L95.6522 164.135Z" fill="#333" class="svg-elem-3"></path>
  </svg>
  <span class="hidden">Context Invalidated, Press to Reload</span>
  `, e.style.pointerEvents = "none", e.style.position = "fixed", e.style.bottom = "14.7px", e.style.right = "14.7px", e.style.fontFamily = "sans-serif", e.style.display = "flex", e.style.justifyContent = "center", e.style.alignItems = "center", e.style.padding = "14.7px", e.style.gap = "14.7px", e.style.borderRadius = "4.7px", e.style.zIndex = "2147483647", e.style.opacity = "0", e.style.transition = "all 0.47s ease-in-out", e;
}
function $(e) {
    return new Promise((t)=>{
        document.documentElement ? (f() && (document.documentElement.appendChild(e), t()), t()) : globalThis.addEventListener("DOMContentLoaded", ()=>{
            f() && document.documentElement.appendChild(e), t();
        });
    });
}
var k = ()=>{
    let e;
    if (f()) {
        let t = B();
        e = $(t);
    }
    return {
        show: async ({ reloadButton: t = !1 } = {})=>{
            await e;
            let o = m();
            o.style.opacity = "1", t && (o.onclick = (r)=>{
                r.stopPropagation(), globalThis.location.reload();
            }, o.querySelector("span").classList.remove("hidden"), o.style.cursor = "pointer", o.style.pointerEvents = "all");
        },
        hide: async ()=>{
            await e;
            let t = m();
            t.style.opacity = "0";
        }
    };
};
var F = `${E}${module.id}__`, a, T = !1, A = k();
async function h() {
    c("Script Runtime - reloading"), T ? globalThis.location?.reload?.() : A.show({
        reloadButton: !0
    });
}
function R() {
    a?.disconnect(), a = l?.runtime.connect({
        name: F
    }), a.onDisconnect.addListener(()=>{
        h();
    }), a.onMessage.addListener((e)=>{
        e.__plasmo_cs_reload__ && h(), e.__plasmo_cs_active_tab__ && (T = !0);
    });
}
function N() {
    if (l?.runtime) try {
        R(), setInterval(R, 24e3);
    } catch  {
        return;
    }
}
N();
P(async (e)=>{
    c("Script runtime - on updated assets"), e.filter((o)=>o.envHash === s.envHash).some((o)=>L(module.bundle, o.id)) && (A.show(), l?.runtime ? a.postMessage({
        __plasmo_cs_changed__: !0
    }) : setTimeout(()=>{
        h();
    }, 4700));
});

},{}],"k5Ie5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "config", ()=>config);
var _domWatcher = require("~lib/content/DomWatcher");
var _domWatcherDefault = parcelHelpers.interopDefault(_domWatcher);
var _imageFilter = require("~lib/content/filters/ImageFilter");
var _imageFilterDefault = parcelHelpers.interopDefault(_imageFilter);
var _loadImage = require("~lib/content/loadImage");
var _loadImageDefault = parcelHelpers.interopDefault(_loadImage);
var _request = require("~lib/Request");
const config = {
    matches: [
        "https://www.google.com/*"
    ],
    all_frames: true,
    run_at: "document_start"
};
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse)=>{
    if (!message) return;
    switch(message.type){
        case (0, _request.IType).IMG_DATA:
            const imageData = await (0, _loadImageDefault.default)(message.payload);
            sendResponse(imageData);
            return true;
        default:
            break;
    }
});
const init = async ()=>{
    console.log("hello, wolrd [plugin]");
    const imageFilter = new (0, _imageFilterDefault.default)();
    const domWatcher = new (0, _domWatcherDefault.default)(imageFilter);
    domWatcher.watch();
};
if (window.self === window.top) init();

},{"~lib/content/DomWatcher":"0O1gi","~lib/content/filters/ImageFilter":"4VRGm","~lib/content/loadImage":"bVE0q","~lib/Request":"hfLGd","@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}],"0O1gi":[function(require,module,exports) {
// Highly sensitive code, make sure that you know what you're doing
// https://stackoverflow.com/a/39332340/10432429
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class DOMWatcher {
    constructor(filter){
        this.filter = filter;
        this.observer = new MutationObserver(this.callback.bind(this));
    }
    watch() {
        this.observer.observe(document, DOMWatcher.getConfig());
    }
    async callback(mutationsList) {
        for(let i = 0; i < mutationsList.length; i++){
            const mutation = mutationsList[i];
            // if (
            // 	mutation.type === "childList" &&
            // 	mutation.addedNodes.length > 0
            // ) {
            // }
            await this.filter.analyze(mutation.target);
        }
    }
    findAndCheckAllImages(element) {
        const images = element.getElementsByTagName("img");
    // for (let i = 0; i < images.length; i++) {
    // this.filter.analyze(images[i], false)
    // }
    }
    checkAttributeMutation(mutation) {
        mutation.target.nodeName;
    }
    static getConfig() {
        return {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: [
                "src"
            ]
        };
    }
}
exports.default = DOMWatcher;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}],"boKlo":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"4VRGm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _request = require("~lib/Request");
var _requestDefault = parcelHelpers.interopDefault(_request);
var _base64ToArrayBuffer = require("../base64toArrayBuffer");
var _base64ToArrayBufferDefault = parcelHelpers.interopDefault(_base64ToArrayBuffer);
var _loadImage = require("../loadImage");
var _loadImageDefault = parcelHelpers.interopDefault(_loadImage);
var _filter = require("./Filter");
var _filterDefault = parcelHelpers.interopDefault(_filter);
class ImageFilter extends (0, _filterDefault.default) {
    async analyze(target) {
        if (target.nodeName !== "IMG") return;
        const img = target;
        // analyze
        img.style.border = "10px solid blue";
        // check if it is base64
        // otherwise, fetch image data
        if (/^data:image\/[a-zA-Z]*;base64,/.test(img.src)) console.log("base64", (0, _base64ToArrayBufferDefault.default)(img.src));
        // const imgData = /^data:image\/[a-zA-Z]*;base64,/.test(img.src)
        // 	? base64ToArrayBuffer(img.src)
        // 	: await loadImage(img.src);
        const imgData = await (0, _loadImageDefault.default)(img.src);
        const req = new (0, _requestDefault.default)((0, _request.IType).IMAGE, imgData, {
            url: img.src
        });
        chrome.runtime.sendMessage(req, (res)=>{
            if (!res) {
                img.style.border = "10px solid gray";
                return;
            }
            const { result } = res;
            if (result) {
                img.style.filter = "blur(25px)";
                console.log({
                    img
                }, " is nsfw");
            } else console.log({
                img
            }, " is neutral");
            img.style.border = "10px solid red";
        });
    }
    analyzeImg(img) {
        img.style.filter = "blur(25px)";
    }
    filter() {}
}
exports.default = ImageFilter;

},{"~lib/Request":"hfLGd","../base64toArrayBuffer":"e4Y93","../loadImage":"bVE0q","./Filter":"amFZz","@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}],"hfLGd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "IType", ()=>IType);
var IType;
(function(IType) {
    IType["IMAGE"] = "IMAGE";
    IType["VIDEO"] = "VIDEO";
    IType["TEXT"] = "TEXT";
    IType["IMG_DATA"] = "IMG_DATA";
})(IType || (IType = {}));
class Request {
    constructor(type, payload, meta){
        this.type = type;
        this.payload = payload;
        this.meta = meta;
    }
}
exports.default = Request;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}],"e4Y93":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>base64ToArrayBuffer);
function base64ToArrayBuffer(base64) {
    const base64Data = base64.replace(/^data:image\/[a-zA-Z]*;base64,/, "");
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for(let i = 0; i < byteCharacters.length; i++)byteNumbers[i] = byteCharacters.charCodeAt(i);
    // const byteArray = new Uint8Array(byteNumbers);
    // const image = new ImageData(byteArray, img.width, img.height);
    // return image;
    return byteNumbers;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}],"bVE0q":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("~lib/constants");
const loadImage = (src)=>new Promise((resolve, reject)=>{
        // console.log("load image data", src)
        // Load image (with crossOrigin set to anonymouse so that it can be used in a
        // canvas later).
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onerror = function(e) {
            reject(new Error(`Could not load image from external source ${src}.`));
        };
        img.onload = function(e) {
            if (img.height && img.height > (0, _constants.MIN_IMG_SIZE) || img.width && img.width > (0, _constants.MIN_IMG_SIZE)) {
                img.width = (0, _constants.IMG_SIZE);
                img.height = (0, _constants.IMG_SIZE);
                // When image is loaded, render it to a canvas and send its ImageData back
                // to the service worker.
                const canvas = new OffscreenCanvas(img.width, img.height);
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                resolve(Array.from(imageData.data));
            }
            // Fail out if either dimension is less than MIN_IMG_SIZE.
            reject(`Image size too small. [${img.height} x ${img.width}] vs. minimum [${(0, _constants.MIN_IMG_SIZE)} x ${(0, _constants.MIN_IMG_SIZE)}]`);
        };
        img.src = src;
    });
exports.default = loadImage;

},{"~lib/constants":"b7WBk","@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}],"b7WBk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "IMG_SIZE", ()=>IMG_SIZE);
parcelHelpers.export(exports, "LOADING_TIMEOUT", ()=>LOADING_TIMEOUT);
parcelHelpers.export(exports, "MIN_IMG_SIZE", ()=>MIN_IMG_SIZE);
const IMG_SIZE = 224;
const LOADING_TIMEOUT = 10000;
const MIN_IMG_SIZE = 64;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}],"amFZz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Filter {
    async analyze(target) {}
    filter() {}
}
exports.default = Filter;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}]},["a7WDn","k5Ie5"], "k5Ie5", "parcelRequiref74b")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AcGxhc21vaHEvcGFyY2VsLXJ1bnRpbWUvZGlzdC9ydW50aW1lLThmOTI0M2QyYmZlNjA2NmIuanMiLCJzcmMvY29udGVudC50cyIsInNyYy9saWIvY29udGVudC9Eb21XYXRjaGVyLnRzIiwibm9kZV9tb2R1bGVzL0BwYXJjZWwvdHJhbnNmb3JtZXItanMvc3JjL2VzbW9kdWxlLWhlbHBlcnMuanMiLCJzcmMvbGliL2NvbnRlbnQvZmlsdGVycy9JbWFnZUZpbHRlci50cyIsInNyYy9saWIvUmVxdWVzdC50cyIsInNyYy9saWIvY29udGVudC9iYXNlNjR0b0FycmF5QnVmZmVyLnRzIiwic3JjL2xpYi9jb250ZW50L2xvYWRJbWFnZS50cyIsInNyYy9saWIvY29uc3RhbnRzLnRzIiwic3JjL2xpYi9jb250ZW50L2ZpbHRlcnMvRmlsdGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBwPXR5cGVvZiBnbG9iYWxUaGlzLnByb2Nlc3M8XCJ1XCI/Z2xvYmFsVGhpcy5wcm9jZXNzLmFyZ3Y6W107dmFyIHk9KCk9PnR5cGVvZiBnbG9iYWxUaGlzLnByb2Nlc3M8XCJ1XCI/Z2xvYmFsVGhpcy5wcm9jZXNzLmVudjp7fTt2YXIgTT1uZXcgU2V0KHApLF89ZT0+TS5oYXMoZSksej1wLmZpbHRlcihlPT5lLnN0YXJ0c1dpdGgoXCItLVwiKSYmZS5pbmNsdWRlcyhcIj1cIikpLm1hcChlPT5lLnNwbGl0KFwiPVwiKSkucmVkdWNlKChlLFt0LG9dKT0+KGVbdF09byxlKSx7fSk7dmFyIFg9XyhcIi0tZHJ5LXJ1blwiKSxkPSgpPT5fKFwiLS12ZXJib3NlXCIpfHx5KCkuVkVSQk9TRT09PVwidHJ1ZVwiLEc9ZCgpO3ZhciB1PShlPVwiXCIsLi4udCk9PmNvbnNvbGUubG9nKGUucGFkRW5kKDkpLFwifFwiLC4uLnQpO3ZhciB4PSguLi5lKT0+Y29uc29sZS5lcnJvcihcIlxcdXsxRjUzNH0gRVJST1JcIi5wYWRFbmQoOSksXCJ8XCIsLi4uZSksdj0oLi4uZSk9PnUoXCJcXHV7MUY1MzV9IElORk9cIiwuLi5lKSxnPSguLi5lKT0+dShcIlxcdXsxRjdFMH0gV0FSTlwiLC4uLmUpLEQ9MCxjPSguLi5lKT0+ZCgpJiZ1KGBcXHV7MUY3RTF9ICR7RCsrfWAsLi4uZSk7dmFyIHM9e1wiaXNDb250ZW50U2NyaXB0XCI6dHJ1ZSxcImlzQmFja2dyb3VuZFwiOmZhbHNlLFwiaXNSZWFjdFwiOmZhbHNlLFwicnVudGltZXNcIjpbXCJzY3JpcHQtcnVudGltZVwiXSxcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicG9ydFwiOjE4MTUsXCJlbnRyeUZpbGVQYXRoXCI6XCJEOlxcXFxEZXZlbG9wbWVudFxcXFxlc3RpLXBsdWdpbi1mb3Ita2lkc1xcXFxwbHVnaW5cXFxcc3JjXFxcXGNvbnRlbnQudHNcIixcImJ1bmRsZUlkXCI6XCJiN2U3YjlkYTQ4MGMwMGEzXCIsXCJlbnZIYXNoXCI6XCJlNzkyZmJiZGFhNzhlZTg0XCIsXCJ2ZXJib3NlXCI6XCJmYWxzZVwiLFwic2VjdXJlXCI6ZmFsc2UsXCJzZXJ2ZXJQb3J0XCI6MTAxMn07bW9kdWxlLmJ1bmRsZS5ITVJfQlVORExFX0lEPXMuYnVuZGxlSWQ7Z2xvYmFsVGhpcy5wcm9jZXNzPXthcmd2OltdLGVudjp7VkVSQk9TRTpzLnZlcmJvc2V9fTt2YXIgUz1tb2R1bGUuYnVuZGxlLk1vZHVsZTtmdW5jdGlvbiBIKGUpe1MuY2FsbCh0aGlzLGUpLHRoaXMuaG90PXtkYXRhOm1vZHVsZS5idW5kbGUuaG90RGF0YVtlXSxfYWNjZXB0Q2FsbGJhY2tzOltdLF9kaXNwb3NlQ2FsbGJhY2tzOltdLGFjY2VwdDpmdW5jdGlvbih0KXt0aGlzLl9hY2NlcHRDYWxsYmFja3MucHVzaCh0fHxmdW5jdGlvbigpe30pfSxkaXNwb3NlOmZ1bmN0aW9uKHQpe3RoaXMuX2Rpc3Bvc2VDYWxsYmFja3MucHVzaCh0KX19LG1vZHVsZS5idW5kbGUuaG90RGF0YVtlXT12b2lkIDB9bW9kdWxlLmJ1bmRsZS5Nb2R1bGU9SDttb2R1bGUuYnVuZGxlLmhvdERhdGE9e307dmFyIGw9Z2xvYmFsVGhpcy5icm93c2VyfHxnbG9iYWxUaGlzLmNocm9tZXx8bnVsbDtmdW5jdGlvbiBiKCl7cmV0dXJuIXMuaG9zdHx8cy5ob3N0PT09XCIwLjAuMC4wXCI/XCJsb2NhbGhvc3RcIjpzLmhvc3R9ZnVuY3Rpb24gQygpe3JldHVybiBzLnBvcnR8fGxvY2F0aW9uLnBvcnR9dmFyIEU9XCJfX3BsYXNtb19ydW50aW1lX3NjcmlwdF9cIjtmdW5jdGlvbiBMKGUsdCl7bGV0e21vZHVsZXM6b309ZTtyZXR1cm4gbz8hIW9bdF06ITF9ZnVuY3Rpb24gSShlPUMoKSl7bGV0IHQ9YigpO3JldHVybmAke3Muc2VjdXJlfHxsb2NhdGlvbi5wcm90b2NvbD09PVwiaHR0cHM6XCImJiEvbG9jYWxob3N0fDEyNy4wLjAuMXwwLjAuMC4wLy50ZXN0KHQpP1wid3NzXCI6XCJ3c1wifTovLyR7dH06JHtlfS9gfWZ1bmN0aW9uIE8oZSl7dHlwZW9mIGUubWVzc2FnZT09XCJzdHJpbmdcIiYmeChcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIitlLm1lc3NhZ2UpfWZ1bmN0aW9uIFAoZSl7aWYodHlwZW9mIGdsb2JhbFRoaXMuV2ViU29ja2V0PlwidVwiKXJldHVybjtsZXQgdD1uZXcgV2ViU29ja2V0KEkoKSk7cmV0dXJuIHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixhc3luYyBmdW5jdGlvbihvKXtsZXQgcj1KU09OLnBhcnNlKG8uZGF0YSk7aWYoci50eXBlPT09XCJ1cGRhdGVcIiYmYXdhaXQgZShyLmFzc2V0cyksci50eXBlPT09XCJlcnJvclwiKWZvcihsZXQgaSBvZiByLmRpYWdub3N0aWNzLmFuc2kpe2xldCB3PWkuY29kZWZyYW1lfHxpLnN0YWNrO2coXCJbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogXCIraS5tZXNzYWdlK2BcbmArdytgXG5cbmAraS5oaW50cy5qb2luKGBcbmApKX19KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLE8pLHQuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwoKT0+e3YoYFtwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBDb25uZWN0ZWQgdG8gSE1SIHNlcnZlciBmb3IgJHtzLmVudHJ5RmlsZVBhdGh9YCl9KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCgpPT57ZyhgW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3Rpb24gdG8gdGhlIEhNUiBzZXJ2ZXIgaXMgY2xvc2VkIGZvciAke3MuZW50cnlGaWxlUGF0aH1gKX0pLHR9dmFyIG49XCJfX3BsYXNtby1sb2FkaW5nX19cIjtmdW5jdGlvbiBtKCl7cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG4pfWZ1bmN0aW9uIGYoKXtyZXR1cm4hbSgpfWZ1bmN0aW9uIEIoKXtsZXQgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiBlLmlkPW4sZS5pbm5lckhUTUw9YFxuICA8c3R5bGU+XG4gICAgIyR7bn0ge1xuICAgICAgYmFja2dyb3VuZDogI2YzZjNmMztcbiAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzMzMztcbiAgICAgIGJveC1zaGFkb3c6ICMzMzMgNC43cHggNC43cHg7XG4gICAgfVxuXG4gICAgIyR7bn06aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogI2UzZTNlMztcbiAgICAgIGNvbG9yOiAjNDQ0O1xuICAgIH1cblxuICAgIEBrZXlmcmFtZXMgcGxhc21vLWxvYWRpbmctYW5pbWF0ZS1zdmctZmlsbCB7XG4gICAgICAwJSB7XG4gICAgICAgIGZpbGw6IHRyYW5zcGFyZW50O1xuICAgICAgfVxuICAgIFxuICAgICAgMTAwJSB7XG4gICAgICAgIGZpbGw6ICMzMzM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgIyR7bn0gLnN2Zy1lbGVtLTEge1xuICAgICAgYW5pbWF0aW9uOiBwbGFzbW8tbG9hZGluZy1hbmltYXRlLXN2Zy1maWxsIDEuNDdzIGN1YmljLWJlemllcigwLjQ3LCAwLCAwLjc0NSwgMC43MTUpIDAuOHMgYm90aCBpbmZpbml0ZTtcbiAgICB9XG5cbiAgICAjJHtufSAuc3ZnLWVsZW0tMiB7XG4gICAgICBhbmltYXRpb246IHBsYXNtby1sb2FkaW5nLWFuaW1hdGUtc3ZnLWZpbGwgMS40N3MgY3ViaWMtYmV6aWVyKDAuNDcsIDAsIDAuNzQ1LCAwLjcxNSkgMC45cyBib3RoIGluZmluaXRlO1xuICAgIH1cbiAgICBcbiAgICAjJHtufSAuc3ZnLWVsZW0tMyB7XG4gICAgICBhbmltYXRpb246IHBsYXNtby1sb2FkaW5nLWFuaW1hdGUtc3ZnLWZpbGwgMS40N3MgY3ViaWMtYmV6aWVyKDAuNDcsIDAsIDAuNzQ1LCAwLjcxNSkgMXMgYm90aCBpbmZpbml0ZTtcbiAgICB9XG5cbiAgICAjJHtufSAuaGlkZGVuIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gIDwvc3R5bGU+XG4gIFxuICA8c3ZnIGhlaWdodD1cIjMyXCIgd2lkdGg9XCIzMlwiIHZpZXdCb3g9XCIwIDAgMjY0IDM1NFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgIDxwYXRoIGQ9XCJNMTM5LjIyMSAyODIuMjQzQzE1NC4yNTIgMjgyLjI0MyAxNjYuOTAzIDI5NC44NDkgMTYxLjMzOCAzMDguODEyQzE1OS40ODkgMzEzLjQ1NCAxNTcuMTUgMzE3LjkxMyAxNTQuMzQ3IDMyMi4xMDlDMTQ2LjQ2NCAzMzMuOTA5IDEzNS4yNiAzNDMuMTA3IDEyMi4xNTEgMzQ4LjUzOEMxMDkuMDQzIDM1My45NjkgOTQuNjE4MiAzNTUuMzkgODAuNzAyMiAzNTIuNjIxQzY2Ljc4NjEgMzQ5Ljg1MiA1NC4wMDM0IDM0My4wMTggNDMuOTcwNSAzMzIuOTgzQzMzLjkzNzUgMzIyLjk0NyAyNy4xMDUgMzEwLjE2MiAyNC4zMzY5IDI5Ni4yNDJDMjEuNTY4OSAyODIuMzIzIDIyLjk4OTUgMjY3Ljg5NSAyOC40MTkzIDI1NC43ODNDMzMuODQ5MSAyNDEuNjcxIDQzLjA0NDEgMjMwLjQ2NCA1NC44NDE2IDIyMi41NzlDNTkuMDM1MyAyMTkuNzc3IDYzLjQ5MDggMjE3LjQzOCA2OC4xMjk1IDIxNS41ODhDODIuMDkxNSAyMTAuMDIxIDk0LjY5NzggMjIyLjY3MSA5NC42OTc4IDIzNy43MDNMOTQuNjk3OCAyNTUuMDI3Qzk0LjY5NzggMjcwLjA1OCAxMDYuODgzIDI4Mi4yNDMgMTIxLjkxNCAyODIuMjQzSDEzOS4yMjFaXCIgZmlsbD1cIiMzMzNcIiBjbGFzcz1cInN2Zy1lbGVtLTFcIiA+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTkyLjI2MSAxNDIuMDI4QzE5Mi4yNjEgMTI2Ljk5NiAyMDQuODY3IDExNC4zNDYgMjE4LjgyOSAxMTkuOTEzQzIyMy40NjggMTIxLjc2MyAyMjcuOTIzIDEyNC4xMDIgMjMyLjExNyAxMjYuOTA0QzI0My45MTUgMTM0Ljc4OSAyNTMuMTEgMTQ1Ljk5NiAyNTguNTM5IDE1OS4xMDhDMjYzLjk2OSAxNzIuMjIgMjY1LjM5IDE4Ni42NDggMjYyLjYyMiAyMDAuNTY3QzI1OS44NTQgMjE0LjQ4NyAyNTMuMDIxIDIyNy4yNzIgMjQyLjk4OCAyMzcuMzA4QzIzMi45NTUgMjQ3LjM0MyAyMjAuMTczIDI1NC4xNzcgMjA2LjI1NiAyNTYuOTQ2QzE5Mi4zNCAyNTkuNzE1IDE3Ny45MTYgMjU4LjI5NCAxNjQuODA3IDI1Mi44NjNDMTUxLjY5OSAyNDcuNDMyIDE0MC40OTUgMjM4LjIzNCAxMzIuNjEyIDIyNi40MzRDMTI5LjgwOCAyMjIuMjM4IDEyNy40NyAyMTcuNzc5IDEyNS42MiAyMTMuMTM3QzEyMC4wNTYgMTk5LjE3NCAxMzIuNzA3IDE4Ni41NjggMTQ3LjczOCAxODYuNTY4TDE2NS4wNDQgMTg2LjU2OEMxODAuMDc2IDE4Ni41NjggMTkyLjI2MSAxNzQuMzgzIDE5Mi4yNjEgMTU5LjM1MkwxOTIuMjYxIDE0Mi4wMjhaXCIgZmlsbD1cIiMzMzNcIiBjbGFzcz1cInN2Zy1lbGVtLTJcIiA+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNOTUuNjUyMiAxNjQuMTM1Qzk1LjY1MjIgMTc5LjE2NyA4My4yMjc5IDE5MS43MjUgNjguODAxMyAxODcuNTA1QzU5LjUxNDUgMTg0Ljc4OCA1MC42NDMyIDE4MC42NjMgNDIuNTEwNiAxNzUuMjI3QzI2Ljc4MDYgMTY0LjcxNCAxNC41MjA2IDE0OS43NzIgNy4yODA4OSAxMzIuMjg5QzAuMDQxMTgzIDExNC44MDcgLTEuODUzMDUgOTUuNTY5NyAxLjgzNzcyIDc3LjAxMDRDNS41Mjg0OSA1OC40NTExIDE0LjYzODUgNDEuNDAzMyAyOC4wMTU3IDI4LjAyMjhDNDEuMzkzIDE0LjY0MjMgNTguNDM2NiA1LjUzMDA2IDc2Ljk5MTQgMS44MzgzOUM5NS41NDYxIC0xLjg1MzI5IDExNC43NzkgMC4wNDE0MTYyIDEzMi4yNTcgNy4yODI5QzE0OS43MzUgMTQuNTI0NCAxNjQuNjc0IDI2Ljc4NzQgMTc1LjE4NCA0Mi41MjEyQzE4MC42MiA1MC42NTc2IDE4NC43NDQgNTkuNTMzMiAxODcuNDYgNjguODI0NUMxOTEuNjc4IDgzLjI1MTkgMTc5LjExOSA5NS42NzU5IDE2NC4wODggOTUuNjc1OUwxMjIuODY5IDk1LjY3NTlDMTA3LjgzNyA5NS42NzU5IDk1LjY1MjIgMTA3Ljg2MSA5NS42NTIyIDEyMi44OTJMOTUuNjUyMiAxNjQuMTM1WlwiIGZpbGw9XCIjMzMzXCIgY2xhc3M9XCJzdmctZWxlbS0zXCI+PC9wYXRoPlxuICA8L3N2Zz5cbiAgPHNwYW4gY2xhc3M9XCJoaWRkZW5cIj5Db250ZXh0IEludmFsaWRhdGVkLCBQcmVzcyB0byBSZWxvYWQ8L3NwYW4+XG4gIGAsZS5zdHlsZS5wb2ludGVyRXZlbnRzPVwibm9uZVwiLGUuc3R5bGUucG9zaXRpb249XCJmaXhlZFwiLGUuc3R5bGUuYm90dG9tPVwiMTQuN3B4XCIsZS5zdHlsZS5yaWdodD1cIjE0LjdweFwiLGUuc3R5bGUuZm9udEZhbWlseT1cInNhbnMtc2VyaWZcIixlLnN0eWxlLmRpc3BsYXk9XCJmbGV4XCIsZS5zdHlsZS5qdXN0aWZ5Q29udGVudD1cImNlbnRlclwiLGUuc3R5bGUuYWxpZ25JdGVtcz1cImNlbnRlclwiLGUuc3R5bGUucGFkZGluZz1cIjE0LjdweFwiLGUuc3R5bGUuZ2FwPVwiMTQuN3B4XCIsZS5zdHlsZS5ib3JkZXJSYWRpdXM9XCI0LjdweFwiLGUuc3R5bGUuekluZGV4PVwiMjE0NzQ4MzY0N1wiLGUuc3R5bGUub3BhY2l0eT1cIjBcIixlLnN0eWxlLnRyYW5zaXRpb249XCJhbGwgMC40N3MgZWFzZS1pbi1vdXRcIixlfWZ1bmN0aW9uICQoZSl7cmV0dXJuIG5ldyBQcm9taXNlKHQ9Pntkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ/KGYoKSYmKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChlKSx0KCkpLHQoKSk6Z2xvYmFsVGhpcy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCgpPT57ZigpJiZkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZSksdCgpfSl9KX12YXIgaz0oKT0+e2xldCBlO2lmKGYoKSl7bGV0IHQ9QigpO2U9JCh0KX1yZXR1cm57c2hvdzphc3luYyh7cmVsb2FkQnV0dG9uOnQ9ITF9PXt9KT0+e2F3YWl0IGU7bGV0IG89bSgpO28uc3R5bGUub3BhY2l0eT1cIjFcIix0JiYoby5vbmNsaWNrPXI9PntyLnN0b3BQcm9wYWdhdGlvbigpLGdsb2JhbFRoaXMubG9jYXRpb24ucmVsb2FkKCl9LG8ucXVlcnlTZWxlY3RvcihcInNwYW5cIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKSxvLnN0eWxlLmN1cnNvcj1cInBvaW50ZXJcIixvLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJhbGxcIil9LGhpZGU6YXN5bmMoKT0+e2F3YWl0IGU7bGV0IHQ9bSgpO3Quc3R5bGUub3BhY2l0eT1cIjBcIn19fTt2YXIgRj1gJHtFfSR7bW9kdWxlLmlkfV9fYCxhLFQ9ITEsQT1rKCk7YXN5bmMgZnVuY3Rpb24gaCgpe2MoXCJTY3JpcHQgUnVudGltZSAtIHJlbG9hZGluZ1wiKSxUP2dsb2JhbFRoaXMubG9jYXRpb24/LnJlbG9hZD8uKCk6QS5zaG93KHtyZWxvYWRCdXR0b246ITB9KX1mdW5jdGlvbiBSKCl7YT8uZGlzY29ubmVjdCgpLGE9bD8ucnVudGltZS5jb25uZWN0KHtuYW1lOkZ9KSxhLm9uRGlzY29ubmVjdC5hZGRMaXN0ZW5lcigoKT0+e2goKX0pLGEub25NZXNzYWdlLmFkZExpc3RlbmVyKGU9PntlLl9fcGxhc21vX2NzX3JlbG9hZF9fJiZoKCksZS5fX3BsYXNtb19jc19hY3RpdmVfdGFiX18mJihUPSEwKX0pfWZ1bmN0aW9uIE4oKXtpZihsPy5ydW50aW1lKXRyeXtSKCksc2V0SW50ZXJ2YWwoUiwyNGUzKX1jYXRjaHtyZXR1cm59fU4oKTtQKGFzeW5jIGU9PntjKFwiU2NyaXB0IHJ1bnRpbWUgLSBvbiB1cGRhdGVkIGFzc2V0c1wiKSxlLmZpbHRlcihvPT5vLmVudkhhc2g9PT1zLmVudkhhc2gpLnNvbWUobz0+TChtb2R1bGUuYnVuZGxlLG8uaWQpKSYmKEEuc2hvdygpLGw/LnJ1bnRpbWU/YS5wb3N0TWVzc2FnZSh7X19wbGFzbW9fY3NfY2hhbmdlZF9fOiEwfSk6c2V0VGltZW91dCgoKT0+e2goKX0sNDcwMCkpfSk7XG4iLCJpbXBvcnQgdHlwZSB7IFBsYXNtb0NTQ29uZmlnIH0gZnJvbSBcInBsYXNtb1wiO1xuXG5pbXBvcnQgRE9NV2F0Y2hlciBmcm9tIFwifmxpYi9jb250ZW50L0RvbVdhdGNoZXJcIjtcbmltcG9ydCBJbWFnZUZpbHRlciBmcm9tIFwifmxpYi9jb250ZW50L2ZpbHRlcnMvSW1hZ2VGaWx0ZXJcIjtcbmltcG9ydCBsb2FkSW1hZ2UgZnJvbSBcIn5saWIvY29udGVudC9sb2FkSW1hZ2VcIjtcbmltcG9ydCB0eXBlIFJlcXVlc3QgZnJvbSBcIn5saWIvUmVxdWVzdFwiO1xuaW1wb3J0IHsgSVR5cGUgfSBmcm9tIFwifmxpYi9SZXF1ZXN0XCI7XG5cbmV4cG9ydCBjb25zdCBjb25maWc6IFBsYXNtb0NTQ29uZmlnID0ge1xuXHRtYXRjaGVzOiBbXCJodHRwczovL3d3dy5nb29nbGUuY29tLypcIl0sXG5cdGFsbF9mcmFtZXM6IHRydWUsXG5cdHJ1bl9hdDogXCJkb2N1bWVudF9zdGFydFwiXG59O1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoXG5cdGFzeW5jIChtZXNzYWdlOiBSZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuXHRcdGlmICghbWVzc2FnZSkgcmV0dXJuO1xuXG5cdFx0c3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcblx0XHRcdGNhc2UgSVR5cGUuSU1HX0RBVEE6XG5cdFx0XHRcdGNvbnN0IGltYWdlRGF0YSA9IGF3YWl0IGxvYWRJbWFnZShtZXNzYWdlLnBheWxvYWQpO1xuXHRcdFx0XHRzZW5kUmVzcG9uc2UoaW1hZ2VEYXRhKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cbik7XG5cbmNvbnN0IGluaXQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdGNvbnNvbGUubG9nKFwiaGVsbG8sIHdvbHJkIFtwbHVnaW5dXCIpO1xuXG5cdGNvbnN0IGltYWdlRmlsdGVyID0gbmV3IEltYWdlRmlsdGVyKCk7XG5cdGNvbnN0IGRvbVdhdGNoZXIgPSBuZXcgRE9NV2F0Y2hlcihpbWFnZUZpbHRlcik7XG5cblx0ZG9tV2F0Y2hlci53YXRjaCgpO1xufTtcblxuaWYgKHdpbmRvdy5zZWxmID09PSB3aW5kb3cudG9wKSB7XG5cdGluaXQoKTtcbn1cbiIsIi8vIEhpZ2hseSBzZW5zaXRpdmUgY29kZSwgbWFrZSBzdXJlIHRoYXQgeW91IGtub3cgd2hhdCB5b3UncmUgZG9pbmdcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTMzMjM0MC8xMDQzMjQyOVxuXG5pbXBvcnQgUmVxdWVzdCwgeyBJVHlwZSB9IGZyb20gXCJ+bGliL1JlcXVlc3RcIjtcblxuaW1wb3J0IHR5cGUgSUZpbHRlciBmcm9tIFwiLi9maWx0ZXJzL0ZpbHRlclwiO1xuXG4vLyBAVE9ETyBDYW52YXMgYW5kIFNWR1xuLy8gQFRPRE8gTGF6eSBsb2FkaW5nIGZvciBkaXYuc3R5bGUuYmFja2dyb3VuZC1pbWFnZT9cbi8vIEBUT0RPIDxkaXY+IGFuZCA8YT5cbi8vIEBUT0RPIHZpZGVvXG5cbi8vIGltcG9ydCB7IElJbWFnZUZpbHRlciB9IGZyb20gXCIuLi9GaWx0ZXIvSW1hZ2VGaWx0ZXJcIlxuXG5leHBvcnQgdHlwZSBJRE9NV2F0Y2hlciA9IHtcblx0d2F0Y2g6ICgpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBET01XYXRjaGVyIGltcGxlbWVudHMgSURPTVdhdGNoZXIge1xuXHRwcml2YXRlIHJlYWRvbmx5IG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuXHRwcml2YXRlIHJlYWRvbmx5IGZpbHRlcjogSUZpbHRlcjtcblxuXHRjb25zdHJ1Y3RvcihmaWx0ZXI6IElGaWx0ZXIpIHtcblx0XHR0aGlzLmZpbHRlciA9IGZpbHRlcjtcblx0XHR0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIodGhpcy5jYWxsYmFjay5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdHB1YmxpYyB3YXRjaCgpOiB2b2lkIHtcblx0XHR0aGlzLm9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIERPTVdhdGNoZXIuZ2V0Q29uZmlnKCkpO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBjYWxsYmFjayhtdXRhdGlvbnNMaXN0OiBNdXRhdGlvblJlY29yZFtdKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtdXRhdGlvbnNMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBtdXRhdGlvbiA9IG11dGF0aW9uc0xpc3RbaV07XG5cdFx0XHQvLyBpZiAoXG5cdFx0XHQvLyBcdG11dGF0aW9uLnR5cGUgPT09IFwiY2hpbGRMaXN0XCIgJiZcblx0XHRcdC8vIFx0bXV0YXRpb24uYWRkZWROb2Rlcy5sZW5ndGggPiAwXG5cdFx0XHQvLyApIHtcblx0XHRcdC8vIH1cblx0XHRcdGF3YWl0IHRoaXMuZmlsdGVyLmFuYWx5emUobXV0YXRpb24udGFyZ2V0KTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGZpbmRBbmRDaGVja0FsbEltYWdlcyhlbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG5cdFx0Y29uc3QgaW1hZ2VzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImltZ1wiKTtcblx0XHQvLyBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xuXHRcdC8vIHRoaXMuZmlsdGVyLmFuYWx5emUoaW1hZ2VzW2ldLCBmYWxzZSlcblx0XHQvLyB9XG5cdH1cblxuXHRwcml2YXRlIGNoZWNrQXR0cmlidXRlTXV0YXRpb24obXV0YXRpb246IE11dGF0aW9uUmVjb3JkKTogdm9pZCB7XG5cdFx0aWYgKChtdXRhdGlvbi50YXJnZXQgYXMgSFRNTEltYWdlRWxlbWVudCkubm9kZU5hbWUgPT09IFwiSU1HXCIpIHtcblx0XHRcdC8vIHRoaXMuZmlsdGVyLmFuYWx5emUoXG5cdFx0XHQvLyAgIG11dGF0aW9uLnRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50LFxuXHRcdFx0Ly8gbXV0YXRpb24uYXR0cmlidXRlTmFtZSA9PT0gXCJzcmNcIlxuXHRcdFx0Ly8gKVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldENvbmZpZygpOiBNdXRhdGlvbk9ic2VydmVySW5pdCB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHN1YnRyZWU6IHRydWUsXG5cdFx0XHRjaGlsZExpc3Q6IHRydWUsXG5cdFx0XHRhdHRyaWJ1dGVzOiB0cnVlLFxuXHRcdFx0YXR0cmlidXRlRmlsdGVyOiBbXCJzcmNcIl1cblx0XHR9O1xuXHR9XG59XG4iLCJleHBvcnRzLmludGVyb3BEZWZhdWx0ID0gZnVuY3Rpb24gKGEpIHtcbiAgcmV0dXJuIGEgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtkZWZhdWx0OiBhfTtcbn07XG5cbmV4cG9ydHMuZGVmaW5lSW50ZXJvcEZsYWcgPSBmdW5jdGlvbiAoYSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KTtcbn07XG5cbmV4cG9ydHMuZXhwb3J0QWxsID0gZnVuY3Rpb24gKHNvdXJjZSwgZGVzdCkge1xuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgPT09ICdkZWZhdWx0JyB8fCBrZXkgPT09ICdfX2VzTW9kdWxlJyB8fCBkZXN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwga2V5LCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Vba2V5XTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZXhwb3J0cy5leHBvcnQgPSBmdW5jdGlvbiAoZGVzdCwgZGVzdE5hbWUsIGdldCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgZGVzdE5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZ2V0LFxuICB9KTtcbn07XG4iLCJpbXBvcnQgUmVxdWVzdCwgeyBJVHlwZSB9IGZyb20gXCJ+bGliL1JlcXVlc3RcIjtcbmltcG9ydCB0eXBlIFJlc3BvbnNlIGZyb20gXCJ+bGliL1Jlc3BvbnNlXCI7XG5cbmltcG9ydCBiYXNlNjRUb0FycmF5QnVmZmVyIGZyb20gXCIuLi9iYXNlNjR0b0FycmF5QnVmZmVyXCI7XG5pbXBvcnQgbG9hZEltYWdlIGZyb20gXCIuLi9sb2FkSW1hZ2VcIjtcbmltcG9ydCBGaWx0ZXIgZnJvbSBcIi4vRmlsdGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlRmlsdGVyIGV4dGVuZHMgRmlsdGVyIHtcblx0cHVibGljIGFzeW5jIGFuYWx5emUodGFyZ2V0OiBFbGVtZW50KSB7XG5cdFx0aWYgKHRhcmdldC5ub2RlTmFtZSAhPT0gXCJJTUdcIikgcmV0dXJuO1xuXHRcdGNvbnN0IGltZyA9IHRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuXG5cdFx0Ly8gYW5hbHl6ZVxuXHRcdGltZy5zdHlsZS5ib3JkZXIgPSBcIjEwcHggc29saWQgYmx1ZVwiO1xuXHRcdC8vIGNoZWNrIGlmIGl0IGlzIGJhc2U2NFxuXHRcdC8vIG90aGVyd2lzZSwgZmV0Y2ggaW1hZ2UgZGF0YVxuXHRcdGlmICgvXmRhdGE6aW1hZ2VcXC9bYS16QS1aXSo7YmFzZTY0LC8udGVzdChpbWcuc3JjKSkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJiYXNlNjRcIiwgYmFzZTY0VG9BcnJheUJ1ZmZlcihpbWcuc3JjKSk7XG5cdFx0fVxuXHRcdC8vIGNvbnN0IGltZ0RhdGEgPSAvXmRhdGE6aW1hZ2VcXC9bYS16QS1aXSo7YmFzZTY0LC8udGVzdChpbWcuc3JjKVxuXHRcdC8vIFx0PyBiYXNlNjRUb0FycmF5QnVmZmVyKGltZy5zcmMpXG5cdFx0Ly8gXHQ6IGF3YWl0IGxvYWRJbWFnZShpbWcuc3JjKTtcblx0XHRjb25zdCBpbWdEYXRhID0gYXdhaXQgbG9hZEltYWdlKGltZy5zcmMpO1xuXHRcdGNvbnN0IHJlcSA9IG5ldyBSZXF1ZXN0KElUeXBlLklNQUdFLCBpbWdEYXRhLCB7XG5cdFx0XHR1cmw6IGltZy5zcmNcblx0XHR9KTtcblx0XHRjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShyZXEsIChyZXM6IFJlc3BvbnNlKSA9PiB7XG5cdFx0XHRpZiAoIXJlcykge1xuXHRcdFx0XHRpbWcuc3R5bGUuYm9yZGVyID0gXCIxMHB4IHNvbGlkIGdyYXlcIjtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgeyByZXN1bHQgfSA9IHJlcztcblx0XHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdFx0aW1nLnN0eWxlLmZpbHRlciA9IFwiYmx1cigyNXB4KVwiO1xuXHRcdFx0XHRjb25zb2xlLmxvZyh7IGltZyB9LCBcIiBpcyBuc2Z3XCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5sb2coeyBpbWcgfSwgXCIgaXMgbmV1dHJhbFwiKTtcblx0XHRcdH1cblx0XHRcdGltZy5zdHlsZS5ib3JkZXIgPSBcIjEwcHggc29saWQgcmVkXCI7XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIGFuYWx5emVJbWcoaW1nOiBIVE1MSW1hZ2VFbGVtZW50KSB7XG5cdFx0aW1nLnN0eWxlLmZpbHRlciA9IFwiYmx1cigyNXB4KVwiO1xuXHR9XG5cblx0ZmlsdGVyKCkge31cbn1cbiIsImV4cG9ydCBlbnVtIElUeXBlIHtcbiAgSU1BR0UgPSBcIklNQUdFXCIsXG4gIFZJREVPID0gXCJWSURFT1wiLFxuICBURVhUID0gXCJURVhUXCIsXG4gIElNR19EQVRBID0gXCJJTUdfREFUQVwiXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcXVlc3Qge1xuICB0eXBlOiBJVHlwZVxuICBwYXlsb2FkOiBhbnlcbiAgbWV0YTogUmVjb3JkPHN0cmluZywgYW55PlxuXG4gIGNvbnN0cnVjdG9yKHR5cGU6IElUeXBlLCBwYXlsb2FkOiBhbnksIG1ldGE/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG4gICAgdGhpcy50eXBlID0gdHlwZVxuICAgIHRoaXMucGF5bG9hZCA9IHBheWxvYWRcbiAgICB0aGlzLm1ldGEgPSBtZXRhXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJhc2U2NFRvQXJyYXlCdWZmZXIoYmFzZTY0KSB7XG5cdGNvbnN0IGJhc2U2NERhdGEgPSBiYXNlNjQucmVwbGFjZSgvXmRhdGE6aW1hZ2VcXC9bYS16QS1aXSo7YmFzZTY0LC8sIFwiXCIpO1xuXHRjb25zdCBieXRlQ2hhcmFjdGVycyA9IGF0b2IoYmFzZTY0RGF0YSk7XG5cdGNvbnN0IGJ5dGVOdW1iZXJzID0gbmV3IEFycmF5KGJ5dGVDaGFyYWN0ZXJzLmxlbmd0aCk7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZUNoYXJhY3RlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRieXRlTnVtYmVyc1tpXSA9IGJ5dGVDaGFyYWN0ZXJzLmNoYXJDb2RlQXQoaSk7XG5cdH1cblx0Ly8gY29uc3QgYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZU51bWJlcnMpO1xuXHQvLyBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZURhdGEoYnl0ZUFycmF5LCBpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuXHQvLyByZXR1cm4gaW1hZ2U7XG5cdHJldHVybiBieXRlTnVtYmVycztcbn1cbiIsImltcG9ydCB7IElNR19TSVpFLCBNSU5fSU1HX1NJWkUgfSBmcm9tIFwifmxpYi9jb25zdGFudHNcIjtcblxuY29uc3QgbG9hZEltYWdlID0gKHNyYzogc3RyaW5nKSA9PlxuXHRuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJsb2FkIGltYWdlIGRhdGFcIiwgc3JjKVxuXHRcdC8vIExvYWQgaW1hZ2UgKHdpdGggY3Jvc3NPcmlnaW4gc2V0IHRvIGFub255bW91c2Ugc28gdGhhdCBpdCBjYW4gYmUgdXNlZCBpbiBhXG5cdFx0Ly8gY2FudmFzIGxhdGVyKS5cblx0XHRjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcblx0XHRpbWcuY3Jvc3NPcmlnaW4gPSBcImFub255bW91c1wiO1xuXHRcdGltZy5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcblx0XHRcdHJlamVjdChcblx0XHRcdFx0bmV3IEVycm9yKGBDb3VsZCBub3QgbG9hZCBpbWFnZSBmcm9tIGV4dGVybmFsIHNvdXJjZSAke3NyY30uYClcblx0XHRcdCk7XG5cdFx0fTtcblx0XHRpbWcub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0KGltZy5oZWlnaHQgJiYgaW1nLmhlaWdodCA+IE1JTl9JTUdfU0laRSkgfHxcblx0XHRcdFx0KGltZy53aWR0aCAmJiBpbWcud2lkdGggPiBNSU5fSU1HX1NJWkUpXG5cdFx0XHQpIHtcblx0XHRcdFx0aW1nLndpZHRoID0gSU1HX1NJWkU7XG5cdFx0XHRcdGltZy5oZWlnaHQgPSBJTUdfU0laRTtcblx0XHRcdFx0Ly8gV2hlbiBpbWFnZSBpcyBsb2FkZWQsIHJlbmRlciBpdCB0byBhIGNhbnZhcyBhbmQgc2VuZCBpdHMgSW1hZ2VEYXRhIGJhY2tcblx0XHRcdFx0Ly8gdG8gdGhlIHNlcnZpY2Ugd29ya2VyLlxuXHRcdFx0XHRjb25zdCBjYW52YXMgPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKGltZy53aWR0aCwgaW1nLmhlaWdodCk7XG5cdFx0XHRcdGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cdFx0XHRcdGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcblx0XHRcdFx0Y29uc3QgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuXG5cdFx0XHRcdHJlc29sdmUoQXJyYXkuZnJvbShpbWFnZURhdGEuZGF0YSkpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gRmFpbCBvdXQgaWYgZWl0aGVyIGRpbWVuc2lvbiBpcyBsZXNzIHRoYW4gTUlOX0lNR19TSVpFLlxuXHRcdFx0cmVqZWN0KFxuXHRcdFx0XHRgSW1hZ2Ugc2l6ZSB0b28gc21hbGwuIFske2ltZy5oZWlnaHR9IHggJHtpbWcud2lkdGh9XSB2cy4gbWluaW11bSBbJHtNSU5fSU1HX1NJWkV9IHggJHtNSU5fSU1HX1NJWkV9XWBcblx0XHRcdCk7XG5cdFx0fTtcblx0XHRpbWcuc3JjID0gc3JjO1xuXHR9KTtcblxuZXhwb3J0IGRlZmF1bHQgbG9hZEltYWdlO1xuIiwiZXhwb3J0IGNvbnN0IElNR19TSVpFID0gMjI0O1xuZXhwb3J0IGNvbnN0IExPQURJTkdfVElNRU9VVCA9IDEwMDAwO1xuZXhwb3J0IGNvbnN0IE1JTl9JTUdfU0laRSA9IDY0O1xuIiwiaW1wb3J0IHR5cGUgUmVxdWVzdCBmcm9tIFwifmxpYi9SZXF1ZXN0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlciB7XG5cdGFuYWx5emU6ICh0YXJnZXQ6IGFueSkgPT4gUHJvbWlzZTxhbnk+O1xuXHRmaWx0ZXI6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbHRlciBpbXBsZW1lbnRzIElGaWx0ZXIge1xuXHRwdWJsaWMgYXN5bmMgYW5hbHl6ZSh0YXJnZXQ6IGFueSkge31cblxuXHRmaWx0ZXIoKSB7fVxufVxuIl0sIm5hbWVzIjpbXSwidmVyc2lvbiI6MywiZmlsZSI6ImNvbnRlbnQuNDgwYzAwYTMuanMubWFwIn0=
 globalThis.define=__define;  })(globalThis.define);
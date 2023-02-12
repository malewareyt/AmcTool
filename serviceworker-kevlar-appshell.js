/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';
var q, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    if (a == Array.prototype || a == Object.prototype) return a;
    a[b] = c.value;
    return a
};

function ba(a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c
    }
    throw Error("Cannot find global object");
}
var ca = ba(this);

function da(a, b) {
    if (b) a: {
        var c = ca;a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
            var e = a[d];
            if (!(e in c)) break a;
            c = c[e]
        }
        a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && aa(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}

function ea(a) {
    function b(d) {
        return a.next(d)
    }

    function c(d) {
        return a.throw(d)
    }
    return new Promise(function(d, e) {
        function f(g) {
            g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
        }
        f(a.next())
    })
}

function r(a) {
    return ea(a())
}

function fa(a, b) {
    a instanceof String && (a += "");
    var c = 0,
        d = !1,
        e = {
            next: function() {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
    e[Symbol.iterator] = function() {
        return e
    };
    return e
}
da("Array.prototype.values", function(a) {
    return a ? a : function() {
        return fa(this, function(b, c) {
            return c
        })
    }
});
da("Object.entries", function(a) {
    return a ? a : function(b) {
        var c = [],
            d;
        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push([d, b[d]]);
        return c
    }
});
da("Array.prototype.includes", function(a) {
    return a ? a : function(b, c) {
        var d = this;
        d instanceof String && (d = String(d));
        var e = d.length;
        c = c || 0;
        for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
            var f = d[c];
            if (f === b || Object.is(f, b)) return !0
        }
        return !1
    }
});
da("Object.values", function(a) {
    return a ? a : function(b) {
        var c = [],
            d;
        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
        return c
    }
});
da("String.prototype.matchAll", function(a) {
    return a ? a : function(b) {
        if (b instanceof RegExp && !b.global) throw new TypeError("RegExp passed into String.prototype.matchAll() must have global tag.");
        var c = new RegExp(b, b instanceof RegExp ? void 0 : "g"),
            d = this,
            e = !1,
            f = {
                next: function() {
                    if (e) return {
                        value: void 0,
                        done: !0
                    };
                    var g = c.exec(d);
                    if (!g) return e = !0, {
                        value: void 0,
                        done: !0
                    };
                    "" === g[0] && (c.lastIndex += 1);
                    return {
                        value: g,
                        done: !1
                    }
                }
            };
        f[Symbol.iterator] = function() {
            return f
        };
        return f
    }
});
da("Promise.prototype.finally", function(a) {
    return a ? a : function(b) {
        return this.then(function(c) {
            return Promise.resolve(b()).then(function() {
                return c
            })
        }, function(c) {
            return Promise.resolve(b()).then(function() {
                throw c;
            })
        })
    }
});
var u = this || self;

function v(a, b, c) {
    a = a.split(".");
    c = c || u;
    a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift());) a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
}

function y(a, b) {
    a = a.split(".");
    b = b || u;
    for (var c = 0; c < a.length; c++)
        if (b = b[a[c]], null == b) return null;
    return b
}

function ha(a) {
    var b = typeof a;
    b = "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null";
    return "array" == b || "object" == b && "number" == typeof a.length
}

function ia(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b
}

function ja(a, b, c) {
    return a.call.apply(a.bind, arguments)
}

function la(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var e = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(e, d);
            return a.apply(b, e)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
}

function ma(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ma = ja : ma = la;
    return ma.apply(null, arguments)
}

function na(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.eb = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.Qb = function(d, e, f) {
        for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
        return b.prototype[e].apply(d, g)
    }
};

function oa(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, oa);
    else {
        const c = Error().stack;
        c && (this.stack = c)
    }
    a && (this.message = String(a));
    void 0 !== b && (this.cause = b)
}
na(oa, Error);
oa.prototype.name = "CustomError";

function pa() {};

function qa(a, b) {
    Array.prototype.forEach.call(a, b, void 0)
}

function ra(a, b) {
    return Array.prototype.map.call(a, b, void 0)
}

function sa(a, b) {
    b = Array.prototype.indexOf.call(a, b, void 0);
    0 <= b && Array.prototype.splice.call(a, b, 1)
}

function ta(a, b) {
    for (let c = 1; c < arguments.length; c++) {
        const d = arguments[c];
        if (ha(d)) {
            const e = a.length || 0,
                f = d.length || 0;
            a.length = e + f;
            for (let g = 0; g < f; g++) a[e + g] = d[g]
        } else a.push(d)
    }
};

function ua(a) {
    var b = va;
    for (const c in b)
        if (a.call(void 0, b[c], c, b)) return c
}

function wa(a) {
    for (const b in a) return !1;
    return !0
}

function xa(a) {
    if (!a || "object" !== typeof a) return a;
    if ("function" === typeof a.clone) return a.clone();
    if ("undefined" !== typeof Map && a instanceof Map) return new Map(a);
    if ("undefined" !== typeof Set && a instanceof Set) return new Set(a);
    if (a instanceof Date) return new Date(a.getTime());
    const b = Array.isArray(a) ? [] : "function" !== typeof ArrayBuffer || "function" !== typeof ArrayBuffer.isView || !ArrayBuffer.isView(a) || a instanceof DataView ? {} : new a.constructor(a.length);
    for (const c in a) b[c] = xa(a[c]);
    return b
}
const ya = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

function za(a, b) {
    let c, d;
    for (let e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (let f = 0; f < ya.length; f++) c = ya[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};

function Aa() {}

function Ba(a) {
    return new Aa(Ca, a)
}
var Ca = {};
Ba("");
var Da = String.prototype.trim ? function(a) {
    return a.trim()
} : function(a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
};

function Ea() {
    var a = u.navigator;
    return a && (a = a.userAgent) ? a : ""
}

function z(a) {
    return -1 != Ea().indexOf(a)
};

function Fa() {
    return (z("Chrome") || z("CriOS")) && !z("Edge") || z("Silk")
};
var Ga = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

function Ha(a) {
    return a ? decodeURI(a) : a
}

function Ia(a, b, c) {
    if (Array.isArray(b))
        for (var d = 0; d < b.length; d++) Ia(a, String(b[d]), c);
    else null != b && c.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))))
}

function Ja(a) {
    var b = [],
        c;
    for (c in a) Ia(c, a[c], b);
    return b.join("&")
};

function Ka() {
    throw Error("Invalid UTF8");
}

function La(a, b) {
    b = String.fromCharCode.apply(null, b);
    return null == a ? b : a + b
}
let Ma = void 0,
    Na;
const Oa = "undefined" !== typeof TextDecoder;

function Pa(a) {
    u.setTimeout(() => {
        throw a;
    }, 0)
};
var Qa = z("Trident") || z("MSIE");
!z("Android") || Fa();
Fa();
var Ra = z("Safari") && !(Fa() || z("Coast") || z("Opera") || z("Edge") || z("Edg/") || z("OPR") || z("Firefox") || z("FxiOS") || z("Silk") || z("Android")) && !(z("iPhone") && !z("iPod") && !z("iPad") || z("iPad") || z("iPod"));
var Sa = {},
    Ta = null;

function Ua(a, b) {
    void 0 === b && (b = 0);
    Va();
    b = Sa[b];
    const c = Array(Math.floor(a.length / 3)),
        d = b[64] || "";
    let e = 0,
        f = 0;
    for (; e < a.length - 2; e += 3) {
        var g = a[e],
            h = a[e + 1],
            k = a[e + 2],
            l = b[g >> 2];
        g = b[(g & 3) << 4 | h >> 4];
        h = b[(h & 15) << 2 | k >> 6];
        k = b[k & 63];
        c[f++] = "" + l + g + h + k
    }
    l = 0;
    k = d;
    switch (a.length - e) {
        case 2:
            l = a[e + 1], k = b[(l & 15) << 2] || d;
        case 1:
            a = a[e], c[f] = "" + b[a >> 2] + b[(a & 3) << 4 | l >> 4] + k + d
    }
    return c.join("")
}

function Wa(a) {
    var b = a.length,
        c = 3 * b / 4;
    c % 3 ? c = Math.floor(c) : -1 != "=.".indexOf(a[b - 1]) && (c = -1 != "=.".indexOf(a[b - 2]) ? c - 2 : c - 1);
    var d = new Uint8Array(c),
        e = 0;
    Xa(a, function(f) {
        d[e++] = f
    });
    return e !== c ? d.subarray(0, e) : d
}

function Xa(a, b) {
    function c(k) {
        for (; d < a.length;) {
            var l = a.charAt(d++),
                m = Ta[l];
            if (null != m) return m;
            if (!/^[\s\xa0]*$/.test(l)) throw Error("Unknown base64 encoding at char: " + l);
        }
        return k
    }
    Va();
    for (var d = 0;;) {
        var e = c(-1),
            f = c(0),
            g = c(64),
            h = c(64);
        if (64 === h && -1 === e) break;
        b(e << 2 | f >> 4);
        64 != g && (b(f << 4 & 240 | g >> 2), 64 != h && b(g << 6 & 192 | h))
    }
}

function Va() {
    if (!Ta) {
        Ta = {};
        for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) {
            var d = a.concat(b[c].split(""));
            Sa[c] = d;
            for (var e = 0; e < d.length; e++) {
                var f = d[e];
                void 0 === Ta[f] && (Ta[f] = e)
            }
        }
    }
};
var Ya = "undefined" !== typeof Uint8Array;
const $a = !Qa && "function" === typeof u.btoa;

function ab(a) {
    if (!$a) return Ua(a);
    let b = "";
    for (; 10240 < a.length;) b += String.fromCharCode.apply(null, a.subarray(0, 10240)), a = a.subarray(10240);
    b += String.fromCharCode.apply(null, a);
    return btoa(b)
}
const bb = RegExp("[-_.]", "g");

function cb(a) {
    switch (a) {
        case "-":
            return "+";
        case "_":
            return "/";
        case ".":
            return "=";
        default:
            return ""
    }
}

function db(a) {
    if (!$a) return Wa(a);
    bb.test(a) && (a = a.replace(bb, cb));
    a = atob(a);
    const b = new Uint8Array(a.length);
    for (let c = 0; c < a.length; c++) b[c] = a.charCodeAt(c);
    return b
}

function eb(a) {
    return Ya && null != a && a instanceof Uint8Array
}
let fb;
var gb = {};
let hb;

function ib(a) {
    if (a !== gb) throw Error("illegal external caller");
}

function jb() {
    return hb || (hb = new kb(null, gb))
}

function lb(a) {
    ib(gb);
    var b = a.W;
    b = null == b || eb(b) ? b : "string" === typeof b ? db(b) : null;
    return null == b ? b : a.W = b
}
var kb = class {
    constructor(a, b) {
        ib(b);
        this.W = a;
        if (null != a && 0 === a.length) throw Error("ByteString should be constructed with non-empty values");
    }
    ya() {
        return null == this.W
    }
    sizeBytes() {
        const a = lb(this);
        return a ? a.length : 0
    }
};
const mb = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol() : void 0;

function nb(a, b) {
    if (mb) return a[mb] |= b;
    if (void 0 !== a.G) return a.G |= b;
    Object.defineProperties(a, {
        G: {
            value: b,
            configurable: !0,
            writable: !0,
            enumerable: !1
        }
    });
    return b
}

function ob(a, b) {
    mb ? a[mb] && (a[mb] &= ~b) : void 0 !== a.G && (a.G &= ~b)
}

function A(a) {
    let b;
    mb ? b = a[mb] : b = a.G;
    return null == b ? 0 : b
}

function pb(a, b) {
    mb ? a[mb] = b : void 0 !== a.G ? a.G = b : Object.defineProperties(a, {
        G: {
            value: b,
            configurable: !0,
            writable: !0,
            enumerable: !1
        }
    })
}

function qb(a) {
    nb(a, 1);
    return a
}

function rb(a) {
    return !!(A(a) & 2)
}

function sb(a, b) {
    pb(b, (a | 0) & -51)
}

function tb(a, b) {
    pb(b, (a | 18) & -41)
};
var ub = {};

function vb(a) {
    return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
}
let wb;
var xb;
const yb = [];
pb(yb, 23);
xb = Object.freeze(yb);

function zb(a) {
    if (rb(a.s)) throw Error("Cannot mutate an immutable Message");
}

function Ab(a) {
    var b = a.length;
    (b = b ? a[b - 1] : void 0) && vb(b) ? b.g = 1 : a.push({
        g: 1
    })
};

function Bb(a) {
    return a.displayName || a.name || "unknown type name"
}

function Cb(a, b) {
    if (!(a instanceof b)) throw Error(`Expected instanceof ${Bb(b)} but got ${a&&Bb(a.constructor)}`);
    return a
};

function Db(a) {
    const b = a.l + a.N;
    return a.C || (a.C = a.s[b] = {})
}

function B(a, b, c) {
    return -1 === b ? null : b >= a.l ? a.C ? a.C[b] : void 0 : c && a.C && (c = a.C[b], null != c) ? c : a.s[b + a.N]
}

function C(a, b, c, d) {
    zb(a);
    return Eb(a, b, c, d)
}

function Eb(a, b, c, d) {
    a.m && (a.m = void 0);
    if (b >= a.l || d) return Db(a)[b] = c, a;
    a.s[b + a.N] = c;
    (c = a.C) && b in c && delete c[b];
    return a
}

function Fb(a, b, c, d, e) {
    let f = B(a, b, d);
    Array.isArray(f) || (f = xb);
    const g = A(f);
    g & 1 || qb(f);
    if (e) g & 2 || nb(f, 2), c & 1 || Object.freeze(f);
    else {
        e = !(c & 2);
        const h = g & 2;
        c & 1 || !h ? e && g & 16 && !h && ob(f, 16) : (f = qb(Array.prototype.slice.call(f)), Eb(a, b, f, d))
    }
    return f
}

function Gb(a, b, c, d) {
    zb(a);
    (c = Hb(a, c)) && c !== b && null != d && Eb(a, c, void 0, !1);
    return Eb(a, b, d)
}

function Hb(a, b) {
    let c = 0;
    for (let d = 0; d < b.length; d++) {
        const e = b[d];
        null != B(a, e) && (0 !== c && Eb(a, c, void 0, !1), c = e)
    }
    return c
}

function Ib(a, b, c) {
    var d = B(a, c, !1); {
        let f = !1;
        var e = null == d || "object" !== typeof d || (f = Array.isArray(d)) || d.ja !== ub ? f ? new b(d) : void 0 : d
    }
    e !== d && null != e && (Eb(a, c, e, !1), nb(e.s, A(a.s) & 18));
    b = e;
    if (null == b) return b;
    rb(a.s) || (d = Jb(b), d !== b && (b = d, Eb(a, c, b, !1)));
    return b
}

function Kb(a, b, c, d, e) {
    a.i || (a.i = {});
    var f = a.i[c],
        g = Fb(a, c, 3, void 0, e);
    if (!f) {
        var h = g;
        f = [];
        var k = !!(A(a.s) & 16);
        g = rb(h);
        const t = h;
        !e && g && (h = Array.prototype.slice.call(h));
        var l = g;
        let p = 0;
        for (; p < h.length; p++) {
            var m = h[p];
            m = Array.isArray(m) ? new b(m) : void 0;
            if (void 0 === m) continue;
            var n = m.s;
            const x = A(n);
            let w = x;
            g && (w |= 2);
            k && (w |= 16);
            w != x && pb(n, w);
            n = w;
            l = l || !!(2 & n);
            f.push(m)
        }
        a.i[c] = f;
        k = A(h);
        b = k | 33;
        b = l ? b & -9 : b | 8;
        k != b && (l = h, Object.isFrozen(l) && (l = Array.prototype.slice.call(l)), pb(l, b), h = l);
        t !== h && Eb(a, c, h);
        (e ||
            d && g) && nb(f, 2);
        d && Object.freeze(f);
        return f
    }
    e || (e = Object.isFrozen(f), d && !e ? Object.freeze(f) : !d && e && (f = Array.prototype.slice.call(f), a.i[c] = f));
    return f
}

function Lb(a, b, c) {
    var d = rb(a.s);
    b = Kb(a, b, c, d, d);
    a = Fb(a, c, 3, void 0, d);
    if (!(d || A(a) & 8)) {
        for (d = 0; d < b.length; d++) {
            c = b[d];
            const e = Jb(c);
            c !== e && (b[d] = e, a[d] = e.s)
        }
        nb(a, 8)
    }
    return b
}

function D(a, b, c, d) {
    zb(a);
    null != d ? Cb(d, b) : d = void 0;
    return Eb(a, c, d)
}

function Mb(a, b, c, d, e) {
    zb(a);
    null != e ? Cb(e, b) : e = void 0;
    Gb(a, c, d, e)
}

function Nb(a, b, c, d) {
    zb(a);
    const e = Kb(a, c, b, !1, !1);
    c = null != d ? Cb(d, c) : new c;
    a = Fb(a, b, 2, void 0, !1);
    e.push(c);
    a.push(c.s);
    c.I() && ob(a, 8);
    return c
}

function Ob(a, b) {
    a = B(a, b);
    return null == a ? "" : a
};
let Pb;

function Qb(a) {
    switch (typeof a) {
        case "number":
            return isFinite(a) ? a : String(a);
        case "object":
            if (a)
                if (Array.isArray(a)) {
                    if (0 !== (A(a) & 128)) return a = Array.prototype.slice.call(a), Ab(a), a
                } else {
                    if (eb(a)) return ab(a);
                    if (a instanceof kb) {
                        const b = a.W;
                        return null == b ? "" : "string" === typeof b ? b : a.W = ab(b)
                    }
                }
    }
    return a
};

function Rb(a, b, c, d) {
    if (null != a) {
        if (Array.isArray(a)) a = Sb(a, b, c, void 0 !== d);
        else if (vb(a)) {
            const e = {};
            for (let f in a) e[f] = Rb(a[f], b, c, d);
            a = e
        } else a = b(a, d);
        return a
    }
}

function Sb(a, b, c, d) {
    const e = A(a);
    d = d ? !!(e & 16) : void 0;
    a = Array.prototype.slice.call(a);
    for (let f = 0; f < a.length; f++) a[f] = Rb(a[f], b, c, d);
    c(e, a);
    return a
}

function Tb(a) {
    return a.ja === ub ? a.toJSON() : Qb(a)
}

function Ub(a, b) {
    a & 128 && Ab(b)
};

function Vb(a, b, c = tb) {
    if (null != a) {
        if (Ya && a instanceof Uint8Array) return a.length ? new kb(new Uint8Array(a), gb) : jb();
        if (Array.isArray(a)) {
            const d = A(a);
            if (d & 2) return a;
            if (b && !(d & 32) && (d & 16 || 0 === d)) return pb(a, d | 2), a;
            a = Sb(a, Vb, d & 4 ? tb : c, !0);
            b = A(a);
            b & 4 && b & 2 && Object.freeze(a);
            return a
        }
        return a.ja === ub ? Wb(a) : a
    }
}

function Xb(a, b, c, d, e, f, g) {
    if (a = a.i && a.i[c]) {
        d = 0 < a.length ? a[0].constructor : void 0;
        f = A(a);
        f & 2 || (a = ra(a, Wb), tb(f, a), Object.freeze(a));
        zb(b);
        g = null == a ? xb : qb([]);
        if (null != a) {
            f = !!a.length;
            for (let h = 0; h < a.length; h++) {
                const k = a[h];
                Cb(k, d);
                f = f && !rb(k.s);
                g[h] = k.s
            }
            d = g;
            f = (f ? 8 : 0) | 1;
            g = A(d);
            (g & f) !== f && (Object.isFrozen(d) && (d = Array.prototype.slice.call(d)), pb(d, g | f));
            g = d;
            b.i || (b.i = {});
            b.i[c] = a
        } else b.i && (b.i[c] = void 0);
        Eb(b, c, g, e)
    } else C(b, c, Vb(d, f, g), e)
}

function Wb(a) {
    if (rb(a.s)) return a;
    a = Yb(a, !0);
    nb(a.s, 2);
    return a
}

function Yb(a, b) {
    var c = a.s,
        d = [];
    nb(d, 16);
    var e = a.constructor.h;
    e && d.push(e);
    e = a.C;
    if (e) {
        d.length = c.length;
        d.fill(void 0, d.length, c.length);
        var f = {};
        d[d.length - 1] = f
    }
    0 !== (A(c) & 128) && Ab(d);
    b = b || a.I() ? tb : sb;
    f = a.constructor;
    Pb = d;
    d = new f(d);
    Pb = void 0;
    a.Y && (d.Y = a.Y.slice());
    f = !!(A(c) & 16);
    var g = e ? c.length - 1 : c.length;
    for (let h = 0; h < g; h++) Xb(a, d, h - a.N, c[h], !1, f, b);
    if (e)
        for (const h in e) c = e[h], g = +h, Number.isNaN(g), Xb(a, d, g, c, !0, f, b);
    return d
}

function Jb(a) {
    if (!rb(a.s)) return a;
    const b = Yb(a, !1);
    b.m = a;
    return b
};

function Zb(a) {
    wb = !0;
    try {
        return JSON.stringify(a.toJSON(), $b)
    } finally {
        wb = !1
    }
}
var E = class {
    constructor(a, b, c) {
        null == a && (a = Pb);
        Pb = void 0;
        var d = 0 < (this.constructor.i || 0),
            e = this.constructor.h,
            f = !1;
        if (null == a) {
            a = e ? [e] : [];
            var g = 48;
            var h = !0;
            d && (g |= 128);
            pb(a, g)
        } else {
            if (!Array.isArray(a)) throw Error();
            if (e && e !== a[0]) throw Error();
            let k = g = nb(a, 0);
            if (h = 0 !== (16 & k))(f = 0 !== (32 & k)) || (k |= 32);
            if (d) {
                if (0 < a.length) {
                    const l = a[a.length - 1];
                    if (vb(l) && "g" in l) {
                        k |= 128;
                        delete l.g;
                        let m = !0;
                        for (let n in l) {
                            m = !1;
                            break
                        }
                        m && a.pop()
                    } else throw Error();
                }
            } else if (128 & k) throw Error();
            g !== k && pb(a, k)
        }
        this.N = e ?
            0 : -1;
        this.i = void 0;
        this.s = a;
        a: {
            g = this.s.length;e = g - 1;
            if (g && (g = this.s[e], vb(g))) {
                this.C = g;
                this.l = e - this.N;
                break a
            }
            void 0 !== b && -1 < b ? (this.l = Math.max(b, e + 1 - this.N), this.C = void 0) : this.l = Number.MAX_VALUE
        }
        if (!d && this.C && "g" in this.C) throw Error('Unexpected "g" flag in sparse object of message that is not a group type.');
        if (c) {
            b = h && !f && !0;
            d = this.l;
            let k;
            for (h = 0; h < c.length; h++) f = c[h], f < d ? (f += this.N, (e = a[f]) ? ac(e, b) : a[f] = xb) : (k || (k = Db(this)), (e = k[f]) ? ac(e, b) : k[f] = xb)
        }
    }
    toJSON() {
        const a = bc(this.s);
        return wb ?
            a : Sb(a, Tb, Ub)
    }
    clone() {
        return Yb(this, !1)
    }
    I() {
        return rb(this.s)
    }
};

function ac(a, b) {
    if (Array.isArray(a)) {
        var c = A(a),
            d = 1;
        !b || c & 2 || (d |= 16);
        (c & d) !== d && pb(a, c | d)
    }
}
E.prototype.ja = ub;

function $b(a, b) {
    return Qb(b)
}

function bc(a) {
    let b, c = a.length,
        d = !1;
    for (let g = a.length; g--;) {
        let h = a[g];
        if (Array.isArray(h)) {
            var e = h;
            Array.isArray(h) && A(h) & 1 && !h.length ? h = null : h = bc(h);
            h != e && (d = !0)
        } else if (g === a.length - 1 && vb(h)) {
            a: {
                var f = h;e = {};
                let k = !1;
                for (let l in f) {
                    let m = f[l];
                    if (Array.isArray(m)) {
                        let n = m;
                        Array.isArray(m) && A(m) & 1 && !m.length ? m = null : m = bc(m);
                        m != n && (k = !0)
                    }
                    null != m ? e[l] = m : k = !0
                }
                if (k) {
                    for (let l in e) {
                        f = e;
                        break a
                    }
                    f = null
                }
            }
            f != h && (d = !0);c--;
            continue
        }
        null == h && c == g + 1 ? (d = !0, c--) : d && (b || (b = Array.prototype.slice.call(a, 0, c),
            sb(A(a), b)), b[g] = h)
    }
    if (!d) return a;
    b || (b = Array.prototype.slice.call(a, 0, c), sb(A(a), b));
    f && b.push(f);
    return b
};

function cc(a, b) {
    return Error(`Invalid wire type: ${a} (at position ${b})`)
}

function dc() {
    return Error("Failed to read varint, encoding is invalid.")
}

function ec(a, b) {
    return Error(`Tried to read past the end of the data ${b} > ${a}`)
};

function fc(a) {
    if ("string" === typeof a) return {
        buffer: db(a),
        I: !1
    };
    if (Array.isArray(a)) return {
        buffer: new Uint8Array(a),
        I: !1
    };
    if (a.constructor === Uint8Array) return {
        buffer: a,
        I: !1
    };
    if (a.constructor === ArrayBuffer) return {
        buffer: new Uint8Array(a),
        I: !1
    };
    if (a.constructor === kb) return {
        buffer: lb(a) || fb || (fb = new Uint8Array(0)),
        I: !0
    };
    if (a instanceof Uint8Array) return {
        buffer: new Uint8Array(a.buffer, a.byteOffset, a.byteLength),
        I: !1
    };
    throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
};
const gc = "function" === typeof Uint8Array.prototype.slice;

function hc(a, b) {
    a.h = b;
    if (b > a.i) throw ec(a.i, b);
}

function ic(a) {
    const b = a.j;
    let c = a.h,
        d = b[c++],
        e = d & 127;
    if (d & 128 && (d = b[c++], e |= (d & 127) << 7, d & 128 && (d = b[c++], e |= (d & 127) << 14, d & 128 && (d = b[c++], e |= (d & 127) << 21, d & 128 && (d = b[c++], e |= d << 28, d & 128 && b[c++] & 128 && b[c++] & 128 && b[c++] & 128 && b[c++] & 128 && b[c++] & 128))))) throw dc();
    hc(a, c);
    return e
}

function jc(a, b) {
    if (0 > b) throw Error(`Tried to read a negative byte length: ${b}`);
    const c = a.h,
        d = c + b;
    if (d > a.i) throw ec(b, a.i - c);
    a.h = d;
    return c
}
var kc = class {
        constructor(a, b) {
            this.j = null;
            this.m = !1;
            this.h = this.i = this.l = 0;
            this.init(a, void 0, void 0, b)
        }
        init(a, b, c, {
            ea: d = !1
        } = {}) {
            this.ea = d;
            a && (a = fc(a), this.j = a.buffer, this.m = a.I, this.l = b || 0, this.i = void 0 !== c ? this.l + c : this.j.length, this.h = this.l)
        }
        clear() {
            this.j = null;
            this.m = !1;
            this.h = this.i = this.l = 0;
            this.ea = !1
        }
        reset() {
            this.h = this.l
        }
        advance(a) {
            hc(this, this.h + a)
        }
    },
    lc = [];

function mc(a, {
    sa: b = !1
} = {}) {
    a.sa = b
}

function nc(a) {
    var b = a.h;
    if (b.h == b.i) return !1;
    a.j = a.h.h;
    var c = ic(a.h) >>> 0;
    b = c >>> 3;
    c &= 7;
    if (!(0 <= c && 5 >= c)) throw cc(c, a.j);
    if (1 > b) throw Error(`Invalid field number: ${b} (at position ${a.j})`);
    a.l = b;
    a.i = c;
    return !0
}

function oc(a) {
    switch (a.i) {
        case 0:
            if (0 != a.i) oc(a);
            else a: {
                a = a.h;
                var b = a.h;
                const c = b + 10,
                    d = a.j;
                for (; b < c;)
                    if (0 === (d[b++] & 128)) {
                        hc(a, b);
                        break a
                    }
                throw dc();
            }
            break;
        case 1:
            a.h.advance(8);
            break;
        case 2:
            2 != a.i ? oc(a) : (b = ic(a.h) >>> 0, a.h.advance(b));
            break;
        case 5:
            a.h.advance(4);
            break;
        case 3:
            b = a.l;
            do {
                if (!nc(a)) throw Error("Unmatched start-group tag: stream EOF");
                if (4 == a.i) {
                    if (a.l != b) throw Error("Unmatched end-group tag");
                    break
                }
                oc(a)
            } while (1);
            break;
        default:
            throw cc(a.i, a.j);
    }
}
var pc = class {
        constructor(a, b) {
            if (lc.length) {
                const c = lc.pop();
                c.init(a, void 0, void 0, b);
                a = c
            } else a = new kc(a, b);
            this.h = a;
            this.j = this.h.h;
            this.i = this.l = -1;
            mc(this, b)
        }
        reset() {
            this.h.reset();
            this.j = this.h.h;
            this.i = this.l = -1
        }
        advance(a) {
            this.h.advance(a)
        }
    },
    qc = [];
const rc = Symbol();

function sc(a, b, c) {
    return a[rc] || (a[rc] = (d, e) => b(d, e, c))
}

function tc(a) {
    let b = a[rc];
    if (!b) {
        const c = uc(a);
        b = (d, e) => vc(d, e, c);
        a[rc] = b
    }
    return b
}

function wc(a) {
    var b = a.Rb;
    if (b) return tc(b);
    if (b = a.bc) return sc(a.Qa.fa, b, a.ac)
}

function xc(a) {
    const b = wc(a),
        c = a.Qa,
        d = a.jc.ba;
    return b ? (e, f) => d(e, f, c, b) : (e, f) => d(e, f, c)
}

function yc(a, b) {
    let c = a[b];
    "function" == typeof c && 0 === c.length && (c = c(), a[b] = c);
    return Array.isArray(c) && (zc in c || Ac in c || 0 < c.length && "function" == typeof c[0]) ? c : void 0
}
const Ac = Symbol(),
    zc = Symbol();

function Bc(a, b) {
    a[0] = b
}

function Cc(a, b, c, d) {
    const e = c.ba;
    a[b] = d ? (f, g, h) => e(f, g, h, d) : e
}

function Dc(a, b, c, d, e) {
    const f = c.ba,
        g = tc(d),
        h = uc(d).fa;
    a[b] = (k, l, m) => f(k, l, m, h, g, e)
}

function Ec(a, b, c, d, e, f, g) {
    const h = c.ba,
        k = sc(d, e, f);
    a[b] = (l, m, n) => h(l, m, n, d, k, g)
}

function uc(a) {
    var b = a[zc];
    if (b) return b;
    b = a[zc] = {};
    var c = Bc,
        d = Cc,
        e = Dc,
        f = Ec;
    b.fa = a[0];
    let g = 1;
    if (a.length > g && "number" !== typeof a[g]) {
        var h = a[g++];
        c(b, h)
    }
    for (; g < a.length;) {
        c = a[g++];
        for (var k = g + 1; k < a.length && "number" !== typeof a[k];) k++;
        h = a[g++];
        k -= g;
        switch (k) {
            case 0:
                d(b, c, h);
                break;
            case 1:
                (k = yc(a, g)) ? (g++, e(b, c, h, k)) : d(b, c, h, a[g++]);
                break;
            case 2:
                k = b;
                var l = g++;
                l = yc(a, l);
                e(k, c, h, l, a[g++]);
                break;
            case 3:
                f(b, c, h, a[g++], a[g++], a[g++]);
                break;
            case 4:
                f(b, c, h, a[g++], a[g++], a[g++], a[g++]);
                break;
            default:
                throw Error("unexpected number of binary field arguments: " +
                    k);
        }
    }
    zc in a && Ac in a && (a.length = 0);
    return b
}

function vc(a, b, c) {
    for (; nc(b) && 4 != b.i;) {
        var d = b.l,
            e = c[d];
        if (!e) {
            var f = c[0];
            f && (f = f[d]) && (e = c[d] = xc(f))
        }
        if (!e || !e(b, a, d))
            if (f = b, d = a, e = f.j, oc(f), !f.sa) {
                var g = f.h.h - e;
                f.h.h = e;
                a: {
                    f = f.h;e = g;
                    if (0 == e) {
                        e = jb();
                        break a
                    }
                    const h = jc(f, e);f.ea && f.m ? e = f.j.subarray(h, h + e) : (f = f.j, g = h, e = h + e, e = g === e ? fb || (fb = new Uint8Array(0)) : gc ? f.slice(g, e) : new Uint8Array(f.subarray(g, e)));e = 0 == e.length ? jb() : new kb(e, gb)
                }(f = d.Y) ? f.push(e) : d.Y = [e]
            }
    }
    return a
}

function Fc(a, b) {
    return {
        ba: a,
        tc: b
    }
}
var Gc = Fc(function(a, b, c) {
        if (2 !== a.i) return !1;
        var d = ic(a.h) >>> 0;
        a = a.h;
        var e = jc(a, d);
        a = a.j;
        if (Oa) {
            var f = a,
                g;
            (g = Na) || (g = Na = new TextDecoder("utf-8", {
                fatal: !0
            }));
            a = e + d;
            f = 0 === e && a === f.length ? f : f.subarray(e, a);
            try {
                var h = g.decode(f)
            } catch (l) {
                if (void 0 === Ma) {
                    try {
                        g.decode(new Uint8Array([128]))
                    } catch (m) {}
                    try {
                        g.decode(new Uint8Array([97])), Ma = !0
                    } catch (m) {
                        Ma = !1
                    }
                }!Ma && (Na = void 0);
                throw l;
            }
        } else {
            h = e;
            d = h + d;
            e = [];
            let l = null;
            let m;
            for (; h < d;) {
                var k = a[h++];
                128 > k ? e.push(k) : 224 > k ? h >= d ? Ka() : (m = a[h++], 194 > k || 128 !== (m & 192) ?
                    (h--, Ka()) : e.push((k & 31) << 6 | m & 63)) : 240 > k ? h >= d - 1 ? Ka() : (m = a[h++], 128 !== (m & 192) || 224 === k && 160 > m || 237 === k && 160 <= m || 128 !== ((f = a[h++]) & 192) ? (h--, Ka()) : e.push((k & 15) << 12 | (m & 63) << 6 | f & 63)) : 244 >= k ? h >= d - 2 ? Ka() : (m = a[h++], 128 !== (m & 192) || 0 !== (k << 28) + (m - 144) >> 30 || 128 !== ((f = a[h++]) & 192) || 128 !== ((g = a[h++]) & 192) ? (h--, Ka()) : (k = (k & 7) << 18 | (m & 63) << 12 | (f & 63) << 6 | g & 63, k -= 65536, e.push((k >> 10 & 1023) + 55296, (k & 1023) + 56320))) : Ka();
                8192 <= e.length && (l = La(l, e), e.length = 0)
            }
            h = La(l, e)
        }
        C(b, c, h);
        return !0
    }, function(a, b, c) {
        a.i(c, B(b, c))
    }),
    Hc = Fc(function(a, b, c, d, e) {
        if (2 !== a.i) return !1;
        b = Nb(b, c, d);
        c = a.h.i;
        d = ic(a.h) >>> 0;
        const f = a.h.h + d;
        let g = f - c;
        0 >= g && (a.h.i = f, e(b, a, void 0, void 0, void 0), g = f - a.h.h);
        if (g) throw Error("Message parsing ended unexpectedly. Expected to read " + `${d} bytes, instead read ${d-g} bytes, either the ` + "data ended unexpectedly or the message misreported its own length");
        a.h.h = f;
        a.h.i = c;
        return !0
    }, function(a, b, c, d, e) {
        a.h(c, Lb(b, d, c), e)
    });
Ba("csi.gstatic.com");
Ba("googleads.g.doubleclick.net");
Ba("partner.googleadservices.com");
Ba("pubads.g.doubleclick.net");
Ba("securepubads.g.doubleclick.net");
Ba("tpc.googlesyndication.com");

function Ic(a, b) {
    this.x = void 0 !== a ? a : 0;
    this.y = void 0 !== b ? b : 0
}
Ic.prototype.clone = function() {
    return new Ic(this.x, this.y)
};
Ic.prototype.ceil = function() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this
};
Ic.prototype.floor = function() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this
};
Ic.prototype.round = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this
};

function Jc(a, b) {
    for (var c = 0; a;) {
        if (b(a)) return a;
        a = a.parentNode;
        c++
    }
    return null
};

function Kc(a) {
    var b = y("window.location.href");
    null == a && (a = 'Unknown Error of type "null/undefined"');
    if ("string" === typeof a) return {
        message: a,
        name: "Unknown error",
        lineNumber: "Not available",
        fileName: b,
        stack: "Not available"
    };
    var c = !1;
    try {
        var d = a.lineNumber || a.line || "Not available"
    } catch (g) {
        d = "Not available", c = !0
    }
    try {
        var e = a.fileName || a.filename || a.sourceURL || u.$googDebugFname || b
    } catch (g) {
        e = "Not available", c = !0
    }
    b = Lc(a);
    if (!(!c && a.lineNumber && a.fileName && a.stack && a.message && a.name)) {
        c = a.message;
        if (null ==
            c) {
            if (a.constructor && a.constructor instanceof Function) {
                if (a.constructor.name) c = a.constructor.name;
                else if (c = a.constructor, Mc[c]) c = Mc[c];
                else {
                    c = String(c);
                    if (!Mc[c]) {
                        var f = /function\s+([^\(]+)/m.exec(c);
                        Mc[c] = f ? f[1] : "[Anonymous]"
                    }
                    c = Mc[c]
                }
                c = 'Unknown Error of type "' + c + '"'
            } else c = "Unknown Error of unknown type";
            "function" === typeof a.toString && Object.prototype.toString !== a.toString && (c += ": " + a.toString())
        }
        return {
            message: c,
            name: a.name || "UnknownError",
            lineNumber: d,
            fileName: e,
            stack: b || "Not available"
        }
    }
    a.stack =
        b;
    return {
        message: a.message,
        name: a.name,
        lineNumber: a.lineNumber,
        fileName: a.fileName,
        stack: a.stack
    }
}

function Lc(a, b) {
    b || (b = {});
    b[Nc(a)] = !0;
    var c = a.stack || "";
    (a = a.cause) && !b[Nc(a)] && (c += "\nCaused by: ", a.stack && 0 == a.stack.indexOf(a.toString()) || (c += "string" === typeof a ? a : a.message + "\n"), c += Lc(a, b));
    return c
}

function Nc(a) {
    var b = "";
    "function" === typeof a.toString && (b = "" + a);
    return b + a.stack
}
var Mc = {};

function Oc(a) {
    if (!a) return "";
    if (/^about:(?:blank|srcdoc)$/.test(a)) return window.origin || "";
    a = a.split("#")[0].split("?")[0];
    a = a.toLowerCase();
    0 == a.indexOf("//") && (a = window.location.protocol + a);
    /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
    var b = a.substring(a.indexOf("://") + 3),
        c = b.indexOf("/"); - 1 != c && (b = b.substring(0, c));
    c = a.substring(0, a.indexOf("://"));
    if (!c) throw Error("URI is missing protocol: " + a);
    if ("http" !== c && "https" !== c && "chrome-extension" !== c && "moz-extension" !== c && "file" !== c && "android-app" !==
        c && "chrome-search" !== c && "chrome-untrusted" !== c && "chrome" !== c && "app" !== c && "devtools" !== c) throw Error("Invalid URI scheme in origin: " + c);
    a = "";
    var d = b.indexOf(":");
    if (-1 != d) {
        var e = b.substring(d + 1);
        b = b.substring(0, d);
        if ("http" === c && "80" !== e || "https" === c && "443" !== e) a = ":" + e
    }
    return c + "://" + b + a
};
var Pc = "client_dev_domain client_dev_regex_map client_dev_root_url client_rollout_override expflag forcedCapability jsfeat jsmode mods".split(" "),
    Qc = [...Pc, "client_dev_set_cookie"];

function Rc() {
    function a() {
        e[0] = 1732584193;
        e[1] = 4023233417;
        e[2] = 2562383102;
        e[3] = 271733878;
        e[4] = 3285377520;
        m = l = 0
    }

    function b(n) {
        for (var t = g, p = 0; 64 > p; p += 4) t[p / 4] = n[p] << 24 | n[p + 1] << 16 | n[p + 2] << 8 | n[p + 3];
        for (p = 16; 80 > p; p++) n = t[p - 3] ^ t[p - 8] ^ t[p - 14] ^ t[p - 16], t[p] = (n << 1 | n >>> 31) & 4294967295;
        n = e[0];
        var x = e[1],
            w = e[2],
            F = e[3],
            Za = e[4];
        for (p = 0; 80 > p; p++) {
            if (40 > p)
                if (20 > p) {
                    var L = F ^ x & (w ^ F);
                    var ka = 1518500249
                } else L = x ^ w ^ F, ka = 1859775393;
            else 60 > p ? (L = x & w | F & (x | w), ka = 2400959708) : (L = x ^ w ^ F, ka = 3395469782);
            L = ((n << 5 | n >>> 27) & 4294967295) + L + Za + ka + t[p] & 4294967295;
            Za = F;
            F = w;
            w = (x << 30 | x >>> 2) & 4294967295;
            x = n;
            n = L
        }
        e[0] = e[0] + n & 4294967295;
        e[1] = e[1] + x & 4294967295;
        e[2] = e[2] + w & 4294967295;
        e[3] = e[3] + F & 4294967295;
        e[4] = e[4] + Za & 4294967295
    }

    function c(n, t) {
        if ("string" === typeof n) {
            n = unescape(encodeURIComponent(n));
            for (var p = [], x = 0, w = n.length; x < w; ++x) p.push(n.charCodeAt(x));
            n = p
        }
        t || (t = n.length);
        p = 0;
        if (0 == l)
            for (; p + 64 < t;) b(n.slice(p, p + 64)), p += 64, m += 64;
        for (; p < t;)
            if (f[l++] = n[p++], m++, 64 == l)
                for (l = 0, b(f); p + 64 < t;) b(n.slice(p, p + 64)), p += 64, m += 64
    }

    function d() {
        var n = [],
            t = 8 * m;
        56 > l ? c(h, 56 - l) : c(h, 64 - (l - 56));
        for (var p = 63; 56 <= p; p--) f[p] = t & 255, t >>>= 8;
        b(f);
        for (p = t = 0; 5 > p; p++)
            for (var x = 24; 0 <= x; x -= 8) n[t++] = e[p] >> x & 255;
        return n
    }
    for (var e = [], f = [], g = [], h = [128], k = 1; 64 > k; ++k) h[k] = 0;
    var l, m;
    a();
    return {
        reset: a,
        update: c,
        digest: d,
        Oa: function() {
            for (var n = d(), t = "", p = 0; p < n.length; p++) t += "0123456789ABCDEF".charAt(Math.floor(n[p] / 16)) + "0123456789ABCDEF".charAt(n[p] % 16);
            return t
        }
    }
};

function Sc(a, b, c) {
    var d = String(u.location.href);
    return d && a && b ? [b, Tc(Oc(d), a, c || null)].join(" ") : null
}

function Tc(a, b, c) {
    var d = [],
        e = [];
    if (1 == (Array.isArray(c) ? 2 : 1)) return e = [b, a], qa(d, function(h) {
        e.push(h)
    }), Uc(e.join(" "));
    var f = [],
        g = [];
    qa(c, function(h) {
        g.push(h.key);
        f.push(h.value)
    });
    c = Math.floor((new Date).getTime() / 1E3);
    e = 0 == f.length ? [c, b, a] : [f.join(":"), c, b, a];
    qa(d, function(h) {
        e.push(h)
    });
    a = Uc(e.join(" "));
    a = [c, a];
    0 == g.length || a.push(g.join(""));
    return a.join("_")
}

function Uc(a) {
    var b = Rc();
    b.update(a);
    return b.Oa().toLowerCase()
};
const Vc = {};

function Wc() {
    this.h = document || {
        cookie: ""
    }
}
q = Wc.prototype;
q.isEnabled = function() {
    if (!u.navigator.cookieEnabled) return !1;
    if (!this.ya()) return !0;
    this.set("TESTCOOKIESENABLED", "1", {
        za: 60
    });
    if ("1" !== this.get("TESTCOOKIESENABLED")) return !1;
    this.remove("TESTCOOKIESENABLED");
    return !0
};
q.set = function(a, b, c) {
    let d, e, f, g = !1,
        h;
    "object" === typeof c && (h = c.nc, g = c.oc || !1, f = c.domain || void 0, e = c.path || void 0, d = c.za);
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    void 0 === d && (d = -1);
    this.h.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (e ? ";path=" + e : "") + (0 > d ? "" : 0 == d ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(Date.now() + 1E3 * d)).toUTCString()) + (g ? ";secure" : "") + (null != h ? ";samesite=" + h : "")
};
q.get = function(a, b) {
    const c = a + "=",
        d = (this.h.cookie || "").split(";");
    for (let e = 0, f; e < d.length; e++) {
        f = Da(d[e]);
        if (0 == f.lastIndexOf(c, 0)) return f.slice(c.length);
        if (f == a) return ""
    }
    return b
};
q.remove = function(a, b, c) {
    const d = void 0 !== this.get(a);
    this.set(a, "", {
        za: 0,
        path: b,
        domain: c
    });
    return d
};
q.ya = function() {
    return !this.h.cookie
};
q.clear = function() {
    var a = (this.h.cookie || "").split(";");
    const b = [],
        c = [];
    let d, e;
    for (let f = 0; f < a.length; f++) e = Da(a[f]), d = e.indexOf("="), -1 == d ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
    for (a = b.length - 1; 0 <= a; a--) this.remove(b[a])
};

function Xc() {
    return !!Vc.FPA_SAMESITE_PHASE2_MOD || !1
}

function Yc(a, b, c, d) {
    (a = u[a]) || (a = (new Wc).get(b));
    return a ? Sc(a, c, d) : null
};
"undefined" !== typeof TextDecoder && new TextDecoder;
"undefined" !== typeof TextEncoder && new TextEncoder;

function Zc() {
    this.j = this.j;
    this.l = this.l
}
Zc.prototype.j = !1;
Zc.prototype.dispose = function() {
    this.j || (this.j = !0, this.X())
};
Zc.prototype.X = function() {
    if (this.l)
        for (; this.l.length;) this.l.shift()()
};
const $c = self;

function ad(a, b) {
    a.l(b);
    100 > a.i && (a.i++, b.next = a.h, a.h = b)
}
class bd {
    constructor(a, b) {
        this.j = a;
        this.l = b;
        this.i = 0;
        this.h = null
    }
    get() {
        let a;
        0 < this.i ? (this.i--, a = this.h, this.h = a.next, a.next = null) : a = this.j();
        return a
    }
};
class cd {
    constructor() {
        this.i = this.h = null
    }
    add(a, b) {
        const c = dd.get();
        c.set(a, b);
        this.i ? this.i.next = c : this.h = c;
        this.i = c
    }
    remove() {
        let a = null;
        this.h && (a = this.h, this.h = this.h.next, this.h || (this.i = null), a.next = null);
        return a
    }
}
var dd = new bd(() => new ed, a => a.reset());
class ed {
    constructor() {
        this.next = this.scope = this.h = null
    }
    set(a, b) {
        this.h = a;
        this.scope = b;
        this.next = null
    }
    reset() {
        this.next = this.scope = this.h = null
    }
};
let fd, gd = !1,
    hd = new cd,
    jd = (a, b) => {
        fd || id();
        gd || (fd(), gd = !0);
        hd.add(a, b)
    },
    id = () => {
        const a = u.Promise.resolve(void 0);
        fd = () => {
            a.then(kd)
        }
    };
var kd = () => {
    let a;
    for (; a = hd.remove();) {
        try {
            a.h.call(a.scope)
        } catch (b) {
            Pa(b)
        }
        ad(dd, a)
    }
    gd = !1
};
class ld {
    constructor() {
        this.promise = new Promise(a => {
            this.resolve = a
        })
    }
};

function G(a) {
    this.h = 0;
    this.v = void 0;
    this.l = this.i = this.j = null;
    this.m = this.u = !1;
    if (a != pa) try {
        var b = this;
        a.call(void 0, function(c) {
            md(b, 2, c)
        }, function(c) {
            md(b, 3, c)
        })
    } catch (c) {
        md(this, 3, c)
    }
}

function nd() {
    this.next = this.context = this.i = this.j = this.h = null;
    this.l = !1
}
nd.prototype.reset = function() {
    this.context = this.i = this.j = this.h = null;
    this.l = !1
};
var od = new bd(function() {
    return new nd
}, function(a) {
    a.reset()
});

function pd(a, b, c) {
    var d = od.get();
    d.j = a;
    d.i = b;
    d.context = c;
    return d
}

function qd(a) {
    if (a instanceof G) return a;
    var b = new G(pa);
    md(b, 2, a);
    return b
}
G.prototype.then = function(a, b, c) {
    return rd(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
};
G.prototype.$goog_Thenable = !0;
q = G.prototype;
q.hb = function(a, b) {
    return rd(this, null, a, b)
};
q.catch = G.prototype.hb;
q.cancel = function(a) {
    if (0 == this.h) {
        var b = new sd(a);
        jd(function() {
            td(this, b)
        }, this)
    }
};

function td(a, b) {
    if (0 == a.h)
        if (a.j) {
            var c = a.j;
            if (c.i) {
                for (var d = 0, e = null, f = null, g = c.i; g && (g.l || (d++, g.h == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
                e && (0 == c.h && 1 == d ? td(c, b) : (f ? (d = f, d.next == c.l && (c.l = d), d.next = d.next.next) : ud(c), vd(c, e, 3, b)))
            }
            a.j = null
        } else md(a, 3, b)
}

function wd(a, b) {
    a.i || 2 != a.h && 3 != a.h || xd(a);
    a.l ? a.l.next = b : a.i = b;
    a.l = b
}

function rd(a, b, c, d) {
    var e = pd(null, null, null);
    e.h = new G(function(f, g) {
        e.j = b ? function(h) {
            try {
                var k = b.call(d, h);
                f(k)
            } catch (l) {
                g(l)
            }
        } : f;
        e.i = c ? function(h) {
            try {
                var k = c.call(d, h);
                void 0 === k && h instanceof sd ? g(h) : f(k)
            } catch (l) {
                g(l)
            }
        } : g
    });
    e.h.j = a;
    wd(a, e);
    return e.h
}
q.ib = function(a) {
    this.h = 0;
    md(this, 2, a)
};
q.jb = function(a) {
    this.h = 0;
    md(this, 3, a)
};

function md(a, b, c) {
    if (0 == a.h) {
        a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
        a.h = 1;
        a: {
            var d = c,
                e = a.ib,
                f = a.jb;
            if (d instanceof G) {
                wd(d, pd(e || pa, f || null, a));
                var g = !0
            } else {
                if (d) try {
                    var h = !!d.$goog_Thenable
                } catch (l) {
                    h = !1
                } else h = !1;
                if (h) d.then(e, f, a), g = !0;
                else {
                    if (ia(d)) try {
                        var k = d.then;
                        if ("function" === typeof k) {
                            yd(d, k, e, f, a);
                            g = !0;
                            break a
                        }
                    } catch (l) {
                        f.call(a, l);
                        g = !0;
                        break a
                    }
                    g = !1
                }
            }
        }
        g || (a.v = c, a.h = b, a.j = null, xd(a), 3 != b || c instanceof sd || zd(a, c))
    }
}

function yd(a, b, c, d, e) {
    function f(k) {
        h || (h = !0, d.call(e, k))
    }

    function g(k) {
        h || (h = !0, c.call(e, k))
    }
    var h = !1;
    try {
        b.call(a, g, f)
    } catch (k) {
        f(k)
    }
}

function xd(a) {
    a.u || (a.u = !0, jd(a.Pa, a))
}

function ud(a) {
    var b = null;
    a.i && (b = a.i, a.i = b.next, b.next = null);
    a.i || (a.l = null);
    return b
}
q.Pa = function() {
    for (var a; a = ud(this);) vd(this, a, this.h, this.v);
    this.u = !1
};

function vd(a, b, c, d) {
    if (3 == c && b.i && !b.l)
        for (; a && a.m; a = a.j) a.m = !1;
    if (b.h) b.h.j = null, Ad(b, c, d);
    else try {
        b.l ? b.j.call(b.context) : Ad(b, c, d)
    } catch (e) {
        Bd.call(null, e)
    }
    ad(od, b)
}

function Ad(a, b, c) {
    2 == b ? a.j.call(a.context, c) : a.i && a.i.call(a.context, c)
}

function zd(a, b) {
    a.m = !0;
    jd(function() {
        a.m && Bd.call(null, b)
    })
}
var Bd = Pa;

function sd(a) {
    oa.call(this, a)
}
na(sd, oa);
sd.prototype.name = "cancel";

function H(a) {
    Zc.call(this);
    this.v = 1;
    this.m = [];
    this.u = 0;
    this.h = [];
    this.i = {};
    this.D = !!a
}
na(H, Zc);
q = H.prototype;
q.Ia = function(a, b, c) {
    var d = this.i[a];
    d || (d = this.i[a] = []);
    var e = this.v;
    this.h[e] = a;
    this.h[e + 1] = b;
    this.h[e + 2] = c;
    this.v = e + 3;
    d.push(e);
    return e
};
q.ma = function(a) {
    var b = this.h[a];
    if (b) {
        var c = this.i[b];
        0 != this.u ? (this.m.push(a), this.h[a + 1] = () => {}) : (c && sa(c, a), delete this.h[a], delete this.h[a + 1], delete this.h[a + 2])
    }
    return !!b
};
q.ka = function(a, b) {
    var c = this.i[a];
    if (c) {
        for (var d = Array(arguments.length - 1), e = 1, f = arguments.length; e < f; e++) d[e - 1] = arguments[e];
        if (this.D)
            for (e = 0; e < c.length; e++) {
                var g = c[e];
                Cd(this.h[g + 1], this.h[g + 2], d)
            } else {
                this.u++;
                try {
                    for (e = 0, f = c.length; e < f && !this.j; e++) g = c[e], this.h[g + 1].apply(this.h[g + 2], d)
                } finally {
                    if (this.u--, 0 < this.m.length && 0 == this.u)
                        for (; c = this.m.pop();) this.ma(c)
                }
            }
        return 0 != e
    }
    return !1
};

function Cd(a, b, c) {
    jd(function() {
        a.apply(b, c)
    })
}
q.clear = function(a) {
    if (a) {
        var b = this.i[a];
        b && (b.forEach(this.ma, this), delete this.i[a])
    } else this.h.length = 0, this.i = {}
};
q.X = function() {
    H.eb.X.call(this);
    this.clear();
    this.m.length = 0
};
/*

 (The MIT License)

 Copyright (C) 2014 by Vitaly Puzrin

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 -----------------------------------------------------------------------------
 Ported from zlib, which is under the following license
 https://github.com/madler/zlib/blob/master/zlib.h

 zlib.h -- interface of the 'zlib' general purpose compression library
   version 1.2.8, April 28th, 2013
   Copyright (C) 1995-2013 Jean-loup Gailly and Mark Adler
   This software is provided 'as-is', without any express or implied
   warranty.  In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
      claim that you wrote the original software. If you use this software
      in a product, an acknowledgment in the product documentation would be
      appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
      misrepresented as being the original software.
   3. This notice may not be removed or altered from any source distribution.
   Jean-loup Gailly        Mark Adler
   jloup@gzip.org          madler@alumni.caltech.edu
   The data format used by the zlib library is described by RFCs (Request for
   Comments) 1950 to 1952 in the files http://tools.ietf.org/html/rfc1950
   (zlib format), rfc1951 (deflate format) and rfc1952 (gzip format).
*/
let I = {};
var Dd = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Int32Array;
I.assign = function(a) {
    for (var b = Array.prototype.slice.call(arguments, 1); b.length;) {
        var c = b.shift();
        if (c) {
            if ("object" !== typeof c) throw new TypeError(c + "must be non-object");
            for (var d in c) Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d])
        }
    }
    return a
};
I.qc = function(a, b) {
    if (a.length === b) return a;
    if (a.subarray) return a.subarray(0, b);
    a.length = b;
    return a
};
var Ed = {
        La: function(a, b, c, d, e) {
            if (b.subarray && a.subarray) a.set(b.subarray(c, c + d), e);
            else
                for (var f = 0; f < d; f++) a[e + f] = b[c + f]
        },
        Ra: function(a) {
            var b, c;
            var d = c = 0;
            for (b = a.length; d < b; d++) c += a[d].length;
            var e = new Uint8Array(c);
            d = c = 0;
            for (b = a.length; d < b; d++) {
                var f = a[d];
                e.set(f, c);
                c += f.length
            }
            return e
        }
    },
    Fd = {
        La: function(a, b, c, d, e) {
            for (var f = 0; f < d; f++) a[e + f] = b[c + f]
        },
        Ra: function(a) {
            return [].concat.apply([], a)
        }
    };
I.cb = function() {
    Dd ? (I.na = Uint8Array, I.Ea = Uint16Array, I.Fa = Int32Array, I.assign(I, Ed)) : (I.na = Array, I.Ea = Array, I.Fa = Array, I.assign(I, Fd))
};
I.cb();
try {
    new Uint8Array(1)
} catch (a) {}
for (var Gd = new I.na(256), Hd = 0; 256 > Hd; Hd++) Gd[Hd] = 252 <= Hd ? 6 : 248 <= Hd ? 5 : 240 <= Hd ? 4 : 224 <= Hd ? 3 : 192 <= Hd ? 2 : 1;
Gd[254] = Gd[254] = 1;

function Id(a) {
    for (var b = a.length; 0 <= --b;) a[b] = 0
}
Id(Array(576));
Id(Array(60));
Id(Array(512));
Id(Array(256));
Id(Array(29));
Id(Array(30));
/*

Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
var Jd = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
var Kd = class {
    constructor(a) {
        this.name = a
    }
};
var Ld = new Kd("rawColdConfigGroup");
var Md = new Kd("rawHotConfigGroup");
var Nd = class extends E {
    constructor(a) {
        super(a)
    }
};

function Od(a, b) {
    return C(a, 1, b)
}
var Pd = class extends E {
    constructor(a) {
        super(a)
    }
};
var Rd = class extends E {
        constructor(a) {
            super(a, -1, Qd)
        }
    },
    Qd = [1];
var Sd = class extends E {
    constructor(a) {
        super(a)
    }
};
var Ud = class extends E {
        constructor(a) {
            super(a, -1, Td)
        }
    },
    Td = [2];
var Wd = class extends E {
        constructor(a) {
            super(a, -1, Vd)
        }
        getPlayerType() {
            return B(this, 36)
        }
        setHomeGroupInfo(a) {
            return D(this, Ud, 81, a)
        }
        clearLocationPlayabilityToken() {
            return C(this, 89, void 0, !1)
        }
    },
    Vd = [9, 66, 24, 32, 86, 100, 101];
var Yd = class extends E {
        constructor(a) {
            super(a)
        }
        getKey() {
            return Ob(this, 1)
        }
        R() {
            return Ob(this, 2 === Hb(this, Xd) ? 2 : -1)
        }
    },
    Xd = [2, 3, 4, 5, 6];
var $d = class extends E {
        constructor(a) {
            super(a, -1, Zd)
        }
    },
    Zd = [15, 26, 28];
var be = class extends E {
        constructor(a) {
            super(a, -1, ae)
        }
    },
    ae = [5];
var ce = class extends E {
    constructor(a) {
        super(a)
    }
};
var ee = class extends E {
        constructor(a) {
            super(a, -1, de)
        }
        setSafetyMode(a) {
            return C(this, 5, a)
        }
    },
    de = [12];
var ge = class extends E {
        constructor(a) {
            super(a, -1, fe)
        }
        j(a) {
            return D(this, Wd, 1, a)
        }
    },
    fe = [12];
var he = class extends E {
    constructor(a) {
        super(a)
    }
    getKey() {
        return Ob(this, 1)
    }
    R() {
        return Ob(this, 2)
    }
};
var je = class extends E {
        constructor(a) {
            super(a, -1, ie)
        }
    },
    ie = [4, 5];
var ke = class extends E {
    constructor(a) {
        super(a)
    }
};
var le = class extends E {
        constructor(a) {
            super(a)
        }
    },
    me = [2, 3, 4];
var ne = class extends E {
    constructor(a) {
        super(a)
    }
};
var oe = class extends E {
    constructor(a) {
        super(a)
    }
};
var pe = class extends E {
    constructor(a) {
        super(a)
    }
};
var re = class extends E {
        constructor(a) {
            super(a, -1, qe)
        }
    },
    qe = [10, 17];
var se = class extends E {
    constructor(a) {
        super(a)
    }
};
var J = class extends E {
    constructor(a) {
        super(a)
    }
};
var te = class extends E {
    constructor(a) {
        super(a)
    }
};
var ue = class extends E {
    constructor(a) {
        super(a)
    }
};
var we = class extends E {
        constructor(a) {
            super(a, -1, ve)
        }
        getVideoData() {
            return Ib(this, ue, 15)
        }
    },
    ve = [4];

function xe(a, b) {
    D(a, J, 1, b)
}
var ye = class extends E {
    constructor(a) {
        super(a)
    }
};

function ze(a, b) {
    return D(a, J, 1, b)
}
var Ae = class extends E {
    constructor(a) {
        super(a)
    }
    h(a) {
        return C(this, 2, a)
    }
};

function Be(a, b) {
    return D(a, J, 2, b)
}
var De = class extends E {
        constructor(a) {
            super(a, -1, Ce)
        }
        h(a) {
            return C(this, 1, a)
        }
    },
    Ce = [3];
var Ee = class extends E {
    constructor(a) {
        super(a)
    }
    h(a) {
        return C(this, 1, a)
    }
};
var Fe = class extends E {
    constructor(a) {
        super(a)
    }
    h(a) {
        return C(this, 1, a)
    }
};
var Ge = class extends E {
    constructor(a) {
        super(a)
    }
    h(a) {
        return C(this, 1, a)
    }
};
var He = class extends E {
    constructor(a) {
        super(a)
    }
    h(a) {
        return C(this, 1, a)
    }
};
var Ie = class extends E {
    constructor(a) {
        super(a)
    }
};
var Je = class extends E {
    constructor(a) {
        super(a)
    }
};
var Ke = class extends E {
        constructor(a) {
            super(a, 459)
        }
    },
    Le = [2, 3, 5, 6, 7, 11, 13, 20, 21, 22, 23, 24, 28, 32, 37, 45, 59, 72, 73, 74, 76, 78, 79, 80, 85, 91, 97, 100, 102, 105, 111, 117, 119, 126, 127, 136, 146, 148, 151, 156, 157, 158, 159, 163, 164, 168, 176, 177, 178, 179, 184, 188, 189, 190, 191, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 208, 209, 215, 219, 222, 225, 226, 227, 229, 232, 233, 234, 240, 241, 244, 247, 248, 249, 251, 254, 255, 256, 257, 258, 259, 260, 261, 266, 270, 272, 278, 288, 291, 293, 300, 304, 308, 309, 310, 311, 313, 314, 319, 320, 321, 323, 324, 327, 328, 330,
        331, 332, 334, 337, 338, 340, 344, 348, 350, 351, 352, 353, 354, 355, 356, 357, 358, 361, 363, 364, 368, 369, 370, 373, 374, 375, 378, 380, 381, 383, 388, 389, 402, 403, 410, 411, 412, 413, 414, 415, 416, 417, 418, 423, 424, 425, 426, 427, 429, 430, 431, 439, 441, 444, 448, 458
    ];
var Me = {
    Hb: 0,
    qb: 1,
    wb: 2,
    xb: 4,
    Db: 8,
    yb: 16,
    zb: 32,
    Gb: 64,
    Fb: 128,
    sb: 256,
    ub: 512,
    Bb: 1024,
    tb: 2048,
    vb: 4096,
    rb: 8192,
    Ab: 16384,
    Eb: 32768,
    Cb: 65536
};
var Ne = class extends E {
    constructor(a) {
        super(a)
    }
};
var Pe = class extends E {
        constructor(a) {
            super(a)
        }
        setVideoId(a) {
            return Gb(this, 1, Oe, a)
        }
        getPlaylistId() {
            var a = 2 === Hb(this, Oe) ? 2 : -1;
            return B(this, a)
        }
    },
    Oe = [1, 2];
var Re = class extends E {
        constructor() {
            super(void 0, -1, Qe)
        }
    },
    Qe = [3];
var Se = new Kd("recordNotificationInteractionsEndpoint");
var Te = ["notification/convert_endpoint_to_url"],
    Ue = ["notification/record_interactions"],
    Ve = ["notification_registration/set_registration"];
const We = u.window;
let Xe, Ye;
const Ze = (null == We ? void 0 : null == (Xe = We.yt) ? void 0 : Xe.config_) || (null == We ? void 0 : null == (Ye = We.ytcfg) ? void 0 : Ye.data_) || {};
v("yt.config_", Ze);

function K(...a) {
    a = arguments;
    1 < a.length ? Ze[a[0]] = a[1] : 1 === a.length && Object.assign(Ze, a[0])
}

function M(a, b) {
    return a in Ze ? Ze[a] : b
}

function $e() {
    return M("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS")
}

function af() {
    const a = Ze.EXPERIMENT_FLAGS;
    return a ? a.web_disable_gel_stp_ecatcher_killswitch : void 0
};

function N(a) {
    a = bf(a);
    return "string" === typeof a && "false" === a ? !1 : !!a
}

function cf(a, b) {
    a = bf(a);
    return void 0 === a && void 0 !== b ? b : Number(a || 0)
}

function df() {
    return M("EXPERIMENTS_TOKEN", "")
}

function bf(a) {
    const b = M("EXPERIMENTS_FORCED_FLAGS", {}) || {};
    return void 0 !== b[a] ? b[a] : M("EXPERIMENT_FLAGS", {})[a]
}

function ef() {
    const a = [],
        b = M("EXPERIMENTS_FORCED_FLAGS", {});
    for (var c of Object.keys(b)) a.push({
        key: c,
        value: String(b[c])
    });
    c = M("EXPERIMENT_FLAGS", {});
    for (const d of Object.keys(c)) d.startsWith("force_") && void 0 === b[d] && a.push({
        key: d,
        value: String(c[d])
    });
    return a
};
const ff = [];

function gf(a) {
    ff.forEach(b => b(a))
}

function hf(a) {
    return a && window.yterr ? function() {
        try {
            return a.apply(this, arguments)
        } catch (b) {
            jf(b)
        }
    } : a
}

function jf(a) {
    var b = y("yt.logging.errors.log");
    b ? b(a, "ERROR", void 0, void 0, void 0) : (b = M("ERRORS", []), b.push([a, "ERROR", void 0, void 0, void 0]), K("ERRORS", b));
    gf(a)
}

function kf(a) {
    var b = y("yt.logging.errors.log");
    b ? b(a, "WARNING", void 0, void 0, void 0) : (b = M("ERRORS", []), b.push([a, "WARNING", void 0, void 0, void 0]), K("ERRORS", b))
};
const lf = /^[\w.]*$/,
    mf = {
        q: !0,
        search_query: !0
    };

function nf(a, b) {
    b = a.split(b);
    const c = {};
    for (let f = 0, g = b.length; f < g; f++) {
        const h = b[f].split("=");
        if (1 == h.length && h[0] || 2 == h.length) try {
            const k = of (h[0] || ""),
                l = of (h[1] || "");
            k in c ? Array.isArray(c[k]) ? ta(c[k], l) : c[k] = [c[k], l] : c[k] = l
        } catch (k) {
            var d = k,
                e = h[0];
            const l = String(nf);
            d.args = [{
                key: e,
                value: h[1],
                query: a,
                method: pf == l ? "unchanged" : l
            }];
            mf.hasOwnProperty(e) || kf(d)
        }
    }
    return c
}
const pf = String(nf);

function qf(a) {
    "?" == a.charAt(0) && (a = a.substr(1));
    return nf(a, "&")
}

function rf(a, b, c) {
    var d = a.split("#", 2);
    a = d[0];
    d = 1 < d.length ? "#" + d[1] : "";
    var e = a.split("?", 2);
    a = e[0];
    e = qf(e[1] || "");
    for (var f in b) !c && null !== e && f in e || (e[f] = b[f]);
    b = a;
    a = Ja(e);
    a ? (c = b.indexOf("#"), 0 > c && (c = b.length), f = b.indexOf("?"), 0 > f || f > c ? (f = c, e = "") : e = b.substring(f + 1, c), b = [b.slice(0, f), e, b.slice(c)], c = b[1], b[1] = a ? c ? c + "&" + a : a : c, a = b[0] + (b[1] ? "?" + b[1] : "") + b[2]) : a = b;
    return a + d
}

function sf(a) {
    if (!b) var b = window.location.href;
    const c = a.match(Ga)[1] || null,
        d = Ha(a.match(Ga)[3] || null);
    c && d ? (a = a.match(Ga), b = b.match(Ga), a = a[3] == b[3] && a[1] == b[1] && a[4] == b[4]) : a = d ? Ha(b.match(Ga)[3] || null) == d && (Number(b.match(Ga)[4] || null) || null) == (Number(a.match(Ga)[4] || null) || null) : !0;
    return a
}

function of (a) {
    return a && a.match(lf) ? a : decodeURIComponent(a.replace(/\+/g, " "))
};

function tf(a, b) {
    "function" === typeof a && (a = hf(a));
    return window.setTimeout(a, b)
};
[...Pc];
let uf = !1;

function vf(a, b) {
    const c = {
        method: b.method || "GET",
        credentials: "same-origin"
    };
    b.headers && (c.headers = b.headers);
    a = wf(a, b);
    const d = xf(a, b);
    d && (c.body = d);
    b.withCredentials && (c.credentials = "include");
    const e = b.context || u;
    let f = !1,
        g;
    fetch(a, c).then(h => {
        if (!f) {
            f = !0;
            g && window.clearTimeout(g);
            var k = h.ok,
                l = m => {
                    m = m || {};
                    k ? b.onSuccess && b.onSuccess.call(e, m, h) : b.onError && b.onError.call(e, m, h);
                    b.onFinish && b.onFinish.call(e, m, h)
                };
            "JSON" == (b.format || "JSON") && (k || 400 <= h.status && 500 > h.status) ? h.json().then(l, function() {
                l(null)
            }): l(null)
        }
    }).catch(() => {
        b.onError && b.onError.call(e, {}, {})
    });
    a = b.timeout || 0;
    b.onFetchTimeout && 0 < a && (g = tf(() => {
        f || (f = !0, window.clearTimeout(g), b.onFetchTimeout.call(b.context || u))
    }, a))
}

function wf(a, b) {
    b.includeDomain && (a = document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "") + a);
    const c = M("XSRF_FIELD_NAME");
    if (b = b.urlParams) b[c] && delete b[c], a = rf(a, b || {}, !0);
    return a
}

function xf(a, b) {
    const c = M("XSRF_FIELD_NAME"),
        d = M("XSRF_TOKEN");
    var e = b.postBody || "",
        f = b.postParams;
    var g = M("XSRF_FIELD_NAME");
    let h;
    b.headers && (h = b.headers["Content-Type"]);
    b.excludeXsrf || Ha(a.match(Ga)[3] || null) && !b.withCredentials && Ha(a.match(Ga)[3] || null) != document.location.hostname || "POST" != b.method || h && "application/x-www-form-urlencoded" != h || b.postParams && b.postParams[g] || (f || (f = {}), f[c] = d);
    (N("ajax_parse_query_data_only_when_filled") && f && 0 < Object.keys(f).length || f) && "string" === typeof e && (e =
        qf(e), za(e, f), e = b.postBodyFormat && "JSON" == b.postBodyFormat ? JSON.stringify(e) : Ja(e));
    f = e || f && !wa(f);
    !uf && f && "POST" != b.method && (uf = !0, jf(Error("AJAX request with postData should use POST")));
    return e
};
const yf = [{
    ia: a => `Cannot read property '${a.key}'`,
    aa: {
        Error: [{
            A: /(Permission denied) to access property "([^']+)"/,
            groups: ["reason", "key"]
        }],
        TypeError: [{
            A: /Cannot read property '([^']+)' of (null|undefined)/,
            groups: ["key", "value"]
        }, {
            A: /\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,
            groups: ["value", "key"]
        }, {
            A: /\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,
            groups: ["value", "key"]
        }, {
            A: /No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,
            groups: ["key"]
        }, {
            A: /Unable to get property '([^']+)' of (undefined or null) reference/,
            groups: ["key", "value"]
        }, {
            A: /(null) is not an object \(evaluating '(?:([^.]+)\.)?([^']+)'\)/,
            groups: ["value", "base", "key"]
        }]
    }
}, {
    ia: a => `Cannot call '${a.key}'`,
    aa: {
        TypeError: [{
                A: /(?:([^ ]+)?\.)?([^ ]+) is not a function/,
                groups: ["base", "key"]
            }, {
                A: /([^ ]+) called on (null or undefined)/,
                groups: ["key", "value"]
            }, {
                A: /Object (.*) has no method '([^ ]+)'/,
                groups: ["base", "key"]
            }, {
                A: /Object doesn't support property or method '([^ ]+)'/,
                groups: ["key"]
            }, {
                A: /\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
                groups: ["key"]
            },
            {
                A: /\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,
                groups: ["key"]
            }
        ]
    }
}, {
    ia: a => `${a.key} is not defined`,
    aa: {
        ReferenceError: [{
            A: /(.*) is not defined/,
            groups: ["key"]
        }, {
            A: /Can't find variable: (.*)/,
            groups: ["key"]
        }]
    }
}];
var Af = {
    J: [],
    H: [{
        callback: zf,
        weight: 500
    }]
};

function zf(a) {
    if ("JavaException" === a.name) return !0;
    a = a.stack;
    return a.includes("chrome://") || a.includes("chrome-extension://") || a.includes("moz-extension://")
};

function Bf() {
    if (!Cf) {
        var a = Cf = new Df;
        a.J.length = 0;
        a.H.length = 0;
        Ef(a, Af)
    }
    return Cf
}

function Ef(a, b) {
    b.J && a.J.push.apply(a.J, b.J);
    b.H && a.H.push.apply(a.H, b.H)
}
var Df = class {
        constructor() {
            this.H = [];
            this.J = []
        }
    },
    Cf;
const Ff = new H;

function Gf(a) {
    const b = a.length;
    let c = 0;
    const d = () => a.charCodeAt(c++);
    do {
        var e = Hf(d);
        if (Infinity === e) break;
        const f = e >> 3;
        switch (e & 7) {
            case 0:
                e = Hf(d);
                if (2 === f) return e;
                break;
            case 1:
                if (2 === f) return;
                c += 8;
                break;
            case 2:
                e = Hf(d);
                if (2 === f) return a.substr(c, e);
                c += e;
                break;
            case 5:
                if (2 === f) return;
                c += 4;
                break;
            default:
                return
        }
    } while (c < b)
}

function Hf(a) {
    let b = a(),
        c = b & 127;
    if (128 > b) return c;
    b = a();
    c |= (b & 127) << 7;
    if (128 > b) return c;
    b = a();
    c |= (b & 127) << 14;
    if (128 > b) return c;
    b = a();
    return 128 > b ? c | (b & 127) << 21 : Infinity
};

function If(a, b, c, d) {
    if (a)
        if (Array.isArray(a)) {
            var e = d;
            for (d = 0; d < a.length && !(a[d] && (e += Jf(d, a[d], b, c), 500 < e)); d++);
            d = e
        } else if ("object" === typeof a)
        for (e in a) {
            if (a[e]) {
                var f = e;
                var g = a[e],
                    h = b,
                    k = c;
                f = "string" !== typeof g || "clickTrackingParams" !== f && "trackingParams" !== f ? 0 : (g = Gf(atob(g.replace(/-/g, "+").replace(/_/g, "/")))) ? Jf(`${f}.ve`, g, h, k) : 0;
                d += f;
                d += Jf(e, a[e], b, c);
                if (500 < d) break
            }
        } else c[b] = Kf(a), d += c[b].length;
    else c[b] = Kf(a), d += c[b].length;
    return d
}

function Jf(a, b, c, d) {
    c += `.${a}`;
    a = Kf(b);
    d[c] = a;
    return c.length + a.length
}

function Kf(a) {
    try {
        return ("string" === typeof a ? a : String(JSON.stringify(a))).substr(0, 500)
    } catch (b) {
        return `unable to serialize ${typeof a} (${b.message})`
    }
};

function Lf() {
    Mf.h || (Mf.h = new Mf);
    return Mf.h
}

function Nf(a, b) {
    a = {};
    var c = [],
        d = Oc(String(u.location.href));
    var e = [];
    var f = u.__SAPISID || u.__APISID || u.__3PSAPISID || u.__OVERRIDE_SID;
    Xc() && (f = f || u.__1PSAPISID);
    if (f) var g = !0;
    else g = new Wc, f = g.get("SAPISID") || g.get("APISID") || g.get("__Secure-3PAPISID") || g.get("SID") || g.get("OSID"), Xc() && (f = f || g.get("__Secure-1PAPISID")), g = !!f;
    g && (f = (g = d = 0 == d.indexOf("https:") || 0 == d.indexOf("chrome-extension:") || 0 == d.indexOf("moz-extension:")) ? u.__SAPISID : u.__APISID, f || (f = new Wc, f = f.get(g ? "SAPISID" : "APISID") || f.get("__Secure-3PAPISID")),
        (g = f ? Sc(f, g ? "SAPISIDHASH" : "APISIDHASH", c) : null) && e.push(g), d && Xc() && ((d = Yc("__1PSAPISID", "__Secure-1PAPISID", "SAPISID1PHASH", c)) && e.push(d), (c = Yc("__3PSAPISID", "__Secure-3PAPISID", "SAPISID3PHASH", c)) && e.push(c)));
    if (e = 0 == e.length ? null : e.join(" ")) a.Authorization = e, e = b = null == b ? void 0 : b.sessionIndex, void 0 === e && (e = Number(M("SESSION_INDEX", 0)), e = isNaN(e) ? 0 : e), N("voice_search_auth_header_removal") || (a["X-Goog-AuthUser"] = e.toString()), "INNERTUBE_HOST_OVERRIDE" in Ze || (a["X-Origin"] = window.location.origin),
        void 0 === b && "DELEGATED_SESSION_ID" in Ze && (a["X-Goog-PageId"] = M("DELEGATED_SESSION_ID"));
    return a
}
var Mf = class {
    constructor() {
        this.fb = !0
    }
};
var Of = {
    identityType: "UNAUTHENTICATED_IDENTITY_TYPE_UNKNOWN"
};
v("ytglobal.prefsUserPrefsPrefs_", y("ytglobal.prefsUserPrefsPrefs_") || {});
var Qf = class {
    h(a, b) {
        Pf(a, 1, b)
    }
};

function Pf(a, b, c) {
    void 0 !== c && Number.isNaN(Number(c)) && (c = void 0);
    const d = y("yt.scheduler.instance.addJob");
    return d ? d(a, b, c) : void 0 === c ? (a(), NaN) : tf(a, c || 0)
}
var Rf = class extends Qf {
    i(a) {
        if (void 0 === a || !Number.isNaN(Number(a))) {
            var b = y("yt.scheduler.instance.cancelJob");
            b ? b(a) : window.clearTimeout(a)
        }
    }
    start() {
        const a = y("yt.scheduler.instance.start");
        a && a()
    }
};
Rf.h || (Rf.h = new Rf);
var Sf = Rf.h;
var O = class extends Error {
    constructor(a, ...b) {
        super(a);
        this.args = [...b]
    }
};

function Tf() {
    if (void 0 !== M("DATASYNC_ID")) return M("DATASYNC_ID");
    throw new O("Datasync ID not set", "unknown");
};
const Uf = [];
let Vf, Wf = !1;

function Xf(a) {
    Wf || (Vf ? Vf.handleError(a) : (Uf.push({
        type: "ERROR",
        payload: a
    }), 10 < Uf.length && Uf.shift()))
}

function Yf(a, b) {
    Wf || (Vf ? Vf.Z(a, b) : (Uf.push({
        type: "EVENT",
        eventType: a,
        payload: b
    }), 10 < Uf.length && Uf.shift()))
};

function Zf(a) {
    if (0 <= a.indexOf(":")) throw Error("Database name cannot contain ':'");
}

function $f(a) {
    return a.substr(0, a.indexOf(":")) || a
};
const ag = {
        AUTH_INVALID: "No user identifier specified.",
        EXPLICIT_ABORT: "Transaction was explicitly aborted.",
        IDB_NOT_SUPPORTED: "IndexedDB is not supported.",
        MISSING_INDEX: "Index not created.",
        MISSING_OBJECT_STORES: "Object stores not created.",
        DB_DELETED_BY_MISSING_OBJECT_STORES: "Database is deleted because expected object stores were not created.",
        DB_REOPENED_BY_MISSING_OBJECT_STORES: "Database is reopened because expected object stores were not created.",
        UNKNOWN_ABORT: "Transaction was aborted for unknown reasons.",
        QUOTA_EXCEEDED: "The current transaction exceeded its quota limitations.",
        QUOTA_MAYBE_EXCEEDED: "The current transaction may have failed because of exceeding quota limitations.",
        EXECUTE_TRANSACTION_ON_CLOSED_DB: "Can't start a transaction on a closed database",
        INCOMPATIBLE_DB_VERSION: "The binary is incompatible with the database version"
    },
    bg = {
        AUTH_INVALID: "ERROR",
        EXECUTE_TRANSACTION_ON_CLOSED_DB: "WARNING",
        EXPLICIT_ABORT: "IGNORED",
        IDB_NOT_SUPPORTED: "ERROR",
        MISSING_INDEX: "WARNING",
        MISSING_OBJECT_STORES: "ERROR",
        DB_DELETED_BY_MISSING_OBJECT_STORES: "WARNING",
        DB_REOPENED_BY_MISSING_OBJECT_STORES: "WARNING",
        QUOTA_EXCEEDED: "WARNING",
        QUOTA_MAYBE_EXCEEDED: "WARNING",
        UNKNOWN_ABORT: "WARNING",
        INCOMPATIBLE_DB_VERSION: "WARNING"
    },
    cg = {
        AUTH_INVALID: !1,
        EXECUTE_TRANSACTION_ON_CLOSED_DB: !1,
        EXPLICIT_ABORT: !1,
        IDB_NOT_SUPPORTED: !1,
        MISSING_INDEX: !1,
        MISSING_OBJECT_STORES: !1,
        DB_DELETED_BY_MISSING_OBJECT_STORES: !1,
        DB_REOPENED_BY_MISSING_OBJECT_STORES: !1,
        QUOTA_EXCEEDED: !1,
        QUOTA_MAYBE_EXCEEDED: !0,
        UNKNOWN_ABORT: !0,
        INCOMPATIBLE_DB_VERSION: !1
    };
var P = class extends O {
        constructor(a, b = {}, c = ag[a], d = bg[a], e = cg[a]) {
            super(c, Object.assign({}, {
                name: "YtIdbKnownError",
                isSw: void 0 === self.document,
                isIframe: self !== self.top,
                type: a
            }, b));
            this.type = a;
            this.message = c;
            this.level = d;
            this.h = e;
            Object.setPrototypeOf(this, P.prototype)
        }
    },
    dg = class extends P {
        constructor(a, b) {
            super("MISSING_OBJECT_STORES", {
                expectedObjectStores: b,
                foundObjectStores: a
            }, ag.MISSING_OBJECT_STORES);
            Object.setPrototypeOf(this, dg.prototype)
        }
    },
    eg = class extends Error {
        constructor(a, b) {
            super();
            this.index =
                a;
            this.objectStore = b;
            Object.setPrototypeOf(this, eg.prototype)
        }
    };
const fg = ["The database connection is closing", "Can't start a transaction on a closed database", "A mutation operation was attempted on a database that did not allow mutations"];

function gg(a, b, c, d) {
    b = $f(b);
    let e;
    e = a instanceof Error ? a : Error(`Unexpected error: ${a}`);
    if (e instanceof P) return e;
    a = {
        objectStoreNames: c,
        dbName: b,
        dbVersion: d
    };
    if ("QuotaExceededError" === e.name) return new P("QUOTA_EXCEEDED", a);
    if (Ra && "UnknownError" === e.name) return new P("QUOTA_MAYBE_EXCEEDED", a);
    if (e instanceof eg) return new P("MISSING_INDEX", Object.assign({}, a, {
        objectStore: e.objectStore,
        index: e.index
    }));
    if ("InvalidStateError" === e.name && fg.some(f => e.message.includes(f))) return new P("EXECUTE_TRANSACTION_ON_CLOSED_DB",
        a);
    if ("AbortError" === e.name) return new P("UNKNOWN_ABORT", a, e.message);
    e.args = [Object.assign({}, a, {
        name: "IdbError",
        dc: e.name
    })];
    e.level = "WARNING";
    return e
}

function hg(a, b, c) {
    return new P("IDB_NOT_SUPPORTED", {
        context: {
            caller: a,
            publicName: b,
            version: c,
            hasSucceededOnce: void 0
        }
    })
};

function ig(a) {
    if (!a) throw Error();
    throw a;
}

function jg(a) {
    return a
}
var kg = class {
    constructor(a) {
        this.h = a
    }
};

function lg(a, b, c, d, e) {
    try {
        if ("FULFILLED" !== a.state.status) throw Error("calling handleResolve before the promise is fulfilled.");
        const f = c(a.state.value);
        f instanceof mg ? ng(a, b, f, d, e) : d(f)
    } catch (f) {
        e(f)
    }
}

function og(a, b, c, d, e) {
    try {
        if ("REJECTED" !== a.state.status) throw Error("calling handleReject before the promise is rejected.");
        const f = c(a.state.reason);
        f instanceof mg ? ng(a, b, f, d, e) : d(f)
    } catch (f) {
        e(f)
    }
}

function ng(a, b, c, d, e) {
    b === c ? e(new TypeError("Circular promise chain detected.")) : c.then(f => {
        f instanceof mg ? ng(a, b, f, d, e) : d(f)
    }, f => {
        e(f)
    })
}
var mg = class {
    constructor(a) {
        this.state = {
            status: "PENDING"
        };
        this.h = [];
        this.i = [];
        a = a.h;
        const b = d => {
                if ("PENDING" === this.state.status) {
                    this.state = {
                        status: "FULFILLED",
                        value: d
                    };
                    for (const e of this.h) e()
                }
            },
            c = d => {
                if ("PENDING" === this.state.status) {
                    this.state = {
                        status: "REJECTED",
                        reason: d
                    };
                    for (const e of this.i) e()
                }
            };
        try {
            a(b, c)
        } catch (d) {
            c(d)
        }
    }
    static all(a) {
        return new mg(new kg((b, c) => {
            const d = [];
            let e = a.length;
            0 === e && b(d);
            for (let f = 0; f < a.length; ++f) mg.resolve(a[f]).then(g => {
                d[f] = g;
                e--;
                0 === e && b(d)
            }).catch(g => {
                c(g)
            })
        }))
    }
    static resolve(a) {
        return new mg(new kg((b, c) => {
            a instanceof mg ? a.then(b, c) : b(a)
        }))
    }
    then(a, b) {
        const c = null != a ? a : jg,
            d = null != b ? b : ig;
        return new mg(new kg((e, f) => {
            "PENDING" === this.state.status ? (this.h.push(() => {
                lg(this, this, c, e, f)
            }), this.i.push(() => {
                og(this, this, d, e, f)
            })) : "FULFILLED" === this.state.status ? lg(this, this, c, e, f) : "REJECTED" === this.state.status && og(this, this, d, e, f)
        }))
    } catch (a) {
        return this.then(void 0, a)
    }
};

function pg(a, b, c) {
    const d = () => {
            try {
                a.removeEventListener("success", e), a.removeEventListener("error", f)
            } catch (g) {}
        },
        e = () => {
            b(a.result);
            d()
        },
        f = () => {
            c(a.error);
            d()
        };
    a.addEventListener("success", e);
    a.addEventListener("error", f)
}

function qg(a) {
    return new Promise((b, c) => {
        pg(a, b, c)
    })
}

function Q(a) {
    return new mg(new kg((b, c) => {
        pg(a, b, c)
    }))
};

function rg(a, b) {
    return new mg(new kg((c, d) => {
        const e = () => {
            const f = a ? b(a) : null;
            f ? f.then(g => {
                a = g;
                e()
            }, d) : c()
        };
        e()
    }))
};
const sg = window;
var R = sg.ytcsi && sg.ytcsi.now ? sg.ytcsi.now : sg.performance && sg.performance.timing && sg.performance.now && sg.performance.timing.navigationStart ? () => sg.performance.timing.navigationStart + sg.performance.now() : () => (new Date).getTime();

function S(a, b, c, d) {
    return r(function*() {
        const e = {
            mode: "readonly",
            F: !1,
            tag: "IDB_TRANSACTION_TAG_UNKNOWN"
        };
        "string" === typeof c ? e.mode = c : Object.assign(e, c);
        a.transactionCount++;
        const f = e.F ? 3 : 1;
        let g = 0,
            h;
        for (; !h;) {
            g++;
            const l = Math.round(R());
            try {
                const m = a.h.transaction(b, e.mode);
                var k = d;
                const n = new tg(m),
                    t = yield ug(n, k), p = Math.round(R());
                vg(a, l, p, g, void 0, b.join(), e);
                return t
            } catch (m) {
                k = Math.round(R());
                const n = gg(m, a.h.name, b.join(), a.h.version);
                if (n instanceof P && !n.h || g >= f) vg(a, l, k, g, n, b.join(), e),
                    h = n
            }
        }
        return Promise.reject(h)
    })
}

function wg(a, b, c) {
    a = a.h.createObjectStore(b, c);
    return new xg(a)
}

function yg(a, b, c, d) {
    return S(a, [b], {
        mode: "readwrite",
        F: !0
    }, e => {
        e = e.objectStore(b);
        return Q(e.h.put(c, d))
    })
}

function vg(a, b, c, d, e, f, g) {
    b = c - b;
    e ? (e instanceof P && ("QUOTA_EXCEEDED" === e.type || "QUOTA_MAYBE_EXCEEDED" === e.type) && Yf("QUOTA_EXCEEDED", {
        dbName: $f(a.h.name),
        objectStoreNames: f,
        transactionCount: a.transactionCount,
        transactionMode: g.mode
    }), e instanceof P && "UNKNOWN_ABORT" === e.type && (c -= a.j, 0 > c && c >= Math.pow(2, 31) && (c = 0), Yf("TRANSACTION_UNEXPECTEDLY_ABORTED", {
        objectStoreNames: f,
        transactionDuration: b,
        transactionCount: a.transactionCount,
        dbDuration: c
    }), a.i = !0), zg(a, !1, d, f, b, g.tag), Xf(e)) : zg(a, !0, d, f, b, g.tag)
}

function zg(a, b, c, d, e, f = "IDB_TRANSACTION_TAG_UNKNOWN") {
    Yf("TRANSACTION_ENDED", {
        objectStoreNames: d,
        connectionHasUnknownAbortedTransaction: a.i,
        duration: e,
        isSuccessful: b,
        tryCount: c,
        tag: f
    })
}
var Ag = class {
    constructor(a, b) {
        this.h = a;
        this.options = b;
        this.transactionCount = 0;
        this.j = Math.round(R());
        this.i = !1
    }
    add(a, b, c) {
        return S(this, [a], {
            mode: "readwrite",
            F: !0
        }, d => d.objectStore(a).add(b, c))
    }
    clear(a) {
        return S(this, [a], {
            mode: "readwrite",
            F: !0
        }, b => b.objectStore(a).clear())
    }
    close() {
        this.h.close();
        let a;
        (null == (a = this.options) ? 0 : a.closed) && this.options.closed()
    }
    count(a, b) {
        return S(this, [a], {
            mode: "readonly",
            F: !0
        }, c => c.objectStore(a).count(b))
    }
    delete(a, b) {
        return S(this, [a], {
            mode: "readwrite",
            F: !0
        }, c => c.objectStore(a).delete(b))
    }
    get(a, b) {
        return S(this, [a], {
            mode: "readonly",
            F: !0
        }, c => c.objectStore(a).get(b))
    }
    objectStoreNames() {
        return Array.from(this.h.objectStoreNames)
    }
    getName() {
        return this.h.name
    }
};

function Bg(a, b, c) {
    a = a.h.openCursor(b.query, b.direction);
    return Cg(a).then(d => rg(d, c))
}

function Dg(a, b) {
    return Bg(a, {
        query: b
    }, c => c.delete().then(() => c.continue())).then(() => {})
}
var xg = class {
    constructor(a) {
        this.h = a
    }
    add(a, b) {
        return Q(this.h.add(a, b))
    }
    autoIncrement() {
        return this.h.autoIncrement
    }
    clear() {
        return Q(this.h.clear()).then(() => {})
    }
    count(a) {
        return Q(this.h.count(a))
    }
    delete(a) {
        return a instanceof IDBKeyRange ? Dg(this, a) : Q(this.h.delete(a))
    }
    get(a) {
        return Q(this.h.get(a))
    }
    index(a) {
        try {
            return new Eg(this.h.index(a))
        } catch (b) {
            if (b instanceof Error && "NotFoundError" === b.name) throw new eg(a, this.h.name);
            throw b;
        }
    }
    getName() {
        return this.h.name
    }
    keyPath() {
        return this.h.keyPath
    }
};

function ug(a, b) {
    const c = new Promise((d, e) => {
        try {
            b(a).then(f => {
                d(f)
            }).catch(e)
        } catch (f) {
            e(f), a.abort()
        }
    });
    return Promise.all([c, a.done]).then(([d]) => d)
}
var tg = class {
    constructor(a) {
        this.h = a;
        this.j = new Map;
        this.i = !1;
        this.done = new Promise((b, c) => {
            this.h.addEventListener("complete", () => {
                b()
            });
            this.h.addEventListener("error", d => {
                d.currentTarget === d.target && c(this.h.error)
            });
            this.h.addEventListener("abort", () => {
                var d = this.h.error;
                if (d) c(d);
                else if (!this.i) {
                    d = P;
                    var e = this.h.objectStoreNames;
                    const f = [];
                    for (let g = 0; g < e.length; g++) {
                        const h = e.item(g);
                        if (null === h) throw Error("Invariant: item in DOMStringList is null");
                        f.push(h)
                    }
                    d = new d("UNKNOWN_ABORT", {
                        objectStoreNames: f.join(),
                        dbName: this.h.db.name,
                        mode: this.h.mode
                    });
                    c(d)
                }
            })
        })
    }
    abort() {
        this.h.abort();
        this.i = !0;
        throw new P("EXPLICIT_ABORT");
    }
    objectStore(a) {
        a = this.h.objectStore(a);
        let b = this.j.get(a);
        b || (b = new xg(a), this.j.set(a, b));
        return b
    }
};

function Fg(a, b, c) {
    const {
        query: d = null,
        direction: e = "next"
    } = b;
    a = a.h.openCursor(d, e);
    return Cg(a).then(f => rg(f, c))
}
var Eg = class {
    constructor(a) {
        this.h = a
    }
    count(a) {
        return Q(this.h.count(a))
    }
    delete(a) {
        return Fg(this, {
            query: a
        }, b => b.delete().then(() => b.continue()))
    }
    get(a) {
        return Q(this.h.get(a))
    }
    getKey(a) {
        return Q(this.h.getKey(a))
    }
    keyPath() {
        return this.h.keyPath
    }
    unique() {
        return this.h.unique
    }
};

function Cg(a) {
    return Q(a).then(b => b ? new Gg(a, b) : null)
}
var Gg = class {
    constructor(a, b) {
        this.request = a;
        this.cursor = b
    }
    advance(a) {
        this.cursor.advance(a);
        return Cg(this.request)
    }
    continue (a) {
        this.cursor.continue(a);
        return Cg(this.request)
    }
    delete() {
        return Q(this.cursor.delete()).then(() => {})
    }
    getKey() {
        return this.cursor.key
    }
    R() {
        return this.cursor.value
    }
    update(a) {
        return Q(this.cursor.update(a))
    }
};

function Hg(a, b, c) {
    return new Promise((d, e) => {
        let f;
        f = void 0 !== b ? self.indexedDB.open(a, b) : self.indexedDB.open(a);
        const g = c.Ma,
            h = c.blocking,
            k = c.gb,
            l = c.upgrade,
            m = c.closed;
        let n;
        const t = () => {
            n || (n = new Ag(f.result, {
                closed: m
            }));
            return n
        };
        f.addEventListener("upgradeneeded", p => {
            try {
                if (null === p.newVersion) throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");
                if (null === f.transaction) throw Error("Invariant: transaction on IDbOpenDbRequest is null");
                p.dataLoss && "none" !== p.dataLoss && Yf("IDB_DATA_CORRUPTED", {
                    reason: p.dataLossMessage || "unknown reason",
                    dbName: $f(a)
                });
                const x = t(),
                    w = new tg(f.transaction);
                l && l(x, F => p.oldVersion < F && p.newVersion >= F, w);
                w.done.catch(F => {
                    e(F)
                })
            } catch (x) {
                e(x)
            }
        });
        f.addEventListener("success", () => {
            const p = f.result;
            h && p.addEventListener("versionchange", () => {
                h(t())
            });
            p.addEventListener("close", () => {
                Yf("IDB_UNEXPECTEDLY_CLOSED", {
                    dbName: $f(a),
                    dbVersion: p.version
                });
                k && k()
            });
            d(t())
        });
        f.addEventListener("error", () => {
            e(f.error)
        });
        g && f.addEventListener("blocked", () => {
            g()
        })
    })
}

function Ig(a, b, c = {}) {
    return Hg(a, b, c)
}

function Jg(a, b = {}) {
    return r(function*() {
        try {
            const c = self.indexedDB.deleteDatabase(a),
                d = b.Ma;
            d && c.addEventListener("blocked", () => {
                d()
            });
            yield qg(c)
        } catch (c) {
            throw gg(c, a, "", -1);
        }
    })
};

function Kg(a, b) {
    return new P("INCOMPATIBLE_DB_VERSION", {
        dbName: a.name,
        oldVersion: a.options.version,
        newVersion: b
    })
}

function Lg(a, b) {
    if (!b) throw hg("openWithToken", $f(a.name));
    return a.open()
}
var Mg = class {
    constructor(a, b) {
        this.name = a;
        this.options = b;
        this.j = !0;
        this.m = this.l = 0
    }
    i(a, b, c = {}) {
        return Ig(a, b, c)
    }
    delete(a = {}) {
        return Jg(this.name, a)
    }
    open() {
        if (!this.j) throw Kg(this);
        if (this.h) return this.h;
        let a;
        const b = () => {
                this.h === a && (this.h = void 0)
            },
            c = {
                blocking: e => {
                    e.close()
                },
                closed: b,
                gb: b,
                upgrade: this.options.upgrade
            },
            d = () => {
                const e = this;
                return r(function*() {
                    var f, g = null != (f = Error().stack) ? f : "";
                    try {
                        const k = yield e.i(e.name, e.options.version, c);
                        f = k;
                        var h = e.options;
                        const l = [];
                        for (const m of Object.keys(h.P)) {
                            const {
                                O: n,
                                kc: t = Number.MAX_VALUE
                            } = h.P[m];
                            !(f.h.version >= n) || f.h.version >= t || f.h.objectStoreNames.contains(m) || l.push(m)
                        }
                        if (0 !== l.length) {
                            const m = Object.keys(e.options.P),
                                n = k.objectStoreNames();
                            if (e.m < cf("ytidb_reopen_db_retries", 0)) return e.m++, k.close(), Xf(new P("DB_REOPENED_BY_MISSING_OBJECT_STORES", {
                                dbName: e.name,
                                expectedObjectStores: m,
                                foundObjectStores: n
                            })), d();
                            if (e.l < cf("ytidb_remake_db_retries", 1)) return e.l++, yield e.delete(), Xf(new P("DB_DELETED_BY_MISSING_OBJECT_STORES", {
                                dbName: e.name,
                                expectedObjectStores: m,
                                foundObjectStores: n
                            })), d();
                            throw new dg(n, m);
                        }
                        return k
                    } catch (k) {
                        if (k instanceof DOMException ? "VersionError" === k.name : "DOMError" in self && k instanceof DOMError ? "VersionError" === k.name : k instanceof Object && "message" in k && "An attempt was made to open a database using a lower version than the existing version." ===
                            k.message) {
                            g = yield e.i(e.name, void 0, Object.assign({}, c, {
                                upgrade: void 0
                            }));
                            h = g.h.version;
                            if (void 0 !== e.options.version && h > e.options.version + 1) throw g.close(), e.j = !1, Kg(e, h);
                            return g
                        }
                        b();
                        k instanceof Error && !N("ytidb_async_stack_killswitch") && (k.stack = `${k.stack}\n${g.substring(g.indexOf("\n")+1)}`);
                        let l;
                        throw gg(k, e.name, "", null != (l = e.options.version) ? l : -1);
                    }
                })
            };
        return this.h = a = d()
    }
};
const Ng = new Mg("YtIdbMeta", {
    P: {
        databases: {
            O: 1
        }
    },
    upgrade(a, b) {
        b(1) && wg(a, "databases", {
            keyPath: "actualName"
        })
    }
});

function Og(a, b) {
    return r(function*() {
        return S(yield Lg(Ng, b), ["databases"], {
            F: !0,
            mode: "readwrite"
        }, c => {
            const d = c.objectStore("databases");
            return d.get(a.actualName).then(e => {
                if (e ? a.actualName !== e.actualName || a.publicName !== e.publicName || a.userIdentifier !== e.userIdentifier : 1) return Q(d.h.put(a, void 0)).then(() => {})
            })
        })
    })
}

function Pg(a, b) {
    return r(function*() {
        if (a) return (yield Lg(Ng, b)).delete("databases", a)
    })
};
let Qg;
const Rg = new class {
    constructor() {}
}(new class {
    constructor() {}
});

function Sg() {
    return r(function*() {
        return !0
    })
}

function Tg() {
    if (void 0 !== Qg) return Qg;
    Wf = !0;
    return Qg = Sg().then(a => {
        Wf = !1;
        return a
    })
}

function Ug() {
    return y("ytglobal.idbToken_") || void 0
}

function Vg() {
    const a = Ug();
    return a ? Promise.resolve(a) : Tg().then(b => {
        (b = b ? Rg : void 0) && v("ytglobal.idbToken_", b);
        return b
    })
};
new ld;

function Wg(a) {
    try {
        Tf();
        var b = !0
    } catch (c) {
        b = !1
    }
    if (!b) throw a = new P("AUTH_INVALID", {
        dbName: a
    }), Xf(a), a;
    b = Tf();
    return {
        actualName: `${a}:${b}`,
        publicName: a,
        userIdentifier: b
    }
}

function Xg(a, b, c, d) {
    return r(function*() {
        var e, f = null != (e = Error().stack) ? e : "";
        e = yield Vg();
        if (!e) throw e = hg("openDbImpl", a, b), N("ytidb_async_stack_killswitch") || (e.stack = `${e.stack}\n${f.substring(f.indexOf("\n")+1)}`), Xf(e), e;
        Zf(a);
        f = c ? {
            actualName: a,
            publicName: a,
            userIdentifier: void 0
        } : Wg(a);
        try {
            return yield Og(f, e), yield Ig(f.actualName, b, d)
        } catch (g) {
            try {
                yield Pg(f.actualName, e)
            } catch (h) {}
            throw g;
        }
    })
}

function Yg(a, b, c = {}) {
    return Xg(a, b, !1, c)
}

function Zg(a, b, c = {}) {
    return Xg(a, b, !0, c)
}

function $g(a, b = {}) {
    return r(function*() {
        const c = yield Vg();
        if (c) {
            Zf(a);
            var d = Wg(a);
            yield Jg(d.actualName, b);
            yield Pg(d.actualName, c)
        }
    })
}

function ah(a, b = {}) {
    return r(function*() {
        const c = yield Vg();
        c && (Zf(a), yield Jg(a, b), yield Pg(a, c))
    })
};

function bh(a, b) {
    let c;
    return () => {
        c || (c = new ch(a, b));
        return c
    }
}
var ch = class extends Mg {
    constructor(a, b) {
        super(a, b);
        this.options = b;
        Zf(a)
    }
    i(a, b, c = {}) {
        return (this.options.da ? Zg : Yg)(a, b, Object.assign({}, c))
    }
    delete(a = {}) {
        return (this.options.da ? ah : $g)(this.name, a)
    }
};

function dh(a, b) {
    return bh(a, b)
};
var eh = dh("ytGcfConfig", {
    P: {
        coldConfigStore: {
            O: 1
        },
        hotConfigStore: {
            O: 1
        }
    },
    da: !1,
    upgrade(a, b) {
        b(1) && (wg(a, "hotConfigStore", {
            keyPath: "key",
            autoIncrement: !0
        }).h.createIndex("hotTimestampIndex", "timestamp", {
            unique: !1
        }), wg(a, "coldConfigStore", {
            keyPath: "key",
            autoIncrement: !0
        }).h.createIndex("coldTimestampIndex", "timestamp", {
            unique: !1
        }))
    },
    version: 1
});

function fh(a) {
    return Lg(eh(), a)
}

function gh(a, b, c) {
    return r(function*() {
        const d = {
                config: a,
                hashData: b,
                timestamp: R()
            },
            e = yield fh(c);
        yield e.clear("hotConfigStore");
        return yield yg(e, "hotConfigStore", d)
    })
}

function hh(a, b, c, d) {
    return r(function*() {
        const e = {
                config: a,
                hashData: b,
                configData: c,
                timestamp: R()
            },
            f = yield fh(d);
        yield f.clear("coldConfigStore");
        return yield yg(f, "coldConfigStore", e)
    })
}

function ih(a) {
    return r(function*() {
        let b = void 0;
        yield S(yield fh(a), ["coldConfigStore"], {
            mode: "readwrite",
            F: !0
        }, c => Fg(c.objectStore("coldConfigStore").index("coldTimestampIndex"), {
            direction: "prev"
        }, d => {
            b = d.R()
        }));
        return b
    })
}

function jh(a) {
    return r(function*() {
        let b = void 0;
        yield S(yield fh(a), ["hotConfigStore"], {
            mode: "readwrite",
            F: !0
        }, c => Fg(c.objectStore("hotConfigStore").index("hotTimestampIndex"), {
            direction: "prev"
        }, d => {
            b = d.R()
        }));
        return b
    })
};

function kh(a, b, c) {
    return r(function*() {
        if (N("update_log_event_config")) {
            c && (a.i = c, v("yt.gcf.config.hotConfigGroup", a.i));
            a.hotHashData = b;
            v("yt.gcf.config.hotHashData", a.hotHashData);
            const d = Ug();
            if (d) {
                if (!c) {
                    let e;
                    c = null == (e = yield jh(d)) ? void 0 : e.config
                }
                yield gh(c, b, d)
            }
        }
    })
}

function lh(a, b, c) {
    return r(function*() {
        if (N("update_log_event_config")) {
            a.coldHashData = b;
            v("yt.gcf.config.coldHashData", a.coldHashData);
            const d = Ug();
            if (d) {
                if (!c) {
                    let e;
                    c = null == (e = yield ih(d)) ? void 0 : e.config
                }
                c && (yield hh(c, b, c.configData, d))
            }
        }
    })
}
var mh = class {
    constructor() {
        this.h = 0
    }
};

function nh() {
    return "INNERTUBE_API_KEY" in Ze && "INNERTUBE_API_VERSION" in Ze
}

function oh() {
    return {
        innertubeApiKey: M("INNERTUBE_API_KEY"),
        innertubeApiVersion: M("INNERTUBE_API_VERSION"),
        ga: M("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),
        Ta: M("INNERTUBE_CONTEXT_CLIENT_NAME", "WEB"),
        Ua: M("INNERTUBE_CONTEXT_CLIENT_NAME", 1),
        innertubeContextClientVersion: M("INNERTUBE_CONTEXT_CLIENT_VERSION"),
        va: M("INNERTUBE_CONTEXT_HL"),
        ta: M("INNERTUBE_CONTEXT_GL"),
        Va: M("INNERTUBE_HOST_OVERRIDE") || "",
        Xa: !!M("INNERTUBE_USE_THIRD_PARTY_AUTH", !1),
        Wa: !!M("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT", !1),
        appInstallData: M("SERIALIZED_CLIENT_CONFIG_DATA")
    }
}

function ph(a) {
    const b = {
        client: {
            hl: a.va,
            gl: a.ta,
            clientName: a.Ta,
            clientVersion: a.innertubeContextClientVersion,
            configInfo: a.ga
        }
    };
    navigator.userAgent && (b.client.userAgent = String(navigator.userAgent));
    var c = u.devicePixelRatio;
    c && 1 != c && (b.client.screenDensityFloat = String(c));
    c = df();
    "" !== c && (b.client.experimentsToken = c);
    c = ef();
    0 < c.length && (b.request = {
        internalExperimentFlags: c
    });
    N("enable_third_party_info") && qh(void 0, b);
    rh(a, void 0, b);
    N("start_sending_config_hash") && sh(void 0, b);
    M("DELEGATED_SESSION_ID") &&
        !N("pageid_as_header_web") && (b.user = {
            onBehalfOfUser: M("DELEGATED_SESSION_ID")
        });
    a = Object;
    c = a.assign;
    var d = b.client,
        e = M("DEVICE", "");
    const f = {};
    for (const [g, h] of Object.entries(qf(e))) {
        e = g;
        const k = h;
        "cbrand" === e ? f.deviceMake = k : "cmodel" === e ? f.deviceModel = k : "cbr" === e ? f.browserName = k : "cbrver" === e ? f.browserVersion = k : "cos" === e ? f.osName = k : "cosver" === e ? f.osVersion = k : "cplatform" === e && (f.platform = k)
    }
    b.client = c.call(a, d, f);
    return b
}

function th(a) {
    const b = new ge,
        c = new Wd;
    C(c, 1, a.va);
    C(c, 2, a.ta);
    C(c, 16, a.Ua);
    C(c, 17, a.innertubeContextClientVersion);
    if (a.ga) {
        var d = a.ga,
            e = new Sd;
        d.coldConfigData && C(e, 1, d.coldConfigData);
        d.appInstallData && C(e, 6, d.appInstallData);
        d.coldHashData && C(e, 3, d.coldHashData);
        d.hotHashData && C(e, 5, d.hotHashData);
        D(c, Sd, 62, e)
    }
    if ((d = u.devicePixelRatio) && 1 != d) {
        if (null != d && "number" !== typeof d) throw Error(`Value of float/double field must be a number|null|undefined, found ${typeof d}: ${d}`);
        C(c, 65, d)
    }
    d = df();
    "" !==
    d && C(c, 54, d);
    d = ef();
    if (0 < d.length) {
        e = new $d;
        for (let f = 0; f < d.length; f++) {
            const g = new Yd;
            C(g, 1, d[f].key);
            Gb(g, 2, Xd, d[f].value);
            Nb(e, 15, Yd, g)
        }
        D(b, $d, 5, e)
    }
    N("enable_third_party_info") && qh(b);
    rh(a, c);
    N("start_sending_config_hash") && sh(c);
    M("DELEGATED_SESSION_ID") && !N("pageid_as_header_web") && (a = new ee, C(a, 3, M("DELEGATED_SESSION_ID")));
    a = M("DEVICE", "");
    for (const [f, g] of Object.entries(qf(a))) a = f, d = g, "cbrand" === a ? C(c, 12, d) : "cmodel" === a ? C(c, 13, d) : "cbr" === a ? C(c, 87, d) : "cbrver" === a ? C(c, 88, d) : "cos" === a ? C(c, 18,
        d) : "cosver" === a ? C(c, 19, d) : "cplatform" === a && C(c, 42, d);
    b.j(c);
    return b
}

function qh(a, b) {
    const c = y("yt.embedded_player.embed_url");
    c && (a ? (b = Ib(a, be, 7) || new be, C(b, 4, c), D(a, be, 7, b)) : b && (b.thirdParty = {
        embedUrl: c
    }))
}

function rh(a, b, c) {
    if (a.appInstallData)
        if (b) {
            let d;
            c = null != (d = Ib(b, Sd, 62)) ? d : new Sd;
            C(c, 6, a.appInstallData);
            D(b, Sd, 62, c)
        } else c && (c.client.configInfo = c.client.configInfo || {}, c.client.configInfo.appInstallData = a.appInstallData)
}

function uh(a, b, c = {}) {
    let d = {};
    M("EOM_VISITOR_DATA") ? d = {
        "X-Goog-EOM-Visitor-Id": M("EOM_VISITOR_DATA")
    } : d = {
        "X-Goog-Visitor-Id": c.visitorData || M("VISITOR_DATA", "")
    };
    if (b && b.includes("www.youtube-nocookie.com")) return d;
    b = c.Pb || M("AUTHORIZATION");
    b || (a ? b = `Bearer ${y("gapi.auth.getToken")().Ob}` : (a = Nf(Lf()), N("pageid_as_header_web") || delete a["X-Goog-PageId"], d = Object.assign({}, d, a)));
    b && (d.Authorization = b);
    return d
}

function sh(a, b) {
    mh.h || (mh.h = new mh);
    var c = mh.h;
    var d = R() - c.h;
    if (0 !== c.h && d < cf("send_config_hash_timer")) c = void 0;
    else {
        d = y("yt.gcf.config.coldConfigData");
        var e = y("yt.gcf.config.hotHashData"),
            f = y("yt.gcf.config.coldHashData");
        d && e && f && (c.h = R());
        c = {
            coldConfigData: d,
            hotHashData: e,
            coldHashData: f
        }
    }
    if (e = c)
        if (c = e.coldConfigData, d = e.coldHashData, e = e.hotHashData, c && d && e)
            if (a) {
                let g;
                b = null != (g = Ib(a, Sd, 62)) ? g : new Sd;
                C(b, 1, c);
                C(b, 3, d);
                C(b, 5, e);
                D(a, Sd, 62, b)
            } else b && (b.client.configInfo = b.client.configInfo || {},
                b.client.configInfo.coldConfigData = c, b.client.configInfo.coldHashData = d, b.client.configInfo.hotHashData = e)
};

function vh(a) {
    this.version = 1;
    this.args = a
};

function wh() {
    var a = xh;
    this.topic = "screen-created";
    this.h = a
}
wh.prototype.toString = function() {
    return this.topic
};
const yh = y("ytPubsub2Pubsub2Instance") || new H;
H.prototype.subscribe = H.prototype.Ia;
H.prototype.unsubscribeByKey = H.prototype.ma;
H.prototype.publish = H.prototype.ka;
H.prototype.clear = H.prototype.clear;
v("ytPubsub2Pubsub2Instance", yh);
const zh = y("ytPubsub2Pubsub2SubscribedKeys") || {};
v("ytPubsub2Pubsub2SubscribedKeys", zh);
const Ah = y("ytPubsub2Pubsub2TopicToKeys") || {};
v("ytPubsub2Pubsub2TopicToKeys", Ah);
const Bh = y("ytPubsub2Pubsub2IsAsync") || {};
v("ytPubsub2Pubsub2IsAsync", Bh);
v("ytPubsub2Pubsub2SkipSubKey", null);

function Eh(a) {
    var b = Fh;
    const c = Gh();
    c && c.publish.call(c, b.toString(), b, a)
}

function Hh(a) {
    var b = Fh;
    const c = Gh();
    if (!c) return 0;
    const d = c.subscribe(b.toString(), (e, f) => {
        var g = y("ytPubsub2Pubsub2SkipSubKey");
        g && g == d || (g = () => {
            if (zh[d]) try {
                if (f && b instanceof wh && b != e) try {
                    var h = b.h,
                        k = f;
                    if (!k.args || !k.version) throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");
                    try {
                        if (!h.Ba) {
                            const p = new h;
                            h.Ba = p.version
                        }
                        var l = h.Ba
                    } catch (p) {}
                    if (!l || k.version != l) throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");
                    try {
                        l = Reflect;
                        var m = l.construct; {
                            var n = k.args;
                            const p = n.length;
                            if (0 < p) {
                                const x = Array(p);
                                for (k = 0; k < p; k++) x[k] = n[k];
                                var t = x
                            } else t = []
                        }
                        f = m.call(l, h, t)
                    } catch (p) {
                        throw p.message = "yt.pubsub2.Data.deserialize(): " + p.message, p;
                    }
                } catch (p) {
                    throw p.message = "yt.pubsub2.pubsub2 cross-binary conversion error for " + b.toString() + ": " + p.message, p;
                }
                a.call(window, f)
            } catch (p) {
                jf(p)
            }
        }, Bh[b.toString()] ? y("yt.scheduler.instance") ? Sf.h(g) : tf(g, 0) : g())
    });
    zh[d] = !0;
    Ah[b.toString()] || (Ah[b.toString()] = []);
    Ah[b.toString()].push(d);
    return d
}

function Ih() {
    var a = Jh;
    const b = Hh(function(c) {
        a.apply(void 0, arguments);
        Kh(b)
    });
    return b
}

function Kh(a) {
    const b = Gh();
    b && ("number" === typeof a && (a = [a]), qa(a, c => {
        b.unsubscribeByKey(c);
        delete zh[c]
    }))
}

function Gh() {
    return y("ytPubsub2Pubsub2Instance")
};
const Lh = ["client.name", "client.version"];

function Mh(a) {
    if (!a.errorMetadata || !a.errorMetadata.kvPairs) return a;
    a.errorMetadata.kvPairs = a.errorMetadata.kvPairs.filter(b => b.key ? Lh.includes(b.key) : !1);
    return a
};
var Nh = dh("ServiceWorkerLogsDatabase", {
    P: {
        SWHealthLog: {
            O: 1
        }
    },
    da: !0,
    upgrade: (a, b) => {
        b(1) && wg(a, "SWHealthLog", {
            keyPath: "id",
            autoIncrement: !0
        }).h.createIndex("swHealthNewRequest", ["interface", "timestamp"], {
            unique: !1
        })
    },
    version: 1
});

function Oh(a, b) {
    return r(function*() {
        var c = yield Lg(Nh(), b), d = M("INNERTUBE_CONTEXT_CLIENT_NAME", 0);
        const e = Object.assign({}, a);
        e.clientError && (e.clientError = Mh(e.clientError));
        e.interface = d;
        return yg(c, "SWHealthLog", e)
    })
};
v("ytNetworklessLoggingInitializationOptions", u.ytNetworklessLoggingInitializationOptions || {
    isNwlInitialized: !1
});

function Ph(a, b, c) {
    !M("VISITOR_DATA") && .01 > Math.random() && kf(new O("Missing VISITOR_DATA when sending innertube request.", "log_event", b, c));
    if (!a.isReady()) throw a = new O("innertube xhrclient not ready", "log_event", b, c), jf(a), a;
    b = {
        headers: c.headers || {},
        method: "POST",
        postParams: b,
        postBody: c.postBody,
        postBodyFormat: c.postBodyFormat || "JSON",
        onTimeout: () => {
            c.onTimeout()
        },
        onFetchTimeout: c.onTimeout,
        onSuccess: (k, l) => {
            if (c.onSuccess) c.onSuccess(l)
        },
        onFetchSuccess: k => {
            if (c.onSuccess) c.onSuccess(k)
        },
        onError: (k, l) => {
            if (c.onError) c.onError(l)
        },
        onFetchError: k => {
            if (c.onError) c.onError(k)
        },
        timeout: c.timeout,
        withCredentials: !0,
        compress: c.compress
    };
    b.headers["Content-Type"] || (b.headers["Content-Type"] = "application/json");
    let d = "";
    var e = a.config_.Va;
    e && (d = e);
    var f = a.config_.Xa || !1;
    e = uh(f, d, c);
    Object.assign(b.headers, e);
    (e = b.headers.Authorization) && !d && f && (b.headers["x-origin"] = window.location.origin);
    f = `/${"youtubei"}/${a.config_.innertubeApiVersion}/${"log_event"}`;
    let g = {
            alt: "json"
        },
        h = a.config_.Wa && e;
    h = h && e.startsWith("Bearer");
    h || (g.key = a.config_.innertubeApiKey);
    a = rf(`${d}${f}`, g || {}, !0);
    try {
        vf(a, b)
    } catch (k) {
        if ("InvalidAccessError" == k.name) kf(Error("An extension is blocking network request."));
        else throw k;
    }
}
class Qh {
    constructor(a) {
        this.config_ = null;
        a ? this.config_ = a : nh() && (this.config_ = oh())
    }
    isReady() {
        !this.config_ && nh() && (this.config_ = oh());
        return !!this.config_
    }
};
let Rh = 0;
v("ytDomDomGetNextId", y("ytDomDomGetNextId") || (() => ++Rh));
const Sh = {
    stopImmediatePropagation: 1,
    stopPropagation: 1,
    preventMouseEvent: 1,
    preventManipulation: 1,
    preventDefault: 1,
    layerX: 1,
    layerY: 1,
    screenX: 1,
    screenY: 1,
    scale: 1,
    rotation: 1,
    webkitMovementX: 1,
    webkitMovementY: 1
};

function Th(a) {
    if (document.body && document.documentElement) {
        const b = document.body.scrollTop + document.documentElement.scrollTop;
        a.h = a.clientX + (document.body.scrollLeft + document.documentElement.scrollLeft);
        a.i = a.clientY + b
    }
}
class Uh {
    constructor(a) {
        this.type = "";
        this.state = this.source = this.data = this.currentTarget = this.relatedTarget = this.target = null;
        this.charCode = this.keyCode = 0;
        this.metaKey = this.shiftKey = this.ctrlKey = this.altKey = !1;
        this.clientY = this.clientX = 0;
        this.changedTouches = this.touches = null;
        try {
            if (a = a || window.event) {
                this.event = a;
                for (let d in a) d in Sh || (this[d] = a[d]);
                var b = a.target || a.srcElement;
                b && 3 == b.nodeType && (b = b.parentNode);
                this.target = b;
                var c = a.relatedTarget;
                if (c) try {
                    c = c.nodeName ? c : null
                } catch (d) {
                    c = null
                } else "mouseover" ==
                    this.type ? c = a.fromElement : "mouseout" == this.type && (c = a.toElement);
                this.relatedTarget = c;
                this.clientX = void 0 != a.clientX ? a.clientX : a.pageX;
                this.clientY = void 0 != a.clientY ? a.clientY : a.pageY;
                this.keyCode = a.keyCode ? a.keyCode : a.which;
                this.charCode = a.charCode || ("keypress" == this.type ? this.keyCode : 0);
                this.altKey = a.altKey;
                this.ctrlKey = a.ctrlKey;
                this.shiftKey = a.shiftKey;
                this.metaKey = a.metaKey;
                this.h = a.pageX;
                this.i = a.pageY
            }
        } catch (d) {}
    }
    preventDefault() {
        this.event && (this.event.returnValue = !1, this.event.preventDefault &&
            this.event.preventDefault())
    }
    stopPropagation() {
        this.event && (this.event.cancelBubble = !0, this.event.stopPropagation && this.event.stopPropagation())
    }
    stopImmediatePropagation() {
        this.event && (this.event.cancelBubble = !0, this.event.stopImmediatePropagation && this.event.stopImmediatePropagation())
    }
};
const va = u.ytEventsEventsListeners || {};
v("ytEventsEventsListeners", va);
const Vh = u.ytEventsEventsCounter || {
    count: 0
};
v("ytEventsEventsCounter", Vh);

function Wh(a, b, c, d = {}) {
    a.addEventListener && ("mouseenter" != b || "onmouseenter" in document ? "mouseleave" != b || "onmouseenter" in document ? "mousewheel" == b && "MozBoxSizing" in document.documentElement.style && (b = "MozMousePixelScroll") : b = "mouseout" : b = "mouseover");
    return ua(e => {
        const f = "boolean" === typeof e[4] && e[4] == !!d;
        var g;
        if (g = ia(e[4]) && ia(d)) a: {
            g = e[4];
            for (const h in g)
                if (!(h in d) || g[h] !== d[h]) {
                    g = !1;
                    break a
                }
            for (const h in d)
                if (!(h in g)) {
                    g = !1;
                    break a
                }
            g = !0
        }
        return !!e.length && e[0] == a && e[1] == b && e[2] == c && (f || g)
    })
}
const Xh = function(a) {
    let b = !1,
        c;
    return function() {
        b || (c = a(), b = !0);
        return c
    }
}(function() {
    let a = !1;
    try {
        const b = Object.defineProperty({}, "capture", {
            get: function() {
                a = !0
            }
        });
        window.addEventListener("test", null, b)
    } catch (b) {}
    return a
});

function Yh(a, b, c, d = {}) {
    if (!a || !a.addEventListener && !a.attachEvent) return "";
    let e = Wh(a, b, c, d);
    if (e) return e;
    e = ++Vh.count + "";
    const f = !("mouseenter" != b && "mouseleave" != b || !a.addEventListener || "onmouseenter" in document);
    let g;
    g = f ? h => {
        h = new Uh(h);
        if (!Jc(h.relatedTarget, k => k == a)) return h.currentTarget = a, h.type = b, c.call(a, h)
    } : h => {
        h = new Uh(h);
        h.currentTarget = a;
        return c.call(a, h)
    };
    g = hf(g);
    a.addEventListener ? ("mouseenter" == b && f ? b = "mouseover" : "mouseleave" == b && f ? b = "mouseout" : "mousewheel" == b && "MozBoxSizing" in document.documentElement.style && (b = "MozMousePixelScroll"), Xh() || "boolean" === typeof d ? a.addEventListener(b, g, d) : a.addEventListener(b, g, !!d.capture)) : a.attachEvent(`on${b}`, g);
    va[e] = [a, b, c, g, d];
    return e
}

function Zh(a) {
    a && ("string" == typeof a && (a = [a]), qa(a, b => {
        if (b in va) {
            var c = va[b];
            const d = c[0],
                e = c[1],
                f = c[3];
            c = c[4];
            d.removeEventListener ? Xh() || "boolean" === typeof c ? d.removeEventListener(e, f, c) : d.removeEventListener(e, f, !!c.capture) : d.detachEvent && d.detachEvent(`on${e}`, f);
            delete va[b]
        }
    }))
};

function $h(a) {
    this.V = a;
    this.h = null;
    this.u = 0;
    this.D = null;
    this.v = 0;
    this.i = [];
    for (a = 0; 4 > a; a++) this.i.push(0);
    this.m = 0;
    this.Da = Yh(window, "mousemove", ma(this.Ga, this));
    a = ma(this.Ca, this);
    "function" === typeof a && (a = hf(a));
    this.Ha = window.setInterval(a, 25)
}
na($h, Zc);
$h.prototype.Ga = function(a) {
    void 0 === a.h && Th(a);
    var b = a.h;
    void 0 === a.i && Th(a);
    this.h = new Ic(b, a.i)
};
$h.prototype.Ca = function() {
    if (this.h) {
        var a = R();
        if (0 != this.u) {
            var b = this.D,
                c = this.h,
                d = b.x - c.x;
            b = b.y - c.y;
            d = Math.sqrt(d * d + b * b) / (a - this.u);
            this.i[this.m] = .5 < Math.abs((d - this.v) / this.v) ? 1 : 0;
            for (c = b = 0; 4 > c; c++) b += this.i[c] || 0;
            3 <= b && this.V();
            this.v = d
        }
        this.u = a;
        this.D = this.h;
        this.m = (this.m + 1) % 4
    }
};
$h.prototype.X = function() {
    window.clearInterval(this.Ha);
    Zh(this.Da)
};
const ai = {};

function bi() {
    var {
        hc: a = !1,
        Wb: b = !0
    } = {};
    if (null == y("_lact", window)) {
        var c = parseInt(M("LACT"), 10);
        c = isFinite(c) ? Date.now() - Math.max(c, 0) : -1;
        v("_lact", c, window);
        v("_fact", c, window); - 1 == c && ci();
        Yh(document, "keydown", ci);
        Yh(document, "keyup", ci);
        Yh(document, "mousedown", ci);
        Yh(document, "mouseup", ci);
        a ? Yh(window, "touchmove", () => {
            di("touchmove", 200)
        }, {
            passive: !0
        }) : (Yh(window, "resize", () => {
            di("resize", 200)
        }), b && Yh(window, "scroll", () => {
            di("scroll", 200)
        }));
        new $h(() => {
            di("mouse", 100)
        });
        Yh(document, "touchstart", ci, {
            passive: !0
        });
        Yh(document, "touchend", ci, {
            passive: !0
        })
    }
}

function di(a, b) {
    ai[a] || (ai[a] = !0, Sf.h(() => {
        ci();
        ai[a] = !1
    }, b))
}

function ci() {
    null == y("_lact", window) && bi();
    var a = Date.now();
    v("_lact", a, window); - 1 == y("_fact", window) && v("_fact", a, window);
    (a = y("ytglobal.ytUtilActivityCallback_")) && a()
}

function ei() {
    const a = y("_lact", window);
    return null == a ? -1 : Math.max(Date.now() - a, 0)
};
u.ytPubsubPubsubInstance || new H;
var fi = Symbol("injectionDeps"),
    gi = class {
        constructor() {
            this.name = "INNERTUBE_TRANSPORT_TOKEN"
        }
        toString() {
            return `InjectionToken(${this.name})`
        }
    },
    hi = class {
        constructor() {
            this.key = mh
        }
    };

function ii(a) {
    var b = {
        ab: ji,
        Aa: ki.h
    };
    a.i.set(b.ab, b)
}

function li(a, b, c, d = !1) {
    if (-1 < c.indexOf(b)) throw Error(`Deps cycle for: ${b}`);
    if (a.h.has(b)) return a.h.get(b);
    if (!a.i.has(b)) {
        if (d) return;
        throw Error(`No provider for: ${b}`);
    }
    d = a.i.get(b);
    c.push(b);
    if (d.Aa) var e = d.Aa;
    else if (d.lb) e = d[fi] ? mi(a, d[fi], c) : [], e = d.lb(...e);
    else if (d.kb) {
        e = d.kb;
        const f = e[fi] ? mi(a, e[fi], c) : [];
        e = new e(...f)
    } else throw Error(`Could not resolve providers for: ${b}`);
    c.pop();
    d.sc || a.h.set(b, e);
    return e
}

function mi(a, b, c) {
    return b ? b.map(d => d instanceof hi ? li(a, d.key, c, !0) : li(a, d, c)) : []
}
var ni = class {
    constructor() {
        this.i = new Map;
        this.h = new Map
    }
    resolve(a) {
        return a instanceof hi ? li(this, a.key, [], !0) : li(this, a, [])
    }
};
let oi;

function pi() {
    oi || (oi = new ni);
    return oi
};

function qi(a, b) {
    const c = ri(b);
    if (a.h[c]) return a.h[c];
    const d = Object.keys(a.store) || [];
    if (1 >= d.length && ri(b) === d[0]) return d;
    const e = [];
    for (let g = 0; g < d.length; g++) {
        const h = d[g].split("/");
        if (si(b.auth, h[0])) {
            var f = b.isJspb;
            si(void 0 === f ? "undefined" : f ? "true" : "false", h[1]) && si(b.cttAuthInfo, h[2]) && e.push(d[g])
        }
    }
    return a.h[c] = e
}

function si(a, b) {
    return void 0 === a || "undefined" === a ? !0 : a === b
}
var ti = class {
    constructor() {
        this.store = {};
        this.h = {}
    }
    storePayload(a, b) {
        a = ri(a);
        this.store[a] ? this.store[a].push(b) : (this.h = {}, this.store[a] = [b]);
        return a
    }
    extractMatchingEntries(a) {
        a = qi(this, a);
        const b = [];
        for (let c = 0; c < a.length; c++) this.store[a[c]] && (b.push(...this.store[a[c]]), delete this.store[a[c]]);
        return b
    }
    getSequenceCount(a) {
        a = qi(this, a);
        let b = 0;
        for (let c = 0; c < a.length; c++) b += this.store[a[c]].length || 0;
        return b
    }
};
ti.prototype.getSequenceCount = ti.prototype.getSequenceCount;
ti.prototype.extractMatchingEntries = ti.prototype.extractMatchingEntries;
ti.prototype.storePayload = ti.prototype.storePayload;

function ri(a) {
    return [void 0 === a.auth ? "undefined" : a.auth, void 0 === a.isJspb ? "undefined" : a.isJspb, void 0 === a.cttAuthInfo ? "undefined" : a.cttAuthInfo].join("/")
};

function ui(a, b) {
    if (a) return a[b.name]
};
const vi = cf("initial_gel_batch_timeout", 2E3),
    wi = cf("gel_queue_timeout_max_ms", 6E4),
    xi = Math.pow(2, 16) - 1;
let T = void 0;
class yi {
    constructor() {
        this.j = this.h = this.i = 0
    }
}
const zi = new yi,
    Ai = new yi;
let Bi, Ci = !0;
const Di = u.ytLoggingTransportTokensToCttTargetIds_ || {},
    Ei = u.ytLoggingTransportTokensToJspbCttTargetIds_ || {};
let Fi = {};

function Gi() {
    let a = y("yt.logging.ims");
    a || (a = new ti, v("yt.logging.ims", a));
    return a
}

function Hi(a, b) {
    N("web_all_payloads_via_jspb") && kf(new O("transport.log called for JSON in JSPB only experiment"));
    if ("log_event" === a.endpoint) {
        var c = Ii(a);
        Fi[c] = !0;
        var d = {
            cttAuthInfo: c,
            isJspb: !1
        };
        Gi().storePayload(d, a.payload);
        Ji(b, c, !1, d)
    }
}

function Ki(a, b) {
    if ("log_event" === a.endpoint) {
        var c = Ii(a, !0);
        Fi[c] = !0;
        var d = {
            cttAuthInfo: c,
            isJspb: !0
        };
        Gi().storePayload(d, a.payload.toJSON());
        Ji(b, c, !0, d)
    }
}

function Ji(a, b, c = !1, d) {
    a && (T = new a);
    a = cf("tvhtml5_logging_max_batch_ads_fork") || cf("tvhtml5_logging_max_batch") || cf("web_logging_max_batch") || 100;
    const e = R(),
        f = c ? Ai.j : zi.j;
    let g = 0;
    d && (g = Gi().getSequenceCount(d));
    g >= a ? Bi || (Bi = Li(() => {
        Mi({
            writeThenSend: !0
        }, N("flush_only_full_queue") ? b : void 0, c);
        Bi = void 0
    }, 0)) : 10 <= e - f && (Ni(c), c ? Ai.j = e : zi.j = e)
}

function Oi(a, b) {
    N("web_all_payloads_via_jspb") && kf(new O("transport.logIsolatedGelPayload called in JSPB only experiment"));
    if ("log_event" === a.endpoint) {
        var c = Ii(a),
            d = new Map;
        d.set(c, [a.payload]);
        b && (T = new b);
        return new G((e, f) => {
            T && T.isReady() ? Pi(d, T, e, f, {
                bypassNetworkless: !0
            }, !0) : e()
        })
    }
}

function Qi(a, b) {
    if ("log_event" === a.endpoint) {
        var c = Ii(a, !0),
            d = new Map;
        d.set(c, [a.payload.toJSON()]);
        b && (T = new b);
        return new G(e => {
            T && T.isReady() ? Ri(d, T, e, {
                bypassNetworkless: !0
            }, !0) : e()
        })
    }
}

function Ii(a, b = !1) {
    var c = "";
    if (a.dangerousLogToVisitorSession) c = "visitorOnlyApprovedKey";
    else if (a.cttAuthInfo) {
        if (b) {
            b = a.cttAuthInfo.token;
            c = a.cttAuthInfo;
            const d = new Pe;
            c.videoId ? d.setVideoId(c.videoId) : c.playlistId && Gb(d, 2, Oe, c.playlistId);
            Ei[b] = d
        } else b = a.cttAuthInfo, c = {}, b.videoId ? c.videoId = b.videoId : b.playlistId && (c.playlistId = b.playlistId), Di[a.cttAuthInfo.token] = c;
        c = a.cttAuthInfo.token
    }
    return c
}

function Mi(a = {}, b, c = !1) {
    !c && N("web_all_payloads_via_jspb") && kf(new O("transport.flushLogs called for JSON in JSPB only experiment"));
    new G((d, e) => {
        c ? (Si(Ai.i), Si(Ai.h), Ai.h = 0) : (Si(zi.i), Si(zi.h), zi.h = 0);
        T && T.isReady() ? Ti(d, e, a, b, c) : (Ni(c), d())
    })
}

function Ti(a, b, c = {}, d, e = !1) {
    var f = T,
        g = new Map;
    const h = new Map;
    if (void 0 !== d) e ? (b = Gi().extractMatchingEntries({
        isJspb: e,
        cttAuthInfo: d
    }), g.set(d, b), Ri(g, f, a, c)) : (g = Gi().extractMatchingEntries({
        isJspb: e,
        cttAuthInfo: d
    }), h.set(d, g), Pi(h, f, a, b, c));
    else if (e) {
        for (const k of Object.keys(Fi)) b = Gi().extractMatchingEntries({
            isJspb: !0,
            cttAuthInfo: k
        }), 0 < b.length && g.set(k, b), delete Fi[k];
        Ri(g, f, a, c)
    } else {
        for (const k of Object.keys(Fi)) d = Gi().extractMatchingEntries({
            isJspb: !1,
            cttAuthInfo: k
        }), 0 < d.length && h.set(k,
            d), delete Fi[k];
        Pi(h, f, a, b, c)
    }
}

function Ni(a = !1) {
    if (N("web_gel_timeout_cap") && (!a && !zi.h || a && !Ai.h)) {
        var b = Li(() => {
            Mi({
                writeThenSend: !0
            }, void 0, a)
        }, wi);
        a ? Ai.h = b : zi.h = b
    }
    Si(a ? Ai.i : zi.i);
    b = M("LOGGING_BATCH_TIMEOUT", cf("web_gel_debounce_ms", 1E4));
    N("shorten_initial_gel_batch_timeout") && Ci && (b = vi);
    b = Li(() => {
        Mi({
            writeThenSend: !0
        }, void 0, a)
    }, b);
    a ? Ai.i = b : zi.i = b
}

function Pi(a, b, c, d, e = {}, f) {
    const g = Math.round(R());
    let h = a.size;
    for (const [l, m] of a) {
        a = l;
        var k = m;
        const n = xa({
            context: ph(b.config_ || oh())
        });
        if (!ha(k) && !N("throw_err_when_logevent_malformed_killswitch")) {
            d();
            break
        }
        n.events = k;
        (k = Di[a]) && Ui(n, a, k);
        delete Di[a];
        const t = "visitorOnlyApprovedKey" === a;
        Vi(n, g, t);
        Wi(e);
        const p = F => {
            N("update_log_event_config") && Sf.h(() => r(function*() {
                yield Xi(F)
            }));
            h--;
            h || c()
        };
        let x = 0;
        const w = () => {
            x++;
            if (e.bypassNetworkless && 1 === x) try {
                Ph(b, n, Yi({
                    writeThenSend: !0
                }, t, p, w, f)), Ci = !1
            } catch (F) {
                jf(F), d()
            }
            h--;
            h || c()
        };
        try {
            Ph(b, n, Yi(e, t, p, w, f)), Ci = !1
        } catch (F) {
            jf(F), d()
        }
    }
}

function Ri(a, b, c, d = {}, e) {
    const f = Math.round(R());
    let g = a.size;
    var h = new Map([...a]);
    for (const [m] of h) {
        var k = m,
            l = a.get(k);
        h = new Re;
        const n = th(b.config_ || oh());
        D(h, ge, 1, n);
        l = l ? Zi(l) : [];
        for (const t of l) Nb(h, 3, Ke, t);
        (l = Ei[k]) && $i(h, k, l);
        delete Ei[k];
        k = "visitorOnlyApprovedKey" === k;
        aj(h, f, k);
        Wi(d);
        h = Zb(h);
        k = Yi(d, k, t => {
            N("update_log_event_config") && Sf.h(() => r(function*() {
                yield Xi(t)
            }));
            g--;
            g || c()
        }, () => {
            g--;
            g || c()
        }, e);
        k.headers["Content-Type"] = "application/json+protobuf";
        k.postBodyFormat = "JSPB";
        k.postBody = h;
        Ph(b, "", k);
        Ci = !1
    }
}

function Wi(a) {
    N("always_send_and_write") && (a.writeThenSend = !1)
}

function Yi(a, b, c, d, e) {
    a = {
        retry: !0,
        onSuccess: c,
        onError: d,
        cc: a,
        dangerousLogToVisitorSession: b,
        Sb: !!e,
        headers: {},
        postBodyFormat: "",
        postBody: "",
        compress: N("compress_gel")
    };
    bj() && (a.headers["X-Goog-Request-Time"] = JSON.stringify(Math.round(R())));
    return a
}

function Vi(a, b, c) {
    bj() || (a.requestTimeMs = String(b));
    N("unsplit_gel_payloads_in_logs") && (a.unsplitGelPayloadsInLogs = !0);
    !c && (b = M("EVENT_ID")) && (c = cj(), a.serializedClientEventId = {
        serializedEventId: b,
        clientCounter: String(c)
    })
}

function aj(a, b, c) {
    bj() || C(a, 2, b);
    if (!c && (b = M("EVENT_ID"))) {
        c = cj();
        const d = new Ne;
        C(d, 1, b);
        C(d, 2, c);
        D(a, Ne, 5, d)
    }
}

function cj() {
    let a = M("BATCH_CLIENT_COUNTER") || 0;
    a || (a = Math.floor(Math.random() * xi / 2));
    a++;
    a > xi && (a = 1);
    K("BATCH_CLIENT_COUNTER", a);
    return a
}

function Ui(a, b, c) {
    let d;
    if (c.videoId) d = "VIDEO";
    else if (c.playlistId) d = "PLAYLIST";
    else return;
    a.credentialTransferTokenTargetId = c;
    a.context = a.context || {};
    a.context.user = a.context.user || {};
    a.context.user.credentialTransferTokens = [{
        token: b,
        scope: d
    }]
}

function $i(a, b, c) {
    var d = 1 === Hb(c, Oe) ? 1 : -1;
    if (B(c, d)) d = 1;
    else if (c.getPlaylistId()) d = 2;
    else return;
    D(a, Pe, 4, c);
    a = Ib(a, ge, 1) || new ge;
    c = Ib(a, ee, 3) || new ee;
    const e = new ce;
    C(e, 2, b);
    C(e, 1, d);
    Nb(c, 12, ce, e);
    D(a, ee, 3, c)
}

function Zi(a) {
    const b = [];
    for (let c = 0; c < a.length; c++) try {
        b.push(new Ke(a[c]))
    } catch (d) {
        jf(new O("Transport failed to deserialize " + String(a[c])))
    }
    return b
}

function bj() {
    return N("use_request_time_ms_header") || N("lr_use_request_time_ms_header")
}

function Li(a, b) {
    var c;
    N("transport_use_scheduler") ? c = Pf(a, 0, b) : c = tf(a, b);
    return c
}

function Si(a) {
    N("transport_use_scheduler") ? Sf.i(a) : window.clearTimeout(a)
}

function Xi(a) {
    return r(function*() {
        var b, c = null == a ? void 0 : null == (b = a.responseContext) ? void 0 : b.globalConfigGroup;
        b = ui(c, Md);
        const d = null == c ? void 0 : c.hotHashData,
            e = ui(c, Ld);
        c = null == c ? void 0 : c.coldHashData;
        var f = pi();
        if (f = f.resolve.call(f, new hi)) d && (b ? yield kh(f, d, b): yield kh(f, d)), c && (e ? yield lh(f, c, e): yield lh(f, c))
    })
};
const dj = u.ytLoggingGelSequenceIdObj_ || {};

function ej(a, b, c, d = {}) {
    const e = {},
        f = Math.round(d.timestamp || R());
    e.eventTimeMs = f < Number.MAX_SAFE_INTEGER ? f : 0;
    e[a] = b;
    N("enable_unknown_lact_fix_on_html5") && bi();
    a = ei();
    e.context = {
        lastActivityMs: String(d.timestamp || !isFinite(a) ? -1 : a)
    };
    N("log_sequence_info_on_gel_web") && d.sequenceGroup && (a = e.context, b = d.sequenceGroup, b = {
        index: fj(b),
        groupKey: b
    }, a.sequence = b, d.endOfSequence && delete dj[d.sequenceGroup]);
    (d.sendIsolatedPayload ? Oi : Hi)({
            endpoint: "log_event",
            payload: e,
            cttAuthInfo: d.cttAuthInfo,
            dangerousLogToVisitorSession: d.dangerousLogToVisitorSession
        },
        c)
}

function gj(a = !1) {
    Mi(void 0, void 0, a)
}

function fj(a) {
    dj[a] = a in dj ? dj[a] + 1 : 0;
    return dj[a]
};
let hj = Qh;

function U(a, b, c = {}) {
    let d = hj;
    M("ytLoggingEventsDefaultDisabled", !1) && hj === Qh && (d = null);
    N("web_all_payloads_via_jspb") && kf(new O("Logs should be translated to JSPB but are sent as JSON instead", a));
    ej(a, b, d, c)
};
const ij = u.ytLoggingGelSequenceIdObj_ || {};

function jj(a, b, c = {}) {
    var d = Math.round(c.timestamp || R());
    C(a, 1, d < Number.MAX_SAFE_INTEGER ? d : 0);
    var e = ei();
    d = new Je;
    C(d, 1, c.timestamp || !isFinite(e) ? -1 : e);
    if (N("log_sequence_info_on_gel_web") && c.sequenceGroup) {
        e = c.sequenceGroup;
        const f = fj(e),
            g = new Ie;
        C(g, 2, f);
        C(g, 1, e);
        D(d, Ie, 3, g);
        c.endOfSequence && delete ij[c.sequenceGroup]
    }
    D(a, Je, 33, d);
    (c.sendIsolatedPayload ? Qi : Ki)({
        endpoint: "log_event",
        payload: a,
        cttAuthInfo: c.cttAuthInfo,
        dangerousLogToVisitorSession: c.dangerousLogToVisitorSession
    }, b)
};

function kj(a, b = {}) {
    let c = !1;
    M("ytLoggingEventsDefaultDisabled", !1) && (c = !0);
    jj(a, c ? null : Qh, b)
};

function lj(a, b, c) {
    const d = new Ke;
    Mb(d, Ge, 72, Le, a);
    c ? jj(d, c, b) : kj(d, b)
}

function mj(a, b, c) {
    const d = new Ke;
    Mb(d, Fe, 73, Le, a);
    c ? jj(d, c, b) : kj(d, b)
}

function nj(a, b, c) {
    const d = new Ke;
    Mb(d, Ee, 78, Le, a);
    c ? jj(d, c, b) : kj(d, b)
}

function oj(a, b, c) {
    const d = new Ke;
    Mb(d, He, 208, Le, a);
    c ? jj(d, c, b) : kj(d, b)
}

function pj(a, b, c) {
    const d = new Ke;
    Mb(d, Ae, 156, Le, a);
    c ? jj(d, c, b) : kj(d, b)
}

function qj(a, b, c) {
    const d = new Ke;
    Mb(d, De, 215, Le, a);
    c ? jj(d, c, b) : kj(d, b)
};
var rj = new Set,
    sj = 0,
    tj = 0,
    uj = 0,
    vj = [];
const wj = ["PhantomJS", "Googlebot", "TO STOP THIS SECURITY SCAN go/scan"];

function xj(a) {
    yj(a)
}

function zj(a) {
    yj(a, "WARNING")
}

function yj(a, b = "ERROR") {
    var c = {};
    c.name = M("INNERTUBE_CONTEXT_CLIENT_NAME", 1);
    c.version = M("INNERTUBE_CONTEXT_CLIENT_VERSION");
    Aj(a, c || {}, b)
}

function Aj(a, b, c = "ERROR") {
    if (a) {
        a.hasOwnProperty("level") && a.level && (c = a.level);
        if (N("console_log_js_exceptions")) {
            var d = [];
            d.push(`Name: ${a.name}`);
            d.push(`Message: ${a.message}`);
            a.hasOwnProperty("params") && d.push(`Error Params: ${JSON.stringify(a.params)}`);
            a.hasOwnProperty("args") && d.push(`Error args: ${JSON.stringify(a.args)}`);
            d.push(`File name: ${a.fileName}`);
            d.push(`Stacktrace: ${a.stack}`);
            window.console.log(d.join("\n"), a)
        }
        if (!(5 <= sj)) {
            d = vj;
            var e = Kc(a);
            const F = e.message || "Unknown Error",
                Za = e.name || "UnknownError";
            var f = e.stack || a.i || "Not available";
            if (f.startsWith(`${Za}: ${F}`)) {
                var g = f.split("\n");
                g.shift();
                f = g.join("\n")
            }
            g = e.lineNumber || "Not available";
            e = e.fileName || "Not available";
            let L = 0;
            if (a.hasOwnProperty("args") && a.args && a.args.length)
                for (var h = 0; h < a.args.length && !(L = If(a.args[h], `params.${h}`, b, L), 500 <= L); h++);
            else if (a.hasOwnProperty("params") && a.params) {
                const ka = a.params;
                if ("object" === typeof a.params)
                    for (h in ka) {
                        if (!ka[h]) continue;
                        const Ch = `params.${h}`,
                            Dh = Kf(ka[h]);
                        b[Ch] =
                            Dh;
                        L += Ch.length + Dh.length;
                        if (500 < L) break
                    } else b.params = Kf(ka)
            }
            if (d.length)
                for (h = 0; h < d.length && !(L = If(d[h], `params.context.${h}`, b, L), 500 <= L); h++);
            navigator.vendor && !b.hasOwnProperty("vendor") && (b["device.vendor"] = navigator.vendor);
            b = {
                message: F,
                name: Za,
                lineNumber: g,
                fileName: e,
                stack: f,
                params: b,
                sampleWeight: 1
            };
            d = Number(a.columnNumber);
            isNaN(d) || (b.lineNumber = `${b.lineNumber}:${d}`);
            if ("IGNORED" === a.level) var k = 0;
            else a: {
                a = Bf();d = b;
                for (k of a.J)
                    if (d.message && d.message.match(k.Ya)) {
                        k = k.weight;
                        break a
                    }
                for (var l of a.H)
                    if (l.callback(d)) {
                        k =
                            l.weight;
                        break a
                    }
                k = 1
            }
            b.sampleWeight = k;
            k = b;
            for (var m of yf)
                if (m.aa[k.name]) {
                    l = m.aa[k.name];
                    for (var n of l)
                        if (l = k.message.match(n.A)) {
                            k.params["params.error.original"] = l[0];
                            a = n.groups;
                            b = {};
                            for (d = 0; d < a.length; d++) b[a[d]] = l[d + 1], k.params[`params.error.${a[d]}`] = l[d + 1];
                            k.message = m.ia(b);
                            break
                        }
                }
            k.params || (k.params = {});
            m = Bf();
            k.params["params.errorServiceSignature"] = `msg=${m.J.length}&cb=${m.H.length}`;
            k.params["params.serviceWorker"] = "true";
            u.document && u.document.querySelectorAll && (k.params["params.fscripts"] =
                String(document.querySelectorAll("script:not([nonce])").length));
            Ba("sample").constructor !== Aa && (k.params["params.fconst"] = "true");
            window.yterr && "function" === typeof window.yterr && window.yterr(k);
            if (0 !== k.sampleWeight && !rj.has(k.message)) {
                "ERROR" === c ? (Ff.ka("handleError", k), N("record_app_crashed_web") && 0 === uj && 1 === k.sampleWeight && (uj++, N("errors_via_jspb") ? (m = new se, C(m, 1, 1), N("report_client_error_with_app_crash_ks") || (l = new ne, C(l, 1, k.message), n = new oe, D(n, ne, 3, l), l = new pe, D(l, oe, 5, n), n = new re, D(n,
                    pe, 9, l), D(m, re, 4, n)), n = new Ke, Mb(n, se, 20, Le, m), kj(n)) : (m = {
                    appCrashType: "APP_CRASH_TYPE_BREAKPAD"
                }, N("report_client_error_with_app_crash_ks") || (m.systemHealth = {
                    crashData: {
                        clientError: {
                            logMessage: {
                                message: k.message
                            }
                        }
                    }
                }), U("appCrashed", m))), tj++) : "WARNING" === c && Ff.ka("handleWarning", k);
                a: {
                    if (N("errors_via_jspb")) {
                        if (Bj()) var t = void 0;
                        else {
                            m = new ke;
                            C(m, 1, k.stack);
                            k.fileName && C(m, 4, k.fileName);
                            var p = k.lineNumber && k.lineNumber.split ? k.lineNumber.split(":") : [];
                            0 !== p.length && (1 !== p.length || isNaN(Number(p[0])) ?
                                2 !== p.length || isNaN(Number(p[0])) || isNaN(Number(p[1])) || (C(m, 2, Number(p[0])), C(m, 3, Number(p[1]))) : C(m, 2, Number(p[0])));
                            p = new ne;
                            C(p, 1, k.message);
                            C(p, 3, k.name);
                            C(p, 6, k.sampleWeight);
                            "ERROR" === c ? C(p, 2, 2) : "WARNING" === c ? C(p, 2, 1) : C(p, 2, 0);
                            var x = new le;
                            C(x, 1, !0);
                            Mb(x, ke, 3, me, m);
                            m = new je;
                            C(m, 3, window.location.href);
                            n = M("FEXP_EXPERIMENTS", []);
                            for (b = 0; b < n.length; b++) l = m, a = n[b], zb(l), Fb(l, 5, 2, !1, !1).push(a);
                            n = $e();
                            if (!af() && n)
                                for (var w of Object.keys(n)) l = new he, C(l, 1, w), C(l, 2, String(n[w])), Nb(m, 4, he, l);
                            if (w =
                                k.params)
                                for (t of Object.keys(w)) n = new he, C(n, 1, `client.${t}`), C(n, 2, String(w[t])), Nb(m, 4, he, n);
                            w = M("SERVER_NAME");
                            t = M("SERVER_VERSION");
                            w && t && (n = new he, C(n, 1, "server.name"), C(n, 2, w), Nb(m, 4, he, n), w = new he, C(w, 1, "server.version"), C(w, 2, t), Nb(m, 4, he, w));
                            t = new oe;
                            D(t, je, 1, m);
                            D(t, le, 2, x);
                            D(t, ne, 3, p)
                        }
                        if (!t) break a;
                        w = new Ke;
                        Mb(w, oe, 163, Le, t);
                        kj(w)
                    } else {
                        if (Bj()) t = void 0;
                        else {
                            w = {
                                stackTrace: k.stack
                            };
                            k.fileName && (w.filename = k.fileName);
                            t = k.lineNumber && k.lineNumber.split ? k.lineNumber.split(":") : [];
                            0 !== t.length &&
                                (1 !== t.length || isNaN(Number(t[0])) ? 2 !== t.length || isNaN(Number(t[0])) || isNaN(Number(t[1])) || (w.lineNumber = Number(t[0]), w.columnNumber = Number(t[1])) : w.lineNumber = Number(t[0]));
                            t = {
                                level: "ERROR_LEVEL_UNKNOWN",
                                message: k.message,
                                errorClassName: k.name,
                                sampleWeight: k.sampleWeight
                            };
                            "ERROR" === c ? t.level = "ERROR_LEVEL_ERROR" : "WARNING" === c && (t.level = "ERROR_LEVEL_WARNNING");
                            w = {
                                isObfuscated: !0,
                                browserStackInfo: w
                            };
                            m = {
                                pageUrl: window.location.href,
                                kvPairs: []
                            };
                            M("FEXP_EXPERIMENTS") && (m.experimentIds = M("FEXP_EXPERIMENTS"));
                            n = $e();
                            if (!af() && n)
                                for (x of Object.keys(n)) m.kvPairs.push({
                                    key: x,
                                    value: String(n[x])
                                });
                            if (x = k.params)
                                for (p of Object.keys(x)) m.kvPairs.push({
                                    key: `client.${p}`,
                                    value: String(x[p])
                                });
                            p = M("SERVER_NAME");
                            x = M("SERVER_VERSION");
                            p && x && (m.kvPairs.push({
                                key: "server.name",
                                value: p
                            }), m.kvPairs.push({
                                key: "server.version",
                                value: x
                            }));
                            t = {
                                errorMetadata: m,
                                stackTrace: w,
                                logMessage: t
                            }
                        }
                        if (!t) break a;
                        U("clientError", t)
                    }
                    if ("ERROR" === c || N("errors_flush_gel_always_killswitch")) b: {
                        if (N("web_fp_via_jspb") && (gj(!0), !N("web_fp_via_jspb_and_json"))) break b;
                        gj()
                    }
                }
                try {
                    rj.add(k.message)
                } catch (ka) {}
                sj++
            }
        }
    }
}

function Bj() {
    for (const a of wj) {
        const b = Ea();
        if (b && 0 <= b.toLowerCase().indexOf(a.toLowerCase())) return !0
    }
    return !1
}

function Cj(a, ...b) {
    a.args || (a.args = []);
    a.args.push(...b)
};
let Dj = Date.now().toString();

function Ej() {
    const a = Array(16);
    for (var b = 0; 16 > b; b++) {
        var c = Date.now();
        for (let d = 0; d < c % 23; d++) a[b] = Math.random();
        a[b] = Math.floor(256 * Math.random())
    }
    if (Dj)
        for (b = 1, c = 0; c < Dj.length; c++) a[b % 16] = a[b % 16] ^ a[(b - 1) % 16] / 4 ^ Dj.charCodeAt(c), b++;
    return a
}

function Fj() {
    if (window.crypto && window.crypto.getRandomValues) try {
        const a = Array(16),
            b = new Uint8Array(16);
        window.crypto.getRandomValues(b);
        for (let c = 0; c < a.length; c++) a[c] = b[c];
        return a
    } catch (a) {}
    return Ej()
};

function Gj(a = !0) {
    a = a ? Fj() : Ej();
    const b = [];
    for (let c = 0; c < a.length; c++) b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[c] & 63));
    return b.join("")
};
let Hj = 1;

function V(a) {
    return new Ij({
        trackingParams: a
    })
}

function Jj(a) {
    const b = Hj++;
    return new Ij({
        veType: a,
        veCounter: b,
        elementIndex: void 0,
        dataElement: void 0,
        youtubeData: void 0,
        jspbYoutubeData: void 0
    })
}
var Ij = class {
    constructor(a) {
        this.o = a
    }
    getAsJson() {
        const a = {};
        void 0 !== this.o.trackingParams ? a.trackingParams = this.o.trackingParams : (a.veType = this.o.veType, void 0 !== this.o.veCounter && (a.veCounter = this.o.veCounter), void 0 !== this.o.elementIndex && (a.elementIndex = this.o.elementIndex));
        void 0 !== this.o.dataElement && (a.dataElement = this.o.dataElement.getAsJson());
        void 0 !== this.o.youtubeData && (a.youtubeData = this.o.youtubeData);
        return a
    }
    getAsJspb() {
        const a = new J;
        if (void 0 !== this.o.trackingParams) {
            var b = this.o.trackingParams;
            if (null != b)
                if ("string" === typeof b) b = b ? new kb(b, gb) : jb();
                else if (b.constructor !== kb)
                if (eb(b)) b = b.length ? new kb(new Uint8Array(b), gb) : jb();
                else throw Error();
            C(a, 1, b)
        } else void 0 !== this.o.veType && C(a, 2, this.o.veType), void 0 !== this.o.veCounter && C(a, 6, this.o.veCounter), void 0 !== this.o.elementIndex && C(a, 3, this.o.elementIndex);
        void 0 !== this.o.dataElement && (b = this.o.dataElement.getAsJspb(), D(a, J, 7, b));
        void 0 !== this.o.youtubeData && D(a, Nd, 8, this.o.jspbYoutubeData);
        return a
    }
    toString() {
        return JSON.stringify(this.getAsJson())
    }
    isClientVe() {
        return !this.o.trackingParams &&
            !!this.o.veType
    }
};
let Kj = u.ytLoggingDocDocumentNonce_;
if (!Kj) {
    const a = Fj(),
        b = [];
    for (let c = 0; c < a.length; c++) b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[c] & 63));
    Kj = b.join("")
}
var Lj = Kj;
var Mj = {
    ob: 0,
    mb: 1,
    nb: 2,
    Ib: 3,
    pb: 4,
    Nb: 5,
    Jb: 6,
    Mb: 7,
    Kb: 8,
    Lb: 9,
    0: "DEFAULT",
    1: "CHAT",
    2: "CONVERSATIONS",
    3: "MINIPLAYER",
    4: "DIALOG",
    5: "VOZ",
    6: "MUSIC_WATCH_TABS",
    7: "SHARE",
    8: "PUSH_NOTIFICATIONS",
    9: "RICH_GRID_WATCH"
};

function Nj(a = 0) {
    return 0 === a ? "client-screen-nonce" : `${"client-screen-nonce"}.${a}`
}

function Oj(a = 0) {
    return 0 === a ? "ROOT_VE_TYPE" : `${"ROOT_VE_TYPE"}.${a}`
}

function Pj(a = 0) {
    return M(Oj(a))
}

function Qj(a = 0) {
    return (a = Pj(a)) ? new Ij({
        veType: a,
        youtubeData: void 0,
        jspbYoutubeData: void 0
    }) : null
}

function Rj() {
    let a = M("csn-to-ctt-auth-info");
    a || (a = {}, K("csn-to-ctt-auth-info", a));
    return a
}

function W(a = 0) {
    a = M(Nj(a));
    if (!a && !M("USE_CSN_FALLBACK", !0)) return null;
    a || (a = "UNDEFINED_CSN");
    return a ? a : null
}

function Sj(a) {
    for (const b of Object.values(Mj))
        if (W(b) === a) return !0;
    return !1
}

function Tj(a, b, c) {
    const d = Rj();
    (c = W(c)) && delete d[c];
    b && (d[a] = b)
}

function Uj(a) {
    return Rj()[a]
}

function Vj(a, b, c = 0, d) {
    if (a !== M(Nj(c)) || b !== M(Oj(c)))
        if (Tj(a, d, c), K(Nj(c), a), K(Oj(c), b), b = () => {
                setTimeout(() => {
                    if (a)
                        if (N("web_time_via_jspb")) {
                            var e = new te;
                            C(e, 1, Lj);
                            C(e, 2, a);
                            const f = new Ke;
                            Mb(f, te, 111, Le, e);
                            kj(f)
                        } else U("foregroundHeartbeatScreenAssociated", {
                            clientDocumentNonce: Lj,
                            clientScreenNonce: a
                        })
                }, 0)
            }, "requestAnimationFrame" in window) try {
            window.requestAnimationFrame(b)
        } catch (e) {
            b()
        } else b()
};
class xh extends vh {
    constructor(a) {
        super(arguments);
        this.csn = a
    }
}
const Fh = new wh,
    Wj = [];
let Yj = Xj,
    Zj = 0;

function ak(a, b, c, d, e, f, g, h) {
    const k = Yj(),
        l = new Ij({
            veType: b,
            youtubeData: f,
            jspbYoutubeData: void 0
        });
    f = {
        sequenceGroup: k
    };
    e && (f.cttAuthInfo = e);
    var m = () => {
        zj(new O("newScreen() parent element does not have a VE - rootVe", b))
    };
    if (N("il_via_jspb")) {
        e = ze((new Ae).h(k), l.getAsJspb());
        c && c.visualElement ? (m = new ye, c.clientScreenNonce && C(m, 2, c.clientScreenNonce), xe(m, c.visualElement.getAsJspb()), g && C(m, 4, Me[g]), D(e, ye, 5, m)) : c && m();
        d && C(e, 3, d);
        if (N("expectation_logging") && h && h.screenCreatedLoggingExpectations) {
            c = new Rd;
            h = h.screenCreatedLoggingExpectations.expectedParentScreens || [];
            for (var n of h) n.screenVeType && (h = Od(new Pd, n.screenVeType), Nb(c, 1, Pd, h));
            D(e, Rd, 7, c)
        }
        pj(e, f, a)
    } else n = {
            csn: k,
            pageVe: l.getAsJson()
        }, N("expectation_logging") &&
        h && h.screenCreatedLoggingExpectations && (n.screenCreatedLoggingExpectations = h.screenCreatedLoggingExpectations), c && c.visualElement ? (n.implicitGesture = {
            parentCsn: c.clientScreenNonce,
            gesturedVe: c.visualElement.getAsJson()
        }, g && (n.implicitGesture.gestureType = g)) : c && m(), d && (n.cloneCsn = d), a ? ej("screenCreated", n, a, f) : U("screenCreated", n, f);
    Eh(new xh(k));
    return k
}

function bk(a, b, c, d) {
    const e = d.filter(g => {
            g.csn !== b ? (g.csn = b, g = !0) : g = !1;
            return g
        }),
        f = {
            cttAuthInfo: Uj(b) || void 0,
            sequenceGroup: b
        };
    for (const g of d) d = g.getAsJson(), (wa(d) || !d.trackingParams && !d.veType) && zj(Error("Child VE logged with no data"));
    if (N("il_via_jspb")) {
        const g = Be((new De).h(b), c.getAsJspb());
        ra(e, h => {
            h = h.getAsJspb();
            Nb(g, 3, J, h)
        });
        "UNDEFINED_CSN" === b ? X("visualElementAttached", f, void 0, g) : qj(g, f, a)
    } else c = {
        csn: b,
        parentVe: c.getAsJson(),
        childVes: ra(e, g => g.getAsJson())
    }, "UNDEFINED_CSN" === b ? X("visualElementAttached", f, c) : a ? ej("visualElementAttached", c, a, f) : U("visualElementAttached", c, f)
}

function ck(a, b, c, d, e, f) {
    dk(a, b, c, e, f)
}

function dk(a, b, c, d, e) {
    const f = {
        cttAuthInfo: Uj(b) || void 0,
        sequenceGroup: b
    };
    N("il_via_jspb") ? (d = (new Ge).h(b), c = c.getAsJspb(), c = D(d, J, 2, c), c = C(c, 4, 1), e && D(c, we, 3, e), "UNDEFINED_CSN" === b ? X("visualElementShown", f, void 0, c) : lj(c, f, a)) : (e = {
        csn: b,
        ve: c.getAsJson(),
        eventType: 1
    }, d && (e.clientData = d), "UNDEFINED_CSN" === b ? X("visualElementShown", f, e) : a ? ej("visualElementShown", e, a, f) : U("visualElementShown", e, f))
}

function ek(a, b, c) {
    const d = {
        cttAuthInfo: Uj(b) || void 0,
        sequenceGroup: b
    };
    if (N("il_via_jspb")) {
        var e = (new Fe).h(b);
        c = c.getAsJspb();
        e = D(e, J, 2, c);
        e = C(e, 4, 2);
        "UNDEFINED_CSN" === b ? X("visualElementHidden", d, void 0, e) : mj(e, d, a)
    } else e = {
        csn: b,
        ve: c.getAsJson(),
        eventType: 2
    }, "UNDEFINED_CSN" === b ? X("visualElementHidden", d, e) : a ? ej("visualElementHidden", e, a, d) : U("visualElementHidden", e, d)
}

function fk(a, b, c, d, e) {
    const f = {
        cttAuthInfo: Uj(b) || void 0,
        sequenceGroup: b
    };
    N("il_via_jspb") ? (d = (new Ge).h(b), c = c.getAsJspb(), c = D(d, J, 2, c), c = C(c, 4, 4), e && D(c, we, 3, e), "UNDEFINED_CSN" === b ? X("visualElementShown", f, void 0, c) : lj(c, f, a)) : (e = {
        csn: b,
        ve: c.getAsJson(),
        eventType: 4
    }, d && (e.clientData = d), "UNDEFINED_CSN" === b ? X("visualElementShown", f, e) : a ? ej("visualElementShown", e, a, f) : U("visualElementShown", e, f))
}

function gk(a, b, c, d = !1) {
    var e = d ? 16 : 8;
    const f = {
        cttAuthInfo: Uj(b) || void 0,
        sequenceGroup: b,
        endOfSequence: d
    };
    N("il_via_jspb") ? (e = (new Fe).h(b), c = c.getAsJspb(), c = D(e, J, 2, c), C(c, 4, d ? 16 : 8), "UNDEFINED_CSN" === b ? X("visualElementHidden", f, void 0, c) : mj(c, f, a)) : (d = {
        csn: b,
        ve: c.getAsJson(),
        eventType: e
    }, "UNDEFINED_CSN" === b ? X("visualElementHidden", f, d) : a ? ej("visualElementHidden", d, a, f) : U("visualElementHidden", d, f))
}

function hk(a, b, c, d) {
    const e = {
        cttAuthInfo: Uj(b) || void 0,
        sequenceGroup: b
    };
    N("il_via_jspb") ? (d = (new Ee).h(b), c = c.getAsJspb(), c = D(d, J, 2, c), C(c, 4, Me.INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK), "UNDEFINED_CSN" === b ? X("visualElementGestured", e, void 0, c) : nj(c, e, a)) : (c = {
        csn: b,
        ve: c.getAsJson(),
        gestureType: "INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK"
    }, d && (c.clientData = d), "UNDEFINED_CSN" === b ? X("visualElementGestured", e, c) : a ? ej("visualElementGestured", c, a, e) : U("visualElementGestured", c, e))
}

function Xj() {
    if (N("enable_web_96_bit_csn")) var a = Gj();
    else if (N("enable_web_96_bit_csn_no_crypto")) a = Gj(!1);
    else {
        a = Math.random() + "";
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            255 < e && (b[c++] = e & 255, e >>= 8);
            b[c++] = e
        }
        a = Ua(b, 3)
    }
    return a
}

function X(a, b, c, d) {
    Wj.push({
        T: a,
        payload: c,
        L: d,
        options: b
    });
    Zj || (Zj = Ih())
}

function Jh(a) {
    if (Wj) {
        for (const b of Wj)
            if (N("il_via_jspb") && b.L) switch (b.L.h(a.csn), b.T) {
                case "screenCreated":
                    pj(b.L, b.options);
                    break;
                case "visualElementAttached":
                    qj(b.L, b.options);
                    break;
                case "visualElementShown":
                    lj(b.L, b.options);
                    break;
                case "visualElementHidden":
                    mj(b.L, b.options);
                    break;
                case "visualElementGestured":
                    nj(b.L, b.options);
                    break;
                case "visualElementStateChanged":
                    oj(b.L, b.options);
                    break;
                default:
                    zj(new O("flushQueue unable to map payloadName to JSPB setter"))
            } else b.payload && (b.payload.csn =
                a.csn, U(b.T, b.payload, b.options));
        Wj.length = 0
    }
    Zj = 0
};

function Y() {
    ik.h || (ik.h = new ik);
    return ik.h
}

function jk(a, b, c) {
    const d = W(c);
    return null === a.csn || d === a.csn || c ? d : (a = new O("VisibilityLogger called before newScreen", {
        caller: b.tagName,
        previous_csn: a.csn,
        current_csn: d
    }), zj(a), null)
}

function kk(a) {
    return Math.floor(Number(a.data && a.data.loggingDirectives && a.data.loggingDirectives.visibility && a.data.loggingDirectives.visibility.types || "")) || 1
}
var ik = class {
    constructor() {
        this.u = new Set;
        this.m = new Set;
        this.i = new Map;
        this.client = void 0;
        this.csn = null
    }
    j(a) {
        this.client = a
    }
    v() {
        this.clear();
        this.csn = W()
    }
    clear() {
        this.u.clear();
        this.m.clear();
        this.i.clear();
        this.csn = null
    }
    V(a, b, c) {
        var d = this.l(a),
            e = a.visualElement ? a.visualElement : d;
        b = this.u.has(e);
        const f = this.i.get(e);
        this.u.add(e);
        this.i.set(e, !0);
        a.S && !b && a.S();
        if (d || a.visualElement)
            if (c = jk(this, a, c))
                if (e = !(!a.data || !a.data.loggingDirectives), kk(a) || e) {
                    d = a.visualElement ? a.visualElement : V(d);
                    var g =
                        a.wa,
                        h = a.xa;
                    e || b ? this.h(a, 4) ? f || fk(this.client, c, d, g, h) : this.h(a, 1) && !b && dk(this.client, c, d, g, h) : dk(this.client, c, d, g, h)
                }
    }
    D(a, b, c) {
        var d = this.l(a);
        const e = a.visualElement ? a.visualElement : d;
        b = this.m.has(e);
        const f = this.i.get(e);
        this.m.add(e);
        this.i.set(e, !1);
        if (!1 === f) return !0;
        if (!d && !a.visualElement) return !1;
        c = jk(this, a, c);
        if (!c || !kk(a) && a.data && a.data.loggingDirectives) return !1;
        d = a.visualElement ? a.visualElement : V(d);
        this.h(a, 8) ? gk(this.client, c, d) : this.h(a, 2) && !b && ek(this.client, c, d);
        return !0
    }
    l(a) {
        let b,
            c, d;
        return N("il_use_view_model_logging_context") && (null == (b = a.data) ? 0 : null == (c = b.context) ? 0 : null == (d = c.loggingContext) ? 0 : d.loggingDirectives) ? a.data.context.loggingContext.loggingDirectives.trackingParams || "" : a.data && a.data.loggingDirectives ? a.data.loggingDirectives.trackingParams || "" : a.M && a.M.trackingParams ? a.M.trackingParams : a.data && a.data.trackingParams || ""
    }
    h(a, b) {
        return !!(kk(a) & b)
    }
};

function lk() {
    mk.h || (mk.h = new mk);
    return mk.h
}

function nk() {
    var a = lk();
    N("safe_logging_library_killswitch") ? (a.clear(), a.csn = W()) : hf(Y().v).bind(Y())()
}

function ok(a, b) {
    if (!N("safe_logging_library_killswitch")) return hf(Y().l).bind(Y())(b);
    let c, d, e;
    return N("il_use_view_model_logging_context") && (null == (c = b.data) ? 0 : null == (d = c.context) ? 0 : null == (e = d.loggingContext) ? 0 : e.loggingDirectives) ? b.data.context.loggingContext.loggingDirectives.trackingParams || "" : b.data && b.data.loggingDirectives ? b.data.loggingDirectives.trackingParams || "" : b.M && b.M.trackingParams ? b.M.trackingParams : b.data && b.data.trackingParams || ""
}

function pk(a) {
    return Math.floor(Number(a.data && a.data.loggingDirectives && a.data.loggingDirectives.visibility && a.data.loggingDirectives.visibility.types || "")) || 1
}

function qk(a, b, c) {
    return N("safe_logging_library_killswitch") ? !!(pk(b) & c) : hf(Y().h).bind(Y())(b, c)
}
var mk = class {
    constructor() {
        this.l = new Set;
        this.i = new Set;
        this.h = new Map;
        this.client = void 0;
        this.csn = null
    }
    j(a) {
        N("safe_logging_library_killswitch") ? this.client = a : hf(Y().j).bind(Y())(a)
    }
    clear() {
        N("safe_logging_library_killswitch") ? (this.l.clear(), this.i.clear(), this.h.clear(), this.csn = null) : hf(Y().clear).bind(Y())()
    }
};

function rk(a) {
    return N("use_ts_visibilitylogger") ? ok(lk(), a) : N("il_use_view_model_logging_context") && a.data && a.data.context && a.data.context.loggingContext && a.data.context.loggingContext.loggingDirectives ? a.data.context.loggingContext.loggingDirectives || "" : a.data && a.data.loggingDirectives ? a.data.loggingDirectives.trackingParams || "" : a.M && a.M.trackingParams ? a.M.trackingParams : a.data && a.data.trackingParams || ""
}

function sk(a) {
    return parseInt(a.data && a.data.loggingDirectives && a.data.loggingDirectives.visibility && a.data.loggingDirectives.visibility.types || "", 10) || 1
}

function tk(a, b) {
    return N("use_ts_visibilitylogger") ? qk(lk(), a, b) : !!(sk(a) & b)
}

function uk(a, b) {
    if (N("use_ts_visibilitylogger"))
        if (a = lk(), N("safe_logging_library_killswitch")) {
            var c = ok(0, b),
                d = b.visualElement ? b.visualElement : c,
                e = a.l.has(d),
                f = a.h.get(d);
            a.l.add(d);
            a.h.set(d, !0);
            b.S && !e && b.S();
            if (c || b.visualElement)
                if (d = W(8)) {
                    var g = !(!b.data || !b.data.loggingDirectives);
                    if (pk(b) || g) {
                        c = b.visualElement ? b.visualElement : V(c);
                        var h = b.wa,
                            k = b.xa;
                        g || e ? qk(0, b, 4) ? f || fk(a.client, d, c, h, k) : qk(0, b, 1) && !e && dk(a.client, d, c, h, k) : dk(a.client, d, c, h, k)
                    }
                }
        } else hf(Y().V).bind(Y())(b, void 0, 8);
    else if (c =
        rk(b), d = b.visualElement ? b.visualElement : c, e = a.m.has(d), f = a.i.get(d), a.m.add(d), a.i.set(d, !0), b.S && !e && b.S(), c || b.visualElement)
        if (d = W(8))
            if (g = !(!b.data || !b.data.loggingDirectives), sk(b) || g) c = b.visualElement ? b.visualElement : V(c), h = b.wa, k = b.xa, g || e ? tk(b, 4) ? f || fk(a.h, d, c, h, k) : tk(b, 1) && !e && dk(a.h, d, c, h, k) : dk(a.h, d, c, h, k)
}

function vk(a, b) {
    if (N("use_ts_visibilitylogger"))
        if (a = lk(), N("safe_logging_library_killswitch")) {
            var c = ok(0, b),
                d = b.visualElement ? b.visualElement : c,
                e = a.i.has(d),
                f = a.h.get(d);
            a.i.add(d);
            a.h.set(d, !1);
            !1 !== f && (c || b.visualElement) && (!(d = W(8)) || !pk(b) && b.data && b.data.loggingDirectives || (c = b.visualElement ? b.visualElement : V(c), qk(0, b, 8) ? gk(a.client, d, c) : qk(0, b, 2) && !e && ek(a.client, d, c)))
        } else hf(Y().D).bind(Y())(b, void 0, 8);
    else c = rk(b), d = b.visualElement ? b.visualElement : c, e = a.l.has(d), f = a.i.get(d), a.l.add(d),
        a.i.set(d, !1), !1 !== f && (c || b.visualElement) && (!(d = W(8)) || !sk(b) && b.data && b.data.loggingDirectives || (c = b.visualElement ? b.visualElement : V(c), tk(b, 8) ? gk(a.h, d, c) : tk(b, 2) && !e && ek(a.h, d, c)))
}
class wk {
    constructor() {
        this.m = new Set;
        this.l = new Set;
        this.i = new Map;
        this.h = void 0
    }
    j(a) {
        N("use_ts_visibilitylogger") ? lk().j(a) : this.h = a
    }
    clear() {
        N("use_ts_visibilitylogger") ? lk().clear() : (this.m.clear(), this.l.clear(), this.i.clear())
    }
}(function() {
    var a = wk;
    a.ha = void 0;
    a.B = function() {
        return a.ha ? a.ha : a.ha = new a
    }
})();
var xk = a => self.btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(a)))).replace(/\+/g, "-").replace(/\//g, "_");
var yk = ["notifications_register", "notifications_check_registration"];
let zk = null;

function Z(a, b) {
    const c = {};
    c.key = a;
    c.value = b;
    return Ak().then(d => new Promise((e, f) => {
        try {
            const g = d.transaction("swpushnotificationsstore", "readwrite").objectStore("swpushnotificationsstore").put(c);
            g.onsuccess = () => {
                e()
            };
            g.onerror = () => {
                f()
            }
        } catch (g) {
            f(g)
        }
    }))
}

function Bk() {
    return Z("IndexedDBCheck", "testing IndexedDB").then(() => Ck("IndexedDBCheck")).then(a => "testing IndexedDB" === a ? Promise.resolve() : Promise.reject()).then(() => !0).catch(() => !1)
}

function Ck(a) {
    const b = new O("Error accessing DB");
    return Ak().then(c => new Promise((d, e) => {
        try {
            const f = c.transaction("swpushnotificationsstore").objectStore("swpushnotificationsstore").get(a);
            f.onsuccess = () => {
                const g = f.result;
                d(g ? g.value : null)
            };
            f.onerror = () => {
                b.params = {
                    key: a,
                    source: "onerror"
                };
                e(b)
            }
        } catch (f) {
            b.params = {
                key: a,
                thrownError: String(f)
            }, e(b)
        }
    }), () => null)
}

function Ak() {
    return zk ? Promise.resolve(zk) : new Promise((a, b) => {
        const c = self.indexedDB.open("swpushnotificationsdb");
        c.onerror = b;
        c.onsuccess = () => {
            const d = c.result;
            if (d.objectStoreNames.contains("swpushnotificationsstore")) zk = d, a(zk);
            else return self.indexedDB.deleteDatabase("swpushnotificationsdb"), Ak()
        };
        c.onupgradeneeded = Dk
    })
}

function Dk(a) {
    a = a.target.result;
    a.objectStoreNames.contains("swpushnotificationsstore") && a.deleteObjectStore("swpushnotificationsstore");
    a.createObjectStore("swpushnotificationsstore", {
        keyPath: "key"
    })
};
const Ek = {
    WEB_UNPLUGGED: "^unplugged/",
    WEB_UNPLUGGED_ONBOARDING: "^unplugged/",
    WEB_UNPLUGGED_OPS: "^unplugged/",
    WEB_UNPLUGGED_PUBLIC: "^unplugged/",
    WEB_CREATOR: "^creator/",
    WEB_KIDS: "^kids/",
    WEB_EXPERIMENTS: "^experiments/",
    WEB_MUSIC: "^music/",
    WEB_REMIX: "^music/",
    WEB_MUSIC_EMBEDDED_PLAYER: "^music/",
    WEB_MUSIC_EMBEDDED_PLAYER: "^main_app/|^sfv/"
};

function Fk(a) {
    if (1 === a.length) return a[0];
    var b = Ek.UNKNOWN_INTERFACE;
    if (b) {
        b = new RegExp(b);
        for (var c of a)
            if (b.exec(c)) return c
    }
    const d = [];
    Object.entries(Ek).forEach(([e, f]) => {
        "UNKNOWN_INTERFACE" !== e && d.push(f)
    });
    c = new RegExp(d.join("|"));
    a.sort((e, f) => e.length - f.length);
    for (const e of a)
        if (!c.exec(e)) return e;
    return a[0]
}

function Gk(a) {
    return `/youtubei/v1/${Fk(a)}`
};
v("ytLoggingLatencyUsageStats_", u.ytLoggingLatencyUsageStats_ || {});
const Hk = window;
class Ik {
    constructor() {
        this.timing = {};
        this.clearResourceTimings = () => {};
        this.webkitClearResourceTimings = () => {};
        this.mozClearResourceTimings = () => {};
        this.msClearResourceTimings = () => {};
        this.oClearResourceTimings = () => {}
    }
}
var Jk = Hk.performance || Hk.mozPerformance || Hk.msPerformance || Hk.webkitPerformance || new Ik;
ma(Jk.clearResourceTimings || Jk.webkitClearResourceTimings || Jk.mozClearResourceTimings || Jk.msClearResourceTimings || Jk.oClearResourceTimings || pa, Jk);

function Kk(a, b) {
    N("safe_logging_library_killswitch") ? dk(void 0, a, b) : hf(ck)(void 0, a, b, void 0, void 0, void 0)
};

function Lk() {
    Mk.h || (Mk.h = new Mk);
    return Mk.h
}

function Nk(a, b, c = {}) {
    a.i.add(c.layer || 0);
    a.l = () => {
        Ok(a, b, c);
        const d = Qj(c.layer);
        if (d) {
            for (const e of a.u) Pk(a, e[0], e[1] || d, c.layer);
            for (const e of a.v) Qk(a, e[0], e[1])
        }
    };
    W(c.layer) || a.l();
    if (c.ra)
        for (const d of c.ra) Rk(a, d, c.layer);
    else yj(Error("Delayed screen needs a data promise."))
}

function Ok(a, b, c = {}) {
    var d = void 0;
    c.layer || (c.layer = 0);
    d = void 0 !== c.Za ? c.Za : c.layer;
    const e = W(d);
    d = Qj(d);
    let f;
    d && (void 0 !== c.parentCsn ? f = {
        clientScreenNonce: c.parentCsn,
        visualElement: d
    } : e && "UNDEFINED_CSN" !== e && (f = {
        clientScreenNonce: e,
        visualElement: d
    }));
    let g;
    const h = M("EVENT_ID");
    "UNDEFINED_CSN" === e && h && (g = {
        servletData: {
            serializedServletEventId: h
        }
    });
    let k;
    try {
        k = ak(a.client, b, f, c.qa, c.cttAuthInfo, g, c.Xb, c.loggingExpectations)
    } catch (n) {
        Cj(n, {
            mc: b,
            rootVe: d,
            fc: void 0,
            Vb: e,
            ec: f,
            qa: c.qa
        });
        yj(n);
        return
    }
    Vj(k,
        b, c.layer, c.cttAuthInfo);
    e && "UNDEFINED_CSN" !== e && d && !Sj(e) && gk(a.client, e, d, !0);
    a.h[a.h.length - 1] && !a.h[a.h.length - 1].csn && (a.h[a.h.length - 1].csn = k || "");
    nk();
    const l = Qj(c.layer);
    e && "UNDEFINED_CSN" !== e && l && (N("web_mark_root_visible") || N("music_web_mark_root_visible")) && Kk(k, l);
    a.i.delete(c.layer || 0);
    a.l = void 0;
    let m;
    null == (m = a.V.get(c.layer)) || m.forEach((n, t) => {
        n ? Pk(a, t, n, c.layer) : l && Pk(a, t, l, c.layer)
    });
    Sk(a)
}

function Tk(a) {
    var b = 28631,
        c = {
            layer: 8
        };
    [28631].includes(b) || (zj(new O("createClientScreen() called with a non-page VE", b)), b = 83769);
    c.isHistoryNavigation || a.h.push({
        rootVe: b,
        key: c.key || ""
    });
    a.u = [];
    a.v = [];
    c.ra ? Nk(a, b, c) : Ok(a, b, c)
}

function Rk(a, b, c = 0) {
    b.then(d => {
        a.i.has(c) && a.l && a.l();
        const e = W(c),
            f = Qj(c);
        if (e && f) {
            var g;
            (null == d ? 0 : null == (g = d.response) ? 0 : g.trackingParams) && bk(a.client, e, f, [V(d.response.trackingParams)]);
            var h;
            (null == d ? 0 : null == (h = d.playerResponse) ? 0 : h.trackingParams) && bk(a.client, e, f, [V(d.playerResponse.trackingParams)])
        }
    })
}

function Pk(a, b, c, d = 0) {
    if (a.i.has(d)) a.u.push([b, c]);
    else {
        var e = W(d);
        c = c || Qj(d);
        e && c && bk(a.client, e, c, [b])
    }
}

function Uk(a, b, c = 0) {
    (c = W(c)) && hk(a.client, c, b)
}

function Vk(a, b, c, d = 0) {
    if (!b) return !1;
    d = W(d);
    if (!d) return !1;
    hk(a.client, d, V(b), c);
    return !0
}

function Wk(a, b) {
    const c = b.Sa && b.Sa();
    b.visualElement ? Uk(a, b.visualElement, c) : (b = ok(lk(), b), Vk(a, b, void 0, c))
}

function Qk(a, b, c, d = 0) {
    const e = W(d);
    d = b || Qj(d);
    e && d && (a = a.client, b = {
        cttAuthInfo: Uj(e) || void 0,
        sequenceGroup: e
    }, N("il_via_jspb") ? (c = new He, c.h(e), d = d.getAsJspb(), D(c, J, 2, d), "UNDEFINED_CSN" === e ? X("visualElementStateChanged", b, void 0, c) : oj(c, b, a)) : (c = {
        csn: e,
        ve: d.getAsJson(),
        clientData: c
    }, "UNDEFINED_CSN" === e ? X("visualElementStateChanged", b, c) : a ? ej("visualElementStateChanged", c, a, b) : U("visualElementStateChanged", c, b)))
}

function Sk(a) {
    for (var b = 0; b < a.m.length; b++) {
        var c = a.m[b];
        try {
            c()
        } catch (d) {
            yj(d)
        }
    }
    a.m.length = 0;
    for (b = 0; b < a.D.length; b++) {
        c = a.D[b];
        try {
            c()
        } catch (d) {
            yj(d)
        }
    }
}
var Mk = class {
    constructor() {
        this.u = [];
        this.v = [];
        this.h = [];
        this.m = [];
        this.D = [];
        this.i = new Set;
        this.V = new Map
    }
    j(a) {
        this.client = a
    }
    clickCommand(a, b, c = 0) {
        return Vk(this, a.clickTrackingParams, b, c)
    }
    visualElementStateChanged(a, b, c = 0) {
        0 === c && this.i.has(c) ? this.v.push([a, b]) : Qk(this, a, b, c)
    }
};
var Xk = class extends E {
    constructor(a) {
        super(a)
    }
};
var Yk = class extends E {
    constructor(a) {
        super(a)
    }
};
Yk.h = "yt.sw.adr";

function Zk(a) {
    return r(function*() {
        var b = yield u.fetch(a.i);
        if (200 !== b.status) return Promise.reject("Server error when retrieving AmbientData");
        b = yield b.text();
        if (!b.startsWith(")]}'\n")) return Promise.reject("Incorrect JSPB formatting");
        a: {
            b = JSON.parse(b.substring(5));
            for (let c = 0; c < b.length; c++)
                if (b[c][0] === (new Yk).constructor.h) {
                    b = new Yk(b[c]);
                    break a
                }
            b = null
        }
        return b ? b : Promise.reject("AmbientData missing from response")
    })
}

function $k(a = !1) {
    const b = al.h;
    return r(function*() {
        if (a || !b.h) b.h = Zk(b).then(b.j).catch(c => {
            delete b.h;
            yj(c)
        });
        return b.h
    })
}
var al = class {
    constructor() {
        this.i = bl("/sw.js_data")
    }
    j(a) {
        const b = Ib(a, Xk, 2);
        if (b) {
            const c = B(b, 5);
            c && (u.__SAPISID = c);
            null != B(b, 10) ? K("EOM_VISITOR_DATA", B(b, 10)) : null != B(b, 7) && K("VISITOR_DATA", B(b, 7));
            null != B(b, 4) && K("SESSION_INDEX", String(B(b, 4)));
            null != B(b, 8) && K("DELEGATED_SESSION_ID", B(b, 8))
        }
        return a
    }
};

function cl(a, b) {
    b.encryptedTokenJarContents && (a.h[b.encryptedTokenJarContents] = b, "string" === typeof b.expirationSeconds && setTimeout(() => {
        delete a.h[b.encryptedTokenJarContents]
    }, 1E3 * Number(b.expirationSeconds)))
}
var dl = class {
    constructor() {
        this.h = {}
    }
    handleResponse(a, b) {
        if (!b) throw Error("request needs to be passed into ConsistencyService");
        let c, d;
        b = (null == (c = b.K.context) ? void 0 : null == (d = c.request) ? void 0 : d.consistencyTokenJars) || [];
        let e;
        if (a = null == (e = a.responseContext) ? void 0 : e.consistencyTokenJar) {
            for (const f of b) delete this.h[f.encryptedTokenJarContents];
            cl(this, a)
        }
    }
};

function el() {
    var a = M("INNERTUBE_CONTEXT");
    if (!a) return yj(Error("Error: No InnerTubeContext shell provided in ytconfig.")), {};
    a = xa(a);
    N("web_no_tracking_params_in_shell_killswitch") || delete a.clickTracking;
    a.client || (a.client = {});
    var b = a.client;
    b.utcOffsetMinutes = -Math.floor((new Date).getTimezoneOffset());
    var c = df();
    c ? b.experimentsToken = c : delete b.experimentsToken;
    dl.h || (dl.h = new dl);
    b = dl.h.h;
    c = [];
    let d = 0;
    for (const e in b) c[d++] = b[e];
    a.request = Object.assign({}, a.request, {
        consistencyTokenJars: c
    });
    a.user = Object.assign({}, a.user);
    return a
};

function fl(a) {
    var b = a;
    if (a = M("INNERTUBE_HOST_OVERRIDE")) {
        a = String(a);
        var c = String,
            d = b.match(Ga);
        b = d[5];
        var e = d[6];
        d = d[7];
        var f = "";
        b && (f += b);
        e && (f += "?" + e);
        d && (f += "#" + d);
        b = a + c(f)
    }
    return b
};
var gl = class {};
const hl = {
    GET_DATASYNC_IDS: function(a) {
        return () => new a
    }(class extends gl {})
};
const il = ["type.googleapis.com/youtube.api.pfiinnertube.YoutubeApiInnertube.BrowseResponse"];

function jl(a) {
    var b = {
            Ub: {}
        },
        c = Lf();
    if (void 0 !== ki.h) {
        const d = ki.h;
        a = [b !== d.m, a !== d.l, c !== d.j, !1, !1, void 0 !== d.i];
        if (a.some(e => e)) throw new O("InnerTubeTransportService is already initialized", a);
    } else ki.h = new ki(b, a, c)
}

function kl(a, b) {
    return r(function*() {
        var c, d = {
            sessionIndex: null == a ? void 0 : null == (c = a.pa) ? void 0 : c.sessionIndex
        };
        c = yield qd(Nf(0, d));
        return Promise.resolve(Object.assign({}, ll(b), c))
    })
}

function ml(a, b, c) {
    return r(function*() {
        var d;
        if (null == b ? 0 : null == (d = b.K) ? 0 : d.context)
            for (const m of []) m.ic(b.K.context);
        var e;
        if (null == (e = a.i) ? 0 : e.pc(b.input, b.K)) return yield a.i.Zb(b.input, b.K);
        var f;
        if ((d = null == (f = b.config) ? void 0 : f.lc) && a.h.has(d) && N("web_memoize_inflight_requests")) var g = a.h.get(d);
        else {
            f = JSON.stringify(b.K);
            let m;
            e = null != (m = null == (g = b.U) ? void 0 : g.headers) ? m : {};
            b.U = Object.assign({}, b.U, {
                headers: Object.assign({}, e, c)
            });
            g = Object.assign({}, b.U);
            "POST" === b.U.method && (g = Object.assign({},
                g, {
                    body: f
                }));
            g = a.l.fetch(b.input, g, b.config);
            d && a.h.set(d, g)
        }
        g = yield g;
        var h;
        let k;
        if (g && "error" in g && (null == (h = g) ? 0 : null == (k = h.error) ? 0 : k.details)) {
            h = g.error.details;
            for (const m of h)(h = m["@type"]) && -1 < il.indexOf(h) && (delete m["@type"], g = m)
        }
        d && a.h.has(d) && a.h.delete(d);
        let l;
        !g && (null == (l = a.i) ? 0 : l.Tb(b.input, b.K)) && (g = yield a.i.Yb(b.input, b.K));
        return g || void 0
    })
}

function nl(a, b, c) {
    var d = {
        pa: {
            identity: Of
        }
    };
    b.context || (b.context = el());
    return new G(e => r(function*() {
        var f = fl(c);
        f = sf(f) ? "same-origin" : "cors";
        if (a.j.fb) {
            var g, h = null == d ? void 0 : null == (g = d.pa) ? void 0 : g.sessionIndex;
            g = Nf(0, {
                sessionIndex: h
            });
            f = Object.assign({}, ll(f), g)
        } else f = yield kl(d, f);
        g = fl(c);
        h = {};
        M("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT") && (null == f ? 0 : f.Authorization) || (h.key = M("INNERTUBE_API_KEY"));
        N("json_condensed_response") && (h.prettyPrint = "false");
        g = rf(g, h || {}, !1);
        h = {
            method: "POST",
            mode: sf(g) ? "same-origin" : "cors",
            credentials: sf(g) ? "same-origin" : "include"
        };
        var k = {};
        const l = {};
        for (const m of Object.keys(k)) k[m] && (l[m] = k[m]);
        0 < Object.keys(l).length && (h.headers = l);
        e(ml(a, {
            input: g,
            U: h,
            K: b,
            config: d
        }, f))
    }))
}

function ll(a) {
    const b = {
        "Content-Type": "application/json"
    };
    M("EOM_VISITOR_DATA") ? b["X-Goog-EOM-Visitor-Id"] = M("EOM_VISITOR_DATA") : M("VISITOR_DATA") && (b["X-Goog-Visitor-Id"] = M("VISITOR_DATA"));
    b["X-Youtube-Bootstrap-Logged-In"] = M("LOGGED_IN", !1);
    "cors" !== a && ((a = M("INNERTUBE_CONTEXT_CLIENT_NAME")) && (b["X-Youtube-Client-Name"] = a), (a = M("INNERTUBE_CONTEXT_CLIENT_VERSION")) && (b["X-Youtube-Client-Version"] = a), (a = M("CHROME_CONNECTED_HEADER")) && (b["X-Youtube-Chrome-Connected"] = a), (a = M("DOMAIN_ADMIN_STATE")) &&
        (b["X-Youtube-Domain-Admin-State"] = a));
    return b
}
var ki = class {
    constructor(a, b, c) {
        this.m = a;
        this.l = b;
        this.j = c;
        this.i = void 0;
        this.h = new Map;
        a.la || (a.la = {});
        a.la = Object.assign({}, hl, a.la)
    }
};
var ji = new gi;
let ol;

function pl() {
    if (!ol) {
        const a = pi();
        jl({
            fetch: (b, c) => qd(fetch(new Request(b, c)))
        });
        ii(a);
        ol = a.resolve(ji)
    }
    return ol
};

function ql(a) {
    return r(function*() {
        yield rl();
        zj(a)
    })
}

function sl(a) {
    return r(function*() {
        yield rl();
        yj(a)
    })
}

function tl(a) {
    r(function*() {
        var b = yield Vg();
        b ? yield Oh(a, b): (yield $k(), b = {
            timestamp: a.timestamp
        }, b = a.appShellAssetLoadReport ? {
            T: "appShellAssetLoadReport",
            payload: a.appShellAssetLoadReport,
            options: b
        } : a.clientError ? {
            T: "clientError",
            payload: a.clientError,
            options: b
        } : void 0, b && U(b.T, b.payload))
    })
}

function rl() {
    return r(function*() {
        try {
            yield $k()
        } catch (a) {}
    })
};
const ul = {
        granted: "GRANTED",
        denied: "DENIED",
        unknown: "UNKNOWN"
    },
    vl = RegExp("^(?:[a-z]+:)?//", "i");

function wl(a) {
    var b = a.data;
    a = b.type;
    b = b.data;
    "notifications_register" === a ? (Z("IDToken", b), xl()) : "notifications_check_registration" === a && yl(b)
}

function zl() {
    return self.clients.matchAll({
        type: "window",
        includeUncontrolled: !0
    }).then(a => {
        if (a)
            for (const b of a) b.postMessage({
                type: "update_unseen_notifications_count_signal"
            })
    })
}

function Al(a) {
    const b = [];
    a.forEach(c => {
        b.push({
            key: c.key,
            value: c.value
        })
    });
    return b
}

function Bl(a) {
    return r(function*() {
        const b = Al(a.payload.chrome.extraUrlParams),
            c = {
                recipientId: a.recipientId,
                endpoint: a.payload.chrome.endpoint,
                extraUrlParams: b
            },
            d = Gk(Te);
        return Cl().then(e => nl(e, c, d).then(f => {
            f.json().then(g => g && g.endpointUrl ? Dl(a, g.endpointUrl) : Promise.resolve()).catch(g => {
                sl(g);
                Promise.reject(g)
            })
        }))
    })
}

function El(a, b) {
    var c = W(8);
    if (null == c || !b) return a;
    a = vl.test(a) ? new URL(a) : new URL(a, self.registration.scope);
    a.searchParams.set("parentCsn", c);
    a.searchParams.set("parentTrackingParams", b);
    return a.toString()
}

function Dl(a, b) {
    a.deviceId && Z("DeviceId", a.deviceId);
    a.timestampSec && Z("TimestampLowerBound", a.timestampSec);
    const c = a.payload.chrome,
        d = Lk();
    Tk(d);
    var e;
    const f = null == (e = c.postedEndpoint) ? void 0 : e.clickTrackingParams;
    e = c.title;
    const g = {
        body: c.body,
        icon: c.iconUrl,
        data: {
            nav: El(b, f),
            id: c.notificationId,
            attributionTag: c.attributionTag,
            clickEndpoint: c.clickEndpoint,
            postedEndpoint: c.postedEndpoint,
            clickTrackingParams: f,
            isDismissed: !0
        },
        tag: c.notificationTag || c.title + c.body + c.iconUrl,
        requireInteraction: !0
    };
    return self.registration.showNotification(e, g).then(() => {
        var h;
        (null == (h = g.data) ? 0 : h.postedEndpoint) && Fl(g.data.postedEndpoint);
        let k;
        if (null == (k = g.data) ? 0 : k.clickTrackingParams) h = V(g.data.clickTrackingParams), Pk(d, h, void 0, 8), h = {
            ca: 8,
            visualElement: h
        }, uk(wk.B(), h);
        Gl(a.displayCap)
    }).catch(() => {})
}

function Fl(a) {
    if (!ui(a, Se)) return Promise.reject();
    const b = {
            serializedRecordNotificationInteractionsRequest: ui(a, Se).serializedInteractionsRequest
        },
        c = Gk(Ue);
    return Cl().then(d => nl(d, b, c)).then(d => d)
}

function Gl(a) {
    -1 !== a && self.registration.getNotifications().then(b => {
        for (let d = 0; d < b.length - a; d++) {
            b[d].data.isDismissed = !1;
            b[d].close();
            let e;
            if (null == (e = b[d].data) ? 0 : e.clickTrackingParams) {
                let f;
                var c = V(null == (f = b[d].data) ? void 0 : f.clickTrackingParams);
                const g = {
                        ca: 8,
                        visualElement: c
                    },
                    h = Jj(82046),
                    k = Lk();
                Pk(k, h, c, 8);
                c = {
                    ca: 8,
                    visualElement: h
                };
                uk(wk.B(), c);
                Wk(k, c);
                vk(wk.B(), g)
            }
        }
    })
}

function yl(a) {
    const b = [Hl(a), Ck("RegistrationTimestamp").then(Il), Jl(), Kl(), Ll()];
    Promise.all(b).catch(() => {
        Z("IDToken", a);
        xl();
        return Promise.resolve()
    })
}

function Il(a) {
    return 9E7 >= Date.now() - (a || 0) ? Promise.resolve() : Promise.reject()
}

function Hl(a) {
    return Ck("IDToken").then(b => a === b ? Promise.resolve() : Promise.reject())
}

function Jl() {
    return Ck("Permission").then(a => Notification.permission === a ? Promise.resolve() : Promise.reject())
}

function Kl() {
    return Ck("Endpoint").then(a => Ml().then(b => a === b ? Promise.resolve() : Promise.reject()))
}

function Ll() {
    return Ck("application_server_key").then(a => Nl().then(b => a === b ? Promise.resolve() : Promise.reject()))
}

function Ol() {
    var a = Notification.permission;
    if (ul[a]) return ul[a]
}

function xl() {
    Z("RegistrationTimestamp", 0);
    Promise.all([Ml(), Pl(), Ql(), Nl()]).then(([a, b, c, d]) => {
        b = b ? xk(b) : null;
        c = c ? xk(c) : null;
        d = d ? Ua(new Uint8Array(d), 4) : null;
        Rl(a, b, c, d)
    }).catch(() => {
        Rl()
    })
}

function Rl(a = null, b = null, c = null, d = null) {
    Bk().then(e => {
        e && (Z("Endpoint", a), Z("P256dhKey", b), Z("AuthKey", c), Z("application_server_key", d), Z("Permission", Notification.permission), Promise.all([Ck("DeviceId"), Ck("NotificationsDisabled")]).then(([f, g]) => {
            if (null != f) var h = f;
            else {
                f = [];
                var k;
                h = h || Jd.length;
                for (k = 0; 256 > k; k++) f[k] = Jd[0 | Math.random() * h];
                h = f.join("")
            }
            Sl(h, null != a ? a : void 0, null != b ? b : void 0, null != c ? c : void 0, null != d ? d : void 0, null != g ? g : void 0)
        }))
    })
}

function Sl(a, b, c, d, e, f) {
    r(function*() {
        const g = {
                notificationRegistration: {
                    chromeRegistration: {
                        deviceId: a,
                        pushParams: {
                            applicationServerKey: e,
                            authKey: d,
                            p256dhKey: c,
                            browserEndpoint: b
                        },
                        notificationsDisabledInApp: f,
                        permission: Ol()
                    }
                }
            },
            h = Gk(Ve);
        return Cl().then(k => nl(k, g, h).then(() => {
            Z("DeviceId", a);
            Z("RegistrationTimestamp", Date.now());
            Z("TimestampLowerBound", Date.now())
        }, l => {
            ql(l)
        }))
    })
}

function Ml() {
    return self.registration.pushManager.getSubscription().then(a => a ? Promise.resolve(a.endpoint) : Promise.resolve(null))
}

function Pl() {
    return self.registration.pushManager.getSubscription().then(a => a && a.getKey ? Promise.resolve(a.getKey("p256dh")) : Promise.resolve(null))
}

function Ql() {
    return self.registration.pushManager.getSubscription().then(a => a && a.getKey ? Promise.resolve(a.getKey("auth")) : Promise.resolve(null))
}

function Nl() {
    return self.registration.pushManager.getSubscription().then(a => a ? Promise.resolve(a.options.applicationServerKey) : Promise.resolve(null))
}

function Cl() {
    return r(function*() {
        try {
            return yield $k(!0), pl()
        } catch (a) {
            return yield ql(a), Promise.reject(a)
        }
    })
};
let Tl = self.location.origin + "/";

function bl(a) {
    let b = "undefined" !== typeof ServiceWorkerGlobalScope && self instanceof ServiceWorkerGlobalScope ? $c.registration.scope : Tl;
    b.endsWith("/") && (b = b.slice(0, -1));
    return b + a
};
let Ul = void 0;

function Vl(a) {
    return r(function*() {
        Ul || (Ul = yield a.open("yt-appshell-assets"));
        return Ul
    })
}

function Wl(a, b) {
    return r(function*() {
        const c = yield Vl(a), d = b.map(e => Xl(c, e));
        return Promise.all(d)
    })
}

function Yl(a, b) {
    return r(function*() {
        let c;
        try {
            c = yield a.match(b, {
                cacheName: "yt-appshell-assets"
            })
        } catch (d) {}
        return c
    })
}

function Zl(a, b) {
    return r(function*() {
        const c = yield Vl(a), d = (yield c.keys()).filter(e => !b.includes(e.url)).map(e => c.delete(e));
        return Promise.all(d)
    })
}

function $l(a, b, c) {
    return r(function*() {
        yield(yield Vl(a)).put(b, c)
    })
}

function am(a, b) {
    r(function*() {
        yield(yield Vl(a)).delete(b)
    })
}

function Xl(a, b) {
    return r(function*() {
        return (yield a.match(b)) ? Promise.resolve() : a.add(b)
    })
};
var bm = dh("yt-serviceworker-metadata", {
    P: {
        auth: {
            O: 1
        },
        ["resource-manifest-assets"]: {
            O: 2
        }
    },
    da: !0,
    upgrade(a, b) {
        b(1) && wg(a, "resource-manifest-assets");
        b(2) && wg(a, "auth")
    },
    version: 2
});
let cm = null;

function dm(a) {
    return Lg(bm(), a)
}

function em(a, b) {
    return r(function*() {
        yield S(yield dm(a.token), ["resource-manifest-assets"], "readwrite", c => {
            const d = c.objectStore("resource-manifest-assets"),
                e = Date.now();
            return Q(d.h.put(b, e)).then(() => {
                cm = e;
                let f = !0;
                return Bg(d, {
                    query: IDBKeyRange.bound(0, Date.now()),
                    direction: "prev"
                }, g => f ? (f = !1, g.advance(5)) : d.delete(g.getKey()).then(() => g.continue()))
            })
        })
    })
}

function fm(a, b) {
    return r(function*() {
        let c = !1,
            d = 0;
        yield S(yield dm(a.token), ["resource-manifest-assets"], "readonly", e => Bg(e.objectStore("resource-manifest-assets"), {
            query: IDBKeyRange.bound(0, Date.now()),
            direction: "prev"
        }, f => {
            if (f.R().includes(b)) c = !0;
            else return d += 1, f.continue()
        }));
        return c ? d : -1
    })
}

function gm(a) {
    return r(function*() {
        cm || (yield S(yield dm(a.token), ["resource-manifest-assets"], "readonly", b => Bg(b.objectStore("resource-manifest-assets"), {
            query: IDBKeyRange.bound(0, Date.now()),
            direction: "prev"
        }, c => {
            cm = c.getKey()
        })));
        return cm
    })
}
var hm = class {
    constructor(a) {
        this.token = a
    }
    static B() {
        return r(function*() {
            const a = yield Vg();
            if (a) return hm.h || (hm.h = new hm(a)), hm.h
        })
    }
};

function im(a, b) {
    return r(function*() {
        yield yg(yield dm(a.token), "auth", b, "shell_identifier_key")
    })
}

function jm(a) {
    return r(function*() {
        return (yield(yield dm(a.token)).get("auth", "shell_identifier_key")) || ""
    })
}

function km(a) {
    return r(function*() {
        yield(yield dm(a.token)).clear("auth")
    })
}
var lm = class {
    constructor(a) {
        this.token = a
    }
    static B() {
        return r(function*() {
            const a = yield Vg();
            if (a) return lm.h || (lm.h = new lm(a)), lm.h
        })
    }
};

function mm() {
    r(function*() {
        const a = yield lm.B();
        a && (yield km(a))
    })
};
var nm = class extends E {
    constructor(a) {
        super(a)
    }
};
var om = [1],
    pm = function(a) {
        return (b, c) => {
            a: {
                if (qc.length) {
                    const f = qc.pop();
                    mc(f, c);
                    f.h.init(b, void 0, void 0, c);
                    b = f
                } else b = new pc(b, c);
                try {
                    var d = uc(a);
                    var e = vc(new d.fa, b, d);
                    break a
                } finally {
                    d = b, d.h.clear(), d.l = -1, d.i = -1, 100 > qc.length && qc.push(d)
                }
                e = void 0
            }
            return e
        }
    }([class extends E {
            constructor(a) {
                super(a, -1, om)
            }
        },
        1, Hc, [nm, 1, Gc]
    ]);

function qm(a) {
    return r(function*() {
        const b = a.headers.get("X-Resource-Manifest");
        return b ? Promise.resolve(rm(b)) : Promise.reject(Error("No resource manifest header"))
    })
}

function rm(a) {
    return Lb(pm(decodeURIComponent(a)), nm, 1).reduce((b, c) => {
        (c = B(c, 1)) && b.push(c);
        return b
    }, [])
};

function sm(a) {
    return r(function*() {
        const b = yield $k();
        if (b && null != B(b, 3)) {
            var c = yield lm.B();
            c && (c = yield jm(c), B(b, 3) !== c && (am(a.caches, a.h), mm()))
        }
    })
}

function tm(a) {
    return r(function*() {
        let b, c;
        try {
            c = yield um(a.i), b = yield qm(c), yield Wl(a.caches, b)
        } catch (d) {
            return Promise.reject(d)
        }
        try {
            yield vm(), yield $l(a.caches, a.h, c)
        } catch (d) {
            return Promise.reject(d)
        }
        if (b) try {
            yield wm(a, b, a.h)
        } catch (d) {}
        return Promise.resolve()
    })
}

function xm(a) {
    return r(function*() {
        yield sm(a);
        return tm(a)
    })
}

function um(a) {
    return r(function*() {
        try {
            return yield u.fetch(new Request(a))
        } catch (b) {
            return Promise.reject(b)
        }
    })
}

function vm() {
    return r(function*() {
        var a = yield $k();
        let b;
        a && null != B(a, 3) && (b = B(a, 3));
        return b ? (a = yield lm.B()) ? Promise.resolve(im(a, b)) : Promise.reject(Error("Could not get AuthMonitor instance")) : Promise.reject(Error("Could not get datasync ID"))
    })
}

function wm(a, b, c) {
    return r(function*() {
        const d = yield hm.B();
        if (d) try {
            yield em(d, b)
        } catch (e) {
            yield ql(e)
        }
        b.push(c);
        try {
            yield Zl(a.caches, b)
        } catch (e) {
            yield ql(e)
        }
        return Promise.resolve()
    })
}

function ym(a, b) {
    return r(function*() {
        return Yl(a.caches, b)
    })
}

function zm(a) {
    return r(function*() {
        return Yl(a.caches, a.h)
    })
}
var Am = class {
    constructor() {
        var a = self.caches;
        let b = bl("/app_shell");
        N("service_worker_forward_exp_params") && (b += self.location.search);
        var c = bl("/app_shell_home");
        this.caches = a;
        this.i = b;
        this.h = c
    }
};
var Bm = class {
    constructor() {
        const a = this;
        this.stream = new ReadableStream({
            start(b) {
                a.close = () => void b.close();
                a.h = c => {
                    const d = c.getReader();
                    return d.read().then(function h({
                        done: f,
                        value: g
                    }) {
                        if (f) return Promise.resolve();
                        b.enqueue(g);
                        return d.read().then(h)
                    })
                };
                a.i = () => {
                    const c = (new TextEncoder).encode("<script>if (window.fetchInitialData) { window.fetchInitialData(); } else { window.getInitialData = undefined; }\x3c/script>");
                    b.enqueue(c)
                }
            }
        })
    }
};

function Cm(a, b) {
    return r(function*() {
        const c = b.request,
            d = yield ym(a.h, c.url);
        if (d) return tl({
            appShellAssetLoadReport: {
                assetPath: c.url,
                cacheHit: !0
            },
            timestamp: R()
        }), d;
        Dm(c);
        return Em(b)
    })
}

function Fm(a, b) {
    return r(function*() {
        const c = yield Gm(b);
        if (c.response && (c.response.ok || "opaqueredirect" === c.response.type || 429 === c.response.status || 303 === c.response.status || 300 <= c.response.status && 400 > c.response.status)) return c.response;
        const d = yield zm(a.h);
        if (d) return Hm(a), Im(d, b);
        Jm(a);
        return c.response ? c.response : Promise.reject(c.error)
    })
}

function Km(a, b) {
    b = new URL(b);
    if (!a.config.oa.includes(b.pathname)) return !1;
    if (!b.search) return !0;
    for (const c of a.config.Ka)
        if (a = b.searchParams.get(c.key), void 0 === c.value || a === c.value)
            if (b.searchParams.delete(c.key), !b.search) return !0;
    return !1
}

function Lm(a, b) {
    return r(function*() {
        const c = yield zm(a.h);
        if (!c) return Jm(a), Em(b);
        Hm(a);
        var d;
        a: {
            if (c.headers && (d = c.headers.get("date")) && (d = Date.parse(d), !isNaN(d))) {
                d = Math.round(R() - d);
                break a
            }
            d = -1
        }
        if (!(-1 < d && 7 <= d / 864E5)) return Im(c, b);
        d = yield Gm(b);
        return d.response && d.response.ok ? d.response : Im(c, b)
    })
}

function Em(a) {
    return Promise.resolve(a.preloadResponse).then(b => b && !Mm(b) ? b : u.fetch(a.request))
}

function Dm(a) {
    const b = {
        assetPath: a.url,
        cacheHit: !1
    };
    hm.B().then(c => {
        if (c) {
            var d = gm(c).then(e => {
                e && (b.currentAppBundleTimestampSec = String(Math.floor(e / 1E3)))
            });
            c = fm(c, a.url).then(e => {
                b.appBundleVersionDiffCount = e
            });
            Promise.all([d, c]).catch(e => {
                ql(e)
            }).finally(() => {
                tl({
                    appShellAssetLoadReport: b,
                    timestamp: R()
                })
            })
        } else tl({
            appShellAssetLoadReport: b,
            timestamp: R()
        })
    })
}

function Hm(a) {
    tl({
        appShellAssetLoadReport: {
            assetPath: a.h.h,
            cacheHit: !0
        },
        timestamp: R()
    })
}

function Jm(a) {
    tl({
        appShellAssetLoadReport: {
            assetPath: a.h.h,
            cacheHit: !1
        },
        timestamp: R()
    })
}

function Im(a, b) {
    if (!N("sw_nav_preload_pbj")) return a;
    const c = new Bm,
        d = c.h(a.body);
    Promise.resolve(b.preloadResponse).then(e => {
        if (!e || !Mm(e)) throw Error("no pbj preload response available");
        d.then(() => c.h(e.body)).then(() => void c.close())
    }).catch(() => {
        d.then(() => {
            c.i();
            c.close()
        })
    });
    return new Response(c.stream, {
        status: a.status,
        statusText: a.statusText,
        headers: a.headers
    })
}

function Gm(a) {
    return r(function*() {
        try {
            return {
                response: yield Em(a)
            }
        } catch (b) {
            return {
                error: b
            }
        }
    })
}

function Mm(a) {
    return "pbj" === a.headers.get("x-navigation-preload-response-type")
}
var Vm = class {
    constructor() {
        var a = Nm;
        var b = {
            Na: Om,
            bb: Pm([Qm, /\/signin/, /\/logout/]),
            oa: ["/", "/feed/downloads"],
            Ka: Rm([{
                key: "feature",
                value: "ytca"
            }]),
            Ja: Sm(N("kevlar_sw_app_wide_fallback") ? Tm : Um)
        };
        this.h = a;
        this.config = b
    }
};
const Wm = /^\/$/,
    Um = [Wm, /^\/feed\/downloads$/],
    Tm = [Wm, /^\/feed\/\w*/, /^\/results$/, /^\/playlist$/, /^\/watch$/, /^\/channel\/\w*/];

function Sm(a) {
    return new RegExp(a.map(b => b.source).join("|"))
}
const Xm = /^https:\/\/([\w-]*\.)*youtube\.com.*/;

function Pm(a) {
    a = Sm(a);
    return new RegExp(`${Xm.source}(${a.source})`)
}
const Ym = Sm([/\.css$/, /\.js$/, /\.ico$/, /\/ytmweb\/_\/js\//, /\/ytmweb\/_\/ss\//, /\/kabuki\/_\/js\//, /\/kabuki\/_\/ss\//, /\/ytmainappweb\/_\/ss\//]),
    Om = new RegExp(`${Xm.source}(${Ym.source})`),
    Qm = /purge_shell=1/;

function Rm(a = []) {
    const b = [];
    for (const c of Qc) b.push({
        key: c
    });
    for (const c of a) b.push(c);
    return b
}
Pm([Qm]);
Rm();
var $m = class {
    constructor() {
        var a = Nm,
            b = Zm;
        this.h = self;
        this.i = a;
        this.m = b;
        this.D = yk
    }
    init() {
        this.h.oninstall = this.u.bind(this);
        this.h.onactivate = this.j.bind(this);
        this.h.onfetch = this.l.bind(this);
        this.h.onmessage = this.v.bind(this)
    }
    u(a) {
        this.h.skipWaiting();
        const b = xm(this.i).catch(c => {
            ql(c);
            return Promise.resolve()
        });
        a.waitUntil(b)
    }
    j(a) {
        const b = [this.h.clients.claim()],
            c = this.h.registration;
        c.navigationPreload && (b.push(c.navigationPreload.enable()), N("sw_nav_preload_pbj") && b.push(c.navigationPreload.setHeaderValue("pbj")));
        a.waitUntil(Promise.all(b))
    }
    l(a) {
        const b = this;
        return r(function*() {
            var c = b.m,
                d = !!b.h.registration.navigationPreload;
            const e = a.request;
            if (c.config.bb.test(e.url)) al.h && (delete al.h.h, u.__SAPISID = void 0, K("VISITOR_DATA", void 0), K("SESSION_INDEX", void 0), K("DELEGATED_SESSION_ID", void 0)), d = a.respondWith,
                c = c.h, am(c.caches, c.h), mm(), c = Em(a), d.call(a, c);
            else if (c.config.Na.test(e.url)) a.respondWith(Cm(c, a));
            else if ("navigate" === e.mode) {
                const f = new URL(e.url),
                    g = c.config.oa;
                (!N("sw_nav_request_network_first") && g.includes(f.pathname) ? 0 : c.config.Ja.test(f.pathname)) ? a.respondWith(Fm(c, a)): Km(c, e.url) ? a.respondWith(Lm(c, a)) : d && a.respondWith(Em(a))
            }
        })
    }
    v(a) {
        const b = a.data;
        this.D.includes(b.type) ? wl(a) : "refresh_shell" === b.type && tm(this.i).catch(c => {
            ql(c)
        })
    }
};
var an = class {
    static B() {
        let a = y("ytglobal.storage_");
        a || (a = new an, v("ytglobal.storage_", a));
        return a
    }
    estimate() {
        return r(function*() {
            const a = navigator;
            let b;
            if (null == (b = a.storage) ? 0 : b.estimate) return a.storage.estimate();
            let c;
            if (null == (c = a.webkitTemporaryStorage) ? 0 : c.queryUsageAndQuota) return bn()
        })
    }
};

function bn() {
    const a = navigator;
    return new Promise((b, c) => {
        let d;
        null != (d = a.webkitTemporaryStorage) && d.queryUsageAndQuota ? a.webkitTemporaryStorage.queryUsageAndQuota((e, f) => {
            b({
                usage: e,
                quota: f
            })
        }, e => {
            c(e)
        }) : c(Error("webkitTemporaryStorage is not supported."))
    })
}
v("ytglobal.storageClass_", an);

function cn(a, b) {
    an.B().estimate().then(c => {
        c = Object.assign({}, b, {
            isSw: void 0 === self.document,
            isIframe: self !== self.top,
            deviceStorageUsageMbytes: dn(null == c ? void 0 : c.usage),
            deviceStorageQuotaMbytes: dn(null == c ? void 0 : c.quota)
        });
        a.h("idbQuotaExceeded", c)
    })
}
class en {
    constructor() {
        var a = fn;
        this.handleError = gn;
        this.h = a;
        this.i = !1;
        void 0 === self.document || self.addEventListener("beforeunload", () => {
            this.i = !0
        });
        this.j = Math.random() <= cf("ytidb_transaction_ended_event_rate_limit_session", .2)
    }
    Z(a, b) {
        switch (a) {
            case "IDB_DATA_CORRUPTED":
                N("idb_data_corrupted_killswitch") || this.h("idbDataCorrupted", b);
                break;
            case "IDB_UNEXPECTEDLY_CLOSED":
                this.h("idbUnexpectedlyClosed", b);
                break;
            case "IS_SUPPORTED_COMPLETED":
                N("idb_is_supported_completed_killswitch") || this.h("idbIsSupportedCompleted", b);
                break;
            case "QUOTA_EXCEEDED":
                cn(this, b);
                break;
            case "TRANSACTION_ENDED":
                this.j && Math.random() <= cf("ytidb_transaction_ended_event_rate_limit_transaction",
                    .1) && this.h("idbTransactionEnded", b);
                break;
            case "TRANSACTION_UNEXPECTEDLY_ABORTED":
                a = Object.assign({}, b, {
                    hasWindowUnloaded: this.i
                }), this.h("idbTransactionAborted", a)
        }
    }
}

function dn(a) {
    return "undefined" === typeof a ? "-1" : String(Math.ceil(a / 1048576))
};
Ef(Bf(), {
    J: [{
        Ya: /Failed to fetch/,
        weight: 500
    }],
    H: []
});
var {
    handleError: gn = xj,
    Z: fn = U
} = {
    handleError: sl,
    Z: function(a, b) {
        return r(function*() {
            yield rl();
            U(a, b)
        })
    }
};
for (Vf = new en; 0 < Uf.length;) {
    const a = Uf.shift();
    switch (a.type) {
        case "ERROR":
            Vf.handleError(a.payload);
            break;
        case "EVENT":
            Vf.Z(a.eventType, a.payload)
    }
}
al.h = new al;
self.onnotificationclick = function(a) {
    a.notification.close();
    const b = a.notification.data;
    b.isDismissed = !1;
    const c = self.clients.matchAll({
        type: "window",
        includeUncontrolled: !0
    });
    c.then(d => {
        a: {
            var e = b.nav;
            for (const f of d)
                if (f.url === e) {
                    f.focus();
                    break a
                }
            self.clients.openWindow(e)
        }
    });
    a.waitUntil(c);
    a.waitUntil(Fl(b.clickEndpoint))
};
self.onnotificationclose = function(a) {
    var b = a.notification.data;
    if (null == b ? 0 : b.clickTrackingParams) {
        var c = V(b.clickTrackingParams);
        a = {
            ca: 8,
            visualElement: c
        };
        if (b.isDismissed) {
            const d = Jj(74726);
            b = Lk();
            Pk(b, d, c, 8);
            c = {
                ca: 8,
                visualElement: d
            };
            uk(wk.B(), c);
            Wk(b, c)
        }
        vk(wk.B(), a)
    }
};
self.onpush = function(a) {
    a.waitUntil(Ck("NotificationsDisabled").then(b => {
        if (b) return Promise.resolve();
        if (a.data && a.data.text().length) try {
            return Bl(a.data.json())
        } catch (c) {
            return Promise.resolve(c.message)
        }
        return Promise.resolve()
    }));
    a.waitUntil(zl())
};
self.onpushsubscriptionchange = function() {
    xl()
};
const Nm = new Am,
    Zm = new Vm;
(new $m).init();
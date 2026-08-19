function We(o, n) {
  (n == null || n > o.length) && (n = o.length);
  for (var e = 0, c = Array(n); e < n; e++) c[e] = o[e];
  return c;
}
function $n(o) {
  if (Array.isArray(o)) return o;
}
function Hn(o, n) {
  var e = o == null ? null : typeof Symbol < "u" && o[Symbol.iterator] || o["@@iterator"];
  if (e != null) {
    var c, a, l, r, d = [], f = !0, g = !1;
    try {
      if (l = (e = e.call(o)).next, n !== 0) for (; !(f = (c = l.call(e)).done) && (d.push(c.value), d.length !== n); f = !0) ;
    } catch (b) {
      g = !0, a = b;
    } finally {
      try {
        if (!f && e.return != null && (r = e.return(), Object(r) !== r)) return;
      } finally {
        if (g) throw a;
      }
    }
    return d;
  }
}
function Gn() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Wn(o, n) {
  return $n(o) || Hn(o, n) || Vn(o, n) || Gn();
}
function Vn(o, n) {
  if (o) {
    if (typeof o == "string") return We(o, n);
    var e = {}.toString.call(o).slice(8, -1);
    return e === "Object" && o.constructor && (e = o.constructor.name), e === "Map" || e === "Set" ? Array.from(o) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? We(o, n) : void 0;
  }
}
const cn = Object.entries, Ve = Object.setPrototypeOf, jn = Object.isFrozen, Yn = Object.getPrototypeOf, qn = Object.getOwnPropertyDescriptor;
let F = Object.freeze, $ = Object.seal, yt = Object.create, dn = typeof Reflect < "u" && Reflect, ge = dn.apply, me = dn.construct;
F || (F = function(n) {
  return n;
});
$ || ($ = function(n) {
  return n;
});
ge || (ge = function(n, e) {
  for (var c = arguments.length, a = new Array(c > 2 ? c - 2 : 0), l = 2; l < c; l++)
    a[l - 2] = arguments[l];
  return n.apply(e, a);
});
me || (me = function(n) {
  for (var e = arguments.length, c = new Array(e > 1 ? e - 1 : 0), a = 1; a < e; a++)
    c[a - 1] = arguments[a];
  return new n(...c);
});
const Tt = C(Array.prototype.forEach), Xn = C(Array.prototype.lastIndexOf), je = C(Array.prototype.pop), kt = C(Array.prototype.push), Kn = C(Array.prototype.splice), rt = Array.isArray, Lt = C(String.prototype.toLowerCase), ce = C(String.prototype.toString), Ye = C(String.prototype.match), Nt = C(String.prototype.replace), qe = C(String.prototype.indexOf), Zn = C(String.prototype.trim), Jn = C(Number.prototype.toString), Qn = C(Boolean.prototype.toString), Xe = typeof BigInt > "u" ? null : C(BigInt.prototype.toString), Ke = typeof Symbol > "u" ? null : C(Symbol.prototype.toString), B = C(Object.prototype.hasOwnProperty), Ot = C(Object.prototype.toString), P = C(RegExp.prototype.test), ut = ta(TypeError);
function C(o) {
  return function(n) {
    n instanceof RegExp && (n.lastIndex = 0);
    for (var e = arguments.length, c = new Array(e > 1 ? e - 1 : 0), a = 1; a < e; a++)
      c[a - 1] = arguments[a];
    return ge(o, n, c);
  };
}
function ta(o) {
  return function() {
    for (var n = arguments.length, e = new Array(n), c = 0; c < n; c++)
      e[c] = arguments[c];
    return me(o, e);
  };
}
function A(o, n) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Lt;
  if (Ve && Ve(o, null), !rt(n))
    return o;
  let c = n.length;
  for (; c--; ) {
    let a = n[c];
    if (typeof a == "string") {
      const l = e(a);
      l !== a && (jn(n) || (n[c] = l), a = l);
    }
    o[a] = !0;
  }
  return o;
}
function ea(o) {
  for (let n = 0; n < o.length; n++)
    B(o, n) || (o[n] = null);
  return o;
}
function H(o) {
  const n = yt(null);
  for (const c of cn(o)) {
    var e = Wn(c, 2);
    const a = e[0], l = e[1];
    B(o, a) && (rt(l) ? n[a] = ea(l) : l && typeof l == "object" && l.constructor === Object ? n[a] = H(l) : n[a] = l);
  }
  return n;
}
function na(o) {
  switch (typeof o) {
    case "string":
      return o;
    case "number":
      return Jn(o);
    case "boolean":
      return Qn(o);
    case "bigint":
      return Xe ? Xe(o) : "0";
    case "symbol":
      return Ke ? Ke(o) : "Symbol()";
    case "undefined":
      return Ot(o);
    case "function":
    case "object": {
      if (o === null)
        return Ot(o);
      const n = o, e = K(n, "toString");
      if (typeof e == "function") {
        const c = e(n);
        return typeof c == "string" ? c : Ot(c);
      }
      return Ot(o);
    }
    default:
      return Ot(o);
  }
}
function K(o, n) {
  for (; o !== null; ) {
    const c = qn(o, n);
    if (c) {
      if (c.get)
        return C(c.get);
      if (typeof c.value == "function")
        return C(c.value);
    }
    o = Yn(o);
  }
  function e() {
    return null;
  }
  return e;
}
function aa(o) {
  try {
    return P(o, ""), !0;
  } catch {
    return !1;
  }
}
const Ze = F(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), de = F(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), ue = F(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), oa = F(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), fe = F(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), sa = F(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Je = F(["#text"]), Qe = F(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]), pe = F(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dominant-baseline", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-orientation", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), tn = F(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Wt = F(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), ia = $(/{{[\w\W]*|^[\w\W]*}}/g), ra = $(/<%[\w\W]*|^[\w\W]*%>/g), la = $(/\${[\w\W]*/g), ca = $(/^data-[\-\w.\u00B7-\uFFFF]+$/), da = $(/^aria-[\-\w]+$/), en = $(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), ua = $(/^(?:\w+script|data):/i), fa = $(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), pa = $(/^html$/i), ga = $(/^[a-z][.\w]*(-[.\w]+)+$/i), nn = $(/<[/\w!]/g), an = $(/<[/\w]/g), ma = $(/<\/no(script|embed|frames)/i), ha = $(/\/>/i), q = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  processingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12
  // Deprecated
}, ba = function() {
  return typeof window > "u" ? null : window;
}, _a = function(n, e) {
  if (typeof n != "object" || typeof n.createPolicy != "function")
    return null;
  let c = null;
  const a = "data-tt-policy-suffix";
  e && e.hasAttribute(a) && (c = e.getAttribute(a));
  const l = "dompurify" + (c ? "#" + c : "");
  try {
    return n.createPolicy(l, {
      createHTML(r) {
        return r;
      },
      createScriptURL(r) {
        return r;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + l + " could not be created."), null;
  }
}, on = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
}, it = function(n, e, c, a) {
  return B(n, e) && rt(n[e]) ? A(a.base ? H(a.base) : {}, n[e], a.transform) : c;
};
function un() {
  let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ba();
  const n = (p) => un(p);
  if (n.version = "3.4.13", n.removed = [], !o || !o.document || o.document.nodeType !== q.document || !o.Element)
    return n.isSupported = !1, n;
  let e = o.document;
  const c = e, a = c.currentScript;
  o.DocumentFragment;
  const l = o.HTMLTemplateElement, r = o.Node, d = o.Element, f = o.NodeFilter, g = o.NamedNodeMap;
  g === void 0 && (o.NamedNodeMap || o.MozNamedAttrMap), o.HTMLFormElement;
  const b = o.DOMParser, m = o.trustedTypes, v = d.prototype, k = K(v, "cloneNode"), y = K(v, "remove"), O = K(v, "nextSibling"), E = K(v, "childNodes"), D = K(v, "parentNode"), G = K(v, "shadowRoot"), M = K(v, "attributes"), U = r && r.prototype ? K(r.prototype, "nodeType") : null, J = r && r.prototype ? K(r.prototype, "nodeName") : null, Rt = r && r.prototype ? K(r.prototype, "ownerDocument") : null;
  if (typeof l == "function") {
    const p = e.createElement("template");
    p.content && p.content.ownerDocument && (e = p.content.ownerDocument);
  }
  let V, lt = "", Vt, be = !1, At = 0;
  const _e = function() {
    if (At > 0)
      throw ut('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  }, gt = function(t) {
    _e(), At++;
    try {
      return V.createHTML(t);
    } finally {
      At--;
    }
  }, pn = function(t) {
    _e(), At++;
    try {
      return V.createScriptURL(t);
    } finally {
      At--;
    }
  }, gn = function() {
    return be || (Vt = _a(m, a), be = !0), Vt;
  }, It = e, jt = It.implementation, ve = It.createNodeIterator, mn = It.createDocumentFragment, hn = It.getElementsByTagName, bn = c.importNode;
  let x = on();
  n.isSupported = typeof cn == "function" && typeof D == "function" && jt && jt.createHTMLDocument !== void 0;
  const _n = ia, vn = ra, Tn = la, kn = ca, yn = da, An = ua, Te = fa, En = ga;
  let ke = en, w = null;
  const Yt = A({}, [...Ze, ...de, ...ue, ...fe, ...Je]);
  let N = null;
  const qt = A({}, [...Qe, ...pe, ...tn, ...Wt]);
  let I = Object.seal(yt(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), Et = null, ye = null;
  const nt = Object.seal(yt(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let Ae = !0, Xt = !0, Ee = !1, Se = !0, at = !1, ot = !0, ct = !1, Kt = !1, Dt = null, Ct = null, Zt = !1, mt = !1, Mt = !1, Pt = !1, xe = !0, we = !1;
  const Ne = "user-content-";
  let Jt = !0, Bt = !1, ht = {}, Q = null;
  const Qt = A({}, [
    "annotation-xml",
    "audio",
    "colgroup",
    "desc",
    "foreignobject",
    "head",
    "iframe",
    "math",
    "mi",
    "mn",
    "mo",
    "ms",
    "mtext",
    "noembed",
    "noframes",
    "noscript",
    "plaintext",
    "script",
    // <selectedcontent> mirrors the selected <option>'s subtree, cloned by
    // the UA (customizable <select>) — including any on* handlers — and the
    // engine re-mirrors synchronously whenever a removal changes which
    // option/selectedcontent is current, even inside DOMPurify's inert
    // DOMParser document. Hoisting its children on removal re-inserts a fresh
    // mirror target ahead of the walk, which the engine refills, looping
    // forever (DoS) and amplifying output. Dropping its content on removal
    // (rather than hoisting) breaks that cascade; the content is a duplicate
    // of the option, which is sanitized on its own. See campaign-3 F1/F6.
    "selectedcontent",
    "style",
    "svg",
    "template",
    "thead",
    "title",
    "video",
    "xmp"
  ]);
  let Oe = null;
  const Le = A({}, ["audio", "video", "img", "source", "image", "track"]);
  let te = null;
  const Re = A({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Ut = "http://www.w3.org/1998/Math/MathML", zt = "http://www.w3.org/2000/svg", tt = "http://www.w3.org/1999/xhtml";
  let bt = tt, ee = !1, ne = null;
  const Sn = A({}, [Ut, zt, tt], ce), Ie = F(["mi", "mo", "mn", "ms", "mtext"]);
  let ae = A({}, Ie);
  const De = F(["annotation-xml"]);
  let oe = A({}, De);
  const xn = A({}, ["title", "style", "font", "a", "script"]);
  let St = null;
  const wn = ["application/xhtml+xml", "text/html"], Nn = "text/html";
  let L = null, _t = null;
  const On = e.createElement("form"), Ce = function(t) {
    return t instanceof RegExp || t instanceof Function;
  }, se = function() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (_t && _t === t)
      return;
    (!t || typeof t != "object") && (t = {}), t = H(t), St = // eslint-disable-next-line unicorn/prefer-includes
    wn.indexOf(t.PARSER_MEDIA_TYPE) === -1 ? Nn : t.PARSER_MEDIA_TYPE, L = St === "application/xhtml+xml" ? ce : Lt, w = it(t, "ALLOWED_TAGS", Yt, {
      transform: L
    }), N = it(t, "ALLOWED_ATTR", qt, {
      transform: L
    }), ne = it(t, "ALLOWED_NAMESPACES", Sn, {
      transform: ce
    }), te = it(t, "ADD_URI_SAFE_ATTR", Re, {
      transform: L,
      base: Re
    }), Oe = it(t, "ADD_DATA_URI_TAGS", Le, {
      transform: L,
      base: Le
    }), Q = it(t, "FORBID_CONTENTS", Qt, {
      transform: L
    }), Et = it(t, "FORBID_TAGS", H({}), {
      transform: L
    }), ye = it(t, "FORBID_ATTR", H({}), {
      transform: L
    }), ht = B(t, "USE_PROFILES") ? t.USE_PROFILES && typeof t.USE_PROFILES == "object" ? H(t.USE_PROFILES) : t.USE_PROFILES : !1, Ae = t.ALLOW_ARIA_ATTR !== !1, Xt = t.ALLOW_DATA_ATTR !== !1, Ee = t.ALLOW_UNKNOWN_PROTOCOLS || !1, Se = t.ALLOW_SELF_CLOSE_IN_ATTR !== !1, at = t.SAFE_FOR_TEMPLATES || !1, ot = t.SAFE_FOR_XML !== !1, ct = t.WHOLE_DOCUMENT || !1, mt = t.RETURN_DOM || !1, Mt = t.RETURN_DOM_FRAGMENT || !1, Pt = t.RETURN_TRUSTED_TYPE || !1, Zt = t.FORCE_BODY || !1, xe = t.SANITIZE_DOM !== !1, we = t.SANITIZE_NAMED_PROPS || !1, Jt = t.KEEP_CONTENT !== !1, Bt = t.IN_PLACE || !1, ke = aa(t.ALLOWED_URI_REGEXP) ? t.ALLOWED_URI_REGEXP : en, bt = typeof t.NAMESPACE == "string" ? t.NAMESPACE : tt, ae = B(t, "MATHML_TEXT_INTEGRATION_POINTS") && t.MATHML_TEXT_INTEGRATION_POINTS && typeof t.MATHML_TEXT_INTEGRATION_POINTS == "object" ? H(t.MATHML_TEXT_INTEGRATION_POINTS) : A({}, Ie), oe = B(t, "HTML_INTEGRATION_POINTS") && t.HTML_INTEGRATION_POINTS && typeof t.HTML_INTEGRATION_POINTS == "object" ? H(t.HTML_INTEGRATION_POINTS) : A({}, De);
    const i = B(t, "CUSTOM_ELEMENT_HANDLING") && t.CUSTOM_ELEMENT_HANDLING && typeof t.CUSTOM_ELEMENT_HANDLING == "object" ? H(t.CUSTOM_ELEMENT_HANDLING) : yt(null);
    if (I = yt(null), B(i, "tagNameCheck") && Ce(i.tagNameCheck) && (I.tagNameCheck = i.tagNameCheck), B(i, "attributeNameCheck") && Ce(i.attributeNameCheck) && (I.attributeNameCheck = i.attributeNameCheck), B(i, "allowCustomizedBuiltInElements") && typeof i.allowCustomizedBuiltInElements == "boolean" && (I.allowCustomizedBuiltInElements = i.allowCustomizedBuiltInElements), $(I), at && (Xt = !1), Mt && (mt = !0), ht && (w = A({}, Je), N = yt(null), ht.html === !0 && (A(w, Ze), A(N, Qe)), ht.svg === !0 && (A(w, de), A(N, pe), A(N, Wt)), ht.svgFilters === !0 && (A(w, ue), A(N, pe), A(N, Wt)), ht.mathMl === !0 && (A(w, fe), A(N, tn), A(N, Wt))), nt.tagCheck = null, nt.attributeCheck = null, B(t, "ADD_TAGS") && (typeof t.ADD_TAGS == "function" ? nt.tagCheck = t.ADD_TAGS : rt(t.ADD_TAGS) && (w === Yt && (w = H(w)), A(w, t.ADD_TAGS, L))), B(t, "ADD_ATTR") && (typeof t.ADD_ATTR == "function" ? nt.attributeCheck = t.ADD_ATTR : rt(t.ADD_ATTR) && (N === qt && (N = H(N)), A(N, t.ADD_ATTR, L))), B(t, "ADD_URI_SAFE_ATTR") && rt(t.ADD_URI_SAFE_ATTR) && A(te, t.ADD_URI_SAFE_ATTR, L), B(t, "FORBID_CONTENTS") && rt(t.FORBID_CONTENTS) && (Q === Qt && (Q = H(Q)), A(Q, t.FORBID_CONTENTS, L)), B(t, "ADD_FORBID_CONTENTS") && rt(t.ADD_FORBID_CONTENTS) && (Q === Qt && (Q = H(Q)), A(Q, t.ADD_FORBID_CONTENTS, L)), Jt && (w["#text"] = !0), ct && A(w, ["html", "head", "body"]), w.table && (A(w, ["tbody"]), delete Et.tbody), t.TRUSTED_TYPES_POLICY) {
      if (typeof t.TRUSTED_TYPES_POLICY.createHTML != "function")
        throw ut('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof t.TRUSTED_TYPES_POLICY.createScriptURL != "function")
        throw ut('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const u = V;
      V = t.TRUSTED_TYPES_POLICY;
      try {
        lt = gt("");
      } catch (h) {
        throw V = u, h;
      }
    } else t.TRUSTED_TYPES_POLICY === null ? (V = void 0, lt = "") : (V === void 0 && (V = gn()), V && typeof lt == "string" && (lt = gt("")));
    F && F(t), _t = t;
  }, Me = A({}, [...de, ...ue, ...oa]), Pe = A({}, [...fe, ...sa]), Ln = function(t, i, u) {
    return i.namespaceURI === tt ? t === "svg" : i.namespaceURI === Ut ? t === "svg" && (u === "annotation-xml" || ae[u]) : !!Me[t];
  }, Rn = function(t, i, u) {
    return i.namespaceURI === tt ? t === "math" : i.namespaceURI === zt ? t === "math" && oe[u] : !!Pe[t];
  }, In = function(t, i, u) {
    return i.namespaceURI === zt && !oe[u] || i.namespaceURI === Ut && !ae[u] ? !1 : !Pe[t] && (xn[t] || !Me[t]);
  }, Dn = function(t) {
    let i = D(t);
    (!i || !i.tagName) && (i = {
      namespaceURI: bt,
      tagName: "template"
    });
    const u = Lt(t.tagName), h = Lt(i.tagName);
    return ne[t.namespaceURI] ? t.namespaceURI === zt ? Ln(u, i, h) : t.namespaceURI === Ut ? Rn(u, i, h) : t.namespaceURI === tt ? In(u, i, h) : !!(St === "application/xhtml+xml" && ne[t.namespaceURI]) : !1;
  }, st = function(t) {
    kt(n.removed, {
      element: t
    });
    try {
      D(t).removeChild(t);
    } catch {
      if (y(t), !D(t))
        throw ut("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  }, Ft = function(t) {
    xt(t);
    const i = E(t);
    if (i) {
      const h = [];
      Tt(i, (_) => {
        kt(h, _);
      }), Tt(h, (_) => {
        try {
          y(_);
        } catch {
        }
      });
    }
    const u = M(t);
    if (u)
      for (let h = u.length - 1; h >= 0; --h) {
        const _ = u[h], T = _ && _.name;
        if (typeof T == "string")
          try {
            t.removeAttribute(T);
          } catch {
          }
      }
  }, dt = function(t, i) {
    try {
      kt(n.removed, {
        attribute: i.getAttributeNode(t),
        from: i
      });
    } catch {
      kt(n.removed, {
        attribute: null,
        from: i
      });
    }
    if (i.removeAttribute(t), t === "is")
      if (mt || Mt)
        try {
          st(i);
        } catch {
        }
      else
        try {
          i.setAttribute(t, "");
        } catch {
        }
  }, Cn = function(t) {
    const i = M(t);
    if (i)
      for (let u = i.length - 1; u >= 0; --u) {
        const h = i[u], _ = h && h.name;
        if (!(typeof _ != "string" || N[L(_)]))
          try {
            t.removeAttribute(_);
          } catch {
          }
      }
  }, xt = function(t) {
    const i = [t];
    for (; i.length > 0; ) {
      const u = i.pop();
      (U ? U(u) : u.nodeType) === q.element && Cn(u);
      const _ = E(u);
      if (_)
        for (let T = _.length - 1; T >= 0; --T)
          i.push(_[T]);
    }
  }, Mn = function(t) {
    if (!ot)
      return;
    const i = [t];
    for (; i.length > 0; ) {
      const u = i.pop(), h = U ? U(u) : u.nodeType;
      if (h === q.processingInstruction || h === q.comment && P(an, u.data)) {
        try {
          y(u);
        } catch {
        }
        continue;
      }
      if (h === q.element) {
        const T = u, S = L(J ? J(u) : u.nodeName);
        try {
          T.hasAttribute && T.hasAttribute("patchsrc") && T.removeAttribute("patchsrc"), T.hasAttribute && T.hasAttribute("for") && S !== "label" && S !== "output" && T.removeAttribute("for");
        } catch {
        }
      }
      const _ = E(u);
      if (_)
        for (let T = _.length - 1; T >= 0; --T)
          i.push(_[T]);
    }
  }, Be = function(t) {
    let i = null, u = null;
    if (Zt)
      t = "<remove></remove>" + t;
    else {
      const T = Ye(t, /^[\r\n\t ]+/);
      u = T && T[0];
    }
    St === "application/xhtml+xml" && bt === tt && (t = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + t + "</body></html>");
    const h = V ? gt(t) : t;
    if (bt === tt)
      try {
        i = new b().parseFromString(h, St);
      } catch {
      }
    if (!i || !i.documentElement) {
      i = jt.createDocument(bt, "template", null);
      try {
        i.documentElement.innerHTML = ee ? lt : h;
      } catch {
      }
    }
    const _ = i.body || i.documentElement;
    return t && u && _.insertBefore(e.createTextNode(u), _.childNodes[0] || null), bt === tt ? hn.call(i, ct ? "html" : "body")[0] : ct ? i.documentElement : _;
  }, Ue = function(t) {
    const i = Rt ? Rt(t) : t.ownerDocument;
    return ve.call(
      i || t,
      t,
      // eslint-disable-next-line no-bitwise
      f.SHOW_ELEMENT | f.SHOW_COMMENT | f.SHOW_TEXT | f.SHOW_PROCESSING_INSTRUCTION | f.SHOW_CDATA_SECTION,
      null
    );
  }, $t = function(t) {
    return t = Nt(t, _n, " "), t = Nt(t, vn, " "), t = Nt(t, Tn, " "), t;
  }, ie = function(t) {
    var i;
    t.normalize();
    const u = Rt ? Rt(t) : t.ownerDocument, h = ve.call(
      u || t,
      t,
      // eslint-disable-next-line no-bitwise
      f.SHOW_TEXT | f.SHOW_COMMENT | f.SHOW_CDATA_SECTION | f.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let _ = h.nextNode();
    for (; _; )
      _.data = $t(_.data), _ = h.nextNode();
    const T = (i = t.querySelectorAll) === null || i === void 0 ? void 0 : i.call(t, "template");
    T && Tt(T, (S) => {
      vt(S.content) && ie(S.content);
    });
  }, Ht = function(t) {
    const i = J ? J(t) : null;
    return typeof i != "string" || L(i) !== "form" ? !1 : typeof t.nodeName != "string" || typeof t.textContent != "string" || typeof t.removeChild != "function" || // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    t.attributes !== M(t) || typeof t.removeAttribute != "function" || typeof t.setAttribute != "function" || typeof t.namespaceURI != "string" || typeof t.insertBefore != "function" || typeof t.hasChildNodes != "function" || // NodeType clobbering probe. Cached Node.prototype.nodeType getter
    // returns the integer 1 for any Element regardless of realm; direct
    // read on a clobbered form (e.g. <input name="nodeType">) returns
    // the named child element. Cheap addition — nodeType is read from
    // an internal slot, no serialization cost — and removes a residual
    // clobbering surface used by several mXSS / PI / comment branches
    // in _sanitizeElements that compare currentNode.nodeType directly.
    t.nodeType !== U(t) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
    // "childNodes" shadows the prototype getter. Direct reads of
    // form.childNodes from a clobbered form return the named child
    // instead of the real NodeList, so any walk that reads it directly
    // skips the form's real children. Compare the direct read to the
    // cached Node.prototype getter — when the form's named-property
    // getter intercepts the read, the two values differ and we flag
    // the form. This catches every clobbering child type (input,
    // select, etc.) regardless of whether the named child happens to
    // carry a numeric .length, which a typeof-based probe would miss
    // (e.g. HTMLSelectElement.length is a defined unsigned-long).
    t.childNodes !== E(t);
  }, vt = function(t) {
    if (!U || typeof t != "object" || t === null)
      return !1;
    try {
      return U(t) === q.documentFragment;
    } catch {
      return !1;
    }
  }, wt = function(t) {
    if (!U || typeof t != "object" || t === null)
      return !1;
    try {
      return typeof U(t) == "number";
    } catch {
      return !1;
    }
  };
  function et(p, t, i) {
    p.length !== 0 && Tt(p, (u) => {
      u.call(n, t, i, _t);
    });
  }
  const Pn = function(t, i) {
    return !!(ot && t.hasChildNodes() && !wt(t.firstElementChild) && P(nn, t.textContent) && P(nn, t.innerHTML) || ot && t.namespaceURI === tt && i === "style" && wt(t.firstElementChild) || t.nodeType === q.processingInstruction || ot && t.nodeType === q.comment && P(an, t.data));
  }, Bn = function(t, i, u) {
    if (!Et[i] && He(i) && (I.tagNameCheck instanceof RegExp && P(I.tagNameCheck, i) || I.tagNameCheck instanceof Function && I.tagNameCheck(i)))
      return !1;
    if (Jt && !Q[i]) {
      const h = D(t), _ = E(t);
      if (_ && h) {
        const T = _.length;
        for (let S = T - 1; S >= 0; --S) {
          const R = t === u ? k(_[S], !0) : _[S];
          h.insertBefore(R, O(t));
        }
      }
    }
    return st(t), !0;
  }, ze = function(t, i, u, h) {
    return t.length === 0 ? i : i === u || i === h ? H(i) : i;
  }, Fe = function(t, i) {
    if (et(x.beforeSanitizeElements, t, null), t !== i && D(t) === null)
      return Bt && xt(t), !0;
    if (Ht(t))
      return st(t), !0;
    const u = L(J ? J(t) : t.nodeName);
    if (w = ze(x.uponSanitizeElement, w, Yt, Dt), et(x.uponSanitizeElement, t, {
      tagName: u,
      allowedTags: w
    }), t !== i && D(t) === null)
      return Bt && xt(t), !0;
    if (Pn(t, u))
      return st(t), !0;
    if (Et[u] || !(nt.tagCheck instanceof Function && nt.tagCheck(u)) && !w[u]) {
      const _ = Bn(t, u, i);
      return _ === !1 && et(x.afterSanitizeElements, t, null), _;
    }
    if ((U ? U(t) : t.nodeType) === q.element && !Dn(t) || (u === "noscript" || u === "noembed" || u === "noframes") && P(ma, t.innerHTML))
      return st(t), !0;
    if (at && t.nodeType === q.text) {
      const _ = $t(t.textContent);
      t.textContent !== _ && (kt(n.removed, {
        element: t.cloneNode()
      }), t.textContent = _);
    }
    return et(x.afterSanitizeElements, t, null), !1;
  }, $e = function(t, i, u) {
    if (ye[i] || ot && i === "patchsrc" || ot && i === "for" && t !== "label" && t !== "output" || xe && (i === "id" || i === "name") && (u in e || u in On))
      return !1;
    const h = N[i] || nt.attributeCheck instanceof Function && nt.attributeCheck(i, t);
    if (!(Xt && P(kn, i))) {
      if (!(Ae && P(yn, i))) {
        if (h) {
          if (!te[i]) {
            if (!P(ke, Nt(u, Te, ""))) {
              if (!((i === "src" || i === "xlink:href" || i === "href") && t !== "script" && qe(u, "data:") === 0 && Oe[t])) {
                if (!(Ee && !P(An, Nt(u, Te, "")))) {
                  if (u)
                    return !1;
                }
              }
            }
          }
        } else if (
          // First condition does a very basic check if a) it's basically a valid custom element tagname AND
          // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
          // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
          !(He(t) && (I.tagNameCheck instanceof RegExp && P(I.tagNameCheck, t) || I.tagNameCheck instanceof Function && I.tagNameCheck(t)) && (I.attributeNameCheck instanceof RegExp && P(I.attributeNameCheck, i) || I.attributeNameCheck instanceof Function && I.attributeNameCheck(i, t)) || // Alternative, second condition checks if it's an `is`-attribute, AND
          // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
          i === "is" && I.allowCustomizedBuiltInElements && (I.tagNameCheck instanceof RegExp && P(I.tagNameCheck, u) || I.tagNameCheck instanceof Function && I.tagNameCheck(u)))
        ) return !1;
      }
    }
    return !0;
  }, Un = A({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]), He = function(t) {
    return !Un[Lt(t)] && P(En, t);
  }, zn = function(t, i, u, h) {
    if (V && typeof m == "object" && typeof m.getAttributeType == "function" && !u)
      switch (m.getAttributeType(t, i)) {
        case "TrustedHTML":
          return gt(h);
        case "TrustedScriptURL":
          return pn(h);
      }
    return h;
  }, Fn = function(t, i, u, h) {
    try {
      u ? t.setAttributeNS(u, i, h) : t.setAttribute(i, h), Ht(t) ? st(t) : je(n.removed);
    } catch {
      dt(i, t);
    }
  }, Ge = function(t) {
    et(x.beforeSanitizeAttributes, t, null);
    const i = t.attributes;
    if (!i || Ht(t))
      return;
    N = ze(x.uponSanitizeAttribute, N, qt, Ct);
    const u = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: N,
      forceKeepAttr: void 0
    };
    let h = i.length;
    const _ = L(t.nodeName);
    for (; h--; ) {
      const T = i[h], S = T.name, R = T.namespaceURI, j = T.value, Y = L(S), le = j;
      let W = S === "value" ? le : Zn(le);
      if (u.attrName = Y, u.attrValue = W, u.keepAttr = !0, u.forceKeepAttr = void 0, et(x.uponSanitizeAttribute, t, u), W = u.attrValue, we && (Y === "id" || Y === "name") && qe(W, Ne) !== 0 && (dt(S, t), W = Ne + W), ot && P(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, W)) {
        dt(S, t);
        continue;
      }
      if (Y === "attributename" && Ye(W, "href")) {
        dt(S, t);
        continue;
      }
      if (!u.forceKeepAttr) {
        if (!u.keepAttr) {
          dt(S, t);
          continue;
        }
        if (!Se && P(ha, W)) {
          dt(S, t);
          continue;
        }
        if (at && (W = $t(W)), !$e(_, Y, W)) {
          dt(S, t);
          continue;
        }
        W = zn(_, Y, R, W), W !== le && Fn(t, S, R, W);
      }
    }
    et(x.afterSanitizeAttributes, t, null);
  }, Gt = function(t) {
    let i = null;
    const u = Ue(t);
    for (et(x.beforeSanitizeShadowDOM, t, null); i = u.nextNode(); )
      if (et(x.uponSanitizeShadowNode, i, null), Fe(i, t), Ge(i), vt(i.content) && Gt(i.content), (U ? U(i) : i.nodeType) === q.element) {
        const _ = G(i);
        vt(_) && (re(_), Gt(_));
      }
    et(x.afterSanitizeShadowDOM, t, null);
  }, re = function(t) {
    const i = [{
      node: t,
      shadow: null
    }];
    for (; i.length > 0; ) {
      const u = i.pop();
      if (u.shadow) {
        Gt(u.shadow);
        continue;
      }
      const h = u.node, T = (U ? U(h) : h.nodeType) === q.element, S = E(h);
      if (S)
        for (let R = S.length - 1; R >= 0; --R)
          i.push({
            node: S[R],
            shadow: null
          });
      if (T) {
        const R = J ? J(h) : null;
        if (typeof R == "string" && L(R) === "template") {
          const j = h.content;
          vt(j) && i.push({
            node: j,
            shadow: null
          });
        }
      }
      if (T) {
        const R = G(h);
        vt(R) && i.push({
          node: null,
          shadow: R
        }, {
          node: R,
          shadow: null
        });
      }
    }
  };
  return n.sanitize = function(p) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = null, u = null, h = null, _ = null;
    if (ee = !p, ee && (p = "<!-->"), typeof p != "string" && !wt(p) && (p = na(p), typeof p != "string"))
      throw ut("dirty is not a string, aborting");
    if (!n.isSupported)
      return p;
    Kt ? (w = Dt, N = Ct) : se(t), (x.uponSanitizeElement.length > 0 || x.uponSanitizeAttribute.length > 0) && (w = H(w)), x.uponSanitizeAttribute.length > 0 && (N = H(N)), n.removed = [];
    const T = Bt && typeof p != "string" && wt(p);
    if (T) {
      Mn(p);
      const j = J ? J(p) : p.nodeName;
      if (typeof j == "string") {
        const Y = L(j);
        if (!w[Y] || Et[Y])
          throw Ft(p), ut("root node is forbidden and cannot be sanitized in-place");
      }
      if (Ht(p))
        throw Ft(p), ut("root node is clobbered and cannot be sanitized in-place");
      try {
        re(p);
      } catch (Y) {
        throw Ft(p), Y;
      }
    } else if (wt(p))
      i = Be("<!---->"), u = i.ownerDocument.importNode(p, !0), u.nodeType === q.element && u.nodeName === "BODY" || u.nodeName === "HTML" ? i = u : i.appendChild(u), re(u);
    else {
      if (!mt && !at && !ct && // eslint-disable-next-line unicorn/prefer-includes
      p.indexOf("<") === -1)
        return V && Pt ? gt(p) : p;
      if (i = Be(p), !i)
        return mt ? null : Pt ? lt : "";
    }
    i && Zt && st(i.firstChild);
    const S = T ? p : i;
    try {
      const j = Ue(S);
      for (; h = j.nextNode(); )
        Fe(h, S), Ge(h), vt(h.content) && Gt(h.content);
    } catch (j) {
      throw T && (Ft(p), Tt(n.removed, (Y) => {
        Y.element && xt(Y.element);
      })), j;
    }
    if (T)
      return Tt(n.removed, (j) => {
        j.element && xt(j.element);
      }), at && ie(p), p;
    if (mt) {
      if (at && ie(i), Mt)
        for (_ = mn.call(i.ownerDocument); i.firstChild; )
          _.appendChild(i.firstChild);
      else
        _ = i;
      return (N.shadowroot || N.shadowrootmode) && (_ = bn.call(c, _, !0)), _;
    }
    let R = ct ? i.outerHTML : i.innerHTML;
    return ct && w["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && P(pa, i.ownerDocument.doctype.name) && (R = "<!DOCTYPE " + i.ownerDocument.doctype.name + `>
` + R), at && (R = $t(R)), V && Pt ? gt(R) : R;
  }, n.setConfig = function() {
    let p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    se(p), Kt = !0, Dt = w, Ct = N;
  }, n.clearConfig = function() {
    _t = null, Kt = !1, Dt = null, Ct = null, V = Vt, lt = "";
  }, n.isValidAttribute = function(p, t, i) {
    _t || se({});
    const u = L(p), h = L(t);
    return $e(u, h, i);
  }, n.addHook = function(p, t) {
    typeof t == "function" && B(x, p) && kt(x[p], t);
  }, n.removeHook = function(p, t) {
    if (B(x, p)) {
      if (t !== void 0) {
        const i = Xn(x[p], t);
        return i === -1 ? void 0 : Kn(x[p], i, 1)[0];
      }
      return je(x[p]);
    }
  }, n.removeHooks = function(p) {
    B(x, p) && (x[p] = []);
  }, n.removeAllHooks = function() {
    x = on();
  }, n;
}
var va = un();
const Ta = ["a", "abbr", "b", "br", "code", "em", "li", "ol", "p", "span", "strong", "ul"], ka = ["href", "title", "target", "rel", "class"];
function s(o, n, e) {
  const c = document.createElement(o);
  return n && (c.className = n), e != null && (c.textContent = String(e)), c;
}
function X(o, n) {
  if (n && typeof n == "object" && "__html__" in n) {
    const e = String(n.__html__), c = va.sanitize(e, { ALLOWED_TAGS: Ta, ALLOWED_ATTR: ka }), a = s("div");
    for (a.innerHTML = c; a.firstChild; ) o.append(a.firstChild);
    return;
  }
  n != null && o.append(document.createTextNode(String(n)));
}
function he(o) {
  const n = String(o ?? "#").trim();
  return /^(https?:|mailto:|tel:|\/|#)/i.test(n) ? n : "#";
}
function z(o, n, e = "govuk-link", c = !1) {
  const a = s("a", `${e}${c ? " st-gds-external" : ""}`, String(o ?? ""));
  return a.href = he(n), c && (a.target = "_blank", a.rel = "noopener noreferrer"), a;
}
function Z(o, n = "field") {
  return `st-gds-${String(o._key ?? "gds").replace(/[^a-zA-Z0-9_-]/g, "-")}-${n}`;
}
function ya(o, n, e) {
  const c = [];
  if (n.hint) {
    const a = `${e}-hint`, l = s("div", "govuk-hint", n.hint);
    l.id = a, o.append(l), c.push(a);
  }
  if (n.error) {
    const a = `${e}-error`, l = s("p", "govuk-error-message");
    l.id = a;
    const r = s("span", "govuk-visually-hidden", "Error:");
    l.append(r, document.createTextNode(` ${String(n.error)}`)), o.append(l), c.push(a);
  }
  return c;
}
function pt(o, n, e = "label") {
  const c = s("div", `govuk-form-group${o.error ? " govuk-form-group--error" : ""}`), a = s(e, e === "legend" ? "govuk-fieldset__legend govuk-fieldset__legend--m" : "govuk-label", o.label);
  if (a instanceof HTMLLabelElement && (a.htmlFor = n), o.required) {
    const r = s("span", "govuk-visually-hidden", " required");
    a.append(r);
  }
  c.append(a);
  const l = ya(c, o, n);
  return { group: c, label: a, describedBy: l };
}
function ft(o, n) {
  n.length && o.setAttribute("aria-describedby", n.join(" "));
}
function fn(o) {
  return o instanceof HTMLTextAreaElement ? !0 : o instanceof HTMLInputElement ? ["text", "search", "tel", "url", "password"].includes(o.type) : !1;
}
function Aa(o, n, e) {
  if (!n) return;
  const c = o.ownerDocument.getElementById(n);
  !c || !o.contains(c) || (c.focus({ preventScroll: !0 }), e && fn(c) && c.setSelectionRange(e[0], e[1]));
}
function Ea(o, n) {
  const e = Math.min(6, Math.max(0, Math.trunc(Number(o) || 0)));
  return [
    "govuk-section-break",
    `govuk-!-margin-top-${e}`,
    `govuk-!-margin-bottom-${e}`,
    n ? "govuk-section-break--visible" : ""
  ].filter(Boolean).join(" ");
}
function sn(o, n, e, c = !1) {
  const a = Z(n), { group: l, describedBy: r } = pt(n, a), d = s("input", `govuk-input${n.error ? " govuk-input--error" : ""} st-gds-width-${String(n.width ?? "full")}`);
  d.id = a, d.name = a, d.type = c && !n.visible ? "password" : String(n.input_type ?? "text"), d.value = String(n.value ?? ""), d.disabled = !!n.disabled, d.required = !!n.required, n.autocomplete && d.setAttribute("autocomplete", String(n.autocomplete)), n.inputmode && (d.inputMode = String(n.inputmode)), ft(d, r), d.addEventListener("change", () => e.setStateValue("value", d.value));
  let f = d;
  if (n.prefix || n.suffix) {
    const g = s("div", "govuk-input__wrapper");
    n.prefix && g.append(s("div", "govuk-input__prefix", n.prefix)), g.append(d), n.suffix && g.append(s("div", "govuk-input__suffix", n.suffix)), f = g;
  }
  if (c) {
    const g = s("div", "st-gds-password-wrapper");
    g.append(d);
    const b = s(
      "button",
      "govuk-button govuk-button--secondary st-gds-password-toggle",
      n.visible ? String(n.hide_label ?? "Hide") : String(n.show_label ?? "Show")
    );
    b.type = "button", b.setAttribute("aria-controls", a), b.addEventListener("click", () => e.setStateValue("visible", !n.visible)), g.append(b), f = g;
  }
  l.append(f), o.append(l);
}
function rn(o, n, e, c = !1) {
  const a = Z(n), { group: l, describedBy: r } = pt(n, a), d = s("textarea", `govuk-textarea${n.error ? " govuk-textarea--error" : ""}`);
  d.id = a, d.name = a, d.rows = Number(n.rows ?? 5), d.value = String(n.value ?? ""), d.disabled = !!n.disabled, d.required = !!n.required, ft(d, r);
  let f = () => {
  };
  if (d.addEventListener("input", () => {
    c && f();
  }), d.addEventListener("change", () => e.setStateValue("value", d.value)), l.append(d), c) {
    const g = Number(n.max_characters), b = s("div", "govuk-character-count__message govuk-hint", "");
    b.id = `${a}-info`, b.setAttribute("aria-live", "polite"), r.push(b.id), ft(d, r), l.append(b), f = () => {
      const m = g - d.value.length;
      b.textContent = m >= 0 ? `You have ${m} character${m === 1 ? "" : "s"} remaining` : `You have ${Math.abs(m)} character${m === -1 ? "" : "s"} too many`, b.classList.toggle("govuk-error-message", m < 0);
    }, f();
  }
  o.append(l);
}
function Sa(o, n, e) {
  const c = s("section", "st-gds-chatbot");
  c.setAttribute("aria-label", String(n.label)), c.append(s("h2", "govuk-heading-m st-gds-chatbot__title", n.label));
  const a = s("div", "st-gds-chatbot__transcript");
  a.setAttribute("role", "log"), a.setAttribute("aria-label", `${String(n.label)} messages`), a.setAttribute("aria-live", "polite"), a.setAttribute("aria-relevant", "additions text"), a.tabIndex = 0;
  const l = n.messages ?? [];
  l.length || a.append(s("p", "govuk-body st-gds-chatbot__empty", n.empty_text));
  for (const y of l) {
    const O = y.name || (y.role === "user" ? n.user_name : n.assistant_name), E = s("article", `st-gds-chat-message st-gds-chat-message--${y.role}`);
    E.setAttribute("aria-label", `${String(O)} message`);
    const D = s("p", "st-gds-chat-message__meta");
    D.append(s("strong", "st-gds-chat-message__name", O)), y.timestamp && (D.append(document.createTextNode(" ")), D.append(s("time", "st-gds-chat-message__time", y.timestamp)));
    const G = s("div", "st-gds-chat-message__body");
    X(G, y.content), E.append(D, G), a.append(E);
  }
  if (n.waiting) {
    const y = s("p", "govuk-body st-gds-chatbot__status", `${String(n.assistant_name)} is responding`);
    y.setAttribute("role", "status"), a.append(y);
  }
  c.append(a);
  const r = s("form", "st-gds-chatbot__composer"), d = Z(n, "message"), f = { ...n, label: n.input_label, required: !0 }, { group: g, describedBy: b } = pt(f, d), m = s("textarea", `govuk-textarea${n.error ? " govuk-textarea--error" : ""}`);
  m.id = d, m.name = d, m.rows = 3, m.value = String(n.draft ?? ""), m.required = !0, m.disabled = !!(n.disabled || n.waiting), n.placeholder && (m.placeholder = String(n.placeholder)), ft(m, b), g.append(m);
  const v = s("button", "govuk-button st-gds-chatbot__send", n.send_label);
  v.type = "submit", v.disabled = m.disabled || !m.value.trim();
  const k = () => {
    v.disabled = m.disabled || !m.value.trim(), e.setStateValue("draft", m.value);
  };
  m.addEventListener("input", k), m.addEventListener("keydown", (y) => {
    y.key === "Enter" && (y.ctrlKey || y.metaKey) && (y.preventDefault(), r.requestSubmit());
  }), r.addEventListener("submit", (y) => {
    y.preventDefault();
    const O = m.value.trim();
    !O || m.disabled || (m.value = "", v.disabled = !0, e.setStateValue("draft", ""), e.setTriggerValue("submitted", O));
  }), r.append(g, v), c.append(r), o.append(c);
}
function ln(o, n, e, c) {
  const a = Z(n), l = s("fieldset", "govuk-fieldset"), { group: r, label: d, describedBy: f } = pt(n, a, "legend");
  l.setAttribute("aria-describedby", f.join(" ")), l.append(d);
  for (const k of [...r.children].slice(1)) l.append(k);
  const g = c ? `govuk-checkboxes${n.small ? " govuk-checkboxes--small" : ""}` : `govuk-radios${n.inline ? " govuk-radios--inline" : ""}`, b = s("div", g), m = n.options ?? [], v = c ? n.value ?? [] : [n.value];
  m.forEach((k, y) => {
    const O = s("div", c ? "govuk-checkboxes__item" : "govuk-radios__item"), E = s("input", c ? "govuk-checkboxes__input" : "govuk-radios__input");
    E.type = c ? "checkbox" : "radio", E.name = a, E.id = `${a}-${y}`, E.value = String(y), E.disabled = !!n.disabled || !!k.disabled, E.checked = v.some((M) => JSON.stringify(M) === JSON.stringify(k.value));
    const D = s("label", c ? "govuk-label govuk-checkboxes__label" : "govuk-label govuk-radios__label", k.label);
    D.htmlFor = E.id, O.append(E, D), k.hint && O.append(s("div", "govuk-hint govuk-checkboxes__hint", k.hint)), b.append(O);
    let G = null;
    k.conditional && (G = s("div", "st-gds-conditional"), X(G, k.conditional), G.hidden = !E.checked, b.append(G)), E.addEventListener("change", () => {
      if (G && (G.hidden = !E.checked), c) {
        const M = [...b.querySelectorAll("input:checked")].map((U) => m[Number(U.value)].value);
        e.setStateValue("value", M);
      } else
        e.setStateValue("value", k.value);
    });
  }), l.append(b), r.replaceChildren(l), o.append(r);
}
function xa(o, n, e) {
  const c = Z(n), { group: a, describedBy: l } = pt(n, c), r = s("select", "govuk-select");
  r.id = c, r.name = c, r.disabled = !!n.disabled, r.required = !!n.required, ft(r, l);
  const d = n.options ?? [];
  n.required || r.append(s("option", void 0, "Select an option")), d.forEach((f, g) => {
    const b = s("option", void 0, f.label);
    b.value = String(g), b.disabled = !!f.disabled, b.selected = JSON.stringify(f.value) === JSON.stringify(n.value), r.append(b);
  }), r.addEventListener("change", () => {
    e.setStateValue("value", r.value === "" ? null : d[Number(r.value)].value);
  }), a.append(r), o.append(a);
}
function wa(o, n, e) {
  const c = Z(n), { group: a, label: l, describedBy: r } = pt(n, c, "legend"), d = s("fieldset", "govuk-fieldset");
  d.append(l);
  for (const k of [...a.children].slice(1)) d.append(k);
  const f = String(n.value ?? "").split("-"), g = s("div", "st-gds-date-row"), b = [["day", f[2] ?? "", 2], ["month", f[1] ?? "", 2], ["year", f[0] ?? "", 4]], m = [];
  b.forEach(([k, y, O]) => {
    const E = s("div", "govuk-form-group"), D = `${c}-${k}`, G = s("label", "govuk-label", k[0].toUpperCase() + k.slice(1));
    G.htmlFor = D;
    const M = s("input", `govuk-input${k === "year" ? " st-gds-date-year" : ""}`);
    M.id = D, M.name = D, M.inputMode = "numeric", M.pattern = "[0-9]*", M.maxLength = O, M.value = y, M.disabled = !!n.disabled, ft(M, r), E.append(G, M), g.append(E), m.push(M);
  });
  const v = () => {
    const [k, y, O] = m.map((D) => D.value.padStart(2, "0")), E = k && y && O;
    e.setStateValue("value", E ? `${O}-${y}-${k}` : null);
  };
  m.forEach((k) => k.addEventListener("change", v)), d.append(g), a.replaceChildren(d), o.append(a);
}
function Na(o, n, e) {
  const c = Z(n), { group: a, describedBy: l } = pt(n, c), r = s("input", `govuk-file-upload${n.error ? " govuk-file-upload--error" : ""}`);
  r.type = "file", r.id = c, r.name = c, r.disabled = !!n.disabled, r.required = !!n.required, r.accept = (n.accept ?? []).join(","), ft(r, l);
  const d = s("p", "st-gds-file-meta");
  r.addEventListener("change", async () => {
    const f = r.files?.[0];
    if (!f) {
      e.setStateValue("file", null), d.textContent = "";
      return;
    }
    const g = Number(n.max_size_mb) * 1024 * 1024;
    if (f.size > g) {
      d.className = "govuk-error-message", d.textContent = `The selected file must be smaller than ${String(n.max_size_mb)} MB`, r.value = "";
      return;
    }
    const b = new Uint8Array(await f.arrayBuffer());
    d.className = "st-gds-file-meta", d.textContent = `${f.name} (${Math.ceil(f.size / 1024)} KB)`, e.setStateValue("file", { name: f.name, type: f.type, size: f.size, data: b });
  }), a.append(r, d), o.append(a);
}
function Oa(o, n, e) {
  const c = String(n.kind ?? "primary"), l = s("button", `govuk-button${{ secondary: " govuk-button--secondary", warning: " govuk-button--warning" }[c] ?? ""}${n.width === "full" ? " st-gds-button-full" : ""}`, n.label);
  l.type = "button", l.disabled = !!n.disabled, c === "start" && (l.classList.add("govuk-button--start"), l.append(document.createTextNode("  →"))), l.addEventListener("click", () => e.setTriggerValue("clicked", !0)), o.append(l);
}
function La(o, n = "text") {
  if (n === "base64") {
    if (typeof o != "string") throw new TypeError("Base64 download data must be text");
    const e = window.atob(o);
    return Uint8Array.from(e, (c) => c.charCodeAt(0));
  }
  if (typeof o == "string") return o;
  if (o instanceof Uint8Array) return new Uint8Array(o);
  if (o instanceof ArrayBuffer) return new Uint8Array(o);
  if (Array.isArray(o) && o.every((e) => Number.isInteger(e)))
    return new Uint8Array(o);
  throw new TypeError("Download data must be text or bytes");
}
function Ra(o, n, e) {
  const a = String(n.kind ?? "secondary") === "secondary" ? " govuk-button--secondary" : "", l = n.width === "full" ? " st-gds-button-full" : "", r = s("button", `govuk-button${a}${l}`, n.label);
  r.type = "button", r.disabled = !!n.disabled, n.help && (r.title = String(n.help)), r.addEventListener("click", () => {
    const d = new Blob([La(n.data, String(n.encoding))], {
      type: String(n.mime)
    }), f = URL.createObjectURL(d), g = s("a");
    g.href = f, g.download = String(n.file_name), g.hidden = !0, o.append(g), g.click(), g.remove(), window.setTimeout(() => URL.revokeObjectURL(f), 0), e.setTriggerValue("clicked", !0);
  }), o.append(r);
}
function Ia(o, n, e) {
  const c = n.items ?? [], a = new Set(n.open ?? []), l = s("div", "govuk-accordion");
  c.forEach((r, d) => {
    const f = s("div", "govuk-accordion__section"), g = s("h2", "govuk-accordion__section-heading"), b = s("button", "govuk-accordion__section-button", r.heading);
    b.type = "button";
    const m = Z(n, `accordion-${d}`);
    b.setAttribute("aria-controls", m), b.setAttribute("aria-expanded", String(a.has(d) || r.expanded));
    const v = s("div", "govuk-accordion__section-content");
    v.id = m, v.hidden = !(a.has(d) || r.expanded), X(v, r.content), b.addEventListener("click", () => {
      v.hidden = !v.hidden, b.setAttribute("aria-expanded", String(!v.hidden)), v.hidden ? a.delete(d) : a.add(d), e.setStateValue("open", [...a]);
    }), g.append(b), f.append(g, v), l.append(f);
  }), o.append(l);
}
function Da(o, n, e) {
  const c = n.items ?? [];
  let a = Number(n.selected ?? 0);
  const l = s("div", "govuk-tabs"), r = s("h2", "govuk-tabs__title", "Contents"), d = s("ul", "govuk-tabs__list");
  d.setAttribute("role", "tablist");
  const f = [], g = [], b = (m) => {
    a = m, g.forEach((v, k) => {
      v.parentElement?.classList.toggle("govuk-tabs__list-item--selected", k === m), v.setAttribute("aria-selected", String(k === m));
    }), f.forEach((v, k) => {
      v.hidden = k !== m;
    }), e.setStateValue("selected", m);
  };
  c.forEach((m, v) => {
    const k = s("li", `govuk-tabs__list-item${v === a ? " govuk-tabs__list-item--selected" : ""}`);
    k.setAttribute("role", "presentation");
    const y = z(m.label, `#${Z(n, `panel-${v}`)}`, "govuk-tabs__tab");
    y.id = Z(n, `tab-${v}`), y.setAttribute("role", "tab"), y.setAttribute("aria-selected", String(v === a)), y.addEventListener("click", (E) => {
      E.preventDefault(), b(v);
    }), k.append(y), d.append(k), g.push(y);
    const O = s("div", "govuk-tabs__panel");
    O.id = Z(n, `panel-${v}`), O.setAttribute("role", "tabpanel"), O.setAttribute("aria-labelledby", y.id), O.hidden = v !== a, X(O, m.content), f.push(O);
  }), l.append(r, d, ...f), o.append(l);
}
function Ca(o, n, e, c) {
  switch (n) {
    case "bootstrap": {
      document.documentElement.style.setProperty("--st-gds-brand", String(e.brand_colour)), document.body.classList.add("st-gds-host"), document.body.classList.toggle("st-gds-minimal-chrome", e.chrome === "minimal");
      const a = "streamlit-gds-host-styles";
      let l = document.getElementById(a);
      l || (l = document.createElement("style"), l.id = a, document.head.append(l)), l.textContent = `
        .stMainBlockContainer { max-width: 1020px; padding-left: 30px; padding-right: 30px; }
        body, [data-testid="stAppViewContainer"] { background: #fff; color: #0b0c0c; font-family: Arial, Helvetica, sans-serif; }
        .st-gds-minimal-chrome [data-testid="stHeader"], .st-gds-minimal-chrome [data-testid="stToolbar"] { display: none; }
        .st-gds-host .stApp, .st-gds-host .stApp button, .st-gds-host .stApp input,
        .st-gds-host .stApp select, .st-gds-host .stApp textarea { font-family: Arial, Helvetica, sans-serif; }
        .st-gds-host .stApp h1 { margin-bottom: 30px; color: #0b0c0c; font-size: 48px; line-height: 1.05; font-weight: 700; }
        .st-gds-host .stApp h2 { margin-bottom: 20px; color: #0b0c0c; font-size: 32px; line-height: 1.1; font-weight: 700; }
        .st-gds-host .stApp h3 { margin-bottom: 15px; color: #0b0c0c; font-size: 24px; line-height: 1.15; font-weight: 700; }
        .st-gds-host .stApp p, .st-gds-host .stApp li { color: #0b0c0c; font-size: 19px; line-height: 1.32; }
        .st-gds-host .stApp a { color: var(--st-gds-brand); text-decoration-thickness: max(1px, .0625rem); text-underline-offset: .1578em; }
        .st-gds-host .stApp a:hover { color: #003078; text-decoration-thickness: 3px; }
        .st-gds-host .stApp a:focus-visible, .st-gds-host .stApp button:focus-visible,
        .st-gds-host .stApp input:focus-visible, .st-gds-host .stApp textarea:focus-visible,
        .st-gds-host .stApp select:focus-visible, .st-gds-host .stApp [tabindex]:focus-visible {
          outline: 3px solid #ffdd00 !important; outline-offset: 0; box-shadow: 0 0 0 2px #0b0c0c !important;
        }
        .st-gds-host [data-testid^="stBaseButton-"],
        .st-gds-host [data-testid^="stBaseButton-"] button,
        .st-gds-host [data-testid="stDownloadButton"] button,
        .st-gds-host [data-testid="stFormSubmitButton"] button,
        .st-gds-host [data-testid="stLinkButton"] a {
          min-height: 40px; border: 0; border-radius: 0; box-shadow: 0 2px 0 #002d18;
          padding: 8px 15px; font-size: 19px; font-weight: 700; line-height: 1.2;
        }
        .st-gds-host [data-testid="stBaseButton-primary"] { background: #00703c; color: #fff; }
        .st-gds-host [data-testid="stBaseButton-primary"]:hover { background: #005a30; color: #fff; }
        .st-gds-host [data-testid="stBaseButton-secondary"],
        .st-gds-host [data-testid="stDownloadButton"] button,
        .st-gds-host [data-testid="stFormSubmitButton"] button,
        .st-gds-host [data-testid="stLinkButton"] a { background: #f3f2f1; color: #0b0c0c; box-shadow: 0 2px 0 #929191; }
        .st-gds-host [data-testid="stBaseButton-tertiary"] { background: transparent; color: #1d70b8; box-shadow: none; text-decoration: underline; }
        .st-gds-host [data-testid="stWidgetLabel"] p,
        .st-gds-host [data-testid="stTextInput"] label p,
        .st-gds-host [data-testid="stTextArea"] label p,
        .st-gds-host [data-testid="stNumberInput"] label p,
        .st-gds-host [data-testid="stSelectbox"] label p,
        .st-gds-host [data-testid="stFileUploader"] label p { font-size: 19px; font-weight: 700; }
        .st-gds-host [data-testid="stTextInput"] input,
        .st-gds-host [data-testid="stNumberInput"] input,
        .st-gds-host [data-testid="stDateInput"] input,
        .st-gds-host [data-testid="stTimeInput"] input,
        .st-gds-host [data-testid="stTextArea"] textarea {
          min-height: 40px; border: 2px solid #0b0c0c; border-radius: 0; background: #fff; color: #0b0c0c; font-size: 19px;
        }
        .st-gds-host [data-baseweb="select"] > div { min-height: 40px; border: 2px solid #0b0c0c; border-radius: 0; background: #fff; color: #0b0c0c; }
        .st-gds-host [data-testid="stSelectbox"] [role="group"],
        .st-gds-host [data-testid="stMultiSelect"] [role="group"] {
          min-height: 40px; border: 2px solid #0b0c0c; border-radius: 0; background: #fff; color: #0b0c0c;
        }
        .st-gds-host [data-testid="stSelectbox"] [role="combobox"],
        .st-gds-host [data-testid="stMultiSelect"] [role="combobox"],
        .st-gds-host [data-testid="stSelectbox"] [role="group"] button,
        .st-gds-host [data-testid="stMultiSelect"] [role="group"] button { color: #0b0c0c; }
        .st-gds-host [data-testid="stMultiSelect"] [role="combobox"]::placeholder {
          color: #505a5f; opacity: 1;
        }
        .st-gds-host [data-testid="stSelectbox"] svg,
        .st-gds-host [data-testid="stMultiSelect"] svg { fill: #0b0c0c; }
        .st-gds-host [data-testid="stButtonGroup"] button[data-variant="pills"],
        .st-gds-host [data-testid="stButtonGroup"] button[data-variant="segmented_control"] {
          border: 2px solid #0b0c0c; background: #f3f2f1; color: #0b0c0c;
        }
        .st-gds-host [data-testid="stButtonGroup"] button[data-variant="pills"] {
          border-radius: 999px;
        }
        .st-gds-host [data-testid="stButtonGroup"] button[data-variant="segmented_control"] {
          border-radius: 0; margin-right: -2px;
        }
        .st-gds-host [data-testid="stButtonGroup"] button[data-variant="pills"] p,
        .st-gds-host [data-testid="stButtonGroup"] button[data-variant="segmented_control"] p {
          color: inherit;
        }
        .st-gds-host [data-testid="stButtonGroup"] button[data-variant="pills"]:hover,
        .st-gds-host [data-testid="stButtonGroup"] button[data-variant="segmented_control"]:hover {
          background: #b1b4b6; color: #0b0c0c;
        }
        .st-gds-host [data-testid="stButtonGroup"] button[data-variant="pills"][aria-checked="true"],
        .st-gds-host [data-testid="stButtonGroup"] button[data-variant="segmented_control"][aria-checked="true"] {
          background: var(--st-gds-brand); color: #fff;
        }
        .st-gds-host [data-testid="stCheckbox"] label, .st-gds-host [data-testid="stRadio"] label,
        .st-gds-host [data-testid="stToggle"] label { color: #0b0c0c; font-size: 19px; }
        .st-gds-host [data-testid="stFileUploaderDropzone"] { border: 2px dashed #505a5f; border-radius: 0; background: #f3f2f1; }
        .st-gds-host [data-testid="stForm"] { border: 1px solid #b1b4b6; border-radius: 0; background: #fff; }
        .st-gds-host [data-testid="stExpander"] details, .st-gds-host [data-testid="stPopoverBody"] { border-radius: 0; }
        .st-gds-host [data-testid="stExpander"] summary { border-top: 1px solid #b1b4b6; color: #1d70b8; font-size: 19px; font-weight: 700; }
        .st-gds-host [data-baseweb="tab-list"] { gap: 5px; border-bottom: 1px solid #b1b4b6; }
        .st-gds-host [data-baseweb="tab"] { border-radius: 0; background: #f3f2f1; color: #0b0c0c; font-size: 19px; }
        .st-gds-host [data-baseweb="tab"][aria-selected="true"] { margin-bottom: -1px; border: 1px solid #b1b4b6; border-bottom-color: #fff; background: #fff; font-weight: 700; }
        .st-gds-host [data-testid="stMetric"] { min-height: 100%; border-top: 5px solid var(--st-gds-brand); background: #f3f2f1; padding: 15px; }
        .st-gds-host [data-testid="stMetricLabel"] p { font-size: 19px; font-weight: 700; }
        .st-gds-host [data-testid="stMetricValue"] { color: #0b0c0c; font-size: 36px; font-weight: 700; }
        .st-gds-host [data-testid="stTable"] table { border-collapse: collapse; color: #0b0c0c; font-size: 19px; }
        .st-gds-host [data-testid="stTable"] th { border-bottom: 1px solid #0b0c0c; font-weight: 700; text-align: left; }
        .st-gds-host [data-testid="stTable"] td { border-bottom: 1px solid #b1b4b6; }
        .st-gds-host [data-testid="stDataFrame"], .st-gds-host [data-testid="stDataEditor"],
        .st-gds-host [data-testid*="Chart"], .st-gds-host [data-testid="stImage"],
        .st-gds-host [data-testid="stAudio"], .st-gds-host [data-testid="stVideo"],
        .st-gds-host [data-testid="stPdf"] { border: 1px solid #b1b4b6; border-radius: 0; background: #fff; }
        .st-gds-host [data-testid="stAlert"] { border: 0; border-left: 5px solid var(--st-gds-brand); border-radius: 0; background: #f3f2f1; color: #0b0c0c; }
        .st-gds-host [data-testid="stProgress"] > div > div { border-radius: 0; background: var(--st-gds-brand); }
        .st-gds-host [data-testid="stChatMessage"] { border-left: 5px solid #b1b4b6; border-radius: 0; background: #f3f2f1; padding: 15px; }
        .st-gds-host [data-testid="stChatInput"] textarea { border: 2px solid #0b0c0c; border-radius: 0; background: #fff; }
        .st-gds-host :disabled, .st-gds-host [aria-disabled="true"] { cursor: not-allowed; opacity: .55; }
        [class*="st-key-gds-width-one-quarter-"] { width: 25%; }
        [class*="st-key-gds-width-one-third-"] { width: 33.333%; }
        [class*="st-key-gds-width-one-half-"] { width: 50%; }
        [class*="st-key-gds-width-two-thirds-"] { width: 66.666%; }
        [class*="st-key-gds-width-three-quarters-"] { width: 75%; }
        @media(max-width: 640px) {
          .stMainBlockContainer { padding-left: 15px; padding-right: 15px; }
          [class*="st-key-gds-width-"] { width: 100%; }
          .st-gds-host .stApp h1 { font-size: 32px; }
          .st-gds-host .stApp h2 { font-size: 24px; }
          .st-gds-host .stApp h3 { font-size: 19px; }
          .st-gds-host .stApp p, .st-gds-host .stApp li { font-size: 16px; }
        }
        @media(forced-colors: active) {
          .st-gds-host [data-testid="stMetric"], .st-gds-host [data-testid="stAlert"],
          .st-gds-host [data-testid="stChatMessage"] { border: 2px solid CanvasText; }
          .st-gds-host .stApp a:focus-visible, .st-gds-host .stApp button:focus-visible,
          .st-gds-host .stApp input:focus-visible, .st-gds-host .stApp textarea:focus-visible,
          .st-gds-host .stApp select:focus-visible { outline: 3px solid Highlight !important; }
        }
        @media print {
          .st-gds-host [data-testid="stSidebar"], .st-gds-host [data-testid="stToolbar"] { display: none !important; }
          .st-gds-host [data-testid="stMetric"], .st-gds-host [data-testid="stAlert"] { border-color: #000; background: #fff; }
          .st-gds-host .stApp { color: #000; font-family: sans-serif; }
        }
      `;
      return;
    }
    case "space": {
      const a = s("span", "st-gds-space");
      a.style.height = `${Number(e.size ?? 4) * 5}px`, o.append(a);
      return;
    }
    case "heading": {
      const a = { xl: "govuk-heading-xl", l: "govuk-heading-l", m: "govuk-heading-m", s: "govuk-heading-s" }, l = s("h2", a[String(e.size)] ?? a.l);
      e.caption && l.append(s("span", "govuk-caption-l st-gds-heading-caption", e.caption)), l.append(document.createTextNode(String(e.text ?? ""))), o.append(l);
      return;
    }
    case "paragraph": {
      const a = s("p", e.lead ? "govuk-body-l" : "govuk-body");
      X(a, e.content), o.append(a);
      return;
    }
    case "link":
      o.append(z(e.label, e.href, "govuk-link", !!e.external));
      return;
    case "list": {
      const a = s(e.ordered ? "ol" : "ul", `govuk-list${e.ordered ? " govuk-list--number" : e.bullet ? " govuk-list--bullet" : ""}`);
      for (const l of e.items ?? []) a.append(s("li", void 0, l));
      o.append(a);
      return;
    }
    case "image": {
      const a = s("figure"), l = s("img", "govuk-image");
      l.src = he(e.src), l.alt = String(e.alt ?? ""), e.width && (l.width = Number(e.width)), a.append(l), e.caption && a.append(s("figcaption", "govuk-body-s", e.caption)), o.append(a);
      return;
    }
    case "section_break": {
      o.append(s("hr", Ea(Number(e.size ?? 3), !!e.visible)));
      return;
    }
    case "back_link":
      o.append(z(e.label, e.href, "govuk-back-link"));
      return;
    case "breadcrumbs": {
      const a = s("nav", `govuk-breadcrumbs${e.collapse_on_mobile ? " govuk-breadcrumbs--collapse-on-mobile" : ""}`);
      a.setAttribute("aria-label", "Breadcrumb");
      const l = s("ol", "govuk-breadcrumbs__list");
      for (const r of e.items ?? []) {
        const d = s("li", "govuk-breadcrumbs__list-item");
        r.href ? d.append(z(r.label, r.href, "govuk-breadcrumbs__link")) : d.append(document.createTextNode(r.label)), l.append(d);
      }
      a.append(l), o.append(a);
      return;
    }
    case "details": {
      const a = s("details", "govuk-details");
      a.open = !!e.open, a.append(s("summary", "govuk-details__summary", e.summary));
      const l = s("div", "govuk-details__text");
      X(l, e.content), a.append(l), o.append(a);
      return;
    }
    case "inset_text": {
      const a = s("div", "govuk-inset-text");
      X(a, e.content), o.append(a);
      return;
    }
    case "error_message": {
      const a = s("p", "govuk-error-message");
      a.append(s("span", "govuk-visually-hidden", "Error:"), document.createTextNode(` ${String(e.text)}`)), o.append(a);
      return;
    }
    case "error_summary": {
      const a = s("div", "govuk-error-summary");
      a.tabIndex = -1, a.setAttribute("role", "alert"), a.append(s("h2", "govuk-error-summary__title", e.title)), e.description && a.append(s("p", "govuk-body", e.description));
      const l = s("ul", "govuk-list govuk-error-summary__list");
      for (const r of e.errors ?? []) {
        const d = s("li");
        d.append(z(r.text, r.href)), l.append(d);
      }
      a.append(l), o.append(a), e.focus && queueMicrotask(() => a.focus());
      return;
    }
    case "fieldset": {
      const a = s("fieldset", "govuk-fieldset");
      a.append(s("legend", `govuk-fieldset__legend govuk-fieldset__legend--${String(e.heading_size)}`, e.legend));
      const l = s("div");
      X(l, e.content), a.append(l), o.append(a);
      return;
    }
    case "header": {
      const a = s("header", "st-gds-generic-header");
      a.style.setProperty("--st-gds-brand", String(e.brand_colour ?? "#1d70b8"));
      const l = s("div", "st-gds-generic-header__inner"), r = z(e.organisation, e.home_url, "st-gds-generic-header__organisation");
      l.append(r), e.service_name && l.append(s("span", "st-gds-generic-header__service", e.service_name));
      const d = e.navigation;
      if (d?.length) {
        const f = s("nav");
        f.setAttribute("aria-label", "Primary navigation");
        const g = s("ul", "st-gds-generic-header__nav");
        d.forEach((b) => {
          const m = s("li"), v = z(b.label, b.href);
          b.active && v.setAttribute("aria-current", "page"), m.append(v), g.append(m);
        }), f.append(g), l.append(f);
      }
      a.append(l), o.append(a);
      return;
    }
    case "footer": {
      const a = s("footer", "st-gds-neutral-footer"), l = s("div", "st-gds-neutral-footer__inner");
      e.organisation && l.append(s("h2", "govuk-heading-s", e.organisation)), e.text && l.append(s("p", "govuk-body-s", e.text));
      const r = e.links;
      if (r?.length) {
        const d = s("ul", "st-gds-neutral-footer__links");
        r.forEach((f) => {
          const g = s("li");
          g.append(z(f.label, f.href, "govuk-link", f.external)), d.append(g);
        }), l.append(d);
      }
      a.append(l), o.append(a);
      return;
    }
    case "notification_banner": {
      const a = s("div", `govuk-notification-banner${e.success ? " govuk-notification-banner--success" : ""}`);
      a.setAttribute("role", String(e.role ?? "region"));
      const l = s("div", "govuk-notification-banner__header");
      l.append(s("h2", "govuk-notification-banner__title", e.title)), a.append(l);
      const r = s("div", "govuk-notification-banner__content");
      X(r, e.content), a.append(r), o.append(a);
      return;
    }
    case "pagination": {
      const a = s("nav", "govuk-pagination");
      a.setAttribute("aria-label", "Pagination");
      const l = s("ul", "govuk-pagination__list"), r = (d, f) => {
        if (!d) return;
        const g = d, b = s("li", `govuk-pagination__${f}`);
        b.append(z(`${f === "prev" ? "← " : ""}${g.label}${f === "next" ? " →" : ""}`, g.href, "govuk-link govuk-pagination__link")), l.append(b);
      };
      r(e.previous, "prev");
      for (const d of e.items ?? []) {
        const f = s("li", `govuk-pagination__item${d.current ? " govuk-pagination__item--current" : ""}`), g = z(d.label, d.href, "govuk-link govuk-pagination__link");
        d.current && g.setAttribute("aria-current", "page"), f.append(g), l.append(f);
      }
      r(e.next, "next"), a.append(l), o.append(a);
      return;
    }
    case "phase_banner": {
      const a = s("div", "govuk-phase-banner"), l = s("p", "govuk-phase-banner__content");
      l.append(s("strong", "govuk-tag govuk-phase-banner__content__tag", e.phase));
      const r = s("span", "govuk-phase-banner__text");
      X(r, e.content), l.append(r), a.append(l), o.append(a);
      return;
    }
    case "service_navigation": {
      const a = s("nav", "govuk-service-navigation");
      a.setAttribute("aria-label", "Service information");
      const l = s("div", "govuk-width-container");
      e.service_name && l.append(z(e.service_name, e.service_url, "govuk-service-navigation__service-name"));
      const r = s("ul", "govuk-service-navigation__list");
      for (const d of e.items ?? []) {
        const f = s("li", `govuk-service-navigation__item${d.active ? " govuk-service-navigation__item--active" : ""}`), g = z(d.label, d.href, "govuk-service-navigation__link");
        d.active && g.setAttribute("aria-current", "page"), f.append(g), r.append(f);
      }
      l.append(r), a.append(l), o.append(a);
      return;
    }
    case "skip_link":
      o.append(z(e.label, e.href, "govuk-skip-link"));
      return;
    case "panel": {
      const a = e.variant === "interruption", l = s("div", a ? "st-gds-panel--interruption" : "govuk-panel govuk-panel--confirmation");
      if (l.append(s("h1", a ? "govuk-heading-xl" : "govuk-panel__title", e.title)), e.content) {
        const r = s("div", a ? "govuk-body-l" : "govuk-panel__body");
        X(r, e.content), l.append(r);
      }
      o.append(l);
      return;
    }
    case "kpi_card": {
      const a = e.rag_status ? String(e.rag_status) : null, l = a ? ` st-gds-kpi-card--rag st-gds-kpi-card--rag-${a}` : "", r = s("section", `st-gds-kpi-card${l}`);
      if (r.setAttribute("aria-label", String(e.label)), r.append(s("h3", "st-gds-kpi-card__label", e.label)), a) {
        const d = {
          red: "Red status",
          amber: "Amber status",
          green: "Green status"
        }, f = s("p", "st-gds-kpi-card__status"), g = s("span", "st-gds-kpi-card__status-marker");
        g.setAttribute("aria-hidden", "true"), f.append(g, document.createTextNode(d[a] ?? `${a} status`)), r.append(f);
      }
      if (r.append(s("p", "st-gds-kpi-card__value", e.value)), e.change !== void 0 && e.change !== null) {
        const d = String(e.trend ?? "neutral"), f = s("p", `st-gds-kpi-card__change st-gds-kpi-card__change--${d}`), g = {
          up: { arrow: "↑", label: "Increased by" },
          down: { arrow: "↓", label: "Decreased by" },
          neutral: { arrow: "", label: "Change:" }
        }, b = g[d] ?? g.neutral;
        if (b.arrow) {
          const m = s("span", "st-gds-kpi-card__arrow", b.arrow);
          m.setAttribute("aria-hidden", "true"), f.append(m);
        }
        f.append(s("span", "govuk-visually-hidden", `${b.label} `)), f.append(s("strong", "st-gds-kpi-card__change-value", e.change)), e.comparison && (f.append(document.createTextNode(" ")), f.append(s("span", "st-gds-kpi-card__comparison", e.comparison))), r.append(f);
      }
      e.supporting_text && r.append(s("p", "st-gds-kpi-card__supporting", e.supporting_text)), o.append(r);
      return;
    }
    case "summary_list": {
      const a = e.card_title ? s("div", "govuk-summary-card") : o;
      if (e.card_title) {
        const r = s("div", "govuk-summary-card__title-wrapper");
        r.append(s("h2", "govuk-summary-card__title", e.card_title)), a.append(r);
      }
      const l = s("dl", `govuk-summary-list${e.card_title ? " govuk-summary-card__content" : ""}`);
      for (const r of e.rows ?? []) {
        const d = s("div", "govuk-summary-list__row");
        d.append(s("dt", "govuk-summary-list__key", r.key));
        const f = s("dd", "govuk-summary-list__value");
        if (X(f, r.value), d.append(f), r.actions?.length) {
          const g = s("dd", "govuk-summary-list__actions");
          r.actions.forEach((b, m) => {
            m && g.append(document.createTextNode(" "));
            const v = z(b.label, b.href);
            b.visually_hidden_text && v.append(s("span", "govuk-visually-hidden", ` ${b.visually_hidden_text}`)), g.append(v);
          }), d.append(g);
        }
        l.append(d);
      }
      a.append(l), a !== o && o.append(a);
      return;
    }
    case "table": {
      const a = s("table", `govuk-table${e.responsive ? " st-gds-table-responsive" : ""}`);
      e.caption && a.append(s("caption", "govuk-table__caption govuk-table__caption--m", e.caption));
      const l = e.columns, r = s("thead", "govuk-table__head"), d = s("tr", "govuk-table__row");
      l.forEach((g) => d.append(s("th", `govuk-table__header${g.numeric ? " govuk-table__header--numeric" : ""}`, g.heading))), r.append(d), a.append(r);
      const f = s("tbody", "govuk-table__body");
      for (const g of e.rows) {
        const b = s("tr", "govuk-table__row");
        l.forEach((m, v) => {
          const k = s(v === 0 ? "th" : "td", `${v === 0 ? "govuk-table__header" : "govuk-table__cell"}${m.numeric ? ` ${v === 0 ? "govuk-table__header" : "govuk-table__cell"}--numeric` : ""}`, g[m.key]);
          k.setAttribute("data-label", m.heading), v === 0 && k.setAttribute("scope", "row"), b.append(k);
        }), f.append(b);
      }
      a.append(f), o.append(a);
      return;
    }
    case "tag":
      o.append(s("strong", `govuk-tag govuk-tag--${String(e.colour)}`, e.text));
      return;
    case "task_list": {
      e.title && o.append(s("h2", "govuk-heading-m", e.title));
      const a = s("ol", "st-gds-task-list"), l = { not_started: "Not started", in_progress: "In progress", completed: "Completed", cannot_start: "Cannot start yet", optional: "Optional" };
      for (const r of e.items ?? []) {
        const d = s("li", "st-gds-task-list__item"), f = s("div", "st-gds-task-list__row");
        f.append(r.href ? z(r.title, r.href) : s("span", void 0, r.title));
        const g = r.status === "completed" ? "green" : r.status === "in_progress" ? "blue" : "grey";
        f.append(s("strong", `govuk-tag govuk-tag--${g}`, l[r.status] ?? r.status)), d.append(f), r.hint && d.append(s("p", "st-gds-task-list__hint", r.hint)), a.append(d);
      }
      o.append(a);
      return;
    }
    case "warning_text": {
      const a = s("div", "govuk-warning-text");
      a.append(s("span", "govuk-warning-text__icon", "!"));
      const l = s("strong", "govuk-warning-text__text");
      l.append(s("span", "govuk-visually-hidden", `${String(e.icon_fallback)}:`), document.createTextNode(` ${String(e.text)}`)), a.append(l), o.append(a);
      return;
    }
    case "cookie_banner": {
      if (e.hidden) return;
      const a = s("div", "govuk-cookie-banner");
      a.setAttribute("role", "region");
      const l = s("div", "govuk-cookie-banner__message govuk-width-container");
      l.append(s("h2", "govuk-cookie-banner__heading govuk-heading-m", e.title));
      const r = s("div", "govuk-cookie-banner__content");
      X(r, e.content), l.append(r);
      const d = s("div", "govuk-button-group");
      for (const f of e.actions ?? [])
        if (f.kind === "link") d.append(z(f.label, f.href, "govuk-link"));
        else {
          const g = s("button", "govuk-button", f.label);
          g.type = "button", g.addEventListener("click", () => c.setTriggerValue("action", f.value)), d.append(g);
        }
      l.append(d), a.append(l), o.append(a);
      return;
    }
    case "exit_this_page": {
      const a = z(e.label, e.href, "govuk-exit-this-page__button govuk-button govuk-button--warning"), l = (r) => {
        r.key === "Escape" && (c.setTriggerValue("exited", !0), window.location.assign(he(e.href)));
      };
      return a.addEventListener("click", () => c.setTriggerValue("exited", !0)), document.addEventListener("keydown", l), o.append(a), () => document.removeEventListener("keydown", l);
    }
  }
}
const Ma = (o) => {
  const n = o.data, e = o.parentElement.querySelector(".st-gds-root");
  if (!e) return;
  const c = document.activeElement, a = c && e.contains(c) ? c.id : null, l = a && c && fn(c) ? [c.selectionStart, c.selectionEnd] : null;
  e.replaceChildren();
  const r = n.props ?? {};
  let d;
  switch (n.component) {
    case "button":
      Oa(e, r, o);
      break;
    case "download_button":
      Ra(e, r, o);
      break;
    case "text_input":
      sn(e, r, o);
      break;
    case "password_input":
      sn(e, r, o, !0);
      break;
    case "textarea":
      rn(e, r, o);
      break;
    case "character_count":
      rn(e, r, o, !0);
      break;
    case "select":
      xa(e, r, o);
      break;
    case "radios":
      ln(e, r, o, !1);
      break;
    case "checkboxes":
      ln(e, r, o, !0);
      break;
    case "date_input":
      wa(e, r, o);
      break;
    case "file_upload":
      Na(e, r, o);
      break;
    case "accordion":
      Ia(e, r, o);
      break;
    case "tabs":
      Da(e, r, o);
      break;
    case "chatbot":
      Sa(e, r, o);
      break;
    default:
      d = Ca(e, n.component, r, o);
  }
  return Aa(e, a, l), d;
};
export {
  X as appendContent,
  Ma as default,
  La as downloadBody,
  Aa as restoreFocus,
  he as safeHref,
  Ea as sectionBreakClasses
};

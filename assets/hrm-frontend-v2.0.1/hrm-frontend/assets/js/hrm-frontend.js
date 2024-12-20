!(function (t) {
    var e = {};
    function n(r) {
        if (e[r]) return e[r].exports;
        var s = (e[r] = { i: r, l: !1, exports: {} });
        return t[r].call(s.exports, s, s.exports, n), (s.l = !0), s.exports;
    }
    (n.m = t),
        (n.c = e),
        (n.i = function (t) {
            return t;
        }),
        (n.d = function (t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, { configurable: !1, enumerable: !0, get: r });
        }),
        (n.n = function (t) {
            var e =
                t && t.__esModule
                    ? function () {
                          return t.default;
                      }
                    : function () {
                          return t;
                      };
            return n.d(e, "a", e), e;
        }),
        (n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }),
        (n.p = ""),
        n((n.s = 9));
})([
    function (t, e) {
        t.exports = function (t, e, n, r, s, a) {
            var i,
                o = (t = t || {}),
                u = typeof t.default;
            ("object" !== u && "function" !== u) || ((i = t), (o = t.default));
            var l,
                c = "function" == typeof o ? o.options : o;
            if (
                (e && ((c.render = e.render), (c.staticRenderFns = e.staticRenderFns), (c._compiled = !0)),
                n && (c.functional = !0),
                s && (c._scopeId = s),
                a
                    ? ((l = function (t) {
                          (t = t || (this.$vnode && this.$vnode.ssrContext) || (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext)) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__),
                              r && r.call(this, t),
                              t && t._registeredComponents && t._registeredComponents.add(a);
                      }),
                      (c._ssrRegister = l))
                    : r && (l = r),
                l)
            ) {
                var d = c.functional,
                    p = d ? c.render : c.beforeCreate;
                d
                    ? ((c._injectStyles = l),
                      (c.render = function (t, e) {
                          return l.call(e), p(t, e);
                      }))
                    : (c.beforeCreate = p ? [].concat(p, l) : [l]);
            }
            return { esModule: i, exports: o, options: c };
        };
    },
    function (t, e) {
        HRM_Store.push({
            name: "hrmFront",
            store: {
                state: { pages: [], wpPages: [] },
                mutations: {
                    changePage: function (t, e) {
                        t.pages[e.index].value = e.selectd_id;
                    },
                    setWpPages: function (t, e) {
                        t.wpPages = e;
                    },
                    setPages: function (t, e) {
                        t.pages = e;
                    },
                },
            },
        });
    },
    function (t, e, n) {
        "use strict";
        var r = n(13);
        e.a = {
            created: function () {
                console.log("asdflajksdh"), this.registerModule();
            },
            components: { "frontend-menu": r.a },
            methods: {
                registerModule: function () {
                    var t = n(1);
                    this.registerStore("hrmFront", t.default);
                },
            },
        };
    },
    function (t, e, n) {
        "use strict";
        e.a = {
            data: function () {
                return { mishu: "" };
            },
            mixins: [HRMProMixin.hrmFront],
            components: { "hrm-multiselect": hrm.Multiselect.Multiselect },
            computed: {
                pages: function () {
                    return this.$store.state.hrmFront.pages;
                },
                wpPages: function () {
                    return this.$store.state.hrmFront.wpPages;
                },
            },
            created: function () {
                console.log("alsdjhfakjsd"), this.getPages(), this.getWPpages();
            },
            methods: {
                savePages: function () {
                    var t = { data: { pages: this.$store.state.hrmFront.pages }, success: function (t) {} };
                    this.httpRequest("save_page_settings", t);
                },
                updateValueAction: function (t, e) {
                    var n = this.getIndex(this.pages, t.value, "value");
                    !1 !== n && ((this.pages[n].value = e.ID), this.$store.commit("hrmFront/changePage", { selectd_id: e.ID, index: n }));
                },
                getSelectedPage: function (t) {
                    var e = this.getIndex(this.wpPages, t.value, "ID");
                    return !1 !== e ? this.wpPages[e] : "";
                },
            },
        };
    },
    function (t, e, n) {
        "use strict";
        e.a = {
            data: function () {
                return { menus: HRMGetRegisterChildrenRoute("hrm_root") };
            },
            created: function () {
                return (
                    (this.menus = _.sortBy(this.menus, function (t) {
                        if (void 0 !== t.meta) return t.meta.order;
                    })),
                    this.menus
                );
            },
            methods: {
                checkPermission: function (t) {
                    return !(void 0 === t.meta || !t.meta.label);
                },
                hasChildren: function (t) {
                    return !(void 0 === t.children || !t.children.length);
                },
                getUrl: function (t) {
                    return { name: t.name, params: "function" == typeof t.meta.params ? t.meta.params(this) : {} };
                },
            },
        };
    },
    function (t, e) {},
    function (t, e) {
        HRMProMixin.hrmFront = {
            methods: {
                getPages: function () {
                    var t = this,
                        e = {
                            data: {},
                            success: function (e) {
                                t.$store.commit("hrmFront/setPages", e);
                            },
                        };
                    this.httpRequest("get_pages", e);
                },
                getWPpages: function () {
                    var t = this,
                        e = {
                            data: {},
                            success: function (e) {
                                t.$store.commit("hrmFront/setWpPages", e);
                            },
                        };
                    this.httpRequest("get_wp_pages", e);
                },
            },
        };
    },
    function (t, e, n) {
        "use strict";
        var r = n(12);
        HRMRegisterChildrenRoute("hrm_setting", [{ path: "pages", component: r.a, name: "frontend_page_settings", meta: { label: "Pages" } }]);
    },
    function (t, e, n) {
        "use strict";
        var r = n(2),
            s = n(14),
            a = n(0)(r.a, s.a, !1, null, null, null);
        e.a = a.exports;
    },
    function (t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = n(1),
            s = (n.n(r), n(7), n(5)),
            a = (n.n(s), n(6)),
            i = (n.n(a), n(8));
        (n.p = HRM_Frontend_Vars.dir_url + "assets/js/"), HRM_Components.push({ component: "frontend-root", hook: "hrm-before-router-view", property: i.a });
    },
    function (t, e, n) {
        (t.exports = n(11)(void 0)).push([
            t.i,
            '.menu-wrap{position:relative}.menu-wrap nav.vertical{display:none}.menu:before{content:"\\2630";font-size:30px;color:#666}.menu-wrap:hover nav.vertical{display:block}nav.vertical{position:absolute;width:200px;z-index:999}nav.vertical ul{list-style:none}nav.vertical li{position:relative;border:none;box-shadow:none}nav.vertical a{display:block;color:#222;text-decoration:none;padding:10px 15px;background:#e4e4e4;transition:.2s;box-shadow:none;border:none}nav.vertical li:hover>a{background:#d2d2d2}nav.vertical ul ul{position:absolute;left:0;top:0;width:100%;visibility:hidden;opacity:0;transition:transform .2s;transform:translateX(50px)}nav.vertical li:hover>ul{left:88%;visibility:visible;opacity:1;transform:translateX(0)}',
            "",
        ]);
    },
    function (t, e) {
        t.exports = function (t) {
            var e = [];
            return (
                (e.toString = function () {
                    return this.map(function (e) {
                        var n = (function (t, e) {
                            var n = t[1] || "",
                                r = t[3];
                            if (!r) return n;
                            if (e && "function" == typeof btoa) {
                                var s = ((i = r), "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */"),
                                    a = r.sources.map(function (t) {
                                        return "/*# sourceURL=" + r.sourceRoot + t + " */";
                                    });
                                return [n].concat(a).concat([s]).join("\n");
                            }
                            var i;
                            return [n].join("\n");
                        })(e, t);
                        return e[2] ? "@media " + e[2] + "{" + n + "}" : n;
                    }).join("");
                }),
                (e.i = function (t, n) {
                    "string" == typeof t && (t = [[null, t, ""]]);
                    for (var r = {}, s = 0; s < this.length; s++) {
                        var a = this[s][0];
                        "number" == typeof a && (r[a] = !0);
                    }
                    for (s = 0; s < t.length; s++) {
                        var i = t[s];
                        ("number" == typeof i[0] && r[i[0]]) || (n && !i[2] ? (i[2] = n) : n && (i[2] = "(" + i[2] + ") and (" + n + ")"), e.push(i));
                    }
                }),
                e
            );
        };
    },
    function (t, e, n) {
        "use strict";
        var r = n(3),
            s = n(16),
            a = n(0)(r.a, s.a, !1, null, null, null);
        e.a = a.exports;
    },
    function (t, e, n) {
        "use strict";
        var r = n(4),
            s = n(15);
        var a = function (t) {
                n(17);
            },
            i = n(0)(r.a, s.a, !1, a, null, null);
        e.a = i.exports;
    },
    function (t, e, n) {
        "use strict";
        var r = {
            render: function () {
                var t = this.$createElement;
                return (this._self._c || t)("frontend-menu");
            },
            staticRenderFns: [],
        };
        e.a = r;
    },
    function (t, e, n) {
        "use strict";
        var r = {
            render: function () {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", { staticClass: "menu-wrap" }, [
                    n("div", { staticClass: "menu" }),
                    t._v(" "),
                    n("nav", { staticClass: "vertical" }, [
                        n(
                            "ul",
                            { staticClass: "menu-ul parent-ul" },
                            t._l(t.menus, function (e) {
                                return t.checkPermission(e)
                                    ? n(
                                          "li",
                                          { staticClass: "menu-li parent-li" },
                                          [
                                              n("router-link", { attrs: { to: t.getUrl(e) } }, [t._v("\n\t\t\t\t\t" + t._s(e.meta.label) + "\n\t\t\t\t")]),
                                              t._v(" "),
                                              t.hasChildren(e)
                                                  ? n(
                                                        "ul",
                                                        { staticClass: "menu-ul" },
                                                        t._l(e.children, function (e) {
                                                            return t.checkPermission(e)
                                                                ? n(
                                                                      "li",
                                                                      { staticClass: "menu-li" },
                                                                      [
                                                                          n("router-link", { attrs: { to: t.getUrl(e) } }, [t._v("\n\t\t\t\t\t\t\t" + t._s(e.meta.label) + "\n\t\t\t\t\t\t")]),
                                                                          t._v(" "),
                                                                          t.hasChildren(e)
                                                                              ? n(
                                                                                    "ul",
                                                                                    { staticClass: "menu-ul" },
                                                                                    t._l(e.children, function (e) {
                                                                                        return t.checkPermission(e)
                                                                                            ? n(
                                                                                                  "li",
                                                                                                  { staticClass: "menu-li" },
                                                                                                  [n("router-link", { attrs: { to: t.getUrl(e) } }, [t._v("\n\t\t\t\t\t\t\t\t\t\t" + t._s(e.meta.label) + "\n\t\t\t\t\t\t\t\t\t")])],
                                                                                                  1
                                                                                              )
                                                                                            : t._e();
                                                                                    })
                                                                                )
                                                                              : t._e(),
                                                                      ],
                                                                      1
                                                                  )
                                                                : t._e();
                                                        })
                                                    )
                                                  : t._e(),
                                          ],
                                          1
                                      )
                                    : t._e();
                            })
                        ),
                    ]),
                ]);
            },
            staticRenderFns: [],
        };
        e.a = r;
    },
    function (t, e, n) {
        "use strict";
        var r = {
            render: function () {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n(
                    "div",
                    [
                        n("hrm-settings-header"),
                        t._v(" "),
                        n("div", { staticClass: "metabox-holder" }, [
                            n("div", { staticClass: "group", attrs: { id: "pm_general" } }, [
                                n(
                                    "form",
                                    {
                                        attrs: { method: "post", action: "" },
                                        on: {
                                            submit: function (e) {
                                                e.preventDefault(), t.savePages();
                                            },
                                        },
                                    },
                                    [
                                        n("h2", [t._v("General")]),
                                        t._v(" "),
                                        n("table", { staticClass: "form-table" }, [
                                            n(
                                                "tbody",
                                                t._l(t.pages, function (e, r) {
                                                    return n("tr", { key: r }, [
                                                        n("th", { attrs: { scope: "row" } }, [n("label", { attrs: { for: "" } }, [t._v(t._s(e.title))])]),
                                                        t._v(" "),
                                                        n(
                                                            "td",
                                                            [
                                                                n("hrm-multiselect", {
                                                                    attrs: {
                                                                        value: t.getSelectedPage(e),
                                                                        options: t.wpPages,
                                                                        multiple: !1,
                                                                        "close-on-select": !0,
                                                                        "clear-on-select": !0,
                                                                        "hide-selected": !1,
                                                                        "show-labels": !0,
                                                                        placeholder: "Select leave type",
                                                                        "select-label": "",
                                                                        "selected-label": "selected",
                                                                        "deselect-label": "",
                                                                        taggable: !1,
                                                                        label: "post_title",
                                                                        "track-by": "ID",
                                                                        id: "ID",
                                                                        "allow-empty": !1,
                                                                    },
                                                                    on: {
                                                                        input: function (n) {
                                                                            t.updateValueAction(e, n);
                                                                        },
                                                                    },
                                                                }),
                                                            ],
                                                            1
                                                        ),
                                                    ]);
                                                })
                                            ),
                                        ]),
                                        t._v(" "),
                                        t._m(0),
                                    ]
                                ),
                            ]),
                        ]),
                    ],
                    1
                );
            },
            staticRenderFns: [
                function () {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("div", { staticStyle: { "padding-left": "10px" } }, [
                        e("p", { staticClass: "submit" }, [
                            e("input", { staticClass: "button button-primary", attrs: { type: "submit", name: "submit", id: "submit", value: "Save Settings" } }),
                            this._v(" "),
                            e("span", { staticClass: "pm-spinner" }),
                        ]),
                    ]);
                },
            ],
        };
        e.a = r;
    },
    function (t, e, n) {
        var r = n(10);
        "string" == typeof r && (r = [[t.i, r, ""]]), r.locals && (t.exports = r.locals);
        n(18)("205696c8", r, !0);
    },
    function (t, e, n) {
        var r = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !r) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var s = n(19),
            a = {},
            i = r && (document.head || document.getElementsByTagName("head")[0]),
            o = null,
            u = 0,
            l = !1,
            c = function () {},
            d = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
        function p(t) {
            for (var e = 0; e < t.length; e++) {
                var n = t[e],
                    r = a[n.id];
                if (r) {
                    r.refs++;
                    for (var s = 0; s < r.parts.length; s++) r.parts[s](n.parts[s]);
                    for (; s < n.parts.length; s++) r.parts.push(h(n.parts[s]));
                    r.parts.length > n.parts.length && (r.parts.length = n.parts.length);
                } else {
                    var i = [];
                    for (s = 0; s < n.parts.length; s++) i.push(h(n.parts[s]));
                    a[n.id] = { id: n.id, refs: 1, parts: i };
                }
            }
        }
        function f() {
            var t = document.createElement("style");
            return (t.type = "text/css"), i.appendChild(t), t;
        }
        function h(t) {
            var e,
                n,
                r = document.querySelector('style[data-vue-ssr-id~="' + t.id + '"]');
            if (r) {
                if (l) return c;
                r.parentNode.removeChild(r);
            }
            if (d) {
                var s = u++;
                (r = o || (o = f())), (e = g.bind(null, r, s, !1)), (n = g.bind(null, r, s, !0));
            } else
                (r = f()),
                    (e = function (t, e) {
                        var n = e.css,
                            r = e.media,
                            s = e.sourceMap;
                        r && t.setAttribute("media", r);
                        s && ((n += "\n/*# sourceURL=" + s.sources[0] + " */"), (n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(s)))) + " */"));
                        if (t.styleSheet) t.styleSheet.cssText = n;
                        else {
                            for (; t.firstChild; ) t.removeChild(t.firstChild);
                            t.appendChild(document.createTextNode(n));
                        }
                    }.bind(null, r)),
                    (n = function () {
                        r.parentNode.removeChild(r);
                    });
            return (
                e(t),
                function (r) {
                    if (r) {
                        if (r.css === t.css && r.media === t.media && r.sourceMap === t.sourceMap) return;
                        e((t = r));
                    } else n();
                }
            );
        }
        t.exports = function (t, e, n) {
            l = n;
            var r = s(t, e);
            return (
                p(r),
                function (e) {
                    for (var n = [], i = 0; i < r.length; i++) {
                        var o = r[i];
                        (u = a[o.id]).refs--, n.push(u);
                    }
                    e ? p((r = s(t, e))) : (r = []);
                    for (i = 0; i < n.length; i++) {
                        var u;
                        if (0 === (u = n[i]).refs) {
                            for (var l = 0; l < u.parts.length; l++) u.parts[l]();
                            delete a[u.id];
                        }
                    }
                }
            );
        };
        var v,
            m =
                ((v = []),
                function (t, e) {
                    return (v[t] = e), v.filter(Boolean).join("\n");
                });
        function g(t, e, n, r) {
            var s = n ? "" : r.css;
            if (t.styleSheet) t.styleSheet.cssText = m(e, s);
            else {
                var a = document.createTextNode(s),
                    i = t.childNodes;
                i[e] && t.removeChild(i[e]), i.length ? t.insertBefore(a, i[e]) : t.appendChild(a);
            }
        }
    },
    function (t, e) {
        t.exports = function (t, e) {
            for (var n = [], r = {}, s = 0; s < e.length; s++) {
                var a = e[s],
                    i = a[0],
                    o = { id: t + ":" + s, css: a[1], media: a[2], sourceMap: a[3] };
                r[i] ? r[i].parts.push(o) : n.push((r[i] = { id: i, parts: [o] }));
            }
            return n;
        };
    },
]);

var loadModules = function (e, n, o) {
    function t() {
        try {
            if ("object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate) {
                const e = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
                if (e instanceof WebAssembly.Module) return new WebAssembly.Instance(e) instanceof WebAssembly.Instance
            }
        } catch (e) {}
        return !1
    }

    function l(e, n) {
        var o = document.createElement("script");
        o.onload = function () {
            n()
        }, o.onerror = function () {
            throw new Error("failed to load " + e)
        }, o.async = !0, o.src = e, o.crossOrigin = "anonymous", document.head.appendChild(o)
    }

    function r(e, n, o, t) {
        l(n, function () {
            var n = window[e];
            window[e + "Lib"] = n, n({
                locateFile: function () {
                    return o
                }
            }).then(function (n) {
                window[e] = n, t()
            })
        })
    }
    if (void 0 === e || 0 === e.length) setTimeout(o);
    else {
        var a = e.length,
            i = function () {
                a--, 0 === a && o()
            },
            s = t();
        e.forEach(function (e) {
            if (!e.hasOwnProperty("preload") || e.preload)
                if (s) r(e.moduleName, n + e.glueUrl, n + e.wasmUrl, i);
                else {
                    if (!e.fallbackUrl) throw new Error("wasm not supported and no fallback supplied for module " + e.moduleName);
                    r(e.moduleName, n + e.fallbackUrl, "", i)
                }
            else i()
        })
    }
};
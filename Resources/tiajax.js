(function() {
    var ajaxHandlerBindings, jsre, r20, rquery, rts, rurl, utils, _fn, _i, _len, _ref;
    var __hasProp = Object.prototype.hasOwnProperty;
    jsre = /=\?(&|$)/;
    rquery = /\?/;
    rts = /(\?|&)_=.*?(&|$)/;
    rurl = /^(\w+:)?\/\/([^\/?#]+)/;
    r20 = /%20/g;
    ("undefined" == typeof utils || null === utils) && (utils = {
        extend: function(obj) {
            var key, source, val, _i, _len, _ref;
            _ref = Array.prototype.slice.call(arguments, 1);
            for (_i = 0, _len = _ref.length; _len > _i; _i++) {
                source = _ref[_i];
                for (key in source) {
                    if (!__hasProp.call(source, key)) continue;
                    val = source[key];
                    obj[key] = val;
                }
            }
            return obj;
        }
    });
    ajaxHandlerBindings = {};
    _ref = "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" ");
    _fn = function(name) {
        return ajaxHandlerBindings[name] = function(f) {
            return Titanium.Network.addEventListener(name, function(e) {
                return f.call(e, e.xhr, e.s, e.e);
            });
        };
    };
    for (_i = 0, _len = _ref.length; _len > _i; _i++) {
        name = _ref[_i];
        _fn(name);
    }
    utils.extend(Titanium.Network, ajaxHandlerBindings, {
        ajaxSetup: function(settings) {
            return utils.extend(Titanium.Network.ajaxSettings, settings);
        },
        ajaxSettings: {
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            timeout: 3e5,
            traditional: false,
            xhr: function() {
                return Ti.Network.createHTTPClient();
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        param: function(a) {
            var add, buildParams, obj, prefix, s, traditional;
            s = [];
            traditional = false;
            buildParams = function(prefix, obj) {
                return _.isArray(obj) ? _.each(obj, function(i, v) {
                    var p, x;
                    if (traditional || /\[\]$/.test(prefix)) return add(prefix, v);
                    x = _.isObject(v) || _.isArray(v) ? i : "";
                    p = prefix + "[" + x + "]";
                    return buildParams(p, v);
                }) : traditional || _.isNull(obj) || "object" != typeof obj ? add(prefix, obj) : _.each(obj, function(k, v) {
                    return buildParams(prefix + "[" + k + "]", v);
                });
            };
            add = function(key, value) {
                value = _.isFunction(value) ? value() : value;
                return s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };
            if (_.isArray(a)) _.each(a, function() {
                return add(this.name, this.value);
            }); else for (prefix in a) {
                if (!__hasProp.call(a, prefix)) continue;
                obj = a[prefix];
                buildParams(prefix, obj);
            }
            return s.join("&").replace(r20, "+");
        },
        lastModified: {},
        etag: {},
        httpSuccess: function(xhr) {
            try {
                return xhr.status >= 200 && 300 > xhr.status || 304 === xhr.status;
            } catch (e) {}
            return false;
        },
        httpNotModified: function(xhr, url) {
            var etag, lastModified;
            lastModified = xhr.getResponseHeader("Last-Modified");
            etag = xhr.getResponseHeader("Etag");
            lastModified && (Titanium.Network.lastModified[url] = lastModified);
            etag && (Titanium.Network.etag[url] = etag);
            return 304 === xhr.status || 0 === xhr.status;
        },
        httpData: function(xhr, type, s) {
            var ct, data, xml;
            ct = xhr.getResponseHeader("content-type") || "";
            xml = "xml" === type || !type && ct.indexOf("xml") >= 0;
            data = xml ? xhr.responseXML : xhr.responseText;
            xml && "parsererror" === data.documentElement.nodeName && Titanium.Network.error("parsererror");
            null != s && s.dataFilter && (data = s.dataFilter(data, type));
            "string" == typeof data && ("json" === type || !type && ct.indexOf("json") >= 0) && (data = JSON.parse(data));
            return data;
        },
        error: function(msg) {
            throw msg;
        },
        handleError: function(s, xhr, status, e) {
            s.error && s.error.call(s.context || s, xhr, status, e);
            if (s.global) return Titanium.Network.fireEvent("ajaxError", {
                xhr: xhr,
                s: s,
                e: e
            });
        },
        ajax: function(origSettings) {
            var callbackContext, complete, data, oldAbort, onreadystatechange, parts, remote, requestDone, ret, s, status, success, trigger, ts, type, xhr, _ref;
            s = utils.extend({}, Titanium.Network.ajaxSettings, origSettings);
            status = "";
            data = {};
            callbackContext = origSettings && origSettings.context || s;
            type = s.type.toUpperCase();
            s.data && s.processData && "string" != typeof s.data && (s.data = Titanium.Network.param(s.data, s.traditional));
            if (false === s.cache && "GET" === type) {
                ts = new Date().getTime();
                ret = s.url.replace(rts, "$1_=" + ts + "$2");
                s.url = ret + (ret === s.url ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
            }
            s.data && "GET" === type && (s.url += (null != (_ref = rquery.test(s.url)) ? _ref : {
                "&": "?"
            }) + s.data);
            parts = rurl.exec(s.url);
            remote = true;
            requestDone = false;
            xhr = s.xhr();
            if (!xhr) return;
            Ti.API.debug("Sending " + type + " request to " + s.url);
            if ("POST" === type) {
                Ti.API.debug("POSTing data:");
                Ti.API.debug(s.data);
            }
            null != s.username ? xhr.open(type, s.url, s.async, s.username, s.password) : xhr.open(type, s.url, s.async);
            (s.data || origSettings && origSettings.contentType) && xhr.setRequestHeader("Content-Type", s.contentType);
            if (s.ifModified) {
                Titanium.Network.lastModified[s.url] && xhr.setRequestHeader("If-Modified-Since", Titanium.Network.lastModified[s.url]);
                Titanium.Network.etag[s.url] && xhr.setRequestHeader("If-None-Match", Titanium.Network.etag[s.url]);
            }
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.setRequestHeader("Accept", s.dataType && s.accepts[s.dataType] ? s.accepts[s.dataType] + ", */*" : s.accepts._default);
            if (s.beforeSend && false === s.beforeSend.call(callbackContext, xhr, s)) {
                xhr.abort();
                return false;
            }
            onreadystatechange = xhr.onreadystatechange = function(isTimeout) {
                var errMsg;
                if (xhr && 0 !== xhr.readyState && "abort" !== isTimeout) {
                    if (!requestDone && xhr && (4 === xhr.readyState || "timeout" === isTimeout)) {
                        requestDone = true;
                        xhr.onreadystatechange = function() {};
                        status = "timeout" === isTimeout ? "timeout" : Titanium.Network.httpSuccess(xhr) ? s.ifModified && Titanium.Network.httpNotModified(xhr, s.url) ? "notmodified" : "success" : "error";
                        errMsg = "";
                        if ("success" === status) try {
                            data = Titanium.Network.httpData(xhr, s.dataType, s);
                        } catch (err) {
                            status = "parsererror";
                            errMsg = err;
                        }
                        "success" === status || "notmodified" === status ? success() : Titanium.Network.handleError(s, xhr, status, errMsg);
                        complete();
                        "timeout" === isTimeout && xhr.abort();
                        if (s.async) return xhr = null;
                    }
                } else {
                    requestDone || complete();
                    requestDone = true;
                    if (xhr) return xhr.onreadystatechange = function() {};
                }
            };
            try {
                oldAbort = xhr.abort;
                xhr.abort = function() {
                    xhr && oldAbort.call(xhr);
                    return onreadystatechange("abort");
                };
            } catch (e) {}
            s.async && s.timeout > 0 && setTimeout(function() {
                if (xhr && !requestDone) return onreadystatechange("timeout");
            }, s.timeout);
            try {
                xhr.send("POST" === type || "PUT" === type || "DELETE" === type ? s.data : null);
            } catch (e) {
                Titanium.Network.handleError(s, xhr, null, e);
                complete();
            }
            trigger = function(type, arg) {
                var obj;
                obj = s.context ? s.context : Titanium.Network;
                if (null != (null != obj ? obj.fireEvent : void 0)) return obj.fireEvent(type, arg);
            };
            success = function() {
                s.success && s.success.call(callbackContext, data, status, xhr);
                if (s.global) return trigger("ajaxSuccess", {
                    xhr: xhr,
                    s: s
                });
            };
            complete = function() {
                s.complete && s.complete.call(callbackContext, xhr, status);
                s.global && trigger("ajaxComplete", {
                    xhr: xhr,
                    s: s
                });
                if (s.global && !--jQuery.active) return Titanium.Network.fireEvent("ajaxStop");
            };
            return xhr;
        }
    });
    Titanium.ajax = Titanium.Network.ajax;
}).call(this);
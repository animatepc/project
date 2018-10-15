(function() {
//	alert(1)
	function s(d, e, n) {
		function t(o, i) {
			if(!e[o]) {
				if(!d[o]) {
					var l = "function" == typeof require && require;
					if(!i && l) return l(o, !0);
					if(r) return r(o, !0);
					var c = new Error("Cannot find module '" + o + "'");
					throw c.code = "MODULE_NOT_FOUND", c
				}
				var a = e[o] = {
					exports: {}
				};
				d[o][0].call(a.exports, function(e) {
					var r = d[o][1][e];
					return t(r || e)
				}, a, a.exports, s, d, e, n)
			}
			return e[o].exports
		}
		for(var r = "function" == typeof require && require, a = 0; a < n.length; a++) t(n[a]);
		return t
	}
	return s
})()({
	1: [function(e, t, n) {
		var r = n.logElem = document.querySelector(".log"),
			a = document.querySelector(".speed"),
			o = document.querySelector("#logHeading");
		n.log = function(e) {
			if(o.style.display = "block", "string" == typeof e) {
				var t = document.createElement("p");
				return t.innerHTML = e, r.appendChild(t), t
			}
			return r.appendChild(e), n.lineBreak(), e
		}, n.lineBreak = function() {
			r.appendChild(document.createElement("br"))
		}, n.updateSpeed = function(e) {
			a.innerHTML = e
		}, n.warning = function(e) {
			console.error(e.stack || e.message || e), n.log(e.message || e)
		}, n.error = function(e) {
			console.error(e.stack || e.message || e);
			var t = n.log(e.message || e);
			t.style.color = "red", t.style.fontWeight = "bold"
		}
	}, {}],
	2: [function(e) {
		(function(t) {
			function n() {
				function e() {
					var e = decodeURIComponent(window.location.hash.substring(1)).trim();
					"" !== e && i(e)
				}
				w.WEBRTC_SUPPORT || S.error("This browser is unsupported. Please use a browser with WebRTC support."), E(function() {});
				var t = document.querySelector("input[name=upload]");
				t && k(t, function(e, t) {
					return e ? S.error(e) : void(t = t.map(function(e) {
						return e.file
					}), a(t))
				}), f("body", a);
				var n = document.querySelector("form");
				n && n.addEventListener("submit", function(t) {
					t.preventDefault(), i(document.querySelector("form input[name=torrentId]").value.trim())
				}), e(), window.addEventListener("hashchange", e), "registerProtocolHandler" in navigator && navigator.registerProtocolHandler("magnet", window.location.origin + "#%s", "Instant.io")
			}

			function r(e) {
				m.concat({
					url: "/__rtcConfig__",
					timeout: 5e3
				}, function(t, n, r) {
					if(t || 200 !== n.statusCode) e(new Error("Could not get WebRTC config from server. Using default (without TURN)."));
					else {
						var a;
						try {
							a = JSON.parse(r)
						} catch(t) {
							return e(new Error("Got invalid WebRTC config from server: " + r))
						}
						delete a.comment, p("got rtc config: %o", a), e(null, a)
					}
				})
			}

			function a(e) {
				p("got files:"), e.forEach(function(e) {
					p(" - %s (%s bytes)", e.name, e.size)
				}), e.filter(o).forEach(d), l(e.filter(s))
			}

			function o(e) {
				var t = _.extname(e.name).toLowerCase();
				return ".torrent" === t
			}

			function s(e) {
				return !o(e)
			}

			function i(e) {
				var t = v.some(function(t) {
					return 0 <= e.indexOf(t)
				});
				t ? S.log("File not found " + e) : (S.log("Downloading torrent from " + e), E(function(t, n) {
					return t ? S.error(t) : void n.add(e, c)
				}))
			}

			function d(e) {
				S.log("Downloading torrent from <strong>" + e.name + "</strong>"), E(function(t, n) {
					return t ? S.error(t) : void n.add(e, c)
				})
			}

			function l(e) {
				0 === e.length || (S.log("Seeding " + e.length + " files"), E(function(t, n) {
					return t ? S.error(t) : void n.seed(e, c)
				}))
			}

			function c(e) {
				function t() {
					var t = (100 * e.progress).toFixed(1),
						n;
					e.done ? n = "Done." : (n = h.duration(e.timeRemaining / 1e3, "seconds").humanize(), n = n[0].toUpperCase() + n.substring(1) + " remaining."), S.updateSpeed("<b>Peers:</b> " + e.numPeers + " <b>Progress:</b> " + t + "% <b>Download speed:</b> " + g(window.client.downloadSpeed) + "/s <b>Upload speed:</b> " + g(window.client.uploadSpeed) + "/s <b>ETA:</b> " + n)
				}
				e.on("warning", S.warning), e.on("error", S.error);
				var n = document.querySelector("input[name=upload]");
				n.value = n.defaultValue;
				var r = _.basename(e.name, _.extname(e.name)) + ".torrent";
				S.log("\"" + r + "\" contains " + e.files.length + " files:"), e.files.forEach(function(e) {
					S.log("&nbsp;&nbsp;- " + e.name + " (" + g(e.length) + ")")
				}), S.log("Torrent info hash: " + e.infoHash + " <a href=\"/#" + e.infoHash + "\" onclick=\"prompt('Share this link with anyone you want to download this torrent:', this.href);return false;\">[Share link]</a> <a href=\"" + e.magnetURI + "\" target=\"_blank\">[Magnet URI]</a> <a href=\"" + e.torrentFileBlobURL + "\" target=\"_blank\" download=\"" + r + "\">[Download .torrent]</a>"), e.on("download", y(t, 250)), e.on("upload", y(t, 250)), setInterval(t, 5e3), t(), e.files.forEach(function(e) {
					e.appendTo(S.logElem, {
						maxBlobLength: 2000000000
					}, function(e) {
						if(e) return S.error(e)
					}), e.getBlobURL(function(t, n) {
						if(t) return S.error(t);
						var r = document.createElement("a");
						r.target = "_blank", r.download = e.name, r.href = n, r.textContent = "Download " + e.name, S.log(r)
					})
				});
				var a = document.createElement("a");
				a.href = "#", a.target = "_blank", a.textContent = "Download all files as zip", a.addEventListener("click", function(t) {
					var n = 0,
						r = _.basename(e.name, _.extname(e.name)) + ".zip",
						a = new x;
					t.preventDefault(), e.files.forEach(function(t) {
						t.getBlob(function(o, s) {
							return n += 1, o ? S.error(o) : void(a.file(t.path, s), n === e.files.length && (1 < e.files.length && (a = a.folder(e.name)), a.generateAsync({
								type: "blob"
							}).then(function(e) {
								var t = URL.createObjectURL(e),
									n = document.createElement("a");
								n.download = r, n.href = t, n.click(), setTimeout(function() {
									URL.revokeObjectURL(t)
								}, 30000)
							}, S.error)))
						})
					})
				}), S.log(a)
			}
			var u = e("create-torrent"),
				p = e("debug")("instant.io"),
				f = e("drag-drop"),
				m = e("simple-get"),
				h = e("moment"),
				_ = e("path"),
				g = e("prettier-bytes"),
				y = e("throttleit"),
				b = e("thunky"),
				k = e("upload-element"),
				w = e("webtorrent"),
				x = e("jszip"),
				S = e("./util");
			t.WEBTORRENT_ANNOUNCE = u.announceList.map(function(e) {
				return e[0]
			}).filter(function(e) {
				return 0 === e.indexOf("wss://") || 0 === e.indexOf("ws://")
			});
			var v = ["6feb54706f41f459f819c0ae5b560a21ebfead8f"],
				E = b(function(e) {
					r(function(t, n) {
						t && S.error(t);
						var r = new w({
							tracker: {
								rtcConfig: n
							}
						});
						window.client = r, r.on("warning", S.warning), r.on("error", S.error), e(null, r)
					})
				});
			n()
		}).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
	}, {
		"./util": 1,
		"create-torrent": 76,
		debug: 77,
		"drag-drop": 80,
		jszip: 114,
		moment: 154,
		path: 201,
		"prettier-bytes": 203,
		"simple-get": 243,
		throttleit: 299,
		thunky: 300,
		"upload-element": 309,
		webtorrent: 316
	}],
	3: [function(e, t) {
		const n = /^\[?([^\]]+)\]?:(\d+)$/;
		let r = {},
			a = 0;
		t.exports = function(e) {
			if(1e5 === a && t.exports.reset(), !r[e]) {
				const t = n.exec(e);
				if(!t) throw new Error(`invalid addr: ${e}`);
				r[e] = [t[1], +t[2]], a += 1
			}
			return r[e]
		}, t.exports.reset = function() {
			r = {}, a = 0
		}
	}, {}],
	4: [function(e, t, n) {
		"use strict";

		function r(e) {
			var t = e.length;
			if(0 < t % 4) throw new Error("Invalid string. Length must be a multiple of 4");
			var n = e.indexOf("="); - 1 === n && (n = t);
			var r = n === t ? 0 : 4 - n % 4;
			return [n, r]
		}

		function a(e, t, n) {
			return 3 * (t + n) / 4 - n
		}

		function o(e) {
			for(var t = r(e), n = t[0], o = t[1], s = new p(a(e, n, o)), d = 0, l = 0 < o ? n - 4 : n, c = 0, f; c < l; c += 4) f = u[e.charCodeAt(c)] << 18 | u[e.charCodeAt(c + 1)] << 12 | u[e.charCodeAt(c + 2)] << 6 | u[e.charCodeAt(c + 3)], s[d++] = 255 & f >> 16, s[d++] = 255 & f >> 8, s[d++] = 255 & f;
			return 2 === o && (f = u[e.charCodeAt(c)] << 2 | u[e.charCodeAt(c + 1)] >> 4, s[d++] = 255 & f), 1 === o && (f = u[e.charCodeAt(c)] << 10 | u[e.charCodeAt(c + 1)] << 4 | u[e.charCodeAt(c + 2)] >> 2, s[d++] = 255 & f >> 8, s[d++] = 255 & f), s
		}

		function s(e) {
			return c[63 & e >> 18] + c[63 & e >> 12] + c[63 & e >> 6] + c[63 & e]
		}

		function d(e, t, n) {
			for(var r = [], a = t, o; a < n; a += 3) o = (16711680 & e[a] << 16) + (65280 & e[a + 1] << 8) + (255 & e[a + 2]), r.push(s(o));
			return r.join("")
		}

		function l(e) {
			for(var t = e.length, n = t % 3, r = [], a = 16383, o = 0, s = t - n, l; o < s; o += a) r.push(d(e, o, o + a > s ? s : o + a));
			return 1 === n ? (l = e[t - 1], r.push(c[l >> 2] + c[63 & l << 4] + "==")) : 2 === n && (l = (e[t - 2] << 8) + e[t - 1], r.push(c[l >> 10] + c[63 & l >> 4] + c[63 & l << 2] + "=")), r.join("")
		}
		n.byteLength = function(e) {
			var t = r(e),
				n = t[0],
				a = t[1];
			return 3 * (n + a) / 4 - a
		}, n.toByteArray = o, n.fromByteArray = l;
		for(var c = [], u = [], p = "undefined" == typeof Uint8Array ? Array : Uint8Array, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", m = 0, h = f.length; m < h; ++m) c[m] = f[m], u[f.charCodeAt(m)] = m;
		u[45] = 62, u[95] = 63
	}, {}],
	5: [function(e, t) {
		(function(e) {
			function n(e, t, n) {
				for(var r = 0, a = 1, o = t, s; o < n; o++) {
					if(s = e[o], 58 > s && 48 <= s) {
						r = 10 * r + (s - 48);
						continue
					}
					if(o !== t || 43 !== s) {
						if(o === t && 45 === s) {
							a = -1;
							continue
						}
						if(46 === s) break;
						throw new Error("not a number: buffer[" + o + "] = " + s)
					}
				}
				return r * a
			}

			function r(t, n, a, o) {
				return null == t || 0 === t.length ? null : ("number" != typeof n && null == o && (o = n, n = void 0), "number" != typeof a && null == o && (o = a, a = void 0), r.position = 0, r.encoding = o || null, r.data = e.isBuffer(t) ? t.slice(n, a) : new e(t), r.bytes = r.data.length, r.next())
			}
			const a = 101;
			r.bytes = 0, r.position = 0, r.data = null, r.encoding = null, r.next = function() {
				switch(r.data[r.position]) {
					case 100:
						return r.dictionary();
					case 108:
						return r.list();
					case 105:
						return r.integer();
					default:
						return r.buffer();
				}
			}, r.find = function(e) {
				for(var t = r.position, n = r.data.length, a = r.data; t < n;) {
					if(a[t] === e) return t;
					t++
				}
				throw new Error("Invalid data: Missing delimiter \"" + String.fromCharCode(e) + "\" [0x" + e.toString(16) + "]")
			}, r.dictionary = function() {
				r.position++;
				for(var e = {}; r.data[r.position] !== a;) e[r.buffer()] = r.next();
				return r.position++, e
			}, r.list = function() {
				r.position++;
				for(var e = []; r.data[r.position] !== a;) e.push(r.next());
				return r.position++, e
			}, r.integer = function() {
				var e = r.find(a),
					t = n(r.data, r.position + 1, e);
				return r.position += e + 1 - r.position, t
			}, r.buffer = function() {
				var e = r.find(58),
					t = n(r.data, r.position, e),
					a = ++e + t;
				return r.position = a, r.encoding ? r.data.toString(r.encoding, e, a) : r.data.slice(e, a)
			}, t.exports = r
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41
	}],
	6: [function(e, t) {
		function n(e, t, a) {
			var o = [],
				s = null;
			return n._encode(o, e), s = r.concat(o), n.bytes = s.length, r.isBuffer(t) ? (s.copy(t, a), t) : s
		}
		var r = e("safe-buffer").Buffer;
		n.bytes = -1, n._floatConversionDetected = !1, n.getType = function(e) {
			return r.isBuffer(e) ? "buffer" : Array.isArray(e) ? "array" : ArrayBuffer.isView(e) ? "arraybufferview" : e instanceof Number ? "number" : e instanceof Boolean ? "boolean" : e instanceof ArrayBuffer ? "arraybuffer" : typeof e
		}, n._encode = function(e, t) {
			if(null != t) switch(n.getType(t)) {
				case "buffer":
					n.buffer(e, t);
					break;
				case "object":
					n.dict(e, t);
					break;
				case "array":
					n.list(e, t);
					break;
				case "string":
					n.string(e, t);
					break;
				case "number":
					n.number(e, t);
					break;
				case "boolean":
					n.number(e, t);
					break;
				case "arraybufferview":
					n.buffer(e, r.from(t.buffer, t.byteOffset, t.byteLength));
					break;
				case "arraybuffer":
					n.buffer(e, r.from(t));
			}
		};
		var a = r.from("e"),
			o = r.from("d"),
			s = r.from("l");
		n.buffer = function(e, t) {
			e.push(new r(t.length + ":"), t)
		}, n.string = function(e, t) {
			e.push(r.from(r.byteLength(t) + ":" + t))
		}, n.number = function(e, t) {
			var a = (t / 2147483648 << 0) * 2147483648 + (t % 2147483648 << 0);
			e.push(r.from("i" + a + "e")), a === t || n._floatConversionDetected || (n._floatConversionDetected = !0, console.warn("WARNING: Possible data corruption detected with value \"" + t + "\":", "Bencoding only defines support for integers, value was converted to \"" + a + "\""), console.trace())
		}, n.dict = function(e, t) {
			e.push(o);
			for(var r = 0, s = Object.keys(t).sort(), i = s.length, d; r < i; r++) d = s[r], null == t[d] || (n.string(e, d), n._encode(e, t[d]));
			e.push(a)
		}, n.list = function(e, t) {
			var r = 0,
				o = t.length;
			for(e.push(s); r < o; r++) null != t[r] && n._encode(e, t[r]);
			e.push(a)
		}, t.exports = n
	}, {
		"safe-buffer": 241
	}],
	7: [function(e, t) {
		var n = t.exports;
		n.encode = e("./encode"), n.decode = e("./decode"), n.byteLength = n.encodingLength = function(e) {
			return n.encode(e).length
		}
	}, {
		"./decode": 5,
		"./encode": 6
	}],
	8: [function(e, t) {
		t.exports = function(e, t, n, r, a) {
			var o, s;
			if(void 0 === r) r = 0;
			else if(r |= 0, 0 > r || r >= e.length) throw new RangeError("invalid lower bound");
			if(void 0 === a) a = e.length - 1;
			else if(a |= 0, a < r || a >= e.length) throw new RangeError("invalid upper bound");
			for(; r <= a;)
				if(o = r + (a - r >> 1), s = +n(e[o], t, o, e), 0 > s) r = o + 1;
				else if(0 < s) a = o - 1;
			else return o;
			return ~r
		}
	}, {}],
	9: [function(e, t) {
		(function(e) {
			function n(e, t) {
				return this instanceof n ? void(0 === arguments.length && (e = 0), this.grow = t && (isFinite(t.grow) && r(t.grow) || t.grow) || 0, ("number" == typeof e || e === void 0) && (e = new a(r(e)), e.fill && !e._isBuffer && e.fill(0)), this.buffer = e) : new n(e, t)
			}

			function r(e) {
				var t = e >> 3;
				return 0 != e % 8 && t++, t
			}
			var a = "undefined" == typeof e ? Uint8Array : e;
			n.prototype.get = function(e) {
				var t = e >> 3;
				return t < this.buffer.length && !!(this.buffer[t] & 128 >> e % 8)
			}, n.prototype.set = function(e, t) {
				var n = e >> 3;
				t || 1 === arguments.length ? (this.buffer.length < n + 1 && this._grow(Math.max(n + 1, Math.min(2 * this.buffer.length, this.grow))), this.buffer[n] |= 128 >> e % 8) : n < this.buffer.length && (this.buffer[n] &= ~(128 >> e % 8))
			}, n.prototype._grow = function(e) {
				if(this.buffer.length < e && e <= this.grow) {
					var t = new a(e);
					if(t.fill && t.fill(0), this.buffer.copy) this.buffer.copy(t, 0);
					else
						for(var n = 0; n < this.buffer.length; n++) t[n] = this.buffer[n];
					this.buffer = t
				}
			}, "undefined" != typeof t && (t.exports = n)
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41
	}],
	10: [function(e, t) {
		(function(n) {
			const r = e("unordered-array-remove"),
				a = e("bencode"),
				o = e("bitfield"),
				s = e("debug")("bittorrent-protocol"),
				i = e("xtend"),
				d = e("randombytes"),
				l = e("speedometer"),
				c = e("readable-stream"),
				u = n.from("\x13BitTorrent protocol"),
				p = n.from([0, 0, 0, 0]),
				f = n.from([0, 0, 0, 1, 0]),
				m = n.from([0, 0, 0, 1, 1]),
				h = n.from([0, 0, 0, 1, 2]),
				_ = n.from([0, 0, 0, 1, 3]),
				g = [0, 0, 0, 0, 0, 0, 0, 0],
				y = [0, 0, 0, 3, 9, 0, 0];
			class b {
				constructor(e, t, n, r) {
					this.piece = e, this.offset = t, this.length = n, this.callback = r
				}
			}
			class k extends c.Duplex {
				constructor() {
					super(), this._debugId = d(4).toString("hex"), this._debug("new wire"), this.peerId = null, this.peerIdBuffer = null, this.type = null, this.amChoking = !0, this.amInterested = !1, this.peerChoking = !0, this.peerInterested = !1, this.peerPieces = new o(0, {
						grow: 4e5
					}), this.peerExtensions = {}, this.requests = [], this.peerRequests = [], this.extendedMapping = {}, this.peerExtendedMapping = {}, this.extendedHandshake = {}, this.peerExtendedHandshake = {}, this._ext = {}, this._nextExt = 1, this.uploaded = 0, this.downloaded = 0, this.uploadSpeed = l(), this.downloadSpeed = l(), this._keepAliveInterval = null, this._timeout = null, this._timeoutMs = 0, this.destroyed = !1, this._finished = !1, this._parserSize = 0, this._parser = null, this._buffer = [], this._bufferSize = 0, this.on("finish", this._onFinish), this._parseHandshake()
				}
				setKeepAlive(e) {
					this._debug("setKeepAlive %s", e), clearInterval(this._keepAliveInterval);
					!1 === e || (this._keepAliveInterval = setInterval(() => {
						this.keepAlive()
					}, 55e3))
				}
				setTimeout(e, t) {
					this._debug("setTimeout ms=%d unref=%s", e, t), this._clearTimeout(), this._timeoutMs = e, this._timeoutUnref = !!t, this._updateTimeout()
				}
				destroy() {
					this.destroyed || (this.destroyed = !0, this._debug("destroy"), this.emit("close"), this.end())
				}
				end(...e) {
					this._debug("end"), this._onUninterested(), this._onChoke(), super.end(...e)
				}
				use(e) {
					function t() {}
					const n = e.prototype.name;
					if(!n) throw new Error("Extension class requires a \"name\" property on the prototype");
					this._debug("use extension.name=%s", n);
					const r = this._nextExt,
						a = new e(this);
					"function" != typeof a.onHandshake && (a.onHandshake = t), "function" != typeof a.onExtendedHandshake && (a.onExtendedHandshake = t), "function" != typeof a.onMessage && (a.onMessage = t), this.extendedMapping[r] = n, this._ext[n] = a, this[n] = a, this._nextExt += 1
				}
				keepAlive() {
					this._debug("keep-alive"), this._push(p)
				}
				handshake(e, t, r) {
					let a, o;
					if("string" == typeof e ? (e = e.toLowerCase(), a = n.from(e, "hex")) : (a = e, e = a.toString("hex")), "string" == typeof t ? o = n.from(t, "hex") : (o = t, t = o.toString("hex")), 20 !== a.length || 20 !== o.length) throw new Error("infoHash and peerId MUST have length 20");
					this._debug("handshake i=%s p=%s exts=%o", e, t, r);
					const s = n.from(g);
					s[5] |= 16, r && r.dht && (s[7] |= 1), this._push(n.concat([u, s, a, o])), this._handshakeSent = !0, this.peerExtensions.extended && !this._extendedHandshakeSent && this._sendExtendedHandshake()
				}
				_sendExtendedHandshake() {
					const e = i(this.extendedHandshake);
					for(const t in e.m = {}, this.extendedMapping) {
						const n = this.extendedMapping[t];
						e.m[n] = +t
					}
					this.extended(0, a.encode(e)), this._extendedHandshakeSent = !0
				}
				choke() {
					if(!this.amChoking) {
						for(this.amChoking = !0, this._debug("choke"); this.peerRequests.length;) this.peerRequests.pop();
						this._push(f)
					}
				}
				unchoke() {
					this.amChoking && (this.amChoking = !1, this._debug("unchoke"), this._push(m))
				}
				interested() {
					this.amInterested || (this.amInterested = !0, this._debug("interested"), this._push(h))
				}
				uninterested() {
					this.amInterested && (this.amInterested = !1, this._debug("uninterested"), this._push(_))
				}
				have(e) {
					this._debug("have %d", e), this._message(4, [e], null)
				}
				bitfield(e) {
					this._debug("bitfield"), n.isBuffer(e) || (e = e.buffer), this._message(5, [], e)
				}
				request(e, t, n, r) {
					return r || (r = () => {}), this._finished ? r(new Error("wire is closed")) : this.peerChoking ? r(new Error("peer is choking")) : void(this._debug("request index=%d offset=%d length=%d", e, t, n), this.requests.push(new b(e, t, n, r)), this._updateTimeout(), this._message(6, [e, t, n], null))
				}
				piece(e, t, n) {
					this._debug("piece index=%d offset=%d", e, t), this.uploaded += n.length, this.uploadSpeed(n.length), this.emit("upload", n.length), this._message(7, [e, t], n)
				}
				cancel(e, t, n) {
					this._debug("cancel index=%d offset=%d length=%d", e, t, n), this._callback(this._pull(this.requests, e, t, n), new Error("request was cancelled"), null), this._message(8, [e, t, n], null)
				}
				port(e) {
					this._debug("port %d", e);
					const t = n.from(y);
					t.writeUInt16BE(e, 5), this._push(t)
				}
				extended(e, t) {
					if(this._debug("extended ext=%s", e), "string" == typeof e && this.peerExtendedMapping[e] && (e = this.peerExtendedMapping[e]), "number" == typeof e) {
						const r = n.from([e]),
							o = n.isBuffer(t) ? t : a.encode(t);
						this._message(20, [], n.concat([r, o]))
					} else throw new Error(`Unrecognized extension: ${e}`)
				}
				_read() {}
				_message(e, t, r) {
					const a = r ? r.length : 0,
						o = n.allocUnsafe(5 + 4 * t.length);
					o.writeUInt32BE(o.length + a - 4, 0), o[4] = e;
					for(let n = 0; n < t.length; n++) o.writeUInt32BE(t[n], 5 + 4 * n);
					this._push(o), r && this._push(r)
				}
				_push(e) {
					return this._finished ? void 0 : this.push(e)
				}
				_onKeepAlive() {
					this._debug("got keep-alive"), this.emit("keep-alive")
				}
				_onHandshake(e, t, n) {
					const r = e.toString("hex"),
						a = t.toString("hex");
					this._debug("got handshake i=%s p=%s exts=%o", r, a, n), this.peerId = a, this.peerIdBuffer = t, this.peerExtensions = n, this.emit("handshake", r, a, n);
					for(var o in this._ext) this._ext[o].onHandshake(r, a, n);
					n.extended && this._handshakeSent && !this._extendedHandshakeSent && this._sendExtendedHandshake()
				}
				_onChoke() {
					for(this.peerChoking = !0, this._debug("got choke"), this.emit("choke"); this.requests.length;) this._callback(this.requests.pop(), new Error("peer is choking"), null)
				}
				_onUnchoke() {
					this.peerChoking = !1, this._debug("got unchoke"), this.emit("unchoke")
				}
				_onInterested() {
					this.peerInterested = !0, this._debug("got interested"), this.emit("interested")
				}
				_onUninterested() {
					this.peerInterested = !1, this._debug("got uninterested"), this.emit("uninterested")
				}
				_onHave(e) {
					this.peerPieces.get(e) || (this._debug("got have %d", e), this.peerPieces.set(e, !0), this.emit("have", e))
				}
				_onBitField(e) {
					this.peerPieces = new o(e), this._debug("got bitfield"), this.emit("bitfield", this.peerPieces)
				}
				_onRequest(e, t, n) {
					if(!this.amChoking) {
						this._debug("got request index=%d offset=%d length=%d", e, t, n);
						const a = (a, o) => r === this._pull(this.peerRequests, e, t, n) ? a ? this._debug("error satisfying request index=%d offset=%d length=%d (%s)", e, t, n, a.message) : void this.piece(e, t, o) : void 0;
						var r = new b(e, t, n, a);
						this.peerRequests.push(r), this.emit("request", e, t, n, a)
					}
				}
				_onPiece(e, t, n) {
					this._debug("got piece index=%d offset=%d", e, t), this._callback(this._pull(this.requests, e, t, n.length), null, n), this.downloaded += n.length, this.downloadSpeed(n.length), this.emit("download", n.length), this.emit("piece", e, t, n)
				}
				_onCancel(e, t, n) {
					this._debug("got cancel index=%d offset=%d length=%d", e, t, n), this._pull(this.peerRequests, e, t, n), this.emit("cancel", e, t, n)
				}
				_onPort(e) {
					this._debug("got port %d", e), this.emit("port", e)
				}
				_onExtended(e, t) {
					if(0 === e) {
						let e;
						try {
							e = a.decode(t)
						} catch(e) {
							this._debug("ignoring invalid extended handshake: %s", e.message || e)
						}
						if(!e) return;
						this.peerExtendedHandshake = e;
						if("object" == typeof e.m)
							for(var n in e.m) this.peerExtendedMapping[n] = +e.m[n].toString();
						for(n in this._ext) this.peerExtendedMapping[n] && this._ext[n].onExtendedHandshake(this.peerExtendedHandshake);
						this._debug("got extended handshake"), this.emit("extended", "handshake", this.peerExtendedHandshake)
					} else this.extendedMapping[e] && (e = this.extendedMapping[e], this._ext[e] && this._ext[e].onMessage(t)), this._debug("got extended message ext=%s", e), this.emit("extended", e, t)
				}
				_onTimeout() {
					this._debug("request timed out"), this._callback(this.requests.shift(), new Error("request has timed out"), null), this.emit("timeout")
				}
				_write(e, t, r) {
					for(this._bufferSize += e.length, this._buffer.push(e); this._bufferSize >= this._parserSize;) {
						const e = 1 === this._buffer.length ? this._buffer[0] : n.concat(this._buffer);
						this._bufferSize -= this._parserSize, this._buffer = this._bufferSize ? [e.slice(this._parserSize)] : [], this._parser(e.slice(0, this._parserSize))
					}
					r(null)
				}
				_callback(e, t, n) {
					e && (this._clearTimeout(), !this.peerChoking && !this._finished && this._updateTimeout(), e.callback(t, n))
				}
				_clearTimeout() {
					this._timeout && (clearTimeout(this._timeout), this._timeout = null)
				}
				_updateTimeout() {
					this._timeoutMs && this.requests.length && !this._timeout && (this._timeout = setTimeout(() => this._onTimeout(), this._timeoutMs), this._timeoutUnref && this._timeout.unref && this._timeout.unref())
				}
				_parse(e, t) {
					this._parserSize = e, this._parser = t
				}
				_onMessageLength(e) {
					const t = e.readUInt32BE(0);
					0 < t ? this._parse(t, this._onMessage) : (this._onKeepAlive(), this._parse(4, this._onMessageLength))
				}
				_onMessage(e) {
					switch(this._parse(4, this._onMessageLength), e[0]) {
						case 0:
							return this._onChoke();
						case 1:
							return this._onUnchoke();
						case 2:
							return this._onInterested();
						case 3:
							return this._onUninterested();
						case 4:
							return this._onHave(e.readUInt32BE(1));
						case 5:
							return this._onBitField(e.slice(1));
						case 6:
							return this._onRequest(e.readUInt32BE(1), e.readUInt32BE(5), e.readUInt32BE(9));
						case 7:
							return this._onPiece(e.readUInt32BE(1), e.readUInt32BE(5), e.slice(9));
						case 8:
							return this._onCancel(e.readUInt32BE(1), e.readUInt32BE(5), e.readUInt32BE(9));
						case 9:
							return this._onPort(e.readUInt16BE(1));
						case 20:
							return this._onExtended(e.readUInt8(1), e.slice(2));
						default:
							return this._debug("got unknown message"), this.emit("unknownmessage", e);
					}
				}
				_parseHandshake() {
					this._parse(1, e => {
						const t = e.readUInt8(0);
						this._parse(t + 48, e => {
							const n = e.slice(0, t);
							return "BitTorrent protocol" === n.toString() ? void(e = e.slice(t), this._onHandshake(e.slice(8, 28), e.slice(28, 48), {
								dht: !!(1 & e[7]),
								extended: !!(16 & e[5])
							}), this._parse(4, this._onMessageLength)) : (this._debug("Error: wire not speaking BitTorrent protocol (%s)", n.toString()), void this.end())
						})
					})
				}
				_onFinish() {
					for(this._finished = !0, this.push(null); this.read(););
					for(clearInterval(this._keepAliveInterval), this._parse(Number.MAX_VALUE, () => {}); this.peerRequests.length;) this.peerRequests.pop();
					for(; this.requests.length;) this._callback(this.requests.pop(), new Error("wire was closed"), null)
				}
				_debug(...e) {
					e[0] = `[${this._debugId}] ${e[0]}`, s(...e)
				}
				_pull(e, t, n, a) {
					for(let o = 0; o < e.length; o++) {
						const s = e[o];
						if(s.piece === t && s.offset === n && s.length === a) return r(e, o), s
					}
					return null
				}
			}
			t.exports = k
		}).call(this, e("buffer").Buffer)
	}, {
		bencode: 7,
		bitfield: 9,
		buffer: 41,
		debug: 77,
		randombytes: 212,
		"readable-stream": 19,
		speedometer: 265,
		"unordered-array-remove": 308,
		xtend: 325
	}],
	11: [function(e, t) {
		"use strict";

		function n(e) {
			return this instanceof n ? void(d.call(this, e), l.call(this, e), e && !1 === e.readable && (this.readable = !1), e && !1 === e.writable && (this.writable = !1), this.allowHalfOpen = !0, e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", r)) : new n(e)
		}

		function r() {
			this.allowHalfOpen || this._writableState.ended || o.nextTick(a, this)
		}

		function a(e) {
			e.end()
		}
		var o = e("process-nextick-args"),
			s = Object.keys || function(e) {
				var t = [];
				for(var n in e) t.push(n);
				return t
			};
		t.exports = n;
		var i = e("core-util-is");
		i.inherits = e("inherits");
		var d = e("./_stream_readable"),
			l = e("./_stream_writable");
		i.inherits(n, d);
		for(var c = s(l.prototype), u = 0, p; u < c.length; u++) p = c[u], n.prototype[p] || (n.prototype[p] = l.prototype[p]);
		Object.defineProperty(n.prototype, "writableHighWaterMark", {
			enumerable: !1,
			get: function() {
				return this._writableState.highWaterMark
			}
		}), Object.defineProperty(n.prototype, "destroyed", {
			get: function() {
				return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed
			},
			set: function(e) {
				void 0 === this._readableState || void 0 === this._writableState || (this._readableState.destroyed = e, this._writableState.destroyed = e)
			}
		}), n.prototype._destroy = function(e, t) {
			this.push(null), this.end(), o.nextTick(t, e)
		}
	}, {
		"./_stream_readable": 13,
		"./_stream_writable": 15,
		"core-util-is": 75,
		inherits: 99,
		"process-nextick-args": 204
	}],
	12: [function(e, t) {
		"use strict";

		function n(e) {
			return this instanceof n ? void r.call(this, e) : new n(e)
		}
		t.exports = n;
		var r = e("./_stream_transform"),
			a = e("core-util-is");
		a.inherits = e("inherits"), a.inherits(n, r), n.prototype._transform = function(e, t, n) {
			n(null, e)
		}
	}, {
		"./_stream_transform": 14,
		"core-util-is": 75,
		inherits: 99
	}],
	13: [function(e, t) {
		(function(n, r) {
			"use strict";

			function a(e) {
				return j.from(e)
			}

			function o(e) {
				return j.isBuffer(e) || e instanceof N
			}

			function s(e, t, n) {
				return "function" == typeof e.prependListener ? e.prependListener(t, n) : void(e._events && e._events[t] ? O(e._events[t]) ? e._events[t].unshift(n) : e._events[t] = [n, e._events[t]] : e.on(t, n))
			}

			function i(t, n) {
				D = D || e("./_stream_duplex"), t = t || {};
				var r = n instanceof D;
				this.objectMode = !!t.objectMode, r && (this.objectMode = this.objectMode || !!t.readableObjectMode);
				var a = t.highWaterMark,
					o = t.readableHighWaterMark,
					s = this.objectMode ? 16 : 16384;
				this.highWaterMark = a || 0 === a ? a : r && (o || 0 === o) ? o : s, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new W, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (!Y && (Y = e("string_decoder/").StringDecoder), this.decoder = new Y(t.encoding), this.encoding = t.encoding)
			}

			function d(t) {
				return D = D || e("./_stream_duplex"), this instanceof d ? void(this._readableState = new i(t, this), this.readable = !0, t && ("function" == typeof t.read && (this._read = t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)), U.call(this)) : new d(t)
			}

			function l(e, t, n, r, o) {
				var s = e._readableState;
				if(null === t) s.reading = !1, h(e, s);
				else {
					var i;
					o || (i = u(s, t)), i ? e.emit("error", i) : s.objectMode || t && 0 < t.length ? ("string" != typeof t && !s.objectMode && Object.getPrototypeOf(t) !== j.prototype && (t = a(t)), r ? s.endEmitted ? e.emit("error", new Error("stream.unshift() after end event")) : c(e, s, t, !0) : s.ended ? e.emit("error", new Error("stream.push() after EOF")) : (s.reading = !1, s.decoder && !n ? (t = s.decoder.write(t), s.objectMode || 0 !== t.length ? c(e, s, t, !1) : y(e, s)) : c(e, s, t, !1))) : !r && (s.reading = !1)
				}
				return p(s)
			}

			function c(e, t, n, r) {
				t.flowing && 0 === t.length && !t.sync ? (e.emit("data", n), e.read(0)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), t.needReadable && _(e)), y(e, t)
			}

			function u(e, t) {
				var n;
				return o(t) || "string" == typeof t || void 0 === t || e.objectMode || (n = new TypeError("Invalid non-string/buffer chunk")), n
			}

			function p(e) {
				return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length)
			}

			function f(e) {
				return 8388608 <= e ? e = 8388608 : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e
			}

			function m(e, t) {
				return 0 >= e || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e === e ? (e > t.highWaterMark && (t.highWaterMark = f(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0)) : t.flowing && t.length ? t.buffer.head.data.length : t.length
			}

			function h(e, t) {
				if(!t.ended) {
					if(t.decoder) {
						var n = t.decoder.end();
						n && n.length && (t.buffer.push(n), t.length += t.objectMode ? 1 : n.length)
					}
					t.ended = !0, _(e)
				}
			}

			function _(e) {
				var t = e._readableState;
				t.needReadable = !1, t.emittedReadable || (F("emitReadable", t.flowing), t.emittedReadable = !0, t.sync ? A.nextTick(g, e) : g(e))
			}

			function g(e) {
				F("emit readable"), e.emit("readable"), v(e)
			}

			function y(e, t) {
				t.readingMore || (t.readingMore = !0, A.nextTick(b, e, t))
			}

			function b(e, t) {
				for(var n = t.length; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark && (F("maybeReadMore read 0"), e.read(0), n !== t.length);) n = t.length;
				t.readingMore = !1
			}

			function k(e) {
				return function() {
					var t = e._readableState;
					F("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && P(e, "data") && (t.flowing = !0, v(e))
				}
			}

			function w(e) {
				F("readable nexttick read 0"), e.read(0)
			}

			function x(e, t) {
				t.resumeScheduled || (t.resumeScheduled = !0, A.nextTick(S, e, t))
			}

			function S(e, t) {
				t.reading || (F("resume read 0"), e.read(0)), t.resumeScheduled = !1, t.awaitDrain = 0, e.emit("resume"), v(e), t.flowing && !t.reading && e.read(0)
			}

			function v(e) {
				var t = e._readableState;
				for(F("flow", t.flowing); t.flowing && null !== e.read(););
			}

			function E(e, t) {
				if(0 === t.length) return null;
				var n;
				return t.objectMode ? n = t.buffer.shift() : !e || e >= t.length ? (n = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.head.data : t.buffer.concat(t.length), t.buffer.clear()) : n = C(e, t.buffer, t.decoder), n
			}

			function C(e, t, n) {
				var r;
				return e < t.head.data.length ? (r = t.head.data.slice(0, e), t.head.data = t.head.data.slice(e)) : e === t.head.data.length ? r = t.shift() : r = n ? T(e, t) : I(e, t), r
			}

			function T(e, t) {
				var r = t.head,
					a = 1,
					o = r.data;
				for(e -= o.length; r = r.next;) {
					var s = r.data,
						i = e > s.length ? s.length : e;
					if(o += i === s.length ? s : s.slice(0, e), e -= i, 0 === e) {
						i === s.length ? (++a, t.head = r.next ? r.next : t.tail = null) : (t.head = r, r.data = s.slice(i));
						break
					}++a
				}
				return t.length -= a, o
			}

			function I(e, t) {
				var r = j.allocUnsafe(e),
					a = t.head,
					o = 1;
				for(a.data.copy(r), e -= a.data.length; a = a.next;) {
					var s = a.data,
						i = e > s.length ? s.length : e;
					if(s.copy(r, r.length - e, 0, i), e -= i, 0 === e) {
						i === s.length ? (++o, t.head = a.next ? a.next : t.tail = null) : (t.head = a, a.data = s.slice(i));
						break
					}++o
				}
				return t.length -= o, r
			}

			function L(e) {
				var t = e._readableState;
				if(0 < t.length) throw new Error("\"endReadable()\" called on non-empty stream");
				t.endEmitted || (t.ended = !0, A.nextTick(R, t, e))
			}

			function R(e, t) {
				e.endEmitted || 0 !== e.length || (e.endEmitted = !0, t.readable = !1, t.emit("end"))
			}

			function B(e, t) {
				for(var n = 0, r = e.length; n < r; n++)
					if(e[n] === t) return n;
				return -1
			}
			var A = e("process-nextick-args");
			t.exports = d;
			var O = e("isarray"),
				D;
			d.ReadableState = i;
			var M = e("events").EventEmitter,
				P = function(e, t) {
					return e.listeners(t).length
				},
				U = e("./internal/streams/stream"),
				j = e("safe-buffer").Buffer,
				N = r.Uint8Array || function() {},
				z = e("core-util-is");
			z.inherits = e("inherits");
			var H = e("util"),
				F = void 0;
			F = H && H.debuglog ? H.debuglog("stream") : function() {};
			var W = e("./internal/streams/BufferList"),
				q = e("./internal/streams/destroy"),
				Y;
			z.inherits(d, U);
			var G = ["error", "close", "destroy", "pause", "resume"];
			Object.defineProperty(d.prototype, "destroyed", {
				get: function() {
					return void 0 !== this._readableState && this._readableState.destroyed
				},
				set: function(e) {
					this._readableState && (this._readableState.destroyed = e)
				}
			}), d.prototype.destroy = q.destroy, d.prototype._undestroy = q.undestroy, d.prototype._destroy = function(e, t) {
				this.push(null), t(e)
			}, d.prototype.push = function(e, t) {
				var n = this._readableState,
					r;
				return n.objectMode ? r = !0 : "string" == typeof e && (t = t || n.defaultEncoding, t !== n.encoding && (e = j.from(e, t), t = ""), r = !0), l(this, e, t, !1, r)
			}, d.prototype.unshift = function(e) {
				return l(this, e, null, !0, !1)
			}, d.prototype.isPaused = function() {
				return !1 === this._readableState.flowing
			}, d.prototype.setEncoding = function(t) {
				return Y || (Y = e("string_decoder/").StringDecoder), this._readableState.decoder = new Y(t), this._readableState.encoding = t, this
			};
			d.prototype.read = function(e) {
				F("read", e), e = parseInt(e, 10);
				var t = this._readableState,
					r = e;
				if(0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended)) return F("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? L(this) : _(this), null;
				if(e = m(e, t), 0 === e && t.ended) return 0 === t.length && L(this), null;
				var a = t.needReadable;
				F("need readable", a), (0 === t.length || t.length - e < t.highWaterMark) && (a = !0, F("length less than watermark", a)), t.ended || t.reading ? (a = !1, F("reading or ended", a)) : a && (F("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, !t.reading && (e = m(r, t)));
				var o;
				return o = 0 < e ? E(e, t) : null, null === o ? (t.needReadable = !0, e = 0) : t.length -= e, 0 === t.length && (!t.ended && (t.needReadable = !0), r !== e && t.ended && L(this)), null !== o && this.emit("data", o), o
			}, d.prototype._read = function() {
				this.emit("error", new Error("_read() is not implemented"))
			}, d.prototype.pipe = function(e, t) {
				function r(e, t) {
					F("onunpipe"), e === p && t && !1 === t.hasUnpiped && (t.hasUnpiped = !0, o())
				}

				function a() {
					F("onend"), e.end()
				}

				function o() {
					F("cleanup"), e.removeListener("close", l), e.removeListener("finish", c), e.removeListener("drain", _), e.removeListener("error", d), e.removeListener("unpipe", r), p.removeListener("end", a), p.removeListener("end", u), p.removeListener("data", i), g = !0, f.awaitDrain && (!e._writableState || e._writableState.needDrain) && _()
				}

				function i(t) {
					F("ondata"), y = !1;
					var n = e.write(t);
					!1 !== n || y || ((1 === f.pipesCount && f.pipes === e || 1 < f.pipesCount && -1 !== B(f.pipes, e)) && !g && (F("false write response, pause", p._readableState.awaitDrain), p._readableState.awaitDrain++, y = !0), p.pause())
				}

				function d(t) {
					F("onerror", t), u(), e.removeListener("error", d), 0 === P(e, "error") && e.emit("error", t)
				}

				function l() {
					e.removeListener("finish", c), u()
				}

				function c() {
					F("onfinish"), e.removeListener("close", l), u()
				}

				function u() {
					F("unpipe"), p.unpipe(e)
				}
				var p = this,
					f = this._readableState;
				switch(f.pipesCount) {
					case 0:
						f.pipes = e;
						break;
					case 1:
						f.pipes = [f.pipes, e];
						break;
					default:
						f.pipes.push(e);
				}
				f.pipesCount += 1, F("pipe count=%d opts=%j", f.pipesCount, t);
				var m = (!t || !1 !== t.end) && e !== n.stdout && e !== n.stderr,
					h = m ? a : u;
				f.endEmitted ? A.nextTick(h) : p.once("end", h), e.on("unpipe", r);
				var _ = k(p);
				e.on("drain", _);
				var g = !1,
					y = !1;
				return p.on("data", i), s(e, "error", d), e.once("close", l), e.once("finish", c), e.emit("pipe", p), f.flowing || (F("pipe resume"), p.resume()), e
			}, d.prototype.unpipe = function(e) {
				var t = this._readableState,
					n = {
						hasUnpiped: !1
					};
				if(0 === t.pipesCount) return this;
				if(1 === t.pipesCount) return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, n), this);
				if(!e) {
					var r = t.pipes,
						a = t.pipesCount;
					t.pipes = null, t.pipesCount = 0, t.flowing = !1;
					for(var o = 0; o < a; o++) r[o].emit("unpipe", this, n);
					return this
				}
				var s = B(t.pipes, e);
				return -1 === s ? this : (t.pipes.splice(s, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, n), this)
			}, d.prototype.on = function(e, t) {
				var n = U.prototype.on.call(this, e, t);
				if("data" === e) !1 !== this._readableState.flowing && this.resume();
				else if("readable" === e) {
					var r = this._readableState;
					r.endEmitted || r.readableListening || (r.readableListening = r.needReadable = !0, r.emittedReadable = !1, r.reading ? r.length && _(this) : A.nextTick(w, this))
				}
				return n
			}, d.prototype.addListener = d.prototype.on, d.prototype.resume = function() {
				var e = this._readableState;
				return e.flowing || (F("resume"), e.flowing = !0, x(this, e)), this
			}, d.prototype.pause = function() {
				return F("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (F("pause"), this._readableState.flowing = !1, this.emit("pause")), this
			}, d.prototype.wrap = function(e) {
				var t = this,
					r = this._readableState,
					a = !1;
				for(var o in e.on("end", function() {
						if(F("wrapped end"), r.decoder && !r.ended) {
							var e = r.decoder.end();
							e && e.length && t.push(e)
						}
						t.push(null)
					}), e.on("data", function(n) {
						if((F("wrapped data"), r.decoder && (n = r.decoder.write(n)), !(r.objectMode && (null === n || void 0 === n))) && (r.objectMode || n && n.length)) {
							var o = t.push(n);
							o || (a = !0, e.pause())
						}
					}), e) void 0 === this[o] && "function" == typeof e[o] && (this[o] = function(t) {
					return function() {
						return e[t].apply(e, arguments)
					}
				}(o));
				for(var s = 0; s < G.length; s++) e.on(G[s], this.emit.bind(this, G[s]));
				return this._read = function(t) {
					F("wrapped _read", t), a && (a = !1, e.resume())
				}, this
			}, Object.defineProperty(d.prototype, "readableHighWaterMark", {
				enumerable: !1,
				get: function() {
					return this._readableState.highWaterMark
				}
			}), d._fromList = E
		}).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
	}, {
		"./_stream_duplex": 11,
		"./internal/streams/BufferList": 16,
		"./internal/streams/destroy": 17,
		"./internal/streams/stream": 18,
		_process: 205,
		"core-util-is": 75,
		events: 82,
		inherits: 99,
		isarray: 104,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		"string_decoder/": 296,
		util: 35
	}],
	14: [function(e, t) {
		"use strict";

		function n(e, t) {
			var n = this._transformState;
			n.transforming = !1;
			var r = n.writecb;
			if(!r) return this.emit("error", new Error("write callback called multiple times"));
			n.writechunk = null, n.writecb = null, null != t && this.push(t), r(e);
			var a = this._readableState;
			a.reading = !1, (a.needReadable || a.length < a.highWaterMark) && this._read(a.highWaterMark)
		}

		function r(e) {
			return this instanceof r ? void(s.call(this, e), this._transformState = {
				afterTransform: n.bind(this),
				needTransform: !1,
				transforming: !1,
				writecb: null,
				writechunk: null,
				writeencoding: null
			}, this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.on("prefinish", a)) : new r(e)
		}

		function a() {
			var e = this;
			"function" == typeof this._flush ? this._flush(function(t, n) {
				o(e, t, n)
			}) : o(this, null, null)
		}

		function o(e, t, n) {
			if(t) return e.emit("error", t);
			if(null != n && e.push(n), e._writableState.length) throw new Error("Calling transform done when ws.length != 0");
			if(e._transformState.transforming) throw new Error("Calling transform done when still transforming");
			return e.push(null)
		}
		t.exports = r;
		var s = e("./_stream_duplex"),
			i = e("core-util-is");
		i.inherits = e("inherits"), i.inherits(r, s), r.prototype.push = function(e, t) {
			return this._transformState.needTransform = !1, s.prototype.push.call(this, e, t)
		}, r.prototype._transform = function() {
			throw new Error("_transform() is not implemented")
		}, r.prototype._write = function(e, t, n) {
			var r = this._transformState;
			if(r.writecb = n, r.writechunk = e, r.writeencoding = t, !r.transforming) {
				var a = this._readableState;
				(r.needTransform || a.needReadable || a.length < a.highWaterMark) && this._read(a.highWaterMark)
			}
		}, r.prototype._read = function() {
			var e = this._transformState;
			null !== e.writechunk && e.writecb && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0
		}, r.prototype._destroy = function(e, t) {
			var n = this;
			s.prototype._destroy.call(this, e, function(e) {
				t(e), n.emit("close")
			})
		}
	}, {
		"./_stream_duplex": 11,
		"core-util-is": 75,
		inherits: 99
	}],
	15: [function(e, t) {
		(function(n, r, a) {
			"use strict";

			function o(e) {
				var t = this;
				this.next = null, this.entry = null, this.finish = function() {
					T(t, e)
				}
			}

			function s(e) {
				return D.from(e)
			}

			function i(e) {
				return D.isBuffer(e) || e instanceof M
			}

			function d() {}

			function l(t, n) {
				R = R || e("./_stream_duplex"), t = t || {};
				var r = n instanceof R;
				this.objectMode = !!t.objectMode, r && (this.objectMode = this.objectMode || !!t.writableObjectMode);
				var a = t.highWaterMark,
					s = t.writableHighWaterMark,
					i = this.objectMode ? 16 : 16384;
				this.highWaterMark = a || 0 === a ? a : r && (s || 0 === s) ? s : i, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
				var d = !1 === t.decodeStrings;
				this.decodeStrings = !d, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(e) {
					y(n, e)
				}, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new o(this)
			}

			function c(t) {
				return R = R || e("./_stream_duplex"), U.call(c, this) || this instanceof R ? void(this._writableState = new l(t, this), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev), "function" == typeof t.destroy && (this._destroy = t.destroy), "function" == typeof t.final && (this._final = t.final)), O.call(this)) : new c(t)
			}

			function u(e, t) {
				var n = new Error("write after end");
				e.emit("error", n), I.nextTick(t, n)
			}

			function p(e, t, n, r) {
				var a = !0,
					o = !1;
				return null === n ? o = new TypeError("May not write null values to stream") : "string" != typeof n && void 0 !== n && !t.objectMode && (o = new TypeError("Invalid non-string/buffer chunk")), o && (e.emit("error", o), I.nextTick(r, o), a = !1), a
			}

			function f(e, t, n) {
				return e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = D.from(t, n)), t
			}

			function m(e, t, n, r, a, o) {
				if(!n) {
					var s = f(t, r, a);
					r !== s && (n = !0, a = "buffer", r = s)
				}
				var i = t.objectMode ? 1 : r.length;
				t.length += i;
				var d = t.length < t.highWaterMark;
				if(d || (t.needDrain = !0), t.writing || t.corked) {
					var l = t.lastBufferedRequest;
					t.lastBufferedRequest = {
						chunk: r,
						encoding: a,
						isBuf: n,
						callback: o,
						next: null
					}, l ? l.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1
				} else h(e, t, !1, i, r, a, o);
				return d
			}

			function h(e, t, n, r, a, o, s) {
				t.writelen = r, t.writecb = s, t.writing = !0, t.sync = !0, n ? e._writev(a, t.onwrite) : e._write(a, o, t.onwrite), t.sync = !1
			}

			function _(e, t, n, r, a) {
				--t.pendingcb, n ? (I.nextTick(a, r), I.nextTick(E, e, t), e._writableState.errorEmitted = !0, e.emit("error", r)) : (a(r), e._writableState.errorEmitted = !0, e.emit("error", r), E(e, t))
			}

			function g(e) {
				e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0
			}

			function y(e, t) {
				var n = e._writableState,
					r = n.sync,
					a = n.writecb;
				if(g(n), t) _(e, n, r, t, a);
				else {
					var o = x(n);
					o || n.corked || n.bufferProcessing || !n.bufferedRequest || w(e, n), r ? L(b, e, n, o, a) : b(e, n, o, a)
				}
			}

			function b(e, t, n, r) {
				n || k(e, t), t.pendingcb--, r(), E(e, t)
			}

			function k(e, t) {
				0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"))
			}

			function w(e, t) {
				t.bufferProcessing = !0;
				var n = t.bufferedRequest;
				if(e._writev && n && n.next) {
					var r = t.bufferedRequestCount,
						a = Array(r),
						s = t.corkedRequestsFree;
					s.entry = n;
					for(var i = 0, d = !0; n;) a[i] = n, n.isBuf || (d = !1), n = n.next, i += 1;
					a.allBuffers = d, h(e, t, !0, t.length, a, "", s.finish), t.pendingcb++, t.lastBufferedRequest = null, s.next ? (t.corkedRequestsFree = s.next, s.next = null) : t.corkedRequestsFree = new o(t), t.bufferedRequestCount = 0
				} else {
					for(; n;) {
						var l = n.chunk,
							c = n.encoding,
							u = n.callback,
							p = t.objectMode ? 1 : l.length;
						if(h(e, t, !1, p, l, c, u), n = n.next, t.bufferedRequestCount--, t.writing) break
					}
					null === n && (t.lastBufferedRequest = null)
				}
				t.bufferedRequest = n, t.bufferProcessing = !1
			}

			function x(e) {
				return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
			}

			function S(e, t) {
				e._final(function(n) {
					t.pendingcb--, n && e.emit("error", n), t.prefinished = !0, e.emit("prefinish"), E(e, t)
				})
			}

			function v(e, t) {
				t.prefinished || t.finalCalled || ("function" == typeof e._final ? (t.pendingcb++, t.finalCalled = !0, I.nextTick(S, e, t)) : (t.prefinished = !0, e.emit("prefinish")))
			}

			function E(e, t) {
				var n = x(t);
				return n && (v(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"))), n
			}

			function C(e, t, n) {
				t.ending = !0, E(e, t), n && (t.finished ? I.nextTick(n) : e.once("finish", n)), t.ended = !0, e.writable = !1
			}

			function T(e, t, n) {
				var r = e.entry;
				for(e.entry = null; r;) {
					var a = r.callback;
					t.pendingcb--, a(n), r = r.next
				}
				t.corkedRequestsFree ? t.corkedRequestsFree.next = e : t.corkedRequestsFree = e
			}
			var I = e("process-nextick-args");
			t.exports = c;
			var L = !n.browser && -1 < ["v0.10", "v0.9."].indexOf(n.version.slice(0, 5)) ? a : I.nextTick,
				R;
			c.WritableState = l;
			var B = e("core-util-is");
			B.inherits = e("inherits");
			var A = {
					deprecate: e("util-deprecate")
				},
				O = e("./internal/streams/stream"),
				D = e("safe-buffer").Buffer,
				M = r.Uint8Array || function() {},
				P = e("./internal/streams/destroy");
			B.inherits(c, O), l.prototype.getBuffer = function() {
					for(var e = this.bufferedRequest, t = []; e;) t.push(e), e = e.next;
					return t
				},
				function() {
					try {
						Object.defineProperty(l.prototype, "buffer", {
							get: A.deprecate(function() {
								return this.getBuffer()
							}, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
						})
					} catch(e) {}
				}();
			var U;
			"function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (U = Function.prototype[Symbol.hasInstance], Object.defineProperty(c, Symbol.hasInstance, {
				value: function(e) {
					return !!U.call(this, e) || !(this !== c) && e && e._writableState instanceof l
				}
			})) : U = function(e) {
				return e instanceof this
			}, c.prototype.pipe = function() {
				this.emit("error", new Error("Cannot pipe, not readable"))
			}, c.prototype.write = function(e, t, n) {
				var r = this._writableState,
					a = !1,
					o = !r.objectMode && i(e);
				return o && !D.isBuffer(e) && (e = s(e)), "function" == typeof t && (n = t, t = null), o ? t = "buffer" : !t && (t = r.defaultEncoding), "function" != typeof n && (n = d), r.ended ? u(this, n) : (o || p(this, r, e, n)) && (r.pendingcb++, a = m(this, r, o, e, t, n)), a
			}, c.prototype.cork = function() {
				var e = this._writableState;
				e.corked++
			}, c.prototype.uncork = function() {
				var e = this._writableState;
				e.corked && (e.corked--, !e.writing && !e.corked && !e.finished && !e.bufferProcessing && e.bufferedRequest && w(this, e))
			}, c.prototype.setDefaultEncoding = function(e) {
				if("string" == typeof e && (e = e.toLowerCase()), !(-1 < ["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()))) throw new TypeError("Unknown encoding: " + e);
				return this._writableState.defaultEncoding = e, this
			}, Object.defineProperty(c.prototype, "writableHighWaterMark", {
				enumerable: !1,
				get: function() {
					return this._writableState.highWaterMark
				}
			}), c.prototype._write = function(e, t, n) {
				n(new Error("_write() is not implemented"))
			}, c.prototype._writev = null, c.prototype.end = function(e, t, n) {
				var r = this._writableState;
				"function" == typeof e ? (n = e, e = null, t = null) : "function" == typeof t && (n = t, t = null), null !== e && e !== void 0 && this.write(e, t), r.corked && (r.corked = 1, this.uncork()), r.ending || r.finished || C(this, r, n)
			}, Object.defineProperty(c.prototype, "destroyed", {
				get: function() {
					return void 0 !== this._writableState && this._writableState.destroyed
				},
				set: function(e) {
					this._writableState && (this._writableState.destroyed = e)
				}
			}), c.prototype.destroy = P.destroy, c.prototype._undestroy = P.undestroy, c.prototype._destroy = function(e, t) {
				this.end(), t(e)
			}
		}).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global, e("timers").setImmediate)
	}, {
		"./_stream_duplex": 11,
		"./internal/streams/destroy": 17,
		"./internal/streams/stream": 18,
		_process: 205,
		"core-util-is": 75,
		inherits: 99,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		timers: 301,
		"util-deprecate": 313
	}],
	16: [function(e, t) {
		"use strict";

		function n(e, t) {
			if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function r(e, t, n) {
			e.copy(t, n)
		}
		var a = e("safe-buffer").Buffer,
			o = e("util");
		t.exports = function() {
			function e() {
				n(this, e), this.head = null, this.tail = null, this.length = 0
			}
			return e.prototype.push = function(e) {
				var t = {
					data: e,
					next: null
				};
				0 < this.length ? this.tail.next = t : this.head = t, this.tail = t, ++this.length
			}, e.prototype.unshift = function(e) {
				var t = {
					data: e,
					next: this.head
				};
				0 === this.length && (this.tail = t), this.head = t, ++this.length
			}, e.prototype.shift = function() {
				if(0 !== this.length) {
					var e = this.head.data;
					return this.head = 1 === this.length ? this.tail = null : this.head.next, --this.length, e
				}
			}, e.prototype.clear = function() {
				this.head = this.tail = null, this.length = 0
			}, e.prototype.join = function(e) {
				if(0 === this.length) return "";
				for(var t = this.head, n = "" + t.data; t = t.next;) n += e + t.data;
				return n
			}, e.prototype.concat = function(e) {
				if(0 === this.length) return a.alloc(0);
				if(1 === this.length) return this.head.data;
				for(var t = a.allocUnsafe(e >>> 0), n = this.head, o = 0; n;) r(n.data, t, o), o += n.data.length, n = n.next;
				return t
			}, e
		}(), o && o.inspect && o.inspect.custom && (t.exports.prototype[o.inspect.custom] = function() {
			var e = o.inspect({
				length: this.length
			});
			return this.constructor.name + " " + e
		})
	}, {
		"safe-buffer": 241,
		util: 35
	}],
	17: [function(e, t) {
		"use strict";

		function n(e, t) {
			e.emit("error", t)
		}
		var r = e("process-nextick-args");
		t.exports = {
			destroy: function(e, t) {
				var a = this,
					o = this._readableState && this._readableState.destroyed,
					s = this._writableState && this._writableState.destroyed;
				return o || s ? (t ? t(e) : e && (!this._writableState || !this._writableState.errorEmitted) && r.nextTick(n, this, e), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(e || null, function(e) {
					!t && e ? (r.nextTick(n, a, e), a._writableState && (a._writableState.errorEmitted = !0)) : t && t(e)
				}), this)
			},
			undestroy: function() {
				this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
			}
		}
	}, {
		"process-nextick-args": 204
	}],
	18: [function(e, t) {
		t.exports = e("events").EventEmitter
	}, {
		events: 82
	}],
	19: [function(e, t, n) {
		n = t.exports = e("./lib/_stream_readable.js"), n.Stream = n, n.Readable = n, n.Writable = e("./lib/_stream_writable.js"), n.Duplex = e("./lib/_stream_duplex.js"), n.Transform = e("./lib/_stream_transform.js"), n.PassThrough = e("./lib/_stream_passthrough.js")
	}, {
		"./lib/_stream_duplex.js": 11,
		"./lib/_stream_passthrough.js": 12,
		"./lib/_stream_readable.js": 13,
		"./lib/_stream_transform.js": 14,
		"./lib/_stream_writable.js": 15
	}],
	20: [function(e, t) {
		(function(n) {
			function r(e) {
				function t(e) {
					n.nextTick(function() {
						i.emit("warning", e)
					})
				}
				var i = this;
				if(!(i instanceof r)) return new r(e);
				if(s.call(i), e || (e = {}), !e.peerId) throw new Error("Option `peerId` is required");
				if(!e.infoHash) throw new Error("Option `infoHash` is required");
				if(!e.announce) throw new Error("Option `announce` is required");
				if(!n.browser && !e.port) throw new Error("Option `port` is required");
				i.peerId = "string" == typeof e.peerId ? e.peerId : e.peerId.toString("hex"), i._peerIdBuffer = a.from(i.peerId, "hex"), i._peerIdBinary = i._peerIdBuffer.toString("binary"), i.infoHash = "string" == typeof e.infoHash ? e.infoHash.toLowerCase() : e.infoHash.toString("hex"), i._infoHashBuffer = a.from(i.infoHash, "hex"), i._infoHashBinary = i._infoHashBuffer.toString("binary"), o("new client %s", i.infoHash), i.destroyed = !1, i._port = e.port, i._getAnnounceOpts = e.getAnnounceOpts, i._rtcConfig = e.rtcConfig, i._userAgent = e.userAgent, i._wrtc = "function" == typeof e.wrtc ? e.wrtc() : e.wrtc;
				var d = "string" == typeof e.announce ? [e.announce] : null == e.announce ? [] : e.announce;
				d = d.map(function(e) {
					return e = e.toString(), "/" === e[e.length - 1] && (e = e.substring(0, e.length - 1)), e
				}), d = p(d);
				var l = !1 !== i._wrtc && (!!i._wrtc || u.WEBRTC_SUPPORT);
				i._trackers = d.map(function(e) {
					var n = f.parse(e).protocol;
					return("http:" === n || "https:" === n) && "function" == typeof h ? new h(i, e) : "udp:" === n && "function" == typeof _ ? new _(i, e) : ("ws:" === n || "wss:" === n) && l ? "ws:" === n && "undefined" != typeof window && "https:" === window.location.protocol ? (t(new Error("Unsupported tracker protocol: " + e)), null) : new g(i, e) : (t(new Error("Unsupported tracker protocol: " + e)), null)
				}).filter(Boolean)
			}
			t.exports = r;
			var a = e("safe-buffer").Buffer,
				o = e("debug")("bittorrent-tracker:client"),
				s = e("events").EventEmitter,
				i = e("xtend"),
				d = e("inherits"),
				l = e("once"),
				c = e("run-parallel"),
				u = e("simple-peer"),
				p = e("uniq"),
				f = e("url"),
				m = e("./lib/common"),
				h = e("./lib/client/http-tracker"),
				_ = e("./lib/client/udp-tracker"),
				g = e("./lib/client/websocket-tracker");
			d(r, s), r.scrape = function(e, t) {
				if(t = l(t), !e.infoHash) throw new Error("Option `infoHash` is required");
				if(!e.announce) throw new Error("Option `announce` is required");
				var n = i(e, {
						infoHash: Array.isArray(e.infoHash) ? e.infoHash[0] : e.infoHash,
						peerId: a.from("01234567890123456789"),
						port: 6881
					}),
					o = new r(n);
				o.once("error", t), o.once("warning", t);
				var s = Array.isArray(e.infoHash) ? e.infoHash.length : 1,
					d = {};
				return o.on("scrape", function(e) {
					if(s -= 1, d[e.infoHash] = e, 0 === s) {
						o.destroy();
						var n = Object.keys(d);
						1 === n.length ? t(null, d[n[0]]) : t(null, d)
					}
				}), e.infoHash = Array.isArray(e.infoHash) ? e.infoHash.map(function(e) {
					return a.from(e, "hex")
				}) : a.from(e.infoHash, "hex"), o.scrape({
					infoHash: e.infoHash
				}), o
			}, r.prototype.start = function(e) {
				var t = this;
				o("send `start`"), e = t._defaultAnnounceOpts(e), e.event = "started", t._announce(e), t._trackers.forEach(function(e) {
					e.setInterval()
				})
			}, r.prototype.stop = function(e) {
				var t = this;
				o("send `stop`"), e = t._defaultAnnounceOpts(e), e.event = "stopped", t._announce(e)
			}, r.prototype.complete = function(e) {
				var t = this;
				o("send `complete`"), e || (e = {}), e = t._defaultAnnounceOpts(e), e.event = "completed", t._announce(e)
			}, r.prototype.update = function(e) {
				var t = this;
				o("send `update`"), e = t._defaultAnnounceOpts(e), e.event && delete e.event, t._announce(e)
			}, r.prototype._announce = function(e) {
				var t = this;
				t._trackers.forEach(function(t) {
					t.announce(e)
				})
			}, r.prototype.scrape = function(e) {
				var t = this;
				o("send `scrape`"), e || (e = {}), t._trackers.forEach(function(t) {
					t.scrape(e)
				})
			}, r.prototype.setInterval = function(e) {
				var t = this;
				o("setInterval %d", e), t._trackers.forEach(function(t) {
					t.setInterval(e)
				})
			}, r.prototype.destroy = function(e) {
				var t = this;
				if(!t.destroyed) {
					t.destroyed = !0, o("destroy");
					var n = t._trackers.map(function(e) {
						return function(t) {
							e.destroy(t)
						}
					});
					c(n, e), t._trackers = [], t._getAnnounceOpts = null
				}
			}, r.prototype._defaultAnnounceOpts = function(e) {
				var t = this;
				return e || (e = {}), null == e.numwant && (e.numwant = m.DEFAULT_ANNOUNCE_PEERS), null == e.uploaded && (e.uploaded = 0), null == e.downloaded && (e.downloaded = 0), t._getAnnounceOpts && (e = i(e, t._getAnnounceOpts())), e
			}
		}).call(this, e("_process"))
	}, {
		"./lib/client/http-tracker": 35,
		"./lib/client/udp-tracker": 35,
		"./lib/client/websocket-tracker": 22,
		"./lib/common": 23,
		_process: 205,
		debug: 77,
		events: 82,
		inherits: 99,
		once: 182,
		"run-parallel": 239,
		"safe-buffer": 241,
		"simple-peer": 244,
		uniq: 307,
		url: 310,
		xtend: 325
	}],
	21: [function(e, t) {
		function n(e, t) {
			var n = this;
			r.call(n), n.client = e, n.announceUrl = t, n.interval = null, n.destroyed = !1
		}
		t.exports = n;
		var r = e("events").EventEmitter,
			a = e("inherits");
		a(n, r), n.prototype.setInterval = function(e) {
			var t = this;
			null == e && (e = t.DEFAULT_ANNOUNCE_INTERVAL), clearInterval(t.interval), e && (t.interval = setInterval(function() {
				t.announce(t.client._defaultAnnounceOpts())
			}, e), t.interval.unref && t.interval.unref())
		}
	}, {
		events: 82,
		inherits: 99
	}],
	22: [function(e, t) {
		function n(e, t) {
			var n = this;
			p.call(n, e, t), o("new websocket tracker %s", t), n.peers = {}, n.socket = null, n.reconnecting = !1, n.retries = 0, n.reconnectTimer = null, n.expectingResponse = !1, n._openSocket()
		}

		function r() {}
		var a = Math.min;
		t.exports = n;
		var o = e("debug")("bittorrent-tracker:websocket-tracker"),
			s = e("xtend"),
			i = e("inherits"),
			d = e("simple-peer"),
			l = e("randombytes"),
			c = e("simple-websocket"),
			u = e("../common"),
			p = e("./tracker"),
			f = {};
		n._socketPool = f;
		i(n, p), n.prototype.DEFAULT_ANNOUNCE_INTERVAL = 30000, n.prototype.announce = function(e) {
			var t = this;
			if(!(t.destroyed || t.reconnecting)) {
				if(!t.socket.connected) return void t.socket.once("connect", function() {
					t.announce(e)
				});
				var n = s(e, {
					action: "announce",
					info_hash: t.client._infoHashBinary,
					peer_id: t.client._peerIdBinary
				});
				if(t._trackerId && (n.trackerid = t._trackerId), "stopped" === e.event || "completed" === e.event) t._send(n);
				else {
					var r = a(e.numwant, 10);
					t._generateOffers(r, function(e) {
						n.numwant = r, n.offers = e, t._send(n)
					})
				}
			}
		}, n.prototype.scrape = function(e) {
			var t = this;
			if(!(t.destroyed || t.reconnecting)) {
				if(!t.socket.connected) return void t.socket.once("connect", function() {
					t.scrape(e)
				});
				var n = Array.isArray(e.infoHash) && 0 < e.infoHash.length ? e.infoHash.map(function(e) {
					return e.toString("binary")
				}) : e.infoHash && e.infoHash.toString("binary") || t.client._infoHashBinary;
				t._send({
					action: "scrape",
					info_hash: n
				})
			}
		}, n.prototype.destroy = function(e) {
			function t() {
				i && (clearTimeout(i), i = null), s.removeListener("data", t), s.destroy(), s = null
			}
			var n = this;
			if(e || (e = r), n.destroyed) return e(null);
			for(var a in n.destroyed = !0, clearInterval(n.interval), clearTimeout(n.reconnectTimer), n.peers) {
				var o = n.peers[a];
				clearTimeout(o.trackerTimeout), o.destroy()
			}
			if(n.peers = null, n.socket && (n.socket.removeListener("connect", n._onSocketConnectBound), n.socket.removeListener("data", n._onSocketDataBound), n.socket.removeListener("close", n._onSocketCloseBound), n.socket.removeListener("error", n._onSocketErrorBound), n.socket = null), n._onSocketConnectBound = null, n._onSocketErrorBound = null, n._onSocketDataBound = null, n._onSocketCloseBound = null, f[n.announceUrl] && (f[n.announceUrl].consumers -= 1), 0 < f[n.announceUrl].consumers) return e();
			var s = f[n.announceUrl];
			if(delete f[n.announceUrl], s.on("error", r), s.once("close", e), !n.expectingResponse) return t();
			var i = setTimeout(t, u.DESTROY_TIMEOUT);
			s.once("data", t)
		}, n.prototype._openSocket = function() {
			var e = this;
			e.destroyed = !1, e.peers || (e.peers = {}), e._onSocketConnectBound = function() {
				e._onSocketConnect()
			}, e._onSocketErrorBound = function(t) {
				e._onSocketError(t)
			}, e._onSocketDataBound = function(t) {
				e._onSocketData(t)
			}, e._onSocketCloseBound = function() {
				e._onSocketClose()
			}, e.socket = f[e.announceUrl], e.socket ? f[e.announceUrl].consumers += 1 : (e.socket = f[e.announceUrl] = new c(e.announceUrl), e.socket.consumers = 1, e.socket.once("connect", e._onSocketConnectBound)), e.socket.on("data", e._onSocketDataBound), e.socket.once("close", e._onSocketCloseBound), e.socket.once("error", e._onSocketErrorBound)
		}, n.prototype._onSocketConnect = function() {
			var e = this;
			e.destroyed || e.reconnecting && (e.reconnecting = !1, e.retries = 0, e.announce(e.client._defaultAnnounceOpts()))
		}, n.prototype._onSocketData = function(e) {
			var t = this;
			if(!t.destroyed) {
				t.expectingResponse = !1;
				try {
					e = JSON.parse(e)
				} catch(e) {
					return void t.client.emit("warning", new Error("Invalid tracker response"))
				}
				"announce" === e.action ? t._onAnnounceResponse(e) : "scrape" === e.action ? t._onScrapeResponse(e) : t._onSocketError(new Error("invalid action in WS response: " + e.action))
			}
		}, n.prototype._onAnnounceResponse = function(e) {
			var t = this;
			if(e.info_hash !== t.client._infoHashBinary) return void o("ignoring websocket data from %s for %s (looking for %s: reused socket)", t.announceUrl, u.binaryToHex(e.info_hash), t.client.infoHash);
			if(!(e.peer_id && e.peer_id === t.client._peerIdBinary)) {
				o("received %s from %s for %s", JSON.stringify(e), t.announceUrl, t.client.infoHash);
				var n = e["failure reason"];
				if(n) return t.client.emit("warning", new Error(n));
				var r = e["warning message"];
				r && t.client.emit("warning", new Error(r));
				var a = e.interval || e["min interval"];
				a && t.setInterval(1e3 * a);
				var s = e["tracker id"];
				if(s && (t._trackerId = s), null != e.complete) {
					var i = Object.assign({}, e, {
						announce: t.announceUrl,
						infoHash: u.binaryToHex(e.info_hash)
					});
					t.client.emit("update", i)
				}
				var d;
				if(e.offer && e.peer_id && (o("creating peer (from remote offer)"), d = t._createPeer(), d.id = u.binaryToHex(e.peer_id), d.once("signal", function(n) {
						var r = {
							action: "announce",
							info_hash: t.client._infoHashBinary,
							peer_id: t.client._peerIdBinary,
							to_peer_id: e.peer_id,
							answer: n,
							offer_id: e.offer_id
						};
						t._trackerId && (r.trackerid = t._trackerId), t._send(r)
					}), d.signal(e.offer), t.client.emit("peer", d)), e.answer && e.peer_id) {
					var l = u.binaryToHex(e.offer_id);
					d = t.peers[l], d ? (d.id = u.binaryToHex(e.peer_id), d.signal(e.answer), t.client.emit("peer", d), clearTimeout(d.trackerTimeout), d.trackerTimeout = null, delete t.peers[l]) : o("got unexpected answer: " + JSON.stringify(e.answer))
				}
			}
		}, n.prototype._onScrapeResponse = function(e) {
			var t = this;
			e = e.files || {};
			var n = Object.keys(e);
			return 0 === n.length ? void t.client.emit("warning", new Error("invalid scrape response")) : void n.forEach(function(n) {
				var r = Object.assign(e[n], {
					announce: t.announceUrl,
					infoHash: u.binaryToHex(n)
				});
				t.client.emit("scrape", r)
			})
		}, n.prototype._onSocketClose = function() {
			var e = this;
			e.destroyed || (e.destroy(), e._startReconnectTimer())
		}, n.prototype._onSocketError = function(e) {
			var t = this;
			t.destroyed || (t.destroy(), t.client.emit("warning", e), t._startReconnectTimer())
		}, n.prototype._startReconnectTimer = function() {
			var e = this,
				t = Math.floor(Math.random() * 30000) + a(Math.pow(2, e.retries) * 15000, 1800000);
			e.reconnecting = !0, clearTimeout(e.reconnectTimer), e.reconnectTimer = setTimeout(function() {
				e.retries++, e._openSocket()
			}, t), e.reconnectTimer.unref && e.reconnectTimer.unref(), o("reconnecting socket in %s ms", t)
		}, n.prototype._send = function(e) {
			var t = this;
			if(!t.destroyed) {
				t.expectingResponse = !0;
				var n = JSON.stringify(e);
				o("send %s", n), t.socket.send(n)
			}
		}, n.prototype._generateOffers = function(e, t) {
			function n() {
				var e = l(20).toString("hex");
				o("creating peer (from _generateOffers)");
				var t = a.peers[e] = a._createPeer({
					initiator: !0
				});
				t.once("signal", function(t) {
					s.push({
						offer: t,
						offer_id: u.hexToBinary(e)
					}), r()
				}), t.trackerTimeout = setTimeout(function() {
					o("tracker timeout: destroying peer"), t.trackerTimeout = null, delete a.peers[e], t.destroy()
				}, 50000), t.trackerTimeout.unref && t.trackerTimeout.unref()
			}

			function r() {
				s.length === e && (o("generated %s offers", e), t(s))
			}
			var a = this,
				s = [];
			o("generating %s offers", e);
			for(var d = 0; d < e; ++d) n();
			r()
		}, n.prototype._createPeer = function(e) {
			function t(e) {
				r.client.emit("warning", new Error("Connection error: " + e.message)), a.destroy()
			}

			function n() {
				a.removeListener("error", t), a.removeListener("connect", n)
			}
			var r = this;
			e = Object.assign({
				trickle: !1,
				config: r.client._rtcConfig,
				wrtc: r.client._wrtc
			}, e);
			var a = new d(e);
			return a.once("error", t), a.once("connect", n), a
		}
	}, {
		"../common": 23,
		"./tracker": 21,
		debug: 77,
		inherits: 99,
		randombytes: 212,
		"simple-peer": 244,
		"simple-websocket": 255,
		xtend: 325
	}],
	23: [function(e, t, n) {
		var r = e("safe-buffer").Buffer,
			a = e("xtend/mutable");
		n.DEFAULT_ANNOUNCE_PEERS = 50, n.MAX_ANNOUNCE_PEERS = 82, n.binaryToHex = function(e) {
			return "string" != typeof e && (e += ""), r.from(e, "binary").toString("hex")
		}, n.hexToBinary = function(e) {
			return "string" != typeof e && (e += ""), r.from(e, "hex").toString("binary")
		};
		var o = e("./common-node");
		a(n, o)
	}, {
		"./common-node": 35,
		"safe-buffer": 241,
		"xtend/mutable": 326
	}],
	24: [function(e, t) {
		(function(n) {
			t.exports = function(e, t) {
				function r(o) {
					a.removeEventListener("loadend", r, !1), o.error ? t(o.error) : t(null, n.from(a.result))
				}
				if("undefined" == typeof Blob || !(e instanceof Blob)) throw new Error("first argument must be a Blob");
				if("function" != typeof t) throw new Error("second argument must be a function");
				var a = new FileReader;
				a.addEventListener("loadend", r, !1), a.readAsArrayBuffer(e)
			}
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41
	}],
	25: [function(e, t) {
		(function(n) {
			function r(e, t) {
				return this instanceof r ? void(o.call(this), !t && (t = {}), "object" == typeof e && (t = e, e = t.size), this.size = e || 512, this._zeroPadding = !t.nopad && s(t.zeroPadding, !0), this._buffered = [], this._bufferedBytes = 0) : new r(e, t)
			}
			var a = e("inherits"),
				o = e("readable-stream").Transform,
				s = e("defined");
			t.exports = r, a(r, o), r.prototype._transform = function(e, t, r) {
				for(this._bufferedBytes += e.length, this._buffered.push(e); this._bufferedBytes >= this.size;) {
					var a = n.concat(this._buffered);
					this._bufferedBytes -= this.size, this.push(a.slice(0, this.size)), this._buffered = [a.slice(this.size, a.length)]
				}
				r()
			}, r.prototype._flush = function() {
				if(this._bufferedBytes && this._zeroPadding) {
					var e = new n(this.size - this._bufferedBytes);
					e.fill(0), this._buffered.push(e), this.push(n.concat(this._buffered)), this._buffered = null
				} else this._bufferedBytes && (this.push(n.concat(this._buffered)), this._buffered = null);
				this.push(null)
			}
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41,
		defined: 79,
		inherits: 99,
		"readable-stream": 34
	}],
	26: [function(e, t, n) {
		arguments[4][11][0].apply(n, arguments)
	}, {
		"./_stream_readable": 28,
		"./_stream_writable": 30,
		"core-util-is": 75,
		dup: 11,
		inherits: 99,
		"process-nextick-args": 204
	}],
	27: [function(e, t, n) {
		arguments[4][12][0].apply(n, arguments)
	}, {
		"./_stream_transform": 29,
		"core-util-is": 75,
		dup: 12,
		inherits: 99
	}],
	28: [function(e, t, n) {
		arguments[4][13][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 26,
		"./internal/streams/BufferList": 31,
		"./internal/streams/destroy": 32,
		"./internal/streams/stream": 33,
		_process: 205,
		"core-util-is": 75,
		dup: 13,
		events: 82,
		inherits: 99,
		isarray: 104,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		"string_decoder/": 296,
		util: 35
	}],
	29: [function(e, t, n) {
		arguments[4][14][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 26,
		"core-util-is": 75,
		dup: 14,
		inherits: 99
	}],
	30: [function(e, t, n) {
		arguments[4][15][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 26,
		"./internal/streams/destroy": 32,
		"./internal/streams/stream": 33,
		_process: 205,
		"core-util-is": 75,
		dup: 15,
		inherits: 99,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		timers: 301,
		"util-deprecate": 313
	}],
	31: [function(e, t, n) {
		arguments[4][16][0].apply(n, arguments)
	}, {
		dup: 16,
		"safe-buffer": 241,
		util: 35
	}],
	32: [function(e, t, n) {
		arguments[4][17][0].apply(n, arguments)
	}, {
		dup: 17,
		"process-nextick-args": 204
	}],
	33: [function(e, t, n) {
		arguments[4][18][0].apply(n, arguments)
	}, {
		dup: 18,
		events: 82
	}],
	34: [function(e, t, n) {
		arguments[4][19][0].apply(n, arguments)
	}, {
		"./lib/_stream_duplex.js": 26,
		"./lib/_stream_passthrough.js": 27,
		"./lib/_stream_readable.js": 28,
		"./lib/_stream_transform.js": 29,
		"./lib/_stream_writable.js": 30,
		dup: 19
	}],
	35: [function() {}, {}],
	36: [function(e, t, n) {
		arguments[4][35][0].apply(n, arguments)
	}, {
		dup: 35
	}],
	37: [function(e, t) {
		(function(e) {
			t.exports = function(t) {
				if("number" != typeof t) throw new TypeError("\"size\" argument must be a number");
				if(0 > t) throw new RangeError("\"size\" argument must not be negative");
				return e.allocUnsafe ? e.allocUnsafe(t) : new e(t)
			}
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41
	}],
	38: [function(e, t) {
		(function(n) {
			var r = e("buffer-fill"),
				a = e("buffer-alloc-unsafe");
			t.exports = function(e, t, o) {
				if("number" != typeof e) throw new TypeError("\"size\" argument must be a number");
				if(0 > e) throw new RangeError("\"size\" argument must not be negative");
				if(n.alloc) return n.alloc(e, t, o);
				var s = a(e);
				return 0 === e ? s : void 0 === t ? r(s, 0) : ("string" != typeof o && (o = void 0), r(s, t, o))
			}
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41,
		"buffer-alloc-unsafe": 37,
		"buffer-fill": 39
	}],
	39: [function(e, t) {
		(function(e) {
			function n(e) {
				return 1 === e.length && 256 > e.charCodeAt(0)
			}

			function r(e, t, n, r) {
				if(0 > n || r > e.length) throw new RangeError("Out of range index");
				return n >>>= 0, r = void 0 === r ? e.length : r >>> 0, r > n && e.fill(t, n, r), e
			}

			function a(e, t, n, r) {
				if(0 > n || r > e.length) throw new RangeError("Out of range index");
				if(r <= n) return e;
				n >>>= 0, r = void 0 === r ? e.length : r >>> 0;
				for(var a = n, o = t.length; a <= r - o;) t.copy(e, a), a += o;
				return a !== r && t.copy(e, a, 0, r - a), e
			}
			var o = function() {
				try {
					if(!e.isEncoding("latin1")) return !1;
					var t = e.alloc ? e.alloc(4) : new e(4);
					return t.fill("ab", "ucs2"), "61006200" === t.toString("hex")
				} catch(e) {
					return !1
				}
			}();
			t.exports = function(t, s, i, d, l) {
				if(o) return t.fill(s, i, d, l);
				if("number" == typeof s) return r(t, s, i, d);
				if("string" == typeof s) {
					if("string" == typeof i ? (l = i, i = 0, d = t.length) : "string" == typeof d && (l = d, d = t.length), void 0 !== l && "string" != typeof l) throw new TypeError("encoding must be a string");
					if("latin1" === l && (l = "binary"), "string" == typeof l && !e.isEncoding(l)) throw new TypeError("Unknown encoding: " + l);
					if("" === s) return r(t, 0, i, d);
					if(n(s)) return r(t, s.charCodeAt(0), i, d);
					s = new e(s, l)
				}
				return e.isBuffer(s) ? a(t, s, i, d) : r(t, 0, i, d)
			}
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41
	}],
	40: [function(e, t) {
		(function(e) {
			function n(e) {
				return "ArrayBuffer" === o.call(e).slice(8, -1)
			}

			function r(t, n, r) {
				n >>>= 0;
				var a = t.byteLength - n;
				if(0 > a) throw new RangeError("'offset' is out of bounds");
				if(void 0 === r) r = a;
				else if(r >>>= 0, r > a) throw new RangeError("'length' is out of bounds");
				return s ? e.from(t.slice(n, n + r)) : new e(new Uint8Array(t.slice(n, n + r)))
			}

			function a(t, n) {
				if(("string" != typeof n || "" === n) && (n = "utf8"), !e.isEncoding(n)) throw new TypeError("\"encoding\" must be a valid string encoding");
				return s ? e.from(t, n) : new e(t, n)
			}
			var o = Object.prototype.toString,
				s = "function" == typeof e.alloc && "function" == typeof e.allocUnsafe && "function" == typeof e.from;
			t.exports = function(t, o, i) {
				if("number" == typeof t) throw new TypeError("\"value\" argument must not be a number");
				return n(t) ? r(t, o, i) : "string" == typeof t ? a(t, o) : s ? e.from(t) : new e(t)
			}
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41
	}],
	41: [function(e, t, n) {
		"use strict";

		function r(e) {
			if(2147483647 < e) throw new RangeError("The value \"" + e + "\" is invalid for option \"size\"");
			var t = new Uint8Array(e);
			return t.__proto__ = o.prototype, t
		}

		function o(e, t, n) {
			if("number" == typeof e) {
				if("string" == typeof t) throw new TypeError("The \"string\" argument must be of type string. Received type number");
				return d(e)
			}
			return a(e, t, n)
		}

		function a(e, t, n) {
			if("string" == typeof e) return l(e, t);
			if(ArrayBuffer.isView(e)) return c(e);
			if(null == e) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
			if(q(e, ArrayBuffer) || e && q(e.buffer, ArrayBuffer)) return u(e, t, n);
			if("number" == typeof e) throw new TypeError("The \"value\" argument must not be of type number. Received type number");
			var r = e.valueOf && e.valueOf();
			if(null != r && r !== e) return o.from(r, t, n);
			var a = p(e);
			if(a) return a;
			if("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return o.from(e[Symbol.toPrimitive]("string"), t, n);
			throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
		}

		function s(e) {
			if("number" != typeof e) throw new TypeError("\"size\" argument must be of type number");
			else if(0 > e) throw new RangeError("The value \"" + e + "\" is invalid for option \"size\"")
		}

		function i(e, t, n) {
			return s(e), 0 >= e ? r(e) : void 0 === t ? r(e) : "string" == typeof n ? r(e).fill(t, n) : r(e).fill(t)
		}

		function d(e) {
			return s(e), r(0 > e ? 0 : 0 | f(e))
		}

		function l(e, t) {
			if(("string" != typeof t || "" === t) && (t = "utf8"), !o.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
			var n = 0 | m(e, t),
				a = r(n),
				s = a.write(e, t);
			return s !== n && (a = a.slice(0, s)), a
		}

		function c(e) {
			for(var t = 0 > e.length ? 0 : 0 | f(e.length), n = r(t), a = 0; a < t; a += 1) n[a] = 255 & e[a];
			return n
		}

		function u(e, t, n) {
			if(0 > t || e.byteLength < t) throw new RangeError("\"offset\" is outside of buffer bounds");
			if(e.byteLength < t + (n || 0)) throw new RangeError("\"length\" is outside of buffer bounds");
			var r;
			return r = void 0 === t && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, t) : new Uint8Array(e, t, n), r.__proto__ = o.prototype, r
		}

		function p(e) {
			if(o.isBuffer(e)) {
				var t = 0 | f(e.length),
					n = r(t);
				return 0 === n.length ? n : (e.copy(n, 0, 0, t), n)
			}
			return void 0 === e.length ? "Buffer" === e.type && Array.isArray(e.data) ? c(e.data) : void 0 : "number" != typeof e.length || Y(e.length) ? r(0) : c(e)
		}

		function f(e) {
			if(e >= 2147483647){
				throw new Error("Attempt to allocate Buffer larger than maximum size: 0x" + "2147483647".toString(16) + " bytes");
			}
			return 0 | e
		}

		function m(e, t) {
			if(o.isBuffer(e)) return e.length;
			if(ArrayBuffer.isView(e) || q(e, ArrayBuffer)) return e.byteLength;
			if("string" != typeof e) throw new TypeError("The \"string\" argument must be one of type string, Buffer, or ArrayBuffer. Received type " + typeof e);
			var n = e.length,
				r = 2 < arguments.length && !0 === arguments[2];
			if(!r && 0 === n) return 0;
			for(var a = !1;;) switch(t) {
				case "ascii":
				case "latin1":
				case "binary":
					return n;
				case "utf8":
				case "utf-8":
					return N(e).length;
				case "ucs2":
				case "ucs-2":
				case "utf16le":
				case "utf-16le":
					return 2 * n;
				case "hex":
					return n >>> 1;
				case "base64":
					return F(e).length;
				default:
					if(a) return r ? -1 : N(e).length;
					t = ("" + t).toLowerCase(), a = !0;
			}
		}

		function h(e, t, n) {
			var r = !1;
			if((void 0 === t || 0 > t) && (t = 0), t > this.length) return "";
			if((void 0 === n || n > this.length) && (n = this.length), 0 >= n) return "";
			if(n >>>= 0, t >>>= 0, n <= t) return "";
			for(e || (e = "utf8");;) switch(e) {
				case "hex":
					return R(this, t, n);
				case "utf8":
				case "utf-8":
					return C(this, t, n);
				case "ascii":
					return I(this, t, n);
				case "latin1":
				case "binary":
					return L(this, t, n);
				case "base64":
					return E(this, t, n);
				case "ucs2":
				case "ucs-2":
				case "utf16le":
				case "utf-16le":
					return B(this, t, n);
				default:
					if(r) throw new TypeError("Unknown encoding: " + e);
					e = (e + "").toLowerCase(), r = !0;
			}
		}

		function _(e, t, n) {
			var r = e[t];
			e[t] = e[n], e[n] = r
		}

		function g(e, t, n, r, a) {
			if(0 === e.length) return -1;
			if("string" == typeof n ? (r = n, n = 0) : 2147483647 < n ? n = 2147483647 : -2147483648 > n && (n = -2147483648), n = +n, Y(n) && (n = a ? 0 : e.length - 1), 0 > n && (n = e.length + n), n >= e.length) {
				if(a) return -1;
				n = e.length - 1
			} else if(0 > n)
				if(a) n = 0;
				else return -1;
			if("string" == typeof t && (t = o.from(t, r)), o.isBuffer(t)) return 0 === t.length ? -1 : y(e, t, n, r, a);
			if("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? a ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : y(e, [t], n, r, a);
			throw new TypeError("val must be string, number or Buffer")
		}

		function y(e, t, n, r, a) {
			function o(e, t) {
				return 1 === s ? e[t] : e.readUInt16BE(t * s)
			}
			var s = 1,
				d = e.length,
				l = t.length;
			if(void 0 !== r && (r = (r + "").toLowerCase(), "ucs2" === r || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
				if(2 > e.length || 2 > t.length) return -1;
				s = 2, d /= 2, l /= 2, n /= 2
			}
			var c;
			if(a) {
				var u = -1;
				for(c = n; c < d; c++)
					if(o(e, c) !== o(t, -1 === u ? 0 : c - u)) - 1 !== u && (c -= c - u), u = -1;
					else if(-1 === u && (u = c), c - u + 1 === l) return u * s
			} else
				for(n + l > d && (n = d - l), c = n; 0 <= c; c--) {
					for(var p = !0, f = 0; f < l; f++)
						if(o(e, c + f) !== o(t, f)) {
							p = !1;
							break
						}
					if(p) return c
				}
			return -1
		}

		function b(e, t, n, r) {
			n = +n || 0;
			var a = e.length - n;
			r ? (r = +r, r > a && (r = a)) : r = a;
			var o = t.length;
			r > o / 2 && (r = o / 2);
			for(var s = 0, d; s < r; ++s) {
				if(d = parseInt(t.substr(2 * s, 2), 16), Y(d)) return s;
				e[n + s] = d
			}
			return s
		}

		function k(e, t, n, r) {
			return W(N(t, e.length - n), e, n, r)
		}

		function w(e, t, n, r) {
			return W(z(t), e, n, r)
		}

		function x(e, t, n, r) {
			return w(e, t, n, r)
		}

		function S(e, t, n, r) {
			return W(F(t), e, n, r)
		}

		function v(e, t, n, r) {
			return W(H(t, e.length - n), e, n, r)
		}

		function E(e, t, n) {
			return 0 === t && n === e.length ? K.fromByteArray(e) : K.fromByteArray(e.slice(t, n))
		}

		function C(e, t, n) {
			n = V(e.length, n);
			for(var r = [], a = t; a < n;) {
				var o = e[a],
					s = null,
					d = 239 < o ? 4 : 223 < o ? 3 : 191 < o ? 2 : 1;
				if(a + d <= n) {
					var l, c, u, p;
					1 === d ? 128 > o && (s = o) : 2 === d ? (l = e[a + 1], 128 == (192 & l) && (p = (31 & o) << 6 | 63 & l, 127 < p && (s = p))) : 3 === d ? (l = e[a + 1], c = e[a + 2], 128 == (192 & l) && 128 == (192 & c) && (p = (15 & o) << 12 | (63 & l) << 6 | 63 & c, 2047 < p && (55296 > p || 57343 < p) && (s = p))) : 4 === d ? (l = e[a + 1], c = e[a + 2], u = e[a + 3], 128 == (192 & l) && 128 == (192 & c) && 128 == (192 & u) && (p = (15 & o) << 18 | (63 & l) << 12 | (63 & c) << 6 | 63 & u, 65535 < p && 1114112 > p && (s = p))) : void 0
				}
				null === s ? (s = 65533, d = 1) : 65535 < s && (s -= 65536, r.push(55296 | 1023 & s >>> 10), s = 56320 | 1023 & s), r.push(s), a += d
			}
			return T(r)
		}

		function T(e) {
			var t = e.length;
			if(t <= 4096) return Z.apply(String, e);
			for(var n = "", r = 0; r < t;) n += Z.apply(String, e.slice(r, r += 4096));
			return n
		}

		function I(e, t, n) {
			var r = "";
			n = V(e.length, n);
			for(var a = t; a < n; ++a) r += Z(127 & e[a]);
			return r
		}

		function L(e, t, n) {
			var r = "";
			n = V(e.length, n);
			for(var a = t; a < n; ++a) r += Z(e[a]);
			return r
		}

		function R(e, t, n) {
			var r = e.length;
			(!t || 0 > t) && (t = 0), (!n || 0 > n || n > r) && (n = r);
			for(var a = "", o = t; o < n; ++o) a += j(e[o]);
			return a
		}

		function B(e, t, n) {
			for(var r = e.slice(t, n), a = "", o = 0; o < r.length; o += 2) a += Z(r[o] + 256 * r[o + 1]);
			return a
		}

		function A(e, t, n) {
			if(0 != e % 1 || 0 > e) throw new RangeError("offset is not uint");
			if(e + t > n) throw new RangeError("Trying to access beyond buffer length")
		}

		function O(e, t, n, r, a, s) {
			if(!o.isBuffer(e)) throw new TypeError("\"buffer\" argument must be a Buffer instance");
			if(t > a || t < s) throw new RangeError("\"value\" argument is out of bounds");
			if(n + r > e.length) throw new RangeError("Index out of range")
		}

		function D(e, t, n, r) {
			if(n + r > e.length) throw new RangeError("Index out of range");
			if(0 > n) throw new RangeError("Index out of range")
		}

		function M(e, t, n, r, a) {
			return t = +t, n >>>= 0, a || D(e, t, n, 4, 34028234663852886e22, -34028234663852886e22), X.write(e, t, n, r, 23, 4), n + 4
		}

		function P(e, t, n, r, a) {
			return t = +t, n >>>= 0, a || D(e, t, n, 8, 17976931348623157e292, -17976931348623157e292), X.write(e, t, n, r, 52, 8), n + 8
		}

		function U(e) {
			if(e = e.split("=")[0], e = e.trim().replace(J, ""), 2 > e.length) return "";
			for(; 0 != e.length % 4;) e += "=";
			return e
		}

		function j(e) {
			return 16 > e ? "0" + e.toString(16) : e.toString(16)
		}

		function N(e, t) {
			t = t || 1 / 0;
			for(var n = e.length, r = null, a = [], o = 0, s; o < n; ++o) {
				if(s = e.charCodeAt(o), 55295 < s && 57344 > s) {
					if(!r) {
						if(56319 < s) {
							-1 < (t -= 3) && a.push(239, 191, 189);
							continue
						} else if(o + 1 === n) {
							-1 < (t -= 3) && a.push(239, 191, 189);
							continue
						}
						r = s;
						continue
					}
					if(56320 > s) {
						-1 < (t -= 3) && a.push(239, 191, 189), r = s;
						continue
					}
					s = (r - 55296 << 10 | s - 56320) + 65536
				} else r && -1 < (t -= 3) && a.push(239, 191, 189);
				if(r = null, 128 > s) {
					if(0 > (t -= 1)) break;
					a.push(s)
				} else if(2048 > s) {
					if(0 > (t -= 2)) break;
					a.push(192 | s >> 6, 128 | 63 & s)
				} else if(65536 > s) {
					if(0 > (t -= 3)) break;
					a.push(224 | s >> 12, 128 | 63 & s >> 6, 128 | 63 & s)
				} else if(1114112 > s) {
					if(0 > (t -= 4)) break;
					a.push(240 | s >> 18, 128 | 63 & s >> 12, 128 | 63 & s >> 6, 128 | 63 & s)
				} else throw new Error("Invalid code point")
			}
			return a
		}

		function z(e) {
			for(var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
			return t
		}

		function H(e, t) {
			for(var n = [], r = 0, a, o, s; r < e.length && !(0 > (t -= 2)); ++r) a = e.charCodeAt(r), o = a >> 8, s = a % 256, n.push(s), n.push(o);
			return n
		}

		function F(e) {
			return K.toByteArray(U(e))
		}

		function W(e, t, n, r) {
			for(var a = 0; a < r && !(a + n >= t.length || a >= e.length); ++a) t[a + n] = e[a];
			return a
		}

		function q(e, t) {
			return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
		}

		function Y(e) {
			return e !== e
		}
		var G = Math.pow,
			V = Math.min,
			Z = String.fromCharCode,
			K = e("base64-js"),
			X = e("ieee754");
		n.Buffer = o, n.SlowBuffer = function(e) {
			return +e != e && (e = 0), o.alloc(+e)
		}, n.INSPECT_MAX_BYTES = 50;
		n.kMaxLength = 2147483647, o.TYPED_ARRAY_SUPPORT = function() {
			try {
				var e = new Uint8Array(1);
				return e.__proto__ = {
					__proto__: Uint8Array.prototype,
					foo: function() {
						return 42
					}
				}, 42 === e.foo()
			} catch(t) {
				return !1
			}
		}(), o.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(o.prototype, "parent", {
			enumerable: !0,
			get: function() {
				return o.isBuffer(this) ? this.buffer : void 0
			}
		}), Object.defineProperty(o.prototype, "offset", {
			enumerable: !0,
			get: function() {
				return o.isBuffer(this) ? this.byteOffset : void 0
			}
		}), "undefined" != typeof Symbol && null != Symbol.species && o[Symbol.species] === o && Object.defineProperty(o, Symbol.species, {
			value: null,
			configurable: !0,
			enumerable: !1,
			writable: !1
		}), o.poolSize = 8192, o.from = function(e, t, n) {
			return a(e, t, n)
		}, o.prototype.__proto__ = Uint8Array.prototype, o.__proto__ = Uint8Array, o.alloc = function(e, t, n) {
			return i(e, t, n)
		}, o.allocUnsafe = function(e) {
			return d(e)
		}, o.allocUnsafeSlow = function(e) {
			return d(e)
		}, o.isBuffer = function(e) {
			return null != e && !0 === e._isBuffer && e !== o.prototype
		}, o.compare = function(e, t) {
			if(q(e, Uint8Array) && (e = o.from(e, e.offset, e.byteLength)), q(t, Uint8Array) && (t = o.from(t, t.offset, t.byteLength)), !o.isBuffer(e) || !o.isBuffer(t)) throw new TypeError("The \"buf1\", \"buf2\" arguments must be one of type Buffer or Uint8Array");
			if(e === t) return 0;
			for(var n = e.length, r = t.length, s = 0, d = V(n, r); s < d; ++s)
				if(e[s] !== t[s]) {
					n = e[s], r = t[s];
					break
				}
			return n < r ? -1 : r < n ? 1 : 0
		}, o.isEncoding = function(e) {
			switch((e + "").toLowerCase()) {
				case "hex":
				case "utf8":
				case "utf-8":
				case "ascii":
				case "latin1":
				case "binary":
				case "base64":
				case "ucs2":
				case "ucs-2":
				case "utf16le":
				case "utf-16le":
					return !0;
				default:
					return !1;
			}
		}, o.concat = function(e, t) {
			if(!Array.isArray(e)) throw new TypeError("\"list\" argument must be an Array of Buffers");
			if(0 === e.length) return o.alloc(0);
			var n;
			if(t === void 0)
				for(t = 0, n = 0; n < e.length; ++n) t += e[n].length;
			var r = o.allocUnsafe(t),
				a = 0;
			for(n = 0; n < e.length; ++n) {
				var s = e[n];
				if(q(s, Uint8Array) && (s = o.from(s)), !o.isBuffer(s)) throw new TypeError("\"list\" argument must be an Array of Buffers");
				s.copy(r, a), a += s.length
			}
			return r
		}, o.byteLength = m, o.prototype._isBuffer = !0, o.prototype.swap16 = function() {
			var e = this.length;
			if(0 != e % 2) throw new RangeError("Buffer size must be a multiple of 16-bits");
			for(var t = 0; t < e; t += 2) _(this, t, t + 1);
			return this
		}, o.prototype.swap32 = function() {
			var e = this.length;
			if(0 != e % 4) throw new RangeError("Buffer size must be a multiple of 32-bits");
			for(var t = 0; t < e; t += 4) _(this, t, t + 3), _(this, t + 1, t + 2);
			return this
		}, o.prototype.swap64 = function() {
			var e = this.length;
			if(0 != e % 8) throw new RangeError("Buffer size must be a multiple of 64-bits");
			for(var t = 0; t < e; t += 8) _(this, t, t + 7), _(this, t + 1, t + 6), _(this, t + 2, t + 5), _(this, t + 3, t + 4);
			return this
		}, o.prototype.toString = function() {
			var e = this.length;
			return 0 === e ? "" : 0 === arguments.length ? C(this, 0, e) : h.apply(this, arguments)
		}, o.prototype.toLocaleString = o.prototype.toString, o.prototype.equals = function(e) {
			if(!o.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
			return this === e || 0 === o.compare(this, e)
		}, o.prototype.inspect = function() {
			var e = "",
				t = n.INSPECT_MAX_BYTES;
			return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">"
		}, o.prototype.compare = function(e, t, n, r, a) {
			if(q(e, Uint8Array) && (e = o.from(e, e.offset, e.byteLength)), !o.isBuffer(e)) throw new TypeError("The \"target\" argument must be one of type Buffer or Uint8Array. Received type " + typeof e);
			if(void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), void 0 === a && (a = this.length), 0 > t || n > e.length || 0 > r || a > this.length) throw new RangeError("out of range index");
			if(r >= a && t >= n) return 0;
			if(r >= a) return -1;
			if(t >= n) return 1;
			if(t >>>= 0, n >>>= 0, r >>>= 0, a >>>= 0, this === e) return 0;
			for(var s = a - r, d = n - t, l = V(s, d), c = this.slice(r, a), u = e.slice(t, n), p = 0; p < l; ++p)
				if(c[p] !== u[p]) {
					s = c[p], d = u[p];
					break
				}
			return s < d ? -1 : d < s ? 1 : 0
		}, o.prototype.includes = function(e, t, n) {
			return -1 !== this.indexOf(e, t, n)
		}, o.prototype.indexOf = function(e, t, n) {
			return g(this, e, t, n, !0)
		}, o.prototype.lastIndexOf = function(e, t, n) {
			return g(this, e, t, n, !1)
		}, o.prototype.write = function(e, t, n, r) {
			if(void 0 === t) r = "utf8", n = this.length, t = 0;
			else if(void 0 === n && "string" == typeof t) r = t, n = this.length, t = 0;
			else if(isFinite(t)) t >>>= 0, isFinite(n) ? (n >>>= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0);
			else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
			var a = this.length - t;
			if((void 0 === n || n > a) && (n = a), 0 < e.length && (0 > n || 0 > t) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
			r || (r = "utf8");
			for(var o = !1;;) switch(r) {
				case "hex":
					return b(this, e, t, n);
				case "utf8":
				case "utf-8":
					return k(this, e, t, n);
				case "ascii":
					return w(this, e, t, n);
				case "latin1":
				case "binary":
					return x(this, e, t, n);
				case "base64":
					return S(this, e, t, n);
				case "ucs2":
				case "ucs-2":
				case "utf16le":
				case "utf-16le":
					return v(this, e, t, n);
				default:
					if(o) throw new TypeError("Unknown encoding: " + r);
					r = ("" + r).toLowerCase(), o = !0;
			}
		}, o.prototype.toJSON = function() {
			return {
				type: "Buffer",
				data: Array.prototype.slice.call(this._arr || this, 0)
			}
		};
		o.prototype.slice = function(e, t) {
			var n = this.length;
			e = ~~e, t = void 0 === t ? n : ~~t, 0 > e ? (e += n, 0 > e && (e = 0)) : e > n && (e = n), 0 > t ? (t += n, 0 > t && (t = 0)) : t > n && (t = n), t < e && (t = e);
			var r = this.subarray(e, t);
			return r.__proto__ = o.prototype, r
		}, o.prototype.readUIntLE = function(e, t, n) {
			e >>>= 0, t >>>= 0, n || A(e, t, this.length);
			for(var r = this[e], a = 1, o = 0; ++o < t && (a *= 256);) r += this[e + o] * a;
			return r
		}, o.prototype.readUIntBE = function(e, t, n) {
			e >>>= 0, t >>>= 0, n || A(e, t, this.length);
			for(var r = this[e + --t], a = 1; 0 < t && (a *= 256);) r += this[e + --t] * a;
			return r
		}, o.prototype.readUInt8 = function(e, t) {
			return e >>>= 0, t || A(e, 1, this.length), this[e]
		}, o.prototype.readUInt16LE = function(e, t) {
			return e >>>= 0, t || A(e, 2, this.length), this[e] | this[e + 1] << 8
		}, o.prototype.readUInt16BE = function(e, t) {
			return e >>>= 0, t || A(e, 2, this.length), this[e] << 8 | this[e + 1]
		}, o.prototype.readUInt32LE = function(e, t) {
			return e >>>= 0, t || A(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
		}, o.prototype.readUInt32BE = function(e, t) {
			return e >>>= 0, t || A(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
		}, o.prototype.readIntLE = function(e, t, n) {
			e >>>= 0, t >>>= 0, n || A(e, t, this.length);
			for(var r = this[e], a = 1, o = 0; ++o < t && (a *= 256);) r += this[e + o] * a;
			return a *= 128, r >= a && (r -= G(2, 8 * t)), r
		}, o.prototype.readIntBE = function(e, t, n) {
			e >>>= 0, t >>>= 0, n || A(e, t, this.length);
			for(var r = t, a = 1, o = this[e + --r]; 0 < r && (a *= 256);) o += this[e + --r] * a;
			return a *= 128, o >= a && (o -= G(2, 8 * t)), o
		}, o.prototype.readInt8 = function(e, t) {
			return e >>>= 0, t || A(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
		}, o.prototype.readInt16LE = function(e, t) {
			e >>>= 0, t || A(e, 2, this.length);
			var n = this[e] | this[e + 1] << 8;
			return 32768 & n ? 4294901760 | n : n
		}, o.prototype.readInt16BE = function(e, t) {
			e >>>= 0, t || A(e, 2, this.length);
			var n = this[e + 1] | this[e] << 8;
			return 32768 & n ? 4294901760 | n : n
		}, o.prototype.readInt32LE = function(e, t) {
			return e >>>= 0, t || A(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
		}, o.prototype.readInt32BE = function(e, t) {
			return e >>>= 0, t || A(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
		}, o.prototype.readFloatLE = function(e, t) {
			return e >>>= 0, t || A(e, 4, this.length), X.read(this, e, !0, 23, 4)
		}, o.prototype.readFloatBE = function(e, t) {
			return e >>>= 0, t || A(e, 4, this.length), X.read(this, e, !1, 23, 4)
		}, o.prototype.readDoubleLE = function(e, t) {
			return e >>>= 0, t || A(e, 8, this.length), X.read(this, e, !0, 52, 8)
		}, o.prototype.readDoubleBE = function(e, t) {
			return e >>>= 0, t || A(e, 8, this.length), X.read(this, e, !1, 52, 8)
		}, o.prototype.writeUIntLE = function(e, t, n, r) {
			if(e = +e, t >>>= 0, n >>>= 0, !r) {
				var a = G(2, 8 * n) - 1;
				O(this, e, t, n, a, 0)
			}
			var o = 1,
				s = 0;
			for(this[t] = 255 & e; ++s < n && (o *= 256);) this[t + s] = 255 & e / o;
			return t + n
		}, o.prototype.writeUIntBE = function(e, t, n, r) {
			if(e = +e, t >>>= 0, n >>>= 0, !r) {
				var a = G(2, 8 * n) - 1;
				O(this, e, t, n, a, 0)
			}
			var o = n - 1,
				s = 1;
			for(this[t + o] = 255 & e; 0 <= --o && (s *= 256);) this[t + o] = 255 & e / s;
			return t + n
		}, o.prototype.writeUInt8 = function(e, t, n) {
			return e = +e, t >>>= 0, n || O(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
		}, o.prototype.writeUInt16LE = function(e, t, n) {
			return e = +e, t >>>= 0, n || O(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
		}, o.prototype.writeUInt16BE = function(e, t, n) {
			return e = +e, t >>>= 0, n || O(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
		}, o.prototype.writeUInt32LE = function(e, t, n) {
			return e = +e, t >>>= 0, n || O(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
		}, o.prototype.writeUInt32BE = function(e, t, n) {
			return e = +e, t >>>= 0, n || O(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
		}, o.prototype.writeIntLE = function(e, t, n, r) {
			if(e = +e, t >>>= 0, !r) {
				var a = G(2, 8 * n - 1);
				O(this, e, t, n, a - 1, -a)
			}
			var o = 0,
				s = 1,
				d = 0;
			for(this[t] = 255 & e; ++o < n && (s *= 256);) 0 > e && 0 === d && 0 !== this[t + o - 1] && (d = 1), this[t + o] = 255 & (e / s >> 0) - d;
			return t + n
		}, o.prototype.writeIntBE = function(e, t, n, r) {
			if(e = +e, t >>>= 0, !r) {
				var a = G(2, 8 * n - 1);
				O(this, e, t, n, a - 1, -a)
			}
			var o = n - 1,
				s = 1,
				d = 0;
			for(this[t + o] = 255 & e; 0 <= --o && (s *= 256);) 0 > e && 0 === d && 0 !== this[t + o + 1] && (d = 1), this[t + o] = 255 & (e / s >> 0) - d;
			return t + n
		}, o.prototype.writeInt8 = function(e, t, n) {
			return e = +e, t >>>= 0, n || O(this, e, t, 1, 127, -128), 0 > e && (e = 255 + e + 1), this[t] = 255 & e, t + 1
		}, o.prototype.writeInt16LE = function(e, t, n) {
			return e = +e, t >>>= 0, n || O(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
		}, o.prototype.writeInt16BE = function(e, t, n) {
			return e = +e, t >>>= 0, n || O(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
		}, o.prototype.writeInt32LE = function(e, t, n) {
			return e = +e, t >>>= 0, n || O(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
		}, o.prototype.writeInt32BE = function(e, t, n) {
			return e = +e, t >>>= 0, n || O(this, e, t, 4, 2147483647, -2147483648), 0 > e && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
		}, o.prototype.writeFloatLE = function(e, t, n) {
			return M(this, e, t, !0, n)
		}, o.prototype.writeFloatBE = function(e, t, n) {
			return M(this, e, t, !1, n)
		}, o.prototype.writeDoubleLE = function(e, t, n) {
			return P(this, e, t, !0, n)
		}, o.prototype.writeDoubleBE = function(e, t, n) {
			return P(this, e, t, !1, n)
		}, o.prototype.copy = function(e, t, n, r) {
			if(!o.isBuffer(e)) throw new TypeError("argument should be a Buffer");
			if(n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), 0 < r && r < n && (r = n), r === n) return 0;
			if(0 === e.length || 0 === this.length) return 0;
			if(0 > t) throw new RangeError("targetStart out of bounds");
			if(0 > n || n >= this.length) throw new RangeError("Index out of range");
			if(0 > r) throw new RangeError("sourceEnd out of bounds");
			r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);
			var a = r - n;
			if(this === e && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(t, n, r);
			else if(this === e && n < t && t < r)
				for(var s = a - 1; 0 <= s; --s) e[s + t] = this[s + n];
			else Uint8Array.prototype.set.call(e, this.subarray(n, r), t);
			return a
		}, o.prototype.fill = function(e, t, n, r) {
			if("string" == typeof e) {
				if("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
				if("string" == typeof r && !o.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
				if(1 === e.length) {
					var a = e.charCodeAt(0);
					("utf8" === r && 128 > a || "latin1" === r) && (e = a)
				}
			} else "number" == typeof e && (e &= 255);
			if(0 > t || this.length < t || this.length < n) throw new RangeError("Out of range index");
			if(n <= t) return this;
			t >>>= 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);
			var s;
			if("number" == typeof e)
				for(s = t; s < n; ++s) this[s] = e;
			else {
				var d = o.isBuffer(e) ? e : o.from(e, r),
					l = d.length;
				if(0 === l) throw new TypeError("The value \"" + e + "\" is invalid for argument \"value\"");
				for(s = 0; s < n - t; ++s) this[s + t] = d[s % l]
			}
			return this
		};
		var J = /[^+/0-9A-Za-z-_]/g
	}, {
		"base64-js": 4,
		ieee754: 96
	}],
	42: [function(e, t) {
		t.exports = {
			100: "Continue",
			101: "Switching Protocols",
			102: "Processing",
			200: "OK",
			201: "Created",
			202: "Accepted",
			203: "Non-Authoritative Information",
			204: "No Content",
			205: "Reset Content",
			206: "Partial Content",
			207: "Multi-Status",
			208: "Already Reported",
			226: "IM Used",
			300: "Multiple Choices",
			301: "Moved Permanently",
			302: "Found",
			303: "See Other",
			304: "Not Modified",
			305: "Use Proxy",
			307: "Temporary Redirect",
			308: "Permanent Redirect",
			400: "Bad Request",
			401: "Unauthorized",
			402: "Payment Required",
			403: "Forbidden",
			404: "Not Found",
			405: "Method Not Allowed",
			406: "Not Acceptable",
			407: "Proxy Authentication Required",
			408: "Request Timeout",
			409: "Conflict",
			410: "Gone",
			411: "Length Required",
			412: "Precondition Failed",
			413: "Payload Too Large",
			414: "URI Too Long",
			415: "Unsupported Media Type",
			416: "Range Not Satisfiable",
			417: "Expectation Failed",
			418: "I'm a teapot",
			421: "Misdirected Request",
			422: "Unprocessable Entity",
			423: "Locked",
			424: "Failed Dependency",
			425: "Unordered Collection",
			426: "Upgrade Required",
			428: "Precondition Required",
			429: "Too Many Requests",
			431: "Request Header Fields Too Large",
			451: "Unavailable For Legal Reasons",
			500: "Internal Server Error",
			501: "Not Implemented",
			502: "Bad Gateway",
			503: "Service Unavailable",
			504: "Gateway Timeout",
			505: "HTTP Version Not Supported",
			506: "Variant Also Negotiates",
			507: "Insufficient Storage",
			508: "Loop Detected",
			509: "Bandwidth Limit Exceeded",
			510: "Not Extended",
			511: "Network Authentication Required"
		}
	}, {}],
	43: [function(e, t, n) {
		arguments[4][11][0].apply(n, arguments)
	}, {
		"./_stream_readable": 45,
		"./_stream_writable": 47,
		"core-util-is": 75,
		dup: 11,
		inherits: 99,
		"process-nextick-args": 204
	}],
	44: [function(e, t, n) {
		arguments[4][12][0].apply(n, arguments)
	}, {
		"./_stream_transform": 46,
		"core-util-is": 75,
		dup: 12,
		inherits: 99
	}],
	45: [function(e, t, n) {
		arguments[4][13][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 43,
		"./internal/streams/BufferList": 48,
		"./internal/streams/destroy": 49,
		"./internal/streams/stream": 50,
		_process: 205,
		"core-util-is": 75,
		dup: 13,
		events: 82,
		inherits: 99,
		isarray: 104,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		"string_decoder/": 296,
		util: 35
	}],
	46: [function(e, t, n) {
		arguments[4][14][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 43,
		"core-util-is": 75,
		dup: 14,
		inherits: 99
	}],
	47: [function(e, t, n) {
		arguments[4][15][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 43,
		"./internal/streams/destroy": 49,
		"./internal/streams/stream": 50,
		_process: 205,
		"core-util-is": 75,
		dup: 15,
		inherits: 99,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		timers: 301,
		"util-deprecate": 313
	}],
	48: [function(e, t, n) {
		arguments[4][16][0].apply(n, arguments)
	}, {
		dup: 16,
		"safe-buffer": 241,
		util: 35
	}],
	49: [function(e, t, n) {
		arguments[4][17][0].apply(n, arguments)
	}, {
		dup: 17,
		"process-nextick-args": 204
	}],
	50: [function(e, t, n) {
		arguments[4][18][0].apply(n, arguments)
	}, {
		dup: 18,
		events: 82
	}],
	51: [function(e, t, n) {
		arguments[4][19][0].apply(n, arguments)
	}, {
		"./lib/_stream_duplex.js": 43,
		"./lib/_stream_passthrough.js": 44,
		"./lib/_stream_readable.js": 45,
		"./lib/_stream_transform.js": 46,
		"./lib/_stream_writable.js": 47,
		dup: 19
	}],
	52: [function(e, t) {
		const n = e("block-stream2"),
			r = e("readable-stream");
		class a extends r.Writable {
			constructor(e, t, r = {}) {
				if(super(r), !e || !e.put || !e.get) throw new Error("First argument must be an abstract-chunk-store compliant store");
				if(t = +t, !t) throw new Error("Second argument must be a chunk length");
				this._blockstream = new n(t, {
					zeroPadding: !1
				});
				let a = 0;
				const o = t => {
					this.destroyed || (e.put(a, t), a += 1)
				};
				this._blockstream.on("data", o).on("error", e => {
					this.destroy(e)
				}), this.on("finish", () => this._blockstream.end())
			}
			_write(e, t, n) {
				this._blockstream.write(e, t, n)
			}
			destroy(e) {
				this.destroyed || (this.destroyed = !0, e && this.emit("error", e), this.emit("close"))
			}
		}
		t.exports = a
	}, {
		"block-stream2": 25,
		"readable-stream": 51
	}],
	53: [function(e, t) {
		var r = Math.abs;
		t.exports = function(e, t, n) {
			for(var a = 1 / 0, o = 0, s = t.length - 1, d, l, c; o <= s && (d = o + (s - o >> 1), c = t[d] - e, 0 > c ? o = d + 1 : 0 < c ? s = d - 1 : void 0, c = r(c), c < a && (a = c, l = d), t[d] !== e););
			return n ? l : t[l]
		}
	}, {}],
	54: [function(e, t) {
		e("../modules/web.immediate"), t.exports = e("../modules/_core").setImmediate
	}, {
		"../modules/_core": 58,
		"../modules/web.immediate": 74
	}],
	55: [function(e, t) {
		t.exports = function(e) {
			if("function" != typeof e) throw TypeError(e + " is not a function!");
			return e
		}
	}, {}],
	56: [function(e, t) {
		var n = e("./_is-object");
		t.exports = function(e) {
			if(!n(e)) throw TypeError(e + " is not an object!");
			return e
		}
	}, {
		"./_is-object": 69
	}],
	57: [function(e, t) {
		var n = {}.toString;
		t.exports = function(e) {
			return n.call(e).slice(8, -1)
		}
	}, {}],
	58: [function(e, t) {
		var n = t.exports = {
			version: "2.3.0"
		};
		"number" == typeof __e && (__e = n)
	}, {}],
	59: [function(e, t) {
		var n = e("./_a-function");
		t.exports = function(e, t, r) {
			return(n(e), void 0 === t) ? e : 1 === r ? function(n) {
				return e.call(t, n)
			} : 2 === r ? function(n, r) {
				return e.call(t, n, r)
			} : 3 === r ? function(n, r, a) {
				return e.call(t, n, r, a)
			} : function() {
				return e.apply(t, arguments)
			}
		}
	}, {
		"./_a-function": 55
	}],
	60: [function(e, t) {
		t.exports = !e("./_fails")(function() {
			return 7 != Object.defineProperty({}, "a", {
				get: function() {
					return 7
				}
			}).a
		})
	}, {
		"./_fails": 63
	}],
	61: [function(e, t) {
		var n = e("./_is-object"),
			r = e("./_global").document,
			a = n(r) && n(r.createElement);
		t.exports = function(e) {
			return a ? r.createElement(e) : {}
		}
	}, {
		"./_global": 64,
		"./_is-object": 69
	}],
	62: [function(e, t) {
		var n = e("./_global"),
			r = e("./_core"),
			a = e("./_ctx"),
			o = e("./_hide"),
			s = function(e, t, i) {
				var d = e & s.F,
					l = e & s.G,
					c = e & s.S,
					u = e & s.P,
					p = e & s.B,
					f = e & s.W,
					m = l ? r : r[t] || (r[t] = {}),
					h = m.prototype,
					_ = l ? n : c ? n[t] : (n[t] || {}).prototype,
					g, y, b;
				for(g in l && (i = t), i) y = !d && _ && void 0 !== _[g], y && g in m || (b = y ? _[g] : i[g], m[g] = l && "function" != typeof _[g] ? i[g] : p && y ? a(b, n) : f && _[g] == b ? function(e) {
					var t = function(t, n, r) {
						if(this instanceof e) {
							switch(arguments.length) {
								case 0:
									return new e;
								case 1:
									return new e(t);
								case 2:
									return new e(t, n);
							}
							return new e(t, n, r)
						}
						return e.apply(this, arguments)
					};
					return t.prototype = e.prototype, t
				}(b) : u && "function" == typeof b ? a(Function.call, b) : b, u && ((m.virtual || (m.virtual = {}))[g] = b, e & s.R && h && !h[g] && o(h, g, b)))
			};
		s.F = 1, s.G = 2, s.S = 4, s.P = 8, s.B = 16, s.W = 32, s.U = 64, s.R = 128, t.exports = s
	}, {
		"./_core": 58,
		"./_ctx": 59,
		"./_global": 64,
		"./_hide": 65
	}],
	63: [function(e, t) {
		t.exports = function(e) {
			try {
				return !!e()
			} catch(t) {
				return !0
			}
		}
	}, {}],
	64: [function(e, t) {
		var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
		"number" == typeof __g && (__g = n)
	}, {}],
	65: [function(e, t) {
		var n = e("./_object-dp"),
			r = e("./_property-desc");
		t.exports = e("./_descriptors") ? function(e, t, a) {
			return n.f(e, t, r(1, a))
		} : function(e, t, n) {
			return e[t] = n, e
		}
	}, {
		"./_descriptors": 60,
		"./_object-dp": 70,
		"./_property-desc": 71
	}],
	66: [function(e, t) {
		t.exports = e("./_global").document && document.documentElement
	}, {
		"./_global": 64
	}],
	67: [function(e, t) {
		t.exports = !e("./_descriptors") && !e("./_fails")(function() {
			return 7 != Object.defineProperty(e("./_dom-create")("div"), "a", {
				get: function() {
					return 7
				}
			}).a
		})
	}, {
		"./_descriptors": 60,
		"./_dom-create": 61,
		"./_fails": 63
	}],
	68: [function(e, t) {
		t.exports = function(e, t, n) {
			var r = n === void 0;
			switch(t.length) {
				case 0:
					return r ? e() : e.call(n);
				case 1:
					return r ? e(t[0]) : e.call(n, t[0]);
				case 2:
					return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);
				case 3:
					return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);
				case 4:
					return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3]);
			}
			return e.apply(n, t)
		}
	}, {}],
	69: [function(e, t) {
		t.exports = function(e) {
			return "object" == typeof e ? null !== e : "function" == typeof e
		}
	}, {}],
	70: [function(e, t, n) {
		var r = e("./_an-object"),
			a = e("./_ie8-dom-define"),
			o = e("./_to-primitive"),
			s = Object.defineProperty;
		n.f = e("./_descriptors") ? Object.defineProperty : function(e, t, n) {
			if(r(e), t = o(t, !0), r(n), a) try {
				return s(e, t, n)
			} catch(t) {}
			if("get" in n || "set" in n) throw TypeError("Accessors not supported!");
			return "value" in n && (e[t] = n.value), e
		}
	}, {
		"./_an-object": 56,
		"./_descriptors": 60,
		"./_ie8-dom-define": 67,
		"./_to-primitive": 73
	}],
	71: [function(e, t) {
		t.exports = function(e, t) {
			return {
				enumerable: !(1 & e),
				configurable: !(2 & e),
				writable: !(4 & e),
				value: t
			}
		}
	}, {}],
	72: [function(e, t) {
		var n = e("./_ctx"),
			r = e("./_invoke"),
			a = e("./_html"),
			o = e("./_dom-create"),
			s = e("./_global"),
			i = s.process,
			d = s.setImmediate,
			l = s.clearImmediate,
			c = s.MessageChannel,
			u = 0,
			p = {},
			f = function() {
				var e = +this;
				if(p.hasOwnProperty(e)) {
					var t = p[e];
					delete p[e], t()
				}
			},
			m = function(e) {
				f.call(e.data)
			},
			h, _, g;
		d && l || (d = function(e) {
			for(var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
			return p[++u] = function() {
				r("function" == typeof e ? e : Function(e), t)
			}, h(u), u
		}, l = function(e) {
			delete p[e]
		}, "process" == e("./_cof")(i) ? h = function(e) {
			i.nextTick(n(f, e, 1))
		} : c ? (_ = new c, g = _.port2, _.port1.onmessage = m, h = n(g.postMessage, g, 1)) : s.addEventListener && "function" == typeof postMessage && !s.importScripts ? (h = function(e) {
			s.postMessage(e + "", "*")
		}, s.addEventListener("message", m, !1)) : "onreadystatechange" in o("script") ? h = function(e) {
			a.appendChild(o("script")).onreadystatechange = function() {
				a.removeChild(this), f.call(e)
			}
		} : h = function(e) {
			setTimeout(n(f, e, 1), 0)
		}), t.exports = {
			set: d,
			clear: l
		}
	}, {
		"./_cof": 57,
		"./_ctx": 59,
		"./_dom-create": 61,
		"./_global": 64,
		"./_html": 66,
		"./_invoke": 68
	}],
	73: [function(e, t) {
		var n = e("./_is-object");
		t.exports = function(e, t) {
			if(!n(e)) return e;
			var r, a;
			if(t && "function" == typeof(r = e.toString) && !n(a = r.call(e))) return a;
			if("function" == typeof(r = e.valueOf) && !n(a = r.call(e))) return a;
			if(!t && "function" == typeof(r = e.toString) && !n(a = r.call(e))) return a;
			throw TypeError("Can't convert object to primitive value")
		}
	}, {
		"./_is-object": 69
	}],
	74: [function(e) {
		var t = e("./_export"),
			n = e("./_task");
		t(t.G + t.B, {
			setImmediate: n.set,
			clearImmediate: n.clear
		})
	}, {
		"./_export": 62,
		"./_task": 72
	}],
	75: [function(e, t, n) {
		(function(e) {
			function t(e) {
				return Object.prototype.toString.call(e)
			}
			n.isArray = function(e) {
				return Array.isArray ? Array.isArray(e) : "[object Array]" === t(e)
			}, n.isBoolean = function(e) {
				return "boolean" == typeof e
			}, n.isNull = function(e) {
				return null === e
			}, n.isNullOrUndefined = function(e) {
				return null == e
			}, n.isNumber = function(e) {
				return "number" == typeof e
			}, n.isString = function(e) {
				return "string" == typeof e
			}, n.isSymbol = function(e) {
				return "symbol" == typeof e
			}, n.isUndefined = function(e) {
				return void 0 === e
			}, n.isRegExp = function(e) {
				return "[object RegExp]" === t(e)
			}, n.isObject = function(e) {
				return "object" == typeof e && null !== e
			}, n.isDate = function(e) {
				return "[object Date]" === t(e)
			}, n.isError = function(n) {
				return "[object Error]" === t(n) || n instanceof Error
			}, n.isFunction = function(e) {
				return "function" == typeof e
			}, n.isPrimitive = function(e) {
				return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e
			}, n.isBuffer = e.isBuffer
		}).call(this, {
			isBuffer: e("../../is-buffer/index.js")
		})
	}, {
		"../../is-buffer/index.js": 101
	}],
	76: [function(e, t) {
		(function(n, r, a) {
			function o(e, t, r) {
				function o() {
					B(e.map(e => t => {
						const n = {};
						if(f(e)) n.getStream = _(e), n.length = e.size;
						else if(a.isBuffer(e)) n.getStream = g(e), n.length = e.length;
						else if(h(e)) n.getStream = b(e, n), n.length = 0;
						else {
							if("string" == typeof e) {
								if("function" != typeof C.stat) throw new Error("filesystem paths do not work in the browser");
								const n = 1 < i || c;
								return void s(e, n, t)
							}
							throw new Error("invalid input type")
						}
						n.path = e.path, t(null, n)
					}), (e, t) => e ? r(e) : void(t = E(t), r(null, t, c)))
				}
				if(m(e) && (e = Array.from(e)), Array.isArray(e) || (e = [e]), 0 === e.length) throw new Error("invalid input type");
				e.forEach(e => {
					if(null == e) throw new Error(`invalid input type: ${e}`)
				}), e = e.map(e => f(e) && "string" == typeof e.path && "function" == typeof C.stat ? e.path : e), 1 !== e.length || "string" == typeof e[0] || e[0].name || (e[0].name = t.name);
				let d = null;
				e.forEach((t, n) => {
					if("string" == typeof t) return;
					let r = t.fullPath || t.name;
					r || (r = `Unknown File ${n+1}`, t.unknownName = !0), t.path = r.split("/"), t.path[0] || t.path.shift(), 2 > t.path.length ? d = null : 0 === n && 1 < e.length ? d = t.path[0] : t.path[0] !== d && (d = null)
				}), e = e.filter(e => {
					if("string" == typeof e) return !0;
					const t = e.path[e.path.length - 1];
					return l(t) && I.not(t)
				}), d && e.forEach(e => {
					const t = (a.isBuffer(e) || h(e)) && !e.path;
					"string" == typeof e || t || e.path.shift()
				}), !t.name && d && (t.name = d), t.name || e.some(e => "string" == typeof e ? (t.name = S.basename(e), !0) : e.unknownName ? void 0 : (t.name = e.path[e.path.length - 1], !0)), t.name || (t.name = `Unnamed Torrent ${Date.now()}`);
				const i = e.reduce((e, t) => e + +("string" == typeof t), 0);
				let c = 1 === e.length;
				if(1 === e.length && "string" == typeof e[0]) {
					if("function" != typeof C.stat) throw new Error("filesystem paths do not work in the browser");
					T(e[0], (e, t) => e ? r(e) : void(c = t, o()))
				} else n.nextTick(() => {
					o()
				})
			}

			function s(e, t, n) {
				d(e, i, (r, a) => r ? n(r) : void(a = Array.isArray(a) ? E(a) : [a], e = S.normalize(e), t && (e = e.slice(0, e.lastIndexOf(S.sep) + 1)), e[e.length - 1] !== S.sep && (e += S.sep), a.forEach(t => {
					t.getStream = y(t.path), t.path = t.path.replace(e, "").split(S.sep)
				}), n(null, a)))
			}

			function i(e, t) {
				t = R(t), C.stat(e, (n, r) => {
					if(n) return t(n);
					const a = {
						length: r.size,
						path: e
					};
					t(null, a)
				})
			}

			function d(e, t, n) {
				C.stat(e, (r, a) => r ? n(r) : void(a.isDirectory() ? C.readdir(e, (r, a) => r ? n(r) : void B(a.filter(l).filter(I.not).map(n => r => {
					d(S.join(e, n), t, r)
				}), n)) : a.isFile() && t(e, n)))
			}

			function l(e) {
				return "." !== e[0]
			}

			function c(e, t, n) {
				function r(e) {
					c += e.length;
					const t = f;
					A(e, e => {
						l[t] = e, p -= 1, d()
					}), p += 1, f += 1
				}

				function o() {
					m = !0, d()
				}

				function s(e) {
					i(), n(e)
				}

				function i() {
					h.removeListener("error", s), _.removeListener("data", r), _.removeListener("end", o), _.removeListener("error", s)
				}

				function d() {
					m && 0 == p && (i(), n(null, a.from(l.join(""), "hex"), c))
				}
				n = R(n);
				const l = [];
				let c = 0;
				const u = e.map(e => e.getStream);
				let p = 0,
					f = 0,
					m = !1;
				const h = new L(u),
					_ = new w(t, {
						zeroPadding: !1
					});
				h.on("error", s), h.pipe(_).on("data", r).on("end", o).on("error", s)
			}

			function u(e, n, a) {
				let o = n.announceList;
				o || ("string" == typeof n.announce ? o = [
					[n.announce]
				] : Array.isArray(n.announce) && (o = n.announce.map(e => [e]))), o || (o = []), r.WEBTORRENT_ANNOUNCE && ("string" == typeof r.WEBTORRENT_ANNOUNCE ? o.push([
					[r.WEBTORRENT_ANNOUNCE]
				]) : Array.isArray(r.WEBTORRENT_ANNOUNCE) && (o = o.concat(r.WEBTORRENT_ANNOUNCE.map(e => [e])))), n.announce === void 0 && n.announceList === void 0 && (o = o.concat(t.exports.announceList)), "string" == typeof n.urlList && (n.urlList = [n.urlList]);
				const s = {
					info: {
						name: n.name
					},
					"creation date": Math.ceil((+n.creationDate || Date.now()) / 1e3),
					encoding: "UTF-8"
				};
				0 !== o.length && (s.announce = o[0][0], s["announce-list"] = o), n.comment !== void 0 && (s.comment = n.comment), n.createdBy !== void 0 && (s["created by"] = n.createdBy), n.private !== void 0 && (s.info.private = +n.private), n.sslCert !== void 0 && (s.info["ssl-cert"] = n.sslCert), n.urlList !== void 0 && (s["url-list"] = n.urlList);
				const i = n.pieceLength || x(e.reduce(p, 0));
				s.info["piece length"] = i, c(e, i, (t, r, o) => t ? a(t) : void(s.info.pieces = r, e.forEach(e => {
					delete e.getStream
				}), n.singleFileTorrent ? s.info.length = o : s.info.files = e, a(null, k.encode(s))))
			}

			function p(e, t) {
				return e + t.length
			}

			function f(e) {
				return "undefined" != typeof Blob && e instanceof Blob
			}

			function m(e) {
				return "undefined" != typeof FileList && e instanceof FileList
			}

			function h(e) {
				return "object" == typeof e && null != e && "function" == typeof e.pipe
			}

			function _(e) {
				return() => new v(e)
			}

			function g(e) {
				return() => {
					const t = new O.PassThrough;
					return t.end(e), t
				}
			}

			function y(e) {
				return() => C.createReadStream(e)
			}

			function b(e, t) {
				return() => {
					const n = new O.Transform;
					return n._transform = function(e, n, r) {
						t.length += e.length, this.push(e), r()
					}, e.pipe(n), n
				}
			}
			const k = e("bencode"),
				w = e("block-stream2"),
				x = e("piece-length"),
				S = e("path"),
				v = e("filestream/read"),
				E = e("flatten"),
				C = e("fs"),
				T = e("is-file"),
				I = e("junk"),
				L = e("multistream"),
				R = e("once"),
				B = e("run-parallel"),
				A = e("simple-sha1"),
				O = e("readable-stream");
			t.exports = function(e, t, n) {
				"function" == typeof t && ([t, n] = [n, t]), t = t ? Object.assign({}, t) : {}, o(e, t, (e, r, a) => e ? n(e) : void(t.singleFileTorrent = a, u(r, t, n)))
			}, t.exports.parseInput = function(e, t, n) {
				"function" == typeof t && ([t, n] = [n, t]), t = t ? Object.assign({}, t) : {}, o(e, t, n)
			}, t.exports.announceList = [
				["udp://tracker.leechers-paradise.org:6969"],
				["udp://tracker.coppersurfer.tk:6969"],
				["udp://tracker.opentrackr.org:1337"],
				["udp://explodie.org:6969"],
				["udp://tracker.empire-js.us:1337"],
				["wss://tracker.btorrent.xyz"],
				["wss://tracker.openwebtorrent.com"],
				["wss://tracker.fastcast.nz"]
			]	
		}).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global, e("buffer").Buffer)
	}, {
		_process: 205,
		bencode: 7,
		"block-stream2": 25,
		buffer: 41,
		"filestream/read": 92,
		flatten: 93,
		fs: 36,
		"is-file": 102,
		junk: 140,
		multistream: 171,
		once: 182,
		path: 201,
		"piece-length": 202,
		"readable-stream": 235,
		"run-parallel": 239,
		"simple-sha1": 254
	}],
	77: [function(e, t, n) {
		(function(a) {
			function r(e) {
				var t = this.useColors;
				if(e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + n.humanize(this.diff), !!t) {
					var r = "color: " + this.color;
					e.splice(1, 0, r, "color: inherit");
					var a = 0,
						o = 0;
					e[0].replace(/%[a-zA-Z%]/g, function(e) {
						"%%" === e || (a++, "%c" === e && (o = a))
					}), e.splice(o, 0, r)
				}
			}

			function o(e) {
				try {
					null == e ? n.storage.removeItem("debug") : n.storage.debug = e
				} catch(t) {}
			}

			function s() {
				var e;
				try {
					e = n.storage.debug
				} catch(t) {}
				return !e && "undefined" != typeof a && "env" in a && (e = a.env.DEBUG), e
			}
			n = t.exports = e("./debug"), n.log = function() {
				return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
			}, n.formatArgs = r, n.save = o, n.load = s, n.useColors = function() {
				return !!("undefined" != typeof window && window.process && "renderer" === window.process.type) || !("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && 31 <= parseInt(RegExp.$1, 10) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
			}, n.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : function() {
				try {
					return window.localStorage
				} catch(t) {}
			}(), n.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], n.formatters.j = function(e) {
				try {
					return JSON.stringify(e)
				} catch(e) {
					return "[UnexpectedJSONParseError]: " + e.message
				}
			}, n.enable(s())
		}).call(this, e("_process"))
	}, {
		"./debug": 78,
		_process: 205
	}],
	78: [function(e, t, n) {
		function r(e) {
			var t = 0,
				r;
			for(r in e) t = (t << 5) - t + e.charCodeAt(r), t |= 0;
			return n.colors[Math.abs(t) % n.colors.length]
		}

		function a(e) {
			function t() {
				if(t.enabled) {
					var e = t,
						r = +new Date,
						o = r - (a || r);
					e.diff = o, e.prev = a, e.curr = r, a = r;
					for(var s = Array(arguments.length), d = 0; d < s.length; d++) s[d] = arguments[d];
					s[0] = n.coerce(s[0]), "string" != typeof s[0] && s.unshift("%O");
					var l = 0;
					s[0] = s[0].replace(/%([a-zA-Z%])/g, function(t, r) {
						if("%%" === t) return t;
						l++;
						var a = n.formatters[r];
						if("function" == typeof a) {
							var o = s[l];
							t = a.call(e, o), s.splice(l, 1), l--
						}
						return t
					}), n.formatArgs.call(e, s);
					var c = t.log || n.log || console.log.bind(console);
					c.apply(e, s)
				}
			}
			var a;
			return t.namespace = e, t.enabled = n.enabled(e), t.useColors = n.useColors(), t.color = r(e), t.destroy = o, "function" == typeof n.init && n.init(t), n.instances.push(t), t
		}

		function o() {
			var e = n.instances.indexOf(this);
			return -1 !== e && (n.instances.splice(e, 1), !0)
		}

		function s(e) {
			n.save(e), n.names = [], n.skips = [];
			var t = ("string" == typeof e ? e : "").split(/[\s,]+/),
				r = t.length,
				a;
			for(a = 0; a < r; a++) t[a] && (e = t[a].replace(/\*/g, ".*?"), "-" === e[0] ? n.skips.push(new RegExp("^" + e.substr(1) + "$")) : n.names.push(new RegExp("^" + e + "$")));
			for(a = 0; a < n.instances.length; a++) {
				var o = n.instances[a];
				o.enabled = n.enabled(o.namespace)
			}
		}

		function i() {
			n.enable("")
		}

		function d(e) {
			if("*" === e[e.length - 1]) return !0;
			var t, r;
			for(t = 0, r = n.skips.length; t < r; t++)
				if(n.skips[t].test(e)) return !1;
			for(t = 0, r = n.names.length; t < r; t++)
				if(n.names[t].test(e)) return !0;
			return !1
		}
		n = t.exports = a.debug = a["default"] = a, n.coerce = function(e) {
			return e instanceof Error ? e.stack || e.message : e
		}, n.disable = i, n.enable = s, n.enabled = d, n.humanize = e("ms"), n.instances = [], n.names = [], n.skips = [], n.formatters = {}
	}, {
		ms: 170
	}],
	79: [function(e, t) {
		t.exports = function() {
			for(var e = 0; e < arguments.length; e++)
				if(arguments[e] !== void 0) return arguments[e]
		}
	}, {}],
	80: [function(e, t) {
		function n(e, t) {
			function r() {
				i.readEntries(function(e) {
					0 < e.length ? (s = s.concat(Array.from(e)), r()) : o()
				})
			}

			function o() {
				a(s.map(function(e) {
					return function(t) {
						n(e, t)
					}
				}), function(n, r) {
					n ? t(n) : (r.push({
						fullPath: e.fullPath,
						name: e.name,
						isFile: !1,
						isDirectory: !0
					}), t(null, r))
				})
			}
			var s = [];
			if(e.isFile) e.file(function(n) {
				n.fullPath = e.fullPath, n.isFile = !0, n.isDirectory = !1, t(null, n)
			}, function(e) {
				t(e)
			});
			else if(e.isDirectory) {
				var i = e.createReader();
				r()
			}
		}
		t.exports = function(t, o) {
			function e(t) {
				return o.onDragEnter && o.onDragEnter(t), t.stopPropagation(), t.preventDefault(), !1
			}

			function s(n) {
				if(n.stopPropagation(), n.preventDefault(), o.onDragOver && o.onDragOver(n), n.dataTransfer.items) {
					var e = Array.from(n.dataTransfer.items),
						r = e.filter(function(e) {
							return "file" === e.kind
						}),
						a = e.filter(function(e) {
							return "string" === e.kind
						});
					if(0 === r.length && !o.onDropText) return;
					if(0 === a.length && !o.onDrop) return;
					if(0 === r.length && 0 === a.length) return
				}
				return t.classList.add("drag"), clearTimeout(u), n.dataTransfer.dropEffect = "copy", !1
			}

			function i(t) {
				return t.stopPropagation(), t.preventDefault(), o.onDragLeave && o.onDragLeave(t), clearTimeout(u), u = setTimeout(l, 50), !1
			}

			function d(t) {
				t.stopPropagation(), t.preventDefault(), o.onDragLeave && o.onDragLeave(t), clearTimeout(u), l();
				var e = {
						x: t.clientX,
						y: t.clientY
					},
					s = t.dataTransfer.getData("text");
				if(s && o.onDropText && o.onDropText(s, e), o.onDrop && t.dataTransfer.items) {
					var i = t.dataTransfer.files,
						d = Array.from(t.dataTransfer.items).filter(function(e) {
							return "file" === e.kind
						});
					if(0 === d.length) return;
					a(d.map(function(e) {
						return function(t) {
							n(e.webkitGetAsEntry(), t)
						}
					}), function(t, n) {
						if(t) throw t;
						var a = r(n),
							s = a.filter(function(e) {
								return e.isFile
							}),
							d = a.filter(function(e) {
								return e.isDirectory
							});
						o.onDrop(s, e, i, d)
					})
				}
				return !1
			}

			function l() {
				t.classList.remove("drag")
			}
			if("string" == typeof t) {
				var c = t;
				if(t = window.document.querySelector(t), !t) throw new Error("\"" + c + "\" does not match any HTML elements")
			}
			if(!t) throw new Error("\"" + t + "\" is not a valid HTML element");
			"function" == typeof o && (o = {
				onDrop: o
			});
			var u;
			return t.addEventListener("dragenter", e, !1), t.addEventListener("dragover", s, !1), t.addEventListener("dragleave", i, !1), t.addEventListener("drop", d, !1),
				function() {
					l(), t.removeEventListener("dragenter", e, !1), t.removeEventListener("dragover", s, !1), t.removeEventListener("dragleave", i, !1), t.removeEventListener("drop", d, !1)
				}
		};
		var r = e("flatten"),
			a = e("run-parallel")
	}, {
		flatten: 93,
		"run-parallel": 239
	}],
	81: [function(e, t) {
		var n = e("once"),
			r = function() {},
			a = function(e) {
				return e.setHeader && "function" == typeof e.abort
			},
			o = function(e) {
				return e.stdio && Array.isArray(e.stdio) && 3 === e.stdio.length
			},
			s = function(e, t, i) {
				if("function" == typeof t) return s(e, null, t);
				t || (t = {}), i = n(i || r);
				var d = e._writableState,
					l = e._readableState,
					c = t.readable || !1 !== t.readable && e.readable,
					u = t.writable || !1 !== t.writable && e.writable,
					p = function() {
						e.writable || f()
					},
					f = function() {
						u = !1, c || i.call(e)
					},
					m = function() {
						c = !1, u || i.call(e)
					},
					h = function(t) {
						i.call(e, t ? new Error("exited with error code: " + t) : null)
					},
					_ = function(t) {
						i.call(e, t)
					},
					g = function() {
						return c && !(l && l.ended) ? i.call(e, new Error("premature close")) : u && !(d && d.ended) ? i.call(e, new Error("premature close")) : void 0
					},
					y = function() {
						e.req.on("finish", f)
					};
				return a(e) ? (e.on("complete", f), e.on("abort", g), e.req ? y() : e.on("request", y)) : u && !d && (e.on("end", p), e.on("close", p)), o(e) && e.on("exit", h), e.on("end", m), e.on("finish", f), !1 !== t.error && e.on("error", _), e.on("close", g),
					function() {
						e.removeListener("complete", f), e.removeListener("abort", g), e.removeListener("request", y), e.req && e.req.removeListener("finish", f), e.removeListener("end", p), e.removeListener("close", p), e.removeListener("finish", f), e.removeListener("exit", h), e.removeListener("end", m), e.removeListener("error", _), e.removeListener("close", g)
					}
			};
		t.exports = s
	}, {
		once: 182
	}],
	82: [function(e, t) {
		function n() {
			this._events && Object.prototype.hasOwnProperty.call(this, "_events") || (this._events = y(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
		}

		function r(e) {
			return void 0 === e._maxListeners ? n.defaultMaxListeners : e._maxListeners
		}

		function a(e, t, n) {
			if(t) e.call(n);
			else
				for(var r = e.length, a = _(e, r), o = 0; o < r; ++o) a[o].call(n)
		}

		function s(e, t, n, r) {
			if(t) e.call(n, r);
			else
				for(var a = e.length, o = _(e, a), s = 0; s < a; ++s) o[s].call(n, r)
		}

		function d(e, t, n, r, a) {
			if(t) e.call(n, r, a);
			else
				for(var o = e.length, s = _(e, o), d = 0; d < o; ++d) s[d].call(n, r, a)
		}

		function l(e, t, n, r, a, o) {
			if(t) e.call(n, r, a, o);
			else
				for(var s = e.length, d = _(e, s), l = 0; l < s; ++l) d[l].call(n, r, a, o)
		}

		function c(e, t, n, r) {
			if(t) e.apply(n, r);
			else
				for(var a = e.length, o = _(e, a), s = 0; s < a; ++s) o[s].apply(n, r)
		}

		function i(e, t, n, a) {
			var o, s, i;
			if("function" != typeof n) throw new TypeError("\"listener\" argument must be a function");
			if(s = e._events, s ? (s.newListener && (e.emit("newListener", t, n.listener ? n.listener : n), s = e._events), i = s[t]) : (s = e._events = y(null), e._eventsCount = 0), !i) i = s[t] = n, ++e._eventsCount;
			else if("function" == typeof i ? i = s[t] = a ? [n, i] : [i, n] : a ? i.unshift(n) : i.push(n), !i.warned && (o = r(e), o && 0 < o && i.length > o)) {
				i.warned = !0;
				var d = new Error("Possible EventEmitter memory leak detected. " + i.length + " \"" + (t + "\" listeners added. Use emitter.setMaxListeners() to increase limit."));
				d.name = "MaxListenersExceededWarning", d.emitter = e, d.type = t, d.count = i.length, "object" == typeof console && console.warn && console.warn("%s: %s", d.name, d.message)
			}
			return e
		}

		function u() {
			if(!this.fired) switch(this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length) {
				case 0:
					return this.listener.call(this.target);
				case 1:
					return this.listener.call(this.target, arguments[0]);
				case 2:
					return this.listener.call(this.target, arguments[0], arguments[1]);
				case 3:
					return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);
				default:
					for(var e = Array(arguments.length), t = 0; t < e.length; ++t) e[t] = arguments[t];
					this.listener.apply(this.target, e);
			}
		}

		function p(e, t, n) {
			var r = {
					fired: !1,
					wrapFn: void 0,
					target: e,
					type: t,
					listener: n
				},
				a = k.call(u, r);
			return a.listener = n, r.wrapFn = a, a
		}

		function f(e, t, n) {
			var r = e._events;
			if(!r) return [];
			var a = r[t];
			return a ? "function" == typeof a ? n ? [a.listener || a] : [a] : n ? g(a) : _(a, a.length) : []
		}

		function m(e) {
			var t = this._events;
			if(t) {
				var n = t[e];
				if("function" == typeof n) return 1;
				if(n) return n.length
			}
			return 0
		}

		function h(e, t) {
			for(var r = t, a = r + 1, o = e.length; a < o; r += 1, a += 1) e[r] = e[a];
			e.pop()
		}

		function _(e, t) {
			for(var n = Array(t), r = 0; r < t; ++r) n[r] = e[r];
			return n
		}

		function g(e) {
			for(var t = Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
			return t
		}
		var y = Object.create || function(e) {
				var t = function() {};
				return t.prototype = e, new t
			},
			b = Object.keys || function(e) {
				var t = [];
				for(var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
				return n
			},
			k = Function.prototype.bind || function(e) {
				var t = this;
				return function() {
					return t.apply(e, arguments)
				}
			};
		t.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0;
		var w = 10,
			x;
		try {
			var S = {};
			Object.defineProperty && Object.defineProperty(S, "x", {
				value: 0
			}), x = 0 === S.x
		} catch(e) {
			x = !1
		}
		x ? Object.defineProperty(n, "defaultMaxListeners", {
			enumerable: !0,
			get: function() {
				return w
			},
			set: function(e) {
				if("number" != typeof e || 0 > e || e !== e) throw new TypeError("\"defaultMaxListeners\" must be a positive number");
				w = e
			}
		}) : n.defaultMaxListeners = w, n.prototype.setMaxListeners = function(e) {
			if("number" != typeof e || 0 > e || isNaN(e)) throw new TypeError("\"n\" argument must be a positive number");
			return this._maxListeners = e, this
		}, n.prototype.getMaxListeners = function() {
			return r(this)
		}, n.prototype.emit = function(e) {
			var t = "error" === e,
				n, r, o, u, p, f;
			if(f = this._events, f) t = t && null == f.error;
			else if(!t) return !1;
			if(t) {
				if(1 < arguments.length && (n = arguments[1]), n instanceof Error) throw n;
				else {
					var m = new Error("Unhandled \"error\" event. (" + n + ")");
					throw m.context = n, m
				}
				return !1
			}
			if(r = f[e], !r) return !1;
			var h = "function" == typeof r;
			switch(o = arguments.length, o) {
				case 1:
					a(r, h, this);
					break;
				case 2:
					s(r, h, this, arguments[1]);
					break;
				case 3:
					d(r, h, this, arguments[1], arguments[2]);
					break;
				case 4:
					l(r, h, this, arguments[1], arguments[2], arguments[3]);
					break;
				default:
					for(u = Array(o - 1), p = 1; p < o; p++) u[p - 1] = arguments[p];
					c(r, h, this, u);
			}
			return !0
		}, n.prototype.addListener = function(e, t) {
			return i(this, e, t, !1)
		}, n.prototype.on = n.prototype.addListener, n.prototype.prependListener = function(e, t) {
			return i(this, e, t, !0)
		}, n.prototype.once = function(e, t) {
			if("function" != typeof t) throw new TypeError("\"listener\" argument must be a function");
			return this.on(e, p(this, e, t)), this
		}, n.prototype.prependOnceListener = function(e, t) {
			if("function" != typeof t) throw new TypeError("\"listener\" argument must be a function");
			return this.prependListener(e, p(this, e, t)), this
		}, n.prototype.removeListener = function(e, t) {
			var n, r, a, o, s;
			if("function" != typeof t) throw new TypeError("\"listener\" argument must be a function");
			if(r = this._events, !r) return this;
			if(n = r[e], !n) return this;
			if(n === t || n.listener === t) 0 == --this._eventsCount ? this._events = y(null) : (delete r[e], r.removeListener && this.emit("removeListener", e, n.listener || t));
			else if("function" != typeof n) {
				for(a = -1, o = n.length - 1; 0 <= o; o--)
					if(n[o] === t || n[o].listener === t) {
						s = n[o].listener, a = o;
						break
					}
				if(0 > a) return this;
				0 === a ? n.shift() : h(n, a), 1 === n.length && (r[e] = n[0]), r.removeListener && this.emit("removeListener", e, s || t)
			}
			return this
		}, n.prototype.removeAllListeners = function(e) {
			var t, n, r;
			if(n = this._events, !n) return this;
			if(!n.removeListener) return 0 === arguments.length ? (this._events = y(null), this._eventsCount = 0) : n[e] && (0 == --this._eventsCount ? this._events = y(null) : delete n[e]), this;
			if(0 === arguments.length) {
				var a = b(n),
					o;
				for(r = 0; r < a.length; ++r) o = a[r], "removeListener" === o || this.removeAllListeners(o);
				return this.removeAllListeners("removeListener"), this._events = y(null), this._eventsCount = 0, this
			}
			if(t = n[e], "function" == typeof t) this.removeListener(e, t);
			else if(t)
				for(r = t.length - 1; 0 <= r; r--) this.removeListener(e, t[r]);
			return this
		}, n.prototype.listeners = function(e) {
			return f(this, e, !0)
		}, n.prototype.rawListeners = function(e) {
			return f(this, e, !1)
		}, n.listenerCount = function(e, t) {
			return "function" == typeof e.listenerCount ? e.listenerCount(t) : m.call(e, t)
		}, n.prototype.listenerCount = m, n.prototype.eventNames = function() {
			return 0 < this._eventsCount ? Reflect.ownKeys(this._events) : []
		}
	}, {}],
	83: [function(e, t, n) {
		arguments[4][11][0].apply(n, arguments)
	}, {
		"./_stream_readable": 85,
		"./_stream_writable": 87,
		"core-util-is": 75,
		dup: 11,
		inherits: 99,
		"process-nextick-args": 204
	}],
	84: [function(e, t, n) {
		arguments[4][12][0].apply(n, arguments)
	}, {
		"./_stream_transform": 86,
		"core-util-is": 75,
		dup: 12,
		inherits: 99
	}],
	85: [function(e, t, n) {
		arguments[4][13][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 83,
		"./internal/streams/BufferList": 88,
		"./internal/streams/destroy": 89,
		"./internal/streams/stream": 90,
		_process: 205,
		"core-util-is": 75,
		dup: 13,
		events: 82,
		inherits: 99,
		isarray: 104,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		"string_decoder/": 296,
		util: 35
	}],
	86: [function(e, t, n) {
		arguments[4][14][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 83,
		"core-util-is": 75,
		dup: 14,
		inherits: 99
	}],
	87: [function(e, t, n) {
		arguments[4][15][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 83,
		"./internal/streams/destroy": 89,
		"./internal/streams/stream": 90,
		_process: 205,
		"core-util-is": 75,
		dup: 15,
		inherits: 99,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		timers: 301,
		"util-deprecate": 313
	}],
	88: [function(e, t, n) {
		arguments[4][16][0].apply(n, arguments)
	}, {
		dup: 16,
		"safe-buffer": 241,
		util: 35
	}],
	89: [function(e, t, n) {
		arguments[4][17][0].apply(n, arguments)
	}, {
		dup: 17,
		"process-nextick-args": 204
	}],
	90: [function(e, t, n) {
		arguments[4][18][0].apply(n, arguments)
	}, {
		dup: 18,
		events: 82
	}],
	91: [function(e, t, n) {
		arguments[4][19][0].apply(n, arguments)
	}, {
		"./lib/_stream_duplex.js": 83,
		"./lib/_stream_passthrough.js": 84,
		"./lib/_stream_readable.js": 85,
		"./lib/_stream_transform.js": 86,
		"./lib/_stream_writable.js": 87,
		dup: 19
	}],
	92: [function(e, t) {
		function n(e, t) {
			var a = this;
			return this instanceof n ? void(t = t || {}, r.call(this, t), this._offset = 0, this._ready = !1, this._file = e, this._size = e.size, this._chunkSize = t.chunkSize || Math.max(this._size / 1e3, 204800), this.reader = new FileReader, this._generateHeaderBlocks(e, t, function(e, t) {
				return e ? a.emit("error", e) : void(Array.isArray(t) && t.forEach(function(e) {
					a.push(e)
				}), a._ready = !0, a.emit("_ready"))
			})) : new n(e, t)
		}
		var r = e("readable-stream").Readable,
			a = e("inherits"),
			o = /^.*\.(\w+)$/,
			s = e("typedarray-to-buffer");
		a(n, r), t.exports = n, n.prototype._generateHeaderBlocks = function(e, t, n) {
			n(null, [])
		}, n.prototype._read = function() {
			if(!this._ready) return void this.once("_ready", this._read.bind(this));
			var e = this,
				t = this.reader,
				n = this._offset,
				r = this._offset + this._chunkSize;
			return r > this._size && (r = this._size), n === this._size ? (this.destroy(), void this.push(null)) : void(t.onload = function() {
				e._offset = r, e.push(s(t.result))
			}, t.onerror = function() {
				e.emit("error", t.error)
			}, t.readAsArrayBuffer(this._file.slice(n, r)))
		}, n.prototype.destroy = function() {
			if(this._file = null, this.reader) {
				this.reader.onload = null, this.reader.onerror = null;
				try {
					this.reader.abort()
				} catch(t) {}
			}
			this.reader = null
		}
	}, {
		inherits: 99,
		"readable-stream": 91,
		"typedarray-to-buffer": 305
	}],
	93: [function(e, t) {
		t.exports = function(e, t) {
			function n(e, r) {
				return e.reduce(function(e, a) {
					return Array.isArray(a) && r < t ? e.concat(n(a, r + 1)) : e.concat(a)
				}, [])
			}
			return t = "number" == typeof t ? t : 1 / 0, t ? n(e, 1) : Array.isArray(e) ? e.map(function(e) {
				return e
			}) : e
		}
	}, {}],
	94: [function(e, t) {
		t.exports = function() {
			if("undefined" == typeof window) return null;
			var e = {
				RTCPeerConnection: window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
				RTCSessionDescription: window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription,
				RTCIceCandidate: window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate
			};
			return e.RTCPeerConnection ? e : null
		}
	}, {}],
	95: [function(e, t) {
		function n(e) {
			if("string" == typeof e && (e = a.parse(e)), e.protocol || (e.protocol = "https:"), "https:" !== e.protocol) throw new Error("Protocol \"" + e.protocol + "\" not supported. Expected \"https:\"");
			return e
		}
		var r = e("http"),
			a = e("url"),
			o = t.exports;
		for(var s in r) r.hasOwnProperty(s) && (o[s] = r[s]);
		o.request = function(e, t) {
			return e = n(e), r.request.call(this, e, t)
		}, o.get = function(e, t) {
			return e = n(e), r.get.call(this, e, t)
		}
	}, {
		http: 280,
		url: 310
	}],
	96: [function(e, t, n) {
		var r = Math.pow;
		n.read = function(t, n, a, o, l) {
			var c = 8 * l - o - 1,
				u = (1 << c) - 1,
				p = u >> 1,
				f = -7,
				h = a ? l - 1 : 0,
				_ = a ? -1 : 1,
				d = t[n + h],
				g, y;
			for(h += _, g = d & (1 << -f) - 1, d >>= -f, f += c; 0 < f; g = 256 * g + t[n + h], h += _, f -= 8);
			for(y = g & (1 << -f) - 1, g >>= -f, f += o; 0 < f; y = 256 * y + t[n + h], h += _, f -= 8);
			if(0 === g) g = 1 - p;
			else {
				if(g === u) return y ? NaN : (d ? -1 : 1) * (1 / 0);
				y += r(2, o), g -= p
			}
			return(d ? -1 : 1) * y * r(2, g - o)
		}, n.write = function(t, n, a, o, l, u) {
			var p = 8 * u - l - 1,
				f = (1 << p) - 1,
				h = f >> 1,
				_ = 23 === l ? 5.960464477539063e-8 - 6.617444900424222e-24 : 0,
				g = o ? 0 : u - 1,
				y = o ? 1 : -1,
				d = 0 > n || 0 === n && 0 > 1 / n ? 1 : 0,
				s, b, k;
			for(n = Math.abs(n), isNaN(n) || n === 1 / 0 ? (b = isNaN(n) ? 1 : 0, s = f) : (s = Math.floor(Math.log(n) / Math.LN2), 1 > n * (k = r(2, -s)) && (s--, k *= 2), n += 1 <= s + h ? _ / k : _ * r(2, 1 - h), 2 <= n * k && (s++, k /= 2), s + h >= f ? (b = 0, s = f) : 1 <= s + h ? (b = (n * k - 1) * r(2, l), s += h) : (b = n * r(2, h - 1) * r(2, l), s = 0)); 8 <= l; t[a + g] = 255 & b, g += y, b /= 256, l -= 8);
			for(s = s << l | b, p += l; 0 < p; t[a + g] = 255 & s, g += y, s /= 256, p -= 8);
			t[a + g - y] |= 128 * d
		}
	}, {}],
	97: [function(e, t) {
		(function(e) {
			function n(t, n, r) {
				e.nextTick(() => {
					t && t(n, r)
				})
			}
			t.exports = class {
				constructor(e) {
					if(this.store = e, this.chunkLength = e.chunkLength, !this.store || !this.store.get || !this.store.put) throw new Error("First argument must be abstract-chunk-store compliant");
					this.mem = []
				}
				put(e, t, n) {
					this.mem[e] = t, this.store.put(e, t, t => {
						this.mem[e] = null, n && n(t)
					})
				}
				get(e, t, r) {
					if("function" == typeof t) return this.get(e, null, t);
					const a = t && t.offset || 0,
						o = t && t.length && a + t.length,
						s = this.mem[e];
					return s ? n(r, null, t ? s.slice(a, o) : s) : void this.store.get(e, t, r)
				}
				close(e) {
					this.store.close(e)
				}
				destroy(e) {
					this.store.destroy(e)
				}
			}
		}).call(this, e("_process"))
	}, {
		_process: 205
	}],
	98: [function(e, t) {
		(function(e) {
			"use strict";

			function n() {
				u = !0;
				for(var e = c.length, t, n; e;) {
					for(n = c, c = [], t = -1; ++t < e;) n[t]();
					e = c.length
				}
				u = !1
			}

			function r(e) {
				1 !== c.push(e) || u || o()
			}
			var a = e.MutationObserver || e.WebKitMutationObserver,
				o;
			if(a) {
				var s = 0,
					i = new a(n),
					d = e.document.createTextNode("");
				i.observe(d, {
					characterData: !0
				}), o = function() {
					d.data = s = ++s % 2
				}
			} else if(!e.setImmediate && "undefined" != typeof e.MessageChannel) {
				var l = new e.MessageChannel;
				l.port1.onmessage = n, o = function() {
					l.port2.postMessage(0)
				}
			} else o = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
				var t = e.document.createElement("script");
				t.onreadystatechange = function() {
					n(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null
				}, e.document.documentElement.appendChild(t)
			} : function() {
				setTimeout(n, 0)
			};
			var c = [],
				u;
			t.exports = r
		}).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
	}, {}],
	99: [function(e, t) {
		t.exports = "function" == typeof Object.create ? function(e, t) {
			e.super_ = t, e.prototype = Object.create(t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			})
		} : function(e, t) {
			e.super_ = t;
			var n = function() {};
			n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
		}
	}, {}],
	100: [function(e, t) {
		t.exports = function(e) {
			for(var t = 0, n = e.length; t < n; ++t)
				if(e.charCodeAt(t) > 127) return !1;
			return !0
		}
	}, {}],
	101: [function(e, t) {
		function n(e) {
			return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
		}

		function r(e) {
			return "function" == typeof e.readFloatLE && "function" == typeof e.slice && n(e.slice(0, 0))
		}
		t.exports = function(e) {
			return null != e && (n(e) || r(e) || !!e._isBuffer)
		}
	}, {}],
	102: [function(e, t) {
		"use strict";

		function n(e) {
			return r.existsSync(e) && r.statSync(e).isFile()
		}
		var r = e("fs");
		t.exports = function(e, t) {
			return t ? void r.stat(e, function(e, n) {
				return e ? t(e) : t(null, n.isFile())
			}) : n(e)
		}, t.exports.sync = n
	}, {
		fs: 36
	}],
	103: [function(e, t) {
		function n(e) {
			return r(e) || a(e)
		}

		function r(e) {
			return e instanceof Int8Array || e instanceof Int16Array || e instanceof Int32Array || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Uint16Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array
		}

		function a(e) {
			return s[o.call(e)]
		}
		t.exports = n, n.strict = r, n.loose = a;
		var o = Object.prototype.toString,
			s = {
				"[object Int8Array]": !0,
				"[object Int16Array]": !0,
				"[object Int32Array]": !0,
				"[object Uint8Array]": !0,
				"[object Uint8ClampedArray]": !0,
				"[object Uint16Array]": !0,
				"[object Uint32Array]": !0,
				"[object Float32Array]": !0,
				"[object Float64Array]": !0
			}
	}, {}],
	104: [function(e, t) {
		var n = {}.toString;
		t.exports = Array.isArray || function(e) {
			return "[object Array]" == n.call(e)
		}
	}, {}],
	105: [function(e, t, n) {
		"use strict";
		var r = e("./utils"),
			a = e("./support"),
			o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		n.encode = function(e) {
			for(var t = [], n = 0, a = e.length, s = a, d = "string" !== r.getTypeOf(e), l, c, u, p, f, m, h; n < e.length;) s = a - n, d ? (l = e[n++], c = n < a ? e[n++] : 0, u = n < a ? e[n++] : 0) : (l = e.charCodeAt(n++), c = n < a ? e.charCodeAt(n++) : 0, u = n < a ? e.charCodeAt(n++) : 0), p = l >> 2, f = (3 & l) << 4 | c >> 4, m = 1 < s ? (15 & c) << 2 | u >> 6 : 64, h = 2 < s ? 63 & u : 64, t.push(o.charAt(p) + o.charAt(f) + o.charAt(m) + o.charAt(h));
			return t.join("")
		}, n.decode = function(e) {
			var t = 0,
				n = 0,
				r = "data:",
				s, d, l, c, u, p, f;
			if(e.substr(0, r.length) === r) throw new Error("Invalid base64 input, it looks like a data url.");
			e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			var m = 3 * e.length / 4;
			if(e.charAt(e.length - 1) === o.charAt(64) && m--, e.charAt(e.length - 2) === o.charAt(64) && m--, 0 != m % 1) throw new Error("Invalid base64 input, bad content length.");
			var h;
			for(h = a.uint8array ? new Uint8Array(0 | m) : Array(0 | m); t < e.length;) c = o.indexOf(e.charAt(t++)), u = o.indexOf(e.charAt(t++)), p = o.indexOf(e.charAt(t++)), f = o.indexOf(e.charAt(t++)), s = c << 2 | u >> 4, d = (15 & u) << 4 | p >> 2, l = (3 & p) << 6 | f, h[n++] = s, 64 !== p && (h[n++] = d), 64 !== f && (h[n++] = l);
			return h
		}
	}, {
		"./support": 134,
		"./utils": 136
	}],
	106: [function(e, t) {
		"use strict";

		function n(e, t, n, r, a) {
			this.compressedSize = e, this.uncompressedSize = t, this.crc32 = n, this.compression = r, this.compressedContent = a
		}
		var r = e("./external"),
			a = e("./stream/DataWorker"),
			o = e("./stream/DataLengthProbe"),
			s = e("./stream/Crc32Probe"),
			o = e("./stream/DataLengthProbe");
		n.prototype = {
			getContentWorker: function() {
				var e = new a(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o("data_length")),
					t = this;
				return e.on("end", function() {
					if(this.streamInfo.data_length !== t.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch")
				}), e
			},
			getCompressedWorker: function() {
				return new a(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression)
			}
		}, n.createWorkerFrom = function(e, t, n) {
			return e.pipe(new s).pipe(new o("uncompressedSize")).pipe(t.compressWorker(n)).pipe(new o("compressedSize")).withStreamInfo("compression", t)
		}, t.exports = n
	}, {
		"./external": 110,
		"./stream/Crc32Probe": 129,
		"./stream/DataLengthProbe": 130,
		"./stream/DataWorker": 131
	}],
	107: [function(e, t, n) {
		"use strict";
		var r = e("./stream/GenericWorker");
		n.STORE = {
			magic: "\0\0",
			compressWorker: function() {
				return new r("STORE compression")
			},
			uncompressWorker: function() {
				return new r("STORE decompression")
			}
		}, n.DEFLATE = e("./flate")
	}, {
		"./flate": 111,
		"./stream/GenericWorker": 132
	}],
	108: [function(e, t) {
		"use strict";

		function n(e, t, n, r) {
			e ^= -1;
			for(var a = r; a < r + n; a++) e = e >>> 8 ^ o[255 & (e ^ t[a])];
			return -1 ^ e
		}

		function r(e, t, n, r) {
			e ^= -1;
			for(var a = r; a < r + n; a++) e = e >>> 8 ^ o[255 & (e ^ t.charCodeAt(a))];
			return -1 ^ e
		}
		var a = e("./utils"),
			o = function() {
				for(var e = [], t = 0, r; 256 > t; t++) {
					r = t;
					for(var a = 0; 8 > a; a++) r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
					e[t] = r
				}
				return e
			}();
		t.exports = function(e, t) {
			if("undefined" == typeof e || !e.length) return 0;
			var o = "string" !== a.getTypeOf(e);
			return o ? n(0 | t, e, e.length, 0) : r(0 | t, e, e.length, 0)
		}
	}, {
		"./utils": 136
	}],
	109: [function(e, t, n) {
		"use strict";
		n.base64 = !1, n.binary = !1, n.dir = !1, n.createFolders = !0, n.date = null, n.compression = null, n.compressionOptions = null, n.comment = null, n.unixPermissions = null, n.dosPermissions = null
	}, {}],
	110: [function(e, t) {
		"use strict";
		var n = null;
		n = "undefined" == typeof Promise ? e("lie") : Promise, t.exports = {
			Promise: n
		}
	}, {
		lie: 141
	}],
	111: [function(e, t, n) {
		"use strict";

		function r(e, t) {
			i.call(this, "FlateWorker/" + e), this._pako = null, this._pakoAction = e, this._pakoOptions = t, this.meta = {}
		}
		var a = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array,
			o = e("pako"),
			s = e("./utils"),
			i = e("./stream/GenericWorker"),
			d = a ? "uint8array" : "array";
		n.magic = "\b\0", s.inherits(r, i), r.prototype.processChunk = function(e) {
			this.meta = e.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(d, e.data), !1)
		}, r.prototype.flush = function() {
			i.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], !0)
		}, r.prototype.cleanUp = function() {
			i.prototype.cleanUp.call(this), this._pako = null
		}, r.prototype._createPako = function() {
			this._pako = new o[this._pakoAction]({
				raw: !0,
				level: this._pakoOptions.level || -1
			});
			var e = this;
			this._pako.onData = function(t) {
				e.push({
					data: t,
					meta: e.meta
				})
			}
		}, n.compressWorker = function(e) {
			return new r("Deflate", e)
		}, n.uncompressWorker = function() {
			return new r("Inflate", {})
		}
	}, {
		"./stream/GenericWorker": 132,
		"./utils": 136,
		pako: 183
	}],
	112: [function(e, t) {
		"use strict";

		function n(e, t, n, r) {
			a.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t, this.zipPlatform = n, this.encodeFileName = r, this.streamFiles = e, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = []
		}
		var r = e("../utils"),
			a = e("../stream/GenericWorker"),
			o = e("../utf8"),
			s = e("../crc32"),
			i = e("../signature"),
			d = function(e, t) {
				var n = "",
					r;
				for(r = 0; r < t; r++) n += String.fromCharCode(255 & e), e >>>= 8;
				return n
			},
			l = function(e, t) {
				var n = e;
				return e || (n = t ? 16893 : 33204), (65535 & n) << 16
			},
			c = function(e) {
				return 63 & (e || 0)
			},
			u = function(e, t, n, a, u, p) {
				var f = e.file,
					m = e.compression,
					h = p !== o.utf8encode,
					_ = r.transformTo("string", p(f.name)),
					g = r.transformTo("string", o.utf8encode(f.name)),
					y = f.comment,
					b = r.transformTo("string", p(y)),
					k = r.transformTo("string", o.utf8encode(y)),
					w = g.length !== f.name.length,
					x = k.length !== y.length,
					S = "",
					v = "",
					E = "",
					C = f.dir,
					T = f.date,
					I = {
						crc32: 0,
						compressedSize: 0,
						uncompressedSize: 0
					},
					L, R;
				(!t || n) && (I.crc32 = e.crc32, I.compressedSize = e.compressedSize, I.uncompressedSize = e.uncompressedSize);
				var B = 0;
				t && (B |= 8), !h && (w || x) && (B |= 2048);
				var A = 0,
					O = 0;
				C && (A |= 16), "UNIX" === u ? (O = 798, A |= l(f.unixPermissions, C)) : (O = 20, A |= c(f.dosPermissions, C)), L = T.getUTCHours(), L <<= 6, L |= T.getUTCMinutes(), L <<= 5, L |= T.getUTCSeconds() / 2, R = T.getUTCFullYear() - 1980, R <<= 4, R |= T.getUTCMonth() + 1, R <<= 5, R |= T.getUTCDate(), w && (v = d(1, 1) + d(s(_), 4) + g, S += "up" + d(v.length, 2) + v), x && (E = d(1, 1) + d(s(b), 4) + k, S += "uc" + d(E.length, 2) + E);
				var D = "";
				D += "\n\0", D += d(B, 2), D += m.magic, D += d(L, 2), D += d(R, 2), D += d(I.crc32, 4), D += d(I.compressedSize, 4), D += d(I.uncompressedSize, 4), D += d(_.length, 2), D += d(S.length, 2);
				var M = i.LOCAL_FILE_HEADER + D + _ + S,
					P = i.CENTRAL_FILE_HEADER + d(O, 2) + D + d(b.length, 2) + "\0\0\0\0" + d(A, 4) + d(a, 4) + _ + S + b;
				return {
					fileRecord: M,
					dirRecord: P
				}
			},
			p = function(e, t, n, a, o) {
				var s = "",
					l = r.transformTo("string", o(a));
				return s = i.CENTRAL_DIRECTORY_END + "\0\0\0\0" + d(e, 2) + d(e, 2) + d(t, 4) + d(n, 4) + d(l.length, 2) + l, s
			},
			f = function(e) {
				var t = "";
				return t = i.DATA_DESCRIPTOR + d(e.crc32, 4) + d(e.compressedSize, 4) + d(e.uncompressedSize, 4), t
			};
		r.inherits(n, a), n.prototype.push = function(e) {
			var t = e.meta.percent || 0,
				n = this.entriesCount,
				r = this._sources.length;
			this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, a.prototype.push.call(this, {
				data: e.data,
				meta: {
					currentFile: this.currentFile,
					percent: n ? (t + 100 * (n - r - 1)) / n : 100
				}
			}))
		}, n.prototype.openedSource = function(e) {
			this.currentSourceOffset = this.bytesWritten, this.currentFile = e.file.name;
			var t = this.streamFiles && !e.file.dir;
			if(t) {
				var n = u(e, t, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
				this.push({
					data: n.fileRecord,
					meta: {
						percent: 0
					}
				})
			} else this.accumulate = !0
		}, n.prototype.closedSource = function(e) {
			this.accumulate = !1;
			var t = this.streamFiles && !e.file.dir,
				n = u(e, t, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
			if(this.dirRecords.push(n.dirRecord), t) this.push({
				data: f(e),
				meta: {
					percent: 100
				}
			});
			else
				for(this.push({
						data: n.fileRecord,
						meta: {
							percent: 0
						}
					}); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
			this.currentFile = null
		}, n.prototype.flush = function() {
			for(var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++) this.push({
				data: this.dirRecords[t],
				meta: {
					percent: 100
				}
			});
			var n = this.bytesWritten - e,
				r = p(this.dirRecords.length, n, e, this.zipComment, this.encodeFileName);
			this.push({
				data: r,
				meta: {
					percent: 100
				}
			})
		}, n.prototype.prepareNextSource = function() {
			this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume()
		}, n.prototype.registerPrevious = function(e) {
			this._sources.push(e);
			var t = this;
			return e.on("data", function(e) {
				t.processChunk(e)
			}), e.on("end", function() {
				t.closedSource(t.previous.streamInfo), t._sources.length ? t.prepareNextSource() : t.end()
			}), e.on("error", function(n) {
				t.error(n)
			}), this
		}, n.prototype.resume = function() {
			return !!a.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0))
		}, n.prototype.error = function(t) {
			var e = this._sources;
			if(!a.prototype.error.call(this, t)) return !1;
			for(var n = 0; n < e.length; n++) try {
				e[n].error(t)
			} catch(t) {}
			return !0
		}, n.prototype.lock = function() {
			a.prototype.lock.call(this);
			for(var e = this._sources, t = 0; t < e.length; t++) e[t].lock()
		}, t.exports = n
	}, {
		"../crc32": 108,
		"../signature": 127,
		"../stream/GenericWorker": 132,
		"../utf8": 135,
		"../utils": 136
	}],
	113: [function(e, t, n) {
		"use strict";
		var r = e("../compressions"),
			a = e("./ZipFileWorker"),
			o = function(e, t) {
				var n = e || t,
					a = r[n];
				if(!a) throw new Error(n + " is not a valid compression method !");
				return a
			};
		n.generateWorker = function(e, t, n) {
			var r = new a(t.streamFiles, n, t.platform, t.encodeFileName),
				s = 0;
			try {
				e.forEach(function(e, n) {
					s++;
					var a = o(n.options.compression, t.compression),
						i = n.options.compressionOptions || t.compressionOptions || {},
						d = n.dir,
						l = n.date;
					n._compressWorker(a, i).withStreamInfo("file", {
						name: e,
						dir: d,
						date: l,
						comment: n.comment || "",
						unixPermissions: n.unixPermissions,
						dosPermissions: n.dosPermissions
					}).pipe(r)
				}), r.entriesCount = s
			} catch(t) {
				r.error(t)
			}
			return r
		}
	}, {
		"../compressions": 107,
		"./ZipFileWorker": 112
	}],
	114: [function(e, t) {
		"use strict";

		function n() {
			if(!(this instanceof n)) return new n;
			if(arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
			this.files = {}, this.comment = null, this.root = "", this.clone = function() {
				var e = new n;
				for(var t in this) "function" != typeof this[t] && (e[t] = this[t]);
				return e
			}
		}
		n.prototype = e("./object"), n.prototype.loadAsync = e("./load"), n.support = e("./support"), n.defaults = e("./defaults"), n.version = "3.1.5", n.loadAsync = function(e, t) {
			return new n().loadAsync(e, t)
		}, n.external = e("./external"), t.exports = n
	}, {
		"./defaults": 109,
		"./external": 110,
		"./load": 115,
		"./object": 119,
		"./support": 134
	}],
	115: [function(e, t) {
		"use strict";

		function n(e) {
			return new a.Promise(function(t, n) {
				var r = e.decompressed.getContentWorker().pipe(new i);
				r.on("error", function(t) {
					n(t)
				}).on("end", function() {
					r.streamInfo.crc32 === e.decompressed.crc32 ? t() : n(new Error("Corrupted zip : CRC32 mismatch"))
				}).resume()
			})
		}
		var r = e("./utils"),
			a = e("./external"),
			o = e("./utf8"),
			r = e("./utils"),
			s = e("./zipEntries"),
			i = e("./stream/Crc32Probe"),
			d = e("./nodejsUtils");
		t.exports = function(e, t) {
			var l = this;
			return t = r.extend(t || {}, {
				base64: !1,
				checkCRC32: !1,
				optimizedBinaryString: !1,
				createFolders: !1,
				decodeFileName: o.utf8decode
			}), d.isNode && d.isStream(e) ? a.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : r.prepareContent("the loaded zip file", e, !0, t.optimizedBinaryString, t.base64).then(function(e) {
				var n = new s(t);
				return n.load(e), n
			}).then(function(e) {
				var r = [a.Promise.resolve(e)],
					o = e.files;
				if(t.checkCRC32)
					for(var s = 0; s < o.length; s++) r.push(n(o[s]));
				return a.Promise.all(r)
			}).then(function(e) {
				for(var n = e.shift(), r = n.files, a = 0, o; a < r.length; a++) o = r[a], l.file(o.fileNameStr, o.decompressed, {
					binary: !0,
					optimizedBinaryString: !0,
					date: o.date,
					dir: o.dir,
					comment: o.fileCommentStr.length ? o.fileCommentStr : null,
					unixPermissions: o.unixPermissions,
					dosPermissions: o.dosPermissions,
					createFolders: t.createFolders
				});
				return n.zipComment.length && (l.comment = n.zipComment), l
			})
		}
	}, {
		"./external": 110,
		"./nodejsUtils": 118,
		"./stream/Crc32Probe": 129,
		"./utf8": 135,
		"./utils": 136,
		"./zipEntries": 137
	}],
	116: [function(e, t) {
		"use strict";

		function n(e, t) {
			a.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = !1, this._bindStream(t)
		}
		var r = e("../utils"),
			a = e("../stream/GenericWorker");
		r.inherits(n, a), n.prototype._bindStream = function(e) {
			var t = this;
			this._stream = e, e.pause(), e.on("data", function(e) {
				t.push({
					data: e,
					meta: {
						percent: 0
					}
				})
			}).on("error", function(n) {
				t.isPaused ? this.generatedError = n : t.error(n)
			}).on("end", function() {
				t.isPaused ? t._upstreamEnded = !0 : t.end()
			})
		}, n.prototype.pause = function() {
			return !!a.prototype.pause.call(this) && (this._stream.pause(), !0)
		}, n.prototype.resume = function() {
			return !!a.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
		}, t.exports = n
	}, {
		"../stream/GenericWorker": 132,
		"../utils": 136
	}],
	117: [function(e, t) {
		"use strict";

		function n(e, t, n) {
			r.call(this, t), this._helper = e;
			var a = this;
			e.on("data", function(e, t) {
				a.push(e) || a._helper.pause(), n && n(t)
			}).on("error", function(t) {
				a.emit("error", t)
			}).on("end", function() {
				a.push(null)
			})
		}
		var r = e("readable-stream").Readable,
			a = e("../utils");
		a.inherits(n, r), n.prototype._read = function() {
			this._helper.resume()
		}, t.exports = n
	}, {
		"../utils": 136,
		"readable-stream": 120
	}],
	118: [function(e, t) {
		(function(e) {
			"use strict";
			t.exports = {
				isNode: "undefined" != typeof e,
				newBufferFrom: function(t, n) {
					return new e(t, n)
				},
				allocBuffer: function(t) {
					return e.alloc ? e.alloc(t) : new e(t)
				},
				isBuffer: function(t) {
					return e.isBuffer(t)
				},
				isStream: function(e) {
					return e && "function" == typeof e.on && "function" == typeof e.pause && "function" == typeof e.resume
				}
			}
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41
	}],
	119: [function(e, t) {
		"use strict";

		function n(e) {
			return "[object RegExp]" === Object.prototype.toString.call(e)
		}
		var r = e("./utf8"),
			a = e("./utils"),
			s = e("./stream/GenericWorker"),
			o = e("./stream/StreamHelper"),
			i = e("./defaults"),
			d = e("./compressedObject"),
			l = e("./zipObject"),
			c = e("./generate"),
			u = e("./nodejsUtils"),
			p = e("./nodejs/NodejsStreamInputAdapter"),
			f = function(e, t, n) {
				var r = a.getTypeOf(t),
					c = a.extend(n || {}, i),
					o;
				c.date = c.date || new Date, null !== c.compression && (c.compression = c.compression.toUpperCase()), "string" == typeof c.unixPermissions && (c.unixPermissions = parseInt(c.unixPermissions, 8)), c.unixPermissions && 16384 & c.unixPermissions && (c.dir = !0), c.dosPermissions && 16 & c.dosPermissions && (c.dir = !0), c.dir && (e = h(e)), c.createFolders && (o = m(e)) && _.call(this, o, !0);
				var f = "string" === r && !1 === c.binary && !1 === c.base64;
				n && "undefined" != typeof n.binary || (c.binary = !f);
				var g = t instanceof d && 0 === t.uncompressedSize;
				(g || c.dir || !t || 0 === t.length) && (c.base64 = !1, c.binary = !0, t = "", c.compression = "STORE", r = "string");
				var y = null;
				y = t instanceof d || t instanceof s ? t : u.isNode && u.isStream(t) ? new p(e, t) : a.prepareContent(e, t, c.binary, c.optimizedBinaryString, c.base64);
				var b = new l(e, y, c);
				this.files[e] = b
			},
			m = function(e) {
				"/" === e.slice(-1) && (e = e.substring(0, e.length - 1));
				var t = e.lastIndexOf("/");
				return 0 < t ? e.substring(0, t) : ""
			},
			h = function(e) {
				return "/" !== e.slice(-1) && (e += "/"), e
			},
			_ = function(e, t) {
				return t = "undefined" == typeof t ? i.createFolders : t, e = h(e), this.files[e] || f.call(this, e, null, {
					dir: !0,
					createFolders: t
				}), this.files[e]
			};
		t.exports = {
			load: function() {
				throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
			},
			forEach: function(e) {
				var t, n, r;
				for(t in this.files) this.files.hasOwnProperty(t) && (r = this.files[t], n = t.slice(this.root.length, t.length), n && t.slice(0, this.root.length) === this.root && e(n, r))
			},
			filter: function(e) {
				var t = [];
				return this.forEach(function(n, r) {
					e(n, r) && t.push(r)
				}), t
			},
			file: function(e, t, r) {
				if(1 === arguments.length) {
					if(n(e)) {
						var a = e;
						return this.filter(function(e, t) {
							return !t.dir && a.test(e)
						})
					}
					var o = this.files[this.root + e];
					return o && !o.dir ? o : null
				}
				return e = this.root + e, f.call(this, e, t, r), this
			},
			folder: function(e) {
				if(!e) return this;
				if(n(e)) return this.filter(function(t, n) {
					return n.dir && e.test(t)
				});
				var t = this.root + e,
					r = _.call(this, t),
					a = this.clone();
				return a.root = r.name, a
			},
			remove: function(e) {
				e = this.root + e;
				var t = this.files[e];
				if(t || ("/" !== e.slice(-1) && (e += "/"), t = this.files[e]), t && !t.dir) delete this.files[e];
				else
					for(var n = this.filter(function(t, n) {
							return n.name.slice(0, e.length) === e
						}), r = 0; r < n.length; r++) delete this.files[n[r].name];
				return this
			},
			generate: function() {
				throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
			},
			generateInternalStream: function(e) {
				var t = {},
					n;
				try {
					if(t = a.extend(e || {}, {
							streamFiles: !1,
							compression: "STORE",
							compressionOptions: null,
							type: "",
							platform: "DOS",
							comment: null,
							mimeType: "application/zip",
							encodeFileName: r.utf8encode
						}), t.type = t.type.toLowerCase(), t.compression = t.compression.toUpperCase(), "binarystring" === t.type && (t.type = "string"), !t.type) throw new Error("No output type specified.");
					a.checkSupport(t.type), ("darwin" === t.platform || "freebsd" === t.platform || "linux" === t.platform || "sunos" === t.platform) && (t.platform = "UNIX"), "win32" === t.platform && (t.platform = "DOS");
					var i = t.comment || this.comment || "";
					n = c.generateWorker(this, t, i)
				} catch(t) {
					n = new s("error"), n.error(t)
				}
				return new o(n, t.type || "string", t.mimeType)
			},
			generateAsync: function(e, t) {
				return this.generateInternalStream(e).accumulate(t)
			},
			generateNodeStream: function(e, t) {
				return e = e || {}, e.type || (e.type = "nodebuffer"), this.generateInternalStream(e).toNodejsStream(t)
			}
		}
	}, {
		"./compressedObject": 106,
		"./defaults": 109,
		"./generate": 113,
		"./nodejs/NodejsStreamInputAdapter": 116,
		"./nodejsUtils": 118,
		"./stream/GenericWorker": 132,
		"./stream/StreamHelper": 133,
		"./utf8": 135,
		"./utils": 136,
		"./zipObject": 139
	}],
	120: [function(e, t) {
		t.exports = e("stream")
	}, {
		stream: 266
	}],
	121: [function(e, t) {
		"use strict";

		function n(e) {
			r.call(this, e);
			for(var t = 0; t < this.data.length; t++) e[t] &= 255
		}
		var r = e("./DataReader"),
			a = e("../utils");
		a.inherits(n, r), n.prototype.byteAt = function(e) {
			return this.data[this.zero + e]
		}, n.prototype.lastIndexOfSignature = function(e) {
			for(var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), a = e.charCodeAt(3), o = this.length - 4; 0 <= o; --o)
				if(this.data[o] === t && this.data[o + 1] === n && this.data[o + 2] === r && this.data[o + 3] === a) return o - this.zero;
			return -1
		}, n.prototype.readAndCheckSignature = function(e) {
			var t = e.charCodeAt(0),
				n = e.charCodeAt(1),
				r = e.charCodeAt(2),
				a = e.charCodeAt(3),
				o = this.readData(4);
			return t === o[0] && n === o[1] && r === o[2] && a === o[3]
		}, n.prototype.readData = function(e) {
			if(this.checkOffset(e), 0 === e) return [];
			var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
			return this.index += e, t
		}, t.exports = n
	}, {
		"../utils": 136,
		"./DataReader": 122
	}],
	122: [function(e, t) {
		"use strict";

		function n(e) {
			this.data = e, this.length = e.length, this.index = 0, this.zero = 0
		}
		var r = e("../utils");
		n.prototype = {
			checkOffset: function(e) {
				this.checkIndex(this.index + e)
			},
			checkIndex: function(e) {
				if(this.length < this.zero + e || 0 > e) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?")
			},
			setIndex: function(e) {
				this.checkIndex(e), this.index = e
			},
			skip: function(e) {
				this.setIndex(this.index + e)
			},
			byteAt: function() {},
			readInt: function(e) {
				var t = 0,
					n;
				for(this.checkOffset(e), n = this.index + e - 1; n >= this.index; n--) t = (t << 8) + this.byteAt(n);
				return this.index += e, t
			},
			readString: function(e) {
				return r.transformTo("string", this.readData(e))
			},
			readData: function() {},
			lastIndexOfSignature: function() {},
			readAndCheckSignature: function() {},
			readDate: function() {
				var e = this.readInt(4);
				return new Date(Date.UTC((127 & e >> 25) + 1980, (15 & e >> 21) - 1, 31 & e >> 16, 31 & e >> 11, 63 & e >> 5, (31 & e) << 1))
			}
		}, t.exports = n
	}, {
		"../utils": 136
	}],
	123: [function(e, t) {
		"use strict";

		function n(e) {
			r.call(this, e)
		}
		var r = e("./Uint8ArrayReader"),
			a = e("../utils");
		a.inherits(n, r), n.prototype.readData = function(e) {
			this.checkOffset(e);
			var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
			return this.index += e, t
		}, t.exports = n
	}, {
		"../utils": 136,
		"./Uint8ArrayReader": 125
	}],
	124: [function(e, t) {
		"use strict";

		function n(e) {
			r.call(this, e)
		}
		var r = e("./DataReader"),
			a = e("../utils");
		a.inherits(n, r), n.prototype.byteAt = function(e) {
			return this.data.charCodeAt(this.zero + e)
		}, n.prototype.lastIndexOfSignature = function(e) {
			return this.data.lastIndexOf(e) - this.zero
		}, n.prototype.readAndCheckSignature = function(e) {
			var t = this.readData(4);
			return e === t
		}, n.prototype.readData = function(e) {
			this.checkOffset(e);
			var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
			return this.index += e, t
		}, t.exports = n
	}, {
		"../utils": 136,
		"./DataReader": 122
	}],
	125: [function(e, t) {
		"use strict";

		function n(e) {
			r.call(this, e)
		}
		var r = e("./ArrayReader"),
			a = e("../utils");
		a.inherits(n, r), n.prototype.readData = function(e) {
			if(this.checkOffset(e), 0 === e) return new Uint8Array(0);
			var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
			return this.index += e, t
		}, t.exports = n
	}, {
		"../utils": 136,
		"./ArrayReader": 121
	}],
	126: [function(e, t) {
		"use strict";
		var n = e("../utils"),
			r = e("../support"),
			a = e("./ArrayReader"),
			o = e("./StringReader"),
			s = e("./NodeBufferReader"),
			i = e("./Uint8ArrayReader");
		t.exports = function(e) {
			var t = n.getTypeOf(e);
			return n.checkSupport(t), "string" !== t || r.uint8array ? "nodebuffer" === t ? new s(e) : r.uint8array ? new i(n.transformTo("uint8array", e)) : new a(n.transformTo("array", e)) : new o(e)
		}
	}, {
		"../support": 134,
		"../utils": 136,
		"./ArrayReader": 121,
		"./NodeBufferReader": 123,
		"./StringReader": 124,
		"./Uint8ArrayReader": 125
	}],
	127: [function(e, t, n) {
		"use strict";
		n.LOCAL_FILE_HEADER = "PK\x03\x04", n.CENTRAL_FILE_HEADER = "PK\x01\x02", n.CENTRAL_DIRECTORY_END = "PK\x05\x06", n.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07", n.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06", n.DATA_DESCRIPTOR = "PK\x07\b"
	}, {}],
	128: [function(e, t) {
		"use strict";

		function n(e) {
			r.call(this, "ConvertWorker to " + e), this.destType = e
		}
		var r = e("./GenericWorker"),
			a = e("../utils");
		a.inherits(n, r), n.prototype.processChunk = function(e) {
			this.push({
				data: a.transformTo(this.destType, e.data),
				meta: e.meta
			})
		}, t.exports = n
	}, {
		"../utils": 136,
		"./GenericWorker": 132
	}],
	129: [function(e, t) {
		"use strict";

		function n() {
			r.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0)
		}
		var r = e("./GenericWorker"),
			a = e("../crc32"),
			o = e("../utils");
		o.inherits(n, r), n.prototype.processChunk = function(e) {
			this.streamInfo.crc32 = a(e.data, this.streamInfo.crc32 || 0), this.push(e)
		}, t.exports = n
	}, {
		"../crc32": 108,
		"../utils": 136,
		"./GenericWorker": 132
	}],
	130: [function(e, t) {
		"use strict";

		function n(e) {
			a.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0)
		}
		var r = e("../utils"),
			a = e("./GenericWorker");
		r.inherits(n, a), n.prototype.processChunk = function(e) {
			if(e) {
				var t = this.streamInfo[this.propName] || 0;
				this.streamInfo[this.propName] = t + e.data.length
			}
			a.prototype.processChunk.call(this, e)
		}, t.exports = n
	}, {
		"../utils": 136,
		"./GenericWorker": 132
	}],
	131: [function(e, t) {
		"use strict";

		function n(e) {
			a.call(this, "DataWorker");
			var t = this;
			this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, e.then(function(e) {
				t.dataIsReady = !0, t.data = e, t.max = e && e.length || 0, t.type = r.getTypeOf(e), t.isPaused || t._tickAndRepeat()
			}, function(n) {
				t.error(n)
			})
		}
		var r = e("../utils"),
			a = e("./GenericWorker");
		r.inherits(n, a), n.prototype.cleanUp = function() {
			a.prototype.cleanUp.call(this), this.data = null
		}, n.prototype.resume = function() {
			return !!a.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, r.delay(this._tickAndRepeat, [], this)), !0)
		}, n.prototype._tickAndRepeat = function() {
			this._tickScheduled = !1;
			this.isPaused || this.isFinished || (this._tick(), !this.isFinished && (r.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0))
		}, n.prototype._tick = function() {
			if(this.isPaused || this.isFinished) return !1;
			var e = null,
				t = Math.min(this.max, this.index + 16384);
			if(this.index >= this.max) return this.end();
			switch(this.type) {
				case "string":
					e = this.data.substring(this.index, t);
					break;
				case "uint8array":
					e = this.data.subarray(this.index, t);
					break;
				case "array":
				case "nodebuffer":
					e = this.data.slice(this.index, t);
			}
			return this.index = t, this.push({
				data: e,
				meta: {
					percent: this.max ? 100 * (this.index / this.max) : 0
				}
			})
		}, t.exports = n
	}, {
		"../utils": 136,
		"./GenericWorker": 132
	}],
	132: [function(e, t) {
		"use strict";

		function n(e) {
			this.name = e || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
				data: [],
				end: [],
				error: []
			}, this.previous = null
		}
		n.prototype = {
			push: function(e) {
				this.emit("data", e)
			},
			end: function() {
				if(this.isFinished) return !1;
				this.flush();
				try {
					this.emit("end"), this.cleanUp(), this.isFinished = !0
				} catch(t) {
					this.emit("error", t)
				}
				return !0
			},
			error: function(t) {
				return !this.isFinished && (this.isPaused ? this.generatedError = t : (this.isFinished = !0, this.emit("error", t), this.previous && this.previous.error(t), this.cleanUp()), !0)
			},
			on: function(e, t) {
				return this._listeners[e].push(t), this
			},
			cleanUp: function() {
				this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = []
			},
			emit: function(e, t) {
				if(this._listeners[e])
					for(var n = 0; n < this._listeners[e].length; n++) this._listeners[e][n].call(this, t)
			},
			pipe: function(e) {
				return e.registerPrevious(this)
			},
			registerPrevious: function(e) {
				if(this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
				this.streamInfo = e.streamInfo, this.mergeStreamInfo(), this.previous = e;
				var t = this;
				return e.on("data", function(e) {
					t.processChunk(e)
				}), e.on("end", function() {
					t.end()
				}), e.on("error", function(n) {
					t.error(n)
				}), this
			},
			pause: function() {
				return !(this.isPaused || this.isFinished) && (this.isPaused = !0, this.previous && this.previous.pause(), !0)
			},
			resume: function() {
				if(!this.isPaused || this.isFinished) return !1;
				this.isPaused = !1;
				var e = !1;
				return this.generatedError && (this.error(this.generatedError), e = !0), this.previous && this.previous.resume(), !e
			},
			flush: function() {},
			processChunk: function(e) {
				this.push(e)
			},
			withStreamInfo: function(e, t) {
				return this.extraStreamInfo[e] = t, this.mergeStreamInfo(), this
			},
			mergeStreamInfo: function() {
				for(var e in this.extraStreamInfo) this.extraStreamInfo.hasOwnProperty(e) && (this.streamInfo[e] = this.extraStreamInfo[e])
			},
			lock: function() {
				if(this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
				this.isLocked = !0, this.previous && this.previous.lock()
			},
			toString: function() {
				var e = "Worker " + this.name;
				return this.previous ? this.previous + " -> " + e : e
			}
		}, t.exports = n
	}, {}],
	133: [function(e, t) {
		(function(n) {
			"use strict";

			function r(e, t, n) {
				return "blob" === e ? i.newBlob(i.transformTo("arraybuffer", t), n) : "base64" === e ? c.encode(t) : i.transformTo(e, t)
			}

			function a(e, t) {
				var r = 0,
					a = null,
					o = 0,
					s;
				for(s = 0; s < t.length; s++) o += t[s].length;
				switch(e) {
					case "string":
						return t.join("");
					case "array":
						return Array.prototype.concat.apply([], t);
					case "uint8array":
						for(a = new Uint8Array(o), s = 0; s < t.length; s++) a.set(t[s], r), r += t[s].length;
						return a;
					case "nodebuffer":
						return n.concat(t);
					default:
						throw new Error("concat : unsupported type '" + e + "'");
				}
			}

			function o(e, t) {
				return new p.Promise(function(n, o) {
					var s = [],
						i = e._internalType,
						d = e._outputType,
						l = e._mimeType;
					e.on("data", function(e, n) {
						s.push(e), t && t(n)
					}).on("error", function(e) {
						s = [], o(e)
					}).on("end", function() {
						try {
							var e = r(d, a(i, s), l);
							n(e)
						} catch(t) {
							o(t)
						}
						s = []
					}).resume()
				})
			}

			function s(e, t, n) {
				var r = t;
				"blob" === t || "arraybuffer" === t ? r = "uint8array" : "base64" === t ? r = "string" : void 0;
				try {
					this._internalType = r, this._outputType = t, this._mimeType = n, i.checkSupport(r), this._worker = e.pipe(new d(r)), e.lock()
				} catch(t) {
					this._worker = new l("error"), this._worker.error(t)
				}
			}
			var i = e("../utils"),
				d = e("./ConvertWorker"),
				l = e("./GenericWorker"),
				c = e("../base64"),
				u = e("../support"),
				p = e("../external"),
				f = null;
			if(u.nodestream) try {
				f = e("../nodejs/NodejsStreamOutputAdapter")
			} catch(t) {}
			s.prototype = {
				accumulate: function(e) {
					return o(this, e)
				},
				on: function(e, t) {
					var n = this;
					return "data" === e ? this._worker.on(e, function(e) {
						t.call(n, e.data, e.meta)
					}) : this._worker.on(e, function() {
						i.delay(t, arguments, n)
					}), this
				},
				resume: function() {
					return i.delay(this._worker.resume, [], this._worker), this
				},
				pause: function() {
					return this._worker.pause(), this
				},
				toNodejsStream: function(e) {
					if(i.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
					return new f(this, {
						objectMode: "nodebuffer" !== this._outputType
					}, e)
				}
			}, t.exports = s
		}).call(this, e("buffer").Buffer)
	}, {
		"../base64": 105,
		"../external": 110,
		"../nodejs/NodejsStreamOutputAdapter": 117,
		"../support": 134,
		"../utils": 136,
		"./ConvertWorker": 128,
		"./GenericWorker": 132,
		buffer: 41
	}],
	134: [function(e, t, n) {
		(function(t) {
			"use strict";
			if(n.base64 = !0, n.array = !0, n.string = !0, n.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, n.nodebuffer = "undefined" != typeof t, n.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) n.blob = !1;
			else {
				var r = new ArrayBuffer(0);
				try {
					n.blob = 0 === new Blob([r], {
						type: "application/zip"
					}).size
				} catch(t) {
					try {
						var a = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder,
							o = new a;
						o.append(r), n.blob = 0 === o.getBlob("application/zip").size
					} catch(t) {
						n.blob = !1
					}
				}
			}
			try {
				n.nodestream = !!e("readable-stream").Readable
			} catch(t) {
				n.nodestream = !1
			}
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41,
		"readable-stream": 120
	}],
	135: [function(e, t, n) {
		"use strict";

		function r() {
			l.call(this, "utf-8 decode"), this.leftOver = null
		}

		function a() {
			l.call(this, "utf-8 encode")
		}
		for(var o = e("./utils"), s = e("./support"), d = e("./nodejsUtils"), l = e("./stream/GenericWorker"), u = Array(256), c = 0; 256 > c; c++) u[c] = 252 <= c ? 6 : 248 <= c ? 5 : 240 <= c ? 4 : 224 <= c ? 3 : 192 <= c ? 2 : 1;
		u[254] = u[254] = 1;
		var p = function(e) {
				var t = e.length,
					n = 0,
					r, a, o, d, l;
				for(d = 0; d < t; d++) a = e.charCodeAt(d), 55296 == (64512 & a) && d + 1 < t && (o = e.charCodeAt(d + 1), 56320 == (64512 & o) && (a = 65536 + (a - 55296 << 10) + (o - 56320), d++)), n += 128 > a ? 1 : 2048 > a ? 2 : 65536 > a ? 3 : 4;
				for(r = s.uint8array ? new Uint8Array(n) : Array(n), l = 0, d = 0; l < n; d++) a = e.charCodeAt(d), 55296 == (64512 & a) && d + 1 < t && (o = e.charCodeAt(d + 1), 56320 == (64512 & o) && (a = 65536 + (a - 55296 << 10) + (o - 56320), d++)), 128 > a ? r[l++] = a : 2048 > a ? (r[l++] = 192 | a >>> 6, r[l++] = 128 | 63 & a) : 65536 > a ? (r[l++] = 224 | a >>> 12, r[l++] = 128 | 63 & a >>> 6, r[l++] = 128 | 63 & a) : (r[l++] = 240 | a >>> 18, r[l++] = 128 | 63 & a >>> 12, r[l++] = 128 | 63 & a >>> 6, r[l++] = 128 | 63 & a);
				return r
			},
			f = function(e, t) {
				var n;
				for(t = t || e.length, t > e.length && (t = e.length), n = t - 1; 0 <= n && 128 == (192 & e[n]);) n--;
				return 0 > n ? t : 0 === n ? t : n + u[e[n]] > t ? n : t
			},
			m = function(e) {
				var t = e.length,
					n = Array(2 * t),
					r, a, s, d;
				for(a = 0, r = 0; r < t;) {
					if(s = e[r++], 128 > s) {
						n[a++] = s;
						continue
					}
					if(d = u[s], 4 < d) {
						n[a++] = 65533, r += d - 1;
						continue
					}
					for(s &= 2 === d ? 31 : 3 === d ? 15 : 7; 1 < d && r < t;) s = s << 6 | 63 & e[r++], d--;
					if(1 < d) {
						n[a++] = 65533;
						continue
					}
					65536 > s ? n[a++] = s : (s -= 65536, n[a++] = 55296 | 1023 & s >> 10, n[a++] = 56320 | 1023 & s)
				}
				return n.length !== a && (n.subarray ? n = n.subarray(0, a) : n.length = a), o.applyFromCharCode(n)
			};
		n.utf8encode = function(e) {
			return s.nodebuffer ? d.newBufferFrom(e, "utf-8") : p(e)
		}, n.utf8decode = function(e) {
			return s.nodebuffer ? o.transformTo("nodebuffer", e).toString("utf-8") : (e = o.transformTo(s.uint8array ? "uint8array" : "array", e), m(e))
		}, o.inherits(r, l), r.prototype.processChunk = function(e) {
			var t = o.transformTo(s.uint8array ? "uint8array" : "array", e.data);
			if(this.leftOver && this.leftOver.length) {
				if(s.uint8array) {
					var r = t;
					t = new Uint8Array(r.length + this.leftOver.length), t.set(this.leftOver, 0), t.set(r, this.leftOver.length)
				} else t = this.leftOver.concat(t);
				this.leftOver = null
			}
			var a = f(t),
				i = t;
			a !== t.length && (s.uint8array ? (i = t.subarray(0, a), this.leftOver = t.subarray(a, t.length)) : (i = t.slice(0, a), this.leftOver = t.slice(a, t.length))), this.push({
				data: n.utf8decode(i),
				meta: e.meta
			})
		}, r.prototype.flush = function() {
			this.leftOver && this.leftOver.length && (this.push({
				data: n.utf8decode(this.leftOver),
				meta: {}
			}), this.leftOver = null)
		}, n.Utf8DecodeWorker = r, o.inherits(a, l), a.prototype.processChunk = function(e) {
			this.push({
				data: n.utf8encode(e.data),
				meta: e.meta
			})
		}, n.Utf8EncodeWorker = a
	}, {
		"./nodejsUtils": 118,
		"./stream/GenericWorker": 132,
		"./support": 134,
		"./utils": 136
	}],
	136: [function(e, t, n) {
		"use strict";

		function r(e) {
			var t = null;
			return t = c.uint8array ? new Uint8Array(e.length) : Array(e.length), o(e, t)
		}

		function a(e) {
			return e
		}

		function o(e, t) {
			for(var n = 0; n < e.length; ++n) t[n] = 255 & e.charCodeAt(n);
			return t
		}

		function s(e) {
			var t = 65536,
				r = n.getTypeOf(e),
				a = !0;
			if("uint8array" === r ? a = h.applyCanBeUsed.uint8array : "nodebuffer" === r && (a = h.applyCanBeUsed.nodebuffer), a)
				for(; 1 < t;) try {
					return h.stringifyByChunk(e, r, t)
				} catch(n) {
					t = Math.floor(t / 2)
				}
			return h.stringifyByChar(e)
		}

		function i(e, t) {
			for(var n = 0; n < e.length; n++) t[n] = e[n];
			return t
		}
		var d = Math.min,
			l = String.fromCharCode,
			c = e("./support"),
			u = e("./base64"),
			p = e("./nodejsUtils"),
			f = e("core-js/library/fn/set-immediate"),
			m = e("./external");
		n.newBlob = function(e, t) {
			n.checkSupport("blob");
			try {
				return new Blob([e], {
					type: t
				})
			} catch(n) {
				try {
					var r = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder,
						a = new r;
					return a.append(e), a.getBlob(t)
				} catch(t) {
					throw new Error("Bug : can't construct the Blob.")
				}
			}
		};
		var h = {
			stringifyByChunk: function(e, t, n) {
				var r = [],
					a = 0,
					o = e.length;
				if(o <= n) return l.apply(null, e);
				for(; a < o;) "array" === t || "nodebuffer" === t ? r.push(l.apply(null, e.slice(a, d(a + n, o)))) : r.push(l.apply(null, e.subarray(a, d(a + n, o)))), a += n;
				return r.join("")
			},
			stringifyByChar: function(e) {
				for(var t = "", n = 0; n < e.length; n++) t += l(e[n]);
				return t
			},
			applyCanBeUsed: {
				uint8array: function() {
					try {
						return c.uint8array && 1 === l.apply(null, new Uint8Array(1)).length
					} catch(t) {
						return !1
					}
				}(),
				nodebuffer: function() {
					try {
						return c.nodebuffer && 1 === l.apply(null, p.allocBuffer(1)).length
					} catch(t) {
						return !1
					}
				}()
			}
		};
		n.applyFromCharCode = s;
		var _ = {};
		_.string = {
			string: a,
			array: function(e) {
				return o(e, Array(e.length))
			},
			arraybuffer: function(e) {
				return _.string.uint8array(e).buffer
			},
			uint8array: function(e) {
				return o(e, new Uint8Array(e.length))
			},
			nodebuffer: function(e) {
				return o(e, p.allocBuffer(e.length))
			}
		}, _.array = {
			string: s,
			array: a,
			arraybuffer: function(e) {
				return new Uint8Array(e).buffer
			},
			uint8array: function(e) {
				return new Uint8Array(e)
			},
			nodebuffer: function(e) {
				return p.newBufferFrom(e)
			}
		}, _.arraybuffer = {
			string: function(e) {
				return s(new Uint8Array(e))
			},
			array: function(e) {
				return i(new Uint8Array(e), Array(e.byteLength))
			},
			arraybuffer: a,
			uint8array: function(e) {
				return new Uint8Array(e)
			},
			nodebuffer: function(e) {
				return p.newBufferFrom(new Uint8Array(e))
			}
		}, _.uint8array = {
			string: s,
			array: function(e) {
				return i(e, Array(e.length))
			},
			arraybuffer: function(e) {
				return e.buffer
			},
			uint8array: a,
			nodebuffer: function(e) {
				return p.newBufferFrom(e)
			}
		}, _.nodebuffer = {
			string: s,
			array: function(e) {
				return i(e, Array(e.length))
			},
			arraybuffer: function(e) {
				return _.nodebuffer.uint8array(e).buffer
			},
			uint8array: function(e) {
				return i(e, new Uint8Array(e.length))
			},
			nodebuffer: a
		}, n.transformTo = function(e, t) {
			if(t || (t = ""), !e) return t;
			n.checkSupport(e);
			var r = n.getTypeOf(t),
				a = _[r][e](t);
			return a
		}, n.getTypeOf = function(e) {
			return "string" == typeof e ? "string" : "[object Array]" === Object.prototype.toString.call(e) ? "array" : c.nodebuffer && p.isBuffer(e) ? "nodebuffer" : c.uint8array && e instanceof Uint8Array ? "uint8array" : c.arraybuffer && e instanceof ArrayBuffer ? "arraybuffer" : void 0
		}, n.checkSupport = function(e) {
			var t = c[e.toLowerCase()];
			if(!t) throw new Error(e + " is not supported by this platform")
		}, n.MAX_VALUE_16BITS = 65535, n.MAX_VALUE_32BITS = -1, n.pretty = function(e) {
			var t = "",
				n, r;
			for(r = 0; r < (e || "").length; r++) n = e.charCodeAt(r), t += "\\x" + (16 > n ? "0" : "") + n.toString(16).toUpperCase();
			return t
		}, n.delay = function(e, t, n) {
			f(function() {
				e.apply(n || null, t || [])
			})
		}, n.inherits = function(e, t) {
			var n = function() {};
			n.prototype = t.prototype, e.prototype = new n
		}, n.extend = function() {
			var e = {},
				t, n;
			for(t = 0; t < arguments.length; t++)
				for(n in arguments[t]) arguments[t].hasOwnProperty(n) && "undefined" == typeof e[n] && (e[n] = arguments[t][n]);
			return e
		}, n.prepareContent = function(e, t, a, o, s) {
			var i = m.Promise.resolve(t).then(function(e) {
				var t = c.blob && (e instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(e)));
				return t && "undefined" != typeof FileReader ? new m.Promise(function(t, n) {
					var r = new FileReader;
					r.onload = function(n) {
						t(n.target.result)
					}, r.onerror = function(t) {
						n(t.target.error)
					}, r.readAsArrayBuffer(e)
				}) : e
			});
			return i.then(function(t) {
				var i = n.getTypeOf(t);
				return i ? ("arraybuffer" === i ? t = n.transformTo("uint8array", t) : "string" === i && (s ? t = u.decode(t) : a && !0 !== o && (t = r(t))), t) : m.Promise.reject(new Error("Can't read the data of '" + e + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))
			})
		}
	}, {
		"./base64": 105,
		"./external": 110,
		"./nodejsUtils": 118,
		"./support": 134,
		"core-js/library/fn/set-immediate": 54
	}],
	137: [function(e, t) {
		"use strict";

		function n(e) {
			this.files = [], this.loadOptions = e
		}
		var r = e("./reader/readerFor"),
			a = e("./utils"),
			o = e("./signature"),
			s = e("./zipEntry"),
			i = e("./utf8"),
			d = e("./support");
		n.prototype = {
			checkSignature: function(e) {
				if(!this.reader.readAndCheckSignature(e)) {
					this.reader.index -= 4;
					var t = this.reader.readString(4);
					throw new Error("Corrupted zip or bug: unexpected signature (" + a.pretty(t) + ", expected " + a.pretty(e) + ")")
				}
			},
			isSignature: function(e, t) {
				var n = this.reader.index;
				this.reader.setIndex(e);
				var r = this.reader.readString(4);
				return this.reader.setIndex(n), r === t
			},
			readBlockEndOfCentral: function() {
				this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
				var e = this.reader.readData(this.zipCommentLength),
					t = d.uint8array ? "uint8array" : "array",
					n = a.transformTo(t, e);
				this.zipComment = this.loadOptions.decodeFileName(n)
			},
			readBlockZip64EndOfCentral: function() {
				this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
				for(var e = this.zip64EndOfCentralSize - 44, t, n, r; 0 < e;) t = this.reader.readInt(2), n = this.reader.readInt(4), r = this.reader.readData(n), this.zip64ExtensibleData[t] = {
					id: t,
					length: n,
					value: r
				}
			},
			readBlockZip64EndOfCentralLocator: function() {
				if(this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported")
			},
			readLocalFiles: function() {
				var e, t;
				for(e = 0; e < this.files.length; e++) t = this.files[e], this.reader.setIndex(t.localHeaderOffset), this.checkSignature(o.LOCAL_FILE_HEADER), t.readLocalPart(this.reader), t.handleUTF8(), t.processAttributes()
			},
			readCentralDir: function() {
				var e;
				for(this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(o.CENTRAL_FILE_HEADER);) e = new s({
					zip64: this.zip64
				}, this.loadOptions), e.readCentralPart(this.reader), this.files.push(e);
				if(this.centralDirRecords !== this.files.length)
					if(0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
					else;
			},
			readEndOfCentral: function() {
				var e = this.reader.lastIndexOfSignature(o.CENTRAL_DIRECTORY_END);
				if(0 > e) {
					var t = !this.isSignature(0, o.LOCAL_FILE_HEADER);
					if(t) throw new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
					else throw new Error("Corrupted zip: can't find end of central directory")
				}
				this.reader.setIndex(e);
				var n = e;
				if(this.checkSignature(o.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === a.MAX_VALUE_16BITS || this.diskWithCentralDirStart === a.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === a.MAX_VALUE_16BITS || this.centralDirRecords === a.MAX_VALUE_16BITS || this.centralDirSize === a.MAX_VALUE_32BITS || this.centralDirOffset === a.MAX_VALUE_32BITS) {
					if(this.zip64 = !0, e = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR), 0 > e) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
					if(this.reader.setIndex(e), this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, o.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_END), 0 > this.relativeOffsetEndOfZip64CentralDir)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
					this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral()
				}
				var r = this.centralDirOffset + this.centralDirSize;
				this.zip64 && (r += 20, r += 12 + this.zip64EndOfCentralSize);
				var s = n - r;
				if(0 < s) this.isSignature(n, o.CENTRAL_FILE_HEADER) || (this.reader.zero = s);
				else if(0 > s) throw new Error("Corrupted zip: missing " + Math.abs(s) + " bytes.")
			},
			prepareReader: function(e) {
				this.reader = r(e)
			},
			load: function(e) {
				this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles()
			}
		}, t.exports = n
	}, {
		"./reader/readerFor": 126,
		"./signature": 127,
		"./support": 134,
		"./utf8": 135,
		"./utils": 136,
		"./zipEntry": 138
	}],
	138: [function(e, t) {
		"use strict";

		function n(e, t) {
			this.options = e, this.loadOptions = t
		}
		var r = e("./reader/readerFor"),
			a = e("./utils"),
			o = e("./compressedObject"),
			s = e("./crc32"),
			i = e("./utf8"),
			d = e("./compressions"),
			l = e("./support"),
			c = function(e) {
				for(var t in d)
					if(d.hasOwnProperty(t) && d[t].magic === e) return d[t];
				return null
			};
		n.prototype = {
			isEncrypted: function() {
				return 1 == (1 & this.bitFlag)
			},
			useUTF8: function() {
				return 2048 == (2048 & this.bitFlag)
			},
			readLocalPart: function(e) {
				var t, n;
				if(e.skip(22), this.fileNameLength = e.readInt(2), n = e.readInt(2), this.fileName = e.readData(this.fileNameLength), e.skip(n), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize === -1 || uncompressedSize === -1)");
				if(t = c(this.compressionMethod), null === t) throw new Error("Corrupted zip : compression " + a.pretty(this.compressionMethod) + " unknown (inner file : " + a.transformTo("string", this.fileName) + ")");
				this.decompressed = new o(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize))
			},
			readCentralPart: function(e) {
				this.versionMadeBy = e.readInt(2), e.skip(2), this.bitFlag = e.readInt(2), this.compressionMethod = e.readString(2), this.date = e.readDate(), this.crc32 = e.readInt(4), this.compressedSize = e.readInt(4), this.uncompressedSize = e.readInt(4);
				var t = e.readInt(2);
				if(this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
				e.skip(t), this.readExtraFields(e), this.parseZIP64ExtraField(e), this.fileComment = e.readData(this.fileCommentLength)
			},
			processAttributes: function() {
				this.unixPermissions = null, this.dosPermissions = null;
				var e = this.versionMadeBy >> 8;
				this.dir = !!(16 & this.externalFileAttributes), e === 0 && (this.dosPermissions = 63 & this.externalFileAttributes), e === 3 && (this.unixPermissions = 65535 & this.externalFileAttributes >> 16), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = !0)
			},
			parseZIP64ExtraField: function() {
				if(this.extraFields[1]) {
					var e = r(this.extraFields[1].value);
					this.uncompressedSize === a.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === a.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === a.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === a.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4))
				}
			},
			readExtraFields: function(e) {
				var t = e.index + this.extraFieldsLength,
					n, r, a;
				for(this.extraFields || (this.extraFields = {}); e.index < t;) n = e.readInt(2), r = e.readInt(2), a = e.readData(r), this.extraFields[n] = {
					id: n,
					length: r,
					value: a
				}
			},
			handleUTF8: function() {
				var e = l.uint8array ? "uint8array" : "array";
				if(this.useUTF8()) this.fileNameStr = i.utf8decode(this.fileName), this.fileCommentStr = i.utf8decode(this.fileComment);
				else {
					var t = this.findExtraFieldUnicodePath();
					if(null !== t) this.fileNameStr = t;
					else {
						var n = a.transformTo(e, this.fileName);
						this.fileNameStr = this.loadOptions.decodeFileName(n)
					}
					var r = this.findExtraFieldUnicodeComment();
					if(null !== r) this.fileCommentStr = r;
					else {
						var o = a.transformTo(e, this.fileComment);
						this.fileCommentStr = this.loadOptions.decodeFileName(o)
					}
				}
			},
			findExtraFieldUnicodePath: function() {
				var e = this.extraFields[28789];
				if(e) {
					var t = r(e.value);
					return 1 === t.readInt(1) ? s(this.fileName) === t.readInt(4) ? i.utf8decode(t.readData(e.length - 5)) : null : null
				}
				return null
			},
			findExtraFieldUnicodeComment: function() {
				var e = this.extraFields[25461];
				if(e) {
					var t = r(e.value);
					return 1 === t.readInt(1) ? s(this.fileComment) === t.readInt(4) ? i.utf8decode(t.readData(e.length - 5)) : null : null
				}
				return null
			}
		}, t.exports = n
	}, {
		"./compressedObject": 106,
		"./compressions": 107,
		"./crc32": 108,
		"./reader/readerFor": 126,
		"./support": 134,
		"./utf8": 135,
		"./utils": 136
	}],
	139: [function(e, t) {
		"use strict";
		var n = e("./stream/StreamHelper"),
			r = e("./stream/DataWorker"),
			a = e("./utf8"),
			o = e("./compressedObject"),
			s = e("./stream/GenericWorker"),
			d = function(e, t, n) {
				this.name = e, this.dir = n.dir, this.date = n.date, this.comment = n.comment, this.unixPermissions = n.unixPermissions, this.dosPermissions = n.dosPermissions, this._data = t, this._dataBinary = n.binary, this.options = {
					compression: n.compression,
					compressionOptions: n.compressionOptions
				}
			};
		d.prototype = {
			internalStream: function(e) {
				var t = null,
					r = "string";
				try {
					if(!e) throw new Error("No output type specified.");
					r = e.toLowerCase();
					var o = "string" === r || "text" === r;
					("binarystring" === r || "text" === r) && (r = "string"), t = this._decompressWorker();
					var i = !this._dataBinary;
					i && !o && (t = t.pipe(new a.Utf8EncodeWorker)), !i && o && (t = t.pipe(new a.Utf8DecodeWorker))
				} catch(n) {
					t = new s("error"), t.error(n)
				}
				return new n(t, r, "")
			},
			async: function(e, t) {
				return this.internalStream(e).accumulate(t)
			},
			nodeStream: function(e, t) {
				return this.internalStream(e || "nodebuffer").toNodejsStream(t)
			},
			_compressWorker: function(e, t) {
				if(this._data instanceof o && this._data.compression.magic === e.magic) return this._data.getCompressedWorker();
				var n = this._decompressWorker();
				return this._dataBinary || (n = n.pipe(new a.Utf8EncodeWorker)), o.createWorkerFrom(n, e, t)
			},
			_decompressWorker: function() {
				return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof s ? this._data : new r(this._data)
			}
		};
		for(var l = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], c = function() {
				throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
			}, u = 0; u < l.length; u++) d.prototype[l[u]] = c;
		t.exports = d
	}, {
		"./compressedObject": 106,
		"./stream/DataWorker": 131,
		"./stream/GenericWorker": 132,
		"./stream/StreamHelper": 133,
		"./utf8": 135
	}],
	140: [function(e, t, n) {
		"use strict";
		n.regex = n.re = /^npm-debug\.log$|^\..*\.swp$|^\.DS_Store$|^\.AppleDouble$|^\.LSOverride$|^Icon\r$|^\._.*|^\.Spotlight-V100(?:$|\/)|\.Trashes|^__MACOSX$|~$|^Thumbs\.db$|^ehthumbs\.db$|^Desktop\.ini$|^@eaDir$/, n.is = e => n.re.test(e), n.not = e => !n.is(e)
	}, {}],
	141: [function(e, t) {
		"use strict";

		function n() {}

		function r(e) {
			if("function" != typeof e) throw new TypeError("resolver must be a function");
			this.state = f, this.queue = [], this.outcome = void 0, e !== n && d(this, e)
		}

		function a(e, t, n) {
			this.promise = e, "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" == typeof n && (this.onRejected = n, this.callRejected = this.otherCallRejected)
		}

		function o(t, e, n) {
			i(function() {
				var r;
				try {
					r = e(n)
				} catch(n) {
					return c.reject(t, n)
				}
				r === t ? c.reject(t, new TypeError("Cannot resolve promise with itself")) : c.resolve(t, r)
			})
		}

		function s(e) {
			var t = e && e.then;
			if(e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t) return function() {
				t.apply(e, arguments)
			}
		}

		function d(e, t) {
			function n(t) {
				a || (a = !0, c.reject(e, t))
			}

			function r(t) {
				a || (a = !0, c.resolve(e, t))
			}
			var a = !1,
				o = l(function() {
					t(r, n)
				});
			"error" === o.status && n(o.value)
		}

		function l(e, t) {
			var n = {};
			try {
				n.value = e(t), n.status = "success"
			} catch(t) {
				n.status = "error", n.value = t
			}
			return n
		}
		var i = e("immediate"),
			c = {},
			u = ["REJECTED"],
			p = ["FULFILLED"],
			f = ["PENDING"];
		t.exports = r, r.prototype["catch"] = function(e) {
			return this.then(null, e)
		}, r.prototype.then = function(e, t) {
			if("function" != typeof e && this.state === p || "function" != typeof t && this.state === u) return this;
			var r = new this.constructor(n);
			if(this.state !== f) {
				var s = this.state === p ? e : t;
				o(r, s, this.outcome)
			} else this.queue.push(new a(r, e, t));
			return r
		}, a.prototype.callFulfilled = function(e) {
			c.resolve(this.promise, e)
		}, a.prototype.otherCallFulfilled = function(e) {
			o(this.promise, this.onFulfilled, e)
		}, a.prototype.callRejected = function(e) {
			c.reject(this.promise, e)
		}, a.prototype.otherCallRejected = function(e) {
			o(this.promise, this.onRejected, e)
		}, c.resolve = function(e, t) {
			var n = l(s, t);
			if("error" === n.status) return c.reject(e, n.value);
			var r = n.value;
			if(r) d(e, r);
			else {
				e.state = p, e.outcome = t;
				for(var a = -1, o = e.queue.length; ++a < o;) e.queue[a].callFulfilled(t)
			}
			return e
		}, c.reject = function(e, t) {
			e.state = u, e.outcome = t;
			for(var n = -1, r = e.queue.length; ++n < r;) e.queue[n].callRejected(t);
			return e
		}, r.resolve = function(e) {
			return e instanceof this ? e : c.resolve(new this(n), e)
		}, r.reject = function(e) {
			var t = new this(n);
			return c.reject(t, e)
		}, r.all = function(e) {
			function t(e, t) {
				function n(e) {
					s[t] = e, ++d !== a || o || (o = !0, c.resolve(u, s))
				}
				r.resolve(e).then(n, function(e) {
					o || (o = !0, c.reject(u, e))
				})
			}
			var r = this;
			if("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
			var a = e.length,
				o = !1;
			if(!a) return this.resolve([]);
			for(var s = Array(a), d = 0, l = -1, u = new this(n); ++l < a;) t(e[l], l);
			return u
		}, r.race = function(e) {
			function t(e) {
				r.resolve(e).then(function(e) {
					o || (o = !0, c.resolve(d, e))
				}, function(e) {
					o || (o = !0, c.reject(d, e))
				})
			}
			var r = this;
			if("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
			var a = e.length,
				o = !1;
			if(!a) return this.resolve([]);
			for(var s = -1, d = new this(n); ++s < a;) t(e[s]);
			return d
		}
	}, {
		immediate: 98
	}],
	142: [function(e, t) {
		(function(n) {
			function r(e) {
				const t = {},
					r = e.split("magnet:?")[1],
					s = r && 0 <= r.length ? r.split("&") : [];
				s.forEach(e => {
					const n = e.split("=");
					if(2 !== n.length) return;
					const r = n[0];
					let a = n[1];
					if("dn" === r && (a = decodeURIComponent(a).replace(/\+/g, " ")), ("tr" === r || "xs" === r || "as" === r || "ws" === r) && (a = decodeURIComponent(a)), "kt" === r && (a = decodeURIComponent(a).split("+")), "ix" === r && (a = +a), !t[r]) t[r] = a;
					else if(Array.isArray(t[r])) t[r].push(a);
					else {
						const e = t[r];
						t[r] = [e, a]
					}
				});
				let i;
				if(t.xt) {
					const e = Array.isArray(t.xt) ? t.xt : [t.xt];
					e.forEach(e => {
						if(i = e.match(/^urn:btih:(.{40})/)) t.infoHash = i[1].toLowerCase();
						else if(i = e.match(/^urn:btih:(.{32})/)) {
							const e = a.decode(i[1]);
							t.infoHash = n.from(e, "binary").toString("hex")
						}
					})
				}
				return t.infoHash && (t.infoHashBuffer = n.from(t.infoHash, "hex")), t.dn && (t.name = t.dn), t.kt && (t.keywords = t.kt), t.announce = "string" == typeof t.tr ? [t.tr] : Array.isArray(t.tr) ? t.tr : [], t.urlList = [], ("string" == typeof t.as || Array.isArray(t.as)) && (t.urlList = t.urlList.concat(t.as)), ("string" == typeof t.ws || Array.isArray(t.ws)) && (t.urlList = t.urlList.concat(t.ws)), o(t.announce), o(t.urlList), t
			}
			t.exports = r, t.exports.decode = r, t.exports.encode = function(e) {
				e = Object.assign({}, e), e.infoHashBuffer && (e.xt = `urn:btih:${e.infoHashBuffer.toString("hex")}`), e.infoHash && (e.xt = `urn:btih:${e.infoHash}`), e.name && (e.dn = e.name), e.keywords && (e.kt = e.keywords), e.announce && (e.tr = e.announce), e.urlList && (e.ws = e.urlList, delete e.as);
				let t = "magnet:?";
				return Object.keys(e).filter(e => 2 === e.length).forEach((n, r) => {
					const a = Array.isArray(e[n]) ? e[n] : [e[n]];
					a.forEach((e, a) => {
						(0 < r || 0 < a) && ("kt" !== n || 0 === a) && (t += "&"), "dn" === n && (e = encodeURIComponent(e).replace(/%20/g, "+")), ("tr" === n || "xs" === n || "as" === n || "ws" === n) && (e = encodeURIComponent(e)), "kt" === n && (e = encodeURIComponent(e)), t += "kt" === n && 0 < a ? `+${e}` : `${n}=${e}`
					})
				}), t
			};
			const a = e("thirty-two"),
				o = e("uniq")
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41,
		"thirty-two": 297,
		uniq: 307
	}],
	143: [function(e, t) {
		function n(e, t) {
			var r = this;
			if(!(r instanceof n)) return new n(e, t);
			if(!d) throw new Error("web browser lacks MediaSource support");
			t || (t = {}), r._debug = t.debug, r._bufferDuration = t.bufferDuration || 60, r._elem = e, r._mediaSource = new d, r._streams = [], r.detailedError = null, r._errorHandler = function() {
				r._elem.removeEventListener("error", r._errorHandler);
				var e = r._streams.slice();
				e.forEach(function(e) {
					e.destroy(r._elem.error)
				})
			}, r._elem.addEventListener("error", r._errorHandler), r._elem.src = window.URL.createObjectURL(r._mediaSource)
		}

		function r(e, t) {
			var n = this;
			if(s.Writable.call(n), n._wrapper = e, n._elem = e._elem, n._mediaSource = e._mediaSource, n._allStreams = e._streams, n._allStreams.push(n), n._bufferDuration = e._bufferDuration, n._sourceBuffer = null, n._debugBuffers = [], n._openHandler = function() {
					n._onSourceOpen()
				}, n._flowHandler = function() {
					n._flow()
				}, n._errorHandler = function(e) {
					n.destroyed || n.emit("error", e)
				}, "string" == typeof t) n._type = t, "open" === n._mediaSource.readyState ? n._createSourceBuffer() : n._mediaSource.addEventListener("sourceopen", n._openHandler);
			else if(null === t._sourceBuffer) t.destroy(), n._type = t._type, n._mediaSource.addEventListener("sourceopen", n._openHandler);
			else if(t._sourceBuffer) t.destroy(), n._type = t._type, n._sourceBuffer = t._sourceBuffer, n._debugBuffers = t._debugBuffers, n._sourceBuffer.addEventListener("updateend", n._flowHandler), n._sourceBuffer.addEventListener("error", n._errorHandler);
			else throw new Error("The argument to MediaElementWrapper.createWriteStream must be a string or a previous stream returned from that function");
			n._elem.addEventListener("timeupdate", n._flowHandler), n.on("error", function(e) {
				n._wrapper.error(e)
			}), n.on("finish", function() {
				if(!n.destroyed && (n._finished = !0, n._allStreams.every(function(e) {
						return e._finished
					}))) {
					n._wrapper._dumpDebugData();
					try {
						n._mediaSource.endOfStream()
					} catch(e) {}
				}
			})
		}

		function a(e, t) {
			var n = document.createElement("a");
			n.href = window.URL.createObjectURL(new window.Blob(e)), n.download = t, n.click()
		}
		t.exports = n;
		var o = e("inherits"),
			s = e("readable-stream"),
			i = e("to-arraybuffer"),
			d = "undefined" != typeof window && window.MediaSource;
		n.prototype.createWriteStream = function(e) {
			var t = this;
			return new r(t, e)
		}, n.prototype.error = function(e) {
			var t = this;
			t.detailedError || (t.detailedError = e), t._dumpDebugData();
			try {
				t._mediaSource.endOfStream("decode")
			} catch(e) {}
		}, n.prototype._dumpDebugData = function() {
			var e = this;
			e._debug && (e._debug = !1, e._streams.forEach(function(e, t) {
				a(e._debugBuffers, "mediasource-stream-" + t)
			}))
		}, o(r, s.Writable), r.prototype._onSourceOpen = function() {
			var e = this;
			e.destroyed || (e._mediaSource.removeEventListener("sourceopen", e._openHandler), e._createSourceBuffer())
		}, r.prototype.destroy = function(e) {
			var t = this;
			t.destroyed || (t.destroyed = !0, t._allStreams.splice(t._allStreams.indexOf(t), 1), t._mediaSource.removeEventListener("sourceopen", t._openHandler), t._elem.removeEventListener("timeupdate", t._flowHandler), t._sourceBuffer && (t._sourceBuffer.removeEventListener("updateend", t._flowHandler), t._sourceBuffer.removeEventListener("error", t._errorHandler), "open" === t._mediaSource.readyState && t._sourceBuffer.abort()), e && t.emit("error", e), t.emit("close"))
		}, r.prototype._createSourceBuffer = function() {
			var e = this;
			if(!e.destroyed)
				if(!d.isTypeSupported(e._type)) e.destroy(new Error("The provided type is not supported"));
				else if(e._sourceBuffer = e._mediaSource.addSourceBuffer(e._type), e._sourceBuffer.addEventListener("updateend", e._flowHandler), e._sourceBuffer.addEventListener("error", e._errorHandler), e._cb) {
				var t = e._cb;
				e._cb = null, t()
			}
		}, r.prototype._write = function(e, t, n) {
			var r = this;
			if(!r.destroyed) {
				if(!r._sourceBuffer) return void(r._cb = function(a) {
					return a ? n(a) : void r._write(e, t, n)
				});
				if(r._sourceBuffer.updating) return n(new Error("Cannot append buffer while source buffer updating"));
				var a = i(e);
				r._wrapper._debug && r._debugBuffers.push(a);
				try {
					r._sourceBuffer.appendBuffer(a)
				} catch(e) {
					return void r.destroy(e)
				}
				r._cb = n
			}
		}, r.prototype._flow = function() {
			var e = this;
			if(!(e.destroyed || !e._sourceBuffer || e._sourceBuffer.updating) && !("open" === e._mediaSource.readyState && e._getBufferDuration() > e._bufferDuration) && e._cb) {
				var t = e._cb;
				e._cb = null, t()
			}
		};
		r.prototype._getBufferDuration = function() {
			for(var e = this, t = e._sourceBuffer.buffered, n = e._elem.currentTime, r = -1, a = 0; a < t.length; a++) {
				var o = t.start(a),
					s = t.end(a) + 0;
				if(o > n) break;
				else(0 <= r || n <= s) && (r = s)
			}
			var d = r - n;
			return 0 > d && (d = 0), d
		}
	}, {
		inherits: 99,
		"readable-stream": 152,
		"to-arraybuffer": 302
	}],
	144: [function(e, t, n) {
		arguments[4][11][0].apply(n, arguments)
	}, {
		"./_stream_readable": 146,
		"./_stream_writable": 148,
		"core-util-is": 75,
		dup: 11,
		inherits: 99,
		"process-nextick-args": 204
	}],
	145: [function(e, t, n) {
		arguments[4][12][0].apply(n, arguments)
	}, {
		"./_stream_transform": 147,
		"core-util-is": 75,
		dup: 12,
		inherits: 99
	}],
	146: [function(e, t, n) {
		arguments[4][13][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 144,
		"./internal/streams/BufferList": 149,
		"./internal/streams/destroy": 150,
		"./internal/streams/stream": 151,
		_process: 205,
		"core-util-is": 75,
		dup: 13,
		events: 82,
		inherits: 99,
		isarray: 104,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		"string_decoder/": 296,
		util: 35
	}],
	147: [function(e, t, n) {
		arguments[4][14][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 144,
		"core-util-is": 75,
		dup: 14,
		inherits: 99
	}],
	148: [function(e, t, n) {
		arguments[4][15][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 144,
		"./internal/streams/destroy": 150,
		"./internal/streams/stream": 151,
		_process: 205,
		"core-util-is": 75,
		dup: 15,
		inherits: 99,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		timers: 301,
		"util-deprecate": 313
	}],
	149: [function(e, t, n) {
		arguments[4][16][0].apply(n, arguments)
	}, {
		dup: 16,
		"safe-buffer": 241,
		util: 35
	}],
	150: [function(e, t, n) {
		arguments[4][17][0].apply(n, arguments)
	}, {
		dup: 17,
		"process-nextick-args": 204
	}],
	151: [function(e, t, n) {
		arguments[4][18][0].apply(n, arguments)
	}, {
		dup: 18,
		events: 82
	}],
	152: [function(e, t, n) {
		arguments[4][19][0].apply(n, arguments)
	}, {
		"./lib/_stream_duplex.js": 144,
		"./lib/_stream_passthrough.js": 145,
		"./lib/_stream_readable.js": 146,
		"./lib/_stream_transform.js": 147,
		"./lib/_stream_writable.js": 148,
		dup: 19
	}],
	153: [function(e, t) {
		(function(e) {
			function n(e, t) {
				if(!(this instanceof n)) return new n(e, t);
				if(t || (t = {}), this.chunkLength = +e, !this.chunkLength) throw new Error("First argument must be a chunk length");
				this.chunks = [], this.closed = !1, this.length = +t.length || 1 / 0, this.length !== 1 / 0 && (this.lastChunkLength = this.length % this.chunkLength || this.chunkLength, this.lastChunkIndex = Math.ceil(this.length / this.chunkLength) - 1)
			}

			function r(t, n, r) {
				e.nextTick(function() {
					t && t(n, r)
				})
			}
			t.exports = n, n.prototype.put = function(e, t, n) {
				if(this.closed) return r(n, new Error("Storage is closed"));
				var a = e === this.lastChunkIndex;
				return a && t.length !== this.lastChunkLength ? r(n, new Error("Last chunk length must be " + this.lastChunkLength)) : a || t.length === this.chunkLength ? void(this.chunks[e] = t, r(n, null)) : r(n, new Error("Chunk length must be " + this.chunkLength))
			}, n.prototype.get = function(e, t, n) {
				if("function" == typeof t) return this.get(e, null, t);
				if(this.closed) return r(n, new Error("Storage is closed"));
				var a = this.chunks[e];
				if(!a) {
					var o = new Error("Chunk not found");
					return o.notFound = !0, r(n, o)
				}
				if(!t) return r(n, null, a);
				var s = t.offset || 0,
					i = t.length || a.length - s;
				r(n, null, a.slice(s, i + s))
			}, n.prototype.close = n.prototype.destroy = function(e) {
				return this.closed ? r(e, new Error("Storage is closed")) : void(this.closed = !0, this.chunks = null, r(e, null))
			}
		}).call(this, e("_process"))
	}, {
		_process: 205
	}],
	154: [function(e, t, n) {
		var r = Math.round,
			a = Math.ceil,
			o = Math.abs,
			s = Math.floor,
			d = Math.min;
		(function(e, r) {
			"object" == typeof n && "undefined" != typeof t ? t.exports = r() : "function" == typeof define && define.amd ? define(r) : e.moment = r()
		})(this, function() {
			"use strict";

			function n() {
				return Mt.apply(null, arguments)
			}

			function l(e) {
				return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e)
			}

			function i(e) {
				return null != e && "[object Object]" === Object.prototype.toString.call(e)
			}

			function u(e) {
				if(Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(e).length;
				for(var t in e)
					if(e.hasOwnProperty(t)) return !1;
				return !0
			}

			function p(e) {
				return void 0 === e
			}

			function c(e) {
				return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e)
			}

			function f(e) {
				return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
			}

			function m(e, t) {
				var n = [],
					r;
				for(r = 0; r < e.length; ++r) n.push(t(e[r], r));
				return n
			}

			function h(e, t) {
				return Object.prototype.hasOwnProperty.call(e, t)
			}

			function _(e, t) {
				for(var n in t) h(t, n) && (e[n] = t[n]);
				return h(t, "toString") && (e.toString = t.toString), h(t, "valueOf") && (e.valueOf = t.valueOf), e
			}

			function g(e, t, n, r) {
				return Ke(e, t, n, r, !0).utc()
			}

			function y() {
				return {
					empty: !1,
					unusedTokens: [],
					unusedInput: [],
					overflow: -2,
					charsLeftOver: 0,
					nullInput: !1,
					invalidMonth: null,
					invalidFormat: !1,
					userInvalidated: !1,
					iso: !1,
					parsedDateParts: [],
					meridiem: null,
					rfc2822: !1,
					weekdayMismatch: !1
				}
			}

			function b(e) {
				return null == e._pf && (e._pf = y()), e._pf
			}

			function k(e) {
				if(null == e._isValid) {
					var t = b(e),
						n = Pt.call(t.parsedDateParts, function(e) {
							return null != e
						}),
						r = !isNaN(e._d.getTime()) && 0 > t.overflow && !t.empty && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && n);
					if(e._strict && (r = r && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour), null == Object.isFrozen || !Object.isFrozen(e)) e._isValid = r;
					else return r
				}
				return e._isValid
			}

			function w(e) {
				var t = g(NaN);
				return null == e ? b(t).userInvalidated = !0 : _(b(t), e), t
			}

			function x(e, t) {
				var n, r, a;
				if(p(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), p(t._i) || (e._i = t._i), p(t._f) || (e._f = t._f), p(t._l) || (e._l = t._l), p(t._strict) || (e._strict = t._strict), p(t._tzm) || (e._tzm = t._tzm), p(t._isUTC) || (e._isUTC = t._isUTC), p(t._offset) || (e._offset = t._offset), p(t._pf) || (e._pf = b(t)), p(t._locale) || (e._locale = t._locale), 0 < Ut.length)
					for(n = 0; n < Ut.length; n++) r = Ut[n], a = t[r], p(a) || (e[r] = a);
				return e
			}

			function S(e) {
				x(this, e), this._d = new Date(null == e._d ? NaN : e._d.getTime()), this.isValid() || (this._d = new Date(NaN)), !1 === jt && (jt = !0, n.updateOffset(this), jt = !1)
			}

			function v(e) {
				return e instanceof S || null != e && null != e._isAMomentObject
			}

			function E(e) {
				return 0 > e ? a(e) || 0 : s(e)
			}

			function C(e) {
				var t = +e,
					n = 0;
				return 0 != t && isFinite(t) && (n = E(t)), n
			}

			function T(e, t, n) {
				var r = d(e.length, t.length),
					a = o(e.length - t.length),
					s = 0,
					l;
				for(l = 0; l < r; l++)(n && e[l] !== t[l] || !n && C(e[l]) !== C(t[l])) && s++;
				return s + a
			}

			function I(e) {
				!1 === n.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
			}

			function L(e, t) {
				var r = !0;
				return _(function() {
					if(null != n.deprecationHandler && n.deprecationHandler(null, e), r) {
						for(var a = [], o = 0, s; o < arguments.length; o++) {
							if(s = "", "object" == typeof arguments[o]) {
								for(var d in s += "\n[" + o + "] ", arguments[0]) s += d + ": " + arguments[0][d] + ", ";
								s = s.slice(0, -2)
							} else s = arguments[o];
							a.push(s)
						}
						I(e + "\nArguments: " + Array.prototype.slice.call(a).join("") + "\n" + new Error().stack), r = !1
					}
					return t.apply(this, arguments)
				}, t)
			}

			function R(e, t) {
				null != n.deprecationHandler && n.deprecationHandler(e, t), Nt[e] || (I(t), Nt[e] = !0)
			}

			function B(e) {
				return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
			}

			function A(e, t) {
				var n = _({}, e),
					r;
				for(r in t) h(t, r) && (i(e[r]) && i(t[r]) ? (n[r] = {}, _(n[r], e[r]), _(n[r], t[r])) : null == t[r] ? delete n[r] : n[r] = t[r]);
				for(r in e) h(e, r) && !h(t, r) && i(e[r]) && (n[r] = _({}, n[r]));
				return n
			}

			function O(e) {
				null != e && this.set(e)
			}

			function D(e, t) {
				var n = e.toLowerCase();
				Ft[n] = Ft[n + "s"] = Ft[t] = e
			}

			function M(e) {
				return "string" == typeof e ? Ft[e] || Ft[e.toLowerCase()] : void 0
			}

			function P(e) {
				var t = {},
					n, r;
				for(r in e) h(e, r) && (n = M(r), n && (t[n] = e[r]));
				return t
			}

			function U(e, t) {
				Wt[e] = t
			}

			function j(e) {
				var t = [];
				for(var n in e) t.push({
					unit: n,
					priority: Wt[n]
				});
				return t.sort(function(e, t) {
					return e.priority - t.priority
				}), t
			}

			function N(e, t, n) {
				var r = "" + o(e),
					a = t - r.length;
				return(0 <= e ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, a)).toString().substr(1) + r
			}

			function z(e, t, n, r) {
				var a = r;
				"string" == typeof r && (a = function() {
					return this[r]()
				}), e && (Vt[e] = a), t && (Vt[t[0]] = function() {
					return N(a.apply(this, arguments), t[1], t[2])
				}), n && (Vt[n] = function() {
					return this.localeData().ordinal(a.apply(this, arguments), e)
				})
			}

			function H(e) {
				return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
			}

			function F(e) {
				var t = e.match(qt),
					n, r;
				for(n = 0, r = t.length; n < r; n++) t[n] = Vt[t[n]] ? Vt[t[n]] : H(t[n]);
				return function(n) {
					var a = "",
						o;
					for(o = 0; o < r; o++) a += B(t[o]) ? t[o].call(n, e) : t[o];
					return a
				}
			}

			function W(e, t) {
				return e.isValid() ? (t = q(t, e.localeData()), Gt[t] = Gt[t] || F(t), Gt[t](e)) : e.localeData().invalidDate()
			}

			function q(e, t) {
				function n(e) {
					return t.longDateFormat(e) || e
				}
				var r = 5;
				for(Yt.lastIndex = 0; 0 <= r && Yt.test(e);) e = e.replace(Yt, n), Yt.lastIndex = 0, r -= 1;
				return e
			}

			function Y(e, t, n) {
				pn[e] = B(t) ? t : function(e) {
					return e && n ? n : t
				}
			}

			function G(e, t) {
				return h(pn, e) ? pn[e](t._strict, t._locale) : new RegExp(V(e))
			}

			function V(e) {
				return Z(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, r, a) {
					return t || n || r || a
				}))
			}

			function Z(e) {
				return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
			}

			function K(e, t) {
				var n = t,
					r;
				for("string" == typeof e && (e = [e]), c(t) && (n = function(e, n) {
						n[t] = C(e)
					}), r = 0; r < e.length; r++) fn[e[r]] = n
			}

			function X(e, t) {
				K(e, function(e, n, r, a) {
					r._w = r._w || {}, t(e, r._w, r, a)
				})
			}

			function J(e, t, n) {
				null != t && h(fn, e) && fn[e](t, n._a, n, e)
			}

			function $(e) {
				return Q(e) ? 366 : 365
			}

			function Q(e) {
				return 0 == e % 4 && 0 != e % 100 || 0 == e % 400
			}

			function ee(e, t) {
				return function(r) {
					return null == r ? te(this, e) : (ne(this, e, r), n.updateOffset(this, t), this)
				}
			}

			function te(e, t) {
				return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN
			}

			function ne(e, t, n) {
				e.isValid() && !isNaN(n) && ("FullYear" === t && Q(e.year()) && 1 === e.month() && 29 === e.date() ? e._d["set" + (e._isUTC ? "UTC" : "") + t](n, e.month(), ae(n, e.month())) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n))
			}

			function re(e, t) {
				return(e % t + t) % t
			}

			function ae(e, t) {
				if(isNaN(e) || isNaN(t)) return NaN;
				var n = re(t, 12);
				return e += (t - n) / 12, 1 === n ? Q(e) ? 29 : 28 : 31 - n % 7 % 2
			}

			function oe(e, t, n) {
				var r = e.toLocaleLowerCase(),
					a, o, s;
				if(!this._monthsParse)
					for(this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], a = 0; 12 > a; ++a) s = g([2e3, a]), this._shortMonthsParse[a] = this.monthsShort(s, "").toLocaleLowerCase(), this._longMonthsParse[a] = this.months(s, "").toLocaleLowerCase();
				return n ? "MMM" === t ? (o = wn.call(this._shortMonthsParse, r), -1 === o ? null : o) : (o = wn.call(this._longMonthsParse, r), -1 === o ? null : o) : "MMM" === t ? (o = wn.call(this._shortMonthsParse, r), -1 !== o) ? o : (o = wn.call(this._longMonthsParse, r), -1 === o ? null : o) : (o = wn.call(this._longMonthsParse, r), -1 !== o) ? o : (o = wn.call(this._shortMonthsParse, r), -1 === o ? null : o)
			}

			function se(e, t) {
				var n;
				if(!e.isValid()) return e;
				if("string" == typeof t)
					if(/^\d+$/.test(t)) t = C(t);
					else if(t = e.localeData().monthsParse(t), !c(t)) return e;
				return n = d(e.date(), ae(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e
			}

			function ie(e) {
				return null == e ? te(this, "Month") : (se(this, e), n.updateOffset(this, !0), this)
			}

			function de() {
				function e(e, t) {
					return t.length - e.length
				}
				var t = [],
					n = [],
					r = [],
					a, o;
				for(a = 0; 12 > a; a++) o = g([2e3, a]), t.push(this.monthsShort(o, "")), n.push(this.months(o, "")), r.push(this.months(o, "")), r.push(this.monthsShort(o, ""));
				for(t.sort(e), n.sort(e), r.sort(e), a = 0; 12 > a; a++) t[a] = Z(t[a]), n[a] = Z(n[a]);
				for(a = 0; 24 > a; a++) r[a] = Z(r[a]);
				this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + t.join("|") + ")", "i")
			}

			function le(e, t, n, r, a, o, s) {
				var i = new Date(e, t, n, r, a, o, s);
				return 100 > e && 0 <= e && isFinite(i.getFullYear()) && i.setFullYear(e), i
			}

			function ce(e) {
				var t = new Date(Date.UTC.apply(null, arguments));
				return 100 > e && 0 <= e && isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e), t
			}

			function ue(e, t, n) {
				var r = 7 + t - n,
					a = (7 + ce(e, 0, r).getUTCDay() - t) % 7;
				return -a + r - 1
			}

			function pe(e, t, n, r, a) {
				var o = ue(e, r, a),
					s = 1 + 7 * (t - 1) + (7 + n - r) % 7 + o,
					i, d;
				return 0 >= s ? (i = e - 1, d = $(i) + s) : s > $(e) ? (i = e + 1, d = s - $(e)) : (i = e, d = s), {
					year: i,
					dayOfYear: d
				}
			}

			function fe(e, t, n) {
				var r = ue(e.year(), t, n),
					a = s((e.dayOfYear() - r - 1) / 7) + 1,
					o, i;
				return 1 > a ? (i = e.year() - 1, o = a + me(i, t, n)) : a > me(e.year(), t, n) ? (o = a - me(e.year(), t, n), i = e.year() + 1) : (i = e.year(), o = a), {
					week: o,
					year: i
				}
			}

			function me(e, t, n) {
				var r = ue(e, t, n),
					a = ue(e + 1, t, n);
				return($(e) - r + a) / 7
			}

			function he(e, t) {
				return "string" == typeof e ? isNaN(e) ? (e = t.weekdaysParse(e), "number" == typeof e ? e : null) : parseInt(e, 10) : e
			}

			function _e(e, t) {
				return "string" == typeof e ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e
			}

			function ge(e, t, n) {
				var r = e.toLocaleLowerCase(),
					a, o, s;
				if(!this._weekdaysParse)
					for(this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], a = 0; 7 > a; ++a) s = g([2e3, 1]).day(a), this._minWeekdaysParse[a] = this.weekdaysMin(s, "").toLocaleLowerCase(), this._shortWeekdaysParse[a] = this.weekdaysShort(s, "").toLocaleLowerCase(), this._weekdaysParse[a] = this.weekdays(s, "").toLocaleLowerCase();
				return n ? "dddd" === t ? (o = wn.call(this._weekdaysParse, r), -1 === o ? null : o) : "ddd" === t ? (o = wn.call(this._shortWeekdaysParse, r), -1 === o ? null : o) : (o = wn.call(this._minWeekdaysParse, r), -1 === o ? null : o) : "dddd" === t ? (o = wn.call(this._weekdaysParse, r), -1 !== o) ? o : (o = wn.call(this._shortWeekdaysParse, r), -1 !== o) ? o : (o = wn.call(this._minWeekdaysParse, r), -1 === o ? null : o) : "ddd" === t ? (o = wn.call(this._shortWeekdaysParse, r), -1 !== o) ? o : (o = wn.call(this._weekdaysParse, r), -1 !== o) ? o : (o = wn.call(this._minWeekdaysParse, r), -1 === o ? null : o) : (o = wn.call(this._minWeekdaysParse, r), -1 !== o) ? o : (o = wn.call(this._weekdaysParse, r), -1 !== o) ? o : (o = wn.call(this._shortWeekdaysParse, r), -1 === o ? null : o)
			}

			function ye() {
				function e(e, t) {
					return t.length - e.length
				}
				var t = [],
					n = [],
					r = [],
					a = [],
					o, s, d, l, c;
				for(o = 0; 7 > o; o++) s = g([2e3, 1]).day(o), d = this.weekdaysMin(s, ""), l = this.weekdaysShort(s, ""), c = this.weekdays(s, ""), t.push(d), n.push(l), r.push(c), a.push(d), a.push(l), a.push(c);
				for(t.sort(e), n.sort(e), r.sort(e), a.sort(e), o = 0; 7 > o; o++) n[o] = Z(n[o]), r[o] = Z(r[o]), a[o] = Z(a[o]);
				this._weekdaysRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + t.join("|") + ")", "i")
			}

			function be() {
				return this.hours() % 12 || 12
			}

			function ke(e, t) {
				z(e, 0, 0, function() {
					return this.localeData().meridiem(this.hours(), this.minutes(), t)
				})
			}

			function we(e, t) {
				return t._meridiemParse
			}

			function xe(e) {
				return e ? e.toLowerCase().replace("_", "-") : e
			}

			function Se(e) {
				for(var t = 0, n, r, a, o; t < e.length;) {
					for(o = xe(e[t]).split("-"), n = o.length, r = xe(e[t + 1]), r = r ? r.split("-") : null; 0 < n;) {
						if(a = ve(o.slice(0, n).join("-")), a) return a;
						if(r && r.length >= n && T(o, r, !0) >= n - 1) break;
						n--
					}
					t++
				}
				return jn
			}

			function ve(n) {
				var r = null;
				if(!In[n] && "undefined" != typeof t && t && t.exports) try {
					r = jn._abbr;
					e("./locale/" + n), Ee(r)
				} catch(t) {}
				return In[n]
			}

			function Ee(e, t) {
				var n;
				return e && (n = p(t) ? Te(e) : Ce(e, t), n ? jn = n : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), jn._abbr
			}

			function Ce(e, t) {
				if(null !== t) {
					var n = Tn,
						r;
					if(t.abbr = e, null != In[e]) R("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), n = In[e]._config;
					else if(null != t.parentLocale)
						if(null != In[t.parentLocale]) n = In[t.parentLocale]._config;
						else if(r = ve(t.parentLocale), null != r) n = r._config;
					else return Ln[t.parentLocale] || (Ln[t.parentLocale] = []), Ln[t.parentLocale].push({
						name: e,
						config: t
					}), null;
					return In[e] = new O(A(n, t)), Ln[e] && Ln[e].forEach(function(e) {
						Ce(e.name, e.config)
					}), Ee(e), In[e]
				}
				return delete In[e], null
			}

			function Te(e) {
				var t;
				if(e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return jn;
				if(!l(e)) {
					if(t = ve(e), t) return t;
					e = [e]
				}
				return Se(e)
			}

			function Ie() {
				return zt(In)
			}

			function Le(e) {
				var t = e._a,
					n;
				return t && -2 === b(e).overflow && (n = 0 > t[1] || 11 < t[1] ? 1 : 1 > t[2] || t[2] > ae(t[0], t[1]) ? 2 : 0 > t[3] || 24 < t[3] || 24 === t[3] && (0 !== t[4] || 0 !== t[5] || 0 !== t[6]) ? 3 : 0 > t[4] || 59 < t[4] ? 4 : 0 > t[5] || 59 < t[5] ? 5 : 0 > t[6] || 999 < t[6] ? 6 : -1, b(e)._overflowDayOfYear && (0 > n || 2 < n) && (n = 2), b(e)._overflowWeeks && -1 === n && (n = 7), b(e)._overflowWeekday && -1 === n && (n = 8), b(e).overflow = n), e
			}

			function Re(e, t, n) {
				return null == e ? null == t ? n : t : e
			}

			function Be(e) {
				var t = new Date(n.now());
				return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
			}

			function Ae(e) {
				var t = [],
					n, r, a, o, s;
				if(!e._d) {
					for(a = Be(e), e._w && null == e._a[2] && null == e._a[1] && Oe(e), null != e._dayOfYear && (s = Re(e._a[0], a[0]), (e._dayOfYear > $(s) || 0 === e._dayOfYear) && (b(e)._overflowDayOfYear = !0), r = ce(s, 0, e._dayOfYear), e._a[1] = r.getUTCMonth(), e._a[2] = r.getUTCDate()), n = 0; 3 > n && null == e._a[n]; ++n) e._a[n] = t[n] = a[n];
					for(; 7 > n; n++) e._a[n] = t[n] = null == e._a[n] ? 2 === n ? 1 : 0 : e._a[n];
					24 === e._a[3] && 0 === e._a[4] && 0 === e._a[5] && 0 === e._a[6] && (e._nextDay = !0, e._a[3] = 0), e._d = (e._useUTC ? ce : le).apply(null, t), o = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[3] = 24), e._w && "undefined" != typeof e._w.d && e._w.d !== o && (b(e).weekdayMismatch = !0)
				}
			}

			function Oe(e) {
				var t, n, r, a, o, s, i, d;
				if(t = e._w, null != t.GG || null != t.W || null != t.E) o = 1, s = 4, n = Re(t.GG, e._a[0], fe(Xe(), 1, 4).year), r = Re(t.W, 1), a = Re(t.E, 1), (1 > a || 7 < a) && (d = !0);
				else {
					o = e._locale._week.dow, s = e._locale._week.doy;
					var l = fe(Xe(), o, s);
					n = Re(t.gg, e._a[0], l.year), r = Re(t.w, l.week), null == t.d ? null == t.e ? a = o : (a = t.e + o, (0 > t.e || 6 < t.e) && (d = !0)) : (a = t.d, (0 > a || 6 < a) && (d = !0))
				}
				1 > r || r > me(n, o, s) ? b(e)._overflowWeeks = !0 : null == d ? (i = pe(n, r, a, o, s), e._a[0] = i.year, e._dayOfYear = i.dayOfYear) : b(e)._overflowWeekday = !0
			}

			function De(e) {
				var t = e._i,
					n = Rn.exec(t) || Bn.exec(t),
					r, a, o, s, d, c;
				if(n) {
					for(b(e).iso = !0, r = 0, a = On.length; r < a; r++)
						if(On[r][1].exec(n[1])) {
							s = On[r][0], o = !1 !== On[r][2];
							break
						}
					if(null == s) return void(e._isValid = !1);
					if(n[3]) {
						for(r = 0, a = Dn.length; r < a; r++)
							if(Dn[r][1].exec(n[3])) {
								d = (n[2] || " ") + Dn[r][0];
								break
							}
						if(null == d) return void(e._isValid = !1)
					}
					if(!o && null != d) return void(e._isValid = !1);
					if(n[4])
						if(An.exec(n[4])) c = "Z";
						else return void(e._isValid = !1);
					e._f = s + (d || "") + (c || ""), Fe(e)
				} else e._isValid = !1
			}

			function Me(e, t, n, r, a, o) {
				var s = [Pe(e), Sn.indexOf(t), parseInt(n, 10), parseInt(r, 10), parseInt(a, 10)];
				return o && s.push(parseInt(o, 10)), s
			}

			function Pe(e) {
				var t = parseInt(e, 10);
				return 49 >= t ? 2e3 + t : 999 >= t ? 1900 + t : t
			}

			function Ue(e) {
				return e.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
			}

			function je(e, t, n) {
				if(e) {
					var r = vn.indexOf(e),
						a = new Date(t[0], t[1], t[2]).getDay();
					if(r !== a) return b(n).weekdayMismatch = !0, n._isValid = !1, !1
				}
				return !0
			}

			function Ne(e, t, n) {
				if(e) return Un[e];
				if(t) return 0;
				var r = parseInt(n, 10),
					a = r % 100;
				return 60 * ((r - a) / 100) + a
			}

			function ze(e) {
				var t = Pn.exec(Ue(e._i));
				if(t) {
					var n = Me(t[4], t[3], t[2], t[5], t[6], t[7]);
					if(!je(t[1], n, e)) return;
					e._a = n, e._tzm = Ne(t[8], t[9], t[10]), e._d = ce.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), b(e).rfc2822 = !0
				} else e._isValid = !1
			}

			function He(e) {
				var t = Mn.exec(e._i);
				if(null !== t) return void(e._d = new Date(+t[1]));
				if(De(e), !1 === e._isValid) delete e._isValid;
				else return;
				if(ze(e), !1 === e._isValid) delete e._isValid;
				else return;
				n.createFromInputFallback(e)
			}

			function Fe(e) {
				if(e._f === n.ISO_8601) return void De(e);
				if(e._f === n.RFC_2822) return void ze(e);
				e._a = [], b(e).empty = !0;
				var t = "" + e._i,
					r = t.length,
					a = 0,
					o, s, d, l, c;
				for(d = q(e._f, e._locale).match(qt) || [], o = 0; o < d.length; o++) l = d[o], s = (t.match(G(l, e)) || [])[0], s && (c = t.substr(0, t.indexOf(s)), 0 < c.length && b(e).unusedInput.push(c), t = t.slice(t.indexOf(s) + s.length), a += s.length), Vt[l] ? (s ? b(e).empty = !1 : b(e).unusedTokens.push(l), J(l, s, e)) : e._strict && !s && b(e).unusedTokens.push(l);
				b(e).charsLeftOver = r - a, 0 < t.length && b(e).unusedInput.push(t), 12 >= e._a[3] && !0 === b(e).bigHour && 0 < e._a[3] && (b(e).bigHour = void 0), b(e).parsedDateParts = e._a.slice(0), b(e).meridiem = e._meridiem, e._a[3] = We(e._locale, e._a[3], e._meridiem), Ae(e), Le(e)
			}

			function We(e, t, n) {
				var r;
				return null == n ? t : null == e.meridiemHour ? null == e.isPM ? t : (r = e.isPM(n), r && 12 > t && (t += 12), r || 12 !== t || (t = 0), t) : e.meridiemHour(t, n)
			}

			function qe(e) {
				var t, n, r, a, o;
				if(0 === e._f.length) return b(e).invalidFormat = !0, void(e._d = new Date(NaN));
				for(a = 0; a < e._f.length; a++)(o = 0, t = x({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._f = e._f[a], Fe(t), !!k(t)) && (o += b(t).charsLeftOver, o += 10 * b(t).unusedTokens.length, b(t).score = o, (null == r || o < r) && (r = o, n = t));
				_(e, n || t)
			}

			function Ye(e) {
				if(!e._d) {
					var t = P(e._i);
					e._a = m([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function(e) {
						return e && parseInt(e, 10)
					}), Ae(e)
				}
			}

			function Ge(e) {
				var t = new S(Le(Ve(e)));
				return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t
			}

			function Ve(e) {
				var t = e._i,
					n = e._f;
				return(e._locale = e._locale || Te(e._l), null === t || void 0 === n && "" === t) ? w({
					nullInput: !0
				}) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)), v(t)) ? new S(Le(t)) : (f(t) ? e._d = t : l(n) ? qe(e) : n ? Fe(e) : Ze(e), k(e) || (e._d = null), e)
			}

			function Ze(e) {
				var t = e._i;
				p(t) ? e._d = new Date(n.now()) : f(t) ? e._d = new Date(t.valueOf()) : "string" == typeof t ? He(e) : l(t) ? (e._a = m(t.slice(0), function(e) {
					return parseInt(e, 10)
				}), Ae(e)) : i(t) ? Ye(e) : c(t) ? e._d = new Date(t) : n.createFromInputFallback(e)
			}

			function Ke(e, t, n, r, a) {
				var o = {};
				return(!0 === n || !1 === n) && (r = n, n = void 0), (i(e) && u(e) || l(e) && 0 === e.length) && (e = void 0), o._isAMomentObject = !0, o._useUTC = o._isUTC = a, o._l = n, o._i = e, o._f = t, o._strict = r, Ge(o)
			}

			function Xe(e, t, n, r) {
				return Ke(e, t, n, r, !1)
			}

			function Je(e, t) {
				var n, r;
				if(1 === t.length && l(t[0]) && (t = t[0]), !t.length) return Xe();
				for(n = t[0], r = 1; r < t.length; ++r)(!t[r].isValid() || t[r][e](n)) && (n = t[r]);
				return n
			}

			function $e(e) {
				for(var t in e)
					if(-1 === wn.call(Hn, t) || null != e[t] && isNaN(e[t])) return !1;
				for(var n = !1, r = 0; r < Hn.length; ++r)
					if(e[Hn[r]]) {
						if(n) return !1;
						parseFloat(e[Hn[r]]) !== C(e[Hn[r]]) && (n = !0)
					}
				return !0
			}

			function Qe(e) {
				var t = P(e),
					n = t.year || 0,
					r = t.quarter || 0,
					a = t.month || 0,
					o = t.week || 0,
					s = t.day || 0,
					i = t.hour || 0,
					d = t.minute || 0,
					l = t.second || 0,
					c = t.millisecond || 0;
				this._isValid = $e(t), this._milliseconds = +c + 1e3 * l + 6e4 * d + 60 * (60 * (1e3 * i)), this._days = +s + 7 * o, this._months = +a + 3 * r + 12 * n, this._data = {}, this._locale = Te(), this._bubble()
			}

			function et(e) {
				return e instanceof Qe
			}

			function tt(e) {
				return 0 > e ? -1 * r(-1 * e) : r(e)
			}

			function nt(e, t) {
				z(e, 0, 0, function() {
					var e = this.utcOffset(),
						n = "+";
					return 0 > e && (e = -e, n = "-"), n + N(~~(e / 60), 2) + t + N(~~e % 60, 2)
				})
			}

			function rt(e, t) {
				var n = (t || "").match(e);
				if(null === n) return null;
				var r = n[n.length - 1] || [],
					a = (r + "").match(Fn) || ["-", 0, 0],
					o = +(60 * a[1]) + C(a[2]);
				return 0 === o ? 0 : "+" === a[0] ? o : -o
			}

			function at(e, t) {
				var r, a;
				return t._isUTC ? (r = t.clone(), a = (v(e) || f(e) ? e.valueOf() : Xe(e).valueOf()) - r.valueOf(), r._d.setTime(r._d.valueOf() + a), n.updateOffset(r, !1), r) : Xe(e).local()
			}

			function ot(e) {
				return 15 * -r(e._d.getTimezoneOffset() / 15)
			}

			function st() {
				return !!this.isValid() && this._isUTC && 0 === this._offset
			}

			function it(e, t) {
				var n = e,
					r = null,
					a, o, s;
				return et(e) ? n = {
					ms: e._milliseconds,
					d: e._days,
					M: e._months
				} : c(e) ? (n = {}, t ? n[t] = e : n.milliseconds = e) : (r = Wn.exec(e)) ? (a = "-" === r[1] ? -1 : 1, n = {
					y: 0,
					d: C(r[2]) * a,
					h: C(r[3]) * a,
					m: C(r[4]) * a,
					s: C(r[5]) * a,
					ms: C(tt(1e3 * r[6])) * a
				}) : (r = qn.exec(e)) ? (a = "-" === r[1] ? -1 : "+" === r[1] ? 1 : 1, n = {
					y: dt(r[2], a),
					M: dt(r[3], a),
					w: dt(r[4], a),
					d: dt(r[5], a),
					h: dt(r[6], a),
					m: dt(r[7], a),
					s: dt(r[8], a)
				}) : null == n ? n = {} : "object" == typeof n && ("from" in n || "to" in n) && (s = ct(Xe(n.from), Xe(n.to)), n = {}, n.ms = s.milliseconds, n.M = s.months), o = new Qe(n), et(e) && h(e, "_locale") && (o._locale = e._locale), o
			}

			function dt(e, t) {
				var n = e && parseFloat(e.replace(",", "."));
				return(isNaN(n) ? 0 : n) * t
			}

			function lt(e, t) {
				var n = {
					milliseconds: 0,
					months: 0
				};
				return n.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n
			}

			function ct(e, t) {
				var n;
				return e.isValid() && t.isValid() ? (t = at(t, e), e.isBefore(t) ? n = lt(e, t) : (n = lt(t, e), n.milliseconds = -n.milliseconds, n.months = -n.months), n) : {
					milliseconds: 0,
					months: 0
				}
			}

			function ut(e, t) {
				return function(n, r) {
					var a, o;
					return null === r || isNaN(+r) || (R(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), o = n, n = r, r = o), n = "string" == typeof n ? +n : n, a = it(n, r), pt(this, a, e), this
				}
			}

			function pt(e, t, r, a) {
				var o = t._milliseconds,
					s = tt(t._days),
					i = tt(t._months);
				e.isValid() && (a = null == a || a, i && se(e, te(e, "Month") + i * r), s && ne(e, "Date", te(e, "Date") + s * r), o && e._d.setTime(e._d.valueOf() + o * r), a && n.updateOffset(e, s || i))
			}

			function ft(e, t) {
				var n = 12 * (t.year() - e.year()) + (t.month() - e.month()),
					r = e.clone().add(n, "months"),
					a, o;
				return 0 > t - r ? (a = e.clone().add(n - 1, "months"), o = (t - r) / (r - a)) : (a = e.clone().add(n + 1, "months"), o = (t - r) / (a - r)), -(n + o) || 0
			}

			function mt(e) {
				var t;
				return void 0 === e ? this._locale._abbr : (t = Te(e), null != t && (this._locale = t), this)
			}

			function ht() {
				return this._locale
			}

			function _t(e, t) {
				z(0, [e, e.length], 0, t)
			}

			function gt(e, t, n, r, a) {
				var o;
				return null == e ? fe(this, r, a).year : (o = me(e, r, a), t > o && (t = o), yt.call(this, e, t, n, r, a))
			}

			function yt(e, t, n, r, a) {
				var o = pe(e, t, n, r, a),
					s = ce(o.year, 0, o.dayOfYear);
				return this.year(s.getUTCFullYear()), this.month(s.getUTCMonth()), this.date(s.getUTCDate()), this
			}

			function bt(e, t) {
				t[6] = C(1e3 * ("0." + e))
			}

			function kt(e) {
				return e
			}

			function wt(e, t, n, r) {
				var a = Te(),
					o = g().set(r, t);
				return a[n](o, e)
			}

			function xt(e, t, n) {
				if(c(e) && (t = e, e = void 0), e = e || "", null != t) return wt(e, t, n, "month");
				var r = [],
					a;
				for(a = 0; 12 > a; a++) r[a] = wt(e, a, n, "month");
				return r
			}

			function St(e, t, n, r) {
				"boolean" == typeof e ? (c(t) && (n = t, t = void 0), t = t || "") : (t = e, n = t, e = !1, c(t) && (n = t, t = void 0), t = t || "");
				var a = Te(),
					o = e ? a._week.dow : 0;
				if(null != n) return wt(t, (n + o) % 7, r, "day");
				var s = [],
					d;
				for(d = 0; 7 > d; d++) s[d] = wt(t, (d + o) % 7, r, "day");
				return s
			}

			function vt(e, t, n, r) {
				var a = it(t, n);
				return e._milliseconds += r * a._milliseconds, e._days += r * a._days, e._months += r * a._months, e._bubble()
			}

			function Et(e) {
				return 0 > e ? s(e) : a(e)
			}

			function Ct(e) {
				return 4800 * e / 146097
			}

			function Tt(e) {
				return 146097 * e / 4800
			}

			function It(e) {
				return function() {
					return this.as(e)
				}
			}

			function Lt(e) {
				return function() {
					return this.isValid() ? this._data[e] : NaN
				}
			}

			function Rt(e, t, n, r, a) {
				return a.relativeTime(t || 1, !!n, e, r)
			}

			function Bt(e, t, n) {
				var r = it(e).abs(),
					o = gr(r.as("s")),
					s = gr(r.as("m")),
					i = gr(r.as("h")),
					d = gr(r.as("d")),
					l = gr(r.as("M")),
					c = gr(r.as("y")),
					u = o <= yr.ss && ["s", o] || o < yr.s && ["ss", o] || 1 >= s && ["m"] || s < yr.m && ["mm", s] || 1 >= i && ["h"] || i < yr.h && ["hh", i] || 1 >= d && ["d"] || d < yr.d && ["dd", d] || 1 >= l && ["M"] || l < yr.M && ["MM", l] || 1 >= c && ["y"] || ["yy", c];
				return u[2] = t, u[3] = 0 < +e, u[4] = n, Rt.apply(null, u)
			}

			function At(e) {
				return void 0 === e ? gr : "function" == typeof e && (gr = e, !0)
			}

			function Ot(e) {
				return(0 < e) - (0 > e) || +e
			}

			function Dt() {
				if(!this.isValid()) return this.localeData().invalidDate();
				var e = br(this._milliseconds) / 1e3,
					t = br(this._days),
					n = br(this._months),
					r, a, o;
				r = E(e / 60), a = E(r / 60), e %= 60, r %= 60, o = E(n / 12), n %= 12;
				var i = o,
					d = n,
					l = t,
					c = a,
					u = r,
					p = e ? e.toFixed(3).replace(/\.?0+$/, "") : "",
					s = this.asSeconds();
				if(!s) return "P0D";
				var f = 0 > s ? "-" : "",
					m = Ot(this._months) === Ot(s) ? "" : "-",
					h = Ot(this._days) === Ot(s) ? "" : "-",
					_ = Ot(this._milliseconds) === Ot(s) ? "" : "-";
				return f + "P" + (i ? m + i + "Y" : "") + (d ? m + d + "M" : "") + (l ? h + l + "D" : "") + (c || u || p ? "T" : "") + (c ? _ + c + "H" : "") + (u ? _ + u + "M" : "") + (p ? _ + p + "S" : "")
			}
			var Mt, Pt;
			Pt = Array.prototype.some ? Array.prototype.some : function(e) {
				for(var n = Object(this), t = n.length >>> 0, r = 0; r < t; r++)
					if(r in n && e.call(this, n[r], r, n)) return !0;
				return !1
			};
			var Ut = n.momentProperties = [],
				jt = !1,
				Nt = {};
			n.suppressDeprecationWarnings = !1, n.deprecationHandler = null;
			var zt = Object.keys ? Object.keys : function(e) {
				var t = [],
					n;
				for(n in e) h(e, n) && t.push(n);
				return t
			};
			var Ht = /\d{1,2}/,
				Ft = {},
				Wt = {},
				qt = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
				Yt = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
				Gt = {},
				Vt = {},
				Zt = /\d/,
				Kt = /\d\d/,
				Xt = /\d{3}/,
				Jt = /\d{4}/,
				$t = /[+-]?\d{6}/,
				Qt = /\d\d?/,
				en = /\d\d\d\d?/,
				tn = /\d\d\d\d\d\d?/,
				nn = /\d{1,3}/,
				rn = /\d{1,4}/,
				an = /[+-]?\d{1,6}/,
				on = /\d+/,
				sn = /[+-]?\d+/,
				dn = /Z|[+-]\d\d:?\d\d/gi,
				ln = /Z|[+-]\d\d(?::?\d\d)?/gi,
				cn = /[+-]?\d+(\.\d{1,3})?/,
				un = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
				pn = {},
				fn = {},
				mn = 0,
				hn = 1,
				_n = 2,
				gn = 3,
				yn = 4,
				bn = 5;
			z("Y", 0, 0, function() {
				var e = this.year();
				return 9999 >= e ? "" + e : "+" + e
			}), z(0, ["YY", 2], 0, function() {
				return this.year() % 100
			}), z(0, ["YYYY", 4], 0, "year"), z(0, ["YYYYY", 5], 0, "year"), z(0, ["YYYYYY", 6, !0], 0, "year"), D("year", "y"), U("year", 1), Y("Y", sn), Y("YY", Qt, Kt), Y("YYYY", rn, Jt), Y("YYYYY", an, $t), Y("YYYYYY", an, $t), K(["YYYYY", "YYYYYY"], mn), K("YYYY", function(e, t) {
				t[mn] = 2 === e.length ? n.parseTwoDigitYear(e) : C(e)
			}), K("YY", function(e, t) {
				t[mn] = n.parseTwoDigitYear(e)
			}), K("Y", function(e, t) {
				t[mn] = parseInt(e, 10)
			}), n.parseTwoDigitYear = function(e) {
				return C(e) + (68 < C(e) ? 1900 : 2e3)
			};
			var kn = ee("FullYear", !0),
				wn;
			wn = Array.prototype.indexOf ? Array.prototype.indexOf : function(e) {
				var t;
				for(t = 0; t < this.length; ++t)
					if(this[t] === e) return t;
				return -1
			}, z("M", ["MM", 2], "Mo", function() {
				return this.month() + 1
			}), z("MMM", 0, 0, function(e) {
				return this.localeData().monthsShort(this, e)
			}), z("MMMM", 0, 0, function(e) {
				return this.localeData().months(this, e)
			}), D("month", "M"), U("month", 8), Y("M", Qt), Y("MM", Qt, Kt), Y("MMM", function(e, t) {
				return t.monthsShortRegex(e)
			}), Y("MMMM", function(e, t) {
				return t.monthsRegex(e)
			}), K(["M", "MM"], function(e, t) {
				t[hn] = C(e) - 1
			}), K(["MMM", "MMMM"], function(e, t, n, r) {
				var a = n._locale.monthsParse(e, r, n._strict);
				null == a ? b(n).invalidMonth = e : t[hn] = a
			});
			var xn = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
				Sn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			z("w", ["ww", 2], "wo", "week"), z("W", ["WW", 2], "Wo", "isoWeek"), D("week", "w"), D("isoWeek", "W"), U("week", 5), U("isoWeek", 5), Y("w", Qt), Y("ww", Qt, Kt), Y("W", Qt), Y("WW", Qt, Kt), X(["w", "ww", "W", "WW"], function(e, t, n, r) {
				t[r.substr(0, 1)] = C(e)
			});
			z("d", 0, "do", "day"), z("dd", 0, 0, function(e) {
				return this.localeData().weekdaysMin(this, e)
			}), z("ddd", 0, 0, function(e) {
				return this.localeData().weekdaysShort(this, e)
			}), z("dddd", 0, 0, function(e) {
				return this.localeData().weekdays(this, e)
			}), z("e", 0, 0, "weekday"), z("E", 0, 0, "isoWeekday"), D("day", "d"), D("weekday", "e"), D("isoWeekday", "E"), U("day", 11), U("weekday", 11), U("isoWeekday", 11), Y("d", Qt), Y("e", Qt), Y("E", Qt), Y("dd", function(e, t) {
				return t.weekdaysMinRegex(e)
			}), Y("ddd", function(e, t) {
				return t.weekdaysShortRegex(e)
			}), Y("dddd", function(e, t) {
				return t.weekdaysRegex(e)
			}), X(["dd", "ddd", "dddd"], function(e, t, n, r) {
				var a = n._locale.weekdaysParse(e, r, n._strict);
				null == a ? b(n).invalidWeekday = e : t.d = a
			}), X(["d", "e", "E"], function(e, t, n, r) {
				t[r] = C(e)
			});
			var vn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			z("H", ["HH", 2], 0, "hour"), z("h", ["hh", 2], 0, be), z("k", ["kk", 2], 0, function() {
				return this.hours() || 24
			}), z("hmm", 0, 0, function() {
				return "" + be.apply(this) + N(this.minutes(), 2)
			}), z("hmmss", 0, 0, function() {
				return "" + be.apply(this) + N(this.minutes(), 2) + N(this.seconds(), 2)
			}), z("Hmm", 0, 0, function() {
				return "" + this.hours() + N(this.minutes(), 2)
			}), z("Hmmss", 0, 0, function() {
				return "" + this.hours() + N(this.minutes(), 2) + N(this.seconds(), 2)
			}), ke("a", !0), ke("A", !1), D("hour", "h"), U("hour", 13), Y("a", we), Y("A", we), Y("H", Qt), Y("h", Qt), Y("k", Qt), Y("HH", Qt, Kt), Y("hh", Qt, Kt), Y("kk", Qt, Kt), Y("hmm", en), Y("hmmss", tn), Y("Hmm", en), Y("Hmmss", tn), K(["H", "HH"], gn), K(["k", "kk"], function(e, t) {
				var n = C(e);
				t[gn] = 24 === n ? 0 : n
			}), K(["a", "A"], function(e, t, n) {
				n._isPm = n._locale.isPM(e), n._meridiem = e
			}), K(["h", "hh"], function(e, t, n) {
				t[gn] = C(e), b(n).bigHour = !0
			}), K("hmm", function(e, t, n) {
				var r = e.length - 2;
				t[gn] = C(e.substr(0, r)), t[yn] = C(e.substr(r)), b(n).bigHour = !0
			}), K("hmmss", function(e, t, n) {
				var r = e.length - 4,
					a = e.length - 2;
				t[gn] = C(e.substr(0, r)), t[yn] = C(e.substr(r, 2)), t[bn] = C(e.substr(a)), b(n).bigHour = !0
			}), K("Hmm", function(e, t) {
				var n = e.length - 2;
				t[gn] = C(e.substr(0, n)), t[yn] = C(e.substr(n))
			}), K("Hmmss", function(e, t) {
				var n = e.length - 4,
					r = e.length - 2;
				t[gn] = C(e.substr(0, n)), t[yn] = C(e.substr(n, 2)), t[bn] = C(e.substr(r))
			});
			var En = /[ap]\.?m?\.?/i,
				Cn = ee("Hours", !0),
				Tn = {
					calendar: {
						sameDay: "[Today at] LT",
						nextDay: "[Tomorrow at] LT",
						nextWeek: "dddd [at] LT",
						lastDay: "[Yesterday at] LT",
						lastWeek: "[Last] dddd [at] LT",
						sameElse: "L"
					},
					longDateFormat: {
						LTS: "h:mm:ss A",
						LT: "h:mm A",
						L: "MM/DD/YYYY",
						LL: "MMMM D, YYYY",
						LLL: "MMMM D, YYYY h:mm A",
						LLLL: "dddd, MMMM D, YYYY h:mm A"
					},
					invalidDate: "Invalid date",
					ordinal: "%d",
					dayOfMonthOrdinalParse: Ht,
					relativeTime: {
						future: "in %s",
						past: "%s ago",
						s: "a few seconds",
						ss: "%d seconds",
						m: "a minute",
						mm: "%d minutes",
						h: "an hour",
						hh: "%d hours",
						d: "a day",
						dd: "%d days",
						M: "a month",
						MM: "%d months",
						y: "a year",
						yy: "%d years"
					},
					months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					monthsShort: Sn,
					week: {
						dow: 0,
						doy: 6
					},
					weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
					weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
					weekdaysShort: vn,
					meridiemParse: En
				},
				In = {},
				Ln = {},
				Rn = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
				Bn = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
				An = /Z|[+-]\d\d(?::?\d\d)?/,
				On = [
					["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
					["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
					["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
					["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
					["YYYY-DDD", /\d{4}-\d{3}/],
					["YYYY-MM", /\d{4}-\d\d/, !1],
					["YYYYYYMMDD", /[+-]\d{10}/],
					["YYYYMMDD", /\d{8}/],
					["GGGG[W]WWE", /\d{4}W\d{3}/],
					["GGGG[W]WW", /\d{4}W\d{2}/, !1],
					["YYYYDDD", /\d{7}/]
				],
				Dn = [
					["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
					["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
					["HH:mm:ss", /\d\d:\d\d:\d\d/],
					["HH:mm", /\d\d:\d\d/],
					["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
					["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
					["HHmmss", /\d\d\d\d\d\d/],
					["HHmm", /\d\d\d\d/],
					["HH", /\d\d/]
				],
				Mn = /^\/?Date\((\-?\d+)/i,
				Pn = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
				Un = {
					UT: 0,
					GMT: 0,
					EDT: -240,
					EST: -300,
					CDT: -300,
					CST: -360,
					MDT: -360,
					MST: -420,
					PDT: -420,
					PST: -480
				},
				jn;
			n.createFromInputFallback = L("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
				e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
			}), n.ISO_8601 = function() {}, n.RFC_2822 = function() {};
			var Nn = L("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
					var e = Xe.apply(null, arguments);
					return this.isValid() && e.isValid() ? e < this ? this : e : w()
				}),
				zn = L("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
					var e = Xe.apply(null, arguments);
					return this.isValid() && e.isValid() ? e > this ? this : e : w()
				}),
				Hn = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
			nt("Z", ":"), nt("ZZ", ""), Y("Z", ln), Y("ZZ", ln), K(["Z", "ZZ"], function(e, t, n) {
				n._useUTC = !0, n._tzm = rt(ln, e)
			});
			var Fn = /([\+\-]|\d\d)/gi;
			n.updateOffset = function() {};
			var Wn = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
				qn = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
			it.fn = Qe.prototype, it.invalid = function() {
				return it(NaN)
			};
			var Yn = ut(1, "add"),
				Gn = ut(-1, "subtract");
			n.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", n.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
			var Vn = L("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
				return void 0 === e ? this.localeData() : this.locale(e)
			});
			z(0, ["gg", 2], 0, function() {
				return this.weekYear() % 100
			}), z(0, ["GG", 2], 0, function() {
				return this.isoWeekYear() % 100
			}), _t("gggg", "weekYear"), _t("ggggg", "weekYear"), _t("GGGG", "isoWeekYear"), _t("GGGGG", "isoWeekYear"), D("weekYear", "gg"), D("isoWeekYear", "GG"), U("weekYear", 1), U("isoWeekYear", 1), Y("G", sn), Y("g", sn), Y("GG", Qt, Kt), Y("gg", Qt, Kt), Y("GGGG", rn, Jt), Y("gggg", rn, Jt), Y("GGGGG", an, $t), Y("ggggg", an, $t), X(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, n, r) {
				t[r.substr(0, 2)] = C(e)
			}), X(["gg", "GG"], function(e, t, r, a) {
				t[a] = n.parseTwoDigitYear(e)
			}), z("Q", 0, "Qo", "quarter"), D("quarter", "Q"), U("quarter", 7), Y("Q", Zt), K("Q", function(e, t) {
				t[hn] = 3 * (C(e) - 1)
			}), z("D", ["DD", 2], "Do", "date"), D("date", "D"), U("date", 9), Y("D", Qt), Y("DD", Qt, Kt), Y("Do", function(e, t) {
				return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient
			}), K(["D", "DD"], _n), K("Do", function(e, t) {
				t[_n] = C(e.match(Qt)[0])
			});
			var Zn = ee("Date", !0);
			z("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), D("dayOfYear", "DDD"), U("dayOfYear", 4), Y("DDD", nn), Y("DDDD", Xt), K(["DDD", "DDDD"], function(e, t, n) {
				n._dayOfYear = C(e)
			}), z("m", ["mm", 2], 0, "minute"), D("minute", "m"), U("minute", 14), Y("m", Qt), Y("mm", Qt, Kt), K(["m", "mm"], yn);
			var Kn = ee("Minutes", !1);
			z("s", ["ss", 2], 0, "second"), D("second", "s"), U("second", 15), Y("s", Qt), Y("ss", Qt, Kt), K(["s", "ss"], bn);
			var Xn = ee("Seconds", !1);
			z("S", 0, 0, function() {
				return ~~(this.millisecond() / 100)
			}), z(0, ["SS", 2], 0, function() {
				return ~~(this.millisecond() / 10)
			}), z(0, ["SSS", 3], 0, "millisecond"), z(0, ["SSSS", 4], 0, function() {
				return 10 * this.millisecond()
			}), z(0, ["SSSSS", 5], 0, function() {
				return 100 * this.millisecond()
			}), z(0, ["SSSSSS", 6], 0, function() {
				return 1e3 * this.millisecond()
			}), z(0, ["SSSSSSS", 7], 0, function() {
				return 1e4 * this.millisecond()
			}), z(0, ["SSSSSSSS", 8], 0, function() {
				return 1e5 * this.millisecond()
			}), z(0, ["SSSSSSSSS", 9], 0, function() {
				return 1e6 * this.millisecond()
			}), D("millisecond", "ms"), U("millisecond", 16), Y("S", nn, Zt), Y("SS", nn, Kt), Y("SSS", nn, Xt);
			var Jn;
			for(Jn = "SSSS"; 9 >= Jn.length; Jn += "S") Y(Jn, on);
			for(Jn = "S"; 9 >= Jn.length; Jn += "S") K(Jn, bt);
			var $n = ee("Milliseconds", !1);
			z("z", 0, 0, "zoneAbbr"), z("zz", 0, 0, "zoneName");
			var Qn = S.prototype;
			Qn.add = Yn, Qn.calendar = function(e, t) {
				var r = e || Xe(),
					a = at(r, this).startOf("day"),
					o = n.calendarFormat(this, a) || "sameElse",
					s = t && (B(t[o]) ? t[o].call(this, r) : t[o]);
				return this.format(s || this.localeData().calendar(o, this, Xe(r)))
			}, Qn.clone = function() {
				return new S(this)
			}, Qn.diff = function(e, t, n) {
				var r, a, o;
				return this.isValid() ? (r = at(e, this), !r.isValid()) ? NaN : (a = 6e4 * (r.utcOffset() - this.utcOffset()), t = M(t), (o = "year" === t ? ft(this, r) / 12 : "month" === t ? ft(this, r) : "quarter" === t ? ft(this, r) / 3 : "second" === t ? (this - r) / 1e3 : "minute" === t ? (this - r) / 6e4 : "hour" === t ? (this - r) / 36e5 : "day" === t ? (this - r - a) / 864e5 : "week" === t ? (this - r - a) / 6048e5 : this - r, n ? o : E(o))) : NaN
			}, Qn.endOf = function(e) {
				return(e = M(e), void 0 === e || "millisecond" === e) ? this : ("date" === e && (e = "day"), this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms"))
			}, Qn.format = function(e) {
				e || (e = this.isUtc() ? n.defaultFormatUtc : n.defaultFormat);
				var t = W(this, e);
				return this.localeData().postformat(t)
			}, Qn.from = function(e, t) {
				return this.isValid() && (v(e) && e.isValid() || Xe(e).isValid()) ? it({
					to: this,
					from: e
				}).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
			}, Qn.fromNow = function(e) {
				return this.from(Xe(), e)
			}, Qn.to = function(e, t) {
				return this.isValid() && (v(e) && e.isValid() || Xe(e).isValid()) ? it({
					from: this,
					to: e
				}).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
			}, Qn.toNow = function(e) {
				return this.to(Xe(), e)
			}, Qn.get = function(e) {
				return e = M(e), B(this[e]) ? this[e]() : this
			}, Qn.invalidAt = function() {
				return b(this).overflow
			}, Qn.isAfter = function(e, t) {
				var n = v(e) ? e : Xe(e);
				return !!(this.isValid() && n.isValid()) && (t = M(p(t) ? "millisecond" : t), "millisecond" === t ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf())
			}, Qn.isBefore = function(e, t) {
				var n = v(e) ? e : Xe(e);
				return !!(this.isValid() && n.isValid()) && (t = M(p(t) ? "millisecond" : t), "millisecond" === t ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf())
			}, Qn.isBetween = function(e, t, n, r) {
				return r = r || "()", ("(" === r[0] ? this.isAfter(e, n) : !this.isBefore(e, n)) && (")" === r[1] ? this.isBefore(t, n) : !this.isAfter(t, n))
			}, Qn.isSame = function(e, t) {
				var n = v(e) ? e : Xe(e),
					r;
				return !!(this.isValid() && n.isValid()) && (t = M(t || "millisecond"), "millisecond" === t ? this.valueOf() === n.valueOf() : (r = n.valueOf(), this.clone().startOf(t).valueOf() <= r && r <= this.clone().endOf(t).valueOf()))
			}, Qn.isSameOrAfter = function(e, t) {
				return this.isSame(e, t) || this.isAfter(e, t)
			}, Qn.isSameOrBefore = function(e, t) {
				return this.isSame(e, t) || this.isBefore(e, t)
			}, Qn.isValid = function() {
				return k(this)
			}, Qn.lang = Vn, Qn.locale = mt, Qn.localeData = ht, Qn.max = zn, Qn.min = Nn, Qn.parsingFlags = function() {
				return _({}, b(this))
			}, Qn.set = function(e, t) {
				if("object" == typeof e) {
					e = P(e);
					for(var n = j(e), r = 0; r < n.length; r++) this[n[r].unit](e[n[r].unit])
				} else if(e = M(e), B(this[e])) return this[e](t);
				return this
			}, Qn.startOf = function(e) {
				switch(e = M(e), e) {
					case "year":
						this.month(0);
					case "quarter":
					case "month":
						this.date(1);
					case "week":
					case "isoWeek":
					case "day":
					case "date":
						this.hours(0);
					case "hour":
						this.minutes(0);
					case "minute":
						this.seconds(0);
					case "second":
						this.milliseconds(0);
				}
				return "week" === e && this.weekday(0), "isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * s(this.month() / 3)), this
			}, Qn.subtract = Gn, Qn.toArray = function() {
				var e = this;
				return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
			}, Qn.toObject = function() {
				var e = this;
				return {
					years: e.year(),
					months: e.month(),
					date: e.date(),
					hours: e.hours(),
					minutes: e.minutes(),
					seconds: e.seconds(),
					milliseconds: e.milliseconds()
				}
			}, Qn.toDate = function() {
				return new Date(this.valueOf())
			}, Qn.toISOString = function(e) {
				if(!this.isValid()) return null;
				var t = !0 !== e,
					n = t ? this.clone().utc() : this;
				return 0 > n.year() || 9999 < n.year() ? W(n, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : B(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + 1e3 * (60 * this.utcOffset())).toISOString().replace("Z", W(n, "Z")) : W(n, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
			}, Qn.inspect = function() {
				if(!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
				var e = "moment",
					t = "";
				this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", t = "Z");
				var n = "[" + e + "(\"]",
					r = 0 <= this.year() && 9999 >= this.year() ? "YYYY" : "YYYYYY",
					a = t + "[\")]";
				return this.format(n + r + "-MM-DD[T]HH:mm:ss.SSS" + a)
			}, Qn.toJSON = function() {
				return this.isValid() ? this.toISOString() : null
			}, Qn.toString = function() {
				return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
			}, Qn.unix = function() {
				return s(this.valueOf() / 1e3)
			}, Qn.valueOf = function() {
				return this._d.valueOf() - 6e4 * (this._offset || 0)
			}, Qn.creationData = function() {
				return {
					input: this._i,
					format: this._f,
					locale: this._locale,
					isUTC: this._isUTC,
					strict: this._strict
				}
			}, Qn.year = kn, Qn.isLeapYear = function() {
				return Q(this.year())
			}, Qn.weekYear = function(e) {
				return gt.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
			}, Qn.isoWeekYear = function(e) {
				return gt.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
			}, Qn.quarter = Qn.quarters = function(e) {
				return null == e ? a((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
			}, Qn.month = ie, Qn.daysInMonth = function() {
				return ae(this.year(), this.month())
			}, Qn.week = Qn.weeks = function(e) {
				var t = this.localeData().week(this);
				return null == e ? t : this.add(7 * (e - t), "d")
			}, Qn.isoWeek = Qn.isoWeeks = function(e) {
				var t = fe(this, 1, 4).week;
				return null == e ? t : this.add(7 * (e - t), "d")
			}, Qn.weeksInYear = function() {
				var e = this.localeData()._week;
				return me(this.year(), e.dow, e.doy)
			}, Qn.isoWeeksInYear = function() {
				return me(this.year(), 1, 4)
			}, Qn.date = Zn, Qn.day = Qn.days = function(e) {
				if(!this.isValid()) return null == e ? NaN : this;
				var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
				return null == e ? t : (e = he(e, this.localeData()), this.add(e - t, "d"))
			}, Qn.weekday = function(e) {
				if(!this.isValid()) return null == e ? NaN : this;
				var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
				return null == e ? t : this.add(e - t, "d")
			}, Qn.isoWeekday = function(e) {
				if(!this.isValid()) return null == e ? NaN : this;
				if(null != e) {
					var t = _e(e, this.localeData());
					return this.day(this.day() % 7 ? t : t - 7)
				}
				return this.day() || 7
			}, Qn.dayOfYear = function(e) {
				var t = r((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
				return null == e ? t : this.add(e - t, "d")
			}, Qn.hour = Qn.hours = Cn, Qn.minute = Qn.minutes = Kn, Qn.second = Qn.seconds = Xn, Qn.millisecond = Qn.milliseconds = $n, Qn.utcOffset = function(e, t, r) {
				var a = this._offset || 0,
					s;
				if(!this.isValid()) return null == e ? NaN : this;
				if(null != e) {
					if("string" != typeof e) 16 > o(e) && !r && (e *= 60);
					else if(e = rt(ln, e), null === e) return this;
					return !this._isUTC && t && (s = ot(this)), this._offset = e, this._isUTC = !0, null != s && this.add(s, "m"), a !== e && (!t || this._changeInProgress ? pt(this, it(e - a, "m"), 1, !1) : !this._changeInProgress && (this._changeInProgress = !0, n.updateOffset(this, !0), this._changeInProgress = null)), this
				}
				return this._isUTC ? a : ot(this)
			}, Qn.utc = function(e) {
				return this.utcOffset(0, e)
			}, Qn.local = function(e) {
				return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(ot(this), "m")), this
			}, Qn.parseZone = function() {
				if(null != this._tzm) this.utcOffset(this._tzm, !1, !0);
				else if("string" == typeof this._i) {
					var e = rt(dn, this._i);
					null == e ? this.utcOffset(0, !0) : this.utcOffset(e)
				}
				return this
			}, Qn.hasAlignedHourOffset = function(e) {
				return !!this.isValid() && (e = e ? Xe(e).utcOffset() : 0, 0 == (this.utcOffset() - e) % 60)
			}, Qn.isDST = function() {
				return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
			}, Qn.isLocal = function() {
				return !!this.isValid() && !this._isUTC
			}, Qn.isUtcOffset = function() {
				return !!this.isValid() && this._isUTC
			}, Qn.isUtc = st, Qn.isUTC = st, Qn.zoneAbbr = function() {
				return this._isUTC ? "UTC" : ""
			}, Qn.zoneName = function() {
				return this._isUTC ? "Coordinated Universal Time" : ""
			}, Qn.dates = L("dates accessor is deprecated. Use date instead.", Zn), Qn.months = L("months accessor is deprecated. Use month instead", ie), Qn.years = L("years accessor is deprecated. Use year instead", kn), Qn.zone = L("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(e, t) {
				return null == e ? -this.utcOffset() : ("string" != typeof e && (e = -e), this.utcOffset(e, t), this)
			}), Qn.isDSTShifted = L("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
				if(!p(this._isDSTShifted)) return this._isDSTShifted;
				var e = {};
				if(x(e, this), e = Ve(e), e._a) {
					var t = e._isUTC ? g(e._a) : Xe(e._a);
					this._isDSTShifted = this.isValid() && 0 < T(e._a, t.toArray())
				} else this._isDSTShifted = !1;
				return this._isDSTShifted
			});
			var er = O.prototype;
			er.calendar = function(e, t, n) {
				var r = this._calendar[e] || this._calendar.sameElse;
				return B(r) ? r.call(t, n) : r
			}, er.longDateFormat = function(e) {
				var t = this._longDateFormat[e],
					n = this._longDateFormat[e.toUpperCase()];
				return t || !n ? t : (this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function(e) {
					return e.slice(1)
				}), this._longDateFormat[e])
			}, er.invalidDate = function() {
				return this._invalidDate
			}, er.ordinal = function(e) {
				return this._ordinal.replace("%d", e)
			}, er.preparse = kt, er.postformat = kt, er.relativeTime = function(e, t, n, r) {
				var a = this._relativeTime[n];
				return B(a) ? a(e, t, n, r) : a.replace(/%d/i, e)
			}, er.pastFuture = function(e, t) {
				var n = this._relativeTime[0 < e ? "future" : "past"];
				return B(n) ? n(t) : n.replace(/%s/i, t)
			}, er.set = function(e) {
				var t, n;
				for(n in e) t = e[n], B(t) ? this[n] = t : this["_" + n] = t;
				this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
			}, er.months = function(e, t) {
				return e ? l(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || xn).test(t) ? "format" : "standalone"][e.month()] : l(this._months) ? this._months : this._months.standalone
			}, er.monthsShort = function(e, t) {
				return e ? l(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[xn.test(t) ? "format" : "standalone"][e.month()] : l(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
			}, er.monthsParse = function(e, t, n) {
				var r, a, o;
				if(this._monthsParseExact) return oe.call(this, e, t, n);
				for(this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), r = 0; 12 > r; r++) {
					if(a = g([2e3, r]), n && !this._longMonthsParse[r] && (this._longMonthsParse[r] = new RegExp("^" + this.months(a, "").replace(".", "") + "$", "i"), this._shortMonthsParse[r] = new RegExp("^" + this.monthsShort(a, "").replace(".", "") + "$", "i")), n || this._monthsParse[r] || (o = "^" + this.months(a, "") + "|^" + this.monthsShort(a, ""), this._monthsParse[r] = new RegExp(o.replace(".", ""), "i")), n && "MMMM" === t && this._longMonthsParse[r].test(e)) return r;
					if(n && "MMM" === t && this._shortMonthsParse[r].test(e)) return r;
					if(!n && this._monthsParse[r].test(e)) return r
				}
			}, er.monthsRegex = function(e) {
				return this._monthsParseExact ? (h(this, "_monthsRegex") || de.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (h(this, "_monthsRegex") || (this._monthsRegex = un), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
			}, er.monthsShortRegex = function(e) {
				return this._monthsParseExact ? (h(this, "_monthsRegex") || de.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (h(this, "_monthsShortRegex") || (this._monthsShortRegex = un), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
			}, er.week = function(e) {
				return fe(e, this._week.dow, this._week.doy).week
			}, er.firstDayOfYear = function() {
				return this._week.doy
			}, er.firstDayOfWeek = function() {
				return this._week.dow
			}, er.weekdays = function(e, t) {
				return e ? l(this._weekdays) ? this._weekdays[e.day()] : this._weekdays[this._weekdays.isFormat.test(t) ? "format" : "standalone"][e.day()] : l(this._weekdays) ? this._weekdays : this._weekdays.standalone
			}, er.weekdaysMin = function(e) {
				return e ? this._weekdaysMin[e.day()] : this._weekdaysMin
			}, er.weekdaysShort = function(e) {
				return e ? this._weekdaysShort[e.day()] : this._weekdaysShort
			}, er.weekdaysParse = function(e, t, n) {
				var r, a, o;
				if(this._weekdaysParseExact) return ge.call(this, e, t, n);
				for(this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), r = 0; 7 > r; r++) {
					if(a = g([2e3, 1]).day(r), n && !this._fullWeekdaysParse[r] && (this._fullWeekdaysParse[r] = new RegExp("^" + this.weekdays(a, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[r] = new RegExp("^" + this.weekdaysShort(a, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[r] = new RegExp("^" + this.weekdaysMin(a, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[r] || (o = "^" + this.weekdays(a, "") + "|^" + this.weekdaysShort(a, "") + "|^" + this.weekdaysMin(a, ""), this._weekdaysParse[r] = new RegExp(o.replace(".", ""), "i")), n && "dddd" === t && this._fullWeekdaysParse[r].test(e)) return r;
					if(n && "ddd" === t && this._shortWeekdaysParse[r].test(e)) return r;
					if(n && "dd" === t && this._minWeekdaysParse[r].test(e)) return r;
					if(!n && this._weekdaysParse[r].test(e)) return r
				}
			}, er.weekdaysRegex = function(e) {
				return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || ye.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (h(this, "_weekdaysRegex") || (this._weekdaysRegex = un), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
			}, er.weekdaysShortRegex = function(e) {
				return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || ye.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (h(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = un), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
			}, er.weekdaysMinRegex = function(e) {
				return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || ye.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (h(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = un), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
			}, er.isPM = function(e) {
				return "p" === (e + "").toLowerCase().charAt(0)
			}, er.meridiem = function(e, t, n) {
				return 11 < e ? n ? "pm" : "PM" : n ? "am" : "AM"
			}, Ee("en", {
				dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
				ordinal: function(e) {
					var t = e % 10,
						n = 1 === C(e % 100 / 10) ? "th" : 1 == t ? "st" : 2 == t ? "nd" : 3 == t ? "rd" : "th";
					return e + n
				}
			}), n.lang = L("moment.lang is deprecated. Use moment.locale instead.", Ee), n.langData = L("moment.langData is deprecated. Use moment.localeData instead.", Te);
			var tr = o,
				nr = It("ms"),
				rr = It("s"),
				ar = It("m"),
				or = It("h"),
				sr = It("d"),
				ir = It("w"),
				dr = It("M"),
				lr = It("y"),
				cr = Lt("milliseconds"),
				ur = Lt("seconds"),
				pr = Lt("minutes"),
				fr = Lt("hours"),
				mr = Lt("days"),
				hr = Lt("months"),
				_r = Lt("years"),
				gr = r,
				yr = {
					ss: 44,
					s: 45,
					m: 45,
					h: 22,
					d: 26,
					M: 11
				},
				br = o,
				kr = Qe.prototype;
			return kr.isValid = function() {
					return this._isValid
				}, kr.abs = function() {
					var e = this._data;
					return this._milliseconds = tr(this._milliseconds), this._days = tr(this._days), this._months = tr(this._months), e.milliseconds = tr(e.milliseconds), e.seconds = tr(e.seconds), e.minutes = tr(e.minutes), e.hours = tr(e.hours), e.months = tr(e.months), e.years = tr(e.years), this
				}, kr.add = function(e, t) {
					return vt(this, e, t, 1)
				}, kr.subtract = function(e, t) {
					return vt(this, e, t, -1)
				}, kr.as = function(e) {
					if(!this.isValid()) return NaN;
					var t = this._milliseconds,
						n, a;
					if(e = M(e), "month" === e || "year" === e) return n = this._days + t / 864e5, a = this._months + Ct(n), "month" === e ? a : a / 12;
					switch(n = this._days + r(Tt(this._months)), e) {
						case "week":
							return n / 7 + t / 6048e5;
						case "day":
							return n + t / 864e5;
						case "hour":
							return 24 * n + t / 36e5;
						case "minute":
							return 1440 * n + t / 6e4;
						case "second":
							return 86400 * n + t / 1e3;
						case "millisecond":
							return s(864e5 * n) + t;
						default:
							throw new Error("Unknown unit " + e);
					}
				}, kr.asMilliseconds = nr, kr.asSeconds = rr, kr.asMinutes = ar, kr.asHours = or, kr.asDays = sr, kr.asWeeks = ir, kr.asMonths = dr, kr.asYears = lr, kr.valueOf = function() {
					return this.isValid() ? this._milliseconds + 864e5 * this._days + 2592e6 * (this._months % 12) + 31536e6 * C(this._months / 12) : NaN
				}, kr._bubble = function() {
					var e = this._milliseconds,
						t = this._days,
						n = this._months,
						r = this._data,
						a, o, s, i, d;
					return 0 <= e && 0 <= t && 0 <= n || 0 >= e && 0 >= t && 0 >= n || (e += 864e5 * Et(Tt(n) + t), t = 0, n = 0), r.milliseconds = e % 1e3, a = E(e / 1e3), r.seconds = a % 60, o = E(a / 60), r.minutes = o % 60, s = E(o / 60), r.hours = s % 24, t += E(s / 24), d = E(Ct(t)), n += d, t -= Et(Tt(d)), i = E(n / 12), n %= 12, r.days = t, r.months = n, r.years = i, this
				}, kr.clone = function() {
					return it(this)
				}, kr.get = function(e) {
					return e = M(e), this.isValid() ? this[e + "s"]() : NaN
				}, kr.milliseconds = cr, kr.seconds = ur, kr.minutes = pr, kr.hours = fr, kr.days = mr, kr.weeks = function() {
					return E(this.days() / 7)
				}, kr.months = hr, kr.years = _r, kr.humanize = function(e) {
					if(!this.isValid()) return this.localeData().invalidDate();
					var t = this.localeData(),
						n = Bt(this, !e, t);
					return e && (n = t.pastFuture(+this, n)), t.postformat(n)
				}, kr.toISOString = Dt, kr.toString = Dt, kr.toJSON = Dt, kr.locale = mt, kr.localeData = ht, kr.toIsoString = L("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Dt), kr.lang = Vn, z("X", 0, 0, "unix"), z("x", 0, 0, "valueOf"), Y("x", sn), Y("X", cn), K("X", function(e, t, n) {
					n._d = new Date(1e3 * parseFloat(e, 10))
				}), K("x", function(e, t, n) {
					n._d = new Date(C(e))
				}), n.version = "2.22.2",
				function(e) {
					Mt = e
				}(Xe), n.fn = Qn, n.min = function() {
					var e = [].slice.call(arguments, 0);
					return Je("isBefore", e)
				}, n.max = function() {
					var e = [].slice.call(arguments, 0);
					return Je("isAfter", e)
				}, n.now = function() {
					return Date.now ? Date.now() : +new Date
				}, n.utc = g, n.unix = function(e) {
					return Xe(1e3 * e)
				}, n.months = function(e, t) {
					return xt(e, t, "months")
				}, n.isDate = f, n.locale = Ee, n.invalid = w, n.duration = it, n.isMoment = v, n.weekdays = function(e, t, n) {
					return St(e, t, n, "weekdays")
				}, n.parseZone = function() {
					return Xe.apply(null, arguments).parseZone()
				}, n.localeData = Te, n.isDuration = et, n.monthsShort = function(e, t) {
					return xt(e, t, "monthsShort")
				}, n.weekdaysMin = function(e, t, n) {
					return St(e, t, n, "weekdaysMin")
				}, n.defineLocale = Ce, n.updateLocale = function(e, t) {
					if(null != t) {
						var n = Tn,
							r, a;
						a = ve(e), null != a && (n = a._config), t = A(n, t), r = new O(t), r.parentLocale = In[e], In[e] = r, Ee(e)
					} else null != In[e] && (null == In[e].parentLocale ? null != In[e] && delete In[e] : In[e] = In[e].parentLocale);
					return In[e]
				}, n.locales = Ie, n.weekdaysShort = function(e, t, n) {
					return St(e, t, n, "weekdaysShort")
				}, n.normalizeUnits = M, n.relativeTimeRounding = At, n.relativeTimeThreshold = function(e, t) {
					return void 0 !== yr[e] && (void 0 === t ? yr[e] : (yr[e] = t, "s" === e && (yr.ss = t - 1), !0))
				}, n.calendarFormat = function(e, t) {
					var n = e.diff(t, "days", !0);
					return -6 > n ? "sameElse" : -1 > n ? "lastWeek" : 0 > n ? "lastDay" : 1 > n ? "sameDay" : 2 > n ? "nextDay" : 7 > n ? "nextWeek" : "sameElse"
				}, n.prototype = Qn, n.HTML5_FMT = {
					DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
					DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
					DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
					DATE: "YYYY-MM-DD",
					TIME: "HH:mm",
					TIME_SECONDS: "HH:mm:ss",
					TIME_MS: "HH:mm:ss.SSS",
					WEEK: "YYYY-[W]WW",
					MONTH: "YYYY-MM"
				}, n
		})
	}, {}],
	155: [function(e, t, n) {
		function r(e, t, n) {
			for(var r = t; r < n; r++) e[r] = 0
		}

		function a(e, t, n) {
			t.writeUInt32BE(_((e.getTime() + 2082844800000) / 1e3), n)
		}

		function o(e, t, n) {
			t.writeUIntBE(_((e.getTime() + 2082844800000) / 1e3), n, 6)
		}

		function s(e, t, n) {
			t.writeUInt16BE(_(e) % 65536, n), t.writeUInt16BE(_(256 * (256 * e)) % 65536, n + 2)
		}

		function i(e, t, n) {
			t[n] = _(e) % 256, t[n + 1] = _(256 * e) % 256
		}

		function d(e, t, n) {
			e || (e = [0, 0, 0, 0, 0, 0, 0, 0, 0]);
			for(var r = 0; r < e.length; r++) s(e[r], t, n + 4 * r)
		}

		function l(e, t, n) {
			var r = w(e, "utf8");
			r.copy(t, n), t[n + r.length] = 0
		}

		function c(e) {
			for(var t = Array(e.length / 4), n = 0; n < t.length; n++) t[n] = f(e, 4 * n);
			return t
		}

		function u(e, t) {
			return new Date(1e3 * e.readUIntBE(t, 6) - 2082844800000)
		}

		function p(e, t) {
			return new Date(1e3 * e.readUInt32BE(t) - 2082844800000)
		}

		function f(e, t) {
			return e.readUInt16BE(t) + e.readUInt16BE(t + 2) / 65536
		}

		function m(e, t) {
			return e[t] + e[t + 1] / 256
		}

		function h(e, t, n) {
			var r;
			for(r = 0; r < n && !(0 === e[t + r]); r++);
			return e.toString("utf8", t, t + r)
		}
		var _ = Math.floor,
			g = Math.min,
			y = e("./index"),
			b = e("./descriptor"),
			k = e("buffer-alloc"),
			w = e("buffer-from"),
			x = e("uint64be");
		n.fullBoxes = {};
		["mvhd", "tkhd", "mdhd", "vmhd", "smhd", "stsd", "esds", "stsz", "stco", "co64", "stss", "stts", "ctts", "stsc", "dref", "elst", "hdlr", "mehd", "trex", "mfhd", "tfhd", "tfdt", "trun"].forEach(function(e) {
			n.fullBoxes[e] = !0
		}), n.ftyp = {}, n.ftyp.encode = function(e, t, r) {
			t = t ? t.slice(r) : k(n.ftyp.encodingLength(e));
			var a = e.compatibleBrands || [];
			t.write(e.brand, 0, 4, "ascii"), t.writeUInt32BE(e.brandVersion, 4);
			for(var o = 0; o < a.length; o++) t.write(a[o], 8 + 4 * o, 4, "ascii");
			return n.ftyp.encode.bytes = 8 + 4 * a.length, t
		}, n.ftyp.decode = function(e, t) {
			e = e.slice(t);
			for(var n = e.toString("ascii", 0, 4), r = e.readUInt32BE(4), a = [], o = 8; o < e.length; o += 4) a.push(e.toString("ascii", o, o + 4));
			return {
				brand: n,
				brandVersion: r,
				compatibleBrands: a
			}
		}, n.ftyp.encodingLength = function(e) {
			return 8 + 4 * (e.compatibleBrands || []).length
		}, n.mvhd = {}, n.mvhd.encode = function(e, t, o) {
			return t = t ? t.slice(o) : k(96), a(e.ctime || new Date, t, 0), a(e.mtime || new Date, t, 4), t.writeUInt32BE(e.timeScale || 0, 8), t.writeUInt32BE(e.duration || 0, 12), s(e.preferredRate || 0, t, 16), i(e.preferredVolume || 0, t, 20), r(t, 22, 32), d(e.matrix, t, 32), t.writeUInt32BE(e.previewTime || 0, 68), t.writeUInt32BE(e.previewDuration || 0, 72), t.writeUInt32BE(e.posterTime || 0, 76), t.writeUInt32BE(e.selectionTime || 0, 80), t.writeUInt32BE(e.selectionDuration || 0, 84), t.writeUInt32BE(e.currentTime || 0, 88), t.writeUInt32BE(e.nextTrackId || 0, 92), n.mvhd.encode.bytes = 96, t
		}, n.mvhd.decode = function(e, t) {
			return e = e.slice(t), {
				ctime: p(e, 0),
				mtime: p(e, 4),
				timeScale: e.readUInt32BE(8),
				duration: e.readUInt32BE(12),
				preferredRate: f(e, 16),
				preferredVolume: m(e, 20),
				matrix: c(e.slice(32, 68)),
				previewTime: e.readUInt32BE(68),
				previewDuration: e.readUInt32BE(72),
				posterTime: e.readUInt32BE(76),
				selectionTime: e.readUInt32BE(80),
				selectionDuration: e.readUInt32BE(84),
				currentTime: e.readUInt32BE(88),
				nextTrackId: e.readUInt32BE(92)
			}
		}, n.mvhd.encodingLength = function() {
			return 96
		}, n.tkhd = {}, n.tkhd.encode = function(e, t, o) {
			return t = t ? t.slice(o) : k(80), a(e.ctime || new Date, t, 0), a(e.mtime || new Date, t, 4), t.writeUInt32BE(e.trackId || 0, 8), r(t, 12, 16), t.writeUInt32BE(e.duration || 0, 16), r(t, 20, 28), t.writeUInt16BE(e.layer || 0, 28), t.writeUInt16BE(e.alternateGroup || 0, 30), t.writeUInt16BE(e.volume || 0, 32), d(e.matrix, t, 36), t.writeUInt32BE(e.trackWidth || 0, 72), t.writeUInt32BE(e.trackHeight || 0, 76), n.tkhd.encode.bytes = 80, t
		}, n.tkhd.decode = function(e, t) {
			return e = e.slice(t), {
				ctime: p(e, 0),
				mtime: p(e, 4),
				trackId: e.readUInt32BE(8),
				duration: e.readUInt32BE(16),
				layer: e.readUInt16BE(28),
				alternateGroup: e.readUInt16BE(30),
				volume: e.readUInt16BE(32),
				matrix: c(e.slice(36, 72)),
				trackWidth: e.readUInt32BE(72),
				trackHeight: e.readUInt32BE(76)
			}
		}, n.tkhd.encodingLength = function() {
			return 80
		}, n.mdhd = {}, n.mdhd.encode = function(e, t, r) {
			return 1 === e.version ? (t = t ? t.slice(r) : k(32), o(e.ctime || new Date, t, 0), o(e.mtime || new Date, t, 8), t.writeUInt32BE(e.timeScale || 0, 16), t.writeUIntBE(e.duration || 0, 20, 6), t.writeUInt16BE(e.language || 0, 28), t.writeUInt16BE(e.quality || 0, 30), n.mdhd.encode.bytes = 32, t) : (t = t ? t.slice(r) : k(20), a(e.ctime || new Date, t, 0), a(e.mtime || new Date, t, 4), t.writeUInt32BE(e.timeScale || 0, 8), t.writeUInt32BE(e.duration || 0, 12), t.writeUInt16BE(e.language || 0, 16), t.writeUInt16BE(e.quality || 0, 18), n.mdhd.encode.bytes = 20, t)
		}, n.mdhd.decode = function(e, t, n) {
			e = e.slice(t);
			return 20 != n - t ? {
				ctime: u(e, 0),
				mtime: u(e, 8),
				timeScale: e.readUInt32BE(16),
				duration: e.readUIntBE(20, 6),
				language: e.readUInt16BE(28),
				quality: e.readUInt16BE(30)
			} : {
				ctime: p(e, 0),
				mtime: p(e, 4),
				timeScale: e.readUInt32BE(8),
				duration: e.readUInt32BE(12),
				language: e.readUInt16BE(16),
				quality: e.readUInt16BE(18)
			}
		}, n.mdhd.encodingLength = function(e) {
			return 1 === e.version ? 32 : 20
		}, n.vmhd = {}, n.vmhd.encode = function(e, t, r) {
			t = t ? t.slice(r) : k(8), t.writeUInt16BE(e.graphicsMode || 0, 0);
			var a = e.opcolor || [0, 0, 0];
			return t.writeUInt16BE(a[0], 2), t.writeUInt16BE(a[1], 4), t.writeUInt16BE(a[2], 6), n.vmhd.encode.bytes = 8, t
		}, n.vmhd.decode = function(e, t) {
			return e = e.slice(t), {
				graphicsMode: e.readUInt16BE(0),
				opcolor: [e.readUInt16BE(2), e.readUInt16BE(4), e.readUInt16BE(6)]
			}
		}, n.vmhd.encodingLength = function() {
			return 8
		}, n.smhd = {}, n.smhd.encode = function(e, t, a) {
			return t = t ? t.slice(a) : k(4), t.writeUInt16BE(e.balance || 0, 0), r(t, 2, 4), n.smhd.encode.bytes = 4, t
		}, n.smhd.decode = function(e, t) {
			return e = e.slice(t), {
				balance: e.readUInt16BE(0)
			}
		}, n.smhd.encodingLength = function() {
			return 4
		}, n.stsd = {}, n.stsd.encode = function(e, t, r) {
			t = t ? t.slice(r) : k(n.stsd.encodingLength(e));
			var a = e.entries || [];
			t.writeUInt32BE(a.length, 0);
			for(var o = 4, s = 0, d; s < a.length; s++) d = a[s], y.encode(d, t, o), o += y.encode.bytes;
			return n.stsd.encode.bytes = o, t
		}, n.stsd.decode = function(e, t, n) {
			e = e.slice(t);
			for(var r = e.readUInt32BE(0), a = Array(r), o = 4, s = 0, d; s < r; s++) d = y.decode(e, o, n), a[s] = d, o += d.length;
			return {
				entries: a
			}
		}, n.stsd.encodingLength = function(e) {
			var t = 4;
			if(!e.entries) return t;
			for(var n = 0; n < e.entries.length; n++) t += y.encodingLength(e.entries[n]);
			return t
		}, n.avc1 = n.VisualSampleEntry = {}, n.VisualSampleEntry.encode = function(e, t, a) {
			t = t ? t.slice(a) : k(n.VisualSampleEntry.encodingLength(e)), r(t, 0, 6), t.writeUInt16BE(e.dataReferenceIndex || 0, 6), r(t, 8, 24), t.writeUInt16BE(e.width || 0, 24), t.writeUInt16BE(e.height || 0, 26), t.writeUInt32BE(e.hResolution || 4718592, 28), t.writeUInt32BE(e.vResolution || 4718592, 32), r(t, 36, 40), t.writeUInt16BE(e.frameCount || 1, 40);
			var o = e.compressorName || "",
				s = g(o.length, 31);
			t.writeUInt8(s, 42), t.write(o, 43, s, "utf8"), t.writeUInt16BE(e.depth || 24, 74), t.writeInt16BE(-1, 76);
			var i = 78,
				d = e.children || [];
			d.forEach(function(e) {
				y.encode(e, t, i), i += y.encode.bytes
			}), n.VisualSampleEntry.encode.bytes = i
		}, n.VisualSampleEntry.decode = function(e, t, n) {
			e = e.slice(t);
			for(var r = n - t, a = g(e.readUInt8(42), 31), o = {
					dataReferenceIndex: e.readUInt16BE(6),
					width: e.readUInt16BE(24),
					height: e.readUInt16BE(26),
					hResolution: e.readUInt32BE(28),
					vResolution: e.readUInt32BE(32),
					frameCount: e.readUInt16BE(40),
					compressorName: e.toString("utf8", 43, 43 + a),
					depth: e.readUInt16BE(74),
					children: []
				}, s = 78; 8 <= r - s;) {
				var i = y.decode(e, s, r);
				o.children.push(i), o[i.type] = i, s += i.length
			}
			return o
		}, n.VisualSampleEntry.encodingLength = function(e) {
			var t = 78,
				n = e.children || [];
			return n.forEach(function(e) {
				t += y.encodingLength(e)
			}), t
		}, n.avcC = {}, n.avcC.encode = function(e, t, r) {
			t = t ? t.slice(r) : k(e.buffer.length), e.buffer.copy(t), n.avcC.encode.bytes = e.buffer.length
		}, n.avcC.decode = function(e, t, n) {
			return e = e.slice(t, n), {
				mimeCodec: e.toString("hex", 1, 4),
				buffer: w(e)
			}
		}, n.avcC.encodingLength = function(e) {
			return e.buffer.length
		}, n.mp4a = n.AudioSampleEntry = {}, n.AudioSampleEntry.encode = function(e, t, a) {
			t = t ? t.slice(a) : k(n.AudioSampleEntry.encodingLength(e)), r(t, 0, 6), t.writeUInt16BE(e.dataReferenceIndex || 0, 6), r(t, 8, 16), t.writeUInt16BE(e.channelCount || 2, 16), t.writeUInt16BE(e.sampleSize || 16, 18), r(t, 20, 24), t.writeUInt32BE(e.sampleRate || 0, 24);
			var o = 28,
				s = e.children || [];
			s.forEach(function(e) {
				y.encode(e, t, o), o += y.encode.bytes
			}), n.AudioSampleEntry.encode.bytes = o
		}, n.AudioSampleEntry.decode = function(e, t, n) {
			e = e.slice(t, n);
			for(var r = n - t, a = {
					dataReferenceIndex: e.readUInt16BE(6),
					channelCount: e.readUInt16BE(16),
					sampleSize: e.readUInt16BE(18),
					sampleRate: e.readUInt32BE(24),
					children: []
				}, o = 28; 8 <= r - o;) {
				var s = y.decode(e, o, r);
				a.children.push(s), a[s.type] = s, o += s.length
			}
			return a
		}, n.AudioSampleEntry.encodingLength = function(e) {
			var t = 28,
				n = e.children || [];
			return n.forEach(function(e) {
				t += y.encodingLength(e)
			}), t
		}, n.esds = {}, n.esds.encode = function(e, t, r) {
			t = t ? t.slice(r) : k(e.buffer.length), e.buffer.copy(t, 0), n.esds.encode.bytes = e.buffer.length
		}, n.esds.decode = function(e, t, n) {
			e = e.slice(t, n);
			var r = b.Descriptor.decode(e, 0, e.length),
				a = "ESDescriptor" === r.tagName ? r : {},
				o = a.DecoderConfigDescriptor || {},
				s = o.oti || 0,
				i = o.DecoderSpecificInfo,
				d = i ? (248 & i.buffer.readUInt8(0)) >> 3 : 0,
				l = null;
			return s && (l = s.toString(16), d && (l += "." + d)), {
				mimeCodec: l,
				buffer: w(e.slice(0))
			}
		}, n.esds.encodingLength = function(e) {
			return e.buffer.length
		}, n.stsz = {}, n.stsz.encode = function(e, t, r) {
			var a = e.entries || [];
			t = t ? t.slice(r) : k(n.stsz.encodingLength(e)), t.writeUInt32BE(0, 0), t.writeUInt32BE(a.length, 4);
			for(var o = 0; o < a.length; o++) t.writeUInt32BE(a[o], 4 * o + 8);
			return n.stsz.encode.bytes = 8 + 4 * a.length, t
		}, n.stsz.decode = function(e, t) {
			e = e.slice(t);
			for(var n = e.readUInt32BE(0), r = e.readUInt32BE(4), a = Array(r), o = 0; o < r; o++) a[o] = 0 === n ? e.readUInt32BE(4 * o + 8) : n;
			return {
				entries: a
			}
		}, n.stsz.encodingLength = function(e) {
			return 8 + 4 * e.entries.length
		}, n.stss = n.stco = {}, n.stco.encode = function(e, t, r) {
			var a = e.entries || [];
			t = t ? t.slice(r) : k(n.stco.encodingLength(e)), t.writeUInt32BE(a.length, 0);
			for(var o = 0; o < a.length; o++) t.writeUInt32BE(a[o], 4 * o + 4);
			return n.stco.encode.bytes = 4 + 4 * a.length, t
		}, n.stco.decode = function(e, t) {
			e = e.slice(t);
			for(var n = e.readUInt32BE(0), r = Array(n), a = 0; a < n; a++) r[a] = e.readUInt32BE(4 * a + 4);
			return {
				entries: r
			}
		}, n.stco.encodingLength = function(e) {
			return 4 + 4 * e.entries.length
		}, n.co64 = {}, n.co64.encode = function(e, t, r) {
			var a = e.entries || [];
			t = t ? t.slice(r) : k(n.co64.encodingLength(e)), t.writeUInt32BE(a.length, 0);
			for(var o = 0; o < a.length; o++) x.encode(a[o], t, 8 * o + 4);
			return n.co64.encode.bytes = 4 + 8 * a.length, t
		}, n.co64.decode = function(e, t) {
			e = e.slice(t);
			for(var n = e.readUInt32BE(0), r = Array(n), a = 0; a < n; a++) r[a] = x.decode(e, 8 * a + 4);
			return {
				entries: r
			}
		}, n.co64.encodingLength = function(e) {
			return 4 + 8 * e.entries.length
		}, n.stts = {}, n.stts.encode = function(e, t, r) {
			var a = e.entries || [];
			t = t ? t.slice(r) : k(n.stts.encodingLength(e)), t.writeUInt32BE(a.length, 0);
			for(var o = 0, s; o < a.length; o++) s = 8 * o + 4, t.writeUInt32BE(a[o].count || 0, s), t.writeUInt32BE(a[o].duration || 0, s + 4);
			return n.stts.encode.bytes = 4 + 8 * e.entries.length, t
		}, n.stts.decode = function(e, t) {
			e = e.slice(t);
			for(var n = e.readUInt32BE(0), r = Array(n), a = 0, o; a < n; a++) o = 8 * a + 4, r[a] = {
				count: e.readUInt32BE(o),
				duration: e.readUInt32BE(o + 4)
			};
			return {
				entries: r
			}
		}, n.stts.encodingLength = function(e) {
			return 4 + 8 * e.entries.length
		}, n.ctts = {}, n.ctts.encode = function(e, t, r) {
			var a = e.entries || [];
			t = t ? t.slice(r) : k(n.ctts.encodingLength(e)), t.writeUInt32BE(a.length, 0);
			for(var o = 0, s; o < a.length; o++) s = 8 * o + 4, t.writeUInt32BE(a[o].count || 0, s), t.writeUInt32BE(a[o].compositionOffset || 0, s + 4);
			return n.ctts.encode.bytes = 4 + 8 * a.length, t
		}, n.ctts.decode = function(e, t) {
			e = e.slice(t);
			for(var n = e.readUInt32BE(0), r = Array(n), a = 0, o; a < n; a++) o = 8 * a + 4, r[a] = {
				count: e.readUInt32BE(o),
				compositionOffset: e.readInt32BE(o + 4)
			};
			return {
				entries: r
			}
		}, n.ctts.encodingLength = function(e) {
			return 4 + 8 * e.entries.length
		}, n.stsc = {}, n.stsc.encode = function(e, t, r) {
			var a = e.entries || [];
			t = t ? t.slice(r) : k(n.stsc.encodingLength(e)), t.writeUInt32BE(a.length, 0);
			for(var o = 0, s; o < a.length; o++) s = 12 * o + 4, t.writeUInt32BE(a[o].firstChunk || 0, s), t.writeUInt32BE(a[o].samplesPerChunk || 0, s + 4), t.writeUInt32BE(a[o].sampleDescriptionId || 0, s + 8);
			return n.stsc.encode.bytes = 4 + 12 * a.length, t
		}, n.stsc.decode = function(e, t) {
			e = e.slice(t);
			for(var n = e.readUInt32BE(0), r = Array(n), a = 0, o; a < n; a++) o = 12 * a + 4, r[a] = {
				firstChunk: e.readUInt32BE(o),
				samplesPerChunk: e.readUInt32BE(o + 4),
				sampleDescriptionId: e.readUInt32BE(o + 8)
			};
			return {
				entries: r
			}
		}, n.stsc.encodingLength = function(e) {
			return 4 + 12 * e.entries.length
		}, n.dref = {}, n.dref.encode = function(e, t, r) {
			t = t ? t.slice(r) : k(n.dref.encodingLength(e));
			var a = e.entries || [];
			t.writeUInt32BE(a.length, 0);
			for(var o = 4, s = 0; s < a.length; s++) {
				var d = a[s],
					l = (d.buf ? d.buf.length : 0) + 4 + 4;
				t.writeUInt32BE(l, o), o += 4, t.write(d.type, o, 4, "ascii"), o += 4, d.buf && (d.buf.copy(t, o), o += d.buf.length)
			}
			return n.dref.encode.bytes = o, t
		}, n.dref.decode = function(e, t) {
			e = e.slice(t);
			for(var n = e.readUInt32BE(0), r = Array(n), a = 4, o = 0; o < n; o++) {
				var s = e.readUInt32BE(a),
					d = e.toString("ascii", a + 4, a + 8),
					l = e.slice(a + 8, a + s);
				a += s, r[o] = {
					type: d,
					buf: l
				}
			}
			return {
				entries: r
			}
		}, n.dref.encodingLength = function(e) {
			var t = 4;
			if(!e.entries) return t;
			for(var n = 0, r; n < e.entries.length; n++) r = e.entries[n].buf, t += (r ? r.length : 0) + 4 + 4;
			return t
		}, n.elst = {}, n.elst.encode = function(e, t, r) {
			var a = e.entries || [];
			t = t ? t.slice(r) : k(n.elst.encodingLength(e)), t.writeUInt32BE(a.length, 0);
			for(var o = 0, d; o < a.length; o++) d = 12 * o + 4, t.writeUInt32BE(a[o].trackDuration || 0, d), t.writeUInt32BE(a[o].mediaTime || 0, d + 4), s(a[o].mediaRate || 0, t, d + 8);
			return n.elst.encode.bytes = 4 + 12 * a.length, t
		}, n.elst.decode = function(e, t) {
			e = e.slice(t);
			for(var n = e.readUInt32BE(0), r = Array(n), a = 0, o; a < n; a++) o = 12 * a + 4, r[a] = {
				trackDuration: e.readUInt32BE(o),
				mediaTime: e.readInt32BE(o + 4),
				mediaRate: f(e, o + 8)
			};
			return {
				entries: r
			}
		}, n.elst.encodingLength = function(e) {
			return 4 + 12 * e.entries.length
		}, n.hdlr = {}, n.hdlr.encode = function(e, t, r) {
			t = t ? t.slice(r) : k(n.hdlr.encodingLength(e));
			var a = 21 + (e.name || "").length;
			return t.fill(0, 0, a), t.write(e.handlerType || "", 4, 4, "ascii"), l(e.name || "", t, 20), n.hdlr.encode.bytes = a, t
		}, n.hdlr.decode = function(e, t, n) {
			return e = e.slice(t), {
				handlerType: e.toString("ascii", 4, 8),
				name: h(e, 20, n)
			}
		}, n.hdlr.encodingLength = function(e) {
			return 21 + (e.name || "").length
		}, n.mehd = {}, n.mehd.encode = function(e, t, r) {
			return t = t ? t.slice(r) : k(4), t.writeUInt32BE(e.fragmentDuration || 0, 0), n.mehd.encode.bytes = 4, t
		}, n.mehd.decode = function(e, t) {
			return e = e.slice(t), {
				fragmentDuration: e.readUInt32BE(0)
			}
		}, n.mehd.encodingLength = function() {
			return 4
		}, n.trex = {}, n.trex.encode = function(e, t, r) {
			return t = t ? t.slice(r) : k(20), t.writeUInt32BE(e.trackId || 0, 0), t.writeUInt32BE(e.defaultSampleDescriptionIndex || 0, 4), t.writeUInt32BE(e.defaultSampleDuration || 0, 8), t.writeUInt32BE(e.defaultSampleSize || 0, 12), t.writeUInt32BE(e.defaultSampleFlags || 0, 16), n.trex.encode.bytes = 20, t
		}, n.trex.decode = function(e, t) {
			return e = e.slice(t), {
				trackId: e.readUInt32BE(0),
				defaultSampleDescriptionIndex: e.readUInt32BE(4),
				defaultSampleDuration: e.readUInt32BE(8),
				defaultSampleSize: e.readUInt32BE(12),
				defaultSampleFlags: e.readUInt32BE(16)
			}
		}, n.trex.encodingLength = function() {
			return 20
		}, n.mfhd = {}, n.mfhd.encode = function(e, t, r) {
			return t = t ? t.slice(r) : k(4), t.writeUInt32BE(e.sequenceNumber || 0, 0), n.mfhd.encode.bytes = 4, t
		}, n.mfhd.decode = function(e) {
			return {
				sequenceNumber: e.readUInt32BE(0)
			}
		}, n.mfhd.encodingLength = function() {
			return 4
		}, n.tfhd = {}, n.tfhd.encode = function(e, t, r) {
			return t = t ? t.slice(r) : k(4), t.writeUInt32BE(e.trackId, 0), n.tfhd.encode.bytes = 4, t
		}, n.tfhd.decode = function() {}, n.tfhd.encodingLength = function() {
			return 4
		}, n.tfdt = {}, n.tfdt.encode = function(e, t, r) {
			return t = t ? t.slice(r) : k(4), t.writeUInt32BE(e.baseMediaDecodeTime || 0, 0), n.tfdt.encode.bytes = 4, t
		}, n.tfdt.decode = function() {}, n.tfdt.encodingLength = function() {
			return 4
		}, n.trun = {}, n.trun.encode = function(e, t, r) {
			t = t ? t.slice(r) : k(8 + 16 * e.entries.length), t.writeUInt32BE(e.entries.length, 0), t.writeInt32BE(e.dataOffset, 4);
			for(var a = 8, o = 0, s; o < e.entries.length; o++) s = e.entries[o], t.writeUInt32BE(s.sampleDuration, a), a += 4, t.writeUInt32BE(s.sampleSize, a), a += 4, t.writeUInt32BE(s.sampleFlags, a), a += 4, 0 === (e.version || 0) ? t.writeUInt32BE(s.sampleCompositionTimeOffset, a) : t.writeInt32BE(s.sampleCompositionTimeOffset, a), a += 4;
			n.trun.encode.bytes = a
		}, n.trun.decode = function() {}, n.trun.encodingLength = function(e) {
			return 8 + 16 * e.entries.length
		}, n.mdat = {}, n.mdat.encode = function(e, t, r) {
			e.buffer ? (e.buffer.copy(t, r), n.mdat.encode.bytes = e.buffer.length) : n.mdat.encode.bytes = n.mdat.encodingLength(e)
		}, n.mdat.decode = function(e, t, n) {
			return {
				buffer: w(e.slice(t, n))
			}
		}, n.mdat.encodingLength = function(e) {
			return e.buffer ? e.buffer.length : e.contentLength
		}
	}, {
		"./descriptor": 156,
		"./index": 157,
		"buffer-alloc": 38,
		"buffer-from": 40,
		uint64be: 306
	}],
	156: [function(e, t, n) {
		var r = e("buffer-from"),
			a = {
				3: "ESDescriptor",
				4: "DecoderConfigDescriptor",
				5: "DecoderSpecificInfo",
				6: "SLConfigDescriptor"
			};
		n.Descriptor = {}, n.Descriptor.decode = function(e, t, o) {
			var s = e.readUInt8(t),
				i = t + 1,
				d = 0,
				l;
			do l = e.readUInt8(i++), d = d << 7 | 127 & l; while (128 & l);
			var c = a[s],
				u;
			return u = n[c] ? n[c].decode(e, i, o) : {
				buffer: r(e.slice(i, i + d))
			}, u.tag = s, u.tagName = c, u.length = i - t + d, u.contentsLen = d, u
		}, n.DescriptorArray = {}, n.DescriptorArray.decode = function(e, t, r) {
			for(var o = t, s = {}; o + 2 <= r;) {
				var i = n.Descriptor.decode(e, o, r);
				o += i.length;
				var d = a[i.tag] || "Descriptor" + i.tag;
				s[d] = i
			}
			return s
		}, n.ESDescriptor = {}, n.ESDescriptor.decode = function(e, t, r) {
			var a = e.readUInt8(t + 2),
				o = t + 3;
			if(128 & a && (o += 2), 64 & a) {
				var s = e.readUInt8(o);
				o += s + 1
			}
			return 32 & a && (o += 2), n.DescriptorArray.decode(e, o, r)
		}, n.DecoderConfigDescriptor = {}, n.DecoderConfigDescriptor.decode = function(e, t, r) {
			var a = e.readUInt8(t),
				o = n.DescriptorArray.decode(e, t + 13, r);
			return o.oti = a, o
		}
	}, {
		"buffer-from": 40
	}],
	157: [function(e, t, n) {
		var r = e("uint64be"),
			a = e("buffer-alloc"),
			o = e("buffer-from"),
			s = e("./boxes"),
			i = 4294967295,
			d = n,
			l = n.containers = {
				moov: ["mvhd", "meta", "traks", "mvex"],
				trak: ["tkhd", "tref", "trgr", "edts", "meta", "mdia", "udta"],
				edts: ["elst"],
				mdia: ["mdhd", "hdlr", "elng", "minf"],
				minf: ["vmhd", "smhd", "hmhd", "sthd", "nmhd", "dinf", "stbl"],
				dinf: ["dref"],
				stbl: ["stsd", "stts", "ctts", "cslg", "stsc", "stsz", "stz2", "stco", "co64", "stss", "stsh", "padb", "stdp", "sdtp", "sbgps", "sgpds", "subss", "saizs", "saios"],
				mvex: ["mehd", "trexs", "leva"],
				moof: ["mfhd", "meta", "trafs"],
				traf: ["tfhd", "tfdt", "trun", "sbgps", "sgpds", "subss", "saizs", "saios", "meta"]
			};
		d.encode = function(e, t, n) {
			return d.encodingLength(e), n = n || 0, t = t || a(e.length), d._encode(e, t, n)
		}, d._encode = function(e, t, n) {
			var a = e.type,
				o = e.length;
			o > i && (o = 1), t.writeUInt32BE(o, n), t.write(e.type, n + 4, 4, "ascii");
			var c = n + 8;
			if(1 === o && (r.encode(e.length, t, c), c += 8), s.fullBoxes[a] && (t.writeUInt32BE(e.flags || 0, c), t.writeUInt8(e.version || 0, c), c += 4), l[a]) {
				var u = l[a];
				u.forEach(function(n) {
					if(5 === n.length) {
						var r = e[n] || [];
						n = n.substr(0, 4), r.forEach(function(e) {
							d._encode(e, t, c), c += d.encode.bytes
						})
					} else e[n] && (d._encode(e[n], t, c), c += d.encode.bytes)
				}), e.otherBoxes && e.otherBoxes.forEach(function(e) {
					d._encode(e, t, c), c += d.encode.bytes
				})
			} else if(s[a]) {
				var p = s[a].encode;
				p(e, t, c), c += p.bytes
			} else if(e.buffer) {
				var f = e.buffer;
				f.copy(t, c), c += e.buffer.length
			} else throw new Error("Either `type` must be set to a known type (not'" + a + "') or `buffer` must be set");
			return d.encode.bytes = c - n, t
		}, d.readHeaders = function(e, t, n) {
			if(t = t || 0, n = n || e.length, 8 > n - t) return 8;
			var a = e.readUInt32BE(t),
				o = e.toString("ascii", t + 4, t + 8),
				i = t + 8;
			if(1 === a) {
				if(16 > n - t) return 16;
				a = r.decode(e, i), i += 8
			}
			var d, l;
			return s.fullBoxes[o] && (d = e.readUInt8(i), l = 16777215 & e.readUInt32BE(i), i += 4), {
				length: a,
				headersLen: i - t,
				contentLen: a - (i - t),
				type: o,
				version: d,
				flags: l
			}
		}, d.decode = function(e, t, n) {
			t = t || 0, n = n || e.length;
			var r = d.readHeaders(e, t, n);
			if(!r || r.length > n - t) throw new Error("Data too short");
			return d.decodeWithoutHeaders(r, e, t + r.headersLen, t + r.length)
		}, d.decodeWithoutHeaders = function(e, t, n, r) {
			n = n || 0, r = r || t.length;
			var a = e.type,
				i = {};
			if(l[a]) {
				i.otherBoxes = [];
				for(var c = l[a], u = n, p; 8 <= r - u;)
					if(p = d.decode(t, u, r), u += p.length, 0 <= c.indexOf(p.type)) i[p.type] = p;
					else if(0 <= c.indexOf(p.type + "s")) {
					var f = p.type + "s",
						m = i[f] = i[f] || [];
					m.push(p)
				} else i.otherBoxes.push(p)
			} else if(s[a]) {
				var h = s[a].decode;
				i = h(t, n, r)
			} else i.buffer = o(t.slice(n, r));
			return i.length = e.length, i.contentLen = e.contentLen, i.type = e.type, i.version = e.version, i.flags = e.flags, i
		}, d.encodingLength = function(e) {
			var t = e.type,
				n = 8;
			if(s.fullBoxes[t] && (n += 4), l[t]) {
				var r = l[t];
				r.forEach(function(t) {
					if(5 === t.length) {
						var r = e[t] || [];
						t = t.substr(0, 4), r.forEach(function(e) {
							e.type = t, n += d.encodingLength(e)
						})
					} else if(e[t]) {
						var a = e[t];
						a.type = t, n += d.encodingLength(a)
					}
				}), e.otherBoxes && e.otherBoxes.forEach(function(e) {
					n += d.encodingLength(e)
				})
			} else if(s[t]) n += s[t].encodingLength(e);
			else if(e.buffer) n += e.buffer.length;
			else throw new Error("Either `type` must be set to a known type (not'" + t + "') or `buffer` must be set");
			return n > i && (n += 8), e.length = n, n
		}
	}, {
		"./boxes": 155,
		"buffer-alloc": 38,
		"buffer-from": 40,
		uint64be: 306
	}],
	158: [function(e, t) {
		(function(n) {
			function r() {
				return this instanceof r ? void(o.Writable.call(this), this.destroyed = !1, this._pending = 0, this._missing = 0, this._buf = null, this._str = null, this._cb = null, this._ondrain = null, this._writeBuffer = null, this._writeCb = null, this._ondrain = null, this._kick()) : new r
			}

			function a(e) {
				this._parent = e, this.destroyed = !1, o.PassThrough.call(this)
			}
			var o = e("readable-stream"),
				s = e("inherits"),
				i = e("next-event"),
				d = e("mp4-box-encoding"),
				l = e("buffer-alloc"),
				c = l(0);
			t.exports = r, s(r, o.Writable), r.prototype.destroy = function(e) {
				this.destroyed || (this.destroyed = !0, e && this.emit("error", e), this.emit("close"))
			}, r.prototype._write = function(e, t, n) {
				if(!this.destroyed) {
					for(var r = !this._str || !this._str._writableState.needDrain; e.length && !this.destroyed;) {
						if(!this._missing) return this._writeBuffer = e, void(this._writeCb = n);
						var a = e.length < this._missing ? e.length : this._missing;
						if(this._buf ? e.copy(this._buf, this._buf.length - this._missing) : this._str && (r = this._str.write(a === e.length ? e : e.slice(0, a))), this._missing -= a, !this._missing) {
							var o = this._buf,
								s = this._cb,
								i = this._str;
							this._buf = this._cb = this._str = this._ondrain = null, r = !0, i && i.end(), s && s(o)
						}
						e = a === e.length ? c : e.slice(a)
					}
					return this._pending && !this._missing ? (this._writeBuffer = e, void(this._writeCb = n)) : void(r ? n() : this._ondrain(n))
				}
			}, r.prototype._buffer = function(e, t) {
				this._missing = e, this._buf = l(e), this._cb = t
			}, r.prototype._stream = function(e, t) {
				var n = this;
				return this._missing = e, this._str = new a(this), this._ondrain = i(this._str, "drain"), this._pending++, this._str.on("end", function() {
					n._pending--, n._kick()
				}), this._cb = t, this._str
			}, r.prototype._readBox = function() {
				function e(r, a) {
					t._buffer(r, function(r) {
						a = a ? n.concat([a, r]) : r;
						var o = d.readHeaders(a);
						"number" == typeof o ? e(o - a.length, a) : (t._pending++, t._headers = o, t.emit("box", o))
					})
				}
				var t = this;
				e(8)
			}, r.prototype.stream = function() {
				var e = this;
				if(!e._headers) throw new Error("this function can only be called once after 'box' is emitted");
				var t = e._headers;
				return e._headers = null, e._stream(t.contentLen, null)
			}, r.prototype.decode = function(e) {
				var t = this;
				if(!t._headers) throw new Error("this function can only be called once after 'box' is emitted");
				var n = t._headers;
				t._headers = null, t._buffer(n.contentLen, function(r) {
					var a = d.decodeWithoutHeaders(n, r);
					e(a), t._pending--, t._kick()
				})
			}, r.prototype.ignore = function() {
				var e = this;
				if(!e._headers) throw new Error("this function can only be called once after 'box' is emitted");
				var t = e._headers;
				e._headers = null, this._missing = t.contentLen, this._cb = function() {
					e._pending--, e._kick()
				}
			}, r.prototype._kick = function() {
				if(!this._pending && (this._buf || this._str || this._readBox(), this._writeBuffer)) {
					var e = this._writeCb,
						t = this._writeBuffer;
					this._writeBuffer = null, this._writeCb = null, this._write(t, null, e)
				}
			}, s(a, o.PassThrough), a.prototype.destroy = function(e) {
				this.destroyed || (this.destroyed = !0, this._parent.destroy(e), e && this.emit("error", e), this.emit("close"))
			}
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41,
		"buffer-alloc": 38,
		inherits: 99,
		"mp4-box-encoding": 157,
		"next-event": 181,
		"readable-stream": 169
	}],
	159: [function(e, t) {
		(function(n) {
			function r() {}

			function a() {
				if(!(this instanceof a)) return new a;
				s.Readable.call(this), this.destroyed = !1, this._reading = !1, this._stream = null, this._drain = null, this._want = !1, this._onreadable = function() {
					e._want && (e._want = !1, e._read())
				}, this._onend = function() {
					e._stream = null
				};
				var e = this
			}

			function o(e) {
				this._parent = e, this.destroyed = !1, s.PassThrough.call(this)
			}
			var s = e("readable-stream"),
				i = e("inherits"),
				d = e("mp4-box-encoding"),
				l = e("buffer-alloc");
			t.exports = a, i(a, s.Readable), a.prototype.mediaData = a.prototype.mdat = function(e, t) {
				var n = new o(this);
				return this.box({
					type: "mdat",
					contentLength: e,
					encodeBufferLen: 8,
					stream: n
				}, t), n
			}, a.prototype.box = function(e, t) {
				if(t || (t = r), this.destroyed) return t(new Error("Encoder is destroyed"));
				var a;
				if(e.encodeBufferLen && (a = l(e.encodeBufferLen)), e.stream) e.buffer = null, a = d.encode(e, a), this.push(a), this._stream = e.stream, this._stream.on("readable", this._onreadable), this._stream.on("end", this._onend), this._stream.on("end", t), this._forward();
				else {
					a = d.encode(e, a);
					var o = this.push(a);
					if(o) return n.nextTick(t);
					this._drain = t
				}
			}, a.prototype.destroy = function(e) {
				if(!this.destroyed) {
					if(this.destroyed = !0, this._stream && this._stream.destroy && this._stream.destroy(), this._stream = null, this._drain) {
						var t = this._drain;
						this._drain = null, t(e)
					}
					e && this.emit("error", e), this.emit("close")
				}
			}, a.prototype.finalize = function() {
				this.push(null)
			}, a.prototype._forward = function() {
				if(this._stream)
					for(; !this.destroyed;) {
						var e = this._stream.read();
						if(!e) return void(this._want = !!this._stream);
						if(!this.push(e)) return
					}
			}, a.prototype._read = function() {
				if(!(this._reading || this.destroyed)) {
					if(this._reading = !0, this._stream && this._forward(), this._drain) {
						var e = this._drain;
						this._drain = null, e()
					}
					this._reading = !1
				}
			}, i(o, s.PassThrough), o.prototype.destroy = function(e) {
				this.destroyed || (this.destroyed = !0, this._parent.destroy(e), e && this.emit("error", e), this.emit("close"))
			}
		}).call(this, e("_process"))
	}, {
		_process: 205,
		"buffer-alloc": 38,
		inherits: 99,
		"mp4-box-encoding": 157,
		"readable-stream": 169
	}],
	160: [function(e, t, n) {
		n.decode = e("./decode"), n.encode = e("./encode")
	}, {
		"./decode": 158,
		"./encode": 159
	}],
	161: [function(e, t, n) {
		arguments[4][11][0].apply(n, arguments)
	}, {
		"./_stream_readable": 163,
		"./_stream_writable": 165,
		"core-util-is": 75,
		dup: 11,
		inherits: 99,
		"process-nextick-args": 204
	}],
	162: [function(e, t, n) {
		arguments[4][12][0].apply(n, arguments)
	}, {
		"./_stream_transform": 164,
		"core-util-is": 75,
		dup: 12,
		inherits: 99
	}],
	163: [function(e, t, n) {
		arguments[4][13][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 161,
		"./internal/streams/BufferList": 166,
		"./internal/streams/destroy": 167,
		"./internal/streams/stream": 168,
		_process: 205,
		"core-util-is": 75,
		dup: 13,
		events: 82,
		inherits: 99,
		isarray: 104,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		"string_decoder/": 296,
		util: 35
	}],
	164: [function(e, t, n) {
		arguments[4][14][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 161,
		"core-util-is": 75,
		dup: 14,
		inherits: 99
	}],
	165: [function(e, t, n) {
		arguments[4][15][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 161,
		"./internal/streams/destroy": 167,
		"./internal/streams/stream": 168,
		_process: 205,
		"core-util-is": 75,
		dup: 15,
		inherits: 99,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		timers: 301,
		"util-deprecate": 313
	}],
	166: [function(e, t, n) {
		arguments[4][16][0].apply(n, arguments)
	}, {
		dup: 16,
		"safe-buffer": 241,
		util: 35
	}],
	167: [function(e, t, n) {
		arguments[4][17][0].apply(n, arguments)
	}, {
		dup: 17,
		"process-nextick-args": 204
	}],
	168: [function(e, t, n) {
		arguments[4][18][0].apply(n, arguments)
	}, {
		dup: 18,
		events: 82
	}],
	169: [function(e, t, n) {
		arguments[4][19][0].apply(n, arguments)
	}, {
		"./lib/_stream_duplex.js": 161,
		"./lib/_stream_passthrough.js": 162,
		"./lib/_stream_readable.js": 163,
		"./lib/_stream_transform.js": 164,
		"./lib/_stream_writable.js": 165,
		dup: 19
	}],
	170: [function(e, t) {
		function n(e) {
			if(e += "", !(100 < e.length)) {
				var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
				if(t) {
					var r = parseFloat(t[1]),
						n = (t[2] || "ms").toLowerCase();
					return "years" === n || "year" === n || "yrs" === n || "yr" === n || "y" === n ? 31557600000 * r : "days" === n || "day" === n || "d" === n ? 86400000 * r : "hours" === n || "hour" === n || "hrs" === n || "hr" === n || "h" === n ? 3600000 * r : "minutes" === n || "minute" === n || "mins" === n || "min" === n || "m" === n ? 60000 * r : "seconds" === n || "second" === n || "secs" === n || "sec" === n || "s" === n ? 1000 * r : "milliseconds" === n || "millisecond" === n || "msecs" === n || "msec" === n || "ms" === n ? r : void 0
				}
			}
		}

		function r(e) {
			return 86400000 <= e ? s(e / 86400000) + "d" : 3600000 <= e ? s(e / 3600000) + "h" : 60000 <= e ? s(e / 60000) + "m" : 1000 <= e ? s(e / 1000) + "s" : e + "ms"
		}

		function a(e) {
			return o(e, 86400000, "day") || o(e, 3600000, "hour") || o(e, 60000, "minute") || o(e, 1000, "second") || e + " ms"
		}

		function o(e, t, n) {
			return e < t ? void 0 : e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s"
		}
		var s = Math.round;
		t.exports = function(e, t) {
			t = t || {};
			var o = typeof e;
			if("string" == o && 0 < e.length) return n(e);
			if("number" == o && !1 === isNaN(e)) return t.long ? a(e) : r(e);
			throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
		}
	}, {}],
	171: [function(e, t) {
		function n(e, t) {
			var o = this;
			return o instanceof n ? void(i.Readable.call(o, t), o.destroyed = !1, o._drained = !1, o._forwarding = !1, o._current = null, o._toStreams2 = t && t.objectMode ? r : a, "function" == typeof e ? o._queue = e : (o._queue = e.map(o._toStreams2), o._queue.forEach(function(e) {
				"function" != typeof e && o._attachErrorListener(e)
			})), o._next()) : new n(e, t)
		}

		function r(e) {
			return o(e, {
				objectMode: !0,
				highWaterMark: 16
			})
		}

		function a(e) {
			return o(e)
		}

		function o(e, t) {
			if(!e || "function" == typeof e || e._readableState) return e;
			var n = new i.Readable(t).wrap(e);
			return e.destroy && (n.destroy = e.destroy.bind(e)), n
		}
		t.exports = n;
		var s = e("inherits"),
			i = e("readable-stream");
		s(n, i.Readable), n.obj = function(e) {
			return new n(e, {
				objectMode: !0,
				highWaterMark: 16
			})
		}, n.prototype._read = function() {
			this._drained = !0, this._forward()
		}, n.prototype._forward = function() {
			if(!this._forwarding && this._drained && this._current) {
				this._forwarding = !0;
				for(var e; null !== (e = this._current.read());) this._drained = this.push(e);
				this._forwarding = !1
			}
		}, n.prototype.destroy = function(e) {
			this.destroyed || (this.destroyed = !0, this._current && this._current.destroy && this._current.destroy(), "function" != typeof this._queue && this._queue.forEach(function(e) {
				e.destroy && e.destroy()
			}), e && this.emit("error", e), this.emit("close"))
		}, n.prototype._next = function() {
			var e = this;
			if(e._current = null, "function" == typeof e._queue) e._queue(function(t, n) {
				return t ? e.destroy(t) : void(n = e._toStreams2(n), e._attachErrorListener(n), e._gotNextStream(n))
			});
			else {
				var t = e._queue.shift();
				"function" == typeof t && (t = e._toStreams2(t()), e._attachErrorListener(t)), e._gotNextStream(t)
			}
		}, n.prototype._gotNextStream = function(e) {
			function t() {
				a._forward()
			}

			function n() {
				e._readableState.ended || a.destroy()
			}

			function r() {
				a._current = null, e.removeListener("readable", t), e.removeListener("end", r), e.removeListener("close", n), a._next()
			}
			var a = this;
			return e ? void(a._current = e, a._forward(), e.on("readable", t), e.once("end", r), e.once("close", n)) : (a.push(null), void a.destroy())
		}, n.prototype._attachErrorListener = function(e) {
			function t(r) {
				e.removeListener("error", t), n.destroy(r)
			}
			var n = this;
			e && e.once("error", t)
		}
	}, {
		inherits: 99,
		"readable-stream": 180
	}],
	172: [function(e, t, n) {
		arguments[4][11][0].apply(n, arguments)
	}, {
		"./_stream_readable": 174,
		"./_stream_writable": 176,
		"core-util-is": 75,
		dup: 11,
		inherits: 99,
		"process-nextick-args": 204
	}],
	173: [function(e, t, n) {
		arguments[4][12][0].apply(n, arguments)
	}, {
		"./_stream_transform": 175,
		"core-util-is": 75,
		dup: 12,
		inherits: 99
	}],
	174: [function(e, t, n) {
		arguments[4][13][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 172,
		"./internal/streams/BufferList": 177,
		"./internal/streams/destroy": 178,
		"./internal/streams/stream": 179,
		_process: 205,
		"core-util-is": 75,
		dup: 13,
		events: 82,
		inherits: 99,
		isarray: 104,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		"string_decoder/": 296,
		util: 35
	}],
	175: [function(e, t, n) {
		arguments[4][14][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 172,
		"core-util-is": 75,
		dup: 14,
		inherits: 99
	}],
	176: [function(e, t, n) {
		arguments[4][15][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 172,
		"./internal/streams/destroy": 178,
		"./internal/streams/stream": 179,
		_process: 205,
		"core-util-is": 75,
		dup: 15,
		inherits: 99,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		timers: 301,
		"util-deprecate": 313
	}],
	177: [function(e, t, n) {
		arguments[4][16][0].apply(n, arguments)
	}, {
		dup: 16,
		"safe-buffer": 241,
		util: 35
	}],
	178: [function(e, t, n) {
		arguments[4][17][0].apply(n, arguments)
	}, {
		dup: 17,
		"process-nextick-args": 204
	}],
	179: [function(e, t, n) {
		arguments[4][18][0].apply(n, arguments)
	}, {
		dup: 18,
		events: 82
	}],
	180: [function(e, t, n) {
		arguments[4][19][0].apply(n, arguments)
	}, {
		"./lib/_stream_duplex.js": 172,
		"./lib/_stream_passthrough.js": 173,
		"./lib/_stream_readable.js": 174,
		"./lib/_stream_transform.js": 175,
		"./lib/_stream_writable.js": 176,
		dup: 19
	}],
	181: [function(e, t) {
		t.exports = function(e, t) {
			var n = null;
			return e.on(t, function(e) {
					if(n) {
						var t = n;
						n = null, t(e)
					}
				}),
				function(e) {
					n = e
				}
		}
	}, {}],
	182: [function(e, t) {
		function n(e) {
			var t = function() {
				return t.called ? t.value : (t.called = !0, t.value = e.apply(this, arguments))
			};
			return t.called = !1, t
		}

		function r(e) {
			var t = function() {
					if(t.called) throw new Error(t.onceError);
					return t.called = !0, t.value = e.apply(this, arguments)
				},
				n = e.name || "Function wrapped with `once`";
			return t.onceError = n + " shouldn't be called more than once", t.called = !1, t
		}
		var a = e("wrappy");
		t.exports = a(n), t.exports.strict = a(r), n.proto = n(function() {
			Object.defineProperty(Function.prototype, "once", {
				value: function() {
					return n(this)
				},
				configurable: !0
			}), Object.defineProperty(Function.prototype, "onceStrict", {
				value: function() {
					return r(this)
				},
				configurable: !0
			})
		})
	}, {
		wrappy: 324
	}],
	183: [function(e, t) {
		"use strict";
		var n = e("./lib/utils/common").assign,
			r = e("./lib/deflate"),
			a = e("./lib/inflate"),
			o = e("./lib/zlib/constants"),
			s = {};
		n(s, r, a, o), t.exports = s
	}, {
		"./lib/deflate": 184,
		"./lib/inflate": 185,
		"./lib/utils/common": 186,
		"./lib/zlib/constants": 189
	}],
	184: [function(e, t, n) {
		"use strict";

		function r(e) {
			if(!(this instanceof r)) return new r(e);
			this.options = s.assign({
				level: -1,
				method: 8,
				chunkSize: 16384,
				windowBits: 15,
				memLevel: 8,
				strategy: 0,
				to: ""
			}, e || {});
			var t = this.options;
			t.raw && 0 < t.windowBits ? t.windowBits = -t.windowBits : t.gzip && 0 < t.windowBits && 16 > t.windowBits && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new l, this.strm.avail_out = 0;
			var n = o.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
			if(0 !== n) throw new Error(d[n]);
			if(t.header && o.deflateSetHeader(this.strm, t.header), t.dictionary) {
				var a;
				if(a = "string" == typeof t.dictionary ? i.string2buf(t.dictionary) : "[object ArrayBuffer]" === c.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary, n = o.deflateSetDictionary(this.strm, a), 0 !== n) throw new Error(d[n]);
				this._dict_set = !0
			}
		}

		function a(e, t) {
			var n = new r(t);
			if(n.push(e, !0), n.err) throw n.msg || d[n.err];
			return n.result
		}
		var o = e("./zlib/deflate"),
			s = e("./utils/common"),
			i = e("./utils/strings"),
			d = e("./zlib/messages"),
			l = e("./zlib/zstream"),
			c = Object.prototype.toString,
			u = 4,
			p = 0,
			f = 1,
			m = 2;
		r.prototype.push = function(e, t) {
			var n = this.strm,
				r = this.options.chunkSize,
				a, d;
			if(this.ended) return !1;
			d = t === ~~t ? t : !0 === t ? u : 0, n.input = "string" == typeof e ? i.string2buf(e) : "[object ArrayBuffer]" === c.call(e) ? new Uint8Array(e) : e, n.next_in = 0, n.avail_in = n.input.length;
			do {
				if(0 === n.avail_out && (n.output = new s.Buf8(r), n.next_out = 0, n.avail_out = r), a = o.deflate(n, d), a !== f && a !== p) return this.onEnd(a), this.ended = !0, !1;
				(0 === n.avail_out || 0 === n.avail_in && (d === u || d === m)) && ("string" === this.options.to ? this.onData(i.buf2binstring(s.shrinkBuf(n.output, n.next_out))) : this.onData(s.shrinkBuf(n.output, n.next_out)))
			} while ((0 < n.avail_in || 0 === n.avail_out) && a !== f);
			return d === u ? (a = o.deflateEnd(this.strm), this.onEnd(a), this.ended = !0, a === p) : d !== m || (this.onEnd(p), n.avail_out = 0, !0)
		}, r.prototype.onData = function(e) {
			this.chunks.push(e)
		}, r.prototype.onEnd = function(e) {
			e === p && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
		}, n.Deflate = r, n.deflate = a, n.deflateRaw = function(e, t) {
			return t = t || {}, t.raw = !0, a(e, t)
		}, n.gzip = function(e, t) {
			return t = t || {}, t.gzip = !0, a(e, t)
		}
	}, {
		"./utils/common": 186,
		"./utils/strings": 187,
		"./zlib/deflate": 191,
		"./zlib/messages": 196,
		"./zlib/zstream": 198
	}],
	185: [function(e, t, n) {
		"use strict";

		function r(e) {
			if(!(this instanceof r)) return new r(e);
			this.options = s.assign({
				chunkSize: 16384,
				windowBits: 0,
				to: ""
			}, e || {});
			var t = this.options;
			t.raw && 0 <= t.windowBits && 16 > t.windowBits && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), 0 <= t.windowBits && 16 > t.windowBits && !(e && e.windowBits) && (t.windowBits += 32), 15 < t.windowBits && 48 > t.windowBits && 0 == (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new c, this.strm.avail_out = 0;
			var n = o.inflateInit2(this.strm, t.windowBits);
			if(n !== d.Z_OK) throw new Error(l[n]);
			this.header = new u, o.inflateGetHeader(this.strm, this.header)
		}

		function a(e, t) {
			var n = new r(t);
			if(n.push(e, !0), n.err) throw n.msg || l[n.err];
			return n.result
		}
		var o = e("./zlib/inflate"),
			s = e("./utils/common"),
			i = e("./utils/strings"),
			d = e("./zlib/constants"),
			l = e("./zlib/messages"),
			c = e("./zlib/zstream"),
			u = e("./zlib/gzheader"),
			p = Object.prototype.toString;
		r.prototype.push = function(e, t) {
			var n = this.strm,
				r = this.options.chunkSize,
				a = this.options.dictionary,
				l = !1,
				c, u, f, m, h, _;
			if(this.ended) return !1;
			u = t === ~~t ? t : !0 === t ? d.Z_FINISH : d.Z_NO_FLUSH, n.input = "string" == typeof e ? i.binstring2buf(e) : "[object ArrayBuffer]" === p.call(e) ? new Uint8Array(e) : e, n.next_in = 0, n.avail_in = n.input.length;
			do {
				if(0 === n.avail_out && (n.output = new s.Buf8(r), n.next_out = 0, n.avail_out = r), c = o.inflate(n, d.Z_NO_FLUSH), c === d.Z_NEED_DICT && a && (_ = "string" == typeof a ? i.string2buf(a) : "[object ArrayBuffer]" === p.call(a) ? new Uint8Array(a) : a, c = o.inflateSetDictionary(this.strm, _)), c === d.Z_BUF_ERROR && !0 === l && (c = d.Z_OK, l = !1), c !== d.Z_STREAM_END && c !== d.Z_OK) return this.onEnd(c), this.ended = !0, !1;
				n.next_out && (0 === n.avail_out || c === d.Z_STREAM_END || 0 === n.avail_in && (u === d.Z_FINISH || u === d.Z_SYNC_FLUSH)) && ("string" === this.options.to ? (f = i.utf8border(n.output, n.next_out), m = n.next_out - f, h = i.buf2string(n.output, f), n.next_out = m, n.avail_out = r - m, m && s.arraySet(n.output, n.output, f, m, 0), this.onData(h)) : this.onData(s.shrinkBuf(n.output, n.next_out))), 0 === n.avail_in && 0 === n.avail_out && (l = !0)
			} while ((0 < n.avail_in || 0 === n.avail_out) && c !== d.Z_STREAM_END);
			return c === d.Z_STREAM_END && (u = d.Z_FINISH), u === d.Z_FINISH ? (c = o.inflateEnd(this.strm), this.onEnd(c), this.ended = !0, c === d.Z_OK) : u !== d.Z_SYNC_FLUSH || (this.onEnd(d.Z_OK), n.avail_out = 0, !0)
		}, r.prototype.onData = function(e) {
			this.chunks.push(e)
		}, r.prototype.onEnd = function(e) {
			e === d.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
		}, n.Inflate = r, n.inflate = a, n.inflateRaw = function(e, t) {
			return t = t || {}, t.raw = !0, a(e, t)
		}, n.ungzip = a
	}, {
		"./utils/common": 186,
		"./utils/strings": 187,
		"./zlib/constants": 189,
		"./zlib/gzheader": 192,
		"./zlib/inflate": 194,
		"./zlib/messages": 196,
		"./zlib/zstream": 198
	}],
	186: [function(e, t, n) {
		"use strict";

		function r(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}
		var a = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
		n.assign = function(e) {
			for(var t = Array.prototype.slice.call(arguments, 1); t.length;) {
				var n = t.shift();
				if(n) {
					if("object" != typeof n) throw new TypeError(n + "must be non-object");
					for(var a in n) r(n, a) && (e[a] = n[a])
				}
			}
			return e
		}, n.shrinkBuf = function(e, t) {
			return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e)
		};
		var o = {
				arraySet: function(e, t, n, r, a) {
					if(t.subarray && e.subarray) return void e.set(t.subarray(n, n + r), a);
					for(var o = 0; o < r; o++) e[a + o] = t[n + o]
				},
				flattenChunks: function(e) {
					var t, n, r, a, o, s;
					for(r = 0, t = 0, n = e.length; t < n; t++) r += e[t].length;
					for(s = new Uint8Array(r), a = 0, (t = 0, n = e.length); t < n; t++) o = e[t], s.set(o, a), a += o.length;
					return s
				}
			},
			s = {
				arraySet: function(e, t, n, r, a) {
					for(var o = 0; o < r; o++) e[a + o] = t[n + o]
				},
				flattenChunks: function(e) {
					return [].concat.apply([], e)
				}
			};
		n.setTyped = function(e) {
			e ? (n.Buf8 = Uint8Array, n.Buf16 = Uint16Array, n.Buf32 = Int32Array, n.assign(n, o)) : (n.Buf8 = Array, n.Buf16 = Array, n.Buf32 = Array, n.assign(n, s))
		}, n.setTyped(a)
	}, {}],
	187: [function(e, t, n) {
		"use strict";

		function r(e, t) {
			if(65537 > t && (e.subarray && d || !e.subarray && s)) return a.apply(null, o.shrinkBuf(e, t));
			for(var n = "", r = 0; r < t; r++) n += a(e[r]);
			return n
		}
		var a = String.fromCharCode,
			o = e("./common"),
			s = !0,
			d = !0;
		try {
			a.apply(null, [0])
		} catch(e) {
			s = !1
		}
		try {
			a.apply(null, new Uint8Array(1))
		} catch(e) {
			d = !1
		}
		for(var l = new o.Buf8(256), i = 0; 256 > i; i++) l[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
		l[254] = l[254] = 1, n.string2buf = function(e) {
			var t = e.length,
				n = 0,
				r, a, s, d, l;
			for(d = 0; d < t; d++) a = e.charCodeAt(d), 55296 == (64512 & a) && d + 1 < t && (s = e.charCodeAt(d + 1), 56320 == (64512 & s) && (a = 65536 + (a - 55296 << 10) + (s - 56320), d++)), n += 128 > a ? 1 : 2048 > a ? 2 : 65536 > a ? 3 : 4;
			for(r = new o.Buf8(n), l = 0, d = 0; l < n; d++) a = e.charCodeAt(d), 55296 == (64512 & a) && d + 1 < t && (s = e.charCodeAt(d + 1), 56320 == (64512 & s) && (a = 65536 + (a - 55296 << 10) + (s - 56320), d++)), 128 > a ? r[l++] = a : 2048 > a ? (r[l++] = 192 | a >>> 6, r[l++] = 128 | 63 & a) : 65536 > a ? (r[l++] = 224 | a >>> 12, r[l++] = 128 | 63 & a >>> 6, r[l++] = 128 | 63 & a) : (r[l++] = 240 | a >>> 18, r[l++] = 128 | 63 & a >>> 12, r[l++] = 128 | 63 & a >>> 6, r[l++] = 128 | 63 & a);
			return r
		}, n.buf2binstring = function(e) {
			return r(e, e.length)
		}, n.binstring2buf = function(e) {
			for(var t = new o.Buf8(e.length), n = 0, r = t.length; n < r; n++) t[n] = e.charCodeAt(n);
			return t
		}, n.buf2string = function(e, t) {
			var n = t || e.length,
				a = Array(2 * n),
				o, s, d, u;
			for(s = 0, o = 0; o < n;) {
				if(d = e[o++], 128 > d) {
					a[s++] = d;
					continue
				}
				if(u = l[d], 4 < u) {
					a[s++] = 65533, o += u - 1;
					continue
				}
				for(d &= 2 === u ? 31 : 3 === u ? 15 : 7; 1 < u && o < n;) d = d << 6 | 63 & e[o++], u--;
				if(1 < u) {
					a[s++] = 65533;
					continue
				}
				65536 > d ? a[s++] = d : (d -= 65536, a[s++] = 55296 | 1023 & d >> 10, a[s++] = 56320 | 1023 & d)
			}
			return r(a, s)
		}, n.utf8border = function(e, t) {
			var n;
			for(t = t || e.length, t > e.length && (t = e.length), n = t - 1; 0 <= n && 128 == (192 & e[n]);) n--;
			return 0 > n ? t : 0 === n ? t : n + l[e[n]] > t ? n : t
		}
	}, {
		"./common": 186
	}],
	188: [function(e, t) {
		"use strict";
		t.exports = function(e, t, r, a) {
			for(var o = 0 | 65535 & e, s = 0 | 65535 & e >>> 16, i = 0; 0 !== r;) {
				i = 2e3 < r ? 2e3 : r, r -= i;
				do o = 0 | o + t[a++], s = 0 | s + o; while (--i);
				o %= 65521, s %= 65521
			}
			return 0 | (o | s << 16)
		}
	}, {}],
	189: [function(e, t) {
		"use strict";
		t.exports = {
			Z_NO_FLUSH: 0,
			Z_PARTIAL_FLUSH: 1,
			Z_SYNC_FLUSH: 2,
			Z_FULL_FLUSH: 3,
			Z_FINISH: 4,
			Z_BLOCK: 5,
			Z_TREES: 6,
			Z_OK: 0,
			Z_STREAM_END: 1,
			Z_NEED_DICT: 2,
			Z_ERRNO: -1,
			Z_STREAM_ERROR: -2,
			Z_DATA_ERROR: -3,
			Z_BUF_ERROR: -5,
			Z_NO_COMPRESSION: 0,
			Z_BEST_SPEED: 1,
			Z_BEST_COMPRESSION: 9,
			Z_DEFAULT_COMPRESSION: -1,
			Z_FILTERED: 1,
			Z_HUFFMAN_ONLY: 2,
			Z_RLE: 3,
			Z_FIXED: 4,
			Z_DEFAULT_STRATEGY: 0,
			Z_BINARY: 0,
			Z_TEXT: 1,
			Z_UNKNOWN: 2,
			Z_DEFLATED: 8
		}
	}, {}],
	190: [function(e, t) {
		"use strict";
		var n = function() {
			for(var e = [], t = 0, r; 256 > t; t++) {
				r = t;
				for(var a = 0; 8 > a; a++) r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
				e[t] = r
			}
			return e
		}();
		t.exports = function(e, t, r, a) {
			e ^= -1;
			for(var o = a; o < a + r; o++) e = e >>> 8 ^ n[255 & (e ^ t[o])];
			return -1 ^ e
		}
	}, {}],
	191: [function(e, t, n) {
		"use strict";

		function r(e, t) {
			return e.msg = I[t], t
		}

		function a(e) {
			return(e << 1) - (4 < e ? 9 : 0)
		}

		function o(e) {
			for(var t = e.length; 0 <= --t;) e[t] = 0
		}

		function i(e) {
			var t = e.state,
				n = t.pending;
			n > e.avail_out && (n = e.avail_out);
			0 === n || (v.arraySet(e.output, t.pending_buf, t.pending_out, n, e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, 0 === t.pending && (t.pending_out = 0))
		}

		function d(e, t) {
			E._tr_flush_block(e, 0 <= e.block_start ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, i(e.strm)
		}

		function l(e, t) {
			e.pending_buf[e.pending++] = t
		}

		function c(e, t) {
			e.pending_buf[e.pending++] = 255 & t >>> 8, e.pending_buf[e.pending++] = 255 & t
		}

		function u(e, t, n, r) {
			var a = e.avail_in;
			return(a > r && (a = r), 0 === a) ? 0 : (e.avail_in -= a, v.arraySet(t, e.input, e.next_in, a, n), 1 === e.state.wrap ? e.adler = C(e.adler, t, a, n) : 2 === e.state.wrap && (e.adler = T(e.adler, t, a, n)), e.next_in += a, e.total_in += a, a)
		}

		function p(e, t) {
			var n = e.max_chain_length,
				r = e.strstart,
				a = e.prev_length,
				o = e.nice_match,
				s = e.strstart > e.w_size - 262 ? e.strstart - (e.w_size - 262) : 0,
				i = e.window,
				d = e.w_mask,
				l = e.prev,
				c = e.strstart + 258,
				u = i[r + a - 1],
				p = i[r + a],
				f, m;
			e.prev_length >= e.good_match && (n >>= 2), o > e.lookahead && (o = e.lookahead);
			do {
				if(f = t, i[f + a] !== p || i[f + a - 1] !== u || i[f] !== i[r] || i[++f] !== i[r + 1]) continue;
				r += 2, f++;
				do; while (i[++r] === i[++f] && i[++r] === i[++f] && i[++r] === i[++f] && i[++r] === i[++f] && i[++r] === i[++f] && i[++r] === i[++f] && i[++r] === i[++f] && i[++r] === i[++f] && r < c);
				if(m = 258 - (c - r), r = c - 258, m > a) {
					if(e.match_start = t, a = m, m >= o) break;
					u = i[r + a - 1], p = i[r + a]
				}
			} while ((t = l[t & d]) > s && 0 != --n);
			return a <= e.lookahead ? a : e.lookahead
		}

		function f(e) {
			var t = e.w_size,
				r, a, o, s, i;
			do {
				if(s = e.window_size - e.lookahead - e.strstart, e.strstart >= t + (t - 262)) {
					v.arraySet(e.window, e.window, t, t, 0), e.match_start -= t, e.strstart -= t, e.block_start -= t, a = e.hash_size, r = a;
					do o = e.head[--r], e.head[r] = o >= t ? o - t : 0; while (--a);
					a = t, r = a;
					do o = e.prev[--r], e.prev[r] = o >= t ? o - t : 0; while (--a);
					s += t
				}
				if(0 === e.strm.avail_in) break;
				if(a = u(e.strm, e.window, e.strstart + e.lookahead, s), e.lookahead += a, 3 <= e.lookahead + e.insert)
					for(i = e.strstart - e.insert, e.ins_h = e.window[i], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[i + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[i + 3 - 1]) & e.hash_mask, e.prev[i & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = i, i++, e.insert--, !(3 > e.lookahead + e.insert)););
			} while (262 > e.lookahead && 0 !== e.strm.avail_in)
		}

		function s(e, t) {
			for(var n, r;;) {
				if(262 > e.lookahead) {
					if(f(e), 262 > e.lookahead && 0 === t) return 1;
					if(0 === e.lookahead) break
				}
				if(n = 0, 3 <= e.lookahead && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 !== n && e.strstart - n <= e.w_size - 262 && (e.match_length = p(e, n)), !(3 <= e.match_length)) r = E._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
				else if(r = E._tr_tally(e, e.strstart - e.match_start, e.match_length - 3), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && 3 <= e.lookahead) {
					e.match_length--;
					do e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart; while (0 != --e.match_length);
					e.strstart++
				} else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
				if(r && (d(e, !1), 0 === e.strm.avail_out)) return 1
			}
			return e.insert = 2 > e.strstart ? e.strstart : 2, 4 === t ? (d(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (d(e, !1), 0 === e.strm.avail_out) ? 1 : 2
		}

		function m(e, t) {
			for(var n, r, a;;) {
				if(262 > e.lookahead) {
					if(f(e), 262 > e.lookahead && 0 === t) return 1;
					if(0 === e.lookahead) break
				}
				if(n = 0, 3 <= e.lookahead && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = 2, 0 !== n && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - 262 && (e.match_length = p(e, n), 5 >= e.match_length && (1 === e.strategy || 3 === e.match_length && 4096 < e.strstart - e.match_start) && (e.match_length = 2)), 3 <= e.prev_length && e.match_length <= e.prev_length) {
					a = e.strstart + e.lookahead - 3, r = E._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - 3), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
					do ++e.strstart <= a && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart); while (0 != --e.prev_length);
					if(e.match_available = 0, e.match_length = 2, e.strstart++, r && (d(e, !1), 0 === e.strm.avail_out)) return 1
				} else if(!e.match_available) e.match_available = 1, e.strstart++, e.lookahead--;
				else if(r = E._tr_tally(e, 0, e.window[e.strstart - 1]), r && d(e, !1), e.strstart++, e.lookahead--, 0 === e.strm.avail_out) return 1
			}
			return e.match_available && (r = E._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = 2 > e.strstart ? e.strstart : 2, 4 === t ? (d(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (d(e, !1), 0 === e.strm.avail_out) ? 1 : 2
		}

		function h(e, t) {
			for(var n = e.window, r, a, o, s;;) {
				if(258 >= e.lookahead) {
					if(f(e), 258 >= e.lookahead && 0 === t) return 1;
					if(0 === e.lookahead) break
				}
				if(e.match_length = 0, 3 <= e.lookahead && 0 < e.strstart && (o = e.strstart - 1, a = n[o], a === n[++o] && a === n[++o] && a === n[++o])) {
					s = e.strstart + 258;
					do; while (a === n[++o] && a === n[++o] && a === n[++o] && a === n[++o] && a === n[++o] && a === n[++o] && a === n[++o] && a === n[++o] && o < s);
					e.match_length = 258 - (s - o), e.match_length > e.lookahead && (e.match_length = e.lookahead)
				}
				if(3 <= e.match_length ? (r = E._tr_tally(e, 1, e.match_length - 3), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (r = E._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), r && (d(e, !1), 0 === e.strm.avail_out)) return 1
			}
			return e.insert = 0, 4 === t ? (d(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (d(e, !1), 0 === e.strm.avail_out) ? 1 : 2
		}

		function _(e, t) {
			for(var n;;) {
				if(0 === e.lookahead && (f(e), 0 === e.lookahead)) {
					if(0 === t) return 1;
					break
				}
				if(e.match_length = 0, n = E._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (d(e, !1), 0 === e.strm.avail_out)) return 1
			}
			return e.insert = 0, 4 === t ? (d(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (d(e, !1), 0 === e.strm.avail_out) ? 1 : 2
		}

		function g(e, t, n, r, a) {
			this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = r, this.func = a
		}

		function y(e) {
			e.window_size = 2 * e.w_size, o(e.head), e.max_lazy_match = L[e.level].max_lazy, e.good_match = L[e.level].good_length, e.nice_match = L[e.level].nice_length, e.max_chain_length = L[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = 2, e.match_available = 0, e.ins_h = 0
		}

		function b() {
			this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = 8, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new v.Buf16(1146), this.dyn_dtree = new v.Buf16(122), this.bl_tree = new v.Buf16(78), o(this.dyn_ltree), o(this.dyn_dtree), o(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new v.Buf16(16), this.heap = new v.Buf16(573), o(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new v.Buf16(573), o(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
		}

		function k(e) {
			var t;
			return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = 2, t = e.state, t.pending = 0, t.pending_out = 0, 0 > t.wrap && (t.wrap = -t.wrap), t.status = t.wrap ? 42 : 113, e.adler = 2 === t.wrap ? 0 : 1, t.last_flush = 0, E._tr_init(t), 0) : r(e, -2)
		}

		function w(e) {
			var t = k(e);
			return 0 === t && y(e.state), t
		}

		function x(e, t, n, a, o, i) {
			if(!e) return -2;
			var d = 1;
			if(-1 === t && (t = 6), 0 > a ? (d = 0, a = -a) : 15 < a && (d = 2, a -= 16), 1 > o || 9 < o || 8 !== n || 8 > a || 15 < a || 0 > t || 9 < t || 0 > i || 4 < i) return r(e, -2);
			8 === a && (a = 9);
			var l = new b;
			return e.state = l, l.strm = e, l.wrap = d, l.gzhead = null, l.w_bits = a, l.w_size = 1 << l.w_bits, l.w_mask = l.w_size - 1, l.hash_bits = o + 7, l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift = ~~((l.hash_bits + 3 - 1) / 3), l.window = new v.Buf8(2 * l.w_size), l.head = new v.Buf16(l.hash_size), l.prev = new v.Buf16(l.w_size), l.lit_bufsize = 1 << o + 6, l.pending_buf_size = 4 * l.lit_bufsize, l.pending_buf = new v.Buf8(l.pending_buf_size), l.d_buf = 1 * l.lit_bufsize, l.l_buf = 3 * l.lit_bufsize, l.level = t, l.strategy = i, l.method = n, w(e)
		}

		function S(e, t) {
			var n, d, u, p;
			if(!e || !e.state || 5 < t || 0 > t) return e ? r(e, -2) : -2;
			if(d = e.state, !e.output || !e.input && 0 !== e.avail_in || 666 === d.status && 4 !== t) return r(e, 0 === e.avail_out ? -5 : -2);
			if(d.strm = e, n = d.last_flush, d.last_flush = t, 42 === d.status)
				if(2 === d.wrap) e.adler = 0, l(d, 31), l(d, 139), l(d, 8), d.gzhead ? (l(d, (d.gzhead.text ? 1 : 0) + (d.gzhead.hcrc ? 2 : 0) + (d.gzhead.extra ? 4 : 0) + (d.gzhead.name ? 8 : 0) + (d.gzhead.comment ? 16 : 0)), l(d, 255 & d.gzhead.time), l(d, 255 & d.gzhead.time >> 8), l(d, 255 & d.gzhead.time >> 16), l(d, 255 & d.gzhead.time >> 24), l(d, 9 === d.level ? 2 : 2 <= d.strategy || 2 > d.level ? 4 : 0), l(d, 255 & d.gzhead.os), d.gzhead.extra && d.gzhead.extra.length && (l(d, 255 & d.gzhead.extra.length), l(d, 255 & d.gzhead.extra.length >> 8)), d.gzhead.hcrc && (e.adler = T(e.adler, d.pending_buf, d.pending, 0)), d.gzindex = 0, d.status = 69) : (l(d, 0), l(d, 0), l(d, 0), l(d, 0), l(d, 0), l(d, 9 === d.level ? 2 : 2 <= d.strategy || 2 > d.level ? 4 : 0), l(d, 3), d.status = 113);
				else {
					var f = 8 + (d.w_bits - 8 << 4) << 8,
						m = -1;
					m = 2 <= d.strategy || 2 > d.level ? 0 : 6 > d.level ? 1 : 6 === d.level ? 2 : 3, f |= m << 6, 0 !== d.strstart && (f |= 32), f += 31 - f % 31, d.status = 113, c(d, f), 0 !== d.strstart && (c(d, e.adler >>> 16), c(d, 65535 & e.adler)), e.adler = 1
				}
			if(69 === d.status)
				if(d.gzhead.extra) {
					for(u = d.pending; d.gzindex < (65535 & d.gzhead.extra.length) && !(d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > u && (e.adler = T(e.adler, d.pending_buf, d.pending - u, u)), i(e), u = d.pending, d.pending === d.pending_buf_size));) l(d, 255 & d.gzhead.extra[d.gzindex]), d.gzindex++;
					d.gzhead.hcrc && d.pending > u && (e.adler = T(e.adler, d.pending_buf, d.pending - u, u)), d.gzindex === d.gzhead.extra.length && (d.gzindex = 0, d.status = 73)
				} else d.status = 73;
			if(73 === d.status)
				if(d.gzhead.name) {
					u = d.pending;
					do {
						if(d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > u && (e.adler = T(e.adler, d.pending_buf, d.pending - u, u)), i(e), u = d.pending, d.pending === d.pending_buf_size)) {
							p = 1;
							break
						}
						p = d.gzindex < d.gzhead.name.length ? 255 & d.gzhead.name.charCodeAt(d.gzindex++) : 0, l(d, p)
					} while (0 !== p);
					d.gzhead.hcrc && d.pending > u && (e.adler = T(e.adler, d.pending_buf, d.pending - u, u)), 0 === p && (d.gzindex = 0, d.status = 91)
				} else d.status = 91;
			if(91 === d.status)
				if(d.gzhead.comment) {
					u = d.pending;
					do {
						if(d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > u && (e.adler = T(e.adler, d.pending_buf, d.pending - u, u)), i(e), u = d.pending, d.pending === d.pending_buf_size)) {
							p = 1;
							break
						}
						p = d.gzindex < d.gzhead.comment.length ? 255 & d.gzhead.comment.charCodeAt(d.gzindex++) : 0, l(d, p)
					} while (0 !== p);
					d.gzhead.hcrc && d.pending > u && (e.adler = T(e.adler, d.pending_buf, d.pending - u, u)), 0 === p && (d.status = 103)
				} else d.status = 103;
			if(103 === d.status && (d.gzhead.hcrc ? (d.pending + 2 > d.pending_buf_size && i(e), d.pending + 2 <= d.pending_buf_size && (l(d, 255 & e.adler), l(d, 255 & e.adler >> 8), e.adler = 0, d.status = 113)) : d.status = 113), 0 !== d.pending) {
				if(i(e), 0 === e.avail_out) return d.last_flush = -1, 0;
			} else if(0 === e.avail_in && a(t) <= a(n) && 4 !== t) return r(e, -5);
			if(666 === d.status && 0 !== e.avail_in) return r(e, -5);
			if(0 !== e.avail_in || 0 !== d.lookahead || 0 !== t && 666 !== d.status) {
				var g = 2 === d.strategy ? _(d, t) : 3 === d.strategy ? h(d, t) : L[d.level].func(d, t);
				if((3 === g || 4 === g) && (d.status = 666), 1 === g || 3 === g) return 0 === e.avail_out && (d.last_flush = -1), 0;
				if(2 === g && (1 === t ? E._tr_align(d) : 5 !== t && (E._tr_stored_block(d, 0, 0, !1), 3 === t && (o(d.head), 0 === d.lookahead && (d.strstart = 0, d.block_start = 0, d.insert = 0))), i(e), 0 === e.avail_out)) return d.last_flush = -1, 0
			}
			return 4 === t ? 0 >= d.wrap ? 1 : (2 === d.wrap ? (l(d, 255 & e.adler), l(d, 255 & e.adler >> 8), l(d, 255 & e.adler >> 16), l(d, 255 & e.adler >> 24), l(d, 255 & e.total_in), l(d, 255 & e.total_in >> 8), l(d, 255 & e.total_in >> 16), l(d, 255 & e.total_in >> 24)) : (c(d, e.adler >>> 16), c(d, 65535 & e.adler)), i(e), 0 < d.wrap && (d.wrap = -d.wrap), 0 === d.pending ? 1 : 0) : 0
		}
		var v = e("../utils/common"),
			E = e("./trees"),
			C = e("./adler32"),
			T = e("./crc32"),
			I = e("./messages"),
			L;
		L = [new g(0, 0, 0, 0, function(e, t) {
			var n = 65535;
			for(n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5);;) {
				if(1 >= e.lookahead) {
					if(f(e), 0 === e.lookahead && 0 === t) return 1;
					if(0 === e.lookahead) break
				}
				e.strstart += e.lookahead, e.lookahead = 0;
				var r = e.block_start + n;
				if((0 === e.strstart || e.strstart >= r) && (e.lookahead = e.strstart - r, e.strstart = r, d(e, !1), 0 === e.strm.avail_out)) return 1;
				if(e.strstart - e.block_start >= e.w_size - 262 && (d(e, !1), 0 === e.strm.avail_out)) return 1
			}
			return e.insert = 0, 4 === t ? (d(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.strstart > e.block_start && (d(e, !1), 0 === e.strm.avail_out) ? 1 : 1
		}), new g(4, 4, 8, 4, s), new g(4, 5, 16, 8, s), new g(4, 6, 32, 32, s), new g(4, 4, 16, 16, m), new g(8, 16, 32, 32, m), new g(8, 16, 128, 128, m), new g(8, 32, 128, 256, m), new g(32, 128, 258, 1024, m), new g(32, 258, 258, 4096, m)], n.deflateInit = function(e, t) {
			return x(e, t, 8, 15, 8, 0)
		}, n.deflateInit2 = x, n.deflateReset = w, n.deflateResetKeep = k, n.deflateSetHeader = function(e, t) {
			return e && e.state ? 2 === e.state.wrap ? (e.state.gzhead = t, 0) : -2 : -2
		}, n.deflate = S, n.deflateEnd = function(e) {
			var t;
			return e && e.state ? (t = e.state.status, 42 !== t && 69 !== t && 73 !== t && 91 !== t && 103 !== t && 113 !== t && 666 !== t) ? r(e, -2) : (e.state = null, 113 === t ? r(e, -3) : 0) : -2
		}, n.deflateSetDictionary = function(e, t) {
			var r = t.length,
				a, i, d, l, c, u, p, m;
			if(!e || !e.state) return -2;
			if(a = e.state, l = a.wrap, 2 === l || 1 === l && 42 !== a.status || a.lookahead) return -2;
			for(1 === l && (e.adler = C(e.adler, t, r, 0)), a.wrap = 0, r >= a.w_size && (0 === l && (o(a.head), a.strstart = 0, a.block_start = 0, a.insert = 0), m = new v.Buf8(a.w_size), v.arraySet(m, t, r - a.w_size, a.w_size, 0), t = m, r = a.w_size), c = e.avail_in, u = e.next_in, p = e.input, e.avail_in = r, e.next_in = 0, e.input = t, f(a); 3 <= a.lookahead;) {
				i = a.strstart, d = a.lookahead - 2;
				do a.ins_h = (a.ins_h << a.hash_shift ^ a.window[i + 3 - 1]) & a.hash_mask, a.prev[i & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = i, i++; while (--d);
				a.strstart = i, a.lookahead = 2, f(a)
			}
			return a.strstart += a.lookahead, a.block_start = a.strstart, a.insert = a.lookahead, a.lookahead = 0, a.match_length = a.prev_length = 2, a.match_available = 0, e.next_in = u, e.input = p, e.avail_in = c, a.wrap = l, 0
		}, n.deflateInfo = "pako deflate (from Nodeca project)"
	}, {
		"../utils/common": 186,
		"./adler32": 188,
		"./crc32": 190,
		"./messages": 196,
		"./trees": 197
	}],
	192: [function(e, t) {
		"use strict";
		t.exports = function() {
			this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
		}
	}, {}],
	193: [function(e, t) {
		"use strict";
		t.exports = function(e, t) {
			var n, r, a, o, s, i, d, l, c, u, p, f, m, h, _, g, y, b, k, w, x, S, v, E, C;
			n = e.state, r = e.next_in, E = e.input, a = r + (e.avail_in - 5), o = e.next_out, C = e.output, s = o - (t - e.avail_out), i = o + (e.avail_out - 257), d = n.dmax, l = n.wsize, c = n.whave, u = n.wnext, p = n.window, f = n.hold, m = n.bits, h = n.lencode, _ = n.distcode, g = (1 << n.lenbits) - 1, y = (1 << n.distbits) - 1;
			top: do {
				15 > m && (f += E[r++] << m, m += 8, f += E[r++] << m, m += 8), b = h[f & g];
				dolen: for(;;) {
					if(k = b >>> 24, f >>>= k, m -= k, k = 255 & b >>> 16, 0 === k) C[o++] = 65535 & b;
					else if(16 & k) {
						w = 65535 & b, k &= 15, k && (m < k && (f += E[r++] << m, m += 8), w += f & (1 << k) - 1, f >>>= k, m -= k), 15 > m && (f += E[r++] << m, m += 8, f += E[r++] << m, m += 8), b = _[f & y];
						dodist: for(;;) {
							if(k = b >>> 24, f >>>= k, m -= k, k = 255 & b >>> 16, 16 & k) {
								if(x = 65535 & b, k &= 15, m < k && (f += E[r++] << m, m += 8, m < k && (f += E[r++] << m, m += 8)), x += f & (1 << k) - 1, x > d) {
									e.msg = "invalid distance too far back", n.mode = 30;
									break top
								}
								if(f >>>= k, m -= k, k = o - s, x > k) {
									if(k = x - k, k > c && n.sane) {
										e.msg = "invalid distance too far back", n.mode = 30;
										break top
									}
									if(S = 0, v = p, 0 === u) {
										if(S += l - k, k < w) {
											w -= k;
											do C[o++] = p[S++]; while (--k);
											S = o - x, v = C
										}
									} else if(u < k) {
										if(S += l + u - k, k -= u, k < w) {
											w -= k;
											do C[o++] = p[S++]; while (--k);
											if(S = 0, u < w) {
												k = u, w -= k;
												do C[o++] = p[S++]; while (--k);
												S = o - x, v = C
											}
										}
									} else if(S += u - k, k < w) {
										w -= k;
										do C[o++] = p[S++]; while (--k);
										S = o - x, v = C
									}
									for(; 2 < w;) C[o++] = v[S++], C[o++] = v[S++], C[o++] = v[S++], w -= 3;
									w && (C[o++] = v[S++], 1 < w && (C[o++] = v[S++]))
								} else {
									S = o - x;
									do C[o++] = C[S++], C[o++] = C[S++], C[o++] = C[S++], w -= 3; while (2 < w);
									w && (C[o++] = C[S++], 1 < w && (C[o++] = C[S++]))
								}
							} else if(0 == (64 & k)) {
								b = _[(65535 & b) + (f & (1 << k) - 1)];
								continue dodist
							} else {
								e.msg = "invalid distance code", n.mode = 30;
								break top
							}
							break
						}
					} else if(0 == (64 & k)) {
						b = h[(65535 & b) + (f & (1 << k) - 1)];
						continue dolen
					} else if(32 & k) {
						n.mode = 12;
						break top
					} else {
						e.msg = "invalid literal/length code", n.mode = 30;
						break top
					}
					break
				}
			} while (r < a && o < i);
			return w = m >> 3, r -= w, m -= w << 3, f &= (1 << m) - 1, e.next_in = r, e.next_out = o, e.avail_in = r < a ? 5 + (a - r) : 5 - (r - a), e.avail_out = o < i ? 257 + (i - o) : 257 - (o - i), n.hold = f, void(n.bits = m)
		}
	}, {}],
	194: [function(e, t, n) {
		"use strict";

		function r(e) {
			return(255 & e >>> 24) + (65280 & e >>> 8) + ((65280 & e) << 8) + ((255 & e) << 24)
		}

		function a() {
			this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new p.Buf16(320), this.work = new p.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
		}

		function o(e) {
			var t;
			return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = 1, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new p.Buf32(852), t.distcode = t.distdyn = new p.Buf32(592), t.sane = 1, t.back = -1, 0) : -2
		}

		function s(e) {
			var t;
			return e && e.state ? (t = e.state, t.wsize = 0, t.whave = 0, t.wnext = 0, o(e)) : -2
		}

		function i(e, t) {
			var n, r;
			return e && e.state ? (r = e.state, 0 > t ? (n = 0, t = -t) : (n = (t >> 4) + 1, 48 > t && (t &= 15)), t && (8 > t || 15 < t)) ? -2 : (null !== r.window && r.wbits !== t && (r.window = null), r.wrap = n, r.wbits = t, s(e)) : -2
		}

		function d(e, t) {
			var n, r;
			return e ? (r = new a, e.state = r, r.window = null, n = i(e, t), 0 !== n && (e.state = null), n) : -2
		}

		function l(e) {
			if(g) {
				var t;
				for(y = new p.Buf32(512), b = new p.Buf32(32), t = 0; 144 > t;) e.lens[t++] = 8;
				for(; 256 > t;) e.lens[t++] = 9;
				for(; 280 > t;) e.lens[t++] = 7;
				for(; 288 > t;) e.lens[t++] = 8;
				for(_(1, e.lens, 0, 288, y, 0, e.work, {
						bits: 9
					}), t = 0; 32 > t;) e.lens[t++] = 5;
				_(2, e.lens, 0, 32, b, 0, e.work, {
					bits: 5
				}), g = !1
			}
			e.lencode = y, e.lenbits = 9, e.distcode = b, e.distbits = 5
		}

		function c(e, t, n, r) {
			var a = e.state,
				o;
			return null === a.window && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new p.Buf8(a.wsize)), r >= a.wsize ? (p.arraySet(a.window, t, n - a.wsize, a.wsize, 0), a.wnext = 0, a.whave = a.wsize) : (o = a.wsize - a.wnext, o > r && (o = r), p.arraySet(a.window, t, n - r, o, a.wnext), r -= o, r ? (p.arraySet(a.window, t, n - r, r, 0), a.wnext = r, a.whave = a.wsize) : (a.wnext += o, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += o))), 0
		}
		var u = String.fromCharCode,
			p = e("../utils/common"),
			f = e("./adler32"),
			m = e("./crc32"),
			h = e("./inffast"),
			_ = e("./inftrees"),
			g = !0,
			y, b;
		n.inflateReset = s, n.inflateReset2 = i, n.inflateResetKeep = o, n.inflateInit = function(e) {
			return d(e, 15)
		}, n.inflateInit2 = d, n.inflate = function(e, t) {
			var a = 0,
				o = new p.Buf8(4),
				s = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
				i, d, g, y, b, k, w, x, S, v, E, C, T, I, L, R, B, A, O, D, M, P, U, j;
			if(!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return -2;
			i = e.state, 12 === i.mode && (i.mode = 13), b = e.next_out, g = e.output, w = e.avail_out, y = e.next_in, d = e.input, k = e.avail_in, x = i.hold, S = i.bits, v = k, E = w, P = 0;
			inf_leave: for(;;) switch(i.mode) {
				case 1:
					if(0 === i.wrap) {
						i.mode = 13;
						break
					}
					for(; 16 > S;) {
						if(0 === k) break inf_leave;
						k--, x += d[y++] << S, S += 8
					}
					if(2 & i.wrap && 35615 === x) {
						i.check = 0, o[0] = 255 & x, o[1] = 255 & x >>> 8, i.check = m(i.check, o, 2, 0), x = 0, S = 0, i.mode = 2;
						break
					}
					if(i.flags = 0, i.head && (i.head.done = !1), !(1 & i.wrap) || (((255 & x) << 8) + (x >> 8)) % 31) {
						e.msg = "incorrect header check", i.mode = 30;
						break
					}
					if(8 !== (15 & x)) {
						e.msg = "unknown compression method", i.mode = 30;
						break
					}
					if(x >>>= 4, S -= 4, M = (15 & x) + 8, 0 === i.wbits) i.wbits = M;
					else if(M > i.wbits) {
						e.msg = "invalid window size", i.mode = 30;
						break
					}
					i.dmax = 1 << M, e.adler = i.check = 1, i.mode = 512 & x ? 10 : 12, x = 0, S = 0;
					break;
				case 2:
					for(; 16 > S;) {
						if(0 === k) break inf_leave;
						k--, x += d[y++] << S, S += 8
					}
					if(i.flags = x, 8 !== (255 & i.flags)) {
						e.msg = "unknown compression method", i.mode = 30;
						break
					}
					if(57344 & i.flags) {
						e.msg = "unknown header flags set", i.mode = 30;
						break
					}
					i.head && (i.head.text = 1 & x >> 8), 512 & i.flags && (o[0] = 255 & x, o[1] = 255 & x >>> 8, i.check = m(i.check, o, 2, 0)), x = 0, S = 0, i.mode = 3;
				case 3:
					for(; 32 > S;) {
						if(0 === k) break inf_leave;
						k--, x += d[y++] << S, S += 8
					}
					i.head && (i.head.time = x), 512 & i.flags && (o[0] = 255 & x, o[1] = 255 & x >>> 8, o[2] = 255 & x >>> 16, o[3] = 255 & x >>> 24, i.check = m(i.check, o, 4, 0)), x = 0, S = 0, i.mode = 4;
				case 4:
					for(; 16 > S;) {
						if(0 === k) break inf_leave;
						k--, x += d[y++] << S, S += 8
					}
					i.head && (i.head.xflags = 255 & x, i.head.os = x >> 8), 512 & i.flags && (o[0] = 255 & x, o[1] = 255 & x >>> 8, i.check = m(i.check, o, 2, 0)), x = 0, S = 0, i.mode = 5;
				case 5:
					if(1024 & i.flags) {
						for(; 16 > S;) {
							if(0 === k) break inf_leave;
							k--, x += d[y++] << S, S += 8
						}
						i.length = x, i.head && (i.head.extra_len = x), 512 & i.flags && (o[0] = 255 & x, o[1] = 255 & x >>> 8, i.check = m(i.check, o, 2, 0)), x = 0, S = 0
					} else i.head && (i.head.extra = null);
					i.mode = 6;
				case 6:
					if(1024 & i.flags && (C = i.length, C > k && (C = k), C && (i.head && (M = i.head.extra_len - i.length, !i.head.extra && (i.head.extra = Array(i.head.extra_len)), p.arraySet(i.head.extra, d, y, C, M)), 512 & i.flags && (i.check = m(i.check, d, C, y)), k -= C, y += C, i.length -= C), i.length)) break inf_leave;
					i.length = 0, i.mode = 7;
				case 7:
					if(2048 & i.flags) {
						if(0 === k) break inf_leave;
						C = 0;
						do M = d[y + C++], i.head && M && 65536 > i.length && (i.head.name += u(M)); while (M && C < k);
						if(512 & i.flags && (i.check = m(i.check, d, C, y)), k -= C, y += C, M) break inf_leave
					} else i.head && (i.head.name = null);
					i.length = 0, i.mode = 8;
				case 8:
					if(4096 & i.flags) {
						if(0 === k) break inf_leave;
						C = 0;
						do M = d[y + C++], i.head && M && 65536 > i.length && (i.head.comment += u(M)); while (M && C < k);
						if(512 & i.flags && (i.check = m(i.check, d, C, y)), k -= C, y += C, M) break inf_leave
					} else i.head && (i.head.comment = null);
					i.mode = 9;
				case 9:
					if(512 & i.flags) {
						for(; 16 > S;) {
							if(0 === k) break inf_leave;
							k--, x += d[y++] << S, S += 8
						}
						if(x !== (65535 & i.check)) {
							e.msg = "header crc mismatch", i.mode = 30;
							break
						}
						x = 0, S = 0
					}
					i.head && (i.head.hcrc = 1 & i.flags >> 9, i.head.done = !0), e.adler = i.check = 0, i.mode = 12;
					break;
				case 10:
					for(; 32 > S;) {
						if(0 === k) break inf_leave;
						k--, x += d[y++] << S, S += 8
					}
					e.adler = i.check = r(x), x = 0, S = 0, i.mode = 11;
				case 11:
					if(0 === i.havedict) return e.next_out = b, e.avail_out = w, e.next_in = y, e.avail_in = k, i.hold = x, i.bits = S, 2;
					e.adler = i.check = 1, i.mode = 12;
				case 12:
					if(5 === t || 6 === t) break inf_leave;
				case 13:
					if(i.last) {
						x >>>= 7 & S, S -= 7 & S, i.mode = 27;
						break
					}
					for(; 3 > S;) {
						if(0 === k) break inf_leave;
						k--, x += d[y++] << S, S += 8
					}
					switch(i.last = 1 & x, x >>>= 1, S -= 1, 3 & x) {
						case 0:
							i.mode = 14;
							break;
						case 1:
							if(l(i), i.mode = 20, 6 === t) {
								x >>>= 2, S -= 2;
								break inf_leave
							}
							break;
						case 2:
							i.mode = 17;
							break;
						case 3:
							e.msg = "invalid block type", i.mode = 30;
					}
					x >>>= 2, S -= 2;
					break;
				case 14:
					for(x >>>= 7 & S, S -= 7 & S; 32 > S;) {
						if(0 === k) break inf_leave;
						k--, x += d[y++] << S, S += 8
					}
					if((65535 & x) != (65535 ^ x >>> 16)) {
						e.msg = "invalid stored block lengths", i.mode = 30;
						break
					}
					if(i.length = 65535 & x, x = 0, S = 0, i.mode = 15, 6 === t) break inf_leave;
				case 15:
					i.mode = 16;
				case 16:
					if(C = i.length, C) {
						if(C > k && (C = k), C > w && (C = w), 0 === C) break inf_leave;
						p.arraySet(g, d, y, C, b), k -= C, y += C, w -= C, b += C, i.length -= C;
						break
					}
					i.mode = 12;
					break;
				case 17:
					for(; 14 > S;) {
						if(0 === k) break inf_leave;
						k--, x += d[y++] << S, S += 8
					}
					if(i.nlen = (31 & x) + 257, x >>>= 5, S -= 5, i.ndist = (31 & x) + 1, x >>>= 5, S -= 5, i.ncode = (15 & x) + 4, x >>>= 4, S -= 4, 286 < i.nlen || 30 < i.ndist) {
						e.msg = "too many length or distance symbols", i.mode = 30;
						break
					}
					i.have = 0, i.mode = 18;
				case 18:
					for(; i.have < i.ncode;) {
						for(; 3 > S;) {
							if(0 === k) break inf_leave;
							k--, x += d[y++] << S, S += 8
						}
						i.lens[s[i.have++]] = 7 & x, x >>>= 3, S -= 3
					}
					for(; 19 > i.have;) i.lens[s[i.have++]] = 0;
					if(i.lencode = i.lendyn, i.lenbits = 7, U = {
							bits: i.lenbits
						}, P = _(0, i.lens, 0, 19, i.lencode, 0, i.work, U), i.lenbits = U.bits, P) {
						e.msg = "invalid code lengths set", i.mode = 30;
						break
					}
					i.have = 0, i.mode = 19;
				case 19:
					for(; i.have < i.nlen + i.ndist;) {
						for(;;) {
							if(a = i.lencode[x & (1 << i.lenbits) - 1], L = a >>> 24, R = 255 & a >>> 16, B = 65535 & a, L <= S) break;
							if(0 === k) break inf_leave;
							k--, x += d[y++] << S, S += 8
						}
						if(16 > B) x >>>= L, S -= L, i.lens[i.have++] = B;
						else {
							if(16 === B) {
								for(j = L + 2; S < j;) {
									if(0 === k) break inf_leave;
									k--, x += d[y++] << S, S += 8
								}
								if(x >>>= L, S -= L, 0 === i.have) {
									e.msg = "invalid bit length repeat", i.mode = 30;
									break
								}
								M = i.lens[i.have - 1], C = 3 + (3 & x), x >>>= 2, S -= 2
							} else if(17 === B) {
								for(j = L + 3; S < j;) {
									if(0 === k) break inf_leave;
									k--, x += d[y++] << S, S += 8
								}
								x >>>= L, S -= L, M = 0, C = 3 + (7 & x), x >>>= 3, S -= 3
							} else {
								for(j = L + 7; S < j;) {
									if(0 === k) break inf_leave;
									k--, x += d[y++] << S, S += 8
								}
								x >>>= L, S -= L, M = 0, C = 11 + (127 & x), x >>>= 7, S -= 7
							}
							if(i.have + C > i.nlen + i.ndist) {
								e.msg = "invalid bit length repeat", i.mode = 30;
								break
							}
							for(; C--;) i.lens[i.have++] = M
						}
					}
					if(30 === i.mode) break;
					if(0 === i.lens[256]) {
						e.msg = "invalid code -- missing end-of-block", i.mode = 30;
						break
					}
					if(i.lenbits = 9, U = {
							bits: i.lenbits
						}, P = _(1, i.lens, 0, i.nlen, i.lencode, 0, i.work, U), i.lenbits = U.bits, P) {
						e.msg = "invalid literal/lengths set", i.mode = 30;
						break
					}
					if(i.distbits = 6, i.distcode = i.distdyn, U = {
							bits: i.distbits
						}, P = _(2, i.lens, i.nlen, i.ndist, i.distcode, 0, i.work, U), i.distbits = U.bits, P) {
						e.msg = "invalid distances set", i.mode = 30;
						break
					}
					if(i.mode = 20, 6 === t) break inf_leave;
				case 20:
					i.mode = 21;
				case 21:
					if(6 <= k && 258 <= w) {
						e.next_out = b, e.avail_out = w, e.next_in = y, e.avail_in = k, i.hold = x, i.bits = S, h(e, E), b = e.next_out, g = e.output, w = e.avail_out, y = e.next_in, d = e.input, k = e.avail_in, x = i.hold, S = i.bits, 12 === i.mode && (i.back = -1);
						break
					}
					for(i.back = 0;;) {
						if(a = i.lencode[x & (1 << i.lenbits) - 1], L = a >>> 24, R = 255 & a >>> 16, B = 65535 & a, L <= S) break;
						if(0 === k) break inf_leave;
						k--, x += d[y++] << S, S += 8
					}
					if(R && 0 == (240 & R)) {
						for(A = L, O = R, D = B;;) {
							if(a = i.lencode[D + ((x & (1 << A + O) - 1) >> A)], L = a >>> 24, R = 255 & a >>> 16, B = 65535 & a, A + L <= S) break;
							if(0 === k) break inf_leave;
							k--, x += d[y++] << S, S += 8
						}
						x >>>= A, S -= A, i.back += A
					}
					if(x >>>= L, S -= L, i.back += L, i.length = B, 0 === R) {
						i.mode = 26;
						break
					}
					if(32 & R) {
						i.back = -1, i.mode = 12;
						break
					}
					if(64 & R) {
						e.msg = "invalid literal/length code", i.mode = 30;
						break
					}
					i.extra = 15 & R, i.mode = 22;
				case 22:
					if(i.extra) {
						for(j = i.extra; S < j;) {
							if(0 === k) break inf_leave;
							k--, x += d[y++] << S, S += 8
						}
						i.length += x & (1 << i.extra) - 1, x >>>= i.extra, S -= i.extra, i.back += i.extra
					}
					i.was = i.length, i.mode = 23;
				case 23:
					for(;;) {
						if(a = i.distcode[x & (1 << i.distbits) - 1], L = a >>> 24, R = 255 & a >>> 16, B = 65535 & a, L <= S) break;
						if(0 === k) break inf_leave;
						k--, x += d[y++] << S, S += 8
					}
					if(0 == (240 & R)) {
						for(A = L, O = R, D = B;;) {
							if(a = i.distcode[D + ((x & (1 << A + O) - 1) >> A)], L = a >>> 24, R = 255 & a >>> 16, B = 65535 & a, A + L <= S) break;
							if(0 === k) break inf_leave;
							k--, x += d[y++] << S, S += 8
						}
						x >>>= A, S -= A, i.back += A
					}
					if(x >>>= L, S -= L, i.back += L, 64 & R) {
						e.msg = "invalid distance code", i.mode = 30;
						break
					}
					i.offset = B, i.extra = 15 & R, i.mode = 24;
				case 24:
					if(i.extra) {
						for(j = i.extra; S < j;) {
							if(0 === k) break inf_leave;
							k--, x += d[y++] << S, S += 8
						}
						i.offset += x & (1 << i.extra) - 1, x >>>= i.extra, S -= i.extra, i.back += i.extra
					}
					if(i.offset > i.dmax) {
						e.msg = "invalid distance too far back", i.mode = 30;
						break
					}
					i.mode = 25;
				case 25:
					if(0 === w) break inf_leave;
					if(C = E - w, i.offset > C) {
						if(C = i.offset - C, C > i.whave && i.sane) {
							e.msg = "invalid distance too far back", i.mode = 30;
							break
						}
						C > i.wnext ? (C -= i.wnext, T = i.wsize - C) : T = i.wnext - C, C > i.length && (C = i.length), I = i.window
					} else I = g, T = b - i.offset, C = i.length;
					C > w && (C = w), w -= C, i.length -= C;
					do g[b++] = I[T++]; while (--C);
					0 === i.length && (i.mode = 21);
					break;
				case 26:
					if(0 === w) break inf_leave;
					g[b++] = i.length, w--, i.mode = 21;
					break;
				case 27:
					if(i.wrap) {
						for(; 32 > S;) {
							if(0 === k) break inf_leave;
							k--, x |= d[y++] << S, S += 8
						}
						if(E -= w, e.total_out += E, i.total += E, E && (e.adler = i.check = i.flags ? m(i.check, g, E, b - E) : f(i.check, g, E, b - E)), E = w, (i.flags ? x : r(x)) !== i.check) {
							e.msg = "incorrect data check", i.mode = 30;
							break
						}
						x = 0, S = 0
					}
					i.mode = 28;
				case 28:
					if(i.wrap && i.flags) {
						for(; 32 > S;) {
							if(0 === k) break inf_leave;
							k--, x += d[y++] << S, S += 8
						}
						if(x !== (4294967295 & i.total)) {
							e.msg = "incorrect length check", i.mode = 30;
							break
						}
						x = 0, S = 0
					}
					i.mode = 29;
				case 29:
					P = 1;
					break inf_leave;
				case 30:
					P = -3;
					break inf_leave;
				case 31:
					return -4;
				case 32:
				default:
					return -2;
			}
			return(e.next_out = b, e.avail_out = w, e.next_in = y, e.avail_in = k, i.hold = x, i.bits = S, (i.wsize || E !== e.avail_out && 30 > i.mode && (27 > i.mode || 4 !== t)) && c(e, e.output, e.next_out, E - e.avail_out)) ? (i.mode = 31, -4) : (v -= e.avail_in, E -= e.avail_out, e.total_in += v, e.total_out += E, i.total += E, i.wrap && E && (e.adler = i.check = i.flags ? m(i.check, g, E, e.next_out - E) : f(i.check, g, E, e.next_out - E)), e.data_type = i.bits + (i.last ? 64 : 0) + (12 === i.mode ? 128 : 0) + (20 === i.mode || 15 === i.mode ? 256 : 0), (0 === v && 0 === E || 4 === t) && 0 === P && (P = -5), P)
		}, n.inflateEnd = function(e) {
			if(!e || !e.state) return -2;
			var t = e.state;
			return t.window && (t.window = null), e.state = null, 0
		}, n.inflateGetHeader = function(e, t) {
			var n;
			return e && e.state ? (n = e.state, 0 == (2 & n.wrap)) ? -2 : (n.head = t, t.done = !1, 0) : -2
		}, n.inflateSetDictionary = function(e, t) {
			var n = t.length,
				r, a, o;
			return e && e.state ? (r = e.state, 0 !== r.wrap && 11 !== r.mode) ? -2 : 11 === r.mode && (a = 1, a = f(a, t, n, 0), a !== r.check) ? -3 : (o = c(e, t, n, n), o) ? (r.mode = 31, -4) : (r.havedict = 1, 0) : -2
		}, n.inflateInfo = "pako inflate (from Nodeca project)"
	}, {
		"../utils/common": 186,
		"./adler32": 188,
		"./crc32": 190,
		"./inffast": 193,
		"./inftrees": 195
	}],
	195: [function(e, t) {
		"use strict";
		var n = e("../utils/common"),
			r = 15,
			a = 852,
			o = 592,
			s = 0,
			i = 1,
			d = 2,
			l = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
			c = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
			u = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
			p = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
		t.exports = function(e, t, f, m, h, _, g, y) {
			var b = y.bits,
				k = 0,
				w = 0,
				x = 0,
				S = 0,
				v = 0,
				E = 0,
				C = 0,
				T = 0,
				I = 0,
				L = 0,
				R = null,
				B = 0,
				A = new n.Buf16(r + 1),
				O = new n.Buf16(r + 1),
				D = null,
				M = 0,
				P, U, j, N, z, H, F, W, q;
			for(k = 0; k <= r; k++) A[k] = 0;
			for(w = 0; w < m; w++) A[t[f + w]]++;
			for(v = b, S = r; 1 <= S && 0 === A[S]; S--);
			if(v > S && (v = S), 0 === S) return h[_++] = 20971520, h[_++] = 20971520, y.bits = 1, 0;
			for(x = 1; x < S && 0 === A[x]; x++);
			for(v < x && (v = x), T = 1, k = 1; k <= r; k++)
				if(T <<= 1, T -= A[k], 0 > T) return -1;
			if(0 < T && (e === s || 1 !== S)) return -1;
			for(O[1] = 0, k = 1; k < r; k++) O[k + 1] = O[k] + A[k];
			for(w = 0; w < m; w++) 0 !== t[f + w] && (g[O[t[f + w]]++] = w);
			if(e === s ? (R = D = g, H = 19) : e === i ? (R = l, B -= 257, D = c, M -= 257, H = 256) : (R = u, D = p, H = -1), L = 0, w = 0, k = x, z = _, E = v, C = 0, j = -1, I = 1 << v, N = I - 1, e === i && I > a || e === d && I > o) return 1;
			for(;;) {
				F = k - C, g[w] < H ? (W = 0, q = g[w]) : g[w] > H ? (W = D[M + g[w]], q = R[B + g[w]]) : (W = 96, q = 0), P = 1 << k - C, U = 1 << E, x = U;
				do U -= P, h[z + (L >> C) + U] = 0 | (F << 24 | W << 16 | q); while (0 !== U);
				for(P = 1 << k - 1; L & P;) P >>= 1;
				if(0 === P ? L = 0 : (L &= P - 1, L += P), w++, 0 == --A[k]) {
					if(k === S) break;
					k = t[f + g[w]]
				}
				if(k > v && (L & N) !== j) {
					for(0 === C && (C = v), z += x, E = k - C, T = 1 << E; E + C < S && (T -= A[E + C], !(0 >= T));) E++, T <<= 1;
					if(I += 1 << E, e === i && I > a || e === d && I > o) return 1;
					j = L & N, h[j] = 0 | (v << 24 | E << 16 | z - _)
				}
			}
			return 0 !== L && (h[z + L] = 0 | (4194304 | k - C << 24)), y.bits = v, 0
		}
	}, {
		"../utils/common": 186
	}],
	196: [function(e, t) {
		"use strict";
		t.exports = {
			2: "need dictionary",
			1: "stream end",
			0: "",
			"-1": "file error",
			"-2": "stream error",
			"-3": "data error",
			"-4": "insufficient memory",
			"-5": "buffer error",
			"-6": "incompatible version"
		}
	}, {}],
	197: [function(e, t, n) {
		"use strict";

		function r(e) {
			for(var t = e.length; 0 <= --t;) e[t] = 0
		}

		function a(e, t, n, r, a) {
			this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = r, this.max_length = a, this.has_stree = e && e.length
		}

		function o(e, t) {
			this.dyn_tree = e, this.max_code = 0, this.stat_desc = t
		}

		function i(e) {
			return 256 > e ? N[e] : N[256 + (e >>> 7)]
		}

		function d(e, t) {
			e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = 255 & t >>> 8
		}

		function l(e, t, n) {
			e.bi_valid > 16 - n ? (e.bi_buf |= 65535 & t << e.bi_valid, d(e, e.bi_buf), e.bi_buf = t >> 16 - e.bi_valid, e.bi_valid += n - 16) : (e.bi_buf |= 65535 & t << e.bi_valid, e.bi_valid += n)
		}

		function c(e, t, n) {
			l(e, n[2 * t], n[2 * t + 1])
		}

		function s(e, t) {
			var n = 0;
			do n |= 1 & e, e >>>= 1, n <<= 1; while (0 < --t);
			return n >>> 1
		}

		function u(e) {
			16 === e.bi_valid ? (d(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : 8 <= e.bi_valid && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8)
		}

		function p(e, t) {
			var r = t.dyn_tree,
				a = t.max_code,
				o = t.stat_desc.static_tree,
				s = t.stat_desc.has_stree,
				i = t.stat_desc.extra_bits,
				d = t.stat_desc.extra_base,
				l = t.stat_desc.max_length,
				c = 0,
				u, p, _, g, y, b;
			for(g = 0; g <= 15; g++) e.bl_count[g] = 0;
			for(r[2 * e.heap[e.heap_max] + 1] = 0, u = e.heap_max + 1; 573 > u; u++)(p = e.heap[u], g = r[2 * r[2 * p + 1] + 1] + 1, g > l && (g = l, c++), r[2 * p + 1] = g, !(p > a)) && (e.bl_count[g]++, y = 0, p >= d && (y = i[p - d]), b = r[2 * p], e.opt_len += b * (g + y), s && (e.static_len += b * (o[2 * p + 1] + y)));
			if(0 !== c) {
				do {
					for(g = l - 1; 0 === e.bl_count[g];) g--;
					e.bl_count[g]--, e.bl_count[g + 1] += 2, e.bl_count[l]--, c -= 2
				} while (0 < c);
				for(g = l; 0 !== g; g--)
					for(p = e.bl_count[g]; 0 !== p;)(_ = e.heap[--u], !(_ > a)) && (r[2 * _ + 1] !== g && (e.opt_len += (g - r[2 * _ + 1]) * r[2 * _], r[2 * _ + 1] = g), p--)
			}
		}

		function f(e, t, r) {
			var a = Array(16),
				o = 0,
				i, d;
			for(i = 1; i <= 15; i++) a[i] = o = o + r[i - 1] << 1;
			for(d = 0; d <= t; d++) {
				var l = e[2 * d + 1];
				0 !== l && (e[2 * d] = s(a[l]++, l))
			}
		}

		function m() {
			var e = Array(16),
				t, r, o, i, d;
			for(o = 0, i = 0; i < 28; i++)
				for(H[i] = o, t = 0; t < 1 << O[i]; t++) z[o++] = i;
			for(z[o - 1] = i, d = 0, i = 0; 16 > i; i++)
				for(F[i] = d, t = 0; t < 1 << D[i]; t++) N[d++] = i;
			for(d >>= 7; i < 30; i++)
				for(F[i] = d << 7, t = 0; t < 1 << D[i] - 7; t++) N[256 + d++] = i;
			for(r = 0; r <= 15; r++) e[r] = 0;
			for(t = 0; 143 >= t;) U[2 * t + 1] = 8, t++, e[8]++;
			for(; 255 >= t;) U[2 * t + 1] = 9, t++, e[9]++;
			for(; 279 >= t;) U[2 * t + 1] = 7, t++, e[7]++;
			for(; 287 >= t;) U[2 * t + 1] = 8, t++, e[8]++;
			for(f(U, 287, e), t = 0; t < 30; t++) j[2 * t + 1] = 5, j[2 * t] = s(t, 5);
			q = new a(U, O, 257, 286, 15), Y = new a(j, D, 0, 30, 15), G = new a([], M, 0, 19, 7)
		}

		function h(e) {
			var t;
			for(t = 0; t < 286; t++) e.dyn_ltree[2 * t] = 0;
			for(t = 0; t < 30; t++) e.dyn_dtree[2 * t] = 0;
			for(t = 0; t < 19; t++) e.bl_tree[2 * t] = 0;
			e.dyn_ltree[512] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0
		}

		function _(e) {
			8 < e.bi_valid ? d(e, e.bi_buf) : 0 < e.bi_valid && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0
		}

		function g(e, t, n, r) {
			_(e), r && (d(e, n), d(e, ~n)), L.arraySet(e.pending_buf, e.window, t, n, e.pending), e.pending += n
		}

		function y(e, t, n, r) {
			var a = 2 * t,
				o = 2 * n;
			return e[a] < e[o] || e[a] === e[o] && r[t] <= r[n]
		}

		function b(e, t, n) {
			for(var r = e.heap[n], a = n << 1; a <= e.heap_len && (a < e.heap_len && y(t, e.heap[a + 1], e.heap[a], e.depth) && a++, !y(t, r, e.heap[a], e.depth));) e.heap[n] = e.heap[a], n = a, a <<= 1;
			e.heap[n] = r
		}

		function k(e, t, n) {
			var r = 0,
				a, o, s, d;
			if(0 !== e.last_lit)
				do a = e.pending_buf[e.d_buf + 2 * r] << 8 | e.pending_buf[e.d_buf + 2 * r + 1], o = e.pending_buf[e.l_buf + r], r++, 0 === a ? c(e, o, t) : (s = z[o], c(e, s + 256 + 1, t), d = O[s], 0 !== d && (o -= H[s], l(e, o, d)), a--, s = i(a), c(e, s, n), d = D[s], 0 !== d && (a -= F[s], l(e, a, d))); while (r < e.last_lit);
			c(e, 256, t)
		}

		function w(e, t) {
			var r = t.dyn_tree,
				a = t.stat_desc.static_tree,
				o = t.stat_desc.has_stree,
				s = t.stat_desc.elems,
				i = -1,
				d, l, c;
			for(e.heap_len = 0, e.heap_max = 573, d = 0; d < s; d++) 0 === r[2 * d] ? r[2 * d + 1] = 0 : (e.heap[++e.heap_len] = i = d, e.depth[d] = 0);
			for(; 2 > e.heap_len;) c = e.heap[++e.heap_len] = 2 > i ? ++i : 0, r[2 * c] = 1, e.depth[c] = 0, e.opt_len--, o && (e.static_len -= a[2 * c + 1]);
			for(t.max_code = i, d = e.heap_len >> 1; 1 <= d; d--) b(e, r, d);
			c = s;
			do d = e.heap[1], e.heap[1] = e.heap[e.heap_len--], b(e, r, 1), l = e.heap[1], e.heap[--e.heap_max] = d, e.heap[--e.heap_max] = l, r[2 * c] = r[2 * d] + r[2 * l], e.depth[c] = (e.depth[d] >= e.depth[l] ? e.depth[d] : e.depth[l]) + 1, r[2 * d + 1] = r[2 * l + 1] = c, e.heap[1] = c++, b(e, r, 1); while (2 <= e.heap_len);
			e.heap[--e.heap_max] = e.heap[1], p(e, t), f(r, i, e.bl_count)
		}

		function x(e, t, r) {
			var a = -1,
				o = t[1],
				s = 0,
				i = 7,
				d = 4,
				l, c;
			for(0 === o && (i = 138, d = 3), t[2 * (r + 1) + 1] = 65535, l = 0; l <= r; l++) {
				if(c = o, o = t[2 * (l + 1) + 1], ++s < i && c === o) continue;
				else s < d ? e.bl_tree[2 * c] += s : 0 === c ? 10 >= s ? e.bl_tree[34]++ : e.bl_tree[36]++ : (c !== a && e.bl_tree[2 * c]++, e.bl_tree[32]++);
				s = 0, a = c, 0 === o ? (i = 138, d = 3) : c === o ? (i = 6, d = 3) : (i = 7, d = 4)
			}
		}

		function S(e, t, r) {
			var a = -1,
				o = t[1],
				s = 0,
				i = 7,
				d = 4,
				u, p;
			for(0 === o && (i = 138, d = 3), u = 0; u <= r; u++) {
				if(p = o, o = t[2 * (u + 1) + 1], ++s < i && p === o) continue;
				else if(s < d)
					do c(e, p, e.bl_tree); while (0 != --s);
				else 0 === p ? 10 >= s ? (c(e, 17, e.bl_tree), l(e, s - 3, 3)) : (c(e, 18, e.bl_tree), l(e, s - 11, 7)) : (p !== a && (c(e, p, e.bl_tree), s--), c(e, 16, e.bl_tree), l(e, s - 3, 2));
				s = 0, a = p, 0 === o ? (i = 138, d = 3) : p === o ? (i = 6, d = 3) : (i = 7, d = 4)
			}
		}

		function v(e) {
			var t;
			for(x(e, e.dyn_ltree, e.l_desc.max_code), x(e, e.dyn_dtree, e.d_desc.max_code), w(e, e.bl_desc), t = 18; 3 <= t && 0 === e.bl_tree[2 * P[t] + 1]; t--);
			return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t
		}

		function E(e, t, n, r) {
			var a;
			for(l(e, t - 257, 5), l(e, n - 1, 5), l(e, r - 4, 4), a = 0; a < r; a++) l(e, e.bl_tree[2 * P[a] + 1], 3);
			S(e, e.dyn_ltree, t - 1), S(e, e.dyn_dtree, n - 1)
		}

		function C(e) {
			var t = 4093624447,
				r;
			for(r = 0; 31 >= r; r++, t >>>= 1)
				if(1 & t && 0 !== e.dyn_ltree[2 * r]) return 0;
			if(0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return 1;
			for(r = 32; r < 256; r++)
				if(0 !== e.dyn_ltree[2 * r]) return 1;
			return 0
		}

		function T(e) {
			W || (m(), W = !0), e.l_desc = new o(e.dyn_ltree, q), e.d_desc = new o(e.dyn_dtree, Y), e.bl_desc = new o(e.bl_tree, G), e.bi_buf = 0, e.bi_valid = 0, h(e)
		}

		function I(e, t, n, r) {
			l(e, 0 + (r ? 1 : 0), 3), g(e, t, n, !0)
		}
		var L = e("../utils/common"),
			R = 29,
			B = 256 + 1 + R,
			A = 30,
			O = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
			D = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
			M = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
			P = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
			U = Array(2 * (B + 2));
		r(U);
		var j = Array(2 * A);
		r(j);
		var N = Array(512);
		r(N);
		var z = Array(258 - 3 + 1);
		r(z);
		var H = Array(R);
		r(H);
		var F = Array(A);
		r(F);
		var W = !1,
			q, Y, G;
		n._tr_init = T, n._tr_stored_block = I, n._tr_flush_block = function(e, t, n, r) {
			var a = 0,
				o, s;
			0 < e.level ? (e.strm.data_type === 2 && (e.strm.data_type = C(e)), w(e, e.l_desc), w(e, e.d_desc), a = v(e), o = e.opt_len + 3 + 7 >>> 3, s = e.static_len + 3 + 7 >>> 3, s <= o && (o = s)) : o = s = n + 5, n + 4 <= o && -1 !== t ? I(e, t, n, r) : e.strategy === 4 || s === o ? (l(e, 2 + (r ? 1 : 0), 3), k(e, U, j)) : (l(e, 4 + (r ? 1 : 0), 3), E(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, a + 1), k(e, e.dyn_ltree, e.dyn_dtree)), h(e), r && _(e)
		}, n._tr_tally = function(e, t, n) {
			return e.pending_buf[e.d_buf + 2 * e.last_lit] = 255 & t >>> 8, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & n, e.last_lit++, 0 === t ? e.dyn_ltree[2 * n]++ : (e.matches++, t--, e.dyn_ltree[2 * (z[n] + 256 + 1)]++, e.dyn_dtree[2 * i(t)]++), e.last_lit === e.lit_bufsize - 1
		}, n._tr_align = function(e) {
			l(e, 2, 3), c(e, 256, U), u(e)
		}
	}, {
		"../utils/common": 186
	}],
	198: [function(e, t) {
		"use strict";
		t.exports = function() {
			this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
		}
	}, {}],
	199: [function(e, t) {
		function n(e) {
			if(/^-?\d+$/.test(e)) return parseInt(e, 10);
			var t;
			if(t = e.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)) {
				var n = t[1],
					r = t[2],
					a = t[3];
				if(n && a) {
					n = parseInt(n), a = parseInt(a);
					var o = [],
						s = n < a ? 1 : -1;
					("-" == r || ".." == r || "\u2025" == r) && (a += s);
					for(var d = n; d != a; d += s) o.push(d);
					return o
				}
			}
			return []
		}
		t.exports.parse = function(e) {
			var t = e.split(","),
				r = t.map(function(e) {
					return n(e)
				});
			return 0 === r.length ? [] : 1 === r.length ? Array.isArray(r[0]) ? r[0] : r : r.reduce(function(e, t) {
				return Array.isArray(e) || (e = [e]), Array.isArray(t) || (t = [t]), e.concat(t)
			})
		}
	}, {}],
	200: [function(e, t) {
		(function(n, r) {
			function a(e) {
				if("string" == typeof e && /^(stream-)?magnet:/.test(e)) return m(e);
				if("string" == typeof e && (/^[a-f0-9]{40}$/i.test(e) || /^[a-z2-7]{32}$/i.test(e))) return m(`magnet:?xt=urn:btih:${e}`);
				if(r.isBuffer(e) && 20 === e.length) return m(`magnet:?xt=urn:btih:${e.toString("hex")}`);
				if(r.isBuffer(e)) return o(e);
				if(e && e.infoHash) return e.infoHash = e.infoHash.toLowerCase(), e.announce || (e.announce = []), "string" == typeof e.announce && (e.announce = [e.announce]), e.urlList || (e.urlList = []), e;
				throw new Error("Invalid torrent identifier")
			}

			function o(e) {
				r.isBuffer(e) && (e = c.decode(e)), l(e.info, "info"), l(e.info["name.utf-8"] || e.info.name, "info.name"), l(e.info["piece length"], "info['piece length']"), l(e.info.pieces, "info.pieces"), e.info.files ? e.info.files.forEach(e => {
					l("number" == typeof e.length, "info.files[0].length"), l(e["path.utf-8"] || e.path, "info.files[0].path")
				}) : l("number" == typeof e.info.length, "info.length");
				const t = {
					info: e.info,
					infoBuffer: c.encode(e.info),
					name: (e.info["name.utf-8"] || e.info.name).toString(),
					announce: []
				};
				t.infoHash = _.sync(t.infoBuffer), t.infoHashBuffer = r.from(t.infoHash, "hex"), void 0 !== e.info.private && (t.private = !!e.info.private), e["creation date"] && (t.created = new Date(1e3 * e["creation date"])), e["created by"] && (t.createdBy = e["created by"].toString()), r.isBuffer(e.comment) && (t.comment = e.comment.toString()), Array.isArray(e["announce-list"]) && 0 < e["announce-list"].length ? e["announce-list"].forEach(e => {
					e.forEach(e => {
						t.announce.push(e.toString())
					})
				}) : e.announce && t.announce.push(e.announce.toString()), r.isBuffer(e["url-list"]) && (e["url-list"] = 0 < e["url-list"].length ? [e["url-list"]] : []), t.urlList = (e["url-list"] || []).map(e => e.toString()), g(t.announce), g(t.urlList);
				const n = e.info.files || [e.info];
				t.files = n.map((e, r) => {
					const a = [].concat(t.name, e["path.utf-8"] || e.path || []).map(e => e.toString());
					return {
						path: h.join.apply(null, [h.sep].concat(a)).slice(1),
						name: a[a.length - 1],
						length: e.length,
						offset: n.slice(0, r).reduce(d, 0)
					}
				}), t.length = n.reduce(d, 0);
				const a = t.files[t.files.length - 1];
				return t.pieceLength = e.info["piece length"], t.lastPieceLength = (a.offset + a.length) % t.pieceLength || t.pieceLength, t.pieces = i(e.info.pieces), t
			}

			function s(e) {
				return "undefined" != typeof Blob && e instanceof Blob
			}

			function d(e, t) {
				return e + t.length
			}

			function i(e) {
				const t = [];
				for(let n = 0; n < e.length; n += 20) t.push(e.slice(n, n + 20).toString("hex"));
				return t
			}

			function l(e, t) {
				if(!e) throw new Error(`Torrent is missing required field: ${t}`)
			}
			const c = e("bencode"),
				u = e("blob-to-buffer"),
				p = e("fs"),
				f = e("simple-get"),
				m = e("magnet-uri"),
				h = e("path"),
				_ = e("simple-sha1"),
				g = e("uniq");
			t.exports = a, t.exports.remote = function(e, t) {
				function r(e) {
					try {
						o = a(e)
					} catch(e) {
						return t(e)
					}
					o && o.infoHash ? t(null, o) : t(new Error("Invalid torrent identifier"))
				}
				let o;
				if("function" != typeof t) throw new Error("second argument must be a Function");
				try {
					o = a(e)
				} catch(e) {}
				o && o.infoHash ? n.nextTick(() => {
					t(null, o)
				}) : s(e) ? u(e, (e, n) => e ? t(new Error(`Error converting Blob: ${e.message}`)) : void r(n)) : "function" == typeof f && /^https?:/.test(e) ? f.concat({
					url: e,
					timeout: 30000,
					headers: {
						"user-agent": "WebTorrent (https://webtorrent.io)"
					}
				}, (e, n, a) => e ? t(new Error(`Error downloading torrent: ${e.message}`)) : void r(a)) : "function" == typeof p.readFile && "string" == typeof e ? p.readFile(e, (e, n) => e ? t(new Error("Invalid torrent identifier")) : void r(n)) : n.nextTick(() => {
					t(new Error("Invalid torrent identifier"))
				})
			}, t.exports.toMagnetURI = m.encode, t.exports.toTorrentFile = function(e) {
				const t = {
					info: e.info
				};
				return t["announce-list"] = (e.announce || []).map(e => (t.announce || (t.announce = e), e = r.from(e, "utf8"), [e])), t["url-list"] = e.urlList || [], void 0 !== e.private && (t["private"] = +e.private), e.created && (t["creation date"] = 0 | e.created.getTime() / 1e3), e.createdBy && (t["created by"] = e.createdBy), e.comment && (t.comment = e.comment), c.encode(t)
			};
			(() => {
				r.alloc(0)
			})()
		}).call(this, e("_process"), e("buffer").Buffer)
	}, {
		_process: 205,
		bencode: 7,
		"blob-to-buffer": 24,
		buffer: 41,
		fs: 36,
		"magnet-uri": 142,
		path: 201,
		"simple-get": 243,
		"simple-sha1": 254,
		uniq: 307
	}],
	201: [function(e, t, n) {
		(function(e) {
			function t(e, t) {
				for(var n = 0, r = e.length - 1, a; 0 <= r; r--) a = e[r], "." === a ? e.splice(r, 1) : ".." === a ? (e.splice(r, 1), n++) : n && (e.splice(r, 1), n--);
				if(t)
					for(; n--; n) e.unshift("..");
				return e
			}

			function r(e) {
				"string" != typeof e && (e += "");
				var t = 0,
					n = -1,
					r = !0,
					a;
				for(a = e.length - 1; 0 <= a; --a)
					if(!(47 === e.charCodeAt(a))) - 1 === n && (r = !1, n = a + 1);
					else if(!r) {
					t = a + 1;
					break
				}
				return -1 === n ? "" : e.slice(t, n)
			}

			function a(e, t) {
				if(e.filter) return e.filter(t);
				for(var n = [], r = 0; r < e.length; r++) t(e[r], r, e) && n.push(e[r]);
				return n
			}
			n.resolve = function() {
				for(var n = "", r = !1, o = arguments.length - 1, s; - 1 <= o && !r; o--) {
					if(s = 0 <= o ? arguments[o] : e.cwd(), "string" != typeof s) throw new TypeError("Arguments to path.resolve must be strings");
					else if(!s) continue;
					n = s + "/" + n, r = "/" === s.charAt(0)
				}
				return n = t(a(n.split("/"), function(e) {
					return !!e
				}), !r).join("/"), (r ? "/" : "") + n || "."
			}, n.normalize = function(e) {
				var r = n.isAbsolute(e),
					s = "/" === o(e, -1);
				return e = t(a(e.split("/"), function(e) {
					return !!e
				}), !r).join("/"), e || r || (e = "."), e && s && (e += "/"), (r ? "/" : "") + e
			}, n.isAbsolute = function(e) {
				return "/" === e.charAt(0)
			}, n.join = function() {
				var e = Array.prototype.slice.call(arguments, 0);
				return n.normalize(a(e, function(e) {
					if("string" != typeof e) throw new TypeError("Arguments to path.join must be strings");
					return e
				}).join("/"))
			}, n.relative = function(e, t) {
				function r(e) {
					for(var t = 0; t < e.length && "" === e[t]; t++);
					for(var n = e.length - 1; 0 <= n && "" === e[n]; n--);
					return t > n ? [] : e.slice(t, n - t + 1)
				}
				e = n.resolve(e).substr(1), t = n.resolve(t).substr(1);
				for(var a = r(e.split("/")), o = r(t.split("/")), s = Math.min(a.length, o.length), d = s, l = 0; l < s; l++)
					if(a[l] !== o[l]) {
						d = l;
						break
					}
				for(var c = [], l = d; l < a.length; l++) c.push("..");
				return c = c.concat(o.slice(d)), c.join("/")
			}, n.sep = "/", n.delimiter = ":", n.dirname = function(e) {
				if("string" != typeof e && (e += ""), 0 === e.length) return ".";
				for(var t = e.charCodeAt(0), n = 47 === t, r = -1, a = !0, o = e.length - 1; 1 <= o; --o)
					if(t = e.charCodeAt(o), 47 !== t) a = !1;
					else if(!a) {
					r = o;
					break
				}
				return -1 === r ? n ? "/" : "." : n && 1 === r ? "/" : e.slice(0, r)
			}, n.basename = function(e, t) {
				var n = r(e);
				return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)), n
			}, n.extname = function(e) {
				"string" != typeof e && (e += "");
				for(var t = -1, n = 0, r = -1, a = !0, o = 0, s = e.length - 1, d; 0 <= s; --s) {
					if(d = e.charCodeAt(s), 47 === d) {
						if(!a) {
							n = s + 1;
							break
						}
						continue
					} - 1 === r && (a = !1, r = s + 1), 46 === d ? -1 === t ? t = s : 1 !== o && (o = 1) : -1 !== t && (o = -1)
				}
				return -1 === t || -1 === r || 0 === o || 1 === o && t === r - 1 && t === n + 1 ? "" : e.slice(t, r)
			};
			var o = function(e, t, n) {
				return e.substr(t, n)
			}
		}).call(this, e("_process"))
	}, {
		_process: 205
	}],
	202: [function(e, t) {
		for(var n = e("closest-to"), r = 1024, a = 13, o = []; 22 > a++;) o.push(Math.pow(2, a));
		t.exports = function(e) {
			return n(e / r, o)
		}
	}, {
		"closest-to": 53
	}],
	203: [function(e, t) {
		t.exports = function(e) {
			if("number" != typeof e || isNaN(e)) throw new TypeError("Expected a number, got " + typeof e);
			var t = 0 > e,
				n = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
			if(t && (e = -e), 1 > e) return(t ? "-" : "") + e + " B";
			var r = Math.min(Math.floor(Math.log(e) / 6.907755278982137), n.length - 1);
			e = +(e / Math.pow(1e3, r));
			var a = n[r];
			return 10 <= e || 0 == e % 1 ? (t ? "-" : "") + e.toFixed(0) + " " + a : (t ? "-" : "") + e.toFixed(1) + " " + a
		}
	}, {}],
	204: [function(e, t) {
		(function(e) {
			"use strict";
			t.exports = e.version && 0 !== e.version.indexOf("v0.") && (0 !== e.version.indexOf("v1.") || 0 === e.version.indexOf("v1.8.")) ? e : {
				nextTick: function(t, n, r, a) {
					if("function" != typeof t) throw new TypeError("\"callback\" argument must be a function");
					var o = arguments.length,
						s, d;
					switch(o) {
						case 0:
						case 1:
							return e.nextTick(t);
						case 2:
							return e.nextTick(function() {
								t.call(null, n)
							});
						case 3:
							return e.nextTick(function() {
								t.call(null, n, r)
							});
						case 4:
							return e.nextTick(function() {
								t.call(null, n, r, a)
							});
						default:
							for(s = Array(o - 1), d = 0; d < s.length;) s[d++] = arguments[d];
							return e.nextTick(function() {
								t.apply(null, s)
							});
					}
				}
			}
		}).call(this, e("_process"))
	}, {
		_process: 205
	}],
	205: [function(e, t) {
		function n() {
			throw new Error("setTimeout has not been defined")
		}

		function r() {
			throw new Error("clearTimeout has not been defined")
		}

		function a(t) {
			if(u === setTimeout) return setTimeout(t, 0);
			if((u === n || !u) && setTimeout) return u = setTimeout, setTimeout(t, 0);
			try {
				return u(t, 0)
			} catch(n) {
				try {
					return u.call(null, t, 0)
				} catch(n) {
					return u.call(this, t, 0)
				}
			}
		}

		function o(t) {
			if(p === clearTimeout) return clearTimeout(t);
			if((p === r || !p) && clearTimeout) return p = clearTimeout, clearTimeout(t);
			try {
				return p(t)
			} catch(n) {
				try {
					return p.call(null, t)
				} catch(n) {
					return p.call(this, t)
				}
			}
		}

		function s() {
			m && _ && (m = !1, _.length ? f = _.concat(f) : h = -1, f.length && d())
		}

		function d() {
			if(!m) {
				var e = a(s);
				m = !0;
				for(var t = f.length; t;) {
					for(_ = f, f = []; ++h < t;) _ && _[h].run();
					h = -1, t = f.length
				}
				_ = null, m = !1, o(e)
			}
		}

		function l(e, t) {
			this.fun = e, this.array = t
		}

		function i() {}
		var c = t.exports = {},
			u, p;
		(function() {
			try {
				u = "function" == typeof setTimeout ? setTimeout : n
			} catch(t) {
				u = n
			}
			try {
				p = "function" == typeof clearTimeout ? clearTimeout : r
			} catch(t) {
				p = r
			}
		})();
		var f = [],
			m = !1,
			h = -1,
			_;
		c.nextTick = function(e) {
			var t = Array(arguments.length - 1);
			if(1 < arguments.length)
				for(var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
			f.push(new l(e, t)), 1 !== f.length || m || a(d)
		}, l.prototype.run = function() {
			this.fun.apply(null, this.array)
		}, c.title = "browser", c.browser = !0, c.env = {}, c.argv = [], c.version = "", c.versions = {}, c.on = i, c.addListener = i, c.once = i, c.off = i, c.removeListener = i, c.removeAllListeners = i, c.emit = i, c.prependListener = i, c.prependOnceListener = i, c.listeners = function() {
			return []
		}, c.binding = function() {
			throw new Error("process.binding is not supported")
		}, c.cwd = function() {
			return "/"
		}, c.chdir = function() {
			throw new Error("process.chdir is not supported")
		}, c.umask = function() {
			return 0
		}
	}, {}],
	206: [function(e, t) {
		(function(n) {
			var r = e("once"),
				a = e("end-of-stream"),
				o = e("fs"),
				s = function() {},
				i = /^v?\.0/.test(n.version),
				d = function(e) {
					return "function" == typeof e
				},
				l = function(e) {
					return !!i && !!o && (e instanceof(o.ReadStream || s) || e instanceof(o.WriteStream || s)) && d(e.close)
				},
				c = function(e) {
					return e.setHeader && d(e.abort)
				},
				u = function(e, t, n, o) {
					o = r(o);
					var i = !1;
					e.on("close", function() {
						i = !0
					}), a(e, {
						readable: t,
						writable: n
					}, function(e) {
						return e ? o(e) : void(i = !0, o())
					});
					var u = !1;
					return function(t) {
						if(!i) return u ? void 0 : (u = !0, l(e) ? e.close(s) : c(e) ? e.abort() : d(e.destroy) ? e.destroy() : void o(t || new Error("stream was destroyed")))
					}
				},
				p = function(e) {
					e()
				},
				f = function(e, t) {
					return e.pipe(t)
				};
			t.exports = function() {
				var e = Array.prototype.slice.call(arguments),
					t = d(e[e.length - 1] || s) && e.pop() || s;
				if(Array.isArray(e[0]) && (e = e[0]), 2 > e.length) throw new Error("pump requires two streams per minimum");
				var n = e.map(function(a, o) {
						var s = o < e.length - 1;
						return u(a, s, 0 < o, function(e) {
							r || (r = e), e && n.forEach(p), s || (n.forEach(p), t(r))
						})
					}),
					r;
				return e.reduce(f)
			}
		}).call(this, e("_process"))
	}, {
		_process: 205,
		"end-of-stream": 81,
		fs: 35,
		once: 182
	}],
	207: [function(e, t, n) {
		(function(e) {
			(function(r) {
				function a(e) {
					throw new RangeError(k[e])
				}

				function o(e, t) {
					for(var n = e.length, r = []; n--;) r[n] = t(e[n]);
					return r
				}

				function s(e, t) {
					var n = e.split("@"),
						r = "";
					1 < n.length && (r = n[0] + "@", e = n[1]), e = e.replace(b, ".");
					var a = e.split("."),
						s = o(a, t).join(".");
					return r + s
				}

				function i(e) {
					for(var t = [], n = 0, r = e.length, a, o; n < r;) a = e.charCodeAt(n++), 55296 <= a && 56319 >= a && n < r ? (o = e.charCodeAt(n++), 56320 == (64512 & o) ? t.push(((1023 & a) << 10) + (1023 & o) + 65536) : (t.push(a), n--)) : t.push(a);
					return t
				}

				function d(e) {
					return o(e, function(e) {
						var t = "";
						return 65535 < e && (e -= 65536, t += w(55296 | 1023 & e >>> 10), e = 56320 | 1023 & e), t += w(e), t
					}).join("")
				}

				function l(e) {
					return 10 > e - 48 ? e - 22 : 26 > e - 65 ? e - 65 : 26 > e - 97 ? e - 97 : 36
				}

				function c(e, t) {
					return e + 22 + 75 * (26 > e) - ((0 != t) << 5)
				}

				function u(e, t, n) {
					var r = 0;
					for(e = n ? x(e / 700) : e >> 1, e += x(e / t); 455 < e; r += 36) e = x(e / 35);
					return x(r + 36 * e / (e + 38))
				}

				function p(e) {
					var r = [],
						o = e.length,
						s = 0,
						c = 128,
						p = 72,
						f, m, h, _, g, y, b, S, v, E;
					for(m = e.lastIndexOf("-"), 0 > m && (m = 0), h = 0; h < m; ++h) 128 <= e.charCodeAt(h) && a("not-basic"), r.push(e.charCodeAt(h));
					for(_ = 0 < m ? m + 1 : 0; _ < o;) {
						for(g = s, y = 1, b = 36;; b += 36) {
							if(_ >= o && a("invalid-input"), S = l(e.charCodeAt(_++)), (36 <= S || S > x((2147483647 - s) / y)) && a("overflow"), s += S * y, v = b <= p ? 1 : b >= p + 26 ? 26 : b - p, S < v) break;
							E = 36 - v, y > x(2147483647 / E) && a("overflow"), y *= E
						}
						f = r.length + 1, p = u(s - g, f, 0 == g), x(s / f) > 2147483647 - c && a("overflow"), c += x(s / f), s %= f, r.splice(s++, 0, c)
					}
					return d(r)
				}

				function f(e) {
					var r = [],
						o, s, d, l, p, f, h, _, g, y, b, S, v, E, C;
					for(e = i(e), S = e.length, o = 128, s = 0, p = 72, f = 0; f < S; ++f) b = e[f], 128 > b && r.push(w(b));
					for(d = l = r.length, l && r.push("-"); d < S;) {
						for(h = 2147483647, f = 0; f < S; ++f) b = e[f], b >= o && b < h && (h = b);
						for(v = d + 1, h - o > x((2147483647 - s) / v) && a("overflow"), s += (h - o) * v, o = h, f = 0; f < S; ++f)
							if(b = e[f], b < o && 2147483647 < ++s && a("overflow"), b == o) {
								for(_ = s, g = 36;; g += 36) {
									if(y = g <= p ? 1 : g >= p + 26 ? 26 : g - p, _ < y) break;
									C = _ - y, E = 36 - y, r.push(w(c(y + C % E, 0))), _ = x(C / E)
								}
								r.push(w(c(_, 0))), p = u(s, v, d == l), s = 0, ++d
							}++s, ++o
					}
					return r.join("")
				}
				var m = "object" == typeof n && n && !n.nodeType && n,
					h = "object" == typeof t && t && !t.nodeType && t,
					_ = "object" == typeof e && e;
				(_.global === _ || _.window === _ || _.self === _) && (r = _);
				var g = /^xn--/,
					y = /[^\x20-\x7E]/,
					b = /[\x2E\u3002\uFF0E\uFF61]/g,
					k = {
						overflow: "Overflow: input needs wider integers to process",
						"not-basic": "Illegal input >= 0x80 (not a basic code point)",
						"invalid-input": "Invalid input"
					},
					x = Math.floor,
					w = String.fromCharCode,
					S, v;
				if(S = {
						version: "1.4.1",
						ucs2: {
							decode: i,
							encode: d
						},
						decode: p,
						encode: f,
						toASCII: function(e) {
							return s(e, function(e) {
								return y.test(e) ? "xn--" + f(e) : e
							})
						},
						toUnicode: function(e) {
							return s(e, function(e) {
								return g.test(e) ? p(e.slice(4).toLowerCase()) : e
							})
						}
					}, "function" == typeof define && "object" == typeof define.amd && define.amd) define("punycode", function() {
					return S
				});
				else if(!(m && h)) r.punycode = S;
				else if(t.exports == m) h.exports = S;
				else
					for(v in S) S.hasOwnProperty(v) && (m[v] = S[v])
			})(this)
		}).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
	}, {}],
	208: [function(e, t) {
		"use strict";

		function n(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}
		t.exports = function(e, t, a, o) {
			t = t || "&", a = a || "=";
			var s = {};
			if("string" != typeof e || 0 === e.length) return s;
			var d = /\+/g;
			e = e.split(t);
			var l = 1e3;
			o && "number" == typeof o.maxKeys && (l = o.maxKeys);
			var c = e.length;
			0 < l && c > l && (c = l);
			for(var u = 0; u < c; ++u) {
				var p = e[u].replace(d, "%20"),
					f = p.indexOf(a),
					m, h, _, g;
				0 <= f ? (m = p.substr(0, f), h = p.substr(f + 1)) : (m = p, h = ""), _ = decodeURIComponent(m), g = decodeURIComponent(h), n(s, _) ? r(s[_]) ? s[_].push(g) : s[_] = [s[_], g] : s[_] = g
			}
			return s
		};
		var r = Array.isArray || function(e) {
			return "[object Array]" === Object.prototype.toString.call(e)
		}
	}, {}],
	209: [function(e, t) {
		"use strict";

		function n(e, t) {
			if(e.map) return e.map(t);
			for(var n = [], r = 0; r < e.length; r++) n.push(t(e[r], r));
			return n
		}
		var r = function(e) {
			switch(typeof e) {
				case "string":
					return e;
				case "boolean":
					return e ? "true" : "false";
				case "number":
					return isFinite(e) ? e : "";
				default:
					return "";
			}
		};
		t.exports = function(e, t, s, i) {
			return t = t || "&", s = s || "=", null === e && (e = void 0), "object" == typeof e ? n(o(e), function(o) {
				var i = encodeURIComponent(r(o)) + s;
				return a(e[o]) ? n(e[o], function(e) {
					return i + encodeURIComponent(r(e))
				}).join(t) : i + encodeURIComponent(r(e[o]))
			}).join(t) : i ? encodeURIComponent(r(i)) + s + encodeURIComponent(r(e)) : ""
		};
		var a = Array.isArray || function(e) {
				return "[object Array]" === Object.prototype.toString.call(e)
			},
			o = Object.keys || function(e) {
				var t = [];
				for(var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
				return t
			}
	}, {}],
	210: [function(e, t, n) {
		"use strict";
		n.decode = n.parse = e("./decode"), n.encode = n.stringify = e("./encode")
	}, {
		"./decode": 208,
		"./encode": 209
	}],
	211: [function(e, t) {
		t.exports = function(e) {
			var t = 0;
			return function() {
				if(t === e.length) return null;
				var n = e.length - t,
					r = 0 | Math.random() * n,
					a = e[t + r],
					o = e[t];
				return e[t] = a, e[t + r] = o, t++, a
			}
		}
	}, {}],
	212: [function(e, t) {
		(function(n, r) {
			"use strict";
			var a = e("safe-buffer").Buffer,
				o = r.crypto || r.msCrypto;
			t.exports = o && o.getRandomValues ? function(e, t) {
				if(65536 < e) throw new Error("requested too many random bytes");
				var s = new r.Uint8Array(e);
				0 < e && o.getRandomValues(s);
				var i = a.from(s.buffer);
				return "function" == typeof t ? n.nextTick(function() {
					t(null, i)
				}) : i
			} : function() {
				throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")
			}
		}).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
	}, {
		_process: 205,
		"safe-buffer": 241
	}],
	213: [function(e, t) {
		function n(e, t) {
			var r = this;
			return r instanceof n ? void(a.Writable.call(r, t), r.destroyed = !1, r._queue = [], r._position = e || 0, r._cb = null, r._buffer = null, r._out = null) : new n(e)
		}
		var r = e("inherits"),
			a = e("readable-stream");
		t.exports = n, r(n, a.Writable), n.prototype._write = function(e, t, n) {
			for(var r = this, a = !0;;) {
				if(r.destroyed) return;
				if(0 === r._queue.length) return r._buffer = e, void(r._cb = n);
				r._buffer = null;
				var o = r._queue[0],
					s = Math.max(o.start - r._position, 0),
					i = o.end - r._position;
				if(s >= e.length) return r._position += e.length, n(null);
				var d;
				if(i > e.length) {
					r._position += e.length, d = 0 === s ? e : e.slice(s), a = o.stream.write(d) && a;
					break
				}
				r._position += i, d = 0 === s && i === e.length ? e : e.slice(s, i), a = o.stream.write(d) && a, o.last && o.stream.end(), e = e.slice(i), r._queue.shift()
			}
			a ? n(null) : o.stream.once("drain", n.bind(null, null))
		}, n.prototype.slice = function(e) {
			var t = this;
			if(t.destroyed) return null;
			e instanceof Array || (e = [e]);
			var n = new a.PassThrough;
			return e.forEach(function(r, a) {
				t._queue.push({
					start: r.start,
					end: r.end,
					stream: n,
					last: a === e.length - 1
				})
			}), t._buffer && t._write(t._buffer, null, t._cb), n
		}, n.prototype.destroy = function(e) {
			var t = this;
			t.destroyed || (t.destroyed = !0, e && t.emit("error", e))
		}
	}, {
		inherits: 99,
		"readable-stream": 222
	}],
	214: [function(e, t, n) {
		arguments[4][11][0].apply(n, arguments)
	}, {
		"./_stream_readable": 216,
		"./_stream_writable": 218,
		"core-util-is": 75,
		dup: 11,
		inherits: 99,
		"process-nextick-args": 204
	}],
	215: [function(e, t, n) {
		arguments[4][12][0].apply(n, arguments)
	}, {
		"./_stream_transform": 217,
		"core-util-is": 75,
		dup: 12,
		inherits: 99
	}],
	216: [function(e, t, n) {
		arguments[4][13][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 214,
		"./internal/streams/BufferList": 219,
		"./internal/streams/destroy": 220,
		"./internal/streams/stream": 221,
		_process: 205,
		"core-util-is": 75,
		dup: 13,
		events: 82,
		inherits: 99,
		isarray: 104,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		"string_decoder/": 296,
		util: 35
	}],
	217: [function(e, t, n) {
		arguments[4][14][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 214,
		"core-util-is": 75,
		dup: 14,
		inherits: 99
	}],
	218: [function(e, t, n) {
		arguments[4][15][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 214,
		"./internal/streams/destroy": 220,
		"./internal/streams/stream": 221,
		_process: 205,
		"core-util-is": 75,
		dup: 15,
		inherits: 99,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		timers: 301,
		"util-deprecate": 313
	}],
	219: [function(e, t, n) {
		arguments[4][16][0].apply(n, arguments)
	}, {
		dup: 16,
		"safe-buffer": 241,
		util: 35
	}],
	220: [function(e, t, n) {
		arguments[4][17][0].apply(n, arguments)
	}, {
		dup: 17,
		"process-nextick-args": 204
	}],
	221: [function(e, t, n) {
		arguments[4][18][0].apply(n, arguments)
	}, {
		dup: 18,
		events: 82
	}],
	222: [function(e, t, n) {
		arguments[4][19][0].apply(n, arguments)
	}, {
		"./lib/_stream_duplex.js": 214,
		"./lib/_stream_passthrough.js": 215,
		"./lib/_stream_readable.js": 216,
		"./lib/_stream_transform.js": 217,
		"./lib/_stream_writable.js": 218,
		dup: 19
	}],
	223: [function(e, t) {
		"use strict";

		function n(e, t) {
			if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function r(e, t) {
			if(!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return t && ("object" == typeof t || "function" == typeof t) ? t : e
		}

		function a(e, t) {
			if("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
		}

		function o(e, t, o) {
			function s(e, n, r) {
				return "string" == typeof t ? t : t(e, n, r)
			}
			o || (o = Error);
			var i = function(e) {
				function t(e, a, o) {
					return n(this, t), r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, s(e, a, o)))
				}
				return a(t, e), t
			}(o);
			i.prototype.name = o.name, i.prototype.code = e, u[e] = i
		}

		function s(e, t) {
			if(Array.isArray(e)) {
				var n = e.length;
				return e = e.map(function(e) {
					return e + ""
				}), 2 < n ? "one of " + t + " " + e.slice(0, n - 1).join(", ") + ", or " + e[n - 1] : 2 === n ? "one of " + t + " " + e[0] + " or " + e[1] : "of " + t + " " + e[0]
			}
			return "of " + t + " " + (e + "")
		}

		function i(e, t, n) {
			return e.substr(!n || 0 > n ? 0 : +n, t.length) === t
		}

		function d(e, t, n) {
			return(void 0 === n || n > e.length) && (n = e.length), e.substring(n - t.length, n) === t
		}

		function l(e, t, n) {
			return "number" != typeof n && (n = 0), !(n + t.length > e.length) && -1 !== e.indexOf(t, n)
		}
		var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			},
			u = {};
		o("ERR_INVALID_OPT_VALUE", function(e, t) {
			return "The value \"" + t + "\" is invalid for option \"" + e + "\""
		}, TypeError), o("ERR_INVALID_ARG_TYPE", function(e, t, n) {
			var r;
			"string" == typeof t && i(t, "not ") ? (r = "must not be", t = t.replace(/^not /, "")) : r = "must be";
			var a;
			if(d(e, " argument")) a = "The " + e + " " + r + " " + s(t, "type");
			else {
				var o = l(e, ".") ? "property" : "argument";
				a = "The \"" + e + "\" " + o + " " + r + " " + s(t, "type")
			}
			return a += ". Received type " + ("undefined" == typeof n ? "undefined" : c(n)), a
		}, TypeError), o("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), o("ERR_METHOD_NOT_IMPLEMENTED", function(e) {
			return "The " + e + " method is not implemented"
		}), o("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), o("ERR_STREAM_DESTROYED", function(e) {
			return "Cannot call " + e + " after a stream was destroyed"
		}), o("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), o("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), o("ERR_STREAM_WRITE_AFTER_END", "write after end"), o("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), o("ERR_UNKNOWN_ENCODING", function(e) {
			return "Unknown encoding: " + e
		}, TypeError), o("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), t.exports.codes = u
	}, {}],
	224: [function(e, t) {
		(function(e) {
			"use strict";
			var n = new Set;
			t.exports.emitExperimentalWarning = function(t) {
				if(!n.has(t)) {
					n.add(t), e.emitWarning(t + " is an experimental feature. This feature could change at any time", "ExperimentalWarning")
				}
			}
		}).call(this, e("_process"))
	}, {
		_process: 205
	}],
	225: [function(e, t) {
		(function(n) {
			"use strict";

			function r(e) {
				return this instanceof r ? void(i.call(this, e), d.call(this, e), this.allowHalfOpen = !0, e && (!1 === e.readable && (this.readable = !1), !1 === e.writable && (this.writable = !1), !1 === e.allowHalfOpen && (this.allowHalfOpen = !1, this.once("end", a)))) : new r(e)
			}

			function a() {
				this._writableState.ended || n.nextTick(o, this)
			}

			function o(e) {
				e.end()
			}
			var s = Object.keys || function(e) {
				var t = [];
				for(var n in e) t.push(n);
				return t
			};
			t.exports = r;
			var i = e("./_stream_readable"),
				d = e("./_stream_writable");
			e("inherits")(r, i);
			for(var l = s(d.prototype), c = 0, u; c < l.length; c++) u = l[c], r.prototype[u] || (r.prototype[u] = d.prototype[u]);
			Object.defineProperty(r.prototype, "writableHighWaterMark", {
				enumerable: !1,
				get: function() {
					return this._writableState.highWaterMark
				}
			}), Object.defineProperty(r.prototype, "writableBuffer", {
				enumerable: !1,
				get: function() {
					return this._writableState && this._writableState.getBuffer()
				}
			}), Object.defineProperty(r.prototype, "writableLength", {
				enumerable: !1,
				get: function() {
					return this._writableState.length
				}
			}), Object.defineProperty(r.prototype, "destroyed", {
				enumerable: !1,
				get: function() {
					return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed
				},
				set: function(e) {
					void 0 === this._readableState || void 0 === this._writableState || (this._readableState.destroyed = e, this._writableState.destroyed = e)
				}
			})
		}).call(this, e("_process"))
	}, {
		"./_stream_readable": 227,
		"./_stream_writable": 229,
		_process: 205,
		inherits: 99
	}],
	226: [function(e, t) {
		"use strict";

		function n(e) {
			return this instanceof n ? void r.call(this, e) : new n(e)
		}
		t.exports = n;
		var r = e("./_stream_transform");
		e("inherits")(n, r), n.prototype._transform = function(e, t, n) {
			n(null, e)
		}
	}, {
		"./_stream_transform": 228,
		inherits: 99
	}],
	227: [function(e, t) {
		(function(n, r) {
			"use strict";

			function a(e) {
				return O.from(e)
			}

			function o(e) {
				return O.isBuffer(e) || e instanceof D
			}

			function s(e, t, n) {
				return "function" == typeof e.prependListener ? e.prependListener(t, n) : void(e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(n) : e._events[t] = [n, e._events[t]] : e.on(t, n))
			}

			function i(t, n, r) {
				L = L || e("./_stream_duplex"), t = t || {}, "boolean" != typeof r && (r = n instanceof L), this.objectMode = !!t.objectMode, r && (this.objectMode = this.objectMode || !!t.readableObjectMode), this.highWaterMark = z(this, t, "readableHighWaterMark", r), this.buffer = new U, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.emitClose = !1 !== t.emitClose, this.destroyed = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (!Z && (Z = e("string_decoder/").StringDecoder), this.decoder = new Z(t.encoding), this.encoding = t.encoding)
			}

			function d(t) {
				if(L = L || e("./_stream_duplex"), !(this instanceof d)) return new d(t);
				var n = this instanceof L;
				this._readableState = new i(t, this, n), this.readable = !0, t && ("function" == typeof t.read && (this._read = t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)), A.call(this)
			}

			function l(e, t, n, r, o) {
				P("readableAddChunk", t);
				var s = e._readableState;
				if(null === t) s.reading = !1, m(e, s);
				else {
					var i;
					if(o || (i = u(s, t)), i) e.emit("error", i);
					else if(!(s.objectMode || t && 0 < t.length)) r || (s.reading = !1, g(e, s));
					else if("string" == typeof t || s.objectMode || Object.getPrototypeOf(t) === O.prototype || (t = a(t)), r) s.endEmitted ? e.emit("error", new Y) : c(e, s, t, !0);
					else if(s.ended) e.emit("error", new W);
					else {
						if(s.destroyed) return !1;
						s.reading = !1, s.decoder && !n ? (t = s.decoder.write(t), s.objectMode || 0 !== t.length ? c(e, s, t, !1) : g(e, s)) : c(e, s, t, !1)
					}
				}
				return !s.ended && (s.length < s.highWaterMark || 0 === s.length)
			}

			function c(e, t, n, r) {
				t.flowing && 0 === t.length && !t.sync ? (t.awaitDrain = 0, e.emit("data", n)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), t.needReadable && h(e)), g(e, t)
			}

			function u(e, t) {
				var n;
				return o(t) || "string" == typeof t || void 0 === t || e.objectMode || (n = new F("chunk", ["string", "Buffer", "Uint8Array"], t)), n
			}

			function p(e) {
				return 8388608 <= e ? e = 8388608 : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e
			}

			function f(e, t) {
				return 0 >= e || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : Number.isNaN(e) ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = p(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0))
			}

			function m(e, t) {
				if(!t.ended) {
					if(t.decoder) {
						var n = t.decoder.end();
						n && n.length && (t.buffer.push(n), t.length += t.objectMode ? 1 : n.length)
					}
					t.ended = !0, t.sync ? h(e) : (t.needReadable = !1, !t.emittedReadable && (t.emittedReadable = !0, _(e)))
				}
			}

			function h(e) {
				var t = e._readableState;
				t.needReadable = !1, t.emittedReadable || (P("emitReadable", t.flowing), t.emittedReadable = !0, n.nextTick(_, e))
			}

			function _(e) {
				var t = e._readableState;
				P("emit readable"), !t.destroyed && (t.length || t.ended) && e.emit("readable"), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, v(e)
			}

			function g(e, t) {
				t.readingMore || (t.readingMore = !0, n.nextTick(y, e, t))
			}

			function y(e, t) {
				for(var n = t.length; !t.reading && !t.ended && t.length < t.highWaterMark && (P("maybeReadMore read 0"), e.read(0), n !== t.length);) n = t.length;
				t.readingMore = !1
			}

			function b(e) {
				return function() {
					var t = e._readableState;
					P("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && B(e, "data") && (t.flowing = !0, v(e))
				}
			}

			function k(e) {
				e._readableState.readableListening = 0 < e.listenerCount("readable")
			}

			function w(e) {
				P("readable nexttick read 0"), e.read(0)
			}

			function x(e, t) {
				t.resumeScheduled || (t.resumeScheduled = !0, n.nextTick(S, e, t))
			}

			function S(e, t) {
				P("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), v(e), t.flowing && !t.reading && e.read(0)
			}

			function v(e) {
				var t = e._readableState;
				for(P("flow", t.flowing); t.flowing && null !== e.read(););
			}

			function E(e, t) {
				if(0 === t.length) return null;
				var n;
				return t.objectMode ? n = t.buffer.shift() : !e || e >= t.length ? (n = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length), t.buffer.clear()) : n = t.buffer.consume(e, t.decoder), n
			}

			function C(e) {
				var t = e._readableState;
				P("endReadable", t.endEmitted), t.endEmitted || (t.ended = !0, n.nextTick(T, t, e))
			}

			function T(e, t) {
				P("endReadableNT", e.endEmitted, e.length), e.endEmitted || 0 !== e.length || (e.endEmitted = !0, t.readable = !1, t.emit("end"))
			}

			function I(e, t) {
				for(var n = 0, r = e.length; n < r; n++)
					if(e[n] === t) return n;
				return -1
			}
			t.exports = d;
			var L;
			d.ReadableState = i;
			var R = e("events").EventEmitter,
				B = function(e, t) {
					return e.listeners(t).length
				},
				A = e("./internal/streams/stream"),
				O = e("buffer").Buffer,
				D = r.Uint8Array || function() {},
				M = e("util"),
				P = void 0;
			P = M && M.debuglog ? M.debuglog("stream") : function() {};
			var U = e("./internal/streams/buffer_list"),
				j = e("./internal/streams/destroy"),
				N = e("./internal/streams/state"),
				z = N.getHighWaterMark,
				H = e("../errors").codes,
				F = H.ERR_INVALID_ARG_TYPE,
				W = H.ERR_STREAM_PUSH_AFTER_EOF,
				q = H.ERR_METHOD_NOT_IMPLEMENTED,
				Y = H.ERR_STREAM_UNSHIFT_AFTER_END_EVENT,
				G = e("../experimentalWarning"),
				V = G.emitExperimentalWarning,
				Z = void 0,
				K = void 0;
			e("inherits")(d, A);
			var X = ["error", "close", "destroy", "pause", "resume"];
			Object.defineProperty(d.prototype, "destroyed", {
				enumerable: !1,
				get: function() {
					return void 0 !== this._readableState && this._readableState.destroyed
				},
				set: function(e) {
					this._readableState && (this._readableState.destroyed = e)
				}
			}), d.prototype.destroy = j.destroy, d.prototype._undestroy = j.undestroy, d.prototype._destroy = function(e, t) {
				t(e)
			}, d.prototype.push = function(e, t) {
				var n = this._readableState,
					r;
				return n.objectMode ? r = !0 : "string" == typeof e && (t = t || n.defaultEncoding, t !== n.encoding && (e = O.from(e, t), t = ""), r = !0), l(this, e, t, !1, r)
			}, d.prototype.unshift = function(e) {
				return l(this, e, null, !0, !1)
			}, d.prototype.isPaused = function() {
				return !1 === this._readableState.flowing
			}, d.prototype.setEncoding = function(t) {
				return Z || (Z = e("string_decoder/").StringDecoder), this._readableState.decoder = new Z(t), this._readableState.encoding = this._readableState.decoder.encoding, this
			};
			d.prototype.read = function(e) {
				P("read", e), e = parseInt(e, 10);
				var t = this._readableState,
					r = e;
				if(0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && ((0 === t.highWaterMark ? 0 < t.length : t.length >= t.highWaterMark) || t.ended)) return P("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? C(this) : h(this), null;
				if(e = f(e, t), 0 === e && t.ended) return 0 === t.length && C(this), null;
				var a = t.needReadable;
				P("need readable", a), (0 === t.length || t.length - e < t.highWaterMark) && (a = !0, P("length less than watermark", a)), t.ended || t.reading ? (a = !1, P("reading or ended", a)) : a && (P("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, !t.reading && (e = f(r, t)));
				var o;
				return o = 0 < e ? E(e, t) : null, null === o ? (t.needReadable = !0, e = 0) : (t.length -= e, t.awaitDrain = 0), 0 === t.length && (!t.ended && (t.needReadable = !0), r !== e && t.ended && C(this)), null !== o && this.emit("data", o), o
			}, d.prototype._read = function() {
				this.emit("error", new q("_read()"))
			}, d.prototype.pipe = function(e, t) {
				function r(e, t) {
					P("onunpipe"), e === p && t && !1 === t.hasUnpiped && (t.hasUnpiped = !0, o())
				}

				function a() {
					P("onend"), e.end()
				}

				function o() {
					P("cleanup"), e.removeListener("close", l), e.removeListener("finish", c), e.removeListener("drain", _), e.removeListener("error", d), e.removeListener("unpipe", r), p.removeListener("end", a), p.removeListener("end", u), p.removeListener("data", i), g = !0, f.awaitDrain && (!e._writableState || e._writableState.needDrain) && _()
				}

				function i(t) {
					P("ondata");
					var n = e.write(t);
					P("dest.write", n), !1 === n && ((1 === f.pipesCount && f.pipes === e || 1 < f.pipesCount && -1 !== I(f.pipes, e)) && !g && (P("false write response, pause", f.awaitDrain), f.awaitDrain++), p.pause())
				}

				function d(t) {
					P("onerror", t), u(), e.removeListener("error", d), 0 === B(e, "error") && e.emit("error", t)
				}

				function l() {
					e.removeListener("finish", c), u()
				}

				function c() {
					P("onfinish"), e.removeListener("close", l), u()
				}

				function u() {
					P("unpipe"), p.unpipe(e)
				}
				var p = this,
					f = this._readableState;
				switch(f.pipesCount) {
					case 0:
						f.pipes = e;
						break;
					case 1:
						f.pipes = [f.pipes, e];
						break;
					default:
						f.pipes.push(e);
				}
				f.pipesCount += 1, P("pipe count=%d opts=%j", f.pipesCount, t);
				var m = (!t || !1 !== t.end) && e !== n.stdout && e !== n.stderr,
					h = m ? a : u;
				f.endEmitted ? n.nextTick(h) : p.once("end", h), e.on("unpipe", r);
				var _ = b(p);
				e.on("drain", _);
				var g = !1;
				return p.on("data", i), s(e, "error", d), e.once("close", l), e.once("finish", c), e.emit("pipe", p), f.flowing || (P("pipe resume"), p.resume()), e
			}, d.prototype.unpipe = function(e) {
				var t = this._readableState,
					n = {
						hasUnpiped: !1
					};
				if(0 === t.pipesCount) return this;
				if(1 === t.pipesCount) return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, n), this);
				if(!e) {
					var r = t.pipes,
						a = t.pipesCount;
					t.pipes = null, t.pipesCount = 0, t.flowing = !1;
					for(var o = 0; o < a; o++) r[o].emit("unpipe", this, {
						hasUnpiped: !1
					});
					return this
				}
				var s = I(t.pipes, e);
				return -1 === s ? this : (t.pipes.splice(s, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, n), this)
			}, d.prototype.on = function(e, t) {
				var r = A.prototype.on.call(this, e, t),
					a = this._readableState;
				return "data" === e ? (a.readableListening = 0 < this.listenerCount("readable"), !1 !== a.flowing && this.resume()) : "readable" == e && !a.endEmitted && !a.readableListening && (a.readableListening = a.needReadable = !0, a.emittedReadable = !1, P("on readable", a.length, a.reading), a.length ? h(this) : !a.reading && n.nextTick(w, this)), r
			}, d.prototype.addListener = d.prototype.on, d.prototype.removeListener = function(e, t) {
				var r = A.prototype.removeListener.call(this, e, t);
				return "readable" === e && n.nextTick(k, this), r
			}, d.prototype.removeAllListeners = function(e) {
				var t = A.prototype.removeAllListeners.apply(this, arguments);
				return("readable" === e || void 0 === e) && n.nextTick(k, this), t
			}, d.prototype.resume = function() {
				var e = this._readableState;
				return e.flowing || (P("resume"), e.flowing = !e.readableListening, x(this, e)), this
			}, d.prototype.pause = function() {
				return P("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (P("pause"), this._readableState.flowing = !1, this.emit("pause")), this
			}, d.prototype.wrap = function(e) {
				var t = this,
					r = this._readableState,
					a = !1;
				for(var o in e.on("end", function() {
						if(P("wrapped end"), r.decoder && !r.ended) {
							var e = r.decoder.end();
							e && e.length && t.push(e)
						}
						t.push(null)
					}), e.on("data", function(n) {
						if((P("wrapped data"), r.decoder && (n = r.decoder.write(n)), !(r.objectMode && (null === n || void 0 === n))) && (r.objectMode || n && n.length)) {
							var o = t.push(n);
							o || (a = !0, e.pause())
						}
					}), e) void 0 === this[o] && "function" == typeof e[o] && (this[o] = function(t) {
					return function() {
						return e[t].apply(e, arguments)
					}
				}(o));
				for(var s = 0; s < X.length; s++) e.on(X[s], this.emit.bind(this, X[s]));
				return this._read = function(t) {
					P("wrapped _read", t), a && (a = !1, e.resume())
				}, this
			}, d.prototype[Symbol.asyncIterator] = function() {
				return V("Readable[Symbol.asyncIterator]"), void 0 === K && (K = e("./internal/streams/async_iterator")), new K(this)
			}, Object.defineProperty(d.prototype, "readableHighWaterMark", {
				enumerable: !1,
				get: function() {
					return this._readableState.highWaterMark
				}
			}), Object.defineProperty(d.prototype, "readableBuffer", {
				enumerable: !1,
				get: function() {
					return this._readableState && this._readableState.buffer
				}
			}), Object.defineProperty(d.prototype, "readableFlowing", {
				enumerable: !1,
				get: function() {
					return this._readableState.flowing
				},
				set: function(e) {
					this._readableState && (this._readableState.flowing = e)
				}
			}), d._fromList = E, Object.defineProperty(d.prototype, "readableLength", {
				enumerable: !1,
				get: function() {
					return this._readableState.length
				}
			})
		}).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
	}, {
		"../errors": 223,
		"../experimentalWarning": 224,
		"./_stream_duplex": 225,
		"./internal/streams/async_iterator": 230,
		"./internal/streams/buffer_list": 231,
		"./internal/streams/destroy": 232,
		"./internal/streams/state": 233,
		"./internal/streams/stream": 234,
		_process: 205,
		buffer: 41,
		events: 82,
		inherits: 99,
		"string_decoder/": 296,
		util: 35
	}],
	228: [function(e, t) {
		"use strict";

		function n(e, t) {
			var n = this._transformState;
			n.transforming = !1;
			var r = n.writecb;
			if(null === r) return this.emit("error", new d);
			n.writechunk = null, n.writecb = null, null != t && this.push(t), r(e);
			var a = this._readableState;
			a.reading = !1, (a.needReadable || a.length < a.highWaterMark) && this._read(a.highWaterMark)
		}

		function r(e) {
			return this instanceof r ? void(u.call(this, e), this._transformState = {
				afterTransform: n.bind(this),
				needTransform: !1,
				transforming: !1,
				writecb: null,
				writechunk: null,
				writeencoding: null
			}, this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.on("prefinish", a)) : new r(e)
		}

		function a() {
			var e = this;
			"function" != typeof this._flush || this._readableState.destroyed ? o(this, null, null) : this._flush(function(t, n) {
				o(e, t, n)
			})
		}

		function o(e, t, n) {
			if(t) return e.emit("error", t);
			if(null != n && e.push(n), e._writableState.length) throw new c;
			if(e._transformState.transforming) throw new l;
			return e.push(null)
		}
		t.exports = r;
		var s = e("../errors").codes,
			i = s.ERR_METHOD_NOT_IMPLEMENTED,
			d = s.ERR_MULTIPLE_CALLBACK,
			l = s.ERR_TRANSFORM_ALREADY_TRANSFORMING,
			c = s.ERR_TRANSFORM_WITH_LENGTH_0,
			u = e("./_stream_duplex");
		e("inherits")(r, u), r.prototype.push = function(e, t) {
			return this._transformState.needTransform = !1, u.prototype.push.call(this, e, t)
		}, r.prototype._transform = function(e, t, n) {
			n(new i("_transform()"))
		}, r.prototype._write = function(e, t, n) {
			var r = this._transformState;
			if(r.writecb = n, r.writechunk = e, r.writeencoding = t, !r.transforming) {
				var a = this._readableState;
				(r.needTransform || a.needReadable || a.length < a.highWaterMark) && this._read(a.highWaterMark)
			}
		}, r.prototype._read = function() {
			var e = this._transformState;
			null === e.writechunk || e.transforming ? e.needTransform = !0 : (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform))
		}, r.prototype._destroy = function(e, t) {
			u.prototype._destroy.call(this, e, function(e) {
				t(e)
			})
		}
	}, {
		"../errors": 223,
		"./_stream_duplex": 225,
		inherits: 99
	}],
	229: [function(e, t) {
		(function(n, r) {
			"use strict";

			function a(e) {
				var t = this;
				this.next = null, this.entry = null, this.finish = function() {
					C(t, e)
				}
			}

			function o(e) {
				return R.from(e)
			}

			function s(e) {
				return R.isBuffer(e) || e instanceof B
			}

			function i() {}

			function d(t, n, r) {
				T = T || e("./_stream_duplex"), t = t || {}, "boolean" != typeof r && (r = n instanceof T), this.objectMode = !!t.objectMode, r && (this.objectMode = this.objectMode || !!t.writableObjectMode), this.highWaterMark = D(this, t, "writableHighWaterMark", r), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
				var o = !1 === t.decodeStrings;
				this.decodeStrings = !o, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(e) {
					g(n, e)
				}, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !1 !== t.emitClose, this.bufferedRequestCount = 0, this.corkedRequestsFree = new a(this)
			}

			function l(t) {
				T = T || e("./_stream_duplex");
				var n = this instanceof T;
				return n || q.call(l, this) ? void(this._writableState = new d(t, this, n), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev), "function" == typeof t.destroy && (this._destroy = t.destroy), "function" == typeof t.final && (this._final = t.final)), L.call(this)) : new l(t)
			}

			function c(e, t) {
				var r = new F;
				e.emit("error", r), n.nextTick(t, r)
			}

			function u(e, t, r, a) {
				var o;
				return null === r ? o = new H : "string" != typeof r && !t.objectMode && (o = new P("chunk", ["string", "Buffer"], r)), !o || (e.emit("error", o), n.nextTick(a, o), !1)
			}

			function p(e, t, n) {
				return e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = R.from(t, n)), t
			}

			function f(e, t, n, r, a, o) {
				if(!n) {
					var s = p(t, r, a);
					r !== s && (n = !0, a = "buffer", r = s)
				}
				var i = t.objectMode ? 1 : r.length;
				t.length += i;
				var d = t.length < t.highWaterMark;
				if(d || (t.needDrain = !0), t.writing || t.corked) {
					var l = t.lastBufferedRequest;
					t.lastBufferedRequest = {
						chunk: r,
						encoding: a,
						isBuf: n,
						callback: o,
						next: null
					}, l ? l.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1
				} else m(e, t, !1, i, r, a, o);
				return d
			}

			function m(e, t, n, r, a, o, s) {
				t.writelen = r, t.writecb = s, t.writing = !0, t.sync = !0, t.destroyed ? t.onwrite(new z("write")) : n ? e._writev(a, t.onwrite) : e._write(a, o, t.onwrite), t.sync = !1
			}

			function h(e, t, r, a, o) {
				--t.pendingcb, r ? (n.nextTick(o, a), n.nextTick(v, e, t), e._writableState.errorEmitted = !0, e.emit("error", a)) : (o(a), e._writableState.errorEmitted = !0, e.emit("error", a), v(e, t))
			}

			function _(e) {
				e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0
			}

			function g(e, t) {
				var r = e._writableState,
					a = r.sync,
					o = r.writecb;
				if("function" != typeof o) throw new j;
				if(_(r), t) h(e, r, a, t, o);
				else {
					var s = w(r);
					s || r.corked || r.bufferProcessing || !r.bufferedRequest || k(e, r), a ? n.nextTick(y, e, r, s, o) : y(e, r, s, o)
				}
			}

			function y(e, t, n, r) {
				n || b(e, t), t.pendingcb--, r(), v(e, t)
			}

			function b(e, t) {
				0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"))
			}

			function k(e, t) {
				t.bufferProcessing = !0;
				var n = t.bufferedRequest;
				if(e._writev && n && n.next) {
					var r = t.bufferedRequestCount,
						o = Array(r),
						s = t.corkedRequestsFree;
					s.entry = n;
					for(var i = 0, d = !0; n;) o[i] = n, n.isBuf || (d = !1), n = n.next, i += 1;
					o.allBuffers = d, m(e, t, !0, t.length, o, "", s.finish), t.pendingcb++, t.lastBufferedRequest = null, s.next ? (t.corkedRequestsFree = s.next, s.next = null) : t.corkedRequestsFree = new a(t), t.bufferedRequestCount = 0
				} else {
					for(; n;) {
						var l = n.chunk,
							c = n.encoding,
							u = n.callback,
							p = t.objectMode ? 1 : l.length;
						if(m(e, t, !1, p, l, c, u), n = n.next, t.bufferedRequestCount--, t.writing) break
					}
					null === n && (t.lastBufferedRequest = null)
				}
				t.bufferedRequest = n, t.bufferProcessing = !1
			}

			function w(e) {
				return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
			}

			function x(e, t) {
				e._final(function(n) {
					t.pendingcb--, n && e.emit("error", n), t.prefinished = !0, e.emit("prefinish"), v(e, t)
				})
			}

			function S(e, t) {
				t.prefinished || t.finalCalled || ("function" != typeof e._final || t.destroyed ? (t.prefinished = !0, e.emit("prefinish")) : (t.pendingcb++, t.finalCalled = !0, n.nextTick(x, e, t)))
			}

			function v(e, t) {
				var n = w(t);
				return n && (S(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"))), n
			}

			function E(e, t, r) {
				t.ending = !0, v(e, t), r && (t.finished ? n.nextTick(r) : e.once("finish", r)), t.ended = !0, e.writable = !1
			}

			function C(e, t, n) {
				var r = e.entry;
				for(e.entry = null; r;) {
					var a = r.callback;
					t.pendingcb--, a(n), r = r.next
				}
				t.corkedRequestsFree.next = e
			}
			t.exports = l;
			var T;
			l.WritableState = d;
			var I = {
					deprecate: e("util-deprecate")
				},
				L = e("./internal/streams/stream"),
				R = e("buffer").Buffer,
				B = r.Uint8Array || function() {},
				A = e("./internal/streams/destroy"),
				O = e("./internal/streams/state"),
				D = O.getHighWaterMark,
				M = e("../errors").codes,
				P = M.ERR_INVALID_ARG_TYPE,
				U = M.ERR_METHOD_NOT_IMPLEMENTED,
				j = M.ERR_MULTIPLE_CALLBACK,
				N = M.ERR_STREAM_CANNOT_PIPE,
				z = M.ERR_STREAM_DESTROYED,
				H = M.ERR_STREAM_NULL_VALUES,
				F = M.ERR_STREAM_WRITE_AFTER_END,
				W = M.ERR_UNKNOWN_ENCODING;
			e("inherits")(l, L), d.prototype.getBuffer = function() {
					for(var e = this.bufferedRequest, t = []; e;) t.push(e), e = e.next;
					return t
				},
				function() {
					try {
						Object.defineProperty(d.prototype, "buffer", {
							get: I.deprecate(function() {
								return this.getBuffer()
							}, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
						})
					} catch(e) {}
				}();
			var q;
			"function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (q = Function.prototype[Symbol.hasInstance], Object.defineProperty(l, Symbol.hasInstance, {
				value: function(e) {
					return !!q.call(this, e) || !(this !== l) && e && e._writableState instanceof d
				}
			})) : q = function(e) {
				return e instanceof this
			}, l.prototype.pipe = function() {
				this.emit("error", new N)
			}, l.prototype.write = function(e, t, n) {
				var r = this._writableState,
					a = !1,
					d = !r.objectMode && s(e);
				return d && !R.isBuffer(e) && (e = o(e)), "function" == typeof t && (n = t, t = null), d ? t = "buffer" : !t && (t = r.defaultEncoding), "function" != typeof n && (n = i), r.ending ? c(this, n) : (d || u(this, r, e, n)) && (r.pendingcb++, a = f(this, r, d, e, t, n)), a
			}, l.prototype.cork = function() {
				this._writableState.corked++
			}, l.prototype.uncork = function() {
				var e = this._writableState;
				e.corked && (e.corked--, !e.writing && !e.corked && !e.bufferProcessing && e.bufferedRequest && k(this, e))
			}, l.prototype.setDefaultEncoding = function(e) {
				if("string" == typeof e && (e = e.toLowerCase()), !(-1 < ["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()))) throw new W(e);
				return this._writableState.defaultEncoding = e, this
			}, Object.defineProperty(l.prototype, "writableBuffer", {
				enumerable: !1,
				get: function() {
					return this._writableState && this._writableState.getBuffer()
				}
			}), Object.defineProperty(l.prototype, "writableHighWaterMark", {
				enumerable: !1,
				get: function() {
					return this._writableState.highWaterMark
				}
			}), l.prototype._write = function(e, t, n) {
				n(new U("_write()"))
			}, l.prototype._writev = null, l.prototype.end = function(e, t, n) {
				var r = this._writableState;
				return "function" == typeof e ? (n = e, e = null, t = null) : "function" == typeof t && (n = t, t = null), null !== e && void 0 !== e && this.write(e, t), r.corked && (r.corked = 1, this.uncork()), r.ending || E(this, r, n), this
			}, Object.defineProperty(l.prototype, "writableLength", {
				enumerable: !1,
				get: function() {
					return this._writableState.length
				}
			}), Object.defineProperty(l.prototype, "destroyed", {
				enumerable: !1,
				get: function() {
					return void 0 !== this._writableState && this._writableState.destroyed
				},
				set: function(e) {
					this._writableState && (this._writableState.destroyed = e)
				}
			}), l.prototype.destroy = A.destroy, l.prototype._undestroy = A.undestroy, l.prototype._destroy = function(e, t) {
				t(e)
			}
		}).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
	}, {
		"../errors": 223,
		"./_stream_duplex": 225,
		"./internal/streams/destroy": 232,
		"./internal/streams/state": 233,
		"./internal/streams/stream": 234,
		_process: 205,
		buffer: 41,
		inherits: 99,
		"util-deprecate": 313
	}],
	230: [function(e, t) {
		(function(e) {
			"use strict";

			function n(e, t) {
				if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}

			function r(e) {
				var t = e[l];
				if(null !== t) {
					var n = e[h].read();
					null !== n && (e[f] = null, e[l] = null, e[c] = null, t(new _(n, !1)))
				}
			}

			function a(t) {
				e.nextTick(r, t)
			}

			function o(e) {
				var t = e[l];
				null !== t && (e[f] = null, e[l] = null, e[c] = null, t(new _(null, !0))), e[p] = !0
			}

			function s(e, t) {
				var n = e[c];
				null !== n && (e[f] = null, e[l] = null, e[c] = null, n(t)), e[u] = t
			}

			function i(e, t) {
				return function(n, r) {
					e.then(function() {
						t[m](n, r)
					}, r)
				}
			}
			var d = function() {
					function e(e, t) {
						for(var n = 0, r; n < t.length; n++) r = t[n], r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
					return function(t, n, r) {
						return n && e(t.prototype, n), r && e(t, r), t
					}
				}(),
				l = Symbol("lastResolve"),
				c = Symbol("lastReject"),
				u = Symbol("error"),
				p = Symbol("ended"),
				f = Symbol("lastPromise"),
				m = Symbol("handlePromise"),
				h = Symbol("stream"),
				_ = function e(t, r) {
					n(this, e), this.done = r, this.value = t
				},
				g = function() {
					function e(t) {
						var r = this;
						n(this, e), this[h] = t, this[l] = null, this[c] = null, this[u] = null, this[p] = !1, this[f] = null, t.on("readable", a.bind(null, this)), t.on("end", o.bind(null, this)), t.on("error", s.bind(null, this)), this[m] = function(e, t) {
							var n = r[h].read();
							n ? (r[f] = null, r[l] = null, r[c] = null, e(new _(n, !1))) : (r[l] = e, r[c] = t)
						}
					}
					return e.prototype.next = function() {
						var e = this[u];
						if(null !== e) return Promise.reject(e);
						if(this[p]) return Promise.resolve(new _(null, !0));
						var t = this[f],
							n = void 0;
						if(t) n = new Promise(i(t, this));
						else {
							var r = this[h].read();
							if(null !== r) return Promise.resolve(new _(r, !1));
							n = new Promise(this[m])
						}
						return this[f] = n, n
					}, e.prototype.return = function() {
						var e = this;
						return new Promise(function(t, n) {
							e[h].destroy(null, function(e) {
								return e ? void n(e) : void t(new _(null, !0))
							})
						})
					}, d(e, [{
						key: "stream",
						get: function() {
							return this[h]
						}
					}]), e
				}();
			t.exports = g
		}).call(this, e("_process"))
	}, {
		_process: 205
	}],
	231: [function(e, t) {
		"use strict";

		function n(e, t) {
			if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function r(e, t, n) {
			o.prototype.copy.call(e, t, n)
		}
		var a = e("buffer"),
			o = a.Buffer,
			s = e("util"),
			i = s.inspect,
			d = i && d || "inspect";
		t.exports = function() {
			function e() {
				n(this, e), this.head = null, this.tail = null, this.length = 0
			}
			return e.prototype.push = function(e) {
				var t = {
					data: e,
					next: null
				};
				0 < this.length ? this.tail.next = t : this.head = t, this.tail = t, ++this.length
			}, e.prototype.unshift = function(e) {
				var t = {
					data: e,
					next: this.head
				};
				0 === this.length && (this.tail = t), this.head = t, ++this.length
			}, e.prototype.shift = function() {
				if(0 !== this.length) {
					var e = this.head.data;
					return this.head = 1 === this.length ? this.tail = null : this.head.next, --this.length, e
				}
			}, e.prototype.clear = function() {
				this.head = this.tail = null, this.length = 0
			}, e.prototype.join = function(e) {
				if(0 === this.length) return "";
				for(var t = this.head, n = "" + t.data; t = t.next;) n += e + t.data;
				return n
			}, e.prototype.concat = function(e) {
				if(0 === this.length) return o.alloc(0);
				for(var t = o.allocUnsafe(e >>> 0), n = this.head, a = 0; n;) r(n.data, t, a), a += n.data.length, n = n.next;
				return t
			}, e.prototype.consume = function(e, t) {
				var n;
				return e < this.head.data.length ? (n = this.head.data.slice(0, e), this.head.data = this.head.data.slice(e)) : e === this.head.data.length ? n = this.shift() : n = t ? this._getString(e) : this._getBuffer(e), n
			}, e.prototype.first = function() {
				return this.head.data
			}, e.prototype._getString = function(e) {
				var t = this.head,
					r = 1,
					a = t.data;
				for(e -= a.length; t = t.next;) {
					var o = t.data,
						s = e > o.length ? o.length : e;
					if(a += s === o.length ? o : o.slice(0, e), e -= s, 0 === e) {
						s === o.length ? (++r, this.head = t.next ? t.next : this.tail = null) : (this.head = t, t.data = o.slice(s));
						break
					}++r
				}
				return this.length -= r, a
			}, e.prototype._getBuffer = function(e) {
				var t = o.allocUnsafe(e),
					r = this.head,
					a = 1;
				for(r.data.copy(t), e -= r.data.length; r = r.next;) {
					var s = r.data,
						i = e > s.length ? s.length : e;
					if(s.copy(t, t.length - e, 0, i), e -= i, 0 === e) {
						i === s.length ? (++a, this.head = r.next ? r.next : this.tail = null) : (this.head = r, r.data = s.slice(i));
						break
					}++a
				}
				return this.length -= a, t
			}, e.prototype[d] = function() {
				var e = i({
					length: this.length
				});
				return this.constructor.name + " " + e
			}, e
		}()
	}, {
		buffer: 41,
		util: 35
	}],
	232: [function(e, t) {
		(function(e) {
			"use strict";

			function n(e, t) {
				a(e, t), r(e)
			}

			function r(e) {
				e._writableState && !e._writableState.emitClose || e._readableState && !e._readableState.emitClose || e.emit("close")
			}

			function a(e, t) {
				e.emit("error", t)
			}
			t.exports = {
				destroy: function(t, o) {
					var s = this,
						i = this._readableState && this._readableState.destroyed,
						d = this._writableState && this._writableState.destroyed;
					return i || d ? (o ? o(t) : t && (!this._writableState || !this._writableState.errorEmitted) && e.nextTick(a, this, t), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(t || null, function(t) {
						!o && t ? (e.nextTick(n, s, t), s._writableState && (s._writableState.errorEmitted = !0)) : o ? (e.nextTick(r, s), o(t)) : e.nextTick(r, s)
					}), this)
				},
				undestroy: function() {
					this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
				}
			}
		}).call(this, e("_process"))
	}, {
		_process: 205
	}],
	233: [function(e, t) {
		"use strict";

		function n(e, t, n) {
			return null == e.highWaterMark ? t ? e[n] : null : e.highWaterMark
		}
		var r = e("../../../errors").codes.ERR_INVALID_OPT_VALUE;
		t.exports = {
			getHighWaterMark: function(e, t, a, o) {
				var s = n(t, o, a);
				if(null != s) {
					if(!Number.isInteger(s) || 0 > s) {
						var i = o ? a : "highWaterMark";
						throw new r(i, s)
					}
					return Math.floor(s)
				}
				return e.objectMode ? 16 : 16384
			}
		}
	}, {
		"../../../errors": 223
	}],
	234: [function(e, t, n) {
		arguments[4][18][0].apply(n, arguments)
	}, {
		dup: 18,
		events: 82
	}],
	235: [function(e, t, n) {
		arguments[4][19][0].apply(n, arguments)
	}, {
		"./lib/_stream_duplex.js": 225,
		"./lib/_stream_passthrough.js": 226,
		"./lib/_stream_readable.js": 227,
		"./lib/_stream_transform.js": 228,
		"./lib/_stream_writable.js": 229,
		dup: 19
	}],
	236: [function(e, t, n) {
		function r(e, t, n, r) {
			function o() {
				v.removeEventListener("loadstart", o), n.autoplay && v.play()
			}

			function i() {
				v.removeEventListener("canplay", i), r(null, v)
			}

			function p() {
				a(e, function(e, n) {
					return e ? w(e) : void(".pdf" === x ? (v = t("object"), v.setAttribute("typemustmatch", !0), v.setAttribute("type", "application/pdf"), v.setAttribute("data", n)) : (v = t("iframe"), v.sandbox = "allow-forms allow-scripts", v.src = n), r(null, v))
				})
			}

			function w(t) {
				t.message = "Error rendering file \"" + e.name + "\": " + t.message, d(t.message), r(t)
			}
			var x = u.extname(e.name).toLowerCase(),
				S = 0,
				v;
			0 <= _.indexOf(x) ? function() {
				function r() {
					d("Use `videostream` package for " + e.name), g(), v.addEventListener("error", p), v.addEventListener("loadstart", o), v.addEventListener("canplay", i), f(e, v)
				}

				function l() {
					d("Use MediaSource API for " + e.name), g(), v.addEventListener("error", _), v.addEventListener("loadstart", o), v.addEventListener("canplay", i);
					var t = new c(v),
						n = t.createWriteStream(s(e.name));
					e.createReadStream().pipe(n), S && (v.currentTime = S)
				}

				function u() {
					d("Use Blob URL for " + e.name), g(), v.addEventListener("error", w), v.addEventListener("loadstart", o), v.addEventListener("canplay", i), a(e, function(e, t) {
						return e ? w(e) : void(v.src = t, S && (v.currentTime = S))
					})
				}

				function p(e) {
					d("videostream error: fallback to MediaSource API: %o", e.message || e), v.removeEventListener("error", p), v.removeEventListener("canplay", i), l()
				}

				function _(t) {
					return d("MediaSource API error: fallback to Blob URL: %o", t.message || t), "number" == typeof e.length && e.length > n.maxBlobLength ? (d("File length too large for Blob URL approach: %d (max: %d)", e.length, n.maxBlobLength), w(new Error("File length too large for Blob URL approach: " + e.length + " (max: " + n.maxBlobLength + ")"))) : void(v.removeEventListener("error", _), v.removeEventListener("canplay", i), u())
				}

				function g() {
					v || (v = t(y), v.addEventListener("progress", function() {
						S = v.currentTime
					}))
				}
				var y = 0 <= h.indexOf(x) ? "video" : "audio";
				k ? 0 <= m.indexOf(x) ? r() : l() : u()
			}() : 0 <= g.indexOf(x) ? function() {
				v = t("audio"), a(e, function(e, t) {
					return e ? w(e) : void(v.addEventListener("error", w), v.addEventListener("loadstart", o), v.addEventListener("canplay", i), v.src = t)
				})
			}() : 0 <= y.indexOf(x) ? function() {
				v = t("img"), a(e, function(t, n) {
					return t ? w(t) : void(v.src = n, v.alt = e.name, r(null, v))
				})
			}() : 0 <= b.indexOf(x) ? p() : function() {
				function t() {
					l(n) ? (d("File extension \"%s\" appears ascii, so will render.", x), p()) : (d("File extension \"%s\" appears non-ascii, will not render.", x), r(new Error("Unsupported file type \"" + x + "\": Cannot append to DOM")))
				}
				d("Unknown file extension \"%s\" - will attempt to render into iframe", x);
				var n = "";
				e.createReadStream({
					start: 0,
					end: 1e3
				}).setEncoding("utf8").on("data", function(e) {
					n += e
				}).on("end", t).on("error", r)
			}()
		}

		function a(e, t) {
			var r = u.extname(e.name).toLowerCase();
			p(e.createReadStream(), n.mime[r], t)
		}

		function o(e) {
			if(null == e) throw new Error("file cannot be null or undefined");
			if("string" != typeof e.name) throw new Error("missing or invalid file.name property");
			if("function" != typeof e.createReadStream) throw new Error("missing or invalid file.createReadStream property")
		}

		function s(e) {
			var t = u.extname(e).toLowerCase();
			return {
				".m4a": "audio/mp4; codecs=\"mp4a.40.5\"",
				".m4v": "video/mp4; codecs=\"avc1.640029, mp4a.40.5\"",
				".mkv": "video/webm; codecs=\"avc1.640029, mp4a.40.5\"",
				".mp3": "audio/mpeg",
				".mp4": "video/mp4; codecs=\"avc1.640029, mp4a.40.5\"",
				".webm": "video/webm; codecs=\"vorbis, vp8\""
			}[t]
		}

		function i(e) {
			null == e.autoplay && (e.autoplay = !1), null == e.muted && (e.muted = !1), null == e.controls && (e.controls = !0), null == e.maxBlobLength && (e.maxBlobLength = 200000000)
		}
		n.render = function(e, t, n, a) {
			"function" == typeof n && (a = n, n = {}), n || (n = {}), a || (a = function() {}), o(e), i(n), "string" == typeof t && (t = document.querySelector(t)), r(e, function(n) {
				if(t.nodeName !== n.toUpperCase()) {
					var r = u.extname(e.name).toLowerCase();
					throw new Error("Cannot render \"" + r + "\" inside a \"" + t.nodeName.toLowerCase() + "\" element, expected \"" + n + "\"")
				}
				return t
			}, n, a)
		}, n.append = function(e, t, n, a) {
			function s(e) {
				var r = d(e);
				return n.autoplay && (r.autoplay = !0), n.muted && (r.muted = !0), n.controls && (r.controls = !0), t.appendChild(r), r
			}

			function d(e) {
				var n = document.createElement(e);
				return t.appendChild(n), n
			}

			function l(e, t) {
				e && t && t.remove(), a(e, t)
			}
			if("function" == typeof n && (a = n, n = {}), n || (n = {}), a || (a = function() {}), o(e), i(n), "string" == typeof t && (t = document.querySelector(t)), t && ("VIDEO" === t.nodeName || "AUDIO" === t.nodeName)) throw new Error("Invalid video/audio node argument. Argument must be root element that video/audio tag will be appended to.");
			r(e, function(e) {
				return "video" === e || "audio" === e ? s(e) : d(e)
			}, n, l)
		}, n.mime = e("./lib/mime.json");
		var d = e("debug")("render-media"),
			l = e("is-ascii"),
			c = e("mediasource"),
			u = e("path"),
			p = e("stream-to-blob-url"),
			f = e("videostream"),
			m = [".m4a", ".m4v", ".mp4"],
			h = [".m4v", ".mkv", ".mp4", ".webm"],
			_ = [].concat(h, [".m4a", ".mp3"]),
			g = [".aac", ".oga", ".ogg", ".wav", ".flac"],
			y = [".bmp", ".gif", ".jpeg", ".jpg", ".png", ".svg"],
			b = [".css", ".html", ".js", ".md", ".pdf", ".txt"],
			k = "undefined" != typeof window && window.MediaSource
	}, {
		"./lib/mime.json": 237,
		debug: 77,
		"is-ascii": 100,
		mediasource: 143,
		path: 201,
		"stream-to-blob-url": 293,
		videostream: 315
	}],
	237: [function(e, t) {
		t.exports = {
			".3gp": "video/3gpp",
			".aac": "audio/aac",
			".aif": "audio/x-aiff",
			".aiff": "audio/x-aiff",
			".atom": "application/atom+xml",
			".avi": "video/x-msvideo",
			".bmp": "image/bmp",
			".bz2": "application/x-bzip2",
			".conf": "text/plain",
			".css": "text/css",
			".csv": "text/plain",
			".diff": "text/x-diff",
			".doc": "application/msword",
			".flv": "video/x-flv",
			".gif": "image/gif",
			".gz": "application/x-gzip",
			".htm": "text/html",
			".html": "text/html",
			".ico": "image/vnd.microsoft.icon",
			".ics": "text/calendar",
			".iso": "application/octet-stream",
			".jar": "application/java-archive",
			".jpeg": "image/jpeg",
			".jpg": "image/jpeg",
			".js": "application/javascript",
			".json": "application/json",
			".less": "text/css",
			".log": "text/plain",
			".m3u": "audio/x-mpegurl",
			".m4a": "audio/mp4",
			".m4v": "video/mp4",
			".manifest": "text/cache-manifest",
			".markdown": "text/x-markdown",
			".mathml": "application/mathml+xml",
			".md": "text/x-markdown",
			".mid": "audio/midi",
			".midi": "audio/midi",
			".mov": "video/quicktime",
			".mp3": "audio/mpeg",
			".mp4": "video/mp4",
			".mp4v": "video/mp4",
			".mpeg": "video/mpeg",
			".mpg": "video/mpeg",
			".odp": "application/vnd.oasis.opendocument.presentation",
			".ods": "application/vnd.oasis.opendocument.spreadsheet",
			".odt": "application/vnd.oasis.opendocument.text",
			".oga": "audio/ogg",
			".ogg": "application/ogg",
			".pdf": "application/pdf",
			".png": "image/png",
			".pps": "application/vnd.ms-powerpoint",
			".ppt": "application/vnd.ms-powerpoint",
			".ps": "application/postscript",
			".psd": "image/vnd.adobe.photoshop",
			".qt": "video/quicktime",
			".rar": "application/x-rar-compressed",
			".rdf": "application/rdf+xml",
			".rss": "application/rss+xml",
			".rtf": "application/rtf",
			".svg": "image/svg+xml",
			".svgz": "image/svg+xml",
			".swf": "application/x-shockwave-flash",
			".tar": "application/x-tar",
			".tbz": "application/x-bzip-compressed-tar",
			".text": "text/plain",
			".tif": "image/tiff",
			".tiff": "image/tiff",
			".torrent": "application/x-bittorrent",
			".ttf": "application/x-font-ttf",
			".txt": "text/plain",
			".wav": "audio/wav",
			".webm": "video/webm",
			".wma": "audio/x-ms-wma",
			".wmv": "video/x-ms-wmv",
			".xls": "application/vnd.ms-excel",
			".xml": "application/xml",
			".yaml": "text/yaml",
			".yml": "text/yaml",
			".zip": "application/zip"
		}
	}, {}],
	238: [function(e, t) {
		(function(e) {
			t.exports = function(t, n, r) {
				function a(t) {
					function n() {
						r && r(t, d), r = null
					}
					s ? e.nextTick(n) : n()
				}

				function o(e, n, r) {
					if(d[e] = r, n && (u = !0), 0 == --c || n) a(n);
					else if(!u && p < l) {
						var s;
						i ? (s = i[p], p += 1, t[s](function(e, t) {
							o(s, e, t)
						})) : (s = p, p += 1, t[s](function(e, t) {
							o(s, e, t)
						}))
					}
				}
				if("number" != typeof n) throw new Error("second argument must be a Number");
				var s = !0,
					d, l, c, i, u;
				Array.isArray(t) ? (d = [], c = l = t.length) : (i = Object.keys(t), d = {}, c = l = i.length);
				var p = n;
				c ? i ? i.some(function(e, r) {
					if(t[e](function(t, n) {
							o(e, t, n)
						}), r === n - 1) return !0
				}) : t.some(function(e, t) {
					if(e(function(e, n) {
							o(t, e, n)
						}), t === n - 1) return !0
				}) : a(null), s = !1
			}
		}).call(this, e("_process"))
	}, {
		_process: 205
	}],
	239: [function(e, t) {
		(function(e) {
			t.exports = function(t, n) {
				function r(t) {
					function r() {
						n && n(t, s), n = null
					}
					o ? e.nextTick(r) : r()
				}

				function a(e, t, n) {
					s[e] = n, (0 == --d || t) && r(t)
				}
				var o = !0,
					s, d, i;
				Array.isArray(t) ? (s = [], d = t.length) : (i = Object.keys(t), s = {}, d = i.length), d ? i ? i.forEach(function(e) {
					t[e](function(t, n) {
						a(e, t, n)
					})
				}) : t.forEach(function(e, t) {
					e(function(e, n) {
						a(t, e, n)
					})
				}) : r(null), o = !1
			}
		}).call(this, e("_process"))
	}, {
		_process: 205
	}],
	240: [function(e, t, n) {
		(function(e, r) {
			"object" == typeof n && "object" == typeof t ? t.exports = r() : "function" == typeof define && define.amd ? define([], r) : "object" == typeof n ? n.Rusha = r() : e.Rusha = r()
		})("undefined" == typeof self ? this : self, function() {
			return function(e) {
				function t(r) {
					if(n[r]) return n[r].exports;
					var a = n[r] = {
						i: r,
						l: !1,
						exports: {}
					};
					return e[r].call(a.exports, a, a.exports, t), a.l = !0, a.exports
				}
				var n = {};
				return t.m = e, t.c = n, t.d = function(e, n, r) {
					t.o(e, n) || Object.defineProperty(e, n, {
						configurable: !1,
						enumerable: !0,
						get: r
					})
				}, t.n = function(e) {
					var n = e && e.__esModule ? function() {
						return e["default"]
					} : function() {
						return e
					};
					return t.d(n, "a", n), n
				}, t.o = function(e, t) {
					return Object.prototype.hasOwnProperty.call(e, t)
				}, t.p = "", t(t.s = 3)
			}([function(e, t, n) {
				function r(e, t) {
					if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
				}
				var a = n(5),
					o = n(1),
					s = o.toHex,
					i = o.ceilHeapSize,
					d = n(6),
					l = function(e) {
						for(e += 9; 0 < e % 64; e += 1);
						return e
					},
					c = function(e, t) {
						var n = new Uint8Array(e.buffer),
							r = t % 4,
							a = t - r;
						switch(r) {
							case 0:
								n[a + 3] = 0;
							case 1:
								n[a + 2] = 0;
							case 2:
								n[a + 1] = 0;
							case 3:
								n[a + 0] = 0;
						}
						for(var o = (t >> 2) + 1; o < e.length; o++) e[o] = 0
					},
					u = function(e, t, n) {
						e[t >> 2] |= 128 << 24 - (t % 4 << 3), e[(-16 & (t >> 2) + 2) + 14] = 0 | n / 536870912, e[(-16 & (t >> 2) + 2) + 15] = n << 3
					},
					p = function(e, t) {
						var n = new Int32Array(e, t + 320, 5),
							r = new Int32Array(5),
							a = new DataView(r.buffer);
						return a.setInt32(0, n[0], !1), a.setInt32(4, n[1], !1), a.setInt32(8, n[2], !1), a.setInt32(12, n[3], !1), a.setInt32(16, n[4], !1), r
					},
					f = function() {
						function e(t) {
							if(r(this, e), t = t || 65536, 0 < t % 64) throw new Error("Chunk size must be a multiple of 128 bit");
							this._offset = 0, this._maxChunkLen = t, this._padMaxChunkLen = l(t), this._heap = new ArrayBuffer(i(this._padMaxChunkLen + 320 + 20)), this._h32 = new Int32Array(this._heap), this._h8 = new Int8Array(this._heap), this._core = new a({
								Int32Array: Int32Array
							}, {}, this._heap)
						}
						return e.prototype._initState = function(e, t) {
							this._offset = 0;
							var n = new Int32Array(e, t + 320, 5);
							n[0] = 1732584193, n[1] = -271733879, n[2] = -1732584194, n[3] = 271733878, n[4] = -1009589776
						}, e.prototype._padChunk = function(e, t) {
							var n = l(e),
								r = new Int32Array(this._heap, 0, n >> 2);
							return c(r, e), u(r, e, t), n
						}, e.prototype._write = function(e, t, n, r) {
							d(e, this._h8, this._h32, t, n, r || 0)
						}, e.prototype._coreCall = function(e, t, n, r, a) {
							var o = n;
							this._write(e, t, n), a && (o = this._padChunk(n, r)), this._core.hash(o, this._padMaxChunkLen)
						}, e.prototype.rawDigest = function(e) {
							var t = e.byteLength || e.length || e.size || 0;
							this._initState(this._heap, this._padMaxChunkLen);
							var n = 0,
								r = this._maxChunkLen;
							for(n = 0; t > n + r; n += r) this._coreCall(e, n, r, t, !1);
							return this._coreCall(e, n, t - n, t, !0), p(this._heap, this._padMaxChunkLen)
						}, e.prototype.digest = function(e) {
							return s(this.rawDigest(e).buffer)
						}, e.prototype.digestFromString = function(e) {
							return this.digest(e)
						}, e.prototype.digestFromBuffer = function(e) {
							return this.digest(e)
						}, e.prototype.digestFromArrayBuffer = function(e) {
							return this.digest(e)
						}, e.prototype.resetState = function() {
							return this._initState(this._heap, this._padMaxChunkLen), this
						}, e.prototype.append = function(e) {
							var t = 0,
								n = e.byteLength || e.length || e.size || 0,
								r = this._offset % this._maxChunkLen,
								a = void 0;
							for(this._offset += n; t < n;) a = Math.min(n - t, this._maxChunkLen - r), this._write(e, t, a, r), r += a, t += a, r === this._maxChunkLen && (this._core.hash(this._maxChunkLen, this._padMaxChunkLen), r = 0);
							return this
						}, e.prototype.getState = function() {
							var e = this._offset % this._maxChunkLen,
								t = void 0;
							if(!e) {
								var n = new Int32Array(this._heap, this._padMaxChunkLen + 320, 5);
								t = n.buffer.slice(n.byteOffset, n.byteOffset + n.byteLength)
							} else t = this._heap.slice(0);
							return {
								offset: this._offset,
								heap: t
							}
						}, e.prototype.setState = function(e) {
							if(this._offset = e.offset, 20 === e.heap.byteLength) {
								var t = new Int32Array(this._heap, this._padMaxChunkLen + 320, 5);
								t.set(new Int32Array(e.heap))
							} else this._h32.set(new Int32Array(e.heap));
							return this
						}, e.prototype.rawEnd = function() {
							var e = this._offset,
								t = e % this._maxChunkLen,
								n = this._padChunk(t, e);
							this._core.hash(n, this._padMaxChunkLen);
							var r = p(this._heap, this._padMaxChunkLen);
							return this._initState(this._heap, this._padMaxChunkLen), r
						}, e.prototype.end = function() {
							return s(this.rawEnd().buffer)
						}, e
					}();
				e.exports = f, e.exports._core = a
			}, function(e) {
				for(var t = Array(256), n = 0; 256 > n; n++) t[n] = (16 > n ? "0" : "") + n.toString(16);
				e.exports.toHex = function(e) {
					for(var n = new Uint8Array(e), r = Array(e.byteLength), a = 0; a < r.length; a++) r[a] = t[n[a]];
					return r.join("")
				}, e.exports.ceilHeapSize = function(e) {
					var t = 0;
					if(65536 >= e) return 65536;
					if(16777216 > e)
						for(t = 1; t < e; t <<= 1);
					else
						for(t = 16777216; t < e; t += 16777216);
					return t
				}, e.exports.isDedicatedWorkerScope = function(e) {
					var t = "WorkerGlobalScope" in e && e instanceof e.WorkerGlobalScope,
						n = "SharedWorkerGlobalScope" in e && e instanceof e.SharedWorkerGlobalScope,
						r = "ServiceWorkerGlobalScope" in e && e instanceof e.ServiceWorkerGlobalScope;
					return t && !n && !r
				}
			}, function(e, t, n) {
				e.exports = function() {
					var e = n(0),
						t = function(e, t, n) {
							try {
								return n(null, e.digest(t))
							} catch(t) {
								return n(t)
							}
						},
						r = function(e, t, n, a, o) {
							var s = new self.FileReader;
							s.onloadend = function() {
								if(s.error) return o(s.error);
								var i = s.result;
								t += s.result.byteLength;
								try {
									e.append(i)
								} catch(t) {
									return void o(t)
								}
								t < a.size ? r(e, t, n, a, o) : o(null, e.end())
							}, s.readAsArrayBuffer(a.slice(t, t + n))
						},
						a = !0;
					return self.onmessage = function(n) {
							if(a) {
								var o = n.data.data,
									s = n.data.file,
									i = n.data.id;
								if("undefined" != typeof i && (s || o)) {
									var d = n.data.blockSize || 4194304,
										l = new e(d);
									l.resetState();
									var c = function(e, t) {
										e ? self.postMessage({
											id: i,
											error: e.name
										}) : self.postMessage({
											id: i,
											hash: t
										})
									};
									o && t(l, o, c), s && r(l, 0, d, s, c)
								}
							}
						},
						function() {
							a = !1
						}
				}
			}, function(e, t, n) {
				var r = n(4),
					a = n(0),
					o = n(7),
					s = n(2),
					i = n(1),
					d = i.isDedicatedWorkerScope,
					l = "undefined" != typeof self && d(self);
				a.disableWorkerBehaviour = l ? s() : function() {}, a.createWorker = function() {
					var e = r(2),
						t = e.terminate;
					return e.terminate = function() {
						URL.revokeObjectURL(e.objectURL), t.call(e)
					}, e
				}, a.createHash = o, e.exports = a
			}, function(e, t, n) {
				function r(e) {
					function t(r) {
						if(n[r]) return n[r].exports;
						var a = n[r] = {
							i: r,
							l: !1,
							exports: {}
						};
						return e[r].call(a.exports, a, a.exports, t), a.l = !0, a.exports
					}
					var n = {};
					t.m = e, t.c = n, t.i = function(e) {
						return e
					}, t.d = function(e, n, r) {
						t.o(e, n) || Object.defineProperty(e, n, {
							configurable: !1,
							enumerable: !0,
							get: r
						})
					}, t.r = function(e) {
						Object.defineProperty(e, "__esModule", {
							value: !0
						})
					}, t.n = function(e) {
						var n = e && e.__esModule ? function() {
							return e["default"]
						} : function() {
							return e
						};
						return t.d(n, "a", n), n
					}, t.o = function(e, t) {
						return Object.prototype.hasOwnProperty.call(e, t)
					}, t.p = "/", t.oe = function(e) {
						throw console.error(e), e
					};
					var r = t(t.s = ENTRY_MODULE);
					return r.default || r
				}

				function a(e) {
					return(e + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
				}

				function o(e, t, r) {
					var o = {};
					o[r] = [];
					var s = t.toString(),
						i = s.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);
					if(!i) return o;
					for(var d = i[1], l = new RegExp("(\\\\n|\\W)" + a(d) + "\\((/\\*.*?\\*/)?s?.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)", "g"), c; c = l.exec(s);) "dll-reference" !== c[3] && o[r].push(c[3]);
					for(l = new RegExp("\\(" + a(d) + "\\(\"(dll-reference\\s([\\.|\\-|\\+|\\w|/|@]+))\"\\)\\)\\((/\\*.*?\\*/)?s?.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)", "g"); c = l.exec(s);) e[c[2]] || (o[r].push(c[1]), e[c[2]] = n(c[1]).m), o[c[2]] = o[c[2]] || [], o[c[2]].push(c[4]);
					return o
				}

				function s(e) {
					var t = Object.keys(e);
					return t.reduce(function(t, n) {
						return t || 0 < e[n].length
					}, !1)
				}

				function i(e, t) {
					for(var n = {
							main: [t]
						}, r = {
							main: []
						}, a = {
							main: {}
						}; s(n);)
						for(var d = Object.keys(n), l = 0; l < d.length; l++) {
							var c = d[l],
								u = n[c],
								p = u.pop();
							if(a[c] = a[c] || {}, !a[c][p] && e[c][p]) {
								a[c][p] = !0, r[c] = r[c] || [], r[c].push(p);
								for(var f = o(e, e[c][p], c), m = Object.keys(f), h = 0; h < m.length; h++) n[m[h]] = n[m[h]] || [], n[m[h]] = n[m[h]].concat(f[m[h]])
							}
						}
					return r
				}
				e.exports = function(e, t) {
					t = t || {};
					var a = {
							main: n.m
						},
						o = t.all ? {
							main: Object.keys(a)
						} : i(a, e),
						s = "";
					Object.keys(o).filter(function(e) {
						return "main" !== e
					}).forEach(function(e) {
						for(var t = 0; o[e][t];) t++;
						o[e].push(t), a[e][t] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })", s = s + "var " + e + " = (" + r.toString().replace("ENTRY_MODULE", JSON.stringify(t)) + ")({" + o[e].map(function(t) {
							return "" + JSON.stringify(t) + ": " + a[e][t].toString()
						}).join(",") + "});\n"
					}), s = s + "(" + r.toString().replace("ENTRY_MODULE", JSON.stringify(e)) + ")({" + o.main.map(function(e) {
						return "" + JSON.stringify(e) + ": " + a.main[e].toString()
					}).join(",") + "})(self);";
					var d = new window.Blob([s], {
						type: "text/javascript"
					});
					if(t.bare) return d;
					var l = window.URL || window.webkitURL || window.mozURL || window.msURL,
						c = l.createObjectURL(d),
						u = new window.Worker(c);
					return u.objectURL = c, u
				}
			}, function(e) {
				e.exports = function(e, t, n) {
					"use asm";
					var r = new e.Int32Array(n);
					return {
						hash: function(e, t) {
							e |= 0, t |= 0;
							var n = 0,
								a = 0,
								o = 0,
								s = 0,
								i = 0,
								d = 0,
								l = 0,
								c = 0,
								u = 0,
								p = 0,
								f = 0,
								m = 0,
								h = 0,
								_ = 0;
							for(o = 0 | r[t + 320 >> 2], i = 0 | r[t + 324 >> 2], l = 0 | r[t + 328 >> 2], u = 0 | r[t + 332 >> 2], f = 0 | r[t + 336 >> 2], n = 0;
								(0 | n) < (0 | e); n = 0 | n + 64) {
								for(s = o, d = i, c = l, p = u, m = f, a = 0; 64 > (0 | a); a = 0 | a + 4) _ = 0 | r[n + a >> 2], h = 0 | (0 | (o << 5 | o >>> 27) + (i & l | ~i & u)) + (0 | (0 | _ + f) + 1518500249), f = u, u = l, l = i << 30 | i >>> 2, i = o, o = h, r[e + a >> 2] = _;
								for(a = 0 | e + 64;
									(0 | a) < (0 | e + 80); a = 0 | a + 4) _ = (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) << 1 | (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) >>> 31, h = 0 | (0 | (o << 5 | o >>> 27) + (i & l | ~i & u)) + (0 | (0 | _ + f) + 1518500249), f = u, u = l, l = i << 30 | i >>> 2, i = o, o = h, r[a >> 2] = _;
								for(a = 0 | e + 80;
									(0 | a) < (0 | e + 160); a = 0 | a + 4) _ = (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) << 1 | (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) >>> 31, h = 0 | (0 | (o << 5 | o >>> 27) + (i ^ l ^ u)) + (0 | (0 | _ + f) + 1859775393), f = u, u = l, l = i << 30 | i >>> 2, i = o, o = h, r[a >> 2] = _;
								for(a = 0 | e + 160;
									(0 | a) < (0 | e + 240); a = 0 | a + 4) _ = (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) << 1 | (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) >>> 31, h = 0 | (0 | (o << 5 | o >>> 27) + (i & l | i & u | l & u)) + (0 | (0 | _ + f) - 1894007588), f = u, u = l, l = i << 30 | i >>> 2, i = o, o = h, r[a >> 2] = _;
								for(a = 0 | e + 240;
									(0 | a) < (0 | e + 320); a = 0 | a + 4) _ = (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) << 1 | (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) >>> 31, h = 0 | (0 | (o << 5 | o >>> 27) + (i ^ l ^ u)) + (0 | (0 | _ + f) - 899497514), f = u, u = l, l = i << 30 | i >>> 2, i = o, o = h, r[a >> 2] = _;
								o = 0 | o + s, i = 0 | i + d, l = 0 | l + c, u = 0 | u + p, f = 0 | f + m
							}
							r[t + 320 >> 2] = o, r[t + 324 >> 2] = i, r[t + 328 >> 2] = l, r[t + 332 >> 2] = u, r[t + 336 >> 2] = f
						}
					}
				}
			}, function(e) {
				var t = this,
					n = void 0;
				"undefined" != typeof self && "undefined" != typeof self.FileReaderSync && (n = new self.FileReaderSync);
				var r = function(e, t, n, r, a, o) {
						var s = o % 4,
							d = (a + s) % 4,
							l = a - d,
							c;
						switch(s) {
							case 0:
								t[o] = e.charCodeAt(r + 3);
							case 1:
								t[0 | o + 1 - (s << 1)] = e.charCodeAt(r + 2);
							case 2:
								t[0 | o + 2 - (s << 1)] = e.charCodeAt(r + 1);
							case 3:
								t[0 | o + 3 - (s << 1)] = e.charCodeAt(r);
						}
						if(!(a < d + (4 - s))) {
							for(c = 4 - s; c < l; c = 0 | c + 4) n[o + c >> 2] = e.charCodeAt(r + c) << 24 | e.charCodeAt(r + c + 1) << 16 | e.charCodeAt(r + c + 2) << 8 | e.charCodeAt(r + c + 3);
							switch(d) {
								case 3:
									t[0 | o + l + 1] = e.charCodeAt(r + l + 2);
								case 2:
									t[0 | o + l + 2] = e.charCodeAt(r + l + 1);
								case 1:
									t[0 | o + l + 3] = e.charCodeAt(r + l);
							}
						}
					},
					a = function(e, t, n, r, a, o) {
						var s = o % 4,
							d = (a + s) % 4,
							l = a - d,
							c;
						switch(s) {
							case 0:
								t[o] = e[r + 3];
							case 1:
								t[0 | o + 1 - (s << 1)] = e[r + 2];
							case 2:
								t[0 | o + 2 - (s << 1)] = e[r + 1];
							case 3:
								t[0 | o + 3 - (s << 1)] = e[r];
						}
						if(!(a < d + (4 - s))) {
							for(c = 4 - s; c < l; c = 0 | c + 4) n[0 | o + c >> 2] = e[r + c] << 24 | e[r + c + 1] << 16 | e[r + c + 2] << 8 | e[r + c + 3];
							switch(d) {
								case 3:
									t[0 | o + l + 1] = e[r + l + 2];
								case 2:
									t[0 | o + l + 2] = e[r + l + 1];
								case 1:
									t[0 | o + l + 3] = e[r + l];
							}
						}
					},
					o = function(e, t, r, a, o, s) {
						var d = void 0,
							l = s % 4,
							c = (o + l) % 4,
							u = o - c,
							p = new Uint8Array(n.readAsArrayBuffer(e.slice(a, a + o)));
						switch(l) {
							case 0:
								t[s] = p[3];
							case 1:
								t[0 | s + 1 - (l << 1)] = p[2];
							case 2:
								t[0 | s + 2 - (l << 1)] = p[1];
							case 3:
								t[0 | s + 3 - (l << 1)] = p[0];
						}
						if(!(o < c + (4 - l))) {
							for(d = 4 - l; d < u; d = 0 | d + 4) r[0 | s + d >> 2] = p[d] << 24 | p[d + 1] << 16 | p[d + 2] << 8 | p[d + 3];
							switch(c) {
								case 3:
									t[0 | s + u + 1] = p[u + 2];
								case 2:
									t[0 | s + u + 2] = p[u + 1];
								case 1:
									t[0 | s + u + 3] = p[u];
							}
						}
					};
				e.exports = function(e, n, s, i, d, l) {
					if("string" == typeof e) return r(e, n, s, i, d, l);
					if(e instanceof Array) return a(e, n, s, i, d, l);
					if(t && t.Buffer && t.Buffer.isBuffer(e)) return a(e, n, s, i, d, l);
					if(e instanceof ArrayBuffer) return a(new Uint8Array(e), n, s, i, d, l);
					if(e.buffer instanceof ArrayBuffer) return a(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), n, s, i, d, l);
					if(e instanceof Blob) return o(e, n, s, i, d, l);
					throw new Error("Unsupported data type.")
				}
			}, function(e, t, n) {
				function r(e, t) {
					if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
				}
				var a = n(0),
					o = n(1),
					s = o.toHex,
					i = function() {
						function e() {
							r(this, e), this._rusha = new a, this._rusha.resetState()
						}
						return e.prototype.update = function(e) {
							return this._rusha.append(e), this
						}, e.prototype.digest = function e(t) {
							var e = this._rusha.rawEnd().buffer;
							if(!t) return e;
							if("hex" === t) return s(e);
							throw new Error("unsupported digest encoding")
						}, e
					}();
				e.exports = function() {
					return new i
				}
			}])
		})
	}, {}],
	241: [function(e, t, n) {
		function r(e, t) {
			for(var n in e) t[n] = e[n]
		}

		function a(e, t, n) {
			return s(e, t, n)
		}
		var o = e("buffer"),
			s = o.Buffer;
		s.from && s.alloc && s.allocUnsafe && s.allocUnsafeSlow ? t.exports = o : (r(o, n), n.Buffer = a), r(s, a), a.from = function(e, t, n) {
			if("number" == typeof e) throw new TypeError("Argument must not be a number");
			return s(e, t, n)
		}, a.alloc = function(e, t, n) {
			if("number" != typeof e) throw new TypeError("Argument must be a number");
			var r = s(e);
			return void 0 === t ? r.fill(0) : "string" == typeof n ? r.fill(t, n) : r.fill(t), r
		}, a.allocUnsafe = function(e) {
			if("number" != typeof e) throw new TypeError("Argument must be a number");
			return s(e)
		}, a.allocUnsafeSlow = function(e) {
			if("number" != typeof e) throw new TypeError("Argument must be a number");
			return o.SlowBuffer(e)
		}
	}, {
		buffer: 41
	}],
	242: [function(e, t) {
		(function(e) {
			t.exports = function(t, n) {
				var r = [];
				t.on("data", function(e) {
					r.push(e)
				}), t.once("end", function() {
					n && n(null, e.concat(r)), n = null
				}), t.once("error", function(e) {
					n && n(e), n = null
				})
			}
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41
	}],
	243: [function(e, t) {
		(function(n) {
			function r(e, t) {
				if(e = Object.assign({
						maxRedirects: 10
					}, "string" == typeof e ? {
						url: e
					} : e), t = d(t), e.url) {
					const {
						hostname: t,
						port: n,
						protocol: r,
						auth: a,
						path: o
					} = c.parse(e.url);
					delete e.url, t || n || r || a ? Object.assign(e, {
						hostname: t,
						port: n,
						protocol: r,
						auth: a,
						path: o
					}) : e.path = o
				}
				const a = {
					"accept-encoding": "gzip, deflate"
				};
				e.headers && Object.keys(e.headers).forEach(t => a[t.toLowerCase()] = e.headers[t]), e.headers = a;
				let p;
				e.body ? p = e.json && !u(e.body) ? JSON.stringify(e.body) : e.body : e.form && (p = "string" == typeof e.form ? e.form : l.stringify(e.form), e.headers["content-type"] = "application/x-www-form-urlencoded"), p && (!e.method && (e.method = "POST"), !u(p) && (e.headers["content-length"] = n.byteLength(p)), e.json && !e.form && (e.headers["content-type"] = "application/json")), delete e.body, delete e.form, e.json && (e.headers.accept = "application/json"), e.method && (e.method = e.method.toUpperCase());
				const f = "https:" === e.protocol ? i : s,
					m = f.request(e, n => {
						if(300 <= n.statusCode && 400 > n.statusCode && n.headers.location) return e.url = n.headers.location, delete e.headers.host, n.resume(), "POST" === e.method && [301, 302].includes(n.statusCode) && (e.method = "GET", delete e.headers["content-length"], delete e.headers["content-type"]), 0 == e.maxRedirects-- ? t(new Error("too many redirects")) : r(e, t);
						const a = "function" == typeof o && "HEAD" !== e.method;
						t(null, a ? o(n) : n)
					});
				return m.on("timeout", () => {
					m.abort(), t(new Error("Request timed out"))
				}), m.on("error", t), u(p) ? p.on("error", t).pipe(m) : m.end(p), m
			}
			t.exports = r;
			const a = e("simple-concat"),
				o = e("decompress-response"),
				s = e("http"),
				i = e("https"),
				d = e("once"),
				l = e("querystring"),
				c = e("url"),
				u = e => null !== e && "object" == typeof e && "function" == typeof e.pipe;
			r.concat = (e, t) => r(e, (n, r) => n ? t(n) : void a(r, (n, a) => {
				if(n) return t(n);
				if(e.json) try {
					a = JSON.parse(a.toString())
				} catch(e) {
					return t(e, r, a)
				}
				t(null, r, a)
			})), ["get", "post", "put", "patch", "head", "delete"].forEach(e => {
				r[e] = (t, n) => ("string" == typeof t && (t = {
					url: t
				}), r(Object.assign({
					method: e.toUpperCase()
				}, t), n))
			})
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41,
		"decompress-response": 35,
		http: 280,
		https: 95,
		once: 182,
		querystring: 210,
		"simple-concat": 242,
		url: 310
	}],
	244: [function(e, t) {
		(function(n) {
			function r(e) {
				var t = this;
				if(!(t instanceof r)) return new r(e);
				if(t._id = l(4).toString("hex").slice(0, 7), t._debug("new peer %o", e), e = Object.assign({
						allowHalfOpen: !1
					}, e), c.Duplex.call(t, e), t.channelName = e.initiator ? e.channelName || l(20).toString("hex") : null, t._isChromium = "undefined" != typeof window && !!window.webkitRTCPeerConnection, t.initiator = e.initiator || !1, t.channelConfig = e.channelConfig || r.channelConfig, t.config = e.config || r.config, t.constraints = t._transformConstraints(e.constraints || r.constraints), t.offerConstraints = t._transformConstraints(e.offerConstraints || {}), t.answerConstraints = t._transformConstraints(e.answerConstraints || {}), t.sdpTransform = e.sdpTransform || function(e) {
						return e
					}, t.streams = e.streams || (e.stream ? [e.stream] : []), t.trickle = void 0 === e.trickle || e.trickle, t.destroyed = !1, t.connected = !1, t.remoteAddress = void 0, t.remoteFamily = void 0, t.remotePort = void 0, t.localAddress = void 0, t.localPort = void 0, t._wrtc = e.wrtc && "object" == typeof e.wrtc ? e.wrtc : i(), !t._wrtc)
					if("undefined" == typeof window) throw a("No WebRTC support: Specify `opts.wrtc` option in this environment", "ERR_WEBRTC_SUPPORT");
					else throw a("No WebRTC support: Not a supported browser", "ERR_WEBRTC_SUPPORT");
				t._pcReady = !1, t._channelReady = !1, t._iceComplete = !1, t._channel = null, t._pendingCandidates = [], t._isNegotiating = !1, t._batchedNegotiation = !1, t._queuedNegotiation = !1, t._sendersAwaitingStable = [], t._senderMap = new WeakMap, t._remoteTracks = [], t._remoteStreams = [], t._chunk = null, t._cb = null, t._interval = null, t._pc = new t._wrtc.RTCPeerConnection(t.config, t.constraints), t._isReactNativeWebrtc = "number" == typeof t._pc._peerConnectionId, t._pc.oniceconnectionstatechange = function() {
					t._onIceStateChange()
				}, t._pc.onicegatheringstatechange = function() {
					t._onIceStateChange()
				}, t._pc.onsignalingstatechange = function() {
					t._onSignalingStateChange()
				}, t._pc.onicecandidate = function(e) {
					t._onIceCandidate(e)
				}, t.initiator ? t._setupData({
					channel: t._pc.createDataChannel(t.channelName, t.channelConfig)
				}) : t._pc.ondatachannel = function(e) {
					t._setupData(e)
				}, "addTrack" in t._pc && (t.streams && t.streams.forEach(function(e) {
					t.addStream(e)
				}), t._pc.ontrack = function(e) {
					t._onTrack(e)
				}), t.initiator && t._needsNegotiation(), t._onFinishBound = function() {
					t._onFinish()
				}, t.once("finish", t._onFinishBound)
			}

			function a(e, t) {
				var n = new Error(e);
				return n.code = t, n
			}

			function o() {}
			t.exports = r;
			var s = e("debug")("simple-peer"),
				i = e("get-browser-rtc"),
				d = e("inherits"),
				l = e("randombytes"),
				c = e("readable-stream"),
				u = 65536;
			d(r, c.Duplex), r.WEBRTC_SUPPORT = !!i(), r.config = {
				iceServers: [{
					urls: "stun:stun.l.google.com:19302"
				}, {
					urls: "stun:global.stun.twilio.com:3478?transport=udp"
				}]
			}, r.constraints = {}, r.channelConfig = {}, Object.defineProperty(r.prototype, "bufferSize", {
				get: function() {
					var e = this;
					return e._channel && e._channel.bufferedAmount || 0
				}
			}), r.prototype.address = function() {
				var e = this;
				return {
					port: e.localPort,
					family: "IPv4",
					address: e.localAddress
				}
			}, r.prototype.signal = function(e) {
				var t = this;
				if(t.destroyed) throw a("cannot signal after peer is destroyed", "ERR_SIGNALING");
				if("string" == typeof e) try {
					e = JSON.parse(e)
				} catch(t) {
					e = {}
				}
				t._debug("signal()"), e.renegotiate && (t._debug("got request to renegotiate"), t._needsNegotiation()), e.candidate && (t._pc.remoteDescription && t._pc.remoteDescription.type ? t._addIceCandidate(e.candidate) : t._pendingCandidates.push(e.candidate)), e.sdp && t._pc.setRemoteDescription(new t._wrtc.RTCSessionDescription(e), function() {
					t.destroyed || (t._pendingCandidates.forEach(function(e) {
						t._addIceCandidate(e)
					}), t._pendingCandidates = [], "offer" === t._pc.remoteDescription.type && t._createAnswer())
				}, function(e) {
					t.destroy(a(e, "ERR_SET_REMOTE_DESCRIPTION"))
				}), e.sdp || e.candidate || e.renegotiate || t.destroy(a("signal() called with invalid signal data", "ERR_SIGNALING"))
			}, r.prototype._addIceCandidate = function(e) {
				var t = this;
				try {
					t._pc.addIceCandidate(new t._wrtc.RTCIceCandidate(e), o, function(e) {
						t.destroy(a(e, "ERR_ADD_ICE_CANDIDATE"))
					})
				} catch(e) {
					t.destroy(a("error adding candidate: " + e.message, "ERR_ADD_ICE_CANDIDATE"))
				}
			}, r.prototype.send = function(e) {
				var t = this;
				t._channel.send(e)
			}, r.prototype.addStream = function(e) {
				var t = this;
				t._debug("addStream()"), e.getTracks().forEach(function(n) {
					t.addTrack(n, e)
				})
			}, r.prototype.addTrack = function(e, t) {
				var n = this;
				n._debug("addTrack()");
				var r = n._pc.addTrack(e, t),
					a = n._senderMap.get(e) || new WeakMap;
				a.set(t, r), n._senderMap.set(e, a), n._needsNegotiation()
			}, r.prototype.removeTrack = function(e, t) {
				var n = this;
				n._debug("removeSender()");
				var r = n._senderMap.get(e),
					a = r ? r.get(t) : null;
				a || n.destroy(new Error("Cannot remove track that was never added."));
				try {
					n._pc.removeTrack(a)
				} catch(e) {
					"NS_ERROR_UNEXPECTED" === e.name ? n._sendersAwaitingStable.push(a) : n.destroy(e)
				}
			}, r.prototype.removeStream = function(e) {
				var t = this;
				t._debug("removeSenders()"), e.getTracks().forEach(function(n) {
					t.removeTrack(n, e)
				})
			}, r.prototype._needsNegotiation = function() {
				var e = this;
				e._debug("_needsNegotiation");
				e._batchedNegotiation || (e._batchedNegotiation = !0, setTimeout(function() {
					e._batchedNegotiation = !1, e._debug("starting batched negotiation"), e.negotiate()
				}, 0))
			}, r.prototype.negotiate = function() {
				var e = this;
				e.initiator ? e._isNegotiating ? (e._queuedNegotiation = !0, e._debug("already negotiating, queueing")) : (e._debug("start negotiation"), e._createOffer()) : (e._debug("requesting negotiation from initiator"), e.emit("signal", {
					renegotiate: !0
				})), e._isNegotiating = !0
			}, r.prototype.destroy = function(e) {
				var t = this;
				t._destroy(e, function() {})
			}, r.prototype._destroy = function(e, t) {
				var n = this;
				if(!n.destroyed) {
					if(n._debug("destroy (error: %s)", e && (e.message || e)), n.readable = n.writable = !1, n._readableState.ended || n.push(null), n._writableState.finished || n.end(), n.destroyed = !0, n.connected = !1, n._pcReady = !1, n._channelReady = !1, n._remoteTracks = null, n._remoteStreams = null, n._senderMap = null, clearInterval(n._interval), n._interval = null, n._chunk = null, n._cb = null, n._onFinishBound && n.removeListener("finish", n._onFinishBound), n._onFinishBound = null, n._channel) {
						try {
							n._channel.close()
						} catch(e) {}
						n._channel.onmessage = null, n._channel.onopen = null, n._channel.onclose = null, n._channel.onerror = null
					}
					if(n._pc) {
						try {
							n._pc.close()
						} catch(e) {}
						n._pc.oniceconnectionstatechange = null, n._pc.onicegatheringstatechange = null, n._pc.onsignalingstatechange = null, n._pc.onicecandidate = null, "addTrack" in n._pc && (n._pc.ontrack = null), n._pc.ondatachannel = null
					}
					n._pc = null, n._channel = null, e && n.emit("error", e), n.emit("close"), t()
				}
			}, r.prototype._setupData = function(e) {
				var t = this;
				return e.channel ? void(t._channel = e.channel, t._channel.binaryType = "arraybuffer", "number" == typeof t._channel.bufferedAmountLowThreshold && (t._channel.bufferedAmountLowThreshold = u), t.channelName = t._channel.label, t._channel.onmessage = function(e) {
					t._onChannelMessage(e)
				}, t._channel.onbufferedamountlow = function() {
					t._onChannelBufferedAmountLow()
				}, t._channel.onopen = function() {
					t._onChannelOpen()
				}, t._channel.onclose = function() {
					t._onChannelClose()
				}, t._channel.onerror = function(e) {
					t.destroy(a(e, "ERR_DATA_CHANNEL"))
				}) : t.destroy(a("Data channel event is missing `channel` property", "ERR_DATA_CHANNEL"))
			}, r.prototype._read = function() {}, r.prototype._write = function(e, t, n) {
				var r = this;
				if(r.destroyed) return n(a("cannot write after peer is destroyed", "ERR_DATA_CHANNEL"));
				if(r.connected) {
					try {
						r.send(e)
					} catch(e) {
						return r.destroy(a(e, "ERR_DATA_CHANNEL"))
					}
					r._channel.bufferedAmount > u ? (r._debug("start backpressure: bufferedAmount %d", r._channel.bufferedAmount), r._cb = n) : n(null)
				} else r._debug("write before connect"), r._chunk = e, r._cb = n
			}, r.prototype._onFinish = function() {
				function e() {
					setTimeout(function() {
						t.destroy()
					}, 1e3)
				}
				var t = this;
				t.destroyed || (t.connected ? e() : t.once("connect", e))
			}, r.prototype._createOffer = function() {
				var e = this;
				e.destroyed || e._pc.createOffer(function(t) {
					function n() {
						var n = e._pc.localDescription || t;
						e._debug("signal"), e.emit("signal", {
							type: n.type,
							sdp: n.sdp
						})
					}
					e.destroyed || (t.sdp = e.sdpTransform(t.sdp), e._pc.setLocalDescription(t, function() {
						e._debug("createOffer success");
						e.destroyed || (e.trickle || e._iceComplete ? n() : e.once("_iceComplete", n))
					}, function(t) {
						e.destroy(a(t, "ERR_SET_LOCAL_DESCRIPTION"))
					}))
				}, function(t) {
					e.destroy(a(t, "ERR_CREATE_OFFER"))
				}, e.offerConstraints)
			}, r.prototype._createAnswer = function() {
				var e = this;
				e.destroyed || e._pc.createAnswer(function(t) {
					function n() {
						var n = e._pc.localDescription || t;
						e._debug("signal"), e.emit("signal", {
							type: n.type,
							sdp: n.sdp
						})
					}
					e.destroyed || (t.sdp = e.sdpTransform(t.sdp), e._pc.setLocalDescription(t, function() {
						e.destroyed || (e.trickle || e._iceComplete ? n() : e.once("_iceComplete", n))
					}, function(t) {
						e.destroy(a(t, "ERR_SET_LOCAL_DESCRIPTION"))
					}))
				}, function(t) {
					e.destroy(a(t, "ERR_CREATE_ANSWER"))
				}, e.answerConstraints)
			}, r.prototype._onIceStateChange = function() {
				var e = this;
				if(!e.destroyed) {
					var t = e._pc.iceConnectionState,
						n = e._pc.iceGatheringState;
					e._debug("iceStateChange (connection: %s) (gathering: %s)", t, n), e.emit("iceStateChange", t, n), ("connected" === t || "completed" === t) && (e._pcReady = !0, e._maybeReady()), "failed" === t && e.destroy(a("Ice connection failed.", "ERR_ICE_CONNECTION_FAILURE")), "closed" === t && e.destroy(new Error("Ice connection closed."))
				}
			}, r.prototype.getStats = function(e) {
				var t = this;
				0 === t._pc.getStats.length ? t._pc.getStats().then(function(t) {
					var n = [];
					t.forEach(function(e) {
						n.push(e)
					}), e(null, n)
				}, function(t) {
					e(t)
				}) : t._isReactNativeWebrtc ? t._pc.getStats(null, function(t) {
					var n = [];
					t.forEach(function(e) {
						n.push(e)
					}), e(null, n)
				}, function(t) {
					e(t)
				}) : 0 < t._pc.getStats.length ? t._pc.getStats(function(n) {
					if(!t.destroyed) {
						var r = [];
						n.result().forEach(function(e) {
							var t = {};
							e.names().forEach(function(n) {
								t[n] = e.stat(n)
							}), t.id = e.id, t.type = e.type, t.timestamp = e.timestamp, r.push(t)
						}), e(null, r)
					}
				}, function(t) {
					e(t)
				}) : e(null, [])
			}, r.prototype._maybeReady = function() {
				function e() {
					t.destroyed || t.getStats(function(n, r) {
						function o(e) {
							l = !0;
							var n = i[e.localCandidateId];
							n && n.ip ? (t.localAddress = n.ip, t.localPort = +n.port) : n && n.ipAddress ? (t.localAddress = n.ipAddress, t.localPort = +n.portNumber) : "string" == typeof e.googLocalAddress && (n = e.googLocalAddress.split(":"), t.localAddress = n[0], t.localPort = +n[1]);
							var r = s[e.remoteCandidateId];
							r && r.ip ? (t.remoteAddress = r.ip, t.remotePort = +r.port) : r && r.ipAddress ? (t.remoteAddress = r.ipAddress, t.remotePort = +r.portNumber) : "string" == typeof e.googRemoteAddress && (r = e.googRemoteAddress.split(":"), t.remoteAddress = r[0], t.remotePort = +r[1]), t.remoteFamily = "IPv4", t._debug("connect local: %s:%s remote: %s:%s", t.localAddress, t.localPort, t.remoteAddress, t.remotePort)
						}
						if(!t.destroyed) {
							n && (r = []);
							var s = {},
								i = {},
								d = {},
								l = !1;
							if(r.forEach(function(e) {
									("remotecandidate" === e.type || "remote-candidate" === e.type) && (s[e.id] = e), ("localcandidate" === e.type || "local-candidate" === e.type) && (i[e.id] = e), ("candidatepair" === e.type || "candidate-pair" === e.type) && (d[e.id] = e)
								}), r.forEach(function(e) {
									"transport" === e.type && e.selectedCandidatePairId && o(d[e.selectedCandidatePairId]), ("googCandidatePair" === e.type && "true" === e.googActiveConnection || ("candidatepair" === e.type || "candidate-pair" === e.type) && e.selected) && o(e)
								}), !l && (!Object.keys(d).length || Object.keys(i).length)) return void setTimeout(e, 100);
							if(t._connecting = !1, t.connected = !0, t._chunk) {
								try {
									t.send(t._chunk)
								} catch(e) {
									return t.destroy(a(e, "ERR_DATA_CHANNEL"))
								}
								t._chunk = null, t._debug("sent chunk from \"write before connect\"");
								var c = t._cb;
								t._cb = null, c(null)
							}
							"number" != typeof t._channel.bufferedAmountLowThreshold && (t._interval = setInterval(function() {
								t._onInterval()
							}, 150), t._interval.unref && t._interval.unref()), t._debug("connect"), t.emit("connect")
						}
					})
				}
				var t = this;
				t._debug("maybeReady pc %s channel %s", t._pcReady, t._channelReady);
				t.connected || t._connecting || !t._pcReady || !t._channelReady || (t._connecting = !0, e())
			}, r.prototype._onInterval = function() {
				var e = this;
				e._cb && e._channel && !(e._channel.bufferedAmount > u) && e._onChannelBufferedAmountLow()
			}, r.prototype._onSignalingStateChange = function() {
				var e = this;
				e.destroyed || ("stable" === e._pc.signalingState && (e._isNegotiating = !1, e._debug("flushing sender queue", e._sendersAwaitingStable), e._sendersAwaitingStable.forEach(function(t) {
					e.removeTrack(t), e._queuedNegotiation = !0
				}), e._sendersAwaitingStable = [], e._queuedNegotiation && (e._debug("flushing negotiation queue"), e._queuedNegotiation = !1, e._needsNegotiation()), e._debug("negotiate"), e.emit("negotiate")), e._debug("signalingStateChange %s", e._pc.signalingState), e.emit("signalingStateChange", e._pc.signalingState))
			}, r.prototype._onIceCandidate = function(e) {
				var t = this;
				t.destroyed || (e.candidate && t.trickle ? t.emit("signal", {
					candidate: {
						candidate: e.candidate.candidate,
						sdpMLineIndex: e.candidate.sdpMLineIndex,
						sdpMid: e.candidate.sdpMid
					}
				}) : !e.candidate && (t._iceComplete = !0, t.emit("_iceComplete")))
			}, r.prototype._onChannelMessage = function(e) {
				var t = this;
				if(!t.destroyed) {
					var r = e.data;
					r instanceof ArrayBuffer && (r = n.from(r)), t.push(r)
				}
			}, r.prototype._onChannelBufferedAmountLow = function() {
				var e = this;
				if(!e.destroyed && e._cb) {
					e._debug("ending backpressure: bufferedAmount %d", e._channel.bufferedAmount);
					var t = e._cb;
					e._cb = null, t(null)
				}
			}, r.prototype._onChannelOpen = function() {
				var e = this;
				e.connected || e.destroyed || (e._debug("on channel open"), e._channelReady = !0, e._maybeReady())
			}, r.prototype._onChannelClose = function() {
				var e = this;
				e.destroyed || (e._debug("on channel close"), e.destroy())
			}, r.prototype._onTrack = function(e) {
				var t = this;
				t.destroyed || e.streams.forEach(function(n) {
					t._debug("on track"), t.emit("track", e.track, n), t._remoteTracks.push({
						track: e.track,
						stream: n
					});
					t._remoteStreams.some(function(e) {
						return e.id === n.id
					}) || (t._remoteStreams.push(n), setTimeout(function() {
						t.emit("stream", n)
					}, 0))
				})
			}, r.prototype._debug = function() {
				var e = this,
					t = [].slice.call(arguments);
				t[0] = "[" + e._id + "] " + t[0], s.apply(null, t)
			}, r.prototype._transformConstraints = function(e) {
				var t = this;
				if(0 === Object.keys(e).length) return e;
				if((e.mandatory || e.optional) && !t._isChromium) {
					var n = Object.assign({}, e.optional, e.mandatory);
					return void 0 !== n.OfferToReceiveVideo && (n.offerToReceiveVideo = n.OfferToReceiveVideo, delete n.OfferToReceiveVideo), void 0 !== n.OfferToReceiveAudio && (n.offerToReceiveAudio = n.OfferToReceiveAudio, delete n.OfferToReceiveAudio), n
				}
				return e.mandatory || e.optional || !t._isChromium ? e : (void 0 !== e.offerToReceiveVideo && (e.OfferToReceiveVideo = e.offerToReceiveVideo, delete e.offerToReceiveVideo), void 0 !== e.offerToReceiveAudio && (e.OfferToReceiveAudio = e.offerToReceiveAudio, delete e.offerToReceiveAudio), {
					mandatory: e
				})
			}
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41,
		debug: 77,
		"get-browser-rtc": 94,
		inherits: 99,
		randombytes: 212,
		"readable-stream": 253
	}],
	245: [function(e, t, n) {
		arguments[4][11][0].apply(n, arguments)
	}, {
		"./_stream_readable": 247,
		"./_stream_writable": 249,
		"core-util-is": 75,
		dup: 11,
		inherits: 99,
		"process-nextick-args": 204
	}],
	246: [function(e, t, n) {
		arguments[4][12][0].apply(n, arguments)
	}, {
		"./_stream_transform": 248,
		"core-util-is": 75,
		dup: 12,
		inherits: 99
	}],
	247: [function(e, t, n) {
		arguments[4][13][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 245,
		"./internal/streams/BufferList": 250,
		"./internal/streams/destroy": 251,
		"./internal/streams/stream": 252,
		_process: 205,
		"core-util-is": 75,
		dup: 13,
		events: 82,
		inherits: 99,
		isarray: 104,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		"string_decoder/": 296,
		util: 35
	}],
	248: [function(e, t, n) {
		arguments[4][14][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 245,
		"core-util-is": 75,
		dup: 14,
		inherits: 99
	}],
	249: [function(e, t, n) {
		arguments[4][15][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 245,
		"./internal/streams/destroy": 251,
		"./internal/streams/stream": 252,
		_process: 205,
		"core-util-is": 75,
		dup: 15,
		inherits: 99,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		timers: 301,
		"util-deprecate": 313
	}],
	250: [function(e, t, n) {
		arguments[4][16][0].apply(n, arguments)
	}, {
		dup: 16,
		"safe-buffer": 241,
		util: 35
	}],
	251: [function(e, t, n) {
		arguments[4][17][0].apply(n, arguments)
	}, {
		dup: 17,
		"process-nextick-args": 204
	}],
	252: [function(e, t, n) {
		arguments[4][18][0].apply(n, arguments)
	}, {
		dup: 18,
		events: 82
	}],
	253: [function(e, t, n) {
		arguments[4][19][0].apply(n, arguments)
	}, {
		"./lib/_stream_duplex.js": 245,
		"./lib/_stream_passthrough.js": 246,
		"./lib/_stream_readable.js": 247,
		"./lib/_stream_transform.js": 248,
		"./lib/_stream_writable.js": 249,
		dup: 19
	}],
	254: [function(e, t) {
		function n(e) {
			return i.digest(e)
		}

		function r(e, t) {
			return c ? void("string" == typeof e && (e = a(e)), c.digest({
				name: "sha-1"
			}, e).then(function(e) {
				t(o(new Uint8Array(e)))
			}, function() {
				t(n(e))
			})) : void setTimeout(t, 0, n(e))
		}

		function a(e) {
			for(var t = e.length, n = new Uint8Array(t), r = 0; r < t; r++) n[r] = e.charCodeAt(r);
			return n
		}

		function o(e) {
			for(var t = e.length, n = [], r = 0, a; r < t; r++) a = e[r], n.push((a >>> 4).toString(16)), n.push((15 & a).toString(16));
			return n.join("")
		}
		var s = e("rusha"),
			i = new s,
			d = "undefined" == typeof window ? self : window,
			l = d.crypto || d.msCrypto || {},
			c = l.subtle || l.webkitSubtle;
		try {
			c.digest({
				name: "sha-1"
			}, new Uint8Array).catch(function() {
				c = !1
			})
		} catch(e) {
			c = !1
		}
		t.exports = r, t.exports.sync = n
	}, {
		rusha: 240
	}],
	255: [function(e, t) {
		(function(n, r) {
			function a(e) {
				var t = this;
				if(!(t instanceof a)) return new a(e);
				if(e || (e = {}), "string" == typeof e && (e = {
						url: e
					}), null == e.url && null == e.socket) throw new Error("Missing required `url` or `socket` option");
				if(null != e.url && null != e.socket) throw new Error("Must specify either `url` or `socket` option, not both");
				if(t._id = i(4).toString("hex").slice(0, 7), t._debug("new websocket: %o", e), e = Object.assign({
						allowHalfOpen: !1
					}, e), d.Duplex.call(t, e), t.connected = !1, t.destroyed = !1, t._chunk = null, t._cb = null, t._interval = null, e.socket) t.url = e.socket.url, t._ws = e.socket;
				else {
					t.url = e.url;
					try {
						t._ws = "function" == typeof l ? new c(e.url, e) : new c(e.url)
					} catch(e) {
						return void n.nextTick(function() {
							t.destroy(e)
						})
					}
				}
				t._ws.binaryType = "arraybuffer", t._ws.onopen = function() {
					t._onOpen()
				}, t._ws.onmessage = function(e) {
					t._onMessage(e)
				}, t._ws.onclose = function() {
					t._onClose()
				}, t._ws.onerror = function() {
					t.destroy(new Error("connection error to " + t.url))
				}, t._onFinishBound = function() {
					t._onFinish()
				}, t.once("finish", t._onFinishBound)
			}
			t.exports = a;
			var o = e("debug")("simple-websocket"),
				s = e("inherits"),
				i = e("randombytes"),
				d = e("readable-stream"),
				l = e("ws"),
				c = "function" == typeof l ? l : WebSocket,
				u = 65536;
			s(a, d.Duplex), a.WEBSOCKET_SUPPORT = !!c, a.prototype.send = function(e) {
				this._ws.send(e)
			}, a.prototype.destroy = function(e) {
				this._destroy(e, function() {})
			}, a.prototype._destroy = function(e, t) {
				var n = this;
				if(!n.destroyed) {
					if(n._debug("destroy (error: %s)", e && (e.message || e)), n.readable = n.writable = !1, n._readableState.ended || n.push(null), n._writableState.finished || n.end(), n.connected = !1, n.destroyed = !0, clearInterval(n._interval), n._interval = null, n._chunk = null, n._cb = null, n._onFinishBound && n.removeListener("finish", n._onFinishBound), n._onFinishBound = null, n._ws) {
						var r = n._ws,
							a = function() {
								r.onclose = null
							};
						if(r.readyState === c.CLOSED) a();
						else try {
							r.onclose = a, r.close()
						} catch(e) {
							a()
						}
						r.onopen = null, r.onmessage = null, r.onerror = function() {}
					}
					if(n._ws = null, e) {
						if("undefined" != typeof DOMException && e instanceof DOMException) {
							var o = e.code;
							e = new Error(e.message), e.code = o
						}
						n.emit("error", e)
					}
					n.emit("close"), t()
				}
			}, a.prototype._read = function() {}, a.prototype._write = function(e, t, n) {
				if(this.destroyed) return n(new Error("cannot write after socket is destroyed"));
				if(this.connected) {
					try {
						this.send(e)
					} catch(e) {
						return this.destroy(e)
					}
					"function" != typeof l && this._ws.bufferedAmount > u ? (this._debug("start backpressure: bufferedAmount %d", this._ws.bufferedAmount), this._cb = n) : n(null)
				} else this._debug("write before connect"), this._chunk = e, this._cb = n
			}, a.prototype._onFinish = function() {
				function e() {
					setTimeout(function() {
						t.destroy()
					}, 1e3)
				}
				var t = this;
				t.destroyed || (t.connected ? e() : t.once("connect", e))
			}, a.prototype._onMessage = function(e) {
				if(!this.destroyed) {
					var t = e.data;
					t instanceof ArrayBuffer && (t = r.from(t)), this.push(t)
				}
			}, a.prototype._onOpen = function() {
				var e = this;
				if(!(e.connected || e.destroyed)) {
					if(e.connected = !0, e._chunk) {
						try {
							e.send(e._chunk)
						} catch(t) {
							return e.destroy(t)
						}
						e._chunk = null, e._debug("sent chunk from \"write before connect\"");
						var t = e._cb;
						e._cb = null, t(null)
					}
					"function" != typeof l && (e._interval = setInterval(function() {
						e._onInterval()
					}, 150), e._interval.unref && e._interval.unref()), e._debug("connect"), e.emit("connect")
				}
			}, a.prototype._onInterval = function() {
				if(this._cb && this._ws && !(this._ws.bufferedAmount > u)) {
					this._debug("ending backpressure: bufferedAmount %d", this._ws.bufferedAmount);
					var e = this._cb;
					this._cb = null, e(null)
				}
			}, a.prototype._onClose = function() {
				this.destroyed || (this._debug("on close"), this.destroy())
			}, a.prototype._debug = function() {
				var e = [].slice.call(arguments);
				e[0] = "[" + this._id + "] " + e[0], o.apply(null, e)
			}
		}).call(this, e("_process"), e("buffer").Buffer)
	}, {
		_process: 205,
		buffer: 41,
		debug: 77,
		inherits: 99,
		randombytes: 212,
		"readable-stream": 264,
		ws: 35
	}],
	256: [function(e, t, n) {
		arguments[4][11][0].apply(n, arguments)
	}, {
		"./_stream_readable": 258,
		"./_stream_writable": 260,
		"core-util-is": 75,
		dup: 11,
		inherits: 99,
		"process-nextick-args": 204
	}],
	257: [function(e, t, n) {
		arguments[4][12][0].apply(n, arguments)
	}, {
		"./_stream_transform": 259,
		"core-util-is": 75,
		dup: 12,
		inherits: 99
	}],
	258: [function(e, t, n) {
		arguments[4][13][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 256,
		"./internal/streams/BufferList": 261,
		"./internal/streams/destroy": 262,
		"./internal/streams/stream": 263,
		_process: 205,
		"core-util-is": 75,
		dup: 13,
		events: 82,
		inherits: 99,
		isarray: 104,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		"string_decoder/": 296,
		util: 35
	}],
	259: [function(e, t, n) {
		arguments[4][14][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 256,
		"core-util-is": 75,
		dup: 14,
		inherits: 99
	}],
	260: [function(e, t, n) {
		arguments[4][15][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 256,
		"./internal/streams/destroy": 262,
		"./internal/streams/stream": 263,
		_process: 205,
		"core-util-is": 75,
		dup: 15,
		inherits: 99,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		timers: 301,
		"util-deprecate": 313
	}],
	261: [function(e, t, n) {
		arguments[4][16][0].apply(n, arguments)
	}, {
		dup: 16,
		"safe-buffer": 241,
		util: 35
	}],
	262: [function(e, t, n) {
		arguments[4][17][0].apply(n, arguments)
	}, {
		dup: 17,
		"process-nextick-args": 204
	}],
	263: [function(e, t, n) {
		arguments[4][18][0].apply(n, arguments)
	}, {
		dup: 18,
		events: 82
	}],
	264: [function(e, t, n) {
		arguments[4][19][0].apply(n, arguments)
	}, {
		"./lib/_stream_duplex.js": 256,
		"./lib/_stream_passthrough.js": 257,
		"./lib/_stream_readable.js": 258,
		"./lib/_stream_transform.js": 259,
		"./lib/_stream_writable.js": 260,
		dup: 19
	}],
	265: [function(e, t) {
		var n = 1,
			r = 65535,
			a = 4,
			o = function() {
				n = n + 1 & r
			},
			s;
		t.exports = function(e) {
			s || (s = setInterval(o, 0 | 1e3 / a), s.unref && s.unref());
			var t = a * (e || 5),
				i = [0],
				d = 1,
				l = n - 1 & r;
			return function(e) {
				var o = n - l & r;
				for(o > t && (o = t), l = n; o--;) d === t && (d = 0), i[d] = i[0 === d ? t - 1 : d - 1], d++;
				e && (i[d - 1] += e);
				var s = i[d - 1],
					c = i.length < t ? 0 : i[d === t ? 0 : d];
				return i.length < a ? s : (s - c) * a / i.length
			}
		}
	}, {}],
	266: [function(e, t) {
		function n() {
			r.call(this)
		}
		t.exports = n;
		var r = e("events").EventEmitter,
			a = e("inherits");
		a(n, r), n.Readable = e("readable-stream/readable.js"), n.Writable = e("readable-stream/writable.js"), n.Duplex = e("readable-stream/duplex.js"), n.Transform = e("readable-stream/transform.js"), n.PassThrough = e("readable-stream/passthrough.js"), n.Stream = n, n.prototype.pipe = function(e, t) {
			function n(t) {
				e.writable && !1 === e.write(t) && l.pause && l.pause()
			}

			function a() {
				l.readable && l.resume && l.resume()
			}

			function o() {
				c || (c = !0, e.end())
			}

			function s() {
				c || (c = !0, "function" == typeof e.destroy && e.destroy())
			}

			function i(e) {
				if(d(), 0 === r.listenerCount(this, "error")) throw e
			}

			function d() {
				l.removeListener("data", n), e.removeListener("drain", a), l.removeListener("end", o), l.removeListener("close", s), l.removeListener("error", i), e.removeListener("error", i), l.removeListener("end", d), l.removeListener("close", d), e.removeListener("close", d)
			}
			var l = this;
			l.on("data", n), e.on("drain", a), e._isStdio || t && !1 === t.end || (l.on("end", o), l.on("close", s));
			var c = !1;
			return l.on("error", i), e.on("error", i), l.on("end", d), l.on("close", d), e.on("close", d), e.emit("pipe", l), e
		}
	}, {
		events: 82,
		inherits: 99,
		"readable-stream/duplex.js": 267,
		"readable-stream/passthrough.js": 276,
		"readable-stream/readable.js": 277,
		"readable-stream/transform.js": 278,
		"readable-stream/writable.js": 279
	}],
	267: [function(e, t) {
		t.exports = e("./lib/_stream_duplex.js")
	}, {
		"./lib/_stream_duplex.js": 268
	}],
	268: [function(e, t, n) {
		arguments[4][11][0].apply(n, arguments)
	}, {
		"./_stream_readable": 270,
		"./_stream_writable": 272,
		"core-util-is": 75,
		dup: 11,
		inherits: 99,
		"process-nextick-args": 204
	}],
	269: [function(e, t, n) {
		arguments[4][12][0].apply(n, arguments)
	}, {
		"./_stream_transform": 271,
		"core-util-is": 75,
		dup: 12,
		inherits: 99
	}],
	270: [function(e, t, n) {
		arguments[4][13][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 268,
		"./internal/streams/BufferList": 273,
		"./internal/streams/destroy": 274,
		"./internal/streams/stream": 275,
		_process: 205,
		"core-util-is": 75,
		dup: 13,
		events: 82,
		inherits: 99,
		isarray: 104,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		"string_decoder/": 296,
		util: 35
	}],
	271: [function(e, t, n) {
		arguments[4][14][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 268,
		"core-util-is": 75,
		dup: 14,
		inherits: 99
	}],
	272: [function(e, t, n) {
		arguments[4][15][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 268,
		"./internal/streams/destroy": 274,
		"./internal/streams/stream": 275,
		_process: 205,
		"core-util-is": 75,
		dup: 15,
		inherits: 99,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		timers: 301,
		"util-deprecate": 313
	}],
	273: [function(e, t, n) {
		arguments[4][16][0].apply(n, arguments)
	}, {
		dup: 16,
		"safe-buffer": 241,
		util: 35
	}],
	274: [function(e, t, n) {
		arguments[4][17][0].apply(n, arguments)
	}, {
		dup: 17,
		"process-nextick-args": 204
	}],
	275: [function(e, t, n) {
		arguments[4][18][0].apply(n, arguments)
	}, {
		dup: 18,
		events: 82
	}],
	276: [function(e, t) {
		t.exports = e("./readable").PassThrough
	}, {
		"./readable": 277
	}],
	277: [function(e, t, n) {
		arguments[4][19][0].apply(n, arguments)
	}, {
		"./lib/_stream_duplex.js": 268,
		"./lib/_stream_passthrough.js": 269,
		"./lib/_stream_readable.js": 270,
		"./lib/_stream_transform.js": 271,
		"./lib/_stream_writable.js": 272,
		dup: 19
	}],
	278: [function(e, t) {
		t.exports = e("./readable").Transform
	}, {
		"./readable": 277
	}],
	279: [function(e, t) {
		t.exports = e("./lib/_stream_writable.js")
	}, {
		"./lib/_stream_writable.js": 272
	}],
	280: [function(e, t, n) {
		(function(t) {
			var r = e("./lib/request"),
				a = e("./lib/response"),
				o = e("xtend"),
				s = e("builtin-status-codes"),
				i = e("url"),
				d = n;
			d.request = function(e, n) {
				e = "string" == typeof e ? i.parse(e) : o(e);
				var a = -1 === t.location.protocol.search(/^https?:$/) ? "http:" : "",
					s = e.protocol || a,
					d = e.hostname || e.host,
					l = e.port,
					c = e.path || "/";
				d && -1 !== d.indexOf(":") && (d = "[" + d + "]"), e.url = (d ? s + "//" + d : "") + (l ? ":" + l : "") + c, e.method = (e.method || "GET").toUpperCase(), e.headers = e.headers || {};
				var u = new r(e);
				return n && u.on("response", n), u
			}, d.get = function(e, t) {
				var n = d.request(e, t);
				return n.end(), n
			}, d.ClientRequest = r, d.IncomingMessage = a.IncomingMessage, d.Agent = function() {}, d.Agent.defaultMaxSockets = 4, d.globalAgent = new d.Agent, d.STATUS_CODES = s, d.METHODS = ["CHECKOUT", "CONNECT", "COPY", "DELETE", "GET", "HEAD", "LOCK", "M-SEARCH", "MERGE", "MKACTIVITY", "MKCOL", "MOVE", "NOTIFY", "OPTIONS", "PATCH", "POST", "PROPFIND", "PROPPATCH", "PURGE", "PUT", "REPORT", "SEARCH", "SUBSCRIBE", "TRACE", "UNLOCK", "UNSUBSCRIBE"]
		}).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
	}, {
		"./lib/request": 282,
		"./lib/response": 283,
		"builtin-status-codes": 42,
		url: 310,
		xtend: 325
	}],
	281: [function(e, t, n) {
		(function(e) {
			function t() {
				if(i !== void 0) return i;
				if(e.XMLHttpRequest) {
					i = new e.XMLHttpRequest;
					try {
						i.open("GET", e.XDomainRequest ? "/" : "https://example.com")
					} catch(t) {
						i = null
					}
				} else i = null;
				return i
			}

			function r(e) {
				var n = t();
				if(!n) return !1;
				try {
					return n.responseType = e, n.responseType === e
				} catch(t) {}
				return !1
			}

			function a(e) {
				return "function" == typeof e
			}
			n.fetch = a(e.fetch) && a(e.ReadableStream), n.writableStream = a(e.WritableStream), n.abortController = a(e.AbortController), n.blobConstructor = !1;
			try {
				new Blob([new ArrayBuffer(1)]), n.blobConstructor = !0
			} catch(t) {}
			var o = "undefined" != typeof e.ArrayBuffer,
				s = o && a(e.ArrayBuffer.prototype.slice),
				i;
			n.arraybuffer = n.fetch || o && r("arraybuffer"), n.msstream = !n.fetch && s && r("ms-stream"), n.mozchunkedarraybuffer = !n.fetch && o && r("moz-chunked-arraybuffer"), n.overrideMimeType = n.fetch || !!t() && a(t().overrideMimeType), n.vbArray = a(e.VBArray), i = null
		}).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
	}, {}],
	282: [function(e, t) {
		(function(n, r, a) {
			function o(e, t) {
				return i.fetch && t ? "fetch" : i.mozchunkedarraybuffer ? "moz-chunked-arraybuffer" : i.msstream ? "ms-stream" : i.arraybuffer && e ? "arraybuffer" : i.vbArray && e ? "text:vbarray" : "text"
			}

			function s(e) {
				try {
					var t = e.status;
					return null !== t && 0 !== t
				} catch(t) {
					return !1
				}
			}
			var i = e("./capability"),
				d = e("inherits"),
				l = e("./response"),
				c = e("readable-stream"),
				u = e("to-arraybuffer"),
				p = l.IncomingMessage,
				f = l.readyStates,
				m = t.exports = function(e) {
					var t = this;
					c.Writable.call(t), t._opts = e, t._body = [], t._headers = {}, e.auth && t.setHeader("Authorization", "Basic " + new a(e.auth).toString("base64")), Object.keys(e.headers).forEach(function(n) {
						t.setHeader(n, e.headers[n])
					});
					var n = !0,
						r;
					if("disable-fetch" === e.mode || "requestTimeout" in e && !i.abortController) n = !1, r = !0;
					else if("prefer-streaming" === e.mode) r = !1;
					else if("allow-wrong-content-type" === e.mode) r = !i.overrideMimeType;
					else if(!e.mode || "default" === e.mode || "prefer-fast" === e.mode) r = !0;
					else throw new Error("Invalid value for opts.mode");
					t._mode = o(r, n), t._fetchTimer = null, t.on("finish", function() {
						t._onFinish()
					})
				};
			d(m, c.Writable), m.prototype.setHeader = function(e, t) {
				var n = this,
					r = e.toLowerCase(); - 1 !== h.indexOf(r) || (n._headers[r] = {
					name: e,
					value: t
				})
			}, m.prototype.getHeader = function(e) {
				var t = this._headers[e.toLowerCase()];
				return t ? t.value : null
			}, m.prototype.removeHeader = function(e) {
				var t = this;
				delete t._headers[e.toLowerCase()]
			}, m.prototype._onFinish = function() {
				var e = this;
				if(!e._destroyed) {
					var t = e._opts,
						o = e._headers,
						s = null;
					"GET" !== t.method && "HEAD" !== t.method && (i.arraybuffer ? s = u(a.concat(e._body)) : i.blobConstructor ? s = new r.Blob(e._body.map(function(e) {
						return u(e)
					}), {
						type: (o["content-type"] || {}).value || ""
					}) : s = a.concat(e._body).toString());
					var d = [];
					if(Object.keys(o).forEach(function(e) {
							var t = o[e].name,
								n = o[e].value;
							Array.isArray(n) ? n.forEach(function(e) {
								d.push([t, e])
							}) : d.push([t, n])
						}), "fetch" === e._mode) {
						var l = null;
						if(i.abortController) {
							var c = new AbortController;
							l = c.signal, e._fetchAbortController = c, "requestTimeout" in t && 0 !== t.requestTimeout && (e._fetchTimer = r.setTimeout(function() {
								e.emit("requestTimeout"), e._fetchAbortController && e._fetchAbortController.abort()
							}, t.requestTimeout))
						}
						r.fetch(e._opts.url, {
							method: e._opts.method,
							headers: d,
							body: s || void 0,
							mode: "cors",
							credentials: t.withCredentials ? "include" : "same-origin",
							signal: l
						}).then(function(t) {
							e._fetchResponse = t, e._connect()
						}, function(t) {
							r.clearTimeout(e._fetchTimer), e._destroyed || e.emit("error", t)
						})
					} else {
						var p = e._xhr = new r.XMLHttpRequest;
						try {
							p.open(e._opts.method, e._opts.url, !0)
						} catch(t) {
							return void n.nextTick(function() {
								e.emit("error", t)
							})
						}
						"responseType" in p && (p.responseType = e._mode.split(":")[0]), "withCredentials" in p && (p.withCredentials = !!t.withCredentials), "text" === e._mode && "overrideMimeType" in p && p.overrideMimeType("text/plain; charset=x-user-defined"), "requestTimeout" in t && (p.timeout = t.requestTimeout, p.ontimeout = function() {
							e.emit("requestTimeout")
						}), d.forEach(function(e) {
							p.setRequestHeader(e[0], e[1])
						}), e._response = null, p.onreadystatechange = function() {
							switch(p.readyState) {
								case f.LOADING:
								case f.DONE:
									e._onXHRProgress();
							}
						}, "moz-chunked-arraybuffer" === e._mode && (p.onprogress = function() {
							e._onXHRProgress()
						}), p.onerror = function() {
							e._destroyed || e.emit("error", new Error("XHR error"))
						};
						try {
							p.send(s)
						} catch(t) {
							return void n.nextTick(function() {
								e.emit("error", t)
							})
						}
					}
				}
			}, m.prototype._onXHRProgress = function() {
				var e = this;
				!s(e._xhr) || e._destroyed || (!e._response && e._connect(), e._response._onXHRProgress())
			}, m.prototype._connect = function() {
				var e = this;
				e._destroyed || (e._response = new p(e._xhr, e._fetchResponse, e._mode, e._fetchTimer), e._response.on("error", function(t) {
					e.emit("error", t)
				}), e.emit("response", e._response))
			}, m.prototype._write = function(e, t, n) {
				var r = this;
				r._body.push(e), n()
			}, m.prototype.abort = m.prototype.destroy = function() {
				var e = this;
				e._destroyed = !0, r.clearTimeout(e._fetchTimer), e._response && (e._response._destroyed = !0), e._xhr ? e._xhr.abort() : e._fetchAbortController && e._fetchAbortController.abort()
			}, m.prototype.end = function(e, t, n) {
				var r = this;
				"function" == typeof e && (n = e, e = void 0), c.Writable.prototype.end.call(r, e, t, n)
			}, m.prototype.flushHeaders = function() {}, m.prototype.setTimeout = function() {}, m.prototype.setNoDelay = function() {}, m.prototype.setSocketKeepAlive = function() {};
			var h = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "date", "dnt", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "via"]
		}).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global, e("buffer").Buffer)
	}, {
		"./capability": 281,
		"./response": 283,
		_process: 205,
		buffer: 41,
		inherits: 99,
		"readable-stream": 292,
		"to-arraybuffer": 302
	}],
	283: [function(e, t, n) {
		(function(t, r, a) {
			var o = e("./capability"),
				s = e("inherits"),
				i = e("readable-stream"),
				d = n.readyStates = {
					UNSENT: 0,
					OPENED: 1,
					HEADERS_RECEIVED: 2,
					LOADING: 3,
					DONE: 4
				},
				l = n.IncomingMessage = function(e, n, s, d) {
					var l = this;
					if(i.Readable.call(l), l._mode = s, l.headers = {}, l.rawHeaders = [], l.trailers = {}, l.rawTrailers = [], l.on("end", function() {
							t.nextTick(function() {
								l.emit("close")
							})
						}), "fetch" === s) {
						function e() {
							u.read().then(function(t) {
								return l._destroyed ? void 0 : t.done ? (r.clearTimeout(d), void l.push(null)) : void(l.push(new a(t.value)), e())
							}).catch(function(e) {
								r.clearTimeout(d), l._destroyed || l.emit("error", e)
							})
						}
						if(l._fetchResponse = n, l.url = n.url, l.statusCode = n.status, l.statusMessage = n.statusText, n.headers.forEach(function(e, t) {
								l.headers[t.toLowerCase()] = e, l.rawHeaders.push(t, e)
							}), o.writableStream) {
							var c = new WritableStream({
								write: function(e) {
									return new Promise(function(t, n) {
										l._destroyed ? n() : l.push(new a(e)) ? t() : l._resumeFetch = t
									})
								},
								close: function() {
									r.clearTimeout(d), l._destroyed || l.push(null)
								},
								abort: function(e) {
									l._destroyed || l.emit("error", e)
								}
							});
							try {
								return void n.body.pipeTo(c).catch(function(e) {
									r.clearTimeout(d), l._destroyed || l.emit("error", e)
								})
							} catch(t) {}
						}
						var u = n.body.getReader();
						e()
					} else {
						l._xhr = e, l._pos = 0, l.url = e.responseURL, l.statusCode = e.status, l.statusMessage = e.statusText;
						var p = e.getAllResponseHeaders().split(/\r?\n/);
						if(p.forEach(function(e) {
								var t = e.match(/^([^:]+):\s*(.*)/);
								if(t) {
									var n = t[1].toLowerCase();
									"set-cookie" === n ? (void 0 === l.headers[n] && (l.headers[n] = []), l.headers[n].push(t[2])) : void 0 === l.headers[n] ? l.headers[n] = t[2] : l.headers[n] += ", " + t[2], l.rawHeaders.push(t[1], t[2])
								}
							}), l._charset = "x-user-defined", !o.overrideMimeType) {
							var f = l.rawHeaders["mime-type"];
							if(f) {
								var m = f.match(/;\s*charset=([^;])(;|$)/);
								m && (l._charset = m[1].toLowerCase())
							}
							l._charset || (l._charset = "utf-8")
						}
					}
				};
			s(l, i.Readable), l.prototype._read = function() {
				var e = this,
					t = e._resumeFetch;
				t && (e._resumeFetch = null, t())
			}, l.prototype._onXHRProgress = function() {
				var t = this,
					e = t._xhr,
					n = null;
				switch(t._mode) {
					case "text:vbarray":
						if(e.readyState !== d.DONE) break;
						try {
							n = new r.VBArray(e.responseBody).toArray()
						} catch(t) {}
						if(null !== n) {
							t.push(new a(n));
							break
						}
					case "text":
						try {
							n = e.responseText
						} catch(n) {
							t._mode = "text:vbarray";
							break
						}
						if(n.length > t._pos) {
							var o = n.substr(t._pos);
							if("x-user-defined" === t._charset) {
								for(var s = new a(o.length), l = 0; l < o.length; l++) s[l] = 255 & o.charCodeAt(l);
								t.push(s)
							} else t.push(o, t._charset);
							t._pos = n.length
						}
						break;
					case "arraybuffer":
						if(e.readyState !== d.DONE || !e.response) break;
						n = e.response, t.push(new a(new Uint8Array(n)));
						break;
					case "moz-chunked-arraybuffer":
						if(n = e.response, e.readyState !== d.LOADING || !n) break;
						t.push(new a(new Uint8Array(n)));
						break;
					case "ms-stream":
						if(n = e.response, e.readyState !== d.LOADING) break;
						var c = new r.MSStreamReader;
						c.onprogress = function() {
							c.result.byteLength > t._pos && (t.push(new a(new Uint8Array(c.result.slice(t._pos)))), t._pos = c.result.byteLength)
						}, c.onload = function() {
							t.push(null)
						}, c.readAsArrayBuffer(n);
				}
				t._xhr.readyState === d.DONE && "ms-stream" !== t._mode && t.push(null)
			}
		}).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global, e("buffer").Buffer)
	}, {
		"./capability": 281,
		_process: 205,
		buffer: 41,
		inherits: 99,
		"readable-stream": 292
	}],
	284: [function(e, t, n) {
		arguments[4][11][0].apply(n, arguments)
	}, {
		"./_stream_readable": 286,
		"./_stream_writable": 288,
		"core-util-is": 75,
		dup: 11,
		inherits: 99,
		"process-nextick-args": 204
	}],
	285: [function(e, t, n) {
		arguments[4][12][0].apply(n, arguments)
	}, {
		"./_stream_transform": 287,
		"core-util-is": 75,
		dup: 12,
		inherits: 99
	}],
	286: [function(e, t, n) {
		arguments[4][13][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 284,
		"./internal/streams/BufferList": 289,
		"./internal/streams/destroy": 290,
		"./internal/streams/stream": 291,
		_process: 205,
		"core-util-is": 75,
		dup: 13,
		events: 82,
		inherits: 99,
		isarray: 104,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		"string_decoder/": 296,
		util: 35
	}],
	287: [function(e, t, n) {
		arguments[4][14][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 284,
		"core-util-is": 75,
		dup: 14,
		inherits: 99
	}],
	288: [function(e, t, n) {
		arguments[4][15][0].apply(n, arguments)
	}, {
		"./_stream_duplex": 284,
		"./internal/streams/destroy": 290,
		"./internal/streams/stream": 291,
		_process: 205,
		"core-util-is": 75,
		dup: 15,
		inherits: 99,
		"process-nextick-args": 204,
		"safe-buffer": 241,
		timers: 301,
		"util-deprecate": 313
	}],
	289: [function(e, t, n) {
		arguments[4][16][0].apply(n, arguments)
	}, {
		dup: 16,
		"safe-buffer": 241,
		util: 35
	}],
	290: [function(e, t, n) {
		arguments[4][17][0].apply(n, arguments)
	}, {
		dup: 17,
		"process-nextick-args": 204
	}],
	291: [function(e, t, n) {
		arguments[4][18][0].apply(n, arguments)
	}, {
		dup: 18,
		events: 82
	}],
	292: [function(e, t, n) {
		arguments[4][19][0].apply(n, arguments)
	}, {
		"./lib/_stream_duplex.js": 284,
		"./lib/_stream_passthrough.js": 285,
		"./lib/_stream_readable.js": 286,
		"./lib/_stream_transform.js": 287,
		"./lib/_stream_writable.js": 288,
		dup: 19
	}],
	293: [function(e, t) {
		var n = e("stream-to-blob");
		t.exports = function e(t, r, a) {
			return "function" == typeof r ? e(t, null, r) : void n(t, r, function(e, t) {
				if(e) return a(e);
				var n = URL.createObjectURL(t);
				a(null, n)
			})
		}
	}, {
		"stream-to-blob": 294
	}],
	294: [function(e, t) {
		var n = e("once");
		t.exports = function e(t, r, a) {
			if("function" == typeof r) return e(t, null, r);
			a = n(a);
			var o = [];
			t.on("data", function(e) {
				o.push(e)
			}).on("end", function() {
				var e = r ? new Blob(o, {
					type: r
				}) : new Blob(o);
				a(null, e)
			}).on("error", a)
		}
	}, {
		once: 182
	}],
	295: [function(e, t) {
		(function(n) {
			var r = e("once");
			t.exports = function(e, t, a) {
				a = r(a);
				var o = n.alloc(t),
					s = 0;
				e.on("data", function(e) {
					e.copy(o, s), s += e.length
				}).on("end", function() {
					a(null, o)
				}).on("error", a)
			}
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41,
		once: 182
	}],
	296: [function(e, t, n) {
		"use strict";

		function r(e) {
			if(!e) return "utf8";
			for(var t;;) switch(e) {
				case "utf8":
				case "utf-8":
					return "utf8";
				case "ucs2":
				case "ucs-2":
				case "utf16le":
				case "utf-16le":
					return "utf16le";
				case "latin1":
				case "binary":
					return "latin1";
				case "base64":
				case "ascii":
				case "hex":
					return e;
				default:
					if(t) return;
					e = ("" + e).toLowerCase(), t = !0;
			}
		}

		function a(e) {
			var t = r(e);
			if("string" != typeof t && (_.isEncoding === g || !g(e))) throw new Error("Unknown encoding: " + e);
			return t || e
		}

		function o(e) {
			this.encoding = a(e);
			var t;
			switch(this.encoding) {
				case "utf16le":
					this.text = c, this.end = u, t = 4;
					break;
				case "utf8":
					this.fillLast = l, t = 4;
					break;
				case "base64":
					this.text = p, this.end = f, t = 3;
					break;
				default:
					return this.write = m, void(this.end = h);
			}
			this.lastNeed = 0, this.lastTotal = 0, this.lastChar = _.allocUnsafe(t)
		}

		function s(e) {
			if(127 >= e) return 0;
			return 6 == e >> 5 ? 2 : 14 == e >> 4 ? 3 : 30 == e >> 3 ? 4 : 2 == e >> 6 ? -1 : -2
		}

		function d(e, t, n) {
			var r = t.length - 1;
			if(r < n) return 0;
			var a = s(t[r]);
			return 0 <= a ? (0 < a && (e.lastNeed = a - 1), a) : --r < n || -2 === a ? 0 : (a = s(t[r]), 0 <= a) ? (0 < a && (e.lastNeed = a - 2), a) : --r < n || -2 === a ? 0 : (a = s(t[r]), 0 <= a ? (0 < a && (2 === a ? a = 0 : e.lastNeed = a - 3), a) : 0)
		}

		function i(e, t) {
			if(128 != (192 & t[0])) return e.lastNeed = 0, "\uFFFD";
			if(1 < e.lastNeed && 1 < t.length) {
				if(128 != (192 & t[1])) return e.lastNeed = 1, "\uFFFD";
				if(2 < e.lastNeed && 2 < t.length && 128 != (192 & t[2])) return e.lastNeed = 2, "\uFFFD"
			}
		}

		function l(e) {
			var t = this.lastTotal - this.lastNeed,
				n = i(this, e, t);
			return void 0 === n ? this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : void(e.copy(this.lastChar, t, 0, e.length), this.lastNeed -= e.length) : n
		}

		function c(e, t) {
			if(0 == (e.length - t) % 2) {
				var n = e.toString("utf16le", t);
				if(n) {
					var r = n.charCodeAt(n.length - 1);
					if(55296 <= r && 56319 >= r) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], n.slice(0, -1)
				}
				return n
			}
			return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1)
		}

		function u(e) {
			var t = e && e.length ? this.write(e) : "";
			if(this.lastNeed) {
				var n = this.lastTotal - this.lastNeed;
				return t + this.lastChar.toString("utf16le", 0, n)
			}
			return t
		}

		function p(e, t) {
			var r = (e.length - t) % 3;
			return 0 == r ? e.toString("base64", t) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 == r ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - r))
		}

		function f(e) {
			var t = e && e.length ? this.write(e) : "";
			return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t
		}

		function m(e) {
			return e.toString(this.encoding)
		}

		function h(e) {
			return e && e.length ? this.write(e) : ""
		}
		var _ = e("safe-buffer").Buffer,
			g = _.isEncoding || function(e) {
				switch(e = "" + e, e && e.toLowerCase()) {
					case "hex":
					case "utf8":
					case "utf-8":
					case "ascii":
					case "binary":
					case "base64":
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
					case "raw":
						return !0;
					default:
						return !1;
				}
			};
		n.StringDecoder = o, o.prototype.write = function(e) {
			if(0 === e.length) return "";
			var t, n;
			if(this.lastNeed) {
				if(t = this.fillLast(e), void 0 === t) return "";
				n = this.lastNeed, this.lastNeed = 0
			} else n = 0;
			return n < e.length ? t ? t + this.text(e, n) : this.text(e, n) : t || ""
		}, o.prototype.end = function(e) {
			var t = e && e.length ? this.write(e) : "";
			return this.lastNeed ? t + "\uFFFD" : t
		}, o.prototype.text = function(e, t) {
			var n = d(this, e, t);
			if(!this.lastNeed) return e.toString("utf8", t);
			this.lastTotal = n;
			var r = e.length - (n - this.lastNeed);
			return e.copy(this.lastChar, 0, r), e.toString("utf8", t, r)
		}, o.prototype.fillLast = function(e) {
			return this.lastNeed <= e.length ? (e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : void(e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length)
		}
	}, {
		"safe-buffer": 241
	}],
	297: [function(e, t, n) {
		var r = e("./thirty-two");
		n.encode = r.encode, n.decode = r.decode
	}, {
		"./thirty-two": 298
	}],
	298: [function(e, t, n) {
		(function(e) {
			"use strict";

			function t(e) {
				var t = Math.floor(e.length / 5);
				return 0 == e.length % 5 ? t : t + 1
			}
			var r = [255, 255, 26, 27, 28, 29, 30, 31, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255];
			n.encode = function(n) {
				e.isBuffer(n) || (n = new e(n));
				for(var r = 0, a = 0, o = 0, s = 0, d = new e(8 * t(n)); r < n.length;) {
					var l = n[r];
					3 < o ? (s = l & 255 >> o, o = (o + 5) % 8, s = s << o | (r + 1 < n.length ? n[r + 1] : 0) >> 8 - o, r++) : (s = 31 & l >> 8 - (o + 5), o = (o + 5) % 8, 0 === o && r++), d[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".charCodeAt(s), a++
				}
				for(r = a; r < d.length; r++) d[r] = 61;
				return d
			}, n.decode = function(t) {
				var n = 0,
					a = 0,
					o = 0,
					s;
				e.isBuffer(t) || (t = new e(t));
				for(var d = new e(Math.ceil(5 * t.length / 8)), l = 0; l < t.length && !(61 === t[l]); l++) {
					var c = t[l] - 48;
					if(c < r.length) a = r[c], 3 >= n ? (n = (n + 5) % 8, 0 == n ? (s |= a, d[o] = s, o++, s = 0) : s |= 255 & a << 8 - n) : (n = (n + 5) % 8, s |= 255 & a >>> n, d[o] = s, o++, s = 255 & a << 8 - n);
					else throw new Error("Invalid input - it is not base32 encoded string")
				}
				return d.slice(0, o)
			}
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41
	}],
	299: [function(e, t) {
		t.exports = function(e, t) {
			function n() {
				i = 0, r = +new Date, s = e.apply(a, o), a = null, o = null
			}
			var r = 0,
				a, o, s, i;
			return function() {
				a = this, o = arguments;
				var e = new Date - r;
				return i || (e >= t ? n() : i = setTimeout(n, t - e)), s
			}
		}
	}, {}],
	300: [function(e, t) {
		(function(e) {
			"use strict";

			function n(e) {
				return "[object Error]" === Object.prototype.toString.call(e)
			}

			function r() {}

			function a(e, t) {
				e.apply(null, t)
			}
			var o = function(t, n, r) {
				e.nextTick(function() {
					t(n, r)
				})
			};
			e.nextTick(function(t) {
				42 === t && (o = e.nextTick)
			}, 42), t.exports = function(e) {
				function t(e) {
					i(e || r)
				}

				function s(t) {
					var r = [t];
					i = function(e) {
						r.push(e)
					}, e(function(e) {
						function t(e) {
							o(a, e, d)
						}
						var d = arguments;
						for(i = n(e) ? s : t; r.length;) t(r.shift())
					})
				}
				var i = s;
				return t
			}
		}).call(this, e("_process"))
	}, {
		_process: 205
	}],
	301: [function(e, t, n) {
		(function(t, r) {
			function a(e, t) {
				this._id = e, this._clearFn = t
			}
			var o = e("process/browser.js").nextTick,
				s = Function.prototype.apply,
				i = Array.prototype.slice,
				d = {},
				l = 0;
			n.setTimeout = function() {
				return new a(s.call(setTimeout, window, arguments), clearTimeout)
			}, n.setInterval = function() {
				return new a(s.call(setInterval, window, arguments), clearInterval)
			}, n.clearTimeout = n.clearInterval = function(e) {
				e.close()
			}, a.prototype.unref = a.prototype.ref = function() {}, a.prototype.close = function() {
				this._clearFn.call(window, this._id)
			}, n.enroll = function(e, t) {
				clearTimeout(e._idleTimeoutId), e._idleTimeout = t
			}, n.unenroll = function(e) {
				clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
			}, n._unrefActive = n.active = function(e) {
				clearTimeout(e._idleTimeoutId);
				var t = e._idleTimeout;
				0 <= t && (e._idleTimeoutId = setTimeout(function() {
					e._onTimeout && e._onTimeout()
				}, t))
			}, n.setImmediate = "function" == typeof t ? t : function(e) {
				var t = l++,
					r = !(2 > arguments.length) && i.call(arguments, 1);
				return d[t] = !0, o(function() {
					d[t] && (r ? e.apply(null, r) : e.call(null), n.clearImmediate(t))
				}), t
			}, n.clearImmediate = "function" == typeof r ? r : function(e) {
				delete d[e]
			}
		}).call(this, e("timers").setImmediate, e("timers").clearImmediate)
	}, {
		"process/browser.js": 205,
		timers: 301
	}],
	302: [function(e, t) {
		var n = e("buffer").Buffer;
		t.exports = function(e) {
			if(e instanceof Uint8Array) {
				if(0 === e.byteOffset && e.byteLength === e.buffer.byteLength) return e.buffer;
				if("function" == typeof e.buffer.slice) return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)
			}
			if(n.isBuffer(e)) {
				for(var t = new Uint8Array(e.length), r = e.length, a = 0; a < r; a++) t[a] = e[a];
				return t.buffer
			}
			throw new Error("Argument must be a Buffer")
		}
	}, {
		buffer: 41
	}],
	303: [function(e, t) {
		(function(n) {
			const r = e("debug")("torrent-discovery"),
				a = e("bittorrent-dht/client"),
				o = e("events").EventEmitter,
				s = e("run-parallel"),
				i = e("bittorrent-tracker/client");
			t.exports = class extends o {
				constructor(e) {
					if(super(), !e.peerId) throw new Error("Option `peerId` is required");
					if(!e.infoHash) throw new Error("Option `infoHash` is required");
					if(!n.browser && !e.port) throw new Error("Option `port` is required");
					this.peerId = "string" == typeof e.peerId ? e.peerId : e.peerId.toString("hex"), this.infoHash = "string" == typeof e.infoHash ? e.infoHash.toLowerCase() : e.infoHash.toString("hex"), this._port = e.port, this._userAgent = e.userAgent, this.destroyed = !1, this._announce = e.announce || [], this._intervalMs = e.intervalMs || 900000, this._trackerOpts = null, this._dhtAnnouncing = !1, this._dhtTimeout = !1, this._internalDHT = !1, this._onWarning = e => {
						this.emit("warning", e)
					}, this._onError = e => {
						this.emit("error", e)
					}, this._onDHTPeer = (e, t) => {
						t.toString("hex") !== this.infoHash || this.emit("peer", `${e.host}:${e.port}`, "dht")
					}, this._onTrackerPeer = e => {
						this.emit("peer", e, "tracker")
					}, this._onTrackerAnnounce = () => {
						this.emit("trackerAnnounce")
					};
					const t = (e, t) => {
						const n = new a(t);
						return n.on("warning", this._onWarning), n.on("error", this._onError), n.listen(e), this._internalDHT = !0, n
					};
					!1 === e.tracker ? this.tracker = null : e.tracker && "object" == typeof e.tracker ? (this._trackerOpts = Object.assign({}, e.tracker), this.tracker = this._createTracker()) : this.tracker = this._createTracker(), this.dht = !1 === e.dht || "function" != typeof a ? null : e.dht && "function" == typeof e.dht.addNode ? e.dht : e.dht && "object" == typeof e.dht ? t(e.dhtPort, e.dht) : t(e.dhtPort), this.dht && (this.dht.on("peer", this._onDHTPeer), this._dhtAnnounce())
				}
				updatePort(e) {
					e === this._port || (this._port = e, this.dht && this._dhtAnnounce(), this.tracker && (this.tracker.stop(), this.tracker.destroy(() => {
						this.tracker = this._createTracker()
					})))
				}
				complete(e) {
					this.tracker && this.tracker.complete(e)
				}
				destroy(e) {
					if(!this.destroyed) {
						this.destroyed = !0, clearTimeout(this._dhtTimeout);
						const t = [];
						this.tracker && (this.tracker.stop(), this.tracker.removeListener("warning", this._onWarning), this.tracker.removeListener("error", this._onError), this.tracker.removeListener("peer", this._onTrackerPeer), this.tracker.removeListener("update", this._onTrackerAnnounce), t.push(e => {
							this.tracker.destroy(e)
						})), this.dht && this.dht.removeListener("peer", this._onDHTPeer), this._internalDHT && (this.dht.removeListener("warning", this._onWarning), this.dht.removeListener("error", this._onError), t.push(e => {
							this.dht.destroy(e)
						})), s(t, e), this.dht = null, this.tracker = null, this._announce = null
					}
				}
				_createTracker() {
					const e = Object.assign({}, this._trackerOpts, {
							infoHash: this.infoHash,
							announce: this._announce,
							peerId: this.peerId,
							port: this._port,
							userAgent: this._userAgent
						}),
						t = new i(e);
					return t.on("warning", this._onWarning), t.on("error", this._onError), t.on("peer", this._onTrackerPeer), t.on("update", this._onTrackerAnnounce), t.setInterval(this._intervalMs), t.start(), t
				}
				_dhtAnnounce() {
					this._dhtAnnouncing || (r("dht announce"), this._dhtAnnouncing = !0, clearTimeout(this._dhtTimeout), this.dht.announce(this.infoHash, this._port, e => {
						this._dhtAnnouncing = !1, r("dht announce complete"), e && this.emit("warning", e), this.emit("dhtAnnounce"), this.destroyed || (this._dhtTimeout = setTimeout(() => {
							this._dhtAnnounce()
						}, this._intervalMs + Math.floor(Math.random() * this._intervalMs / 5)), this._dhtTimeout.unref && this._dhtTimeout.unref())
					}))
				}
			}
		}).call(this, e("_process"))
	}, {
		_process: 205,
		"bittorrent-dht/client": 35,
		"bittorrent-tracker/client": 20,
		debug: 77,
		events: 82,
		"run-parallel": 239
	}],
	304: [function(e, t) {
		var n = Math.ceil;
		(function(e) {
			const r = 16384;
			class a {
				constructor(e) {
					this.length = e, this.missing = e, this.sources = null, this._chunks = n(e / r), this._remainder = e % r || r, this._buffered = 0, this._buffer = null, this._cancellations = null, this._reservations = 0, this._flushed = !1
				}
				chunkLength(e) {
					return e === this._chunks - 1 ? this._remainder : r
				}
				chunkLengthRemaining(e) {
					return this.length - e * r
				}
				chunkOffset(e) {
					return e * r
				}
				reserve() {
					return this.init() ? this._cancellations.length ? this._cancellations.pop() : this._reservations < this._chunks ? this._reservations++ : -1 : -1
				}
				reserveRemaining() {
					if(!this.init()) return -1;
					if(this._reservations < this._chunks) {
						const e = this._reservations;
						return this._reservations = this._chunks, e
					}
					return -1
				}
				cancel(e) {
					this.init() && this._cancellations.push(e)
				}
				cancelRemaining(e) {
					this.init() && (this._reservations = e)
				}
				get(e) {
					return this.init() ? this._buffer[e] : null
				}
				set(e, t, a) {
					if(!this.init()) return !1;
					const o = t.length,
						s = n(o / r);
					for(let n = 0; n < s; n++)
						if(!this._buffer[e + n]) {
							const o = n * r,
								s = t.slice(o, o + r);
							this._buffered++, this._buffer[e + n] = s, this.missing -= s.length, this.sources.includes(a) || this.sources.push(a)
						}
					return this._buffered === this._chunks
				}
				flush() {
					if(!this._buffer || this._chunks !== this._buffered) return null;
					const t = e.concat(this._buffer, this.length);
					return this._buffer = null, this._cancellations = null, this.sources = null, this._flushed = !0, t
				}
				init() {
					return !this._flushed && (!!this._buffer || (this._buffer = Array(this._chunks), this._cancellations = [], this.sources = [], !0))
				}
			}
			Object.defineProperty(a, "BLOCK_LENGTH", {
				value: 16384
			}), t.exports = a
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41
	}],
	305: [function(e, t) {
		(function(n) {
			var r = e("is-typedarray").strict;
			t.exports = function(e) {
				if(r(e)) {
					var t = n.from(e.buffer);
					return e.byteLength !== e.buffer.byteLength && (t = t.slice(e.byteOffset, e.byteOffset + e.byteLength)), t
				}
				return n.from(e)
			}
		}).call(this, e("buffer").Buffer)
	}, {
		buffer: 41,
		"is-typedarray": 103
	}],
	306: [function(e, t, n) {
		var r = e("buffer-alloc"),
			a = 4294967296;
		n.encodingLength = function() {
			return 8
		}, n.encode = function(e, t, n) {
			t || (t = r(8)), n || (n = 0);
			var o = Math.floor(e / a);
			return t.writeUInt32BE(o, n), t.writeUInt32BE(e - o * a, n + 4), t
		}, n.decode = function(e, t) {
			t || (t = 0);
			var n = e.readUInt32BE(t),
				r = e.readUInt32BE(t + 4);
			return n * a + r
		}, n.encode.bytes = 8, n.decode.bytes = 8
	}, {
		"buffer-alloc": 38
	}],
	307: [function(e, t) {
		"use strict";

		function n(e, t) {
			for(var n = 1, r = e.length, o = e[0], s = e[0], d = 1; d < r; ++d)
				if(s = o, o = e[d], t(o, s)) {
					if(d === n) {
						n++;
						continue
					}
					e[n++] = o
				}
			return e.length = n, e
		}

		function r(e) {
			for(var t = 1, n = e.length, r = e[0], o = e[0], s = 1; s < n; ++s, o = r)
				if(o = r, r = e[s], r !== o) {
					if(s === t) {
						t++;
						continue
					}
					e[t++] = r
				}
			return e.length = t, e
		}
		t.exports = function(e, t, a) {
			return 0 === e.length ? e : t ? (a || e.sort(t), n(e, t)) : (a || e.sort(), r(e))
		}
	}, {}],
	308: [function(e, t) {
		t.exports = function(e, t) {
			if(!(t >= e.length || 0 > t)) {
				var n = e.pop();
				if(t < e.length) {
					var r = e[t];
					return e[t] = n, r
				}
				return n
			}
		}
	}, {}],
	309: [function(e, t) {
		t.exports = function(t, e, n) {
			"function" == typeof e && (n = e, e = {}), "string" == typeof e && (e = {
				type: e
			}), t.addEventListener("change", function() {
				function r(n) {
					var r = t.files[n];
					"text" === e.type ? a.readAsText(r) : "url" === e.type ? a.readAsDataURL(r) : a.readAsArrayBuffer(r)
				}
				if(0 === t.files.length) return n(null, []);
				var a = new FileReader,
					o = 0,
					s = [];
				a.addEventListener("load", function(a) {
					s.push({
						file: t.files[o],
						target: a.target
					}), o++, o === t.files.length ? n(null, s) : r(o)
				}), r(o)
			})
		}
	}, {}],
	310: [function(e, t, n) {
		"use strict";

		function r() {
			this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
		}

		function a(e, t, n) {
			if(e && d.isObject(e) && e instanceof r) return e;
			var a = new r;
			return a.parse(e, t, n), a
		}
		var o = e("punycode"),
			d = e("./util");
		n.parse = a, n.resolve = function(e, t) {
			return a(e, !1, !0).resolve(t)
		}, n.resolveObject = function(e, t) {
			return e ? a(e, !1, !0).resolveObject(t) : t
		}, n.format = function(e) {
			return d.isString(e) && (e = a(e)), e instanceof r ? e.format() : r.prototype.format.call(e)
		}, n.Url = r;
		var c = /^([a-z0-9.+-]+:)/i,
			s = /:[0-9]*$/,
			i = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
			l = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", "\"", "`", " ", "\r", "\n", "\t"]),
			u = ["'"].concat(l),
			p = ["%", "/", "?", ";", "#"].concat(u),
			f = ["/", "?", "#"],
			m = /^[+a-z0-9A-Z_-]{0,63}$/,
			h = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
			_ = {
				javascript: !0,
				"javascript:": !0
			},
			g = {
				javascript: !0,
				"javascript:": !0
			},
			y = {
				http: !0,
				https: !0,
				ftp: !0,
				gopher: !0,
				file: !0,
				"http:": !0,
				"https:": !0,
				"ftp:": !0,
				"gopher:": !0,
				"file:": !0
			},
			b = e("querystring");
		r.prototype.parse = function(e, t, n) {
			if(!d.isString(e)) throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
			var r = e.indexOf("?"),
				a = -1 !== r && r < e.indexOf("#") ? "?" : "#",
				w = e.split(a),
				x = /\\/g;
			w[0] = w[0].replace(x, "/"), e = w.join(a);
			var S = e;
			if(S = S.trim(), !n && 1 === e.split("#").length) {
				var v = i.exec(S);
				if(v) return this.path = S, this.href = S, this.pathname = v[1], v[2] ? (this.search = v[2], this.query = t ? b.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", this.query = {}), this
			}
			var E = c.exec(S);
			if(E) {
				E = E[0];
				var C = E.toLowerCase();
				this.protocol = C, S = S.substr(E.length)
			}
			if(n || E || S.match(/^\/\/[^@\/]+@[^@\/]+/)) {
				var T = "//" === S.substr(0, 2);
				T && !(E && g[E]) && (S = S.substr(2), this.slashes = !0)
			}
			if(!g[E] && (T || E && !y[E])) {
				for(var I = -1, L = 0, R; L < f.length; L++) R = S.indexOf(f[L]), -1 !== R && (-1 === I || R < I) && (I = R);
				var B, A;
				A = -1 === I ? S.lastIndexOf("@") : S.lastIndexOf("@", I), -1 !== A && (B = S.slice(0, A), S = S.slice(A + 1), this.auth = decodeURIComponent(B)), I = -1;
				for(var L = 0, R; L < p.length; L++) R = S.indexOf(p[L]), -1 !== R && (-1 === I || R < I) && (I = R); - 1 === I && (I = S.length), this.host = S.slice(0, I), S = S.slice(I), this.parseHost(), this.hostname = this.hostname || "";
				var O = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
				if(!O)
					for(var D = this.hostname.split(/\./), L = 0, M = D.length, P; L < M; L++)
						if(P = D[L], P && !P.match(m)) {
							for(var U = "", N = 0, z = P.length; N < z; N++) U += 127 < P.charCodeAt(N) ? "x" : P[N];
							if(!U.match(m)) {
								var k = D.slice(0, L),
									H = D.slice(L + 1),
									F = P.match(h);
								F && (k.push(F[1]), H.unshift(F[2])), H.length && (S = "/" + H.join(".") + S), this.hostname = k.join(".");
								break
							}
						}
				this.hostname = 255 < this.hostname.length ? "" : this.hostname.toLowerCase(), O || (this.hostname = o.toASCII(this.hostname));
				var W = this.port ? ":" + this.port : "",
					q = this.hostname || "";
				this.host = q + W, this.href += this.host, O && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== S[0] && (S = "/" + S))
			}
			if(!_[C])
				for(var L = 0, M = u.length, Y; L < M; L++)
					if(Y = u[L], -1 !== S.indexOf(Y)) {
						var G = encodeURIComponent(Y);
						G === Y && (G = escape(Y)), S = S.split(Y).join(G)
					}
			var V = S.indexOf("#"); - 1 !== V && (this.hash = S.substr(V), S = S.slice(0, V));
			var Z = S.indexOf("?");
			if(-1 === Z ? t && (this.search = "", this.query = {}) : (this.search = S.substr(Z), this.query = S.substr(Z + 1), t && (this.query = b.parse(this.query)), S = S.slice(0, Z)), S && (this.pathname = S), y[C] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
				var W = this.pathname || "",
					K = this.search || "";
				this.path = W + K
			}
			return this.href = this.format(), this
		}, r.prototype.format = function() {
			var e = this.auth || "";
			e && (e = encodeURIComponent(e), e = e.replace(/%3A/i, ":"), e += "@");
			var t = this.protocol || "",
				n = this.pathname || "",
				r = this.hash || "",
				a = !1,
				o = "";
			this.host ? a = e + this.host : this.hostname && (a = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (a += ":" + this.port)), this.query && d.isObject(this.query) && Object.keys(this.query).length && (o = b.stringify(this.query));
			var s = this.search || o && "?" + o || "";
			return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || y[t]) && !1 != a ? (a = "//" + (a || ""), n && "/" !== n.charAt(0) && (n = "/" + n)) : !a && (a = ""), r && "#" !== r.charAt(0) && (r = "#" + r), s && "?" !== s.charAt(0) && (s = "?" + s), n = n.replace(/[?#]/g, function(e) {
				return encodeURIComponent(e)
			}), s = s.replace("#", "%23"), t + a + n + s + r
		}, r.prototype.resolve = function(e) {
			return this.resolveObject(a(e, !1, !0)).format()
		}, r.prototype.resolveObject = function(e) {
			if(d.isString(e)) {
				var t = new r;
				t.parse(e, !1, !0), e = t
			}
			for(var n = new r, a = Object.keys(this), o = 0, l; o < a.length; o++) l = a[o], n[l] = this[l];
			if(n.hash = e.hash, "" === e.href) return n.href = n.format(), n;
			if(e.slashes && !e.protocol) {
				for(var c = Object.keys(e), u = 0, f; u < c.length; u++) f = c[u], "protocol" !== f && (n[f] = e[f]);
				return y[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"), n.href = n.format(), n
			}
			if(e.protocol && e.protocol !== n.protocol) {
				if(!y[e.protocol]) {
					for(var m = Object.keys(e), h = 0, _; h < m.length; h++) _ = m[h], n[_] = e[_];
					return n.href = n.format(), n
				}
				if(n.protocol = e.protocol, !e.host && !g[e.protocol]) {
					for(var b = (e.pathname || "").split("/"); b.length && !(e.host = b.shift()););
					e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== b[0] && b.unshift(""), 2 > b.length && b.unshift(""), n.pathname = b.join("/")
				} else n.pathname = e.pathname;
				if(n.search = e.search, n.query = e.query, n.host = e.host || "", n.auth = e.auth, n.hostname = e.hostname || e.host, n.port = e.port, n.pathname || n.search) {
					var w = n.pathname || "",
						p = n.search || "";
					n.path = w + p
				}
				return n.slashes = n.slashes || e.slashes, n.href = n.format(), n
			}
			var s = n.pathname && "/" === n.pathname.charAt(0),
				x = e.host || e.pathname && "/" === e.pathname.charAt(0),
				S = x || s || n.host && e.pathname,
				E = S,
				C = n.pathname && n.pathname.split("/") || [],
				b = e.pathname && e.pathname.split("/") || [],
				T = n.protocol && !y[n.protocol];
			if(T && (n.hostname = "", n.port = null, n.host && ("" === C[0] ? C[0] = n.host : C.unshift(n.host)), n.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === b[0] ? b[0] = e.host : b.unshift(e.host)), e.host = null), S = S && ("" === b[0] || "" === C[0])), x) n.host = e.host || "" === e.host ? e.host : n.host, n.hostname = e.hostname || "" === e.hostname ? e.hostname : n.hostname, n.search = e.search, n.query = e.query, C = b;
			else if(b.length) C || (C = []), C.pop(), C = C.concat(b), n.search = e.search, n.query = e.query;
			else if(!d.isNullOrUndefined(e.search)) {
				if(T) {
					n.hostname = n.host = C.shift();
					var I = !!(n.host && 0 < n.host.indexOf("@")) && n.host.split("@");
					I && (n.auth = I.shift(), n.host = n.hostname = I.shift())
				}
				return n.search = e.search, n.query = e.query, d.isNull(n.pathname) && d.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), n.href = n.format(), n
			}
			if(!C.length) return n.pathname = null, n.path = n.search ? "/" + n.search : null, n.href = n.format(), n;
			for(var L = C.slice(-1)[0], R = (n.host || e.host || 1 < C.length) && ("." === L || ".." === L) || "" === L, B = 0, A = C.length; 0 <= A; A--) L = C[A], "." === L ? C.splice(A, 1) : ".." === L ? (C.splice(A, 1), B++) : B && (C.splice(A, 1), B--);
			if(!S && !E)
				for(; B--; B) C.unshift("..");
			S && "" !== C[0] && (!C[0] || "/" !== C[0].charAt(0)) && C.unshift(""), R && "/" !== C.join("/").substr(-1) && C.push("");
			var O = "" === C[0] || C[0] && "/" === C[0].charAt(0);
			if(T) {
				n.hostname = n.host = O ? "" : C.length ? C.shift() : "";
				var I = !!(n.host && 0 < n.host.indexOf("@")) && n.host.split("@");
				I && (n.auth = I.shift(), n.host = n.hostname = I.shift())
			}
			return S = S || n.host && C.length, S && !O && C.unshift(""), C.length ? n.pathname = C.join("/") : (n.pathname = null, n.path = null), d.isNull(n.pathname) && d.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), n.auth = e.auth || n.auth, n.slashes = n.slashes || e.slashes, n.href = n.format(), n
		}, r.prototype.parseHost = function() {
			var e = this.host,
				t = s.exec(e);
			t && (t = t[0], ":" !== t && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e)
		}
	}, {
		"./util": 311,
		punycode: 207,
		querystring: 210
	}],
	311: [function(e, t) {
		"use strict";
		t.exports = {
			isString: function(e) {
				return "string" == typeof e
			},
			isObject: function(e) {
				return "object" == typeof e && null !== e
			},
			isNull: function(e) {
				return null === e
			},
			isNullOrUndefined: function(e) {
				return null == e
			}
		}
	}, {}],
	312: [function(e, t) {
		(function(n) {
			const {
				EventEmitter: r
			} = e("events"), a = e("bencode"), o = e("bitfield"), s = e("debug")("ut_metadata"), i = e("simple-sha1"), d = 1E3, l = 16384;
			t.exports = e => {
				class t extends r {
					constructor(t) {
						super(), this._wire = t, this._fetching = !1, this._metadataComplete = !1, this._metadataSize = null, this._remainingRejects = null, this._bitfield = new o(0, {
							grow: d
						}), n.isBuffer(e) && this.setMetadata(e)
					}
					onHandshake(e) {
						this._infoHash = e
					}
					onExtendedHandshake(e) {
						return e.m && e.m.ut_metadata ? e.metadata_size ? "number" != typeof e.metadata_size || 1E7 < e.metadata_size || 0 >= e.metadata_size ? this.emit("warning", new Error("Peer gave invalid metadata size")) : void(this._metadataSize = e.metadata_size, this._numPieces = Math.ceil(this._metadataSize / l), this._remainingRejects = 2 * this._numPieces, this._fetching && this._requestPieces()) : this.emit("warning", new Error("Peer does not have metadata")) : this.emit("warning", new Error("Peer does not support ut_metadata"))
					}
					onMessage(e) {
						let t, n;
						try {
							const r = e.toString(),
								o = r.indexOf("ee") + 2;
							t = a.decode(r.substring(0, o)), n = e.slice(o)
						} catch(e) {
							return
						}
						switch(t.msg_type) {
							case 0:
								this._onRequest(t.piece);
								break;
							case 1:
								this._onData(t.piece, n, t.total_size);
								break;
							case 2:
								this._onReject(t.piece);
						}
					}
					fetch() {
						this._metadataComplete || (this._fetching = !0, this._metadataSize && this._requestPieces())
					}
					cancel() {
						this._fetching = !1
					}
					setMetadata(e) {
						if(this._metadataComplete) return !0;
						s("set metadata");
						try {
							const t = a.decode(e).info;
							t && (e = a.encode(t))
						} catch(e) {}
						return !(this._infoHash && this._infoHash !== i.sync(e)) && (this.cancel(), this.metadata = e, this._metadataComplete = !0, this._metadataSize = this.metadata.length, this._wire.extendedHandshake.metadata_size = this._metadataSize, this.emit("metadata", a.encode({
							info: a.decode(this.metadata)
						})), !0)
					}
					_send(e, t) {
						let r = a.encode(e);
						n.isBuffer(t) && (r = n.concat([r, t])), this._wire.extended("ut_metadata", r)
					}
					_request(e) {
						this._send({
							msg_type: 0,
							piece: e
						})
					}
					_data(e, t, n) {
						const r = {
							msg_type: 1,
							piece: e
						};
						"number" == typeof n && (r.total_size = n), this._send(r, t)
					}
					_reject(e) {
						this._send({
							msg_type: 2,
							piece: e
						})
					}
					_onRequest(e) {
						if(!this._metadataComplete) return void this._reject(e);
						const t = e * l;
						let n = t + l;
						n > this._metadataSize && (n = this._metadataSize);
						const r = this.metadata.slice(t, n);
						this._data(e, r, this._metadataSize)
					}
					_onData(e, t) {
						t.length > l || (t.copy(this.metadata, e * l), this._bitfield.set(e), this._checkDone())
					}
					_onReject(e) {
						0 < this._remainingRejects && this._fetching ? (this._request(e), this._remainingRejects -= 1) : this.emit("warning", new Error("Peer sent \"reject\" too much"))
					}
					_requestPieces() {
						this.metadata = n.alloc(this._metadataSize);
						for(let e = 0; e < this._numPieces; e++) this._request(e)
					}
					_checkDone() {
						let e = !0;
						for(let t = 0; t < this._numPieces; t++)
							if(!this._bitfield.get(t)) {
								e = !1;
								break
							}
						if(e) {
							const e = this.setMetadata(this.metadata);
							e || this._failedMetadata()
						}
					}
					_failedMetadata() {
						this._bitfield = new o(0, {
							grow: d
						}), this._remainingRejects -= this._numPieces, 0 < this._remainingRejects ? this._requestPieces() : this.emit("warning", new Error("Peer sent invalid metadata"))
					}
				}
				return t.prototype.name = "ut_metadata", t
			}
		}).call(this, e("buffer").Buffer)
	}, {
		bencode: 7,
		bitfield: 9,
		buffer: 41,
		debug: 77,
		events: 82,
		"simple-sha1": 254
	}],
	313: [function(e, t) {
		(function(e) {
			function n(t) {
				try {
					if(!e.localStorage) return !1
				} catch(e) {
					return !1
				}
				var n = e.localStorage[t];
				return null != n && "true" === (n + "").toLowerCase()
			}
			t.exports = function(e, t) {
				function r() {
					if(!a) {
						if(n("throwDeprecation")) throw new Error(t);
						else n("traceDeprecation") ? console.trace(t) : console.warn(t);
						a = !0
					}
					return e.apply(this, arguments)
				}
				if(n("noDeprecation")) return e;
				var a = !1;
				return r
			}
		}).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
	}, {}],
	314: [function(e, t) {
		(function(n) {
			function r(e) {
				var t = this;
				i.call(t), t._tracks = [], t._fragmentSequence = 1, t._file = e, t._decoder = null, t._findMoov(0)
			}

			function a(e, t) {
				var n = this;
				n._entries = e, n._countName = t || "count", n._index = 0, n._offset = 0, n.value = n._entries[0]
			}

			function o() {
				return {
					version: 0,
					flags: 0,
					entries: []
				}
			}
			var s = e("binary-search"),
				i = e("events").EventEmitter,
				d = e("inherits"),
				l = e("mp4-stream"),
				c = e("mp4-box-encoding"),
				u = e("range-slice-stream");
			t.exports = r, d(r, i), r.prototype._findMoov = function(e) {
				var t = this;
				t._decoder && t._decoder.destroy(), t._decoder = l.decode();
				var n = t._file.createReadStream({
					start: e
				});
				n.pipe(t._decoder), t._decoder.once("box", function(r) {
					"moov" === r.type ? t._decoder.decode(function(e) {
						n.destroy();
						try {
							t._processMoov(e)
						} catch(e) {
							e.message = "Cannot parse mp4 file: " + e.message, t.emit("error", e)
						}
					}) : (n.destroy(), t._findMoov(e + r.length))
				})
			}, a.prototype.inc = function() {
				var e = this;
				e._offset++, e._offset >= e._entries[e._index][e._countName] && (e._index++, e._offset = 0), e.value = e._entries[e._index]
			}, r.prototype._processMoov = function(e) {
				var t = this,
					r = e.traks;
				t._tracks = [], t._hasVideo = !1, t._hasAudio = !1;
				for(var s = 0; s < r.length; s++) {
					var d = r[s],
						l = d.mdia.minf.stbl,
						u = l.stsd.entries[0],
						p = d.mdia.hdlr.handlerType,
						f, m;
					if("vide" === p && "avc1" === u.type) {
						if(t._hasVideo) continue;
						t._hasVideo = !0, f = "avc1", u.avcC && (f += "." + u.avcC.mimeCodec), m = "video/mp4; codecs=\"" + f + "\""
					} else if("soun" === p && "mp4a" === u.type) {
						if(t._hasAudio) continue;
						t._hasAudio = !0, f = "mp4a", u.esds && u.esds.mimeCodec && (f += "." + u.esds.mimeCodec), m = "audio/mp4; codecs=\"" + f + "\""
					} else continue;
					var h = [],
						_ = 0,
						g = 0,
						y = 0,
						b = 0,
						k = 0,
						w = 0,
						x = new a(l.stts.entries),
						S = null;
					l.ctts && (S = new a(l.ctts.entries));
					for(var v = 0;;) {
						var E = l.stsc.entries[k],
							C = l.stsz.entries[_],
							T = x.value.duration,
							I = S ? S.value.compositionOffset : 0,
							L = !0;
						l.stss && (L = l.stss.entries[v] === _ + 1);
						var R = l.stco || l.co64;
						if(h.push({
								size: C,
								duration: T,
								dts: w,
								presentationOffset: I,
								sync: L,
								offset: b + R.entries[y]
							}), _++, _ >= l.stsz.entries.length) break;
						if(g++, b += C, g >= E.samplesPerChunk) {
							g = 0, b = 0, y++;
							var B = l.stsc.entries[k + 1];
							B && y + 1 >= B.firstChunk && k++
						}
						w += T, x.inc(), S && S.inc(), L && v++
					}
					d.mdia.mdhd.duration = 0, d.tkhd.duration = 0;
					var A = E.sampleDescriptionId,
						O = {
							type: "moov",
							mvhd: e.mvhd,
							traks: [{
								tkhd: d.tkhd,
								mdia: {
									mdhd: d.mdia.mdhd,
									hdlr: d.mdia.hdlr,
									elng: d.mdia.elng,
									minf: {
										vmhd: d.mdia.minf.vmhd,
										smhd: d.mdia.minf.smhd,
										dinf: d.mdia.minf.dinf,
										stbl: {
											stsd: l.stsd,
											stts: o(),
											ctts: o(),
											stsc: o(),
											stsz: o(),
											stco: o(),
											stss: o()
										}
									}
								}
							}],
							mvex: {
								mehd: {
									fragmentDuration: e.mvhd.duration
								},
								trexs: [{
									trackId: d.tkhd.trackId,
									defaultSampleDescriptionIndex: A,
									defaultSampleDuration: 0,
									defaultSampleSize: 0,
									defaultSampleFlags: 0
								}]
							}
						};
					t._tracks.push({
						trackId: d.tkhd.trackId,
						timeScale: d.mdia.mdhd.timeScale,
						samples: h,
						currSample: null,
						currTime: null,
						moov: O,
						mime: m
					})
				}
				if(0 === t._tracks.length) return void t.emit("error", new Error("no playable tracks"));
				e.mvhd.duration = 0, t._ftyp = {
					type: "ftyp",
					brand: "iso5",
					brandVersion: 0,
					compatibleBrands: ["iso5"]
				};
				var D = c.encode(t._ftyp),
					M = t._tracks.map(function(e) {
						var t = c.encode(e.moov);
						return {
							mime: e.mime,
							init: n.concat([D, t])
						}
					});
				t.emit("ready", M)
			}, r.prototype.seek = function(e) {
				var t = this;
				if(!t._tracks) throw new Error("Not ready yet; wait for 'ready' event");
				t._fileStream && (t._fileStream.destroy(), t._fileStream = null);
				var n = -1;
				if(t._tracks.map(function(r, a) {
						function o(e) {
							s.destroyed || s.box(e.moof, function(n) {
								if(n) return t.emit("error", n);
								if(!s.destroyed) {
									var i = r.inStream.slice(e.ranges);
									i.pipe(s.mediaData(e.length, function(e) {
										if(e) return t.emit("error", e);
										if(!s.destroyed) {
											var n = t._generateFragment(a);
											return n ? void o(n) : s.finalize()
										}
									}))
								}
							})
						}
						r.outStream && r.outStream.destroy(), r.inStream && (r.inStream.destroy(), r.inStream = null);
						var s = r.outStream = l.encode(),
							i = t._generateFragment(a, e);
						return i ? void((-1 === n || i.ranges[0].start < n) && (n = i.ranges[0].start), o(i)) : s.finalize()
					}), 0 <= n) {
					var r = t._fileStream = t._file.createReadStream({
						start: n
					});
					t._tracks.forEach(function(e) {
						e.inStream = new u(n, {
							highWaterMark: 1e7
						}), r.pipe(e.inStream)
					})
				}
				return t._tracks.map(function(e) {
					return e.outStream
				})
			}, r.prototype._findSampleBefore = function(e, t) {
				var n = this,
					r = n._tracks[e],
					a = Math.floor(r.timeScale * t),
					o = s(r.samples, a, function(e, n) {
						var t = e.dts + e.presentationOffset;
						return t - n
					});
				for(-1 === o ? o = 0 : 0 > o && (o = -o - 2); !r.samples[o].sync;) o--;
				return o
			};
			r.prototype._generateFragment = function(e, t) {
				var n = this,
					r = n._tracks[e],
					a;
				if(a = void 0 === t ? r.currSample : n._findSampleBefore(e, t), a >= r.samples.length) return null;
				for(var o = r.samples[a].dts, s = 0, i = [], d = a, l; d < r.samples.length && (l = r.samples[d], !(l.sync && l.dts - o >= 1 * r.timeScale)); d++) {
					s += l.size;
					var c = i.length - 1;
					0 > c || i[c].end !== l.offset ? i.push({
						start: l.offset,
						end: l.offset + l.size
					}) : i[c].end += l.size
				}
				return r.currSample = d, {
					moof: n._generateMoof(e, a, d),
					ranges: i,
					length: s
				}
			}, r.prototype._generateMoof = function(e, t, n) {
				for(var r = this, a = r._tracks[e], o = [], s = 0, i = t, d; i < n; i++) d = a.samples[i], 0 > d.presentationOffset && (s = 1), o.push({
					sampleDuration: d.duration,
					sampleSize: d.size,
					sampleFlags: d.sync ? 33554432 : 16842752,
					sampleCompositionTimeOffset: d.presentationOffset
				});
				var l = {
					type: "moof",
					mfhd: {
						sequenceNumber: r._fragmentSequence++
					},
					trafs: [{
						tfhd: {
							flags: 131072,
							trackId: a.trackId
						},
						tfdt: {
							baseMediaDecodeTime: a.samples[t].dts
						},
						trun: {
							flags: 3841,
							dataOffset: 8,
							entries: o,
							version: s
						}
					}]
				};
				return l.trafs[0].trun.dataOffset += c.encodingLength(l), l
			}
		}).call(this, e("buffer").Buffer)
	}, {
		"binary-search": 8,
		buffer: 41,
		events: 82,
		inherits: 99,
		"mp4-box-encoding": 157,
		"mp4-stream": 160,
		"range-slice-stream": 213
	}],
	315: [function(e, t) {
		function n(e, t, a) {
			var o = this;
			return this instanceof n ? void(a = a || {}, o.detailedError = null, o._elem = t, o._elemWrapper = new r(t), o._waitingFired = !1, o._trackMeta = null, o._file = e, o._tracks = null, "none" !== o._elem.preload && o._createMuxer(), o._onError = function() {
				o.detailedError = o._elemWrapper.detailedError, o.destroy()
			}, o._onWaiting = function() {
				o._waitingFired = !0, o._muxer ? o._tracks && o._pump() : o._createMuxer()
			}, o._elem.addEventListener("waiting", o._onWaiting), o._elem.addEventListener("error", o._onError)) : new n(e, t, a)
		}
		var r = e("mediasource"),
			a = e("pump"),
			o = e("./mp4-remuxer");
		t.exports = n, n.prototype._createMuxer = function() {
			var e = this;
			e._muxer = new o(e._file), e._muxer.on("ready", function(t) {
				e._tracks = t.map(function(t) {
					var n = e._elemWrapper.createWriteStream(t.mime);
					n.on("error", function(t) {
						e._elemWrapper.error(t)
					});
					var r = {
						muxed: null,
						mediaSource: n,
						initFlushed: !1,
						onInitFlushed: null
					};
					return n.write(t.init, function(e) {
						r.initFlushed = !0, r.onInitFlushed && r.onInitFlushed(e)
					}), r
				}), (e._waitingFired || "auto" === e._elem.preload) && e._pump()
			}), e._muxer.on("error", function(t) {
				e._elemWrapper.error(t)
			})
		}, n.prototype._pump = function() {
			var e = this,
				t = e._muxer.seek(e._elem.currentTime, !e._tracks);
			e._tracks.forEach(function(n, r) {
				var o = function() {
					n.muxed && (n.muxed.destroy(), n.mediaSource = e._elemWrapper.createWriteStream(n.mediaSource), n.mediaSource.on("error", function(t) {
						e._elemWrapper.error(t)
					})), n.muxed = t[r], a(n.muxed, n.mediaSource)
				};
				n.initFlushed ? o() : n.onInitFlushed = function(t) {
					return t ? void e._elemWrapper.error(t) : void o()
				}
			})
		}, n.prototype.destroy = function() {
			var e = this;
			e.destroyed || (e.destroyed = !0, e._elem.removeEventListener("waiting", e._onWaiting), e._elem.removeEventListener("error", e._onError), e._tracks && e._tracks.forEach(function(e) {
				e.muxed && e.muxed.destroy()
			}), e._elem.src = "")
		}
	}, {
		"./mp4-remuxer": 314,
		mediasource: 143,
		pump: 206
	}],
	316: [function(e, t) {
		(function(n, r) {
			function a(e) {
				return "object" == typeof e && null != e && "function" == typeof e.pipe
			}

			function o(e) {
				return "undefined" != typeof FileList && e instanceof FileList
			}
			const {
				Buffer: s
			} = e("safe-buffer"), {
				EventEmitter: i
			} = e("events"), d = e("simple-concat"), l = e("create-torrent"), c = e("debug")("webtorrent"), u = e("bittorrent-dht/client"), p = e("load-ip-set"), f = e("run-parallel"), m = e("parse-torrent"), h = e("path"), _ = e("simple-peer"), g = e("randombytes"), y = e("speedometer"), b = e("./lib/tcp-pool"), k = e("./lib/torrent"), w = e("./package.json").version, x = w.replace(/\d*./g, e => `0${e%100}`.slice(-2)).slice(0, 4);
			class S extends i {
				constructor(e = {}) {
					super(), this.peerId = "string" == typeof e.peerId ? e.peerId : s.isBuffer(e.peerId) ? e.peerId.toString("hex") : s.from(`-WW${x}-` + g(9).toString("base64")).toString("hex"), this.peerIdBuffer = s.from(this.peerId, "hex"), this.nodeId = "string" == typeof e.nodeId ? e.nodeId : s.isBuffer(e.nodeId) ? e.nodeId.toString("hex") : g(20).toString("hex"), this.nodeIdBuffer = s.from(this.nodeId, "hex"), this._debugId = this.peerId.toString("hex").substring(0, 7), this.destroyed = !1, this.listening = !1, this.torrentPort = e.torrentPort || 0, this.dhtPort = e.dhtPort || 0, this.tracker = e.tracker === void 0 ? {} : e.tracker, this.torrents = [], this.maxConns = +e.maxConns || 55, this._debug("new webtorrent (peerId %s, nodeId %s, port %s)", this.peerId, this.nodeId, this.torrentPort), this.tracker && ("object" != typeof this.tracker && (this.tracker = {}), e.rtcConfig && (console.warn("WebTorrent: opts.rtcConfig is deprecated. Use opts.tracker.rtcConfig instead"), this.tracker.rtcConfig = e.rtcConfig), e.wrtc && (console.warn("WebTorrent: opts.wrtc is deprecated. Use opts.tracker.wrtc instead"), this.tracker.wrtc = e.wrtc), r.WRTC && !this.tracker.wrtc && (this.tracker.wrtc = r.WRTC)), "function" == typeof b ? this._tcpPool = new b(this) : n.nextTick(() => {
						this._onListening()
					}), this._downloadSpeed = y(), this._uploadSpeed = y(), !1 !== e.dht && "function" == typeof u ? (this.dht = new u(Object.assign({}, {
						nodeId: this.nodeId
					}, e.dht)), this.dht.once("error", e => {
						this._destroy(e)
					}), this.dht.once("listening", () => {
						const e = this.dht.address();
						e && (this.dhtPort = e.port)
					}), this.dht.setMaxListeners(0), this.dht.listen(this.dhtPort)) : this.dht = !1, this.enableWebSeeds = !1 !== e.webSeeds;
					const t = () => {
						this.destroyed || (this.ready = !0, this.emit("ready"))
					};
					"function" == typeof p && null != e.blocklist ? p(e.blocklist, {
						headers: {
							"user-agent": `WebTorrent/${w} (https://webtorrent.io)`
						}
					}, (e, n) => e ? this.error(`Failed to load blocklist: ${e.message}`) : void(this.blocked = n, t())) : n.nextTick(t)
				}
				get downloadSpeed() {
					return this._downloadSpeed()
				}
				get uploadSpeed() {
					return this._uploadSpeed()
				}
				get progress() {
					const e = this.torrents.filter(e => 1 !== e.progress),
						t = e.reduce((e, t) => e + t.downloaded, 0),
						n = e.reduce((e, t) => e + (t.length || 0), 0) || 1;
					return t / n
				}
				get ratio() {
					const e = this.torrents.reduce((e, t) => e + t.uploaded, 0),
						t = this.torrents.reduce((e, t) => e + t.received, 0) || 1;
					return e / t
				}
				get(e) {
					if(!(e instanceof k)) {
						let t;
						try {
							t = m(e)
						} catch(e) {}
						if(!t) return null;
						if(!t.infoHash) throw new Error("Invalid torrent identifier");
						for(const e of this.torrents)
							if(e.infoHash === t.infoHash) return e
					} else if(this.torrents.includes(e)) return e;
					return null
				}
				download(e, t, n) {
					return console.warn("WebTorrent: client.download() is deprecated. Use client.add() instead"), this.add(e, t, n)
				}
				add(e, t = {}, n) {
					function r() {
						s.removeListener("_infoHash", a), s.removeListener("ready", o), s.removeListener("close", r)
					}
					if(this.destroyed) throw new Error("client is destroyed");
					"function" == typeof t && ([t, n] = [{}, t]);
					const a = () => {
							if(!this.destroyed)
								for(const e of this.torrents)
									if(e.infoHash === s.infoHash && e !== s) return void s._destroy(new Error(`Cannot add duplicate torrent ${s.infoHash}`))
						},
						o = () => {
							this.destroyed || ("function" == typeof n && n(s), this.emit("torrent", s))
						};
					this._debug("add"), t = t ? Object.assign({}, t) : {};
					const s = new k(e, this, t);
					return this.torrents.push(s), s.once("_infoHash", a), s.once("ready", o), s.once("close", r), s
				}
				seed(e, t, n) {
					if(this.destroyed) throw new Error("client is destroyed");
					"function" == typeof t && ([t, n] = [{}, t]), this._debug("seed"), t = t ? Object.assign({}, t) : {}, "string" == typeof e && (t.path = h.dirname(e)), t.createdBy || (t.createdBy = `WebTorrent/${x}`);
					const r = e => {
							this._debug("on seed"), "function" == typeof n && n(e), e.emit("seed"), this.emit("seed", e)
						},
						s = this.add(null, t, e => {
							const t = [t => {
								e.load(i, t)
							}];
							this.dht && t.push(t => {
								e.once("dhtAnnounce", t)
							}), f(t, t => this.destroyed ? void 0 : t ? e._destroy(t) : void r(e))
						});
					let i;
					return o(e) ? e = Array.from(e) : !Array.isArray(e) && (e = [e]), f(e.map(e => t => {
						a(e) ? d(e, t) : t(null, e)
					}), (e, n) => this.destroyed ? void 0 : e ? s._destroy(e) : void l.parseInput(n, t, (e, r) => this.destroyed ? void 0 : e ? s._destroy(e) : void(i = r.map(e => e.getStream), l(n, t, (e, t) => {
						if(!this.destroyed) {
							if(e) return s._destroy(e);
							const n = this.get(t);
							n ? s._destroy(new Error(`Cannot add duplicate torrent ${n.infoHash}`)) : s._onTorrentId(t)
						}
					})))), s
				}
				remove(e, t) {
					this._debug("remove");
					const n = this.get(e);
					if(!n) throw new Error(`No torrent with id ${e}`);
					this._remove(e, t)
				}
				_remove(e, t) {
					const n = this.get(e);
					n && (this.torrents.splice(this.torrents.indexOf(n), 1), n.destroy(t))
				}
				address() {
					return this.listening ? this._tcpPool ? this._tcpPool.server.address() : {
						address: "0.0.0.0",
						family: "IPv4",
						port: 0
					} : null
				}
				destroy(e) {
					if(this.destroyed) throw new Error("client already destroyed");
					this._destroy(null, e)
				}
				_destroy(e, t) {
					this._debug("client destroy"), this.destroyed = !0;
					const n = this.torrents.map(e => t => {
						e.destroy(t)
					});
					this._tcpPool && n.push(e => {
						this._tcpPool.destroy(e)
					}), this.dht && n.push(e => {
						this.dht.destroy(e)
					}), f(n, t), e && this.emit("error", e), this.torrents = [], this._tcpPool = null, this.dht = null
				}
				_onListening() {
					if(this._debug("listening"), this.listening = !0, this._tcpPool) {
						const e = this._tcpPool.server.address();
						e && (this.torrentPort = e.port)
					}
					this.emit("listening")
				}
				_debug() {
					const e = [].slice.call(arguments);
					e[0] = `[${this._debugId}] ${e[0]}`, c(...e)
				}
			}
			S.WEBRTC_SUPPORT = _.WEBRTC_SUPPORT, S.VERSION = w, t.exports = S
		}).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
	}, {
		"./lib/tcp-pool": 35,
		"./lib/torrent": 321,
		"./package.json": 323,
		_process: 205,
		"bittorrent-dht/client": 35,
		"create-torrent": 76,
		debug: 77,
		events: 82,
		"load-ip-set": 35,
		"parse-torrent": 200,
		path: 201,
		randombytes: 212,
		"run-parallel": 239,
		"safe-buffer": 241,
		"simple-concat": 242,
		"simple-peer": 244,
		speedometer: 265
	}],
	317: [function(e, t) {
		const n = e("debug")("webtorrent:file-stream"),
			r = e("readable-stream");
		class a extends r.Readable {
			constructor(e, t) {
				super(t), this.destroyed = !1, this._torrent = e._torrent;
				const n = t && t.start || 0,
					r = t && t.end && t.end < e.length ? t.end : e.length - 1,
					a = e._torrent.pieceLength;
				this._startPiece = 0 | (n + e.offset) / a, this._endPiece = 0 | (r + e.offset) / a, this._piece = this._startPiece, this._offset = n + e.offset - this._startPiece * a, this._missing = r - n + 1, this._reading = !1, this._notifying = !1, this._criticalLength = Math.min(0 | 1048576 / a, 2)
			}
			_read() {
				this._reading || (this._reading = !0, this._notify())
			}
			_notify() {
				if(!this._reading || 0 === this._missing) return;
				if(!this._torrent.bitfield.get(this._piece)) return this._torrent.critical(this._piece, this._piece + this._criticalLength);
				if(this._notifying) return;
				if(this._notifying = !0, this._torrent.destroyed) return this._destroy(new Error("Torrent removed"));
				const e = this._piece;
				this._torrent.store.get(e, (t, r) => (this._notifying = !1, this.destroyed ? void 0 : t ? this._destroy(t) : void(n("read %s (length %s) (err %s)", e, r.length, t && t.message), this._offset && (r = r.slice(this._offset), this._offset = 0), this._missing < r.length && (r = r.slice(0, this._missing)), this._missing -= r.length, n("pushing buffer of length %s", r.length), this._reading = !1, this.push(r), 0 === this._missing && this.push(null)))), this._piece += 1
			}
			destroy(e) {
				this._destroy(null, e)
			}
			_destroy(e, t) {
				this.destroyed || (this.destroyed = !0, !this._torrent.destroyed && this._torrent.deselect(this._startPiece, this._endPiece, !0), e && this.emit("error", e), this.emit("close"), t && t())
			}
		}
		t.exports = a
	}, {
		debug: 77,
		"readable-stream": 235
	}],
	318: [function(e, t) {
		(function(n) {
			const {
				EventEmitter: r
			} = e("events"), {
				PassThrough: a
			} = e("readable-stream"), o = e("end-of-stream"), s = e("path"), i = e("render-media"), d = e("stream-to-blob"), l = e("stream-to-blob-url"), c = e("stream-with-known-length-to-buffer"), u = e("./file-stream");
			class p extends r {
				constructor(e, t) {
					super(), this._torrent = e, this._destroyed = !1, this.name = t.name, this.path = t.path, this.length = t.length, this.offset = t.offset, this.done = !1;
					const n = t.offset,
						r = n + t.length - 1;
					this._startPiece = 0 | n / this._torrent.pieceLength, this._endPiece = 0 | r / this._torrent.pieceLength, 0 === this.length && (this.done = !0, this.emit("done"))
				}
				get downloaded() {
					if(!this._torrent.bitfield) return 0;
					const {
						pieces: e,
						bitfield: t,
						pieceLength: n
					} = this._torrent, {
						_startPiece: r,
						_endPiece: a
					} = this, o = e[r];
					let s = t.get(r) ? n - this.offset : Math.max(o.length - o.missing - this.offset, 0);
					for(let o = r + 1; o <= a; ++o)
						if(t.get(o)) s += n;
						else {
							const t = e[o];
							s += t.length - t.missing
						}
					return Math.min(s, this.length)
				}
				get progress() {
					return this.length ? this.downloaded / this.length : 0
				}
				select(e) {
					0 === this.length || this._torrent.select(this._startPiece, this._endPiece, e)
				}
				deselect() {
					0 === this.length || this._torrent.deselect(this._startPiece, this._endPiece, !1)
				}
				createReadStream(e) {
					if(0 === this.length) {
						const e = new a;
						return n.nextTick(() => {
							e.end()
						}), e
					}
					const t = new u(this, e);
					return this._torrent.select(t._startPiece, t._endPiece, !0, () => {
						t._notify()
					}), o(t, () => {
						this._destroyed || !this._torrent.destroyed && this._torrent.deselect(t._startPiece, t._endPiece, !0)
					}), t
				}
				getBuffer(e) {
					c(this.createReadStream(), this.length, e)
				}
				getBlob(e) {
					if("undefined" == typeof window) throw new Error("browser-only method");
					d(this.createReadStream(), this._getMimeType(), e)
				}
				getBlobURL(e) {
					if("undefined" == typeof window) throw new Error("browser-only method");
					l(this.createReadStream(), this._getMimeType(), e)
				}
				appendTo(e, t, n) {
					if("undefined" == typeof window) throw new Error("browser-only method");
					i.append(this, e, t, n)
				}
				renderTo(e, t, n) {
					if("undefined" == typeof window) throw new Error("browser-only method");
					i.render(this, e, t, n)
				}
				_getMimeType() {
					return i.mime[s.extname(this.name).toLowerCase()]
				}
				_destroy() {
					this._destroyed = !0, this._torrent = null
				}
			}
			t.exports = p
		}).call(this, e("_process"))
	}, {
		"./file-stream": 317,
		_process: 205,
		"end-of-stream": 81,
		events: 82,
		path: 201,
		"readable-stream": 235,
		"render-media": 236,
		"stream-to-blob": 294,
		"stream-to-blob-url": 293,
		"stream-with-known-length-to-buffer": 295
	}],
	319: [function(e, t, n) {
		const r = e("unordered-array-remove"),
			a = e("debug")("webtorrent:peer"),
			o = e("bittorrent-protocol"),
			s = e("./webconn");
		n.createWebRTCPeer = (e, t) => {
			const n = new i(e.id, "webrtc");
			return n.conn = e, n.swarm = t, n.conn.connected ? n.onConnect() : (n.conn.once("connect", () => {
				n.onConnect()
			}), n.conn.once("error", e => {
				n.destroy(e)
			}), n.startConnectTimeout()), n
		}, n.createTCPIncomingPeer = e => {
			const t = `${e.remoteAddress}:${e.remotePort}`,
				n = new i(t, "tcpIncoming");
			return n.conn = e, n.addr = t, n.onConnect(), n
		}, n.createTCPOutgoingPeer = (e, t) => {
			const n = new i(e, "tcpOutgoing");
			return n.addr = e, n.swarm = t, n
		}, n.createWebSeedPeer = (e, t) => {
			const n = new i(e, "webSeed");
			return n.swarm = t, n.conn = new s(e, t), n.onConnect(), n
		};
		class i {
			constructor(e, t) {
				this.id = e, this.type = t, a("new %s Peer %s", t, e), this.addr = null, this.conn = null, this.swarm = null, this.wire = null, this.connected = !1, this.destroyed = !1, this.timeout = null, this.retries = 0, this.sentHandshake = !1
			}
			onConnect() {
				if(!this.destroyed) {
					this.connected = !0, a("Peer %s connected", this.id), clearTimeout(this.connectTimeout);
					const e = this.conn;
					e.once("end", () => {
						this.destroy()
					}), e.once("close", () => {
						this.destroy()
					}), e.once("finish", () => {
						this.destroy()
					}), e.once("error", e => {
						this.destroy(e)
					});
					const t = this.wire = new o;
					t.type = this.type, t.once("end", () => {
						this.destroy()
					}), t.once("close", () => {
						this.destroy()
					}), t.once("finish", () => {
						this.destroy()
					}), t.once("error", e => {
						this.destroy(e)
					}), t.once("handshake", (e, t) => {
						this.onHandshake(e, t)
					}), this.startHandshakeTimeout(), e.pipe(t).pipe(e), this.swarm && !this.sentHandshake && this.handshake()
				}
			}
			onHandshake(e, t) {
				if(!this.swarm) return;
				if(this.destroyed) return;
				if(this.swarm.destroyed) return this.destroy(new Error("swarm already destroyed"));
				if(e !== this.swarm.infoHash) return this.destroy(new Error("unexpected handshake info hash for this swarm"));
				if(t === this.swarm.peerId) return this.destroy(new Error("refusing to connect to ourselves"));
				a("Peer %s got handshake %s", this.id, e), clearTimeout(this.handshakeTimeout), this.retries = 0;
				let n = this.addr;
				!n && this.conn.remoteAddress && this.conn.remotePort && (n = `${this.conn.remoteAddress}:${this.conn.remotePort}`), this.swarm._onWire(this.wire, n);
				this.swarm && !this.swarm.destroyed && (this.sentHandshake || this.handshake())
			}
			handshake() {
				const e = {
					dht: !this.swarm.private && !!this.swarm.client.dht
				};
				this.wire.handshake(this.swarm.infoHash, this.swarm.client.peerId, e), this.sentHandshake = !0
			}
			startConnectTimeout() {
				clearTimeout(this.connectTimeout), this.connectTimeout = setTimeout(() => {
					this.destroy(new Error("connect timeout"))
				}, "webrtc" === this.type ? 25e3 : 5e3), this.connectTimeout.unref && this.connectTimeout.unref()
			}
			startHandshakeTimeout() {
				clearTimeout(this.handshakeTimeout), this.handshakeTimeout = setTimeout(() => {
					this.destroy(new Error("handshake timeout"))
				}, 25e3), this.handshakeTimeout.unref && this.handshakeTimeout.unref()
			}
			destroy(e) {
				if(this.destroyed) return;
				this.destroyed = !0, this.connected = !1, a("destroy %s (error: %s)", this.id, e && (e.message || e)), clearTimeout(this.connectTimeout), clearTimeout(this.handshakeTimeout);
				const t = this.swarm,
					n = this.conn,
					o = this.wire;
				this.swarm = null, this.conn = null, this.wire = null, t && o && r(t.wires, t.wires.indexOf(o)), n && (n.on("error", () => {}), n.destroy()), o && o.destroy(), t && t.removePeer(this.id)
			}
		}
	}, {
		"./webconn": 322,
		"bittorrent-protocol": 10,
		debug: 77,
		"unordered-array-remove": 308
	}],
	320: [function(e, t) {
		t.exports = class {
			constructor(e) {
				this._torrent = e, this._numPieces = e.pieces.length, this._pieces = Array(this._numPieces), this._onWire = e => {
					this.recalculate(), this._initWire(e)
				}, this._onWireHave = e => {
					this._pieces[e] += 1
				}, this._onWireBitfield = () => {
					this.recalculate()
				}, this._torrent.wires.forEach(e => {
					this._initWire(e)
				}), this._torrent.on("wire", this._onWire), this.recalculate()
			}
			getRarestPiece(e) {
				let t = [],
					n = 1 / 0;
				for(let r = 0; r < this._numPieces; ++r) {
					if(e && !e(r)) continue;
					const a = this._pieces[r];
					a === n ? t.push(r) : a < n && (t = [r], n = a)
				}
				return t.length ? t[0 | Math.random() * t.length] : -1
			}
			destroy() {
				this._torrent.removeListener("wire", this._onWire), this._torrent.wires.forEach(e => {
					this._cleanupWireEvents(e)
				}), this._torrent = null, this._pieces = null, this._onWire = null, this._onWireHave = null, this._onWireBitfield = null
			}
			_initWire(e) {
				e._onClose = () => {
					this._cleanupWireEvents(e);
					for(let t = 0; t < this._numPieces; ++t) this._pieces[t] -= e.peerPieces.get(t)
				}, e.on("have", this._onWireHave), e.on("bitfield", this._onWireBitfield), e.once("close", e._onClose)
			}
			recalculate() {
				this._pieces.fill(0);
				for(const e of this._torrent.wires)
					for(let t = 0; t < this._numPieces; ++t) this._pieces[t] += e.peerPieces.get(t)
			}
			_cleanupWireEvents(e) {
				e.removeListener("have", this._onWireHave), e.removeListener("bitfield", this._onWireBitfield), e._onClose && e.removeListener("close", e._onClose), e._onClose = null
			}
		}
	}, {}],
	321: [function(e, t) {
		var n = Math.ceil,
			r = Math.max;
		(function(a, o) {
			function s(e, t) {
				return 2 + n(t * e.downloadSpeed() / T.BLOCK_LENGTH)
			}

			function d(e, t, r) {
				return 1 + n(t * e.downloadSpeed() / r)
			}

			function l(e) {
				return 0 | Math.random() * e
			}

			function i() {}
			const c = e("addr-to-ip-port"),
				u = e("bitfield"),
				p = e("chunk-store-stream/write"),
				f = e("debug")("webtorrent:torrent"),
				m = e("torrent-discovery"),
				h = e("events").EventEmitter,
				_ = e("fs"),
				g = e("fs-chunk-store"),
				y = e("simple-get"),
				b = e("immediate-chunk-store"),
				k = e("multistream"),
				w = e("net"),
				x = e("os"),
				S = e("run-parallel"),
				v = e("run-parallel-limit"),
				E = e("parse-torrent"),
				C = e("path"),
				T = e("torrent-piece"),
				I = e("pump"),
				L = e("random-iterate"),
				R = e("simple-sha1"),
				B = e("speedometer"),
				A = e("uniq"),
				O = e("ut_metadata"),
				D = e("ut_pex"),
				M = e("parse-numeric-range"),
				P = e("./file"),
				U = e("./peer"),
				j = e("./rarity-map"),
				N = e("./server"),
				z = 5e3,
				H = 3 * T.BLOCK_LENGTH,
				F = 1,
				W = a.browser ? 1 / 0 : 2,
				q = [1e3, 5e3, 15e3],
				Y = e("../package.json").version,
				G = `WebTorrent/${Y} (https://webtorrent.io)`;
			let V;
			try {
				V = C.join(_.statSync("/tmp") && "/tmp", "webtorrent")
			} catch(e) {
				V = C.join("function" == typeof x.tmpdir ? x.tmpdir() : "/", "webtorrent")
			}
			class Z extends h {
				constructor(e, t, n) {
					super(), this._debugId = "unknown infohash", this.client = t, this.announce = n.announce, this.urlList = n.urlList, this.path = n.path, this.skipVerify = !!n.skipVerify, this._store = n.store || g, this._getAnnounceOpts = n.getAnnounceOpts, this.strategy = n.strategy || "sequential", this.maxWebConns = n.maxWebConns || 4, this._rechokeNumSlots = !1 === n.uploads || 0 === n.uploads ? 0 : +n.uploads || 10, this._rechokeOptimisticWire = null, this._rechokeOptimisticTime = 0, this._rechokeIntervalId = null, this.ready = !1, this.destroyed = !1, this.paused = !1, this.done = !1, this.metadata = null, this.store = null, this.files = [], this.pieces = [], this._amInterested = !1, this._selections = [], this._critical = [], this.wires = [], this._queue = [], this._peers = {}, this._peersLength = 0, this.received = 0, this.uploaded = 0, this._downloadSpeed = B(), this._uploadSpeed = B(), this._servers = [], this._xsRequests = [], this._fileModtimes = n.fileModtimes, null !== e && this._onTorrentId(e), this._debug("new torrent")
				}
				get timeRemaining() {
					return this.done ? 0 : 0 === this.downloadSpeed ? 1 / 0 : 1e3 * ((this.length - this.downloaded) / this.downloadSpeed)
				}
				get downloaded() {
					if(!this.bitfield) return 0;
					let e = 0;
					for(let t = 0, n = this.pieces.length; t < n; ++t)
						if(this.bitfield.get(t)) e += t == n - 1 ? this.lastPieceLength : this.pieceLength;
						else {
							const n = this.pieces[t];
							e += n.length - n.missing
						}
					return e
				}
				get downloadSpeed() {
					return this._downloadSpeed()
				}
				get uploadSpeed() {
					return this._uploadSpeed()
				}
				get progress() {
					return this.length ? this.downloaded / this.length : 0
				}
				get ratio() {
					return this.uploaded / (this.received || 1)
				}
				get numPeers() {
					return this.wires.length
				}
				get torrentFileBlobURL() {
					if("undefined" == typeof window) throw new Error("browser-only property");
					return this.torrentFile ? URL.createObjectURL(new Blob([this.torrentFile], {
						type: "application/x-bittorrent"
					})) : null
				}
				get _numQueued() {
					return this._queue.length + (this._peersLength - this._numConns)
				}
				get _numConns() {
					let e = 0;
					for(const t in this._peers) this._peers[t].connected && (e += 1);
					return e
				}
				get swarm() {
					return console.warn("WebTorrent: `torrent.swarm` is deprecated. Use `torrent` directly instead."), this
				}
				_onTorrentId(e) {
					if(this.destroyed) return;
					let t;
					try {
						t = E(e)
					} catch(e) {}
					t ? (this.infoHash = t.infoHash, this._debugId = t.infoHash.toString("hex").substring(0, 7), a.nextTick(() => {
						this.destroyed || this._onParsedTorrent(t)
					})) : E.remote(e, (e, t) => this.destroyed ? void 0 : e ? this._destroy(e) : void this._onParsedTorrent(t))
				}
				_onParsedTorrent(e) {
					if(!this.destroyed) {
						if(this._processParsedTorrent(e), !this.infoHash) return this._destroy(new Error("Malformed torrent data: No info hash"));
						(this.path || (this.path = C.join(V, this.infoHash)), this._rechokeIntervalId = setInterval(() => {
							this._rechoke()
						}, 1e4), this._rechokeIntervalId.unref && this._rechokeIntervalId.unref(), this.emit("_infoHash", this.infoHash), !this.destroyed) && (this.emit("infoHash", this.infoHash), this.destroyed || (this.client.listening ? this._onListening() : this.client.once("listening", () => {
							this._onListening()
						})))
					}
				}
				_processParsedTorrent(e) {
					this._debugId = e.infoHash.toString("hex").substring(0, 7), this.announce && (e.announce = e.announce.concat(this.announce)), this.client.tracker && o.WEBTORRENT_ANNOUNCE && !this.private && (e.announce = e.announce.concat(o.WEBTORRENT_ANNOUNCE)), this.urlList && (e.urlList = e.urlList.concat(this.urlList)), A(e.announce), A(e.urlList), Object.assign(this, e), this.magnetURI = E.toMagnetURI(e), this.torrentFile = E.toTorrentFile(e)
				}
				_onListening() {
					if(this.discovery || this.destroyed) return;
					let e = this.client.tracker;
					e && (e = Object.assign({}, this.client.tracker, {
						getAnnounceOpts: () => {
							const e = {
								uploaded: this.uploaded,
								downloaded: this.downloaded,
								left: r(this.length - this.downloaded, 0)
							};
							return this.client.tracker.getAnnounceOpts && Object.assign(e, this.client.tracker.getAnnounceOpts()), this._getAnnounceOpts && Object.assign(e, this._getAnnounceOpts()), e
						}
					})), this.discovery = new m({
						infoHash: this.infoHash,
						announce: this.announce,
						peerId: this.client.peerId,
						dht: !this.private && this.client.dht,
						tracker: e,
						port: this.client.torrentPort,
						userAgent: G
					}), this.discovery.on("error", e => {
						this._destroy(e)
					}), this.discovery.on("peer", e => {
						"string" == typeof e && this.done || this.addPeer(e)
					}), this.discovery.on("trackerAnnounce", () => {
						this.emit("trackerAnnounce"), 0 === this.numPeers && this.emit("noPeers", "tracker")
					}), this.discovery.on("dhtAnnounce", () => {
						this.emit("dhtAnnounce"), 0 === this.numPeers && this.emit("noPeers", "dht")
					}), this.discovery.on("warning", e => {
						this.emit("warning", e)
					}), this.info ? this._onMetadata(this) : this.xs && this._getMetadataFromServer()
				}
				_getMetadataFromServer() {
					function e(e, n) {
						function r(r, a, o) {
							if(t.destroyed) return n(null);
							if(t.metadata) return n(null);
							if(r) return t.emit("warning", new Error(`http error from xs param: ${e}`)), n(null);
							if(200 !== a.statusCode) return t.emit("warning", new Error(`non-200 status code ${a.statusCode} from xs param: ${e}`)), n(null);
							let s;
							try {
								s = E(o)
							} catch(e) {}
							return s ? s.infoHash === t.infoHash ? void(t._onMetadata(s), n(null)) : (t.emit("warning", new Error(`got torrent file with incorrect info hash from xs param: ${e}`)), n(null)) : (t.emit("warning", new Error(`got invalid torrent file from xs param: ${e}`)), n(null))
						}
						if(0 !== e.indexOf("http://") && 0 !== e.indexOf("https://")) return t.emit("warning", new Error(`skipping non-http xs param: ${e}`)), n(null);
						let a;
						try {
							a = y.concat({
								url: e,
								method: "GET",
								headers: {
									"user-agent": G
								}
							}, r)
						} catch(r) {
							return t.emit("warning", new Error(`skipping invalid url xs param: ${e}`)), n(null)
						}
						t._xsRequests.push(a)
					}
					const t = this,
						n = Array.isArray(this.xs) ? this.xs : [this.xs],
						r = n.map(t => n => {
							e(t, n)
						});
					S(r)
				}
				_onMetadata(e) {
					if(this.metadata || this.destroyed) return;
					this._debug("got metadata"), this._xsRequests.forEach(e => {
						e.abort()
					}), this._xsRequests = [];
					let t;
					if(e && e.infoHash) t = e;
					else try {
						t = E(e)
					} catch(e) {
						return this._destroy(e)
					}
					if(this._processParsedTorrent(t), this.metadata = this.torrentFile, this.client.enableWebSeeds && this.urlList.forEach(e => {
							this.addWebSeed(e)
						}), this._rarityMap = new j(this), this.store = new b(new this._store(this.pieceLength, {
							torrent: {
								infoHash: this.infoHash
							},
							files: this.files.map(e => ({
								path: C.join(this.path, e.path),
								length: e.length,
								offset: e.offset
							})),
							length: this.length,
							name: this.infoHash
						})), this.files = this.files.map(e => new P(this, e)), this.so) {
						const e = M.parse(this.so);
						this.files.forEach((t, n) => {
							e.includes(n) && this.files[n].select(!0)
						})
					} else 0 !== this.pieces.length && this.select(0, this.pieces.length - 1, !1);
					this._hashes = this.pieces, this.pieces = this.pieces.map((e, t) => {
						const n = t === this.pieces.length - 1 ? this.lastPieceLength : this.pieceLength;
						return new T(n)
					}), this._reservations = this.pieces.map(() => []), this.bitfield = new u(this.pieces.length), this.wires.forEach(e => {
						e.ut_metadata && e.ut_metadata.setMetadata(this.metadata), this._onWireWithMetadata(e)
					}), this.skipVerify ? (this._markAllVerified(), this._onStore()) : (this._debug("verifying existing torrent data"), this._fileModtimes && this._store === g ? this.getFileModtimes((e, t) => {
						if(e) return this._destroy(e);
						const n = this.files.map((e, n) => t[n] === this._fileModtimes[n]).every(e => e);
						n ? (this._markAllVerified(), this._onStore()) : this._verifyPieces()
					}) : this._verifyPieces()), this.emit("metadata")
				}
				getFileModtimes(e) {
					const t = [];
					v(this.files.map((e, n) => r => {
						_.stat(C.join(this.path, e.path), (e, a) => e && "ENOENT" !== e.code ? r(e) : void(t[n] = a && a.mtime.getTime(), r(null)))
					}), W, n => {
						this._debug("done getting file modtimes"), e(n, t)
					})
				}
				_verifyPieces() {
					v(this.pieces.map((e, t) => e => this.destroyed ? e(new Error("torrent is destroyed")) : void this.store.get(t, (n, r) => this.destroyed ? e(new Error("torrent is destroyed")) : n ? a.nextTick(e, null) : void R(r, n => {
						if(this.destroyed) return e(new Error("torrent is destroyed"));
						if(n === this._hashes[t]) {
							if(!this.pieces[t]) return;
							this._debug("piece verified %s", t), this._markVerified(t)
						} else this._debug("piece invalid %s", t);
						e(null)
					}))), W, e => e ? this._destroy(e) : void(this._debug("done verifying"), this._onStore()))
				}
				_markAllVerified() {
					for(let e = 0; e < this.pieces.length; e++) this._markVerified(e)
				}
				_markVerified(e) {
					this.pieces[e] = null, this._reservations[e] = null, this.bitfield.set(e, !0)
				}
				_onStore() {
					this.destroyed || (this._debug("on store"), this.ready = !0, this.emit("ready"), this._checkDone(), this._updateSelections())
				}
				destroy(e) {
					this._destroy(null, e)
				}
				_destroy(e, t) {
					if(!this.destroyed) {
						for(const e in this.destroyed = !0, this._debug("destroy"), this.client._remove(this), clearInterval(this._rechokeIntervalId), this._xsRequests.forEach(e => {
								e.abort()
							}), this._rarityMap && this._rarityMap.destroy(), this._peers) this.removePeer(e);
						this.files.forEach(e => {
							e instanceof P && e._destroy()
						});
						const n = this._servers.map(e => t => {
							e.destroy(t)
						});
						this.discovery && n.push(e => {
							this.discovery.destroy(e)
						}), this.store && n.push(e => {
							this.store.close(e)
						}), S(n, t), e && (0 === this.listenerCount("error") ? this.client.emit("error", e) : this.emit("error", e)), this.emit("close"), this.client = null, this.files = [], this.discovery = null, this.store = null, this._rarityMap = null, this._peers = null, this._servers = null, this._xsRequests = null
					}
				}
				addPeer(t) {
					if(this.destroyed) throw new Error("torrent is destroyed");
					if(!this.infoHash) throw new Error("addPeer() must not be called before the `infoHash` event");
					if(this.client.blocked) {
						let e;
						if("string" == typeof t) {
							let n;
							try {
								n = c(t)
							} catch(n) {
								return this._debug("ignoring peer: invalid %s", t), this.emit("invalidPeer", t), !1
							}
							e = n[0]
						} else "string" == typeof t.remoteAddress && (e = t.remoteAddress);
						if(e && this.client.blocked.contains(e)) return this._debug("ignoring peer: blocked %s", t), "string" != typeof t && t.destroy(), this.emit("blockedPeer", t), !1
					}
					const e = !!this._addPeer(t);
					return e ? this.emit("peer", t) : this.emit("invalidPeer", t), e
				}
				_addPeer(e) {
					if(this.destroyed) return "string" != typeof e && e.destroy(), null;
					if("string" == typeof e && !this._validAddr(e)) return this._debug("ignoring peer: invalid %s", e), null;
					const t = e && e.id || e;
					if(this._peers[t]) return this._debug("ignoring peer: duplicate (%s)", t), "string" != typeof e && e.destroy(), null;
					if(this.paused) return this._debug("ignoring peer: torrent is paused"), "string" != typeof e && e.destroy(), null;
					this._debug("add peer %s", t);
					let n;
					return n = "string" == typeof e ? U.createTCPOutgoingPeer(e, this) : U.createWebRTCPeer(e, this), this._peers[n.id] = n, this._peersLength += 1, "string" == typeof e && (this._queue.push(n), this._drain()), n
				}
				addWebSeed(e) {
					if(this.destroyed) throw new Error("torrent is destroyed");
					if(!/^https?:\/\/.+/.test(e)) return this.emit("warning", new Error(`ignoring invalid web seed: ${e}`)), void this.emit("invalidPeer", e);
					if(this._peers[e]) return this.emit("warning", new Error(`ignoring duplicate web seed: ${e}`)), void this.emit("invalidPeer", e);
					this._debug("add web seed %s", e);
					const t = U.createWebSeedPeer(e, this);
					this._peers[t.id] = t, this._peersLength += 1, this.emit("peer", e)
				}
				_addIncomingPeer(e) {
					return this.destroyed ? e.destroy(new Error("torrent is destroyed")) : this.paused ? e.destroy(new Error("torrent is paused")) : void(this._debug("add incoming peer %s", e.id), this._peers[e.id] = e, this._peersLength += 1)
				}
				removePeer(e) {
					const t = e && e.id || e;
					e = this._peers[t];
					e && (this._debug("removePeer %s", t), delete this._peers[t], this._peersLength -= 1, e.destroy(), this._drain())
				}
				select(e, t, n, r) {
					if(this.destroyed) throw new Error("torrent is destroyed");
					if(0 > e || t < e || this.pieces.length <= t) throw new Error("invalid selection ", e, ":", t);
					n = +n || 0, this._debug("select %s-%s (priority %s)", e, t, n), this._selections.push({
						from: e,
						to: t,
						offset: 0,
						priority: n,
						notify: r || i
					}), this._selections.sort((e, t) => t.priority - e.priority), this._updateSelections()
				}
				deselect(e, t, n) {
					if(this.destroyed) throw new Error("torrent is destroyed");
					n = +n || 0, this._debug("deselect %s-%s (priority %s)", e, t, n);
					for(let r = 0; r < this._selections.length; ++r) {
						const a = this._selections[r];
						if(a.from === e && a.to === t && a.priority === n) {
							this._selections.splice(r, 1);
							break
						}
					}
					this._updateSelections()
				}
				critical(e, t) {
					if(this.destroyed) throw new Error("torrent is destroyed");
					this._debug("critical %s-%s", e, t);
					for(let n = e; n <= t; ++n) this._critical[n] = !0;
					this._updateSelections()
				}
				_onWire(e, t) {
					if(this._debug("got wire %s (%s)", e._debugId, t || "Unknown"), e.on("download", e => {
							this.destroyed || (this.received += e, this._downloadSpeed(e), this.client._downloadSpeed(e), this.emit("download", e), this.client.emit("download", e))
						}), e.on("upload", e => {
							this.destroyed || (this.uploaded += e, this._uploadSpeed(e), this.client._uploadSpeed(e), this.emit("upload", e), this.client.emit("upload", e))
						}), this.wires.push(e), t) {
						const n = c(t);
						e.remoteAddress = n[0], e.remotePort = n[1]
					}
					this.client.dht && this.client.dht.listening && e.on("port", n => this.destroyed || this.client.dht.destroyed ? void 0 : e.remoteAddress ? 0 === n || 65536 < n ? this._debug("ignoring invalid PORT from peer") : void(this._debug("port: %s (from %s)", n, t), this.client.dht.addNode({
						host: e.remoteAddress,
						port: n
					})) : this._debug("ignoring PORT from peer with no address")), e.on("timeout", () => {
						this._debug("wire timeout (%s)", t), e.destroy()
					}), e.setTimeout(3e4, !0), e.setKeepAlive(!0), e.use(O(this.metadata)), e.ut_metadata.on("warning", e => {
						this._debug("ut_metadata warning: %s", e.message)
					}), this.metadata || (e.ut_metadata.on("metadata", e => {
						this._debug("got metadata via ut_metadata"), this._onMetadata(e)
					}), e.ut_metadata.fetch()), "function" != typeof D || this.private || (e.use(D()), e.ut_pex.on("peer", e => {
						this.done || (this._debug("ut_pex: got peer: %s (from %s)", e, t), this.addPeer(e))
					}), e.ut_pex.on("dropped", e => {
						const n = this._peers[e];
						n && !n.connected && (this._debug("ut_pex: dropped peer: %s (from %s)", e, t), this.removePeer(e))
					}), e.once("close", () => {
						e.ut_pex.reset()
					})), this.emit("wire", e, t), this.metadata && a.nextTick(() => {
						this._onWireWithMetadata(e)
					})
				}
				_onWireWithMetadata(e) {
					let t = null;
					const n = () => {
						this.destroyed || e.destroyed || (this._numQueued > 2 * (this._numConns - this.numPeers) && e.amInterested ? e.destroy() : (t = setTimeout(n, z), t.unref && t.unref()))
					};
					let r;
					const a = () => {
						if(e.peerPieces.buffer.length === this.bitfield.buffer.length) {
							for(r = 0; r < this.pieces.length; ++r)
								if(!e.peerPieces.get(r)) return;
							e.isSeeder = !0, e.choke()
						}
					};
					e.on("bitfield", () => {
						a(), this._update()
					}), e.on("have", () => {
						a(), this._update()
					}), e.once("interested", () => {
						e.unchoke()
					}), e.once("close", () => {
						clearTimeout(t)
					}), e.on("choke", () => {
						clearTimeout(t), t = setTimeout(n, z), t.unref && t.unref()
					}), e.on("unchoke", () => {
						clearTimeout(t), this._update()
					}), e.on("request", (t, n, r, a) => r > 131072 ? e.destroy() : void(this.pieces[t] || this.store.get(t, {
						offset: n,
						length: r
					}, a))), e.bitfield(this.bitfield), e.uninterested(), e.peerExtensions.dht && this.client.dht && this.client.dht.listening && e.port(this.client.dht.address().port), "webSeed" !== e.type && (t = setTimeout(n, z), t.unref && t.unref()), e.isSeeder = !1, a()
				}
				_updateSelections() {
					!this.ready || this.destroyed || (a.nextTick(() => {
						this._gcSelections()
					}), this._updateInterest(), this._update())
				}
				_gcSelections() {
					for(let e = 0; e < this._selections.length; ++e) {
						const t = this._selections[e],
							n = t.offset;
						for(; this.bitfield.get(t.from + t.offset) && t.from + t.offset < t.to;) t.offset += 1;
						n !== t.offset && t.notify(), t.to === t.from + t.offset && this.bitfield.get(t.from + t.offset) && (this._selections.splice(e, 1), e -= 1, t.notify(), this._updateInterest())
					}
					this._selections.length || this.emit("idle")
				}
				_updateInterest() {
					const e = this._amInterested;
					this._amInterested = !!this._selections.length, this.wires.forEach(e => {
						let t = !1;
						for(let n = 0; n < this.pieces.length; ++n)
							if(this.pieces[n] && e.peerPieces.get(n)) {
								t = !0;
								break
							}
						t ? e.interested() : e.uninterested()
					});
					e === this._amInterested || (this._amInterested ? this.emit("interested") : this.emit("uninterested"))
				}
				_update() {
					if(!this.destroyed) {
						const e = L(this.wires);
						for(let t; t = e();) this._updateWire(t)
					}
				}
				_updateWire(e) {
					function t(t, n, r, a) {
						return o => o >= t && o <= n && !(o in r) && e.peerPieces.get(o) && (!a || a(o))
					}

					function n() {
						const t = e.downloadSpeed() || 1;
						if(t > H) return() => !0;
						const n = r(1, e.requests.length) * T.BLOCK_LENGTH / t;
						let a = 10,
							o = 0;
						return e => {
							if(!a || d.bitfield.get(e)) return !0;
							for(let r = d.pieces[e].missing; o < d.wires.length; o++) {
								const s = d.wires[o],
									i = s.downloadSpeed();
								if(!(i < H) && !(i <= t) && s.peerPieces.get(e) && !(0 < (r -= i * n))) return a--, !1
							}
							return !0
						}
					}

					function a(e) {
						let t = e;
						for(let n = e; n < d._selections.length && d._selections[n].priority; n++) t = n;
						const n = d._selections[e];
						d._selections[e] = d._selections[t], d._selections[t] = n
					}

					function o(r) {
						if(e.requests.length >= l) return !0;
						const o = n();
						for(let n = 0; n < d._selections.length; n++) {
							const s = d._selections[n];
							let i;
							if("rarest" === d.strategy) {
								const c = s.from + s.offset,
									u = s.to,
									p = {};
								let f = 0;
								for(const m = t(c, u, p, o); f < u - c + 1 && (i = d._rarityMap.getRarestPiece(m), !(0 > i));) {
									for(; d._request(e, i, d._critical[i] || r););
									if(e.requests.length < l) {
										p[i] = !0, f++;
										continue
									}
									return s.priority && a(n), !0
								}
							} else
								for(i = s.from + s.offset; i <= s.to; i++)
									if(e.peerPieces.get(i) && o(i)) {
										for(; d._request(e, i, d._critical[i] || r););
										if(!(e.requests.length < l)) return s.priority && a(n), !0
									}
						}
						return !1
					}
					const d = this;
					if(e.peerChoking) return;
					if(!e.downloaded) return function() {
						if(!e.requests.length)
							for(let n = d._selections.length; n--;) {
								const r = d._selections[n];
								let a;
								if("rarest" === d.strategy) {
									const n = r.from + r.offset,
										o = r.to,
										s = {};
									let i = 0;
									for(const r = t(n, o, s); i < o - n + 1 && (a = d._rarityMap.getRarestPiece(r), !(0 > a));) {
										if(d._request(e, a, !1)) return;
										s[a] = !0, i += 1
									}
								} else
									for(a = r.to; a >= r.from + r.offset; --a)
										if(e.peerPieces.get(a) && d._request(e, a, !1)) return
							}
					}();
					const i = s(e, .5);
					if(e.requests.length >= i) return;
					const l = s(e, F);
					o(!1) || o(!0)
				}
				_rechoke() {
					if(!this.ready) return;
					0 < this._rechokeOptimisticTime ? this._rechokeOptimisticTime -= 1 : this._rechokeOptimisticWire = null;
					const e = [];
					this.wires.forEach(t => {
						t.isSeeder || t === this._rechokeOptimisticWire || e.push({
							wire: t,
							downloadSpeed: t.downloadSpeed(),
							uploadSpeed: t.uploadSpeed(),
							salt: Math.random(),
							isChoked: !0
						})
					}), e.sort(function(e, t) {
						return e.downloadSpeed === t.downloadSpeed ? e.uploadSpeed === t.uploadSpeed ? e.wire.amChoking === t.wire.amChoking ? e.salt - t.salt : e.wire.amChoking ? 1 : -1 : t.uploadSpeed - e.uploadSpeed : t.downloadSpeed - e.downloadSpeed
					});
					let t = 0,
						n = 0;
					for(; n < e.length && t < this._rechokeNumSlots; ++n) e[n].isChoked = !1, e[n].wire.peerInterested && (t += 1);
					if(!this._rechokeOptimisticWire && n < e.length && this._rechokeNumSlots) {
						const t = e.slice(n).filter(e => e.wire.peerInterested),
							r = t[l(t.length)];
						r && (r.isChoked = !1, this._rechokeOptimisticWire = r.wire, this._rechokeOptimisticTime = 2)
					}
					e.forEach(e => {
						e.wire.amChoking !== e.isChoked && (e.isChoked ? e.wire.choke() : e.wire.unchoke())
					})
				}
				_hotswap(e, t) {
					const n = e.downloadSpeed();
					if(n < T.BLOCK_LENGTH) return !1;
					if(!this._reservations[t]) return !1;
					const a = this._reservations[t];
					if(!a) return !1;
					let r = 1 / 0,
						o, s;
					for(s = 0; s < a.length; s++) {
						const t = a[s];
						if(!t || t === e) continue;
						const i = t.downloadSpeed();
						i >= H || 2 * i > n || i > r || (o = t, r = i)
					}
					if(!o) return !1;
					for(s = 0; s < a.length; s++) a[s] === o && (a[s] = null);
					for(s = 0; s < o.requests.length; s++) {
						const e = o.requests[s];
						e.piece === t && this.pieces[t].cancel(0 | e.offset / T.BLOCK_LENGTH)
					}
					return this.emit("hotswap", o, e, t), !0
				}
				_request(e, t, n) {
					function o() {
						a.nextTick(() => {
							l._update()
						})
					}
					const l = this,
						c = e.requests.length,
						u = "webSeed" === e.type;
					if(l.bitfield.get(t)) return !1;
					const p = u ? Math.min(d(e, F, l.pieceLength), l.maxWebConns) : s(e, F);
					if(c >= p) return !1;
					const f = l.pieces[t];
					let m = u ? f.reserveRemaining() : f.reserve();
					if(-1 === m && n && l._hotswap(e, t) && (m = u ? f.reserveRemaining() : f.reserve()), -1 === m) return !1;
					let h = l._reservations[t];
					h || (h = l._reservations[t] = []);
					let _ = h.indexOf(null); - 1 === _ && (_ = h.length), h[_] = e;
					const g = f.chunkOffset(m),
						y = u ? f.chunkLengthRemaining(m) : f.chunkLength(m);
					return e.request(t, g, y, function n(r, a) {
						if(l.destroyed) return;
						if(!l.ready) return l.once("ready", () => {
							n(r, a)
						});
						if(h[_] === e && (h[_] = null), f !== l.pieces[t]) return o();
						if(r) return l._debug("error getting piece %s (offset: %s length: %s) from %s: %s", t, g, y, `${e.remoteAddress}:${e.remotePort}`, r.message), u ? f.cancelRemaining(m) : f.cancel(m), void o();
						if(l._debug("got piece %s (offset: %s length: %s) from %s", t, g, y, `${e.remoteAddress}:${e.remotePort}`), !f.set(m, a, e)) return o();
						const s = f.flush();
						R(s, e => {
							if(!l.destroyed) {
								if(e === l._hashes[t]) {
									if(!l.pieces[t]) return;
									l._debug("piece verified %s", t), l.pieces[t] = null, l._reservations[t] = null, l.bitfield.set(t, !0), l.store.put(t, s), l.wires.forEach(e => {
										e.have(t)
									}), l._checkDone() && !l.destroyed && l.discovery.complete()
								} else l.pieces[t] = new T(f.length), l.emit("warning", new Error(`Piece ${t} failed verification`));
								o()
							}
						})
					}), !0
				}
				_checkDone() {
					if(this.destroyed) return;
					this.files.forEach(e => {
						if(!e.done) {
							for(let t = e._startPiece; t <= e._endPiece; ++t)
								if(!this.bitfield.get(t)) return;
							e.done = !0, e.emit("done"), this._debug(`file done: ${e.name}`)
						}
					});
					let e = !0;
					for(let t = 0; t < this._selections.length; t++) {
						const n = this._selections[t];
						for(let t = n.from; t <= n.to; t++)
							if(!this.bitfield.get(t)) {
								e = !1;
								break
							}
						if(!e) break
					}
					return !this.done && e && (this.done = !0, this._debug(`torrent done: ${this.infoHash}`), this.emit("done")), this._gcSelections(), e
				}
				load(e, t) {
					if(this.destroyed) throw new Error("torrent is destroyed");
					if(!this.ready) return this.once("ready", () => {
						this.load(e, t)
					});
					Array.isArray(e) || (e = [e]), t || (t = i);
					const n = new k(e),
						r = new p(this.store, this.pieceLength);
					I(n, r, e => e ? t(e) : void(this._markAllVerified(), this._checkDone(), t(null)))
				}
				createServer(e) {
					if("function" != typeof N) throw new Error("node.js-only method");
					if(this.destroyed) throw new Error("torrent is destroyed");
					const t = new N(this, e);
					return this._servers.push(t), t
				}
				pause() {
					this.destroyed || (this._debug("pause"), this.paused = !0)
				}
				resume() {
					this.destroyed || (this._debug("resume"), this.paused = !1, this._drain())
				}
				_debug() {
					const e = [].slice.call(arguments);
					e[0] = `[${this.client._debugId}] [${this._debugId}] ${e[0]}`, f(...e)
				}
				_drain() {
					if(this._debug("_drain numConns %s maxConns %s", this._numConns, this.client.maxConns), "function" != typeof w.connect || this.destroyed || this.paused || this._numConns >= this.client.maxConns) return;
					this._debug("drain (%s queued, %s/%s peers)", this._numQueued, this.numPeers, this.client.maxConns);
					const e = this._queue.shift();
					if(!e) return;
					this._debug("tcp connect attempt to %s", e.addr);
					const t = c(e.addr),
						n = {
							host: t[0],
							port: t[1]
						},
						r = e.conn = w.connect(n);
					r.once("connect", () => {
						e.onConnect()
					}), r.once("error", t => {
						e.destroy(t)
					}), e.startConnectTimeout(), r.on("close", () => {
						if(!this.destroyed) {
							if(e.retries >= q.length) return void this._debug("conn %s closed: will not re-add (max %s attempts)", e.addr, q.length);
							const t = q[e.retries];
							this._debug("conn %s closed: will re-add to queue in %sms (attempt %s)", e.addr, t, e.retries + 1);
							const n = setTimeout(() => {
								const t = this._addPeer(e.addr);
								t && (t.retries = e.retries + 1)
							}, t);
							n.unref && n.unref()
						}
					})
				}
				_validAddr(e) {
					let t;
					try {
						t = c(e)
					} catch(t) {
						return !1
					}
					const n = t[0],
						r = t[1];
					return 0 < r && 65535 > r && ("127.0.0.1" !== n || r !== this.client.torrentPort)
				}
			}
			t.exports = Z
		}).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
	}, {
		"../package.json": 323,
		"./file": 318,
		"./peer": 319,
		"./rarity-map": 320,
		"./server": 35,
		_process: 205,
		"addr-to-ip-port": 3,
		bitfield: 9,
		"chunk-store-stream/write": 52,
		debug: 77,
		events: 82,
		fs: 36,
		"fs-chunk-store": 153,
		"immediate-chunk-store": 97,
		multistream: 171,
		net: 35,
		os: 35,
		"parse-numeric-range": 199,
		"parse-torrent": 200,
		path: 201,
		pump: 206,
		"random-iterate": 211,
		"run-parallel": 239,
		"run-parallel-limit": 238,
		"simple-get": 243,
		"simple-sha1": 254,
		speedometer: 265,
		"torrent-discovery": 303,
		"torrent-piece": 304,
		uniq: 307,
		ut_metadata: 312,
		ut_pex: 35
	}],
	322: [function(e, t) {
		var n = Math.max;
		const r = e("bitfield"),
			a = e("safe-buffer").Buffer,
			o = e("debug")("webtorrent:webconn"),
			s = e("simple-get"),
			i = e("simple-sha1"),
			d = e("bittorrent-protocol"),
			l = e("../package.json").version;
		t.exports = class extends d {
			constructor(e, t) {
				super(), this.url = e, this.webPeerId = i.sync(e), this._torrent = t, this._init()
			}
			_init() {
				this.setKeepAlive(!0), this.once("handshake", e => {
					if(this.destroyed) return;
					this.handshake(e, this.webPeerId);
					const t = this._torrent.pieces.length,
						n = new r(t);
					for(let r = 0; r <= t; r++) n.set(r, !0);
					this.bitfield(n)
				}), this.once("interested", () => {
					o("interested"), this.unchoke()
				}), this.on("uninterested", () => {
					o("uninterested")
				}), this.on("choke", () => {
					o("choke")
				}), this.on("unchoke", () => {
					o("unchoke")
				}), this.on("bitfield", () => {
					o("bitfield")
				}), this.on("request", (e, t, n, r) => {
					o("request pieceIndex=%d offset=%d length=%d", e, t, n), this.httpRequest(e, t, n, r)
				})
			}
			httpRequest(e, t, r, i) {
				const d = e * this._torrent.pieceLength,
					c = d + t,
					u = c + r - 1,
					p = this._torrent.files;
				let f;
				if(1 >= p.length) f = [{
					url: this.url,
					start: c,
					end: u
				}];
				else {
					const e = p.filter(e => e.offset <= u && e.offset + e.length > c);
					if(1 > e.length) return i(new Error("Could not find file corresponnding to web seed range request"));
					f = e.map(e => {
						const t = e.offset + e.length - 1,
							r = this.url + ("/" === this.url[this.url.length - 1] ? "" : "/") + e.path;
						return {
							url: r,
							fileOffsetInRange: n(e.offset - c, 0),
							start: n(c - e.offset, 0),
							end: Math.min(t, u - e.offset)
						}
					})
				}
				let m = 0,
					h = !1,
					_;
				1 < f.length && (_ = a.alloc(r)), f.forEach(n => {
					function a(e, t) {
						return 200 > e.statusCode || 300 <= e.statusCode ? (h = !0, i(new Error(`Unexpected HTTP status code ${e.statusCode}`))) : void(o("Got data of length %d", t.length), 1 === f.length ? i(null, t) : (t.copy(_, n.fileOffsetInRange), ++m === f.length && i(null, _)))
					}
					const d = n.url,
						c = n.start,
						u = n.end;
					o("Requesting url=%s pieceIndex=%d offset=%d length=%d start=%d end=%d", d, e, t, r, c, u);
					const p = {
						url: d,
						method: "GET",
						headers: {
							"user-agent": `WebTorrent/${l} (https://webtorrent.io)`,
							range: `bytes=${c}-${u}`
						}
					};
					s.concat(p, (e, t, n) => h ? void 0 : e ? "undefined" == typeof window || d.startsWith(`${window.location.origin}/`) ? (h = !0, i(e)) : s.head(d, (t, n) => h ? void 0 : t ? (h = !0, i(t)) : 200 > n.statusCode || 300 <= n.statusCode ? (h = !0, i(new Error(`Unexpected HTTP status code ${n.statusCode}`))) : n.url === d ? (h = !0, i(e)) : void(p.url = n.url, s.concat(p, (e, t, n) => h ? void 0 : e ? (h = !0, i(e)) : void a(t, n)))) : void a(t, n))
				})
			}
			destroy() {
				super.destroy(), this._torrent = null
			}
		}
	}, {
		"../package.json": 323,
		bitfield: 9,
		"bittorrent-protocol": 10,
		debug: 77,
		"safe-buffer": 241,
		"simple-get": 243,
		"simple-sha1": 254
	}],
	323: [function(e, t) {
		t.exports = {
			version: "0.102.4"
		}
	}, {}],
	324: [function(e, t) {
		function n(e, t) {
			function r() {
				for(var t = Array(arguments.length), n = 0; n < t.length; n++) t[n] = arguments[n];
				var r = e.apply(this, t),
					a = t[t.length - 1];
				return "function" == typeof r && r !== a && Object.keys(a).forEach(function(e) {
					r[e] = a[e]
				}), r
			}
			if(e && t) return n(e)(t);
			if("function" != typeof e) throw new TypeError("need wrapper function");
			return Object.keys(e).forEach(function(t) {
				r[t] = e[t]
			}), r
		}
		t.exports = n
	}, {}],
	325: [function(e, t) {
		t.exports = function() {
			for(var e = {}, t = 0, r; t < arguments.length; t++)
				for(var a in r = arguments[t], r) n.call(r, a) && (e[a] = r[a]);
			return e
		};
		var n = Object.prototype.hasOwnProperty
	}, {}],
	326: [function(e, t) {
		t.exports = function(e) {
			for(var t = 1, r; t < arguments.length; t++)
				for(var a in r = arguments[t], r) n.call(r, a) && (e[a] = r[a]);
			return e
		};
		var n = Object.prototype.hasOwnProperty
	}, {}]
}, {}, [2]);
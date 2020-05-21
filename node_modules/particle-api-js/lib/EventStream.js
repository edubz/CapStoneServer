'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint max-depth: 0 */
var EventStream = function (_EventEmitter) {
	(0, _inherits3.default)(EventStream, _EventEmitter);

	function EventStream(uri, token) {
		(0, _classCallCheck3.default)(this, EventStream);

		var _this = (0, _possibleConstructorReturn3.default)(this, (EventStream.__proto__ || (0, _getPrototypeOf2.default)(EventStream)).call(this));

		_this.uri = uri;
		_this.token = token;
		_this.reconnectInterval = 2000;
		_this.timeout = 13000; // keep alive can be sent up to 12 seconds after last event
		_this.data = '';
		_this.buf = '';

		_this.parse = _this.parse.bind(_this);
		_this.end = _this.end.bind(_this);
		_this.idleTimeoutExpired = _this.idleTimeoutExpired.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(EventStream, [{
		key: 'connect',
		value: function connect() {
			var _this2 = this;

			return new _promise2.default(function (resolve, reject) {
				var _url$parse = _url2.default.parse(_this2.uri),
				    hostname = _url$parse.hostname,
				    protocol = _url$parse.protocol,
				    port = _url$parse.port,
				    path = _url$parse.path;

				_this2.origin = protocol + '//' + hostname + (port ? ':' + port : '');

				var isSecure = protocol === 'https:';
				var requestor = isSecure ? _https2.default : _http2.default;
				var req = requestor.request({
					hostname: hostname,
					protocol: protocol,
					path: path + '?access_token=' + _this2.token,
					method: 'get',
					port: parseInt(port, 10) || (isSecure ? 443 : 80),
					avoidFetch: true,
					mode: 'prefer-streaming'
				});

				_this2.req = req;

				var connected = false;
				var connectionTimeout = setTimeout(function () {
					if (_this2.req) {
						_this2.req.abort();
					}
					reject({ error: new Error('Timeout'), errorDescription: 'Timeout connecting to ' + _this2.uri });
				}, _this2.timeout);

				req.on('error', function (e) {
					clearTimeout(connectionTimeout);

					if (connected) {
						_this2.end();
					} else {
						reject({ error: e, errorDescription: 'Network error from ' + _this2.uri });
					}
				});

				req.on('response', function (res) {
					clearTimeout(connectionTimeout);

					var statusCode = res.statusCode;
					if (statusCode !== 200) {
						var body = '';
						res.on('data', function (chunk) {
							return body += chunk;
						});
						res.on('end', function () {
							try {
								body = JSON.parse(body);
							} catch (e) {
								// don't bother doing anything special if the JSON.parse fails
								// since we are already about to reject the promise anyway
							} finally {
								var errorDescription = 'HTTP error ' + statusCode + ' from ' + _this2.uri;
								if (body && body.error_description) {
									errorDescription += ' - ' + body.error_description;
								}
								reject({ statusCode: statusCode, errorDescription: errorDescription, body: body });
								_this2.req = undefined;
							}
						});
						return;
					}

					_this2.data = '';
					_this2.buf = '';

					connected = true;
					res.on('data', _this2.parse);
					res.once('end', _this2.end);
					_this2.startIdleTimeout();
					resolve(_this2);
				});
				req.end();
			});
		}
	}, {
		key: 'abort',
		value: function abort() {
			if (this.req) {
				this.req.abort();
				this.req = undefined;
			}
			this.removeAllListeners();
		}

		/* Private methods */

	}, {
		key: 'emitSafe',
		value: function emitSafe(event, param) {
			try {
				this.emit(event, param);
			} catch (error) {
				if (event !== 'error') {
					this.emitSafe('error', error);
				}
			}
		}
	}, {
		key: 'end',
		value: function end() {
			this.stopIdleTimeout();

			if (!this.req) {
				// request was ended intentionally by abort
				// do not auto reconnect.
				return;
			}

			this.req = undefined;
			this.emitSafe('disconnect');
			this.reconnect();
		}
	}, {
		key: 'reconnect',
		value: function reconnect() {
			var _this3 = this;

			setTimeout(function () {
				if (_this3.isOffline()) {
					_this3.reconnect();
					return;
				}

				_this3.emitSafe('reconnect');
				_this3.connect().then(function () {
					_this3.emitSafe('reconnect-success');
				}).catch(function (err) {
					_this3.emitSafe('reconnect-error', err);
					_this3.reconnect();
				});
			}, this.reconnectInterval);
		}
	}, {
		key: 'isOffline',
		value: function isOffline() {
			if (typeof navigator === 'undefined' || navigator.hasOwnProperty('onLine')) {
				return false;
			}
			return !navigator.onLine;
		}
	}, {
		key: 'startIdleTimeout',
		value: function startIdleTimeout() {
			this.stopIdleTimeout();
			this.idleTimeout = setTimeout(this.idleTimeoutExpired, this.timeout);
		}
	}, {
		key: 'stopIdleTimeout',
		value: function stopIdleTimeout() {
			if (this.idleTimeout) {
				clearTimeout(this.idleTimeout);
				this.idleTimeout = null;
			}
		}
	}, {
		key: 'idleTimeoutExpired',
		value: function idleTimeoutExpired() {
			if (this.req) {
				this.req.abort();
				this.end();
			}
		}
	}, {
		key: 'parse',
		value: function parse(chunk) {
			this.startIdleTimeout();

			this.buf += chunk;
			var pos = 0;
			var length = this.buf.length;
			var discardTrailingNewline = false;

			while (pos < length) {
				if (discardTrailingNewline) {
					if (this.buf[pos] === '\n') {
						++pos;
					}
					discardTrailingNewline = false;
				}

				var lineLength = -1;
				var fieldLength = -1;

				for (var i = pos; lineLength < 0 && i < length; ++i) {
					var c = this.buf[i];
					if (c === ':') {
						if (fieldLength < 0) {
							fieldLength = i - pos;
						}
					} else if (c === '\r') {
						discardTrailingNewline = true;
						lineLength = i - pos;
					} else if (c === '\n') {
						lineLength = i - pos;
					}
				}

				if (lineLength < 0) {
					break;
				}

				this.parseEventStreamLine(pos, fieldLength, lineLength);

				pos += lineLength + 1;
			}

			if (pos === length) {
				this.buf = '';
			} else if (pos > 0) {
				this.buf = this.buf.slice(pos);
			}
		}
	}, {
		key: 'parseEventStreamLine',
		value: function parseEventStreamLine(pos, fieldLength, lineLength) {
			if (lineLength === 0) {
				try {
					if (this.data.length > 0 && this.event) {
						var event = JSON.parse(this.data);
						event.name = this.eventName || '';
						this.emitSafe('event', event);
					}
				} catch (e) {
					// do nothing if JSON.parse fails
				} finally {
					this.data = '';
					this.eventName = undefined;
					this.event = false;
				}
			} else if (fieldLength > 0) {
				var field = this.buf.slice(pos, pos + fieldLength);
				var step = 0;

				if (this.buf[pos + fieldLength + 1] !== ' ') {
					step = fieldLength + 1;
				} else {
					step = fieldLength + 2;
				}
				pos += step;
				var valueLength = lineLength - step;
				var value = this.buf.slice(pos, pos + valueLength);

				if (field === 'data') {
					this.data += value + '\n';
				} else if (field === 'event') {
					this.eventName = value;
					this.event = true;
				}
			}
		}
	}]);
	return EventStream;
}(_events.EventEmitter);

exports.default = EventStream;
module.exports = exports['default'];
//# sourceMappingURL=EventStream.js.map
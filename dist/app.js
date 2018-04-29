/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventSys = exports.PublicAPI = undefined;

var _events = __webpack_require__(17);

var PublicAPI = exports.PublicAPI = window.OWOP = window.WorldOfPixels = {};
var eventSys = exports.eventSys = new _events.EventEmitter();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.options = exports.PUBLIC_EVENTS = exports.EVENTS = exports.RANK = exports.protocol = undefined;

var _global = __webpack_require__(0);

var _misc = __webpack_require__(2);

var _toolset = __webpack_require__(18);

var _toolset2 = _interopRequireDefault(_toolset);

var _unloaded = __webpack_require__(19);

var _unloaded2 = _interopRequireDefault(_unloaded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Important constants */

var protocol = exports.protocol = null;

/* The raw event ID numbers should NOT be used, instead import the EVENTS object in your file. */
var evtId = 6666666; /* no */

var RANK = exports.RANK = {
	NONE: 0,
	USER: 1,
	MODERATOR: 2,
	ADMIN: 3
};

_global.PublicAPI.RANK = RANK;

var EVENTS = exports.EVENTS = {
	loaded: ++evtId,
	init: ++evtId,
	tick: ++evtId,
	misc: {
		toolsRendered: ++evtId,
		toolsInitialized: ++evtId,
		logoMakeRoom: ++evtId,
		worldInitialized: ++evtId,
		windowAdded: ++evtId,
		captchaToken: ++evtId
	},
	renderer: {
		addChunk: ++evtId,
		rmChunk: ++evtId,
		updateChunk: ++evtId
	},
	camera: {
		moved: ++evtId,
		zoom: ++evtId /* (zoom value), note that this event should not be used to SET zoom level. */
	},
	net: {
		connecting: ++evtId,
		connected: ++evtId,
		disconnected: ++evtId,
		playerCount: ++evtId,
		chat: ++evtId,
		devChat: ++evtId,
		world: {
			leave: ++evtId,
			join: ++evtId, /* (worldName string) */
			joining: ++evtId, /* (worldName string) */
			setId: ++evtId,
			playersMoved: ++evtId, /* (Object with all the updated player values) */
			playersLeft: ++evtId,
			tilesUpdated: ++evtId,
			teleported: ++evtId
		},
		chunk: {
			load: ++evtId, /* (Chunk class) */
			unload: ++evtId, /* (x, y) */
			set: ++evtId, /* (x, y, data), backwards compat */
			lock: ++evtId
		},
		sec: {
			rank: ++evtId
		}
	}
};

var PUBLIC_EVENTS = exports.PUBLIC_EVENTS = {
	loaded: EVENTS.loaded,
	init: EVENTS.init,
	tick: EVENTS.tick,
	toolsInitialized: EVENTS.misc.toolsInitialized
};

_global.PublicAPI.events = PUBLIC_EVENTS;

var userOptions = {};
if ((0, _misc.storageEnabled)()) {
	try {
		userOptions = JSON.parse(localStorage.getItem('owopOptions') || '{}');
	} catch (e) {
		console.error('Error while parsing user options!', e);
	}
}

var options = exports.options = (0, _misc.propertyDefaults)(userOptions, {
	serverAddress: [{
		default: true,
		title: 'Official server',
		proto: 'old',
		url: 'ws://wire.ddns.net:7000'
	}, {
		default: false,
		title: 'Localhost',
		proto: 'old',
		url: 'ws://localhost:25565',
		maxRetries: 1
	}], // The server address that websockets connect to
	fallbackFps: 30, // Fps used if requestAnimationFrame is not supported
	maxChatBuffer: 256, // How many chat messages to retain in the chatbox
	tickSpeed: 30, // How many times per second to run a tick
	minGridZoom: 1, /* Minimum zoom level where the grid shows up */
	movementSpeed: 1, /* Pixels per tick */
	defaultWorld: 'main',
	enableSounds: true,
	defaultZoom: 16,
	zoomStrength: 1,
	zoomLimitMin: 1,
	zoomLimitMax: 32,
	unloadDistance: 10,
	toolSetUrl: _toolset2.default,
	unloadedPatternUrl: _unloaded2.default,
	backgroundUrl: null,
	/* Bug only affects Windows users with an Intel graphics card,
  * since we can't easily know the client's GPU,
  * activate for all windows users ¯\_(ツ)_/¯
  */
	chunkBugWorkaround: false // navigator.userAgent.indexOf('Windows NT') !== -1
	/* Did it get fixed? we'll know soon! */
});

if (options.chunkBugWorkaround) {
	console.debug('Chunk bug workaround enabled!');
}

_global.PublicAPI.options = options;

_global.eventSys.on(EVENTS.net.connecting, function (server) {
	exports.protocol = protocol = server.proto;
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getTime = getTime;
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.cookiesEnabled = cookiesEnabled;
exports.storageEnabled = storageEnabled;
exports.propertyDefaults = propertyDefaults;
exports.absMod = absMod;
exports.htmlToElement = htmlToElement;
exports.escapeHTML = escapeHTML;
exports.mkHTML = mkHTML;
exports.loadScript = loadScript;
exports.eventOnce = eventOnce;
exports.setTooltip = setTooltip;
exports.waitFrames = waitFrames;
exports.decompress = decompress;
exports.line = line;

var _color = __webpack_require__(4);

var _global = __webpack_require__(0);

_global.PublicAPI.util = {
	getTime: getTime,
	cookiesEnabled: cookiesEnabled,
	storageEnabled: storageEnabled,
	absMod: absMod,
	escapeHTML: escapeHTML,
	mkHTML: mkHTML,
	setTooltip: setTooltip,
	waitFrames: waitFrames,
	line: line
};

var time = Date.now();
function getTime(update) {
	return update ? time = Date.now() : time;
}

function setCookie(name, value) {
	document.cookie = name + '=' + value + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
}

function getCookie(name) {
	var cookie = document.cookie.split(';');
	for (var i = 0; i < cookie.length; i++) {
		var idx = cookie[i].indexOf(name + '=');
		if (idx === 0 || idx === 1 && cookie[i][0] === ' ') {
			var off = idx + name.length + 1;
			return cookie[i].substring(off, cookie[i].length);
		}
	}
	return null;
}

function cookiesEnabled() {
	return navigator.cookieEnabled;
}

function storageEnabled() {
	try {
		return !!window.localStorage;
	} catch (e) {
		return false;
	}
}

function propertyDefaults(obj, defaults) {
	if (obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				defaults[prop] = obj[prop];
			}
		}
	}
	return defaults;
}

// This fixes modulo to work on negative numbers (-1 % 16 = 15)
function absMod(n1, n2) {
	return (n1 % n2 + n2) % n2;
}

function htmlToElement(html) {
	return mkHTML("template", {
		innerHTML: html
	}).content.firstChild;
}

function escapeHTML(text) {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\'/g, '&#39;').replace(/\//g, '&#x2F;');
}

/* Makes an HTML element with the values specified in opts */
function mkHTML(tag, opts) {
	var elm = document.createElement(tag);
	for (var i in opts) {
		elm[i] = opts[i];
	}
	return elm;
}

function loadScript(name, callback) {
	document.getElementsByTagName('head')[0].appendChild(mkHTML("script", {
		type: "text/javascript",
		src: name,
		onload: callback
	}));
}

function eventOnce(element, events, func) {
	var ev = events.split(' ');
	var f = function f(e) {
		for (var i = 0; i < ev.length; i++) {
			element.removeEventListener(ev[i], f);
		}
		return func();
	};

	for (var i = 0; i < ev.length; i++) {
		element.addEventListener(ev[i], f);
	}
}

function setTooltip(element, message) {
	var elementSpacing = 10;
	var intr = 0;
	var tip = null;
	function tooltip() {
		var epos = element.getBoundingClientRect();
		var y = epos.top + epos.height / 2;
		tip = mkHTML('span', {
			innerHTML: message,
			className: 'framed tooltip whitetext'
		});
		document.body.appendChild(tip);
		var tpos = tip.getBoundingClientRect();
		y -= tpos.height / 2;
		var x = epos.left - tpos.width - elementSpacing;
		if (x < elementSpacing) {
			x = epos.right + elementSpacing;
		}
		tip.style.transform = 'translate(' + Math.round(x) + 'px,' + Math.round(y) + 'px)';
		intr = 0;
	}
	var mleave = function mleave(e) {
		clearTimeout(intr);
		intr = 0;
		element.removeEventListener('mouseleave', mleave);
		element.removeEventListener('click', mleave);
		element.removeEventListener('DOMNodeRemoved', mleave);
		if (tip !== null) {
			tip.remove();
			tip = null;
		}
	};
	var menter = function menter(e) {
		if (tip === null && intr === 0) {
			intr = setTimeout(tooltip, 500);
			element.addEventListener('click', mleave);
			element.addEventListener('mouseleave', mleave);
			element.addEventListener('DOMNodeRemoved', mleave);
		}
	};
	/*var observer = new MutationObserver(e => { // Why does this not fire at all?
 	console.log(e, tip, intr);
 	if (e[0].removedNodes && (tip !== null || intr !== 0)) {
 		mleave();
 	}
 });
 observer.observe(element, { childList: true, subtree: true });*/
	element.addEventListener('mouseenter', menter);
}

/* Waits n frames */
function waitFrames(n, cb) {
	window.requestAnimationFrame(function () {
		return n > 0 ? waitFrames(--n, cb) : cb();
	});
}

function decompress(u8arr) {
	var originalLength = u8arr[1] << 8 | u8arr[0];
	var u8decompressedarr = new Uint8Array(originalLength);
	var numOfRepeats = u8arr[3] << 8 | u8arr[2];
	var offset = numOfRepeats * 2 + 4;
	var uptr = 0;
	var cptr = offset;
	for (var i = 0; i < numOfRepeats; i++) {
		var currentRepeatLoc = (u8arr[4 + i * 2 + 1] << 8 | u8arr[4 + i * 2]) + offset;
		while (cptr < currentRepeatLoc) {
			u8decompressedarr[uptr++] = u8arr[cptr++];
		}
		var repeatedNum = u8arr[cptr + 1] << 8 | u8arr[cptr];
		var repeatedColorR = u8arr[cptr + 2];
		var repeatedColorG = u8arr[cptr + 3];
		var repeatedColorB = u8arr[cptr + 4];
		cptr += 5;
		while (repeatedNum--) {
			u8decompressedarr[uptr] = repeatedColorR;
			u8decompressedarr[uptr + 1] = repeatedColorG;
			u8decompressedarr[uptr + 2] = repeatedColorB;
			uptr += 3;
		}
	}
	while (cptr < u8arr.length) {
		u8decompressedarr[uptr++] = u8arr[cptr++];
	}
	return u8decompressedarr;
}

/*function decompressu16(input) {
	var originalLength = (((input[1] & 0xFF) << 8 | (input[0] & 0xFF)) + 1) * 2;
	var output = new Uint8Array(originalLength);
	var numOfRepeats = (input[3] & 0xFF) << 8 | (input[2] & 0xFF);
	var offset = numOfRepeats * 2 + 4;
	var uptr = 0;
	var cptr = offset;
	for (var i = 0; i < numOfRepeats; i++) {
		var currentRepeatLoc = 2 * ((((input[4 + i * 2 + 1] & 0xFF) << 8) | (input[4 + i * 2] & 0xFF)))
				+ offset;
		while (cptr < currentRepeatLoc) {
			output[uptr++] = input[cptr++];
		}
		var repeatedNum = ((input[cptr + 1] & 0xFF) << 8 | (input[cptr] & 0xFF)) + 1;
		var repeatedColorRGB = (input[cptr + 3] & 0xFF) << 8 | (input[cptr + 2] & 0xFF);
		cptr += 4;
		while (repeatedNum-- != 0) {
			output[uptr] = (repeatedColorRGB & 0xFF);
			output[uptr + 1] = ((repeatedColorRGB & 0xFF00) >> 8);
			uptr += 2;
		}
	}
	while (cptr < input.length) {
		output[uptr++] = input[cptr++];
	}
	return output;
}*/

function line(x1, y1, x2, y2, size, plot) {
	var dx = Math.abs(x2 - x1),
	    sx = x1 < x2 ? 1 : -1;
	var dy = -Math.abs(y2 - y1),
	    sy = y1 < y2 ? 1 : -1;
	var err = dx + dy,
	    e2;

	while (true) {
		plot(x1, y1);
		if (x1 == x2 && y1 == y2) break;
		e2 = 2 * err;
		if (e2 >= dy) {
			err += dy;x1 += sx;
		}
		if (e2 <= dx) {
			err += dx;y1 += sy;
		}
	}
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * TODO List: https://trello.com/b/v6F6isSv/worldofpixels
 * NOTE: Let's stick with the correct way of storing colors,
 * first byte should be red value: 0xAABBGGRR, or [r, g, b]
 */


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.playerListWindow = exports.playerListTable = exports.playerList = exports.sounds = exports.misc = exports.elements = exports.mouse = exports.keysDown = exports.statusMsg = exports.showPlayerList = exports.showDevChat = undefined;

var _normalizeWheel = __webpack_require__(15);

var _anchorme = __webpack_require__(16);

var _anchorme2 = _interopRequireDefault(_anchorme);

var _conf = __webpack_require__(1);

var _Bucket = __webpack_require__(9);

var _misc = __webpack_require__(2);

var _global = __webpack_require__(0);

var _World = __webpack_require__(12);

var _canvas_renderer = __webpack_require__(5);

var _networking = __webpack_require__(8);

var _local_player = __webpack_require__(6);

var _all = __webpack_require__(21);

var _windowsys = __webpack_require__(11);

var _launch = __webpack_require__(25);

var _launch2 = _interopRequireDefault(_launch);

var _place = __webpack_require__(26);

var _place2 = _interopRequireDefault(_place);

var _click = __webpack_require__(27);

var _click2 = _interopRequireDefault(_click);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.showDevChat = showDevChat;
exports.showPlayerList = showPlayerList;
exports.statusMsg = statusMsg;
var keysDown = exports.keysDown = {};

var mouse = exports.mouse = {
	x: 0, /* pageX */
	y: 0, /* pageY */
	lastX: 0,
	lastY: 0,
	get worldX() {
		return _canvas_renderer.camera.x * 16 + this.x / (_canvas_renderer.camera.zoom / 16);
	},
	get worldY() {
		return _canvas_renderer.camera.y * 16 + this.y / (_canvas_renderer.camera.zoom / 16);
	},
	mouseDownWorldX: 0,
	mouseDownWorldY: 0,
	get tileX() {
		return Math.floor(this.worldX / 16);
	},
	get tileY() {
		return Math.floor(this.worldY / 16);
	},
	buttons: 0,
	validTile: false,
	insideViewport: false,
	touches: [],
	cancelMouseDown: function cancelMouseDown() {
		this.buttons = 0;
	}
};

var elements = exports.elements = {
	viewport: null,
	xyDisplay: null,
	chatInput: null,
	chat: null,
	devChat: null
};

var misc = exports.misc = {
	_world: null,
	lastXYDisplay: [-1, -1],
	chatRecvModifier: function chatRecvModifier(msg) {
		return msg;
	},
	chatSendModifier: function chatSendModifier(msg) {
		return msg;
	},
	exceptionTimeout: null,
	worldPasswords: {},
	tick: 0,
	urlWorldName: null,
	connecting: false,
	tickInterval: null,
	lastMessage: null,
	lastCleanup: 0,
	set world(value) {
		/* The reason this is done is because the old functions may reference the old world object */
		_global.PublicAPI.world = getNewWorldApi();
		return this._world = value;
	},
	get world() {
		return this._world;
	},
	guiShown: false,
	cookiesEnabled: (0, _misc.cookiesEnabled)(),
	storageEnabled: (0, _misc.storageEnabled)(),
	showEUCookieNag: (0, _misc.cookiesEnabled)() && (0, _misc.getCookie)("nagAccepted") !== "true",
	usingFirefox: navigator.userAgent.indexOf("Firefox") !== -1
};

var sounds = exports.sounds = {
	play: function play(sound) {
		sound.currentTime = 0;
		if (_conf.options.enableSounds) {
			sound.play();
		}
	}
};
sounds.launch = new Audio();
sounds.launch.src = _launch2.default;
sounds.place = new Audio();
sounds.place.src = _place2.default;
sounds.click = new Audio();
sounds.click.src = _click2.default;

var playerList = exports.playerList = {};
var playerListTable = exports.playerListTable = document.createElement("table");
var playerListWindow = exports.playerListWindow = new _windowsys.GUIWindow('Players', { closeable: true }, function (wdow) {
	var tableHeader = document.createElement("tr");
	tableHeader.innerHTML = "<th>Id</th><th>X</th><th>Y</th>";
	playerListTable.appendChild(tableHeader);
	wdow.container.appendChild(playerListTable);
	wdow.container.id = "player-list";
}).move(window.innerWidth - 240, 32);

function getNewWorldApi() {
	var obj = {};
	var defProp = function defProp(prop) {
		Object.defineProperty(obj, prop, {
			get: function get() {
				return misc.world && this['_' + prop] || (this['_' + prop] = misc.world[prop].bind(misc.world));
			}
		});
	};
	defProp('getPixel');
	defProp('setPixel');
	defProp('undo');
	defProp('unloadFarChunks');
	return obj;
}

function receiveMessage(text) {
	console.log(text);
	text = misc.chatRecvModifier(text);
	if (!text) {
		return;
	}

	var message = document.createElement("li");
	var realText = text;
	var isAdmin = false;
	if (text.startsWith("[D]")) {
		message.className = "discord";
		var nick = document.createElement("span");
		nick.className = "nick";
		var nickname = text.split(": ")[0] + ": ";
		nick.innerHTML = (0, _misc.escapeHTML)(nickname);
		message.appendChild(nick);
		text = text.slice(nickname.length);
	} else if (text.startsWith("[Server]") || text.startsWith("Server:") || text.startsWith("Nickname set to") || text.startsWith("User: ")) {
		message.className = "server";
	} else if (text.startsWith("->")) {
		message.className = "tell";
	} else if (text.startsWith("(M)")) {
		message.className = "moderator";
	} else if (isNaN(text.split(": ")[0]) && text.split(": ")[0].charAt(0) != "[") {
		message.className = "admin";
		isAdmin = true;
	} else {
		var nick = document.createElement("span");
		nick.className = "nick";
		var nickname = text.split(": ")[0] + ": ";
		nick.innerHTML = (0, _misc.escapeHTML)(nickname);
		message.appendChild(nick);
		text = text.slice(nickname.length);
	}
	var idIndex = text.indexOf(': '); /* This shouldn't be like this, change on proto switch */
	if (idIndex !== -1) {
		var ntext = text.substr(0, idIndex);
		realText = ntext.replace(/\d+/g, '') + text.slice(idIndex + 2);
	}

	if (misc.lastMessage && misc.lastMessage.text === realText) {
		misc.lastMessage.incCount();
	} else {
		var span = document.createElement("span");
		misc.lastMessage = {
			get text() {
				return realText;
			},
			incCount: function incCount() {
				var times = span.recvTimes || 1;
				span.innerHTML = text + ' [x' + ++times + ']';
				span.recvTimes = times;
				message.style.animation = 'none'; /* Reset fading anim */
				message.offsetHeight; /* Reflow */
				message.style.animation = null;
			}
		};
		if (!isAdmin) {
			text = (0, _misc.escapeHTML)(text).replace(/\&\#x2F;/g, "/");
		}
		span.innerHTML = (0, _anchorme2.default)(text, {
			attributes: [{
				name: "target",
				value: "blank"
			}]
		});
		message.appendChild(span);
		scrollChatToBottom(function () {
			elements.chatMessages.appendChild(message);
			var childs = elements.chatMessages.children;
			if (childs.length > _conf.options.maxChatBuffer) {
				childs[0].remove();
			}
		}, true);
	}
}

function receiveDevMessage(text) {
	var message = document.createElement("li");
	var span = document.createElement("span");
	span.innerHTML = text;
	message.appendChild(span);
	elements.devChatMessages.appendChild(message);
	elements.devChatMessages.scrollTop = elements.devChatMessages.scrollHeight;
}

function scrollChatToBottom(callback) {
	var dontScrollIfNotTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	var shouldScroll = !dontScrollIfNotTop || elements.chatMessages.scrollHeight - elements.chatMessages.scrollTop === elements.chatMessages.clientHeight;
	if (callback) callback(); // add all elements here
	if (shouldScroll) elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function clearChat() {
	elements.chatMessages.innerHTML = "";
	elements.devChatMessages.innerHTML = "";
}

function tick() {
	var tickNum = ++misc.tick;
	var speed = Math.max(Math.min(_conf.options.movementSpeed, 64), 0);
	var offX = 0;
	var offY = 0;
	if (keysDown[38]) {
		// Up
		offY -= speed;
	}
	if (keysDown[37]) {
		// Left
		offX -= speed;
	}
	if (keysDown[40]) {
		// Down
		offY += speed;
	}
	if (keysDown[39]) {
		// Right
		offX += speed;
	}
	if (offX !== 0 || offY !== 0) {
		(0, _canvas_renderer.moveCameraBy)(offX, offY);
		updateMouse(null, 'mousemove', mouse.x, mouse.y);
	}

	_global.eventSys.emit(_conf.EVENTS.tick, tickNum);
	if (_local_player.player.tool !== null && misc.world !== null) {
		_local_player.player.tool.call('tick', mouse);
	}
}

function updateMouse(event, eventName, mouseX, mouseY) {
	mouse.x = mouseX;
	mouse.y = mouseY;
	var cancelled = 0;
	if (misc.world !== null) {
		mouse.validTile = misc.world.validMousePos(mouse.tileX, mouse.tileY);
		if (_local_player.player.tool !== null) {
			cancelled = _local_player.player.tool.call(eventName, [mouse, event]);
		}
		if (updateXYDisplay(mouse.tileX, mouse.tileY)) {
			(0, _local_player.updateClientFx)();
		}
	}
	return cancelled;
}

function openChat() {
	elements.chat.className = "active selectable";
	elements.devChat.className = "active selectable";
	elements.chatMessages.className = "active";
	scrollChatToBottom();
}

function closeChat() {
	elements.chat.className = "";
	elements.devChat.className = "";
	elements.chatMessages.className = "";
	elements.chatInput.blur();
	scrollChatToBottom();
}

function showDevChat(bool) {
	elements.devChat.style.display = bool ? "" : "none";
}

function showPlayerList(bool) {
	if (bool) {
		_windowsys.windowSys.addWindow(playerListWindow);
	} else {
		_windowsys.windowSys.delWindow(playerListWindow);
	}
}

function updateXYDisplay(x, y) {
	if (misc.lastXYDisplay[0] !== x || misc.lastXYDisplay[1] !== y) {
		misc.lastXYDisplay = [x, y];
		elements.xyDisplay.innerHTML = "X: " + x + ", Y: " + y;
		return true;
	}
	return false;
}

function updatePlayerCount(count) {
	elements.playerCountDisplay.innerHTML = count + ' cursor' + (count !== 1 ? 's online' : ' online');
}
/*
function openServerSelector() {
	windowsys.addWindow(new GUIWindow(0, 0, 250, 60, "Select a server", {
			centered: true
		}, wdow => {

		wdow.addObj(mkHTML("button", {
			innerHTML: "Original server",
			style: "width: 100%; height: 50%",
			onclick: () => {
				w.options.serverAddress = "ws://ourworldofpixels.com:443";
				w.net.connect();
				win.wm.delWindow(win);
				w.options.oldserver = true;
			}
		}));
		wdow.addObj(mkHTML("button", {
			innerHTML: "Beta server",
			style: "width: 100%; height: 50%",
			onclick: () => {
				w.options.serverAddress = "ws://vanillaplay.ddns.net:25565";
				w.net.connect();
				win.wm.delWindow(win);
			}
		}));
		wdow.addObj(mkHTML("button", {
			innerHTML: "Localhost",
			style: "width: 100%; height: 50%",
			onclick: () => {
				w.options.serverAddress = "ws://localhost:25565";
				w.net.connect();
				win.wm.delWindow(win);
			}
		}));
		wdow.addObj(mkHTML("button", {
			innerHTML: "Custom server",
			style: "width: 100%; height: 50%",
			onclick: function() {
				var i = win.wm.addWindow(
					new UtilInput("Enter server address", "Type here...", "text", function(addr) {
						w.options.serverAddress = addr;
						w.net.connect();
						win.close();
					}.bind({w: w, win: win}))
				);
				win.onclose = function() {
					i.getWindow().close();
				}
			}.bind({w: this, win: wdow})
		}));
	}));
}
*/
function logoMakeRoom(bool) {
	elements.loadUl.style.transform = bool ? "translateY(-75%) scale(0.5)" : "";
}

function showWorldUI(bool) {
	misc.guiShown = bool;
	elements.xyDisplay.style.transform = bool ? "initial" : "";
	elements.playerCountDisplay.style.transform = bool ? "initial" : "";
	elements.palette.style.transform = bool ? "translateY(-50%)" : "";
	elements.chat.style.transform = bool ? "initial" : "";
	elements.chatInput.disabled = !bool;
	elements.chatInput.style.display = "initial";
}

function showLoadScr(bool, showOptions) {
	elements.loadOptions.className = showOptions ? "framed" : "hide";
	if (!bool) {
		elements.loadScr.style.transform = "translateY(-110%)"; /* +10% for shadow */
		(0, _misc.eventOnce)(elements.loadScr, "transitionend webkitTransitionEnd oTransitionEnd msTransitionEnd", function () {
			if (_networking.net.isConnected()) {
				elements.loadScr.className = "hide";
			}
		});
	} else {
		elements.loadScr.className = "";
		elements.loadScr.style.transform = "";
	}
}

function statusMsg(showSpinner, message) {
	var statusShown = elements.status.isConnected;
	if (message === null) {
		elements.status.style.display = "none";
		return;
	} else {
		elements.status.style.display = "";
	}
	elements.statusMsg.innerHTML = message;
	elements.spinner.style.display = showSpinner ? "" : "none";
}

function inGameDisconnected() {
	showWorldUI(false);
	showLoadScr(true, true);
	statusMsg(false, "Lost connection with the server.");
	misc.world = null;
	elements.chat.style.transform = "initial";
	elements.chatInput.style.display = "";
}

function retryingConnect(serverGetter, worldName) {
	if (misc.connecting && !_networking.net.isConnected()) {
		/* We're already connected/trying to connect */
		return;
	}
	misc.connecting = true;
	var currentServer = serverGetter(false);
	var tryConnect = function tryConnect(tryN) {
		if (tryN >= (currentServer.maxRetries || 3)) {
			currentServer = serverGetter(true);
			tryN = 0;
		}
		_global.eventSys.once(_conf.EVENTS.net.connecting, function () {
			console.debug('Trying \'' + currentServer.title + '\' (' + currentServer.url + ')...');
			statusMsg(true, 'Connecting to \'' + currentServer.title + '\'...');
			showLoadScr(true, false);
		});
		_networking.net.connect(currentServer, worldName);
		var disconnected = function disconnected() {
			++tryN;
			statusMsg(true, 'Couldn\'t connect to server, retrying... (' + tryN + ')');
			setTimeout(tryConnect, Math.min(tryN * 2000, 10000), tryN);
			_global.eventSys.removeListener(_conf.EVENTS.net.connected, connected);
		};
		var connected = function connected() {
			statusMsg(false, "Connected!");
			_global.eventSys.removeListener(_conf.EVENTS.net.disconnected, disconnected);
			_global.eventSys.once(_conf.EVENTS.net.disconnected, inGameDisconnected);
			misc.connecting = false;
		};

		_global.eventSys.once(_conf.EVENTS.net.connected, connected);
		_global.eventSys.once(_conf.EVENTS.net.disconnected, disconnected);
	};
	tryConnect(0);
}

function saveWorldPasswords() {
	if (misc.storageEnabled) {
		localStorage.worldPasswords = JSON.stringify(misc.worldPasswords);
	}
}

function checkFunctionality(callback) {
	/* Multi Browser Support */
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (f) {
		setTimeout(f, 1000 / _conf.options.fallbackFps);
	};

	Number.isInteger = Number.isInteger || function (n) {
		return Math.floor(n) === n && Math.abs(n) !== Infinity;
	};
	Math.trunc = Math.trunc || function (n) {
		return n | 0;
	};

	var toBlob = HTMLCanvasElement.prototype.toBlob = HTMLCanvasElement.prototype.toBlob || HTMLCanvasElement.prototype.msToBlob;

	if (!toBlob) {
		/* Load toBlob polyfill */
		(0, _misc.loadScript)(__webpack_require__(28), callback);
	} else {
		callback();
	}
}

function init() {
	var viewport = elements.viewport;
	var chatinput = elements.chatInput;

	if (misc.storageEnabled && localStorage.worldPasswords) {
		try {
			misc.worldPasswords = JSON.parse(localStorage.worldPasswords);
		} catch (e) {}
	}

	misc.lastCleanup = 0;

	viewport.oncontextmenu = function () {
		return false;
	};

	viewport.addEventListener("mouseenter", function () {
		mouse.insideViewport = true;
		(0, _local_player.updateClientFx)();
	});
	viewport.addEventListener("mouseleave", function () {
		mouse.insideViewport = false;
		(0, _local_player.updateClientFx)();
	});

	var chatHistory = [];
	var historyIndex = 0;
	chatinput.addEventListener("keydown", function (event) {
		event.stopPropagation();
		if (historyIndex === 0) {
			chatHistory[0] = chatinput.value;
		}
		var keyCode = event.which || event.keyCode;
		switch (keyCode) {
			case 27:
				closeChat();
				break;
			case 13:
				if (!event.shiftKey) {
					event.preventDefault();
					var text = chatinput.value;
					historyIndex = 0;
					chatHistory.unshift(text);
					if (misc.storageEnabled) {
						if (text.startsWith("/adminlogin ")) {
							localStorage.adminlogin = text.slice(12);
						} else if (text.startsWith("/modlogin ")) {
							localStorage.modlogin = text.slice(10);
						} else if (text.startsWith("/nick")) {
							var nick = text.slice(6);
							if (nick.length) {
								localStorage.nick = nick;
							} else {
								delete localStorage.nick;
							}
						} else if (text.startsWith("/pass ") && misc.world) {
							var pass = text.slice(6);
							misc.worldPasswords[_networking.net.protocol.worldName] = pass;
							saveWorldPasswords();
						}
					}
					if (!event.ctrlKey) {
						text = misc.chatSendModifier(text);
					}
					_networking.net.protocol.sendMessage(text);
					chatinput.value = '';
					chatinput.style.height = "16px";
					event.stopPropagation();
				}
				break;
			case 38:
				// Arrow up
				if (event.shiftKey && historyIndex < chatHistory.length - 1) {
					historyIndex++;
					chatinput.value = chatHistory[historyIndex];
					chatinput.style.height = 0;
					chatinput.style.height = Math.min(chatinput.scrollHeight - 8, 16 * 4) + "px";
				}
				break;
			case 40:
				// Arrow Down
				if (event.shiftKey && historyIndex > 0) {
					historyIndex--;
					chatinput.value = chatHistory[historyIndex];
					chatinput.style.height = 0;
					chatinput.style.height = Math.min(chatinput.scrollHeight - 8, 16 * 4) + "px";
				}
				break;
		}
	});
	chatinput.addEventListener("keyup", function (event) {
		event.stopPropagation();
		var keyCode = event.which || event.keyCode;
		if (keyCode == 13 && !event.shiftKey) {
			closeChat();
		}
	});
	chatinput.addEventListener("input", function (event) {
		chatinput.style.height = 0;
		chatinput.style.height = Math.min(chatinput.scrollHeight - 8, 16 * 4) + "px";
	});
	chatinput.addEventListener("focus", function (event) {
		if (!mouse.buttons) {
			openChat();
		} else {
			chatinput.blur();
		}
	});

	window.addEventListener("keydown", function (event) {
		var keyCode = event.which || event.keyCode;
		if (document.activeElement.tagName !== "INPUT" && misc.world !== null) {
			keysDown[keyCode] = true;
			var tool = _local_player.player.tool;
			if (tool !== null && misc.world !== null && tool.isEventDefined('keydown')) {
				if (tool.call('keydown', [keysDown, event])) {
					return false;
				}
			}
			switch (keyCode) {
				case 80:
					/* P */
					_local_player.player.tool = "pipette";
					break;

				case 79:
					/* O */
					_local_player.player.tool = "cursor";
					break;

				case 77: /* M */
				case 16:
					/* Shift */
					_local_player.player.tool = "move";
					break;

				case 90:
					/* Ctrl + Z */
					if (!event.ctrlKey || !misc.world) {
						break;
					}
					misc.world.undo(event.shiftKey);
					event.preventDefault();
					break;

				case 70:
					/* F */
					var parseClr = function parseClr(clr) {
						var tmp = clr.split(',');
						var nrgb = null;
						if (tmp.length == 3) {
							nrgb = tmp;
							for (var i = 0; i < tmp.length; i++) {
								tmp[i] = +tmp[i];
								if (!(tmp[i] >= 0 && tmp[i] < 256)) {
									return null;
								}
							}
						} else if (clr[0] == '#' && clr.length == 7) {
							var colr = parseInt(clr.replace('#', '0x'));
							/* The parsed HTML color doesn't have red as the first byte, so invert it. */
							nrgb = [colr >> 16 & 0xFF, colr >> 8 & 0xFF, colr & 0xFF];
						}
						return nrgb;
					};
					var input = prompt("Custom color\nType three values separated by a comma: r,g,b\n(...or the hex string: #RRGGBB)\nYou can add multiple colors at a time separating them with a space.");
					if (!input) {
						break;
					}
					input = input.split(' ');
					for (var j = 0; j < input.length; j++) {
						var rgb = parseClr(input[j]);
						if (rgb) {
							_local_player.player.selectedColor = rgb;
						}
					}

					break;

				case 71:
					/* G */
					_canvas_renderer.renderer.showGrid(!_canvas_renderer.renderer.gridShown);
					break;

				case 112:
					/* F1 */
					showWorldUI(!misc.guiShown);
					event.preventDefault();
					break;

				case 107:
				case 187:
					++_canvas_renderer.camera.zoom;
					break;

				case 109:
				case 189:
					--_canvas_renderer.camera.zoom;
					break;

				default:
					return true;
					break;
			}
			return false;
		}
	});
	window.addEventListener("keyup", function (event) {
		var keyCode = event.which || event.keyCode;
		delete keysDown[keyCode];
		if (document.activeElement.tagName !== "INPUT") {
			var tool = _local_player.player.tool;
			if (tool !== null && misc.world !== null && tool.isEventDefined('keyup')) {
				if (tool.call('keyup', [keysDown, event])) {
					return false;
				}
			}
			if (keyCode == 13) {
				elements.chatInput.focus();
			} else if (keyCode == 16) {
				_local_player.player.tool = "cursor";
			}
		}
	});
	viewport.addEventListener("mousedown", function (event) {
		closeChat();
		mouse.lastX = mouse.x;
		mouse.lastY = mouse.y;
		mouse.x = event.pageX;
		mouse.y = event.pageY;
		mouse.mouseDownWorldX = mouse.worldX;
		mouse.mouseDownWorldY = mouse.worldY;
		if ('buttons' in event) {
			mouse.buttons = event.buttons;
		} else {
			var realBtn = event.button;
			if (realBtn === 2) {
				realBtn = 1;
			} else if (realBtn === 1) {
				realBtn = 2;
			}
			mouse.buttons |= 1 << realBtn;
		}

		var tool = _local_player.player.tool;
		if (tool !== null && misc.world !== null) {
			_local_player.player.tool.call('mousedown', [mouse, event]);
		}
	});

	window.addEventListener("mouseup", function (event) {
		/* Old versions of firefox have the buttons property as the
   * buttons released, instead of the currently pressed buttons.
   **/
		if ('buttons' in event && !misc.usingFirefox) {
			mouse.buttons = event.buttons;
		} else {
			var realBtn = event.button;
			if (realBtn === 2) {
				realBtn = 1;
			} else if (realBtn === 1) {
				realBtn = 2;
			}
			mouse.buttons &= ~(1 << realBtn);
		}
		var tool = _local_player.player.tool;
		if (tool !== null && misc.world !== null) {
			_local_player.player.tool.call('mouseup', [mouse, event]);
		}
	});

	window.addEventListener("mousemove", function (event) {
		var cancelledButtons = updateMouse(event, 'mousemove', event.pageX, event.pageY);
		var remainingButtons = mouse.buttons & ~cancelledButtons;
		if (remainingButtons & 4) {
			/* If middle click was not used for anything */
			(0, _canvas_renderer.moveCameraBy)((mouse.mouseDownWorldX - mouse.worldX) / 16, (mouse.mouseDownWorldY - mouse.worldY) / 16);
		}
	});

	var mousewheel = function mousewheel(event) {
		var nevt = (0, _normalizeWheel.normalizeWheel)(event);
		if (_local_player.player.tool !== null && misc.world !== null && _local_player.player.tool.isEventDefined('scroll')) {
			if (_local_player.player.tool.call('scroll', [mouse, nevt, event])) {
				return;
			}
		}
		if (event.ctrlKey) {
			_canvas_renderer.camera.zoom += Math.max(-1, Math.min(1, -nevt.pixelY));
			//-nevt.spinY * camera.zoom / options.zoomLimitMax; // <- needs to be nicer
		} else {
			var delta = Math.max(-1, Math.min(1, nevt.spinY));
			var pIndex = _local_player.player.paletteIndex;
			if (delta > 0) {
				pIndex++;
			} else if (delta < 0) {
				pIndex--;
			}
			_local_player.player.paletteIndex = pIndex;
		}
	};

	var wheelEventName = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';

	viewport.addEventListener(wheelEventName, mousewheel, { passive: true });
	viewport.addEventListener(wheelEventName, function (e) {
		e.preventDefault();
		return false;
	}, { passive: false });

	// Touch support
	var touchEventNoUpdate = function touchEventNoUpdate(evtName) {
		return function (event) {
			var tool = _local_player.player.tool;
			mouse.buttons = 0;
			if (tool !== null && misc.world !== null) {
				_local_player.player.tool.call(evtName, [mouse, event]);
			}
		};
	};
	viewport.addEventListener("touchstart", function (event) {
		var moved = event.changedTouches[0];
		mouse.buttons = 1;
		if (moved) {
			updateMouse(event, 'touchstart', moved.pageX, moved.pageY);
			mouse.mouseDownWorldX = mouse.worldX;
			mouse.mouseDownWorldY = mouse.worldY;
		}
	}, { passive: true });
	viewport.addEventListener("touchmove", function (event) {
		var moved = event.changedTouches[0];
		if (moved) {
			updateMouse(event, 'touchmove', moved.pageX, moved.pageY);
		}
	}, { passive: true });
	viewport.addEventListener("touchend", touchEventNoUpdate('touchend'), { passive: true });
	viewport.addEventListener("touchcancel", touchEventNoUpdate('touchcancel'), { passive: true });

	// Some cool custom css
	console.log("%c" + " _ _ _         _   _    _____ ___    _____ _         _     \n" + "| | | |___ ___| |_| |  |     |  _|  |  _  |_|_ _ ___| |___ \n" + "| | | | . |  _| | . |  |  |  |  _|  |   __| |_'_| -_| |_ -|\n" + "|_____|___|_| |_|___|  |_____|_|    |__|  |_|_,_|___|_|___|", "font-size: 15px; font-weight: bold;");
	console.log("%cWelcome to the developer console!", "font-size: 20px; font-weight: bold; color: #F0F;");

	//windowSys.addWindow(new OWOPDropDown());
	(0, _all.resolveProtocols)();

	/* Calls other initialization functions */
	_global.eventSys.emit(_conf.EVENTS.init);

	updateXYDisplay(0, 0);

	var worldName = decodeURIComponent(window.location.pathname);
	if (worldName[0] === '/') {
		worldName = worldName.slice(1);
	}

	misc.urlWorldName = worldName;

	var serverGetter = function (serverList) {
		var defaults = [];
		var availableServers = [];
		for (var i = 0; i < serverList.length; i++) {
			if (serverList[i].default) {
				defaults.push(serverList[i]);
			} else {
				availableServers.push(serverList[i]);
			}
		}
		var index = 0;
		return function (next) {
			if (next) {
				defaults.pop();
				++index;
			}
			if (defaults.length) {
				var sv = defaults[0];
				availableServers.push(sv);
				return sv;
			}
			return availableServers[index % availableServers.length];
		};
	}(_conf.options.serverAddress);

	retryingConnect(serverGetter, misc.urlWorldName);

	elements.reconnectBtn.onclick = function () {
		return retryingConnect(serverGetter, misc.urlWorldName);
	};

	misc.tickInterval = setInterval(tick, 1000 / _conf.options.tickSpeed);
}

_global.eventSys.once(_conf.EVENTS.loaded, function () {
	return statusMsg(true, "Initializing...");
});
_global.eventSys.once(_conf.EVENTS.misc.logoMakeRoom, function () {
	statusMsg(false, null);
	logoMakeRoom();
});

_global.eventSys.once(_conf.EVENTS.loaded, init);
_global.eventSys.on(_conf.EVENTS.net.playerCount, updatePlayerCount);

_global.eventSys.on(_conf.EVENTS.net.chat, receiveMessage);
_global.eventSys.on(_conf.EVENTS.net.devChat, receiveDevMessage);

_global.eventSys.on(_conf.EVENTS.net.world.setId, function (id) {
	if (!misc.storageEnabled) {
		return;
	}

	function autoNick() {
		if (localStorage.nick) {
			_networking.net.protocol.sendMessage("/nick " + localStorage.nick);
		}
	}

	// Automatic login
	var desiredRank = localStorage.adminlogin ? _conf.RANK.ADMIN : localStorage.modlogin ? _conf.RANK.MODERATOR : _networking.net.protocol.worldName in misc.worldPasswords ? _conf.RANK.USER : _conf.RANK.NONE;
	if (desiredRank > _conf.RANK.NONE) {
		var onWrong = function onWrong() {
			console.log("WRONG");
			_global.eventSys.removeListener(_conf.EVENTS.net.sec.rank, onCorrect);
			if (desiredRank == _conf.RANK.ADMIN) {
				delete localStorage.adminlogin;
			} else if (desiredRank == _conf.RANK.MODERATOR) {
				delete localStorage.modlogin;
			} else if (desiredRank == _conf.RANK.USER) {
				delete misc.worldPasswords[_networking.net.protocol.worldName];
				saveWorldPasswords();
			}
			retryingConnect(function () {
				return _networking.net.currentServer;
			}, _networking.net.protocol.worldName);
		};
		var onCorrect = function onCorrect(newrank) {
			if (newrank == desiredRank) {
				setTimeout(function () {
					/* Ugly fix for wrong password on worlds without one */
					_global.eventSys.removeListener(_conf.EVENTS.net.disconnected, onWrong);
				}, 1000);
				_global.eventSys.removeListener(_conf.EVENTS.net.sec.rank, onCorrect);
				autoNick();
			}
		};
		_global.eventSys.once(_conf.EVENTS.net.disconnected, onWrong);
		_global.eventSys.on(_conf.EVENTS.net.sec.rank, onCorrect);
		var msg;
		if (desiredRank == _conf.RANK.ADMIN) {
			msg = "/adminlogin " + localStorage.adminlogin;
		} else if (desiredRank == _conf.RANK.MODERATOR) {
			msg = "/modlogin " + localStorage.modlogin;
		} else if (desiredRank == _conf.RANK.USER) {
			msg = "/pass " + misc.worldPasswords[_networking.net.protocol.worldName];
		}
		_networking.net.protocol.sendMessage(msg);
	} else {
		autoNick();
	}
});

_global.eventSys.on(_conf.EVENTS.misc.windowAdded, function (window) {
	if (misc.world === null) {
		statusMsg(false, null);
		logoMakeRoom(true);
	}
});

_global.eventSys.on(_conf.EVENTS.net.world.joining, function (name) {
	logoMakeRoom(false);
	console.log('Joining world: ' + name);
});

_global.eventSys.on(_conf.EVENTS.net.world.join, function (world) {
	showLoadScr(false, false);
	showWorldUI(true);
	sounds.play(sounds.launch);
	misc.world = new _World.World(world);
	_global.eventSys.emit(_conf.EVENTS.misc.worldInitialized);
});

_global.eventSys.on(_conf.EVENTS.net.connected, function () {
	clearChat();
});

_global.eventSys.on(_conf.EVENTS.camera.moved, function (camera) {
	var time = (0, _misc.getTime)();
	if (misc.world !== null && time - misc.lastCleanup > 1000) {
		misc.lastCleanup = time;
		_canvas_renderer.renderer.unloadFarClusters();
	}
	if (updateXYDisplay(mouse.tileX, mouse.tileY)) {
		(0, _local_player.updateClientFx)();
	}
});

_global.eventSys.on(_conf.EVENTS.camera.zoom, function (camera) {
	if (updateXYDisplay(mouse.tileX, mouse.tileY)) {
		(0, _local_player.updateClientFx)();
	}
});

window.addEventListener("error", function (e) {
	showDevChat(true);
	var errmsg = e && e.error ? e.error.message || e.error.stack : e.message || "Unknown error occurred";
	errmsg = (0, _misc.escapeHTML)(errmsg);
	errmsg = errmsg.split('\n');
	for (var i = 0; i < errmsg.length; i++) {
		/* Should be some kind of dissapearing notification instead */
		receiveDevMessage(errmsg[i]);
	}
	if (_local_player.player.rank !== _conf.RANK.ADMIN) {
		/* TODO */
		if (misc.exceptionTimeout) {
			clearTimeout(misc.exceptionTimeout);
		}
		misc.exceptionTimeout = setTimeout(function () {
			return showDevChat(false);
		}, 5000);
	}
});

window.addEventListener("load", function () {
	elements.loadScr = document.getElementById("load-scr");
	elements.loadUl = document.getElementById("load-ul");
	elements.loadOptions = document.getElementById("load-options");
	elements.reconnectBtn = document.getElementById("reconnect-btn");
	elements.spinner = document.getElementById("spinner");
	elements.statusMsg = document.getElementById("status-msg");
	elements.status = document.getElementById("status");
	elements.logo = document.getElementById("logo");

	elements.xyDisplay = document.getElementById("xy-display");
	elements.devChat = document.getElementById("dev-chat");
	elements.chat = document.getElementById("chat");
	elements.devChatMessages = document.getElementById("dev-chat-messages");
	elements.chatMessages = document.getElementById("chat-messages");
	elements.playerCountDisplay = document.getElementById("playercount-display");

	elements.palette = document.getElementById("palette");
	elements.paletteColors = document.getElementById("palette-colors");
	elements.paletteCreate = document.getElementById("palette-create");
	elements.paletteInput = document.getElementById("palette-input");

	elements.animCanvas = document.getElementById("animations");

	elements.viewport = document.getElementById("viewport");
	elements.windows = document.getElementById("windows");

	elements.chatInput = document.getElementById("chat-input");

	document.getElementById("help-button").addEventListener("click", function () {
		document.getElementById("help").className = "";
	});
	document.getElementById("help-close").addEventListener("click", function () {
		document.getElementById("help").className = "hidden";
	});

	checkFunctionality(function () {
		return _global.eventSys.emit(_conf.EVENTS.loaded);
	});
});

/* Public API definitions */
_global.PublicAPI.emit = _global.eventSys.emit.bind(_global.eventSys);
_global.PublicAPI.on = _global.eventSys.on.bind(_global.eventSys);
_global.PublicAPI.once = _global.eventSys.once.bind(_global.eventSys);
_global.PublicAPI.removeListener = _global.eventSys.removeListener.bind(_global.eventSys);
_global.PublicAPI.elements = elements;
_global.PublicAPI.mouse = mouse;
_global.PublicAPI.world = getNewWorldApi();
_global.PublicAPI.chat = {
	send: function send(msg) {
		return _networking.net.protocol && _networking.net.protocol.sendMessage(msg);
	},
	clear: clearChat,
	local: receiveMessage,
	get recvModifier() {
		return misc.chatRecvModifier;
	},
	set recvModifier(fn) {
		misc.chatRecvModifier = fn;
	},
	get sendModifier() {
		return misc.chatSendModifier;
	},
	set sendModifier(fn) {
		misc.chatSendModifier = fn;
	}
};
_global.PublicAPI.sounds = sounds;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var colorUtils = exports.colorUtils = {
	to888: function to888(R, G, B) {
		return [R * 527 + 23 >> 6, G * 259 + 33 >> 6, B * 527 + 23 >> 6];
	},
	to565: function to565(R, G, B) {
		return [R * 249 + 1014 >> 11, G * 253 + 505 >> 10, B * 249 + 1014 >> 11];
	},
	u16_565: function u16_565(R, G, B) {
		return B << 11 | G << 5 | R;
	},
	u24_888: function u24_888(R, G, B) {
		return B << 16 | G << 8 | R;
	},
	u32_888: function u32_888(R, G, B) {
		return colorUtils.u24_888(R, G, B) | 0xFF000000;
	},
	u16_565_to_888: function u16_565_to_888(color) {
		var R = (color & 31) * 527 + 23 >> 6;
		var G = (color >> 5 & 31) * 527 + 23 >> 6;
		var B = (color >> 11 & 31) * 527 + 23 >> 6;
		return B << 16 | G << 8 | R;
	},
	arrFrom565: function arrFrom565(color) {
		return [color & 31, color >> 5 & 63, color >> 11 & 31];
	},
	/* Takes an integer, and gives an html compatible color */
	toHTML: function toHTML(color) {
		color = (color >> 16 & 0xFF | color & 0xFF00 | color << 16 & 0xFF0000).toString(16);
		return '#' + ('000000' + color).substring(color.length);
	}
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderer = exports.camera = exports.isVisible = exports.moveCameraTo = exports.moveCameraBy = exports.centerCameraTo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.drawText = drawText;
exports.unloadFarClusters = unloadFarClusters;

var _conf = __webpack_require__(1);

var _global = __webpack_require__(0);

var _main = __webpack_require__(3);

var _local_player = __webpack_require__(6);

var _Fx = __webpack_require__(7);

var _misc = __webpack_require__(2);

var _color = __webpack_require__(4);

var _Lerp = __webpack_require__(14);

var _tools = __webpack_require__(10);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.centerCameraTo = centerCameraTo;
exports.moveCameraBy = moveCameraBy;
exports.moveCameraTo = moveCameraTo;
exports.isVisible = isVisible;

/* oh boy, i'm going to get shit for making this private, aren't i?  */

var cameraValues = {
	x: 0,
	y: 0,
	zoom: -1 /*,
          lerpZoom: new Lerp(options.defaultZoom, options.defaultZoom, 200)*/
};

var camera = exports.camera = {
	get x() {
		return cameraValues.x;
	},
	get y() {
		return cameraValues.y;
	},
	get zoom() {
		return cameraValues.zoom;
	},
	/*get lerpZoom() { return cameraValues.lerpZoom.val; },*/
	set zoom(z) {
		z = Math.min(_conf.options.zoomLimitMax, Math.max(_conf.options.zoomLimitMin, z));
		if (z !== cameraValues.zoom) {
			var center = getCenterPixel();
			cameraValues.zoom = z;
			centerCameraTo(center[0], center[1]);
			_global.eventSys.emit(_conf.EVENTS.camera.zoom, z);
		}
	},
	isVisible: isVisible
};

var rendererValues = {
	updateRequired: 3,
	animContext: null,
	gridShown: true,
	gridPattern: null, /* Rendered each time the zoom changes */
	unloadedPattern: null,
	worldBackground: null,
	minGridZoom: _conf.options.minGridZoom,
	updatedClusters: [], /* Clusters to render in the next frame */
	clusters: {},
	visibleClusters: [],
	currentFontSize: -1
};

/*PublicAPI.rval = rendererValues;*/

var renderer = exports.renderer = {
	rendertype: {
		ALL: 3,
		FX: 1,
		WORLD: 2
	},
	patterns: {
		get unloaded() {
			return rendererValues.unloadedPattern;
		}
	},
	render: requestRender,
	showGrid: setGridVisibility,
	get gridShown() {
		return rendererValues.gridShown;
	},
	updateCamera: onCameraMove,
	unloadFarClusters: unloadFarClusters
};

_global.PublicAPI.camera = camera;
_global.PublicAPI.renderer = renderer;

var BufView = function () {
	function BufView(u32data, x, y, w, h, realw) {
		_classCallCheck(this, BufView);

		this.data = u32data;
		if (_conf.options.chunkBugWorkaround) {
			this.changes = [];
		}
		this.offx = x;
		this.offy = y;
		this.realwidth = realw;
		this.width = w;
		this.height = h;
	}

	_createClass(BufView, [{
		key: 'get',
		value: function get(x, y) {
			return this.data[this.offx + x + (this.offy + y) * this.realwidth];
		}
	}, {
		key: 'set',
		value: function set(x, y, data) {
			this.data[this.offx + x + (this.offy + y) * this.realwidth] = data;
			if (_conf.options.chunkBugWorkaround) {
				this.changes.push([0, x, y, data]);
			}
		}
	}, {
		key: 'fill',
		value: function fill(data) {
			for (var i = 0; i < this.height; i++) {
				for (var j = 0; j < this.width; j++) {
					this.data[this.offx + j + (this.offy + i) * this.realwidth] = data;
				}
			}
			if (_conf.options.chunkBugWorkaround) {
				this.changes.push([1, 0, 0, data]);
			}
		}
	}, {
		key: 'fillFromBuf',
		value: function fillFromBuf(u32buf) {
			for (var i = 0; i < this.height; i++) {
				for (var j = 0; j < this.width; j++) {
					this.data[this.offx + j + (this.offy + i) * this.realwidth] = u32buf[j + i * this.width];
					if (_conf.options.chunkBugWorkaround) {
						/* Terrible */
						this.changes.push([0, j, i, u32buf[j + i * this.width]]);
					}
				}
			}
		}
	}]);

	return BufView;
}();

var ChunkCluster = function () {
	function ChunkCluster(x, y) {
		_classCallCheck(this, ChunkCluster);

		this.removed = false;
		this.toUpdate = false;
		this.shown = false; /* is in document? */
		this.x = x;
		this.y = y;
		this.canvas = document.createElement("canvas");
		this.canvas.width = _conf.protocol.chunkSize * _conf.protocol.clusterChunkAmount;
		this.canvas.height = _conf.protocol.chunkSize * _conf.protocol.clusterChunkAmount;
		this.ctx = this.canvas.getContext("2d");
		this.data = this.ctx.createImageData(this.canvas.width, this.canvas.height);
		this.u32data = new Uint32Array(this.data.data.buffer);
		this.chunks = [];
		if (_conf.options.chunkBugWorkaround) {
			this.currentColor = 0;
		}
	}

	_createClass(ChunkCluster, [{
		key: 'render',
		value: function render() {
			this.toUpdate = false;
			for (var i = this.chunks.length; i--;) {
				var c = this.chunks[i];
				if (c.needsRedraw) {
					c.needsRedraw = false;
					if (_conf.options.chunkBugWorkaround) {
						var arr = c.view.changes;
						var s = _conf.protocol.chunkSize;
						for (var j = 0; j < arr.length; j++) {
							var current = arr[j];
							if (this.currentColor !== current[3]) {
								this.currentColor = current[3];
								this.ctx.fillStyle = _color.colorUtils.toHTML(current[3]);
							}
							switch (current[0]) {
								case 0:
									this.ctx.fillRect(c.view.offx + current[1], c.view.offy + current[2], 1, 1);
									break;
								case 1:
									this.ctx.fillRect(c.view.offx, c.view.offy, s, s);
									break;
							}
						}
						c.view.changes = [];
					} else {
						this.ctx.putImageData(this.data, 0, 0, c.view.offx, c.view.offy, c.view.width, c.view.height);
					}
				}
			}
		}
	}, {
		key: 'remove',
		value: function remove() {
			this.removed = true;
			if (this.shown) {
				var visiblecl = rendererValues.visibleClusters;
				visiblecl.splice(visiblecl.indexOf(this), 1);
				this.shown = false;
			}
			this.canvas.width = 0;
			this.u32data = this.data = null;
			delete rendererValues.clusters[this.x + ',' + this.y];
			for (var i = 0; i < this.chunks.length; i++) {
				this.chunks[i].view = null;
				this.chunks[i].remove();
			}
			this.chunks = [];
		}
	}, {
		key: 'addChunk',
		value: function addChunk(chunk) {
			/* WARNING: Should absMod if not power of two */
			var x = chunk.x & _conf.protocol.clusterChunkAmount - 1;
			var y = chunk.y & _conf.protocol.clusterChunkAmount - 1;
			var s = _conf.protocol.chunkSize;
			var view = new BufView(this.u32data, x * s, y * s, s, s, _conf.protocol.clusterChunkAmount * s);
			if (chunk.tmpChunkBuf) {
				view.fillFromBuf(chunk.tmpChunkBuf);
				chunk.tmpChunkBuf = null;
			}
			chunk.view = view;
			this.chunks.push(chunk);
			chunk.needsRedraw = true;
		}
	}, {
		key: 'delChunk',
		value: function delChunk(chunk) {
			chunk.view = null;
			/* There is no real need to clearRect the chunk area */
			var i = this.chunks.indexOf(chunk);
			if (i !== -1) {
				this.chunks.splice(i, 1);
			}
			if (!this.chunks.length) {
				this.remove();
			}
		}
	}]);

	return ChunkCluster;
}();

/* Draws white text with a black border */


function drawText(ctx, str, x, y, centered) {
	ctx.strokeStyle = "#000000", ctx.fillStyle = "#FFFFFF", ctx.lineWidth = 2.5, ctx.globalAlpha = 0.5;
	if (centered) {
		x -= ctx.measureText(str).width >> 1;
	}
	ctx.strokeText(str, x, y);
	ctx.globalAlpha = 1;
	ctx.fillText(str, x, y);
}

function isVisible(x, y, w, h) {
	var cx = camera.x;
	var cy = camera.y;
	var czoom = camera.zoom;
	var cw = window.innerWidth;
	var ch = window.innerHeight;
	return x + w > cx && y + h > cy && x <= cx + cw / czoom && y <= cy + ch / czoom;
}

function unloadFarClusters() {
	/* Slow? */
	var camx = camera.x;
	var camy = camera.y;
	var zoom = camera.zoom;
	var camw = window.innerWidth / zoom | 0;
	var camh = window.innerHeight / zoom | 0;
	var ctrx = camx + camw / 2;
	var ctry = camy + camh / 2;
	var s = _conf.protocol.clusterChunkAmount * _conf.protocol.chunkSize;
	for (var c in rendererValues.clusters) {
		c = rendererValues.clusters[c];
		if (!isVisible(c.x * s, c.y * s, s, s)) {
			var dx = Math.abs(ctrx / s - c.x) | 0;
			var dy = Math.abs(ctry / s - c.y) | 0;
			var dist = dx + dy; /* no sqrt please */
			//console.log(dist);
			if (dist > _conf.options.unloadDistance) {
				c.remove();
			}
		}
	}
}

function render(type) {
	var time = (0, _misc.getTime)(true);
	var camx = camera.x;
	var camy = camera.y;
	var zoom = camera.zoom;
	var needsRender = 0; /* If an animation didn't finish, render again */

	if (type & renderer.rendertype.WORLD) {
		var uClusters = rendererValues.updatedClusters;
		for (var i = 0; i < uClusters.length; i++) {
			var c = uClusters[i];
			c.render();
		}
		rendererValues.updatedClusters = [];
	}

	if (type & renderer.rendertype.FX && _main.misc.world !== null) {
		var ctx = rendererValues.animContext;
		var visible = rendererValues.visibleClusters;
		var clusterCanvasSize = _conf.protocol.chunkSize * _conf.protocol.clusterChunkAmount;
		var cwidth = window.innerWidth;
		var cheight = window.innerHeight;
		var background = rendererValues.worldBackground;
		var allChunksLoaded = _main.misc.world.allChunksLoaded();

		if (!allChunksLoaded) {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		}

		ctx.lineWidth = 2.5 / 16 * zoom;

		ctx.scale(zoom, zoom);

		for (var i = 0; i < visible.length; i++) {
			var cluster = visible[i];
			var gx = -(camx - cluster.x * clusterCanvasSize);
			var gy = -(camy - cluster.y * clusterCanvasSize);
			var clipx = gx < 0 ? -gx : 0;
			var clipy = gy < 0 ? -gy : 0;
			var x = gx < 0 ? 0 : gx;
			var y = gy < 0 ? 0 : gy;
			var clipw = clusterCanvasSize - clipx;
			var cliph = clusterCanvasSize - clipy;
			clipw = clipw + x < cwidth / zoom ? clipw : cwidth / zoom - x;
			cliph = cliph + y < cheight / zoom ? cliph : cheight / zoom - y;
			clipw = clipw + 1 | 0; /* Math.ceil */
			cliph = cliph + 1 | 0;
			if (clipw > 0 && cliph > 0) {
				ctx.drawImage(cluster.canvas, clipx, clipy, clipw, cliph, x, y, clipw, cliph);
			}
		}

		ctx.scale(1 / zoom, 1 / zoom); /* probably faster than ctx.save(), ctx.restore() */

		if (background != null) {
			var newscale = zoom / _conf.options.defaultZoom;
			var oldscale = _conf.options.defaultZoom / zoom;
			var gx = -(camx * zoom) % (background.width * newscale);
			var gy = -(camy * zoom) % (background.height * newscale);
			ctx.translate(gx, gy);

			ctx.fillStyle = background;
			ctx.globalCompositeOperation = "destination-over";

			ctx.scale(newscale, newscale);
			ctx.fillRect(-gx / newscale, -gy / newscale, ctx.canvas.width * oldscale, ctx.canvas.height * oldscale);
			ctx.scale(oldscale, oldscale);

			ctx.translate(-gx, -gy);
		}

		var gx = -(camx * zoom) % (16 * zoom);
		var gy = -(camy * zoom) % (16 * zoom);
		ctx.translate(gx, gy);

		if (rendererValues.gridShown && rendererValues.gridPattern) {
			ctx.fillStyle = rendererValues.gridPattern;
			if (!allChunksLoaded) {
				ctx.globalCompositeOperation = "source-atop";
			}
			ctx.fillRect(-gx, -gy, ctx.canvas.width, ctx.canvas.height);
		}

		if (rendererValues.unloadedPattern != null && (!allChunksLoaded || background != null)) {
			ctx.fillStyle = rendererValues.unloadedPattern;
			ctx.globalCompositeOperation = "destination-over";
			ctx.fillRect(-gx, -gy, ctx.canvas.width, ctx.canvas.height);
		}

		ctx.translate(-gx, -gy);

		ctx.globalCompositeOperation = "source-over";

		for (var i = 0; i < _Fx.activeFx.length; i++) {
			switch (_Fx.activeFx[i].render(ctx, time)) {
				case 0:
					/* Anim not finished */
					needsRender |= renderer.rendertype.FX;
					break;
				case 2:
					/* Obj deleted from array, prevent flickering */
					--i;
					break;
			}
		}
		ctx.globalAlpha = 1;
		var players = _main.misc.world.players;
		var fontsize = 10 / 16 * zoom | 0;
		if (rendererValues.currentFontSize != fontsize) {
			ctx.font = fontsize + "px sans-serif";
			rendererValues.currentFontSize = fontsize;
		}
		for (var p in players) {
			var player = players[p];
			if (!renderPlayer(player, fontsize)) {
				needsRender |= renderer.rendertype.FX;
			}
		}
	}

	requestRender(needsRender);
}

function renderPlayer(targetPlayer, fontsize) {
	var camx = camera.x * 16;
	var camy = camera.y * 16;
	var zoom = camera.zoom;
	var ctx = rendererValues.animContext;
	var cnvs = ctx.canvas;
	var tool = targetPlayer.tool;
	if (!tool) {
		/* Render the default tool if the selected one isn't defined */
		tool = _tools.tools['cursor'];
	}
	var toolwidth = tool.cursor.width / 16 * zoom;
	var toolheight = tool.cursor.height / 16 * zoom;

	var x = targetPlayer.x;
	var y = targetPlayer.y;
	var cx = (x - camx - tool.offset[0]) * (zoom / 16) | 0;
	var cy = (y - camy - tool.offset[1]) * (zoom / 16) | 0;

	if (cx < -toolwidth || cy < -toolheight || cx > cnvs.width || cy > cnvs.height) {
		return true;
	}

	if (fontsize > 3) {
		var idstr = targetPlayer.id;
		var textw = ctx.measureText(idstr).width + zoom / 2;

		ctx.globalAlpha = 1;
		ctx.fillStyle = targetPlayer.clr;
		ctx.fillRect(cx, cy + toolheight, textw, zoom);
		ctx.globalAlpha = 0.2;
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#000000";
		ctx.strokeRect(cx, cy + toolheight, textw, zoom);
		ctx.globalAlpha = 1;
		drawText(ctx, idstr, cx + zoom / 4, cy + fontsize + toolheight + zoom / 8);
	}

	ctx.drawImage(tool.cursor, cx, cy, toolwidth, toolheight);

	return x === targetPlayer.endX && y === targetPlayer.endY;
}

function requestRender(type) {
	rendererValues.updateRequired |= type;
}

function setGridVisibility(enabled) {
	rendererValues.gridShown = enabled;
	requestRender(renderer.rendertype.FX);
}

function renderGrid(zoom) {
	var tmpcanvas = document.createElement("canvas");
	var ctx = tmpcanvas.getContext("2d");
	var size = tmpcanvas.width = tmpcanvas.height = Math.round(16 * zoom);
	ctx.setLineDash([1]);
	ctx.globalAlpha = 0.2;
	if (zoom >= 4) {
		var fadeMult = Math.min(1, zoom - 4);
		if (fadeMult < 1) {
			ctx.globalAlpha = 0.2 * fadeMult;
		}
		ctx.beginPath();
		for (var i = 16; --i;) {
			ctx.moveTo(i * zoom + .5, 0);
			ctx.lineTo(i * zoom + .5, size);
			ctx.moveTo(0, i * zoom + .5);
			ctx.lineTo(size, i * zoom + .5);
		}
		ctx.stroke();
		ctx.globalAlpha = Math.max(0.2, 1 * fadeMult);
	}
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, size);
	ctx.lineTo(size, size);
	ctx.stroke();
	return ctx.createPattern(tmpcanvas, "repeat");
}

function setGridZoom(zoom) {
	if (zoom >= rendererValues.minGridZoom) {
		rendererValues.gridPattern = renderGrid(zoom);
	} else {
		rendererValues.gridPattern = null;
	}
}

function updateVisible() {
	var clusters = rendererValues.clusters;
	var visiblecl = rendererValues.visibleClusters;
	for (var c in clusters) {
		c = clusters[c];
		var size = _conf.protocol.chunkSize * _conf.protocol.clusterChunkAmount;
		var visible = isVisible(c.x * size, c.y * size, size, size);
		if (!visible && c.shown) {
			c.shown = false;
			visiblecl.splice(visiblecl.indexOf(c), 1);
		} else if (visible && !c.shown) {
			c.shown = true;
			visiblecl.push(c);
			requestRender(renderer.rendertype.WORLD);
		}
	}
};

function onResize() {
	_main.elements.animCanvas.width = window.innerWidth;
	_main.elements.animCanvas.height = window.innerHeight;
	var ctx = rendererValues.animContext;
	ctx.imageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.oImageSmoothingEnabled = false;
	rendererValues.currentFontSize = -1;
	onCameraMove();
}

function alignCamera() {
	var zoom = cameraValues.zoom;
	var alignedX = Math.round(cameraValues.x * zoom) / zoom;
	var alignedY = Math.round(cameraValues.y * zoom) / zoom;
	cameraValues.x = alignedX;
	cameraValues.y = alignedY;
}

function requestMissingChunks() {
	/* TODO: move this to World */
	var x = camera.x / _conf.protocol.chunkSize - 2 | 0;
	var mx = camera.x / _conf.protocol.chunkSize + window.innerWidth / camera.zoom / _conf.protocol.chunkSize | 0;
	var cy = camera.y / _conf.protocol.chunkSize - 2 | 0;
	var my = camera.y / _conf.protocol.chunkSize + window.innerHeight / camera.zoom / _conf.protocol.chunkSize | 0;
	while (++x <= mx) {
		var y = cy;
		while (++y <= my) {
			_main.misc.world.loadChunk(x, y);
		}
	}
}

function onCameraMove() {
	_global.eventSys.emit(_conf.EVENTS.camera.moved, camera);
	alignCamera();
	updateVisible();
	if (_main.misc.world !== null) {
		requestMissingChunks();
	}
	requestRender(renderer.rendertype.FX);
}

function getCenterPixel() {
	var x = Math.round(cameraValues.x + window.innerWidth / camera.zoom / 2);
	var y = Math.round(cameraValues.y + window.innerHeight / camera.zoom / 2);
	return [x, y];
}

function centerCameraTo(x, y) {
	cameraValues.x = -(window.innerWidth / camera.zoom / 2) + x;
	cameraValues.y = -(window.innerHeight / camera.zoom / 2) + y;
	onCameraMove();
}

function moveCameraBy(x, y) {
	cameraValues.x += x;
	cameraValues.y += y;
	onCameraMove();
}

function moveCameraTo(x, y) {
	cameraValues.x = x;
	cameraValues.y = y;
	onCameraMove();
}

_global.eventSys.on(_conf.EVENTS.net.world.teleported, function (x, y) {
	centerCameraTo(x, y);
});

_global.eventSys.on(_conf.EVENTS.camera.zoom, function (z) {
	setGridZoom(z);
	/*cameraValues.lerpZoom.val = z;*/
	requestRender(renderer.rendertype.FX);
});

_global.eventSys.on(_conf.EVENTS.renderer.addChunk, function (chunk) {
	var clusterX = Math.floor(chunk.x / _conf.protocol.clusterChunkAmount);
	var clusterY = Math.floor(chunk.y / _conf.protocol.clusterChunkAmount);
	var key = clusterX + ',' + clusterY;
	var clusters = rendererValues.clusters;
	var cluster = clusters[key];
	if (!cluster) {
		cluster = clusters[key] = new ChunkCluster(clusterX, clusterY);
		updateVisible();
	}
	cluster.addChunk(chunk);
	if (!cluster.toUpdate) {
		cluster.toUpdate = true;
		rendererValues.updatedClusters.push(cluster);
	}
	var size = _conf.protocol.chunkSize;
	if (cluster.toUpdate || isVisible(chunk.x * size, chunk.y * size, size, size)) {
		requestRender(renderer.rendertype.WORLD | renderer.rendertype.FX);
	}
});

_global.eventSys.on(_conf.EVENTS.renderer.rmChunk, function (chunk) {
	var clusterX = Math.floor(chunk.x / _conf.protocol.clusterChunkAmount);
	var clusterY = Math.floor(chunk.y / _conf.protocol.clusterChunkAmount);
	var key = clusterX + ',' + clusterY;
	var clusters = rendererValues.clusters;
	var cluster = clusters[key];
	if (cluster) {
		cluster.delChunk(chunk);
		if (!cluster.removed && !cluster.toUpdate) {
			cluster.toUpdate = true;
			rendererValues.updatedClusters.push(cluster);
		}
	}
});

_global.eventSys.on(_conf.EVENTS.renderer.updateChunk, function (chunk) {
	var clusterX = Math.floor(chunk.x / _conf.protocol.clusterChunkAmount);
	var clusterY = Math.floor(chunk.y / _conf.protocol.clusterChunkAmount);
	var key = clusterX + ',' + clusterY;
	var cluster = rendererValues.clusters[key];
	if (cluster && !cluster.toUpdate) {
		cluster.toUpdate = true;
		rendererValues.updatedClusters.push(cluster);
	}
	var size = _conf.protocol.chunkSize;
	if (isVisible(chunk.x * size, chunk.y * size, size, size)) {
		requestRender(renderer.rendertype.WORLD | renderer.rendertype.FX);
	}
});

_global.eventSys.on(_conf.EVENTS.misc.worldInitialized, function () {
	requestMissingChunks();
});

_global.eventSys.once(_conf.EVENTS.init, function () {
	rendererValues.animContext = _main.elements.animCanvas.getContext("2d", { alpha: false });
	window.addEventListener("resize", onResize);
	onResize();
	camera.zoom = _conf.options.defaultZoom;
	centerCameraTo(0, 0);

	var mkPatternFromUrl = function mkPatternFromUrl(url, cb) {
		var patImg = new Image();
		patImg.onload = function () {
			var pat = rendererValues.animContext.createPattern(patImg, "repeat");
			pat.width = patImg.width;
			pat.height = patImg.height;
			cb(pat);
		};
		patImg.src = url;
	};

	/* Create the pattern images */
	mkPatternFromUrl(_conf.options.unloadedPatternUrl, function (pat) {
		rendererValues.unloadedPattern = pat;
	});

	if (_conf.options.backgroundUrl != null) {
		mkPatternFromUrl(_conf.options.backgroundUrl, function (pat) {
			rendererValues.worldBackground = pat;
		});
	}

	function frameLoop() {
		var type = void 0;
		if ((type = rendererValues.updateRequired) !== 0) {
			rendererValues.updateRequired = 0;
			render(type);
		}
		window.requestAnimationFrame(frameLoop);
	}
	_global.eventSys.once(_conf.EVENTS.misc.toolsInitialized, frameLoop);
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.player = exports.networkRankVerification = exports.undoHistory = exports.updateClientFx = undefined;
exports.shouldUpdate = shouldUpdate;
exports.getDefaultTool = getDefaultTool;

var _global = __webpack_require__(0);

var _conf = __webpack_require__(1);

var _misc = __webpack_require__(2);

var _main = __webpack_require__(3);

var _color = __webpack_require__(4);

var _canvas_renderer = __webpack_require__(5);

var _tool_renderer = __webpack_require__(13);

var _tools = __webpack_require__(10);

var _Fx = __webpack_require__(7);

var _networking = __webpack_require__(8);

var _Bucket = __webpack_require__(9);

exports.updateClientFx = updateClientFx;


var toolSelected = null;

// SWEETIE 16 palette
/*const palette = [
	[0x1A, 0x1C, 0x2C], [0x57, 0x29, 0x56], [0xB1, 0x41, 0x56], [0xEE, 0x7B, 0x58],
	[0xFF, 0xD0, 0x79], [0xA0, 0xF0, 0x72], [0x38, 0xB8, 0x6E], [0x27, 0x6E, 0x7B],
	[0x29, 0x36, 0x6F], [0x40, 0x5B, 0xD0], [0x4F, 0xA4, 0xF7], [0x86, 0xEC, 0xF8],
	[0xF4, 0xF4, 0xF4], [0x93, 0xB6, 0xC1], [0x55, 0x71, 0x85], [0x32, 0x40, 0x56]
];*/
// ENDESGA 16 palette
var palette = [[0xE4, 0xA6, 0x72], [0xB8, 0x6F, 0x50], [0x74, 0x3F, 0x39], [0x3F, 0x28, 0x32], [0x9E, 0x28, 0x35], [0xE5, 0x3B, 0x44], [0xFB, 0x92, 0x2B], [0xFF, 0xE7, 0x62], [0x63, 0xC6, 0x4D], [0x32, 0x73, 0x45], [0x19, 0x3D, 0x3F], [0x4F, 0x67, 0x81], [0xAF, 0xBF, 0xD2], [0xFF, 0xFF, 0xFF], [0x2C, 0xE8, 0xF4], [0x04, 0x84, 0xD1]];
var paletteIndex = 0;

var undoHistory = exports.undoHistory = [];

var clientFx = new _Fx.Fx(_Fx.PLAYERFX.NONE, {
	isLocalPlayer: true,
	player: {
		get tileX() {
			return _main.mouse.tileX;
		},
		get tileY() {
			return _main.mouse.tileY;
		},
		get x() {
			return _main.mouse.worldX;
		},
		get y() {
			return _main.mouse.worldY;
		},
		get htmlRgb() {
			return player.htmlRgb;
		},
		get tool() {
			return player.tool;
		}
	}
});

clientFx.setVisibleFunc(function () {
	return _main.mouse.insideViewport && _main.mouse.validTile;
});

// exported variables are always const it seems
var networkRankVerification = exports.networkRankVerification = [_conf.RANK.NONE];
var rank = _conf.RANK.NONE;
var somethingChanged = false;

var cachedHtmlRgb = [null, ""];

var player = exports.player = {
	get paletteIndex() {
		return paletteIndex;
	},
	set paletteIndex(i) {
		paletteIndex = (0, _misc.absMod)(i, palette.length);
		updatePalette();
	},
	get htmlRgb() {
		var selClr = player.selectedColor;
		if (cachedHtmlRgb[0] === selClr) {
			return cachedHtmlRgb[1];
		} else {
			var str = _color.colorUtils.toHTML(_color.colorUtils.u24_888(selClr[0], selClr[1], selClr[2]));
			cachedHtmlRgb[0] = selClr;
			cachedHtmlRgb[1] = str;
			return str;
		}
	},
	get selectedColor() {
		return palette[paletteIndex];
	},
	set selectedColor(c) {
		addPaletteColor(c);
	},
	get palette() {
		return palette;
	},
	get rank() {
		return rank;
	},
	get tool() {
		return toolSelected;
	},
	set tool(name) {
		selectTool(name);
	},
	/* TODO: Clear confusion between netid and tool id */
	get toolId() {
		return _networking.net.currentServer.proto.tools.id[toolSelected.id];
	},
	get tools() {
		return _tools.tools;
	}
};

_global.PublicAPI.player = player;

function shouldUpdate() {
	/* sets colorChanged to false when called */
	return somethingChanged ? !(somethingChanged = false) : somethingChanged;
}

function changedColor() {
	updateClientFx();
	updatePaletteIndex();
	somethingChanged = true;
}

function updatePalette() {
	var paletteColors = _main.elements.paletteColors;
	paletteColors.innerHTML = "";
	var colorClick = function colorClick(index) {
		return function () {
			paletteIndex = index;
			changedColor();
		};
	};
	var colorDelete = function colorDelete(index) {
		return function () {
			if (palette.length > 1) {
				palette.splice(index, 1);
				if (paletteIndex > index || paletteIndex === palette.length) {
					--paletteIndex;
				}
				updatePalette();
				changedColor();
			}
		};
	};

	for (var i = 0; i < palette.length; i++) {
		var element = document.createElement("div");
		var clr = palette[i];
		element.style.backgroundColor = "rgb(" + clr[0] + "," + clr[1] + "," + clr[2] + ")";
		(0, _misc.setTooltip)(element, _color.colorUtils.toHTML(_color.colorUtils.u24_888(clr[0], clr[1], clr[2])));
		element.onmouseup = function (e) {
			switch (e.button) {
				case 0:
					this.sel();
					break;
				case 2:
					this.del();
					break;
			}
			return false;
		}.bind({
			sel: colorClick(i),
			del: colorDelete(i)
		});
		element.oncontextmenu = function () {
			return false;
		};
		paletteColors.appendChild(element);
	}
	changedColor();
}

function updatePaletteIndex() {
	_main.elements.paletteColors.style.transform = "translateY(" + -paletteIndex * 40 + "px)";
}

function addPaletteColor(color) {
	for (var i = 0; i < palette.length; i++) {
		if (palette[i][0] === color[0] && palette[i][1] === color[1] && palette[i][2] === color[2]) {
			paletteIndex = i;
			changedColor();
			return;
		}
	}
	paletteIndex = palette.length;
	palette.push(color);
	updatePalette();
}

function getDefaultTool() {
	for (var toolName in _tools.tools) {
		if (_tools.tools[toolName].rankRequired <= player.rank) {
			return toolName;
		}
	}
	return null;
}

function selectTool(name) {
	var tool = _tools.tools[name];
	if (!tool || tool === toolSelected || tool.rankRequired > player.rank) {
		return false;
	}
	if (toolSelected) {
		toolSelected.call('deselect');
	}
	toolSelected = tool;
	_main.mouse.cancelMouseDown();
	tool.call('select');
	(0, _tools.updateToolWindow)(name);
	_main.mouse.validClick = false;
	clientFx.setRenderer(tool.fxRenderer);
	somethingChanged = true;
	updateClientFx();
	return true;
}

function updateClientFx() {
	_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
}

_global.eventSys.once(_conf.EVENTS.misc.toolsInitialized, function () {
	player.tool = getDefaultTool();
});

_global.eventSys.on(_conf.EVENTS.net.sec.rank, function (newRank) {
	if (networkRankVerification[0] < newRank) {
		return;
	}
	rank = newRank;
	console.log('Got rank:', newRank);
	/* This is why we can't have nice things */
	if (_networking.net.isConnected()) {
		_networking.net.protocol.ws.send(new Uint8Array([newRank]).buffer);
	}
	switch (newRank) {
		case _conf.RANK.USER:
		case _conf.RANK.NONE:
			(0, _main.showDevChat)(false);
			(0, _main.showPlayerList)(false);
			break;

		case _conf.RANK.MODERATOR:
		case _conf.RANK.ADMIN:
			(0, _main.showDevChat)(true);
			(0, _main.showPlayerList)(true);
			break;
	}
	(0, _tools.updateToolbar)();
});

_global.eventSys.once(_conf.EVENTS.init, function () {
	_main.elements.paletteInput.onclick = function () {
		var c = player.selectedColor;
		this.value = _color.colorUtils.toHTML(_color.colorUtils.u24_888(c[0], c[1], c[2]));;
	};
	_main.elements.paletteInput.onchange = function () {
		var value = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.value);
		addPaletteColor([parseInt(value[1], 16), parseInt(value[2], 16), parseInt(value[3], 16)]);
	};
	_main.elements.paletteCreate.onclick = function () {
		return _main.elements.paletteInput.click();
	};
	(0, _misc.setTooltip)(_main.elements.paletteCreate, "Add color");
	updatePalette();
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Fx = exports.activeFx = exports.WORLDFX = exports.PLAYERFX = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _color = __webpack_require__(4);

var _conf = __webpack_require__(1);

var _misc = __webpack_require__(2);

var _global = __webpack_require__(0);

var _canvas_renderer = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PLAYERFX = exports.PLAYERFX = {
	NONE: null,
	RECT_SELECT_ALIGNED: function RECT_SELECT_ALIGNED(pixelSize, htmlColor) {
		return function (fx, ctx, time) {
			var x = fx.extra.player.x;
			var y = fx.extra.player.y;
			var fxx = (Math.floor(x / (16 * pixelSize)) * pixelSize - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom;
			var fxy = (Math.floor(y / (16 * pixelSize)) * pixelSize - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom;
			ctx.globalAlpha = 0.8;
			ctx.strokeStyle = htmlColor || fx.extra.player.htmlRgb;
			ctx.strokeRect(fxx, fxy, _canvas_renderer.camera.zoom * pixelSize, _canvas_renderer.camera.zoom * pixelSize);
			return 1; /* Rendering finished (won't change on next frame) */
		};
	}
};

var WORLDFX = exports.WORLDFX = {
	NONE: null,
	RECT_FADE_ALIGNED: function RECT_FADE_ALIGNED(size, x, y) {
		var startTime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : (0, _misc.getTime)();
		return function (fx, ctx, time) {
			var alpha = 1 - (time - startTime) / 1000;
			if (alpha <= 0) {
				fx.delete();
				return 2; /* 2 = An FX object was deleted */
			}
			var fxx = (x * size - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom;
			var fxy = (y * size - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom;
			ctx.globalAlpha = alpha;
			ctx.strokeStyle = fx.extra.htmlRgb || "#000000";
			ctx.strokeRect(fxx, fxy, _canvas_renderer.camera.zoom * size, _canvas_renderer.camera.zoom * size);
			return 0; /* 0 = Animation not finished */
		};
	}
};

var activeFx = exports.activeFx = [];

/*PublicAPI.activeFx = activeFx;*/

var Fx = exports.Fx = function () {
	function Fx(renderFunc, extra) {
		_classCallCheck(this, Fx);

		this.visible = true;
		this.renderFunc = renderFunc;
		this.extra = extra || {};
		activeFx.push(this);
	}

	_createClass(Fx, [{
		key: 'render',
		value: function render(ctx, time) {
			if (this.renderFunc && this.visible) {
				return this.renderFunc(this, ctx, time);
			}
			return 1;
		}
	}, {
		key: 'setVisibleFunc',
		value: function setVisibleFunc(func) {
			Object.defineProperty(this, 'visible', {
				get: func
			});
		}
	}, {
		key: 'setVisible',
		value: function setVisible(bool) {
			this.visible = bool;
		}
	}, {
		key: 'setRenderer',
		value: function setRenderer(func) {
			this.renderFunc = func;
		}
	}, {
		key: 'update',
		value: function update(extra) {
			this.extra = extra;
		}
	}, {
		key: 'delete',
		value: function _delete() {
			var i = activeFx.indexOf(this);
			if (i !== -1) {
				activeFx.splice(i, 1);
			}
		}
	}]);

	return Fx;
}();

_global.PublicAPI.fx = {
	world: WORLDFX,
	player: PLAYERFX,
	class: Fx
};

_global.eventSys.on(_conf.EVENTS.net.world.tilesUpdated, function (tiles) {
	var time = (0, _misc.getTime)(true);
	var made = false;
	for (var i = 0; i < tiles.length; i++) {
		var t = tiles[i];
		if (_canvas_renderer.camera.isVisible(t.x, t.y, 1, 1)) {
			new Fx(WORLDFX.RECT_FADE_ALIGNED(1, t.x, t.y), { htmlRgb: _color.colorUtils.toHTML(t.rgb ^ 0xFFFFFF) });
			made = true;
		}
	}
	if (made) {
		_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
	}
});

_global.eventSys.on(_conf.EVENTS.net.chunk.set, function (chunkX, chunkY, data) {
	var wX = chunkX * _conf.protocol.chunkSize;
	var wY = chunkY * _conf.protocol.chunkSize;
	if (_canvas_renderer.camera.isVisible(wX, wY, _conf.protocol.chunkSize, _conf.protocol.chunkSize)) {
		new Fx(WORLDFX.RECT_FADE_ALIGNED(16, chunkX, chunkY));
		_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
	}
});

_global.eventSys.on(_conf.EVENTS.net.chunk.lock, function (chunkX, chunkY, state, local) {
	var wX = chunkX * _conf.protocol.chunkSize;
	var wY = chunkY * _conf.protocol.chunkSize;
	if (!local && _canvas_renderer.camera.isVisible(wX, wY, _conf.protocol.chunkSize, _conf.protocol.chunkSize)) {
		new Fx(WORLDFX.RECT_FADE_ALIGNED(16, chunkX, chunkY), {
			htmlRgb: state ? "#00FF00" : "#FF0000"
		});
		_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
	}
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.net = undefined;

var _conf = __webpack_require__(1);

var _global = __webpack_require__(0);

var net = exports.net = {
	currentServer: null,
	protocol: null,
	isConnected: isConnected,
	connect: connect
};

_global.PublicAPI.net = net;

function isConnected() {
	return net.protocol !== null && net.protocol.isConnected();
}

function connect(server, worldName) {
	_global.eventSys.emit(_conf.EVENTS.net.connecting, server);
	net.connection = new WebSocket(server.url);
	net.connection.binaryType = "arraybuffer";
	net.currentServer = server;
	net.protocol = new server.proto.class(net.connection, worldName);
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bucket = exports.Bucket = function () {
	function Bucket(rate, time) {
		_classCallCheck(this, Bucket);

		this.lastCheck = Date.now();
		this.allowance = rate;
		this.rate = rate;
		this.time = time;
		this.infinite = false;
	}

	_createClass(Bucket, [{
		key: 'canSpend',
		value: function canSpend(count) {
			if (this.infinite) {
				return true;
			}

			this.allowance += (Date.now() - this.lastCheck) / 1000 * (this.rate / this.time);
			this.lastCheck = Date.now();
			if (this.allowance > this.rate) {
				this.allowance = this.rate;
			}
			if (this.allowance < count) {
				return false;
			}
			this.allowance -= count;
			return true;
		}
	}]);

	return Bucket;
}();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.toolsWindow = exports.tools = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.updateToolWindow = updateToolWindow;
exports.updateToolbar = updateToolbar;
exports.showToolsWindow = showToolsWindow;
exports.addTool = addTool;

var _global = __webpack_require__(0);

var _conf = __webpack_require__(1);

var _misc = __webpack_require__(2);

var _tool_renderer = __webpack_require__(13);

var _networking = __webpack_require__(8);

var _local_player = __webpack_require__(6);

var _canvas_renderer = __webpack_require__(5);

var _windowsys = __webpack_require__(11);

var _main = __webpack_require__(3);

var _Fx = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tools = exports.tools = {};
var toolsWindow = exports.toolsWindow = null;
var windowShown = false;

function updateToolWindow(name) {
	if (!toolsWindow) {
		return;
	}
	var tool = tools[name];
	var children = toolsWindow.container.children;
	for (var i = 0; i < children.length; i++) {
		var button = children[i];
		var isSelected = button.id.split('-')[1] === name;
		button.className = isSelected ? 'selected' : '';
		button.children[0].style.backgroundImage = "url(" + (isSelected ? _tool_renderer.cursors.slotset : _tool_renderer.cursors.set.src) + ")";
	}
	_main.elements.viewport.style.cursor = "url(" + tool.cursorblob + ") " + tool.offset[0] + " " + tool.offset[1] + ", pointer";
}

function updateToolbar() {
	var win = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : toolsWindow;

	if (!win) {
		return;
	}

	var container = win.container;
	var toolButtonClick = function toolButtonClick(name) {
		return function (event) {
			_local_player.player.tool = name;
			_main.sounds.play(_main.sounds.click);
		};
	};

	container.innerHTML = "";

	// Add tools to the tool-select menu
	for (var name in tools) {
		var tool = tools[name];
		if (_local_player.player.rank >= tool.rankRequired) {
			var element = document.createElement("button");
			var mask = document.createElement("div");
			(0, _misc.setTooltip)(element, tool.name + " tool");
			element.id = "tool-" + name;
			element.addEventListener("click", toolButtonClick(name));
			if (tool === _local_player.player.tool) {
				mask.style.backgroundImage = "url(" + _tool_renderer.cursors.slotset + ")";
				element.className = "selected";
			} else {
				mask.style.backgroundImage = "url(" + _tool_renderer.cursors.set.src + ")";
			}
			mask.style.backgroundPosition = tool.setposition;
			element.appendChild(mask);
			container.appendChild(element);
		}
	}
}

function showToolsWindow(bool) {
	if (windowShown !== bool) {
		if (bool && toolsWindow) {
			_windowsys.windowSys.addWindow(toolsWindow);
		} else if (toolsWindow) {
			_windowsys.windowSys.delWindow(toolsWindow);
		}
		windowShown = bool;
	}
}

function addTool(tool) {
	tool.id = tool.name.toLowerCase();
	tools[tool.id] = tool;
	updateToolbar();
}

var Tool = function () {
	function Tool(name, cursor, fxRenderer, rankNeeded, onInit) {
		_classCallCheck(this, Tool);

		this.name = name;
		this.id = null;
		this.fxRenderer = fxRenderer;
		this.cursorblob = cursor.img.shadowblob;
		this.cursor = cursor.img.shadowed;
		this.setposition = -cursor.imgpos[0] * 36 + "px " + -cursor.imgpos[1] * 36 + "px";
		this.offset = cursor.hotspot;
		this.rankRequired = rankNeeded;
		this.extra = {}; /* Extra storage for tools */
		this.events = {
			mouseup: null,
			mousedown: null,
			mousemove: null,
			touchstart: null,
			touchmove: null,
			touchend: null,
			touchcancel: null,
			select: null,
			deselect: null,
			keydown: null,
			keyup: null,
			scroll: null,
			tick: null
		};
		onInit(this);
	}

	/* Doesn't update if tool already selected */


	_createClass(Tool, [{
		key: 'setFxRenderer',
		value: function setFxRenderer(func) {
			this.fxRenderer = func;
		}
	}, {
		key: 'isEventDefined',
		value: function isEventDefined(type) {
			return type in this.events;
		}
	}, {
		key: 'setEvent',
		value: function setEvent(type, func) {
			var events = type.split(' ');
			for (var i = 0; i < events.length; i++) {
				this.events[events[i]] = func || null;
			}
		}
	}, {
		key: 'call',
		value: function call(type, data) {
			var func = this.events[type];
			if (func) {
				return func.apply(this, data);
			} else if (type.indexOf("touch") === 0) {
				return this.defaultTouchHandler(type.slice(5), data);
			}
			return false;
		}
	}, {
		key: 'defaultTouchHandler',
		value: function defaultTouchHandler(type, data) {
			var mouse = data[0];
			var event = data[1]; /* hmm... */
			var handlers = {
				start: this.events.mousedown,
				move: this.events.mousemove,
				end: this.events.mouseup,
				cancel: this.events.mouseup
			};
			var handler = handlers[type];
			if (handler) {
				var touches = event.changedTouches;
				for (var i = 0; i < touches.length; i++) {
					mouse.x = touches[i].pageX;
					mouse.y = touches[i].pageY;
					handler.apply(this, data);
				}
			}
		}
	}]);

	return Tool;
}();

_global.PublicAPI.tool = {
	class: Tool,
	addToolObject: addTool,
	updateToolbar: updateToolbar,
	allTools: tools
};

_global.eventSys.once(_conf.EVENTS.misc.toolsRendered, function () {
	// Cursor tool
	addTool(new Tool('Cursor', _tool_renderer.cursors.cursor, _Fx.PLAYERFX.RECT_SELECT_ALIGNED(1), _conf.RANK.USER, function (tool) {
		var lastX, lastY;
		tool.setEvent('mousedown mousemove', function (mouse, event) {
			var usedButtons = 3; /* Left and right mouse buttons are always used... */
			/* White color if right clicking */
			var color = mouse.buttons === 2 ? [255, 255, 255] : _local_player.player.selectedColor;
			switch (mouse.buttons) {
				case 1:
				case 2:
					if (!lastX || !lastY) {
						lastX = mouse.tileX;
						lastY = mouse.tileY;
					}
					(0, _misc.line)(lastX, lastY, mouse.tileX, mouse.tileY, 1, function (x, y) {
						var pixel = _main.misc.world.getPixel(x, y);
						if (pixel !== null && !(color[0] === pixel[0] && color[1] === pixel[1] && color[2] === pixel[2])) {
							_main.misc.world.setPixel(x, y, color);
						}
					});
					lastX = mouse.tileX;
					lastY = mouse.tileY;
					break;
				case 4:
					if (event.ctrlKey) {
						usedButtons |= 4;
						var color = _main.misc.world.getPixel(mouse.tileX, mouse.tileY);
						if (color) {
							_local_player.player.selectedColor = color;
						}
					}
					break;
			}
			return usedButtons;
		});
		tool.setEvent('mouseup', function (mouse) {
			lastX = null;
			lastY = null;
		});
	}));

	// Move tool
	addTool(new Tool('Move', _tool_renderer.cursors.move, _Fx.PLAYERFX.NONE, _conf.RANK.NONE, function (tool) {
		function move(x, y, startX, startY) {
			(0, _canvas_renderer.moveCameraBy)((startX - x) / 16, (startY - y) / 16);
		}
		tool.setEvent('mousemove', function (mouse, event) {
			if (mouse.buttons !== 0) {
				move(mouse.worldX, mouse.worldY, mouse.mouseDownWorldX, mouse.mouseDownWorldY);
				return mouse.buttons;
			}
		});
		tool.setEvent('scroll', function (mouse, event, rawEvent) {
			if (!rawEvent.ctrlKey) {
				var dx = Math.max(-500, Math.min(event.spinX * 16, 500));
				var dy = Math.max(-500, Math.min(event.spinY * 16, 500));
				var pxAmount = _canvas_renderer.camera.zoom; //Math.max(camera.zoom, 2);
				(0, _canvas_renderer.moveCameraBy)(dx / pxAmount, dy / pxAmount);
				return true;
			}
		});
	}));

	// Pipette tool
	addTool(new Tool('Pipette', _tool_renderer.cursors.pipette, _Fx.PLAYERFX.NONE, _conf.RANK.NONE, function (tool) {
		tool.setEvent('mousedown mousemove', function (mouse, event) {
			if (mouse.buttons !== 0 && !(mouse.buttons & 4)) {
				var color = _main.misc.world.getPixel(mouse.tileX, mouse.tileY);
				if (color) {
					_local_player.player.selectedColor = color;
				}
				return mouse.buttons;
			}
		});
	}));

	// Erase/Fill tool
	addTool(new Tool('Eraser', _tool_renderer.cursors.erase, _Fx.PLAYERFX.RECT_SELECT_ALIGNED(16), _conf.RANK.ADMIN, function (tool) {
		function fillChunk(chunkX, chunkY, c) {
			var color = c[2] << 16 | c[1] << 8 | c[0];
			var chunk = _main.misc.world.getChunkAt(chunkX, chunkY);
			if (chunk) {
				var empty = true;
				firstLoop: for (var y = 0; y < _conf.protocol.chunkSize; y++) {
					for (var x = 0; x < _conf.protocol.chunkSize; x++) {
						if ((chunk.get(x, y) & 0xFFFFFF) != color) {
							empty = false;
							break firstLoop;
						}
					}
				}
				if (!empty) {
					chunk.set(color);
					_networking.net.protocol.setChunk(chunkX, chunkY, new Array(256).fill(color));
				}
			}
		}

		tool.setEvent('mousedown mousemove', function (mouse, event) {
			if (mouse.buttons & 1) {
				fillChunk(Math.floor(mouse.tileX / _conf.protocol.chunkSize), Math.floor(mouse.tileY / _conf.protocol.chunkSize), _local_player.player.selectedColor);
				return 1;
			} else if (mouse.buttons & 2) {
				fillChunk(Math.floor(mouse.tileX / _conf.protocol.chunkSize), Math.floor(mouse.tileY / _conf.protocol.chunkSize), [255, 255, 255]);
				return 1;
			}
		});
	}));

	// Zoom tool
	addTool(new Tool('Zoom', _tool_renderer.cursors.zoom, _Fx.PLAYERFX.NONE, _conf.RANK.NONE, function (tool) {
		function zoom(mouse, type) {
			var lzoom = _canvas_renderer.camera.zoom;
			var nzoom = _canvas_renderer.camera.zoom;
			var offX = 0;
			var offY = 0;
			var w = window.innerWidth;
			var h = window.innerHeight;
			if (type === 1) {
				// Zoom in
				nzoom *= 1 + _conf.options.zoomStrength;
				offX = (mouse.x - w / 2) / nzoom;
				offY = (mouse.y - h / 2) / nzoom;
			} else if (type === 2) {
				// Zoom out
				nzoom /= 1 + _conf.options.zoomStrength;
				offX = (mouse.x - w / 2) * (3 / lzoom - 2 / nzoom);
				offY = (mouse.y - h / 2) * (3 / lzoom - 2 / nzoom);
			} else if (type === 3) {
				// Reset zoom (right + left click)
				nzoom = _conf.options.defaultZoom;
			}
			nzoom = Math.round(nzoom);
			_canvas_renderer.camera.zoom = nzoom;
			if (_canvas_renderer.camera.zoom !== lzoom) {
				(0, _canvas_renderer.moveCameraBy)(offX, offY);
			}
		}

		tool.setEvent("mousedown", function (mouse, event) {
			zoom(mouse, mouse.buttons);
		});
		tool.setEvent("touchstart", function (mouse, event) {
			tool.extra.maxTouches = Math.max(tool.extra.maxTouches || 0, event.touches.length);
		});
		tool.setEvent("touchend", function (mouse, event) {
			if (event.touches.length === 0) {
				if (tool.extra.maxTouches > 1) {
					zoom(mouse, tool.extra.maxTouches);
				}
				tool.extra.maxTouches = 0;
			}
		});
	}));

	// Area to PNG tool
	addTool(new Tool('Export', _tool_renderer.cursors.select, _Fx.PLAYERFX.NONE, _conf.RANK.NONE, function (tool) {
		tool.setFxRenderer(function (fx, ctx, time) {
			if (!fx.extra.isLocalPlayer) return 1;
			var x = fx.extra.player.x;
			var y = fx.extra.player.y;
			var fxx = (Math.floor(x / 16) - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom;
			var fxy = (Math.floor(y / 16) - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom;
			var oldlinew = ctx.lineWidth;
			ctx.lineWidth = 1;
			if (tool.extra.end) {
				var s = tool.extra.start;
				var e = tool.extra.end;
				var x = (s[0] - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom + 0.5;
				var y = (s[1] - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom + 0.5;
				var w = e[0] - s[0];
				var h = e[1] - s[1];
				ctx.beginPath();
				ctx.rect(x, y, w * _canvas_renderer.camera.zoom, h * _canvas_renderer.camera.zoom);
				ctx.globalAlpha = 1;
				ctx.strokeStyle = "#FFFFFF";
				ctx.stroke();
				ctx.setLineDash([3, 4]);
				ctx.strokeStyle = "#000000";
				ctx.stroke();
				ctx.globalAlpha = 0.25 + Math.sin(time / 500) / 4;
				ctx.fillStyle = _canvas_renderer.renderer.patterns.unloaded;
				ctx.fill();
				ctx.setLineDash([]);
				var oldfont = ctx.font;
				ctx.font = "16px sans-serif";
				var txt = (!tool.extra.clicking ? "Right click to screenshot " : "") + '(' + Math.abs(w) + 'x' + Math.abs(h) + ')';
				var txtx = window.innerWidth >> 1;
				var txty = window.innerHeight >> 1;
				txtx = Math.max(x, Math.min(txtx, x + w * _canvas_renderer.camera.zoom));
				txty = Math.max(y, Math.min(txty, y + h * _canvas_renderer.camera.zoom));

				(0, _canvas_renderer.drawText)(ctx, txt, txtx, txty, true);
				ctx.font = oldfont;
				ctx.lineWidth = oldlinew;
				return 0;
			} else {
				ctx.beginPath();
				ctx.moveTo(0, fxy + 0.5);
				ctx.lineTo(window.innerWidth, fxy + 0.5);
				ctx.moveTo(fxx + 0.5, 0);
				ctx.lineTo(fxx + 0.5, window.innerHeight);

				//ctx.lineWidth = 1;
				ctx.globalAlpha = 1;
				ctx.strokeStyle = "#FFFFFF";
				ctx.stroke();
				ctx.setLineDash([3]);
				ctx.strokeStyle = "#000000";
				ctx.stroke();

				ctx.setLineDash([]);
				ctx.lineWidth = oldlinew;
				return 1;
			}
		});

		function dlarea(x, y, w, h, onblob) {
			var c = document.createElement('canvas');
			c.width = w;
			c.height = h;
			var ctx = c.getContext('2d');
			var d = ctx.createImageData(w, h);
			for (var i = y; i < y + h; i++) {
				for (var j = x; j < x + w; j++) {
					var pix = _main.misc.world.getPixel(j, i);
					if (!pix) continue;
					d.data[4 * ((i - y) * w + (j - x))] = pix[0];
					d.data[4 * ((i - y) * w + (j - x)) + 1] = pix[1];
					d.data[4 * ((i - y) * w + (j - x)) + 2] = pix[2];
					d.data[4 * ((i - y) * w + (j - x)) + 3] = 255;
				}
			}
			ctx.putImageData(d, 0, 0);
			c.toBlob(onblob);
		}

		tool.extra.start = null;
		tool.extra.end = null;
		tool.extra.clicking = false;

		tool.setEvent('mousedown', function (mouse, event) {
			var s = tool.extra.start;
			var e = tool.extra.end;
			var isInside = function isInside() {
				return mouse.tileX >= s[0] && mouse.tileX < e[0] && mouse.tileY >= s[1] && mouse.tileY < e[1];
			};
			if (mouse.buttons === 1 && !tool.extra.end) {
				tool.extra.start = [mouse.tileX, mouse.tileY];
				tool.extra.clicking = true;
				tool.setEvent('mousemove', function (mouse, event) {
					if (tool.extra.start && mouse.buttons === 1) {
						tool.extra.end = [mouse.tileX, mouse.tileY];
						return 1;
					}
				});
				var finish = function finish() {
					tool.setEvent('mousemove mouseup deselect', null);
					tool.extra.clicking = false;
					var s = tool.extra.start;
					var e = tool.extra.end;
					if (e) {
						if (s[0] === e[0] || s[1] === e[1]) {
							tool.extra.start = null;
							tool.extra.end = null;
						}
						if (s[0] > e[0]) {
							var tmp = e[0];
							e[0] = s[0];
							s[0] = tmp;
						}
						if (s[1] > e[1]) {
							var tmp = e[1];
							e[1] = s[1];
							s[1] = tmp;
						}
					}
					_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
				};
				tool.setEvent('deselect', finish);
				tool.setEvent('mouseup', function (mouse, event) {
					if (!(mouse.buttons & 1)) {
						finish();
					}
				});
			} else if (mouse.buttons === 1 && tool.extra.end) {
				if (isInside()) {
					var offx = mouse.tileX;
					var offy = mouse.tileY;
					tool.setEvent('mousemove', function (mouse, event) {
						var dx = mouse.tileX - offx;
						var dy = mouse.tileY - offy;
						tool.extra.start = [s[0] + dx, s[1] + dy];
						tool.extra.end = [e[0] + dx, e[1] + dy];
					});
					var end = function end() {
						tool.setEvent('mouseup deselect mousemove', null);
					};
					tool.setEvent('deselect', end);
					tool.setEvent('mouseup', function (mouse, event) {
						if (!(mouse.buttons & 1)) {
							end();
						}
					});
				} else {
					tool.extra.start = null;
					tool.extra.end = null;
				}
			} else if (mouse.buttons === 2 && tool.extra.end && isInside()) {
				tool.extra.start = null;
				tool.extra.end = null;
				var cvs = dlarea(s[0], s[1], e[0] - s[0], e[1] - s[1], function (b) {
					var url = URL.createObjectURL(b);
					var img = new Image();
					img.onload = function () {
						_windowsys.windowSys.addWindow(new _windowsys.GUIWindow("Resulting image", {
							centerOnce: true,
							closeable: true
						}, function (win) {
							var props = ['width', 'height'];
							if (img.width > img.height) {
								props.reverse();
							}
							var r = img[props[0]] / img[props[1]];
							var shownSize = img[props[1]] >= 128 ? 256 : 128;
							img[props[0]] = r * shownSize;
							img[props[1]] = shownSize;
							win.container.classList.add('centeredChilds');
							var image = win.addObj(img);
							(0, _misc.setTooltip)(img, "Right click to copy/save!");
							/*var okButton = win.addObj(mkHTML("button", {
       	innerHTML: "OK",
       	style: "display: block; width: 80px; height: 30px; margin: auto;",
       	onclick: function() {
       		img.remove();
       		URL.revokeObjectURL(url);
       		win.getWindow().close();
       	}
       }));*/
						}));
					};
					img.src = url;
				});
			}
		});
	}));

	// Fill tool
	addTool(new Tool('Fill', _tool_renderer.cursors.fill, _Fx.PLAYERFX.NONE, _conf.RANK.USER, function (tool) {
		tool.extra.tickAmount = 6;
		var queue = [];
		var fillingColor = null;
		var defaultFx = _Fx.PLAYERFX.RECT_SELECT_ALIGNED(1);
		tool.setFxRenderer(function (fx, ctx, time) {
			ctx.globalAlpha = 0.8;
			ctx.strokeStyle = fx.extra.player.htmlRgb;
			var z = _canvas_renderer.camera.zoom;
			if (!fillingColor || !fx.extra.isLocalPlayer) {
				defaultFx(fx, ctx, time);
			} else {
				ctx.beginPath();
				for (var i = 0; i < queue.length; i++) {
					ctx.rect((queue[i][0] - _canvas_renderer.camera.x) * z, (queue[i][1] - _canvas_renderer.camera.y) * z, z, z);
				}
				ctx.stroke();
			}
		});
		function tick() {
			var eq = function eq(a, b) {
				return a && b && a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
			};
			var check = function check(x, y) {
				if (eq(_main.misc.world.getPixel(x, y), fillingColor)) {
					queue.unshift([x, y]);
					return true;
				}
				return false;
			};

			if (!queue.length || !fillingColor) {
				return;
			}

			var selClr = _local_player.player.selectedColor;
			var painted = 0;
			var tickAmount = tool.extra.tickAmount;
			for (var painted = 0; painted < tickAmount && queue.length; painted++) {
				var current = queue.pop();
				var x = current[0];
				var y = current[1];
				var thisClr = _main.misc.world.getPixel(x, y);
				if (eq(thisClr, fillingColor) && !eq(thisClr, selClr)) {
					if (!_main.misc.world.setPixel(x, y, selClr)) {
						queue.push(current);
						break;
					}

					// diamond check first
					var top = check(x, y - 1);
					var bottom = check(x, y + 1);
					var left = check(x - 1, y);
					var right = check(x + 1, y);

					// if corners are not closed by parts of the diamond, then they can be accessed
					if (top && left) {
						check(x - 1, y - 1);
					}
					if (top && right) {
						check(x + 1, y - 1);
					}
					if (bottom && left) {
						check(x - 1, y + 1);
					}
					if (bottom && right) {
						check(x + 1, y + 1);
					}

					// Shape diamond, infra not like
					/*check(x    , y - 1);
     check(x - 1, y    );
     check(x + 1, y    );
     check(x    , y + 1);*/
				}
			}
		}
		tool.setEvent('mousedown', function (mouse) {
			if (!(mouse.buttons & 4)) {
				fillingColor = _main.misc.world.getPixel(mouse.tileX, mouse.tileY);
				if (fillingColor) {
					queue.push([mouse.tileX, mouse.tileY]);
					tool.setEvent('tick', tick);
				}
			}
		});
		tool.setEvent('mouseup deselect', function (mouse) {
			if (!mouse || !(mouse.buttons & 1)) {
				fillingColor = null;
				queue = [];
				tool.setEvent('tick', null);
			}
		});
	}));

	addTool(new Tool('Line', _tool_renderer.cursors.wand, _Fx.PLAYERFX.NONE, _conf.RANK.USER, function (tool) {
		var start = null;
		var end = null;
		var queue = [];
		function line(x1, y1, x2, y2, plot) {
			var dx = Math.abs(x2 - x1),
			    sx = x1 < x2 ? 1 : -1;
			var dy = -Math.abs(y2 - y1),
			    sy = y1 < y2 ? 1 : -1;
			var err = dx + dy,
			    e2;

			while (true) {
				plot(x1, y1);
				if (x1 == x2 && y1 == y2) break;
				e2 = 2 * err;
				if (e2 >= dy) {
					err += dy;x1 += sx;
				}
				if (e2 <= dx) {
					err += dx;y1 += sy;
				}
			}
		}
		var defaultFx = _Fx.PLAYERFX.RECT_SELECT_ALIGNED(1);
		tool.setFxRenderer(function (fx, ctx, time) {
			ctx.globalAlpha = 0.8;
			ctx.strokeStyle = fx.extra.player.htmlRgb;
			var z = _canvas_renderer.camera.zoom;
			if (!start || !end || !fx.extra.isLocalPlayer) {
				defaultFx(fx, ctx, time);
			} else {
				ctx.beginPath();
				line(start[0], start[1], end[0], end[1], function (x, y) {
					ctx.rect((x - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom, (y - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom, _canvas_renderer.camera.zoom, _canvas_renderer.camera.zoom);
				});
				ctx.stroke();
			}
		});
		function tick() {
			for (var painted = 0; painted < 3 && queue.length; painted++) {
				var current = queue.pop();
				var c = _main.misc.world.getPixel(current[0], current[1]);
				var pc = _local_player.player.selectedColor;
				if ((c[0] != pc[0] || c[1] != pc[1] || c[2] != pc[2]) && !_main.misc.world.setPixel(current[0], current[1], _local_player.player.selectedColor)) {
					queue.push(current);
					break;
				}
			}
			if (!queue.length) {
				start = null;
				end = null;
				tool.setEvent('tick', null);
				return;
			}
		}
		tool.setEvent('mousedown', function (mouse) {
			if (!(mouse.buttons & 4)) {
				queue = [];
				tool.setEvent('tick', null);
				start = [mouse.tileX, mouse.tileY];
				end = [mouse.tileX, mouse.tileY];
			}
		});
		tool.setEvent('mousemove', function (mouse) {
			if (!queue.length) {
				end = [mouse.tileX, mouse.tileY];
			}
		});
		tool.setEvent('mouseup', function (mouse) {
			if (!(mouse.buttons & 3) && !queue.length) {
				end = [mouse.tileX, mouse.tileY];
				if (!start) {
					end = null;
					return;
				}
				if (_local_player.player.rank == _conf.RANK.ADMIN) {
					line(start[0], start[1], end[0], end[1], function (x, y) {
						_main.misc.world.setPixel(x, y, _local_player.player.selectedColor);
					});
					start = null;
					end = null;
				} else {
					line(start[0], start[1], end[0], end[1], function (x, y) {
						queue.push([x, y]);
					});
					tool.setEvent('tick', tick);
				}
			}
		});
		tool.setEvent('deselect', function (mouse) {
			queue = [];
			start = null;
			end = null;
			tool.setEvent('tick', null);
		});
	}));

	addTool(new Tool('Protect', _tool_renderer.cursors.shield, _Fx.PLAYERFX.RECT_SELECT_ALIGNED(16, "#000000"), _conf.RANK.MODERATOR, function (tool) {
		tool.setFxRenderer(function (fx, ctx, time) {
			var x = fx.extra.player.x;
			var y = fx.extra.player.y;
			var fxx = (Math.floor(x / 256) * 16 - _canvas_renderer.camera.x) * _canvas_renderer.camera.zoom;
			var fxy = (Math.floor(y / 256) * 16 - _canvas_renderer.camera.y) * _canvas_renderer.camera.zoom;
			ctx.globalAlpha = 0.5;
			var chunkX = Math.floor(fx.extra.player.tileX / _conf.protocol.chunkSize);
			var chunkY = Math.floor(fx.extra.player.tileY / _conf.protocol.chunkSize);
			var chunk = _main.misc.world.getChunkAt(chunkX, chunkY);
			if (chunk) {
				ctx.fillStyle = chunk.locked ? "#00FF00" : "#FF0000";
				ctx.fillRect(fxx, fxy, _canvas_renderer.camera.zoom * 16, _canvas_renderer.camera.zoom * 16);
			}
			return 1; /* Rendering finished (won't change on next frame) */
		});
		tool.setEvent('mousedown mousemove', function (mouse) {
			var chunkX = Math.floor(mouse.tileX / _conf.protocol.chunkSize);
			var chunkY = Math.floor(mouse.tileY / _conf.protocol.chunkSize);
			var chunk = _main.misc.world.getChunkAt(chunkX, chunkY);
			switch (mouse.buttons) {
				case 1:
					if (!chunk.locked) {
						_networking.net.protocol.protectChunk(chunkX, chunkY, 1);
					}
					break;

				case 2:
					if (chunk.locked) {
						_networking.net.protocol.protectChunk(chunkX, chunkY, 0);
					}
					break;
			}
		});
	}));

	addTool(new Tool('Paste', _tool_renderer.cursors.paste, _Fx.PLAYERFX.NONE, _conf.RANK.ADMIN, function (tool) {
		tool.setFxRenderer(function (fx, ctx, time) {
			var z = _canvas_renderer.camera.zoom;
			var x = fx.extra.player.x;
			var y = fx.extra.player.y;
			var fxx = Math.floor(x / 16) - _canvas_renderer.camera.x;
			var fxy = Math.floor(y / 16) - _canvas_renderer.camera.y;
			if (tool.extra.canvas && fx.extra.isLocalPlayer) {
				ctx.globalAlpha = 0.5 + Math.sin(time / 500) / 4;
				ctx.strokeStyle = "#000000";
				ctx.scale(z, z);
				ctx.drawImage(tool.extra.canvas, fxx, fxy);
				ctx.scale(1 / z, 1 / z);
				ctx.globalAlpha = 0.8;
				ctx.strokeRect(fxx * z, fxy * z, tool.extra.canvas.width * z, tool.extra.canvas.height * z);
				return 0;
			}
		});
		var paint = function paint(tileX, tileY) {
			var tmpBuffer = new Uint32Array(_conf.protocol.chunkSize * _conf.protocol.chunkSize);
			var ctx = tool.extra.canvas.getContext("2d");
			var dat = ctx.getImageData(0, 0, tool.extra.canvas.width, tool.extra.canvas.height);
			var u32dat = new Uint32Array(dat.data.buffer);
			var totalChunksW = Math.ceil(((0, _misc.absMod)(tileX, _conf.protocol.chunkSize) + dat.width) / _conf.protocol.chunkSize);
			var totalChunksH = Math.ceil(((0, _misc.absMod)(tileY, _conf.protocol.chunkSize) + dat.height) / _conf.protocol.chunkSize);
			var getModifiedPixel = function getModifiedPixel(x, y) {
				var imgY = y - tileY;
				var imgX = x - tileX;
				if (imgY < 0 || imgX < 0 || imgY >= dat.height || imgX >= dat.width) {
					var currentPixel = _main.misc.world.getPixel(x, y);
					return currentPixel ? currentPixel[2] << 16 | currentPixel[1] << 8 | currentPixel[0] : null;
				}
				var img = u32dat[imgY * dat.width + imgX];
				var oldPixel = _main.misc.world.getPixel(x, y);
				var alpha = img >> 24 & 0xFF;
				if (!oldPixel) {
					return null;
				}
				var r = (1 - alpha / 255) * oldPixel[0] + alpha / 255 * (img & 0xFF);
				var g = (1 - alpha / 255) * oldPixel[1] + alpha / 255 * (img >> 8 & 0xFF);
				var b = (1 - alpha / 255) * oldPixel[2] + alpha / 255 * (img >> 16 & 0xFF);
				var rgb = b << 16 | g << 8 | r;
				return r == oldPixel[0] && g == oldPixel[1] && b == oldPixel[2] ? rgb : 0xFF000000 | rgb;
			};
			var getModifiedChunk = function getModifiedChunk(chunkX, chunkY) {
				var modified = 0;
				var offX = chunkX * _conf.protocol.chunkSize;
				var offY = chunkY * _conf.protocol.chunkSize;
				for (var y = 0; y < _conf.protocol.chunkSize; y++) {
					for (var x = 0; x < _conf.protocol.chunkSize; x++) {
						var color = getModifiedPixel(x + offX, y + offY);
						if (color !== null) {
							if (color & 0xFF000000) {
								++modified;
							}
							tmpBuffer[y * _conf.protocol.chunkSize + x] = color & 0xFFFFFF;
						} else {
							/* Chunk not loaded... */
							throw new Error('Couldn\'t paste -- chunk (' + chunkX + ', ' + chunkY + ') is unloaded');
						}
					}
				}
				return modified ? tmpBuffer : null;
			};
			if (!_networking.net.protocol.setChunk) {
				throw new Error("Protocol doesn't support pasting");
			}
			for (var y = Math.floor(tileY / _conf.protocol.chunkSize), t = totalChunksH; --t >= 0; y++) {
				for (var x = Math.floor(tileX / _conf.protocol.chunkSize), tw = totalChunksW; --tw >= 0; x++) {
					var newChunk = getModifiedChunk(x, y);
					if (newChunk) {
						_networking.net.protocol.setChunk(x, y, newChunk);
					}
				}
			}
		};

		tool.setEvent('mousedown', function (mouse) {
			if (!(mouse.buttons & 4)) {
				if (tool.extra.canvas) {
					paint(mouse.tileX, mouse.tileY);
				}
			}
		});

		var input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		tool.setEvent('select', function () {
			input.onchange = function (event) {
				if (input.files && input.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
						var image = new Image();
						image.onload = function () {
							tool.extra.canvas = document.createElement("canvas");
							tool.extra.canvas.width = image.width;
							tool.extra.canvas.height = image.height;
							var ctx = tool.extra.canvas.getContext("2d");
							ctx.drawImage(image, 0, 0);
							console.log('Loaded image');
						};
						image.src = e.target.result;
					};
					reader.readAsDataURL(input.files[0]);
				}
			};
			input.click();
		});
	}));

	_global.eventSys.emit(_conf.EVENTS.misc.toolsInitialized);
});

_global.eventSys.once(_conf.EVENTS.init, function () {
	exports.toolsWindow = toolsWindow = new _windowsys.GUIWindow('Tools', {}, function (wdow) {
		wdow.container.id = "toole-container";
		wdow.container.style.cssText = "max-width: 40px";
	}).move(5, 32);
});

_global.eventSys.once(_conf.EVENTS.misc.toolsInitialized, function () {
	updateToolbar();
	if (windowShown) {
		_windowsys.windowSys.addWindow(toolsWindow);
	}
});

_global.eventSys.on(_conf.EVENTS.net.disconnected, function () {
	showToolsWindow(false);
});

_global.eventSys.on(_conf.EVENTS.misc.worldInitialized, function () {
	showToolsWindow(true);
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.windowSys = undefined;
exports.UtilInput = UtilInput;
exports.UtilDialog = UtilDialog;
exports.OWOPDropDown = OWOPDropDown;
exports.GUIWindow = GUIWindow;
exports.addWindow = addWindow;
exports.delWindow = delWindow;
exports.centerWindow = centerWindow;

var _main = __webpack_require__(3);

var _conf = __webpack_require__(1);

var _global = __webpack_require__(0);

var _misc = __webpack_require__(2);

var windowSys = exports.windowSys = {
	windows: {},
	class: {
		input: UtilInput,
		dialog: UtilDialog,
		dropDown: OWOPDropDown,
		window: GUIWindow
	},
	addWindow: addWindow,
	delWindow: delWindow,
	centerWindow: centerWindow
};

_global.PublicAPI.windowSys = windowSys;

function UtilInput(title, message, inputType, cb) {
	this.win = new GUIWindow(title, {
		centerOnce: true,
		closeable: true
	}, function (win) {
		this.inputField = win.addObj((0, _misc.mkHTML)("input", {
			style: "width: 100%; height: 50%;",
			type: inputType,
			placeholder: message,
			onkeyup: function (e) {
				if ((e.which || e.keyCode) == 13) {
					this.okButton.click();
				}
			}.bind(this)
		}));
		this.okButton = win.addObj((0, _misc.mkHTML)("button", {
			innerHTML: "OK",
			style: "width: 100%; height: 50%;",
			onclick: function () {
				cb(this.inputField.value);
				this.getWindow().close();
			}.bind(this)
		}));
	}.bind(this)).resize(200, 60);
}

UtilInput.prototype.getWindow = function () {
	return this.win;
};

function UtilDialog(title, message, canClose, cb) {
	this.win = new GUIWindow(title, {
		centered: true,
		closeable: canClose
	}, function (win) {
		this.messageBox = win.addObj((0, _misc.mkHTML)("span", {
			className: "whitetext",
			style: "display: block; padding-bottom: 4px;",
			innerHTML: message
		}));
		this.okButton = win.addObj((0, _misc.mkHTML)("button", {
			innerHTML: "OK",
			style: "display: block; width: 80px; height: 30px; margin: auto;",
			onclick: function () {
				cb();
				this.getWindow().close();
			}.bind(this)
		}));
	}.bind(this));
}

UtilDialog.prototype.getWindow = function () {
	return this.win;
};

/* Highly specific purpose, should only be created once */
function OWOPDropDown() {
	this.win = new GUIWindow(null, {
		immobile: true
	}, function (win) {
		win.frame.className = "owopdropdown";
		win.container.style.cssText = "border: none;\
			background-color: initial;\
			pointer-events: none;\
			margin: 0;";
		var hlpdiv = win.addObj((0, _misc.mkHTML)("div", {
			className: "winframe",
			style: "padding: 0;\
				width: 68px; height: 64px;"
		}));
		var hidebtn = win.addObj((0, _misc.mkHTML)("button", {
			innerHTML: 'hi'
			/*className: "winframe",
   style: "padding: 0;\
   background-color: #ffd162;\
   left: -6px; top: 70px;\
   width: 38px; height: 36px;"*/
		}));
		/*var rddtbtn = win.addObj(mkHTML("button", {
  	className: "winframe",
  	style: "padding: 0;\
  	right: -6px; top: 70px;\
  	width: 38px; height: 36px;"
  }));*/
		var hlpcontainer = (0, _misc.mkHTML)("div", {
			className: "wincontainer",
			style: "margin-top: -5px;"
		});
		hlpdiv.appendChild(hlpcontainer);
		hlpcontainer.appendChild((0, _misc.mkHTML)("button", {
			style: "background-image: url(img/gui.png);\
				background-position: -64px 4px;\
				background-origin: border-box;\
				background-repeat: no-repeat;\
				width: 100%; height: 100%;",
			onclick: function () {
				console.log("help");
			}.bind(this)
		}));
	}).resize(68, 64);
}

OWOPDropDown.prototype.getWindow = function () {
	return this.win;
};

/* wm = WindowManager object 
 * initfunc = function where all the windows objects should be added,
 *            first function argument is the guiwindow object itself
 */
function GUIWindow(title, options, initfunc) {
	var _this = this;

	options = options || {};
	this.wm = WorldOfPixels.windowsys;
	this.opt = options;
	this.title = title;
	this.frame = document.createElement("div");
	this.container = document.createElement("div");
	this.container.className = 'wincontainer';

	if (title) {
		this.titlespan = document.createElement("span");
		this.titlespan.innerHTML = title;

		this.frame.appendChild(this.titlespan);
	}

	this.frame.appendChild(this.container);

	if (options.centered) {
		options.immobile = true;
		this.frame.className = "centered";
	}

	Object.defineProperty(this, "realw", {
		get: function () {
			return this.frame.offsetWidth;
		}.bind(this)
	});
	Object.defineProperty(this, "realh", {
		get: function () {
			return this.frame.offsetHeight;
		}.bind(this)
	});

	this.elements = [];

	this.creationtime = Date.now();
	this.currentaction = null; /* Func to call every mousemove evt */

	if (initfunc) {
		initfunc(this);
	}

	this.mdownfunc = function (e) {
		var offx = e.clientX - this.x;
		var offy = e.clientY - this.y;
		if (e.target === this.frame && !this.opt.immobile) {
			this.currentaction = function (x, y) {
				x = x <= 0 ? 0 : x > window.innerWidth ? window.innerWidth : x;
				y = y <= 0 ? 0 : y > window.innerHeight ? window.innerHeight : y;
				this.move(x - offx, y - offy);
			};
		}
	}.bind(this);

	if (options.centerOnce) {
		/* Ugly solution to wait for offset(Height, Width) values to be available */
		this.move(window.innerWidth, window.innerHeight); /* Hide the window */
		(0, _misc.waitFrames)(2, function () {
			return centerWindow(_this);
		});
	}

	this.frame.addEventListener("mousedown", this.mdownfunc);

	this.mupfunc = function (e) {
		this.currentaction = null;
	}.bind(this);

	window.addEventListener("mouseup", this.mupfunc);

	this.mmovefunc = function (e) {
		if (this.currentaction) {
			this.currentaction(e.clientX, e.clientY);
		}
	}.bind(this);

	window.addEventListener("mousemove", this.mmovefunc);

	if (options.closeable) {
		this.frame.appendChild((0, _misc.mkHTML)("button", {
			onclick: function () {
				this.close();
			}.bind(this),
			className: 'windowCloseButton'
		}));
	}
}

GUIWindow.prototype.getWindow = function () {
	return this;
};

GUIWindow.prototype.addObj = function (object) {
	this.elements.push(object);
	this.container.appendChild(object);
	return object;
};

GUIWindow.prototype.delObj = function (object) {
	var i = this.elements.indexOf(object);
	if (i != -1) {
		this.elements.splice(i, 1);
		this.container.removeChild(object);
	}
};

GUIWindow.prototype.move = function (x, y) {
	if (!this.opt.immobile) {
		this.frame.style.transform = "translate(" + x + "px," + y + "px)";
		this.x = x;
		this.y = y;
	}
	return this;
};

GUIWindow.prototype.resize = function (w, h) {
	this.w = w;
	this.h = h;
	this.container.style.width = w + "px";
	this.container.style.height = h + "px";
	return this;
};

GUIWindow.prototype.close = function () {
	delWindow(this);
	window.removeEventListener("mousemove", this.mmovefunc);
	window.removeEventListener("mouseup", this.mupfunc);
	this.frame.removeEventListener("mousedown", this.mdownfunc);
	if (this.onclose) {
		this.onclose();
	}
};

/* Window X/Y is specified on window.x, window.y */
function addWindow(window) {
	var realWindow = window.getWindow();
	if (!windowSys.windows[realWindow.title]) {
		_main.elements.windows.appendChild(realWindow.frame);
		windowSys.windows[realWindow.title] = realWindow;
	}
	_global.eventSys.emit(_conf.EVENTS.misc.windowAdded, window);
	return window;
}

function delWindow(window) {
	var realWindow = window.getWindow();
	if (windowSys.windows[realWindow.title]) {
		_main.elements.windows.removeChild(realWindow.frame);
		delete windowSys.windows[realWindow.title];
	}
	return window;
}

function centerWindow(win) {
	win = win.getWindow();
	win.move(window.innerWidth / 2 - win.realw / 2 | 0, window.innerHeight / 2 - win.realh / 2 | 0);
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.World = exports.Chunk = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conf = __webpack_require__(1);

var _global = __webpack_require__(0);

var _color = __webpack_require__(4);

var _networking = __webpack_require__(8);

var _canvas_renderer = __webpack_require__(5);

var _main = __webpack_require__(3);

var _local_player = __webpack_require__(6);

var _Player = __webpack_require__(20);

var _Fx = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lastPlace = 0;

var Chunk = exports.Chunk = function () {
	function Chunk(x, y, netdata, locked) {
		_classCallCheck(this, Chunk);

		/* netdata = Uint32Array */
		this.needsRedraw = false;
		this.x = x;
		this.y = y;
		this.tmpChunkBuf = netdata;
		this.view = null;
		this.locked = locked;
		this.lockedNeighbors = 0; /* Up, Right, Down, Left */
	}

	_createClass(Chunk, [{
		key: 'update',
		value: function update(x, y, color) {
			/* WARNING: Should absMod if not power of two */
			x &= _conf.protocol.chunkSize - 1;
			y &= _conf.protocol.chunkSize - 1;
			this.view.set(x, y, 0xFF000000 | color);
			this.needsRedraw = true;
		}
	}, {
		key: 'get',
		value: function get(x, y) {
			x &= _conf.protocol.chunkSize - 1;
			y &= _conf.protocol.chunkSize - 1;
			return this.view.get(x, y);
		}
	}, {
		key: 'set',
		value: function set(data) {
			if (Number.isInteger(data)) {
				this.view.fill(0xFF000000 | data);
			} else {
				this.view.fillFromBuf(data);
			}
			this.needsRedraw = true;
		}
	}, {
		key: 'remove',
		value: function remove() {
			/* Can be called when manually unloading too */
			_global.eventSys.emit(_conf.EVENTS.net.chunk.unload, this);
		}
	}]);

	return Chunk;
}();

Chunk.dir = {
	UP: 8,
	RIGHT: 4,
	DOWN: 2,
	LEFT: 1
};

var World = exports.World = function () {
	function World(worldName) {
		var _this = this;

		_classCallCheck(this, World);

		this.name = worldName;
		this.chunks = {};
		this.protectedChunks = {};
		this.players = {};
		this.undoHistory = [];
		this.pathUpdaterTimeout = -1;
		this.pathFx = new _Fx.Fx(function (fx, ctx, time) {
			var retval = 1;
			if (fx.extra.path) {
				ctx.strokeStyle = "#525252";
				var l = ctx.lineWidth;
				ctx.lineWidth = 3 / _canvas_renderer.camera.zoom;
				ctx.setTransform(_canvas_renderer.camera.zoom, 0, 0, _canvas_renderer.camera.zoom, -_canvas_renderer.camera.x * _canvas_renderer.camera.zoom, -_canvas_renderer.camera.y * _canvas_renderer.camera.zoom);
				if (time - fx.extra.placeTime < 1500) {
					ctx.globalAlpha = (1 - (time - fx.extra.placeTime) / 1500) * 0.5;
					ctx.fillStyle = _canvas_renderer.renderer.patterns.unloaded;
					ctx.fill(fx.extra.path);
					retval = 0;
				}
				ctx.globalAlpha = 0.75;
				ctx.stroke(fx.extra.path);
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.lineWidth = l;
			}
			return retval;
		});

		var loadCFunc = function loadCFunc(chunk) {
			return _this.chunkLoaded(chunk);
		};
		var unloadCFunc = function unloadCFunc(chunk) {
			return _this.chunkUnloaded(chunk);
		};
		var setCFunc = function setCFunc(x, y, data) {
			return _this.chunkPasted(x, y, data);
		};
		var lockCFunc = function lockCFunc(x, y, newState) {
			return _this.chunkLocked(x, y, newState);
		};
		var disconnectedFunc = function disconnectedFunc() {
			return _global.eventSys.emit(_conf.EVENTS.net.world.leave);
		};
		var updateTileFunc = function updateTileFunc(t) {
			return _this.tilesUpdated(t);
		};
		var updatePlayerFunc = function updatePlayerFunc(p) {
			return _this.playersMoved(p);
		};
		var destroyPlayerFunc = function destroyPlayerFunc(p) {
			return _this.playersLeft(p);
		};
		var leaveWFunc = function leaveWFunc() {
			_this.pathFx.delete();
			_this.unloadAllChunks();
			_this.playersLeft(Object.keys(_this.players));
			_global.eventSys.removeListener(_conf.EVENTS.net.chunk.load, loadCFunc);
			_global.eventSys.removeListener(_conf.EVENTS.net.chunk.unload, unloadCFunc);
			_global.eventSys.removeListener(_conf.EVENTS.net.chunk.set, setCFunc);
			_global.eventSys.removeListener(_conf.EVENTS.net.chunk.lock, lockCFunc);
			_global.eventSys.removeListener(_conf.EVENTS.net.disconnected, disconnectedFunc);
			_global.eventSys.removeListener(_conf.EVENTS.net.world.tilesUpdated, updateTileFunc);
			_global.eventSys.removeListener(_conf.EVENTS.net.world.playersMoved, updatePlayerFunc);
			_global.eventSys.removeListener(_conf.EVENTS.net.world.playersLeft, destroyPlayerFunc);
		};
		_global.eventSys.on(_conf.EVENTS.net.chunk.load, loadCFunc);
		_global.eventSys.on(_conf.EVENTS.net.chunk.unload, unloadCFunc);
		_global.eventSys.on(_conf.EVENTS.net.chunk.set, setCFunc);
		_global.eventSys.on(_conf.EVENTS.net.chunk.lock, lockCFunc);
		_global.eventSys.on(_conf.EVENTS.net.world.tilesUpdated, updateTileFunc);
		_global.eventSys.on(_conf.EVENTS.net.world.playersMoved, updatePlayerFunc);
		_global.eventSys.on(_conf.EVENTS.net.world.playersLeft, destroyPlayerFunc);
		_global.eventSys.once(_conf.EVENTS.net.world.leave, leaveWFunc);
		_global.eventSys.once(_conf.EVENTS.net.disconnected, disconnectedFunc);
	}

	_createClass(World, [{
		key: 'makeLockedChunksPath',
		value: function makeLockedChunksPath() {
			var d = Chunk.dir;
			var mainPath = new Path2D();

			var vpoints = {};
			var hpoints = {};

			var addPoint = function addPoint(fx, fy, tx, ty, points) {
				var fkey = fx + ',' + fy;
				var tkey = tx + ',' + ty;
				if (tkey in points && fkey in points) {
					points[points[fkey]] = points[tkey];
					points[points[tkey]] = points[fkey];
					delete points[tkey];
					delete points[fkey];
				} else if (tkey in points) {
					var newTo = points[tkey];
					points[newTo] = fkey;
					delete points[tkey];
					points[fkey] = newTo;
				} else if (fkey in points) {
					var newFrom = points[fkey];
					points[newFrom] = tkey;
					delete points[fkey];
					points[tkey] = newFrom;
				} else {
					points[fkey] = tkey;
					points[tkey] = fkey;
				}
			};

			for (var k in this.protectedChunks) {
				var chunk = this.protectedChunks[k];
				var ln = chunk.lockedNeighbors;
				if (ln === (d.LEFT | d.DOWN | d.UP | d.RIGHT)) {
					continue;
				}

				if (!(ln & d.UP)) {
					addPoint(chunk.x + 1, chunk.y, chunk.x, chunk.y, hpoints);
				}
				if (!(ln & d.DOWN)) {
					addPoint(chunk.x, chunk.y + 1, chunk.x + 1, chunk.y + 1, hpoints);
				}

				if (!(ln & d.LEFT)) {
					addPoint(chunk.x, chunk.y + 1, chunk.x, chunk.y, vpoints);
				}
				if (!(ln & d.RIGHT)) {
					addPoint(chunk.x + 1, chunk.y + 1, chunk.x + 1, chunk.y, vpoints);
				}
			}

			var polys = 0;
			var pointobjs = [vpoints, hpoints];
			for (var p in vpoints) {
				var a = p.split(',');
				mainPath.moveTo(a[0] * 16, a[1] * 16);

				delete vpoints[vpoints[p]];
				delete vpoints[p];
				p = hpoints[p];
				for (var i = 0; p && (a = p.split(',')); i++) {
					var prev = pointobjs[i + 1 & 1];
					var next = pointobjs[i & 1];
					mainPath.lineTo(a[0] * 16, a[1] * 16);

					delete prev[prev[p]];
					delete prev[p];
					p = next[p];
				}
				mainPath.closePath();
				++polys;
			}

			return polys === 0 ? null : mainPath;
		}
	}, {
		key: 'findNeighborLockedChunks',
		value: function findNeighborLockedChunks(chunk, newState) {
			var _this2 = this;

			var d = Chunk.dir;
			var checkSide = function checkSide(x, y, to, from) {
				var sidec = _this2.getChunkAt(chunk.x + x, chunk.y + y);
				if (sidec && sidec.locked) {
					if (newState) {
						chunk.lockedNeighbors |= to;
						sidec.lockedNeighbors |= from;
					} else {
						chunk.lockedNeighbors &= ~to;
						sidec.lockedNeighbors &= ~from;
					}
				}
			};

			checkSide(0, -1, d.UP, d.DOWN);
			checkSide(1, 0, d.RIGHT, d.LEFT);
			checkSide(-1, 0, d.LEFT, d.RIGHT);
			checkSide(0, 1, d.DOWN, d.UP);

			clearTimeout(this.pathUpdaterTimeout);
			this.pathUpdaterTimeout = setTimeout(function () {
				_this2.pathFx.update({ path: _this2.makeLockedChunksPath() });
				_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
			}, 100);
		}
	}, {
		key: 'loadChunk',
		value: function loadChunk(x, y) {
			var key = x + ',' + y;
			if (!this.chunks[key] && _networking.net.isConnected()) {
				_networking.net.protocol.requestChunk(x, y);
			}
		}
	}, {
		key: 'allChunksLoaded',
		value: function allChunksLoaded() {
			return _networking.net.protocol.allChunksLoaded();
		}
	}, {
		key: 'tilesUpdated',
		value: function tilesUpdated(tiles) {
			var chunksUpdated = {};
			var chunkSize = _conf.protocol.chunkSize;
			for (var i = 0; i < tiles.length; i++) {
				var t = tiles[i];
				var key = Math.floor(t.x / chunkSize) + ',' + Math.floor(t.y / chunkSize);
				var chunk = this.chunks[key];
				if (chunk) {
					chunksUpdated[key] = chunk;
					chunk.update(t.x, t.y, t.rgb);
				}
			}
			for (var c in chunksUpdated) {
				_global.eventSys.emit(_conf.EVENTS.renderer.updateChunk, chunksUpdated[c]);
			}
		}
	}, {
		key: 'playersMoved',
		value: function playersMoved(players) {
			var rendered = false;
			for (var id in players) {
				var player = this.players[id];
				var u = players[id];
				if (player) {
					player.update(u.x, u.y, u.rgb, u.tool);
				} else {
					player = this.players[id] = new _Player.Player(u.x, u.y, u.rgb, u.tool, id);
				}
				if (!rendered && ((0, _canvas_renderer.isVisible)(player.endX / 16, player.endY / 16, 4, 4) || (0, _canvas_renderer.isVisible)(player.x / 16, player.y / 16, 4, 4))) {
					rendered = true;
					_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
				}
			}
		}
	}, {
		key: 'playersLeft',
		value: function playersLeft(ids) {
			var rendered = false;
			for (var i = 0; i < ids.length; i++) {
				var id = ids[i];
				var player = this.players[id];
				if (player) {
					player.disconnect();
					if (!rendered && (0, _canvas_renderer.isVisible)(player.x / 16, player.y / 16, 4, 4)) {
						rendered = true;
						_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
					}
				}
				delete this.players[id];
			}
		}
	}, {
		key: 'setPixel',
		value: function setPixel(x, y, color, noUndo) {
			var time = Date.now();
			var chunkSize = _conf.protocol.chunkSize;
			var chunk = this.chunks[Math.floor(x / chunkSize) + ',' + Math.floor(y / chunkSize)];
			if (chunk && (!chunk.locked || _local_player.player.rank >= _conf.RANK.MODERATOR)) {
				var oldPixel = this.getPixel(x, y, chunk);
				if (!oldPixel || oldPixel[0] === color[0] && oldPixel[1] === color[1] && oldPixel[2] === color[2] || !_networking.net.protocol.updatePixel(x, y, color)) {
					return false;
				}
				if (!noUndo) {
					oldPixel.push(x, y, time);
					this.undoHistory.push(oldPixel);
				}
				chunk.update(x, y, _color.colorUtils.u24_888(color[0], color[1], color[2]));
				_global.eventSys.emit(_conf.EVENTS.renderer.updateChunk, chunk);
				if (time - lastPlace > 30) {
					_main.sounds.play(_main.sounds.place);
					lastPlace = time;
				}
				return true;
			} else if (chunk && chunk.locked) {
				this.pathFx.extra.placeTime = time;
				_canvas_renderer.renderer.render(_canvas_renderer.renderer.rendertype.FX);
			}
			return false;
		}
	}, {
		key: 'undo',
		value: function undo(bulkUndo) {
			var eq = function eq(a, b) {
				return a[0] == b[0] && a[1] == b[1] && a[2] == b[2];
			};
			if (this.undoHistory.length === 0) {
				return false;
			}
			var changeTime = null;
			for (var i = this.undoHistory.length; --i >= 0;) {
				var undo = this.undoHistory[i];
				if (!changeTime) {
					changeTime = undo[5];
				}
				var px = this.getPixel(undo[3], undo[4]);
				if (px) {
					var shouldContinue = !bulkUndo || changeTime - undo[5] < 500;
					var unchanged = eq(px, undo);
					if (!shouldContinue) {
						break;
					}
					if (unchanged || this.setPixel(undo[3], undo[4], undo, true)) {
						this.undoHistory.splice(i, 1);
						if (!bulkUndo) {
							break;
						}
					}
				}
			}
		}
	}, {
		key: 'getChunkAt',
		value: function getChunkAt(x, y) {
			return this.chunks[x + ',' + y];
		}
	}, {
		key: 'getPixel',
		value: function getPixel(x, y, chunk) {
			if (!chunk) {
				var chunkSize = _conf.protocol.chunkSize;
				chunk = this.chunks[Math.floor(x / chunkSize) + ',' + Math.floor(y / chunkSize)];
			}

			if (chunk) {
				var clr = chunk.get(x, y);
				return [clr & 0xFF, clr >> 8 & 0xFF, clr >> 16 & 0xFF];
			}
			return null;
		}
	}, {
		key: 'validMousePos',
		value: function validMousePos(tileX, tileY) {
			return this.getPixel(tileX, tileY) !== null;
		}
	}, {
		key: 'chunkLocked',
		value: function chunkLocked(x, y, newState) {
			var key = x + ',' + y;
			var chunk = this.getChunkAt(x, y);
			if (chunk) {
				if (newState) {
					this.protectedChunks[key] = chunk;
					chunk.locked = true;
				} else {
					delete this.protectedChunks[key];
					chunk.locked = false;
				}
				this.findNeighborLockedChunks(chunk, newState);
			}
		}
	}, {
		key: 'chunkLoaded',
		value: function chunkLoaded(chunk) {
			var key = chunk.x + ',' + chunk.y;
			this.chunks[key] = chunk;
			if (chunk.locked) {
				this.protectedChunks[key] = chunk;
				this.findNeighborLockedChunks(chunk, chunk.locked);
			}
			_global.eventSys.emit(_conf.EVENTS.renderer.addChunk, chunk);
		}
	}, {
		key: 'chunkUnloaded',
		value: function chunkUnloaded(chunk) {
			var key = chunk.x + ',' + chunk.y;
			delete this.chunks[key];
			if (chunk.locked) {
				delete this.protectedChunks[key];
				chunk.locked = false;
				this.findNeighborLockedChunks(chunk, chunk.locked);
			}
			_global.eventSys.emit(_conf.EVENTS.renderer.rmChunk, chunk);
		}
	}, {
		key: 'chunkPasted',
		value: function chunkPasted(x, y, data) {
			var chunk = this.chunks[x + ',' + y];
			if (chunk) {
				chunk.set(data);
				_global.eventSys.emit(_conf.EVENTS.renderer.updateChunk, chunk);
			}
		}
	}, {
		key: 'unloadAllChunks',
		value: function unloadAllChunks() {
			for (var c in this.chunks) {
				this.chunks[c].remove();
			}
		}
	}]);

	return World;
}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.cursors = undefined;

var _conf = __webpack_require__(1);

var _global = __webpack_require__(0);

var cursors = exports.cursors = {
	set: new Image(),
	cursor: { imgpos: [0, 0], hotspot: [0, 0] },
	move: { imgpos: [1, 0], hotspot: [18, 18] },
	pipette: { imgpos: [0, 1], hotspot: [0, 28] },
	erase: { imgpos: [0, 2], hotspot: [4, 26] },
	zoom: { imgpos: [1, 2], hotspot: [19, 10] },
	fill: { imgpos: [1, 1], hotspot: [3, 29] },
	brush: { imgpos: [0, 3], hotspot: [0, 26] },
	select: { imgpos: [2, 0], hotspot: [0, 0] }, // needs better hotspot
	copy: { imgpos: [3, 0], hotspot: [0, 0] }, // and this
	paste: { imgpos: [3, 1], hotspot: [0, 0] }, // this too
	cut: { imgpos: [3, 2], hotspot: [11, 5] },
	wand: { imgpos: [3, 3], hotspot: [0, 0] },
	shield: { imgpos: [2, 3], hotspot: [18, 18] },
	kick: { imgpos: [2, 1], hotspot: [3, 6] },
	ban: { imgpos: [3, 0], hotspot: [10, 4] },
	write: { imgpos: [1, 3], hotspot: [10, 4] // fix hotspot
	} };

_global.PublicAPI.cursors = cursors;

function reduce(canvas) {
	/* Removes unused space from the image */
	var nw = canvas.width;
	var nh = canvas.height;
	var ctx = canvas.getContext('2d');
	var idat = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var u32dat = new Uint32Array(idat.data.buffer);
	var xoff = 0;
	var yoff = 0;
	for (var y = 0, x, i = 0; y < idat.height; y++) {
		for (x = idat.width; x--; i += u32dat[y * idat.width + x]) {}
		if (i) {
			break;
		}
		yoff++;
	}
	for (var x = 0, y, i = 0; x < idat.width; x++) {
		for (y = nh; y--; i += u32dat[y * idat.width + x]) {}
		if (i) {
			break;
		}
		xoff++;
	}
	for (var y = idat.height, x, i = 0; y--;) {
		for (x = idat.width; x--; i += u32dat[y * idat.width + x]) {}
		if (i) {
			break;
		}
		nh--;
	}
	for (var x = idat.width, y, i = 0; x--;) {
		for (y = nh; y--; i += u32dat[y * idat.width + x]) {}
		if (i) {
			break;
		}
		nw--;
	}
	canvas.width = nw;
	canvas.height = nh;
	ctx.putImageData(idat, -xoff, -yoff);
}

function shadow(canvas, img) {
	/* Make a bigger image so the shadow doesn't get cut */
	canvas.width = 2 + img.width + 6;
	canvas.height = 2 + img.height + 6;
	var ctx = canvas.getContext('2d');
	ctx.shadowColor = '#000000';
	ctx.globalAlpha = 0.5; /* The shadow is too dark so we draw it transparent */
	ctx.shadowBlur = 4;
	ctx.shadowOffsetX = 2;
	ctx.shadowOffsetY = 2;
	ctx.drawImage(img, 2, 2);
	ctx.globalAlpha = 1;
	ctx.shadowColor = 'rgba(0, 0, 0, 0)'; /* disables the shadow */
	ctx.drawImage(img, 2, 2);
}

/* makes a hole with the shape of the image */
function popOut(canvas, img) {
	var shadowcolor = 0xFF3B314D;
	var backgroundcolor = 0xFF5C637E;
	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0);
	var idat = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var u32dat = new Uint32Array(idat.data.buffer);
	var clr = function clr(x, y) {
		return x < 0 || y < 0 || x >= idat.width || y >= idat.height ? 0 : u32dat[y * idat.width + x];
	};
	for (var i = u32dat.length; i--;) {
		if (u32dat[i] !== 0) {
			u32dat[i] = backgroundcolor;
		}
	}
	for (var y = idat.height; y--;) {
		for (var x = idat.width; x--;) {
			if (clr(x, y) === backgroundcolor && (!clr(x, y - 1) || !clr(x - 1, y)) && !clr(x - 1, y - 1)) {
				u32dat[y * idat.width + x] = shadowcolor;
			}
		}
	}
	for (var y = idat.height; y--;) {
		for (var x = idat.width; x--;) {
			if (clr(x, y - 1) === shadowcolor && clr(x - 1, y) === shadowcolor) {
				u32dat[y * idat.width + x] = shadowcolor;
			}
		}
	}
	ctx.putImageData(idat, 0, 0);
}

function load(oncomplete) {
	cursors.set.onload = function () {
		var set = cursors.set;
		var slotcanvas = document.createElement('canvas');
		popOut(slotcanvas, set);
		var j = Object.keys(cursors).length - 1 + 1; /* +1 slotset to blob url */
		for (var tool in cursors) {
			if (tool === 'set') {
				continue;
			}
			tool = cursors[tool];
			var original = document.createElement('canvas');
			var i = tool.img = {
				shadowed: document.createElement('canvas'),
				shadowblob: null
			};
			original.width = original.height = 36;
			original.getContext('2d').drawImage(set, tool.imgpos[0] * 36, tool.imgpos[1] * 36, 36, 36, 0, 0, 36, 36);
			reduce(original);
			shadow(i.shadowed, original);
			tool.hotspot[0] += 2;
			tool.hotspot[1] += 2; /* Check shadow() for explanation */

			/* Blob-ify images */
			i.shadowed.toBlob(function (blob) {
				this.img.shadowblob = URL.createObjectURL(blob);
				if (! --j) oncomplete();
			}.bind(tool));
		}
		slotcanvas.toBlob(function (blob) {
			cursors.slotset = URL.createObjectURL(blob);
			if (! --j) oncomplete();
		});
	};

	cursors.set.src = _conf.options.toolSetUrl;
}

_global.eventSys.once(_conf.EVENTS.loaded, function () {
	load(function () {
		return _global.eventSys.emit(_conf.EVENTS.misc.toolsRendered);
	});
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Lerp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _misc = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Time function, time will be updated by the renderer */
var time = _misc.getTime /*() => getTime(true)*/;

var Lerp = exports.Lerp = function () {
    function Lerp(start, end, ms) {
        _classCallCheck(this, Lerp);

        this.start = start;
        this.end = end;
        this.ms = ms;
        this.time = time();
    }

    _createClass(Lerp, [{
        key: 'val',
        get: function get() {
            var amt = Math.min((time() - this.time) / this.ms, 1);
            return (1 - amt) * this.start + amt * this.end;
        },
        set: function set(v) {
            this.start = this.val;
            this.end = v;
            this.time = time(true);
        }
    }]);

    return Lerp;
}();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule normalizeWheel
 * @typechecks
 */

/* source: https://github.com/facebookarchive/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js */



// Reasonable defaults

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeWheel = normalizeWheel;
var PIXEL_STEP = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;

function normalizeWheel( /*object*/event) /*object*/{
  var sX = 0,
      sY = 0,
      // spinX, spinY
  pX = 0,
      pY = 0; // pixelX, pixelY

  // Legacy
  if ('detail' in event) {
    sY = event.detail;
  }
  if ('wheelDelta' in event) {
    sY = -event.wheelDelta / 120;
  }
  if ('wheelDeltaY' in event) {
    sY = -event.wheelDeltaY / 120;
  }
  if ('wheelDeltaX' in event) {
    sX = -event.wheelDeltaX / 120;
  }

  // side scrolling on FF with DOMMouseScroll
  if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in event) {
    pY = event.deltaY;
  }
  if ('deltaX' in event) {
    pX = event.deltaX;
  }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode == 1) {
      // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else {
      // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) {
    sX = pX < 1 ? -1 : 1;
  }
  if (pY && !sY) {
    sY = pY < 1 ? -1 : 1;
  }

  return { spinX: sX,
    spinY: sY,
    pixelX: pX,
    pixelY: pY };
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, a) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = a() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (a),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : e.anchorme = a();
}(undefined, function () {
  "use strict";
  function e(e, a) {
    return a = { exports: {} }, e(a, a.exports), a.exports;
  }var a = e(function (e, a) {
    function n(e) {
      return e || (e = { attributes: [], ips: !0, emails: !0, urls: !0, files: !0, truncate: 1 / 0, defaultProtocol: "http://", list: !1 }), "object" != _typeof(e.attributes) && (e.attributes = []), "boolean" != typeof e.ips && (e.ips = !0), "boolean" != typeof e.emails && (e.emails = !0), "boolean" != typeof e.urls && (e.urls = !0), "boolean" != typeof e.files && (e.files = !0), "boolean" != typeof e.list && (e.list = !1), "string" != typeof e.defaultProtocol && "function" != typeof e.defaultProtocol && (e.defaultProtocol = "http://"), "number" == typeof e.truncate || "object" == _typeof(e.truncate) && null !== e.truncate || (e.truncate = 1 / 0), e;
    }function t(e) {
      return !isNaN(Number(e)) && !(Number(e) > 65535);
    }Object.defineProperty(a, "__esModule", { value: !0 }), a.defaultOptions = n, a.isPort = t;
  }),
      n = e(function (e, a) {
    Object.defineProperty(a, "__esModule", { value: !0 }), a.tlds = ["com", "org", "net", "uk", "gov", "edu", "io", "cc", "co", "aaa", "aarp", "abarth", "abb", "abbott", "abbvie", "abc", "able", "abogado", "abudhabi", "ac", "academy", "accenture", "accountant", "accountants", "aco", "active", "actor", "ad", "adac", "ads", "adult", "ae", "aeg", "aero", "aetna", "af", "afamilycompany", "afl", "africa", "ag", "agakhan", "agency", "ai", "aig", "aigo", "airbus", "airforce", "airtel", "akdn", "al", "alfaromeo", "alibaba", "alipay", "allfinanz", "allstate", "ally", "alsace", "alstom", "am", "americanexpress", "americanfamily", "amex", "amfam", "amica", "amsterdam", "analytics", "android", "anquan", "anz", "ao", "aol", "apartments", "app", "apple", "aq", "aquarelle", "ar", "aramco", "archi", "army", "arpa", "art", "arte", "as", "asda", "asia", "associates", "at", "athleta", "attorney", "au", "auction", "audi", "audible", "audio", "auspost", "author", "auto", "autos", "avianca", "aw", "aws", "ax", "axa", "az", "azure", "ba", "baby", "baidu", "banamex", "bananarepublic", "band", "bank", "bar", "barcelona", "barclaycard", "barclays", "barefoot", "bargains", "baseball", "basketball", "bauhaus", "bayern", "bb", "bbc", "bbt", "bbva", "bcg", "bcn", "bd", "be", "beats", "beauty", "beer", "bentley", "berlin", "best", "bestbuy", "bet", "bf", "bg", "bh", "bharti", "bi", "bible", "bid", "bike", "bing", "bingo", "bio", "biz", "bj", "black", "blackfriday", "blanco", "blockbuster", "blog", "bloomberg", "blue", "bm", "bms", "bmw", "bn", "bnl", "bnpparibas", "bo", "boats", "boehringer", "bofa", "bom", "bond", "boo", "book", "booking", "boots", "bosch", "bostik", "boston", "bot", "boutique", "box", "br", "bradesco", "bridgestone", "broadway", "broker", "brother", "brussels", "bs", "bt", "budapest", "bugatti", "build", "builders", "business", "buy", "buzz", "bv", "bw", "by", "bz", "bzh", "ca", "cab", "cafe", "cal", "call", "calvinklein", "cam", "camera", "camp", "cancerresearch", "canon", "capetown", "capital", "capitalone", "car", "caravan", "cards", "care", "career", "careers", "cars", "cartier", "casa", "case", "caseih", "cash", "casino", "cat", "catering", "catholic", "cba", "cbn", "cbre", "cbs", "cd", "ceb", "center", "ceo", "cern", "cf", "cfa", "cfd", "cg", "ch", "chanel", "channel", "chase", "chat", "cheap", "chintai", "chloe", "christmas", "chrome", "chrysler", "church", "ci", "cipriani", "circle", "cisco", "citadel", "citi", "citic", "city", "cityeats", "ck", "cl", "claims", "cleaning", "click", "clinic", "clinique", "clothing", "cloud", "club", "clubmed", "cm", "cn", "coach", "codes", "coffee", "college", "cologne", "comcast", "commbank", "community", "company", "compare", "computer", "comsec", "condos", "construction", "consulting", "contact", "contractors", "cooking", "cookingchannel", "cool", "coop", "corsica", "country", "coupon", "coupons", "courses", "cr", "credit", "creditcard", "creditunion", "cricket", "crown", "crs", "cruise", "cruises", "csc", "cu", "cuisinella", "cv", "cw", "cx", "cy", "cymru", "cyou", "cz", "dabur", "dad", "dance", "data", "date", "dating", "datsun", "day", "dclk", "dds", "de", "deal", "dealer", "deals", "degree", "delivery", "dell", "deloitte", "delta", "democrat", "dental", "dentist", "desi", "design", "dev", "dhl", "diamonds", "diet", "digital", "direct", "directory", "discount", "discover", "dish", "diy", "dj", "dk", "dm", "dnp", "do", "docs", "doctor", "dodge", "dog", "doha", "domains", "dot", "download", "drive", "dtv", "dubai", "duck", "dunlop", "duns", "dupont", "durban", "dvag", "dvr", "dz", "earth", "eat", "ec", "eco", "edeka", "education", "ee", "eg", "email", "emerck", "energy", "engineer", "engineering", "enterprises", "epost", "epson", "equipment", "er", "ericsson", "erni", "es", "esq", "estate", "esurance", "et", "eu", "eurovision", "eus", "events", "everbank", "exchange", "expert", "exposed", "express", "extraspace", "fage", "fail", "fairwinds", "faith", "family", "fan", "fans", "farm", "farmers", "fashion", "fast", "fedex", "feedback", "ferrari", "ferrero", "fi", "fiat", "fidelity", "fido", "film", "final", "finance", "financial", "fire", "firestone", "firmdale", "fish", "fishing", "fit", "fitness", "fj", "fk", "flickr", "flights", "flir", "florist", "flowers", "fly", "fm", "fo", "foo", "food", "foodnetwork", "football", "ford", "forex", "forsale", "forum", "foundation", "fox", "fr", "free", "fresenius", "frl", "frogans", "frontdoor", "frontier", "ftr", "fujitsu", "fujixerox", "fun", "fund", "furniture", "futbol", "fyi", "ga", "gal", "gallery", "gallo", "gallup", "game", "games", "gap", "garden", "gb", "gbiz", "gd", "gdn", "ge", "gea", "gent", "genting", "george", "gf", "gg", "ggee", "gh", "gi", "gift", "gifts", "gives", "giving", "gl", "glade", "glass", "gle", "global", "globo", "gm", "gmail", "gmbh", "gmo", "gmx", "gn", "godaddy", "gold", "goldpoint", "golf", "goo", "goodhands", "goodyear", "goog", "google", "gop", "got", "gp", "gq", "gr", "grainger", "graphics", "gratis", "green", "gripe", "group", "gs", "gt", "gu", "guardian", "gucci", "guge", "guide", "guitars", "guru", "gw", "gy", "hair", "hamburg", "hangout", "haus", "hbo", "hdfc", "hdfcbank", "health", "healthcare", "help", "helsinki", "here", "hermes", "hgtv", "hiphop", "hisamitsu", "hitachi", "hiv", "hk", "hkt", "hm", "hn", "hockey", "holdings", "holiday", "homedepot", "homegoods", "homes", "homesense", "honda", "honeywell", "horse", "hospital", "host", "hosting", "hot", "hoteles", "hotmail", "house", "how", "hr", "hsbc", "ht", "htc", "hu", "hughes", "hyatt", "hyundai", "ibm", "icbc", "ice", "icu", "id", "ie", "ieee", "ifm", "ikano", "il", "im", "imamat", "imdb", "immo", "immobilien", "in", "industries", "infiniti", "info", "ing", "ink", "institute", "insurance", "insure", "int", "intel", "international", "intuit", "investments", "ipiranga", "iq", "ir", "irish", "is", "iselect", "ismaili", "ist", "istanbul", "it", "itau", "itv", "iveco", "iwc", "jaguar", "java", "jcb", "jcp", "je", "jeep", "jetzt", "jewelry", "jio", "jlc", "jll", "jm", "jmp", "jnj", "jo", "jobs", "joburg", "jot", "joy", "jp", "jpmorgan", "jprs", "juegos", "juniper", "kaufen", "kddi", "ke", "kerryhotels", "kerrylogistics", "kerryproperties", "kfh", "kg", "kh", "ki", "kia", "kim", "kinder", "kindle", "kitchen", "kiwi", "km", "kn", "koeln", "komatsu", "kosher", "kp", "kpmg", "kpn", "kr", "krd", "kred", "kuokgroup", "kw", "ky", "kyoto", "kz", "la", "lacaixa", "ladbrokes", "lamborghini", "lamer", "lancaster", "lancia", "lancome", "land", "landrover", "lanxess", "lasalle", "lat", "latino", "latrobe", "law", "lawyer", "lb", "lc", "lds", "lease", "leclerc", "lefrak", "legal", "lego", "lexus", "lgbt", "li", "liaison", "lidl", "life", "lifeinsurance", "lifestyle", "lighting", "like", "lilly", "limited", "limo", "lincoln", "linde", "link", "lipsy", "live", "living", "lixil", "lk", "loan", "loans", "locker", "locus", "loft", "lol", "london", "lotte", "lotto", "love", "lpl", "lplfinancial", "lr", "ls", "lt", "ltd", "ltda", "lu", "lundbeck", "lupin", "luxe", "luxury", "lv", "ly", "ma", "macys", "madrid", "maif", "maison", "makeup", "man", "management", "mango", "market", "marketing", "markets", "marriott", "marshalls", "maserati", "mattel", "mba", "mc", "mcd", "mcdonalds", "mckinsey", "md", "me", "med", "media", "meet", "melbourne", "meme", "memorial", "men", "menu", "meo", "metlife", "mg", "mh", "miami", "microsoft", "mil", "mini", "mint", "mit", "mitsubishi", "mk", "ml", "mlb", "mls", "mm", "mma", "mn", "mo", "mobi", "mobile", "mobily", "moda", "moe", "moi", "mom", "monash", "money", "monster", "montblanc", "mopar", "mormon", "mortgage", "moscow", "moto", "motorcycles", "mov", "movie", "movistar", "mp", "mq", "mr", "ms", "msd", "mt", "mtn", "mtpc", "mtr", "mu", "museum", "mutual", "mv", "mw", "mx", "my", "mz", "na", "nab", "nadex", "nagoya", "name", "nationwide", "natura", "navy", "nba", "nc", "ne", "nec", "netbank", "netflix", "network", "neustar", "new", "newholland", "news", "next", "nextdirect", "nexus", "nf", "nfl", "ng", "ngo", "nhk", "ni", "nico", "nike", "nikon", "ninja", "nissan", "nissay", "nl", "no", "nokia", "northwesternmutual", "norton", "now", "nowruz", "nowtv", "np", "nr", "nra", "nrw", "ntt", "nu", "nyc", "nz", "obi", "observer", "off", "office", "okinawa", "olayan", "olayangroup", "oldnavy", "ollo", "om", "omega", "one", "ong", "onl", "online", "onyourside", "ooo", "open", "oracle", "orange", "organic", "orientexpress", "origins", "osaka", "otsuka", "ott", "ovh", "pa", "page", "pamperedchef", "panasonic", "panerai", "paris", "pars", "partners", "parts", "party", "passagens", "pay", "pccw", "pe", "pet", "pf", "pfizer", "pg", "ph", "pharmacy", "philips", "phone", "photo", "photography", "photos", "physio", "piaget", "pics", "pictet", "pictures", "pid", "pin", "ping", "pink", "pioneer", "pizza", "pk", "pl", "place", "play", "playstation", "plumbing", "plus", "pm", "pn", "pnc", "pohl", "poker", "politie", "porn", "post", "pr", "pramerica", "praxi", "press", "prime", "pro", "prod", "productions", "prof", "progressive", "promo", "properties", "property", "protection", "pru", "prudential", "ps", "pt", "pub", "pw", "pwc", "py", "qa", "qpon", "quebec", "quest", "qvc", "racing", "radio", "raid", "re", "read", "realestate", "realtor", "realty", "recipes", "red", "redstone", "redumbrella", "rehab", "reise", "reisen", "reit", "reliance", "ren", "rent", "rentals", "repair", "report", "republican", "rest", "restaurant", "review", "reviews", "rexroth", "rich", "richardli", "ricoh", "rightathome", "ril", "rio", "rip", "rmit", "ro", "rocher", "rocks", "rodeo", "rogers", "room", "rs", "rsvp", "ru", "ruhr", "run", "rw", "rwe", "ryukyu", "sa", "saarland", "safe", "safety", "sakura", "sale", "salon", "samsclub", "samsung", "sandvik", "sandvikcoromant", "sanofi", "sap", "sapo", "sarl", "sas", "save", "saxo", "sb", "sbi", "sbs", "sc", "sca", "scb", "schaeffler", "schmidt", "scholarships", "school", "schule", "schwarz", "science", "scjohnson", "scor", "scot", "sd", "se", "seat", "secure", "security", "seek", "select", "sener", "services", "ses", "seven", "sew", "sex", "sexy", "sfr", "sg", "sh", "shangrila", "sharp", "shaw", "shell", "shia", "shiksha", "shoes", "shop", "shopping", "shouji", "show", "showtime", "shriram", "si", "silk", "sina", "singles", "site", "sj", "sk", "ski", "skin", "sky", "skype", "sl", "sling", "sm", "smart", "smile", "sn", "sncf", "so", "soccer", "social", "softbank", "software", "sohu", "solar", "solutions", "song", "sony", "soy", "space", "spiegel", "spot", "spreadbetting", "sr", "srl", "srt", "st", "stada", "staples", "star", "starhub", "statebank", "statefarm", "statoil", "stc", "stcgroup", "stockholm", "storage", "store", "stream", "studio", "study", "style", "su", "sucks", "supplies", "supply", "support", "surf", "surgery", "suzuki", "sv", "swatch", "swiftcover", "swiss", "sx", "sy", "sydney", "symantec", "systems", "sz", "tab", "taipei", "talk", "taobao", "target", "tatamotors", "tatar", "tattoo", "tax", "taxi", "tc", "tci", "td", "tdk", "team", "tech", "technology", "tel", "telecity", "telefonica", "temasek", "tennis", "teva", "tf", "tg", "th", "thd", "theater", "theatre", "tiaa", "tickets", "tienda", "tiffany", "tips", "tires", "tirol", "tj", "tjmaxx", "tjx", "tk", "tkmaxx", "tl", "tm", "tmall", "tn", "to", "today", "tokyo", "tools", "top", "toray", "toshiba", "total", "tours", "town", "toyota", "toys", "tr", "trade", "trading", "training", "travel", "travelchannel", "travelers", "travelersinsurance", "trust", "trv", "tt", "tube", "tui", "tunes", "tushu", "tv", "tvs", "tw", "tz", "ua", "ubank", "ubs", "uconnect", "ug", "unicom", "university", "uno", "uol", "ups", "us", "uy", "uz", "va", "vacations", "vana", "vanguard", "vc", "ve", "vegas", "ventures", "verisign", "versicherung", "vet", "vg", "vi", "viajes", "video", "vig", "viking", "villas", "vin", "vip", "virgin", "visa", "vision", "vista", "vistaprint", "viva", "vivo", "vlaanderen", "vn", "vodka", "volkswagen", "volvo", "vote", "voting", "voto", "voyage", "vu", "vuelos", "wales", "walmart", "walter", "wang", "wanggou", "warman", "watch", "watches", "weather", "weatherchannel", "webcam", "weber", "website", "wed", "wedding", "weibo", "weir", "wf", "whoswho", "wien", "wiki", "williamhill", "win", "windows", "wine", "winners", "wme", "wolterskluwer", "woodside", "work", "works", "world", "wow", "ws", "wtc", "wtf", "xbox", "xerox", "xfinity", "xihuan", "xin", "xn--11b4c3d", "xn--1ck2e1b", "xn--1qqw23a", "xn--30rr7y", "xn--3bst00m", "xn--3ds443g", "xn--3e0b707e", "xn--3oq18vl8pn36a", "xn--3pxu8k", "xn--42c2d9a", "xn--45brj9c", "xn--45q11c", "xn--4gbrim", "xn--54b7fta0cc", "xn--55qw42g", "xn--55qx5d", "xn--5su34j936bgsg", "xn--5tzm5g", "xn--6frz82g", "xn--6qq986b3xl", "xn--80adxhks", "xn--80ao21a", "xn--80aqecdr1a", "xn--80asehdb", "xn--80aswg", "xn--8y0a063a", "xn--90a3ac", "xn--90ae", "xn--90ais", "xn--9dbq2a", "xn--9et52u", "xn--9krt00a", "xn--b4w605ferd", "xn--bck1b9a5dre4c", "xn--c1avg", "xn--c2br7g", "xn--cck2b3b", "xn--cg4bki", "xn--clchc0ea0b2g2a9gcd", "xn--czr694b", "xn--czrs0t", "xn--czru2d", "xn--d1acj3b", "xn--d1alf", "xn--e1a4c", "xn--eckvdtc9d", "xn--efvy88h", "xn--estv75g", "xn--fct429k", "xn--fhbei", "xn--fiq228c5hs", "xn--fiq64b", "xn--fiqs8s", "xn--fiqz9s", "xn--fjq720a", "xn--flw351e", "xn--fpcrj9c3d", "xn--fzc2c9e2c", "xn--fzys8d69uvgm", "xn--g2xx48c", "xn--gckr3f0f", "xn--gecrj9c", "xn--gk3at1e", "xn--h2brj9c", "xn--hxt814e", "xn--i1b6b1a6a2e", "xn--imr513n", "xn--io0a7i", "xn--j1aef", "xn--j1amh", "xn--j6w193g", "xn--jlq61u9w7b", "xn--jvr189m", "xn--kcrx77d1x4a", "xn--kprw13d", "xn--kpry57d", "xn--kpu716f", "xn--kput3i", "xn--l1acc", "xn--lgbbat1ad8j", "xn--mgb9awbf", "xn--mgba3a3ejt", "xn--mgba3a4f16a", "xn--mgba7c0bbn0a", "xn--mgbaam7a8h", "xn--mgbab2bd", "xn--mgbai9azgqp6j", "xn--mgbayh7gpa", "xn--mgbb9fbpob", "xn--mgbbh1a71e", "xn--mgbc0a9azcg", "xn--mgbca7dzdo", "xn--mgberp4a5d4ar", "xn--mgbi4ecexp", "xn--mgbpl2fh", "xn--mgbt3dhd", "xn--mgbtx2b", "xn--mgbx4cd0ab", "xn--mix891f", "xn--mk1bu44c", "xn--mxtq1m", "xn--ngbc5azd", "xn--ngbe9e0a", "xn--node", "xn--nqv7f", "xn--nqv7fs00ema", "xn--nyqy26a", "xn--o3cw4h", "xn--ogbpf8fl", "xn--p1acf", "xn--p1ai", "xn--pbt977c", "xn--pgbs0dh", "xn--pssy2u", "xn--q9jyb4c", "xn--qcka1pmc", "xn--qxam", "xn--rhqv96g", "xn--rovu88b", "xn--s9brj9c", "xn--ses554g", "xn--t60b56a", "xn--tckwe", "xn--tiq49xqyj", "xn--unup4y", "xn--vermgensberater-ctb", "xn--vermgensberatung-pwb", "xn--vhquv", "xn--vuq861b", "xn--w4r85el8fhu5dnra", "xn--w4rs40l", "xn--wgbh1c", "xn--wgbl6a", "xn--xhq521b", "xn--xkc2al3hye2a", "xn--xkc2dl3a5ee0h", "xn--y9a3aq", "xn--yfro4i67o", "xn--ygbi2ammx", "xn--zfr164b", "xperia", "xxx", "xyz", "yachts", "yahoo", "yamaxun", "yandex", "ye", "yodobashi", "yoga", "yokohama", "you", "youtube", "yt", "yun", "za", "zappos", "zara", "zero", "zip", "zippo", "zm", "zone", "zuerich", "zw"], a.htmlAttrs = ["src=", "data=", "href=", "cite=", "formaction=", "icon=", "manifest=", "poster=", "codebase=", "background=", "profile=", "usemap="];
  }),
      t = e(function (e, a) {
    function t(e) {
      var a = e.match(o);if (null === a) return !1;for (var t = r.length - 1; t >= 0; t--) {
        if (r[t].test(e)) return !1;
      }var i = a[2];return !!i && -1 !== n.tlds.indexOf(i);
    }Object.defineProperty(a, "__esModule", { value: !0 });var o = /^[a-z0-9!#$%&'*+\-\/=?^_`{|}~.]+@([a-z0-9%\-]+\.){1,}([a-z0-9\-]+)?$/i,
        r = [/^[!#$%&'*+\-\/=?^_`{|}~.]/, /[.]{2,}[a-z0-9!#$%&'*+\-\/=?^_`{|}~.]+@/i, /\.@/];a.default = t;
  }),
      o = e(function (e, n) {
    function t(e) {
      if (!o.test(e)) return !1;var n = e.split("."),
          t = Number(n[0]);if (isNaN(t) || t > 255 || t < 0) return !1;var r = Number(n[1]);if (isNaN(r) || r > 255 || r < 0) return !1;var i = Number(n[2]);if (isNaN(i) || i > 255 || i < 0) return !1;var s = Number((n[3].match(/^\d+/) || [])[0]);if (isNaN(s) || s > 255 || s < 0) return !1;var c = (n[3].match(/(^\d+)(:)(\d+)/) || [])[3];return !(c && !a.isPort(c));
    }Object.defineProperty(n, "__esModule", { value: !0 });var o = /^(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?(\/([a-z0-9\-._~:\/\?#\[\]@!$&'\(\)\*\+,;=%]+)?)?$/i;n.default = t;
  }),
      r = e(function (e, t) {
    function o(e) {
      var t = e.match(r);return null !== t && "string" == typeof t[3] && -1 !== n.tlds.indexOf(t[3].toLowerCase()) && !(t[5] && !a.isPort(t[5]));
    }Object.defineProperty(t, "__esModule", { value: !0 });var r = /^(https?:\/\/|ftps?:\/\/)?([a-z0-9%\-]+\.){1,}([a-z0-9\-]+)?(:(\d{1,5}))?(\/([a-z0-9\-._~:\/\?#\[\]@!$&'\(\)\*\+,;=%]+)?)?$/i;t.default = o;
  }),
      i = e(function (e, a) {
    function n(e, a, t) {
      return e.forEach(function (o, r) {
        !(o.indexOf(".") > -1) || e[r - 1] === a && e[r + 1] === t || e[r + 1] !== a && e[r + 1] !== t || (e[r] = e[r] + e[r + 1], "string" == typeof e[r + 2] && (e[r] = e[r] + e[r + 2]), "string" == typeof e[r + 3] && (e[r] = e[r] + e[r + 3]), "string" == typeof e[r + 4] && (e[r] = e[r] + e[r + 4]), e.splice(r + 1, 4), n(e, a, t));
      }), e;
    }function t(e) {
      return e = n(e, "(", ")"), e = n(e, "[", "]"), e = n(e, '"', '"'), e = n(e, "'", "'");
    }Object.defineProperty(a, "__esModule", { value: !0 }), a.fixSeparators = n, a.default = t;
  }),
      s = e(function (e, a) {
    function n(e) {
      var a = e.replace(/([\s\(\)\[\]<>"'])/g, "\0$1\0").replace(/([?;:,.!]+)(?=(\0|$|\s))/g, "\0$1\0").split("\0");return i.default(a);
    }function t(e) {
      return e.join("");
    }Object.defineProperty(a, "__esModule", { value: !0 }), a.separate = n, a.deSeparate = t;
  }),
      c = e(function (e, a) {
    function n(e) {
      return e = e.toLowerCase(), 0 === e.indexOf("http://") ? "http://" : 0 === e.indexOf("https://") ? "https://" : 0 === e.indexOf("ftp://") ? "ftp://" : 0 === e.indexOf("ftps://") ? "ftps://" : 0 === e.indexOf("file:///") ? "file:///" : 0 === e.indexOf("mailto:") && "mailto:";
    }Object.defineProperty(a, "__esModule", { value: !0 }), a.default = n;
  }),
      l = e(function (e, a) {
    function i(e, a) {
      return e.map(function (i, s) {
        var l = encodeURI(i);if (l.indexOf(".") < 1 && !c.default(l)) return i;var u = null,
            d = c.default(l) || "";return d && (l = l.substr(d.length)), a.files && "file:///" === d && l.split(/\/|\\/).length - 1 && (u = { reason: "file", protocol: d, raw: i, encoded: l }), !u && a.urls && r.default(l) && (u = { reason: "url", protocol: d || ("function" == typeof a.defaultProtocol ? a.defaultProtocol(i) : a.defaultProtocol), raw: i, encoded: l }), !u && a.emails && t.default(l) && (u = { reason: "email", protocol: "mailto:", raw: i, encoded: l }), !u && a.ips && o.default(l) && (u = { reason: "ip", protocol: d || ("function" == typeof a.defaultProtocol ? a.defaultProtocol(i) : a.defaultProtocol), raw: i, encoded: l }), u && ("'" !== e[s - 1] && '"' !== e[s - 1] || !~n.htmlAttrs.indexOf(e[s - 2])) ? u : i;
      });
    }Object.defineProperty(a, "__esModule", { value: !0 }), a.default = i;
  }),
      u = e(function (e, a) {
    function n(e, a) {
      var n = o.separate(e),
          r = l.default(n, a);if (a.exclude) for (var i = 0; i < r.length; i++) {
        var c = r[i];"object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) && a.exclude(c) && (r[i] = c.raw);
      }if (a.list) {
        for (var u = [], d = 0; d < r.length; d++) {
          var b = r[d];"string" != typeof b && u.push(b);
        }return u;
      }return r = r.map(function (e) {
        return "string" == typeof e ? e : t(e, a);
      }), s.deSeparate(r);
    }function t(e, a) {
      var n = e.protocol + e.encoded,
          t = e.raw;return "number" == typeof a.truncate && t.length > a.truncate && (t = t.substring(0, a.truncate) + "..."), "object" == _typeof(a.truncate) && t.length > a.truncate[0] + a.truncate[1] && (t = t.substr(0, a.truncate[0]) + "..." + t.substr(t.length - a.truncate[1])), void 0 === a.attributes && (a.attributes = []), '<a href="' + n + '" ' + a.attributes.map(function (a) {
        if ("function" != typeof a) return " " + a.name + '="' + a.value + '" ';var n = (a(e) || {}).name,
            t = (a(e) || {}).value;return n && !t ? " name " : n && t ? " " + n + '="' + t + '" ' : void 0;
      }).join("") + ">" + t + "</a>";
    }Object.defineProperty(a, "__esModule", { value: !0 });var o = s;a.default = n;
  }),
      d = e(function (e, n) {
    Object.defineProperty(n, "__esModule", { value: !0 });var i = function i(e, n) {
      return n = a.defaultOptions(n), u.default(e, n);
    };i.validate = { ip: o.default, url: function url(e) {
        var a = c.default(e) || "";return e = e.substr(a.length), e = encodeURI(e), r.default(e);
      }, email: t.default }, n.default = i;
  });return function (e) {
    return e && e.__esModule ? e.default : e;
  }(d);
});

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/toolset.png";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/unloaded.png";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Lerp = __webpack_require__(14);

var _color = __webpack_require__(4);

var _main = __webpack_require__(3);

var _Fx = __webpack_require__(7);

var _tools = __webpack_require__(10);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = exports.Player = function () {
    function Player(x, y, rgb, tool, id) {
        _classCallCheck(this, Player);

        this.id = id.toString(); /* Prevents calling .toString every frame */
        this._x = new _Lerp.Lerp(x, x, 65);
        this._y = new _Lerp.Lerp(y, y, 65);

        this.tool = _tools.tools[tool] || _tools.tools['cursor'];
        this.fx = new _Fx.Fx(tool ? tool.fxType : _Fx.PLAYERFX.NONE, { player: this });
        this.fx.setVisible(_main.misc.world.validMousePos(Math.floor(this.endX / 16), Math.floor(this.endY / 16)));

        this.rgb = rgb;
        this.htmlRgb = _color.colorUtils.toHTML(_color.colorUtils.u24_888(rgb[0], rgb[1], rgb[2]));

        this.clr = ((id + 75387) * 67283 + 53143) % 256 << 16 | ((id + 9283) * 4673 + 7483) % 256 << 8 | id * 3000 % 256;
        this.clr = _color.colorUtils.toHTML(this.clr);

        var playerListEntry = document.createElement("tr");
        playerListEntry.innerHTML = "<td>" + this.id + "</td><td>" + Math.floor(x / 16) + "</td><td>" + Math.floor(y / 16) + "</td>";
        _main.playerList[this.id] = playerListEntry;
        _main.playerListTable.appendChild(playerListEntry);
    }

    _createClass(Player, [{
        key: 'update',
        value: function update(x, y, rgb, tool) {
            this._x.val = x;
            this._y.val = y;
            /* TODO: fix weird bug (caused by connecting before tools initialized?) */
            //console.log(tool)
            this.tool = _tools.tools[tool] || _tools.tools['cursor'];
            this.fx.setRenderer((this.tool || {}).fxRenderer); // temp until fix: || {}
            this.fx.setVisible(_main.misc.world.validMousePos(Math.floor(this.endX / 16), Math.floor(this.endY / 16)));
            this.rgb = rgb;
            this.htmlRgb = _color.colorUtils.toHTML(_color.colorUtils.u24_888(rgb[0], rgb[1], rgb[2]));

            _main.playerList[this.id].childNodes[1].innerHTML = Math.floor(x / 16);
            _main.playerList[this.id].childNodes[2].innerHTML = Math.floor(y / 16);
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            this.fx.delete();

            _main.playerListTable.removeChild(_main.playerList[this.id]);
            delete _main.playerList[this.id];
        }
    }, {
        key: 'tileX',
        get: function get() {
            return Math.floor(this.x / 16);
        }
    }, {
        key: 'tileY',
        get: function get() {
            return Math.floor(this.y / 16);
        }
    }, {
        key: 'endX',
        get: function get() {
            return this._x.end;
        }
    }, {
        key: 'endY',
        get: function get() {
            return this._y.end;
        }
    }, {
        key: 'x',
        get: function get() {
            return this._x.val;
        }
    }, {
        key: 'y',
        get: function get() {
            return this._y.val;
        }
    }]);

    return Player;
}();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.definedProtos = undefined;
exports.resolveProtocols = resolveProtocols;

var _old = __webpack_require__(22);

var _conf = __webpack_require__(1);

var definedProtos = exports.definedProtos = {
	'old': _old.OldProtocol
};

function resolveProtocols() {
	for (var i = 0; i < _conf.options.serverAddress.length; i++) {
		var server = _conf.options.serverAddress[i];
		server.proto = definedProtos[server.proto];
	}
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.OldProtocol = exports.captchaState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _placeBucket, _maxMessageLength;

var _Protocol2 = __webpack_require__(23);

var _conf = __webpack_require__(1);

var _global = __webpack_require__(0);

var _World = __webpack_require__(12);

var _Bucket = __webpack_require__(9);

var _misc = __webpack_require__(2);

var _captcha = __webpack_require__(24);

var _color = __webpack_require__(4);

var _local_player = __webpack_require__(6);

var _canvas_renderer = __webpack_require__(5);

var _main = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var captchaState = exports.captchaState = {
	CA_WAITING: 0,
	CA_VERIFYING: 1,
	CA_VERIFIED: 2,
	CA_OK: 3,
	CA_INVALID: 4
};

var OldProtocol = exports.OldProtocol = {
	class: null,
	chunkSize: 16,
	netUpdateSpeed: 20,
	clusterChunkAmount: 64,
	maxWorldNameLength: 24,
	worldBorder: 0xFFFFF,
	chatBucket: [4, 6],
	placeBucket: (_placeBucket = {}, _defineProperty(_placeBucket, _conf.RANK.NONE, [0, 1]), _defineProperty(_placeBucket, _conf.RANK.USER, [32, 4]), _defineProperty(_placeBucket, _conf.RANK.MODERATOR, [32, 2]), _defineProperty(_placeBucket, _conf.RANK.ADMIN, [32, 0]), _placeBucket),
	maxMessageLength: (_maxMessageLength = {}, _defineProperty(_maxMessageLength, _conf.RANK.NONE, 128), _defineProperty(_maxMessageLength, _conf.RANK.USER, 128), _defineProperty(_maxMessageLength, _conf.RANK.MODERATOR, 512), _defineProperty(_maxMessageLength, _conf.RANK.ADMIN, 16384), _maxMessageLength),
	tools: {
		id: {}, /* Generated automatically */
		0: 'cursor',
		1: 'move',
		2: 'pipette',
		3: 'eraser',
		4: 'zoom',
		5: 'fill',
		6: 'paste',
		7: 'export',
		8: 'line',
		9: 'protect'
	},
	misc: {
		worldVerification: 1234,
		chatVerification: String.fromCharCode(10),
		tokenVerification: 'CaptchA'
	},
	opCode: {
		client: {},
		server: {
			setId: 0,
			worldUpdate: 1,
			chunkLoad: 2,
			teleport: 3,
			setRank: 4,
			captcha: 5,
			setPQuota: 6,
			chunkProtected: 7
		}
	}
};

for (var id in OldProtocol.tools) {
	if (+id >= 0) {
		OldProtocol.tools.id[OldProtocol.tools[id]] = +id;
	}
}

function stoi(string, max) {
	var ints = [];
	var fstring = "";
	string = string.toLowerCase();
	for (var i = 0; i < string.length && i < max; i++) {
		var charCode = string.charCodeAt(i);
		if (charCode < 123 && charCode > 96 || charCode < 58 && charCode > 47 || charCode == 95 || charCode == 46) {
			fstring += String.fromCharCode(charCode);
			ints.push(charCode);
		}
	}
	return [ints, fstring];
}

var OldProtocolImpl = function (_Protocol) {
	_inherits(OldProtocolImpl, _Protocol);

	function OldProtocolImpl(ws, worldName) {
		_classCallCheck(this, OldProtocolImpl);

		var _this = _possibleConstructorReturn(this, (OldProtocolImpl.__proto__ || Object.getPrototypeOf(OldProtocolImpl)).call(this, ws));

		_get(OldProtocolImpl.prototype.__proto__ || Object.getPrototypeOf(OldProtocolImpl.prototype), 'hookEvents', _this).call(_this, _this);
		_this.lastSentX = 0;
		_this.lastSentY = 0;
		_this.playercount = 1;
		_this.worldName = worldName ? worldName : _conf.options.defaultWorld;
		_this.players = {};
		_this.chunksLoading = {}; /* duplicate */
		_this.waitingForChunks = 0;
		_this.id = null;

		var params = OldProtocol.chatBucket;
		_this.chatBucket = new _Bucket.Bucket(params[0], params[1]);
		params = OldProtocol.placeBucket[_local_player.player.rank];
		_this.placeBucket = new _Bucket.Bucket(params[0], params[1]);

		_this.interval = null;

		_this.joinFunc = function () {
			_this.interval = setInterval(function () {
				return _this.sendUpdates();
			}, 1000 / OldProtocol.netUpdateSpeed);
		};

		var rankChanged = function rankChanged(rank) {
			_this.placeBucket.infinite = rank === _conf.RANK.ADMIN;
			_main.elements.chatInput.maxLength = OldProtocol.maxMessageLength[rank];
		};
		_this.leaveFunc = function () {
			_global.eventSys.removeListener(_conf.EVENTS.net.sec.rank, rankChanged);
		};
		_global.eventSys.once(_conf.EVENTS.net.world.join, _this.joinFunc);
		_global.eventSys.on(_conf.EVENTS.net.sec.rank, rankChanged);
		return _this;
	}

	_createClass(OldProtocolImpl, [{
		key: 'closeHandler',
		value: function closeHandler() {
			_get(OldProtocolImpl.prototype.__proto__ || Object.getPrototypeOf(OldProtocolImpl.prototype), 'closeHandler', this).call(this);
			clearInterval(this.interval);
			_global.eventSys.emit(_conf.EVENTS.net.sec.rank, _conf.RANK.NONE);
			_global.eventSys.removeListener(_conf.EVENTS.net.world.join, this.joinFunc);
			this.leaveFunc();
		}
	}, {
		key: 'messageHandler',
		value: function messageHandler(message) {
			var _this2 = this;

			message = message.data;
			if (typeof message === "string") {
				if (message.indexOf("DEV") == 0) {
					_global.eventSys.emit(_conf.EVENTS.net.devChat, message.slice(3));
				} else {
					_global.eventSys.emit(_conf.EVENTS.net.chat, message);
				}
				return;
			}

			var dv = new DataView(message);
			var oc = OldProtocol.opCode.server;
			switch (dv.getUint8(0)) {
				case oc.setId:
					// Get id
					var _id = dv.getUint32(1, true);
					this.id = _id;
					_global.eventSys.emit(_conf.EVENTS.net.world.join, this.worldName);
					_global.eventSys.emit(_conf.EVENTS.net.world.setId, _id);
					_global.eventSys.emit(_conf.EVENTS.net.playerCount, this.playercount);
					_global.eventSys.emit(_conf.EVENTS.net.chat, "[Server] Joined world: \"" + this.worldName + "\", your ID is: " + _id + "!");
					break;

				case oc.worldUpdate:
					// Get all cursors, tile updates, disconnects
					var shouldrender = 0;
					// Cursors
					var updated = false;
					var updates = {};
					for (var i = dv.getUint8(1); i--;) {
						updated = true;
						var pid = dv.getUint32(2 + i * 16, true);
						if (pid === this.id) {
							continue;
						}
						var pmx = dv.getInt32(2 + i * 16 + 4, true);
						var pmy = dv.getInt32(2 + i * 16 + 8, true);
						var pr = dv.getUint8(2 + i * 16 + 12);
						var pg = dv.getUint8(2 + i * 16 + 13);
						var pb = dv.getUint8(2 + i * 16 + 14);
						var ptool = dv.getUint8(2 + i * 16 + 15);
						updates[pid] = {
							x: pmx,
							y: pmy,
							rgb: [pr, pg, pb],
							tool: OldProtocol.tools[ptool]
						};
						if (!this.players[pid]) {
							++this.playercount;
							_global.eventSys.emit(_conf.EVENTS.net.playerCount, this.playercount);
							this.players[pid] = true;
						}
					}
					if (updated) {
						_global.eventSys.emit(_conf.EVENTS.net.world.playersMoved, updates);
					}
					var off = 2 + dv.getUint8(1) * 16;
					// Tile updates
					updated = false;
					updates = [];
					for (var i = dv.getUint16(off, true), j = 0; j < i; j++) {
						updated = true;
						var bpx = dv.getInt32(2 + off + j * 11, true);
						var bpy = dv.getInt32(2 + off + j * 11 + 4, true);
						var br = dv.getUint8(2 + off + j * 11 + 8);
						var bg = dv.getUint8(2 + off + j * 11 + 9);
						var bb = dv.getUint8(2 + off + j * 11 + 10);
						var bbgr = bb << 16 | bg << 8 | br;
						updates.push({
							x: bpx,
							y: bpy,
							rgb: bbgr
						});
					}
					if (updated) {
						_global.eventSys.emit(_conf.EVENTS.net.world.tilesUpdated, updates);
					}
					off += dv.getUint16(off, true) * 11 + 2;
					// Disconnects
					var decreased = false;
					updated = false;
					updates = [];
					for (var k = dv.getUint8(off); k--;) {
						updated = true;
						var dpid = dv.getUint32(1 + off + k * 4, true);
						updates.push(dpid);
						if (this.players[dpid] && this.playercount > 1) {
							decreased = true;
							--this.playercount;
							delete this.players[dpid];
						}
					}
					if (updated) {
						_global.eventSys.emit(_conf.EVENTS.net.world.playersLeft, updates);
						if (decreased) {
							_global.eventSys.emit(_conf.EVENTS.net.playerCount, this.playercount);
						}
					}
					break;

				case oc.chunkLoad:
					// Get chunk
					var chunkX = dv.getInt32(1, true);
					var chunkY = dv.getInt32(5, true);
					var locked = dv.getUint8(9);
					var u8data = new Uint8Array(message, 10, message.byteLength - 10);
					//console.log(u8data);
					u8data = (0, _misc.decompress)(u8data);
					var key = chunkX + ',' + chunkY;
					var u32data = new Uint32Array(OldProtocol.chunkSize * OldProtocol.chunkSize);
					for (var i = 0, u = 0; i < u8data.length; i += 3) {
						/* Need to make a copy ;-; */
						var color = u8data[i + 2] << 16 | u8data[i + 1] << 8 | u8data[i];
						u32data[u++] = 0xFF000000 | color;
					}
					if (!this.chunksLoading[key]) {
						_global.eventSys.emit(_conf.EVENTS.net.chunk.set, chunkX, chunkY, u32data);
					} else {
						delete this.chunksLoading[key];
						this.waitingForChunks--;
						var chunk = new _World.Chunk(chunkX, chunkY, u32data, locked);
						_global.eventSys.emit(_conf.EVENTS.net.chunk.load, chunk);
					}
					break;

				case oc.teleport:
					// Teleport
					var x = dv.getInt32(1, true);
					var y = dv.getInt32(5, true);
					_global.eventSys.emit(_conf.EVENTS.net.world.teleported, x, y);
					break;

				case oc.setRank:
					// new rank
					_local_player.networkRankVerification[0] = dv.getUint8(1);
					_global.eventSys.emit(_conf.EVENTS.net.sec.rank, dv.getUint8(1));
					break;

				case oc.captcha:
					// Captcha
					switch (dv.getUint8(1)) {
						case captchaState.CA_WAITING:
							(0, _captcha.loadAndRequestCaptcha)();
							_global.eventSys.once(_conf.EVENTS.misc.captchaToken, function (token) {
								var message = OldProtocol.misc.tokenVerification + token;
								_this2.ws.send(message);
							});
							break;

						case captchaState.CA_OK:
							this.worldName = this.joinWorld(this.worldName);
							break;
					}
					break;

				case oc.setPQuota:
					var rate = dv.getUint16(1, true);
					var per = dv.getUint16(3, true);
					this.placeBucket = new _Bucket.Bucket(rate, per);
					break;

				case oc.chunkProtected:
					var cx = dv.getInt32(1, true);
					var cy = dv.getInt32(5, true);
					var newState = dv.getUint8(9);
					_global.eventSys.emit(_conf.EVENTS.net.chunk.lock, cx, cy, newState);
					break;
			}
		}
	}, {
		key: 'joinWorld',
		value: function joinWorld(name) {
			var nstr = stoi(name, OldProtocol.maxWorldNameLength);
			_global.eventSys.emit(_conf.EVENTS.net.world.joining, name);
			var array = new ArrayBuffer(nstr[0].length + 2);
			var dv = new DataView(array);
			for (var i = nstr[0].length; i--;) {
				dv.setUint8(i, nstr[0][i]);
			}
			dv.setUint16(nstr[0].length, OldProtocol.misc.worldVerification, true);
			this.ws.send(array);
			return nstr[1];
		}
	}, {
		key: 'requestChunk',
		value: function requestChunk(x, y) {
			var wb = OldProtocol.worldBorder;
			var key = x + ',' + y;
			if (x > wb || y > wb || x < ~wb || y < ~wb || this.chunksLoading[key]) {
				return;
			}
			this.chunksLoading[key] = true;
			this.waitingForChunks++;
			var array = new ArrayBuffer(8);
			var dv = new DataView(array);
			dv.setInt32(0, x, true);
			dv.setInt32(4, y, true);
			this.ws.send(array);
		}
	}, {
		key: 'allChunksLoaded',
		value: function allChunksLoaded() {
			return this.waitingForChunks === 0;
		}
	}, {
		key: 'updatePixel',
		value: function updatePixel(x, y, rgb) {
			var distx = Math.trunc(x / OldProtocol.chunkSize) - Math.trunc(this.lastSentX / (OldProtocol.chunkSize * 16));distx *= distx;
			var disty = Math.trunc(y / OldProtocol.chunkSize) - Math.trunc(this.lastSentY / (OldProtocol.chunkSize * 16));disty *= disty;
			var dist = Math.sqrt(distx + disty);
			if (this.isConnected() && (dist < 3 || _local_player.player.rank == _conf.RANK.ADMIN) && this.placeBucket.canSpend(1)) {
				var array = new ArrayBuffer(11);
				var dv = new DataView(array);
				dv.setInt32(0, x, true);
				dv.setInt32(4, y, true);
				dv.setUint8(8, rgb[0]);
				dv.setUint8(9, rgb[1]);
				dv.setUint8(10, rgb[2]);
				this.ws.send(array);
				return true;
			}
			return false;
		}
	}, {
		key: 'sendUpdates',
		value: function sendUpdates() {
			var worldx = _main.mouse.worldX;
			var worldy = _main.mouse.worldY;
			var lastx = this.lastSentX;
			var lasty = this.lastSentY;
			if (this.isConnected() && (0, _local_player.shouldUpdate)() || worldx != lastx || worldy != lasty) {
				var selrgb = _local_player.player.selectedColor;
				this.lastSentX = worldx;
				this.lastSentY = worldy;
				// Send mouse position
				var array = new ArrayBuffer(12);
				var dv = new DataView(array);
				dv.setInt32(0, worldx, true);
				dv.setInt32(4, worldy, true);
				dv.setUint8(8, selrgb[0]);
				dv.setUint8(9, selrgb[1]);
				dv.setUint8(10, selrgb[2]);
				var tool = _local_player.player.tool;
				var toolId = tool !== null ? +OldProtocol.tools.id[tool.id] : 0;
				dv.setUint8(11, toolId);
				this.ws.send(array);
			}
		}
	}, {
		key: 'sendMessage',
		value: function sendMessage(str) {
			if (str.length && this.id !== null) {
				if (_local_player.player.rank == _conf.RANK.ADMIN || this.chatBucket.canSpend(1)) {
					this.ws.send(str + OldProtocol.misc.chatVerification);
					return true;
				} else {
					_global.eventSys.emit(_conf.EVENTS.net.chat, "Slow down! You're talking too fast!");
					return false;
				}
			}
		}
	}, {
		key: 'protectChunk',
		value: function protectChunk(x, y, newState) {
			var array = new ArrayBuffer(10);
			var dv = new DataView(array);
			dv.setInt32(0, x, true);
			dv.setInt32(4, y, true);
			dv.setUint8(8, newState);
			this.ws.send(array);
			_global.eventSys.emit(_conf.EVENTS.net.chunk.lock, x, y, newState, true);
		}
	}, {
		key: 'setChunk',
		value: function setChunk(x, y, data) {
			var buf = new Uint8Array(8 + OldProtocol.chunkSize * OldProtocol.chunkSize * 3);
			var dv = new DataView(buf.buffer);
			dv.setInt32(0, x, true);
			dv.setInt32(4, y, true);
			for (var i = 0, b = 8; i < data.length; i++, b += 3) {
				buf[b] = data[i] & 0xFF;
				buf[b + 1] = data[i] >> 8 & 0xFF;
				buf[b + 2] = data[i] >> 16 & 0xFF;
			}
			this.ws.send(buf.buffer);
		}
	}, {
		key: 'clearChunk',
		value: function clearChunk(x, y) {
			var array = new ArrayBuffer(9);
			var dv = new DataView(array);
			dv.setInt32(0, x, true);
			dv.setInt32(4, y, true);
			this.ws.send(array);
		}
	}]);

	return OldProtocolImpl;
}(_Protocol2.Protocol);

OldProtocol.class = OldProtocolImpl;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Protocol = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conf = __webpack_require__(1);

var _global = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Protocol = exports.Protocol = function () {
    function Protocol(ws) {
        _classCallCheck(this, Protocol);

        this.ws = ws;
    }

    _createClass(Protocol, [{
        key: 'hookEvents',
        value: function hookEvents(subClass) {
            this.ws.addEventListener('message', subClass.messageHandler.bind(subClass));
            this.ws.addEventListener('open', subClass.openHandler.bind(subClass));
            this.ws.addEventListener('close', subClass.closeHandler.bind(subClass));
        }
    }, {
        key: 'isConnected',
        value: function isConnected() {
            return this.ws.readyState === WebSocket.OPEN;
        }
    }, {
        key: 'openHandler',
        value: function openHandler() {
            _global.eventSys.emit(_conf.EVENTS.net.connected);
        }
    }, {
        key: 'closeHandler',
        value: function closeHandler() {
            _global.eventSys.emit(_conf.EVENTS.net.disconnected);
        }
    }, {
        key: 'messageHandler',
        value: function messageHandler(message) {}
    }, {
        key: 'joinWorld',
        value: function joinWorld(name) {}
    }, {
        key: 'requestChunk',
        value: function requestChunk(x, y) {}
    }, {
        key: 'updatePixel',
        value: function updatePixel(x, y, rgb) {}
    }, {
        key: 'sendUpdates',
        value: function sendUpdates() {}
    }, {
        key: 'sendMessage',
        value: function sendMessage(str) {}
    }]);

    return Protocol;
}();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadAndRequestCaptcha = loadAndRequestCaptcha;

var _conf = __webpack_require__(1);

var _global = __webpack_require__(0);

var _misc = __webpack_require__(2);

var _windowsys = __webpack_require__(11);

var _main = __webpack_require__(3);

var SITEKEY = "6LcgvScUAAAAAARUXtwrM8MP0A0N70z4DHNJh-KI";

function loadCaptcha(onload) {
	if (!window.grecaptcha) {
		if (window.callback) {
			/* Hacky solution for race condition */
			window.callback = function () {
				onload();
				this();
			}.bind(window.callback);
		} else {
			window.callback = function () {
				delete window.callback;
				onload();
			};
			(0, _misc.loadScript)("https://www.google.com/recaptcha/api.js?onload=callback&render=explicit");
		}
	} else {
		onload();
	}
}

function requestVerification() {
	_windowsys.windowSys.addWindow(new _windowsys.GUIWindow("Verification needed", {
		centered: true
	}, function (wdow) {
		var id = grecaptcha.render(wdow.addObj((0, _misc.mkHTML)("div", {
			style: "margin: -4px;" /* NOTE: not setting cssText */
		})), {
			theme: "light",
			sitekey: SITEKEY,
			callback: function callback(token) {
				_global.eventSys.emit(_conf.EVENTS.misc.captchaToken, token);
				wdow.close();
			}
		});
		wdow.frame.style.cssText = "";
		wdow.container.style.cssText = "overflow: hidden; background-color: #F9F9F9";
	}));
}

function loadAndRequestCaptcha() {
	if (_main.misc.showEUCookieNag) {
		_windowsys.windowSys.addWindow(new _windowsys.UtilDialog('Cookie notice', 'This box alerts you that we\'re going to use cookies!\nIf you don\'t accept their usage, disable cookies and reload the page.', false, function () {
			(0, _misc.setCookie)('nagAccepted', 'true');
			_main.misc.showEUCookieNag = false;
			loadCaptcha(requestVerification);
		}));
	} else {
		loadCaptcha(requestVerification);
	}
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "audio/launch.mp3";

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "audio/place.mp3";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "audio/click.mp3";

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__.p + "polyfill/canvas-toBlob.js";

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map
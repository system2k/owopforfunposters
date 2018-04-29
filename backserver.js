var fs  = require("fs");
var ws  = require("ws");
var sql = require("sqlite3").verbose();

var adminpw = "anarchy_please" // (public on the official owopforfunposters server)
var modpw   = "mod_please"     // (public on the official owopforfunposters server)
var global_chat_pw = "global_chat_pw_goes_here"; // (private on said server)

var WSPort = 7000;
var database = new sql.Database("./owop_for_funposters_database.db");
var db = {
	// gets data from the database (only 1 row at a time)
	get: async function(command, params) {
		if(params == void 0 || params == null) params = []
		return new Promise(function(r, rej) {
			database.get(command, params, function(err, res) {
				if(err) {
					return rej(err)
				}
				r(res)
			})
		})
	},
	// runs a command (insert, update, etc...) and might return "lastID" if needed
	run: async function(command, params) {
		if(params == void 0 || params == null) params = []
		var err = false
		return new Promise(function(r, rej) {
			database.run(command, params, function(err, res) {
				if(err) {
					return rej(err)
				}
				var info = {
					lastID: this.lastID
				}
				r(info)
			})
		})
	},
	// gets multiple rows in one command
	all: async function(command, params) {
		if(params == void 0 || params == null) params = []
		return new Promise(function(r, rej) {
			database.all(command, params, function(err, res) {
				if(err) {
					return rej(er)
				}
				r(res)
			})
		})
	}
};

var SET_ID      = 0;
var UPDATE      = 1;
var CHUNKDATA   = 2;
var TELEPORT    = 3;
var PERMISSIONS = 4;
var SET_PQUOTA  = 6;
function compress_data_to(data, tileX, tileY, protection) {
	var result = new Uint8Array(16 * 16 * 3 + 10 + 4);
	var s = 16 * 16 * 3;
	var compressedPos = [];
	var compBytes = 3;
	var lastclr = data[2] << 16 | data[1] << 8 | data[0];
	var t = 1;
	for(var i = 3; i < data.length; i += 3) {
		var clr = data[i + 2] << 16 | data[i + 1] << 8 | data[i];
		compBytes += 3;
		if(clr == lastclr) {
			++t;
		} else {
			if(t >= 3) {
				compBytes -= t * 3 + 3;
				compressedPos.push({
					pos: compBytes,
					length: t
				});
				compBytes += 5 + 3;
			}
			lastclr = clr;
			t = 1;
		}
	}
	if(t >= 3) {
		compBytes -= t * 3;
		compressedPos.push({
			pos: compBytes,
			length: t
		});
		compBytes += 5;
	}
	var totalcareas = compressedPos.length;
	var msg = new DataView(result.buffer);
	msg.setUint8(0, CHUNKDATA);
	msg.setInt32(1, tileX, true);
	msg.setInt32(5, tileY, true);
	msg.setUint8(9, protection);
	
	var curr = 10; // as unsigned8
	
	msg.setUint16(curr, s, true);
	curr += 2; // size of unsigned 16 bit ints
	
	msg.setUint16(curr, totalcareas, true);
	
	curr += 2; // uint16 size
	
	for(var i = 0; i < compressedPos.length; i++) {
		var point = compressedPos[i];
		msg.setUint16(curr, point.pos, true)
		curr += 2; // uint16 size
	}
	
	var di = 0;
	var ci = 0;
	for(var i = 0; i < compressedPos.length; i++) {
		var point = compressedPos[i];
		while(ci < point.pos) {
			msg.setUint8(curr + (ci++), data[di++]);
		}
		msg.setUint16(curr + ci, point.length, true);
		ci += 2; // uint16 size
		msg.setUint8(curr + (ci++), data[di++]);
		msg.setUint8(curr + (ci++), data[di++]);
		msg.setUint8(curr + (ci++), data[di++]);
		di += point.length * 3 - 3;
	}
	while(di < s) {
		msg.setUint8(curr + (ci++), data[di++]);
	}
	var size = compBytes + totalcareas * 2 + 10 + 2 + 2;
	return result.slice(0, size);
}

function getTile(world, tileX, tileY) {
	var tile_str = tileX + "," + tileY;
	var tile = worlds[world]
	var exist = false;
	if(tile) {
		tile = worlds[world].tiles[tile_str] 
		if(tile) {
			exist = true;
		}
	}
	if(!exist) {
		tile = new Uint8Array(16 * 16 * 3);
		for(var i = 0; i < 16 * 16 * 3; i++) {
			tile[i] = 255;
		}
	}

	return compress_data_to(tile, tileX, tileY, 0)
}

var motd = {
	"main": "<span><style>@import url(//fonts.googleapis.com/css?family=Play);#custom-motd{display:flex;flex-direction:column;padding:16px;font-family:Play,serif;font-size:12pt;color:#dedede}#custom-motd>.title{color:#00e6e6;text-align:center;font-size:16pt;font-family:Play}#custom-motd>.large{font-size:27px}#custom-motd>.links{display:flex;justify-content:space-around}#custom-motd>.vertical{flex-direction:column}#custom-motd>*>a{padding:8px;text-align:center;flex:1 auto;color:#ff6000}#custom-motd>#rules{padding:.5em}#custom-motd>*>a:visited{color:#d35400}#custom-motd>*>a:hover{color:#ffc000}#custom-motd>p{padding:.5em;text-align:center}#rules>ol{list-style:none;white-space:nowrap}#rules>ol>li{counter-increment:item;white-space:nowrap}#rules>ol>li:before{content:counter(item) \".\";margin-right:.5em;white-space:nowrap;text-shadow:-1px 0 #000,0 1px #000,1px 0 #000,0 -1px #000}</style><div id=custom-motd><span class=\"title large\">OWOP For Funposters</span><span class=title>Rules</span><div id=rules><ol><li>None</ol></div><div class=\"links vertical\"></div></div></span>"
}

var worlds = {};

var updates = {};

var interval = Math.floor(1000 / 60);
function updateClock() {
	var pinfo_t_SIZE = 4 + 4 + 1 + 1 + 1 + 1;
	var pixupd_t_SIZE = 4 + 4 + 1 + 1 + 1;
	
	for(var i in updates) {
		var plupdates = updates[i][0];
		var pxupdates = updates[i][1];
		var plleft = updates[i][2];
		
		var updSize = (1 + 1 + plupdates.length * (4 + pinfo_t_SIZE)
	                                   + 2 + pxupdates.length * pixupd_t_SIZE
	                                   + 1 + 4 * plleft.length);
									   
		updSize += 2;
		
		var upd = new Uint8Array(updSize);
		
		upd[0] = UPDATE;
		
		var upd_dv = new DataView(upd.buffer);
		
		var offs = 2;
		
		var tmp = 0;
		for(var u = 0; u < plupdates.length; u++) {
			var client = plupdates[u];
			
			upd_dv.setUint32(offs, client.id, true);
			offs += 4;
			
			upd_dv.setInt32(offs + 0, client.x, true);
			upd_dv.setInt32(offs + 4, client.y, true);
			upd_dv.setUint8(offs + 4 + 4, client.r);
			upd_dv.setUint8(offs + 4 + 4 + 1, client.g);
			upd_dv.setUint8(offs + 4 + 4 + 1 + 1, client.b);
			upd_dv.setUint8(offs + 4 + 4 + 1 + 1 + 1, client.tool);
			
			offs += pinfo_t_SIZE;
			tmp++;
		}
		
		upd[1] = tmp;
		
		upd_dv.setUint16(offs, pxupdates.length, true);
		
		offs += 2;
		
		for(var u = 0; u < pxupdates.length; u++) {
			var client = pxupdates[u];
			
			upd_dv.setInt32(offs, client.x, true);
			upd_dv.setInt32(offs + 4, client.y, true);
			upd_dv.setUint8(offs + 4 + 4, client.r);
			upd_dv.setUint8(offs + 4 + 4 + 1, client.g);
			upd_dv.setUint8(offs + 4 + 4 + 1 + 1, client.b);
			
			offs += pixupd_t_SIZE;
		}
		upd_dv.setUint16(offs, plleft.length, true);
		
		offs += 1;
		
		for(var u = 0; u < plleft.length; u++) {
			var id = plleft[u]; // this is a number
			upd_dv.setUint32(offs, id, true);
			offs += 4;
		}
		
		delete updates[i];
		
		var wld = worlds[i];
		if(!wld) continue; // Shouldn't happen
		
		var clients = wld.clients;
		
		for(var c = 0; c < clients.length; c++) {
			var client = clients[c];
			var send = client.send;
			send(upd)
		}
	}
	setTimeout(updateClock, interval);
}
updateClock();

function getUpdObj(world) {
	world = world.toLowerCase();
	if(!updates[world]) {
		updates[world] = [[], [], []];
	}
	return updates[world]
}

function doUpdatePlayerPos(world, client) {
	var upd = getUpdObj(world)[0];
	upd.push(client)
}

function doUpdatePixel(world, pixelData) {
	var upd = getUpdObj(world)[1];
	upd.push(pixelData)
}

function doUpdatePlayerLeave(world, id) {
	var upd = getUpdObj(world)[2];
	upd.push(id)
}

function worldTemplate() {
	return {
		latestId: 1,
		updates: [],
		clients: [],
		tiles: {}
	}
}

var world_id_table = {};

var db_updates = {
	new_worlds: {},
	tile_upd: {}
}

var closeMsg = ":: This server will be closed shortly. It will be restarted";

function wssOnConnection(ws, req) {
	var ip = ws._socket.remoteAddress;
	var player = false;
	var client;
	var world;
	var worldName;
	function send(data) {
		try {
			ws.send(data)
		} catch(e) {};
	}
	if(terminatedSocketServer) {
		send(closeMsg)
	}
	ws.on("message", async function(message) {
		if(terminatedSocketServer) return;
		var data = new Uint8Array(message)
		var dv = new DataView(data.buffer)
		var len = message.length;
		var isBinary = (typeof message == "object");
		if(player && isBinary) {
			if(terminatedSocketServer) return;
			switch(len) {
				case 1:
					break;
				case 8:
					var x = dv.getInt32(0, true);
					var y = dv.getInt32(4, true);
					var tile = getTile(worldName, x, y);
					send(tile);
					break;
				case 9:
					if(!client.admin) {
						ws.close();
						break;
					}
					var x = dv.getInt32(0, true);
					var y = dv.getInt32(4, true);
					console.log("clear:", x, y)
					break;
				case 11:
					var x = dv.getInt32(0, true);
					var y = dv.getInt32(4, true);
					var r = dv.getUint8(8);
					var g = dv.getUint8(9);
					var b = dv.getUint8(10);
					doUpdatePixel(worldName, {x, y, r, g, b})
					
					var tileX = Math.floor(x / 16);
					var tileY = Math.floor(y / 16);
					var pixX = x - Math.floor(x / 16) * 16;
					var pixY = y - Math.floor(y / 16) * 16;
					
					var tile_str = tileX + "," + tileY;
					
					if(!world.tiles[tile_str]) {
						world.tiles[tile_str] = new Uint8Array(16 * 16 * 3);
						for(var i = 0; i < 16 * 16 * 3; i++) {
							world.tiles[tile_str][i] = 255;
						}
					}
					
					var idx = (pixY * 16 + pixX) * 3;
					world.tiles[tile_str][idx + 0] = r;
					world.tiles[tile_str][idx + 1] = g;
					world.tiles[tile_str][idx + 2] = b;
					
					if(!db_updates.tile_upd[worldName]) {
						db_updates.tile_upd[worldName] = {};
					}
					db_updates.tile_upd[worldName][tile_str] = world.tiles[tile_str];
					break;
				case 12:
					var x = dv.getInt32(0, true);
					var y = dv.getInt32(4, true);
					var r = dv.getUint8(8);
					var g = dv.getUint8(9);
					var b = dv.getUint8(10);
					var tool = dv.getUint8(11);
					client.x_pos = x;
					client.y_pos = y;
					client.col_r = r;
					client.col_g = g;
					client.col_b = b;
					client.tool = tool;
					doUpdatePlayerPos(worldName, {id: client.id, x, y, r, g, b, tool})
					break;
				case 776:
					if(!client.admin) {
						ws.close();
						break;
					}
					var x = dv.getInt32(0, true);
					var y = dv.getInt32(4, true);
					var offset = 8;
					var newDat = new Uint8Array(16 * 16 * 3);
					for(var i = 0; i < 16 * 16 * 3; i++) {
						newDat[i] = dv.getUint8(i + offset);
					}
					var tile_str = x + "," + y;
					world.tiles[tile_str] = newDat;
					
					var newTileUpdated = getTile(worldName, x, y);
					var clients = world.clients;
					for(var s = 0; s < clients.length; s++) {
						var current_send = clients[s].send;
						current_send(newTileUpdated)
					}
					
					if(!db_updates.tile_upd[worldName]) {
						db_updates.tile_upd[worldName] = {};
					}
					db_updates.tile_upd[worldName][tile_str] = newDat;
					
					break;
			}
		} else if(!player && isBinary) {
			if(len > 2 && len - 2 <= 24/* && dv.getUint16(len - 2, true) == 1234*/) { // any verification
				var str = "";
				for(var i = 0; i < data.length - 2; i++) {
					var code = data[i];
					if(!((code > 96 && code < 123) ||
						(code > 47 && code < 58) ||
						code == 95 || code == 46)) {
						ws.close();
						return;
					}
					str += String.fromCharCode(code)
				}
				if(!str) str = "main";
				
				if(!worlds[str]) {
					db_updates.new_worlds[str] = true;
					worlds[str] = worldTemplate();
				}
				world = worlds[str]
				
				var clientId = world.latestId
				world.latestId++;
				
				worldName = str;
				
				client = {
					x_pos: 0,
					y_pos: 0,
					col_r: 0,
					col_g: 0,
					col_b: 0,
					tool: 0,
					id: clientId,
					nick: "",
					admin: false,
					mod: false,
					stealth: false,
					send
				}
				
				doUpdatePlayerPos(worldName, {id: client.id, x: 0, y: 0, r: 0, g: 0, b: 0, tool: 0})
				
				world.clients.push(client);
				
				player = true;
				var id = new Uint8Array(5);
				var id_dv = new DataView(id.buffer);
				id_dv.setUint8(0, SET_ID);
				id_dv.setUint32(1, clientId, true);
				send(new Uint8Array(id))
				send(new Uint8Array([PERMISSIONS, 1]))
				
				var paintrate = 32;
				var quota = new Uint8Array(5)
				var quota_dv = new DataView(quota.buffer);
				quota_dv.setUint8(0, SET_PQUOTA);
				quota_dv.setUint16(1, paintrate, true);
				quota_dv.setUint16(3, 0, true);
				send(quota)
				
				if(motd[str]) {
					send(motd[str]);
				}
				
				// send client list to that client
				for(var w in world.clients) {
					var cli = world.clients[w];
					var upd = {id: cli.id, x: cli.x_pos, y: cli.y_pos, r: cli.col_r, g: cli.col_g, b: cli.col_b, tool: cli.tool};
					doUpdatePlayerPos(worldName, upd)
				}
			}
		} else if(player && !isBinary) {
			var nick = client.nick;
			var isMod = client.mod;
			var isAdmin = client.admin;
			var isStaff = (isMod || isAdmin);
			var stealth = client.stealth;
			var id = client.id;
			
			var tmp_isMod = isMod;
			var tmp_isAdmin = isAdmin;
			var tmp_isStaff = isStaff;
			if(stealth) {
				tmp_isMod = false;
				tmp_isAdmin = false;
				tmp_isStaff = false;
			}
			
			var before = "";
			if(tmp_isMod) before += "(M) ";
			if(tmp_isAdmin) before += "(A) ";
			if(nick && !tmp_isStaff) {
				before += "[" + id + "] " + nick;
			} else if(nick && tmp_isStaff) {
				before += nick;
			}
			if(!nick) {
				before += id;
			}
			
			if(len > 1 && message[len - 1] == "\n") {
				var chat = message.slice(0, len - 1);
				chat = chat.replace(/</g, "&lt;")
				chat = chat.replace(/>/g, "&gt;")
				if(chat.length <= 512) {
					console.log(worldName, before, chat)
					if(chat[0] != "/") {
						var clients = world.clients;
						for(var s = 0; s < clients.length; s++) {
							var current_send = clients[s].send;
							current_send(before + ": " + chat)
						}
					} else {
						var command = chat.substr(1);
						var cmdCheck = command.toLowerCase();
						cmdCheck = cmdCheck.split(" ");
						if(cmdCheck[0] == "nick") {
							if(cmdCheck.length == 1) {
								client.nick = "";
								send("Nickname reset.");
								return;
							}
							var newNick = command.split(" ");
							newNick.shift();
							if(newNick.length < 1) return;
							if(newNick.length <= 12) {
								client.nick = newNick;
							} else {
								send("Nickname too long! (Max: " + 12 + ")");
								return;
							}
							send("Nickname set to: '" + newNick + "'");
						} else if(cmdCheck[0] == "adminlogin") {
							if(cmdCheck[1] == adminpw) {
								send(new Uint8Array([PERMISSIONS, 3]))
								send("Logged in as administrator");
								client.admin = true;
								client.mod = false;
							} else {
								send("Invalid password");
							}
						} else if(cmdCheck[0] == "modlogin") {
							if(cmdCheck[1] == modpw) {
								send(new Uint8Array([PERMISSIONS, 2]))
								send("Logged in as moderator");
								client.mod = true;
								client.admin = false;
							} else {
								send("Invalid password");
							}
						} else if(cmdCheck[0] == "tp") {
							var x = parseInt(cmdCheck[1])
							var y = parseInt(cmdCheck[2])
							if(isNaN(x) || isNaN(y)) {
								x = 0;
								y = 0;
							}
							var tp = new Uint8Array(9)
							var tp_dv = new DataView(tp.buffer);
							tp_dv.setUint8(0, TELEPORT);
							tp_dv.setUint32(1, x, true);
							tp_dv.setUint32(5, y, true);
							send(tp)
						} else if(cmdCheck[0] == "stealth") {
							if(!client.stealth) {
								client.stealth = true;
								send("Stealth mode enabled");
							} else {
								client.stealth = false;
								send("Stealth mode disabled");
							}
						} else if(cmdCheck[0] == "broadcast") {
							var pw_arg = cmdCheck[1];
							if(global_chat_pw != pw_arg) {
								return;
							}
							var msg = command.split(" ");
							msg.shift();
							msg.shift();
							msg = msg.join(" ");
							for(var gw in worlds) {
								var worldCurrent = worlds[gw];
								var clients = worldCurrent.clients;
								for(var s = 0; s < clients.length; s++) {
									var current_send = clients[s].send;
									current_send("[GLOBAL] " + before + ": " + msg)
								}
							}
						} else {
							send("Command not recognized")
						}
					}
				}
			}
		}
		//console.log(message)
	});
	ws.on("close", function(){
		//console.log("closed")
		if(!world) return;
		if(!client) return;
		var clIdx = world.clients.indexOf(client);
		if(clIdx > -1) {
			doUpdatePlayerLeave(worldName, client.id)
			world.clients.splice(clIdx, 1);
		}
	})
	ws.on("error", function(a,b,c){
		console.log("err", a, b, c)
	})
	send(new Uint8Array([5, 3]))
}

async function saveDatabase() {
	var new_worlds = db_updates.new_worlds;
	var tile_upd = db_updates.tile_upd;
	
	db_updates.new_worlds = {};
	db_updates.tile_upd = {};
	
	var hasUpdated = false;
	
	await db.run("BEGIN TRANSACTION")
	
	for(var name in new_worlds) {
		var worldId = (await db.run("INSERT INTO worlds VALUES(null, ?)", name));
		world_id_table[name] = worldId.lastID
		hasUpdated = true;
	}
	
	for(var world in tile_upd) {
		var dat = tile_upd[world];
		var worldID = world_id_table[world];
		for(var tkey in dat) {
			var tile = dat[tkey];
			var pos = tkey.split(",").map(Number);
			var tileX = pos[0];
			var tileY = pos[1];
			var dataStr = "";
			for(var t = 0; t < tile.length; t++) {
				dataStr += String.fromCharCode(tile[t]);
			}
			var dbTile = await db.get("SELECT * FROM tiles WHERE world=? AND x=? AND y=?", [worldID, tileX, tileY]);

			if(!dbTile) {
				await db.run("INSERT INTO tiles VALUES(?, ?, ?, ?)", [worldID, tileX, tileY, dataStr]);
			} else {
				await db.run("UPDATE tiles SET data=? WHERE world=? and x=? and y=?", [dataStr, worldID, tileX, tileY]);
			}
		}
		hasUpdated = true;
	}
	
	await db.run("COMMIT")
	
	if(hasUpdated) console.log("saved database");
}

var lastDBSave = false;
var lastDBCallback;

var sdbt;
async function saveDbInterval() {
	await saveDatabase();
	if(lastDBSave) {
		if(lastDBCallback) lastDBCallback();
	}
	sdbt = setTimeout(saveDbInterval, 1000 * 5)
};

var terminatedSocketServer = false;

var wss;
function createWSServer() {
	wss = new ws.Server({
		port: WSPort
	});

	wss.on("connection", wssOnConnection);
}

console.log("Press 'k' to close this server")
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding("utf8");

stdin.on("data", async function(key) {
	if(terminatedSocketServer) return;
	if(key === "\u0003") { // cancels server (unsafe)
		process.exit();
	}
	if(key.toLowerCase() == "k") { // close server (safe, but slower)
		console.log("Exiting...")
		terminatedSocketServer = true;
		lastDBSave = true;
		for(var w in worlds) {
			var world = worlds[w];
			for(var c = 0; c < world.clients.length; c++) {
				var client = world.clients[c]
				client.send(closeMsg)
			}
		}
		lastDBCallback = function() {
			process.exit();
		}
	}
})

async function beginServer() {
	console.log("caching...");
	var tilesTable  = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='tiles'")
	var worldsTable = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='worlds'")
	
	if(!tilesTable) {
		await db.run("CREATE TABLE 'tiles' (world INTEGER, x INTEGER, y INTEGER, data BLOB)")
	}
	if(!worldsTable) {
		await db.run("CREATE TABLE 'worlds' (id INTEGER NOT NULL PRIMARY KEY, name TEXT)")
	}
	
	var wld_id = {};
	
	var worldsDB = await db.all("SELECT * FROM worlds")
	var tilesDB  = await db.all("SELECT * FROM tiles")
	
	for(var i = 0; i < worldsDB.length; i++) {
		var world = worldsDB[i];
		wld_id[world.id] = world.name;
		world_id_table[world.name] = world.id;
		worlds[world.name] = worldTemplate();
	}
	
	for(var i = 0; i < tilesDB.length; i++) {
		if(i % 2000 == 0) console.log(i, tilesDB.length);
		var tile = tilesDB[i];
		var worldName = wld_id[tile.world];
		var tileX = tile.x;
		var tileY = tile.y;
		var tileDataRaw = tile.data;
		var tileData = new Uint8Array(16 * 16 * 3);
		for(var c = 0; c < tileDataRaw.length; c++) {
			var code = tileDataRaw.charCodeAt(c);
			tileData[c] = code;
		}
		var tile_str = tileX + "," + tileY;
		worlds[worldName].tiles[tile_str] = tileData
	}
	
	console.log("Starting server...");
	
	saveDbInterval();
	createWSServer();
	console.log("Server running on port " + WSPort)
}
beginServer();
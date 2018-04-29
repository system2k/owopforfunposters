var fs   = require("fs");
var http = require("http");
var url  = require("url");
var ws   = require("ws");

var clientDir = "./dist/";

var fileData = {};

function match(str1, str2) {
	str1 += "";
	str2 += "";
	var res = str1.localeCompare(str2, "en", {
		sensitivity: "base"
	});
	return !res;
}

function listDir(addr, MP, dsu, po, opt) { // object, file path, web path, path only, options
	if(!opt) opt = {};
	var con = fs.readdirSync(MP)
	for(var i in con) {
		var currentPath = MP + con[i]
		if(!fs.lstatSync(currentPath).isDirectory()) {
			if(!po) {
				addr[dsu + con[i]] = fs.readFileSync(currentPath)
			} else {
				addr[dsu + con[i]] = currentPath;
			}
		} else {
			// Omitted folder? Cancel scanning folder
			if(con[i] == opt.omit_folder) {
				return;
			}
			listDir(addr, MP + con[i] + "/", dsu + con[i] + "/", po)
		}
	}
}

listDir(fileData, clientDir, "", null)

var server = http.createServer(function(req, res) {
	var URL = url.parse(req.url);
	URL = URL.pathname;
	if(URL.charAt(0) == "/") URL = URL.substr(1);
	if(URL.endsWith("/")) URL = URL.slice(0, URL.length - 1);
	
	var file = null;
	if(URL == "") {
		file = "index.html"
	} else {
		for(var i in fileData) {
			if(match(i, URL)) {
				file = i;
				break;
			}
		}
	}
	if(file == null) {
		file = "index.html"
	}
	
	res.write(fileData[file], "binary");
	res.end();
})
server.listen(9001, function() {
	var addr = server.address();
	console.log("OWOP for spammers CLIENT\n" + addr.port + ". Address: " + addr.address + ":" + addr.port)
});
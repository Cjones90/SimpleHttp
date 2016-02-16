'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');


module.exports = {

  port: '',
  toFileProp : {"/favicon.ico": "favicon.ico"},
  toDirProp : {},
  toFunctionProp : {},


  // TODO: Implement good error catching/error msgs, parameter checking
  // TODO: Use classes

  startServer: function() {
    if(!this.port) { this.errorReporter(1) }
    http.createServer((req, res) => {
      this.univRouter(req, res);
    }).listen(this.port, console.log(`Listening to port: ${this.port}`))
  },

  listenToPort: function(port) {
    this.port = port;
  },

  univRouter: function (req, res) {
    let file = '';
    let parsedUrl = url.parse(req.url).pathname;

    file = this.toFileProp[parsedUrl] ? this.toFileProp[parsedUrl] : file;
    file = this.toDirProp[parsedUrl] ? this.toDirProp[parsedUrl] : file;

    // TODO:Implement easy routing to function and returning intended response
    // file = toFunctionProp[parsedUrl] ? toFunctionProp[parsedUrl] : file;
    // TODO: Set a default path

    let contentType = this.extractContentType(file)
    res.writeHead(200, {"Content-Type": contentType});
    res.end(fs.readFileSync(file));
  },

  routePath: function(urlPath) {
    this.urlPath = urlPath;
    return this;
  },

  toFile: function(filePath) {
    if(!this.urlPath) { this.errorReporter(2); }
    this.toFileProp[this.urlPath] = filePath;
    delete this.urlPath;
  },

  toDir: function(dirPath) {
    if(!this.urlPath) { this.errorReporter(2); }
    this.toDirProp[this.urlPath] = dirPath;
    delete this.urlPath;
  },

  toFunction: function() {

  },

  extractContentType: function (filePath) {
    let extName = path.extname(filePath);
    let contentType = '';
    // TODO: Extend the extensions and contenttypes
    switch(extName) {
      case ".js": contentType = "text/javascript";
      break;
      case ".css": contentType = "text/css";
      break;
      case ".html": contentType = "text/html";
      break;
      case ".jpg": contentType = "text/jpeg";
      break;
      case ".png": contentType = "text/png";
      break;
      case ".ico": contentType = "image/x-icon";
      break;
      default: contentType = "text/html";
		}
    return contentType;
  },

  routeExt: function (extName) {
    // TODO: Implement a catchall for specific extensions
    // Most likely .routeExt().toDir() is the best way to implement
    // Need to brainstorm good uses for routeExt() and toDir()
    //    -- One is assets such as .jpg, .pdf, .doc
    return "Function incomplete"
    this.extName = extName;
    return this;
  },

  errorReporter: function(errNum) {
    let errMsg = ''
    switch(errNum){
      case 1: errMsg = "Specify a port using .listenToPort(portNum) before calling "+
                        ".startServer()";
      break;
      case 2: errMsg = `Use .toFile() in the form of .routeFrom(urlPathName).toFile(fileName)`;
      break;
      default: errMsg = "Please raise an issue to the maintainer for quickhttp"+
                        "with as much detail as possible.";
    }
    throw new Error(errMsg);
  }
}

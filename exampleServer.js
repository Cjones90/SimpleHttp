'use strict';

const shttp = require('./index.js');

shttp.listenToPort(5050);

shttp.routePath('/test').toFile('index1.html');
shttp.routePath('/test2').toFile('index2.html');

shttp.startServer();

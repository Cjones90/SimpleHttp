'use strict';

const shttp = require('./index.js');

shttp.listenToPort(6111);

shttp.setPublicFolder(__dirname);
shttp.setDefaultPage('index1.html');
// Order does not matter, as long as the whole directory structure is there when initialized
// ie,
// shttp.routePath('datInner1').toDir('inner1');
//      will route to dir1/dir3/inner1
//      as long as:
// shttp.routePath('dir3').toDir('dir3');
// shttp.routePath('dir1').toDir('dir1');
//      are also declared anywhere in the file (before the startServer call)

// Although you can techinically place them out of order, It's best to nest
// them in the order they appear in your file tree to ensure you don't forget a directory

// Possible
shttp.routePath('datInner1').toDir('inner1');
shttp.routePath('dir3').toDir('dir3');
shttp.routePath('dir1').toDir('dir1');
shttp.routePath('dir2').toDir('dir2');
shttp.routePath('datInner2').toDir('inner2');

// Better
// shttp.routePath('dir1').toDir('dir1');  // Top level
// shttp.routePath('dir2').toDir('dir2');  // Top level
// shttp.routePath('dir3').toDir('dir3');  // 2nd level
// shttp.routePath('datInner1').toDir('inner1');  // 3rd level
// shttp.routePath('datInner2').toDir('inner2');  // 4th level

// Or even order them traversing each dir one at a time.
// shttp.routePath('dir1').toDir('dir1');   //TopLevel-Dir
// shttp.routePath('dir3').toDir('dir3');   //Child-Dir
// shttp.routePath('datInner1').toDir('inner1');   //Sub-Child-Dir
// shttp.routePath('datInner2').toDir('inner2');   //Sub-Sub-Child-Dir
// shttp.routePath('dir2').toDir('dir2');   //TopLevel-Dir


shttp.routePath('index.js').toFile('index.js');
shttp.routePath('test').toFile('index1.html');
shttp.routePath('test2').toFile('index2.html');


shttp.startServer();

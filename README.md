<h4> A work in progress </h4>


<h3>Basic usage will look like the following: </h3>


In your server.js file

```javascript

// Include module
const shttp = require('shttp');

// Specifiy port for server to listen on
shttp.listenToPort(5050);

// Set default folder to serve from and file to serve at root
//   (The public folder relative to where this file is located)
shttp.setPublicFolder(__dirname);
shttp.setDefaultPage('index1.html');

// Setup custom url routes to files
shttp.routePath('test').toFile('index1.html');
shttp.routePath('test2').toFile('index2.html');

// Setup routes for your assets in your .htmls
shttp.routePath('index.js').toFile('index.js');
shttp.routePath('style.css').toFile('style.css');

// Route custom url paths to different directories
shttp.routePath('dir1').toDir('dir1');
shttp.routePath('dir3').toDir('dir3');

// The above is for the this example project, a real world example might look like:
// shttp.routePath('images').toDir('dir/with/images');
// shttp.routePath('css').toDir('dir/with/cssfiles');


// (Not implemented yet)
shttp.routeExt('.jpg').toDir('/assets');
shttp.routePath('/ajaxCall').toFunction(myCustomFunction);


// Start server
shttp.startServer();
```

# TODO
Create function call to list all url -> file paths

# Some notes and further explanation

```javascript
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

// Possible, but bad
shttp.routePath('datInner1').toDir('inner1');
shttp.routePath('dir3').toDir('dir3');
shttp.routePath('dir1').toDir('dir1');
shttp.routePath('dir2').toDir('dir2');
shttp.routePath('datInner2').toDir('inner2');

// Better
shttp.routePath('dir1').toDir('dir1');  // Top level
shttp.routePath('dir2').toDir('dir2');  // Top level
shttp.routePath('dir3').toDir('dir3');  // 2nd level
shttp.routePath('datInner1').toDir('inner1');  // 3rd level
shttp.routePath('datInner2').toDir('inner2');  // 4th level

// Or even order them traversing each dir one at a time.
shttp.routePath('dir1').toDir('dir1');   //TopLevel-Dir
shttp.routePath('dir3').toDir('dir3');   //Child-Dir
shttp.routePath('datInner1').toDir('inner1');   //Sub-Child-Dir
shttp.routePath('datInner2').toDir('inner2');   //Sub-Sub-Child-Dir
shttp.routePath('dir2').toDir('dir2');   //TopLevel-Dir
```

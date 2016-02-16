<h4> Created in a few hours and a work in progress </h4>


<h3>Basic usage will look like the following: </h3>


In your server.js file

```javascript

// Include module
const shttp = require('simplehttp');

// Specifiy port for server to listen on
shttp.listenToPort(5050);

// Setup url routes to files
shttp.routePath('/test').toFile('index1.html');
shttp.routePath('/test2').toFile('index2.html');

// (Not implemented yet)
shttp.routeExt('.jpg').toDir('/assets');
shttp.routePath('/ajaxCall').toFunction(myCustomFunction);


// Start server
shttp.startServer();
```

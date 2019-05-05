let connect = require('connect');
let serveStatic = require('serve-static');

let port = process.env.PORT || 9990;
connect().use(serveStatic("build/")).listen(port, "0.0.0.0", () => {
    console.log('Server running on port ' + port);
});

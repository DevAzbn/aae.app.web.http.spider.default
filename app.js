'use strict';

var azbn = new require(__dirname + '/../../../../../../system/bootstrap')({
	
});

var app = azbn.loadApp(module);

var argv = require('optimist').argv;

app.mdl('queue').add({
	href : argv.href,
	source : '',
});

setInterval(app.mdl('queue').next, 777);
//app.mdl('queue').next();

//azbn.setMdl('config', require('./config/main'));
/*
app.mdl('urlanal').getFullLink(argv.url || '', argv.purl || '', function(href, res){
	
	console.log(app.mdl('urlanal').getPathname(href));
	
	app.mkDataDir('sites/' + res.href.host + app.mdl('urlanal').getPathname(href));
	
});
*/
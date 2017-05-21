'use strict';

var _ = function(app, p) {
	
	var ctrl = {
		
		load : function(href, res, cb) {
			
			var azbn = app.azbn;
			
			azbn.mdl('web/http').r('GET', href, {}, function(error, response, body){
				
				//var $ = azbn.mdl('web/http').parse(body);
				
				var _path = 'sites/' + res.href.host + app.mdl('urlanal').getPathname(href);
				
				app.mkDataDir(_path);
				
				var _ft = azbn.formattime();
				
				app.saveFile(_path + '/' + _ft + '.' + response.statusCode + '.headers', JSON.stringify(response.headers));
				
				if(error) {
					
					cb(error);
					
					app.saveFile(_path + '/' + _ft + '.error', JSON.stringify(error));
					
				} else {
					
					app.saveFile(_path + '/' + _ft + '.' + response.statusCode + '.content', body);
					
					cb(null, response, body);
					
				}
				
			});
			
		},
		
	};
	
	return ctrl;
	
};

module.exports = _;
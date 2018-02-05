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
				
				var _statusCode = 0;
				
				if(response) {
					
					_statusCode = response.statusCode || 0;
					
					if(response.headers) {
						
						app.saveJSON(_path + '/headers.' + _ft, response.headers);
						
					}
					
				}
				
				if(error) {
					
					cb(error);
					
					app.saveJSON(_path + '/error.' + _ft, error);
					
				} else {
					
					app.saveFile(_path + '/body.' + _ft + '.html', body);//'.html' app.mdl('urlanal').getExt(href)
					
					cb(null, response, body);
					
				}
				
			});
			
		},
		
	};
	
	return ctrl;
	
};

module.exports = _;
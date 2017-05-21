'use strict';

var _ = function(app, p) {
	
	var ctrl = {
		
		load : function(href, res, cb) {
			
			var azbn = app.azbn;
			
			azbn.mdl('web/http').r('GET', href, {}, function(error, response, body){
				
				//var $ = azbn.mdl('web/http').parse(body);
				
				if(error) {
					
					cb(error);
					
				} else {
					
					var _path = 'sites/' + res.href.host + app.mdl('urlanal').getPathname(href);
					
					app.mkDataDir(_path);
					
					app.saveFile(_path + '/' + '.content', body);
					
					cb(null, response, body);
					
				}
				
			});
			
		},
		
	};
	
	return ctrl;
	
};

module.exports = _;
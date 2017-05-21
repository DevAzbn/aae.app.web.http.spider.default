'use strict';

var _ = function(app, p) {
	
	var azbn = app.azbn;
	
	var ctrl = {
		
		count : 0,
		
		queue : [],
		
		queue_status : {},
		
		add : function(o) {
			
			ctrl.queue.push(o);
			
			//app.saveJSON('queue', ctrl.queue);
			
		},
		
		next : function() {
			
			//console.log(ctrl.queue.length);
			
			if(ctrl.queue.length > 0) { //&& (counter_url_max < azbn.mdl('cfg').app.url_max)
				
				var doc = ctrl.queue.shift();
				
				if(ctrl.queue_status[doc.href]) {
					
					//ctrl.next();
					
				} else {
					
					ctrl.queue_status[doc.href] = true;
					
					ctrl.action(doc);
					
					//ctrl.next();
					
				}
				
				//ctrl.next();
				
			} else {
				
				azbn.echo('Finished');
				
			}
			
		},
		
		action : function(doc) {
			
			app.mdl('urlanal').getFullLink(doc.href, doc.source, function(href, res){
				
				azbn.echo('Load: ' + href);
				
				//app.mkDataDir('sites/' + res.href.host + app.mdl('urlanal').getPathname(href));
				
				app.mdl('urlbrowser').load(href, res, function(error, response, body){
					
					ctrl.count++;
					
					if(error) {
						
						
						
					} else {
						
						var $ = azbn.mdl('web/http').parse(body);
						
						$('a').each(function(index){
							
							//console.log($(this).attr('href'));
							var a__href = $(this).attr('href');
							
							if(a__href && a__href != '') {
								app.mdl('urlanal').getFullLink($(this).attr('href'), href, function(_href, _res){
									
									ctrl.add({
										href : _href,
										source : href,
									});
									
								});
							}
							
						});
						
					}
					
					//ctrl.next();
					
				});
				
			});
			
		},
		
	};
	
	return ctrl;
	
};

module.exports = _;
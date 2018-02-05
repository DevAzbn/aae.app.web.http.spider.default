'use strict';

var url = require('url')
	, path = require('path')
;

var _ = function(app, p) {
	
	var ctrl = {
		
		getFullLink : function(href, phref, cb) {
			
			var res = {
				href : url.parse(href || ''),
				source : url.parse(phref || ''),
			};
			
			//console.log(res);
			
			if(href.length == 0) {
				
				// пустая ссылка
				//app.azbn.echo('пустая ссылка');
				
			} else if(res.href.protocol == 'http:' || res.href.protocol == 'https:') {
				
				// абсолютные пути с указанием протокола
				
				if(
					(res.href.hostname == res.source.hostname)
					||
					(('www.' + res.href.hostname) == res.source.hostname)
					||
					(res.href.hostname == ('www.' + res.source.hostname))
					||
					(phref == null)
					||
					(phref == '')
				) {
					
					//app.azbn.echo('абсолютные пути с указанием протокола');
					
					var _href = href;
					
					res.href = url.parse(_href);
					
					cb(href, res);
					
				}
				
			} else if(href[0] == '/' && href[1] && href[1] != '/') {
				
				// абсолютный путь на сайте
				//app.azbn.echo('абсолютный путь на сайте');
				
				var _href = url.resolve(res.source.protocol + '//' + res.source.host, href);
				
				res.href = url.parse(_href);
				
				cb(_href, res);
				
			} else if(href[0] == '/' && href[1] == '/') {
				
				// абсолютный путь без протокола
				//app.azbn.echo('абсолютный путь без протокола');
				
				var _href = url.resolve(res.source.protocol, href);
				
				res.href = url.parse(_href);
				
				cb(_href, res);
				
			} else if(href[0] == '#') {
				
				// ссылка-якорь
				//app.azbn.echo('ссылка-якорь');
				
			} else if(app.azbn.inArray(res.href.protocol, ['callto:', 'mailto:', 'skype:', 'tel:', 'javascript:'])) {
				
				// не http-протоколы
				//app.azbn.echo('не http-протоколы');
				
			} else {
				
				// путь к файлу в той же папке
				//app.azbn.echo('путь к файлу в той же папке');
				
				if(res.source.pathname[res.source.pathname.length - 1] == '/') {
					
					//app.azbn.echo('источник ссылки - папка');
					
					var _href = url.resolve(res.source.protocol + '//' + res.source.host + res.source.pathname, href);
					
					res.href = url.parse(_href);
					
					cb(_href, res);
					
				} else {
					
					var _dir = path.dirname(res.source.pathname);
					
					if(_dir.length > 1) {
						
					} else {
						
						_dir = '';
						
					}
					
					//app.azbn.echo('источник ссылки - файл-сосед');
					
					var _href = url.resolve(res.source.protocol + '//' + res.source.host + _dir + '/', href);
					
					res.href = url.parse(_href);
					
					cb(_href, res);
					
				}
				
			}
			
		},
		
		getPathname : function(href) {
			
			var _href = url.parse(href || '');
			
			return _href.pathname;
			
		},

		getBasename : function(href) {

			return path.basename(ctrl.getPathname(href));

		},

		getExt : function(href) {

			var parsed = path.parse(ctrl.getBasename(href));

			parsed.ext = parsed.ext || '.html';
			if(parsed.ext == '') {
				parsed.ext = '.html';
			}

			return parsed.ext;

		},
		
	};
	
	return ctrl;
	
};

module.exports = _;
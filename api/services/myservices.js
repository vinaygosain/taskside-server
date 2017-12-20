var request = require('request');
var myconstants= require('../../config/myconstants')
var q = require('q');

module.exports= {
  getPermanentToken: __getPermanentToken,
}

function __getPermanentToken(currentToken) {
  var deferred =q.defer();
	request.get('https://graph.facebook.com/oauth/access_token?' +
    			'grant_type=fb_exchange_token&' +
    			'client_id=' + myconstants.APP_ID + '&' +
    			'client_secret=' + myconstants.APP_SECRET + '&'+
    			'fb_exchange_token=' + currentToken , function (err, res, body) {
    				if (err) {
    				 defered.reject('error');
    				} else {
              let bodyObj=  JSON.parse(body);
    					var access_token = bodyObj.access_token;
    			       deferred.resolve(access_token);
    				}
    			});

          return deferred.promise;
}

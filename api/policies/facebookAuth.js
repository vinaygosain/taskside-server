var passport = require('passport');

module.exports = function(req, res, next) {
  debugger;
  passport.authenticate('facebook-token', function (user) {
  	if (user) {
  		req.user = user;
	    if (req.user.name != 'InternalOAuthError') {
	      next();
	    } else {
	      res.forbidden({error: 'You must be signed in', code: 403});
	    }
  	} else {
  		res.forbidden({error: 'You must be signed in', code: 403});
  	}
  })(req,res);
};

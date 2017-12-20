module.exports = function (req, res, next) {
	User.findOne({facebookId: req.user.id}, function (err, data) {
		if (err) {
			console.error(err);
			res.serverError({error: 'Internal error', code: 500});
		} else {
			if (data) {
				AdditionalService.getPermanentToken(req.headers['authorization'].substr(7), function tokenResponse(err, token) {
					if (!err) {
						res.ok({message: 'This facebook account is already registered!',
						  		  permanentToken: token, code: 200});
					} else {
						res.serverError({error: err, code: 500});
					}
				});
			} else {
				req.body['facebookId'] = req.user.id;
				req.body['token'] = req.headers['authorization'].substr(7);
				return next();
			}
		}
	});
}

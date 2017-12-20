/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	registerUser: __registerUser
};

function __registerUser(req,res){
	debugger;
	var userObj= {
		name: req.user['displayName'],
		facebookId: req.user['id'],
		email: req.user.emails[0].value
	}

	 myservices.getPermanentToken(req.body['access_token'])
	 .then(CreateUser);

function CreateUser(permanent_Token){
	User.find( { facebookId: userObj.facebookId },function(err,user) {
		if(err){
			return res.serverError({error: err, code: 500});
		}
		else if (user.length === 0) {
			User.create(userObj, function(err) {
				if(err){
					return res.serverError({error: err, code: 500});
				}
				return res.ok({
					message : 'New User id created.',
					permanentToken: permanent_Token,
					user:userObj
				});
			});
		}
			else {
				return res.ok({
					message : 'User id already present.',
					permanentToken: permanent_Token,
					user:userObj
				});
			}
	});
}

}

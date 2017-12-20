var passport = require('passport');

module.exports = {
  facebook: function (req, res) {
    return res.ok(req.user);
  }
};

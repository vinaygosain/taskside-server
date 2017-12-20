/**
 * DeletedTasksController
 *
 * @description :: Server-side logic for managing deletedtasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getDeletedTasks: __getDeletedTasks
};

function __getDeletedTasks(req,res){
  debugger;
  var timeStamp = req.params['time'];
  //timeStamp = Number(timeStamp);
//  timeStamp = new Date(timeStamp);
  Task.find({
    'primaryId': {'>=': timeStamp},
    'facebookId': req.params['fbId'],
  },
    function(err,docs){
      return res.ok(docs);
  });

}

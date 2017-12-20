/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getUserTasks : __getUserTasks,
  uploadTask: __uploadTask,
	deleteTask:__deleteTask
};

function __getUserTasks(req,res){
  debugger;
  var timeStamp = req.params['time'];
  timeStamp = Number(timeStamp);
  timeStamp = new Date(timeStamp);
  Task.find({
    'createdAt': {'>=': timeStamp},
    'facebookId': req.params['fbId'],
  },
    function(err,docs){
      return res.ok(docs);
  });

}

function __uploadTask( req,res ){
  debugger;
  var taskObj= req.body.task;
  taskObj.facebookId= req.user['id'];
	taskObj.primaryId= Date.now().toString();

  Task.create( taskObj, function (err,task){
    if(err)
    {
      return res.serverError({error: err, code: 500});
    }
    return res.ok(task);
  });
}

function __deleteTask(req, res){
	debugger;
	Task.destroy({ facebookId: req.params['fbId'], primaryId: req.params['TaskId'] }, function (err,task) {
		debugger;
		if (err) {
			return res.serverError({error: err, code: 500});
		}
		if(task.length > 0){
		DeletedTasks.create({ primaryId: task[0].primaryId, facebookId: task[0].facebookId }, function(err){
			if(err){
			return res.serverError({error: err});
		}
		});
	}
		return res.ok({message: 'Task deleted.', code: 200});
	});
}

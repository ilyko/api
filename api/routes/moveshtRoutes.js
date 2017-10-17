module.exports = function(app) {
  var moveSht = require('../controllers/moveshtController');

  // todoList Routes
  app.route('/tasks')
    .get(moveSht.list_all_tasks)
    .post(moveSht.create_a_task)
    .delete(moveSht.delete_all_tasks);


  app.route('/tasks/:taskId')
    .get(moveSht.read_a_task)
    .put(moveSht.update_a_task)
    .delete(moveSht.delete_a_task);
};
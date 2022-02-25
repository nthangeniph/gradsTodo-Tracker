var config = require("./dbconfig");
const sql = require("mssql");

//queryDatabase();

async function getAllTasks() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * FROM todoList");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getTaskById(id) {
  try {
    let task = await sql.connect(config);
    let todo = await task
      .request()
      .input("input_parameter", sql.NVarChar, id)
      .query("SELECT * FROM todoList WHERE Id = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function createTask(postTask) {
  try {
    let task = await sql.connect(config);
    let insertTask = await task
      .request()
      .input("Id", sql.NVarChar, postTask.Id)
      .input("Task", sql.NVarChar, postTask.Task)
      .input("Status", sql.Int, postTask.Status)
      .input("Priority", sql.Int, postTask.Priority)
      .input("IsDeleted", sql.Int, postTask.IsDeleted)
      .query(
        "INSERT INTO todoList (Id,Task,Status,Priority,IsDeleted) VALUES (@Id,@Task,@Status,@Priority,@IsDeleted)",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: insertTask.parameters.Id.value,
      Task: insertTask.parameters.Task.value,
      Priority: insertTask.parameters.Priority.value,
      Status: insertTask.parameters.Status.value,
      IsDeleted: insertTask.parameters.IsDeleted.value,
    };
  } catch (err) {
    console.log(err);
  }
}

async function deleteTask(id) {
  try {
    let task = await sql.connect(config);
    let todo = await task
      .request()
      .input("input_parameter", sql.NVarChar, id)
      .query("DELETE FROM todoList WHERE Id = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateTask(taskUp) {
  try {
    let updatedTask = await sql.connect(config);
    let todos = await updatedTask
      .request()
      .input("Id", sql.NVarChar, taskUp.Id)
      .input("Task", sql.NVarChar, taskUp.Task)
      .input("Status", sql.Int, taskUp.Status)
      .input("Priority", sql.Int, taskUp.Priority)
      .input("IsDeleted", sql.Int, taskUp.IsDeleted)
      .query(
        "UPDATE todoList SET Task=@Task,Status=@Status,Priority=@Priority,IsDeleted=@IsDeleted WHERE Id = @Id",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: todos.parameters.Id.value,
      Task: todos.parameters.Task.value,
      Priority: todos.parameters.Priority.value,
      Status: todos.parameters.Status.value,
      IsDeleted: todos.parameters.IsDeleted.value,
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createTask,
  deleteTask,
  updateTask,
  getAllTasks,
  getTaskById,
};

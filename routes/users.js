var config = require("./dbconfig");
const sql = require("mssql");

//queryDatabase();

async function createNewTable() {
  try {
    let pool = await sql.connect(config);

    var query =
      "CREATE TABLE Users  (Id NVarChar(255) PRIMARY KEY, Email NVarChar(255), FirstName NVarChar(255),LastName NVarChar(255), UserType Int,Password NVarChar(255))";
    let products = await pool.request().query(query);
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getAllUsers() {
  try {
    let pool = await sql.connect(config);
    let records = await pool.request().query("SELECT * FROM Users");
    return records.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(id) {
  try {
    let user = await sql.connect(config);
    let record = await user
      .request()
      .input("input_parameter", sql.NVarChar(255), id)
      .query("SELECT * FROM Users WHERE Id = @input_parameter");
    return record.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function validateUniqueUser(email) {
  try {
    let user = await sql.connect(config);

    let userfound = await user
      .request()
      .input("user_email", sql.NVarChar(255), email)
      .query("SELECT * FROM Users WHERE Email = @user_email");

    return userfound.recordset.length;
  } catch (error) {
    console.log(error);
  }
}

async function signUp(user) {
  try {
    let newUser = await sql.connect(config);

    let insertTask = await newUser
      .request()
      .input("Id", sql.NVarChar(255), user.Id)
      .input("Email", sql.NVarChar(255), user.Email)
      .input("FirstName", sql.NVarChar(255), user.FirstName)
      .input("LastName", sql.NVarChar(255), user.LastName)
      .input("UserType", sql.Int, user.UserType)
      .input("Password", sql.NVarChar(255), user.Password)
      .query(
        "INSERT INTO Users (Id,Email,FirstName,LastName,UserType,Password) VALUES (@Id,@Email,@FirstName,@LastName,@UserType,@Password)",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: insertTask.parameters.Id.value,
      Email: insertTask.parameters.Email.value,
      FirstName: insertTask.parameters.FirstName.value,
      LastName: insertTask.parameters.LastName.value,
      UserType: insertTask.parameters.UserType.value,
      Password: insertTask.parameters.Password.value,
    };
  } catch (err) {
    console.log(err);
  }
}

async function deleteUser(id) {
  try {
    let user = await sql.connect(config);
    let record = await user
      .request()
      .input("input_parameter", sql.NVarChar(255), id)
      .query("DELETE FROM Users WHERE Id = @input_parameter");
    return record.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateUser(user) {
  try {
    let updatedUser = await sql.connect(config);
    let record = await updatedUser
      .request()
      .input("Id", sql.NVarChar(255), user.Id)
      .input("Email", sql.NVarChar(255), user.Email)
      .input("FirstName", sql.NVarChar(255), user.FirstName)
      .input("LastName", sql.NVarChar(255), user.LastName)
      .input("UserType", sql.Int, user.UserType)
      .input("Password", sql.NVarChar(255), user.Password)
      .query(
        "UPDATE Users SET Email=@Email,FirstName=@FirstName,LastName=@LastName,UserType=@UserType,Password=@Password WHERE Id = @Id",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: record.parameters.Id.value,
      Email: record.parameters.Email.value,
      FirstName: record.parameters.FirstName.value,
      LastName: record.parameters.LastName.value,
      UserType: record.parameters.UserType.value,
      Password: record.parameters.Password.value,
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  updateUser,
  deleteUser,
  signUp,
  getUserById,
  getAllUsers,
  validateUniqueUser,
};

const config = {
  authentication: {
    options: {
      userName: "GradsCoodinator", // update me
      password: "P@ssw0rd", // update me
    },
    type: "default",
  },
  server: "2022-grads.database.windows.net", // update me
  options: {
    database: "Grads_Db", //update me
    encrypt: true,
  },
};

module.exports = config;

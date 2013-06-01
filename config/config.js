module.exports = {
  development: {
    SERVER_NAME: "http://localhost:" + process.env.PORT,
    db: "mongodb://localhost/salsa",
  },
  test: {
    SERVER_NAME: "http://localhost:" + process.env.PORT,
    db: "mongodb://localhost/salsa-test",
  },
  production: {
    SERVER_NAME: "http://salsa-fresca.herokuapp.com",
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
  }
};

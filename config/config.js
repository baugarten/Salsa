module.exports = {
  development: {
    SERVER_NAME: "http://localhost:" + (process.env.PORT || '3000'),
    ENV: 'development',
    db: "mongodb://localhost/salsa",
  },
  test: {
    SERVER_NAME: "http://localhost:" + (process.env.PORT || '3000'),
    ENV: 'test',
    db: "mongodb://localhost/salsa-test",
  },
  production: {
    SERVER_NAME: "http://fresca.io"
    ENV: 'production',
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
  }
};

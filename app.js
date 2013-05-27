var express = require('express'),
    FTPClient = require('ftp'),
    client = new FTPClient(),
    app = express();

app.use(express['static'](__dirname));

app.post('/put', function(req, res, next) {
  console.log(req.body);
});

app.listen(process.env.PORT || 3000);

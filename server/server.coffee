require('coffee-script')
app = require('./app')

module.exports = app.listen app.get('port'), () ->
  console.log("Express server listening on port " + app.get('port'))
  

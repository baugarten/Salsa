express   = require('express')
app       = module.exports = express()
fs        = require('fs')
path      = require('path')
mongoose  = require('mongoose')
config    = require('../../config/config')

mongoose.connect(config.db)

fs.readdirSync("#{__dirname}/models").forEach (file) ->
  if file.match(/.coffee$/)
    require("#{__dirname}/models/#{file}")

app.get '/api/bower', (req, res) ->
  res.send(fs.readFileSync(__dirname + '/../../../bower.json'))

app.get '/api/package', (req, res) ->
  res.send(fs.readFileSync(__dirname + '/../../../package.json'))
  

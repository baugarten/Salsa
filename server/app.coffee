express   = require('express')
path      = require('path')
api       = require('./lib/api')
scripts   = require('./lib/scripts/index')
passport  = require('./config/passport')
config    = require('./config/config')
app       = module.exports = express()

static_folders = if process.NODE_ENV == 'production' then ['../dist'] else ['../app', '../.tmp']

app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.engine('html', require('jade').__express)
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.cookieParser())
app.use(express.session({ secret: "alkjdljasdjvfnvakjlshduiehfa" }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.compress())
app.use(api)
app.use(scripts)
static_folders.forEach (folder) ->
  app.use(express.static(path.join(__dirname, folder)))
app.use(app.router)

app.get '/home', (req, res, next) ->
  res.render('index.html', config: JSON.stringify(config))

if ('development' == app.get('env'))
  app.use(express.errorHandler())


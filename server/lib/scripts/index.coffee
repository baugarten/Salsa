express = require('express')
uglifyjs = require('uglify-js')
fs = require('fs')
_ = require('underscore')
utils = require('../utils')
config = require('../../config/config')
app = express()

# Creates a generator that, when called with an object of what to replace
# and a request object will return a tailored script for that request
createScriptGenerator = (script) ->
  (prepend, req) ->
    prependConfig(script, prepend, req)

# An Object where keys are the names of the variables to declare
# in client scripts and values are either a value or a function to 
# invoke that returns the value of the variable
clientVariables =
  SERVER_NAME: config.SERVER_NAME,
  ORGANIZATION_ID: (req) ->
    return req.body.organization_id || req.query.organization_id || -1

  ORGANIZATION_SERVERS: (req) ->
    return (req.organization && req.organization.servers) || []

# Listens for admin actions and loads the editscript
initscript = createScriptGenerator(fs.readFileSync("#{__dirname}/salsa.picante.js"))

# A list of all the scripts to
# send to the client
clientScripts = [
  "lib/jquery.min.js",
  "lib/jquery-te-1.4.0.min.js",
  "lib/jquery.magnific-popup.min.js",
  "lib/mercury/mercury_loader.js",
  #"mercury2/liquidmetal-1.2.1.js",
  #"mercury2/marked-0.2.8.js",
  #"mercury2/rangy-core.js",
  #"mercury2/rangy-cssclassapplier.js",
  #"mercury2/rangy-serializer.js",
  #"mercury2/mercury.js",
  #"mercury2/html.js",
  #"mercury2/plain.js",
  #"mercury2/text.js",
  #"mercury2/markdown.js",
  "salsa.fresca.js",
  "salsa.js"
].map (file) ->
  return "#{__dirname}/#{file}"

prependConfig = (script, valueGenerators, req) ->
  prepend = ""
  for key of valueGenerators
    value = if _.isFunction(valueGenerators[key]) then valueGenerators[key](req) else valueGenerators[key]
    prepend = """#{prepend}\nvar #{key} = '#{value}';"""
  return "#{prepend}\n#{script}"

uncompressedEdit = ->
  editscript = ''
  clientScripts.forEach (filename, i) ->
    file = fs.readFileSync(filename, 'utf-8')
    editscript += "/* source: #{filename} */\n\n#{file}\n\n"
  return createScriptGenerator(editscript)

compressedEdit = ->
  createScriptGenerator(uglifyjs.minify(clientScripts).code)

sendScript = (scriptGenerator) ->
  (req, res, next) ->
    res.type('application/javascript')
    res.send(200, scriptGenerator(clientVariables, req))

generateInitScript = (compress) ->
  [ utils.validateOrganization, sendScript(initscript) ]

generateEditScript = (compress) ->
  editscript = if compress then compressedEdit() else uncompressedEdit()
  [ utils.validateOrganization, sendScript(editscript) ]

app.configure 'development', 'test', ->
  app.get('/picante', generateInitScript(false))
  app.get('/edit', generateEditScript(false))

app.configure 'production', ->
  app.get('/picante', generateInitScript(true))
  app.get('/edit', generateEditScript(true))

exports = module.exports = app


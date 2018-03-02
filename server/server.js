var fs = require('fs')
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var PHONEBOOKS_FILE = path.join(__dirname, 'phonebooks.json')

app.set('port', 3001)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.get('/', function(req, res){
  res.send("PHONE BOOK REST API")
})

app.get('/api/phonebooks', function(req, res){
  fs.readFile(PHONEBOOKS_FILE, function(err, data){
    if(err){
      console.error(err)
      process.exit(1)
    }
    res.json(JSON.parse(data))
  })
})

app.post('/api/phonebooks', function(req, res){
  fs.readFile(PHONEBOOKS_FILE, function(err, data){
    if(err){
      console.error(err)
      process.exit(1)
    }
    var phonebooks = JSON.parse(data)
    var phonebook = {
      id: req.body.id,
      name: req.body.name,
      phone: req.body.phone
    }
    phonebooks.push(phonebook)
    fs.writeFile(PHONEBOOKS_FILE, JSON.stringify(phonebooks, null, 3), function(err){
      if(err){
        console.error(err)
      }
      res.json(phonebook)
    })
  })
})

app.listen(app.get('port'), function(){
  console.log('server berjalan di port ' + app.get('port'))
})

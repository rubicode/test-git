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
    let phonebooks = JSON.parse(data)
    let phonebook = {
      id: req.body.id,
      name: req.body.name,
      phone: req.body.phone
    }
    phonebooks.push(phonebook)
    fs.writeFile(PHONEBOOKS_FILE, JSON.stringify(phonebooks, null, 3), function(err){
      if(err){
        console.error(err)
        process.exit(1)
      }
      res.json(phonebook)
    })
  })
})

 app.get("/api/phonebooks/:id", function(req, res) {
  fs.readFile(PHONEBOOKS_FILE, function(err, data) {
    if (err) {
      console.error(err);
    } else {
      var phonebooks = JSON.parse(data);
      var id = req.params.id;
      console.log(id);
      for (var i = 0; i < phonebooks.length; i++) {
        if (phonebooks[i].id === id) {
          phonebooks.splice(i, 1);
          break;
        }
      }
      console.log(phonebooks);
    }
    fs.writeFile(PHONEBOOKS_FILE, JSON.stringify(phonebooks, null, 3), function(err) {
      if (err) {
        console.error(err);
      } else {
        res.json(phonebooks);
      }
    });
  });
});

app.post("/api/phonebooks/:id", function(req, res) {
  let id = req.params.id;
  let name = req.body.name;
  let phone = req.body.phone;
  console.log('ID : '+id);
  console.log('Ini parameter input name dan phone : '+req.body);
  fs.readFile(PHONEBOOKS_FILE, function(err, data) {
    if (err) {
      console.error(err);
    } else {
      var phonebooks = JSON.parse(data);
      for (var i = 0; i < phonebooks.length; i++) {
        if (phonebooks[i].id === id) {
          phonebooks[i].name = name;
          phonebooks[i].phone = phone;
          break;
        }
      }
      console.log(phonebooks);
    }
    fs.writeFile(PHONEBOOKS_FILE, JSON.stringify(phonebooks, null, 3), function(err) {
      if (err) {
        console.error(err);
      } else {
        res.json(phonebooks);
      }
    });
  });
});




app.listen(app.get('port'), function(){
  console.log('server berjalan di port ' + app.get('port'))
})

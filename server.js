const express = require('express')
const app = express();
const html = require('./routes/html-routes');
var bodyParser = require('body-parser');


app.use(express.static('public'))
app.use('/scripts', express.static(__dirname + '/node_modules/three/build/'))
app.use('/controls', express.static(__dirname + '/node_modules/three/examples/jsm/controls/'))
app.use('/sounds', express.static(__dirname + '/sounds/'))
app.use('/textures', express.static(__dirname + '/textures/'))
app.use('/', html);


app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
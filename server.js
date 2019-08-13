var express = require('express');
var app = express();
var morgan = require('morgan');
var multer = require('multer');
var upload = multer();
var port = 3000;

app.use(morgan('dev'));
app.use(express.static('client'));
// app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  console.log('just /');
  res.redirect('/index.html');

});

app.get('/test', (req, res, next) => {
  console.log('works');
  res.end();
});

app.post('/csv', upload.none(), (req, res, next) => {
  console.log('body', req.body);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer();
var port = 3000;
var bodyParser = require('body-parser');


app.set('view engine', 'pug');
app.use(require('morgan')('dev'));
app.use(express.static('client'));
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
  res.render('index', {message: 'Choose a file or input into textbox'});
});

app.post('/text', (req, res, next) => {
  var result;
  console.log('csv: ', convertToCSV(req.body));
  try {
    res.send(convertToCSV(req.body));
  } catch (err) {
    res.send(err);
  }
  // res.send(convertToCSV(req.body));
});

app.post('/file', upload.single('file'), (req, res) => {
  var obj;
  try {
    obj = JSON.parse(req.file.buffer.toString());
    res.send(convertToCSV(obj));
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

const oneLineOfCSV = (obj) => {
  var testStr = [];
  for (let key of Object.keys(obj)) {
    if (key !== 'children') {
      testStr.push(obj[key]);
    }
  }
  testStr = testStr.join(',');
  testStr += '\n';
  return testStr;
};

const getKeys = (obj) => {
  var testStr = [];
  for (let key of Object.keys(obj)) {
    if (key !== 'children') {
      testStr.push(key);
    }
  }
  testStr = testStr.join(',');
  testStr += '\n';
  return testStr;
};

const convertToCSV = (obj) => {
  var result = '';
  result += getKeys(obj);
  var recurse = (obj) => {
    result += oneLineOfCSV(obj);
    
    if (obj.children) {
      for (let child of obj.children) {
        recurse(child);
      }
    }
  };
  recurse(obj);
  return result;
};
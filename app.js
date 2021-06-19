const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.static('public'));
//Get the values from submitted form
app.use(express.urlencoded({extended: false}));

// Define the connection constant and set it to code containing the connection information
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'passgass',
  database: 'list_app'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('Connected!');
});


app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      //test the data from the database in the console
      //console.log(results);
      res.render('index.ejs', {items: results});
    });
});

// Add a route to display the create page
app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  //Add an item to the list 
  //console.log(req.body.itemName);
  connection.query(
    //Insert item from form into database
    'INSERT INTO items (name) VALUES (?)',
    [req.body.itemName],
    (error, results) => {
      res.redirect('/index');
      }
    );
  });


app.listen(3000);
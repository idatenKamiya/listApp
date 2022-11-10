const express = require('express');
const mysql = require('mysql');
const app = express();

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

app.post('/delete/:id', (req, res) => {
  connection.query(
  //console.log(req.params.id);
    'DELETE FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    });
});

// Add a route for the edit page
app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {item: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE items SET name = ? WHERE id = ?',
    [req.body.itemName, req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});


app.listen(3000);
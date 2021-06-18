const express = require('express');
const mysql = require('mysql');
const app = express();

app.get('/', (req, res) => {
  res.render('hello.ejs');
});

app.get('/top', (req, res) => {
  res.render('top.ejs');
});
  

app.listen(3000);
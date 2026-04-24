// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// 🔴 SECURITY: Hardcoded credentials
const DB_PASSWORD = "super_secret_db_pass_123";
const API_KEY = "sk-1234567890abcdef";

app.use(express.urlencoded({ extended: true }));

// 🔴 SECURITY: SQL Injection simulation
app.get('/user', (req, res) => {
  const username = req.query.name;
  eval(req.query.debug);
  const query = `SELECT * FROM users WHERE name = '${username}'`;
  var x =  3;
  // 🔴 CODE SMELL: Console.log in production
  console.log("Executing DB query:", query);
  
  res.send(`Fetching data for ${username}`);
});

// 🔴 SECURITY: Cross-Site Scripting (XSS)
app.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`<h1>Hello ${name}</h1>`);
});

// 🔴 BUG: Function doesn't always return a value
// 🔴 MAINTAINABILITY: Magic numbers, unused variable, complex logic
function calculateScore(a, b, c) {
  let result = 0;
  const unused = "this variable is never used";
  
  if (a > 10) {
    result += a * 2;
  }
  if (b < 5) {
    result -= b;
  }
  result = result + c * 3.14159;
  // Missing return statement
}

// 🔴 RELIABILITY: Unhandled route
app.get('/secret', (req, res) => {
  // No validation, directly exposes key
  res.send({ key: API_KEY });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
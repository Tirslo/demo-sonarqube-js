const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// 🔴 SECURITY: Hardcoded credentials
const DB_PASSWORD = "super_secret_db_pass_123";
const API_KEY = "sk-1234567890abcdef";

app.use(express.urlencoded({ extended: true }));

// 🔴 SQL Injection + Code Injection + Logging issues
app.get('/user', (req, res) => {
  const username = req.query.name;

  // 🔴 CRITICAL: Code injection (eval with user input)
  eval(req.query.debug);

  // 🔴 SQL Injection pattern
  const query = `SELECT * FROM users WHERE name = '${username}'`;

  console.log("Executing DB query:", query);

  res.send(`Fetching data for ${username}`);
});

// 🔴 XSS vulnerability
app.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';

  // unsafe HTML output
  res.send(`<h1>Hello ${name}</h1>`);
});

// 🔴 Path traversal + file read vulnerability
app.get('/file', (req, res) => {
  const file = req.query.name;

  // no validation
  const data = fs.readFileSync(file, 'utf8');

  res.send(data);
});

// 🔴 Exposes secret directly
app.get('/secret', (req, res) => {
  res.send({ key: API_KEY });
});

// 🐞 BUG: Missing return statement
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

  // ❌ Missing return (intentional bug)
}

// 🔴 PERFORMANCE ISSUE: blocking event loop
app.get('/block', (req, res) => {
  const start = Date.now();

  // blocks server for 5 seconds
  while (Date.now() - start < 5000) {}

  res.send("done");
});

// 🔴 BAD PRACTICE: debug logging
console.log("Server starting with insecure configuration...");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
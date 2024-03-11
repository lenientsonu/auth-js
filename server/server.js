const http = require('http');
const mysql = require('mysql');
const url = require('url');
const querystring = require('querystring');


// create a server to collect data from client and send it to mysql db
const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);
  
  // Handling POST requests
  if (req.method === 'POST' && reqUrl.pathname === '/addData') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const postData = querystring.parse(body);
      // Connect to MySQL database
      const connection = mysql.createConnection({
        host: 'localhost',
        user: 'your_mysql_username',
        password: 'your_mysql_password',
        database: 'your_database_name'
      });
      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to connect to database' }));
          return;
        }
        console.log('Connected to MySQL database');
        const sql = `INSERT INTO your_table_name (field1, field2, field3) VALUES (?, ?, ?)`;
        const values = [postData.field1, postData.field2, postData.field3]; // Adjust field names as per your requirements
        connection.query(sql, values, (err, result) => {
          if (err) {
            console.error('Error inserting data:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'An error occurred while inserting data' }));
          } else {
            console.log('Data inserted successfully');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Data inserted successfully' }));
          }
          connection.end(); // Close connection after query execution
        });
      });
    });
  } else {
    // Handling other requests
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

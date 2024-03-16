const http = require('http');
const mysql = require('mysql');
const url = require('url');
const querystring = require('querystring');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name',
  connectionLimit: 10 // Adjust the connection limit as per your requirements
});

// Create an HTTP server
const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);

  // Handle POST requests to add data
  if (req.method === 'POST' && reqUrl.pathname === '/addData') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const postData = querystring.parse(body);

      // Acquire a connection from the pool
      pool.getConnection((err, connection) => {
        if (err) {
          console.error('Error getting MySQL connection:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to get database connection' }));
          return;
        }

        // Perform an INSERT query to add data
        connection.query('INSERT INTO your_table_name SET ?', postData, (err, result) => {
          connection.release(); // Release the connection back to the pool

          if (err) {
            console.error('Error executing MySQL query:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'An error occurred while inserting data' }));
            return;
          }

          // Send success response
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Data inserted successfully' }));
        });
      });
    });
  }
  
  // Handle GET requests to retrieve data
  else if (req.method === 'GET' && reqUrl.pathname === '/getData') {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting MySQL connection:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to get database connection' }));
        return;
      }

      // Perform a SELECT query to retrieve data
      connection.query('SELECT * FROM your_table_name', (err, rows) => {
        connection.release(); // Release the connection back to the pool

        if (err) {
          console.error('Error executing MySQL query:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'An error occurred while retrieving data' }));
          return;
        }

        // Send the retrieved data as JSON response
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(rows));
      });
    });
  }

  // Handle other requests
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

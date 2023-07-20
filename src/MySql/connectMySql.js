var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'F66Fson04',
  database : 'TK'
});

connection.connect();

connection.query('SELECT * from INVENTORY', function(err, rows, fields) {
  if (!err) {
      console.log('Number of rows in table INVENTORY: ', rows.length);
      console.log('The solution is: ', rows);
  } else {
    console.log('Error while performing Query.');
  }
});

connection.end();
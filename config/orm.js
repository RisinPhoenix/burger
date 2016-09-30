/*
Here is the O.R.M. where you write functions that takes inputs and conditions and turn them into database commands like SQL.
*/
// require connection.js to access the database
var connection = require('../config/connection.js');

// function to help insertOne handle multiple inputs and build them into a command line for mysql
function printQuestionMarks(num){
  var arr = [];

  for (var i=0; i<num; i++){
    arr.push('?')
  }

  return arr.toString();
}

// function to take an objects key values and key and display them in a mysql command line.
function objToSql(ob){
  var arr = [];

  for (var key in ob) {
    arr.push(key + '=' + ob[key]);
  }

  return arr.toString();
}

// orm - Object Relation Method
var orm = {
  // function to select all and return the information as a call back
    selectAll: function(tableInput, cb) {
        var queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    //vals is an array of values that we want to save to cols
    //cols are the columns we want to insert the values into
    //function to let us add new burgers to our table
    insertOne: function(table, cols, vals, cb) {
      var queryString = 'INSERT INTO ' + table;

      queryString = queryString + ' (';
      queryString = queryString + cols.toString();
      queryString = queryString + ') ';
      queryString = queryString + 'VALUES (';
      queryString = queryString + printQuestionMarks(vals.length);
      queryString = queryString + ') ';

      console.log(queryString)

      connection.query(queryString, vals, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    },
    //objColVals would be the columns and values that you want to update
    //an example of objColVals would be {name: panther, sleepy: true}
    //function to let us update the statues of a burger.
    updateOne: function(table, objColVals, condition, cb) {
      var queryString = 'UPDATE ' + table;

      queryString = queryString + ' SET ';
      queryString = queryString + objToSql(objColVals);
      queryString = queryString + ' WHERE ';
      queryString = queryString + condition;

      console.log(queryString)
      connection.query(queryString, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    }
};

module.exports = orm;

'use strict' //do not know what this does
const Pool = require('pg-pool'); //get PG pool for pool
const config = require('./config.json');

const { //gets variables from config.json 
    table,
    host,
    database,
    user,
    password,
    port
} = config;

const pool = new Pool({ //makes a new Postgres instance
    host,
    database,
    user,
    password,
    port,
    idleTimeoutMillis: 1000
});

module.exports.putPins = (event, context, callback) => {
    let {image,litterType,comment,long,lati,editName} = event.body;
    const putSomeMovie = `UPDATE ${table} SET image = $1, litterType = $2, comment = $3, long = $4, lati = $5 WHERE id = $6;`; //commands postgres to get data from table

    pool.connect()
    .then(client => {
        client.release();
        return client.query(putSomeMovie,[image,litterType,comment,long,lati,editName]);
    })
    .then(data => {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({
            message: data,
            input: event,
          }),
        };
  
  
        callback(null, response);
    });
};

/*
{
    "table": "movies",
    "host": "jrdevleague.cb9co1xxtizk.us-west-2.rds.amazonaws.com",
    "database": "whs_tim_kunta_kinte_jameson",
    "user": "jrdevleague",
    "password": "jrD3vLeague!",
    "port": 5432
  }
  YOU FUCKIN SUCK !!!
*/
const express = require('express');
let app = express(); 
var cors = require('cors');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const pgp = require('pg-promise')();

const dbConfig = { //DB info & Login
    host: 'localhost',
    port: 5432,
    database: 'gitbread',
    user: 'postgres',
    password: ''
};
let db = pgp(dbConfig);


app.get('/test', (req, res) =>{ //Test get request
    console.log('Obtained GET request for /test');
    res.send({
        head1: 'header1',
        head2: 'header2'
    });
});

app.listen(8082, () =>{ //Start server on 8081
    console.log('Listening on port 8082');
});
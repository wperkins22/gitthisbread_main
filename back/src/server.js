const express = require('express');
let app = express(); 
var cors = require('cors');

var cookieParser = require('cookie-parser');
app.use(cookieParser());
//app.use(session({key: 'user_info', secret: "yWqr0tmVqrGaxC4U", resave: false, saveUninitialized: false, cookie: {expires: 600000}}));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const pgp = require('pg-promise')();

const dbConfig = { //DB info & Login for postgres
    host: 'localhost',
    port: 5432,
    database: 'gitbread',
    user: 'postgres',
    password: '123'
};

/*
const dbConfig = { //DB info & Login for mySQL
    host: 'localhost',
    port: 3306,
    database: 'gitbread',
    user: 'root',
    password: '123'
};
*/
let db = pgp(dbConfig);

//If the user has a cookie left over already, but no seesion info, clear the cookie
/*app.use((req, res, next) => {
    if (req.cookies.user_info && !req.session.user) {
        res.clearCookie('user_info');        
    }
    next();
});*/

app.get('/', (req, res) =>{ //Test get request
    //Check if cookie has been created
    //If logged in repalce 'LOGIN' header with signout
    console.log('Obtained GET request for /');
    var login = req.cookies['login'];
    console.log(login);
    if(login == 1){
        res.send({
            head1: 'Home',
            head2: 'Tables',
            head3: 'Signout'
        });
    }else{
        res.send({
            head1: 'Home',
            head2: 'Tables',
            head3: 'Login'
        });
    }
});
//app.get('/login') //GET basic info for login page: nothing maybe?
app.post('/login', (req, res) =>{
    console.log('POST request for /login');
    //console.log(req);
    var userName = req.body.userInfo.userName;
    var password = req.body.userInfo.password;

    if(password.match(/[;'"{}()]/) || userName.match(/[;'"{}()]/)){
        console.log("Login info contained bad characters, stopped.");
        res.cookie('login', '0', {maxAge: 900000});
        res.send({Mesg: "Bad character in password or username!"});
    
    }
    var quer = "SELECT count(*) FROM employees WHERE password = '" + password + "' AND employeeemail = '" + userName + "';";
    db.any(quer)
        .then(function(data){
            if(data[0].count != '1'){
                console.log("Login failure");
                res.send({Mesg: "Account not found!"});
            }else{
                console.log("Login success!");
               res.cookie('login', '1', {maxAge: 900000}).send({Mesg: "Login success!"})
            }
        })
        .catch(function(err){
            console.log(err);
            res.send({Mesg: "Database connection error, try again!"});
        })

}) //Send password & user for authentication with DB
//Respond with login authenticated cookie
app.get('/signout', (req, res) =>{
    res.clearCookie('login').send();
})

app.listen(8082, () =>{ //Start server on 8081
    console.log('Listening on port 8082');
});

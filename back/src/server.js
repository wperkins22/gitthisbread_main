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
            head3: 'Signout',
            head4: 'Register'
        });
    }else{
        res.send({
            head1: 'Home',
            head2: 'Tables',
            head3: 'Login',
            head4: 'Register'
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
               res.cookie('login', '1', {maxAge: 900000}).send({Mesg: "Login success!"});
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

//Registration functions
function validateNumber(number) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (number.match(phoneno))
    {
	return true;
    }
    return false;
}
function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
//Registration
app.post("/Register", (req, res) => {
  console.log("POST request for /Register");
  var password = req.body.userInfo.password;
  var confirmPassword = req.body.userInfo.confirmPassword;
  var email = req.body.userInfo.email;
  var dateOfBirth = req.body.userInfo.dateOfBirth;
  var FN = req.body.userInfo.firstName;
  var LN = req.body.userInfo.lastName;
  var PN = req.body.userInfo.phoneNumber;
  var query2 = "SELECT MAX(employeeid) FROM employees;";
  var query3 =
    "SELECT COUNT(*) FROM employees WHERE employeeemail = '" + email + "';";
  db.any(query3)
    .then(function(data) {
      if (data[0].count != 0) {
      console.log("error - more than 1 account already created");
      res.send({ Msg: "An account has already been created under this email!" });
      }
	else if (validateNumber(PN) === false)
	{
	   res.send({ Msg: "Invalid phone number!" });
	}
	else if(/[;:'"(){}]/.test(password)){
           res.send({ Msg: "Invalid character in password!" });
        }
	else if (!validateEmail(email)){
	   res.send({ Msg: "Invalid email!" });
	}
	/*else if (Object.prototype.toString.call(new Date(dateOfBirth)) !== "[object Date]")
	{
	   res.send({ Msg: "Invalid date!" });
	}*/ //not working right now for some reason
	else if (password != confirmPassword)
	{
	   res.send({ Msg: "Passwords do not match!" });
	}
	else if (password.length <= 4)
	{
	   res.send({ Msg: "Password too short!" });
	}
	else {
        var employeenum = 1;
        db.any(query2).then(function(data) {
          employeenum = data[0].max + 1;
          var query =
            "INSERT INTO employees (employeeid,password,firstname,lastname, birthDate, employeephone,employeeemail,jobtitle) VALUES ('" +
            employeenum +
            "', '" +
            password +
            "','" +
            FN +
            "', '" +
            LN +
            "', '" +
	    email +
	    "','" +
            PN +
            "', 'Employee','" +
            dateOfBirth +
            "');";
          db.any(query)
            .then(function(data) {
		res.send({ Msg: "Success" });
	    })
            .catch(function(err) {
              console.log(err);
            });
        });
      }
    })
    .catch(function(err) {
      console.log(err);
    });
});

app.get('/Tables', (req, res) =>{
	console.log('GET request for /tables');
	var query = "SELECT * FROM Tables;";
	db.any(query)
	.then(function(data){
		console.log(data);
		return res.json(data);
	})
	.catch(function(err){
		console.log(err);
	})
})

app.listen(8082, () =>{ //Start server on 8081
    console.log('Listening on port 8082');
});




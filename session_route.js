var express = require('express');
var bodyParser=require("body-parser");
var ejs = require("ejs");
var path=require("path");
var mysql = require('mysql');
const bcrypt = require("bcrypt");

const sessions = require('express-session');
const cookieParser = require("cookie-parser");

var app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, './views'));
app.engine('.ejs', ejs.__express);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(express.static(path.join(__dirname,'public')));
app.use('/css',express.static(path.join(__dirname,'public/css')));



app.use('/images',express.static(path.join(__dirname,'public/images')));


// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(cookieParser());


const myusername = 'user1'
const mypassword = 'user'

// a variable to save a session
var session;

app.get('/',(req,res) => {
    session=req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.render('session_login');
});


app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        //res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
        res.render('test_session',{user:session.userid}) 

    }
    else{
        res.send('Invalid username or password');
    }
})


app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});


app.get('/test_user',function(req,res){
    if(session.userid){
        res.send({data_status:"SUCCESS_GET",user:req.query.user,session_status:req.session});   
    }
    else{
        res.send("404")
    }
        


    
});

var server = app.listen(8079, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })
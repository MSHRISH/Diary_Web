var express = require('express');
var bodyParser=require("body-parser");
var ejs = require("ejs");
var path=require("path");
var mysql = require('mysql');
const bcrypt = require("bcrypt");

var sessions = require('express-session');
const cookieParser = require("cookie-parser");
const { send } = require('process');




let secrateKey = "secrateKey";
const crypto = require('crypto');


function encrypt(text) {
    encryptalgo = crypto.createCipher('aes192', secrateKey);
    let encrypted = encryptalgo.update(text, 'utf8', 'hex');
    encrypted += encryptalgo.final('hex');
    return encrypted;
}

function decrypt(encrypted) {
    decryptalgo = crypto.createDecipher('aes192', secrateKey);
    let decrypted = decryptalgo.update(encrypted, 'hex', 'utf8');
    decrypted += decryptalgo.final('utf8');
    return decrypted;
}


 


//uname=shrishtest
//pwrd=123456

var app = express();

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

// a variable to save a session
var session;






app.set('view engine','ejs');
app.set('views', path.join(__dirname, './views'));
app.engine('.ejs', ejs.__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(express.static(path.join(__dirname,'public')));
app.use('/css',express.static(path.join(__dirname,'public/css')));



app.use('/images',express.static(path.join(__dirname,'public/images')));


//render home page
app.get("/",function(req,res){
    req.session.destroy();
    res.render('home');
});


//render login page
app.get('/login',function(req,res){
    res.render('login')
});

app.post('/login_chk',async function(req,res){
    var details={uname:req.body.uname,pwrd:req.body.pwrd}
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "diarytest"
      });
//console.log(details.uname);
      var q_detail=[];
      con.connect(function(err) {
        if (err) throw err;
        var sql="SELECT * FROM `users` WHERE `Uname`='"+details.uname+"';";
        con.query(sql,async function(qerr,result){
                if(qerr) throw qerr;

               
                    
                var q_json;
                console.log(result);
                
                result.forEach(element => {
                    q_json={uname:element.Uname,pwrd:element.Pword}
                    q_detail.push(q_json);
                                
                })
                            
                if(q_detail.length==0){
                    res.send({login:'fail'});
                }
                else{
                    console.log(q_detail);
                            
                    const validPassword = await bcrypt.compare(details.pwrd, q_detail[0].pwrd);
                    if(validPassword){
                        session=req.session;
                        session.userid=details.uname;
                        console.log(req.session)
                        res.send({login:"success",user:session.userid})
                    }
                    else{
                        res.send({login:'fail'});
                    }
                }
                           
                    

               
                
                
        });


    });



});

//render signup page
app.get("/signup",function(req,res){
   res.render('signup');
    
});

//render app home page
app.get('/app',function(req,res){
    session=req.session
   if(session.userid){
    console.log(session.userid);
    res.render('app')
   }
   else{
    res.send("404");
   }
   
    
});

//render write page
app.get('/write',function(req,res){
    session=req.session
    if(session.userid){
        //console.log("WRITE")
     //console.log(session.userid);
     res.render('write')
    }
    else{
     res.send("404");
    }
});


app.post('/write_ins',async function(req,res){
    var detail={title:req.body.title,content:req.body.content};

    detail.title=encrypt(detail.title);
    detail.content=encrypt(detail.content); 
   

   

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "diarytest"
      });

      con.connect(function(err){
        if(err) throw err;

        const dateString = new Date().toLocaleString();
        

        var sql="INSERT INTO `journal`(`uname`, `title`, `content`, `time`) VALUES ('"+session.userid+"','"+detail.title+"','"+detail.content+"','"+dateString+"')";
        con.query(sql,function(qerr,result){
            if(qerr) throw qerr;
            res.send({data_status:"success"});
        });
      });

});




//render read page
app.get('/read',function(req,res){
    session=req.session
    console.log(session.userid);
    if(session.userid){

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "diarytest"
          });

          var user_journals=[]
          con.connect(function(err){
            if(err) throw err;
            var sql="SELECT * FROM `journal` WHERE `uname`='"+session.userid+"';"
            con.query(sql,function(qerr,result){
                
                    result.forEach(element => {
                        var r_json={uname:element.uname,title:element.title,content:element.content}
                        
                        r_json.title=decrypt(r_json.title);
                        r_json.content=decrypt(r_json.content);
                        user_journals.push(r_json);
                    });
                    res.render('read',{user_journals:user_journals});
                

                
            });
          });
        
        

    }
    else{
        res.send("404");    
    }




    
});


app.post("/read_journal",function(req,res){
    var details={journal_name:req.body.journal_name}
    details.journal_name=encrypt(details.journal_name);
    var con = mysql.createConnection({
        host: "localhost",
        user: "root", 
        password: "",
        database: "diarytest"
      }); 

      var journal_details;
      con.connect(function(err){
        if(err) throw err;
        var sql="SELECT * FROM `journal` WHERE `title`='"+details.journal_name+"';";
        con.query(sql,function(qerr,result){
            if(qerr) throw qerr;
            result.forEach(element => {
                var q_json={content:element.content};
                q_json.content=decrypt(q_json.content);
                //journal_details.push(q_json);
                journal_details=q_json;
            });
            //res.send({content:journal_details});
            res.send(journal_details);
        });
      });

   

});









//render profile page
app.get('/profile',function(req,res){
    session=req.session;
    if(session.userid){
        var con = mysql.createConnection({
            host: "localhost",
            user: "root", 
            password: "",
            database: "diarytest"
          }); 
        var profile_details; 
        con.connect(function(err){
            if(err) throw err;
            var sql="SELECT `S.no`, `Uname`, `phnumber`, `mail`, `Pword` FROM `users` WHERE `Uname`='"+session.userid+"';";
            con.query(sql,function(qerr,result){
                if(qerr) throw qerr;
                result.forEach(element => {
                    var q_json={uname:element.Uname,phn:element.phnumber,mail:element.mail};
                    profile_details=q_json; 
                });
                res.render('profile',{profile:profile_details});
            });
        });
    }
    else{
        res.send("404");
    }
    
});

//render editprofile page
app.get('/editprofile',function(req,res){
    res.render('edit');
});


//post test
app.post('/request_write',function(req,res){
    var x=res.json([{
        mode:req.body.mode,
        name_recieved: req.body.name,
        designation_recieved: req.body.designation
     }])
     console.log("TEST");
     console.log(x.mode);
})


//post signup a user
app.post('/signupuser',async function(req,res){
    
    var user_details={user:req.body.uname,phn:req.body.phn,mail:req.body.mail,pwrd:req.body.pwrd,cpwrd:req.body.cpwrd};
    
    //hashing the password    
    user_details.pwrd=await bcrypt.hash(user_details.pwrd,10); 
  
    //console.log(user_details);

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "diarytest"
      });
      con.connect(function(err) {
        if (err) throw err;
        //console.log("Connected!");
        var sql = "INSERT INTO `users`(`Uname`, `phnumber`, `mail`, `Pword`) VALUES ('"+user_details.user+"','"+user_details.phn+"','"+user_details.mail+"','"+user_details.pwrd+"')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          res.send({data_status:"success"});
        });
      });


    
});

var server = app.listen(8069, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })
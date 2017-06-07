var express=require('express'), app=express(),engine=require('consolidate'),bodyParser=require('body-parser'),mongoClient=require('mongodb').MongoClient, session=require('express-session'),MongoDBStore=require('connect-mongodb-session')(session);


app.engine('html',engine.nunjucks);
app.set('view engine','html');
app.use(express.static(__dirname+'/assets'));
app.use(express.static(__dirname+'/views'));

/*app.set('views',__dirname+'/views');*/

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var conn_str = 'mongodb://localhost:27017/user';
var str = new MongoDBStore({
    uri:'mongodb://localhost:27017/user',
    collection:'userC'
})
app.use(
session({
    secret:'user_sess_secret_key',
    resave:true,
    saveUninitialized:true,
    store:str
})
);
str.on('error',function(error)
      {
    console.log(error);
})

var session_obj=""; 

app.get('/',function(req,res){
   req.session.isloggedIn=false;
    req.session.reset();
  res.redirect('http://localhost:3303/#/');
  req.preventDefa
})
/*
app.get('/logout',function(req,res){
  //  res.render("login");
    
})
app.get('/monitor.html',function(req,res){
   // res.render("monitor");
    u
})
app.get('/student.html',function(req,res){
   
   // res.render("student");
    
})
app.get("/login.html",function(req,res){
   // res.render("login");
})
app.get('/signup.html',function(req,res){
    
  //  res.render("signup");
    
})

app.get('/home.html',function(req,res){
       
  //  res.render("home");
})*/

app.post('/login',function(req,res){
    
    //console.log(req.body.uname+req.body.pwd);

    var usr=req.body.uname;
    var pass=req.body.pwd;
    mongoClient.connect(conn_str, function(err, db) {
        
        db.collection('userC').find({"uname":usr,"pass":pass}).toArray(function(err,data){
         if(data.length==0)
                {
                req.session.isloggedIn=false;
                console.log("No user");
                }
            else
                {
                    console.log(data);
                    req.session.isloggedIn=true;
                    req.session.username=usr;
                    res.send(data);
                    
                }
         
        });
        db.close();
        
    });
    
})
app.post('/monitor',function(req,res){
    
    //console.log(req.body.uname+req.body.pwd);
    var batch=req.body.batch;
    mongoClient.connect(conn_str, function(err, db) {
        
        db.collection('userstud').find({"batch":batch}).toArray(function(err,data){
         if(data.length==0)
                {
                console.log("No user");
                }
            else
                {
                    console.log(data);
                    
                    res.send(data);
                    
                }
         
        });
        db.close();
        
    });
    
})

app.post('/signup', function(req, resp) {
	
  console.log("hello");
	mongoClient.connect(conn_str, function(err, db) {
		
      	var newDoc = {'fname': req.body.frname ,'lname': req.body.ltname,'uname': req.body.uname,'pass':req.body.pwd};

			db.collection('userC').insert(newDoc, function(err, res) {
				if(err) {
					console.log('Error happened while trying to insert a new document');
				} else {
					console.log('Document added');
				}
			});
			db.close();
			
		})
		
	})
app.post('/addstud', function(req, resp) {
    
  console.log("hello student");
    mongoClient.connect(conn_str, function(err, db) {
        
        var newDoc = {'batch':req.body.batch,'stname': req.body.name ,'stsub1': req.body.sub1,'stsub2': req.body.sub2,'stsub3':req.body.sub3};

            db.collection('userstud').insert(newDoc, function(err, res) {
                if(err) {
                    console.log('Error happened ');
                } else {
                    console.log('student added');
                }
            });
            db.close();
            
        })
        
    })
	


app.listen(3303,function() {
	console.log('Server listening at port 3303');
})


const express = require('express'),
      app = express();
      
function sayHello(request,response,next){
  console.log("Imust be called");
  response.send("TEST @");
  next();
}

app.get('/', sayHello, (request, response)=>{
  response.send('sayHello');
});

app.listen(3000,()=>console.log('Express server started at port 3000'));
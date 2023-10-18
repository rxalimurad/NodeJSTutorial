var express = require('express');
const postgreRepo = require('./PostgreRepo.js');

var app = express();

app.use(express.json()); // Add this line to enable JSON parsing



app.get('/create',  async function (req, res) {
   console.log("start creating user table ");
   try {
      let result =  await postgreRepo.createUsersTable();
      res.send("Table Created " + JSON.stringify(result));
   } catch(err) {
      res.send(err)
   }

});

app.delete('/delete', async function (req, res) {
   try {
      console.log("start deleting user table ");
      let result  = await postgreRepo.deleteUserTable();
      res.send("Table Deleted " + JSON.stringify(result));
   } catch(err) {
      res.send("Error " +  JSON.stringify(err))
   }

});

app.post('/addUser', async function(req,res){

try{
   const userData = req.body;
   console.log("start adding user table " );
   let result  =  await postgreRepo.addUser(userData);
   res.send(JSON.stringify(result));
}catch(err){
   res.send("Error" + err)
}
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});

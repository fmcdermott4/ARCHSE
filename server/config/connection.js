const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(
  process.env.DB_URI, /*|| "mongodb://localhost/archse",*/
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://fmcdermott4:<password>@cluster0.4yhiu.mongodb.net/FranksDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// const {MongoClient} = require('mongodb');
// async function main() {
//   const uri = "mongodb+srv://fmcdermott4:3s97QFde4DisXfP@cluster0.4yhiu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   try{
//     await client.connect();
//     await listDatabases(client);
//   } catch(error){
//     console.error(error)
//   } finally {
//     await client.close();
//   }
  
// }
// main().catch(console.error)

// async function listDatabases(client) {
//   const databasesList = await client.db().admin().listDatabases();

//   databasesList.databases.forEach(db =>{
//     console.log(`- ${db.name}`)
//   })
// }


// module.exports = MongoClient.connection;
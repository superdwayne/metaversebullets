const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://dpm:Marshall99@cluster0.ncemy.mongodb.net/YANA?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useUnifiedTopology: true});

client.connect().then((client)=>{
    var db = client.db('metaverse')
    db.collection('bites').find().toArray(function (err, result) {
        if (err) throw err
      //  console.log(">> Whats in DB >>", result);
        
    })
})

const mongo = {
    uri: "mongodb+srv://dpm:Marshall99@cluster0.ncemy.mongodb.net/Yana?retryWrites=true&w=majority?mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb",
    db: 'metaverse',
    params: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }

const mongoInsert = (collection, obj, cb) => {
  MongoClient.connect(mongo.uri, mongo.params , function(err, db) {
    if (err) throw err
    const dbo = db.db(mongo.db)
    dbo.collection(collection).insertMany(obj, function(err, response) {
      if (err) throw err
      db.close()
      cb(response)
    })
  })
}

const mongoFind = (collection, query, limit, cb) => {
    MongoClient.connect(mongo.uri, mongo.params , function(err, db) {
      if (err) throw err
      const dbo = db.db(mongo.db)
      dbo.collection(collection).find(query).sort({ _id: -1 }).limit(limit).toArray(function(err, response) {
        if (err) throw err
        db.close()
        cb(response)
      })
    })
  }


module.exports = { mongoInsert, mongoFind }
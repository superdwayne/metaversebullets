const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://dpm:Marshall99@cluster0.ncemy.mongodb.net/metaverse?retryWrites=true&w=majority',
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully to Database");
});

module.exports = db 
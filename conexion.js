const mongoose = require("mongoose")
const uri = "";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log("Connected to DB!"))
.catch(err => console.log(err))

const mongoose = require("mongoose")
const uri = "mongodb+srv://vans8x:asdasd123@cluster0.8znlrcy.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log("Connected to DB!"))
.catch(err => console.log(err))
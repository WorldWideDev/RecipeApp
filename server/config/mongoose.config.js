const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/recipes", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Established a connection to the db"))
    .catch(err => console.log("Something went wrong when connecting to the db", err))

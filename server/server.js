const Recipe = require('./models/recipe.model.js');
const seedData = require('./utils/seedData.json');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3030;

// configure the app's functionality
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// access to the data
require('./config/mongoose.config.js');

// add in the routes
require('./routes/recipe.routes')(app);

// seed data if db is empty
Recipe.estimatedDocumentCount((err, count) => {
    console.log(`checking to seed data: ${count} records found`);
    if(err) { console.log(err) }
    else if(count < 1) {
        Recipe.insertMany(seedData)
            .then(recipes => console.log(recipes))
            .catch(err => console.log(err));
    }
})


app.listen(port, () => console.log(`listening on port: ${port}`));

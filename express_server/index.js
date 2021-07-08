require('dotenv/config');
const express = require('express');
const app = express(); 
const mongoose = require('mongoose');
const cors = require('cors');
const chalk = require('chalk');

// Express settings
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());


//Express APIs
const trips = require('./routes/trip.routes');
const users = require('./routes/auth.routes');
const images = require('./routes/image.route');

//MongoDB conection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(chalk.cyan('Database connected'));
},
    error => {
        console.log("Database can't be connected: " + error)
    }
)

// Remvoe MongoDB warning error
mongoose.set('useCreateIndex', true);

app.set('view engine','ejs');

//Define Routes
app.use('/trips', trips)
app.use('/users', users)
app.use('/images', images)

// Define PORT
const port = process.env.PORT || 4000;
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})

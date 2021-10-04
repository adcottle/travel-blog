require('dotenv/config');
const express = require('express');
const app = express(); 
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');
const chalk = require('chalk');

// Express settings
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());


//Express APIs
const trips = require('./routes/trip.routes');
const auth = require('./routes/auth.routes');
const users = require('./routes/user.routes');
const images = require('./routes/image.route');

//MongoDB conection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(chalk.blueBright('Database connected'));
},
    error => {
        console.log(chalk.redBright("Database can't be connected: " + error));
    }
)

// Remvoe MongoDB warning error
mongoose.set('useCreateIndex', true);

app.set('view engine','ejs');

//Define Routes
app.use('/trips', trips);
app.use('/auth', auth);
app.use('/images', images);
app.use('/users', users);
app.use(express.static(__dirname + '/dist'))

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));


// Define PORT
const port = process.env.PORT || 4000;
app.listen(port, err => {
    if (err)
        throw err
    console.log(chalk.yellowBright('Server listening on port', port));
})

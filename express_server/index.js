require('dotenv/config');
const express = require('express');
const app = express(); 
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// const http = require('http');
const https = require('https');
const fs = require('fs');
const chalk = require('chalk');

const options = {
    key: fs.readFileSync('./certs/cert.key'),
    cert: fs.readFileSync('./certs/cert.crt')
}

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

const server = https.createServer(options, app);

// Define PORT
const port = process.env.PORT || 8000;
server.listen(port, err => {
    if (err)
        throw err
    console.log(chalk.yellowBright('Server listening on port', port));
})

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const bodyParser = require('body-parser');
const dbConfig = require('./database/db');

// Express APIs
const trip = require('./routes/trip.routes')
const users = require('./routes/auth.routes')

// MongoDB conection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected')
},
    error => {
        console.log("Database can't be connected: " + error)
    }
)

// Remvoe MongoDB warning error
mongoose.set('useCreateIndex', true);


// Express settings
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());

// Serve static resources
app.use('/public', express.static('public'));

app.use('/trip', trip)
app.use('/users', users)

// Define PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dbConfig = require('./database/db');

// mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.db, {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true
// }).then(() => {
//     console.log('Database sucessfully connected ')
//   },
//   error => {
//     console.log('Database error: ' + error)
//   }
// )

// // Express APIs
// const api = require('./routes/trip.routes')
// const user = require('./routes/auth.routes')

// // Remvoe MongoDB warning error
// mongoose.set('useCreateIndex', true);

// //Express Settings
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({
//   extended: false
// }));
// app.use(cors());


// // API root
// app.use('/api', api)
// app.use('/users', user)

// // Serve static resources
// //app.use('/public', express.static('public'));

// // Define PORT
// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//   console.log('Connected to port ' + port)
// })

// // 404 Handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// // Base Route
// app.get('/', (req, res) => {
//   res.send('invaild endpoint');
// });

// // Express error handling
// app.use((req, res, next) => {
//   setImmediate(() => {
//       next(new Error('Something went wrong'));
//   });
// });

// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });
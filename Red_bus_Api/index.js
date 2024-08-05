const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('./dbConection/databaseConnection');

const bodyParser = require('body-parser');

const cooKiParser =require('cookie-parser');




// Middleware
app.use(cooKiParser());
app.use(bodyParser.json({ limit: '10mb' })); // Increase limit for body-parser
app.use(express.json({ limit: '10mb' })); // Increase limit for express.json
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Increase limit for express.urlencoded

// CORS configuration and routes...
var corsOptions = {
    origin: ['http://localhost:4200'], // Trusted domains
    optionsSuccessStatus: 200,
    credentials: true // Allow credentials (cookies) to be sent
  };
  app.use(cors(corsOptions));
  
  const Operatorusers= require('./Router/OperatorUserR');
  app.use('/api/V1/OperatorUsers',  Operatorusers );

  const bus= require('./Router/BusR');
  app.use('/api/V1/bus',  bus);

  const User= require('./Router/UserR');
  app.use('/api/V1/user',  User);

  const Booking= require('./Router/BookingR');
  app.use('/api/V1/Booking',  Booking);

app.get('/',(req,res) =>{

    console.log("hello")
    res.json('working')
})

app.use((err, req, res, next) => {
    console.error("Error Stack:", err.stack);
    console.error("Error Status:", err.statusCode);
    console.error("Error Message:", err.message);
    res.status(err.statusCode || 500).json({
        error: err.message || 'An error occurred'
    });
});

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Server is up and running at ${port}`));

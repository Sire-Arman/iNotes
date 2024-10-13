const connectToMongo = require('./db');
const express = require('express');
const {json} = require('express');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const cors = require('cors');
require('dotenv').config();


connectToMongo();
const app = express()
const port = process.env.PORT;

// app.use(cors({
//   origin:[],
//   method : ["POST", "GET","PUT","PATCH","DELETE"],
//   credentials : true,
// }))
app.use(cors());
// app.use(cors({
//   origin: 'https://i-notes-frontend.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// CORS configuration
const corsOptions = {
  origin: ['https://i-notes-frontend.vercel.app', "http://localhost:3000"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Pre-flight request handling
app.options('*', cors(corsOptions));
// Creating routes
app.use(json());
app.use('/api/auth',authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('Hello  arman!')
})
// module.exports = app;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
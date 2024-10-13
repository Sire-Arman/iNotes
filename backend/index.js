const connectToMongo = require('./db');
const express = require('express');
const {json} = require('express');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const cors = require('cors');
require('dotenv').config();

connectToMongo();
const app = express();
const port = process.env.PORT || 5000; // Fallback to 5000 if PORT is not defined

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

// Pre-flight request handling
app.options('*', cors(corsOptions));

// Middleware
app.use(json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('Hello arman!')
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
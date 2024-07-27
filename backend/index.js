const connectToMongo = require('./db');
const express = require('express');
const {json} = require('express');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const cors = require('cors');


connectToMongo();
const app = express()
const port = 5000

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
// const corsOptions = {
//   origin: ['https://i-notes-frontend.vercel.app','http://localhost:3000'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));

// Pre-flight request handling
// app.options('*', cors(corsOptions));
// Creating routes
app.use(json());
app.use('/api/auth',authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('Hello  arman!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
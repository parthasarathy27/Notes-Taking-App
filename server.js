require('dotenv').config()

// Override DNS to use Google's public DNS (8.8.8.8) to resolve MongoDB Atlas SRV records
const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const noteRouter = require('./routes/noteRouter')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())

//routes
app.use('/users', userRouter)
app.use('/api/notes', noteRouter)

// Connect to MongoDB
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  serverSelectionTimeoutMS: 10000,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Setup static file serving for production
// On Vercel, static files are handled by the vercel.json rewrites
if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

// listen Server
const PORT = process.env.PORT || 5000
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log('Server is running on port', PORT)
    })
}

module.exports = app;


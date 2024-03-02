require('dotenv').config()
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

mongoose.connect(URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
  
// Below MongoDB and  Above Listen Server
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req, res) =>{
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  });
}

// listen Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
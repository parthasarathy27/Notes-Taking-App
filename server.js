// Root server proxy for local development
const app = require('./api/server');

// listen Server
const PORT = process.env.PORT || 5000
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log('Server is running on port', PORT)
    })
}

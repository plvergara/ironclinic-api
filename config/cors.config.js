const cors = require('cors')

const corsMiddleware = cors({
	origin: 'https://desolate-mesa-79777.herokuapp.com' || 'http://localhost:3000',
	credentials: true
})

module.exports = corsMiddleware
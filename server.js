require('dotenv').config()
const http = require('http')
const socketIo = require('socket.io')
const express = require('express')
const { checkSchema } = require('express-validator')
const cors = require('cors')
const configDb = require('./config/auth')
const usersCntrl = require('./app/controllers/userctlr')
const { userRegisterSchemaValidation, usersLoginSchema } = require('./app/validations/uservalidations')
const { readingsCtlr } = require('./app/controllers/redingsctlr')
const port = 3069
const app = express()
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
io.on('connection', (socket) => {
    console.log('New client connected')
    socket.on('disconnect', () => {
      console.log('Client disconnected')
    });
  });
app.use(cors())
app.use(express.json())

configDb(io)

// API routes
app.post('/api/user/register', checkSchema(userRegisterSchemaValidation), usersCntrl.register)
app.post('/api/user/login', checkSchema(usersLoginSchema), usersCntrl.login)
app.get('/api/readings/list', readingsCtlr.list)

// socket.io connections
server.listen(port, () => {
  console.log('Server is running on port ' + port)
});

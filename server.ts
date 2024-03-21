import express from 'express'
import { Server } from 'socket.io'
import next from'next'

import { connectionHandler } from './controllsers/socketController'

const PORT = process.env.PORT || 3000

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
	const server = express()
	const expressServer = server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))

	const io = new Server(expressServer)

	// io.on('connection', connectionHandler(io))
	io.on('connection', socket => {
		console.log('Client connected')

		socket.on('message1', (data: any) => {
			console.log('Recieved from API ::', data)
			io.emit('message2', data)
		})
	})

	server.all('*', (req, res) => handle(req, res))
})
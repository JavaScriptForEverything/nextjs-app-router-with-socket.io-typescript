import type { Socket } from 'socket.io'

export const connectionHandler = (io: any) => (socket: Socket) => {
	console.log('Client connected')

	socket.on('message1', (data: any) => {
		console.log('Recieved from API ::', data)
		io.emit('message2', data)
	})
}



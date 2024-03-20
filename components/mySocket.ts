import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

export class MySocket {
	public URL: string
	public socket: Socket

	constructor() {
		this.URL = 'http://localhost:5000'
		this.socket = io(this.URL, { autoConnect: false })

		this.socket.onAny((evt:any, ...args:any) => {
			console.log(evt, args)
		})
	}

	onUsernameSelection (username: string) {
		this.socket.auth = { username }
		this.socket.connect() 	// manually create connection
	}
}


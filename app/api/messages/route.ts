import io from 'socket.io-client'
import { NextResponse } from "next/server"

const socket = io('http://localhost:3000')

export async function POST(req:Request, res: NextResponse) {
	const body = await req.json()
	console.log(body)

	try {
		// do something you need to do in the backend 
		// (like database operations, etc.)

		// socket.emit('message1', 'Sync Process Completed')
		socket.emit('message1', { message: body.search })

		return NextResponse.json({ 
			data: 'Success',
			...body
		}, { status: 200 })

	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json({ error: error }, { status: 200 })
	}
}
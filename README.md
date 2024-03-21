## NextJs-v14 + TypeScript + Socket.io

First, run the development server:

```bash
pnpm install
pnpm dev
```


## Follow Bellow Steps
- /server.ts
- /app/api/messages/route.ts
- /app/page.tsx
- /package.json
- /tsconfig.json

#### Step-1: /server.ts 	in root directory
```
import express from 'express'
import { Server } from 'socket.io'
import next from'next'

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
```

#### Step-2: /app/api/messages/route.ts 	any end point in /api directory
```
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
```




#### Step-3: /app/page.tsx 	any page 
```
'use client'
import io from 'socket.io-client'
import React, { useEffect, useState } from 'react'

const socket = io('http://localhost:3000')


const App = () => {
	const [ searchValue, setSearchValue ] = useState('')
	const [ output, setOutput ] = useState<any>()

	useEffect(() => {
		socket.on('message2', (data) => {
			console.log("Recieved from SERVER ::", data)
			// Execute any command
		})
	}, [])

	const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue( evt.target.value )
	}

	const submitHandler = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault()

		try {
			const res = await fetch(`/api/messages`, {
				method: 'POST',
				body: JSON.stringify({
					search: searchValue,
					user: crypto.randomUUID()
				}),
				headers: {
					'content-type': 'application/json',
					'accept': 'application/json',
				}
			})

			const data = await res.json()
			console.log(data)
			setOutput( data )

		} catch (error) {
			console.log(error)				
		}
	}

	return (
		<div>
			<form onSubmit={submitHandler}>
				<input 
					type="search" 
					name='search' 
					value={searchValue} 
					onChange={changeHandler}
					className='border border-slate-300 px-3 py-1.5 rounded'
				/>
				<button className='bg-blue-500 text-white'>Send</button>
			</form>

			<pre>
				{JSON.stringify(output, null, 2)}
			</pre>
		</div>

	)
}
export default App
```

#### Step-4: /package.json 		: install express + socket.io
`$ pnpm add express socket.io socket.io-client`
`$ pnpm add -D nodemon ts-node`

```
	...
  "scripts": {
    "dev": "nodemon --exec 'ts-node server.ts' ",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
	...
```



#### Step-5: allow import in /server.ts file
from
```
	"module": "ESNext",
	"moduleResolution": "bundler",
```

to
```
	"module": "commonjs",
	// "moduleResolution": "bundler",
```
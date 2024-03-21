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
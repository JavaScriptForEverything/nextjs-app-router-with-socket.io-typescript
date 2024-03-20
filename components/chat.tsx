'use client'

import { useState } from 'react'

export const Chat = () => {
	const [ isJoined, setIsJoin ] = useState<boolean>(false)

	const joinClickHandler = () => {
		setIsJoin( true )
	}

	return (
		<>
		{!isJoined && (

			<div className='h-screen grid '>
			
				<div data-name='header' className='place-self-center border border-slate-300 bg-blue-500'>
					<input type="text" placeholder='username'
						className='border border-slate-100 px-3 py-1.5
							outline-none focus:border-blue-300
						'
					/>
					<button className='border border-blue-500 text-slate-50 px-3 py-1 rounded' onClick={joinClickHandler}>Join</button>
				</div>

			</div>
		)}

		{isJoined && (
			<div className='h-screen grid grid-flow-col '>
			
				<div data-name='left-panel' className=''>
					<p>left</p>
				</div>
				<div data-name='right-panel' className='col-span-4 '>
					<p>Right</p>
				</div>

			</div>
		)}
		</>
	)
}




import React from 'react'

const navbar = () => {
  return (
    <nav className='flex bg-gray-900 text-white justify-between py-2 w-[100vw] md:w-[99vw]'>
        <div className="logo">
            <span className="font-bold text-2xl mx-8">iTask</span>
        </div>
      <ul className='flex gap-8 mx-9'>
        <li className='cursor-pointer hover:font-semibold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-semibold transition-all'>Your Taks</li>
      </ul>
    </nav>
  )
}

export default navbar

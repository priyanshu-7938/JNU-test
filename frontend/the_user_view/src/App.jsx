import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className='bg-yellow-500'>Hello world</h1>
      </div>
      <p className="text-bold">
       yooo hello
       contract info : https://thirdweb.com/mumbai/0xE22B4a70B089a2e7A92D8F747a0dDA8083fB901f
       chain id: 137
      </p>
    </>
  )
}

export default App

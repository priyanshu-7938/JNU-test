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
      </p>
    </>
  )
}

export default App

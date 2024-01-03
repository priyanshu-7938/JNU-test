import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className='bg-yellow-500'>the admin stuff...</h1>
      </div>
      <p className="text-bold">
       the admin stuff
      </p>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import { Navbar, Login, Signup} from "./components";
import { Home, GenProof, MyProof  } from "./pages";

function App() {

  return (
    <div className="bg-[#f7f4d7] h-screen">
      <div className="w-[70%] flax mx-auto font-montserrat">
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home />} ></Route>
            <Route path="/signup" element={<Signup />} ></Route>
            <Route path="/login" element={<Login />} ></Route>
            <Route path="/my-proofs" element={<MyProof />} ></Route>
            <Route path="/genrate-proof" element={<GenProof/>} ></Route>
          </Routes>
      </div>
    </div>
  )
}

export default App

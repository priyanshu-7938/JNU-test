import './App.css';
import LoginForm from './components/LOGIN/LoginForm';
import Signup from './components/SIGNUP/Signup';
import { Routes,Route } from 'react-router-dom';




function App(){
  return (
  <>


  <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/Signin' element={<LoginForm/>}/>
  </Routes>
 
  
  </>
       
      

  );
}

export default App;  
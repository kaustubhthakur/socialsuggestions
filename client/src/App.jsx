import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import RegisterPage from './pages/register/RegisterPage'
import LoginPage from './pages/login/LoginPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navbar/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/login' element={<LoginPage/>} />
    </Routes>
  )
}

export default App
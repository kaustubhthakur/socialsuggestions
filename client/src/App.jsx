import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navbar/>} />
    </Routes>
  )
}

export default App
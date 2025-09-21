import AddItem from './AddItem'
import './App.css'
import Home from './Home'
import {Routes,Route} from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path='/' element={<AddItem/>} />
      <Route path='/home' element={<Home/>} />
    </Routes>
  )
}

export default App

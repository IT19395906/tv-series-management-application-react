import AddItem from './AddItem'
import './App.css'
import Home from './Home'
import Detail from './Detail'
import {Routes,Route} from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/add' element={<AddItem/>} />
      <Route path='/detail/:id' element={<Detail/>} />
    </Routes>
  )
}

export default App

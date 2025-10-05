import AddItem from './components/AddItem'
import './App.css'
import Home from './components/Home'
import Detail from './components/Detail'
import Register from './components/Register'
import {Routes,Route, useLocation} from 'react-router-dom'
import Login from './components/Login'
import Sidebar from './components/Sidebar'

function App() {
const location = useLocation();
const hideNav = ['/login','/register'];
const showNav = !hideNav.includes(location.pathname);
  
return (
    <>
    {showNav && <Sidebar/>}
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/add' element={<AddItem/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/detail/:id' element={<Detail/>} />
    </Routes>
    </>
  )
}

export default App

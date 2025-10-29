import AddItem from './components/AddItem'
import './App.css'
import Home from './components/Home'
import Detail from './components/Detail'
import Register from './components/Register'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import ViewAll from './components/ViewAll'
import NotFound from './components/NotFound'
import Contact from './components/Contact'
import Latest from './components/Latest'

function App() {
  const location = useLocation();
  const hideNav = ['/login', '/register'];
  const showNav = !hideNav.includes(location.pathname);

  return (
    <>
      {showNav && <Sidebar />}
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/home' element={<Home />} />
        <Route path='/add' element={<AddItem />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/view' element={<ViewAll />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/latest' element={<Latest/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App

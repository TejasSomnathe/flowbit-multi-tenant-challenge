import './App.css'
import Login from './Login/Login'
import { Outlet } from 'react-router-dom'
import UserContextProvider from './context/UserContextProvider'
import Default from './defaultComponent/default'


function App() {
  

  return (
    <>
     <UserContextProvider>
      <Default />
      <Outlet />
     </UserContextProvider>
    </>
  )
}

export default App

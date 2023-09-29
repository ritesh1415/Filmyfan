import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Appstate } from '../App'
const Header = () => {
  const useAppstate=useContext(Appstate)
  return (
    <div className='text-3xl flex justify-between items-center  text-red-500 font-bold ,p-3, border-b-2 border-white-500'>
   <Link to={"/"}><span>FilmY<span className='text-white'>FaN</span></span></Link>
   {useAppstate.login?
   <Link  to={'/add'}><h1 className='text-lg  cursor-pointer flex items-center'><button>Add new</button></h1></Link>:
   <Link  to={'/login'}><h1 className='text-lg cursor-pointer bg-green-500  flex items-center'><button className='text-white font-medium capatalize' >Login</button></h1></Link>}
  
    </div>
  )
}

export default Header

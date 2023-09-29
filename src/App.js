//import { Card } from '@mui/material';
import './App.css';
import Header from './Component/Header';
import Cards from './Component/Cards';
import Addmovie from './Component/Addmovie';
import { Routes, Route } from 'react-router-dom';
import Details from './Component/Details';
import { createContext, useEffect, useState } from 'react';
import Login from './Component/Login';
import Signup from './Component/Signup'; // Corrected the import filename casing
const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <Appstate.Provider value={{ login, userName, setLogin, setUserName }}>
      <div className='App relative'>
        <Header />
        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='/add' element={<Addmovie />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
        </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export { Appstate }

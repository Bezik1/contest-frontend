import React, { useState, ReactNode } from 'react';
import './App.css';
import City from './components/City';
import Content from './components/Content';
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import { UserContext } from './contexts/user.context';
import { User } from './interfaces/interfaces';

const App = () =>{
  const [currentComponent, setCurrentComponent] = useState<ReactNode>(<Home />)
  const [user, setUser] = useState<User | undefined>(undefined)
  const [logged, setLogged] = useState(false)

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Navbar
          currentComponent={currentComponent}
          user={user}
          setCurrentComponent={setCurrentComponent} 
          setUser={setUser}
          logged={logged} 
          setLogged={setLogged}
        />
        <div className='starter'>
            <Content childComp={currentComponent}/>
            <City
              user={user}
              setUser={setUser} 
              setCurrentComponent={setCurrentComponent}  
              logged={logged} 
              setLogged={setLogged}
            />
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;

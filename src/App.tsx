import React, { useState, ReactNode } from 'react';
import './App.css';
import City from './components/City';
import Content from './components/Content';
import Home from './components/Home';
import { UserContext } from './contexts/user.context';
import { User } from './interfaces/interfaces';

const App = () =>{
  const [currentComponent, setCurrentComponent] = useState<ReactNode>(<Home />)
  const [user, setUser] = useState<User | undefined>(undefined)

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <div className='starter'>
            <Content childComp={currentComponent}/>
            <City setUser={setUser} setCurrentComponent={setCurrentComponent}/>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;

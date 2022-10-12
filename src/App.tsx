import React, { useState, ReactNode } from 'react';
import './App.css';
import City from './components/City';
import Content from './components/Content';
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import { CurrentComponentContext } from './contexts/currentComponent.context';
import { UserContext } from './contexts/user.context';
import { User } from './interfaces/interfaces';

const App = () =>{
  const [currentComponent, setCurrentComponent] = useState<ReactNode>(<Home />)
  const [user, setUser] = useState<User | undefined>(undefined)
  const [logged, setLogged] = useState(false)
  const [componentName, setComponentName] = useState('Home')

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <CurrentComponentContext.Provider value={setComponentName}>
          <Navbar
            componentName={componentName}
            currentComponent={currentComponent}
            setCurrentComponent={setCurrentComponent} 
            setUser={setUser}
            logged={logged} 
            setLogged={setLogged}
          />
          <div className='starter'>
              <Content childComp={currentComponent}/>
              <City
                setUser={setUser} 
                setCurrentComponent={setCurrentComponent}  
                logged={logged} 
                setLogged={setLogged}
              />
          </div>
        </CurrentComponentContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;

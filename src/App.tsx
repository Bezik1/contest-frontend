import React, { useState, ReactNode } from 'react';
import './App.css';
import City from './components/City';
import Content from './components/Content';
import Home from './components/Home';

const App = () =>{
  const [currentComponent, setCurrentComponent] = useState<ReactNode>(<Home />)

  return (
    <div className="App">
      <div className='starter'>
          <City setCurrentComponent={setCurrentComponent}/>
          <Content childComp={currentComponent}/>
      </div>
    </div>
  );
}

export default App;

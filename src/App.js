import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [mushrooms, setMushrooms] = useState([{
    name: 'Mushroom-1',
    isFound: false
  },{
    name: 'Mushroom-2',
    isFound: false
  },{
    name: 'Mushroom-3',
    isFound: false
  }]);

  const [showInventory, setShowInventory] = useState(false);
  const [introScene, setIntroScene] = useState(false);

  useEffect(() => {
    const closeInventory = (e) => {
      if (e.target.className === "inv-image"){

      }
    }
  })

  return (
    <div className='container'>
    
    </div>
  )
}

export default App;

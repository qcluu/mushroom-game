import React, { useState, useEffect } from 'react'
import bgImg from 'assets/ai-forest-bg.png';
import puffball from 'assets/puffball-mushroom.jpg'
import './App.css';

const App = () => {
  //mushrooms
  const [mushroom, setMushroom] = useState([{
    name: 'Mushroom-1',
    isFound: false,
    img: puffball
  },{
    name: 'Mushroom-2',
    isFound: false
  },{
    name: 'Mushroom-3',
    isFound: false
  }]);

//stuff for game jam
  const [showForestBg, setShowForestBg] = useState(true);
  const [introScene, setIntroScene] = useState(false);

//later implementations
  const [showInventory, setShowInventory] = useState(false);

  //later implementation - opening inventory
  useEffect(() => {
    const closeInventory = (e) => {
      if (e.target.className === "inv-image"){
        setShowInventory(true)
      } else {
        setShowInventory(false);
      }
      window.addEventListener('click', closeInventory);
      return () => window.removeEventListener('click', closeInventory);
    }
  }, [showInventory])

//event handler for clicking on mushroom
  

  return (
    <div className='container'>
      <img className='bgImg' src={require("./assets/ai-forest-bg.png")} alt=""></img>
      
    </div>
  )
}

export default App;

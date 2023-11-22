import React, { useState, useEffect } from 'react'

//maybe should make a mushroom database for all the mushroom that will be available in the game?
//attributes of mushroom: name, isfound, location to find mushroom (where this mushroom usually grows), mushroom stats
const mushrooms = [{
    this.name = name;
    isFound: false 
}];

//     constructor(name, fullness, happiness, cleanliness) {
//         this.name = name;
//         this.fullness = fullness;
//         this.happiness = happiness;
//         this.cleanliness = cleanliness;
//     }

let Food = sequelize.define('Food', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
  },

  name: {
      type: DataTypes.STRING,
      allowNull: false,
  },

  hungerValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },

  happinessValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
  }
})

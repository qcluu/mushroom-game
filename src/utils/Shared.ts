export function getMushroomData(id: number) {
    const mushrooms = require("../data/mushroom.json");

    for (let i = 0; i < mushrooms.length; i++) {
      if (mushrooms[i]['id'] == id) {
        return mushrooms[i]
      }
    }
    return null;
  }

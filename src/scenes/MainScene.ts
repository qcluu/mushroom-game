import Phaser from "phaser";
// import mushrooms from "../data/mushroom.json";
import PlayerInventory from '../ui/PlayerInventory';
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { TestMyCodex } from "../components/TestMyCodex"
import game from "../game";

export default class MainScene extends Phaser.Scene {
  mushrooms = require("../data/mushroom.json");
  
  private inventory: PlayerInventory

  constructor() {
    super({ key: "MainScene" });

  }

  preload() {
    for (let i = 0; i < this.mushrooms.length; i++) {
      const imgPath = this.mushrooms[i]["img"];
      console.log(`${this.mushrooms[i]["img"]}`);
      this.load.image(this.mushrooms[i]["sname"], imgPath);
    }
    this.load.image("bag", "assets/sprites/bag.png");
    this.load.image("journal", "assets/sprites/journal.png");
    
    this.inventory = new PlayerInventory(this, Number(this.sys.game.config.width) / 2, Number(this.sys.game.config.height) / 2, 100, 50, 6, 5, 96, 16);
    this.inventory.setVisible(false);
  }

  create() {

    // Eventually, when we have 5 mushrooms we can change this.mushrooms.length to 5 or however many mushrooms we want
    for (let i = 0; i < this.mushrooms.length; i++) {
      const mushroomObj = this.add
        .image(
          this.mushrooms[i]["x"],
          this.mushrooms[i]["y"],
          this.mushrooms[i]["sname"],
          this.mushrooms[i]["sname"]
        )
        .setScale(0.25);
      mushroomObj.setData('data', this.mushrooms[i])

      mushroomObj.setInteractive({ draggable: true });

      mushroomObj.setTint(0xbbbbbb);

      mushroomObj.on("pointerover", function (pointer) {
        this.setTint(0xdddddd);
      });

      mushroomObj.on("pointerout", function (pointer) {
        this.setTint(0xbbbbbb);
      });

      mushroomObj.on("pointerdown", function (pointer) {
        // Tint
        this.setTint(0xffffff);
      });

      mushroomObj.on("pointerup", function (pointer) {
        // if the bounds of the two objects interact then the mushroom_sprite is no longer visable
        if (
          Phaser.Geom.Intersects.RectangleToRectangle(
            mushroomObj.getBounds(),
            bagObj.getBounds()
          )
        ) {
          const collected = this.inventory.addNewItem(mushroomObj.getData("data"), mushroomObj)

          if (collected) {
            mushroomObj.visible = false;
          }
        }
      });
    }

    const codexObj = this.add.image(150, 50, "journal").setScale(0.25).setInteractive();

    codexObj.on("pointerup", function (pointer) {
      const reactRoot = document.createElement('div');
      document.body.appendChild(reactRoot);

      const [codexVisible, setCodexVisible] = useState(false);

      let toggleCodexVisibility = () => {
        setCodexVisible(!codexVisible);
      }

      // ReactDOM.render(
      //   <TestMyCodex visible={codexVisible} toggleCodexVisibility={toggleCodexVisibility} />,
      //   reactRoot
      // )
    })

    this.input.keyboard.on('keydown-I', function (keydown) {
      this.inventory.toggleInventory()
    }, this);

    const bagObj = this.add.image(50, 50, "bag").setScale(0.25).setInteractive();
    
    bagObj.on("pointerup", function (pointer) {
      this.inventory.toggleInventory()
      // Mycodex.setShowCodex(true);
    });

    //Event listeners
    this.input.on(
      "dragstart",
      //this function brings the object that is being dragged to the front of other assets
      function (pointer, gameObject) {
        this.children.bringToTop(gameObject);
      },
      this
    );

    this.input.on(
      "drag",
      //function for bring the object to the same x,y coordinate as mouse/pointer
      function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    );

    this.input.on(
      "dragend",
      function (pointer, gameObject) {
        this.children.bringToTop(gameObject);
      },
      this
    );
  }
}

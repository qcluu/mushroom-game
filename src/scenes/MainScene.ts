import Phaser from "phaser";
// import mushrooms from "../data/mushroom.json";
import PlayerInventory from "../ui/PlayerInventory";
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import MycoDex from "../ui/MycoDex"
import game from "../game";

export default class MainScene extends Phaser.Scene {
  mushrooms = require("../data/mushroom.json");
  private inventory: PlayerInventory;
  // private codex: MycoDex;

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
  }

  create() {
    const inventory = new PlayerInventory(this, Number(this.sys.game.config.width) / 2, Number(this.sys.game.config.height) / 2, 800, 400, 4, 8, 96, 16);
    inventory.setVisible(false);

    const codex = new MycoDex(this, Number(this.sys.game.config.width) / 2, Number(this.sys.game.config.height) / 2, 400, 600);
    codex.setVisible(false);

    // Eventually, when we have 5 mushrooms we can change this.mushrooms.length to 5 or however many mushrooms we want
    for (let i = 0; i < this.mushrooms.length; i++) {
      const mushroomSprite = this.add
        .sprite(
          this.mushrooms[i]["x"],
          this.mushrooms[i]["y"],
          this.mushrooms[i]["sname"],
          this.mushrooms[i]["sname"]
        )
        .setScale(0.25);

      mushroomSprite.setInteractive({ draggable: true });

      mushroomSprite.setTint(0xbbbbbb);

      mushroomSprite.on("pointerover", function (pointer) {
        this.setTint(0xdddddd);
      });

      mushroomSprite.on("pointerout", function (pointer) {
        this.setTint(0xbbbbbb);
      });

      mushroomSprite.on("pointerdown", function (pointer) {
        // Tint
        this.setTint(0xffffff);
      });

      mushroomSprite.on("pointerup", function (pointer) {
        // if the bounds of the two objects interact then the mushroom_sprite is no longer visable
        if (
          Phaser.Geom.Intersects.RectangleToRectangle(
            mushroomSprite.getBounds(),
            bagSprite.getBounds()
          )
        ) {
          mushroomSprite.visible = false;

          // Collection logic
        }
      });
    }


    const codexObj = this.add.image(150, 50, 'journal').setScale(0.25).setInteractive();

    codexObj.on('pointerup', function(pointer) {
      codex.toggleBookVisibility()
    })


    const bagSprite = this.add.sprite(50, 50, "bag").setScale(0.25).setInteractive();
    
    bagSprite.on("pointerup", function (pointer) {
      this.inventory.visible = !this.inventory.visible
      this.inventory.bringToFront()
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

import Phaser from "phaser";
import logoImg from "../assets/img/logo.png";
import bagImg from "../assets/img/bag.png";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.image("mushroom1", logoImg);
    this.load.image("bag", bagImg);
  }

  create() {
    const mushroom_sprite = this.add
      .sprite(400, 300, "mushroom1").setScale(.25)
      .setInteractive({ draggable: true });
    const bag_sprite = this.add.sprite(750, 50, "bag").setScale(0.25);

    mushroom_sprite.setTint(0xbbbbbb);
    //  Input Event listeners

    this.input.on(
      "dragstart",
      function (pointer, gameObject) {
        //  This will bring the selected gameObject to the top of the list
        this.children.bringToTop(gameObject);
      },
      this
    );

    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on(
      "dragend",
      function (pointer, gameObject) {
        this.children.bringToTop(gameObject);
      },
      this
    );

    mushroom_sprite.on("pointerover", function (pointer) {
      this.setTint(0xdddddd);
    });

    mushroom_sprite.on("pointerout", function (pointer) {
      this.setTint(0xbbbbbb);
    });

    mushroom_sprite.on("pointerdown", function (pointer) {
      // Tint
      this.setTint(0xffffff);
    });

    mushroom_sprite.on("pointerup", function (pointer) {
      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          mushroom_sprite.getBounds(),
          bag_sprite.getBounds()
        )
      ) {
        mushroom_sprite.visible = false;

        // Collection logic
      }
    });
  }
}

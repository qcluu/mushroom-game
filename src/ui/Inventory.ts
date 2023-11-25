import Phaser from 'phaser';

export default class PlayerInventory extends Phaser.GameObjects.Container {
  private rows: number
  private cols: number
  private slotSize: number
  private slotSpacing: number
  private slots: {
    x: number
    y: number
    width: number
    height: number
    item: Phaser.GameObjects.Image | null
  }[]

  constructor(scene, x, y, width, height, rows, cols) {
    super(scene, x, y)

    this.rows = rows
    this.cols = cols

    this.slotSize = 96
    this.slotSpacing = 16

    this.slots = []

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const slotX = j * this.slotSize + (j - 1) * this.slotSpacing
        const slotY = i * this.slotSize + (i - 1) * this.slotSpacing

        const slot = scene.add
          .rectangle(slotX, slotY, this.slotSize, this.slotSize, 0x999999)
          .setOrigin(0)

        this.add(slot)

        this.slots.push({
          x: slotX,
          y: slotY,
          width: this.slotSize,
          height: this.slotSize,
          item: null,
        })
      }
    }

    this.setSize(width, height)

    scene.add.existing(this)
  }

  bringToFront() {
    this.setDepth(1)
  }
}

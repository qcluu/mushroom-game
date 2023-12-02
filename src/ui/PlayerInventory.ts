import Phaser from 'phaser'
import { createRoundedRectWithAlpha } from '../utils/PhaserGraphics'

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
    itemImage: Phaser.GameObjects.Image | null
    itemData: JSON
  }[]

  readonly bgColor: number
  readonly slotColor: number
  readonly alphaValue: number

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    rows: number,
    cols: number,
    slotSize: number,
    slotSpacing: number,
  ) {
    const bgWidth = cols * slotSize + (cols - 1) * slotSpacing + 64
    const bgHeight = rows * slotSize + (rows - 1) * slotSpacing + 64

    super(scene, x - bgWidth / 2, y - bgHeight / 2)

    this.bgColor = 15456681
    this.slotColor = 15456681
    this.alphaValue = 0.5

    this.rows = rows
    this.cols = cols

    this.slotSize = 96
    this.slotSpacing = 16

    this.slots = []

    const bg = createRoundedRectWithAlpha(
      scene,
      -32,
      -32,
      bgWidth,
      bgHeight,
      20,
      this.bgColor,
      this.alphaValue,
    )

    this.add(bg)

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const slotX = j * this.slotSize + j * this.slotSpacing
        const slotY = i * this.slotSize + i * this.slotSpacing

        const slot = createRoundedRectWithAlpha(
          scene,
          slotX,
          slotY,
          this.slotSize,
          this.slotSize,
          5,
          this.slotColor,
          0.5,
        )

        this.add(slot)

        this.slots.push({
          x: slotX,
          y: slotY,
          width: this.slotSize,
          height: this.slotSize,
          itemImage: null,
          itemData: null,
        })
      }
    }

    this.setSize(width, height)

    scene.add.existing(this)
  }

  bringToFront() {
    this.setDepth(1)
  }

  toggleInventory() {
    this.setVisible(!this.visible)
    this.bringToFront()
  }

  addItem(
    slotIndex: number,
    item: JSON,
    image?: Phaser.GameObjects.Image,
  ): boolean {
    const slot = this.slots[slotIndex]

    slot.itemData = item
    slot.itemImage = image

    const itemIcon = this.scene.add.image(
      slot.x + slot.width / 2,
      slot.y + slot.height / 2,
      image.texture.key,
    )

    var scaleX = slot.width / image.width
    var scaleY = slot.height / image.height

    var scale = Math.min(scaleX, scaleY)
    itemIcon.setScale(scale)

    this.add(itemIcon)

    return true
  }

  addNewItem(item: JSON, image?: Phaser.GameObjects.Image) {
    const slot = this.findNextOpenSlot()

    if (slot == -1) {
      return false
    } else {
      return this.addItem(slot, item, image)
    }
  }

  findNextOpenSlot() {
    for (let i = 0; i < this.slots.length; i++) {
      if (!this.slots[i].itemData) {
        return i
      }
    }
    return -1
  }
}

import Phaser from 'phaser'
import { createRoundedRectWithAlpha } from '../utils/PhaserGraphics'
import { getMushroomData } from '../utils/Shared'

export default class MycoDex extends Phaser.GameObjects.Container {
  mushrooms = require('../data/mushroom.json')

  private pages: Phaser.GameObjects.Image[] = []
  private codex: Phaser.GameObjects.Image | null = null
  private isPagesCreated: boolean = false
  private codexWidth: number //will need to be responsive
  private codexHeight: number //will need to be responsive

  private pageWidth: number //will need to be responsive
  private pageHeight: number //will need to be responsive
  private numPages = this.mushrooms.length

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    codexPageWidth: number,
    codexPageHeight: number,
  ) {
    const baseCodexWidth = codexPageWidth * 2 + 20 * 2 + 20
    const baseCodexHeight = 20 * 2 + codexPageHeight

    super(scene, x - baseCodexWidth / 2, y - baseCodexHeight / 2)
    this.scene = scene

    this.codexWidth = baseCodexWidth
    this.codexHeight = baseCodexHeight

    this.pageWidth = codexPageWidth
    this.pageHeight = codexPageHeight

    const bg = createRoundedRectWithAlpha(
      scene,
      0,
      0,
      this.codexWidth,
      this.codexHeight,
      10,
      0x422222,
      1,
    )
    this.add(bg)

    const page1 = this.scene.add.container(20, 20) //will need to be responsive
    const page2 = this.scene.add.container(this.pageWidth + 20 + 20, 20) //will need to be responsive

    this.add(page1)
    this.add(page2)

    const pageBg1 = createRoundedRectWithAlpha(
      scene,
      0,
      0,
      this.pageWidth,
      this.pageHeight,
      2,
      0xffffdd,
      1,
    )
    const pageBg2 = createRoundedRectWithAlpha(
      scene,
      0,
      0,
      this.pageWidth,
      this.pageHeight,
      2,
      0xffffdd,
      1,
    )

    page1.add(pageBg1)
    page2.add(pageBg2)

    this.setSize(this.codexWidth, this.codexHeight)
    scene.add.existing(this)

    this.initializePage(page1, 1)
    this.initializePage(page1, 2)

    // Enable input for flipping on the first page
    if (this.pages.length > 0) {
      this.pages[0].setInteractive()
      this.pages[0].on('pointerup', this.flipPage, this)
    }

    // Create and position the codex asset
    // this.codex = this.scene.add.image(100, 100, 'journal');
    // if (this.codex) {
    //   this.codex.setInteractive();
    //   this.codex.on('pointerup', this.toggleBookVisibility, this);
    // }

    // Initially show only the first page
    if (this.pages.length > 0) {
      this.pages[0].setVisible(true)
    }
  }

  private initializePage(page: Phaser.GameObjects.Container, id: number) {
    const mushroomData = getMushroomData(id)

    // Visualize mushroom data based on the data
  }

  private flipPage = () => {
    const currentPageIndex = this.pages.findIndex(page => page.visible)
    if (currentPageIndex >= 0 && currentPageIndex < this.pages.length - 1) {
      this.pages[currentPageIndex].setVisible(false)
      this.pages[currentPageIndex + 1].setVisible(true)
    }
  }

  bringToFront() {
    this.setDepth(1)
  }

  toggleBookVisibility = () => {
    this.setVisible(!this.visible)
    this.bringToFront()
  }
}

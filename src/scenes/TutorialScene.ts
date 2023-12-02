import Phaser from 'phaser'
import game from '../game'

export default class TutorialScene extends Phaser.Scene {
  constructor() {
    super('TutorialScene')
  }

  preload() {
    this.load.image('mushi', 'assets/sprites/mushi.png')
  }

  create() {
    this.add.image(
      Number(this.sys.game.config.width) * (4 / 5),
      Number(this.sys.game.config.height) / 2,
      'mushi',
    )
    const introText = this.add.text(100, 500, '', {
      fontSize: '32px',
      color: '#fff',
    })

    const fullText =
      'Welcome to *game name*! I am Mushi and I will explain the game. The goal of the game is to find and collect different types of mushrooms and determine which ones can help visitors!'
    const words = fullText.split(' ')
    let currentIndex = 0
    let lineIndex = 0
    const wordsPerLine = 10

    const timer = this.time.addEvent({
      delay: 100,
      callback: function () {
        if (currentIndex < words.length) {
          introText.text += words[currentIndex] + ' '
          currentIndex++

          if (currentIndex % wordsPerLine === 0) {
            introText.text += '\n'
            lineIndex++
          }
        } else {
          timer.destroy()
        }
      },
      callbackScope: this,
      loop: true,
    })

    this.input.keyboard.on('keydown-SPACE', this.startGame, this)
  }

  startGame() {
    this.scene.start('MainScene')
  }
}

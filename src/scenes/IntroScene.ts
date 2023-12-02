import Phaser from 'phaser'
// import game from '../game.ts'

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'IntroScene' })
  }

  preload() {
    // this.load.setPath('assets/img');
    this.load.image('mushroom1', 'assets/sprites/mushroom.png')
  }

  create() {
    this.add
      .image(
        Number(this.sys.game.config.width) / 2,
        Number(this.sys.game.config.height) / 2,
        'mushroom1',
      )
      .setScale(0.25)

    const introText = this.add.text(100, 500, '', {
      fontSize: '32px',
      color: '#fff',
    })

    const fullText = 'Press SPACE to Start'
    let currentIndex = 0

    const timer = this.time.addEvent({
      delay: 100,
      callback: function () {
        introText.text += fullText[currentIndex]
        currentIndex++

        if (currentIndex === fullText.length) {
          timer.destroy()
        }
      },
      callbackScope: this,
      loop: true,
    })

    this.input.keyboard.on('keydown-SPACE', this.startGame, this)
  }

  startGame() {
    this.scene.start('TutorialScene')
  }
}

window.addEventListener('resize', () => {
  // this.scene.IntroScene.children.list();
  // // var sprites = IntroScene.children.list({key: 'image'});
  // console.log(sprites)
  // game.scale.resize(window.innerWidth, window.innerHeight)
})

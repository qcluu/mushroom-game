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

    this.add.text(100, 500, 'Press SPACE to Start', {
      fontSize: '32px',
      fill: '#fff',
    })

    this.input.keyboard.on('keydown-SPACE', this.startGame, this)
  }

  startGame() {
    this.scene.start('MainScene')
  }
}

window.addEventListener('resize', () => {
  // this.scene.IntroScene.children.list();
  // // var sprites = IntroScene.children.list({key: 'image'});
  // console.log(sprites)

  // game.scale.resize(window.innerWidth, window.innerHeight)
})

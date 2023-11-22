export default class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' });
    }
  
    create() {
      this.add.text(100, 100, 'Main Game Scene', { fontSize: '32px', fill: '#fff' });
    }
  }
import Phaser from 'phaser';
import IntroScene from './scenes/IntroScene.js'
import MainScene from './scenes/MainScene.js'

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [IntroScene, MainScene],
};

const game = new Phaser.Game(config);

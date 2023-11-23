import Phaser from 'phaser';

import MainScene from './scenes/MainScene';
import IntroScene from './scenes/IntroScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    //width and height are responsive to viewport size, need to make game objects also responsive to game size
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [IntroScene, MainScene],
};

export default new Phaser.Game(config);
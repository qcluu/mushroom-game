import Phaser from 'phaser';
import logoImg from '../assets/img/logo.png';

export default class IntroScene extends Phaser.Scene
{
    constructor ()
    {
        super({key: "IntroScene"});
    }

    preload ()
    {
        this.load.setPath('assets/img');

        this.load.image('mushroom1', logoImg);
    }

    create ()
    {
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'mushroom1').setScale(.25);

        this.add.text(100, 500, 'Press SPACE to Start', { fontSize: '32px', fill: '#fff' });

        this.input.keyboard.on('keydown-SPACE', this.startGame, this);
    }

    startGame() {
        this.scene.start("MainScene")
    }
}

import Phaser from "phaser";

export class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        // this.load.image('acho', 'assets/acho.png');
        // this.load.image('ground', 'assets/ground.png');
    }

    create() {
        // this.scene.start('initial');
    }
}
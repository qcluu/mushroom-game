class HomeScene extends Phaser.Scene
{
    constructor ()
    {
        super({key: "HomeScene"});
    }

    preload ()
    {
        this.load.setPath('assets/img');

        this.load.image('mushroom1', 'mushroom.png');
    }

    create ()
    {
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'logo');

        this.add.text(100, 500, 'Press SPACE to Start', { fontSize: '32px', fill: '#fff' });

        this.input.keyboard.on('keydown-SPACE', this.startGame, this);
    }

    startGame() {
        this.scene.start("MainScene")
    }
}


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
}

function create ()
{
}

function update ()
{

}
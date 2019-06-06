import Phaser from "phaser";
import logoImg from "./assets/logo.jpg";
import shoppingCartImg from './assets/shopping_cart.png';
import blockImg from './assets/block.jpeg';
import steelboxImg from './assets/steelbox.png';
import bgImg from './assets/background.png';

const config = {
  type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

let player;
let cursors;

let game = new Phaser.Game(config);

function preload ()
{
  this.load.image('block', blockImg);
  this.load.image('shoppingCart', shoppingCartImg);
  this.load.image('bg', bgImg);
}

function create ()
{ 
     // todo: make these lines show up
    var line1 = new Phaser.Curves.Line([ 0, 100, 200, 200, '0xff0000' ]);
    var line2 = new Phaser.Curves.Line([ 0, 200, 300, 300, '0xff0000' ]);
    this.add.image(0, 0, 'bg').setOrigin(0);

    var block = this.physics.add.image(400, 300, 'block').setImmovable(true).setName('big');

    //  Allow entrance through the top-face only
    // block.body.setCheckCollisionUp(false);

    player = this.physics.add.image(100, 300, 'shoppingCart').setName('small');

    // this.physics.add.collider(block, player);

    this.physics.add.collider(player, block);

    cursors = this.input.keyboard.createCursorKeys();

}

function update (time)
{
    player.setVelocity(0);

    if (cursors.left.isDown)
    {
        player.setVelocityX(-200);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(200);
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-200);
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(200);
    }
}
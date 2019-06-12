import Phaser from "phaser";
import logoImg from "./assets/logo.jpg";
// import shoppingCartImg from './assets/shopping_cart.png';
import shoppingCartImg from './assets/man_shopping_cart.png';
import blockImg from './assets/block.jpeg';
import steelboxImg from './assets/steelbox.png';
import bgImg from './assets/background.png';
import store from 'state/store';
import collide from 'state/ui/actions';

window.store = store;

const config = {
  type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 }
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
let healthText;
let whiteLine;

let game = new Phaser.Game(config);

function preload() {
  this.load.image('block', blockImg);
  this.load.image('shoppingCart', shoppingCartImg);
  this.load.image('bg', bgImg);
}

function create() { 
  this.add.image(0, 0, 'bg').setOrigin(0);

  var block = this.physics.add.image(400, 300, 'block').setImmovable(true).setName('big');

  //  Allow entrance through the top-face only
  // block.body.setCheckCollisionUp(false);

  player = this.physics.add.image(100, 300, 'shoppingCart').setName('small');
  player.setDamping(true);
  player.setDrag(0.99);
  player.setMaxVelocity(200);

  // this.physics.add.collider(block, player);

  this.physics.add.collider(player, block, () => {
    store.dispatch(collide('mainBlock'))
  });

  cursors = this.input.keyboard.createCursorKeys();
  healthText = this.add.text(10, 10, `Health: ${store.getState().health}`, { font: '16px Courier', fill: '#ffffff' });

  whiteLine = this.add.graphics();
  whiteLine.lineStyle(8, 0xfffeee, 1);

  const x = 100;
  const y = 100;
  const width = 600;
  const radius = 32;

  const tl = radius;
  const tr = radius;

  whiteLine.moveTo(x + tl, y);
  whiteLine.lineTo(x + width - tr, y);
  whiteLine.strokePath();
  this.physics.add.collider(player, whiteLine, () => {
    console.log('Colling with white line');
    store.dispatch(collide('whiteLine'));
  });
}

function update(time) {
  const {
    health,
  } = store.getState();

  if (cursors.up.isDown) {
    this.physics.velocityFromRotation(player.rotation, 200, player.body.acceleration);
  }
  else {
    player.setAcceleration(0);
  }

  if (cursors.left.isDown) {
    player.setAngularVelocity(-200);
  }
  else if (cursors.right.isDown) {
    player.setAngularVelocity(200);
  }
  else {
    player.setAngularVelocity(0);
  }
  this.physics.world.wrap(player, 32);

  console.log(store.getState());
  healthText.setText(`Health: ${health}`);
  if (health < 1) {
    console.log('Game over!');
  }
}

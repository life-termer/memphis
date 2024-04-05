import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import Phaser from 'phaser';
// var player, cursors, stars, bombs;
// var score = 0;
// var scoreText;
var gameOver = false;

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.score = 0;
    this.cameras.main.setBackgroundColor(0x00ff00);
    // this.add.image(512, 384, 'sky');
    this.add.image(512, 384, "background").setAlpha(0.8);
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    // this.add.image(512, 284, "star");

    // this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
    //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
    //     stroke: '#000000', strokeThickness: 8,
    //     align: 'center'
    // }).setOrigin(0.5).setDepth(100);

    //creates a new Static Physics Group
    this.platforms = this.physics.add.staticGroup();
    //call to refreshBody() is required because we have scaled a static physics body, so we have to tell the physics world about the changes we made.
    this.platforms.create(512, 720, "ground").setScale(3).refreshBody();

    this.platforms.create(824, 500, "ground");
    this.platforms.create(200, 250, "ground");
    this.platforms.create(750, 320, "ground");
    //The sprite was created via the Physics Game Object Factory (this.physics.add) which means it has a Dynamic Physics body by default.
    this.player = this.physics.add.sprite(512, 600, "dude");

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(400);
    //The Collider is the one that performs the magic. It takes two objects and tests for collision and performs separation against them.
    this.physics.add.collider(this.player, this.platforms);

    //The 'left' animation uses frames 0, 1, 2 and 3 and runs at 10 frames per second. The 'repeat -1' value tells the animation to loop.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    //This populates the cursors object with four properties: up, down, left, right, that are all instances of Key objects.
    this.cursors = this.input.keyboard.createCursorKeys();

    this.stars = this.physics.add.group({
      //sets the texture key to be the star image. This means that any children created as a result of the config object will all be given the star texture by default.
      key: "star",
      repeat: 11,
      //this is used to set the position of the 12 children the Group creates
      setXY: { x: 12, y: 0, stepX: 90 },
    });
    //iterates all children in the Group and gives them a random Y bounce value between 0.4 and 0.8. 
    //The bounce range is between 0, no bounce at all, and 1, a full bounce. Because the stars are all 
    //spawned at y 0 gravity is going to pull them down until they collide with the platforms or ground. 
    //The bounce value means they'll randomly bounce back up again until finally settling to rest.
    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.stars, this.platforms);
    //check to see if the player overlaps with a star or not
    this.physics.add.overlap(this.player, this.stars, collectStar, null, this);
    //This tells Phaser to check for an overlap between the player and any star in the stars Group. If found then they are passed to the 'collectStar' function
    function collectStar (player, star)
    {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        //method called countActive to see how many stars are left alive. 
        if (this.stars.countActive(true) === 0)
        {   
            //iterate function to re-enable all of the stars and reset their y position to zero.
            this.stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });
            //we pick a random x coordinate for it, always on the opposite side of the screen to the player, just to give them a chance. 
            var x = (player.x < 512) ? Phaser.Math.Between(512, 1024) : Phaser.Math.Between(0, 512);

            this.bomb = this.bombs.create(x, 16, 'bomb');
            this.bomb.setBounce(1);
            this.bomb.setCollideWorldBounds(true);
            this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
    }

    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms);

    this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);

    function hitBomb (player, bomb)
    {
        this.physics.pause();

        this.player.setTint(0xff0000);

        this.player.anims.play('turn');

        gameOver = true;
    }

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    //negative horizontal velocity and start the 'left' running animation.
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);

        this.player.anims.play("right", true);
      //check sets the animation to 'turn' and zero the horizontal velocity if no key is held down.
    } else {
        this.player.setVelocityX(0);
        this.player.anims.play("turn");
    }
    //The up cursor is our jump key and we test if that is down. However we also test if the player is touching the floor, otherwise they could jump while in mid-air.
    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-600);
    }
  }

  changeScene() {
    this.scene.start("GameOver");
  }
}

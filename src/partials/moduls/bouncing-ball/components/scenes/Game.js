import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import Phaser from "phaser";
import { ball } from "../../../breakout/utilities/utilities";

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var start = randomIntFromInterval(40, 60);
var gameOptions = {
  width: 1024,
  height: 768,
  bounceHeight: 300,
  ballGravity: 1200,
  ballPower: 1200,
  obstacleSpeed: 250,
  backgroundSpeed: 1,
  cloudHeight: 324,
  groundSpeed: 250 / 59.85,
  obstacleDistanceRange: [100, 350],
  localStorageName: 'bestballscore',
  gameOver: true,
  redSkiesStart: start,
  redSkiesEnd: start + 20,
}

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.obstacleGroup = this.physics.add.group();
    this.groundGroup = this.physics.add.group();
    //Static ground 
    // this.add.rectangle(0, 500, 800, 100, 0x9d2d9d).setOrigin(0, 0);
    this.ground = this.physics.add.staticGroup();
    this.ground.create(
      gameOptions.width / 2,
      gameOptions.height - 35,
      "ground"
    );
    this.ground.setAlpha(0);
    this.cloudGroup = this.add.group();
    this.firstBounce = 0;

    //Background
    this.skyRed = this.add.sprite(gameOptions.width / 2, 576 / 2, "skyRed");
    this.sky = this.add.sprite(gameOptions.width / 2, 576 / 2, "sky");
    this.mountains = this.add.tileSprite(gameOptions.width / 2, 430, 1024, 417, "mountains");
    this.mountains.setOrigin(0.5, 0.5);
    this.plateau = this.add.tileSprite(gameOptions.width / 2, 520, 1024, 404, "plateau");
    
    
    //Animations
    this.anims.create({
      key: "AnBall",
      frames: this.anims.generateFrameNumbers("ball", { start: 1, end: 6 }),
      frameRate: 20,
      repeat: 0,
      yoyo: true,
    });
    this.anims.create({
      key: "AnBallEx",
      frames: this.anims.generateFrameNumbers("ball", { start: 1, end: 9 }),
      frameRate: 30,
      repeat: 0,
    });
    this.anims.create({
      key: "AnExplosion",
      frames: this.anims.generateFrameNumbers("ballExpl", { start: 1, end: 40 }),
      frameRate: 30,
      delay: 0.45,
      repeat: 0,
    });

    //Input
    this.input.on("pointerdown", this.boost, this);

    //Score
    this.score = 0;
    this.topScore =
      localStorage.getItem(gameOptions.localStorageName) == null
        ? 0
        : localStorage.getItem(gameOptions.localStorageName);
    this.scoreText = this.add.text(10, 10, "", { fontSize: '24px', fill: '#000' });
    this.updateScore(this.score);

    
    //Ball
    this.ball = this.physics.add.sprite(
      (gameOptions.width / 10) * 2,
      (gameOptions.height / 4) * 3 - gameOptions.bounceHeight,
      "ball"
    );
    this.ball.body.gravity.y = gameOptions.ballGravity;
    this.ball.setBounce(1);
    this.ball.setCircle(25);
    this.fx1 = this.ball.postFX.addGlow(0xffff00, 4, 0, false, 0.1, 16);
    // const fx2 = this.ball.postFX.addGlow(0xff0000, 4, 2);

    //Obstacles
    let obstacleX = gameOptions.width;
    let obColors = ['#9a1411'];
    for (let i = 0; i < 10; i++) {
      let obType =  randomIntFromInterval(1, 4);
      let obName = "obstacle" + obType;
      let obstacle = this.obstacleGroup.create(
        obstacleX,
        // this.groundGroup.getBounds().top,
        gameOptions.height - 90,
        obName
      );
      obstacle.setCircle(32, 0, 10);
      obstacle.setScale(obType / 10 + 0.5)
      obstacle.setOrigin(0.5, 0.5);
      obstacle.setImmovable(true);
      obstacleX += Phaser.Math.Between(
        gameOptions.obstacleDistanceRange[0],
        gameOptions.obstacleDistanceRange[1]
      );
      // obstacle.setOffset(0, 10);
      
      const fxOb = obstacle.postFX.addGlow(0x9a1411, 3, 1, false, 0.1, 20);
    }
    this.obstacleGroup.setVelocityX(-gameOptions.obstacleSpeed);

    //Grounds
    let groundX = gameOptions.width;
    for (let i = 0; i < 3; i++) {
      let ground = this.groundGroup.create(
        groundX / 2,
        gameOptions.height,
        "ground"
      );
      ground.setOrigin(0.5, 1);
      ground.setImmovable(true);
      groundX += groundX;
    }
    this.groundGroup.setVelocityX(-gameOptions.obstacleSpeed);

    this.plant = this.add.tileSprite(626, gameOptions.height - 80 / 2, 626 * 2, 80, "plant");


    EventBus.emit("current-scene-ready", this);
  }
  updateScore(inc) {
    this.score += inc;
    this.scoreText.text = "Score: " + this.score + "\nBest: " + this.topScore;
  }
  boost() {
    if (this.firstBounce != 0) {
      this.ball.body.velocity.y = gameOptions.ballPower;
      // this.ball.anims.play('AnBall', true);
      if(!this.fx2 || !this.fx2.active)
        this.fx2 = this.ball.postFX.addGlow(0xff0000, 2, 0);
      console.log(this.fx2)
    }
  }
  
  getRightmostObject(object) {
    let rightmostObject = 0;
    object.getChildren().forEach(function (o) {
      rightmostObject = Math.max(rightmostObject, o.x);
    });
    return rightmostObject;
  }

  update() {
    this.mountains.tilePositionX += gameOptions.backgroundSpeed;
    this.plateau.tilePositionX += gameOptions.backgroundSpeed * 1.25;
    this.plant.tilePositionX += gameOptions.backgroundSpeed * 5;
    this.ball.rotation += gameOptions.backgroundSpeed / 3;
    
    if(this.ball.y > 768) {
      this.changeScene();
    }
    if(this.score !== 0 && this.score % gameOptions.redSkiesStart === 0) {
      this.redSkies(true);
    }
    if(this.score !== 0 && this.score % gameOptions.redSkiesEnd === 0) {
      this.redSkies(false);
    }
    this.obstacleGroup.children.iterate((ob) => {
      ob.rotation += gameOptions.backgroundSpeed / 10;
    })
    this.physics.world.collide(
      this.ground,
      this.ball,
      function () {
        if(this.fx2) this.ball.postFX.remove(this.fx2);
        if (this.firstBounce == 0) {
          this.firstBounce = this.ball.body.velocity.y;
        } else {
          this.ball.body.velocity.y = this.firstBounce;
        }
      },
      null,
      this
    );
    this.physics.world.collide(
      this.ball,
      this.obstacleGroup,
      function () {
        console.log(this.ball.body);
        this.ball.setOffset(0)
        gameOptions.gameOver = true;
        this.physics.pause();
        this.ballExpl = this.add.sprite(
          this.ball.body.x + 25,
          // (gameOptions.height / 4) * 3 - gameOptions.bounceHeight
          this.ball.body.y + 25,
          "ballExpl"
        );
        gameOptions.backgroundSpeed = 0;
        this.ballExpl.anims.play('AnExplosion');
        this.ball.anims.play('AnBallEx');
        // this.ball.disableBody(true, true);
        // this.ball.setAlpha(0.1);
        this.tweens.add({
          targets: [this.sky],
          ease: 'Sine.easeInOut',
          duration: 250,
          delay: 0,
          // x: {
          //   getStart: () => startX,
          //   getEnd: () => endX
          // },
          // y: {
          //   getStart: () => 50,
          //   getEnd: () => 100
          // },
          alpha: {
            // getStart: () => 1,
            getEnd: () => 0.3
          },
          onComplete: () => {
            // Handle completion
            this.ball.disableBody(true, true);
            this.gameOver();
          }
        });

        localStorage.setItem(
          gameOptions.localStorageName,
          Math.max(this.score, this.topScore)
        );
        // this.scene.start("Game");
      },
      null,
      this
    );
    //Move the first obstacle that left the screen on to the random position
    this.obstacleGroup.getChildren().forEach(function (obstacle) {
      if (obstacle.getBounds().right < 0) {
        this.updateScore(1);
        obstacle.x =
          this.getRightmostObject(this.obstacleGroup) +
          Phaser.Math.Between(
            gameOptions.obstacleDistanceRange[0],
            gameOptions.obstacleDistanceRange[1]
          );
      }
    }, this);
    //Move the first ground that left the screen to the last position
    this.groundGroup.getChildren().forEach(function (ground) {
      if (ground.getBounds().right < 0) {
        ground.x =
          this.getRightmostObject(this.groundGroup) + gameOptions.width;
      }
    }, this);
  }

  redSkies(forward) {
      this.tweens.add({
        targets: [this.sky],
        ease: 'Sine.easeInOut',
        duration: 350,
        delay: -0.3,
        alpha: {
          getStart: () => forward ? 1 : 0,
          getEnd: () => forward ? 0.1 : 1
        },
        onComplete: () => {
          forward ? gameOptions.backgroundSpeed = 3 : gameOptions.backgroundSpeed = 1;
          forward ? gameOptions.obstacleSpeed = 350 : gameOptions.obstacleSpeed = 250;
          this.obstacleGroup.setVelocityX(-gameOptions.obstacleSpeed);
          this.groundGroup.setVelocityX(-gameOptions.obstacleSpeed);
        }
      });
  }
  changeScene() {
    gameOptions.backgroundSpeed = 1;
    gameOptions.obstacleSpeed = 250;
    this.scene.start("MainMenu");
  }
  gameOver() {
    this.gameOverText = this.add.text(512, 384, 'Game Over', {
      fontFamily: 'Arial Black', fontSize: 64, color: '#00000',
      stroke: '#9a1411', strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5).setDepth(100);
    this.firstBounce = 0;
    // gameOptions.backgroundSpeed = 0;
    // gameOptions.obstacleSpeed = 0;
    start = randomIntFromInterval(40, 60);
    gameOptions.redSkiesStart = start;
    gameOptions.redSkiesEnd = start + 20;
    this.input.on("pointerdown", this.changeScene, this);
  }
}

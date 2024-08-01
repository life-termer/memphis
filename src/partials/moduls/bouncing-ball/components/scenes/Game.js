import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import Phaser from "phaser";

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
  obstacleDistanceRange: [100, 250],
  localStorageName: 'bestballscore'
}
export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.obstacleGroup = this.physics.add.group();
    this.groundGroup = this.physics.add.group();
    this.cloudGroup = this.add.group();
    this.firstBounce = 0;

    //Background
    this.sky = this.add.sprite(gameOptions.width / 2, 576 / 2, "sky");
    this.mountains = this.add.tileSprite(gameOptions.width / 2, 430, 1024, 417, "mountains");
    this.plateau = this.add.tileSprite(gameOptions.width / 2, 520, 1024, 404, "plateau");
    // this.ground = this.add.tileSprite(gameOptions.width / 2, gameOptions.height - 106 / 2, 1024, 106, "ground");
    
    //Ball
    this.ball = this.physics.add.sprite(
      (gameOptions.width / 10) * 2,
      (gameOptions.height / 4) * 3 - gameOptions.bounceHeight,
      "ball"
    );
    this.ball.body.gravity.y = gameOptions.ballGravity;
    this.ball.setBounce(1);
    this.ball.setCircle(25);

    //Obstacles
    let obstacleX = gameOptions.width;
    for (let i = 0; i < 10; i++) {
      let obstacle = this.obstacleGroup.create(
        obstacleX,
        // this.groundGroup.getBounds().top,
        gameOptions.height - 85,
        "obstacle"
      );
      obstacle.setOrigin(0.5, 1);
      obstacle.setImmovable(true);
      obstacleX += Phaser.Math.Between(
        gameOptions.obstacleDistanceRange[0],
        gameOptions.obstacleDistanceRange[1]
      );
    }
    this.obstacleGroup.setVelocityX(-gameOptions.obstacleSpeed);

    //Grounds
    let groundX = gameOptions.width;
    for (let i = 0; i < 3; i++) {
      let ground = this.groundGroup.create(
        groundX / 2,
        gameOptions.height - 106 / 2,
        "ground"
      );
      // ground.setOrigin(0.5, 1);
      ground.setImmovable(true);
      groundX += groundX;
      ground.setOffset(20);
    }
    this.groundGroup.setVelocityX(-gameOptions.obstacleSpeed);

    this.plant = this.add.tileSprite(626, gameOptions.height - 80 / 2, 626 * 2, 80, "plant");

    this.input.on("pointerdown", this.boost, this);
    this.score = 0;
    this.topScore =
      localStorage.getItem(gameOptions.localStorageName) == null
        ? 0
        : localStorage.getItem(gameOptions.localStorageName);
    this.scoreText = this.add.text(10, 10, "");
    this.updateScore(this.score);
    
    EventBus.emit("current-scene-ready", this);
  }
  updateScore(inc) {
    this.score += inc;
    this.scoreText.text = "Score: " + this.score + "\nBest: " + this.topScore;
  }
  boost() {
    if (this.firstBounce != 0) {
      this.ball.body.velocity.y = gameOptions.ballPower;
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
    this.physics.world.collide(
      this.groundGroup,
      this.ball,
      function () {
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
        localStorage.setItem(
          gameOptions.localStorageName,
          Math.max(this.score, this.topScore)
        );
        this.scene.start("Game");
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

  changeScene() {
    this.scene.start("MainMenu");
  }
}

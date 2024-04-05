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
  obstacleDistanceRange: [100, 250],
  localStorageName: 'bestballscore'
}

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.obstacleGroup = this.physics.add.group();
    this.firstBounce = 0;
    this.ground = this.physics.add.sprite(
      gameOptions.width / 2,
      (gameOptions.height / 4) * 3,
      "ground"
    );
    this.ground.setImmovable(true);
    this.ball = this.physics.add.sprite(
      (gameOptions.width / 10) * 2,
      (gameOptions.height / 4) * 3 - gameOptions.bounceHeight,
      "ballSp"
    );
    this.ball.body.gravity.y = gameOptions.ballGravity;
    this.ball.setBounce(1);
    this.ball.setCircle(25);
    let obstacleX = gameOptions.width;
    for (let i = 0; i < 10; i++) {
      let obstacle = this.obstacleGroup.create(
        obstacleX,
        this.ground.getBounds().top,
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
  getRightmostObstacle() {
    let rightmostObstacle = 0;
    this.obstacleGroup.getChildren().forEach(function (obstacle) {
      rightmostObstacle = Math.max(rightmostObstacle, obstacle.x);
    });
    return rightmostObstacle;
  }
  update() {
    this.physics.world.collide(
      this.ground,
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
    this.obstacleGroup.getChildren().forEach(function (obstacle) {
      if (obstacle.getBounds().right < 0) {
        this.updateScore(1);
        obstacle.x =
          this.getRightmostObstacle() +
          Phaser.Math.Between(
            gameOptions.obstacleDistanceRange[0],
            gameOptions.obstacleDistanceRange[1]
          );
      }
    }, this);
  }

  changeScene() {
    this.scene.start("MainMenu");
  }
}

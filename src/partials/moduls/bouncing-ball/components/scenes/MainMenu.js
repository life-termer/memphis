import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.sky = this.add.sprite(1024 / 2, 576 / 2, "sky");
        this.mountains = this.add.tileSprite(1024 / 2, 430, 1024, 417, "mountains");
        this.plateau = this.add.tileSprite(1024 / 2, 520, 1024, 404, "plateau");
        this.ground = this.add.sprite(1024 / 2, 768 - 106 / 2, "ground");
        this.plant = this.add.tileSprite(626, 768 - 80 / 2, 626 * 2, 80, "plant");
        this.menuBg = this.add.image(1024 / 2, 768 / 2, 'menuBg');
        this.sky.setAlpha(0);
        this.mountains.setAlpha(0);
        this.plateau.setAlpha(0);
        this.ground.setAlpha(0);
        this.plant.setAlpha(0);
        // this.logo = this.add.image(512, 300, 'logo').setDepth(100);
        this.logo = this.add.text(1024 / 2, 250, 'Bouncing Ball', {
            fontFamily: 'Arial Black', fontSize: 70, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);
        const logoFx1 = this.logo.postFX.addGlow(0xffff00, 2, 0, false, 0.1, 16);
        const logoFx2 = this.logo.postFX.addGlow(0xff0000, 2, 0);
        this.text = this.add.text(1024 / 2, 460, 'Click to start New Game', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);

        this.logoTween = this.tweens.add({
            targets: this.logo,
            x: { value: 500, duration: 3000, ease: 'Back.easeInOut' },
            y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
            yoyo: true,
            repeat: -1,
            onUpdate: () => {
                x: Math.floor(this.logo.x);
                y: Math.floor(this.logo.y);
            }
        });
        this.menuTween = this.tweens.add({
            targets: [this.menuBg, this.text, this.logo],
            ease: 'Sine.easeInOut',
            duration: 1000,
            delay: 0.5,
            paused: true,
            alpha: {
              getStart: () => 1,
              getEnd: () => 0
            },
            onComplete: () => {
                this.changeScene();
            }
          });
          this.menuTween2 = this.tweens.add({
            targets: [this.sky, this.mountains, this.plateau, this.ground, this.plant],
            ease: 'Sine.easeInOut',
            duration: 500,
            delay: 0,
            paused: true,
            alpha: {
              getStart: () => 0,
              getEnd: () => 1
            },
          });

        const fx = this.menuBg.preFX.addVignette(0.5, 0.5, 0, 0.5);
        const fx2 = this.logo.preFX.addVignette(0.5, 0.5, 0, 0.2);
        const fx3 = this.text.preFX.addVignette(0.5, 0.5, 0, 0.2);

        this.tweens.add({
            targets: [ fx, fx2, fx3 ],
            radius: 1,
            duration: 2000,
            // yoyo: true,
            // loop: -1,
            // hold: 1000,
            onUpdate: () => {
                // text.setText(`FX.Vignette.radius: ${fx.radius}`);
            }
        });

        this.input.on("pointerdown", this.startGame, this);
        
        EventBus.emit('current-scene-ready', this);
    }

    startGame () {
        this.menuTween2.play();
        this.menuTween.play();
    }

    changeScene ()
    {
        this.scene.start('Game');
    }

    gameOver()
    {
        this.scene.start('GameOver');
    }
    
    moveLogo (reactCallback)
    {
        if (this.logoTween)
        {
            if (this.logoTween.isPlaying())
            {
                this.logoTween.pause();
            }
            else
            {
                this.logoTween.play();
            }
        }
        else
        {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
                y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (reactCallback)
                    {
                        reactCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y)
                        });
                    }
                }
            });
        }
    }
}

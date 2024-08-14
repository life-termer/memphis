import { Scene } from 'phaser';
import menuBg from '../../assets/background/menu-bg.jpg'
import logo from '../../assets/logo.png'
import star from '../../assets/star.png'
// import ground from '../../assets/platform.png'
import ball from '../../assets/ball.png'
import ballExpl from '../../assets/ball-expl.png'
// import ground from '../../assets/ground.png'
import groundStone from '../../assets/stoneGround.jpg'
import obstacle1 from '../../assets//obstacles/tile01.png'
import obstacle2 from '../../assets//obstacles/tile02.png'
import obstacle3 from '../../assets//obstacles/tile03.png'
import obstacle4 from '../../assets//obstacles/tile04.png'
import obstacle from '../../assets/obstacle.png'
import sky from '../../assets/background/sky.png'
import skyRed from '../../assets/background/sky-red.png'
import mountains from '../../assets/background/mountains.png'
import plateau from '../../assets/background/plateau.png'
import ground from '../../assets/background/ground.png'
import plant from '../../assets/background/plant.png'

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        // this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        // this.load.setPath('/assets');
        this.load.image('menuBg', menuBg);
        this.load.image('logo', logo);
        this.load.image('star', star);
        this.load.image('sky', sky);
        this.load.image('skyRed', skyRed);
        this.load.image('mountains', mountains);
        this.load.image('plateau', plateau);
        this.load.image('ground', ground);
        this.load.image('plant', plant);

        this.load.spritesheet('ball',
            ball,
            { frameWidth: 50, 
            frameHeight: 50,
            startFrame: 1,
            endFrame: 9 }
        );
        this.load.spritesheet('ballExpl',
            ballExpl,
            { frameWidth: 44.4, 
            frameHeight: 50,
            startFrame: 1,
            endFrame: 40 }
        );
        this.load.image('obstacle1', obstacle1);
        this.load.image('obstacle2', obstacle2);
        this.load.image('obstacle3', obstacle3);
        this.load.image('obstacle4', obstacle4);
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}

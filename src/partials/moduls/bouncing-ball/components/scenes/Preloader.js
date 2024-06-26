import { Scene } from 'phaser';
import logo from '../../assets/logo.png'
import star from '../../assets/star.png'
// import ground from '../../assets/platform.png'
import sky from '../../assets/sky.png'
import bomb from '../../assets/bomb.png'
import dude from '../../assets/dude.png'
import ball from '../../assets/ball.png'
import ground from '../../assets/ground.png'
import obstacle from '../../assets/obstacle.png'
import ballsp from '../../assets/ball-sp.png'

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
        this.load.image('logo', logo);
        this.load.image('star', star);
        this.load.image('sky', sky);
        this.load.image('ground', ground);
        this.load.image('bomb', bomb);
        this.load.spritesheet('dude',
            dude,
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.spritesheet('ballSp',
            ballsp,
            { frameWidth: 32, frameHeight: 32 }
        );
        // this.load.image('ground', ground);
        this.load.image('ball', ball);
        this.load.image('obstacle', obstacle);
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}

function init() {
    var game = new Phaser.Game(360, 600, Phaser.AUTO, 'gameWindow', { preload: preload, create: create, update: update });
    
    var platforms;

    function preload() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    }

    function create() {
        var sky = game.add.image(0, 0, 'sky');
        sky.scale.x = 1.3;
        sky.scale.y = 1.3;
        var star = game.add.sprite(0, 0, 'star');
        star.scale.x = 0.5;
        star.scale.y = 0.5;
        
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 32, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
        var ledge = platforms.create(230, 475, 'ground');
        ledge.scale.x = 0.2;
        
        ledge.body.immovable = true;

        ledge = platforms.create(10, 300, 'ground');
        ledge.scale.x = 0.3;


        ledge.body.immovable = true;    
    }

    function update() {
    }
}

window.onload = function() {
  init();
};
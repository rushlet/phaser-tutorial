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
        cursors = game.input.keyboard.createCursorKeys();
        
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
        
        
         // The player and its settings
        player = game.add.sprite(32, game.world.height - 150, 'dude');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
    }

    function update() {
        //  Collide the player and the stars with the platforms
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        
         //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform)
        {
            player.body.velocity.y = -350;
        }
    }
}

window.onload = function() {
  init();
};
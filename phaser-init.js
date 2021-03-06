function init() {
    var game = new Phaser.Game(360, 600, Phaser.AUTO, 'gameWindow', { preload: preload, create: create, update: update });
    var platforms;
    var score = 0;
    var scoreText;
    var baddieHitCount = 0;
    var gameOver;

    function preload() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
    }

    function create() {
        var sky = game.add.image(0, 0, 'sky');
        sky.scale.x = 1.3;
        sky.scale.y = 1.3;
        cursors = game.input.keyboard.createCursorKeys();
        platforms = game.add.group();
        platforms.enableBody = true;
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player);
        stars = game.add.group();
        stars.enableBody = true;
        baddie = game.add.sprite(game.world.width - 60, game.world.height - 100, 'baddie');
        game.physics.arcade.enable(baddie);

        createGroundAndLedges(platforms);
        createPlayer(player);
        createStars(stars);
        createBaddie(baddie);


        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }

    function update() {
        // stars hit the platforms
        game.physics.arcade.collide(stars, platforms);
        // make baddie land on ground
        game.physics.arcade.collide(baddie, platforms);
        //  Collide the player and the stars with the platforms
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        // check if player overlaps with star
        game.physics.arcade.overlap(player, stars, collectStar, null, this);
        game.physics.arcade.overlap(player, baddie, hitBaddie, null, this);
        movePlayer(hitPlatform);


        if (baddie.world.x <= 0) {
          baddie.body.velocity.x = (Math.floor(Math.random() * 51) + 120);
          baddie.animations.play('right');
       }
       else if (baddie.world.x >= game.world.width - 32) {
         baddie.body.velocity.x = -(Math.floor(Math.random() * 51) + 100);
         baddie.animations.play('left');
       }
    }

    function createGroundAndLedges() {
        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 32, 'ground');
        ground.body.immovable = true;

        // cresate ledges
        var ledgePositions = [[230, 475, 0.2], [150, 400, 0.1], [10, 300, 0.3], [180, 220, 0.05], [230, 120, 0.2]];
        ledgePositions.forEach(ledgePosition => {
            var ledge = platforms.create(ledgePosition[0], ledgePosition[1], 'ground');
            ledge.scale.x = ledgePosition[2];
            ledge.body.immovable = true;
        });
    }

    function createPlayer(player) {
         // The player and its settings
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
    }

    function createBaddie(baddie) {
         // The player and its settings
        baddie.body.bounce.y = 0.1;
        baddie.body.gravity.y = 300 ;
        baddie.body.collideWorldBounds = true;
        baddie.animations.add('left', [0, 1], 10, true);
        baddie.animations.add('right', [2, 3], 10, true);
        baddie.body.velocity.x = -100;
        baddie.animations.play('left');
    }

    function createStars(stars) {
        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * 30, 0, 'star');
            star.scale.x = 0.2;
            star.scale.y = 0.2;
            //  Let gravity do its thing
            star.body.gravity.y = 50;
            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.3 + Math.random() * 0.2;
        }
    }

    function movePlayer(hitPlatform) {
        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -100;
            player.animations.play('left');
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 100;
            player.animations.play('right');
        }
        else {
            //  Stand still
            player.animations.stop();
            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
            player.body.velocity.y = -250;
        }

    }

    function collectStar (player, star) {
        // Removes the star from the screen
        star.kill();
        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;
    }

    function hitBaddie (player, baddie) {
      if (baddieHitCount < 3) {
        score -= 10;
        scoreText.text = 'Score: ' + score;
        baddieHitCount ++;
      } else {
        player.kill();
        gameOver = game.add.text(game.world.width / 2 - 15, game.world.height / 2, 'GAME OVER', { fontSize: '32px', fill: '#000' });
      }
    }
}

window.onload = function() {
  init();
}

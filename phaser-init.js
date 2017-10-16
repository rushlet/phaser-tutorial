function init() {
    var game = new Phaser.Game(360, 600, Phaser.AUTO, 'gameWindow', { preload: preload, create: create, update: update });

    function preload() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('star', 'assets/star.png');
    }

    function create() {
        var sky = game.add.image(0, 0, 'sky');
        sky.scale.x = 1.3;
        sky.scale.y = 1.3;
        var star = game.add.sprite(0, 0, 'star');
        star.scale.x = 0.5;
        star.scale.y = 0.5;
    }

    function update() {
    }
}

window.onload = function() {
  init();
};
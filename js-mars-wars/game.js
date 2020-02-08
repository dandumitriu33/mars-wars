var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "black",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 }
            }
    },
    scene: [
        
        SceneCutsceneIntro,
        SceneAirRaid,
        SceneCutsceneOutro,
        SceneGameOver
    ]
    
};

let background;
let timeAirRaid = 0;

var game = new Phaser.Game(config);



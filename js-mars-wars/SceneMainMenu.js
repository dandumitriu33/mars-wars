class SceneMainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMainMenu" });
    };

    preload() {
        this.load.image("sky", "assets/sky_mars.jpg");
        //button needs replacing
        this.load.image("sprBg0", "assets/sprBg0.png");
        this.load.image("sprBg1", "assets/sprBg1.png");
        this.load.image("sprBtnPlay", "assets/sprBtnPlay.png");
        this.load.image("sprBtnPlayHover", "assets/sprBtnPlayHover.png");
        this.load.image("sprBtnPlayDown", "assets/sprBtnPlayDown.png");
        this.load.image("sprBtnRestart", "assets/sprBtnRestart.png");
        this.load.image("sprBtnRestartHover", "assets/sprBtnRestartHover.png");
        this.load.image("sprBtnRestartDown", "assets/sprBtnRestartDown.png");
    
    };

    create() {
        // this.background = new Background(this, "sky");
        this.add.image(400, 300, 'sky');
        
        this.btnPlay = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprBtnPlay"
        );
        this.btnPlay.setInteractive();
        this.btnPlay.on("pointerover", function() {
            this.btnPlay.setTexture("sprBtnPlayHover"); // set the button texture to sprBtnPlayHover
            // this.sfx.btnOver.play(); // play the button over sound
          }, this);
        this.btnPlay.on("pointerout", function() {
            this.setTexture("sprBtnPlay");
          });
        this.btnPlay.on("pointerdown", function() {
            this.btnPlay.setTexture("sprBtnPlayDown");
            // this.sfx.btnDown.play();
          }, this);
        this.btnPlay.on("pointerup", function() {
            this.btnPlay.setTexture("sprBtnPlay");
          }, this);
        this.btnPlay.on("pointerup", function() {
            this.btnPlay.setTexture("sprBtnPlay");
            this.scene.start("SceneCutsceneIntro");
          }, this);


    }

    update() {

    }


}
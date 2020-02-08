class SceneCutsceneIntro extends Phaser.Scene {
    constructor() {
        super({ key: "SceneCutsceneIntro" });
    };

    preload() {
        this.load.video("intro", "assets-mars-wars/MarsWarsIntro.mp4", 'loadeddata', false, false);
        this.load.image("sky", "assets-mars-wars/sky_mars.jpg");
        this.load.image("skip", "assets-mars-wars/SkipCutsceneButton.png");
        this.load.image("btn", "assets-mars-wars/sprBtnPlay.png");
        this.load.image("sprBtnPlayHover", "assets-mars-wars/sprBtnPlayHover.png");
    };

    

    create() {
        this.btnPlay = this.add.image(400, 300, 'btn');
        this.btnPlay.setInteractive();
        this.btnPlay.on("pointerover", function() {
            this.btnPlay.setTexture("sprBtnPlayHover"); 
              }, this);
        this.btnPlay.on("pointerout", function() {
            this.btnPlay.setTexture("btn");
              }, this);
        this.btnPlay.on("pointerup", function() {
            let vid = this.add.video(400, 300, 'intro');
            let vol = vid.getVolume();
            vid.setMute(false);
            // console.log('volume: ', vol);
            let mute = vid.isMuted();
            // console.log('muted', mute);
            vid.play();
          }, this);

        this.btnSkip = this.add.image(700, 550, 'skip');
        this.btnSkip.setInteractive();
        this.btnSkip.on("pointerup", function() {
            this.scene.start("SceneAirRaid");
          }, this);
    };

    update() {
        

    };


}
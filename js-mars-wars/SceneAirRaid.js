class SceneAirRaid extends Phaser.Scene {
    constructor() {
        super({ key: "SceneAirRaid" });
    }

    preload() {
        this.load.image('bg', "assets-mars-wars/BackgroundAirRaid.jpg");
        this.load.spritesheet('playerShip', "assets-mars-wars/PlayerShip.png", { frameWidth: 32, frameHeight: 33 });
        this.load.spritesheet("sprExplosion", "assets-mars-wars/sprExplosion.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("sprEnemy0", "assets-mars-wars/sprEnemy0.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("sprEnemy1", "assets-mars-wars/sprEnemy1.png");
        this.load.spritesheet("sprEnemy2", "assets-mars-wars/sprEnemy2.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("sprLaserEnemy0", "assets-mars-wars/sprLaserEnemy0.png");
        this.load.image("PlayerShipLaser", "assets-mars-wars/PlayerShipLaser.png");
        this.load.audio("sndExplode0", "assets-mars-wars/sndExplode0.wav");
        this.load.audio("sndExplode1", "assets-mars-wars/sndExplode1.wav");
        this.load.audio("sndLaser", "assets-mars-wars/sndLaser.wav");
        
    }

    

    create() {
                
        background = this.physics.add.image(400, -900, 'bg');
        
        this.player = new Player (
            this, 
            400, 
            500, 
            'playerShip'
        );

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.anims.create({
            key: 'normal',
            frames: this.anims.generateFrameNumbers('playerShip', { start: 5, end: 5 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('playerShip', { start: 0, end: 0 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('playerShip', { start: 8, end: 8 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('playerShip', { start: 9, end: 12 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('playerShip', { start: 13, end: 16 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: "sprEnemy0",
            frames: this.anims.generateFrameNumbers("sprEnemy0"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "sprEnemy2",
            frames: this.anims.generateFrameNumbers("sprEnemy2"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "sprExplosion",
            frames: this.anims.generateFrameNumbers("sprExplosion"),
            frameRate: 20,
            repeat: 0
        });

        this.sfx = {
            explosions: [
              this.sound.add("sndExplode0"),
              this.sound.add("sndExplode1")
            ],
            laser: this.sound.add("sndLaser")
        };

        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();

        this.time.addEvent({
            delay: 1000,
            callback: function() {
                var enemy = null;
                if (Phaser.Math.Between(0, 10) >= 3) {
                  enemy = new GunShip(
                    this,
                    Phaser.Math.Between(0, this.game.config.width),
                    0
                  );
                }
                else if (Phaser.Math.Between(0, 10) >= 5) {
                  if (this.getEnemiesByType("ChaserShip").length < 5) {
                    enemy = new ChaserShip(
                      this,
                      Phaser.Math.Between(0, this.game.config.width),
                      0
                    );
                  }
                }
                else {
                  enemy = new CarrierShip(
                    this,
                    Phaser.Math.Between(0, this.game.config.width),
                    0
                  );
                }
                if (enemy !== null) {
                  enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
                  this.enemies.add(enemy);
                }
            },
            callbackScope: this,
            loop: true 
        });

        this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
            if (enemy) {
                if (enemy.onDestroy !== undefined) {
                  enemy.onDestroy();
                }
                enemy.explode(true);
                playerLaser.destroy();
              }
        });
        this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
            if (!player.getData("isDead") &&
                !enemy.getData("isDead")) {
              player.explode(false);
              player.onDestroy();
              enemy.explode(true);
            }
        });
        this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
            if (!player.getData("isDead") &&
                !laser.getData("isDead")) {
              player.explode(false);
              player.onDestroy();
              laser.destroy();
            }
        });

            
    };

    getEnemiesByType(type) {
        var arr = [];
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            if (enemy.getData("type") == type) {
            arr.push(enemy);
            }
        }
        return arr;
    }

    update() {


        if (timeAirRaid < 3900) {
            background.setVelocityY(35);
            timeAirRaid += 1;
            console.log(timeAirRaid);
        } else {
            background.setVelocityY(0);
            this.scene.start("SceneCutsceneOutro");
        }
        

        if (!this.player.getData("isDead")) {
            this.player.update();
            if (this.keyW.isDown) {
                this.player.anims.play('up');
                this.player.moveUp();
            }
            else if (this.keyS.isDown) {
                this.player.anims.play('down');
                this.player.moveDown();   
            }

            if (this.keyA.isDown) {
                this.player.anims.play('left', true);
                this.player.moveLeft();            
            }

            else if (this.keyD.isDown) {
                this.player.anims.play('right', true);
                this.player.moveRight(); 
            
            }
            if (this.keySpace.isDown) {
                this.player.setData("isShooting", true);
            }
            else {
                this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
                this.player.setData("isShooting", false);
            }
        }

        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            enemy.update();
            if (enemy.x < -enemy.displayWidth ||
                enemy.x > this.game.config.width + enemy.displayWidth ||
                enemy.y < -enemy.displayHeight * 4 ||
                enemy.y > this.game.config.height + enemy.displayHeight) {
                if (enemy) {
                  if (enemy.onDestroy !== undefined) {
                    enemy.onDestroy();
                  }
                  enemy.destroy();
                }
            }
        }

        
        for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
            var laser = this.enemyLasers.getChildren()[i];
            laser.update();
            if (laser.x < -laser.displayWidth ||
              laser.x > this.game.config.width + laser.displayWidth ||
              laser.y < -laser.displayHeight * 4 ||
              laser.y > this.game.config.height + laser.displayHeight) {
              if (laser) {
                laser.destroy();
              }
            }
        }


        for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
            var laser = this.playerLasers.getChildren()[i];
            laser.update();
            if (laser.x < -laser.displayWidth ||
              laser.x > this.game.config.width + laser.displayWidth ||
              laser.y < -laser.displayHeight * 4 ||
              laser.y > this.game.config.height + laser.displayHeight) {
              if (laser) {
                laser.destroy();
              }
            }
        }





    }

}
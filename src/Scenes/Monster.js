class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        
        this.leftArmX = this.bodyX - 100;
        this.leftArmY = this.bodyY + 40;

        this.rightArmX = this.bodyX + 100;
        this.rightArmY = this.leftArmY;

        this.leftLegX = this.bodyX - 50;
        this.leftLegY = this.bodyY + 150;

        this.rightLegX = this.bodyX + 50;
        this.rightLegY = this.leftLegY;

        this.eyeX = this.bodyX;
        this.eyeY = this.bodyY - 60;

        this.leftHornX = this.bodyX - 50;
        this.leftHornY = this.bodyY - 100;

        this.rightHornX = this.bodyX + 50;
        this.rightHornY = this.leftHornY;

        this.leftKey = null;
        this.rightKey = null;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.leftArm = this.add.sprite(this.leftArmX, this.leftArmY, "monsterParts", "arm_whiteC.png");
        my.sprite.leftArm.flipX = true;
        my.sprite.leftArm.angle = 30;
        my.sprite.rightArm = this.add.sprite(this.rightArmX, this.rightArmY, "monsterParts", "arm_whiteC.png");
        my.sprite.rightArm.angle = -30;

        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.leftLegY, "monsterParts", "leg_whiteD.png");
        my.sprite.leftLeg.flipX = true;
        my.sprite.rightLeg = this.add.sprite(this.rightLegX, this.rightLegY, "monsterParts", "leg_whiteD.png");

        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_blueE.png");

        my.sprite.eye = this.add.sprite(this.eyeX, this.eyeY, "monsterParts", "eye_human_blue.png");

        my.sprite.smile = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "mouthA.png");
        my.sprite.fangs = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "mouthB.png");
        my.sprite.fangs.visible = false;

        my.sprite.leftHorn = this.add.sprite(this.leftHornX, this.leftHornY, "monsterParts", "detail_red_horn_large.png");
        my.sprite.leftHorn.flipX = true;
        my.sprite.rightHorn = this.add.sprite(this.rightHornX, this.rightHornY, "monsterParts", "detail_red_horn_large.png");

        // Polling input: left key
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        // Polling input: right key
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Event input: show fangs
        this.input.keyboard.on('keydown-F', (event) => {
            my.sprite.fangs.visible = true;
            my.sprite.smile.visible = false;
        });
        // Event input: smile
        this.input.keyboard.on('keydown-S', (event) => {
            my.sprite.smile.visible = true;
            my.sprite.fangs.visible = false;
        });
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        // Polling input: movement
        if (this.leftKey.isDown) {
            for (const sprite in my.sprite) {
                my.sprite[sprite].x -= 2;
            }
        }
        if (this.rightKey.isDown) {
            for (const sprite in my.sprite) {
                my.sprite[sprite].x += 2;
            }
        }
    }

}
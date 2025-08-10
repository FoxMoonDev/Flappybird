class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('background', 'assets/BG.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('bird0', 'assets/b0.png');
        this.load.image('bird1', 'assets/b1.png');
        this.load.image('bird2', 'assets/b2.png');
        this.load.image('getready_text', 'assets/getready.png');
        this.load.image('taptap', 'assets/t0.png');
    }

    create() {
        this.ground = this.add.tileSprite(144, 458, 288, 112, 'ground');
        this.add.image(144, 150, 'getready_text');
        this.add.image(144, 280, 'taptap');
        this.bird = this.add.sprite(144, 220, 'bird0');
        this.anims.create({ key: 'flap_anim', frames: [ { key: 'bird0' }, { key: 'bird1' }, { key: 'bird2' }, { key: 'bird1' } ], frameRate: 10, repeat: -1 });
        this.bird.play('flap_anim');
        this.input.once('pointerdown', () => { this.scene.start('GameScene'); });
    }
}

/**
 * Cena Principal do Jogo
 */
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }
    
    preload() {
        this.load.image('toppipe', 'assets/toppipe.png');
        this.load.image('botpipe', 'assets/botpipe.png');
    }

    create() {
        this.score = 0;
        this.gameOver = false;
        
        this.pipes = this.physics.add.group();
        this.ground = this.physics.add.sprite(144, 458, 'ground');
        this.ground.setImmovable(true).body.allowGravity = false;

        this.bird = this.physics.add.sprite(80, 240, 'bird0');
        this.bird.play('flap_anim');
        this.bird.body.gravity.y = 800;
        this.bird.setCollideWorldBounds(true);
        this.physics.world.setBounds(0, 0, 288, 512);
        
        this.pipeTimer = this.time.addEvent({ delay: 1400, callback: this.addPipes, callbackScope: this, loop: true });

        this.scoreText = this.add.text(20, 20, '0', { fontFamily: 'Arial', fontSize: '48px', color: '#fff', stroke: '#000', strokeThickness: 4 });
        
        this.physics.add.collider(this.bird, this.ground, this.hitObstacle, null, this);
        this.physics.add.collider(this.bird, this.pipes, this.hitObstacle, null, this);

        this.input.on('pointerdown', this.flap, this);
        this.input.keyboard.on('keydown-SPACE', this.flap, this);
    }

    update() {
        if (this.gameOver) return;
        this.ground.tilePositionX += 2;
        if (this.bird.body.velocity.y > 0 && this.bird.angle < 90) { this.bird.angle += 2; }
        if (this.bird.y < 0) this.hitObstacle();
        this.pipes.getChildren().forEach(pipe => {
            if (pipe.getBounds().right < this.bird.getBounds().left && !pipe.scored) {
                pipe.scored = true;
                this.score++;
                this.scoreText.setText(this.score);
            }
        });
    }

    flap() {
        if (this.gameOver) return;
        this.bird.setVelocityY(-300);
        this.tweens.add({ targets: this.bird, angle: -30, duration: 100 });
    }

    addPipes() {
        const pipeGap = 100; // O espaço para o pássaro passar
        
        // Decide aleatoriamente a posição do topo do cano de baixo.
        // A posição Y precisa estar em uma área jogável, não muito alta nem muito baixa.
        const bottomPipeY = Phaser.Math.Between(220, 412);

        // A posição do fundo do cano de cima é a posição do cano de baixo menos o tamanho do buraco.
        const topPipeY = bottomPipeY - pipeGap;
        
        // Cria o cano de baixo e ancora seu ponto de física no topo.
        const bottomPipe = this.pipes.create(288, bottomPipeY, 'botpipe');
        bottomPipe.setOrigin(0, 0); 
        
        // Cria o cano de cima e ancora seu ponto de física na base.
        const topPipe = this.pipes.create(288, topPipeY, 'toppipe');
        topPipe.setOrigin(0, 1);
        
        // Configura a física para ambos os canos
        [topPipe, bottomPipe].forEach(pipe => {
            pipe.setImmovable(true).body.setAllowGravity(false);
            pipe.setVelocityX(-160);
            pipe.checkWorldBounds = true;
            pipe.outOfBoundsKill = true;
        });
          bottomPipe.scored = false;
    }

    hitObstacle() {
        if (this.gameOver) return;
        this.gameOver = true;
        this.cameras.main.flash(100, 255, 255, 255);
        this.pipeTimer.remove();
        this.bird.anims.stop();
        this.physics.pause();
        this.time.delayedCall(1000, () => { this.scene.start('GameOverScene', { score: this.score }); });
    }
}

/**
 * Cena de Fim de Jogo
 */
class GameOverScene extends Phaser.Scene {
    constructor() { super({ key: 'GameOverScene' }); }
    preload() { this.load.image('gameover_text', 'assets/go.png'); }
    init(data) { this.finalScore = data.score; }
    create() {
        this.ground = this.add.tileSprite(144, 458, 288, 112, 'ground');
        let bestScore = localStorage.getItem('flappyBestScore') || 0;
        if (this.finalScore > bestScore) { bestScore = this.finalScore; localStorage.setItem('flappyBestScore', bestScore); }
        this.add.image(144, 150, 'gameover_text');
        this.add.text(144, 250, 'Score: ' + this.finalScore, { fontSize: '32px', color: '#fff', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.text(144, 300, 'Best: ' + bestScore, { fontSize: '32px', color: '#fff', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.text(144, 400, 'Clique para tentar de novo', { fontSize: '18px', color: '#fff', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5);
        this.input.once('pointerdown', () => { this.scene.start('MenuScene'); });
    }
}

// Configuração final com tela cheia responsiva e fundo transparente
const config = {
    type: Phaser.AUTO,
    transparent: true, 
    scale: {
        mode: Phaser.Scale.FIT, 
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 288,
        height: 512,
    },
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: [MenuScene, GameScene, GameOverScene]
};

const game = new Phaser.Game(config);
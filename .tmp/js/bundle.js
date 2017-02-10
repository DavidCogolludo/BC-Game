(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
function Chapa (game ,img, x, y){
	//this.chapa = this.game.add.sprite(400, 400, 'chapa');
	this.chapa = game.add.sprite(x, y, img);
    /*this.chapa.anchor.x = 0.5;
    this.chapa.anchor.y = 0.5;*/
    this.chapa.body
    this.chapa.flecha = game.add.sprite(x,y,'flecha');
    this.chapa.flecha.visible = false;
    this.chapa.clic = false;
    this.chapa.flecha.anchor.x = 0;
    this.chapa.flecha.anchor.y = 0.5;
    this.chapa.inputEnabled = true;

    var self = this;
    this.chapa.events.onInputDown.add(function(){self.chapa.bar.visible = true;  this.chapa.flecha.visible = true; this.clic = false;}, this);
    
    this.chapa.bar = game.add.sprite(x, y, 'powerBar');
    this.chapa.bar.visible = false;
    this.chapa.bar.animations.add('p');
    this.chapa.bar.animations.play('p', 20,true);
    this.chapa.power = [];
    	var aux = 55;
    	var incr = 5;
    for (var i = 0; i < 33; i++){
    	this.chapa.power.push(aux);
    	aux += incr;
    	if(aux == 100){
    		aux = 90;
    		incr*=-1;
    	} 
    	else if (aux == 10){
    		aux = 20;
    		incr*=-1;
    	}
    }
     console.log('pop');
     game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.defaultRestitution = 0.8;
    game.physics.p2.enable(this.chapa);

    console.log('pop');
    this.chapa.body.setCircle(17);
    this.chapa.body.collideWorldBounds = true;
    this.chapa.body.bounce.setTo(0.9, 0.9);

     this.chapa.act = function(){
     	    //game.debug.body(this);
     	this.bar.position = this.position;
     	this.flecha.position = this.position;
     	if(this.flecha.visible){
     	 this.flecha.rotation = game.physics.arcade.angleToPointer(this.flecha);
  
        //console.log(this.flecha.rotation);
       if (game.input.activePointer.isDown){
       	var self = this;
       	if(this.clic){
       		var force = this.power[this.bar.animations.frame] *3;
       		game.physics.arcade.moveToPointer(this, force);
       		this.bar.visible = false;  this.flecha.visible = false;
       		this.clic = false;
       	} 
       	
       else setTimeout(function(){self.clic = true;}, 200);	

       } 
   }
       if(this.body.velocity.x<0)this.body.velocity.x+=2;
       else if(this.body.velocity.x>0) this.body.velocity.x-=2;
        if(this.body.velocity.y<0)this.body.velocity.y+=2;
       else if(this.body.velocity.y>0) this.body.velocity.y-=2;
     };

     return this.chapa;
}
Chapa.prototype.constructor = Chapa;

module.exports = {
  Chapa: Chapa,
};
},{}],2:[function(require,module,exports){
var GameOver = {
    create: function () {
        console.log("Game Over");
        var button = this.game.add.button(400, 300, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        var goText = this.game.add.text(400, 100, "GameOver");
        var text = this.game.add.text(0, 0, "Reset Game");
        var text2 = this.game.add.text(0, 0, "Return Menu");
        text.anchor.set(0.5);
        goText.anchor.set(0.5);
        text2.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(text);
        //TODO 8 crear un boton con el texto 'Return Main Menu' que nos devuelva al menu del juego.
        var button2 = this.game.add.button(400, 400, 
                                          'button', 
                                          this.actionOnClick2, 
                                          this, 2, 1, 0);
        button2.anchor.set(0.5);
        button2.addChild(text2);
    },
    
    //TODO 7 declarar el callback del boton.
    actionOnClick: function(){
        this.game.state.start('play');
    },
    actionOnClick2: function(){
       this.game.world.setBounds(0,0,800,600);
       this.game.stage.backgroundColor = '#000000';
       this.game.state.start('menu');
    }

};

module.exports = GameOver;


},{}],3:[function(require,module,exports){
'use strict';

//TODO 1.1 Require de las escenas, play_scene, gameover_scene y menu_scene.
var PlayScene = require('./play_scene.js');
var GameOver = require('./gameover_scene.js');
var MenuScene = require('./menu_scene.js');
//  The Google WebFont Loader will look for this object, so create it before loading the script.




var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    this.game.load.spritesheet('button', 'images/buttons.png', 168, 70);
    this.game.load.image('logo', 'images/phaser.png');
  },

  create: function () {
    //this.game.state.start('preloader');
      this.game.state.start('menu');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(100,300, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5); 
    this.game.load.setPreloadSprite(this.loadingBar);
    this.game.stage.backgroundColor = "#000000";
    
    
    
    this.load.onLoadStart.add(this.loadStart, this);
    //TODO 2.1 Cargar el tilemap images/map.json con el nombre de la cache 'tilemap'.
      //la imagen 'images/simples_pimples.png' con el nombre de la cache 'tiles' y
      // el atlasJSONHash con 'images/rush_spritesheet.png' como imagen y 'images/rush_spritesheet.json'
      //como descriptor de la animación.
       //this.game.load.tilemap('tilemap', 'images/map.json', null, Phaser.Tilemap.TILED_JSON);
       //this.game.load.image('tiles', 'images/simples_pimples.png');
       this.game.load.image('chapa', 'images/chapa.png');
       this.game.load.image('flecha', 'images/arrow.png');
       this.game.load.image('BG', 'images/Campo.png');
       this.game.load.spritesheet('powerBar', 'images/power.png', 180, 30, 32);
       //this.game.load.atlasJSONHash('rush_idle01', 'images/rush_spritesheet.png', 'images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
       
      //TODO 2.2a Escuchar el evento onLoadComplete con el método loadComplete que el state 'play'
        this.game.load.onLoadComplete.add(this.loadComplete, this);
  },

  loadStart: function () {
    console.log("Game Assets Loading ...");
  },
    
    
     //TODO 2.2b function loadComplete()
  loadComplete: function(){
    console.log("dentro");
		//this._ready = true;
    this.game.state.start('play');
    },

  update: function(){
        this._loadingBar
    }
};


var wfconfig = {
 
    active: function() { 
        console.log("font loaded");
        init();
    },
 
    google: {
        families: ['Sniglet']
    }
 
};
 
//TODO 3.2 Cargar Google font cuando la página esté cargada con wfconfig.
//TODO 3.3 La creación del juego y la asignación de los states se hará en el método init().

window.onload = function () {
  WebFont.load(wfconfig);
};

function init (){
  var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'game');

//TODO 1.2 Añadir los states 'boot' BootScene, 'menu' MenuScene, 'preloader' PreloaderScene, 'play' PlayScene, 'gameOver' GameOver.
 game.state.add('boot', BootScene);
 game.state.add('menu', MenuScene);
 game.state.add('preloader', PreloaderScene);
 game.state.add('play', PlayScene);
 game.state.add ('gameOver', GameOver);

//TODO 1.3 iniciar el state 'boot'. 
game.state.start('boot');
}
},{"./gameover_scene.js":2,"./menu_scene.js":4,"./play_scene.js":5}],4:[function(require,module,exports){
var MenuScene = {
    create: function () {
        
        var logo = this.game.add.sprite(this.game.world.centerX, 
                                        this.game.world.centerY, 
                                        'logo');
        logo.anchor.setTo(0.5, 0.5);
        var buttonStart = this.game.add.button(this.game.world.centerX, 
                                               this.game.world.centerY, 
                                               'button', 
                                               this.actionOnClick, 
                                               this, 2, 1, 0);
        buttonStart.anchor.set(0.5);
        var textStart = this.game.add.text(0, 0, "Start");
        textStart.font = 'Sniglet';
        textStart.anchor.set(0.5);
        buttonStart.addChild(textStart);
    },
    
    actionOnClick: function(){
        this.game.state.start('preloader');
    } 
};

module.exports = MenuScene;
},{}],5:[function(require,module,exports){
'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}
var entities = require('./entities.js');

//Scena de juego.
var PlayScene = {
    _rush: {}, //player
    _speed: 300, //velocidad del player
    _jumpSpeed: 600, //velocidad de salto
    _jumpHight: 150, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.

    //Método constructor...
  create: function () {
      //Creamos al player con un sprite por defecto.
      //TODO 5 Creamos a rush 'rush'  con el sprite por defecto en el 10, 10 con la animación por defecto 'rush_idle01'
       var BG = this.game.add.sprite(0, 
                                      0, 
                                      'BG');
        this.game.world.setBounds(0, 0, 1000, 600);
      this.chapa = new entities.Chapa(this.game, 'chapa',400,400);
      this.chapa2 = new entities.Chapa(this.game, 'chapa',200,200);
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
     
      //this.configure();
  },
    set: function(){
        console.log(this.flecha)
    this.chapa.body.moves = true;
    var Xvector = (this.flecha.x* this.flecha.rotation) ;
    var Yvector = (this.flecha.y* this.flecha.rotation) ;
    this.chapa.body.allowGravity = true;  
    this.chapa.body.velocity.setTo(Xvector, Yvector);
    },
    //IS called one per frame.
    update: function () {
       this.game.physics.arcade.collide(this.chapa, this.chapa2);
       this.chapa.act();    
        this.chapa2.act();   
      //if (this.game.input.activePointer.isDown)this.set();
       /* var moveDirection = new Phaser.Point(0, 0);
        var collisionWithTilemap = this.game.physics.arcade.collide(this._rush, this.groundLayer);
        var movement = this.GetMovement();
        //transitions
        switch(this._playerState)
        {
            case PlayerState.STOP:
            case PlayerState.RUN:
                if(this.isJumping(collisionWithTilemap)){
                    this._playerState = PlayerState.JUMP;
                    this._initialJumpHeight = this._rush.y;
                    this._rush.animations.play('jump');
                }
                else{
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._rush.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._rush.animations.play('stop');
                    }
                }    
                break;
                
            case PlayerState.JUMP:
                
                var currentJumpHeight = this._rush.y - this._initialJumpHeight;
                this._playerState = (currentJumpHeight*currentJumpHeight < this._jumpHight*this._jumpHight)
                    ? PlayerState.JUMP : PlayerState.FALLING;
                break;
                
            case PlayerState.FALLING:
                if(this.isStanding()){
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._rush.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._rush.animations.play('stop');
                    }
                }
                break;     
        }
        //States
        switch(this._playerState){
                
            case PlayerState.STOP:
                moveDirection.x = 0;
                break;
            case PlayerState.JUMP:
            case PlayerState.RUN:
            case PlayerState.FALLING:
                if(movement === Direction.RIGHT){
                    moveDirection.x = this._speed;
                    if(this._rush.scale.x < 0)
                        this._rush.scale.x *= -1;
                }
                else{
                    moveDirection.x = -this._speed;
                    if(this._rush.scale.x > 0)
                        this._rush.scale.x *= -1; 
                }
                if(this._playerState === PlayerState.JUMP)
                    moveDirection.y = -this._jumpSpeed;
                if(this._playerState === PlayerState.FALLING)
                    moveDirection.y = 0;
                break;    
        }
        //movement
        this.movement(moveDirection,5,
                      this.backgroundLayer.layer.widthInPixels*this.backgroundLayer.scale.x - 10);
        this.checkPlayerFell();*/
    },
    
    
    canJump: function(collisionWithTilemap){
        return this.isStanding() && collisionWithTilemap || this._jamping;
    },
    
    onPlayerFell: function(){
        //TODO 6 Carga de 'gameOver';
        this.destroy();
        this.game.state.start('gameOver');
    },
    
    checkPlayerFell: function(){
        if(this.game.physics.arcade.collide(this._rush, this.death))
            this.onPlayerFell();
    },
        
    isStanding: function(){
        return this._rush.body.blocked.down || this._rush.body.touching.down
    },
        
    isJumping: function(collisionWithTilemap){
        return this.canJump(collisionWithTilemap) && 
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
    },
        
    GetMovement: function(){
        var movement = Direction.NONE
        //Move Right
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            movement = Direction.RIGHT;
        }
        //Move Left
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            movement = Direction.LEFT;
        }
        return movement;
    },
    //configure the scene
    configure: function(){
        //Start the Arcade Physics systems
        this.game.world.setBounds(0, 0, 2400, 160);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a9f0ff';
        this.game.physics.arcade.enable(this._rush);
        
        this._rush.body.bounce.y = 0.2;
        this._rush.body.gravity.y = 20000;
        this._rush.body.gravity.x = 0;
        this._rush.body.velocity.x = 0;
        this.game.camera.follow(this._rush);
    },
    //move the player
    movement: function(point, xMin, xMax){
        this._rush.body.velocity = point;// * this.game.time.elapseTime;
        
        if((this._rush.x < xMin && point.x < 0)|| (this._rush.x > xMax && point.x > 0))
            this._rush.body.velocity.x = 0;

    },
    
    //TODO 9 destruir los recursos tilemap, tiles y logo.
    destroy: function(){
    this._rush.destroy();
    this.map.destroy();
    }

};

module.exports = PlayScene;

},{"./entities.js":1}]},{},[3]);

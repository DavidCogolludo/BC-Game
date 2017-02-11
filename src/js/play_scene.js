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

init : function(golesC, golesBc){
 this.golesBC = golesBc || 0;
      this.golesC = golesC || 0;
},
    //Método constructor...
  create: function () {
      //Creamos al player con un sprite por defecto.
      //TODO 5 Creamos a rush 'rush'  con el sprite por defecto en el 10, 10 con la animación por defecto 'rush_idle01'
       var BG = this.game.add.sprite(0,0,'BG');
       var marcador = this.game.add.sprite(0, 600, 'marcador');
       this.scored = false;
       //--------------CANVAS-----------------------------
     
      this.marcadorBC = this.game.add.text(325, 615, this.golesBC, { font: "65px Arial", fill: "#ffffff", align: "center" });
      this.marcadorC = this.game.add.text(625, 615, this.golesC, { font: "65px Arial", fill: "#ffffff", align: "center" });


        this.game.world.setBounds(0, 0, 1000, 600);
         this.balon = this.game.add.sprite( 500, 300, 'balonS');
         this.balon.anchor.setTo(0.5);
         this.balon.scale.setTo(0.8);
          this.balon.animations.add('p');

    this.bayernCu = this.game.add.group();
    this.bc = [];
    this.bc.push(new entities.Chapa(this.game, 'portero',100,300));
    this.bc.push(new entities.Chapa(this.game, 'chapa',225,450));
    this.bc.push(new entities.Chapa(this.game, 'chapa',225,150));
    this.bc.push(new entities.Chapa(this.game, 'chapa',300,300));
     this.bc.push(new entities.Chapa(this.game, 'chapa',370,50));
     this.bc.push(new entities.Chapa(this.game, 'chapa',370,550));
     this.bc.push(new entities.Chapa(this.game, 'chapa',450,300));
     ///----------------------------rivales---------------------------------------------
    this.bc.push(new entities.Chapa(this.game, 'portero2',900,300));
    this.bc.push(new entities.Chapa(this.game, 'chapa2',775,450));
    this.bc.push(new entities.Chapa(this.game, 'chapa2',775,150));
    this.bc.push(new entities.Chapa(this.game, 'chapa2',700,300));
    this.bc.push(new entities.Chapa(this.game, 'chapa2',625,50));
    this.bc.push(new entities.Chapa(this.game, 'chapa2',625,550));
    this.bc.push(new entities.Chapa(this.game, 'chapa2',550,300));
    for (var i = 0; i < this.bc.length; i++){
      this.bayernCu.add(this.bc[i]);
    }

    this.porterias = this.game.add.group();

    this.porterias.enableBody = true;
    this.porterias.physicsBodyType = Phaser.Physics.ARCADE;
    //this.porterias.physicsBodyType = Phaser.Physics.ARCADE;
    this.port = [];
     var aux = this.game.add.sprite(44, 300, 'larguero');
    aux.anchor.setTo(0.5);
    aux.scale.x=0.8;
    aux.scale.y = 0.9;
   
    this.port.push(this.game.add.sprite(36,377, 'palo'));
    this.port.push(this.game.add.sprite(36,205, 'palo'));
    this.port.push(aux);

    aux = this.game.add.sprite(954, 300, 'larguero');
    aux.anchor.setTo(0.5);
    aux.scale.x =-0.8;
    aux.scale.y = 0.9;
    this.port.push(this.game.add.sprite(875,377, 'palo'));
    this.port.push(this.game.add.sprite(875,205, 'palo'));
    this.port.push(aux);

    for (var i = 0; i < this.port.length; i++){
      this.porterias.add(this.port[i]);
    }
    this.porterias.forEach(function(obj){
        obj.body.immovable = true;
    })
    //-------Red--------------
    this.redBC = this.game.add.sprite(80,300, 'red');
    this.redBC.anchor.setTo(0.5);
    this.redC = this.game.add.sprite(920,300, 'red');
    this.redC.anchor.setTo(0.5);
    

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.balon);
    this.balon.body.setCircle(17.5);
    this.balon.body.collideWorldBounds = true;
    this.balon.body.bounce.setTo(0.9, 0.9);


     
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
        var self = this;

        this.marcadorBC.setText(this.golesBC);
        this.marcadorC.setText(this.golesC);


        this.bayernCu.forEach(function(obj){
          self.game.physics.arcade.collide(obj, self.bayernCu);
          self.game.physics.arcade.collide(obj, self.porterias);
        })
        this.bayernCu.forEach(function(obj){
          if(self.game.physics.arcade.collide(obj, self.balon)) self.balon.animations.play('p', 20,true);
        })
        this.porterias.forEach(function(obj){
             //self.game.debug.body(obj);
          self.game.physics.arcade.collide(obj, self.balon);
        })
      
       this.bayernCu.forEach(function(obj){
        obj.act();
       })  
        if(this.balon.body.velocity.x<0)this.balon.body.velocity.x+=0.5;
       else if(this.balon.body.velocity.x>0) this.balon.body.velocity.x-=0.5;
        if(this.balon.body.velocity.y<0)this.balon.body.velocity.y+=0.5;
       else if(this.balon.body.velocity.y>0) this.balon.body.velocity.y-=0.5;
    
       if(Math.round(this.balon.body.velocity.x) === 0 && Math.round(this.balon.body.velocity.y) === 0) this.balon.animations.stop();
       else this.balon.animations.currentAnim.speed -=0.1;

       if(this.balon.overlap(this.redBC) && !this.scored){
        this.scored = true;
        setTimeout(function(){self.golesC++; self.scored = false;self.game.state.restart(true, false, self.golesC,self.golesBC);}, 2000);
       } 

       if(this.balon.overlap(this.redC) && !this.scored){
        this.scored = true;
        setTimeout(function(){self.golesBC++; self.scored = false;self.game.state.restart(true, false, self.golesC,self.golesBC);}, 2000);
       }
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

'use strict';
function Chapa (game ,img, x, y){
	//this.chapa = this.game.add.sprite(400, 400, 'chapa');
	this.chapa = game.add.sprite(x, y, img);
    this.chapa.anchor.x = 0.5;
    this.chapa.anchor.y = 0.5;
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
    this.chapa.bar.anchor.setTo(0.5);
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
    //game.physics.startSystem(Phaser.Physics.P2JS);
    //game.physics.p2.defaultRestitution = 0.8;
   game.physics.arcade.enable(this.chapa);

    this.chapa.body.setCircle(25);
    this.chapa.body.collideWorldBounds = true;
    this.chapa.body.bounce.setTo(0.9, 0.9);

     this.chapa.act = function(){
     	    //game.debug.body(this);
     	//this.bar.position = this.position;
      this.bar.position.x = this.position.x;
      this.bar.position.y = this.position.y +50;
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
       if(Math.round(this.body.velocity.x)<0)this.body.velocity.x+=2;
       else if(Math.round(this.body.velocity.x)>0) this.body.velocity.x-=2;
        if(Math.round(this.body.velocity.y)<0)this.body.velocity.y+=2;
       else if(Math.round(this.body.velocity.y)>0) this.body.velocity.y-=2;
     };

     return this.chapa;
}
Chapa.prototype.constructor = Chapa;

module.exports = {
  Chapa: Chapa,
};
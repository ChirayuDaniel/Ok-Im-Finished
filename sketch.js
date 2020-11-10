const Bodies = Matter.Bodies;
const Engine = Matter.Engine;
const World = Matter.World;
var gameState = "play"
var particles = []
var plinkos = []
var divisions = []
var particle
var divisionHeight = 300
var ground
var score = 0
var turn = 0
function setup() {
  createCanvas(480, 800);

  engine = Engine.create();
  world = engine.world;
  
  ground = new Ground(240, height,480,20)
  for(var k = 0; k <=width; k = k+80){
    divisions.push(new Divisions(k,height-divisionHeight/2,10,divisionHeight)); 
  }
for(var j = 40; j <=width; j = j + 50){
  plinkos.push(new Plinko (j,75));
}
for(var j = 15; j <= width - 10; j = j+50){
  plinkos.push(new Plinko (j,175))
}
for(var j = 10; j <= width - 20; j = j+50){
  plinkos.push(new Plinko (j,275))
}
for(var j = 5; j <= width - 30; j = j+50){
  plinkos.push(new Plinko (j,375))
}
if(frameCount%90 === 0){
  particles.push(new Particle(random(width/2-10,width/2 + 10),10,10));
}

for (var j = 0; j < particles.length; j++){
  particles[j].display();
}
for(var k = 0; k< divisions.length; k++){
  divisions[k].display();


}

textSize(35)
text("Score" + score, 470,10)

textSize()
text("100")

}

function draw() {
  background("black");
  textSize(20)
 //text("Score : "+score,20,30);
  Engine.update(engine);
  ground.display();
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   if(frameCount%60===0){
     particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
     score++;
   }
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   if(particle.body.position.x > 301 && particle.body.position.x < 600){
     score = score + 100
   }
   if(particle.body.position.x < 300){
    score = score + 500
    
  }
  if(particle.body.position.x > 601 && particle.body.position.x < 900){
    score = score + 200
    particle = null
  }
if(particle.y >= 470){
  turn = turn + 1
}
  if(turn >= 5){
    gameState = "end";
    textSize(30)
    text(" GO HOME", 240,400)
  }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
   if(particle!= null){
     particle.display();
   }

  }

function mousePressed(){
  if(gameState!== " end"){
    turn++;
    particle = new Particle(mouseX,10,10,10)
  }
}
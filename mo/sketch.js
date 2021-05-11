var monkey, monkey_running, banana, bananaImage, obstacle, obstacleImage, FoodGroup, obstacleGroup, backgroundi, x, y, invisableground, edges, bi, si, bi3, temp, b1, b2, b3, st, monkeystop, restart, gameover, rt, go,bananas;
var survivaltime = 0
var score = 0;
var temp=0;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  backgroundi = loadImage("bg.png")
  bi = loadImage("wer.png")
  si = loadImage("stone1.png")
  bi3 = loadImage("b3.png")
  monkeystop = loadImage("sprite_1.png");
  restart = loadImage("t.png")
  gameover = loadImage("iop.jpg")
}



function setup() {
  createCanvas(600, 400)
   b= text("Food Count:"+ score, 380, 25)
  invisableground = createSprite(300, 380, 4500, 10);
 invisableground.visible = false;
  //edges = createEdgeSprites()
  monkey = createSprite(80, 350, 20, 20)
  monkey.addAnimation("moving", monkey_running)
  monkey.addAnimation("stop", monkeystop)
  monkey.scale = 0.15
  temp = 0
  x = 0
  y = -width
  b1 = new Group()
  b2 = new Group()
  b3 = new Group()
  st = new Group()
  gamestate = 0
  rt = createSprite(2300, 310);
  rt.addImage(restart)
  rt.scale=0.5
  rt.visible = false
  go = createSprite(2250, 200);
  go.addImage(gameover)
  go.scale = 0.15
  go.visible = false

}

function banana() {
  if (frameCount % 80 == 0) {
    var banana = createSprite(monkey.x+300, Math.round(random(120, 200)), 10, 10);
       banana.addImage(bananaImage)
    banana.scale = 0.1
       b1.add(banana)
  }
}

function banana2() {
  if (frameCount % 80 == 0) {
    var banana2 = createSprite(monkey.x+300, Math.round(random(100, 150)), 10, 10);
       banana2.addImage(bi)
    banana2.scale = 0.2
       b2.add(banana2)
  }
}

function stone() {
  if (frameCount % 250 == 0) {
    var stone = createSprite(monkey.x+400, 370, 10, 10);
       stone.addImage(si)
    stone.scale = 0.3
      st.add(stone)

  }
}function banana3() {
  if (frameCount % 80 == 0) {
    var banana3 = createSprite(monkey.x+300, Math.round(random(100, 150)), 10, 10);
       banana3.addImage(bi3)
    banana3.scale = 0.2
      b3.add(banana3)
  }
}function callback(s1, s2) {
  s1.remove();
}
function draw() {
  background(220);
 
 image(backgroundi,0,0,3000,height)
  if (gamestate == 0) {
    
monkey.velocityX=0
      
 if(monkey.x<2015){ 
camera.position.x=monkey.x+250
}
if(keyDown("left")){
 monkey.velocityX=-5    
 }
 if(keyDown("right")){
  monkey.velocityX=5  
 } 
    if(monkey.x>2400){
    monkey.velocityX=0
    //gamestate=1 
    monkey.changeAnimation("stop") 
    textSize(50)
    fill("white")
    text("YOU WIN",2100, 200)
        }
    if(monkey.x<2010){
     stroke("black")
    fill("yellow")
    textSize(30)
    text(" survival Time : " + survivaltime, monkey.x+300, 25)
    text("Food Count:"+ score,  monkey.x, 25)
    textSize(20)
    fill("white")
    text("right and left key to make the monkey move",monkey.x, 50)
    text("up key to make the monkey jump",monkey.x,70)
    text("If the monkey hits the rock twice the game stops",monkey.x,90)
    text("monkey survives,you win ",monkey.x,110)  
   
    } 
    if(monkey.x>2010){
      stroke("black")
      fill("yellow")
      textSize(30)
      text(" survival Time : " + survivaltime, 2300, 25)
      text("Food Count:"+ score, 2015, 25)
      textSize(20)
      fill("white")
     text("right and left key to make the monkey move",2020, 50)
      text("up key to make the monkey jump",2020,70)
      text("If the monkey hits the rock twice the game stops",2020,90) 
      text("monkey survives,you win",2020,110)
      } 

      
    if (keyDown("up")) {
      monkey.velocityY = -10;
    }
   
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(invisableground);
    stone()
       bananas = Math.round(random(1, 3));
    if (frameCount % 80 == 0) {
      if (bananas == 1) {
        banana()
      } else if (bananas == 2) {
        banana2()
      } else if (bananas == 3) {
        banana3()
      }
    }
        if (frameCount % 50 == 0) {
      survivaltime += 1
      temp = survivaltime
    }
    if (b1.collide(monkey, callback)) {
      score = score + 1;
      temp=0
    }
    if (b2.collide(monkey, callback)) {
      score = score + 4;
      temp=0
    }
    if (b3.collide(monkey, callback)) {
      score = score + 3;
      temp=0
    }
    if(st.collide(monkey,callback)){
        
        if(monkey.scale==0.1){
          gamestate=1
          monkey.velocityX=0
        }
        monkey.scale=0.1
            } 
    } else if (gamestate == 1) {
     monkey.changeAnimation("stop")
    go.visible = true;
   monkey.velocityX=0
  
      }
  monkey.collide(invisableground);
     drawSprites();
 

}
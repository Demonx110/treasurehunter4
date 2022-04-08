var robot , robotImg
var backgroundImg , bg
var coins , coinsImg
var heart , heartImg
var rock1 , rock1Img
var rock2 , rock2Img
var rock3 , rock3Img
var invisibleGround 
var coinsGroup
var score = 0 
var HeartsGroup
var sprite 
var lives = 3
var obstaclesGroup
var gameover
var gamestate = "play"

function preload(){
  robotImg = loadImage("pc.png")
  backgroundImg = loadImage("earth.jpg")
  coinsImg = loadImage("coins.png")
  heartImg = loadImage("heart.png")
  rock1Img = loadImage("rock1.png")
  rock2Img = loadImage("rock2.png")
  rock3Img = loadImage("rock3.png")
  spriteImg = loadImage("heart.png")
gameoverImg = loadImage("gameover.jpg")
}

function setup(){
  createCanvas(800 ,600)
  bg = createSprite(400,300,800 ,600)
  bg.addImage(backgroundImg)
  bg.scale = 1.25
  bg.velocityX = -1

  robot  = createSprite(275,350,100,100)
  robot.addImage(robotImg)
  robot.scale = 0.1
  
 invisibleGround = createSprite(275,450,400,10)
 invisibleGround.visible = false 
 coinsGroup = new Group()
 HeartsGroup = new Group()

 sprite = createSprite(700,50,50,50)
 sprite.addImage(spriteImg)
 sprite.scale = 0.1

 obstaclesGroup = new Group()
 gameover = createSprite(400,300,800,600)
 gameover.visible = false 
 gameover.addImage(gameoverImg)
 gameover.scale = 0.7
}


function draw(){
background(0)
if(gamestate === "play"){
  if(bg.x < 350){
  bg.x = 400
}
if(keyDown("up")){
  robot.velocityY = -8 
}
robot.velocityY = robot.velocityY + 0.8
robot.collide(invisibleGround)
spawnObstacles()
spawnCoins()
 spawnHearts() 
if(HeartsGroup.isTouching(robot) && lives<=2){
 lives++ 
 HeartsGroup.destroyEach()
} 
if(obstaclesGroup.isTouching(robot)){
 lives = lives - 1
 obstaclesGroup.destroyEach()
 if(lives <= 0){
obstaclesGroup.destroyEach()
coinsGroup.destroyEach()
HeartsGroup.destroyEach()
// robot.destroy()
// bg.destroy()
gamestate = "end"
 }
}
} 
else if(gamestate === "end"){
score = 0
gameover.visible = true
textSize(30)
fill("white")
text("press Space to restart",100,550)
}
drawSprites()
textSize(20) 
 text("Score: "+score, 50,50) 
 if(coinsGroup.isTouching(robot)){
   score++
   coinsGroup.destroyEach()
 }
 textSize(20)
 text(": " +lives, 730,50)
 if(keyDown("space")){
  gamestate = "play"
  reset()
}
}

function spawnObstacles(){
if(frameCount % 200 === 0){
  obstacle = createSprite(750,425,100,100)
obstacle.velocityX = -2
obstacle.scale = 0.3
var rand = Math.round(random(1,3)) ;
switch(rand){
  case 1 : obstacle.addImage(rock1Img) ; 
  break ;
  case 2 : obstacle.addImage(rock2Img);
  break ;
  case 3 : obstacle.addImage(rock3Img);
  break ;
} 
obstaclesGroup.add(obstacle)
} 
}


function spawnCoins(){
  if(frameCount % 300 === 0){
    coin = createSprite(Math.round(random(200,400)), Math.round(random(50,100)), 50,50)
    coin.velocityX = -2
coin.addImage(coinsImg)
coin.scale = 0.1
coinsGroup.add(coin)
  }
}

function spawnHearts(){
  if(frameCount % 600 === 0){
    heart = createSprite(600,200,100,100)
    heart.velocityX = -5
    heart.addImage(heartImg)
    heart.scale = 0.1 
    HeartsGroup.add(heart)
  }
}

function reset(){
  gameover.visible = false 
  lives = 3
  score = 0
}
var monkey, monkey_running, ground, score;
var banana, bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivaltime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {

  createCanvas(400, 400)

  monkey = createSprite(80, 315, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  foodGroup = createGroup();
  obstacleGroup = createGroup();

  score = 0;
}


function draw() {
  background(255);

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (keyDown("space") && monkey.y > 313) {
    monkey.velocityY = -18;
  }
  monkey.velocityY = monkey.velocityY + 0.6;
  monkey.collide(ground);

  stroke("white");
  textSize(20);
  fill("white");
  text("score :" + score, 300, 50);

  stroke("black");
  textSize(20);
  fill("black");
  survivaltime = Math.ceil(frameCount / frameRate())
  text("survival time :" + survivaltime, 100, 50)


  if (foodGroup.isTouching(monkey)) {
    score = score + 1;
    foodGroup.destroyEach();
  }

  obstacles();
  food();
  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, Math.round(random(120, 200)), 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 100;
    foodGroup.add(banana);
  }
}

function obstacles() {

  if (frameCount % 300 === 0) {
    obstacle = createSprite(400, 330, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }

}
    //Global Variables
    var PLAY = 1;
    var END = 0;
    var gameState = PLAY;
    var wall;
    var  monkey;
    var player_running;
    var bananaImage, banana, bananaGroup;
    var back, backImage;
    var jungle, jungleImage;
    var score = 0;
    var invisible;
    var stone, stoneImage;
    var gameOver, restart;
    var player_collided;
    
    function preload(){
      
      bananaImage = loadImage("Banana.png");
    jungleImage = loadImage ("jungle.jpg");
    stoneImage = loadImage ("stone.png");
    player_running = loadAnimation("Monkey_01.png" ,"Monkey_02.png", "Monkey_03.png" , "Monkey_04.png" ,  "Monkey_05.png" , "Monkey_06.png" , "Monkey_07.png" ,    "Monkey_08.png" , "Monkey_09.png" , "Monkey_10.png" );
      
    gameOverImg = loadImage ("gameOver.png");
    restartImg = loadImage ("gameOver.png");
    player_collided = loadAnimation ("Monkey_01.png");
    }


    function setup() {
    createCanvas(600,500);
  
    back = createSprite(200,220,500,500);
    back.addImage(jungleImage);
    back.scale = 0.7

    monkey = createSprite (100,350,600,500);
    monkey.addAnimation ("running",player_running);
    monkey.addAnimation("collided", player_collided);
    monkey.scale = 0.1;
    
    invisible = createSprite (350,400,1000000,20);
    invisible.scale = 0.1;
    invisible.visible = false;

    bananaGroup = new Group ();
    stoneGroup = new Group ();
  
    console.log(monkey.y);
    score = 0;
    }


    function draw(){
    background(0);

     camera.position.x = monkey.x;


    if(back.x<camera.position.x-50){
      back.x = camera.position.x
    }

    if(invisible.x<0){
      invisible.x = 200;
    }
    if (gameState === PLAY)
    {
    if(keyDown("space")&& monkey.y >= 350){
    monkey.velocityY = -15;
    monkey.velocityX = 2;
    }
      
     banana1 ();
     Stone();

     if(keyDown(RIGHT_ARROW)){
       monkey.x = monkey.x+10;
       back.velocityX = -1
     }
     
     if(keyWentUp(RIGHT_ARROW)){
       back.velocityX = 0
       monkey.velocityX = 0;
     }
     console.log(back.x)  

     if(back.x<100){
       back.x = 20;
     }
      if (monkey.isTouching(bananaGroup)){
    
      bananaGroup.destroyEach();
      score = score + 1;  
   
      
      
    switch(score) {
      case 10: monkey.scale = 0.12;
              break;
      case 20: monkey.scale = 0.14;
              break;
      case 30: monkey.scale = 0.16;
              break;
      case 40: monkey.scale = 0.18;
              break;
     case 50: monkey.scale = 0.21;
              break;
      default: break;
    }
      }
      
       
    monkey.velocityY = monkey.velocityY +1;
    monkey.collide (invisible);

    
    }
     
   if(stoneGroup.isTouching(monkey)){
     gameState = END;
    }
   if (gameState === END)
    {
   textSize(30);
   fill(255);
   stroke("yellow");
   text("Game Over",camera.position.x-50,200);
   text("Reload Your Page To Restart the game",camera.position.x-250,250);

    monkey.changeAnimation("collided", player_collided); 
  back.visible = false;

      monkey.visible = false;
      
    }    
    drawSprites ();
    
    stroke("white");
    textSize (40);
    fill ("white")  
    text ("Score : " + score , monkey.x,50);

    }

    function banana1 (){
    if (frameCount % 100 === 0){
    banana = createSprite (monkey.x+200,250,600,500);
    banana.addImage (bananaImage);
    banana.scale = 0.1;
   // banana.velocityX = -5;
    banana.lifetime = 1000;
      bananaGroup.add(banana);
    
    }
    }

    function Stone(){
      if(frameCount % 150 === 0){
        stone = createSprite(monkey.x+200,420);
        stone.addImage(stoneImage);
        stone.scale = 0.1;
        stone.lifetime = 1000;
        stoneGroup.add(stone);
      }
    }

    
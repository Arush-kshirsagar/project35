//Create variables here
var dog,happyDog,database,foodS,foodStock,addFood,fedTime,lastFed,foodObj,feed;

function preload()
{
  //load images here
  happyDog=loadImage("dogImg1.png");
  dogimg=loadImage("dogImg.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  
  dog=createSprite(350,350,50,50);
  dog.addImage(dogimg);
  dog.scale=0.15;

  foodObj=new Food()
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


  feed=createButton("Feed the Dog");
  feed.position(650,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(750,95);
  addFood.mousePressed(addFoods);

  

  
  
}


function draw() {  
background(46,139,87);
  foodObj.display();
  
 fedTime=database.ref('FeedTime')
 fedTime.on("value",function(data){
   lastFed=data.val();
 })
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed:"+lastFed%12+"PM",350,30);

  }
  else if(lastFed===0){
    text("Last Feed: 12 AM",350,30);
  }
  else{
    text("Last Feed:"+lastFed+"AM",350,30);
  }
// dog.display();
drawSprites();
textSize(20);
fill("blue");
text("Press up arrow To Feed the dog milk",100,100);
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{foodObj.updateFoodStock(foodObj.getFoodStock()-1);}
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  

}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}
var moods = ["images/sadlebron.jpg", "images/angrylebron.jpg", "images/cryinglebron.jpg", "images/hungrylebron.png", "images/happylebron.jpg", "images/savagelebron.png"];
var nicknames = ["Sad LeBron", "Angry LeBron", "Crying Lebron", "Hungry LeBron", "Happy LeBron", "Savage LeBron"];

//array of strings for feed()
var foodFeedback = ["Lebron is happy that he is being fed.", "Feed the King!", "LeBron loves to eat."];
var full = ["The King is no longer hungry.", "Stop feeding the King.", "The King doesn't need to eat."];
var i = 0; //iterator to parse through foodFeedback [], between 0-2
var index = 3; //index used to iterate through full [] between 3-4

//variable to keep track of hungriness, health, and happiness levels
var moodMeter, happiness, health, hungriness;
moodMeter = happiness = health = hungriness = 100;


var thoughts, image, title, happyLevel, hungryLevel, healthLevel;
var praiseIndex = 4; //index used to iterate for praise()
var random = 0;

/*
 * Petting LeBron will always generate a negative response
 * Will decrease happiness, and hungriness
 * Health will decrease if either happiness or hungriness levels <= 50
*/
function pet (){
    thoughts = document.getElementById("lebronmood");
    image = document.getElementById("image");
    title = document.getElementById("header");
    happyLevel = document.getElementById("printHappy");

    negativePet = ["LeBron does not enjoy being pet.", "The King is not a pet.", "The King feels disrespected."];
    random = Math.floor(Math.random() * 3);

    if (happiness <= 100){
        happiness -= 10; //decreases happiness by 10

        if (happiness <= 50){
            happyLevel.style = "color:red"; 
            alert("LeBron is not happy. Stop petting him.") //changes happiness display to red
            decreaseHealth();
        }
        decreaseHungriness();
    } 
    //prints output 
    thoughts.innerHTML = negativePet[random]; //changes textbox "Thought"
    image.src = moods[random]; //changes image between indexes 0-3
    title.innerHTML = nicknames[random]; //changes nicknames between indexes 0-3
    happyLevel.innerHTML = happiness; //updates happiness value
} 
function decreaseHungriness (){
    hungryLevel = document.getElementById("printHungry");
    hungriness -= 5; //decreases hungriness
    hungryLevel.innerHTML = hungriness; 

    if (hungriness <= 50){
        decreaseHealth();
        alert("LeBron is hungry. Feed him!"); //alerts user
        document.getElementById("printHungry").style = "color:red"; //changes font to red
    }
}
function decreaseHealth(){
    healthLevel = document.getElementById("printHealth");
    health -= 10;
    if(health <= 50){healthLevel.style = "color:red";}
    healthLevel.innerHTML = health;
}

/*
 * Feeding LeBron will always generate a positive response unless hungryLevel = 100
 * When hungryLevel = 100, happiness and health will decrease
 * When hungryLevel != 100, happiness and health will increase
*/
function feed(){
    title = document.getElementById("header");
    thoughts = document.getElementById("lebronmood");
    image = document.getElementById("image");
    hungryLevel = document.getElementById("printHungry");

    if (hungriness <= 100){
        if (hungriness >= 90){
            hungriness = 100;
        }
        hungriness += 10;
        if (happiness < 100){
            increaseHappiness();
        }
    }


}

function increaseHappiness(){
    happyLevel = document.getElementById("printHappy");
    happiness += 10; 

    if (happy > 50){happyLevel.style = "color:black";}
    happyLevel.innerHTML = happiness;
    console.log(happiness);
}

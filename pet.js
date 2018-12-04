var moods = ["images/sadlebron.jpg", "images/angrylebron.jpg", "images/cryinglebron.jpg", "images/hungrylebron.png", "images/happylebron.jpg", "images/savagelebron.png"];
var nicknames = ["Sad LeBron", "Angry LeBron", "Crying Lebron", "Hungry LeBron", "Happy LeBron", "Savage LeBron"];

//array of strings for feed()
var foodFeedback = ["Lebron is happy that he is being fed.", "Feed the King!", "LeBron loves to eat."];
var full = ["The King is not hungry.", "Stop feeding the King.", "The King doesn't need to eat."];
var i = 0; //iterator to parse through foodFeedback [], between 0-2
var index = 3; //index used to iterate through full [] between 3-4

//string arrays for praise()
var praisePhrase = ["Praise the King!", "The King loves the attention!", "Respect the G.O.A.T!"];
var praiseIndex = 4;

//string array for yell()
var yellMoods = ["images/sadlebron.jpg", "images/sadjames2.jpg", "images/angrylebron.jpg"];
var yellResponse = ["Stop disrespecting the King.", "You're hurting the King's confidence.", "The King does not take critcism lightly."];
var yellIndex = 0; 

//variable to keep track of hungriness, health, and happiness levels
var moodMeterStyle, happiness, health, hungriness, valueMeter;
moodMeter = happiness = health = hungriness = 100;

var thoughts, image, title, happyLevel, hungryLevel, healthLevel,timer;
var praiseIndex = 4; //index used to iterate for praise()
var random = 0;

/*
 * Petting LeBron will always generate a negative response
 * Will decrease happiness, and hungriness
 * Health will decrease if either happiness or hungriness levels <= 50
*/
function pet (){
    window.clearInterval(timer);

    thoughts = document.getElementById("lebronmood");
    image = document.getElementById("image");
    title = document.getElementById("header");
    happyLevel = document.getElementById("printHappy");

    negativePet = ["LeBron does not enjoy being pet.", "The King is not a pet.", "The King feels disrespected."];
    random = Math.floor(Math.random() * 3);

    if (happiness <= 100 && happiness >= 10){
        happiness -= 10;
        if (happiness <= 50){
            happyLevel.style = "color:red"; 
            decreaseHealth();
        } 
    } 
    //prints output 
    thoughts.innerHTML = negativePet[random]; //changes textbox "Thought"
    image.src = moods[random]; //changes image between indexes 0-3
    title.innerHTML = nicknames[random]; //changes nicknames between indexes 0-3
    happyLevel.innerHTML = happiness; //updates happiness value

    runTimer();
    computeMood();
} 

/*
 * Feeding LeBron will always generate a positive response unless hungryLevel = 100
 * When hungryLevel = 100, happiness and health will decrease
 * When hungryLevel != 100, happiness and health will increase
*/
function feed(){
    window.clearInterval(timer);
    title = document.getElementById("header");
    thoughts = document.getElementById("lebronmood");
    image = document.getElementById("image");
    hungryLevel = document.getElementById("printHungry");

    if(index > 4 || i > 2){i = 0; index = 3;} //resets iterator 
    if (hungriness == 100){
        title.innerHTML = nicknames[1];
        image.src = moods[1];
        thoughts.innerHTML = full[Math.floor(Math.random() * full.length)];
        decreaseHappiness();
    } else if (hungriness < 100 && hungriness >= 0){
        if (hungriness >= 90){
            hungriness = 100; 
            hungryLevel.innerHTML = hungriness;

            //output to user
            title.innerHTML = nicknames[4];
            image.src = moods[4];
            thoughts.innerHTML = "The King is full."
        } else {
            hungriness += 10; 
            hungryLevel.innerHTML = hungriness;

            //change image
            title.innerHTML = nicknames[index];
            image.src = moods[index];
            thoughts.innerHTML = foodFeedback[i];
            if(hungriness > 50){hungryLevel.style = "color: black";}

            increaseHealth();
            increaseHappiness();
        }
    }
    index+=1;
    i+=1;
    runTimer();
    computeMood();
}
/* 
 * Praising LeBron will always generate a positive response, max happinessLevel = 100
 */
function praise(){
    window.clearInterval(timer);
    title = document.getElementById("header");
    thoughts = document.getElementById("lebronmood");
    image = document.getElementById("image");
    happyLevel = document.getElementById("printHappy");

    if (praiseIndex > 5){praiseIndex = 4; }
    if (happiness < 100){
        if (happiness >= 90){
            happiness = 100;
            happyLevel.innerHTML = happiness;
        } else if (happiness < 50){
            happiness += 10;
            happyLevel.style = "color: red";
        }
        else { 
            happiness += 10;
            happyLevel.style = "color: black";
        }
        increaseHealth();
    }
    title.innerHTML = nicknames[praiseIndex];
    image.src = moods[praiseIndex];
    thoughts.innerHTML = praisePhrase [Math.floor(Math.random() * praisePhrase.length)];
    happyLevel.innerHTML = happiness;

    praiseIndex += 1;
    runTimer();
    computeMood();
}

/*
 * Yelling at LeBron will always generate a negative response
 */
function yell (){
    window.clearInterval(timer);
    thoughts = document.getElementById("lebronmood");
    image = document.getElementById("image");
    title = document.getElementById("header");
    happyLevel = document.getElementById("printHappy");
    random = Math.floor(Math.random() * 2);

    if(yellIndex > 2){yellIndex = 0;}
    if (happiness <= 100){
        if (happiness >= 10){
            happiness -= 10;
        }
        
        if (happiness <= 50){
            happyLevel.style = "color:red"; 
            decreaseHealth();
        } 
        thoughts.innerHTML = yellResponse[yellIndex];
        image.src = yellMoods[yellIndex];
        title.innerHTML = nicknames[random];
        happyLevel.innerHTML = happiness;
    }
    yellIndex += 1;
    runTimer();
    computeMood();
}


timer = window.setInterval(() => {
decreaseHungriness();
}, 2000);


/* 
 * Function that rereuns timer after button is clicked 
*/
function runTimer (){
    timer = window.setInterval(() => {
        decreaseHungriness();
    }, 3000);
}

/*
 * Function called when user inactive 
 * Decreases hungryLevel by 10
 * Health level will decrease when hungryLevel <= 50
 * Happiness level decreases when hungryLevel <= 75
 */
function decreaseHungriness (){
    if (hungriness >= 5){
    hungriness -= 5; //decreases hungriness
    document.getElementById("printHungry").innerHTML = hungriness; 

    if (hungriness <= 75 && hungriness > 50){
        decreaseHappiness();
        document.getElementById("lebronmood").innerHTML = "LeBron is getting hungry...";
        document.getElementById("image").src = moods[2];
        document.getElementById("header").innerHTML = nicknames[2];
    
    }
    if (hungriness <= 50){
        random = Math.floor(Math.random() * 3);
        document.getElementById("printHungry").style = "color:red"; //changes font to red

        decreaseHealth();
        decreaseHappiness();
        document.getElementById("header").innerHTML = nicknames[random];
        document.getElementById("image").src = moods[random];
        document.getElementById("lebronmood").innerHTML = "The King is hungry!";
    }
    computeMood();
    }
}

/* 
 * Function implemented when hungriness or happiness level less than 50
 */
function decreaseHealth (){
    healthLevel = document.getElementById("printHealth");
    
    if(health >= 10){health -=10;}

    healthLevel.innerHTML = health;
    if(health <= 50){healthLevel.style = "color:red";}
}

/* 
 * Function implemented when hungryLevel < 75
 */
 
function decreaseHappiness(){
    happyLevel = document.getElementById("printHappy");

    if(happiness >= 10){happiness -=10;}
    
    happyLevel.innerHTML = happiness;
    if(happiness <= 50){happyLevel.style = "color:red";}
}


/* 
 * Function implemented to increase health when feed button pressed, or when praise button pressed
 *
 */
function increaseHealth(){
    healthLevel = document.getElementById("printHealth");
    
    if(health < 100){health += 10;}

    healthLevel.innerHTML = health;
    if(health > 50){healthLevel.style = "color: black";}
}

/* 
 * Function implemented to increase happiness when feed button is pressed
 *
*/
function increaseHappiness(){
    happyLevel = document.getElementById("printHappy");
    if (happiness < 100){
        if (happiness >= 90){
            happiness = 100; 
        } else {
            happiness += 10;
        }
    }
    happyLevel.innerHTML = happiness;
    if (happiness > 50){happyLevel.style = "color:black";}
}
function computeMood (){
    valueMeter = (happiness + hungriness + health)/3;
    moodMeterStyle = "width: " + valueMeter + "%;";

    moodMeter = document.getElementById("moodmeter");
    moodMeter.style = moodMeterStyle;
    moodMeter.setAttribute("aria-valuenow", valueMeter);

    if(valueMeter <= 50){moodMeter.style = moodMeterStyle + "background-color: #D9534F;"}
}

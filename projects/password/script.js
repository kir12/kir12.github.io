/*
Password Generator Project
Brian Lee, Computer Science Projects (Period 3)
MAIN COMMENTS
-Main method: user directly enters guesses into program by way of input from form
-Triggers function that records guess, which triggers another function that checks it
-"Loop" triggered each time user enters value, which triggers seccondary check function. Certain values are carried over each time user checks function (e.g. number of tries)
PROBLEMS
-Imense difficulty integrating Loop requirement efficiently into program.
-Initially had immense difficulties managing handling the HTML form, successfully managed to get Javscrpt to handle form without learning additional programming languages.
THINGS TO LEARN IN FUTURE
-Handle program even better.
*/


//VARIABLE DECLARATIONS

var tries = 0; //variable that tracks the amount of guesses the user enters.
var number = Math.floor(10000*Math.random()); //variable that calculates the 4 digit random number
if (number < 1000){
  number = number * 10;
}
/*
Math.random() randomly calculates decimal number. Multipled by 10K to get 4 digit number.
Math.floor() rounds off to get the final result.
*/

//calculates number parameters that will display in hint.
hint1minus = number - 50;
hint1plus = number + 50;
hint2minus = number - 25;
hint2plus = number + 25;
hint3minus = number - 10;
hint3plus = number + 10;


//concatonates hints that will print if user gets guesses wrong. Exploits fact that this kind of concationation outputs a string.
var hint1 = "The number is between " + hint1minus + " and " + hint1plus;
var hint2 = "The number is between " + hint2minus + " and " + hint2plus;
var hint3 = "The number is between " + hint3minus + " and " + hint3plus;

//FUNCTIONS

/*
userInput() OVERALL COMMENTS
-activated when the user submits form (either by pressing button "submit" or pressing Enter on the key.
- tests to see if a) user entered value, b) right length.
-triggers next function, trial() with inputted parameters.
*/
function userInput(form) { //activating line
  var input = form.usertext.value; //takes in inputed text, when function is alculated.
  //tests to see if guess fits proper parameters. Exploits || 'or' operator to fit multiple conditoinals (see top comments for specific conditionals).
  if (input === "" || input.length < 4 || input.length > 4){
    window.alert("Please enter a valid password."); //tells user to enter proper password then terminates function, watiing for user to enter new guess.
  }
  else{ //if user inputs proper function
    trial(input,number);
    //sends off to next function
  }
};

/*
trial(input,number) OVERALL COMMENTS
runs comparisons that compare guess to actual number.
If case runs, then game tells user s/he won, prints number, and activates button to try again/
if case fials, tries gets added 1(remember, earlier it was 0), and hints are added until tries equals 3 (a.k.a. else, then prints out loss notification)
speciific comments are below.
*/
function trial(input,number) { //takes in global paramets input (triggered by first function) and number, a global var)
  while (tries < 5){ //mandatory while loop: basically continues
    if (input == number){ //first conditional if equal
      document.getElementById("winResult").style.display = "block"; //re-enables winning display (see html comments)
      document.getElementById("win").innerHTML = "Great, you win! Here was the winning passcode!"; //tells user s/he has won
      document.getElementById("win2").innerHTML = number; //tells user the number that won
      document.getElementById("button2").disabled = false; //activates second button, which user can use to reset game if s/he wants.
    }
    else{ //if guess was wrong
      if (tries === 0){ //if first guess
        tries+=1;//adds on trial to indicate that user has used up one try.
        document.getElementById("group1").style.display = "block"; //activates first hint group (see html comments)
        document.getElementById("hint1").innerHTML = hint1; //prints out first hint (see VARIABLE DECLARATION comments)
      }
      else if (tries === 1){//if user already did one try
        tries+=1; //adds on trial number, for second try
        document.getElementById("group2").style.display = "block"; //activates second block group (see html comments)
        document.getElementById("hint2").innerHTML = hint2; //prints out second hint (see VARIABLE DECLARATION comments)
      }
      else if (tries === 2){ //if user already did 2 tries
        tries+=1; //adds on trial number for third try
        document.getElementById("group3").style.display = "block"; //activates third block group (see html comments)
        document.getElementById("hint3").innerHTML = hint3; //prints out third hint (see VARIABLE DECLARAITON comments)
      }
      else{
        document.getElementById("loseResult").style.display = "block"; //prints out losing block display(see html comments)
        document.getElementById("lose").innerHTML  = "Sorry, you lost. Here is the correct password:"; //tells user has lost
        document.getElementById("lose2").innerHTML = number; //prints out actual number
        document.getElementById("button2").disabled = false; //activates second function which user can use to reset game if s/he wants
      };
    };
    break;//exits out of loop once the function ends
  };

};

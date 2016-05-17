var rock = function() {
  var userChoice = "rock";
  return userChoice;
};

var scissors = function() {
  var userChoice = "scissors";
  return userChoice;
};

var paper = function() {
  var userChoice = "paper";
  return userChoice;
};

console.log(userChoice);

if (userChoice == "rock") {
  confirm("The user picked rock.");
}

else if (userChoice == "paper") {
  confirm("the user picked paper");
}

else if (userChoice == "scissors"){
  confirm("the user picked paper");
};

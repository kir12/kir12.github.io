//Rewrite entire code using modular programmming
var tries = 0;

var number = [];
for (i = 1; i <= 4; i+=1){
  var subNumber = [Math.floor(10*Math.random())];
  number += subNumber;
};
number = [number];
number = Number(number.join());
hint1minus = number - 100;
hint1plus = number + 100;
hint2minus = number - 50;
hint2plus = number + 50;
hint3minus = number - 25;
hint3plus = number + 25;
var hint1 = "The number is between " + hint1minus + " and " + hint1plus;
var hint2 = "The number is between " + hint2minus + " and " + hint2plus;
var hint3 = "The number is between " + hint3minus + " and " + hint3plus;
function userInput(form) {
  var input = form.usertext.value;
  if (input === ""){
    window.alert("Please enter an input.")
  }
  else{
    trial(input,number);
  }

};

function trial(input,number) {
  if (input === number){
    document.getElementById("win").innerHTML = "Great! you Win!";
    document.getElementById("button2").disabled = "false";
  }
  else{
    if (tries === 0){
      tries+=1;
      document.getElementById("group1").style.display = "block";
      document.getElementById("hint1").innerHTML = hint1;
    }
    else if (tries === 1){
      tries+=1;
      document.getElementById("group2").style.display = "block";
      document.getElementById("hint2").innerHTML = hint2;
    }
    else if (tries === 2){
      tries+=1;
      document.getElementById("group3").style.display = "block";
      document.getElementById("hint3").innerHTML = hint3;
    }
    else{
      document.getElementById("group4").style.display = "block";
      document.getElementById("lose").innerHTML  = "You lost. Password:"
      document.getElementById("lose2").innerHTML = number;
      document.getElementById("button2").disabled = false;
    };
  };
};

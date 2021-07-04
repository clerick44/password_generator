// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//Generate Password
function generatePassword() {
  let passLength = passwordLen();
  //builds password parameters by prompting user
  let allowUpper = yesNoDialog("Allow Uppercase Letters?");
  let allowLower = yesNoDialog("Allow Lowercase Letters?");
  let allowSpecChars = yesNoDialog("Allow Special Characters?");
  let allowNumbers = yesNoDialog("Allow Numbers?");
  //assembles parameters into array
  let passConditions = [
    passLength,
    allowUpper,
    allowLower,
    allowSpecChars,
    allowNumbers,
  ];
  //prompts user to verify settings and starts over if needed
  let confirmPromptString = promptBuild(passConditions);
  if (yesNoDialog(confirmPromptString) === false) {
    generatePassword();
  }
  //makes sure that there is at least one valid parameter chosen
  checkPassConditions(passConditions);
  //calls final password assembler
  var password = passwordBuilder(passConditions);
  return password;
}

//prompts for and validates password length
function passwordLen() {
  let response = prompt("Choose Password length", "Input number from 8 to 128");
  //forces stop when cancel is pressed
  if (response === null) {
    fail;
  }
  //checks if input is a whole number
  if (response - Math.floor(response) !== 0) {
    errorMessage("Must be a Whole Number from 8 to 128");
    passwordLen();
  }
  //checks that input is a number from 8-128
  if (8 > response || response > 128 || isNaN(response)) {
    errorMessage("Must be a number from 8 to 128");
    passwordLen();
  }
  return;
}

//prompts for yes/no response and validates
function yesNoDialog(promptString) {
  let response = prompt(promptString, "Yes or No");
  if (response.toLowerCase() === "yes") {
    return true;
  }
  if (response.toLowerCase() === "no") {
    return false;
  }
  errorMessage("Answer Yes or No");
  yesNoDialog(promptString);
}

//builds dialong string for final confirmation dialog
function promptBuild(passConditions) {
  lineBreak = "\r\n";
  let promptString = "Are the choices below correct?";
  promptString += lineBreak;
  promptString += lineBreak;
  promptString +=
    "Password Length...............  " + passConditions[0] + lineBreak;
  promptString +=
    "Allow Uppercase letters....  " + passConditions[1] + lineBreak;
  promptString +=
    "Allow Lowercase Letters....  " + passConditions[2] + lineBreak;
  promptString +=
    "Allow Special Characters...  " + passConditions[3] + lineBreak;
  promptString += "Allow Numbers....................  " + passConditions[4];
  return promptString;
}

//validates that at least one character type was chosen
function checkPassConditions(passConditions) {
  for (var i = 1; i < passConditions.length; i++) {
    if (passConditions[i] === true) {
      return;
    }
  }
  if (i === passConditions.length) {
    errorMessage("No conditions were selected. Please try again.");
    generatePassword();
  }
}

//builds password
function passwordBuilder(passConditions) {
  var password = "";
  //array of all possible characters
  const charOptions = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "~`!@#$%^&*()_-+={[}]|:;\"'<,>.?/",
    "0123456789",
  ];
  for (let i = 0; i < passConditions[0]; ) {
    //selcts random index and checks if true
    let arrayIndex = Math.floor(Math.random() * 4) + 1;
    if (passConditions[arrayIndex] === true) {
      //Decrements index number to align with charOptions
      arrayIndex--;
      //pulls string from array into single variable
      let charChoices = charOptions[arrayIndex];
      //Randomly chooses character from string
      let newChar = charChoices[Math.floor(Math.random() * charChoices.length)];
      //Appends new character to password string
      password = password += newChar;
      i++;
    }
  }
  return password;
}
// generates error message
function errorMessage(errorString) {
  alert(errorString);
}

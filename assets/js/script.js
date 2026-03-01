// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");
    //that returns all the buttons as an array
    
    for (let button of buttons) {
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "submit"){
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    //To be able to submit answer by clicking Enter
    document.getElementById("answer-box").addEventListener("keydown", function(event){
        if (event.key === "Enter"){
            checkAnswer();
        }
    })

    runGame("addition");

})

/**  
 * The main game loop, called when the script is first loaded
 * and the user's answer has been processed
*/

function runGame(gameType) {

    document.getElementById("answer-box").value = ""; // makes sure the input box is empty for the new answer
    document.getElementById("answer-box").focus(); //the cursor is in the input field

    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply"){
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract"){
        displaySubtractQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value); //because it's an input element we need to get the value, we can't use innerText for this   
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect){
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awww........ you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom and returns the correct answer
 */
function calculateCorrectAnswer() {
    // when we get data from the dom it's a string, we need to convert it to a number
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x"){
        return [operand1*operand2, "multiply"];
    } else if (operator === "-"){
        return [operand1-operand2, "subtract"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`
    }


/**
 * Gets the current score from the dom and increments it by 1
 */

function incrementScore() {

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}


/**
 * Gets the current tally of incorrect answers from the dom and increments it by 1
 */
function incrementWrongAnswer() {

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}


function displayMultiplyQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x"; 

}
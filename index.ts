import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

let randomNumber = Math.floor(Math.random() * 10 + 1);
let actualAnswer = randomNumber;
let numTries = 3;
let play = true;
let Welcome = async () => {
  const rainbowTitle = chalkAnimation.rainbow("Let's play the Number Guessing game:");

  await sleep();
  console.log(
    gradient.passion(`
  _____________________________________________________
  |                                                   |
  |                                                   |
  |               _____________________               |
  |               |                   |               |
  |               |  NUMBER GUESSING  |               |
  |               |       GAME        |               |
  |               |___________________|               |
  |                                                   |
  |          GUESS THE NUMBER BETWEEN 1 TO 10         |
  |                                                   |
  |                   -------------                   |
  |                   |   GUESS   |                   |
  |                   -------------                   |
  |                   | 1 | 2 | 3 |                   |
  |                   -------------                   |
  |                   | 4 | 5 | 6 |                   |
  |                   -------------                   |
  |                   | 7 | 8 | 9 |                   |
  |                   -------------                   |
  |                   ||||  10  |||                   |
  |                   -------------                   |
  |___________________________________________________|
  `)
  );

  console.log(chalk.blue("Guess the number between 1 to 10:\n"));
};

Welcome();

while (play) {
  while (numTries > -1) {
    const answer = await inquirer.prompt([
      {
        name: "YourGuess",
        message: "",
        type: "number",
      },
    ]);

    if (answer.YourGuess === actualAnswer) {
      console.log(chalk.green("Hurray! Your guess is correct. Game ends"));
      numTries = 0;
    } else {
      console.log(chalk.red("Your guess is incorrect."));
      console.log(`You have ${numTries} ${numTries > 1 ? "tries" : "try"} left.`);

      if (actualAnswer > answer.YourGuess) {
        console.log(chalk.yellow("Think Higher"));
      } else {
        console.log(chalk.yellow("Think Lower"));
      }
    }

    numTries--;
  }

  const playAgainAnswer = await inquirer.prompt([
    {
      name: "playAgain",
      message: "Do you wanna play again?",
      type: "confirm",
    },
  ]);
  if (playAgainAnswer.playAgain) {
    numTries = 3;
    randomNumber = Math.floor(Math.random() * 10 + 1);
    actualAnswer = randomNumber;
  } else {
    console.log(chalk.bgHex('#333').white("Exiting game..."));
    play = false;
  }
}

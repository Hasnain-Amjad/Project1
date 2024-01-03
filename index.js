import inquirer from "inquirer";
import chalk from "chalk";
//import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
let Welcome = async () => {
    await sleep();
    console.log(gradient.passion(`
  _________________________________________________________
  |                                                       |
  |                                                       |
  |                   _____________________               |
  |                   |                   |               |
  |                   |        ATM        |               |
  |                   |___________________|               |
  |                                                       |
  |                    --------------------               |
  |                   /   ----------     /|               |
  |                  /   / #  #  # /    / |               |
  |                 /   / #  #  # /    /  |               |
  |                /   / #  #  # /    /   |               |
  |               /    ---------     /    |               |
  |               |-----------------|     |               |
  |               |                 |     |               |
  |               |                 |     |               |
  |               |  -------------  |     |               |
  |               |  |ATM Machine|  |     |               |
  |               |  -------------  |     |               |
  |               |                 |     |               |
  |               |_________________|_____|               |
  |_______________________________________________________|
  `));
    console.log(chalk.blue("PIN: 1234"));
    console.log(chalk.blue("Account Status: Dummy Account"));
    console.log(chalk.blue("Card Inserted: Yes\n"));
};
Welcome();
class Account {
    balance;
    constructor(initialBalance) {
        this.balance = initialBalance;
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            return true;
        }
        return false;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }
    getBalance() {
        return this.balance;
    }
}
class ATM {
    account;
    constructor(account) {
        this.account = account;
    }
    withdraw(amount) {
        return this.account.withdraw(amount);
    }
    deposit(amount) {
        this.account.deposit(amount);
    }
    checkBalance() {
        return this.account.getBalance();
    }
}
async function getPIN() {
    const pinInput = await inquirer.prompt([
        {
            type: 'password',
            name: 'pin',
            message: 'Enter your PIN:',
            mask: '*',
            validate: (input) => /^\d{4}$/.test(input),
        },
    ]);
    return pinInput.pin;
}
async function main() {
    console.clear();
    console.log(chalk.bgBlueBright.white.bold('Welcome to the Interactive ATM Simulation'));
    const pin = await getPIN();
    // Validate the PIN (For simplicity, using a fixed PIN)
    if (pin !== '1234') {
        console.log(chalk.bgRed.white.bold('Incorrect PIN. Exiting.'));
        process.exit(1);
    }
    console.log(chalk.bgGreen.white.bold('PIN Verified. Access Granted.'));
    const userAccount = new Account(1000);
    const atm = new ATM(userAccount);
    while (true) {
        const action = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['Check Balance', 'Deposit', 'Withdraw', 'Exit'],
            },
        ]);
        switch (action.action) {
            case 'Check Balance':
                console.log(chalk.bgCyan.white('Balance:', atm.checkBalance()));
                break;
            case 'Deposit':
                const depositAmount = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'amount',
                        message: 'Enter deposit amount:',
                        validate: (input) => !isNaN(input) && parseFloat(input) > 0,
                    },
                ]);
                atm.deposit(parseFloat(depositAmount.amount));
                console.log(chalk.bgGreen.white('Deposit successful. New balance:', atm.checkBalance()));
                break;
            case 'Withdraw':
                const withdrawAmount = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'amount',
                        message: 'Enter withdrawal amount:',
                        validate: (input) => !isNaN(input) && parseFloat(input) > 0,
                    },
                ]);
                const withdrawalResult = atm.withdraw(parseFloat(withdrawAmount.amount));
                if (withdrawalResult) {
                    console.log(chalk.bgGreen.white('Withdrawal successful. New balance:', atm.checkBalance()));
                }
                else {
                    console.log(chalk.bgRed.white('Insufficient funds'));
                }
                break;
            case 'Exit':
                console.log(chalk.bgYellow.black('Exiting ATM. Goodbye!'));
                process.exit(0);
            default:
                console.log(chalk.bgRed.white('Invalid action.'));
        }
    }
}
// Run the main function
main();

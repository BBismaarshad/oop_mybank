import inquirer from "inquirer";
//interface
interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  ckeckBalance(): void;
}
//class
class BankAccount implements BankAccount {
  accountNumber: number;
  balance: number;

  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }
  //Debit amount
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        `withdrawal of $ ${amount} succressful: Remainig balance: $ ${this.balance}`
      );
    } else {
      console.log("Insufficient balance.");
    }
  }
  //Credit amount
  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1;
    }
    this.balance += amount;
    console.log(
      `Deposit of amount $ ${amount} successful: Remaining balance:$ ${this.balance}`
    );
  }
  //Check balance
  checkBalance(): void {
    console.log(`Current balance: $ ${this.balance}`);
  }
}
//customer class
class customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  moblieNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    moblicNumber: number,
    account: BankAccount
  ) {
    (this.firstName = firstName),
      (this.lastName = lastName),
      (this.gender = gender);
    this.age = age;
    this.moblieNumber = moblicNumber;
    this.account = account;
  }
}

//Create bank accounts
const accounts: BankAccount[] = [
  new BankAccount(1212, 500),
  new BankAccount(1213, 1500),
  new BankAccount(1214, 2000),
];
// Create customers
const customers: customer[] = [
  new customer("Bisma", "Arshad", "female", 19, 3123123123, accounts[0]),
  new customer("Rohma", "Fatima", "female", 20, 31212121212, accounts[1]),
  new customer("Faiza", "Laiba", "female", 18, 3221221221, accounts[2]),
];

//function to interact with bank account:

async function service() {
  do {
    const accountNumberInput = await inquirer.prompt(
      {
        type: "number",
        name: "accountNumber",
        message: "Enter your account number:",
      }
    );
    const customer = customers.find(
      (customer) =>
        customer.account.accountNumber === accountNumberInput.accountNumber
    );
    if (customer) {
      console.log(`Welcome,${customer.firstName} ${customer.lastName}`);
      const answer = await inquirer.prompt(
        {
          type: "list",
          name: "select",
          message: "sele an operation",
          choices: ["Despostit", "Withdraw", "Check Balance", "Exit"],
        },
      );

      switch (answer.select) {
        case "Despostit":
          const depositAmount = await inquirer.prompt(
            {
              type: "number",
              name: "amount",
              message: " Enter the amount to deposit",
            },
          );

          customer.account.deposit(depositAmount.amount);
          break;
        case "Withdraw":
          const WithdrawAmount = await inquirer.prompt([
            {
              type: "number",
              name: "amount",
              message: " Enter the amount to Withdraw",
            },
          ]);

          customer.account.withdraw(WithdrawAmount.amount);
          break;
        case "Check Balance":
          customer.account.checkBalance();
          break;
        case "Exit":
          console.log("Exiting bank program.");
          return;
      }
    } else {
      console.log("Invalid account number .please try again..");
    }
  } while (true);
}

service();

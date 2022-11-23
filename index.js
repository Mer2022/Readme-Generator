// Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");
const util = require("util");

// An array of questions are created for user input
// Add different sections to the table of contents in generateMarkdown.js
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is your repository title?",
    //Check if there is a value
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Your repository title can be entered here.");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "description",
    message: "What is your repository description?",
    // Check if there is a value
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Your description for the repository can be entered here.");
        return false;
      }
    },
  },
  //Check if there is an installation process
  {
    type: "confirm",
    name: "confirmInstallation",
    message: "Does it have an installation process?",
  },
  {
    type: "input",
    name: "installation",
    message: "Instructions for the installation process can be displayed.",
    when: ({ confirmInstallation }) => {
      if (confirmInstallation) {
        return true;
      } else {
        return false;
      }
    },
  },

  {
    //check to confirm
    type: "confirm",
    name: "confirmUsage",
    message: "Can you provide steps for application usage?",
  },
  {
    type: "input",
    name: "instructions",
    message: "You can provide steps for application usage.",
    when: ({ confirmUsage }) => {
      if (confirmUsage) {
        return true;
      } else {
        return false;
      }
    },
  },

  {
    type: "confirm",
    name: "confirmContribution",
    message: "Should others contribute to the repository?",
  },

  {
    type: "confirm",
    name: "testConfirm",
    message: "Can this be tested?",
  },
  {
    type: "input",
    name: "testing",
    message: "Provide description on how the application can be tested.",
    when: ({ testConfirm }) => {
      if (testConfirm) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    //checkbox that allows license choice
    type: "checkbox",
    name: "license",
    message: "Choose one license.",
    choices: [
      "Mozilla Public License 2.0",
      "Apache License 2.0",
      "MIT License",
      "Boost Software License 1.0",
    ],
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("A license should be selected.");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "username",
    message: "What is your GitHub username?",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Your GitHub username can be entered here.");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Your Email ID can be entered here.");
        return false;
      }
    },
  },
];

// A function is created to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (error) => {
    if (error) {
      return console.log("An error is identified: " + error);
    }
  });
}

const createReadMe = util.promisify(writeToFile);
// A function is created to initialize app
// async function is created with catch for errors
async function init() {
  try {
    const userResponse = await inquirer.prompt(questions);
    // get markdown template from generateMarkdown.js passing the answers as parameter
    const MarkdownFile = generateMarkdown(userResponse);
    //write the readme file after the markdown is made
    await createReadMe("READMEfile.md", MarkdownFile);
  } catch (error) {
    console.log("An error is identified." + error);
  }
}

// Function call to initialize app
init();

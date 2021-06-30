const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
inquirer.registerPrompt('recursive', require('inquirer-recursive'));
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { createHistogram } = require("perf_hooks");
const { stringify } = require("querystring");
const { inherits } = require("util");

// inquirer recursive to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const promptUser = () => {

    return inquirer.prompt({
        type: 'recursive',
        message: 'Would you like to add a new team member?',
        name: 'employees',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Enter team members name? (Required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please enter their name.');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'id',
                message: 'Enter their Employee ID (Required)',
                validate: idInput => {
                    if (idInput) {
                        return true;
                    } else {
                        console.log('Please enter their Employee ID.');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter their email (Required)',
                validate: emailInput => {
                    if (emailInput) {
                        return true;
                    } else {
                        console.log('Please enter their email.');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'role',
                message: 'Select their role (Required)',
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern"
                ],
                validate: roleInput => {
                    if (roleInput) {
                        return true;
                    } else {
                        console.log('Please select their email.');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is their office number? (Required)',
                when: (answers) => answers.role === 'Manager',
                validate: officeNumberInput => {
                    if (officeNumberInput) {
                    return true;
                    } else {
                    console.log('Please enter their office number.');
                    return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'github',
                message: 'What is their github username? (Required)',
                when: (answers) => answers.role === 'Engineer',
                validate: githubInput => {
                    if (githubInput) {
                    return true;
                    } else {
                    console.log('Please enter their github username.');
                    return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'school',
                message: 'What school do they attend? (Required)',
                when: (answers) => answers.role === 'Intern',
                validate: schoolInput => {
                    if (schoolInput) {
                    return true;
                    } else {
                    console.log('Please enter their school.');
                    return false;
                    }
                }
            }
        ]

    }) 
    // .then(function(answers) {
    //     return answers;
    // });
};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

promptUser()
.then( answers => {
    employees = [];
    employeeObjects = answers.employees

    for (i=0; i<employeeObjects.length; i++) {
        role = answers.employees[i].role

        if (role === "Manager") {
            manager = new Manager(answers.employees[i].name, answers.employees[i].id, answers.employees[i].email, answers.employees[i].officeNumber)
            employees.push(manager)
        } else if (role === "Engineer") {
            engineer = new Engineer(answers.employees[i].name, answers.employees[i].id, answers.employees[i].email, answers.employees[i].github)
            employees.push(engineer)
        } else {
            intern = new Intern(answers.employees[i].name, answers.employees[i].id, answers.employees[i].email, answers.employees[i].school)
            employees.push(intern)
        };
    };
    console.log(employees)
    const html = render(employees)
    
});


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer dependng on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

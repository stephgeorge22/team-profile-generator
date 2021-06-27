const inquirer = require('inquirer');

function Team() {
    this.employee = [];
    this.engineer = [];
    this.intern = [];
    this.manager = [];
}

Team.prototype.initializeTeam = function () {

    // this.manager.push(new Manager('goblin', 'sword'));
    
    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is the managers name?'
        },
        {
            type: 'text',
            name: 'id',
            message: 'What is their employee id?'
        },
        {
            type: 'text',
            name: 'email',
            message: 'What is their email?'
        },
        {
            type: 'text',
            name: 'office',
            message: 'What is their office number?'
        })

        .then(({ name, id, email, office}) => {
            this.manager = new Manager(name, id, email, office);
            manager.push(manager)
        });

        // {
        //     type: 'checkbox',
        //     name: 'option',
        //     message: 'What would you like to do next?',
        //     choices: ['Add Engineer', 'Add Intern', 'Finish building my team']
        // },


}
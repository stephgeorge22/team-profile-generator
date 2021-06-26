const inquirer = require('inquirer');

function Team() {
    this.employee = [];
    this.engineer = [];
    this.intern = [];
    this.manager = [];
}

Team.prototype.initializeTeam = function () {
    
    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })

        .then(({ name }) => {
            this.player = new Player(name);

            this.startNewBattle();
        });
}
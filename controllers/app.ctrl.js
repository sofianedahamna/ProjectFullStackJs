const { resolve } = require('path');
const { randomUUID } = require('crypto');

// DECLARATIONS
const { todos } = require('../db/task.json');

exports.homeCtrl = (req, res) => {
  res.sendFile( resolve('public', 'home.html') );
};

exports.servicesCtrl = (req, res) => {
  // Connexion à la BDD
  // Récupération des livres
  // Vérification de la cnx
  res.end('Services');
};

exports.contactCtrl = (req, res) => res.end('Contact');

    
exports.postTask = (req, res) => {
        const newTodo = req.body;
        console.log(`body`,req.body);
        newTodo.id = randomUUID();
        newTodo.done = false;
        todos.push(newTodo);
        updateJSON();
        res.end();
      };

      
function updateJSON() {
    writeFileSync(
      resolve('db', 'task.json'),
      JSON.stringify({ todos }, null, 2)
    );
  }
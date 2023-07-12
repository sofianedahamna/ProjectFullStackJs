const { resolve } = require('path');
const { randomUUID } = require('crypto');

// DECLARATIONS
const { todos,user } = require('../db/data.json');
const { writeFileSync } = require('fs');

exports.homeCtrl = (req, res) => {
  console.log(`homectrl`);
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
        console.log(`req.body`,req);
        newTodo.id = randomUUID();
        console.log(`body`,newTodo);
        newTodo.done = false;
        todos.push(newTodo);
        updateJSON();
        res.redirect('/home');
      };

      exports.usersCtrl = (req, res) => {
        console.log("appel users ctrl");
        console.log("users :", user);
        //console.log('body :', req.body);
        res.json(user);
      };
      
      exports.tasksCtrl = (req, res) => {
        console.log('tasksCtrl id :', req.params.iduser);
        const filteredTasks = todos.filter(t => t.user == req.params.iduser);
        res.json(filteredTasks);
      }
      exports.update = (req, res) => {
        const todo = todos.find(t => t.id == req.params.id);
        todo.done = req.params.done == 'true';
        updateJSON();
        res.end();
      };
      
      exports.taskCat = (req, res) => {
        console.log("ligne 53 appel task cat");
        console.log("ligne 54 cat :", req.params.prioriCat, req.params.urgentCat);
        
        const filteredCat = todos.reduce((result, t) => {
          if (t.cat === req.params.prioriCat && !result.includes(t.cat)) {
            result.push(t.cat);
          } else if (t.cat === req.params.urgentCat && !result.includes(t.cat)) {
            result.push(t.cat);
          }
          return result;
        }, []);
      
        console.log('ligne 65 tache par cat :', filteredCat);
        res.json(filteredCat);
      };
      
      exports.taskCatByValueAndUser = (req, res) => {
        console.log("appel taskcatByValueAndUser");
        console.log("cat :", req.params.cat);
        console.log("user :", req.params.user);
        
        const filteredTasksByValueAndUser = todos.filter(t => t.cat == req.params.cat.trim() && t.user == req.params.user);
        
        console.log("filteredTasksByValueAndUser", filteredTasksByValueAndUser);
        res.json(filteredTasksByValueAndUser);
      };
      
      
      
      
      
      
      
      
function updateJSON() {
    writeFileSync(
      resolve('db', 'data.json'),
      JSON.stringify({ todos,user }, null, 2)
    );
  }
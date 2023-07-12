document.addEventListener('DOMContentLoaded', () => {
    const userSelection = document.getElementById('userSelection');
    const taskCreation = document.getElementById('taskCreation');
    const todoTasks = document.getElementById('todoTasks');
    const doneTasks = document.getElementById('doneTasks');
  
    let selectedUser = null;
    let users = [];
  
    // Fonction pour afficher les utilisateurs
    function displayUsers() {
      userSelection.innerHTML = `
        <h2>Sélectionner un utilisateur</h2>
        <ul>
          ${users.map(user => `<li>${user.name}</li>`).join('')}
        </ul>
      `;
    }
  
    // Fonction pour afficher les tâches d'un utilisateur
    function displayTasks() {
      if (selectedUser) {
        const todoList = selectedUser.tasks.filter(task => !task.done);
        const doneList = selectedUser.tasks.filter(task => task.done);
  
        todoTasks.innerHTML = `
          ${todoList.map(task => `<li>${task.name}</li>`).join('')}
        `;
  
        doneTasks.innerHTML = `
          ${doneList.map(task => `<li>${task.name}</li>`).join('')}
        `;
      } else {
        todoTasks.innerHTML = '';
        doneTasks.innerHTML = '';
      }
    }
  
    // Fonction pour créer une tâche
    function createTask(taskName) {
      if (selectedUser) {
        const task = {
          name: taskName,
          done: false
        };
  
        selectedUser.tasks.push(task);
        displayTasks();
      }
    }
  
    // Fonction pour marquer une tâche comme terminée
    function markTaskAsDone(taskName) {
      if (selectedUser) {
        const task = selectedUser.tasks.find(task => task.name === taskName);
        if (task) {
          task.done = true;
          displayTasks();
        }
      }
    }
  
    // Écouteur d'événement pour la sélection d'un utilisateur
    userSelection.addEventListener('click', e => {
      if (e.target.tagName === 'LI') {
        const userName = e.target.innerText;
        selectedUser = users.find(user => user.name === userName);
        displayTasks();
      }
    });
  
    // Écouteur d'événement pour la création d'une tâche
    taskCreation.addEventListener('submit', e => {
      e.preventDefault();
      const taskName = taskCreation.elements.taskName.value;
      createTask(taskName);
      taskCreation.reset();
    });
  
    // Chargement initial des utilisateurs depuis le serveur
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        users = data;
        displayUsers();
      });
  });

  if (location.pathname == '/todos/create') {
    const form = document.querySelector('form');
    console.log(form);
    form.addEventListener('submit', e => {
      e.preventDefault();
      fetch(location.href, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          txt: form.txt.value,
          cat: form.cat.value
        })
      }).then(() => location.href = '/todos');
    });
  }
  
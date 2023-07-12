const url = "/todos/create"
const endPoint = "https://localhost:4443"
let users = [];

if (document.location.href.toString().includes("home")) {
  console.log("dans home",);
  // faire requete pour recuperer les users
  getUsers();
 
}
const form = document.getElementById('taskCreation');

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(`valeur du form `, form.ATTRIBUTE_NODE, form.action);
  const input = document.getElementById('taskTexte');
  const select = document.getElementById('Categorie');
  const affiliateUser = document.getElementById('user');

  fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      txt: input.value,
      cat: select.value,
      user: affiliateUser.value
    })
  }).then(() => location.href = '/todos');
});



function getUsers() {
  console.log('get users',`${endPoint}/user`);
  fetch(`${endPoint}/user`,
    { method: "GET" })
    .then((res) => {
      console.log('1e then');
      console.log(`res ligne 38`, res);
      return res.json();
    })
    .then(data => {
      console.log('2e then')
      users = data;
      fillSelectUsers(users);
      addListenerSelectUsers();
    });
}

function fillSelectUsers(users) {
  console.log("users :", users);
  const selectUsers = document.getElementById("list-user");
  const affiliateUser = document.getElementById('user');
  let htmlContent = "<option value='empty' selected>Choisir un utilisateur</option>";
  users.forEach(u => {
    htmlContent += `<option value=" ${u.id}" > ${u.name} </option>`;
  });
  selectUsers.innerHTML = htmlContent;
  affiliateUser.innerHTML = htmlContent;
}

function addListenerSelectUsers() {
  const selectUsers = document.getElementById("list-user");
  selectUsers.addEventListener("change", () => {
    console.log("change value :", selectUsers.value);
    if (selectUsers.value !== "empty") {
      console.log("requete tasks by user id");
    }
    // faire requete pour recuperer les tasks de cet user
    getTasksByUserId(selectUsers.value);
  });
}


function getTasksByUserId(userId) {
  console.log("recup tasks by user id :", userId);
  fetch(`${endPoint}/user/${userId}`,
    { method: "GET" })
    .then((res) => {
      console.log(`1er then de getTaskByUser ligne 79`, res);
      return res.json();
    })
    .then(data => {
      todos = data;
      console.log("2e then task by util id :", todos);
      // appel fonction qui affiche les tasks
      renderTasks(todos);
      const urgentCat = todos.filter(t => t.cat === "urgent").map(t => t.cat);
      const prioriCat = todos.filter(t => t.cat === "priori").map(t => t.cat);
      
      console.log("urgentCat:", urgentCat);
      console.log("prioriCat:", prioriCat);
      //console.log("cattab", catTab);
      //console.log(`todos.cat1`,t.cat);
      getTaskByCat(urgentCat,prioriCat);
    });
    } 

    function renderTasks(todos) {
      const divTasksNotDone = document.getElementById("div-tasks-not-done");
      let htmlContent = "";
      todos.filter(t => t.done === false).forEach(t => {
          htmlContent += `<div class="my-2"><h3>${t.txt} </h3>  <p> categorie:${t.cat}</p><button class="btn btn-success mx-2">Editer</button><button class="btn btn-danger mx-2">Supprimer</button></div>`
      });
      divTasksNotDone.innerHTML = htmlContent;

      const divTasksDone = document.getElementById("div-tasks-done");
      let htmlContentDone = "";
      todos.filter(t => t.done === true).forEach(t => {
          htmlContentDone +=`<div class="my-2"><h3> ${t.txt} </h3> <p> categorie:${t.cat}</p><button class="btn btn-success mx-2">Editer</button><button class="btn btn-danger mx-2">Supprimer</button></div>`
      });
      divTasksDone.innerHTML = htmlContentDone;
    }

    function addListenerFilterCat(){
      const selectTaskByCat = document.getElementById('filterByCat');
      const selectUsers = document.getElementById('list-user')
      selectTaskByCat.addEventListener('change', () => {
        if (selectTaskByCat.value !==  "empty") {
          console.log("requete tasks by cat id",selectTaskByCat.value);
        }
        getTaskByCatValue(selectTaskByCat.value,selectUsers.value);
      } );
    }

    function getTaskByCatValue(cat,user) {
      console.log(" ligne 120 appel fonction recup tasks by catValue id :",cat);
      fetch(`${endPoint}/cat01/${cat}/${user}`,
        { method: "GET" })
        .then((res) => {
          console.log(`1er then de getTaskBycatValue ligne 123`, res);
          return res.json();
        })
        .then(data => {
          todoscat = data;
          console.log("ligne 129 2e then task by cat id :", todoscat);
          // appel fonction qui affiche les tasks
          renderTasksByFillCat(todoscat);
        });
        }

    function getTaskByCat(urgentCat,prioriCat) {
      console.log(" ligne 120 appel fonction recup tasks by cat id :",urgentCat,prioriCat);
      fetch(`${endPoint}/cat/${urgentCat}/${prioriCat}`,
        { method: "GET" })
        .then((res) => {
          console.log(`1er then de getTaskBycat ligne 123`, res);
          return res.json();
        })
        .then(data => {
          todoscat = data;
          console.log("ligne 129 2e then task by cat id :", todoscat);
          // appel fonction qui affiche les tasks
          renderTasksByCat(todoscat);
          addListenerFilterCat();
        });
        }

              
      function renderTasksByCat(cat) {
        console.log("cat :",cat);
        const selectTaskByCat = document.getElementById("filterByCat");
        let htmlContent = "<option value='empty' selected>Choisir une catégorie</option>";
        cat.forEach(u => {
          htmlContent += `<option value=" ${u}" > ${u} </option>`;
          console.log(`content `,htmlContent,u);
        });
        selectTaskByCat.innerHTML = htmlContent;
      }

      function renderTasksByFillCat(filteredTasks) {
        const divTasksNotDone = document.getElementById("div-tasks-not-done");
        let htmlContent = "";
        filteredTasks.forEach(t => {
          htmlContent += `<div class="my-2"><h3>${t.txt}</h3><p>categorie: ${t.cat}</p><button class="btn btn-success mx-2">Editer</button><button class="btn btn-danger mx-2">Supprimer</button></div>`;
        });
        divTasksNotDone.innerHTML = htmlContent;
      
        const divTasksDone = document.getElementById("div-tasks-done");
        let htmlContentDone = "";
        filteredTasks.filter(t => t.done === true).forEach(t => {
          htmlContentDone += `<div class="my-2"><h3>${t.txt}<h3><p>categorie: ${t.cat}</p><button class="btn btn-success mx-2">Editer</button><button class="btn btn-danger mx-2">Supprimer</button></div>`;
        });
        divTasksDone.innerHTML = htmlContentDone;
      }
      
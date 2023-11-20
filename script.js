const buttonAdd = document.getElementById("btnAdd");
const buttonCancel = document.getElementById("btnCancel");
const inputTask = document.getElementById("inputNewTask");
const listeTask = document.getElementById("listTask");

let tabAllTasks = [];

function toggleButton() {
    buttonAdd.hidden = !buttonAdd.hidden;
    inputTask.hidden = !inputTask.hidden;
    buttonCancel.hidden = !buttonCancel.hidden;
}

function getAllTasks() {
    fetch('http://localhost:3000/tasks').then(res => {
    console.log(res);
    return res.json();
}).then(data => {
    tabAllTasks = data;
    listeTask.innerHTML = '';
    convertTasksToElements();
    console.log("Fin conversion");
}).catch(err => {
    console.log("Probléme avec votre API !");
})
}

getAllTasks();


function convertTasksToElements() {
    for (const task of tabAllTasks) {
        let newLi = document.createElement('li');
        newLi.classList.add('list-group-item');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.checked;
        checkbox.style.margin = '0 10px';
        checkbox.addEventListener('change', () => {
            fetch(`http://localhost:3000/tasks/${task.id}`, {
                        method : 'PATCH',
                        body : JSON.stringify(
                            {
                                checked : checkbox.checked
                            }
                        ),
                        headers : {
                            'Content-Type': 'application/json'
                        }
                }).then(res => {
                    getAllTasks();
                })
        })

        let badgeSpan =  document.createElement('span');
        badgeSpan.classList.add('badge');
        badgeSpan.classList.add('bg-secondary');
        badgeSpan.style.margin = '0 20px';
        badgeSpan.textContent = `${new Date(task.date).getHours()}H ${new Date(task.date).getMinutes()} Mn`;

        let newSpan = document.createElement('span');
        newSpan.textContent = task.text;
        newSpan.style.margin = '0 20px';
        if(task.checked)
            newSpan.style.textDecoration = 'line-through'; 

        newLi.appendChild(checkbox);
        newLi.appendChild(newSpan);
        newLi.appendChild(badgeSpan);
        newLi.addEventListener('dblclick', () => {
            if(confirm('Etes vous sur de vouloir supprimer ce task ?'))
                {
                    fetch(`http://localhost:3000/tasks/${task.id}`, {
                        method : 'DELETE',
                }).then(res => {
                    alert('Task supprimé avec succès');
                    getAllTasks();
                })
            }
    });
    listeTask.appendChild(newLi);

}
}

inputTask.addEventListener('change', () => {
    fetch('http://localhost:3000/tasks', {
    method : 'POST',
    body : JSON.stringify({
        text : inputTask.value,
        checked : false,
        date : new Date()
    }),
    headers : {
        'Content-Type': 'application/json'
    }
}).then(res => {
    alert('Task bien ajouté');
    getAllTasks();
}).catch(err => {
    console.log("Probléme avec votre API !");
})
toggleButton();
})

buttonCancel.addEventListener('click', () => {
    toggleButton();
})
buttonAdd.addEventListener('click', () => {
    toggleButton();
})



// fetch('http://localhost:3000/tasks').then(res => {
//     console.log(res);
//     return res.json();
// }).then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log("Probléme avec votre API !");
// })

// document.getElementById("add").addEventListener('click', () => {
//     fetch('http://localhost:3000/tasks', {
//     method : 'POST',
//     body : JSON.stringify({
//         text : "Test TP7",
//         checked : false
//     }),
//     headers : {
//         'Content-Type': 'application/json'
//     }
// }).then(res => {
//     alert('Task bien ajouté')
// }).catch(err => {
//     console.log("Probléme avec votre API !");
// })
// });

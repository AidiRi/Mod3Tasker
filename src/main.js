document.addEventListener("DOMContentLoaded", ()=> main() )


function main() {
	
	getAllTasks();
  createTask();



}

function createTask() {
  const taskForm = document.querySelector("#task-form")

  taskForm.addEventListener("submit", function(event) {
    event.preventDefault()
    postTask(taskForm)
  })
}
function postTask(taskForm) {
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: taskForm["new-task-input"].value,
      status: "open",
      project_id: 1
      // fix this once we have project routes

    })
  };
  fetch("http://localhost:3000/tasks", configObj)
  	.then(response => response.json())
  	.then(json => displayTask(json));
}

function displayTask(json) {
	const taskDiv = document.querySelector("#task-div");
	const taskUl = document.querySelector("#task-ul");
	const taskLi = document.createElement("li");
	
	taskLi.textContent = json.name;
	taskUl.appendChild(taskLi);
}

function getAllTasks() {
	fetch("http://localhost:3000/tasks")
		.then(response => response.json())
		.then(json => displayAllTasks(json));
}

function displayAllTasks(json) {
	for (let i = 0; i < json.length; i++) {
		displayTask(json[i]);
	}	
}
document.addEventListener("DOMContentLoaded", ()=> main() )


function main() {
	
	getAllTasks();
	createTask();


}

function getAllTasks() {
	fetch("http://localhost:3000/tasks")
		.then(response => response.json())
		.then(json => displayAllTasks(json));
}

function displayAllTasks(json) {
	for (let i = 0; i < json.length; i++) {
		
		if (json[i].status === "open") {
			displayOpenTask(json[i]);
		} else {
			displayClosedTask(json[i]);
		}		
	}	
}

function displayOpenTask(json) {
	const taskDiv = document.querySelector("#task-div");
	const taskUl = document.querySelector("#task-ul");
	const taskLi = document.createElement("li");
	const taskSpan = document.createElement("span")
	const taskInput = document.createElement("input");
	const taskDoneButton = document.createElement("button");
	const taskEditButton = document.createElement("button");
	const taskDelButton = document.createElement("button");
	
	taskSpan.textContent = json.name;
	taskInput.value = taskSpan.textContent;
	taskInput.className = "hidden";
	taskDoneButton.textContent = "Done";
	taskDelButton.textContent = "X";
	taskEditButton.textContent = "Edit";

	taskLi.appendChild(taskSpan);
	taskLi.appendChild(taskInput);
	taskLi.appendChild(taskDoneButton);
	taskLi.appendChild(taskEditButton);
	taskLi.appendChild(taskDelButton);
	taskUl.appendChild(taskLi);
	
	taskDoneButton.addEventListener("click", () => {
		doneTask(taskUl, taskLi, json);
	})

	taskEditButton.addEventListener("click", () => {
		editTask(taskUl, taskSpan, taskInput, json);
	})
	
	taskDelButton.addEventListener("click", () => {
		deleteTask(taskUl, taskLi, json);
	})
}

function displayClosedTask(json) {
	const doneUl = document.querySelector("#done-ul");
	const doneLi = document.createElement("li");
	
	doneLi.textContent = json.name;
	doneUl.appendChild(doneLi);	
}

function doneTask(taskUl, taskLi, json) {
	json.status = "closed";
	displayClosedTask(json);

	taskUl.removeChild(taskLi);

	fetch(`http://localhost:3000/tasks/${json.id}`,{
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body:JSON.stringify({
			status: "closed"
		})
	})
}

function editTask(taskUl, taskSpan, taskInput, json){
	taskSpan.className = "hidden";
	taskInput.classList.remove("hidden");

	taskInput.addEventListener("change", () => {
		fetch(`http://localhost:3000/tasks/${json.id}`,{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body:JSON.stringify({
				name: event.target.value
			})
		})

		taskSpan.textContent = event.target.value
		taskSpan.classList.remove("hidden")
		taskInput.className = "hidden"
	})
}

function deleteTask(taskUl, taskLi, json) {	
	const configObj = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		}
	}
	
	fetch(`http://localhost:3000/tasks/${json.id}`, configObj)
	
	taskUl.removeChild(taskLi);
}


function createTask() {
  const taskForm = document.querySelector("#task-form")

  taskForm.addEventListener("submit", function(event) {
    event.preventDefault()
    postTask(taskForm)
    taskForm.reset();
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
  	.then(json => displayOpenTask(json));
}




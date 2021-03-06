document.addEventListener("DOMContentLoaded", ()=> main() )


function main() {
	const dropDown = document.querySelector(".project-select")
	dropDown.addEventListener("change", () => getAllTasks() )
	// getAllTasks();
	createTask();
	setDate();
}

function setDate() {
	const dateDisplay = document.querySelector("#date-header");
	dateDisplay.textContent = (new Date).toDateString();	
}

function getAllTasks() {
	fetch("http://localhost:3000/tasks")
		.then(response => response.json())
		.then(json => {
			// displayAllTasks(json);
			fetchProjects(json);
		});
}

function fetchProjects(tasks){
    fetch("http://localhost:3000/projects")
    .then(resp => resp.json())
    .then(json => displayProjectTasks(tasks, json))
}

function displayProjectTasks(tasks, projects) {
	const dropDown = document.querySelector(".project-select")
	for (const project of projects){
		const projectTasks = [];
		if (dropDown.value == project.id) {
			for (const task of tasks){
				if (task.project_id == project.id) {
					projectTasks.push(task)
				}
			}
		displayAllTasks(projectTasks);
		}


	}
	// if dropDownOp.textContent === project.name
	//   if task.project.name === project.name
	//     displayAllTasks only for those tasks
	//     create array with all tasks that meet conditional
}


function displayAllTasks(json) {

	const taskUl = document.querySelector("#task-ul");
	const doneUl = document.querySelector("#done-ul");
	while (taskUl.firstChild) {
		taskUl.removeChild(taskUl.firstChild)
	}
	while (doneUl.firstChild) {
		doneUl.removeChild(doneUl.firstChild)
	}

	for (let i = 0; i < json.length; i++) {

		if (json[i].status === "open") {
			displayOpenTask(json[i]);
		} else {
// 		send individual closed task to a function that gathers closed tasks
// 		then use a sorting function that sorts closed tasks by update time
// 		then iterate through the sorted collection / array and send to displayClosedTask
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
	taskDoneButton.className = "task-done-btn";
	taskDelButton.textContent = "X";
	taskDelButton.className = "task-delete-btn";
	taskEditButton.textContent = "Edit";
	taskEditButton.className = "task-edit-btn";

	taskLi.appendChild(taskSpan);
	taskLi.appendChild(taskInput);
	taskLi.appendChild(taskDelButton);
	taskLi.appendChild(taskEditButton);
	taskLi.appendChild(taskDoneButton);
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
	const doneSpan = document.createElement("span")
	const doneDelButton = document.createElement("button");

	doneSpan.textContent = json.name;
	doneDelButton.textContent = "Remove";
	doneDelButton.className = "done-btn";
	doneLi.appendChild(doneSpan);
	doneLi.appendChild(doneDelButton);
	doneUl.appendChild(doneLi);

	doneDelButton.addEventListener("click", () => {
		deleteDone(doneUl, doneLi, json);
	});
}

function doneTask(taskUl, taskLi, json) {
	json.status = "closed";
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
		.then(response => response.json())
		.then(json => displayClosedTask(json));
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


// possibly re-factor this function and deleteTask function since code is similar
function deleteDone(doneUl, doneLi, json) {
	const configObj = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		}
	}

	fetch(`http://localhost:3000/tasks/${json.id}`, configObj)

	doneUl.removeChild(doneLi);
}


function createTask() {
  const taskForm = document.querySelector("#task-form")
	const taskError = document.querySelector("#task-error");

	taskForm.addEventListener("click", ()=> taskError.classList.add("hidden"))
  taskForm.addEventListener("submit", function(event) {
    event.preventDefault()
		const inputValue = event.target["new-task-input"].value;

		if (inputValue.length > 0) {
			postTask(taskForm)
			taskForm.reset();
		} else {
			taskForm.reset();
			taskError.textContent = "No task name";
			taskError.classList.remove('hidden');
						console.log(taskError)
		}
  })
}

function postTask(taskForm) {
	const projectId = parseInt(document.querySelector(".project-select").value);
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: taskForm["new-task-input"].value,
      status: "open",
      project_id: projectId
      // fix this once we have project routes

    })
  };
  fetch("http://localhost:3000/tasks", configObj)
  	.then(response => response.json())
  	.then(json => displayOpenTask(json));
}

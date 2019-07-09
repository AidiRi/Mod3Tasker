document.addEventListener("DOMContentLoaded", ()=> main() )


function main() {
  createTask()



}

function createTask() {
  const taskForm = document.querySelector("#task-form")

  taskForm.addEventListener("submit", function(event) {
    event.preventDefault()
    postTask(taskForm)
  })
}
function postTask(taskForm) {
  console.log("check")
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
    console.log("check")
  fetch("http://localhost:3000/tasks", configObj)

}

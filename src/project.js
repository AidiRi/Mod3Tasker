document.addEventListener("DOMContentLoaded", () => projectMain())

function projectMain(){

    displayingElements();
    fetchingProject();
}

function fetchingProject(){
    fetch("http://localhost:3000/projects")
    .then(resp => resp.json())
    .then(json => getAllProject(json))
}

function getAllProject(json){
    for (let i = 0; i < json.length; i++){
        displayProject(json[i]);
    }

}

function displayProject(json){
    let selectOp = document.getElementsByClassName("project-select")[0];
    let dropDownOp = document.createElement("option");
    dropDownOp.setAttribute("value", json.id)

    dropDownOp.textContent = json.name;

    selectOp.appendChild(dropDownOp);

}

function displayingElements(){
    let pJ = document.getElementsByClassName("project-level")[0];
    let newProjectInput = document.createElement("input");
    let projectEditInput = document.createElement("input");
    let newPrjBtn = document.createElement("button");
    let delPrjBtn = document.createElement("button");
    let editPrjBtn = document.createElement("button");

    newPrjBtn.textContent = "New Project";
    editPrjBtn.textContent = "Edit Button";
    delPrjBtn.textContent = "Delete Project";

    pJ.appendChild(newProjectInput);
    pJ.appendChild(projectEditInput);
    pJ.appendChild(newPrjBtn);
    pJ.appendChild(editPrjBtn);
    pJ.appendChild(delPrjBtn);

    newProjectInput.className = "hidden";
    projectEditInput.className = "hidden";

    newPrjBtn.addEventListener("click", () => {
      newProjectInput.classList.remove("hidden");
        //createNewProject(newProjectInput)
    })

    newProjectInput.addEventListener("change", () => {
        fetch("http://localhost:3000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: event.target.value,
                user_id: 1
            })
        })
        .then(resp => resp.json())
        .then(json => {
          console.log(json);
          displayProject(json)})
          newProjectInput.value = ""
          newProjectInput.className = "hidden"
    })

    editPrjBtn.addEventListener("click", () => {
        projectEditInput.classList.remove("hidden");
        // updateRequest(projectEditInput)
    })

    projectEditInput.addEventListener("change", () => {
      let id = parseInt(document.querySelector(".project-select").value)
        fetch(`http://localhost:3000/projects/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: event.target.value,
                user_id: 1
            })
        })
        .then(resp => resp.json())
        .then(json => {
            const opContent = document.querySelector(".project-select")
            for (let i = 1; i < opContent.children.length; i++){
                if (parseInt(opContent.children[i].value) === json.id){
                    opContent.children[i].textContent = json.name;
                }
            }
        })
        projectEditInput.value = ""
        projectEditInput.className = "hidden"
    })

    delPrjBtn.addEventListener("click", () => {
        deleteProject()
    })


}

// function createNewProject(newProjectInput){
//     newProjectInput.classList.remove("hidden");
//
//     newProjectInput.addEventListener("change", () => {
//         fetch("http://localhost:3000/projects", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify({
//                 name: event.target.value,
//                 user_id: 1
//             })
//         })
//         .then(resp => resp.json())
//         .then(json => {
//           console.log(json);
//           displayProject(json)})
//         newProjectInput.value = ""
//         newProjectInput.className = "hidden"
//     })
// }

// function updateRequest(projectEditInput){
// 
//     projectEditInput.addEventListener("change", () => {
//       let id = parseInt(document.querySelector(".project-select").value)
//         fetch(`http://localhost:3000/projects/${id}`,{
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify({
//                 name: event.target.value,
//                 user_id: 1
//             })
//         })
//         .then(resp => resp.json())
//         .then(json => {
//             const opContent = document.querySelector(".project-select")
//             for (let i = 1; i < opContent.children.length; i++){
//                 if (parseInt(opContent.children[i].value) === json.id){
//                     opContent.children[i].textContent = json.name;
//                 }
//             }
//         })
//         projectEditInput.value = ""
//         projectEditInput.className = "hidden"
//     })
// }

function deleteProject(){
    let getSelect = document.querySelector(".project-select")
    deleteRequest(getSelect.value)
    getSelect.remove(getSelect.selectedIndex)
}

function deleteRequest(id){
    fetch(`http://localhost:3000/projects/${id}`,{
        method: "DELETE",
        headers: {
            "Content_type": "application/json",
            "Accept": "application/json"
        }
    })
}

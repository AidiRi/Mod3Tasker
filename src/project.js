document.addEventListener("DOMContentLoaded", () => projectMain())
    
function projectMain(){

    newProject();
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
    dropDownOp.setAttribute('value', json.id)


    dropDownOp.textContent = json.name;

    selectOp.appendChild(dropDownOp);

}

function newProject(){
    let Pj = document.getElementsByClassName("project-level")[0];
    let projectInput = document.createElement("input");
    let newPrjBtn = document.createElement("button");
    let delPrjBtn = document.createElement("button");

    newPrjBtn.textContent = "New Project";
    delPrjBtn.textContent = "Delete Project";

    Pj.appendChild(projectInput);
    Pj.appendChild(newPrjBtn);
    Pj.appendChild(delPrjBtn);

    projectInput.className = "hidden"

    newPrjBtn.addEventListener("click", () => {
        createNewProject(projectInput);
    })

    delPrjBtn.addEventListener("click", () => {
        deleteProject()
    })

}

function createNewProject(projectInput){
    projectInput.classList.remove("hidden");

    projectInput.addEventListener("change", () => {
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
        .then(json => displayProject(json))
        projectInput.value = ""
        projectInput.className = "hidden"
    })
}

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
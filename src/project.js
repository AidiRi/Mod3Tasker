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
    let selectOp = document.getElementsByClassName('project-select')[0];
    console.log("check");
    let dropDownOp = document.createElement('option');

    dropDownOp.textContent = json.name;

    selectOp.appendChild(dropDownOp);
}

function newProject(json){
    let Pj = document.getElementsByClassName('project-level')[0];
    let projectInput = document.createElement('input');
    let newPrjBtn = document.createElement('button');

    newPrjBtn.textContent = "New Project";

    Pj.appendChild(projectInput);
    Pj.appendChild(newPrjBtn);

    projectInput.className = "hidden"

    newPrjBtn.addEventListener('click', () => {
        createNewProject(projectInput, newPrjBtn, json);
    })
}

function createNewProject(projectInput, newPrjBtn, json){
    projectInput.classList.remove('hidden');
    projectInput.addEventListener('change', () => {
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

const notescontainer = document.querySelector(".notescontainer");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll("input-box");

function showNotes(){
    notescontainer.innerHTML = localStorage.getItem("notes"); 
}
showNotes(); 

function updateStorage(){
    localStorage.setItem("notes",notescontainer.innerHTML)
}
                                       
createBtn.addEventListener("click",()=>{
    let inputbox = document.createElement("p");
    let img = document.createElement("img");
    inputbox.className = "input-box";
    inputbox.setAttribute("contenteditable","true");
    img.src = "./image/delete-removebg-preview.png";
    notescontainer.appendChild(inputbox).appendChild(img)
})

notescontainer.addEventListener("click",function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName === "p"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt=>{
            nt.onkeyup = function(){
            updateStorage();
            }
        })


    }
})

document.addEventListener("keydown",event=>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})
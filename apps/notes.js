export let fajlovi = "32";

// DOM elements

let arrowUp = document.querySelectorAll(".up");
let arrowDown = document.querySelectorAll(".down");

const inputName = document.getElementById("file-input");
const btnAddFile = document.getElementById("file-add-btn");

btnAddFile.addEventListener("mousedown", function() {
    var myBlob = new Blob(["CONTENT"], {type: "text/plain"});
    localStorage.setItem("myBlob", myBlob);
})


arrowUp.forEach(element => {
    element.addEventListener("click", function () {
        alert("UP!!");
    })    
});







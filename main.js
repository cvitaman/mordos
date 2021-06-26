//Authentication elements
const authBg = document.querySelector(".authentication-container");
const osContainer = document.querySelector(".os-container");
const osTitle = document.querySelector(".os-background-text");

const authTitle = document.querySelector(".auth-title");
const authEmail = document.getElementById("email");
const authPassword = document.getElementById("password");
const authBtn = document.getElementById("auth-btn");


// App Button elements
const appBtnNotes = document.getElementById("app-btn-notes");
const appBtnNews = document.getElementById("app-btn-news");
const appBtnCamera = document.getElementById("app-btn-camera");
const appBtnGallery = document.getElementById("app-btn-gallery");
const appBtnBrowser = document.getElementById("app-btn-browser");

// App Window elements
const appNotes = document.getElementById("app-notes");
const appNews = document.getElementById("app-news");
const appCamera = document.getElementById("app-camera");
const appGallery = document.getElementById("app-gallery");
const appBrowser = document.getElementById("app-browser");
let topBar = document.querySelectorAll(".top-bar");

//App Title bar window elements
const appBtnClose = document.querySelectorAll(".app-btn-close");

// Initial App Settings
let z = 0;




// Authentication

authEmail.addEventListener("focus", function() {
  this.value = "";
})

authPassword.addEventListener("focus", function() {
  this.value = "";
})

authBtn.addEventListener("click", function() {
  let checkEmail = false;
  let checkPassword = false;
  
  if(authEmail.value == "borgoth@mordos.com"){
    checkEmail = true;
    console.log(checkEmail);
  } else {
    authTitle.innerHTML = "Plese check your e-mail"
  }

  if(authPassword.value == "12bindthem"){
    checkPassword = true;
    console.log(checkPassword);
  } else {
    authTitle.innerHTML = "Plese check your password"
  }

  if((checkEmail == true) && (checkPassword == true)) {
    authTitle.innerHTML = "Thank you!";

    authBg.style.display = "none";
    osContainer.classList.remove("blur");

  }



})

// Functions for opening apps

////////////////////////////////////// NOTES APP
appBtnNotes.addEventListener("click", function() {
    appNotes.style.display = "block";  ;
    z +=1;
    appNotes.style.zIndex = z;
});

///////////////////////////////////// NEWS APP
appBtnNews.addEventListener("click", function() {
    appNews.style.display = "block";
    z +=1;
    appNews.style.zIndex = z;
    
  // News feed
  const newsContent = document.getElementById("news-content");

  fetch("https://jsonplaceholder.typicode.com/comments").then(async response => {
    try {
     const data = await response.json()
     for (let i = 0; i < data.length; i++) {      
      
       let newsItem = document.createElement("div");
       let newsName = document.createElement("div");
       let newsEmail = document.createElement("div");
       let newsComment = document.createElement("div");
      
        newsItem.classList = "news-item";
        newsName.classList = "news-name";
        newsEmail.classList = "news-email";
        newsComment.classList = "news-comment";    
      
      
       newsName.innerHTML = "&#9787; " + data[i].name;
       newsEmail.innerHTML = "@: " + data[i].email;
       newsComment.innerHTML = '" ' + data[i].body + ' "';
      
        newsItem.appendChild(newsName);
        newsItem.appendChild(newsEmail);
        newsItem.appendChild(newsComment);
      
        newsContent.appendChild(newsItem);


     }

   } catch(error) {
     console.log('Error happened here!')
     console.error(error)
   }
  })

   
});


//////////////////////////// CAMERA APP

appBtnCamera.addEventListener("click", function() {
    appCamera.style.display = "block";   
    z +=1;
    appCamera.style.zIndex = z;
    startCamera();

    function startCamera() {
      if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        console.log("Let's get this party started")
      }
      navigator.mediaDevices.getUserMedia({video: true})
    }
});


///////////////////////////// GALLERY APP
appBtnGallery.addEventListener("click", function() {
    appGallery.style.display = "block";
    z +=1;
    appGallery.style.zIndex = z;

  // Gallery feed

  const galleryContainer = document.getElementById("gallery-container");

  fetch("https://jsonplaceholder.typicode.com/photos").then(async response => {
    try {
     const data = await response.json()
     for (let i = 0; i < 10; i++) {      
      
       let galleryItem = document.createElement("div");
       let galleryPhoto = document.createElement("img");
       let galleryCaption = document.createElement("div");
      
        galleryItem.classList = "gallery-item";
        galleryPhoto.classList = "gallery-photo";
        galleryCaption.classList = "gallery-caption";
      
      
       galleryPhoto.src = data[i].thumbnailUrl;
       galleryCaption.innerHTML = data[i].title;
      
        galleryItem.appendChild(galleryPhoto);
        galleryItem.appendChild(galleryCaption);
      
        galleryContainer.appendChild(galleryItem); 

        galleryPhoto.onclick = function(){
          modal.style.display = "block";
          modalImg.src = data[i].url;
          captionText.innerHTML = galleryCaption.innerHTML;
          console.log(captionText);
        }

     }

   } catch(error) {
     console.log('Error happened here!')
     console.error(error)
   }
  })

   
});

///////////////////////////// BROWSER APP
appBtnBrowser.addEventListener("click", function() {
    appBrowser.style.display = "block";
    z +=1;
    appBrowser.style.zIndex = z;
});


// Functions for the title bar buttons

appBtnClose.forEach(btn => {
    btn.addEventListener("click", function() {
        btn.parentElement.parentElement.style.display = "none";
    })
});


// Bring app to front on title bar click
topBar.forEach(bar => {
  bar.addEventListener("click", function() {
      console.log(bar.parentElement);
      z += 1;
      bar.parentElement.style.zIndex = z;
  })
});





// Drag & Drop functions with interact.js

// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        


      }
    }
  })

function dragMoveListener (event) {
  var target = event.target.parentElement
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)


}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;


//////////////////////////// NOTES APP FUNCTIONALITY
const notesContainer = document.getElementById("notes-content")

const fileInput = document.getElementById("file-input");
const btnFileAdd = document.getElementById("file-add-btn");
let btnFileDelete = document.querySelectorAll(".btn-delete");
const fileText = document.getElementById("file-text");
const textArea = document.getElementById("textarea");
const btnSave = document.getElementById("text-save");
const btnClose = document.getElementById("text-close");
let clickedId;
let fileDomArray = [];

let fileArray = [];

btnFileAdd.addEventListener("click", function() {

  if(fileInput.value != 0) {
    //Adding file to the array
    class File {
      constructor(id, name, content) {
        this.id = id;
        this.name = name;
        this.content = content;
      }
    }

    
    let fileID = fileArray.length + 1
    fileArray.push(new File(fileID, fileInput.value, "This is your blank file. Please enter content"));
    console.log(fileArray);

    // Adding to the DOM

    let fileItem = document.createElement("div");
    let btnUp = document.createElement("div");
    let btnDown = document.createElement("div");
    let fileName = document.createElement("a");
    let btnFileDelete = document.createElement("div");

    //Add Classes and IDs
    btnUp.classList = "btn-arrow up";
    btnDown.classList = "btn-arrow down";
    fileItem.setAttribute("id", "btn" + fileID);
    fileName.setAttribute("href", "#")
    fileItem.setAttribute("id", fileID);
    fileItem.classList = "file";
    fileName.classList = "file-title";
    btnFileDelete.classList = "btn-delete";


    fileName.innerHTML = fileInput.value;
    btnFileDelete.innerHTML = "x";
    btnUp.innerHTML = "<img src='./assets/icon-arrow-up.png' class='icon-up'>";
    btnDown.innerHTML = "<img src='./assets/icon-arrow-down.png' class='icon-up'>";

    // Append all elements to appropriate positons
    fileItem.appendChild(btnUp);
    fileItem.appendChild(btnDown);
    fileItem.appendChild(fileName);
    fileItem.appendChild(btnFileDelete);
    fileDomArray.push(fileItem);
    console.log(fileDomArray);
    
    loopDomArray();

       


    console.log(fileArray[0].content);
    btnFileDelete = document.querySelectorAll(".btn-delete");
    console.log(fileArray);

    fileInput.value = "";

    //When Up and Down buttons are clicked
    btnUp.addEventListener("click", function() {      
      let movingItem = fileDomArray.indexOf(this.parentElement);
      fileDomArray.splice(fileDomArray.indexOf(this.parentElement), 1);
      fileDomArray.splice(movingItem -1, 0, this.parentElement);

      notesContainer.innerHTML = "";

      loopDomArray();
    });

    btnDown.addEventListener("click", function() {     
      let movingItem = fileDomArray.indexOf(this.parentElement);
      fileDomArray.splice(fileDomArray.indexOf(this.parentElement), 1);
      fileDomArray.splice(movingItem + 1, 0, this.parentElement);

      notesContainer.innerHTML = "";

      loopDomArray();

       
    });

    function loopDomArray() {
      fileDomArray.forEach(element => {
        notesContainer.append(element);
      });

    }
    
   

    // When delete button is clicked
    btnFileDelete.forEach(btn => {
      btn.addEventListener("click", function() {
        //Remove from the DOM
          btn.parentElement.style.display = "none";
        
          // Remove from the Array
        clickedId = Number(this.parentElement.getAttribute("id"));
        console.log(clickedId);
      })
    });

    // When File name link is clicked to open the txt file
    fileName.addEventListener("click", function() {
      clickedId = Number(fileName.parentElement.getAttribute("id"));
      console.log(clickedId);
      fileText.style.display = "flex";
      textArea.value = fileArray[clickedId - 1].content; 
    });

  }
  
});


btnSave.addEventListener("click", function() {
  fileArray[clickedId - 1].content = textArea.value;
  console.log("id in Array: " + fileArray[clickedId - 1].content);
  textArea.innerHTML = fileArray[clickedId - 1].content;
})

btnClose.addEventListener("click", function() {
  fileText.style.display = "none";
});





//////////////////////// GALLERY APP MODAL


// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("gallery-caption");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}




//////////////////////////// BROWSER APP FUNCTIONALITY

const pageInput = document.querySelector(".address-input");
const pageBtnGo = document.querySelector(".btn-go");
const pageRender = document.querySelector(".browser-page");

const btnRefresh = document.getElementById("btn-refresh");
const btnBack = document.getElementById("btn-back");
const btnForward = document.getElementById("btn-forward");

let currPage = pageRender.src;
let prevPage = 0;
let nextPage = 0;


pageBtnGo.addEventListener("click", function() {
  prevPage = pageRender.src;
  pageRender.src = pageInput.value;
  currPage = pageRender.src;
});

btnRefresh.addEventListener("click", function() {
  pageRender.src = currPage;
});

btnBack.addEventListener("click", function() {
  if(prevPage != 0 && prevPage != currPage) {
    pageRender.src = prevPage;
  };
})





///////////// MEDIA QUERY

function myFunction(x) {
  if (x.matches) { // If media query matches
    const draggables = document.querySelectorAll(".draggable")
    
    draggables.forEach(element => {
      element.classList.remove("draggable");
    });
  } 
}

var x = window.matchMedia("(max-width: 370px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes
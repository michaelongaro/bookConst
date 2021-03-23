/* current issues: 
   - fixed height + auto width for cards 
   - need to account for previous books in storage (deletion/changing read status) + make them actual books 
   - how to either contain vertical container with a scroll bar, or have it infinitely extend downwards (without extending into header or (footer* aka reset button))
*/

let myLibrary = [];

let bookCountVals = [];

let bookCount = 0;

let noHeaderExists = true;
let vertContExists = false;
let loadedInFromStorage = false;

let introText = document.getElementById('introText');

document.getElementById('button').addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'flex';
})

document.querySelector('.close').addEventListener('click', function () {
  document.querySelector('.bg-modal').style.display = 'none';
})

document.getElementById("colorpicker").addEventListener("onchange", () => setFromColorModal(this));

if(!localStorage.getItem('firstName')) {
  console.log("we are fresh");
} else {
  setStyles();
}

function populateStorage() {
  localStorage.setItem('firstName', document.getElementById('name').value);
  localStorage.setItem('bgcolor', document.getElementById('colorpicker').value);
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function accessAssets() {
  let currentName = localStorage.getItem('firstName');
  let currentColor = localStorage.getItem('bgcolor');

  return [currentName, currentColor];
}

function setStyles() {
  console.log("loading in saved content");
  let [currentName, currentColor] = accessAssets();
  let currentLibrary = JSON.parse(localStorage.getItem('library'));

  if (!loadedInFromStorage) {
    console.log({currentName, currentColor});

    prepPostIntro();
    appendHeader(currentName, currentColor);
    loadedInFromStorage = true;
  }

  myLibrary = currentLibrary;

  myLibrary.forEach(function (index) {
     displayLibrary(index.title, index.author, index.pages, index.have_read);
  });
}

function Book(title, author, pages, have_read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.have_read = have_read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.have_read}`;
  }
}

function addBookToLibrary(title, author, pages, have_read) {
  myLibrary.push(new Book(title, author, pages, have_read));
}

Book.prototype.changeRead = function() {
  this.have_read = !this.have_read;
}

function setFromColorModal(element) {
  document.getElementById("libraryHeader").style.background = element.value;
}

function prepPostIntro() {
  introText.remove();
  document.getElementById("verticalContainer").removeAttribute("class", "hideVertContainer");

  let carryoverButton = document.createElement('a');
  carryoverButton.setAttribute("href", "#");
  carryoverButton.className = "button";
  carryoverButton.id = "newAddBook";
  
  carryoverButton.innerText = "Add New Book";
  carryoverButton.style.display = "block";
  document.getElementById("futureButton").append(carryoverButton);

  carryoverButton.addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'flex';
  })

  document.querySelector('.close').addEventListener('click', function () {
    document.querySelector('.bg-modal').style.display = 'none';
  })
}

function appendHeader(fname, c) {
  let firstname, color;

  if (fname === undefined && c === undefined) {
    firstname = document.getElementById("name").value;
    color = document.getElementById("colorpicker").value;
  }
  else {
    firstname = fname;
    color = c;
  }

  document.getElementById("libraryHeader").style.display = "flex";
  document.getElementById("libraryHeader").style.background = color;
  document.getElementById("libraryHeader").innerText = firstname + "'s Library";

  document.getElementsByClassName('first-modal-content')[0].className = "modal-content";
  document.getElementById("stockBook").style.display = "inline-block";
  document.getElementById("name").style.display = "none";
  document.getElementById("name1").style.display = "none";
  document.getElementById("colorpicker").style.display = "none";
  document.getElementById("colorpicker1").style.display = "none";
  document.getElementById("instructions").style.display = "none";
  noHeaderExists = false;

  let clearStorage = document.createElement('button');
  clearStorage.innerText = "Reset Library";
  document.getElementById("yahoo").append(clearStorage);
  document.getElementById("yahoo").style.display = "inline";
  clearStorage.addEventListener("click", function() {
    window.localStorage.clear();
    loadedInFromStorage = false;
    // fix dis later :3
    if(!localStorage.getItem('firstName')) {
      console.log("we are fresh");
    } else {
      setStyles();
    }
  })
}


function displayLibrary(a, b, c, d) {

  let outerLib = document.getElementById('outerLibrary');
  //The document.createElement() method create html elements specified by tagName
  let cardElement = document.createElement('div');
  let imageContainer = document.createElement('div');
  let infoContainer = document.createElement('div');
  let imageElement = document.createElement('img');
  let headingElement = document.createElement('h5');
  let paragraphElement = document.createElement('p');
  let pagesElement = document.createElement('p');
  let completedElement = document.createElement('p');
  let btnElement = document.createElement('button');
  let deleteBookElement = document.createElement('button');

  //The ClassName property gets and sets the value of the class attribute of the spefified element
  cardElement.className = "card";
  imageContainer.className = "image-container";
  infoContainer.className = "info-container";
  imageElement.className = "image";
  headingElement.className = "heading";
  paragraphElement.className = "paragraph";
  pagesElement.className = "pages";
  completedElement.className = "bookCompletion";
  btnElement.id = "btn";
  deleteBookElement.className = "delBtn";

  //Works the same way as the className property except it sets the source of the imageElement
  imageElement.src = "https://source.unsplash.com/random";

  // This sets the value of an attribute specified element. If exists then will be updated, otherwise the new attribute is added with the specified name and value
  //btnElement.setAttribute("href", "#");
  imageElement.setAttribute("alt", "Image from Unsplash");

  // need to wrap these values in a function before they are
  headingElement.innerText = a;
  paragraphElement.innerText = b;
  pagesElement.innerText = c + " Pages";
  if (d == false) {
    completedElement.innerText = "Not Read Yet.";
  }
  else if (d == true) {
    completedElement.innerText = "Finished!";
  }
  // also let them rate :3 it right afterwords
  // would probably need to extend (smoothly) the bottom of the element to allow for room of 5 star system, 
  // when star is hovered make it turn yellow, and would maybe just need attribute(?) of class for number_stars
  btnElement.innerText = "Click to finish book";
  deleteBookElement.innerText = "Delete";

  cardElement.setAttribute("data-number", bookCount);

  deleteBookElement.id = `del${bookCount}`

  outerLib.append(cardElement);
  cardElement.append(infoContainer);

  imageContainer.appendChild(imageElement);
  infoContainer.append(headingElement, paragraphElement, pagesElement, completedElement, btnElement, deleteBookElement);

  bookCountVals.push(bookCount);

  btnElement.addEventListener('click', function() {
    myLibrary[parseInt(cardElement.dataset.number)].changeRead();
    if (myLibrary[parseInt(cardElement.dataset.number)].have_read) {
      completedElement.innerText = "Finished!";
      cardElement.style.backgroundColor = "rgba(13, 161, 18, .8)";
    }
    else {
      completedElement.innerText = "Not Read Yet.";
      cardElement.style.backgroundColor = "#f4f4f4";
    }
  })


  deleteBookElement.addEventListener('click', function() {
    // maybe eventually find way to properly shift over index values/rewrite values into new array when deleting
    myLibrary.splice(parseInt(cardElement.dataset.number), 1, "");
    console.log(myLibrary);
    cardElement.addEventListener('transitionend', () => cardElement.remove());
    cardElement.classList.add("card2");
  })

  bookCount++;
}



//let introText = document.getElementById('introText');

/*introText.addEventListener('transitionend', () => introText.remove());*/

// want: to keep both bg-modals relatively the same, and just fucking delete the first one when it is done
// can't do b/c: need(?) to have diff ids for the two forms

document.getElementById('newBookForm').onsubmit = function() { 
  let a = document.getElementById('title').value;
  let b = document.getElementById('author').value;
  let c = document.getElementById('pagelength').value;
  let d;
  if (document.getElementById('finishedreading').checked) {
    d = true;
  }
  else {
    d = false;
  }

  addBookToLibrary(a, b, c, d);
  displayLibrary(a, b, c, d);

  document.querySelector('.bg-modal').style.display = 'none';

  if (document.getElementById("wrapper").contains(document.getElementById("introText"))) {
    console.log(document.getElementById("wrapper").contains(document.getElementById("introText")));

    //introText.addEventListener('transitionend', function() {
      prepPostIntro();
      appendHeader();
    //})
    introText.classList.add("introText2");
  }

  populateStorage();
  return false;
};
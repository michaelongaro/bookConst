/* current issues: 
   - fixed height + auto width for cards 
*/

let myLibrary = [];

let bookCountVals = [];

let bookCount = 0;

let vertContExists = false;

function Book(title, author, pages, have_read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.have_read = have_read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.have_read}`;
  }
}

// submit button on the form will call this function i guess
// will also need to remove '.introText' class/text visibility once book is added
// not sure where to comment this but could keep layout, and have page scroll down to where the cards 
//      currently are to make things a bit easier. might have to change '.introText' a bit after though.
function addBookToLibrary(title, author, pages, have_read) {
  myLibrary.push(new Book(title, author, pages, have_read));
}

Book.prototype.changeRead = function() {
  this.have_read = !this.have_read;
}

function setFromColorModal(element) {
  document.getElementById("libraryHeader").style.background = element.value;
}

function appendHeader() {
  let firstname = document.getElementById("name").value;
  let color = document.getElementById("colorpicker").value;
  console.log(color);

  document.getElementById("header").style.display = "flex";
  document.getElementById("header").style.background = color;
  document.getElementById("header").innerText = firstname + "'s Library";
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

  /*document.getElementById('btn').addEventListener('click', function() {
    changeRead();
  })*/


  //Works the same way as the className property except it sets the source of the imageElement
  //imageElement.src = "https://source.unsplash.com/random";

  // This sets the value of an attribute specified element. If exists then will be updated, otherwise the new attribute is added with the specified name and value
  //btnElement.setAttribute("href", "#");
  //imageElement.setAttribute("alt", "Image from Unsplash");

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

  //imageContainer.appendChild(imageElement);
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
    cardElement.classList.add("card2");
    cardElement.addEventListener('transitionend', () => cardElement.remove());
    
    //outerLib.removeChild(cardElement);
  })

  bookCount++;
}

document.getElementById('button').addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'flex';
})

document.querySelector('.close').addEventListener('click', function () {
  document.querySelector('.bg-modal').style.display = 'none';
})

document.getElementById("colorpicker").addEventListener("onchange", () => setFromColorModal(this));

let introText = document.getElementById('introText');

/*introText.addEventListener('transitionend', () => introText.remove());*/

document.getElementById('newBookForm').onsubmit = function() { 
  let a = document.getElementById('title').value;
  let b = document.getElementById('author').value;
  let c = document.getElementById('pagelength').value;
  //let d = document.getElementById('finishedreading').value;
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

  appendHeader();

  if (document.getElementById("wrapper").contains(document.getElementById("introText"))) {
    console.log(document.getElementById("wrapper").contains(document.getElementById("introText")));

    introText.addEventListener('transitionend', function() {
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
    })

    introText.classList.add("introText2");  
  }

  return false;
};
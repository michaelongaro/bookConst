let myLibrary = ["1st", "2nd", "3rd"];

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
  console.log(myLibrary);

  // will need to add dynamic functionality of paradigm (XD) below up here to properly display new books.


}


function displayLibrary() {
  
}

Book.prototype.changeRead = function() {
  this.have_read = true;
}

document.getElementById('button').addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'flex';
})

document.querySelector('.close').addEventListener('click', function () {
  document.querySelector('.bg-modal').style.display = 'none';
})

document.getElementById('newBookForm').onsubmit = function() { 
  let a = document.getElementById('title').value;
  let b = document.getElementById('author').value;
  let c = document.getElementById('pagelength').value;
  let d = document.getElementById('finishedreading').value;

  addBookToLibrary(a, b, c, d);
  console.log("i have been run!");
  return false;
};


let bodyElement = document.body;
//The document.createElement() method create html elements specified by tagName
let cardElement = document.createElement('div');
let imageContainer = document.createElement('div');
let infoContainer = document.createElement('div');
let imageElement = document.createElement('img');
let headingElement = document.createElement('h5');
let paragraphElement = document.createElement('p');
let btnElement = document.createElement('a');

//The ClassName property gets and sets the value of the class attribute of the spefified element
cardElement.className = "card";
imageContainer.className = "image-container";
infoContainer.className = "info-container";
imageElement.className = "image";
headingElement.className = "heading";
paragraphElement.className = "paragraph";
btnElement.className = "btn";

//Works the same way as the className property except it sets the source of the imageElement
imageElement.src = "https://source.unsplash.com/random";

// This sets the value of an attribute specified element. If exists then will be updated, otherwise the new attribute is added with the specified name and value
btnElement.setAttribute("href", "#");
imageElement.setAttribute("alt", "Image from Unsplash");

headingElement.innerText = "Unsplash API";
paragraphElement.innerText = "This sets the value of an attribute specified element. If exists then will be updated.";
btnElement.innerText = "Learn more";

bodyElement.appendChild(cardElement);
cardElement.append(imageContainer, infoContainer);

imageContainer.appendChild(imageElement);
infoContainer.append(headingElement, paragraphElement, btnElement);
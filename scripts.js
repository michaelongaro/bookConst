let myLibrary = [];

let bookCount = 0;

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
  console.log(myLibrary[0].info());

  // will need to add dynamic functionality of paradigm (XD) below up here to properly display new books.


}

Book.prototype.changeRead = function() {
  this.have_read = !this.have_read;
}


function displayLibrary(a, b, c, d) {

  let bodyElement = document.body;
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
  deleteBookElement.id = "delBtn";

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
  btnElement.innerText = "Click to finish book";
  deleteBookElement.innerText = "Delete";

  // need to (?) find a way to either access just the delete button/card/book obj that i want to 
  //      or iterate through all books until you find the right one to delete <--- delete function specs
  // index number in myLibray = data-attribute - 1 | when iterating array, have to look for (maybe use 
  //                                                  querySelector()) attribute of 'data-number' = i-1;

  console.log("made it here!");

  cardElement.setAttribute("data-number", ++bookCount);

  outerLib.append(cardElement);
  cardElement.append(infoContainer);

  //imageContainer.appendChild(imageElement);
  infoContainer.append(headingElement, paragraphElement, pagesElement, completedElement, btnElement, deleteBookElement);

  // want to make this so that it targets only(? probably) the correct/newest del button/elem
  // maybe can also just give all delete buttons same treatment and then have another function 
  //            deal with the logic to decide which buttons correspond to which books!
  // gl, and you got this man. you will get through this. i promise <3
  document.getElementById('delBtn').addEventListener('click', function() {
    console.log(document.querySelectorAll("div[data-number]"));
  })
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
  //let d = document.getElementById('finishedreading').value;
  let d;
  console.log(document.getElementById('finishedreading').checked);
  if (document.getElementById('finishedreading').checked) {
    d = true;
  }
  else {
    d = false;
  }

  console.log("d is:" + d);

  addBookToLibrary(a, b, c, d);
  console.log("i have been run!");

  displayLibrary(a, b, c, d);

  return false;
};
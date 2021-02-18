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
function addBookToLibrary(title, author, pages, have_read) {
  myLibrary.append(new Book(title, author, pages, have_read));
  console.log(myLibrary);
}


function displayLibrary() {
  
}

Book.prototype.changeRead = function() {
  this.have_read = true;
}

document.getElementById('newBookForm').style.display = 'block';
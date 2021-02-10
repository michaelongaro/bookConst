function Book(title, author, pages, have_read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.have_read = have_read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.have_read};
  }
}

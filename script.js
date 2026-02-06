const myLibrary = [];

function Book(title, author, pages, isRead) {
  // the constructor...
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
}

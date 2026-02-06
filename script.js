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

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
}

function displaysBooks() {
  const libraryBody = document.querySelector("#library-body");
  libraryBody.innerHTML = "";

  myLibrary.forEach((book) => {
    const row = document.createElement("tr");
    const title = document.createElement("td");
    title.textContent = book.title;
    const author = document.createElement("td");
    author.textContent = book.author;
    const pages = document.createElement("td");
    pages.textContent = book.pages;
    const isRead = document.createElement("td");
    book.isRead == true
      ? (isRead.textContent = "YES")
      : (isRead.textContent = "NO");
    const actions = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "DELETE";
    deleteButton.addEventListener("click", () => {
      const index = myLibrary.findIndex((item) => item.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        saveLocal();
        displaysBooks();
      }
    });
    const changeStatusButton = document.createElement("button");
    changeStatusButton.innerText = "CHANGE STATUS";
    changeStatusButton.addEventListener("click", () => {
      book.toggleRead();
      saveLocal();
      displaysBooks();
    });

    actions.appendChild(deleteButton);
    actions.appendChild(changeStatusButton);

    row.appendChild(title);
    row.appendChild(author);
    row.appendChild(pages);
    row.appendChild(isRead);
    row.appendChild(actions);
    row.dataset.id = book.id;

    libraryBody.appendChild(row);
  });
}

const libraryForm = document.querySelector("#library-form");
libraryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isread = document.querySelector("#isread").checked;

  addBookToLibrary(title, author, pages, isread);
  saveLocal();
  displaysBooks();

  libraryForm.reset();

  modal.style.display = "none";
});

const modal = document.querySelector("#modal");
const openModalButton = document.querySelector("#new-book-button");
const closeModalButton = document.querySelector("#close-modal");

openModalButton.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

function saveLocal() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

const storedLibrary = localStorage.getItem("myLibrary");
if (storedLibrary) {
  const parsedLibrary = JSON.parse(storedLibrary);

  parsedLibrary.forEach((bookData) => {
    const newBook = new Book(
      bookData.title,
      bookData.author,
      bookData.pages,
      bookData.isRead,
    );

    newBook.id = bookData.id;

    myLibrary.push(newBook);
  });

  displaysBooks();
}

const resetButton = document.querySelector("#reset-button");

resetButton.addEventListener("click", () => {
  if (confirm("Are you sure? All your books will be deleted.")) {
    myLibrary.length = 0;

    localStorage.removeItem("myLibrary");

    displaysBooks();

    alert("Your library has been emptied.");
  }
});

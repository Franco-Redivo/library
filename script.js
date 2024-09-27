const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const hobit = new Book('Hobit', 'J.R.R. Tolkien', 295, 'not read yet');
const harryPotter = new Book('Harry Potter', 'J.K. Rowling', 400, 'read');

function addBookToLibrary(book){
    myLibrary.push(book);
}

addBookToLibrary(hobit);
addBookToLibrary(harryPotter);

const container = document.querySelector(".wrapper");


function displayBooks(){
    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h2>${book.title}</h2>
            <h3>Author: ${book.author}</h3>
            <p>Pages: ${book.pages}</p>
            <p>Status: <span>${book.read}</span></p>
            <button class="remove">Remove</button>
            <button class="change-status">Change status</button>
        `;
        container.appendChild(card);
    });
    const removeButton = document.querySelectorAll(".remove");
    const changeStatusButton = document.querySelectorAll(".change-status");

    removeButton.forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.parentElement;
            const title = card.querySelector("h2").textContent;
            const index = myLibrary.findIndex(book => book.title === title);
            myLibrary.splice(index, 1);
            container.innerHTML = "";
            displayBooks();
        });
    });

    changeStatusButton.forEach(button => {  
        button.addEventListener("click", (e) => {
            const card = e.target.parentElement;
            const title = card.querySelector("h2").textContent;
            const book = myLibrary.find(book => book.title === title);
            if(book.read === "read"){
                delete book.read;
                book.read = "not read yet";
            }else{
                delete book.read;
                book.read = "read";
            }
            container.innerHTML = "";
            displayBooks();
        });
    })
    
    
}

displayBooks();

const showButton = document.querySelector("#show-dialog");
const dialog = document.querySelector("#dialog");
const confirmButton = document.querySelector("#confirm-button");
const closeButton = document.querySelector(".close");


showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

confirmButton.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;

    if(title === "" || author === "" || pages === ""){
        alert("Please fill all the fields");
        return;
    }

    if(document.querySelector("#read").checked){
        var read = "read";
    } else {
        var read = "not read yet";
    }

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    container.innerHTML = "";
    displayBooks();

    dialog.close();
});
let books = JSON.parse(localStorage.getItem("books")) || [];

books.sort((a, b) => a.title.localeCompare(b.title, 'uk'));

displayBooks(books);

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function addBook() {
    const titleInput = document.getElementById("titleInput");
    const authorInput = document.getElementById("authorInput");

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (title === "" || author === "") {
        alert("Введіть назву і автора");
        return;
    }

    books.push({ title, author });

    books.sort((a, b) => a.title.localeCompare(b.title, 'uk'));

    saveBooks();

    titleInput.value = "";
    authorInput.value = "";

    displayBooks(books);
}

function displayBooks(bookArray) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    if (bookArray.length === 0) {
        bookList.innerHTML = "<li class='empty-item'>Книг не знайдено</li>";
        return;
    }

    for (let i = 0; i < bookArray.length; i++) {
        const li = document.createElement("li");
        li.className = "book-item";

        const text = document.createElement("span");
        text.className = "book-title";
        text.textContent = `${bookArray[i].title} — ${bookArray[i].author}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Видалити";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => confirmDelete(i);

        li.appendChild(text);
        li.appendChild(deleteBtn);

        bookList.appendChild(li);
    }
}

function confirmDelete(index) {
    const isConfirmed = confirm("Ви точно хочете видалити цю книгу?");

    if (isConfirmed) {
        books.splice(index, 1);
        saveBooks();
        searchBook();
    }
}

function searchBook() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchValue) ||
        book.author.toLowerCase().includes(searchValue)
    );

    displayBooks(filteredBooks);
}
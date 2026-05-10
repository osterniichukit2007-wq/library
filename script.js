let books = JSON.parse(localStorage.getItem("books")) || [];

let editIndex = null;

books.sort((a, b) => a.title.localeCompare(b.title, "uk"));

displayBooks(books);

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function showHome() {
    document.getElementById("homePage").classList.remove("hidden");
    document.getElementById("catalogPage").classList.add("hidden");
    document.getElementById("formPage").classList.add("hidden");
}

function showCatalog() {
    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("catalogPage").classList.remove("hidden");
    document.getElementById("formPage").classList.add("hidden");

    document.getElementById("searchInput").value = "";
    displayBooks(books);
}

function showBookForm(index = null) {
    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("catalogPage").classList.add("hidden");
    document.getElementById("formPage").classList.remove("hidden");

    const titleInput = document.getElementById("titleInput");
    const authorInput = document.getElementById("authorInput");
    const formTitle = document.getElementById("formTitle");

    editIndex = index;

    if (index !== null) {
        formTitle.textContent = "Редагувати книжку";
        titleInput.value = books[index].title;
        authorInput.value = books[index].author;
    } else {
        formTitle.textContent = "Додати книжку";
        titleInput.value = "";
        authorInput.value = "";
    }
}

function saveBook() {
    const titleInput = document.getElementById("titleInput");
    const authorInput = document.getElementById("authorInput");

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (title === "" || author === "") {
        alert("Введіть назву і автора книги");
        return;
    }

    if (editIndex !== null) {
        books[editIndex] = { title, author };
    } else {
        books.push({ title, author });
    }

    books.sort((a, b) => a.title.localeCompare(b.title, "uk"));

    saveBooks();

    titleInput.value = "";
    authorInput.value = "";
    editIndex = null;

    showCatalog();
}

function displayBooks(bookArray) {
    const bookList = document.getElementById("bookList");

    if (!bookList) return;

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

        const buttonBlock = document.createElement("div");
buttonBlock.className = "button-block";

const editBtn = document.createElement("button");
editBtn.textContent = "Редагувати";
editBtn.className = "edit-btn";

editBtn.onclick = () => {
    const realIndex = books.findIndex(book =>
        book.title === bookArray[i].title &&
        book.author === bookArray[i].author
    );

    showBookForm(realIndex);
};

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Видалити";
deleteBtn.className = "delete-btn";

deleteBtn.onclick = () => {
    const isConfirmed = confirm("Ви точно хочете видалити книгу?");

    if (isConfirmed) {
        const realIndex = books.findIndex(book =>
            book.title === bookArray[i].title &&
            book.author === bookArray[i].author
        );

        books.splice(realIndex, 1);

        saveBooks();

        searchBook();
    }
};

buttonBlock.appendChild(editBtn);
buttonBlock.appendChild(deleteBtn);

li.appendChild(text);
li.appendChild(buttonBlock);

bookList.appendChild(li);

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

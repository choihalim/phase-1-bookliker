const baseUrl = "http://localhost:3000/";
const booksUrl = baseUrl + 'books/';
const usersUrl = baseUrl + 'users/';

let users = [];

function fetchBooks() {
    fetch(booksUrl)
        .then(response => response.json())
        .then(booksData => renderBooks(booksData))
}

function fetchUsers() {
    fetch(usersUrl)
        .then(response => response.json())
        .then(usersData => {
            users = [...usersData]
            console.log(users)
        })
}

fetchBooks()
fetchUsers()

const renderBooks = (books) => {
    books.forEach(book => renderBookLi(book));
}

const renderBookLi = book => {
    const listUl = document.getElementById("list");
    const bookLi = document.createElement("li");
    listUl.appendChild(bookLi);
    bookLi.textContent = book.title;

    bookLi.onclick = () => showBookInformation(book);
}

function clearHTMLElement(element) {
    while (element.firstChild) {
        element.firstChild.remove()
    }
}

function renderUserLi(user, userUl) {
    let userLi = document.createElement("li");
    userUl.appendChild(userLi);
    userLi.textContent = user.username;
}

function showBookInformation(book) {
    const showPanel = document.getElementById("show-panel");
    clearHTMLElement(showPanel);

    const title = document.createElement("h1");
    const thumbnail = document.createElement("img");
    const subtitle = document.createElement("h3");
    const author = document.createElement("h4");
    const desc = document.createElement("p");
    const userUl = document.createElement("ul");
    const likeButton = document.createElement("button");

    title.textContent = book.title;
    thumbnail.src = book.img_url;
    desc.textContent = book.description;
    subtitle.textContent = book.subtitle;
    author.textContent = book.author;
    likeButton.textContent = "Like <3";


    book.users.forEach(user => renderUserLi(user, userUl));

    showPanel.appendChild(title);
    showPanel.appendChild(subtitle);
    showPanel.appendChild(author);
    showPanel.appendChild(thumbnail);
    showPanel.appendChild(desc);
    showPanel.appendChild(userUl);
    showPanel.appendChild(likeButton);

    likeButton.onclick = (e) => clickToLikeBook(book);
}

const clickToLikeBook = (book) => {
    let currentUser = users.find(user => user.id === 11);
    let userAlreadyLikesBook = book.users.find(user => user.id === currentUser.id)

    if (currentUser && userAlreadyLikesBook === undefined) {
        let updatedUsersForBook = [...book.users, currentUser];
        let updatedBook = { ...book, users: updatedUsersForBook };

        let postRequest = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(updatedBook)
        }

        fetch(booksUrl + book.id, postRequest)
            .then(response => response.json()
                .then(updatedBookData => showBookInformation(updatedBookData)))
    }
}

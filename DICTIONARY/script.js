// Function to search for a word definition
function searchWord() {
    const word = document.getElementById("wordInput").value;
    const wordResult = document.getElementById("wordResult");

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => {
            if (data.title && data.title === "No Definitions Found") {
                wordResult.innerHTML = "No definitions found.";
            } else {
                const definition = data[0].meanings[0].definitions[0].definition;
                wordResult.innerHTML = `<p>${definition}</p>`;
            }
            wordResult.classList.add("show");
        })
        .catch(error => {
            wordResult.innerHTML = "An error occurred. Please try again.";
            console.error("Error fetching word definition:", error);
        });
}

// Function to search for a book and display its details and image
function findBook() {
    const bookTitle = document.getElementById("bookInput").value;
    const bookResult = document.getElementById("bookResult");

    fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}`)
        .then(response => response.json())
        .then(data => {
            if (data.totalItems === 0) {
                bookResult.innerHTML = "No books found.";
            } else {
                const books = data.items;
                bookResult.innerHTML = books.map(book => {
                    const bookInfo = book.volumeInfo;
                    const bookImage = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "No image available";

                    return `
                        <div class="book-entry">
                            <h3>${bookInfo.title}</h3>
                            <p>By ${bookInfo.authors ? bookInfo.authors.join(", ") : "Unknown author"}</p>
                            <img src="${bookImage}" alt="Book Image">
                            <p>${bookInfo.description ? bookInfo.description : "No description available"}</p>
                        </div>
                    `;
                }).join("");
            }
            bookResult.classList.add("show");
        })
        .catch(error => {
            bookResult.innerHTML = "An error occurred. Please try again.";
            console.error("Error fetching book information:", error);
        });
}

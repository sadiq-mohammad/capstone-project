const apiBaseUrl = 'http://localhost:8080/api/books';  // Replace with your API URL

// Fetch all books and display them
const addBook = document.getElementById("add-book");
const editBook = document.getElementById("edit-book");
const displayData = document.getElementById("displayData");

addBook.style.display = "none";
displayData.style.display = "none";
editBook.style.display = "none";

async function getBooks() {
    displayData.style.display = "block";
    addBook.style.display = "none";
    try {
        const response = await fetch(apiBaseUrl);
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Display books in the table
function displayBooks(books) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear the table before adding new rows
    for (let i = 0; i < books.length; i++) {
        tableBody.innerHTML += `
                             <tr>
                               <td>${i + 1}</td>
                               <td>${books[i].title}</td>
                               <td>${books[i].author}</td> 
                               <td>${books[i].price}</td> 
                               <td><button type='submit' id='edit-btn' onclick='editBookForm(${JSON.stringify(
                                 books[i]
                               )})'>Edit</button>
                                   <button type='submit' id='dlt-btn' onclick='bookDelete("${
                                     books[i]._id
                                   }")'>Delete</button>
                                </td> 
                              </tr>`;
      }
}

// Show the form to create a new book
function bookForm() {
    document.getElementById('add-book').style.display = 'block';
    document.getElementById('edit-book').style.display = 'none';
    displayData.style.display='none'
}

// Handle Add Book form submission
document.getElementById('addBookForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const price = document.getElementById('price').value;

    const newBook = { title, author, price };

    try {
        const response = await fetch(apiBaseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook),
        });
        const addedBook = await response.json();
        getBooks();  // Refresh the list of books after adding
    } catch (error) {
        console.error('Error adding book:', error);
    }
});

// Show the Edit form with existing book details
async function editBookForm(bookId) {
     console.log(bookId)
        editBook.style.display = "block";
        const response = await fetch(`${apiBaseUrl}/${bookId}`);
        
        booktoUpdate=bookId
        // Populate the edit form with the book's data
        document.getElementById('updateTitle').value = bookId.title;
        document.getElementById('updateAuthor').value = bookId.author;
        document.getElementById('updatePrice').value = bookId.price;
}
async function updateBook() {
    editBook.style.display = "none";
    let { _id } = booktoUpdate;
    const editBookForm = {
      title: document.getElementById("updateTitle").value,
      author: document.getElementById("updateAuthor").value,
      price: document.getElementById("updatePrice").value,
    }
    await fetch(`${apiBaseUrl}/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editBookForm),
    });
    await getBooks();
  }

// Delete a book
async function bookDelete(bookId) {
    await fetch(`${apiBaseUrl}/${bookId}`, {
      method: "DELETE",
    });
    await getBooks();
  }





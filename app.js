// class Book {
//     constructor(title, author, isbn) {
//         this.title = title;
//         this.author = author;
//         this.isbn = isbn;
//     }
// }
//
//
// class UI {
//     addBook(book) {
//
//         const list = document.getElementById('book-list');
//         const row = document.createElement('tr');
//         row.innerHTML = `
//         <td>${book.title}</td>
//         <td>${book.author}</td>
//         <td>${book.isbn}</td>
//         <td><a href="#" class="delete">X</a></td>
//         `
//         list.appendChild(row);
//
//     }
//
//     showAlert(message, className) {
//         const div = document.createElement('div');
//         div.className = `alert ${className}`;
//         div.appendChild(document.createTextNode(message));
//         const container = document.querySelector('.container');
//         const form = document.querySelector('#book-form');
//         container.insertBefore(div, form);
//         setTimeout(() => {
//             document.querySelector('.alert').remove()
//         }, 3000);
//
//     }
//
//     deleteBook(target) {
//         if (target.className === 'delete') {
//             target.parentElement.parentElement.remove();
//         }
//     }
//
//     clearFields() {
//         document.getElementById('title').value = '';
//         document.getElementById('author').value = '';
//         document.getElementById('isbn').value = '';
//     }
// }
//
// class Store {
//     static getBook() {
//         let books;
//         if (localStorage.getItem('books' === null)) {
//             books = [];
//         } else {
//             books = JSON.stringify(localStorage.getItem('books'))
//         }
//         return books;
//     }
//
//     static displayBook() {
//
//     }
//
//     static addBook() {
// const books = Store.getBook();
// books.push(book);
// localStorage.setItem('books', JSON.stringify(books))
//     }
//
//     static removeBook() {
//
//     }
//
// }
//
// //event listener for add book
//
// document.addEventListener('submit', function (e) {
//     const title = document.getElementById('title').value,
//         author = document.getElementById('author').value,
//         isbn = document.getElementById('isbn').value;
//
//
//     const book = new Book(title, author, isbn),
//         ui = new UI();
//
//
//     if (title === '' || author === '' || isbn === '') {
//         ui.showAlert('Please fill all the field', 'error')
//     } else {
//         ui.addBook(book);
//         Store.addBook(book);
//         ui.showAlert('Add book successfully!', 'success');
//         ui.clearFields();
//     }
//
//     e.preventDefault()
// })
//
//
// //event listener for delete book
//
// document.getElementById('book-list').addEventListener("click", function (e) {
//
//     const ui = new UI();
//     ui.deleteBook(e.target);
//     ui.showAlert('Book removed', 'success');
//
//     e.preventDefault();
// })


class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


class UI {

    addBook(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML =
            `<td>${book.title}</td>
             <td>${book.author}</td>
             <td>${book.isbn}</td>
             <td><a href="#" class="delete">X</a></td>`

        list.appendChild(row);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 3000)
    }

}


class Store {
    static getBook() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }

   static displayBook() {
       const books = Store.getBook();
       books.forEach(function (book) {
           const ui = new UI;
           ui.addBook(book);

       })
    }

    static addBookToStore(book) {
        const books = Store.getBook();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }


    static removeBook(isbn) {
        const books = Store.getBook();
        books.forEach(function (book, index) {
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }

}

document.addEventListener('DOMContentLoaded', Store.displayBook);


//add event listener
document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    const ui = new UI;
    const book = new Book(title, author, isbn);

    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Fill the form', 'error')
    } else {
        ui.addBook(book);
        Store.addBookToStore(book);
        ui.showAlert('Add book successfully', 'success');
        ui.clearFields();
    }
    e.preventDefault();
})


//add delete event
document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI;

    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    ui.showAlert('Book Deleted', 'error');
    e.preventDefault();
})

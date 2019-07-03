//---------------------------Selectors------------------------------
const form = document.querySelector('.form-body');
const title = document.querySelector('#title-input');
const author = document.querySelector('#author-input');
const isbn = document.querySelector('#isbn-input');
const collection = document.querySelector('.collection');
const container = document.querySelector('.container');


//-------------------------Consturctors--------------------------------
class Book {
  constructor(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
  }
}

class UI {

  addBookToList(book) {
  // Create tr Element
  const row = document.createElement('tr');

  // Create HTML
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href = "#" class = "delete"><i class = "fa fa-remove red"></i></a></td>
  `;

  collection.appendChild(row);
  }

  clearFields(){
    title.value = '';
    author.value = '';
    isbn.value = '';
  }

  showAlert(message, className){
  // Create div
  const div = document.createElement('div');
  // Add Class
  div.className = `alert ${className}`;
  // Add Text
  div.appendChild(document.createTextNode(message));

  // The insertBefore() method inserts a node as a child, right before an existing child, which you specify.
  // node.insertBefore(newnode, existingnode)
  container.insertBefore(div, form);

  // Time out of alert display
  setTimeout(function(){

    document.querySelector('.alert').remove();

    }, 3000);
  }

  deleteBook(target) {
    if(target.classList.contains('fa-remove')){

      if(confirm(`Remove this Book?`)){
  
        target.parentElement.parentElement.parentElement.remove();
      }
    }
  }
}

// --------------------------Store to Local Storage-----------------------------

class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();


    books.forEach(function(book){

      // Instanciate UI
      const ui = new UI();

      // addBookToList method from UI 
      ui.addBookToList(book);

    });
  }

  static addBook(book){
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static deleteBook(isbn){
    const books = Store.getBooks();

    books.forEach(function(book, index){

    if(book.isbn === isbn){
      books.splice(index, 1);
    }

    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}



//-------------------------------Event Listners---------------------------------

form.addEventListener('submit', getBook);

collection.addEventListener('click', removeBook);

Store.displayBooks();

//--------------------------Functions and Methods----------------------------

// Add a Book
function getBook(e){

  // Get the Values
  const titleVal = title.value;
  const authorVal = author.value;
  const isbnVal = isbn.value;

 

  // Validate 
  if(titleVal === '' || authorVal === '' || isbnVal === ''){

    const ui = new UI();
    ui.showAlert('Please Fill In All the Fields', 'error');

  } else {

    // Book Instance
    const book = new Book(titleVal,authorVal,isbnVal);

    const ui = new UI();

    ui.addBookToList(book);
    ui.clearFields();
    ui.showAlert('Book Added', 'success');

    // Add Book to LS
    Store.addBook(book);
  }
  e.preventDefault();
}




// Remove a Book
function removeBook(e){

  Store.deleteBook(e.target.parentElement.parentElement.previousElementSibling.textContent);

  
  const ui = new UI();

  ui.deleteBook(e.target);
  ui.showAlert('Book Deleted', 'success');

  e.preventDefault();

}




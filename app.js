//---------------------------Selectors---------------------------------
const form = document.querySelector('.form-body');
const title = document.querySelector('#title-input');
const author = document.querySelector('#author-input');
const isbn = document.querySelector('#isbn-input');
const collection = document.querySelector('.collection');
const container = document.querySelector('.container');





//-------------------------- Constructors-------------------------
// Book Object
function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// User Interface
// This is creation of UI Object with no initial values inside
function UI(){}

// This is all the prototype/ added values and methods for the UI Objects
UI.prototype.addBookTolist = function(book){
  
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

UI.prototype.clearFields = function(){
  title.value = '';
  author.value = '';
  isbn.value = '';
}

UI.prototype.showAlert = function(message, className){
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

UI.prototype.deleteBook = function(target){

  if(target.classList.contains('fa-remove')){

    if(confirm('remove this data?')){

      target.parentElement.parentElement.parentElement.remove();
    }
  }
}



//-------------------------------Event Listners---------------------------------

form.addEventListener('submit', getBook);

collection.addEventListener('click', removeBook);





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

    ui.addBookTolist(book);
    ui.clearFields();
    ui.showAlert('Book Added', 'success');
  }
  e.preventDefault();
}




// Remove a Book
function removeBook(e){

  
  const ui = new UI();

  ui.deleteBook(e.target);
  ui.showAlert('Book Deleted', 'success');

  e.preventDefault();

}
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Book from './Book'

class ListBooks extends Component {

	render(){
    const shelves = this.props.shelves
    const books = this.props.books

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        {shelves.map((shelf) => (
          <div className="bookShelf" key={shelf.id}>
            <h2 className="bookshelf-title">{shelf.name}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.filter((book) => book.shelf === shelf.id).map((book) =>
									<li key={book.id}>
										<Book book={book}
										updateShelf={(book,shelf) => {this.props.updateShelf(book,shelf)}}/>
									</li>
                )}
              </ol>
            </div>
          </div>
        ))}

				<div className="open-search">
          <Link to='/search' className='open-search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks

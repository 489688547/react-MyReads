import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import BooksSearch from './BooksSearch'
import { Route } from 'react-router-dom'



class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:[],
    shelves: [
      {
        "id": "currentlyReading",
        "name": "Currently Reading"
      },
      {
        "id": "wantToRead",
        "name": "Want to Read"
      },
      {
        "id": "read",
        "name": "Read"
      }
    ]
  }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf = (book, newShelf) => {
		BooksAPI.update(book, newShelf);
		if ( newShelf==="none" ){
			this.setState(state => ({
        books: state.books.filter((b) => b.id !== book.id)
      }))
    }
		else {
      book.shelf = newShelf;
			this.setState(state => ({
				books: state.books.filter((b) => b.id !== book.id).concat(book)
      }))
		}
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
					<BooksSearch books={this.state.books}
            updateShelf={(book,shelf) => {
              this.updateShelf(book,shelf)
              }}
            />
  				)}
        />

        <Route exact path="/" render={()=> (
          <ListBooks books={this.state.books} shelves={this.state.shelves}
            updateShelf={(book,shelf) => {
              this.updateShelf(book,shelf)}}
          />
          )}
        />
      </div>
    )
  }
}

export default BooksApp

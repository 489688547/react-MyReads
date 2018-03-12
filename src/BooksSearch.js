import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'
import Book from './Book'

class BooksSearch extends Component {

  state = {
    query: '',
    searchBooks:[]
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })

    if (query === "") {
      this.setState({searchBooks: []});
    }
    else {
      BooksAPI.search(query,20).then((books) => {
          books.error? this.setState({searchBooks: [] }) : this.setState({searchBooks: books})
      })
    }
  }

  updateSearch = (book, newShelf) => {
		this.props.updateShelf(book,newShelf)
		this.setState(state => ({
      searchBooks: state.searchBooks.filter((b) => b.id !== book.id)
    }))
  }


  render(){
    const {query,searchBooks} = this.state
    const books = this.props.books

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = searchBooks.filter((c) => match.test(c.title))

      for (let i = 0; i < searchBooks.length; i++) {
        for (let j = 0; j < books.length; j++) {
          if (searchBooks[i].id === books[j].id) {
            searchBooks[i].shelf = books[j].shelf;
            break;
          }
          else {
            searchBooks[i].shelf = 'none';
          }
        }
      }
    }
    else {
      showingBooks = searchBooks
    }

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { showingBooks.sort(sortBy('title')).map( (book) => (
              <li key={book.id}>
                <Book book={book}
                updateShelf={(book,shelf) => {this.updateSearch(book,shelf)}}/>
              </li>
       			))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BooksSearch

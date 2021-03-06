import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { search } from './BooksAPI.js'
import { get } from './BooksAPI.js'
import { update } from './BooksAPI.js'
import { shelfList } from './ListBooks.js'

class SearchBooks extends Component {

  state = {
    books: []
  }

  // Function for the change event of the search bar
  onChangeSearch(ev, t) {
    search(ev.target.value).then((list) => {
      t.setState({
        books: list
      })
    })
  }

  /* Function for the change event of a shelf list
   * find the selected book anche update shelfList, the data in the serveer and state.books
   */
  onChange(ev, t) {
    let selectedTitle = ev.target.parentNode.parentNode.nextSibling.innerHTML
    let targetValue = ev.target.value
    let selectedbook = t.state.books.find(book => book.title === selectedTitle)
    selectedbook.shelf = targetValue
    update(selectedbook, targetValue)
    shelfList[selectedbook.id] = targetValue
    t.setState(t.state.books)
  }

  // Switch function for the selection of the right shelf list
  switchFunction(book) {
    switch(shelfList[book.id]) {
      case "currentlyReading":
        return (
          <select onChange={(e) => this.onChange(e, this)}>
            <option value="move" disabled>&emsp;Move to...</option>
            <option value="currentlyReading">✔ Currently Reading</option>
            <option value="wantToRead">&emsp;Want to Read</option>
            <option value="read">&emsp;Read</option>
            <option value="none">&emsp;None</option>
          </select>
        )
      case "wantToRead":
        return (<select defaultValue="wantToRead" onChange={(e) => this.onChange(e, this)}>
          <option value="move" disabled>&emsp;Move to...</option>
          <option value="currentlyReading">&emsp;Currently Reading</option>
          <option value="wantToRead">✔ Want to Read</option>
          <option value="read">&emsp;Read</option>
          <option value="none">&emsp;None</option>
        </select>)
      case "read":
        return (<select defaultValue="read" onChange={(e) => this.onChange(e, this)}>
          <option value="move" disabled>&emsp;Move to...</option>
          <option value="currentlyReading">&emsp;Currently Reading</option>
          <option value="wantToRead">&emsp;Want to Read</option>
          <option value="read">✔ Read</option>
          <option value="none">&emsp;None</option>
        </select>)
      case "none":
        return (<select defaultValue="none" onChange={(e) => this.onChange(e, this)}>
          <option value="move" disabled>&emsp;Move to...</option>
          <option value="currentlyReading">&emsp;Currently Reading</option>
          <option value="wantToRead">&emsp;Want to Read</option>
          <option value="read">&emsp;Read</option>
          <option value="none">✔ None</option>
        </select>)
      case undefined:
        return (<select defaultValue="none" onChange={(e) => this.onChange(e, this)}>
          <option value="move" disabled>&emsp;Move to...</option>
          <option value="currentlyReading">&emsp;Currently Reading</option>
          <option value="wantToRead">&emsp;Want to Read</option>
          <option value="read">&emsp;Read</option>
          <option value="none">✔ None</option>
        </select>)
    }
  }

  render() {
   return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={(e) => this.onChangeSearch(e, this)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books!== undefined && this.state.books.error === undefined && this.state.books.map((book) => {
              return (
                <li key={ book.id }>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        {this.switchFunction(book)}
                      </div>
                    </div>
                    <div className="book-title">{ book.title }</div>
                    <div className="book-authors">{(book.authors) ? book.authors.join(", ") : ""}</div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks

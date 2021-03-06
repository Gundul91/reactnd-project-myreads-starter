import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAll } from './BooksAPI.js'
import { update } from './BooksAPI.js'

class ListBooks extends Component {

  state = {
    books: []
  }

  //Fill the books list and the shelfList
  componentDidMount() {
    getAll().then((list) => {
      this.setState({
        books: list
      })
      list.forEach((el) => {
        shelfList[el.id] = el.shelf
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
    shelfList[selectedbook.id] = targetValue
    update(selectedbook, targetValue)
    t.setState(t.state.books)
  }

  getList() {
    return this.state.books
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books.map((book) => {
                    if(book.shelf === "currentlyReading") {
                      return (
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                              <div className="book-shelf-changer">
                                <select onChange={(e) => this.onChange(e, this)}>
                                  <option value="move" disabled>&emsp;Move to...</option>
                                  <option value="currentlyReading">✔ Currently Reading</option>
                                  <option value="wantToRead">&emsp;Want to Read</option>
                                  <option value="read">&emsp;Read</option>
                                  <option value="none">&emsp;None</option>
                                </select>
                              </div>
                            </div>
                            <div className = "book-title">{ book.title }</div>
                            <div className = "book-authors">{(book.authors) ? book.authors.join(", ") : ""}</div>
                          </div>
                        </li>
                      )
                    } else {
                      return null
                    }
                  })}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books.map((book) => {
                    if(book.shelf === "wantToRead") {
                      return (
                        <li key={ book.id }>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                              <div className="book-shelf-changer">
                                <select defaultValue="wantToRead" onChange={(e) => this.onChange(e, this)}>
                                  <option value="move" disabled>&emsp;Move to...</option>
                                  <option value="currentlyReading">&emsp;Currently Reading</option>
                                  <option value="wantToRead">✔ Want to Read</option>
                                  <option value="read">&emsp;Read</option>
                                  <option value="none">&emsp;None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{ book.title }</div>
                            <div className="book-authors">{(book.authors) ? book.authors.join(", ") : ""}</div>
                          </div>
                        </li>
                      )
                    } else {
                      return null
                    }
                  })}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books.map((book) => {
                    if(book.shelf === "read") {
                      return (
                        <li key={ book.id }>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                              <div className="book-shelf-changer">
                                <select defaultValue="read" onChange={(e) => this.onChange(e, this)}>
                                  <option value="move" disabled>&emsp;Move to...</option>
                                  <option value="currentlyReading">&emsp;Currently Reading</option>
                                  <option value="wantToRead">&emsp;Want to Read</option>
                                  <option value="read">✔ Read</option>
                                  <option value="none">&emsp;None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{ book.title }</div>
                            <div className="book-authors">{(book.authors) ? book.authors.join(", ") : ""}</div>
                          </div>
                        </li>
                      )
                    } else {
                      return null
                    }
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export let shelfList = {}
export default ListBooks

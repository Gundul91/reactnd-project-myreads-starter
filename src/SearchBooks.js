import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { search } from './BooksAPI.js'

class SearchBooks extends Component {

  state = {
    books: []
  }

  onChange(ev, t) {
    search(ev.target.value).then((list) => {
      t.setState({
        books: list.map((book) => {
          return {
            title: book.title,
            authors: book.authors,
            image: book.imageLinks.thumbnail,
            shelf: book.shelf
          }
        })
      })
    })
  }

  switchFunction(book) {
    switch(book.shelf) {
      case "currentlyReading":
        return (
          <select>
            <option value="move" disabled>&emsp;Move to...</option>
            <option value="currentlyReading">✔ Currently Reading</option>
            <option value="wantToRead">&emsp;Want to Read</option>
            <option value="read">&emsp;Read</option>
            <option value="none">&emsp;None</option>
          </select>
        )
      case "wantToRead":
        return (<select>
          <option value="move" disabled>&emsp;Move to...</option>
          <option value="currentlyReading">&emsp;Currently Reading</option>
          <option value="wantToRead">✔ Want to Read</option>
          <option value="read">&emsp;Read</option>
          <option value="none">&emsp;None</option>
        </select>)
      case "read":
        return (<select>
          <option value="move" disabled>&emsp;Move to...</option>
          <option value="currentlyReading">&emsp;Currently Reading</option>
          <option value="wantToRead">&emsp;Want to Read</option>
          <option value="read">✔ Read</option>
          <option value="none">&emsp;None</option>
        </select>)
      case "none":
        return (<select>
          <option value="move" disabled>&emsp;Move to...</option>
          <option value="currentlyReading">&emsp;Currently Reading</option>
          <option value="wantToRead">&emsp;Want to Read</option>
          <option value="read">&emsp;Read</option>
          <option value="none">✔ None</option>
        </select>)
      case undefined:
        return (<select>
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
            <input type="text" placeholder="Search by title or author" onChange={(e) => this.onChange(e, this)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => {
              return (
                <li key={book.title + ((book.authors) ? book.authors.join(", ") : "")}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.image})` }}></div>
                      <div className="book-shelf-changer">
                        {this.switchFunction(book)}
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
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

// AGGIUNGERE LA FUNZIONE DI RICERCA E AGGIUNTA DEGLI ELEMENTI RECUPERANDO FUNZIONI DA ListBooks


export default SearchBooks

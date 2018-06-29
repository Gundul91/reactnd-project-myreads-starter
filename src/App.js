import React from 'react'
import SearchBooks from './SearchBooks.js'
import ListBooks from './ListBooks.js'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={ListBooks}/>
        <Route exact path="/search" component={SearchBooks}/>
      </div>
    )
  }
}

export default BooksApp

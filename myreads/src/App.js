import React, {Component} from 'react';
import './App.css';
import ListBooks from "./bookcomponents/ListBooks";
import {Route} from "react-router-dom";
import * as BookAPI from "./API/BookAPI";
import SearchBooks from "./searchcomponents/SearchBooks";

class App extends Component {

    state = {
        books:[]
    }

    componentDidMount(){
        BookAPI.getAll().then((books) => {
            this.setState({
                books: books
            });
        });

    }

    changeShelf = (bookSelected, newShelf) => {

        const books = this.state.books;

        let bookOnShelf = false;

        books.forEach((book) => {
           if(book.id === bookSelected.id){
               book.shelf = newShelf;
               bookOnShelf = true;
           }
        });

        if(!bookOnShelf){
            bookSelected.shelf = newShelf;
            books.push(bookSelected);
        }

        this.setState({
            books: books
        });

        BookAPI.update(bookSelected, newShelf);
    }

    render() {
        return (
            <div>
                <Route exact path="/"
                       render={() => {
                           return(
                               <ListBooks
                                   books={this.state.books}
                                   handleShelfChange={this.changeShelf}
                                />
                           )

                       }}
                />
                <Route path="/search"
                       render={({history}) => {
                           return (
                               <SearchBooks
                                   handleBookAddition={this.changeShelf}
                               />
                           )
                       }}
                />
            </div>

        );
    }
}

export default App;

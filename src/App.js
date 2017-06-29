import React, { Component } from 'react';
import CharactersTable from './components/CharactersTable';
import Header from './components/Header';
import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {characters} from './reducers/characters';
import './css/App.css';

const peopleStore = createStore(characters, applyMiddleware(thunkMiddleware));
const planetStore = createStore(characters, applyMiddleware(thunkMiddleware));

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title={"Star Wars"}/>
        <div className="App-intro">
        <br/>
          <input className="App-search-box"
                 type="text"
                 name="searchBox"
                 placeholder="Type here your favorite character"
                 autoFocus/>

          <CharactersTable peopleStore={peopleStore} planetStore={planetStore}/>
        </div>
      </div>
    );
  }
}

export default App;

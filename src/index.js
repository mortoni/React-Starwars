import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Character from './components/Character';
import registerServiceWorker from './registerServiceWorker';
import {Router,Route,browserHistory} from 'react-router';
import './css/index.css';

// ReactDOM.render(<App />, document.getElementById('root'));


ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path="/:char/details" component={Character}/>
    </Router>
  ),
  document.getElementById('root')
);
registerServiceWorker();

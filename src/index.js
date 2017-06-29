import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Details from './components/Details';
import registerServiceWorker from './registerServiceWorker';
import {Router,Route,browserHistory} from 'react-router';
import './css/index.css';

// ReactDOM.render(<App />, document.getElementById('root'));


ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path="/:char/details" component={Details}/>
    </Router>
  ),
  document.getElementById('root')
);
registerServiceWorker();

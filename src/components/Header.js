import React, { Component } from 'react';
import logo from '../imgs/logo.svg';

export default class Header extends Component {
  render(){
      return (
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.props.title}</h2>
        </div>
      );
    }
}

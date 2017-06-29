import React, { Component } from 'react';
import swapi from '../logic/swapi';
import {browserHistory} from 'react-router';

export default class CharactersTable extends Component {

  constructor(props){
    super(props);
    this.state = { people : [], planets : [] };
  }

  componentWillMount(){
    this.props.peopleStore.subscribe(() => {
      this.setState({ people : this.props.peopleStore.getState() });
    });

    this.props.planetStore.subscribe(() => {
      this.setState({ planets : this.props.planetStore.getState() });
    });
  }

  componentDidMount(){
    if(this.props.peopleStore.getState().length === 0){
      this.Peopleloader();
    } else {
      this.props.peopleStore.dispatch(swapi.addPeople(this.props.peopleStore.getState()));
    }

    if(this.props.planetStore.getState().length === 0){
      this.Planetloader();
    } else {
      this.props.planetStore.dispatch(swapi.addPlanet(this.props.planetStore.getState()));
    }
  }

  Planetloader(){
    let urlPlanets = 'http://swapi.co/api/planets/?page=';
    let promises = [];
    let planets = [];

    for (var i = 1; i < 7; i++) {
      promises.push(fetch(urlPlanets + i));
    }

    Promise
      .all(promises)
      .then((response) => {
        let planetPromises = [];

        for (var i = response.length - 1; i >= 0; i--) {
          planetPromises.push(response[i].json());
        }

        return Promise.all(planetPromises);
      })
      .then((pl) => {
        for (var i = 0; i < pl.length; i++) {
          planets = planets.concat(pl[i].results);
        }
        this.props.planetStore.dispatch(swapi.addPlanet(planets));
      });
  }

  Peopleloader(){
    let urlPeople = 'http://swapi.co/api/people/?page=';
    let promises = [];
    let people = [];

    for (var i = 1; i < 10; i++) {
      promises.push(fetch(urlPeople + i));
    }

    Promise
      .all(promises)
      .then((response) => {
        let peoplePromises = [];

        for (var i = response.length - 1; i >= 0; i--) {
          peoplePromises.push(response[i].json());
        }

        return Promise.all(peoplePromises);
      })
      .then((p) => {
        for (var i = 0; i < p.length; i++) {
          p[i].results.forEach((pe) => {
            pe.comments = [];
            pe.rate = 0;
          });
          people = people.concat(p[i].results);
        }
        this.props.peopleStore.dispatch(swapi.addPeople(people));
      });
  }

  getPlanetName(char) {
    return this.state.planets.find((planet) => {
        return planet.url === char.homeworld;
      }).name;
  }

  selectChar = (char) => {
    browserHistory.push({
      pathname: char.name+'/details',
      state: { character: char, planets: this.state.planets}
    });
  }

  render(){
    if(this.state.people.length === 0 || this.state.planets.length === 0) return null;

    return (
      <table className="App-character-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Planet</th>
          </tr>
        </thead>
        <tbody>
          {this.state.people.map(char =>
            <tr key={char.name} className="border_bottom" onClick={()=>this.selectChar(char)}>
              <td>{char.name}</td>
              <td>{this.getPlanetName(char)}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

import React, { Component } from 'react';
import swapi from '../logic/swapi';
import {browserHistory} from 'react-router';

export default class CharactersTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      people : [],
      planets : [],
      search : ''
    };

    this.handleChange = this.handleChange.bind(this);
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
      this.peopleLoader();
    } else {
      this.props.peopleStore.dispatch(swapi.addPeople(this.props.peopleStore.getState()));
    }

    if(this.props.planetStore.getState().length === 0){
      this.planetLoader();
    } else {
      this.props.planetStore.dispatch(swapi.addPlanet(this.props.planetStore.getState()));
    }
  }

  handleChange(event) {
    this.setState({ search: event.target.value });
  }

  planetLoader(){
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

  peopleLoader(){
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
            pe.upvote = 0;
            pe.downvote = 0;
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
      pathname: char.name + '/details',
      state: {
        selected: char,
        people: this.state.people,
        planets: this.state.planets,
        peopleStore: this.props.peopleStore
      }
    });
  }

  getRate(char) {
    if(char.upvote === 0) {
      return 0;
    } else {
      return Math.trunc((char.upvote / (char.upvote + char.downvote)) * 100);
    }
  }

  filterByName(char) {
    if(this.state.search.length > 0) {
      return char.name.toLowerCase().includes(this.state.search.toLowerCase());
    }

    return true;
  }

  render(){
    if(this.state.people.length === 0 || this.state.planets.length === 0) return null;

    const items = this.state.people
            .sort((a, b) => this.getRate(a) - this.getRate(b))
            .filter((char) => {return this.filterByName(char)})
            .reverse()
            .map((char) =>
              <tr key={char.name} className="border_bottom" onClick={ ()=>this.selectChar(char) }>
                <td>{char.name}</td>
                <td>{this.getPlanetName(char)}</td>
              </tr>
            );

    return (
      <div>
        <input className="Search-box"
               type="text"
               name="searchBox"
               value={this.state.search}
               onChange={this.handleChange}
               placeholder="Type here your favorite character"
               autoFocus/>

        <table className="Characters-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Planet</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </div>
    );
  }
}

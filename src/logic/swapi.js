export default class swapi {
  static addPeople(people) {
    return dispatch => {
      dispatch({ type: 'ADD_PEOPLE', people });
      return people;
    }
  }

  static addPlanet(planets) {
    return dispatch => {
      dispatch({ type: 'ADD_PLANETS', planets });
      return planets;
    }
  }
}

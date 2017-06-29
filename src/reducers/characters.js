export function characters(state=[],action) {
  if (action.type === 'ADD_PEOPLE') {
    return action.people;
  }

  if (action.type === 'ADD_PLANETS') {
    return action.planets;
  }

  return state;
}

export function characters(state=[],action) {
  if (action.type === 'ADD_PEOPLE') {
    return action.people;
  }

  return state;
}

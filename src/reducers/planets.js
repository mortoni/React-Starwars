export function planets(state=[],action) {
  if (action.type === 'ADD_PLANETS') {
    return action.planets;
  }

  return state;
}

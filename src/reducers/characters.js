export function characters(state=[],action) {
  if (action.type === 'ADD_PEOPLE') {
    return action.people;
  }

  if (action.type === 'UP_VOTE') {
    state[action.selected].upvote++;
    return state;
  }

  if (action.type === 'DOWN_VOTE') {
    state[action.selected].downvote++;
    return state;
  }

  if (action.type === 'POST_COMMENT') {
    state[action.selected].comments.push(action.comment);
    return state;
  }

  return state;
}

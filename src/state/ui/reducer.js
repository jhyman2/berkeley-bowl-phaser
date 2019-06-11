// Reducers
const initialState = {
  collisions: {
    mainBlock: false,
  },
  health: 100,
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case 'COLLIDE_ENEMY':
      const newState = { ...state }; // todo: real deep copy

      newState.collisions[action.enemy] = true;
      newState.health--;
      return newState;
    default:
      return state;
  }
}
export const UPDATE = 'GAMESCORE/UPDATE';

const initalState = {
  isUpdate: false,
};

const gameScore = (state = initalState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        isUpdate: action.isUpdate,
      };

    default:
      return state;
  }
};

export default gameScore;

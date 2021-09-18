export const SAVE_GAME_REQUESTED = 'player/SAVE_GAME_REQUESTED'
export const SAVE_GAME = 'player/SAVE_GAME'

const initialState = {
  gameLog: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_GAME_REQUESTED:
      return {
        ...state,
      }

    case SAVE_GAME:
      return {
        ...state,
        gameLog: action.gameLog,
      }

    default:
      return state
  }
}

export const saveGameLog = (gameLog) => {
  return dispatch => {
    dispatch({
      type: SAVE_GAME_REQUESTED
    })

    dispatch({
      type: SAVE_GAME,
      gameLog
    })
  }
}






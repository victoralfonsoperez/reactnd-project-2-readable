export const CREATE_POST = 'CREATE_POST'

const initialState = {

}

function posts (state = initialState, action) {
    if (action.type === CREATE_POST) {
      return {
        ...state,
        name: 'Tyler'
      };
    }
  
    return state;
  }

export default posts
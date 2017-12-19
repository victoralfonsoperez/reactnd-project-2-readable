import {
    CREATE_POST,
    DELETE_POST,
    GET_ALL_POSTS
} from '../actions'

const initialState = {
    categories: [],
    posts: [],
    postComments: []
}

function initialPosts (state = initialState, action) {
    const { id } = action

    switch (action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        case CREATE_POST:
            return {
                ...state,
                [id]: {
                    ...state[id]
                }
            }
        case DELETE_POST:
            return {
                ...state,
                [id]: {
                    ...state[id]
                }
            }
        default:
            return state
    }
  }

export default initialPosts

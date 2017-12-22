import {
    CREATE_POST,
    DELETE_POST,
    GET_ALL_POSTS,
    GET_ALL_CATEGORIES
} from '../actions'

function initialPosts (state = {}, action) {
    const { id, posts, post, categories } = action

    switch (action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                posts
            }
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories
            }
        case CREATE_POST:
            return {
                ...state,
                posts: [
                    ...state.posts.concat( [post] )
                ]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: [
                    ...state.posts.filter(post => post.id !== id)
                ]
            }
        default:
            return state
    }
  }

export default initialPosts

import {
    CREATE_POST,
    DELETE_POST,
    GET_ALL_POSTS,
    GET_ALL_CATEGORIES,
    CURRENT_POST,
    EDIT_POST
} from '../actions'

function initialPosts (state = {posts: [], categories: [], currentpost: {}}, action) {
    const { id, posts, post, categories } = action

    switch (action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                posts: posts
            }
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: categories
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
        case CURRENT_POST:
            return {
                ...state,
                currentpost: post
            }
        case EDIT_POST:
            return {
                ...state,
                posts: [
                    ...state.posts.map(currentpost => currentpost.id === action.post.id ? {
                        ...currentpost, title: action.post.title,
                        body: action.post.body,
                        author: action.post.author,
                        category: action.post.category,
                    } : currentpost)
                ]
            }
        default:
            return state
    }
  }

export default initialPosts

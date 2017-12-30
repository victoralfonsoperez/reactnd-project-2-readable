import { combineReducers } from 'redux'
import {
    CREATE_POST,
    DELETE_POST,
    GET_ALL_POSTS,
    GET_ALL_CATEGORIES,
    CURRENT_POST,
    EDIT_POST,
    CREATE_COMMENT,
    DELETE_COMMENT,
    GET_COMMENTS
} from '../actions'

const initialState = {
    posts: [],
    categories: [],
    currentpost: {}
}

function posts (state = initialState, action) {
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

function comments (state = {}, action) {

    const { comment, comments, id } = action

    switch (action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: comments
            }
        case CREATE_COMMENT:
            return {
                ...state,
                [comment.parentId]: [
                    ...state[comment.parentId].concat( comment )
                ]
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: [ 
                    ...state.comments.filter(comment => comment.id !== id)
                ]
            }
        default:
            return state
    }
}

export default combineReducers({
    posts,
    comments,
})

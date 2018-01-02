import {
    CREATE_POST,
    DELETE_POST,
    GET_ALL_POSTS,
    CURRENT_POST,
    EDIT_POST,
    VOTE_POST,
    VOTE_CURRENT_POST,
    SORT_POSTS
} from '../actions'

const initialState = {
    posts: [],
    categories: [],
    currentpost: {}
}

const posts = (state = initialState, action) => {
    const { id, posts, post } = action

    switch (action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                posts: posts
            }
        case CREATE_POST:
            return { 
                posts: state.posts.concat(post)
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== id)
            }
        case CURRENT_POST:
            return {
                ...state,
                currentpost: post
            }
        case EDIT_POST:
            return {
                ...state,
                posts: state.posts.map(currentpost => currentpost.id === action.post.id ? {
                        ...currentpost, title: action.post.title,
                        body: action.post.body,
                        author: action.post.author,
                        category: action.post.category,
                    } : currentpost)
            }
        case VOTE_POST:
            return {
                ...state,
                posts: state.posts.map(currentpost => currentpost.id === action.id.id ? {
                        ...currentpost, title: action.id.title,
                        voteScore: action.id.voteScore,
                        voted: true,
                    } : currentpost)
            }
        case VOTE_CURRENT_POST:
            return {
                ...state,
                currentpost: {
                        ...state.currentpost,
                        voteScore: action.id.voteScore,
                        voted: true,
                    }
            }
        case SORT_POSTS:
            return {
                ...state,
                posts: [
                    ...state.posts.sort(
                        function(a, b) {
                            return a[action.value] - b[action.value]
                        }
                    )
                ]
            }
        default:
            return state
    }
}

export default posts

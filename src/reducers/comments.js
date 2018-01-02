import {
    CREATE_COMMENT,
    DELETE_COMMENT,
    GET_COMMENTS,
    CURRENT_COMMENT,
    EDIT_COMMENT,
    VOTE_COMMENT
} from '../actions'

const comments = (state = {}, action) => {
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
                comments: [
                    ...state.comments.concat( [comment] )
                ]
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: [ 
                    ...state.comments.filter(comment => comment.id !== id)
                ]
            }
        case CURRENT_COMMENT:
            return {
                ...state,
                currentcomment: comment
            }
        case EDIT_COMMENT:
            return {
                ...state,
                currentcomment: {
                    ...state.currentcomment,
                    body: comment.body
                }
            }
        case VOTE_COMMENT:
            return {
                ...state,
                comments: [
                    ...state.comments.map(currentcomment => currentcomment.id === action.id.id ? {
                        ...currentcomment, title: action.id.title,
                        voteScore: action.id.voteScore,
                        voted: true,
                    } : currentcomment)
                ]
            }
        default:
            return state
    }
}

export default comments

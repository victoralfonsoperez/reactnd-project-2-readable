import {
    CREATE_POST,
    DELETE_POST,
    CREATE_COMMENT
} from '../actions'

const initialState = {
    categories: [
        {
            name: null,
            path: null
        }
    ],
    posts: [
        {
            author: null,
            body: null,
            category: null,
            commentCount: null,
            deleted: null,
            id: null,
            timestamp: null,
            title: null,
            voteScore: null
        }
    ],
    postComments: [
        {
            author: null,
            body: null,
            deleted: null,
            id: null,
            parentDeleted: null,
            parentId: null,
            timestamp: null,
            voteScore: null
        }
    ]
}

function reducer (state = initialState, action) {
    const { id, title, body, author, category, deleted, voteScore, commentCount, timestamp } = action

    switch (action.type) {
        case CREATE_POST:
            return {
                ...state,
                [id]: {
                    ...state[id],
                    [category]: category
                }
            }
        case DELETE_POST:
            return {
                ...state,
                [id]: {
                    ...state[id],
                    [category]: category
                }
            }
        default:
            return state
    }
  }

export default reducer

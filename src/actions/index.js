export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

//action creator to create an action to create a post
export function postCreator ({ id, title, body, author, category, deleted, voteScore, commentCount, timestamp }) {
    return {
        type: CREATE_POST,
        id,
        title,
        body,
        author,
        category,
        deleted,
        voteScore,
        commentCount,
        timestamp
    }
}

//action creator to create an action to delete a post

export function postDeleter ({ id })  {
    return {
        type: DELETE_POST,
        id
    }
}

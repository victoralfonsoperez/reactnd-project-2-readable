export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const GET_COMMENTS = 'GET_COMMENTS'
export const CURRENT_COMMENT = 'CURRENT_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

//ACTIONS FOR COMMENTS

export const currentComment = comment => (
    {
        type: CURRENT_COMMENT,
        comment
    }
)

//action creator to create an action to create a comment
export const commentGetter = comments => (
    {
        type: GET_COMMENTS,
        comments
    }
)

//action creator to create an action to create a comment
export const commentCreator = comment => (
    {
        type: CREATE_COMMENT,
        comment
    }
)

//action creator to create an action to delete a comment
export const commentDeleter = id => (
    {
        type: DELETE_COMMENT,
        id
    }
)

//action creator to create an action to edit a comment
export const commentEditor = (id, comment) => (
    {
        type: EDIT_COMMENT,
        id,
        comment
    }
)

//action creator to create an action to vote a comment
export const commentVoter = (id, vote) => (
    {
        type: VOTE_COMMENT,
        id,
        vote
    }
)

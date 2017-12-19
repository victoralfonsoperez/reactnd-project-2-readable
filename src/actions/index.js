export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const getAllPosts = posts => (
    {
        type: GET_ALL_POSTS,
        posts
    }
)

//action creator to create an action to create a post
export const postCreator = id => (
    {
        type: CREATE_POST,
        id
    }
)

//action creator to create an action to delete a post

export const postDeleter = id => (
    {
        type: DELETE_POST,
        id
    }
)

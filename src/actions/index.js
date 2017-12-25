export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const CURRENT_POST = 'CURRENT_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

//action creator to create an action to retrieve all categories
export const getAllCategories = categories => (
    {
        type: GET_ALL_CATEGORIES,
        categories
    }
)

//action creator to create an action to retrieve all posts from all categories
export const getAllPosts = posts => (
    {
        type: GET_ALL_POSTS,
        posts
    }
)

//action creator to create an action to create a post
export const postCreator = post => (
    {
        type: CREATE_POST,
        post
    }
)

//action creator to create an action to delete a post
export const postDeleter = id => (
    {
        type: DELETE_POST,
        id
    }
)

//action creator to create an action to edit a post
export const postEditor = (id, post) => (
    {
        type: EDIT_POST,
        id,
        post
    }
)

export const currentPost = post => (
    {
        type: CURRENT_POST,
        post
    }
)
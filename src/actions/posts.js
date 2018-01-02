import * as api from '../utils/api'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const CURRENT_POST = 'CURRENT_POST'
export const SORT_POSTS = 'SORT_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const VOTE_CURRENT_POST = 'VOTE_CURRENT_POST'

//ACTIONS FOR POSTS

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

//action creator to create an action to set the post
export const currentPost = post => (
    {
        type: CURRENT_POST,
        post
    }
)

//action creator to create an action to sort the posts
export const sorter = value => (
    {
        type: SORT_POSTS,
        value
    }
)

export const postVoter = (id, vote) => (
    {
        type: VOTE_POST,
        id,
        vote
    }
)

export const postVote = (id, vote) => (
    {
        type: VOTE_CURRENT_POST,
        id,
        vote
    }
)

//thunk to fetch all posts
export const fetchPosts = () => dispatch => (
    api
        .getPosts()
        .then(posts => dispatch(getAllPosts(posts)))
)

//thunk to fetch a single post
export const fetchPost = id => dispatch => (
    api
        .getSinglePost(id)
        .then(post => dispatch(currentPost(Object.keys(post).length !== 0 ? post : null)))
        .catch(dispatch(currentPost(null)))
)

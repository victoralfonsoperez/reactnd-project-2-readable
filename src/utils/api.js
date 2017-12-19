import axios from 'axios'

const api = 'http://localhost:3001'

let token = localStorage.token

const headers = {
    Authorization: token
}

export const getCategories = () =>
    axios.get(`${api}/categories`, { headers })
        .then(data => data.data && data.data.categories)

export const getPosts = () =>
    axios.get(`${api}/posts`, { headers })
        .then(data => data.data)

export const getSinglePost = id =>
    axios.get(`${api}/posts/${id}`, { headers })
        .then(data => data.data)

export const getCategoryPosts = category =>
    axios.get(`${api}/${category}/posts`, { headers })
        .then(data => data.data)

export const createPost = data =>
    axios.post(`${api}/posts`, data, { headers })
        .then(data => data.data)

export const votePost = (id, vote) =>
    axios.post(`${api}/posts/${id}`, vote, { headers })
        .then(data => data.data)

export const editPost = (id, data) =>
    axios.put(`${api}/posts/${id}`, data, { headers })
        .then(data => data.data)

export const deletePost = id =>
    axios.delete(`${api}/posts/${id}`, { headers })
        .then(data => data.data)

export const getPostComments = id =>
    axios.get(`${api}/posts/${id}/comments`, { headers })
        .then(data => data.data)

export const commentPost = data =>
    axios.post(`${api}/comments`, data, { headers })
        .then(data => data.data)

export const getComment = id =>
    axios.get(`${api}/comments/${id}`, { headers })
        .then(data => data.data)

export const voteComment = (id, vote) =>
    axios.post(`${api}/comments/${id}`, vote, { headers })
        .then(data => data.data)

export const deleteComment = id =>
    axios.delete(`${api}/comments/${id}`, { headers })
        .then(data => data.data)

export const editComment = (id, data) =>
    axios.put(`${api}/comments/${id}`, data, { headers })
        .then(data => data.data)

import { performDeleteRequest, performGetRequest, performPostRequest, performPutRequest } from "./NetworkServices"

const API_ROUTE = 'http://127.0.0.1:3002/api'
const LOGIN_API_ROUTE = `${API_ROUTE}/login`
const ADD_POST_ROUTE = `${API_ROUTE}/posts`
const FETCH_POSTS_ROUTE =`${API_ROUTE}/posts`

const DELETE_POST_ROUTE = (postId) => `${API_ROUTE}/posts/${postId}`
const EDIT_POST_ROUTE = (postId) => `${API_ROUTE}/posts/${postId}`

const getTokenHeader = (token) => {
    return { "x-access-token": token }
}

export const updatePost = async (postId, body, token) => {
    try {
        const response = await performPutRequest(`${EDIT_POST_ROUTE(postId)}`, body, getTokenHeader(token))
        return response?.data;
    } catch (error) {
        return error?.response?.data
    }

}

export const deletePost = async (postId, token) => {
    try {
        const response = await performDeleteRequest(`${DELETE_POST_ROUTE(postId)}`, getTokenHeader(token))
        return response?.data;
    } catch (error) {
        return error?.response?.data
    }
}

export const addPost = async (values, token) => {
    console.log(values,token);
    let body = {
        "post_title": values?.post_title,
        "post_description": values?.post_description,
        "post_date": values?.post_date,
        "user_id": values?.user_id
    }
    try {
        const response = await performPostRequest(`${ADD_POST_ROUTE}`, body, getTokenHeader(token))
        return response?.data;
    } catch (error) {
        return error?.response?.data
    }
}

export const fetchPosts = async (token) => {
    try {
        const response = await performGetRequest(FETCH_POSTS_ROUTE,getTokenHeader(token))
        return response?.data;
    } catch (error) {
        return undefined
    }
}

export const loginUser = async (values) => {
    let body = {
        email: values?.email?.toLowerCase(),
        password: values?.password
    }
    try {
        const response = await performPostRequest(`${LOGIN_API_ROUTE}`, body)
        console.log("vivz", response)
        return response?.data;
    } catch (error) {
        return error?.response?.data
    }
}
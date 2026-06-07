

import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {

    const config = {
        headers: { Authorization: token },
    }

    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}


const create = async newBlog  => {

    const config = {
        headers: { Authorization: token },
    }
    const response = await axios
        .post(baseUrl, newBlog, config)
    return response.data
}

const updateLike = async (blog, id) => {

    const config = {
        headers: { Authorization: token },
    }

    const response = await axios
        //IF NEEDED UPDATE A COMPLETE BLOG SEND BLOG OBJECT INSTEAD 'NULL'
        .put(`${baseUrl}/${id}`, null, config)
    return response.data
}

export default { getAll, setToken, create, updateLike }
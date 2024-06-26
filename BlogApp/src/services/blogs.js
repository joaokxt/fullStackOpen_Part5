import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const resetToken = () => {
  token = null
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.get(baseUrl, config)
  return response.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token},
  }

  const response = await axios.put(baseUrl + `/` + updatedBlog.id , updatedBlog, config)
  return response.data
}

const deleteBlog = async (deletedId) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(baseUrl + '/' + deletedId, config)
  return response.data
}

export default { getAll, setToken, resetToken, createBlog, updateBlog, deleteBlog }
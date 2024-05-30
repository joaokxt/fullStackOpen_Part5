import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlog = (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      removeBlog(blog.id)
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
    <div style={blogStyle}>
      <div>
        <b>{blog.title}</b> <button onClick={() => updateBlog(blog.id)}>Like</button><button onClick={toggleVisibility} style={hideWhenVisible}>Show</button>
      </div>
      <div style={showWhenVisible} id='togglable-info'>
        <ul>
          <li>By: {blog.author}</li>
          <li>Url: {blog.url}</li>
          <li>Likes: {blog.likes}</li>
          <button onClick={toggleVisibility}>Hide</button>
          <button onClick={() => deleteBlog(blog)}>Remove</button>
        </ul>
      </div>
    </div>
  )
}

Blog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
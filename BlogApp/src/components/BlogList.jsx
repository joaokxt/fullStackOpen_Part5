import { useState, useRef, useEffect } from 'react'
import blogService from '../services/blogs'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Togglable from './Togglable'

const BlogList = ({ user, setUser }) => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState({
        content: null,
        error: false
    })

    useEffect(() => {
        if(blogs.length === 0) {
            blogService.getAll().then(blogs =>
                setBlogs(blogs.sort((blogA, blogB) => blogB.likes - blogA.likes))
            )
        }
        blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
    }, [blogs])

    const blogFormRef = useRef()

    const postBlog = async (newBlog) => {
        try {
            const newObject = await blogService.createBlog(newBlog)
            const updatedList = blogs.concat(newObject)
            setBlogs(updatedList)

            const newMessage = {
                content: `A new blog ${newObject.title} by ${newObject.author} was added`,
                error: false
            }
            setMessage(newMessage)
            resetMessage()

            blogFormRef.current.toggleVisibility()

        } catch (exception) {
            const newMessage = {
                content: exception.response.data.error,
                error: true
            }
            setMessage(newMessage)
            resetMessage()
        }
    }

    const likeBlog = async (id) => {
        try{
            const foundBlog = blogs.find(blog => blog.id === id)
            const modifiedBlog = {...foundBlog, likes: foundBlog.likes + 1}
            const newBlog = await blogService.updateBlog(modifiedBlog)

            setBlogs(blogs.map(blog => blog.id !== id ? blog : newBlog))

            const newMessage = {
                content: "Post liked!",
                error: false
            }
            setMessage(newMessage)
            resetMessage()
            
        } catch (exception) {
            const newMessage = {
                content: exception.response.data.error,
                error: true
            }
            setMessage(newMessage)
            resetMessage()
        }
    }

    const removeBlog = async (id) => {
        try{
            await blogService.deleteBlog(id)
            setBlogs(blogs.filter(b => b.id !== id))

            const newMessage = {
                content: "Post deleted!",
                error: false
            }
            setMessage(newMessage)
            resetMessage()
        } catch (exception) {
            const newMessage = {
                content: exception.response.data.error,
                error: true
            }
            setMessage(newMessage)
            resetMessage()
        }
    }

    const resetMessage = () => {
        setTimeout(() => {
            const blankMessage = {
                content: null,
                error: false
            }
            setMessage(blankMessage)
        }, 5000)
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        window.localStorage.clear()
        setUser(null)
        blogService.resetToken()
    }

    console.log(message.content)

    return (
        <>
            <Notification content={message.content} error={message.error}></Notification>
            <div>
                <h4>Logged in as {user.username} </h4>
                <button onClick={handleLogout}>Log-out</button>
            </div>
            <Togglable title='' buttonLabel="Create new blog" ref={blogFormRef}>
                <BlogForm addBlog={postBlog} user={user}></BlogForm>
            </Togglable>
            <div>
                <h2>Blogs</h2>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} updateBlog={likeBlog} removeBlog={removeBlog}/>
                )}
            </div>
        </>
    )
}

export default BlogList
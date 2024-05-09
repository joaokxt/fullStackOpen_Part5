import { useState } from 'react'
import blogService from '../services/blogs'

import Blog from './Blog'
import Notification from './Notification'

const BlogList = ({ blogs, setBlogs, user, setUser }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState(user.username)
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState({
        content: null,
        error: false
    })

    const postBlog = async (event) => {
        event.preventDefault()

        try {
            const newBlog = {
                title, author, url,
            }

            const newObject = await blogService.createBlog(newBlog)
            const updatedList = blogs.concat(newObject)
            setBlogs(updatedList)

            const newMessage = {
                content: `A new blog ${newObject.title} by ${newObject.author} was added`,
                error: false
            }
            setMessage(newMessage)
            resetMessage()

            setTitle('')
            setAuthor(user.username)
            setUrl('')

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
            <div>
                <h2>Create New</h2>
                <form onSubmit={postBlog}>
                    Title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => { setTitle(target.value) }}
                    /><br></br>
                    Author:
                    <input
                        type="text"
                        value={author}
                        name="Title"
                        onChange={({ target }) => { setAuthor(target.value) }}
                    /><br></br>
                    Url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => { setUrl(target.value) }}
                    /><br></br>
                    <button type="submit">Create</button>
                </form>
            </div>

            <div>
                <h2>Blogs</h2>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </div>
        </>
    )
}

export default BlogList
import { useState } from 'react'

const BlogForm = ({ addBlog, user }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState(user.username)
    const [url, setUrl] = useState('')

    const postBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title, author, url
        }
        addBlog(newBlog)
        setTitle('')
        setAuthor(user.username)
        setUrl('')
    }

    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={postBlog}>
                Title:
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => { setTitle(target.value) }}
                    placeholder='Title here'
                /><br></br>
                Author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => { setAuthor(target.value) }}
                    placeholder='Author here'
                /><br></br>
                Url:
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => { setUrl(target.value) }}
                    placeholder='Url here'
                /><br></br>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm
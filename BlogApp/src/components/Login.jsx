import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Notification from './Notification'

const Login = ({ user, setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState({
      content: null,
      error: false
    })

    const resetMessage = () => {
      setTimeout(() => {
          const blankMessage = {
              content: null,
              error: false
          }
          setMessage(blankMessage)
      }, 5000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          const user = await loginService.login({ username, password })
    
          window.localStorage.setItem('loggedUser', JSON.stringify(user))
          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
        } catch (exception) {
          const newMessage = {
            content: exception.response.data.error,
            error: true
          }
          setMessage(newMessage)
          resetMessage()
        }
      }

    return (
        <>
          <Notification content={message.content} error={message.error}></Notification>
          <h1>Log-in</h1>
          <form onSubmit={handleLogin}>
            <div>
              Username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)} 
                data-testid='username'
              />
            </div>
            <div>
              Password
              <input
                type="text"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)} 
                data-testid='password'
              />
            </div>
            <button type="submit">Log-in</button>
          </form>
        </>
    )
}

export default Login
import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <Login user={user} setUser={setUser}></Login>
    )
  }

  const blogList = () => {
    return (
      <BlogList user={user} setUser={setUser}></BlogList>
    )
  }

  return (
    <>
      {
        user === null 
          ? loginForm() 
          : blogList()
      }
    </>
  )
}

export default App
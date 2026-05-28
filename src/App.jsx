import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const[user, setUser]=useState(null)

  useEffect(() => {

    if(user) {
      blogService.getAll()
          .then(blogs =>
      setBlogs( blogs)
          )
    }
  }, [user])

  const handleLogin = async (credentials)=>{
    try{
      const user = await loginService.login(credentials)
      setUser(user)
      blogService.setToken(user.token)

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

    } catch (exception){
      setErrorMessage('Error logging in')
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
      <div>
        <Notification message={errorMessage}/>
        {
          user === null
            ? <LoginForm handleLogin={handleLogin}/>
              : <p>{user.name} logged in</p>
        }

        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
      </div>
  )
}

export default App
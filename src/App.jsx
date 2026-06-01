import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm.jsx";
import Notification from "./components/Notification.jsx";
import HeaderUserLogged from "./components/HeaderUserLogged.jsx";
import NoteForm from "./components/NoteForm.jsx";

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

  useEffect(()=>{

    const loggedUserJson = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  const handleLogout = ()=>{
    window.localStorage.removeItem('loggedBloglistUser')
    setBlogs([])
    setUser(null)
    blogService.setToken(null)

  }

  const handleNewBlog = async (blogToCreate)=>{

    try{
      const returnedBlog = await blogService.create(blogToCreate)

      setBlogs(blogs.concat(returnedBlog))
    } catch(exception){
      setErrorMessage(exception.message)
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
    }

  }

  if (!user){

    return (
        <div>
          <Notification message={errorMessage}/>
          <LoginForm handleLogin={handleLogin}/>
        </div>

    )
  }

  return (
      <div>
        <Notification message={errorMessage}/>
        <HeaderUserLogged username={user.username} handleLogout={handleLogout}/>
        <NoteForm handleNewBlog={handleNewBlog}/>
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )
        }
      </div>
  )
}

export default App
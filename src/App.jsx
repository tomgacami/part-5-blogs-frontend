import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm.jsx";
import HeaderUserLogged from "./components/HeaderUserLogged.jsx";
import BlogForm from "./components/BlogForm.jsx";
import Togglable from "./components/Togglable.jsx";

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
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
      setMessage({text: 'Wrong username or password', type: 'error'})
      setTimeout(()=>{
        setMessage(null)
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
      blogsFormRef.current.toggleVisibility()

      setBlogs(blogs.concat(returnedBlog))
      setMessage({text:`A new blog ${returnedBlog.title} by ${returnedBlog.author} added.`, type: 'success'})
      setTimeout(()=>{
        setMessage(null)
      }, 5000)
    } catch(exception){
      setMessage({text: exception.message, type: 'error'})
      setTimeout(()=>{
        setMessage(null)
      }, 5000)
    }

  }

  const blogsFormRef = useRef()
  const uiUserLogged = ()=>(
      <div>
        <HeaderUserLogged username={user.username} handleLogout={handleLogout} message={message}/>
        <Togglable buttonLabel="Create new blog" ref={blogsFormRef}>
          <BlogForm handleNewBlog={handleNewBlog}/>
        </Togglable>
      {
        blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )
      }
      </div>
  )

  return (
      <div>
        {!user &&
            <LoginForm handleLogin={handleLogin} message={message}/>
        }

        {user &&
            uiUserLogged()
        }
      </div>
  )
}

export default App
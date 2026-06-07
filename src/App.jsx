import {useState, useEffect, useRef} from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm.jsx";
import HeaderUserLogged from "./components/HeaderUserLogged.jsx";
import BlogForm from "./components/BlogForm.jsx";
import Togglable from "./components/Togglable.jsx";
import BlogList from "./components/BlogList.jsx"

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

  const likeBlog = async (id)=>{

    const blog = blogs.find(blog => blog.id === id)

    try{
      const updatedBlog = await blogService.updateLike(blog, id)
      //RESOLVING PROBLEM: FIX USER NAME DISAPPEAR JUST IN FRONTEND, DEFINITIVE SOLUTION ADDING POPULATE ON 'PUT' METHOD IN BACKEND
      // setBlogs(blogs.map(b => b.id !== id ? b : updatedBlog))
      setBlogs(blogs.map(b => b.id !== id ? b : {...b, likes: updatedBlog.likes}))

    } catch(exception){

      setMessage({text: exception.message, type: 'error'})
      setTimeout( ()=>{
        setMessage(null)
      }, 5000)
    }
  }

  const sortBlogs = [...blogs].sort(( a, b ) => b.likes - a.likes)

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
        <BlogList blogs={sortBlogs} likeBlog={likeBlog}/>
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
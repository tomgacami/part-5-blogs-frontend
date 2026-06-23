import Blog from './Blog.jsx'

const BlogList = ({ blogs, likeBlog, deleteBlog, username }) => {

  return(
    <div data-testid='bloglist' >
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={() => likeBlog(blog.id)} deleteBlog={deleteBlog} username={username}/>
        )
      }
    </div>
  )
}

export default BlogList
import { useState } from 'react'


const BlogForm = ({ handleNewBlog }) => {

  ///EXERCISE ALREADY DONE IN FOLLOW CODE
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    const blogToCreate = {
      title: title,
      author: author,
      url: url,
    }

    await handleNewBlog(blogToCreate)

    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (

    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
                    Title <input
            data-testid='input-blog-title'
            type="text"
            value={title}
            name="Title"
            id='title-blog-input'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
                    Author <input
            data-testid='input-blog-author'
            type="text"
            value={author}
            name="Author"
            id='author-blog-input'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
                    Url <input
            data-testid='input-blog-url'
            type="text"
            value={url}
            name="Url"
            id='url-blog-input'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
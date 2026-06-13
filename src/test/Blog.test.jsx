
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog.jsx'
import { test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm.jsx'


const blog = {
  title: 'Test title',
  author: 'Test author',
  url: 'www.testUrl.com',
  likes: 10,
  id: '6a08ed6ca67f6a032390be65',
  user: {
    username: 'user/username',
    name: 'user/name'
  }
}

describe('<Blog />', () => {

  test('Exercise 5.13 step 1', () => {

    const { container } = render(<Blog  blog={blog} />)

    const title = screen.getByText('Test title', { exact: false })
    const author = screen.getByText('Test author', { exact: false })

    expect(author).toBeDefined()
    expect(title).toBeDefined()

    const additionalInfo = container.querySelector('.additional-info-blog')
    const url = screen.queryByText('www.testUrl.com')
    const likes = screen.queryByText(`Likes ${blog.likes}`)

    expect(additionalInfo).not.toBeNull()
    expect(additionalInfo).toHaveStyle('display:none')
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()

  })

  test('Exercise 5.14 step 2', async () => {

    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const buttonVisibility = screen.getByText('view')

    await user.click(buttonVisibility)

    const additionalInfo = container.querySelector('.additional-info-blog')
    const url = screen.queryByText('www.testUrl.com')
    const likes = screen.queryByText(`Likes ${blog.likes}`)

    expect(additionalInfo).not.toBeNull()
    expect(additionalInfo).not.toHaveStyle('display:none')
    expect(url).toBeVisible()
    expect(likes).toBeVisible()

  })

  test('Exercise 5.15 step 3', async () => {

    const user = userEvent.setup()
    const likeBlog = vi.fn()

    const { container } = render(<Blog blog={blog} likeBlog={likeBlog}/>)

    const buttonVisibility = screen.getByText('view')
    await user.click(buttonVisibility)

    const buttonLike = screen.getByText('like')

    await user.click(buttonLike)
    await user.click(buttonLike)

    expect(likeBlog.mock.calls).toHaveLength(2)

  })

  test('Exercise 5.16 step 4', async () => {

    const handleNewBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm handleNewBlog={handleNewBlog}/>)

    const titleInput = container.querySelector('#title-blog-input')
    const authorInput = container.querySelector('#author-blog-input')
    const urlInput = container.querySelector('#url-blog-input')

    const createButton = screen.getByText('Create')

    await user.type(titleInput, 'New blog title')
    await user.type(authorInput, 'New blog author')
    await user.type(urlInput, 'New blog url')

    await user.click(createButton)

    expect(handleNewBlog.mock.calls[0][0].title).toBe('New blog title')
    expect(handleNewBlog.mock.calls[0][0].author).toBe('New blog author')
    expect(handleNewBlog.mock.calls[0][0].url).toBe('New blog url')

  })

})
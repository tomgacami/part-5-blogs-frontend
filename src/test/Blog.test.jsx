
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog.jsx'
import { test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'


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

    screen.debug()
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

})
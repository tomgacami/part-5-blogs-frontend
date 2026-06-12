
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog.jsx'
import { test, expect } from 'vitest'


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

})
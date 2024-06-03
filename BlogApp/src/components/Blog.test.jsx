import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { test } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
    let container

    const testBlog = {
        title: 'This is a test blog',
        author: 'Master tester',
        url: 'www.tests.com',
        likes: 0
    }

    const likeBlog = vi.fn()
    const removeBlog = vi.fn()

    beforeEach(() => {
        container = render(
            <Blog 
                blog={testBlog} 
                updateBlog={likeBlog} 
                removeBlog={removeBlog} 
            />
        ).container
    })

    test('Only renders title when button not clicked', async() => {
        const div = container.querySelector('#togglable-info')
        expect(div).toHaveStyle('display: none')
    })

    test('After clicking button, likes and url are displayed', async() => {
        const user = userEvent.setup()
        const button = screen.getByText('Show')
        await user.click(button)
        
        const div = container.querySelector('#togglable-info')
        expect(div).not.toHaveStyle('display: none')
    })  

    test('When clicking like twice, the event handler is called twice', async() => {
        const user = userEvent.setup()
        const showButton = screen.getByText('Show')
        await user.click(showButton)
        
        const likeButton = screen.getByText('Like')
        for(let i=0; i<2; i++) {
            await user.click(likeButton)
        }

        expect(likeBlog.mock.calls).toHaveLength(2)
    })
})
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { describe } from 'vitest'

describe('<BlogForm />', () => {
    test('Note form calls event handler with right details', async() => {
        const user = userEvent.setup()

        const tester = {
            username: 'tester'
        }
        const addBlog = vi.fn()

        render(<BlogForm addBlog={addBlog} user={tester} />)

        const titleInput = screen.getByPlaceholderText('Title here')
        const urlInput = screen.getByPlaceholderText('Url here')
        const saveButton = screen.getByText('Create')

        await user.type(titleInput, 'Testing blog')
        await user.type(urlInput, 'google.com')
        await user.click(saveButton)

        expect(addBlog.mock.calls).toHaveLength(1)
        expect(addBlog.mock.calls[0][0]).toEqual({
            title: 'Testing blog',
            author: 'tester',
            url: 'google.com'
        })
    })
})
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentForm from './CommentForm';


describe('CommentForm', () => {

    test('rendering and submitting comment form', async () => {

        const handleSubmit = jest.fn()

        render(<CommentForm onSubmit={handleSubmit} />)

        userEvent.type(screen.getByTestId('name'), 'Dee')
        userEvent.type(screen.getByTestId('body'), 'some text')
        userEvent.type(screen.getByTestId('email'), 'john.dee@someemail.com')

        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() =>
            expect(handleSubmit).toHaveBeenCalledWith({
                body: 'some text',
                email: 'john.dee@someemail.com',
                name: 'Dee',
            })
        )
    })
})
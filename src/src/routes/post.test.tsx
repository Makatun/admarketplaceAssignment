import React from 'react';
import { render, screen, waitForElementToBeRemoved, RenderOptions, waitFor, act } from '@testing-library/react';

import { SWRConfig } from 'swr';
import { MemoryRouter, Routes } from 'react-router-dom';
import PostScreen from './post';
import { server } from '../utils/ServerMock';
import { Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';



beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())



// *************************** TESTS **********************************************
describe('Post Screen', () => {


    describe('Invalid Post ID', () => {

        it('Invalid post ID', async () => {
            customRender(<MemoryRouter initialEntries={['/posts/1s']}><Routes><Route path="/posts/:postId" element={<PostScreen />} /></Routes> </MemoryRouter>)
            expect(screen.getByTitle('invalidPostId')).toBeInTheDocument();
        })

        it('Missing post ID', async () => {
            customRender(<MemoryRouter initialEntries={['/posts/100']}><Routes><Route path="/posts/:postId" element={<PostScreen />} /></Routes> </MemoryRouter>)
            await waitForElementToBeRemoved(() => screen.getByText('loading...'))
            expect(screen.getByTitle('invalidPostId')).toBeInTheDocument();
        })
    })



    describe('post is loading', () => {

        beforeEach(async () => {
            customRender(<MemoryRouter initialEntries={['/posts/1']}><Routes><Route path="/posts/:postId" element={<PostScreen />} /></Routes> </MemoryRouter>)
            await waitForElementToBeRemoved(() => screen.getByText('loading...'))
        })


        it('post is loaded', () => {
            expect(screen.getByTitle('Post Screen')).toBeInTheDocument();
        })


        it('comments are loaded', () => {
            expect(screen.getByText('alias odio sit')).toBeInTheDocument();
            expect(screen.getByText('odio adipisci rerum aut animi')).toBeInTheDocument();
        })


        test('new comment is added', async () => {
            const promise = Promise.resolve()

            userEvent.type(screen.getByTestId('name'), 'Dee')
            userEvent.type(screen.getByTestId('body'), 'some text')
            userEvent.type(screen.getByTestId('email'), 'john.dee@someemail.com')

            userEvent.click(screen.getByTestId('submit'))


            await act(() => promise)

            await waitFor(() =>
                expect(screen.getByText('some text from server')).toBeInTheDocument()
            )
        })

    })
})




const AllTheProviders: React.FC = ({ children }) => {
    return (
        <SWRConfig value={{ refreshInterval: 0, provider: () => new Map() }}>
            {children}
        </SWRConfig>
    )
}

const customRender = (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })
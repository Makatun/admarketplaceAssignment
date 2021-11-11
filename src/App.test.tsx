import React from 'react';
import { render, screen, waitForElementToBeRemoved, RenderOptions } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { SWRConfig } from 'swr';
import { BrowserRouter, } from 'react-router-dom';
import { server } from './src/utils/ServerMock';



beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())



// *************************** TESTS **********************************************

describe('Home screen', () => {
  describe('Posts are loading', () => {

    beforeEach(async () => {
      customRender(<App />)
      await waitForElementToBeRemoved(() => screen.getByText('loading...'))
    })



    it('posts are loaded', () => {
      const postSelect = screen.getByTitle('postSelect');
      const option = screen.getByText('qui est esse');
      expect(postSelect).toBeInTheDocument();
      expect(option).toBeInTheDocument();
    })

    it('post selection', () => {
      const postSelect = screen.getByTitle('postSelect');

      userEvent.selectOptions(postSelect, '2')

      expect((screen.getByText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit') as HTMLOptionElement).selected).toBeFalsy();
      expect((screen.getByText('qui est esse') as HTMLOptionElement).selected).toBeTruthy();
    })
  })
})




const AllTheProviders: React.FC = ({ children }) => {
  return (
    <BrowserRouter >
      <SWRConfig value={{ refreshInterval: 0, provider: () => new Map() }}>
        {children}
      </SWRConfig>
    </BrowserRouter >
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })
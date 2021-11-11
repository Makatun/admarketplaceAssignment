import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './index.css';
import App from './App';
import PostScreen from './src/routes/post';
import ErrorContainer from './src/components/ErrorContainer';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="posts/:postId" element={<PostScreen />} />
        <Route path="*" element={<ErrorContainer><>404: Page Not Found</></ErrorContainer>}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
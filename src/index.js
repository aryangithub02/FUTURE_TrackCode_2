import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './fonts.css'; // Import custom font styles
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ClerkProvider } from '@clerk/clerk-react';

// 🔹 Clerk publishable key (keep in .env)
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || 'pk_test_xxx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </ClerkProvider>
);

reportWebVitals();

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import ProjectManagement from './components/ProjectManagement';
import BlogManagement from './components/BlogsManangement';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
          path: "/",
          element: <h1>Dashboard details</h1>
      },
      {
          path: "/projects",
          element: <ProjectManagement/>
      },
      {
          path: "/blogs",
          element: <BlogManagement/>
      },
      {
          path: "/reviews",
          element: <BlogManagement/>
      },
      
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

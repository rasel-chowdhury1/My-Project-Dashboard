import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import App from "../App";

const router = createBrowserRouter([
    {
      path: "/",
      element:<h1> Hello world</h1>,
      children: [
        {
            path: "/",
            element: <h1>hello world</h1>
        },
        
      ]
    }
  ]);

export default router;
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Layout from "./Layout";
import Flow from "./components/Board/Flow";

const Routes = () => {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          index: true,
          element: <Flow />,
        },
        {
          path: "*",
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ];

  return <RouterProvider router={createBrowserRouter(routes)} />;
};
const App = () => {
  return <Routes />;
};

export default App;

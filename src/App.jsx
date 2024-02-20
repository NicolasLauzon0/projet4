import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Board from "./components/Board/Board";
import Layout from "./Layout";

const Routes = () => {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          index: true,
          element: <Board />,
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

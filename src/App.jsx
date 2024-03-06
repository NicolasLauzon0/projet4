import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SaveAndLoadProvider } from "./context/SaveAndLoadContext";
import Layout from "./Layout";
import Flow from "./components/Board/Flow";
import AuthLayout from "./AuthLayout";
import FlowAuth from "./components/Board/FlowAuth";

const Routes = () => {
  const { isConnected, loading } = useAuth();
  if (loading) return (
    <div className="loading">

      <div className="center">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  )


  const routes = [
    !isConnected && {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          index: true,
          element: <Navigate to="/login" replace />,
        },
        {
          path: "login",
          element: <FlowAuth />,
        },
      ],
    },
    isConnected &&
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
    {
      path: "*",
      element: <Navigate to="/" replace />,
    }
  ];

  return <RouterProvider router={createBrowserRouter(routes)} />;
};
const App = () => {
  return (
    <AuthProvider>
      <SaveAndLoadProvider>
        <Routes />
      </SaveAndLoadProvider>
    </AuthProvider>
  );
};

export default App;

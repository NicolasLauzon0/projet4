import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SaveAndLoadProvider } from "./context/SaveAndLoadContext";
import Layout from "./Layout";
import Flow from "./components/Board/Flow";
import AuthLayout from "./AuthLayout";

const Routes = () => {
  const { isConnected, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  

  const routes = [
    !isConnected &&{
      path: "/",
      element: <AuthLayout />,
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

import { ReactFlowProvider } from "reactflow";
import { Outlet } from "react-router-dom";
import Login from "./components/Connexion/Login";
import NomProjet from "./components/Board/NomProjet";


const Layout = () => {
  return (
    <div className="interface">
      <Login />
      <NomProjet />
      <main style={{ width: "100%", height: "100vh" }}>
        <ReactFlowProvider>
          <Outlet />
        </ReactFlowProvider>
      </main>

    </div>
  );
};

export default Layout;

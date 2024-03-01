import { ReactFlowProvider } from "reactflow";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <div className="interface">
      <main style={{ width: "100%", height: "100vh" }}>
        <ReactFlowProvider>
          <Outlet />
        </ReactFlowProvider>
      </main>

    </div>
  );
};

export default Layout;

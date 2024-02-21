import { Outlet } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";

const Layout = () => {
  return (
    <div className="interface">
      <ReactFlowProvider>
        <main style={{ width: "100%", height: "100vh" }}>
          <Outlet />
        </main>
      </ReactFlowProvider>
    </div>
  );
};

export default Layout;

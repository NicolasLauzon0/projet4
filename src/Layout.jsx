import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="interface">

      <main>
        <Outlet />
      </main>

    </div>
  );
};

export default Layout;

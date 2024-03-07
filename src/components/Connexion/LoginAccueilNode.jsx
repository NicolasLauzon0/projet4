import { Handle } from "reactflow";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../store/Store";
import { shallow } from "zustand/shallow";

const selector = (store) => ({
  toggleVolume: store.toggleVolume,
  isRunning: store.isRunning,
});

const LoginAccueilNode = () => {
  const { signIn, logOut, user } = useAuth();
  const { toggleVolume, isRunning } = useStore(selector, shallow);
  return (
    <div className="log nodrag">
      <div className="logo">
        <h1>Node Wave</h1>
        <Handle type="source" position="bottom" id="a" />
      </div>
      <div className="login-text">
        <Handle type="target" position="top" id="a" />
        <button
          className="login-button">
          {user === null ? "Login with Google" : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default LoginAccueilNode;

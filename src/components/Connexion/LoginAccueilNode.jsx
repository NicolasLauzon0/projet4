import { Handle } from "reactflow";
import Logo from "./Logo";


const LoginAccueilNode = () => {
  return (
    <div className="log nodrag">
      <div className="logo">
        <div className="logo">
          <Logo />
        </div>
        <Handle type="source" position="bottom" id="a" />
      </div>
      <div className="login-text">
        <Handle type="target" position="top" id="b" />
        <p className="Seconnecter">Login</p>
      </div>
    </div>
  );
};

export default LoginAccueilNode;

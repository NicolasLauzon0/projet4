import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../store/Store";
import { shallow } from "zustand/shallow";

const selector = (store) => ({
  toggleVolume: store.toggleVolume,
  isRunning: store.isRunning,
});
const Login = () => {
  const { toggleVolume, isRunning } = useStore(selector, shallow);
  const { signIn, logOut, user } = useAuth();

  return (
    <button
      className="login-button"
      onClick={() => {
        if (isRunning) toggleVolume();
        if (user === null) signIn();
        else logOut();
      }}
    >
      {user === null ? "Login with Google" : "Logout"}
    </button>
  );
};

export default Login;

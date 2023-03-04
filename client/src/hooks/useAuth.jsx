
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import useFetch from "../hooks/useFetch";

export const useAuth = () => {
  const [message, setMessage] = useState("");
  const context = useAuthContext();

  const navigate = useNavigate();

  const REGISTER_ROUTE = "/signup";
  const LOGIN_ROUTE = "/login";

  const onReceived = (result) => {

    const token = result.token.replace("Bearer ", "");
    var user = result.user
    context.update(token, user);
    navigate("/home");
  };
  const onReceivedSignup = (result) => {

    const token = result.token.replace("Bearer ", "");
    var user = result.user
    context.update(token, user);
    setMessage(result.message);
    navigate("/home");
  };

  const useRegister = useFetch(REGISTER_ROUTE, onReceivedSignup);

  const useLogin = useFetch(LOGIN_ROUTE, onReceived);

  const register = ({ name, email, password }) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    };
    useRegister.performFetch(options);
  };

  const login = ({ email, password }) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };
    useLogin.performFetch(options);
  };

  const logout = () => {
    context.update(null, null);
    navigate("/");
  };
  
  return {
    login: {
      isLoading: useLogin.isLoading,
      error: useLogin.error,
      performLogin: login,
      cancel: useLogin.cancelFetch,
      isSuccess: useRegister.isSuccess,
    },
    register: {
      isLoading: useRegister.isLoading,
      error: useRegister.error,
      message: message,
      performRegister: register,
      cancel: useRegister.cancelFetch,
      isSuccess: useRegister.isSuccess,
    },
    user: context.user,
    token: context.token,
    logout,
  };
};
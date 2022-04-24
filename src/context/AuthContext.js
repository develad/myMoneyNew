import { createContext, useReducer, useEffect } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  // useReducer recive a function and an inital state as parameters
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  //   dispatch({type:'LOG_IN'})

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub(); // What!?
    });
    //could also code: return ()=>unsub();
  }, []);
  console.log("Authcontext state:", state);

  //returning an object as the value of the AuthContext Provider
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

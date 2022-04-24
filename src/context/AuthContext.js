import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  // useReducer recive a function and an inital state as parameters
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  //   dispatch({type:'LOG_IN'})

  //returning an object as the value of the AuthContext Provider
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

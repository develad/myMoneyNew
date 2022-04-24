import { useState } from "react";
import { projectAuth } from "../firebase/config";

//importing the useContext hook so we can use the dispatch function

import { useAuthContext } from "../hooks/useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      //signup user

      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      //   console.log(res.user);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      //add display name to user after the user had  being created in the firebase servers
      await res.user.updateProfile({ displayName });

      //dispatch login action by passing an object with a type and a payload
      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};

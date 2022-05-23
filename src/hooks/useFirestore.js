import { useReducer, useState, useEffect } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        isPending: true,
        success: false,
        error: null,
        document: null,
      };
    case "ERROR":
      return {
        success: false,
        isPending: false,
        error: action.payload,
        document: null,
      };
    case "ADDED_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: action.payload,
      };
    case "DELETED_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        // document: action.payload,
        document: null,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  // useReducer take as its arguments a function and an initial state.
  // the response is the return from the firestoreReducer function
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  const [isCancelled, setIsCancelled] = useState(false);

  //collection ref
  const ref = projectFirestore.collection(collection);

  // only dispatch if not cancelled
  const dispatchifNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchifNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchifNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  //delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      // const deletedDocument = await ref.doc(id).delete();
      await ref.doc(id).delete();
      dispatchifNotCancelled({
        type: "DELETED_DOCUMENT",
        // payload: deletedDocument,
      });
    } catch (err) {
      dispatchifNotCancelled({ type: "ERROR", payload: "could not delete" });
    }
  };

  // Clean up function in case the user is changing the page while trying to update state to unmounted component (can cause a memory leak)
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    addDocument,
    deleteDocument,
    response,
  };
};

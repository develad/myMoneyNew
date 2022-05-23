import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call because Arrays in JS are reference type
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  //using useEffect to invoke the function the moment the component mount
  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    // onSnapshot is like a websocket or real time listener that run
    // every time there is a change in the firebase collection
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        //update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        //2nd argument of onSnapshot is the error case function
        console.log(error);
        setError("could not fetch the data");
      }
    );

    // unsubscribe on unmount

    return () => unsubscribe();
  }, [collection, query]);

  return { documents, error };
};

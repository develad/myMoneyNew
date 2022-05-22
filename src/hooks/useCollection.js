import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  //using useEffect to invoke the function the moment the component mount
  useEffect(() => {
    let ref = projectFirestore.collection(collection);

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
  }, [collection]);

  return { documents, error };
};

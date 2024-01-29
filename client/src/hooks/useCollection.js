// hooks
import { useEffect, useRef, useState } from "react";
// config file
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _orderBy) => {
	const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

	// to prevent infinite loop
	const orderBy = useRef(_orderBy).current;

	useEffect(() => {
		let response = projectFirestore.collection(collection);

		if (orderBy) response = response.orderBy(...orderBy);

		const unsubscribe = response.onSnapshot(
			(snapshot) => {
				let results = [];
				snapshot.docs.forEach((doc) => {
					results.push({ ...doc.data(), docID:doc.id});
				});

				// update states
				setDocuments(results);
				setError(null);
			},
			(error) => {
				console.log(error);
				setError("Could not fetch the data");
			}
		);

		// unsubscribe on unmount
		return () => unsubscribe();
	}, [collection, orderBy]);

	return { error, documents };
};
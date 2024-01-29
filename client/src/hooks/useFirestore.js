// hooks
import { useEffect, useReducer, useState } from "react";
// config file
import { projectFirestore, firebase, timestamp } from "../firebase/config";

const initialState = {
	error: null,
	document: null,
	isPending: false,
	success: null,
};

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case "IS_PENDING":
			return { error: null, document: null, success: null, isPending: true };
		case "ADDED_DOCUMENT":
			return {
				error: null,
				document: action.payload,
				success: true,
				isPending: false,
			};
		case "DELETED_DOCUMENT":
			return { error: null, document: null, success: true, isPending: false };
		case "ERROR":
			return {
				error: action.payload,
				document: null,
				success: false,
				isPending: false,
			};
		default:
			return state;
	}
};

export const useFirestore = (collection) => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState);
	const [isCancelled, setIsCancelled] = useState(false);

	const res = projectFirestore.collection(collection);

	const dispatchIfNotCancelled = (action) => {
		if (!isCancelled) dispatch(action);
	};

	const createdAt = timestamp.fromDate(new Date());

	// add a document
	const addDocument = async (doc) => {
		dispatch({ type: "IS_PENDING" });
		try {
			const addedDocument = await res.add({ ...doc, createdAt });
			dispatchIfNotCancelled({
				type: "ADDED_DOCUMENT",
				payload: addedDocument,
			});
		} catch (error) {
			dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
		}
	};

	// Add a new document in collection "cities"
	const addNotification = async (doc, notification) => {
		var updateRef = projectFirestore.collection(collection).doc(doc);

		// Set the "capital" field of the city 'DC'
	        await updateRef
			.update({
				notification: firebase.firestore.FieldValue.arrayUnion(notification)
			})
			.then(() => {
				console.log("Document successfully updated!");
			})
			.catch((error) => {
				// The document probably doesn't exist.
				console.error("Error updating document: ", error);
			});
	};
	const sendCallID = async (doc, callID) => {
		var updateRef = projectFirestore.collection(collection).doc(doc);

	        await updateRef
			.update({
				callID: callID
			})
			.then(() => {
				console.log("Document successfully updated!");
			})
			.catch((error) => {
				// The document probably doesn't exist.
				console.error("Error updating document: ", error);
			});
	}
	const sendJoin = async (doc, doctorDocID) => {
		var updateRef = projectFirestore.collection(collection).doc(doc);

	        await updateRef
			.update({
				callID: { room: true, doctorDocID: doctorDocID}
			})
			.then(() => {
				console.log("Document successfully updated!");
			})
			.catch((error) => {
				// The document probably doesn't exist.
				console.error("Error updating document: ", error);
			});
	}

	const deleteNotification = async (doc, notification) => {
		var updateRef = projectFirestore.collection(collection).doc(doc);

	        await updateRef
			.update({
				notification: firebase.firestore.FieldValue.arrayRemove(notification)
			})
			.then(() => {
				console.log("Document successfully deleted!");
			})
			.catch((error) => {
				// The document probably doesn't exist.
				console.error("Error deleting document: ", error);
			});
	};

	const deletePatientCall = async (doc) => {
		var updateRef = projectFirestore.collection(collection).doc(doc);
	
	        await updateRef
			.update({
				callID: ""	
			})
			.then(() => {
				console.log("callID successfully deleted!");
			})
			.catch((error) => {
				// The document probably doesn't exist.
				console.error("Error deleting document: ", error);
			});
	};

	const deleteDoctorCall = async (doc) => {
		var updateRef = projectFirestore.collection(collection).doc(doc);
	
	        await updateRef
			.update({
				callID: ""	
			})
			.then(() => {
				console.log("callID successfully deleted!");
			})
			.catch((error) => {
				// The document probably doesn't exist.
				console.error("Error deleting document: ", error);
			});
	};

	// delete a document
	// const deleteDocument = async (id) => {
	// 	dispatch({ type: "IS_PENDING" });
	// 	try {
	// 		await res.doc(id).delete();
	// 		dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
	// 	} catch (error) {
	// 		console.log(error);
	// 		dispatchIfNotCancelled({ type: "ERROR", payload: "Could not delete" });
	// 	}
	// };

	// cleanup function
	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { response, sendJoin, deletePatientCall, deleteDoctorCall, addDocument, sendCallID, addNotification, deleteNotification };
};

// hooks
import { createContext, useEffect, useReducer } from "react";
import { useCollection } from "../hooks/useCollection";
import { usePatientCollection } from "../hooks/usePatientCollection";
// config file
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext();

const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state, user: null };
		case "AUTH_IS_READY":
			return { ...state, user: action.payload, authIsReady: true };
		case "DOCTOR_DATA":
			return { ...state, doctors: action.payload };
		case "PATIENT_DATA":
			return { ...state, patients: action.payload };
		case "DOCTOR_DATA_ERROR":
			return { ...state, doctor_error: action.payload };
		case "PATIENT_DATA_ERROR":
			return { ...state, patient_error: action.payload };
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {

	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		authIsReady: false,
		doctors: null,
		patients: null,
		doctor_error: null,
		patient_error: null,
	});

	const { documents, error } = useCollection(
		"doctors"
		// ["uid", "==", user.uid],
		// ["createdAt", "ascn"]
	);

	const { patientDocuments, patientError } = usePatientCollection("patients");

	// useEffect(() => {
	// 	var distance;
	// 	if (documents) {	
	// 		documents.forEach((doctor) => {
	// 			if (doctor.notification) {
	// 				doctor.notification.forEach((not) => {
	// 					distance = not.appointmentDate * 1000;
	// 					var x = setInterval(function () {
	// 						// Get today's date and time
	// 						var now = new Date().getTime();
	// 						// If the count down is finished, write some text
	// 						if (distance - now < 0) {
	// 							console.log("expired " + "for " + not.patientName);
	// 							clearInterval(x);
	// 						}
	// 					}, 1000);
	// 				});
	// 			}
	// 		});
	// 	}
	// }, [documents]);

	useEffect(() => {
		dispatch({ type: "DOCTOR_DATA", payload: documents });
		dispatch({ type: "DOCTOR_DATA_ERROR", payload: error });
		dispatch({ type: "PATIENT_DATA", payload: patientDocuments });
		dispatch({ type: "PATIENT_DATA_ERROR", payload: patientError });
	}, [documents, patientDocuments]);

	useEffect(() => {
		const unsub = projectAuth.onAuthStateChanged((user) => {
			dispatch({ type: "AUTH_IS_READY", payload: user });
			unsub();
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{
				...state,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

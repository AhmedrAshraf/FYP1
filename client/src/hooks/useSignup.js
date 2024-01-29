// hooks
import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
// config file
import { projectAuth } from "../firebase/config";

export const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    
    const signup = async (
        addDocument,
        email,
		password,
		displayName,
		url,
		role,
		city,
		category,
		experience
    ) => {
        setError(null);
		setIsPending(true);

		try {
			// signup user
			const res = await projectAuth.createUserWithEmailAndPassword(
				email,
				password
			);

			if (!res) {
				throw new Error("Could not complete signup");
			}
				console.log("nwt or data", url)
			// add display name to user
			await res.user.updateProfile({ displayName, photoURL: url });

			// dispatch login user
			dispatch({ type: "LOGIN", payload: res.user });

            if (role === "doctor") {
				addDocument({
					name: displayName,
					email,
					city,
					category,
					role,
					url,
					experience,
					id: res.user.uid,
					notification: [],
				});
            }
			if (role === "patient") {
                addDocument({
                    name: displayName,
                    email,
					city,
                    role,
                    url,
                    id: res.user.uid,
					notification: []
                });
			}

			//update state
			if (!isCancelled) {
				setIsPending(false);
                setError(null);
			}
		} catch (err) {
			if (!isCancelled) {
				console.log(err.message);
				setError(err.message);
                setIsPending(false);
			}
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { error, isPending, signup };
};

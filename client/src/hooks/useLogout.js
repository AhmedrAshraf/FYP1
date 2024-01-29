// hooks
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
// config file
import { projectAuth } from "../firebase/config";

export const useLogout = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    
	const logout = async () => {
        setIsPending(true);

		// signout
		try {
			await projectAuth.signOut();
            
			// dispatch logout action
			dispatch({ type: "LOGOUT" });
			window.location.reload()
            
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
    
    useEffect(() => {return () => setIsCancelled(true)}, []);

	return { logout, error, isPending };
};

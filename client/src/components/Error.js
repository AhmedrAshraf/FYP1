import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";

export const Error = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setInterval(() => {
			navigate("/");
		}, 2000);
	}, [navigate]);

	return <h2 className="error">Invalid url!</h2>;
};

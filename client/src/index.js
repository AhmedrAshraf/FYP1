import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ContextProvider } from "./video/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
		<AuthContextProvider>
			<ContextProvider>
				<App />
			</ContextProvider>
		</AuthContextProvider>
	// </React.StrictMode> 
);

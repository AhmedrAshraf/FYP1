// hooks
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";
import { Error } from "./components/Error";
import Rating from "./pages/Rating/Rating";
import Cards from "./pages/Card/Cards";
import DoctorSignup from "./pages/signup/DoctorSignup";
import PatSignUp from "./pages/signup/PatSignUp";
import DoctorDetails from "./pages/DoctorDetails/DoctorDetails";
import Notification from "./pages/notification/Notification";
import SelectTime from "./pages/SelectTime/SelectTime";
import { useEffect, useState } from "react";
import Video from "./video/Video";

function App() {
	const [doctor, setDoctor] = useState(null)
	const [patient, setPatient] = useState(null)
	const { authIsReady, user, doctors, patients } = useAuthContext();

	useEffect(() => {	
		if (user && doctors) {
			doctors.forEach((doctor) => {
				if (doctor.id === user.uid) {
					setDoctor(doctor)
				}
			});
		}
		if (user && patients) {
			patients.forEach((patient) => {
				if (patient.id === user.uid) {
					setPatient(patient)
				}
			});
		}
	}, [user, patients, doctors])

	return (
		<div className="App">
			{authIsReady && (
				<BrowserRouter>
					<Navbar patient={patient } />
					<Routes>
						
						{/* Home */}
						<Route path="/" element={<Home />} />
						
						{/* Login */}
						{user && <Route path="/login" element={<Navigate to={"/"} />} />} 
						{!user && <Route path="/login" element={<Login />} />}

						{/* DoctorSignup */}
						{user && <Route path="/doctor-signup" element={<Navigate to={"/"} />} />}
						{!user && <Route path="/doctor-signup" element={<DoctorSignup/>} />}
						
						{/* {PatientSignup */}
						{user && <Route path="/patient-signup" element={<Navigate to={"/"} />} />}
						{!user && <Route path="/patient-signup" element={<PatSignUp/>} />}

						{/* Doctors */}
						<Route path="/doctors" element={<Cards doctors={doctors} />} />

						{/* Notification */}
						{user && <Route path="/notification" element={<Notification doctor={doctor} user={user} />} />}
						{!user && <Route path="/notification" element={<Error/>}  />}
						
						{/* DoctorDetails */}
						{user && <Route path="/doctor-details" element={<DoctorDetails user={user} doctors={doctors} patients={patients} />} />}
						{!user && <Route path="/doctor-details" element={<Navigate to={"/login"} />} />}

						{user && <Route path="/select-time" element={<SelectTime />} />}
						{!user && <Route path="/select-time" element={<Error />} />}
						
						{user && <Route path="/video-call" element={<Video patient={patient} />} />}
						{!user && <Route path="/video-call" element={ <Error/>} />}

						<Route path="/rating" element={<Rating />} />

						{/* Invalid url */}
						<Route path="*" element={<Error/>} />
					</Routes>
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;

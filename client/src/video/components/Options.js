import "./Options.css";
import { SocketContext } from "../SocketContext";
import { useContext, useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import Swal from 'sweetalert2';

const Options = ({ children }) => {
	const { me, callAccepted, callEnded, leavePatientCall,leaveDoctorCall, callUser } =
		useContext(SocketContext);
	const { user, patients, doctors } = useAuthContext();
	const [patient, setPatient] = useState(null)
	const [doctor, setDoctor] = useState(null)
	const { sendCallID } = useFirestore("doctors");
	
	useEffect(() => {	
		if (user && patients) {
			patients.forEach((patient) => {
				if (patient.id === user.uid) {
					setPatient(patient)
				}
			});
		}
		if (user && doctors) {
			doctors.forEach((doctor) => {
				if (doctor.id === user.uid) {
					setDoctor(doctor)
				}
			});
		}
	}, [user, patients, doctors])

	const joinHandle = (e, doctorDocID, idToCall) => {
		e.preventDefault()
		sendCallID(doctorDocID, idToCall)
			.then(() => {
				Swal.fire({
                    icon: 'success',
                    title: 'wait!!',
                    text: "Please Wait...",
                });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	console.log('nwt me', me)

	return (
		<div className="container">
			<div className="paper">
				<div className="root">
					<div className="grid-container">
						<div className="padding">
							{ patient && patient.callID && patient.callID.doctorDocID &&
								<button
									className="btnn"
									onClick={(e) => joinHandle(e, patient.callID.doctorDocID, me)}
								>
									Join
								</button>}
						</div>
						<div className="padding">
							{doctor && doctor.callID &&<p>Make a call</p>}
							{callAccepted && !callEnded ? (
								(patient && patient.docID && <button onClick={(e) => leavePatientCall(e, patient.docID)} className="btnn">
									Hang Up
								</button>) ||
								(doctor && doctor.docID && <button onClick={(e) => leaveDoctorCall(e, doctor.docID)} className="btnn">
									End Meeting
								</button>)
							) : (
								(doctor && doctor.callID &&
									<button
										className="btnn"
										onClick={(e) => callUser(e, doctor.callID, doctor.name)}
									>
										Call
									</button>
								) 
							)}
						</div>
					</div>
				</div>
			{children}
			</div>
		</div>
	);
};

export default Options;

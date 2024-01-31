import "./SelectTime.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { useLocation } from "react-router";
import { useFirestore } from "../../hooks/useFirestore";
import { projectFirestore, storageRef, timestamp } from "../../firebase/config";
import Swal from 'sweetalert2';

function SelectTime() {
	const location = useLocation();
	const { user, doctors } = useAuthContext();
	const [date, setdate] = useState("");
	const [time, setTime] = useState("");
	const [fieldError, setFieldError] = useState(null);
	const { addNotification } = useFirestore("doctors");
	const [medReport, setMedReport] = useState({})
	  
	const toTimestamp = strDate => {
		var datum = Date.parse(strDate);
		return datum / 1000;
	};

	const createdAt = timestamp.fromDate(new Date());
	
	const notification = {
		doctorID: location.state.doctorData.id,
		doctorDocID: location.state.doctorData.docID,
		doctorName: location.state.doctorData.name,
		doctorEmail:location.state.doctorData.email,
		patientID: location.state.patientData.id,
		patientDocID: location.state.patientData.docID,
		patientName: location.state.patientData.name,
		patientEmail: location.state.patientData.email,
		appointmentDate: toTimestamp(`${date} ${time}`),
		createdAt
	};

	const isCorrectDate = (date, time) => {
		const now = Date.now();
		const appTime = toTimestamp(`${date} ${time}`) * 1000;
		return appTime - now < 0 ? false : true
	}

	const handleButton = (e) => {
		setTime(e.target.value)
		const node = e.target.parentNode.childNodes;
		for (let i = 0; i < node.length; i++){
			if (node[i].className.includes("timeButton")) {
				node[i].className = "timeButton";
			}
		}
		e.target.className = 'timeButton active';
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		if (user && doctors) {
			doctors.forEach((doctor) => {
				if (doctor.id === user.uid) {
					setTime("");
					setdate("");
					Swal.fire({
						icon: 'success',
						title: 'login as a patient!',
						text: "${doctor.name}, please log in as a patient!",
					});
				}
			});
		}
		if (user && location.state.patientData && location.state.doctorData) {
			if (date === "" && time === "") {
				setFieldError("Please select date and time!");
			} else if (!isCorrectDate(date, time)) {
				setFieldError("Invalid Date!");
			}else {
				if(medReport?.name){
					const snapshot = await storageRef.child(`/medical_reports/${medReport.name}`).put(medReport);
					const downloadURL = await snapshot.ref.getDownloadURL();
					const medicalReportsRef = projectFirestore.collection('medical_reports').doc()
					await medicalReportsRef.set({
						doctorId: location.state.doctorData.docID,
						userId: user.uid,
						url: downloadURL
					  });
				   
				}
				addNotification(location.state.doctorData.docID, notification)
					.then(res => {
						Swal.fire({
							icon: 'success',
							title: ' Please wait',
							text: " your request has been submitted, Please wait for Dr's approval",
						});
					})
					.catch(error => {
						// alert(`${user.displayName} there is an error, Please try again`);
						console.log(error);
					});
				setTime("");
				setdate("");
				setFieldError(null);
			}
		};
	}

	const handleMedReport = (e) => {
		if(e.target.files.length > 0){
			setMedReport(e.target.files[0])
		}
	}

		return (
			<>
				<div className="con">
					<img src={location.state.doctorData.url} alt="doc" className="time"/>
					<div className="dr">
						<p style={{textTransform:"capitalize",fontWeight:'bold'}}>{location.state.doctorData.name }</p>
						<p style={{color:'orange'}}>
							Online Video Consultation
						</p>
					</div>
				</div>
				<div className="sect">
					<div className="cen">
						<button
							className="timeButton"
							onClick={(e) => handleButton(e)}
							value="16:00:00"
						>
							04:00 PM
						</button>
						<button
							className="timeButton"
							onClick={(e) => handleButton(e)}
							value="17:00:00"
						>
							05:00 PM
						</button>
						<button
							className="timeButton"
							onClick={(e) => handleButton(e)}
							value="18:00:00"
						>
							06:00 PM
						</button>
						<button
							className="timeButton"
							onClick={(e) => handleButton(e)}
							value="19:00:00"
						>
							07:00 PM
						</button>
						<button
							className="timeButton"
							onClick={(e) => handleButton(e)}
							value="20:00:00"
						>
							08:00 PM
						</button>
						<div className="date">
							<input 
								className="date-input"
								type="date"
								id="date"
								onChange={(e) => setdate(e.target.value)}
								value={date}
							/>
						</div>
						<div style={{margin: "10px 0px"}}>
							<label htmlFor="">Submit Medical Report</label>
							<br />
							<input type="file"  onChange={handleMedReport} id="" />
						</div>
						<div className="done">
								<button onClick={handleSubmit} id="done">
									Done
								</button>
						</div>
						<div className="done">
							{fieldError && <p style={{ color: "red" }}>{fieldError}</p>}
						</div>
					</div>
				</div>
			</>
		);
	};
export default SelectTime;

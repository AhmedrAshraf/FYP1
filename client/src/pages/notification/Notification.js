import "./Notification.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState, useContext } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { SocketContext } from "../../video/SocketContext";
import { useNavigate } from "react-router";
import { projectFirestore } from "../../firebase/config";
import Swal from 'sweetalert2';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faXmark as faXmarkLarges } from "@fortawesome/free-solid-svg-icons";
// library.add(faXmarkLarges);

const Notification = () => {
	const { user, doctors, patients } = useAuthContext();
	const { deleteNotification } = useFirestore("doctors");
	const [notifications, setNotifications] = useState(null);
	const [doctorDocID, setDoctorDocID] = useState(null);
	const [showDoctor, setShowDoctor] = useState(null);
	const [medReport, setMedReport] = useState(null)
	const { addNotification, sendJoin } = useFirestore("patients");
	const navigate = useNavigate();

	const toDate = (seconds) => {
		const timestamp = {
			seconds: seconds,
		};
		var dateFormat = new Date(timestamp.seconds * 1000);

		return (
			dateFormat.getDate() +
			" / " +
			(dateFormat.getMonth() + 1) +
			" / " +
			dateFormat.getFullYear() +
			" " +
			dateFormat.getHours() +
			":" +
			dateFormat.getMinutes() +
			":" +
			dateFormat.getSeconds()
		);
	};

	// useEffect(() => {
	// 	var x = setInterval(function () {
	// 		// Get today's date and time
	// 		// var now = new Date().getTime();
	// 		// console.log(now)
	// 		// If the count down is finished, write some text
	// 		// if ((distance - now) < 0) {
	// 			// 	console.log("expired " + "for " + not.patientName)
	// 			// 	clearInterval(x);
	// 			// }
	// 			console.log("a");
	// 		}, 1000);
	// 	}, [])

	useEffect(() => {
		if (user) {
			if (doctors) {
				doctors.forEach((doctor) => {
					if (doctor.id === user.uid) {
						setNotifications(doctor.notification);
						setShowDoctor(true);
						setDoctorDocID(doctor.docID);
					}
				});
			} else {
				setShowDoctor(false);
			}
			if (patients) {
				patients.forEach((patient) => {
					if (patient.id === user.uid) {
						setNotifications(patient.notification);
						setDoctorDocID(patient.docID);
					}
				});
			}
		}
	}, [user, doctors]);

	const removeNotification = (e) => {
		deleteNotification(doctorDocID, e);
	};

	const approveNotification = (docID, e) => {
		addNotification(docID, e)
		.then((res) => {
            // Display success message
            Swal.fire({
                icon: 'success',
                title: 'Appointment Approved',
                text: 'Appointment has been approved',
            });
		})
			.catch((error) => {
				
				Swal.fire({
					icon: 'success',
					title: 'Error',
					text: 'Error occurred!',
				});
			});
	};

	const handleCall = (patientDocID, doctorDocID) => {
		sendJoin(patientDocID, doctorDocID)
			.then(() => {
				navigate("/video-call");
				window.location.reload();
			})
			.catch((error) => {
				Swal.fire({
                    icon: 'success',
                    title: 'Err!',
                    text: 'Something is wrong',
                });
				console.log(error);
			});
	};


	const getMedicalReport = async (doctorId, patientId) => {
		console.log('nwt',doctorId,patientId)
		try {
			const medicalReportsRef = projectFirestore.collection('medical_reports');
			const querySnapshot = await medicalReportsRef
			  .where('doctorId', '==', doctorId)
			  .where('userId', '==', patientId)
			  .get();
			console.log("nwt report daata ===>", querySnapshot)
			if (!querySnapshot.empty) {
			  const reportData = querySnapshot.docs[0].data();
			  console.log('nwt repor', reportData)
			  setMedReport(reportData.url)
			  return reportData.url;
			} else {
			  return false;
			}
		  } catch (error) {
			console.error('Error fetching medical report:', error);
			return 'Error fetching medical report.';
		  }
	}

	return (
		<div className="notification">
			{notifications &&
				notifications.map((notification) => {
					getMedicalReport(notification.doctorDocID, notification.patientID);
					return (
						<>
						<div className="notification-div" key={Math.random()}>
						<br />
							{medReport && (
									<div className="delete">
										<a className="approve" href={medReport} target="_blank">
											Medical Report
										</a>
									</div>
								)}
							<div className="details">
								<p>Patient Name: {notification.patientName}</p>
								<p>Patient Email: {notification.patientEmail}</p>
								<p>Doctor Name: {notification.doctorName}</p>
								<p>Doctor Email: {notification.doctorEmail}</p>
								<p>Appointment Date: {toDate(notification.appointmentDate)}</p>
								<p>Created At: {toDate(notification.createdAt.seconds)}</p>
							</div>
							<div className="w">
								{showDoctor && (
									<div className="delete">
										<button className="Reject" onClick={() => removeNotification(notification)}>
											Reject
										</button>
									</div>
								)}
								
								<div className="dele">
									{showDoctor && (
										<button
										className="approve"
											onClick={() =>
												approveNotification(
													notification.patientDocID,
													notification
												)
											}
										>
											Approve
										</button>
									)}
								</div>
								<div className="createcall">
									{showDoctor && (
										<button
											className="create"
											onClick={() =>
												handleCall(
													notification.patientDocID,
													notification.doctorDocID
												)
											}
										>
											CreateCall
										</button>
									)}
								</div>
							</div>
						</div>
							
						</>
					)
				})}
		</div>
	);
};

export default Notification;

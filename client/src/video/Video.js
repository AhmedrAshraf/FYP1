import "./Video.css";
import VideoPlayer from "./components/VideoPlayer";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

function Video() {

	const location = useLocation();
	const [doctorDocID, setDoctorDocID] = useState(null)

	useEffect(() => {
		if (location.state && location.state.doctorDocID) {
			setDoctorDocID(location.state.doctorDocID)
		}
	}, [location.state])

	return (
		<div className="wrapper">
			<div className="app-bar">
				<h1>Video  <span style={{color:'orange'}}>Call</span> </h1>
			</div>
			<VideoPlayer/>
			<Options doctorDocID={doctorDocID} >
				<Notifications />
			</Options>
		</div>
	);
}

export default Video;

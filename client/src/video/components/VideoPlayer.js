import "./VideoPlayer.css";
import { SocketContext } from "../SocketContext";
import { useContext } from "react";

const VideoPlayer = () => {
	const {
		docName,
		callAccepted,
		myVideo,
		userVideo,
		callEnded,
		stream,
		call,
	} = useContext(SocketContext);

	return (
		<div className="grid-containe">
			{stream && (
				<div className="paper">
					<h2 className="name">{docName || "Name"}</h2>
					<video playsInline className="video" muted autoPlay ref={myVideo} />
				</div>
			)}
			{callAccepted && !callEnded && (
				<div className="paper">
					<h2 className="name">{call.name || "Name"}</h2>
					<video playsInline ref={userVideo} autoPlay className="video" />
				</div>
			)}
		</div>
	);
};

export default VideoPlayer;

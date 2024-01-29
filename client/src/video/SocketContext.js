import { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { useFirestore } from "../hooks/useFirestore";
const SocketContext = createContext();

const socket = io("http://localhost:5000");
// const socket = io("http://localhost:3000");
// const socket = io('web-production-dcf0.up.railway.app');

const ContextProvider = ({ children }) => {
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const [stream, setStream] = useState();
	const [docName, setDocName] = useState("");
	const [call, setCall] = useState({});
	const [me, setMe] = useState("");
	const [counter, setCounter] = useState(0);
	const { deletePatientCall } = useFirestore("patients");
	const { deleteDoctorCall } = useFirestore("doctors");

	const myVideo = useRef();
	const userVideo = useRef();
	const connectionRef = useRef();

	useEffect(() => {
		const getUserMedia = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true,
					audio: true,
				});
				if (!stream) {
					return setCounter((c) => c++);
				}

				setStream(stream);
				setTimeout(() => {
					if (myVideo.current) {
						myVideo.current.srcObject = stream;
					}
				}, 2000);
			} catch (e) {
				console.log(e);
			}
		};
		getUserMedia();

		socket.on("me", (id) => setMe(id));
		socket.on("callUser", ({ from, name: callerName, signal }) => {
			setCall({ isReceivingCall: true, from, name: callerName, signal });
		});
	}, [counter]);

	const answerCall = () => {
		setCallAccepted(true);

		const peer = new Peer({ initiator: false, trickle: false, stream });

		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: call.from });
		});

		peer.on("stream", (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		peer.signal(call.signal);

		connectionRef.current = peer;
	};

	const callUser = (e, id, doctorName) => {
		e.preventDefault();
		const peer = new Peer({ initiator: true, trickle: false, stream });
		setDocName(doctorName)

		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: doctorName,
			});
		});

		peer.on("stream", (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		socket.on("callAccepted", (signal) => {
			setCallAccepted(true);

			peer.signal(signal);
		});

		connectionRef.current = peer;
	};

	const leavePatientCall = (e, patientDocID) => {
		e.preventDefault();
		setCallEnded(true);

		deletePatientCall(patientDocID)
			.then(() => {
				connectionRef.current.destroy();
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const leaveDoctorCall = (e, doctorDocID) => {
		e.preventDefault();
		setCallEnded(true);

		deleteDoctorCall(doctorDocID)
			.then(() => {
				connectionRef.current.destroy();
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<SocketContext.Provider
			value={{
				call,
				callAccepted,
				myVideo,
				userVideo,
				stream,
				setStream,
				docName,
				setDocName,
				callEnded,
				me,
				callUser,
				leavePatientCall,
				leaveDoctorCall,
				answerCall,
				setMe,
				setCall,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export { ContextProvider, SocketContext };

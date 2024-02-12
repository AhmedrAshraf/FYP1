import "./Options.css";
import { useNavigate } from "react-router";
import { SocketContext } from "../SocketContext";
import { useContext, useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import Swal from "sweetalert2";

const Options = ({ children }) => {
  const {
    me,
    callAccepted,
    callEnded,
    leavePatientCall,
    leaveDoctorCall,
    callUser,
  } = useContext(SocketContext);
  const Navigate = useNavigate();
  const { user, patients, doctors } = useAuthContext();
  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const { sendCallID } = useFirestore("doctors");

  const doctorIDs = doctors ? doctors.map((doctor) => ({ docID: doctor.docID, id: doctor.id })) : [];
  const patientID = patient?.callID?.doctorDocID;
  const matchingDoctor = doctorIDs.find((doctor) => doctor.docID === patientID);

  useEffect(() => {
    if (user && patients) {
      patients.forEach((patient) => {
        if (patient.id === user.uid) {
          setPatient(patient);
        }
      });
    }
    if (user && doctors) {
      doctors.forEach((doctor) => {
        if (doctor.id === user.uid) {
          setDoctor(doctor);
        }
      });
    }
  }, [user, patients, doctors]);

  const joinHandle = (e, doctorDocID, idToCall) => {
    e.preventDefault();
    sendCallID(doctorDocID, idToCall)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Wait!!",
          text: "Please Wait...",
        });
      })
      .catch((error) => {
				console.log(error);
      });
  };

console.log('nwt me', me)

  const handleHangUp = (e) => {
    e.preventDefault();
    if (patient && patient.docID) {
      leavePatientCall(e, patient.docID);
      Navigate("/rating", {
        state: { patientID: patient.id, doctorID: matchingDoctor.id },
      });
    }
  };

  return (
    <div className="container">
      <div className="paper">
        <div className="root">
          <div className="grid-container">
            <div className="padding">
              {patient && patient.callID && patient.callID.doctorDocID && (
                <button
                  className="btnn"
                  onClick={(e) => joinHandle(e, patient.callID.doctorDocID, me)}
                >
                  Join
                </button>
              )}
            </div>
            <div className="padding">
              {doctor && doctor.callID && <p>Make a call</p>}
              {callAccepted && !callEnded
                ? (patient && patient.docID && (
                    <button onClick={handleHangUp} className="btnn">
                      Hang Up
                    </button>
                  )) ||
                  (doctor && doctor.docID && (
                    <button
                      onClick={(e) => leaveDoctorCall(e, doctor.docID)}
                      className="btnn"
                    >
                      End Meeting
                    </button>
                  ))
                : doctor &&
                  doctor.callID && (
                    <button
                      className="btnn"
                      onClick={(e) => callUser(e, doctor.callID, doctor.name)}
                    >
                      Call
                    </button>

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

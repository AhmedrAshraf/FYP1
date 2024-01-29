import "./Doctor.css";
import { useNavigate } from "react-router";

const Doctor = () => {
  const Navigate = useNavigate();
  return (
    <div className="section-four">
      <div className="flex-contain">
        <div className="item-left">
          <p style={{ color: "orange" }}>
            Are you a five star doctor<span style={{ color: "#006" }}>?</span>
          </p>
          <p style={{ fontSize: "20px", color: "#006" }}>
            signUp to reach millions of patient
          </p>

          <div
            style={{ fontSize: "20px", color: "orange", paddingTop: "20px" }}
          >
            <p>Get more appointments through online booking</p>
            <p>Create and view patient records from anywhere</p>
            <p>Manage your schedule efficiently</p>
          </div>
          <div className="dBut">
            <button className="butt" onClick={() => Navigate("/doctor-signup")}>
              Join Now
            </button>
          </div>
        </div>
        <div className="item-right"></div>
      </div>
    </div>
  );
};

export default Doctor;

import "./DoctorDetails.css";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { projectFirestore } from "../../firebase/config";
import StarIcon from "@mui/icons-material/Star";

const DoctorDetails = ({ user, doctors, patients }) => {
  const location = useLocation();
  const Navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsCollection = await projectFirestore
          .collection("reviews")
          .get();
        const reviewsData = reviewsCollection.docs.map((doc) => doc.data());
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const doctorId = location.state.data.id;
    const reviewsForDoctor = reviews.filter(
      (review) => review.doctorID === doctorId
    );
    setFilteredReviews(reviewsForDoctor);

  }, [location.state.data.id, reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      if (doctors) {
        doctors.forEach((doctor) => {
          if (doctor.id === user.uid) {
            Swal.fire({
              icon: "success",
              title: "Err!",
              text: "please login as a patient!",
            });
          }
        });
      }
      if (patients) {
        patients.forEach((patient) => {
          if (patient.id === user.uid) {
            Navigate("/select-time", {
              state: { patientData: patient, doctorData: location.state.data },
            });
          }
        });
      }
    } else {
      Swal.fire({
        icon: "success",
        title: " Please login",
        text: "You are not logged in! Please login...",
      });
    }
  };

  return (
    <div className="DoctorDetails">
      <div className="fle">
        <div className="flex-lef">
          <div className="lef">
            <img src={location.state.data.url} alt="profile" className="i" />
          </div>
          <div className="rig">
            <h5>{location.state.data.name}</h5>
            <p>{location.state.data.email}</p>
            <p>{location.state.data.category}</p>
            <p>experience: {location.state.data.experience} years</p>
            <p>{location.state.data.city.name}</p>
            <p>qualification : {location.state.data.qualification}</p>
          </div>
        </div>
        <div className="flex-righ">
          <h5 style={{ textAlign: "center", padding: "20px" }}>
            online video consultation
          </h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-Between",
              padding: "15px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            <p>Fee</p>

            <p>{location.state.data.fees}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-Between",
              padding: "15px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            <p>Address:</p>
            <p>Use phone/laptop for video call</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-Between",
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            <p style={{ marginTop: "10px" }}>Available Slot:</p>
            <select className="sel">
              <option>Monday 4:30pm-8pm</option>
              <option>Wednesday 4:30pm-8pm</option>
              <option>Friday 4:30pm-8pm</option>
            </select>
          </div>
          <div style={{ textAlign: "center", paddingBottom: "10px" }}>
            <button className="b" onClick={handleSubmit}>
              book video consultation
            </button>
          </div>
        </div>
      </div>

      {filteredReviews.length > 0 && (
        <div className="drReview">
          <h3>Reviews and Ratings for {location.state.data.name}</h3>
          {filteredReviews.map((review, index) => (
            <div key={index} style={{marginTop: 15}}>
              <p>{review.review}</p>
              <div className="star-container">
                {[...Array(5)].map((_, starIndex) => (
                  <StarIcon
                    key={starIndex}
                    style={{
                      color: starIndex < review.rating ? "#FFD700" : "#808080",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;

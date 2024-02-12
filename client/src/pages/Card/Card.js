import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { projectFirestore } from "../../firebase/config";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Card = ({ doctor }) => {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState(null);

  const fetchCollection = async (collectionName) => {
    try {
      const snapshot = await projectFirestore.collection(collectionName).get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching collection:", error);
      return [];
    }
  };

  useEffect(() => {
    const getDoctorReviews = async () => {
      try {
        const reviewsData = await fetchCollection("reviews");
        const filteredReviews = reviewsData.filter(
          (review) => review.doctorID === doctor.id
        );

        const totalRating = filteredReviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );

        setAverageRating(
          filteredReviews.length > 0
            ? totalRating / filteredReviews.length
            : null
        );
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    getDoctorReviews();
  }, [doctor.id]);

  return (
    <div key={doctor.id} className="card">
      <img src={doctor.url} alt="DocImage" className="DocImage" />
      <p className="doctor-details">{doctor.name}</p>
      <p className="doctor-details">{doctor.category}</p>
      <p className="doctor-details">{doctor.experience} years experience</p>
      <p className="doctor-details">{doctor.city?.formatted}</p>
      {typeof doctor.distance === "number" &&
        !isNaN(doctor.distance) &&
        isFinite(doctor.distance) && (
          <span className="doctor-details" style={{ fontSize: "14px" }}>
            {doctor.distance}km away
          </span>
        )}

      {averageRating !== null && (
        <div className="star-container">
          {[...Array(5)].map((_, index) => (
            <IconButton
              key={index}
              size="small"
              style={{ pointerEvents: "none" }}
            >
              {index < Math.round(averageRating) ? (
                <StarIcon style={{ color: "#FFD700" }} />
              ) : (
                <StarBorderIcon style={{ color: "#808080" }} />
              )}
            </IconButton>
          ))}
        </div>
      )}

      <div className="doctor-details view">
        <button
          className="view-more"
          onClick={() =>
            navigate("/doctor-details", { state: { data: doctor } })
          }
        >
          View more
        </button>
      </div>
    </div>
  );
};

export default Card;

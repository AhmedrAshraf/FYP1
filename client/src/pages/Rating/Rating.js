import "./RatingScreen.css";
import React, { useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useFirestore } from "../../hooks/useFirestore"
import IconButton from '@mui/material/IconButton';
import { useLocation, useNavigate } from "react-router";

  const RatingScreen = () => {
    const { addDocument } = useFirestore("reviews");
    const [rating, setRating] = useState(null);
    const [review, setReview] = useState("");
    
    const location = useLocation();
    const navigate = useNavigate();
    const patientID = location.state ? location.state.patientID : null;
    const doctorID = location.state ? location.state.doctorID : null;

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmitRating = () => {
    addDocument({ rating, review, doctorID, patientID });

    setRating("");
    setReview("");
    navigate("/");
  };

  return (
    <div className="rating-screen-container">
      <div className="rating-screen">
        <h1>Rate Your Experience</h1>
        <div className="rating-container">
          {[1, 2, 3, 4, 5].map((value) => (
            <div
              key={value}
              className={`star ${value <= rating ? "filled" : ""}`}
              onClick={() => handleRatingChange(value)}
            >
              <IconButton size="small">
                {value <= rating ? (
                  <StarIcon color="primary" />
                ) : (
                  <StarBorderIcon color="primary" />
                )}
              </IconButton>
            </div>
          ))}
        </div>

        <textarea
          className="review-input"
          placeholder="Write your review..."
          value={review}
          onChange={handleReviewChange}
        />

        <button
        className="submit-button"
        onClick={handleSubmitRating}
        disabled={!rating || !review}
        style={{ backgroundColor: !rating || !review ? "#CCCCCC" : ""}}
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default RatingScreen;
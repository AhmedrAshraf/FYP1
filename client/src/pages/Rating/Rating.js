import "./RatingScreen.css";
import React, { useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore"
import IconButton from '@mui/material/IconButton';

const RatingScreen = () => {
const { addDocument } = useFirestore("reviews");

  const { user } = useAuthContext();
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmitRating = () => {
    const userUID = user ? user.uid : null;
    addDocument({ rating, review, reviewerUID: userUID });

    console.log("Submitted Rating:", rating);
    console.log("Submitted Review:", review);

    setRating(null);
    setReview("");
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

        <button className="submit-button" onClick={handleSubmitRating}>
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default RatingScreen;
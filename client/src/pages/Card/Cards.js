import "./Cards.css";
import Card from "./Card";
import { useAuthContext } from "../../hooks/useAuthContext";
import { projectFirestore } from "../../firebase/config";
import { useEffect, useState } from "react";
import { calculateDistance } from "../../utils";

const Cards = ({ doctors, search, sortOption }) => {
  const { user } = useAuthContext();
  const [docs, setDocs] = useState(doctors);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const reviewsCollection = await projectFirestore
        .collection("reviews")
        .get();
      const reviewsData = reviewsCollection.docs.map((doc) => doc.data());
      if (sortOption === "rating") {
        reviewsData.sort((a, b) => {
          const ratingA = a.averageRating || 0;
          const ratingB = b.averageRating || 0;
          return ratingB - ratingA;
        });
      }

      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [sortOption]);

  const filterDoctors = async () => {
    try {
      const data = await projectFirestore
        .collection("patients")
        .where("id", "==", user.uid)
        .get();
      let userData = [];
      data.forEach((doc) => userData.push(doc.data()));

      userData = userData?.at(0);

      const filteredDoctors = doctors.map((dct) => {
        let distance = calculateDistance(
          userData?.city?.lat,
          userData?.city?.lon,
          dct?.city?.lat,
          dct?.city?.lon
        );
        dct.distance = parseInt(distance);
        return dct;
      });

      let sortedDocs;

      if (sortOption === "fees") {
        sortedDocs = filteredDoctors.sort(
          (a, b) => parseInt(a.fees) - parseInt(b.fees)
        );
      } else if (sortOption === "experience") {
        sortedDocs = filteredDoctors.sort(
          (a, b) => parseInt(b.experience) - parseInt(a.experience)
        );
      } else if (sortOption === "nearest") {
        sortedDocs = filteredDoctors.sort(
          (a, b) => parseInt(a.distance) - parseInt(b.distance)
        );
      } else if (sortOption === "rating") {
        sortedDocs = filteredDoctors.sort((a, b) => {
          const averageRatingA = getAverageRating(a.id);
          const averageRatingB = getAverageRating(b.id);
          return averageRatingB - averageRatingA;
        });
      } else {
        sortedDocs = filteredDoctors;
      }

      setDocs([...sortedDocs]);
    } catch (error) {
      console.error("Error filtering doctors:", error);
    }
  };

  const getAverageRating = (doctorId) => {
    const doctorReviews = reviews.filter(
      (review) => review.doctorID === doctorId
    );
    const totalRating = doctorReviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0
    );
    return doctorReviews.length > 0 ? totalRating / doctorReviews.length : 0;
  };

  useEffect(() => {
    if (user) {
      filterDoctors();
    }
  }, [sortOption]);

  return (
    <div className="cards">
      {docs &&
        search &&
        docs
          .filter((data) => {
            return (
              data.name.toLowerCase().match(search.toLowerCase()) ||
              data.category.toLowerCase().match(search.toLowerCase())
            );
          })
          .map((card, index) => {
            return <Card key={index} doctor={card} />;
          })}
      {docs &&
        !search &&
        docs.map((doctor, index) => <Card doctor={doctor} key={index} />)}
    </div>
  );
};

export default Cards;

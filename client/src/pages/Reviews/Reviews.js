import "./Reviews.css";
import DocImage from "../../Images/docImage.jpg";
import DocImage2 from "../../Images/doctor.png";
import DocImage3 from "../../Images/DoctorT.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar as fasFaStar } from "@fortawesome/free-solid-svg-icons";
library.add(fasFaStar);

const Reviews = () => {
	return (
		<div className="section-five">
			<div className="Reviews">
				<div className="Review">
					<div className="ratings">
						<FontAwesomeIcon icon={fasFaStar} />
						<FontAwesomeIcon icon={fasFaStar} />
						<FontAwesomeIcon icon={fasFaStar} />
						<FontAwesomeIcon icon={fasFaStar} />
						<FontAwesomeIcon icon={fasFaStar} />
					</div>
					<p className="review-text">
						"Great platform, very efficient and works really well on both phone
						and web. I think this is the most easiest way of booking
						appointments in Pakistan as it has made the whole process "
					</p>
					<img src={DocImage} alt="Doct" className="Doc"></img>
				</div>
				<div className="Review" style={{marginTop:'10px'}}>
					<div className="ratings">
						<FontAwesomeIcon icon={fasFaStar} />
						<FontAwesomeIcon icon={fasFaStar} />
						<FontAwesomeIcon icon={fasFaStar} />
						<FontAwesomeIcon icon={fasFaStar} />
						<FontAwesomeIcon icon={fasFaStar} />
					</div>
					<p className="review-text">
						"A very helpful app for booking appointments and searching for the
						required doctors. Has made my life a lot easy. I would strongly
						recommend this to all"
					</p>
					<img src={DocImage2} alt="Doct" className="Doc"></img>
				</div>
				<div className="Review" style={{marginTop:'10px'}} >
					<div className="ratings">
						<FontAwesomeIcon icon={fasFaStar} />
						<FontAwesomeIcon icon={fasFaStar} />
						<FontAwesomeIcon icon={fasFaStar} />
						<FontAwesomeIcon icon={fasFaStar} />
						<FontAwesomeIcon icon={fasFaStar} />
					</div>
					<p className="review-text">
						"Literally the best website to book the appointments online for
						Doctors. The service is great, helpline guys are very cooperative
						and understanding. And I don't have to hassle through different
						hospitals anymore now."
					</p>
					<img src={DocImage3} alt="D oct" className="Doc"></img>
				</div>
			</div>
		</div>
	);
};

export default Reviews;

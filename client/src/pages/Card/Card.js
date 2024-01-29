import { useNavigate } from "react-router";

const Card = ({ doctor }) => {
    
    const Navigate = useNavigate();

	return (
		<div key={doctor.id} className="card">
			<img src={doctor.url} alt="DocImage" className="DocImage"></img>
			<p className="doctor-details">{doctor.name}</p>
			<p className="doctor-details">{doctor.category}</p>
			<p className="doctor-details">{doctor.experience} years experience</p>
			<p className="doctor-details">{doctor.city?.formatted}</p>
			{doctor?.distance && <span className="doctor-details" style={{fontSize: '14px'}}>{doctor?.distance}km away</span>}
			<div className="doctor-details view">
				<button
					className="view-more"
					onClick={() =>
						Navigate("/doctor-details", { state: { data: doctor } })
					}
				>
					view more
				</button>
			</div>
		</div>
	);
};

export default Card;

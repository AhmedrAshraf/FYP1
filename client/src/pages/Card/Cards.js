import "./Cards.css";
import Card from "./Card";
import { useAuthContext } from "../../hooks/useAuthContext";
import { getDoc } from 'firebase/firestore'
import { projectFirestore } from "../../firebase/config";
import { useEffect, useState } from "react";
import { calculateDistance } from "../../utils";
import _ from "lodash";

const Cards = ({ doctors, search, sortOption }) => {
	const {user} = useAuthContext();
	const [docs, setDocs] = useState(doctors);
	const filterDoctors = async () => {
		const data = await projectFirestore.collection('patients').where('id', '==', user.uid).get();
		console.log(data);
		let userData = [];
		data.forEach((doc) => userData.push(doc.data()));

		userData = userData?.at(0);
		
		const filteredDoctors = doctors.map(dct => {
			let distance = calculateDistance(userData.city.lat, userData.city.lon, dct.city.lat, dct.city.lon);
			dct.distance = parseInt(distance);
			return dct
		})

	let sortedDocs;

    if (sortOption === "fees") {
      sortedDocs = filteredDoctors.sort((a, b) => parseInt(a.fees) - parseInt(b.fees));
    } else if (sortOption === "experience") {
      sortedDocs = filteredDoctors.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
    } else if (sortOption === "nearest") {
      sortedDocs = filteredDoctors.sort((a, b) => parseInt(a.distance) - parseInt(b.distance));
    }
	else{
		sortedDocs = filteredDoctors;

	}

    setDocs(sortedDocs);
  };

  useEffect(() => {
    if (user) {
      filterDoctors();
    }
  }, [sortOption]);

	return (
	  	
		<div className="cards">
			{docs && search &&
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
						{docs && !search &&
							docs.map((doctor, index) => (
								<Card doctor={doctor} key={index } />
					))}
		</div>
	);
};

export default Cards;

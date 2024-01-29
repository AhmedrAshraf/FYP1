// styles
import "./PatSignUp.css";
// hooks
import { useState, useEffect } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useFirestore } from "../../hooks/useFirestore";
import { storageRef } from "../../firebase/config";
import { Link } from "react-router-dom";
import { getCity } from "../../utils";

export default function PatSignUp() {
  const [email, setEmail] = useState("");
	const [displayName, setdisplayName] = useState("");
	const [photo, setPhoto] = useState("");
	const [city, setCity] = useState("");
	const [cityObj, setCityObj] = useState({});
	const [cityList, setCityList] = useState([])
	const [password, setPassword] = useState("");
	const { error, isPending, signup } = useSignup();
	const [url, setUrl] = useState("");
	const { addDocument } = useFirestore("patients");
	const [photoPending, setPhotoPending] = useState(false);
	const role = "patient"
  
  useEffect(() => {
		if (url) {
			signup(addDocument, email, password, displayName, url, role,cityObj);
		}
  }, [url]);

  const fetchCities = async (city) => {
	const res = await getCity(city)
	if(res.length > 0){
		setCityList(res);
	}else{
		setCityList([]);
	}
}

useEffect(() =>{
	if(city){
		fetchCities(city);
	}else{
		setCityList([])
	}
},[city])

useEffect(() =>{
	setCity(cityObj.city)
	setCityList([]);
},[cityObj])
	
	const handleSubmit = (e) => {
		e.preventDefault();

		var uploadTask = storageRef.child(`images/${photo.name}`).put(photo)

		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setPhotoPending(progress);
			},
			(error) => {
				console.log(error.message)
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					setUrl(downloadURL)
				});
			}
		);
	};

	return (
		<div className="bg" style={{ minHeight: '91.5vh'}}>
			<div className="containe">
				<form onSubmit={handleSubmit} className="signup-form">
					<h3 className="h1">SignUP <span style={{color:'orange'}}>Form</span></h3>

					<div className="col-25">
						<label>Email</label>
					</div>
					<div>
						<input type="email" onChange={(e) => setEmail(e.target.value)}
				value={email} placeholder="Email" id="email" />
					</div>

					<div className="col-25">
						<label>Password</label>
					</div>
					<div>
						<input onChange={(e) => setPassword(e.target.value)}
				value={password} type="password" placeholder="Password" id="password" />
					</div>

					<div className="col-25">
						<label>DisplayName</label>
					</div>
					<div>
            <input
              onChange={(e) => setdisplayName(e.target.value)}
              value={displayName}
							type="text"
							id="fname"
							name="firstname"
							placeholder=" name.."
						/>
					</div>
					<div className="col-25">
						<label>City</label>
					</div>
					<div style={{position: 'relative'}}>
						<input
							onChange={(e) => setCity(e.target.value)}
							value={city}
							type="text"
							id="city"
							name="firstname"
							placeholder="City"
						/>
						{cityList.length > 0 && (
							<>
								<div style={{background: '#fff', width: '100%', borderRadius:'10px', padding: "15px", boxShadow: '0px 0px 20px #ccc', position: 'absolute'}}>
									{cityList.map((city, i) => (
										<>
										<div onClick={() => setCityObj(city)} key={i} style={{cursor:"pointer", marginBottom: "7px"}}>
											<span>{city?.city}</span>,
											<span>{city?.county}</span>
										</div>
										</>
									))}
								</div>
							</>
						)}
					</div>

					<div className="col-25">
						<label>Photo</label>
					</div>
					<div>
						<input
							type="file"
							id="file"
							name="firstname"
              placeholder="Picture"
              onChange={(e) => setPhoto(e.target.files[0])}
						/>
						{photoPending && <p className="percentage" style={{color:'red',marginLeft:'230px',marginTop:'-22px'}}>{parseInt(photoPending) + "%"}</p>}
					</div>
					
					<div className="col">
						{!isPending && (
							<button type="submit" className="bt">
								Submit
							</button>
						)}
						{isPending && (
							<button type="submit" className="bt" disabled>
								Loading
							</button>
						)}
						{error && <p style={{ color: 'red', width:"240px"}}>{error}</p>}
					</div>
					<div>
						<span style={{ color: "#006" }}>
							Already registered?
							<Link
								to="/login"
								style={{ textDecoration: "none", color: "orange" }}
							>
								Login
							</Link>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
}

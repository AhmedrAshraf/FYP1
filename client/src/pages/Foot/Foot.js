import "./Foot.css";
import Twitter from "../../Images/twitter.png";
const Foot = () => {
	return (
		<div className="foot">
			<div className="foot-center">
				<div>
					<p style={{ lineHeight: "35px" }}>
						Copyright @ 2015 - 2023 MediConnect Services, a subsidiary of
						MyDoctor Inc - All Rights Reserved <br></br>
						Reproduction of material from any medcure.com pages without
						permission is strictly prohibited.
					</p>
				</div>
				<div>
					<div>
						<p>connect with us </p>
						<div className="space">
							<img src={Twitter} alt="twitter" style={{ width: "40px" }} />
							<img
								src="https://www.transparentpng.com/thumb/facebook-logo/facebook-icon-transparent-background-20.png"
								alt="facebook"
								style={{ width: "40px", marginLeft: "10px" }}
							/>
							<img
								src="https://www.transparentpng.com/thumb/logo-instagram/YfpFOL-logo-instagram-free-transparent.png"
								alt="instagram"
								style={{ width: "40px", marginLeft: "15px" }}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Foot;

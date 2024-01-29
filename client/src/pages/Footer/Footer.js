import "./Footer.css";
import ver from "../../Images/ver.png";
import Money from "../../Images/money.png";
import Secure from "../../Images/sec.png";
import cus from "../../Images/cus.png";

const Footer = () => {
	return (
		<>
			<div className="main6">
				<div className="footer">
					<h3 style={{ color: "orange" }}>
						Med<span style={{ color: "white" }}>Cure</span>
					</h3>
					<p>
						Book appointments with the best Doctors and Specialists<br></br>{" "}
						such as Gynecologists, Skin Specialists, Child Specialists,<br></br>{" "}
						Surgeons, etc. Avail test services such as MRI, CT scan,<br></br>{" "}
						Ultrasound, X-Ray, etc. and Online Doctor Video<br></br>
						Consultations all across Pakistan conveniently.
					</p>
				</div>
				<div className="footer-icon">
					<div className="dd">
						<img src={ver} alt="aa" className="footer-image" />
						<div className="after-image">
							<h5>PMC verified Doctors</h5>
							<p>authenticated and updated information</p>
						</div>
					</div>
					<div className="dd">
						<img src={Money} alt="money" className="footer-image" />
						<div className="after-image">
							<h5>Money Back Guarantee</h5>
							<p>We return money within few hours</p>
						</div>
					</div>
					<div className="dd">
						<img src={cus} alt="cus" className="footer-image" />
						<div className="after-image">
							<h5>Reliable Customer Support</h5>
							<p>7 days a week</p>
						</div>
					</div>
					<div className="dd">
						<img src={Secure} alt="secure" className="footer-image" />
						<div className="after-image">
							<h5>Secure Online Payment</h5>
							<p>
								Secure checkout using SSL<br></br> Certificate
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;

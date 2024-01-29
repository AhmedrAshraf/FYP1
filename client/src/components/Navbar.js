import "./Navbar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell as faFaBell } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { faBars as faBarss } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack";
library.add(faFaBell, faBarss);

function Navbar({ patient }) {
	const { user, doctors, patients } = useAuthContext();
	const { logout } = useLogout();
	const Navigate = useNavigate();
	const [showNotifications, setShowNotifications] = useState(null);
	const [anchorElNav, setAnchorElNav] = useState(null);

	useEffect(() => {
		if (user) {
			if (doctors) {
				doctors.forEach((doctor) => {
					if (doctor.id === user.uid) {
						setShowNotifications(doctor.notification);
					}
				});
			}
			if (patients) {
				patients.forEach((patient) => {
					if (patient.id === user.uid) {
						setShowNotifications(patient.notification);
					}
				});
			}
		}
	}, [user, doctors, patients]);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleJoin = () => {
		Navigate("/video-call", { state: { callID: patient.callID } });
		window.location.reload();
	};

	return (
		<AppBar position="sticky" sx={{ background: "white" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "#006",
							textDecoration: "none",
						}}
					>
						<Link to="/" style={{ color: "#006", textDecoration: "none" }}>
							Med<span style={{ color: "orange" }}>Cure</span>
						</Link>
					</Typography>

					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "#006",
							textDecoration: "none",
						}}
					>
						<Link to="/" style={{ color: "#006", textDecoration: "none" }}>
							Med<span style={{ color: "orange" }}>Cure</span>
						</Link>
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
							justifyContent: "flex-end",
						}}
					>
						{!user && (
							<>
								<li>
									<div className="dropdown">
										<button className="dropbtn">Login/SignUp</button>
										<div className="dropdown-content">
											<Link className="d" to="/doctor-signup">
												Doctor
											</Link>

											<Link className="d" to="/patient-signup">
												Patient
											</Link>
										</div>
									</div>
								</li>
							</>
						)}

						{user && (
							<>
								<Typography
									variant="h5"
									component="h2"
									sx={{ color: "#006", marginRight: "20px", marginTop: "17px" }}
								>
									Hello,
									<span
										style={{ color: "orange" }}
									>{` ${user.displayName}`}</span>
								</Typography>
								<Stack sx={{ marginRight: "20px", marginTop: "13px" }}>
									<Avatar src={user.photoURL} alt="profile" />
								</Stack>
								<Button
									className="logout"
									onClick={logout}
									sx={{
										my: 2,
										color: "white",
										backgroundColor: "#006",
										display: "block",
										marginRight: "20px",
										border: "1px solid #006",
										borderRadius: "10px",
										"&:hover": {
											backgroundColor: "white",
											color: "#006",
											border: "1px solid #006",
										},
									}}
								>
									logout
								</Button>
								{patient && patient.callID && patient.callID.room && (
									<Button
										className="call"
										onClick={handleJoin}
										sx={{
											my: 2,
											color: "white",
											backgroundColor: "#006",
											display: "block",
											marginRight: "20px",
											borderRadius: "10px",
											border: "1px solid #006",
										}}
									>
										Calling ...
									</Button>
								)}
								<Button
									className="bell"
									onClick={() => Navigate("/notification")}
									sx={{
										my: 2,
										color: "white",
										background: "#006",
										display: "block",
										borderRadius: "10px",
										"&:hover": {
											backgroundColor: "white",
											color: "#006",
											border: "1px solid #006",
										},
									}}
								>
									<Badge
										badgeContent={showNotifications && showNotifications.length}
										color="primary"
									>
										<FontAwesomeIcon icon={faFaBell} className="bell-icon" />
									</Badge>
								</Button>
							</>
						)}
					</Box>

					<Box sx={{ flexGrow: -2, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							sx={{ color: "#006" }}
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							<Box
								style={{
									paddingLeft: "10px",
									paddingRight: "10px",
									paddingBottom: "70px",
								}}
							>
								{!user && (
									<>
										<div className="dropdown">
											<button className="dropbtn">Login/SignUp</button>
											<div
												className="dropdown-content"
												onClick={handleCloseNavMenu}
											>
												<Link className="d" to="/doctor-signup">
													Doctor
												</Link>
												<Link className="d" to="/patient-signup">
													Patient
												</Link>
											</div>
										</div>
									</>
								)}

								{user && (
									<>
										<Typography
											variant="h5"
											component="h2"
											sx={{ color: "#006", padding: "10px", marginTop: "13px" }}
										>
											Hello,
											<span
												style={{ color: "orange" }}
											>{`${user.displayName}`}</span>
										</Typography>
										<Stack sx={{ marginTop: "13px", marginLeft: "60px" }}>
											<Avatar src={user.photoURL} alt="profile" />
										</Stack>
										<Button
											className="logout"
											onClick={logout}
											sx={{
												my: 2,
												color: "white",
												backgroundColor: "#006",
												display: "block",
												width: "100px",
												borderRadius: "10px",
												marginLeft: "40px",
											}}
										>
											logout
										</Button>
										{patient && patient.callID && patient.callID.room && (
											<Button
												className="call"
												onClick={handleJoin}
												sx={{
													my: 2,
													color: "white",
													backgroundColor: "#006",
													display: "block",
													width: "100px",
													borderRadius: "10px",
													marginLeft: "40px",
												}}
											>
												Calling ...
											</Button>
										)}
										<Button
											className="bell"
											onClick={() => Navigate("/notification")}
											sx={{
												my: 2,
												color: "white",
												background: "#006",
												display: "block",
												borderRadius: "10px",
												marginLeft: "40px",
												width: "100px",
											}}
										>
											<Badge
												badgeContent={
													showNotifications && showNotifications.length
												}
												color="primary"
											>
												<FontAwesomeIcon
													icon={faFaBell}
													className="bell-icon"
												/>
											</Badge>
										</Button>
									</>
								)}
							</Box>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Navbar;

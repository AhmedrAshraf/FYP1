import "./Home.css";
// hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
// components
import Consult from "../Consult/Consult";
import Cards from "../Card/Cards";
import Doctor from "../Doctor/Doctor";
import Reviews from "../Reviews/Reviews";
import Headline from "../HeadLine/Headline";
import Footer from "../Footer/Footer";
import Foot from "../Foot/Foot";

const Home = () => {
  const { doctors, doctor_error } = useAuthContext();
  const [search, setSearch] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSelectedSortOption(newSortOption);
    localStorage.setItem("selectedSortOption", newSortOption);
  };

  useEffect(() => {
    const storedSortOption = localStorage.getItem("selectedSortOption");
    if (storedSortOption) {
      setSelectedSortOption(storedSortOption);
    }
  }, []);

  useEffect(() => {
    console.log("All Doctors:", doctors);
  }, [doctors]);
  return (
    <>
      <section className="home">
        <div className="container">
          <div className="centered">
            <h1 style={{ color: "white" }}>
              Find and book the{" "}
              <span style={{ color: "#ff9e15" }}>best doctors </span>near you
            </h1>
            <br></br>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search.."
                className="inp"
                onChange={(e) => setSearch(e.target.value)}
                name="search"
              />
              <button className="a">Search</button>
            </form>
          </div>
        </div>
      </section>
      {doctors && doctors.length !== 0 && (
        <section>
          {doctor_error && <p>{doctor_error}</p>}
		  <div className="sort-container">

          <label htmlFor="sort">Sort By:</label>
          <select
            className="sort"
            onChange={handleSortChange}
            value={selectedSortOption}
          >
            <option value="">Select</option>
            <option value="fees">Fees</option>
            <option value="experience">Experience</option>
            <option value="nearest">Nearest</option>
          </select>
		  </div>
          {doctors && (
            <Cards
              doctors={doctors}
              search={search}
              sortOption={selectedSortOption}
            />
          )}
        </section>
      )}
      <section>
        <Consult />
      </section>
      <section>
        <Doctor />
      </section>
      <section>
        <Reviews />
      </section>
      <section>
        <Headline />
      </section>
      <section>
        <Footer />
      </section>
      <section>
        <Foot />
      </section>
    </>
  );
};

export default Home;

import "./Headline.css";
import Dawn from "../../Images/Dawn.png";
import Express from "../../Images/tribune.png";
import Tech from "../../Images/BOL.png";
import GEO from "../../Images/GEO.png";
import Aj from "../../Images/Aj.png";
import Ary from "../../Images/Ary.png";

const Headline = () => {
  return (
    <div className="Headline">
      <div className="head">
        <h1 style={{ color: "#006" }}>
          Med<span style={{ color: "orange" }}>Cure</span>
        </h1>
      </div>
      <div className="marq">
        <marquee direction="scroll">
          <img src={Dawn} alt="dawn" style={{ padding: "15px" }}></img>
          <img
            src={Express}
            alt="Express"
            style={{ width: "200px", height: "120px" }}
          ></img>
          <img
            src={Tech}
            alt="Tech"
            style={{ padding: "15px", width: "150px", height: "120px" }}
          ></img>
          <img
            src={GEO}
            alt=" GEO"
            style={{ padding: "15px", width: "150px", height: "120px" }}
          ></img>
          <img
            src={Aj}
            alt="Aj"
            style={{ padding: "15px", width: "150px", height: "120px" }}
          ></img>
          <img
            src={Ary}
            alt="Ary"
            style={{ padding: "15px", width: "150px", height: "120px" }}
          ></img>
        </marquee>
      </div>
    </div>
  );
};

export default Headline;

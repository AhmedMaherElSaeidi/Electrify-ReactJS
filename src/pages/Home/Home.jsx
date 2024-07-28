import "./Home.scss";
import React from "react";
import { PiPlugsFill } from "react-icons/pi";

const Home = () => {
  const services = [
    { header: "Equipment installation", image: "s1.png" },
    { header: "Windmill Energy", image: "s2.png" },
    { header: "Equipment Maintenance", image: "s3.png" },
    { header: "Offshore Engineering", image: "s4.png" },
    { header: "Electrical Wiring", image: "s5.png" },
  ];

  return (
    <div className="home-page">
      <section className="about_section mb-5">
        <div className="website-image">
          <img
            src={require("../../assets/images/markus-spiske-UhaEs2FskUY.jpg")}
            alt="markus-spiske-UhaEs2FskUY"
          />
        </div>
        <div className="detail_box">
          <h1>
            Electrify <br />
            Service <br />
            Provider
          </h1>
          <p className="fs-5">
            Discover high-quality, affordable electricity products at Electrify.
            Shop our wide range of lighting,
            <br /> smart home devices, and energy solutions to power your home
            efficiently and sustainably.
          </p>
        </div>
      </section>
      <section className="service_section">
        <div className="container">
          <div className="heading_container">
            <h2 className="fw-bold">
              Our Services <PiPlugsFill />
            </h2>
          </div>
          <div className="service_container">
            {services.map((value, index) => {
              return (
                <div className="box" key={index}>
                  <div className="img-box">
                    <img
                      src={require(`../../assets/images/${value.image}`)}
                      className="img1"
                      alt=""
                    />
                  </div>
                  <div className="detail-box">
                    <h5>{value.header}</h5>
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available,
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React from "react";
import { settlements } from "../data/settlements";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/Map/Map";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const firstThree = settlements.slice(0, 3);

  return (
    <div className="home-page">
      <header className="header">
        <div className="container">
          <h1>Участки ИЖС в Тверской области</h1>
          <p>Выберите поселок на карте для получения подробной информации</p>
        </div>
      </header>

      <main className="main-content">
        <section className="map-section">
          <div className="settlement-shortcuts">
            {firstThree.map((s) => {
              const firstImage = (s.images && s.images[0]) || "";
              const folder = firstImage
                ? firstImage.substring(0, firstImage.lastIndexOf("/"))
                : "/images/settlements";
              const logoPath = `${folder}/logo.jpeg`;
              return (
                <button
                  key={s.id}
                  className="settlement-shortcut"
                  onClick={() => navigate(`/settlement/${s.id}`)}
                >
                  <img src={logoPath} alt={s.name} />
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>

          <div className="map-wrapper">
            <MapComponent />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

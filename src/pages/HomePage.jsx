import React from "react";
import MapComponent from "../components/Map/Map";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <div className="container">
          <h1>Коттеджные поселки Тверской области</h1>
          <p>Выберите поселок на карте для получения подробной информации</p>
        </div>
      </header>

      <main className="main-content">
        <MapComponent />
      </main>
    </div>
  );
};

export default HomePage;

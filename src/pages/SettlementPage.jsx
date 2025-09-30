import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { settlements } from "../data/settlements";
import "./SettlementPage.css";

const SettlementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const settlement = settlements.find((s) => s.id === parseInt(id));

  if (!settlement) {
    return (
      <div className="settlement-page">
        <div className="container">
          <h1>Поселок не найден</h1>
          <button onClick={() => navigate("/")} className="btn">
            Вернуться к карте
          </button>
        </div>
      </div>
    );
  }

  const openRoute = () => {
    const [lat, lon] = settlement.coordinates;
    const url = `https://yandex.ru/maps/?rtext=~${lat},${lon}&rtt=auto`;
    window.open(url, "_blank");
  };

  const openNavigator = () => {
    const [lat, lon] = settlement.coordinates;
    const url = `yandexnavi://build_route_on_map?lat_to=${lat}&lon_to=${lon}`;
    window.location.href = url;
  };

  return (
    <div className="settlement-page">
      <header className="settlement-header">
        <div className="container">
          <button onClick={() => navigate("/")} className="btn btn-secondary">
            ← Назад к карте
          </button>
        </div>
      </header>

      <main className="settlement-main">
        <div className="container">
          <div className="settlement-content">
            <div className="settlement-info">
              <h1>{settlement.name}</h1>
              <p className="settlement-description">{settlement.description}</p>

              <div className="settlement-details">
                <div className="detail-item">
                  <strong>Цена:</strong> {settlement.price}
                </div>
                <div className="detail-item">
                  <strong>Площадь участков:</strong> {settlement.area}
                </div>
                <div className="detail-item">
                  <strong>Адрес:</strong> {settlement.address}
                </div>
                <div className="detail-item">
                  <strong>Расстояние до Твери:</strong>{" "}
                  {settlement.distanceToTver}
                </div>
              </div>

              <div className="settlement-features">
                <h3>Удобства:</h3>
                <ul>
                  {settlement.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="navigation-buttons">
                <button onClick={openRoute} className="btn">
                  Проложить маршрут в Яндекс.Картах
                </button>
                <button onClick={openNavigator} className="btn btn-secondary">
                  Открыть в Яндекс.Навигаторе
                </button>
              </div>
            </div>

            <div className="settlement-scheme">
              <h3>Схема участков</h3>
              <div className="scheme-container">
                <img 
                  src="/images/settlements/ilinskoe/scheme.jpg" 
                  alt="Схема участков" 
                  className="scheme-image"
                />
                <div className="scheme-download">
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/images/settlements/ilinskoe/scheme.jpg';
                      link.download = 'scheme.jpg';
                      link.click();
                    }}
                  >
                    📥 Скачать схему
                  </button>
                </div>
              </div>
            </div>

            <div className="settlement-images">
              <h3>Фотографии поселка</h3>
              <div className="image-gallery">
                {settlement.images.map((image, index) => (
                  <div key={index} className="image-item">
                    <img
                      src={image}
                      alt={`Фото поселка ${index + 1}`}
                      className="settlement-image"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                    <div
                      className="image-placeholder"
                      style={{ display: "none" }}
                    >
                      <p>Фото {index + 1}</p>
                      <small>{image}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettlementPage;

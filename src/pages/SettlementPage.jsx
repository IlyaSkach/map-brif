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

  // Вычисляем текущую папку изображений по первому фото и формируем пути к карте/схеме
  const firstImage = (settlement.images && settlement.images[0]) || "";
  const imagesFolder = firstImage
    ? firstImage.substring(0, firstImage.lastIndexOf("/"))
    : "/images/settlements/ilinskie_dachi";
  const mapImagePath = `${imagesFolder}/map.jpeg`;
  // Общая инструкция "как найти участок" (единая для всех страниц)
  const howFindGlobal = "/images/settlements/ilinskoe/how_find.jpeg";

  return (
    <div className="settlement-page">
      <header className="settlement-header">
        <div className="container">
          <button
            onClick={() => navigate("/")}
            className="back-btn"
            aria-label="Назад к карте"
          >
            <span className="back-btn__icon">←</span>
            <span className="back-btn__label">Назад к карте</span>
          </button>
        </div>
      </header>

      <main className="settlement-main">
        <div className="container">
          <div className="settlement-content">
            <div className="settlement-info">
              {(() => {
                const firstImage =
                  (settlement.images && settlement.images[0]) || "";
                const folder = firstImage
                  ? firstImage.substring(0, firstImage.lastIndexOf("/"))
                  : "/images/settlements";
                const logoPath = `${folder}/logo.jpeg`;
                return (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <img
                      src={logoPath}
                      alt="logo"
                      className="settlement-logo"
                    />
                    <h1 style={{ margin: 0, lineHeight: 1.2 }}>
                      {settlement.name}
                    </h1>
                  </div>
                );
              })()}
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
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    window.open(howFindGlobal, "_blank");
                  }}
                >
                  Инструкция: как найти участок
                </button>
              </div>
            </div>

            <div className="settlement-scheme">
              <h3>Схема участков</h3>
              <div className="scheme-container">
                <img
                  src={mapImagePath}
                  alt="Схема участков"
                  className="scheme-image"
                  onClick={() => {
                    const modal = document.createElement("div");
                    modal.className = "scheme-modal";
                    modal.innerHTML = `
                      <div class="scheme-modal-content">
                        <span class="scheme-modal-close">&times;</span>
                        <img src="${mapImagePath}" alt="Схема участков" class="scheme-modal-image">
                      </div>
                    `;
                    document.body.appendChild(modal);

                    const closeModal = () => {
                      document.body.removeChild(modal);
                    };

                    modal.querySelector(".scheme-modal-close").onclick =
                      closeModal;
                    modal.onclick = (e) => {
                      if (e.target === modal) closeModal();
                    };
                  }}
                />
                <div className="scheme-download">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = mapImagePath;
                      link.download = "map.jpeg";
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

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { settlements } from "../data/settlements";
import "./SettlementPage.css";

const SettlementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const settlement = settlements.find((s) => s.id === parseInt(id));
  const [galleryIndex, setGalleryIndex] = React.useState(null);

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
                <h3>Особенности:</h3>
                <ul>
                  {settlement.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="navigation-buttons">
                <button onClick={openRoute} className="btn btn-green">
                  Проложить маршрут в Яндекс.Картах
                </button>
                <button
                  onClick={openNavigator}
                  className="btn btn-green-secondary"
                >
                  Открыть в Яндекс.Навигаторе
                </button>
                <button
                  className="btn btn-green-secondary"
                  onClick={() => {
                    const modal = document.createElement("div");
                    modal.className = "scheme-modal";
                    modal.innerHTML = `
                      <div class="scheme-modal-content">
                        <span class="scheme-modal-close">&times;</span>
                        <img src="${howFindGlobal}" alt="Инструкция" class="scheme-modal-image">
                        <button class="instruction-download-btn">📥 Скачать инструкцию</button>
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

                    modal.querySelector(".instruction-download-btn").onclick =
                      () => {
                        const link = document.createElement("a");
                        link.href = howFindGlobal;
                        link.download = "instrukciya_kak_naiti_uchastok.jpeg";
                        link.click();
                      };
                  }}
                >
                  Инструкция: как найти участок на местности по кад. номеру
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
                {/* Карточка контактов */}
                <div className="contact-card">
                  <h4>Связаться с нами</h4>
                  <p>
                    Для консультации или бронирования свяжитесь с нами любым
                    удобным способом
                  </p>
                  <div className="contact-btns">
                    <a
                      href="https://t.me/your_channel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-btn contact-btn--tg"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm5.562 8.161-1.84 8.673c-.139.623-.502.775-1.017.483l-2.807-2.066-1.353 1.302c-.15.15-.275.275-.563.275l.199-2.853 5.205-4.702c.226-.199-.05-.31-.351-.111l-6.429 4.043-2.77-.867c-.602-.187-.613-.602.126-.892l10.839-4.178c.502-.187.941.112.761.892Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>Telegram</span>
                    </a>
                    <a
                      href="https://wa.me/79000000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-btn contact-btn--wa"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.456l4.566-1.467A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0Zm.05 21.954h-.005a9.94 9.94 0 0 1-5.069-1.387l-.363-.216-3.766.987.997-3.65-.236-.376a9.93 9.93 0 0 1-1.522-5.312c0-5.496 4.475-9.971 9.971-9.971 2.662 0 5.164 1.039 7.047 2.923a9.92 9.92 0 0 1 2.917 7.049c-.003 5.494-4.478 9.97-9.971 9.97Zm5.463-7.45c-.3-.15-1.77-.875-2.046-.973-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.263-.466-2.404-1.484-.889-.794-1.487-1.774-1.663-2.074-.175-.3-.019-.462.132-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.242-.584-.488-.504-.675-.513a12.28 12.28 0 0 0-.575-.012 1.103 1.103 0 0 0-.8.375c-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.1 3.209 5.088 4.5.711.308 1.266.491 1.7.629.712.225 1.363.194 1.875.117.574-.086 1.769-.724 2.019-1.424.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href="tel:+79000000000"
                      className="contact-btn contact-btn--ph"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6.62 10.79a15.11 15.11 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>Позвонить</span>
                    </a>
                  </div>
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
                      onClick={() => setGalleryIndex(index)}
                      style={{ cursor: "pointer" }}
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

            {/* Модалка галереи */}
            {galleryIndex !== null && (
              <div
                className="gallery-modal"
                onClick={() => setGalleryIndex(null)}
              >
                <div
                  className="gallery-modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="gallery-modal-close"
                    onClick={() => setGalleryIndex(null)}
                  >
                    &times;
                  </button>
                  <button
                    className="gallery-nav gallery-nav-prev"
                    onClick={() =>
                      setGalleryIndex(
                        (galleryIndex - 1 + settlement.images.length) %
                          settlement.images.length
                      )
                    }
                  >
                    &#8249;
                  </button>
                  <img
                    src={settlement.images[galleryIndex]}
                    alt={`Фото ${galleryIndex + 1}`}
                    className="gallery-modal-image"
                  />
                  <button
                    className="gallery-nav gallery-nav-next"
                    onClick={() =>
                      setGalleryIndex(
                        (galleryIndex + 1) % settlement.images.length
                      )
                    }
                  >
                    &#8250;
                  </button>
                  <div className="gallery-counter">
                    {galleryIndex + 1} / {settlement.images.length}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettlementPage;

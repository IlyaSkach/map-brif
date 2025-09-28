import React, { useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { useNavigate } from "react-router-dom";
import { settlements } from "../../data/settlements";
import "./Map.css";

const MapComponent = () => {
  const navigate = useNavigate();
  const [hoveredSettlement, setHoveredSettlement] = useState(null);

  const handleMarkerClick = (settlementId) => {
    navigate(`/settlement/${settlementId}`);
  };

  return (
    <div className="map-container">
      <YMaps>
        <Map
          defaultState={{
            center: [56.587, 35.95], // Центр между поселками
            zoom: 12,
          }}
          width="100%"
          height="100%"
          className="yandex-map"
        >
          {settlements.map((settlement) => (
            <Placemark
              key={settlement.id}
              geometry={settlement.coordinates}
              properties={{
                balloonContent: `
                  <div class="balloon-content">
                    <h3>${settlement.name}</h3>
                    <p>${settlement.description}</p>
                    <p><strong>Цена:</strong> ${settlement.price}</p>
                    <p><strong>Площадь:</strong> ${settlement.area}</p>
                    <p><strong>Адрес:</strong> ${settlement.address}</p>
                    <button 
                      class="balloon-btn" 
                      onclick="window.open('/settlement/${settlement.id}', '_self')"
                    >
                      Подробнее
                    </button>
                  </div>
                `,
                hintContent: settlement.shortInfo,
              }}
              options={{
                preset: "islands#redDotIcon",
                iconColor: "#ff6b6b",
              }}
              onClick={() => handleMarkerClick(settlement.id)}
              onMouseEnter={() => setHoveredSettlement(settlement)}
              onMouseLeave={() => setHoveredSettlement(null)}
            />
          ))}
        </Map>
      </YMaps>

      {/* Кастомная подсказка */}
      {hoveredSettlement && (
        <div className="custom-hint">{hoveredSettlement.shortInfo}</div>
      )}
    </div>
  );
};

export default MapComponent;

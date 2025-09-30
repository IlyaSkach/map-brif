import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { useNavigate } from "react-router-dom";
import { settlements } from "../../data/settlements";
import "./Map.css";

const MapComponent = () => {
  const navigate = useNavigate();
  const [hoveredSettlement, setHoveredSettlement] = useState(null);
  const [pinUrls, setPinUrls] = useState({});

  const handleMarkerClick = (settlementId) => {
    navigate(`/settlement/${settlementId}`);
  };

  // Генератор SVG-маркера «капли» с логотипом внутри (data URL)
  const makePinDataUrl = (logoPath, size = 40) => {
    const width = size;
    const height = Math.round(size * 1.3); // с хвостиком
    const circleSize = size - 8; // круг внутри капли
    const circleX = (width - circleSize) / 2;
    const circleY = 2;

    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>
        <defs>
          <clipPath id='clipCircle'>
            <circle cx='${width / 2}' cy='${circleY + circleSize / 2}' r='${
      circleSize / 2
    }' />
          </clipPath>
          <filter id='shadow' x='-20%' y='-20%' width='140%' height='140%'>
            <feDropShadow dx='0' dy='1' stdDeviation='1.2' flood-color='rgba(0,0,0,0.25)' />
          </filter>
        </defs>
        <!-- Контур капли -->
        <path d='M ${width / 2} ${height} C ${width * 0.82} ${
      height * 0.72
    }, ${width} ${height * 0.5}, ${width} ${height * 0.34} C ${width} ${
      height * 0.16
    }, ${width * 0.84} 0, ${width / 2} 0 C ${width * 0.16} 0, 0 ${
      height * 0.16
    }, 0 ${height * 0.34} C 0 ${height * 0.5}, ${width * 0.18} ${
      height * 0.72
    }, ${
      width / 2
    } ${height} Z' fill='#ff3b30' stroke='#b22222' filter='url(#shadow)'/>
        <!-- Изображение внутри круга -->
        <image href='${logoPath}' x='${circleX}' y='${circleY}' width='${circleSize}' height='${circleSize}' preserveAspectRatio='xMidYMid slice' clip-path='url(#clipCircle)'/>
        <!-- Обводка круга -->
        <circle cx='${width / 2}' cy='${circleY + circleSize / 2}' r='${
      circleSize / 2
    }' fill='none' stroke='#ffffff'/>
      </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  // Загружаем logo.jpeg как dataURL и генерируем пины заранее
  useEffect(() => {
    let isCancelled = false;
    const toDataUrl = async (url) => {
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const blob = await res.blob();
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      } catch {
        return null;
      }
    };

    (async () => {
      for (const s of settlements) {
        const firstImage = (s.images && s.images[0]) || "";
        const folder = firstImage
          ? firstImage.substring(0, firstImage.lastIndexOf("/"))
          : "/images/settlements";
        const logoUrl = `${folder}/logo.jpeg`;
        const dataUrl = await toDataUrl(logoUrl);
        if (isCancelled) return;
        if (dataUrl) {
          const pin = makePinDataUrl(dataUrl, 40);
          setPinUrls((prev) => ({ ...prev, [s.id]: pin }));
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="map-container">
      <YMaps>
        <Map
          defaultState={{
            center: [56.582, 35.95], // Слегка сместили южнее, чтобы приподнять нижний маркер
            zoom: 13,
          }}
          width="100%"
          height="100%"
          className="yandex-map"
        >
          {settlements.map((settlement) => {
            const firstImage =
              (settlement.images && settlement.images[0]) || "";
            const folder = firstImage
              ? firstImage.substring(0, firstImage.lastIndexOf("/"))
              : "/images/settlements";
            const logoPath = `${folder}/logo.jpeg`;
            const pinUrl =
              pinUrls[settlement.id] || makePinDataUrl(logoPath, 40);

            return (
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
                  iconLayout: "default#image",
                  iconImageHref: pinUrl,
                  iconImageSize: [40, 52],
                  iconImageOffset: [-20, -52],
                }}
                onClick={() => handleMarkerClick(settlement.id)}
                onMouseEnter={() => setHoveredSettlement(settlement)}
                onMouseLeave={() => setHoveredSettlement(null)}
              />
            );
          })}
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

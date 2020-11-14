import { useState, useEffect } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import Overlay from "ol/Overlay";
import moment from "moment";
import "moment/locale/es";
import avistamientos from "./avistamientos.json";
import "./App.css";

function App() {
  const [mapElement, setMapElement] = useState(null);
  // eslint-disable-next-line
  const [overlays, _setOverlays] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapElement && !map) {
      const firstTarget = avistamientos[0];

      setMap(new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            }),
          }),
        ],
        view: new View({
          center: fromLonLat([firstTarget.longitud, firstTarget.latitud]),
          zoom: 12,
        }),
      }));
    }
  }, [mapElement, map]);

  useEffect(() => {
    if (overlays.length && map) {
      overlays.forEach((overlay) => map.addOverlay(overlay));
    }
  }, [overlays, map]);

  moment.locale('es');

  return (
    <div>
      <div id="map" ref={setMapElement} />

      {avistamientos.slice(0, 500).map((data, i) => {
        overlays.push(new Overlay({
          element: document.getElementById(`avistamiento_${i +1}`),
          position: fromLonLat([data.longitud, data.latitud]),
        }));

        return <div
          key={`avistamiento_${i + 1}`}
          id={`avistamiento_${i + 1}`}
          className="avistamiento"
        >
          <div className="information">
            <div className="image" style={{
              backgroundImage: `url('${data.urlImagen}')`,
            }} />
            <div className="text">
              Visto el {moment(data.fechaPublicacion).format('dddd D [de] MMMM [de] YYYY [a las] h:mm:ss a')}{
                (data.usuario && data.usuario.length) ? ` por ${data.usuario}` : ''
              }
            </div>
          </div>
        </div>;
      })}
    </div>
  );
}

export default App;

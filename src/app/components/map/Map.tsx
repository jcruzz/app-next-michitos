import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-fullscreen/styles.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3/lib";
import { useEffect, useRef, useState } from "react";
import MarkerClusterGroup from "react-leaflet-cluster";
import { FullscreenControl } from "react-leaflet-fullscreen";
import { Modal } from "flowbite-react";
import { useTheme } from "../theme/ToggleTheme";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconReinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

const customMarkerIconAgencia = L.icon({
  iconUrl: "/images/location_on.png",
  iconSize: [22, 27],
  iconAnchor: [10, 27],
});

const customMarkerIcon = L.icon({
  iconUrl: "/images/location_on.png",
  iconSize: [32, 34],
  iconAnchor: [15, 30],
});

type MapProps = {
  zoom: number;
  center: [number, number] | undefined;
  style: string;
  pointsHeat: [number, number, number][];
  pointsMarker: {
    CODIGO_PERSONA: number;
    Coordenadas: [number, number];
    NOMBRE_COMPLETO: string;
    CREDITOS: number[];
  }[];
  pointsMarkerAgencia: {
    CODIGO_AGENCIA: number;
    AGENCIA: string;
    Coordenadas: [number, number];
  }[];
  bounds: [number, number][];
  viewSatelital: boolean;
};

const heatmapOptions = {
  radius: 40,
  blur: 40,
  maxZoom: 18,
  minOpacity: 0.5,
  maxOpacity: 1,
  useLocalExtrema: true,
};

const Map: React.FC<MapProps> = ({
  center,
  zoom,
  pointsHeat,
  pointsMarker,
  pointsMarkerAgencia,
  style,
  bounds,
  viewSatelital,
}) => {
    
  const mapRef = useRef<any>(null);
  const { isDarkMode } = useTheme();

  const [codigoPersona, setCodigoPersona] = useState<number>(0);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [sizeModal, setSizeModal] = useState<string>("");
  const [animate, setAnimate] = useState<boolean>(true);
  const [option, setOption] = useState<string>("");

  const bond = L.latLngBounds([...bounds]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, []);

  return (
    <div>

      <MapContainer
        center={bounds.length > 0 ? undefined : center}
        zoom={zoom}
        style={{ height: style, width: "100%" }}
        bounds={bond}
        markerZoomAnimation
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={
            isDarkMode
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          }
        />

        {pointsHeat.length > 0 ? (
          <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={pointsHeat}
            longitudeExtractor={(point: any) => point[1]}
            latitudeExtractor={(point: any) => point[0]}
            key={Math.random() + Math.random()}
            intensityExtractor={(point: any) => parseFloat(point[2])}
            {...heatmapOptions}
          />
        ) : (
          <div hidden={true}></div>
        )}
        <MarkerClusterGroup>
          {pointsMarker.map((item) => (
            <Marker
              key={item.CODIGO_PERSONA}
              position={item.Coordenadas}
              icon={customMarkerIcon}
            >
              <Popup>
                <div
                  className="cursor-pointer hover:underline"
                  onClick={async () => {
                    setCodigoPersona(item.CODIGO_PERSONA);
                    setAnimate(true);
                    setOpenModal(true);
                    setOption("INFOPERSONAGEO");
                    setSizeModal("3xl");
                  }}
                >
                  {item.NOMBRE_COMPLETO}
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        {pointsMarkerAgencia.map((item) => (
          <Marker
            key={item.CODIGO_AGENCIA}
            position={item.Coordenadas}
            icon={customMarkerIconAgencia}
          >
            <Popup>{item.AGENCIA}</Popup>
          </Marker>
        ))}
        <FullscreenControl />
      </MapContainer>
    </div>
  );
};

export default Map;

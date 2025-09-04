import React from "react";
import ReactMapGL, { Marker, Source, Layer } from "react-map-gl";
import { motion } from "framer-motion";
import { FaWarehouse, FaMapMarkerAlt, FaCar } from "react-icons/fa";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN?.trim();

const MapView = ({
  viewState,
  setViewState,
  warehouseCoords,
  destinationCoords,
  drivers,
  selectedDriver,
  routeGeoJson,
  driverRouteGeoJson,
}) => {
  const markerAnimation = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 },
  };

  return (
    <ReactMapGL
      {...viewState}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxAccessToken={MAPBOX_TOKEN}
      attributionControl={false}
      mapboxLogo={false}
      onViewStateChange={({ viewState: vs }) => setViewState(vs)}
    >
      {/* Warehouse Marker */}
      <Marker latitude={warehouseCoords.latitude} longitude={warehouseCoords.longitude} anchor="center">
        <motion.div {...markerAnimation}>
          <FaWarehouse size={28} color="#007BFF" />
        </motion.div>
      </Marker>
      
      {/* Destination Marker */}
      {destinationCoords && (
        <Marker latitude={destinationCoords.latitude} longitude={destinationCoords.longitude} anchor="center">
          <motion.div {...markerAnimation}>
            <FaMapMarkerAlt size={28} color="#FF5733" />
          </motion.div>
        </Marker>
      )}
      
      {/* Driver Markers */}
      {drivers.map((driver) => (
        <Marker key={driver.id} latitude={driver.latitude} longitude={driver.longitude} anchor="center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              // If selected, gently oscillate horizontally; otherwise, no extra movement.
              x: selectedDriver && driver.id === selectedDriver.id ? [0, 3, 0] : 0,
            }}
            transition={{
              duration: selectedDriver && driver.id === selectedDriver.id ? 1 : 0.5,
              repeat: selectedDriver && driver.id === selectedDriver.id ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <FaCar size={28} color={selectedDriver && driver.id === selectedDriver.id ? "#FFD700" : "#FF5733"} />
          </motion.div>
        </Marker>
      ))}
      
      {/* Warehouse → Destination Route */}
      {routeGeoJson && (
        <Source id="routeSource" type="geojson" data={routeGeoJson}>
          <Layer id="routeLayer" type="line" paint={{ "line-color": "#00E0FF", "line-width": 4 }} />
        </Source>
      )}
      
      {/* Driver → Warehouse Route */}
      {driverRouteGeoJson && (
        <Source id="driverRouteSource" type="geojson" data={driverRouteGeoJson}>
          <Layer
            id="driverRouteLayer"
            type="line"
            paint={{
              "line-color": "#FFD700",
              "line-width": 3,
              "line-dasharray": [2, 2],
            }}
          />
        </Source>
      )}
    </ReactMapGL>
  );
};

export default MapView;

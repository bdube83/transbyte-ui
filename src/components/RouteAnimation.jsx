import React, { useState, useEffect, useMemo, useRef } from "react";
import { WebMercatorViewport } from "viewport-mercator-project";
import MapView from "./MapView";
import MultiFixedDriverScanner from "./MultiFixedDriverScanner";
import DriverRouteAnimator from "./DriverRouteAnimator";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN?.trim();

const RouteAnimation = ({ order, mode = "hidden", radarComplete, radarAngle = 2 * Math.PI }) => {
  const warehouseCoords = useMemo(() => ({
    latitude: -33.9249,
    longitude: 18.4241,
  }), []);

  const [destinationCoords] = useState(
    order?.toAddress
      ? { latitude: -33.8249, longitude: 18.5241 }
      : null
  );

  const [viewState, setViewState] = useState({
    latitude: warehouseCoords.latitude,
    longitude: warehouseCoords.longitude,
    zoom: 12,
  });

  // Warehouse→destination route
  const [fullRouteCoords, setFullRouteCoords] = useState([]);
  const [partialCoords, setPartialCoords] = useState([]);

  // Candidate drivers from MultiFixedDriverScanner.
  const [candidateDrivers, setCandidateDrivers] = useState([]);
  // Revealed drivers based on radar sweep.
  const [revealedDrivers, setRevealedDrivers] = useState([]);
  // Final selected driver.
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [partialDriverRouteCoords, setPartialDriverRouteCoords] = useState([]);

  const mapContainerRef = useRef(null);

  // Fetch warehouse→destination route.
  useEffect(() => {
    if (!destinationCoords || mode === "hidden") return;
    const directionsUrl = `
      https://api.mapbox.com/directions/v5/mapbox/driving/
      ${warehouseCoords.longitude},${warehouseCoords.latitude};
      ${destinationCoords.longitude},${destinationCoords.latitude}
      ?geometries=geojson&exclude=ferry&access_token=${MAPBOX_TOKEN}
    `.replace(/\s+/g, "");
    fetch(directionsUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.routes && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates;
          setFullRouteCoords(coords);
          if (mode === "final" || mode === "driver") {
            setPartialCoords(coords);
          } else if (mode === "drawSlowly") {
            setPartialCoords([coords[0]]);
          }
        }
      })
      .catch((err) => console.error("Route fetch error:", err));
  }, [mode, destinationCoords, warehouseCoords]);

  useEffect(() => {
    if (mode !== "drawSlowly" || fullRouteCoords.length === 0) return;
    let index = 0;
    setPartialCoords([fullRouteCoords[0]]);
    const interval = setInterval(() => {
      index++;
      if (index >= fullRouteCoords.length) {
        clearInterval(interval);
        return;
      }
      setPartialCoords((prev) => [...prev, fullRouteCoords[index]]);
    }, 300);
    return () => clearInterval(interval);
  }, [mode, fullRouteCoords]);

  // Auto-fit the map to include all relevant points.
  useEffect(() => {
    if (mode === "hidden") return;
    const coordsToFit = [];
    if (partialCoords.length > 0) coordsToFit.push(...partialCoords);
    if (partialDriverRouteCoords.length > 0) coordsToFit.push(...partialDriverRouteCoords);
    revealedDrivers.forEach((d) => coordsToFit.push([d.longitude, d.latitude]));
    coordsToFit.push([warehouseCoords.longitude, warehouseCoords.latitude]);
    if (destinationCoords) coordsToFit.push([destinationCoords.longitude, destinationCoords.latitude]);
    if (coordsToFit.length < 2) return;
    let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
    coordsToFit.forEach(([lng, lat]) => {
      if (lng < minLng) minLng = lng;
      if (lat < minLat) minLat = lat;
      if (lng > maxLng) maxLng = lng;
      if (lat > maxLat) maxLat = lat;
    });
    const bounds = [[minLng, minLat], [maxLng, maxLat]];
    const containerWidth = mapContainerRef.current?.offsetWidth || 800;
    const containerHeight = mapContainerRef.current?.offsetHeight || 500;
    const viewportFit = new WebMercatorViewport({ width: containerWidth, height: containerHeight })
      .fitBounds(bounds, { padding: 50 });
    setViewState((prev) => ({
      ...prev,
      latitude: viewportFit.latitude,
      longitude: viewportFit.longitude,
      zoom: Math.min(viewportFit.zoom, 16),
    }));
  }, [mode, partialCoords, partialDriverRouteCoords, revealedDrivers, warehouseCoords, destinationCoords]);

  // Update revealed drivers based on the current radarAngle.
  useEffect(() => {
    // Filter candidates: candidate's bearing (in radians) must be less than current radarAngle.
    const updated = candidateDrivers.filter(candidate => {
      const candidateRad = (candidate.bearing * Math.PI) / 180;
      return candidateRad <= radarAngle;
    });
    // For debugging: log updated candidates.
    // console.log("Revealed candidates:", updated);
    setRevealedDrivers(updated);
  }, [radarAngle, candidateDrivers]);

  // Once radar scanning is complete, select the best candidate (closest to the warehouse) and remove others.
  useEffect(() => {
    if (mode === "driver" && radarComplete && revealedDrivers.length > 0 && !selectedDriver) {
      let best = revealedDrivers[0];
      let minDist = Infinity;
      revealedDrivers.forEach((drv) => {
        const dist = Math.hypot(
          drv.latitude - warehouseCoords.latitude,
          drv.longitude - warehouseCoords.longitude
        );
        if (dist < minDist) {
          best = drv;
          minDist = dist;
        }
      });
      setSelectedDriver(best);
      // Once selected, remove other candidates.
      setCandidateDrivers([best]);
      setRevealedDrivers([best]);
    }
  }, [mode, radarComplete, revealedDrivers, selectedDriver, warehouseCoords]);

  // Expose candidate drivers for debugging if needed.
  // console.log("Candidate Drivers:", candidateDrivers);
  // console.log("Revealed Drivers:", revealedDrivers);
  // console.log("Radar Angle (radians):", radarAngle);

  const routeGeoJson = partialCoords.length > 1
    ? { type: "Feature", geometry: { type: "LineString", coordinates: partialCoords } }
    : null;
  const driverRouteGeoJson = partialDriverRouteCoords.length > 1
    ? { type: "Feature", geometry: { type: "LineString", coordinates: partialDriverRouteCoords } }
    : null;

  return (
    <div ref={mapContainerRef} className="border border-blue-500 rounded-md shadow-lg w-full h-[40vh] md:h-[50vh] max-h-[500px] mb-4">
      <MapView
        viewState={viewState}
        setViewState={setViewState}
        warehouseCoords={warehouseCoords}
        destinationCoords={destinationCoords}
        drivers={revealedDrivers}
        selectedDriver={selectedDriver}
        routeGeoJson={routeGeoJson}
        driverRouteGeoJson={driverRouteGeoJson}
      />
      {mode === "driver" && (
        <>
          <MultiFixedDriverScanner
            warehouseCoords={warehouseCoords}
            mode={mode}
            onDriversFound={setCandidateDrivers}
          />
          {selectedDriver ? (
            <DriverRouteAnimator
              driver={selectedDriver}
              warehouseCoords={warehouseCoords}
              onDriverRouteUpdated={setPartialDriverRouteCoords}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default RouteAnimation;

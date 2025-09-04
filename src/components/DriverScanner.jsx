import React, { useEffect } from "react";
import * as turf from "@turf/turf";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN?.trim();

/**
 * Create a circle polygon (5 km radius) around the warehouse.
 * Turf expects [longitude, latitude].
 */
function createCirclePolygon(warehouseCoords, radiusKm = 5) {
  const center = [warehouseCoords.longitude, warehouseCoords.latitude];
  return turf.circle(center, radiusKm, { steps: 64, units: "kilometers" });
}

/**
 * Generate candidate driver points inside the circle.
 */
function generateDriversInCircle(warehouseCoords, radiusKm = 5, count = 4) {
  const circlePoly = createCirclePolygon(warehouseCoords, radiusKm);
  const bbox = turf.bbox(circlePoly); // [minX, minY, maxX, maxY]
  const points = [];
  while (points.length < count) {
    const randomLon = Math.random() * (bbox[2] - bbox[0]) + bbox[0];
    const randomLat = Math.random() * (bbox[3] - bbox[1]) + bbox[1];
    const pt = turf.point([randomLon, randomLat]);
    if (turf.booleanPointInPolygon(pt, circlePoly)) {
      points.push(pt);
    }
  }
  return points.map((pt, idx) => ({
    id: idx + 1,
    latitude: pt.geometry.coordinates[1],
    longitude: pt.geometry.coordinates[0],
  }));
}

/**
 * Snap a driver's coordinate to the nearest road using Mapbox Map Matching API.
 */
async function snapDriverToRoad(driver) {
  const coords = `${driver.longitude},${driver.latitude};${driver.longitude},${driver.latitude}`;
  const matchingUrl = `https://api.mapbox.com/matching/v5/mapbox/driving/${coords}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;
  try {
    const res = await fetch(matchingUrl);
    const data = await res.json();
    if (data.matchings && data.matchings.length > 0) {
      const snappedCoord = data.matchings[0].geometry.coordinates[0];
      return {
        ...driver,
        longitude: snappedCoord[0],
        latitude: snappedCoord[1],
      };
    }
  } catch (err) {
    console.error("Error snapping driver to road:", err);
  }
  return driver;
}

/**
 * DriverScanner:
 *  - Generates candidate driver points within a 5 km circle.
 *  - Snaps them to roads.
 *  - Calls onDriversFound with the candidate drivers.
 */
const DriverScanner = ({ warehouseCoords, mode, onDriversFound }) => {
  useEffect(() => {
    if (mode !== "driver") return;
    const generateAndSnapDrivers = async () => {
      const rawDrivers = generateDriversInCircle(warehouseCoords, 5, 4);
      const snappedDrivers = await Promise.all(
        rawDrivers.map((driver) => snapDriverToRoad(driver))
      );
      onDriversFound(snappedDrivers);
    };
    generateAndSnapDrivers();
  }, [mode, warehouseCoords, onDriversFound]);

  return null;
};

export default DriverScanner;

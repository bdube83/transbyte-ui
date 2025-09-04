import React, { useEffect } from "react";
import * as turf from "@turf/turf";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN?.trim();

/**
 * Computes a fixed point that is a given distance and bearing from the warehouse.
 * Uses Turf's destination function.
 */
function computeFixedDriver(warehouseCoords, distanceKm = 5, bearing = 180) {
  const from = turf.point([warehouseCoords.longitude, warehouseCoords.latitude]);
  const options = { units: "kilometers" };
  const destination = turf.destination(from, distanceKm, bearing, options);
  const [lon, lat] = destination.geometry.coordinates;
  return { id: bearing, latitude: lat, longitude: lon, bearing };
}

/**
 * Snaps a driver's coordinate to the nearest road using the Mapbox Map Matching API.
 * If no valid matching is found, returns null.
 */
async function snapDriverToRoad(driver) {
  const coords = `${driver.longitude},${driver.latitude};${driver.longitude},${driver.latitude}`;
  const matchingUrl = `https://api.mapbox.com/matching/v5/mapbox/driving/${coords}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;
  try {
    const res = await fetch(matchingUrl);
    const data = await res.json();
    if (data.matchings && data.matchings.length > 0) {
      const snappedCoord = data.matchings[0].geometry.coordinates[0];
      return { ...driver, longitude: snappedCoord[0], latitude: snappedCoord[1] };
    }
  } catch (err) {
    console.error("Error snapping driver to road:", err);
  }
  return null;
}

/**
 * Recursively attempts to compute and snap a candidate fixed driver point.
 * If snapping fails, adjusts the bearing slightly and retries up to maxAttempts.
 */
async function getValidCandidate(warehouseCoords, bearing, attempts = 0, maxAttempts = 3) {
  const candidate = computeFixedDriver(warehouseCoords, 5, bearing);
  const snapped = await snapDriverToRoad(candidate);
  if (snapped) {
    return snapped;
  } else if (attempts < maxAttempts) {
    // Slightly adjust bearing randomly by ±5° and try again.
    const newBearing = bearing + (Math.random() * 10 - 5);
    return getValidCandidate(warehouseCoords, newBearing, attempts + 1, maxAttempts);
  } else {
    return null;
  }
}

/**
 * MultiFixedDriverScanner:
 *  - Computes an array of fixed driver candidate points at a fixed distance (5 km) 
 *    from the warehouse using different bearings.
 *  - Snaps each candidate to the nearest road.
 *  - If a candidate fails to snap (i.e. no matching is returned), it retries with a new bearing.
 *  - Calls onDriversFound with the array of valid, snapped candidate drivers.
 *  - Does not auto-select a driver.
 */
const MultiFixedDriverScanner = ({ warehouseCoords, mode, onDriversFound }) => {
  useEffect(() => {
    if (mode !== "driver") return;
    // Define candidate bearings (in degrees)
    const bearings = [90, 135, 180, 225];
    Promise.all(bearings.map(bearing => getValidCandidate(warehouseCoords, bearing)))
      .then(results => {
        // Filter out any candidates that failed (null).
        const validCandidates = results.filter(candidate => candidate !== null);
        onDriversFound(validCandidates);
      })
      .catch(err => console.error("Error processing candidate drivers:", err));
  }, [mode, warehouseCoords, onDriversFound]);

  return null;
};

export default MultiFixedDriverScanner;

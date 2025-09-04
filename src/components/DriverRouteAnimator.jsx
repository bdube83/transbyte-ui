import React, { useEffect, useRef } from "react";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN?.trim();

const animateRoute = (fullCoords, onUpdate) => {
  let index = 0;
  const animate = () => {
    index++;
    if (index <= fullCoords.length) {
      onUpdate(fullCoords.slice(0, index));
      requestAnimationFrame(animate);
    }
  };
  animate();
};

const DriverRouteAnimator = ({ driver, warehouseCoords, onDriverRouteUpdated }) => {
  const routeFetched = useRef(false);

  useEffect(() => {
    if (!driver || routeFetched.current) return;
    const fetchDriverRoute = async () => {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${driver.longitude},${driver.latitude};${warehouseCoords.longitude},${warehouseCoords.latitude}?geometries=geojson&exclude=ferry&access_token=${MAPBOX_TOKEN}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
          const fullCoords = data.routes[0].geometry.coordinates;
          animateRoute(fullCoords, onDriverRouteUpdated);
          routeFetched.current = true;
        }
      } catch (err) {
        console.error("Driver route fetch error:", err);
      }
    };
    fetchDriverRoute();
  }, [driver, warehouseCoords, onDriverRouteUpdated]);

  return null;
};

export default DriverRouteAnimator;

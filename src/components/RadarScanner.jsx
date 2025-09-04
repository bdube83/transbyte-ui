import React, { useEffect, useRef } from "react";

const RadarScanner = ({ duration = 3000, onComplete }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // Ensure the canvas is sized to the container dimensions
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext("2d");
    let startTime = null;

    // Generate some "gimmick" points within the canvas.
    const numPoints = 20;
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: 0,
      });
    }

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 to 1

      // Clear the canvas.
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Optionally draw a faint background overlay.
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate the x-position of the radar line (left-to-right).
      const xPos = progress * canvas.width;

      // Draw the radar sweep line with a green gradient.
      const gradient = ctx.createLinearGradient(xPos - 30, 0, xPos + 30, 0);
      gradient.addColorStop(0, "rgba(0,255,0,0)");
      gradient.addColorStop(0.5, "rgba(0,255,0,0.8)");
      gradient.addColorStop(1, "rgba(0,255,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(xPos - 30, 0, 60, canvas.height);

      // For each gimmick point, if the radar line is near, light it up.
      points.forEach((pt) => {
        const dist = Math.abs(pt.x - xPos);
        if (dist < 30) {
          // Increase opacity the closer the radar line is.
          pt.opacity = Math.max(0, 1 - dist / 30);
        } else {
          // Otherwise, slowly fade out.
          pt.opacity *= 0.95;
        }
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 0, 0, ${pt.opacity})`;
        ctx.fill();
      });

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Scan complete
        if (onComplete) onComplete();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [duration, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10, // Ensure it's on top of the map
      }}
    />
  );
};

export default RadarScanner;

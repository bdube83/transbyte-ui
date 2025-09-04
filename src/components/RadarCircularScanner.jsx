import React, { useEffect, useRef } from "react";

const RadarCircularScanner = ({
  duration = 2000,
  sweepColor = "rgba(0,150,255,0.7)",
  backgroundColor = "rgba(0,0,0,0.3)",
  onProgress, // new callback: current sweep angle (in radians)
  onComplete,
}) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    // Use the center of the canvas as the radar center.
    const center = { x: rect.width / 2, y: rect.height / 2 };
    // Compute full radius needed to cover the canvas.
    const fullRadius = Math.sqrt(center.x ** 2 + center.y ** 2);
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Current angle of the sweep (0 to 2π)
      const angle = progress * 2 * Math.PI;
      // Report progress to parent.
      if (onProgress) onProgress(angle);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.rotate(angle);
      ctx.beginPath();
      // Draw a sector with a sweep angle (e.g. 45°)
      const sweepAngle = (45 * Math.PI) / 180;
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, fullRadius, 0, sweepAngle);
      ctx.closePath();
      ctx.fillStyle = sweepColor;
      ctx.fill();
      ctx.restore();
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        if (onComplete) onComplete();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [duration, sweepColor, backgroundColor, onProgress, onComplete]);

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
        zIndex: 20,
      }}
    />
  );
};

export default RadarCircularScanner;

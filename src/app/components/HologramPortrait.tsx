"use client";

import React, { useEffect, useRef } from "react";

type HologramPortraitProps = {
  src: string;
  alt: string;
  /** Pixel size for sampling; larger = chunkier dots */
  sampleSize?: number;
  /** Strength of green neon (0-1) */
  neonIntensity?: number;
  /** Milliseconds for a full normal -> holo -> normal cycle */
  cycleMs?: number;
  /** Background noise particle density [0-1] */
  noiseAmount?: number;
  /** Rendering style: 'hybrid' shows base image faintly; 'holo' shows dots only */
  mode?: "holo" | "hybrid";
  /** Show scan sweep and radial glow overlays */
  overlays?: boolean;
  /** Optional className for wrapper */
  className?: string;
};

/**
 * Canvas-based halftone/particle neon portrait.
 * Renders the source image to an offscreen canvas, samples brightness in a grid
 * and draws glowing green circles to a visible canvas. Works with any image.
 */
export default function HologramPortrait({
  src,
  alt,
  sampleSize = 4,
  neonIntensity = 0.9,
  cycleMs = 4500,
  noiseAmount = 0.08,
  mode = "holo",
  overlays = false,
  className,
}: HologramPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvasMaybe = canvasRef.current;
    const imgMaybe = imgRef.current;
    if (!canvasMaybe || !imgMaybe) return;
    const canvas = canvasMaybe;
    const img = imgMaybe;

    let rafId = 0;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d");
    if (!offCtx) return;

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width));
      canvas.height = Math.max(1, Math.floor(height));
      off.width = canvas.width;
      off.height = canvas.height;
    }

    function draw(time?: number) {
      if (!ctx || !offCtx) return;
      if (!img.complete) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      // Contain-fit the image into the canvas (show entire image without cropping)
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.min(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      // Render source into offscreen
      offCtx.clearRect(0, 0, cw, ch);
      offCtx.drawImage(img, dx, dy, dw, dh);

      const step = Math.max(2, sampleSize);
      const data = offCtx.getImageData(0, 0, cw, ch).data;

      ctx.clearRect(0, 0, cw, ch);

      // Phase 0..1..0 sine wave for hologram intensity
      const now = typeof time === "number" ? time : performance.now();
      const omega = (Math.PI * 2) / Math.max(100, cycleMs);
      const phase = (Math.sin(now * omega - Math.PI / 2) + 1) / 2; // ease-in start from normal
      const effectT = Math.min(1, Math.max(0, phase));

      // Clear to transparent so it blends with page background
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, cw, ch);

      // Optionally show base image in hybrid mode
      if (mode === "hybrid") {
        // Start fully visible, fade out as hologram intensity grows
        const baseAlpha = Math.max(0, 1 - effectT);
        ctx.globalAlpha = baseAlpha;
        ctx.drawImage(img, dx, dy, dw, dh);
        ctx.globalAlpha = 1;
      }

      ctx.globalCompositeOperation = "lighter"; // additive for glow

      const base = Math.max(0, Math.min(1, neonIntensity));
      const jitter = 0.6; // random sprinkle around pixels

      for (let y = 0; y < ch; y += step) {
        for (let x = 0; x < cw; x += step) {
          const idx = (y * cw + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3] / 255;
          if (a < 0.02) continue;

          // perceived luminance
          const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
          // light dots for dark regions as background noise
          const noisy = lum < 0.08 && Math.random() < noiseAmount * effectT;
          if (!noisy && lum < 0.05) continue;

          // Strength mapping for a punchier neon look
          const strength = noisy ? 0.25 : Math.pow(lum, 0.8);
          const radius = (strength * step * 0.75) + 0.35;
          const jitterX = (Math.random() - 0.5) * jitter * (noisy ? 2.2 : 1.0);
          const jitterY = (Math.random() - 0.5) * jitter * (noisy ? 2.2 : 1.0);

          // neon green with slight variation
          const intensity = base * effectT * (0.85 + 0.5 * strength);
          ctx.fillStyle = `rgba(52, 243, 126, ${0.22 * intensity})`;
          ctx.beginPath();
          ctx.arc(x + jitterX, y + jitterY, radius * 1.4, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(182, 255, 211, ${0.42 * intensity})`;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.5, radius * 0.85), 0, Math.PI * 2);
          ctx.fill();

          // Sparse spill particles around bright areas
          if (!noisy && strength > 0.25 && Math.random() < 0.12 * effectT) {
            const dir = (Math.random() - 0.5) * Math.PI * 2;
            const dist = (0.8 + Math.random() * 2.2) * step;
            const sx = x + Math.cos(dir) * dist;
            const sy = y + Math.sin(dir) * dist;
            ctx.fillStyle = `rgba(182,255,211,${0.18 * intensity})`;
            ctx.beginPath();
            ctx.arc(sx, sy, Math.max(0.4, radius * 0.55), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // faint scanline overlay to match CRT
      // subtle scan sweep + radial glow
      if (overlays) {
        const grad = ctx.createLinearGradient(0, 0, 0, ch);
        grad.addColorStop(0.10, `rgba(52,243,126,${0 * effectT})`);
        grad.addColorStop(0.12, `rgba(52,243,126,${0.12 * effectT})`);
        grad.addColorStop(0.14, `rgba(52,243,126,${0 * effectT})`);
        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = "screen";
        ctx.fillRect(0, 0, cw, ch);

        const rg = ctx.createRadialGradient(cw*0.5, ch*0.35, ch*0.05, cw*0.5, ch*0.35, ch*0.6);
        rg.addColorStop(0, `rgba(52,243,126,${0.18 * effectT})`);
        rg.addColorStop(1, "rgba(52,243,126,0)");
        ctx.fillStyle = rg;
        ctx.fillRect(0, 0, cw, ch);
      }

      rafId = requestAnimationFrame(draw);
    }

    const onResize = () => {
      resize();
      // kick draw loop
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(draw);
    };

    resize();
    rafId = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, [sampleSize, neonIntensity, cycleMs, mode, noiseAmount, overlays]);

  return (
    <div className={["relative", className].filter(Boolean).join(" ")}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      {/* Hidden img as source for pixels; Next/Image for nice loading */}
      <span style={{ position: "absolute", inset: 0, visibility: "hidden" }}>
        {/* Using plain img under the hood to access naturalWidth/Height reliably */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imgRef} src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </span>
      {overlays && <div className="inner-crt-overlay" />}
    </div>
  );
}



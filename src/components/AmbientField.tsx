import { useEffect, useRef } from "react";

/** Animated background: drifting aurora blobs + a constellation that leans toward the cursor. */
export default function AmbientField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, g = c.getContext("2d")!;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, mx = 0.5, my = 0.5;
    const dots = Array.from({ length: 55 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * 2e-4, vy: (Math.random() - .5) * 2e-4 }));
    const blobs = [["20,168,154", .2, .25], ["245,177,76", .8, .7], ["79,209,191", .7, .15]] as const;
    const size = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    const onMove = (e: MouseEvent) => { mx = e.clientX / w; my = e.clientY / h; };
    const draw = (t: number) => {
      g.clearRect(0, 0, w, h);
      blobs.forEach(([rgb, bx, by], i) => {
        const x = (bx + Math.sin(t / 7000 + i * 2) * .08 + (mx - .5) * .04) * w, y = (by + Math.cos(t / 9000 + i) * .08 + (my - .5) * .04) * h;
        const r = Math.max(w, h) * .4, gr = g.createRadialGradient(x, y, 0, x, y, r);
        gr.addColorStop(0, `rgba(${rgb},.2)`); gr.addColorStop(1, `rgba(${rgb},0)`);
        g.fillStyle = gr; g.fillRect(0, 0, w, h);
      });
      dots.forEach((d, i) => {
        if (!calm) { d.x = (d.x + d.vx * 16 + 1) % 1; d.y = (d.y + d.vy * 16 + 1) % 1; }
        const x = d.x * w, y = d.y * h;
        g.fillStyle = "rgba(255,215,154,.7)"; g.beginPath(); g.arc(x, y, 1.6, 0, 7); g.fill();
        for (let j = i + 1; j < dots.length; j++) {
          const dx = x - dots[j].x * w, dy = y - dots[j].y * h, dist = Math.hypot(dx, dy);
          if (dist < 130) { g.strokeStyle = `rgba(79,209,191,${.18 * (1 - dist / 130)})`; g.beginPath(); g.moveTo(x, y); g.lineTo(dots[j].x * w, dots[j].y * h); g.stroke(); }
        }
      });
      if (!calm) raf = requestAnimationFrame(draw);
    };
    size(); raf = requestAnimationFrame(draw);
    addEventListener("resize", size); addEventListener("mousemove", onMove);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("mousemove", onMove); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-ink" />;
}

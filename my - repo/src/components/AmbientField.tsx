import { useMemo } from "react";

/**
 * Ambient background: fine grid, soft royal glows, drifting node/line network,
 * and floating particles. Pure CSS/SVG, respects prefers-reduced-motion via index.css.
 */
export default function AmbientField() {
  const nodes = useMemo(() => {
    const seeded = [
      [8, 18], [22, 42], [38, 12], [52, 34], [64, 8], [76, 46],
      [88, 20], [14, 68], [30, 82], [48, 64], [62, 88], [82, 70],
      [92, 92], [6, 90],
    ];
    return seeded.map(([x, y], i) => ({ x, y, delay: (i % 6) * 1.4 }));
  }, []);

  const edges = [
    [0, 1], [1, 3], [3, 5], [5, 6], [2, 3], [3, 4], [7, 8], [8, 9],
    [9, 10], [10, 11], [11, 12], [1, 7], [9, 4], [13, 7],
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* fine grid */}
      <div className="absolute inset-0 bg-grid-fine bg-[size:56px_56px] opacity-40" />

      {/* soft glows */}
      <div className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-royal/25 blur-[120px] animate-pulseGlow" />
      <div className="absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-royal-light/15 blur-[130px] animate-pulseGlow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-[-8rem] left-1/4 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-[130px] animate-pulseGlow" style={{ animationDelay: "4s" }} />

      {/* network of nodes + lines */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.35]" viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map(([a, b], i) => {
          const n1 = nodes[a];
          const n2 = nodes[b];
          if (!n1 || !n2) return null;
          return (
            <line
              key={i}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              stroke="#5578CC"
              strokeWidth="0.08"
            />
          );
        })}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="0.45" fill="#C7A15C" opacity="0.7" />
        ))}
      </svg>

      {/* drifting particles */}
      <div className="absolute inset-0">
        {nodes.slice(0, 8).map((n, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-ash/60 animate-drift"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              animationDelay: `${n.delay}s`,
              animationDuration: `${8 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/0 via-ink/10 to-ink" />
    </div>
  );
}

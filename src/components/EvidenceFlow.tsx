/**
 * Signature element: an SVG "circuit" tracing EVIDENCE -> IK hub -> SOLUTIONS,
 * with a particle continuously flowing along the path. Reused (in spirit) by the
 * institutions network and value-chain diagrams elsewhere on the page.
 */
export default function EvidenceFlow() {
  return (
    <svg
      viewBox="0 0 640 220"
      className="w-full max-w-xl"
      role="img"
      aria-label="Diagram: Evidence flows into a central hub and becomes Solutions"
    >
      <defs>
        <linearGradient id="flowLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5578CC" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#5578CC" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#C7A15C" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <path
        id="flowPath"
        d="M 40 110 C 160 110, 200 60, 320 60 C 440 60, 480 160, 600 160"
        fill="none"
        stroke="url(#flowLine)"
        strokeWidth="1.5"
      />

      {/* Evidence node */}
      <circle cx="40" cy="110" r="6" fill="#5578CC" />
      <text x="40" y="140" textAnchor="middle" className="font-mono-label" fontSize="11" fill="#8E9AB8" letterSpacing="1.5">
        EVIDENCE
      </text>

      {/* Hub */}
      <circle cx="320" cy="60" r="20" fill="#0F1B38" stroke="#C7A15C" strokeWidth="1.2" />
      <text x="320" y="65" textAnchor="middle" className="font-display" fontSize="14" fontWeight="600" fill="#E7D2A0">
        IK
      </text>

      {/* Solutions node */}
      <circle cx="600" cy="160" r="6" fill="#C7A15C" />
      <text x="600" y="190" textAnchor="middle" className="font-mono-label" fontSize="11" fill="#8E9AB8" letterSpacing="1.5">
        SOLUTIONS
      </text>

      {/* flowing particle */}
      <circle r="3.5" fill="#E7D2A0">
        <animateMotion dur="4.2s" repeatCount="indefinite" rotate="auto">
          <mpath href="#flowPath" />
        </animateMotion>
      </circle>
    </svg>
  );
}

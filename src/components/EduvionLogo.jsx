export default function AnimatedLogo() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
      <svg
        viewBox="0 0 400 400"
        className="w-96 h-96"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="fullDrawMask">
            <rect width="100%" height="100%" fill="black" />

            {/* GRID DRAW – FEELS LIKE FULL LOGO DRAW */}
            {[...Array(14)].map((_, i) => (
              <rect
                key={i}
                x="40"
                y={40 + i * 22}
                width="320"
                height="10"
                fill="white"
              >
                <animate
                  attributeName="width"
                  from="0"
                  to="320"
                  dur="0.15s"
                  begin={`${i * 0.12}s`}
                  fill="freeze"
                />
              </rect>
            ))}
          </mask>
        </defs>

        {/* DRAWING PHASE */}
        <image
          href="/logo.png"
          width="400"
          height="400"
          mask="url(#fullDrawMask)"
        />

        {/* FINAL REVEAL */}
        <image
          href="/logo.png"
          width="400"
          height="400"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="0.3s"
            begin="2.1s"
            fill="freeze"
          />
        </image>
      </svg>
    </div>
  );
}

// Hand-drawn style sketches for Prototype 3 (Inspiration). Inline SVG so the
// handwriting font (Caveat) loads. 4:3, same size as the story photos.

const paper = (id) => `
  <defs>
    <filter id="rough-${id}"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="${id === "a" ? 4 : 9}"/><feDisplacementMap in="SourceGraphic" scale="2.6"/></filter>
    <pattern id="dots-${id}" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".9" fill="#D9D0C1"/></pattern>
  </defs>
  <rect width="400" height="300" fill="#F6F1E7"/>
  <rect width="400" height="300" fill="url(#dots-${id})"/>`;

const ink = `fill="none" stroke="#3B3229" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"`;
const soft = `fill="none" stroke="#3B3229" stroke-width="1.3" stroke-linecap="round" opacity=".45"`;
const hand = `font-family="Caveat, 'Bradley Hand', cursive" fill="#4A3F35"`;

// Sketch 1: Sunday noodles at Grandpa's, steaming bowl with chopsticks
export const memorySketch = `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pencil sketch of a steaming noodle bowl with chopsticks">
  ${paper("a")}
  <g filter="url(#rough-a)">
    <path ${soft} d="M18 236 Q200 226 384 238"/>
    <path ${ink} d="M14 240 Q200 230 386 242"/>
    <!-- bowl -->
    <ellipse ${ink} cx="200" cy="158" rx="112" ry="26"/>
    <path ${ink} d="M88 158 Q96 228 200 232 Q304 228 312 158"/>
    <path ${soft} d="M96 172 Q110 222 200 226 Q290 222 304 172"/>
    <path ${ink} d="M166 231 L170 243 L230 243 L234 231"/>
    <!-- chip in the rim -->
    <path ${ink} d="M258 136 l7 6 l6 -5"/>
    <!-- noodles + egg -->
    <path ${soft} d="M118 160 q12 -8 24 0 t24 0 t24 0 t24 0 t24 0 t24 0"/>
    <path ${soft} d="M126 168 q12 -8 24 0 t24 0 t24 0 t24 0 t24 0"/>
    <ellipse ${ink} cx="236" cy="153" rx="20" ry="10"/>
    <ellipse ${ink} cx="236" cy="153" rx="8" ry="4.5"/>
    <!-- chopsticks -->
    <path ${ink} d="M318 46 L196 150"/>
    <path ${ink} d="M334 58 L206 156"/>
    <!-- steam -->
    <path ${soft} d="M160 122 q-10 -14 0 -26 t0 -26"/>
    <path ${soft} d="M196 116 q-10 -14 0 -26 t0 -26 t0 -24"/>
    <path ${soft} d="M132 128 q-8 -12 0 -22 t0 -20"/>
  </g>
  <text x="22" y="266" font-size="24" ${hand}>Sundays at Grandpa's</text>
  <text x="300" y="118" font-size="18" ${hand}>the chip!</text>
  <path ${ink} stroke-width="1.6" d="M300 122 Q280 128 270 136"/>
  <text x="318" y="266" font-size="17" ${hand} opacity=".7">— M.H.</text>
</svg>`;

// Sketch 2: working drawing of the bowl's shape with notes
export const shapeSketch = `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pencil design sketch of the bowl with measurements and notes">
  ${paper("b")}
  <g filter="url(#rough-b)">
    <!-- width dimension -->
    <path ${ink} stroke-width="1.6" d="M86 92 L314 92 M86 84 L86 100 M314 84 L314 100"/>
    <!-- chopsticks resting on rim -->
    <path ${soft} stroke-width="2" d="M52 112 L352 100"/>
    <path ${soft} stroke-width="2" d="M56 122 L356 110"/>
    <!-- bowl body with facets -->
    <path ${ink} d="M86 116 L104 206 Q110 222 134 224 L266 224 Q290 222 296 206 L314 116"/>
    <path ${ink} d="M86 116 Q200 132 314 116"/>
    <path ${soft} d="M86 116 Q200 102 314 116"/>
    <path ${soft} d="M132 123 L142 222 M176 127 L180 224 M224 127 L220 224 M268 123 L258 222"/>
    <!-- foot -->
    <path ${ink} d="M156 224 L160 236 L240 236 L244 224"/>
    <!-- depth dimension -->
    <path ${ink} stroke-width="1.6" d="M338 118 L338 236 M330 118 L346 118 M330 236 L346 236"/>
    <!-- arrows -->
    <path ${ink} stroke-width="1.6" d="M60 182 Q80 176 96 168"/>
    <path ${ink} stroke-width="1.6" d="M236 252 Q220 248 210 240"/>
  </g>
  <text x="140" y="80" font-size="22" ${hand}>7.5 in · chopsticks rest here</text>
  <text x="352" y="182" font-size="20" ${hand}>3.5</text>
  <text x="352" y="200" font-size="20" ${hand}>deep</text>
  <text x="8" y="200" font-size="19" ${hand}>facets</text>
  <text x="8" y="218" font-size="19" ${hand}>= grip</text>
  <text x="240" y="262" font-size="19" ${hand}>thick base,</text>
  <text x="240" y="280" font-size="19" ${hand}>keeps broth hot</text>
  <text x="16" y="270" font-size="19" ${hand} opacity=".75">v3, wider + deeper</text>
</svg>`;

# NAKSHATRA REDESIGN CONTEXT
**Phase 2 — Deep Implementation Analysis**
**Date:** 20 Sep 2026
**Source:** `c:\Users\gurut\OneDrive\Desktop\nakshatra redesign`
**Status:** Read-only audit. No files were modified.

---

## 1. COMPLETE HOMEPAGE COMPONENT MAP

Traced: `main.tsx → App.tsx → all imports`

| Order | Section | Component | File | Anchor / ID | Main Visual Asset |
|---|---|---|---|---|---|
| BG | Starfield | `StarfieldCanvas` | `StarfieldCanvas.tsx` | — | 220 procedural stars, Canvas 2D |
| BG | Scroll Bar | `ScrollProgress` | `ScrollProgress.tsx` | — | CSS gradient bar |
| 0 | Navigation | `Navbar` | `Navbar.tsx` | — | `logo.svg` (404 — missing) |
| 1 | Hero | `Hero` | `Hero.tsx` | *(no id)* | `refined_hero_landscape.jpg` (flat composite) |
| — | Divider | `StarDivider` | `StarDivider.tsx` | — | Inline SVG spark |
| 2 | About | `About` | `About.tsx` | `#about` | None (text only) |
| — | Divider | `StarDivider` | `StarDivider.tsx` | — | Inline SVG spark |
| 3 | Why Participate | `WhyParticipate` | `WhyParticipate.tsx` | `#why` | Lucide icons (Compass, Cpu, Users, Rocket) |
| — | Divider | `StarDivider` | `StarDivider.tsx` | — | Inline SVG spark |
| 4 | Challenges | `Challenges` | `Challenges.tsx` | `#challenges` | Inline SVG satellite |
| — | Divider | `StarDivider` | `StarDivider.tsx` | — | Inline SVG spark |
| 5 | Timeline | `Schedule` | `Schedule.tsx` | `#schedule` | SVG connector line (drawn via GSAP) |
| — | Divider | `StarDivider` | `StarDivider.tsx` | — | Inline SVG spark |
| 6 | Rewards | `Rewards` | `Rewards.tsx` | `#rewards` | Inline SVG planet rings |
| — | Divider | `StarDivider` | `StarDivider.tsx` | — | Inline SVG spark |
| 7 | FAQ | `FAQ` | `FAQ.tsx` | `#faq` | None |
| 8 | Final CTA | `FinalCTA` | `FinalCTA.tsx` | — | Canvas 2D mini-starfield (static) |
| 9 | Footer | `Footer` | `Footer.tsx` | — | None |

**Total components: 15 (including 6 StarDividers, 2 background systems)**
**No routing.** Single-page, anchor scroll only.

---

## 2. EVERY HOMEPAGE SECTION — FULL ANALYSIS

---

### NAVBAR

**FILE:** `src/components/Navbar.tsx`
**PURPOSE:** Fixed top navigation, scroll-aware background change.

**DOM STRUCTURE:**
```
<nav> [fixed, z-50, h-72px mobile / h-80px desktop]
  <div> [full-width flex container, px-6 / px-[8vw]]
    <div> [logo area, z-50]
      <img src="/logo.svg" />               ← FILE MISSING, 404
      <div> [text fallback "NAKSHATRA."]    ← hidden, shown via JS onError
    </div>
    <div> [desktop nav, hidden lg:flex]
      <ul> [6 links, space-x-10, text-[12px]]
      <a href="#register"> [REGISTER →]
    </div>
    <button> [hamburger, lg:hidden]
    <div> [mobile overlay, fixed inset-0]   ← full-screen menu
  </div>
</nav>
```

**DATA:** navLinks = About (#about), Why Participate (#why), Challenges (#challenges), Schedule (#schedule), Rewards (#rewards), FAQs (#faq)

**CURRENT ANIMATION:**
- On `scrollY > 30`: React state change → class switch → `bg-[#03060C]/90 backdrop-blur-md border-b` (CSS transition 500ms)
- Mobile menu: `opacity-0/100 pointer-events-none/auto` toggle, `transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`

**RESPONSIVE:** Hamburger only on `< lg`. Full link row on `lg+`.

---

### HERO

**FILE:** `src/components/Hero.tsx`
**PURPOSE:** Full-viewport cinematic opener. The visual center of the website.

**DOM STRUCTURE (actual z-index layers, from bottom to top):**
```
<section> [relative, w-full, min-h-[100svh], bg-[#020408], flex]
  │
  ├── z-0: <div> [absolute inset-0] — background container
  │    ├── <video> [autoPlay muted loop, poster=refined_hero_landscape.jpg]
  │    │    └── <source src="/dummy-cinematic.mp4"> ← FILE MISSING
  │    └── <img src="/refined_hero_landscape.jpg"> [absolute inset-0 -z-10]
  │         ← fallback, always behind video
  │
  ├── z-10: <div> [atmospheric overlay, absolute inset-0, hero-overlay]
  │    └── bg-gradient-to-r from-[#03060C]/95 via-[#03060C]/60 to-transparent
  │         width: 95% mobile, 65% md, 50% lg
  │
  ├── z-20: <div> [content container]
  │    absolute, left-6 / left-[8vw], top-[48%], -translate-y-1/2
  │    max-w-[620px]
  │    ├── .hero-eyebrow    "IDEAS BEYOND BOUNDARIES"
  │    ├── <h1> .hero-title  "NAKSHATRA"
  │    ├── .hero-subtitle   "THE AEROSPACE HACKATHON 2026"
  │    ├── .hero-message    "Build. Explore. Innovate."
  │    └── .hero-ctas
  │         ├── <button> "Explore Challenges →" [silver bg, dark text]
  │         └── <button> "Watch Trailer" [transparent, border]
  │
  ├── z-20: .hero-meta-bottom [absolute bottom-10 left-[8vw]]
  │    └── "01 / 04 — SCROLL TO EXPLORE"
  │
  ├── z-20: .hero-meta-bottom [absolute bottom-10 center, lg only]
  │    └── "INDIA WIDE · STUDENT INNOVATORS · AEROSPACE & SPACE"
  │
  └── z-20: .hero-meta-right [absolute right-[5vw] top-1/2, lg only]
       └── EXPLORE / INNOVATE / COLLABORATE / LAUNCH [vertical text]
```

**ASSETS:**
- `refined_hero_landscape.jpg` — **flat composite** (16:9, 1366×768 visible, 617KB)
- `/dummy-cinematic.mp4` — **DOES NOT EXIST**

**CURRENT ANIMATIONS (all time-based, no scroll link):**
```
tl.to('.hero-bg')          scale:1.02→1,  blur:2px→0    1.5s  power3.out  t=0
tl.to('.hero-overlay')     opacity:0→1                  1.5s             t=0 (parallel)
tl.fromTo('.hero-eyebrow') y:15→0, opacity:0→1          1.0s  power2.out  t≈0.3s
tl.fromTo('.hero-title')   y:20→0, opacity:0→1          1.0s             t≈0.6s
tl.fromTo('.hero-subtitle') y:15→0, opacity:0→1         1.0s             t≈0.7s
tl.fromTo('.hero-message') opacity:0→1                  1.0s             t≈0.9s
tl.fromTo('.hero-ctas')    y:15→0, opacity:0→1          1.0s             t≈1.1s
tl.fromTo('.hero-meta-bottom') opacity:0→1              1.0s             t≈1.5s
tl.fromTo('.hero-meta-right')  x:5→0, opacity:0→1       1.0s             t≈1.4s
```

**RESPONSIVE:**
- Desktop (lg+): bottom-center metadata row + right vertical markers visible
- Mobile: both hidden (`hidden lg:flex`)
- Title: `text-4xl sm:text-5xl md:text-[clamp(3rem,4.5vw,4.5rem)]`

---

### ABOUT

**FILE:** `src/components/About.tsx`
**PURPOSE:** Mission statement + animated stats counters.

**DOM STRUCTURE:**
```
<section id="about"> [py-32, px-6/12, bg-gradient from-[#020408] via-[#000000] to-[#000000]]
  <div> [absolute, left radial glow 600px ellipse, rgba(141,184,255,0.04)]
  <div> [max-w-7xl, grid grid-cols-1 lg:grid-cols-2, gap-16]
    LEFT COLUMN:
      <div .about-headline overflow-hidden>
        <h2> 10 words, each in overflow:hidden > inline-block span
             font-display, text-3xl/5xl/6xl, font-light, text-white
      <div .about-stats flex gap-10>
        3x [animated counter + label]
          "12+" / Challenge Tracks
          "48H" / Build Window
          "500+" / Innovators Expected
    RIGHT COLUMN:
      <div .about-line> [1px horizontal line, brand-blue/30]
      <p .about-body> [primary body copy]
      <p .about-body> [secondary body copy]
      <a .about-body> [VIEW CHALLENGES →]
```

**ANIMATIONS:**
- Words: `y:100%→0` (clip reveal from overflow-hidden parent), stagger 0.04s, power3.out
- Body: `y:30, opacity:0` → in, stagger 0.15s
- Line: `scaleX:0→1`, origin left, 1.2s, power3.out
- Stats: `y:20, opacity:0` → in, stagger 0.15s
- Counters: rAF ease-out-expo count-up from 0 on ScrollTrigger enter

**LAYOUT:** Two-column grid on lg+; single column stacked on mobile.

---

### WHY PARTICIPATE

**FILE:** `src/components/WhyParticipate.tsx`
**PURPOSE:** 4 pillars of participation, icon cards.

**DOM STRUCTURE:**
```
<section id="why"> [py-32, bg-[#000000]]
  <div> [ambient center radial glow 900×500px, rgba(141,184,255,0.03)]
  <div .why-header> [flex col/row, justify-between]
    label: "Why Participate"
    h2: "MISSION PARAMETERS"
    p: body description
  <div .why-grid> [grid 1/2/4 cols, gap-px, bg-white/[0.04]] ← 1px gaps as borders
    4x <div .why-card bg-[#000000] p-10 group>
       ID label (01-04), Lucide icon, title, description
       → hover: blue icon glow, bottom line reveal scaleX
```

**ANIMATIONS:**
- Header: `y:30, opacity:0` → in, 1s, power3.out
- Cards: `y:50, opacity:0` → in, stagger 0.12s, power3.out
- Hover: icon color transition (500ms), bottom line scaleX (700ms), bg opacity (500ms)

**ICONS:** Compass (Explore), Cpu (Build), Users (Collaborate), Rocket (Launch) — all Lucide, `size={30}`, `strokeWidth={1}`

---

### CHALLENGES

**FILE:** `src/components/Challenges.tsx`
**PURPOSE:** 4 research domains in editorial list format.

**DOM STRUCTURE:**
```
<section id="challenges"> [py-32, bg-gradient from-[#000000] to-[#020408]]
  <div .satellite-float> [absolute right-6, top-50%, w-32/48, opacity-[0.12], hidden md:block]
    <SatelliteSVG /> ← inline SVG wireframe
  <div> [radial glow left, 400px, rgba(141,184,255,0.035)]
  <div .challenges-header>
    label: "Challenge Tracks"
    h2: "RESEARCH DOMAINS"
  <div .challenges-list border-t>
    4x <div .challenge-row border-b py-10>
       [absolute top-0 blue line → w-0 on hover → w-full, 700ms]
       [num, category, title] | [description] | [arrow]
  <div> [VIEW ALL CHALLENGES button, centered]
```

**ANIMATIONS:**
- Header: `y:25, opacity:0` → in
- Rows: `x:-30, opacity:0` → in, stagger 0.1s, power2.out (slides from left)
- Satellite: `y:-12px` yoyo 4s (float) + `rotation:2deg` yoyo 7s (rotate) — **continuous loop**
- Row hover: blue line `w:0→100%` (700ms CSS transition)

**SATELLITE SVG:** 120×120 viewBox. Body rect, 2 solar panel rects with grid lines, dish+signal, corner dots, center cross. All strokes `#8DB8FF`, opacity 0.2–0.5. Purely decorative, `opacity-[0.12]` container.

---

### SCHEDULE / TIMELINE

**FILE:** `src/components/Schedule.tsx`
**PURPOSE:** 4-phase hackathon timeline, horizontal on desktop.

**DOM STRUCTURE:**
```
<section id="schedule"> [py-32, bg-[#000000]]
  <div> [center radial glow 800×400px, rgba(141,184,255,0.025)]
  <div .schedule-header text-center>
    label: "Timeline"
    h2: "FLIGHT SCHEDULE"
  <div .schedule-track relative>
    <div> [absolute top-[22px], hidden md:block]
      <svg width=100% height=4>
        <line ref=lineRef> ← animated stroke-dashoffset
    <div grid-cols-1 md:grid-cols-4>
      4x <div .schedule-card>
         [.schedule-node] ← 16px circle, border-brand-blue/50
         [mobile vertical line]
         phase (01-04), title, date, desc
```

**DATA:**
- 01: Registration Opens — Oct 15, 2025
- 02: Idea Submission — Nov 10, 2025
- 03: Shortlist Announcement — Dec 05, 2025
- 04: Grand Finale — Jan 20–22, 2026

**ANIMATIONS:**
- Header: `y:25, opacity:0` → in
- SVG line: `strokeDashoffset:1000→0`, 1.6s, power2.inOut (draws left to right)
- Nodes: `scale:0, opacity:0` → in, stagger 0.3s, `back.out(2)` (spring pop)
- Cards: `y:30, opacity:0` → in, stagger 0.15s
- Node hover: border-blue, inner dot fills, `shadow-[0_0_12px_rgba(141,184,255,0.4)]` glow

---

### REWARDS

**FILE:** `src/components/Rewards.tsx`
**PURPOSE:** Award tier cards with shimmer hover effects.

**DOM STRUCTURE:**
```
<section id="rewards"> [py-32, bg-gradient from-[#020408] to-[#000000]]
  <div> [right radial glow, gold, rgba(217,180,106,0.03)]
  <div grid-cols-1 lg:grid-cols-2>
    LEFT .rewards-left:
      label: "Recognition"
      h2: "BEYOND THE HORIZON"
      p: body copy
      <div> [SVG planet rings, opacity-[0.08], hidden lg:block]
        3 concentric SVG circles + orbital ellipse
    RIGHT .rewards-right:
      <div .reward-card [TIER 01, gold border, bg-[#0a0800]]>
        shimmer sweep div + left border fill div (hover)
        "TIER 01 — PRIME" / "Prime Innovator Award" / copy
      <div grid-cols-1 md:grid-cols-2>
        <div .reward-card> [TIER 02 — Vanguard Award]
        <div .reward-card> [SPECIAL — Research Merit]
```

**ANIMATIONS:**
- Left: `x:-30, opacity:0` → in, power3.out
- Cards: `y:30, opacity:0` → in, stagger 0.15s
- Tier 01 hover: shimmer `translateX(-100%→+200%)` 1000ms, left border `h:0→100%` 500ms
- Tier 02/Special hover: left border `h:0→100%` 500ms

---

### FAQ

**FILE:** `src/components/FAQ.tsx`
**PURPOSE:** 4-question accordion, React state driven.

**DOM STRUCTURE:**
```
<section id="faq"> [py-32, bg-gradient-to-t from-brand-navy to-[#060b14]]
  <div max-w-4xl>
    h2: "SYSTEM QUERIES"
    4x <div border border-white/10 bg-[#05080D]>
       <button> [question text + Plus/Minus icon]
       <div> [answer, max-h-0/max-h-64 + opacity transition]
```

**DATA:**
- Q: "Who can participate?" A: undergraduate/postgraduate, India, 3-5 members
- Q: "Prior aerospace experience?" A: not mandatory, mentors available
- Q: "Online or offline?" A: online submission, offline 48-hour finale
- Q: "Evaluation criteria?" A: complexity, innovation, viability, presentation

**ANIMATION:** CSS `max-h + opacity` transition, 300ms ease-in-out. No GSAP.
**STATE:** `useState<number | null>(0)` — first item open by default.

---

### FINAL CTA

**FILE:** `src/components/FinalCTA.tsx`
**PURPOSE:** Closing cinematic call-to-action. Pure black with stars.

**DOM STRUCTURE:**
```
<section> [py-48, bg-[#000000], flex center]
  <canvas MiniStars> [absolute inset-0, static 120 stars drawn once]
  <div .final-glow> [absolute bottom, 120% wide, blue radial, pulsing]
  <div> [top 1px line, silver gradient]
  <div relative z-10 text-center>
    <h2 .final-headline>
      "THE SKY IS NOT"
      "THE LIMIT." [text-brand-silver/60]
    <a .final-cta-btn href="#register">
      "EXPLORE NAKSHATRA →"
    <div> "NAKSHATRA · THE AEROSPACE HACKATHON 2026"
```

**ANIMATIONS:**
- Headline: `scale:1.06, opacity:0` → in, 1.4s, power3.out
- CTA button: `y:20, opacity:0` → in, delay 0.4s
- CTA button: `boxShadow` pulse yoyo, 2.5s, sine.inOut — **continuous**
- Horizon glow: `opacity:0.3→0.6` yoyo, 3s — **continuous**
- MiniStars: Static canvas (no animation loop — drawn once on mount)

---

### FOOTER

**FILE:** `src/components/Footer.tsx`
**PURPOSE:** Static footer. No animations.

**DOM STRUCTURE:**
```
<footer bg-brand-navy pt-20 pb-10 border-t border-white/10>
  <div flex col/row justify-between>
    Brand column: "NAKSHATRA." + tagline
    NAVIGATION links: About, Challenges, Schedule, Rewards
    LEGAL links: Privacy, Terms, Code of Conduct
  <div flex, border-t border-white/5>
    "© 2026 NAKSHATRA. All rights reserved."
    TWITTER / LINKEDIN / INSTAGRAM [all href="#"]
```

**No animations. No GSAP. No scroll triggers.**

---

### STAR DIVIDER

**FILE:** `src/components/StarDivider.tsx`

```jsx
<div flex items-center gap-4 max-w-7xl mx-auto px-6/12 py-2>
  <div flex-1 h-[1px] bg-gradient-to-r from-transparent to-brand-silver/10 />
  <svg 14×14> [4-point star path, fill:#8DB8FF, opacity-40] </svg>
  <div flex-1 h-[1px] bg-gradient-to-l from-transparent to-brand-silver/10 />
```

**Used 6 times** between sections. No animation. Pure visual texture.

---

### STARFIELD CANVAS

**FILE:** `src/components/StarfieldCanvas.tsx`
**PURPOSE:** Global animated star layer behind the entire page.

**Implementation:**
- Fixed `canvas` element, `z-0`, `pointer-events-none`
- 220 stars: radius 0.2–1.4px, opacity 0.1–0.7
- Colors: white, `rgba(141,184,255,...)`, silver-white
- rAF loop runs at ~60fps continuously
- Stars shift vertically by `scrollY * 0.04` — extremely subtle parallax
- On resize: reinitializes all star positions

---

## 3. CURRENT PAGE VISUAL STRUCTURE

---

**SECTION: Hero**
HEIGHT: `100svh` (viewport fill)
BACKGROUND: `refined_hero_landscape.jpg` — dark space, blue-gray planet upper-center-right, astronaut far-right, golden horizon glow. Dark navy sky with sparse stars.
MAIN CONTENT: Left-aligned text block, max-width 620px, positioned at 8vw left, vertically centered
IMAGE/GRAPHIC: Full-bleed composite photo background
TEXT POSITION: Far left, centered vertically
BUTTONS: "Explore Challenges →" (silver), "Watch Trailer" (outline), row at bottom of text block
DECORATIVE ELEMENTS: Bottom-center metadata strip, right-side vertical words (lg only)
OVERLAPPING ELEMENTS: Dark gradient overlay covers left 50% for readability
CURRENT SCROLL BEHAVIOR: No scroll effect on hero. Page scrolls natively past it.
CURRENT ENTRY ANIMATION: Background unblurs + text fades/slides in sequentially (load-time)
CURRENT EXIT ANIMATION: None. Hero just scrolls away.

---

**SECTION: About**
HEIGHT: ~600–700px (`py-32` = 8rem top+bottom)
BACKGROUND: Gradient from `#020408` → `#000000`, left blue radial glow
MAIN CONTENT: Two-column grid — headline words + stats left; body copy right
IMAGE/GRAPHIC: None
TEXT POSITION: Left column: large h2 headline + 3 stat counters. Right column: body text.
BUTTONS: "VIEW CHALLENGES →" text link
DECORATIVE ELEMENTS: 1px horizontal blue line (scaleX reveal)
CURRENT SCROLL BEHAVIOR: None after entrance
CURRENT ENTRY ANIMATION: Words clip-reveal, line draws, body fades, stats count up

---

**SECTION: Why Participate**
HEIGHT: ~500–600px
BACKGROUND: Pure black `#000000`, center ambient blue glow
MAIN CONTENT: Header + 4-column icon card grid
IMAGE/GRAPHIC: Lucide icons inside cards
TEXT POSITION: Header left/justified; card content top-aligned in columns
BUTTONS: None
DECORATIVE ELEMENTS: 1px white gap between cards, hover bottom line reveals
CURRENT SCROLL BEHAVIOR: None after entrance
CURRENT ENTRY ANIMATION: Header fades, cards stagger y:50→0

---

**SECTION: Challenges**
HEIGHT: ~700–800px
BACKGROUND: Gradient `#000000` → `#020408`, left radial glow
MAIN CONTENT: Header + editorial list of 4 challenge rows
IMAGE/GRAPHIC: Satellite SVG wireframe floating on right (opacity 0.12)
TEXT POSITION: Rows: number + title left third; description center half
BUTTONS: "VIEW ALL CHALLENGES →" centered at bottom
DECORATIVE ELEMENTS: Satellite floats/rotates. Blue top-line reveals on row hover.
CURRENT SCROLL BEHAVIOR: Satellite drifts continuously (GSAP yoyo)
CURRENT ENTRY ANIMATION: Rows slide in from x:-30

---

**SECTION: Schedule / Timeline**
HEIGHT: ~500–600px
BACKGROUND: Pure black `#000000`, center radial glow
MAIN CONTENT: Centered header + 4-node horizontal timeline
IMAGE/GRAPHIC: SVG animated connector line + circular nodes
TEXT POSITION: Phase + title + date below each node, centered
BUTTONS: None
DECORATIVE ELEMENTS: SVG line draws, nodes pop
CURRENT SCROLL BEHAVIOR: None after entrance
CURRENT ENTRY ANIMATION: Line draws left-to-right, nodes spring-pop, cards slide up

---

**SECTION: Rewards**
HEIGHT: ~550–650px
BACKGROUND: Gradient `#020408` → `#000000`, right warm gold radial glow
MAIN CONTENT: Two-column — headline+text left; stacked award cards right
IMAGE/GRAPHIC: SVG planet ring diagram (3 circles + orbital ellipse), opacity 0.08
TEXT POSITION: Left: label + h2 + body. Right: 3 cards stacked.
BUTTONS: None
DECORATIVE ELEMENTS: Shimmer sweep on Tier 01 hover. Left border charge on all cards.
CURRENT SCROLL BEHAVIOR: None after entrance
CURRENT ENTRY ANIMATION: Left slides from x:-30; cards slide from y:30

---

**SECTION: FAQ**
HEIGHT: ~600–700px
BACKGROUND: Gradient from `#060b14` to `brand-navy`, `border-t border-white/5`
MAIN CONTENT: Centered h2 + 4 accordion items
IMAGE/GRAPHIC: None
TEXT POSITION: All centered, max-w-4xl
BUTTONS: None (accordion toggles only)
DECORATIVE ELEMENTS: Plus/Minus Lucide icons
CURRENT SCROLL BEHAVIOR: None
CURRENT ENTRY ANIMATION: None (no GSAP)

---

**SECTION: Final CTA**
HEIGHT: `py-48` = ~24rem + content
BACKGROUND: Pure black `#000000`, static mini starfield canvas, bottom blue glow
MAIN CONTENT: Centered large headline + CTA button + micro-text
IMAGE/GRAPHIC: Static canvas stars, horizon glow div
TEXT POSITION: All centered
BUTTONS: "EXPLORE NAKSHATRA →" (blue outline)
DECORATIVE ELEMENTS: Pulsing button shadow, pulsing horizon glow
CURRENT SCROLL BEHAVIOR: Nothing scroll-linked
CURRENT ENTRY ANIMATION: Headline scale:1.06→1, button fades

---

## 4. ALL VISUAL ASSETS — COMPLETE INVENTORY

---

### `refined_hero_landscape.jpg`
- **Path:** `/public/refined_hero_landscape.jpg`
- **Type:** JPEG, raster
- **Size:** 617 KB
- **Dimensions:** ~1366×768 (rendered at 16:9 ratio)
- **Aspect ratio:** 16:9
- **Transparency:** ❌ None (JPEG)
- **Currently used:** Hero background (active, primary)
- **Visual description:**
  - **Sky (upper 45%):** Deep navy-to-black gradient with sparse realistic stars. Pure and clean — no nebulae.
  - **Planet (upper-center-right, ~30% of frame width):** Large blue-gray gas giant with subtle atmospheric banding, blue-white rim glow. Centered roughly at 65% from left, 30% from top.
  - **Moon (upper-center, smaller):** Smaller gray moon, roughly 8% of frame width, positioned below-left of the planet.
  - **Horizon (lower-center):** Narrow golden-white sunrise band, warm white center fading to amber, very thin — perhaps 8% of frame height. Excellent contrast.
  - **Terrain/landscape (lower 40%):** Dark, rocky alien landscape — sharp rocky formations on left edge, flat plateau extending to distant mountains. Very dark, almost silhouette.
  - **Astronaut (right side, lower 40%):** Seated astronaut on a rock, facing left-center. Spacesuit with reflective gold visor, visible backpack. Blue-cool rim light on left side of suit. Occupies roughly the right 18% of the frame width.
- **Parallax suitable:** ❌ **FLAT COMPOSITE — all elements baked into a single pixel layer**
- **Redesign note:** The planet, astronaut, terrain, sky are **not separable**. This image cannot be used for independent layer parallax.

---

### `mission-astronaut.jpg`
- **Path:** `/public/mission-astronaut.jpg`
- **Type:** JPEG, raster
- **Size:** 527 KB
- **Dimensions:** ~893×1192 (portrait, approximately 3:4)
- **Transparency:** ❌ None (JPEG) — but **background is pure solid black** (`#000000`)
- **Currently used:** ❌ **Not used anywhere in the current codebase**
- **Visual description:**
  - Full-body standing astronaut, facing 3/4 right
  - Highly detailed photorealistic spacesuit — gray/silver suit with multiple pockets, belts, equipment
  - **Indian flag patch** visible on left shoulder (orange, white, green)
  - Gold reflective visor on helmet
  - Blue-cool rim light on left side of suit body
  - Background: pure `#000000` — **effectively pre-matted on black**
  - Standing pose, confident stance, slight left body turn
- **Parallax suitable:** ⚠️ **Near-usable** — black background means it could be composited with CSS `mix-blend-mode: lighten` or `screen` to remove the black and reveal only the astronaut. **Not a true PNG with alpha, but functionally close on black backgrounds.**
- **Redesign note:** THIS IS THE MOST VALUABLE UNUSED ASSET. Can be used as an independent layer in the hero. The Indian flag patch makes it specifically NAKSHATRA-branded.

---

### `clean_cosmic_landscape.jpg`
- **Path:** `/public/clean_cosmic_landscape.jpg`
- **Type:** JPEG, raster
- **Size:** 656 KB
- **Dimensions:** ~1366×768 (16:9)
- **Transparency:** ❌ None
- **Currently used:** ❌ **Not used anywhere**
- **Visual description:**
  - Similar cinematic space landscape composition
  - **Planet position:** Upper-center-left (more centered than in refined_hero_landscape)
  - **Planet:** Slightly darker, more muted, less blue rim glow
  - **Horizon:** Warmer orange/red — more prominent than refined version. Left side shows a sunrise with more orange color, more dramatic haze.
  - **Terrain:** More canyon-like with mesa formations — drier, almost Mars-like
  - **Astronaut:** Far right, same seated pose on rocks, facing left
  - **Stars:** More visible, slightly higher density in upper sky
  - **Moon:** Smaller, positioned near the planet
- **Parallax suitable:** ❌ Flat composite
- **Redesign note:** The horizon is more dramatic (orange) but the refined version (`refined_hero_landscape.jpg`) is more cinematic and restrained. The `clean_cosmic_landscape.jpg` could be used for a different section (e.g., About section bg at low opacity).

---

### `hero-bg.jpg`
- **Path:** `/public/hero-bg.jpg`
- **Type:** JPEG, raster
- **Size:** 245 KB
- **Dimensions:** ~1024×576 (16:9, lower resolution)
- **Transparency:** ❌ None
- **Currently used:** ❌ **Not used anywhere**
- **Visual description:**
  - This is the **original NAKSHATRA mockup/reference image** — it has **full website UI baked into the image**:
    - Visible Navbar with ISRO logo + NAKSHATRA logo with orbital arc
    - Visible navigation links
    - Large "NAKSHATRA" text with 3D metallic effect and orbital arc
    - "THE AEROSPACE HACKATHON 2026" subtitle
    - "SAME SKY. BIGGER POSSIBILITIES." tagline
    - Two CTA buttons baked in
    - Statistics cards ("INDIA WIDE", "FOR STUDENTS INNOVATORS BUILDERS", "A BRIGHTER TOMORROW TOGETHER") with icons
    - "01 / 04 IDEAS INTO ORBITS" metadata
    - "EXPLORE INNOVATE COLLABORATE LAUNCH" markers
  - Background: Full space landscape with planet, astronaut, terrain — similar composition to other images
- **Parallax suitable:** ❌
- **Redesign note:** This is the **original NAKSHATRA website design reference**. Do not use as a background. Use only as a design reference for the NAKSHATRA brand language, color palette, typography style, and UI elements. Critical insight: the original design had an **orbital arc** through the NAKSHATRA logo — this is a core brand element.

---

### `favicon.svg`
- **Path:** `/public/favicon.svg`
- **Type:** SVG
- **Size:** 9.3 KB
- **Used:** Browser tab only

---

### `icons.svg`
- **Path:** `/public/icons.svg`
- **Type:** SVG sprite
- **Size:** 4.9 KB
- **Used:** ❌ Not imported or referenced anywhere in current code

---

### COMPOSITE vs SEPARATE OBJECTS — CRITICAL SUMMARY

| Asset | Status | Implication |
|---|---|---|
| `refined_hero_landscape.jpg` | ⛔ FLAT COMPOSITE — sky + terrain + planet + moon + astronaut all in one | Cannot parallax individual elements |
| `clean_cosmic_landscape.jpg` | ⛔ FLAT COMPOSITE — same issue | Cannot parallax |
| `hero-bg.jpg` | ⛔ FLAT COMPOSITE + baked UI | Reference only |
| `mission-astronaut.jpg` | ✅ NEAR-ISOLATED — astronaut on pure black bg | Can be composited separately |
| Planet | ❌ NOT AVAILABLE as separate asset | Must be generated |
| Moon | ❌ NOT AVAILABLE as separate asset | Must be generated |
| Sky/stars | ❌ NOT AVAILABLE as separate asset | Must be generated or use StarfieldCanvas |
| Terrain | ❌ NOT AVAILABLE as separate asset | Must be generated |

---

## 5. ASSET CONTACT SHEET

Visual inspection completed above. The four images are reproduced at the beginning of Section 4.

Contact sheet path (generated from source inspection):
`C:\Users\gurut\.gemini\antigravity\brain\60719be5-d47b-46ea-91e8-842e7caf52b4\asset_contact_sheet_notes.md`

*(Visual contact sheet generation requires image manipulation tools; asset visual descriptions above serve as the design-planning equivalent.)*

---

## 6. FULL CSS / DESIGN SYSTEM EXTRACTION

### Fonts

| Role | Family | Weights | Usage |
|---|---|---|---|
| Display / Heading | Syncopate | 400, 700 | All `font-display` — NAKSHATRA title, h2 section headers, mobile nav |
| Body | Inter | 300, 400, 500, 600 | All body copy, nav links, CTA text |
| Mono / Technical | Space Mono | 400, 700 | All labels, eyebrows, metadata, mono text, REGISTER CTA |

### Colors — Actual Values

| Token | Hex | Usage |
|---|---|---|
| `brand-navy` | `#05080D` | Footer bg, FAQ bg, early-era backgrounds |
| `brand-dark` | `#071321` | Defined, rarely used |
| `brand-blue` | `#8DB8FF` | Primary accent — borders, icons, hover states, glow |
| `brand-silver` | `#E9EEF5` | Primary text color |
| `brand-gold` | `#D9B46A` | Tier 01 card only |
| Page base | `#020408` | App wrapper, Hero bg, fallback |
| Pure black | `#000000` | WhyParticipate, Schedule, FinalCTA, card bg |
| Mid-dark | `#03060C` | Navbar solid |
| Warm dark | `#0a0800` | Tier 01 reward card bg |

### Typography — Exact Sizes

| Element | Size | Font | Weight | Tracking |
|---|---|---|---|---|
| Hero title | `clamp(3rem, 4.5vw, 4.5rem)` | Syncopate | 700 | tight |
| Section h2 | `text-3xl md:text-5xl` | Syncopate | 400 (font-light) | normal |
| Final CTA h2 | `text-4xl md:text-6xl lg:text-8xl` | Syncopate | 300 (font-light) | tight |
| About h2 | `text-3xl md:text-5xl lg:text-6xl` | Syncopate | 300 | tight |
| Stat counter | `text-3xl md:text-4xl` | Syncopate | 700 | normal |
| Body large | `text-lg` | Inter | 300 | normal |
| Body default | `text-sm` / `text-base` | Inter | 300 | normal |
| Card title | `text-lg` to `text-2xl` | Inter | 500 | normal |
| Eyebrow labels | `text-[9px]`–`text-xs` | Space Mono | 400 | 0.2–0.3em |
| Nav links | `text-[12px]` | Inter | 500 | normal |
| CTA primary | `text-[13px]` | Inter | 500 | `tracking-wide` |

### Spacing

| Property | Value |
|---|---|
| Container max-width | `max-w-7xl` = 1280px |
| H-padding (mobile) | `px-6` = 1.5rem |
| H-padding (desktop) | `px-12` = 3rem, or `px-[8vw]` |
| Section V-padding | `py-32` = 8rem (consistent) |
| FinalCTA V-padding | `py-48` = 12rem |
| Grid gap (About, Rewards) | `gap-16` = 4rem |
| Card grid gap | `gap-5` = 1.25rem |
| Why-grid gap | `gap-px` = 1px (used as border) |

### Buttons

| Type | Height | Padding | Border | Radius | Hover |
|---|---|---|---|---|---|
| Primary | auto | `px-8 py-3.5` | none | 0 | `bg-white`, subtle shadow |
| Secondary | auto | `px-8 py-3.5` | `border-brand-silver/15` | 0 | `border-brand-blue/40`, bg-blue/5 |
| Outline CTA | auto | `px-12 py-5` | `border-brand-blue/30` | 0 | `bg-brand-blue/10` |
| Ghost mono | auto | `px-8 py-4` | `border-brand-silver/10` | 0 | `border-brand-blue/40` |

**Zero border-radius on all buttons.** Sharp rectangular corners throughout.

---

## 7. ANIMATION INVENTORY

### Complete Animation Catalogue

| File | Target | Trigger | Type | Duration | Ease | Scroll? | Scrub | Pin | Parallax |
|---|---|---|---|---|---|---|---|---|---|
| Hero | `.hero-bg` | mount | scale+filter | 1.5s | power3.out | ❌ | ❌ | ❌ | ❌ |
| Hero | `.hero-overlay` | mount | opacity | 1.5s | — | ❌ | ❌ | ❌ | ❌ |
| Hero | `.hero-eyebrow` | mount | y+opacity | 1.0s | power2.out | ❌ | ❌ | ❌ | ❌ |
| Hero | `.hero-title` | mount | y+opacity | 1.0s | power2.out | ❌ | ❌ | ❌ | ❌ |
| Hero | `.hero-subtitle` | mount | y+opacity | 1.0s | power2.out | ❌ | ❌ | ❌ | ❌ |
| Hero | `.hero-message` | mount | opacity | 1.0s | power2.out | ❌ | ❌ | ❌ | ❌ |
| Hero | `.hero-ctas` | mount | y+opacity | 1.0s | power2.out | ❌ | ❌ | ❌ | ❌ |
| Hero | `.hero-meta-bottom` | mount | opacity | 1.0s | — | ❌ | ❌ | ❌ | ❌ |
| Hero | `.hero-meta-right` | mount | x+opacity | 1.0s | power2.out | ❌ | ❌ | ❌ | ❌ |
| About | `.about-word` (×10) | scroll top 80% | y+opacity | 1.0s | power3.out | ✅ | ❌ | ❌ | ❌ |
| About | `.about-body` | scroll top 85% | y+opacity | 1.0s | power2.out | ✅ | ❌ | ❌ | ❌ |
| About | `.about-line` | scroll top 85% | scaleX | 1.2s | power3.out | ✅ | ❌ | ❌ | ❌ |
| About | `.about-stat` | scroll top 85% | y+opacity | 0.8s | power2.out | ✅ | ❌ | ❌ | ❌ |
| About | `AnimatedCounter` | ScrollTrigger.onEnter | rAF count | 1.6s | easeOutExpo | ✅ | ❌ | ❌ | ❌ |
| WhyPart | `.why-header` | scroll top 75% | y+opacity | 1.0s | power3.out | ✅ | ❌ | ❌ | ❌ |
| WhyPart | `.why-card` (×4) | scroll top 80% | y+opacity | 0.9s | power3.out | ✅ | ❌ | ❌ | ❌ |
| Challenges | `.challenges-header` | scroll top 80% | y+opacity | 1.0s | power3.out | ✅ | ❌ | ❌ | ❌ |
| Challenges | `.challenge-row` (×4) | scroll top 80% | x+opacity | 0.8s | power2.out | ✅ | ❌ | ❌ | ❌ |
| Challenges | `.satellite-float` | mount | y yoyo | 4s ∞ | sine.inOut | ❌ | ❌ | ❌ | ❌ |
| Challenges | `.satellite-float` | mount | rotation yoyo | 7s ∞ | sine.inOut | ❌ | ❌ | ❌ | ❌ |
| Schedule | `.schedule-header` | scroll top 80% | y+opacity | 1.0s | power3.out | ✅ | ❌ | ❌ | ❌ |
| Schedule | `lineRef` SVG | scroll top 75% | strokeDashoffset | 1.6s | power2.inOut | ✅ | ❌ | ❌ | ❌ |
| Schedule | `.schedule-node` (×4) | scroll top 75% | scale+opacity | 0.5s | back.out(2) | ✅ | ❌ | ❌ | ❌ |
| Schedule | `.schedule-card` (×4) | scroll top 75% | y+opacity | 0.8s | power2.out | ✅ | ❌ | ❌ | ❌ |
| Rewards | `.rewards-left` | scroll top 75% | x+opacity | 1.0s | power3.out | ✅ | ❌ | ❌ | ❌ |
| Rewards | `.reward-card` (×3) | scroll top 80% | y+opacity | 0.8s | power2.out | ✅ | ❌ | ❌ | ❌ |
| FinalCTA | `.final-headline` | scroll top 70% | scale+opacity | 1.4s | power3.out | ✅ | ❌ | ❌ | ❌ |
| FinalCTA | `.final-cta-btn` | scroll top 60% | y+opacity | 1.0s | power2.out | ✅ | ❌ | ❌ | ❌ |
| FinalCTA | `btnRef` | mount | boxShadow yoyo | 2.5s ∞ | sine.inOut | ❌ | ❌ | ❌ | ❌ |
| FinalCTA | `.final-glow` | mount | opacity yoyo | 3.0s ∞ | sine.inOut | ❌ | ❌ | ❌ | ❌ |
| CSS | `.shimmer-sweep` | group:hover | translateX | 2.5s | ease-in-out | ❌ | ❌ | ❌ | ❌ |
| StarfieldCanvas | 220 stars | scroll passive | y offset rAF | 60fps ∞ | linear | ✅ | ❌ | ❌ | ✅ mild |

### Explicit System Check

| System | Present | Notes |
|---|---|---|
| GSAP timelines | ✅ | Hero, About, Challenges, FinalCTA |
| ScrollTrigger | ✅ | All sections except Hero, FAQ, Footer |
| `scrub` | ❌ | Not used anywhere |
| `pin` | ❌ | Not used anywhere |
| `snap` | ❌ | Not used anywhere |
| `matchMedia` | ❌ | Not used anywhere |
| IntersectionObserver | ❌ | Not used (ScrollTrigger used instead) |
| requestAnimationFrame | ✅ | StarfieldCanvas + AnimatedCounter |
| mousemove / pointermove | ❌ | Not used anywhere |
| Lenis | ❌ | Not installed |
| Framer Motion | ❌ | Not installed |
| CSS keyframes | ✅ | shimmer-sweep, float-slow (unused), glow-pulse (unused) |

---

## 8. SECTION-BY-SECTION REDESIGN POTENTIAL

---

**SECTION: Hero**
KEEP: NAKSHATRA text, eyebrow, subtitle, CTAs, astronaut visual concept
REPOSITION: Text should drift subtly toward center during scroll, not stay fixed forever
ADD: Separate planet layer, separate astronaut layer, separate terrain layer, separate sky layer
REMOVE: The 6 static metadata items and replace with contextual scroll indicators
ANIMATE: Multi-layer parallax (sky slowest, terrain medium, planet medium, astronaut fast)
PIN: Yes — pin the hero for ~300vh scroll to play out 6 scenes
ZOOM: Planet should scale from ~30% frame width → 100% (fullscreen) over scroll
PARALLAX: Yes — each separated layer at different rates
FULLSCREEN TAKEOVER: Planet expands to fill viewport as transition into About
TRANSITION INTO NEXT SECTION: Planet fullscreen → dissolve/reveal About section content beneath

---

**SECTION: About**
KEEP: All content — headline, stats, body copy
REPOSITION: Could span full viewport height as a "chapter reveal" — text appears as planet fades
ADD: Background image at very low opacity (e.g., `clean_cosmic_landscape.jpg` at 3–5%)
REMOVE: The sharp section boundary — blend from hero planet transition
ANIMATE: Headline words could be pinned and revealed one word at a time per scroll increment
PIN: Optionally pin for half-section to let words reveal
PARALLAX: Subtle background image at 0.3× scroll speed
FULLSCREEN TAKEOVER: No
TRANSITION INTO NEXT SECTION: Fade bg to pure black as WhyParticipate enters

---

**SECTION: Why Participate**
KEEP: 4 cards, content, icons
REPOSITION: Cards could enter from horizontal stagger (not just vertical)
ADD: A background visual — e.g., the satellite SVG scaled up massively at low opacity
REMOVE: The 1px gap-based grid — replace with more spatial card layout
ANIMATE: Cards could reveal with a horizontal scroll or stagger-in from different x positions
PIN: No (content is short)
PARALLAX: Icon elements could drift subtly on mouse move
FULLSCREEN TAKEOVER: No
TRANSITION INTO NEXT SECTION: Cross-fade to challenges bg

---

**SECTION: Challenges**
KEEP: All 4 challenge rows, category/title/desc structure, VIEW ALL button
REPOSITION: Challenge rows could expand/reveal with more theatrical interaction
ADD: Large editorial number (01, 02...) in background at low opacity per row
REMOVE: The satellite SVG is too subtle — either make it larger or remove
ANIMATE: Each row could have a scroll-triggered reveal that pushes up from beneath previous
PIN: No
PARALLAX: No (list-based layout doesn't benefit much)
FULLSCREEN TAKEOVER: No — but could do a full-width challenge image takeover on hover
TRANSITION INTO NEXT SECTION: Smooth dark fade into Schedule

---

**SECTION: Schedule / Timeline**
KEEP: 4 phases, dates, descriptions, SVG line concept
REPOSITION: Timeline line could be vertical on mobile and horizontal on desktop (currently horizontal only)
ADD: Phase dates could appear from a scanning/typewriter reveal
REMOVE: Nothing critical
ANIMATE: Line draw is good — extend it so the line draws *as you scroll*, not just on enter
PIN: Could pin lightly — line draws as user scrolls through section
PARALLAX: Background radial glow could shift position on scroll
FULLSCREEN TAKEOVER: No
TRANSITION INTO NEXT SECTION: Fade out

---

**SECTION: Rewards**
KEEP: Award tier structure, content, planet ring SVG concept
REPOSITION: Planet ring SVG could be much larger and prominent — a visual centerpiece, not just a decorative element at 8% opacity
ADD: Real prize numbers/amounts once available
REMOVE: The gold shimmer — too subtle to notice
ANIMATE: Planet ring SVG could slowly rotate (CSS animation)
PIN: No
PARALLAX: Planet ring graphic could drift slowly upward as user scrolls through
FULLSCREEN TAKEOVER: No
TRANSITION INTO NEXT SECTION: Smooth fade to FAQ

---

**SECTION: FAQ**
KEEP: All 4 questions and answers, accordion behavior
REPOSITION: Left-aligned layout (not centered) for editorial feel
ADD: A visual element on the right side — mission patch or technical document illustration
REMOVE: The `from-brand-navy to-[#060b14]` gradient feels off from the rest of the black palette
ANIMATE: Add entrance animation (currently has none)
PIN: No
PARALLAX: No
FULLSCREEN TAKEOVER: No
TRANSITION INTO NEXT SECTION: Fade to FinalCTA

---

**SECTION: Final CTA**
KEEP: "THE SKY IS NOT THE LIMIT." and CTA button
REPOSITION: Could be even more minimal — just the headline and one button
ADD: A full-bleed space image at low opacity (reuse `refined_hero_landscape.jpg` at 8%)
REMOVE: The static MiniStars canvas (StarfieldCanvas already handles this globally)
ANIMATE: Headline could be massively oversized, entering from a scroll reveal
PIN: Light pin — hold for 2 seconds of ambient atmosphere
PARALLAX: Background image at 0.2× scroll speed
FULLSCREEN TAKEOVER: The section itself is fullscreen — reinforce that
TRANSITION INTO NEXT SECTION: Fade to Footer

---

## 9. HERO — DEEP IMPLEMENTATION ANALYSIS

### Current Actual DOM Layer Hierarchy

```
<section> Hero wrapper
  │
  ├── Layer 1 (z-0): Background image/video container
  │    ├── <video> poster="/refined_hero_landscape.jpg"    ← currently the poster shows
  │    └── <img> /refined_hero_landscape.jpg               ← fallback behind video
  │
  ├── Layer 2 (z-10): Atmospheric overlay
  │    └── <div> gradient-to-r from-[#03060C]/95 → transparent (left 50%)
  │
  └── Layer 3 (z-20): All UI content (flat, not separated)
       ├── eyebrow text
       ├── NAKSHATRA title
       ├── subtitle
       ├── message (Build. Explore. Innovate.)
       ├── CTA buttons
       ├── bottom-left metadata
       ├── bottom-center metadata
       └── right-side vertical words
```

### Can Each Visual Object Independently Move?

| Object | Can Move Independently? | Reason |
|---|---|---|
| Sky / stars | ❌ No | Baked into `refined_hero_landscape.jpg` |
| Planet | ❌ No | Baked into `refined_hero_landscape.jpg` |
| Moon | ❌ No | Baked into `refined_hero_landscape.jpg` |
| Terrain | ❌ No | Baked into `refined_hero_landscape.jpg` |
| Astronaut (in hero) | ❌ No | Baked into `refined_hero_landscape.jpg` |
| Astronaut (mission-astronaut.jpg) | ✅ Near-yes | Separate JPEG on black bg — can CSS-composite |
| Typography | ✅ Yes | HTML elements |
| CTAs | ✅ Yes | HTML elements |
| Metadata | ✅ Yes | HTML elements |
| StarfieldCanvas stars | ✅ Yes | Separate canvas layer |

### Assets That MUST Be Generated or Cut Out

| Asset | Current Status | Action Needed |
|---|---|---|
| Isolated planet PNG | ❌ Missing | Generate: blue-gray gas giant on transparent bg |
| Isolated moon PNG | ❌ Missing | Generate: small gray moon on transparent bg |
| Isolated terrain/ground PNG | ❌ Missing | Generate: dark rocky landscape strip, transparent sky |
| Sky/star field image | ❌ Missing as separate | Generate: pure space background, no terrain |
| Astronaut (parallax use) | ⚠️ Partially available | `mission-astronaut.jpg` on black bg — usable with blend-mode |

### Which Layers Can Use CSS Transform?

| Element | CSS Transform |
|---|---|
| HTML text elements | ✅ `translate`, `scale`, `rotate` |
| `<img>` / `<div>` with bg image | ✅ `translate`, `scale` |
| Canvas | ✅ `translate` (moves canvas) |
| SVG elements | ✅ `translate`, `rotate`, `scale` |

### Which Can Be Animated with GSAP?

All HTML elements, all CSS properties via GSAP. GSAP can animate:
- `x`, `y`, `scale`, `rotation`, `opacity`, `filter`
- CSS variables
- `clip-path`
- SVG attributes (`stroke-dashoffset`, etc.)

**The critical constraint is always: elements must be separate DOM nodes.**

---

## 10. TARGET HERO IMPLEMENTATION — SCENE PLAN

> This is a planning document. Do NOT implement yet.

### Prerequisite Architecture Change

The hero must become a **pinned scroll container**:
```
<section style="height: 400vh"> ← total scroll budget for all 6 scenes
  <div style="position: sticky; top: 0; height: 100vh"> ← pinned viewport
    [all hero layers here]
  </div>
</section>
```

Or use GSAP `ScrollTrigger({ pin: true, end: "+=300%" })`.

### Layer Stack Required

```
pinned hero viewport (100vh × 100vw)
  ├── layer-stars    (z-1)  ← sky background / stars — slowest parallax
  ├── layer-terrain  (z-2)  ← rocky landscape bottom strip
  ├── layer-planet   (z-3)  ← isolated planet PNG
  ├── layer-moon     (z-4)  ← isolated moon PNG
  ├── layer-astronaut (z-5) ← mission-astronaut.jpg (blend-mode:lighten or screen)
  ├── layer-overlay  (z-6)  ← atmospheric gradient (left side)
  └── layer-ui       (z-10) ← all text, buttons, metadata
```

### Scene-by-Scene GSAP Properties

| Scene | Scroll % | Element | x | y | scale | opacity | Notes |
|---|---|---|---|---|---|---|---|
| **1 — Intro** | 0% | All | 0 | 0 | 1 | 1 | Static hero as currently |
| **2 — Shift** | 0→25% | `.hero-title` | 0 → +5vw | 0 → -2vh | 1 | 1 | Subtle toward center |
| 2 | 0→25% | `.hero-eyebrow` | 0 → +8vw | 0 | 1 | 1→0.6 | Fades slightly |
| 2 | 0→25% | `layer-planet` | 0 | 0 → -3vh | 1 | 1 | Moves slightly upward |
| 2 | 0→25% | `layer-astronaut` | 0 | 0 → +2vh | 1.0→1.08 | 1 | Subtle scale-in |
| 2 | 0→25% | `layer-stars` | 0 | 0 → -8px | 1 | 1 | Barely moves |
| 2 | 0→25% | `layer-terrain` | 0 | 0 → +4px | 1 | 1 | Opposite direction |
| **3 — Hold** | 25→40% | All | Frozen | Frozen | Frozen | Frozen | Scrub holds, ambient animations continue |
| **4 — Push** | 40→65% | `layer-planet` | → center | → center | 1 → 2.5 | 1 | Planet starts growing |
| 4 | 40→65% | UI text | — | — | 1→0.8 | 1→0 | Text fades |
| 4 | 40→65% | `layer-astronaut` | — | — | 1.08→0.8 | 1→0 | Astronaut fades back |
| 4 | 40→65% | `layer-terrain` | — | — | 1→0.6 | 1→0.3 | Terrain fades |
| **5 — Fullscreen** | 65→85% | `layer-planet` | → 50vw center | → 50vh center | 2.5 → 8 | 1 | Planet fills viewport |
| 5 | 65→85% | `layer-overlay` | — | — | — | 0 | Overlay removed |
| 5 | 65→85% | All other layers | — | — | — | 0 | Everything else gone |
| **6 — Transition** | 85→100% | `layer-planet` | — | — | 8 | 1→0 | Planet fades out |
| 6 | 85→100% | About bg | — | — | — | 0→1 | About content emerges |

**Pin duration:** ~300vh of scroll distance (= 3× viewport heights)
**Total section height:** `400vh` (1 viewport for hero + 3 viewports for scroll scenes)

---

## 11. SPACED-INSPIRED BEHAVIOR ANALYSIS

| Technique | Currently Possible | What Is Missing | What Would Be Needed |
|---|---|---|---|
| Text traveling toward center | ✅ Possible via GSAP x/y with scrub | Scrub not set up. No pin. Text in fixed container. | `ScrollTrigger({scrub:true, pin:true})`, hero reform |
| Floating imagery | ✅ Pattern exists (satellite) | No floating on hero visuals | Separate layer assets (planet, astronaut PNGs) |
| Multi-layer parallax | ❌ Not possible currently | All hero is one flat image | Separate layer assets required |
| Oversized typography | ⚠️ Partially — FinalCTA has large text | Hero title is moderate size, could go larger | CSS clamp at higher max, or viewport-unit sizing |
| Overlapping images | ❌ No | No HTML image overlap | Multiple positioned `<img>` elements |
| Large image sections | ✅ Hero already full-bleed | Other sections lack visual imagery | Add section bg images to About, etc. |
| Image expansion | ❌ Not built | No scale animation on scroll | GSAP scale with scrub + pin on planet layer |
| Fullscreen visual takeover | ❌ Not built | No pinning, no clip-path/scale expansion | Planet zoom scene (see Section 10) |
| Gradual vs abrupt transitions | ❌ Currently abrupt | Sections start and end hard | Remove StarDividers, blend bg colors, use transition overlays |
| Horizontal movement | ❌ Not present | Nothing moves on x-axis (scroll-linked) | Challenges rows could use horizontal scroll |
| Pinned scroll sections | ❌ Not present | `pin:true` never used | `ScrollTrigger({pin:true, scrub:true})` |
| Scroll-controlled object movement | ❌ Not present | No `scrub` property anywhere | `scrub: 1` or `scrub: true` on all parallax animations |

---

## 12. CONTENT PRESERVATION — EXACT CURRENT TEXT

### Hero
- Eyebrow: `IDEAS BEYOND BOUNDARIES`
- Title: `NAKSHATRA`
- Subtitle: `THE AEROSPACE HACKATHON 2026`
- Message: `Build. Explore. Innovate.`
- Primary CTA: `Explore Challenges →`
- Secondary CTA: `Watch Trailer`
- Metadata bottom-left: `01 / 04 — SCROLL TO EXPLORE`
- Metadata bottom-center: `INDIA WIDE · STUDENT INNOVATORS · AEROSPACE & SPACE`
- Metadata right: `EXPLORE / INNOVATE / COLLABORATE / LAUNCH`

### About
- Section label: `(none — no eyebrow)`
- H2: `THE NEXT FRONTIER IS BUILT BY THOSE WILLING TO EXPLORE IT.`
- Stat 1: `12+` / `Challenge Tracks`
- Stat 2: `48H` / `Build Window`
- Stat 3: `500+` / `Innovators Expected`
- Body p1: `Nakshatra 2026 is an elite national aerospace hackathon bringing together the brightest student minds to engineer solutions for real-world space challenges.`
- Body p2: `Beyond a competition, it is a launchpad. We combine the rigor of aerospace research with the agility of modern technology to foster innovation that pushes boundaries. Step into an environment designed for collaboration, discovery, and breakthroughs.`
- Link: `VIEW CHALLENGES →`

### Why Participate
- Section label: `Why Participate`
- H2: `MISSION PARAMETERS`
- Subheading: `Designed for those who seek to contribute to the next generation of space exploration and aerospace engineering.`
- Card 01: `Explore` — `Dive deep into complex aerospace datasets and simulation environments to uncover new possibilities.`
- Card 02: `Build` — `Engineer robust software and hardware solutions using cutting-edge space technology stacks.`
- Card 03: `Collaborate` — `Work alongside driven peers and receive mentorship from industry veterans and scientists.`
- Card 04: `Launch` — `Deploy your prototypes and gain visibility among top aerospace organizations.`

### Challenges
- Section label: `Challenge Tracks`
- H2: `RESEARCH DOMAINS`
- Track 01: Orbital Mechanics / `Debris Trajectory Prediction` / `Develop high-accuracy models to predict the path of micro-debris in low earth orbit.`
- Track 02: Avionics / `Autonomous Navigation Systems` / `Build lightweight, fault-tolerant navigation algorithms for deep space probes.`
- Track 03: Data Processing / `Satellite Imagery Analysis` / `Utilize ML to process multi-spectral satellite feeds for real-time climate monitoring.`
- Track 04: Human Spaceflight / `Life Support Optimization` / `Optimize closed-loop life support systems for extended duration missions.`
- Button: `VIEW ALL CHALLENGES →`

### Timeline / Schedule
- Section label: `Timeline`
- H2: `FLIGHT SCHEDULE`
- Phase 01: `Registration Opens` / `Oct 15, 2025` / `Teams register and submit intent to participate.`
- Phase 02: `Idea Submission` / `Nov 10, 2025` / `Submit your problem statement and initial solution brief.`
- Phase 03: `Shortlist Announcement` / `Dec 05, 2025` / `Top teams announced and invited to the finale.`
- Phase 04: `Grand Finale` / `Jan 20–22, 2026` / `48-hour intensive build sprint and final judging.`

### Rewards
- Section label: `Recognition`
- H2: `BEYOND THE HORIZON`
- Body: `Exceptional solutions deserve exceptional recognition. Winners receive research grants, access to exclusive aerospace facilities, and long-term mentorship from leading scientists.`
- TIER 01 — PRIME: `Prime Innovator Award` — `Research grant, exclusive access to ISRO facilities, and specialised mentorship for 6 months post-event.`
- TIER 02: `Vanguard Award` — `Innovation grant and incubation support from partner organisations.`
- SPECIAL: `Research Merit` — `Outstanding technical paper recognition and publication support.`

### FAQ
- H2: `SYSTEM QUERIES`
- Q1: `Who can participate in Nakshatra?` A: `Nakshatra is open to undergraduate and postgraduate students from any recognized university across India. Teams can have 3-5 members.`
- Q2: `Do I need prior aerospace experience?` A: `While helpful, it is not mandatory. We are looking for strong problem-solving skills in software, hardware, and data analysis. Mentors will be available to help bridge domain knowledge gaps.`
- Q3: `Is this an online or offline hackathon?` A: `The initial idea submission and shortlisting phases are online. The grand finale will be an offline 48-hour intensive build phase.`
- Q4: `What is the evaluation criteria?` A: `Projects are evaluated on technical complexity, innovation, practical viability in space environments, and presentation quality.`

### Final CTA
- H2: `THE SKY IS NOT` / `THE LIMIT.`
- CTA Button: `EXPLORE NAKSHATRA →`
- Micro-text: `NAKSHATRA · THE AEROSPACE HACKATHON 2026`

### Footer
- Brand: `NAKSHATRA.`
- Tagline: `The national aerospace hackathon fostering innovation and exploration for the next generation of space technology.`
- Navigation: About / Challenges / Schedule / Rewards
- Legal: Privacy Policy / Terms of Service / Code of Conduct
- Social: TWITTER / LINKEDIN / INSTAGRAM (all `href="#"`)
- Copyright: `© 2026 NAKSHATRA. All rights reserved.`

---

## 13. MOBILE BEHAVIOR

| Element | Desktop | Tablet (md) | Mobile |
|---|---|---|---|
| Hero background | Full-bleed, 100vh | Full-bleed | Full-bleed, 100svh |
| Hero text position | left-[8vw], vertically centered | left-[8vw] | left-6 |
| Hero title size | `clamp(3rem, 4.5vw, 4.5rem)` | ~4rem | `text-4xl` = 2.25rem |
| Hero metadata (center) | Visible | Hidden | Hidden |
| Hero metadata (right) | Visible | Hidden | Hidden |
| Hero CTAs | Row (`flex-row`) | Row | Stacked (`flex-col`) |
| Navbar | Full links + register | Full links | Hamburger only |
| Mobile menu | — | — | Full-screen overlay |
| About grid | 2-column | 2-column | 1-column stacked |
| Stats | Row of 3 | Row of 3 | Row of 3 (may overflow small screens) |
| WhyParticipate grid | 4-column | 2-column | 1-column |
| Challenge satellite | Visible (`w-48`) | Visible (`w-32`) | Hidden |
| Challenge rows | 3-column (num, title, desc, arrow) | 3-column | Stacked |
| Schedule timeline | Horizontal 4-column | Horizontal | Vertical stacked with line |
| Schedule SVG line | Horizontal | Horizontal | Hidden |
| Rewards grid | 2-column | 1-column | 1-column |
| Planet ring SVG | Visible | Hidden | Hidden |
| Reward cards | Full width row of 2 | Full width row of 2 | Stacked |

**Mobile animation differences:** None — all GSAP animations fire identically. No `ScrollTrigger.matchMedia()` used. On mobile, some animations (e.g., satellite x:-30 slide-in) may be barely noticeable due to smaller screens.

**Mobile scroll:** The planned 6-scene hero pinned scroll would be complex on mobile. The planet zoom would need to be simplified or replaced with a crossfade approach.

---

## 14. REDESIGN IMPLEMENTATION ARCHITECTURE

Based on the current project structure, here is the recommended file/component architecture for the cinematic redesign:

```
src/
├── App.tsx                          ← MODIFY: remove StarDividers, add global scroll context
├── index.css                        ← MODIFY: add Lenis styles, new utilities
│
├── components/
│   │
│   ├── cinematic/                   ← CREATE: scroll-driven cinematic scenes
│   │   ├── HeroCinematic.tsx        ← replaces Hero.tsx — pinned 6-scene hero
│   │   ├── PlanetZoom.tsx           ← the fullscreen planet transition component
│   │   └── SceneManager.tsx         ← optional: manages active scene state
│   │
│   ├── hero/                        ← CREATE: hero sub-layers
│   │   ├── HeroLayers.tsx           ← layer stack: sky, terrain, planet, moon, astronaut, ui
│   │   ├── HeroTypography.tsx       ← all hero text, positioned for scroll movement
│   │   └── HeroMeta.tsx             ← eyebrow, metadata, CTAs
│   │
│   ├── sections/                    ← PRESERVE + MODIFY existing
│   │   ├── About.tsx                ← MODIFY: blend from planet transition
│   │   ├── WhyParticipate.tsx       ← MODIFY: more spatial layout
│   │   ├── Challenges.tsx           ← PRESERVE mostly, optional image addition
│   │   ├── Schedule.tsx             ← MODIFY: scroll-linked line draw
│   │   ├── Rewards.tsx              ← PRESERVE mostly
│   │   ├── FAQ.tsx                  ← MODIFY: add entry animation, left-align
│   │   └── FinalCTA.tsx             ← MODIFY: oversized typography
│   │
│   ├── transitions/                 ← CREATE: between-section connective tissue
│   │   ├── SectionBlend.tsx         ← manages bg color transition between sections
│   │   └── PlanetToAbout.tsx        ← planet → about bridge component
│   │
│   ├── effects/                     ← PRESERVE + EXTEND
│   │   ├── StarfieldCanvas.tsx      ← PRESERVE: works well
│   │   └── ScrollProgress.tsx       ← PRESERVE
│   │
│   ├── ui/                          ← UI primitives
│   │   ├── Navbar.tsx               ← MODIFY: needs logo.svg
│   │   ├── Footer.tsx               ← PRESERVE mostly
│   │   └── StarDivider.tsx          ← REMOVE or KEEP minimal — StarDividers fight cinematic flow
│   │
│   └── hooks/                       ← CREATE
│       ├── useLenis.ts              ← if Lenis is installed
│       └── useScrollProgress.ts     ← extracts scroll position
│
└── assets/                          ← new assets to add
    ├── planet-isolated.png          ← blue-gray gas giant, transparent bg — NEEDED
    ├── moon-isolated.png            ← small moon, transparent bg — NEEDED
    ├── terrain-strip.png            ← landscape foreground, transparent sky — NEEDED
    ├── sky-bg.jpg                   ← pure star field — can extract from existing
    └── logo.svg                     ← NEEDED, currently 404
```

### Files to Modify
- `App.tsx` — restructure for Lenis, remove dividers
- `src/index.css` — Lenis CSS, new scroll utilities
- `Hero.tsx` → replace with `cinematic/HeroCinematic.tsx`
- `About.tsx` — extend for blend transition from hero
- `FAQ.tsx` — add scroll entrance
- `FinalCTA.tsx` — oversized hero-style typography
- `Navbar.tsx` — provide `logo.svg`

### Files to Create
- `cinematic/HeroCinematic.tsx`
- `hero/HeroLayers.tsx`, `HeroTypography.tsx`, `HeroMeta.tsx`
- `transitions/SectionBlend.tsx`, `PlanetToAbout.tsx`
- `hooks/useLenis.ts`, `useScrollProgress.ts`

### Files to Preserve
- `StarfieldCanvas.tsx`
- `ScrollProgress.tsx`
- `Challenges.tsx` (mostly)
- `Schedule.tsx` (mostly)
- `Rewards.tsx` (mostly)
- `Footer.tsx` (mostly)
- `WhyParticipate.tsx` (mostly)

### Assets to Replace
- Nothing to delete — all current assets may remain

### Assets to Add
- `logo.svg` (critical — currently 404)
- `planet-isolated.png` (transparent bg)
- `moon-isolated.png` (transparent bg)
- `terrain-strip.png` (transparent sky)
- `sky-background.jpg` (pure star field)
- Cinematic video MP4/WebM (optional, for future use)

---

## 15. EXACT INPUTS NEEDED

### A. ALREADY AVAILABLE IN PROJECT

- GSAP 3.15.0 + ScrollTrigger — installed and working
- React 19 + Vite 8 + TypeScript — solid foundation
- Tailwind v4 with `@theme` design tokens
- Font stack: Syncopate + Inter + Space Mono — already loaded
- Color system defined: `brand-navy`, `brand-blue`, `brand-silver`, `brand-gold`
- `mission-astronaut.jpg` — standalone astronaut on pure black background (usable as near-isolated layer with CSS blend-mode)
- `refined_hero_landscape.jpg` — full cinematic bg (usable as base sky/composite)
- `clean_cosmic_landscape.jpg` — alternate landscape (usable in About at low opacity)
- StarfieldCanvas (rAF canvas parallax pattern)
- All section content (text preserved above in Section 12)
- Working Navbar with mobile hamburger
- Accordion FAQ component
- Complete responsive grid system

### B. NEEDS NEW GRAPHICS

| Asset | Description | Format | Priority |
|---|---|---|---|
| `logo.svg` | Actual NAKSHATRA vector logo (with orbital arc) | SVG | 🔴 CRITICAL — currently 404 |
| `planet-isolated.png` | Blue-gray gas giant, transparent background | PNG, 1000×1000px+ | 🔴 CRITICAL — needed for parallax hero |
| `moon-isolated.png` | Small gray moon, transparent background | PNG, 400×400px+ | 🟡 HIGH |
| `terrain-strip.png` | Rocky alien landscape strip, transparent sky | PNG, 2000×800px | 🟡 HIGH |
| `sky-bg.jpg` | Pure deep-space star field, no ground | JPEG, 2560×1440 | 🟡 HIGH |
| `cinematic-video.mp4` | The black hole → landscape cinematic | MP4/WebM | 🟠 MEDIUM (hero will still work without it) |

### C. NEEDS MY DESIGN APPROVAL

1. **Hero pin length** — How many scroll-heights should the 6-scene sequence occupy? (Suggested: `300vh` = 3 extra scroll pages)
2. **StarDividers** — Remove them all, or keep a simplified version between certain sections?
3. **Lenis smooth scroll** — Approve adding it? Will change the entire scroll feel of the site.
4. **Mobile hero strategy** — Full 6-scene scroll on mobile (simplified), or a completely static hero with a single transition?
5. **About section image** — Should About use `clean_cosmic_landscape.jpg` as a subtle bg (5% opacity), or remain pure black?
6. **Challenges section** — Should challenge rows expand to show more content on click, or remain as-is?

### D. NEEDS EVENT / COPY CONFIRMATION

| Item | Current Value | Status |
|---|---|---|
| Challenge track names | 4 placeholder names | Confirm or replace |
| Challenge descriptions | Placeholder text | Confirm or replace |
| Registration link | `href="#register"` (goes nowhere) | Provide real URL |
| Event dates | Oct 2025 – Jan 2026 | Confirm correct |
| Prize descriptions | Vague ("research grant") | Confirm real prizes |
| ISRO facilities claim | "exclusive access to ISRO facilities" | Confirm this is accurate |
| Social media links | All `href="#"` | Provide real URLs |
| Team size | 3–5 members | Confirm |
| Target schools | "any recognized university across India" | Confirm |
| Organizer name/college | Not present | Add? |

### E. TECHNICAL WORK REQUIRED (in order of dependency)

1. **Provide `logo.svg`** → fixes Navbar 404, unblocks brand identity display
2. **Generate isolated planet PNG** → unblocks hero parallax architecture
3. **Approve Lenis** → determines whether to install it before restructuring scroll
4. **Approve pin length** → determines the Hero component height and scroll budget
5. **Generate terrain + sky assets** → complete the 5-layer hero stack
6. **Build `HeroCinematic.tsx`** → the scroll-pinned 6-scene component
7. **Build `PlanetToAbout.tsx`** → the fullscreen planet → About transition
8. **Update `About.tsx`** → connect to planet transition
9. **Add `scrub` to all scroll animations** → make everything scroll-linked
10. **Add `ScrollTrigger.matchMedia()`** → mobile-specific behavior
11. **Add `gsap.matchMedia()` for `prefers-reduced-motion`** → accessibility fix
12. **Optimize images** → convert JPEGs to WebP, add `srcset`
13. **Remove `App.css`** → clean up orphaned file
14. **Remove `tailwind.config.js`** → Tailwind v4 doesn't use it, causes confusion

# Taarruni Design Solutions (TDS) — Immersive 3D WebGL Platform

A next-generation, scene-based 3D WebGL website for **Taarruni Design Solutions (TDS)**, incorporated in 2005 in Bangalore, India, with international operations in California, USA.

## Architecture & Technology Stack

- **Framework**: Vite + React 19 + TypeScript
- **3D Graphics Engine**: Three.js via `@react-three/fiber` & `@react-three/drei`
- **Styling**: Tailwind CSS with custom multi-tone light color palette
- **Animations**: Framer Motion & custom R3F camera damping lerps
- **Design Constitution**: Light multi-tone aesthetic (`#F8FAFC`, `#E0F2FE`, `#EDE9FE`, `#ECFDF5`, `#FEF3C7`, `#FFE4D6`)

## 3D Scene Universe & Coordinates

The site uses a persistent `<Canvas>` where each page route corresponds to a 3D coordinate space that the camera smoothly flies between:

| Page / Route | 3D Scene Name | Coordinates `[X, Y, Z]` | Description |
|---|---|---|---|
| `/` or `#/home` | Studio Plaza | `[0, 1.4, 7.8]` | Glass browser window, 3D extruded TDS logo, billboard, orbiting tech spheres |
| `#/about` | Time Machine | `[26, 2.2, 8.5]` | 3D winding timeline tube with milestone spheres from 2005 to 2025 |
| `#/services` | Solutions Hub | `[52, 2.0, 9.2]` | Rising analytics bars, snapping CMS cubes, wireframe building, 3D cart |
| `#/clients` | Client Colosseum | `[0, 26, 9.8]` | Curved 3D amphitheater of 48+ client tiles with hover pop-out physics |
| `#/portfolio` | Gallery Pavilion | `[-26, 2.0, 8.5]` | 3D hexagonal/circular art gallery of 9 production portfolios |
| `#/testimonials`| Words of Appreciation| `[26, 26, 8.8]` | Floating 3D quote pedestals with verified reviews |
| `#/process` | Engineering Pathway | `[-26, 26, 8.8]` | 5-stage glass gate arches (Discovery → Architecture → Dev → QA → SLA) |
| `#/contact` | Global Teleport Hub| `[26, -26, 9.2]` | 3D rotating Earth globe with Bangalore & California glowing beacons |
| `#/request-quote`| Project Estimator | `[26, -26, 9.2]` | Interactive budget and capability calculation module |
| `#/blog` | Knowledge Orbit | `[-26, -26, 8.5]` | Technical articles with direct link to `taarruni.blogspot.com` |
| `#/privacy` | Governance Slab | `[-52, 0, 8.2]` | Enterprise data security and NDA guidelines |

## Installation & Running

```bash
# Install dependencies
npm install

# Run local development server (port 3000)
npm run dev

# Run TypeScript linter
npm run lint

# Compile production bundle
npm run build
```

## Corporate Credentials & Offices

- **Head Office (India)**:
  Taarruni Design Solutions
  *"PRAVARA"*, No. 67/1-1, H.B. Samaja Road, Basavanagudi, Bangalore – 560004
  Phone: +91 80 26561646 / +91 98804 77344
  Email: info@taarruni.com
- **USA Office**:
  Taarruni c/o Izen AI Inc.
  4556 Fernandez Street, Union City, CA 94587, USA
- **WhatsApp**:
  https://api.whatsapp.com/send?phone=919880477344&text=Yes%20I%20am%20Interested
